'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

// Progressive enhancement for the model reference tables. The generator
// (.github/scripts/fetch_models.mjs) marks each table with data-models-table and embeds the toolbar
// spec `num:<columns>;sort:<column>;cap:<column>:<label>[,…];in:<column>:<label>=<needle>[,…];out:…`,
// so the labels and column layout live in the generator and this component stays format-only.

type Labels = {
  search: string
  reset: string
  sort: string
  showing: (visible: number, total: number) => string
}

const LABELS: Record<'zh-cn' | 'en', Labels> = {
  'zh-cn': {
    search: '搜索模型名称、API ID 或服务商…',
    reset: '重置',
    sort: '点击排序',
    showing: (visible, total) => `显示 ${visible} / ${total}`
  },
  en: {
    search: 'Search by model, API ID or provider…',
    reset: 'Reset',
    sort: 'Click to sort',
    showing: (visible, total) => `${visible} / ${total} shown`
  }
}

type Chip = { label: string; column: number; needle: string }

function parseSpec(value: string) {
  const numeric = new Set<number>()
  const chips: Chip[] = []
  let sortColumn: number | null = null
  for (const part of value.split(';')) {
    const first = part.indexOf(':')
    if (first < 0) continue
    const key = part.slice(0, first)
    const rest = part.slice(first + 1)
    if (key === 'num') {
      for (const column of rest.split(',')) numeric.add(Number(column))
      continue
    }
    if (key === 'sort') {
      sortColumn = Number(rest)
      continue
    }
    const second = rest.indexOf(':')
    if (second < 0) continue
    const column = Number(rest.slice(0, second))
    for (const item of rest.slice(second + 1).split(',')) {
      const [label, needle = label] = item.split('=')
      if (label) chips.push({ label, column, needle })
    }
  }
  return { numeric, chips, sortColumn }
}

function enhance(wrapper: HTMLElement, locale: 'zh-cn' | 'en', labels: Labels) {
  const table = wrapper.querySelector('table')
  const body = table?.tBodies[0]
  const head = table?.tHead?.rows[0]
  if (!table || !body || !head) return
  const tbody = body

  const { numeric, chips, sortColumn } = parseSpec(wrapper.dataset.modelsTable ?? '')
  const rows = [...tbody.rows]
  const originalOrder = rows.slice()
  const headers = [...head.cells].map((cell) => ({ cell, html: cell.innerHTML }))
  const defaultSort: { column: number; direction: 1 | -1 } | null =
    sortColumn == null ? null : { column: sortColumn, direction: 1 }
  let sort: { column: number; direction: 1 | -1 } | null = defaultSort

  const toolbar = document.createElement('div')
  toolbar.className = 'my-3 flex flex-wrap items-center gap-x-3 gap-y-2'

  const search = document.createElement('input')
  search.type = 'search'
  search.placeholder = labels.search
  search.setAttribute('aria-label', labels.search)
  search.className =
    'w-80 max-w-full rounded-lg border border-fd-border bg-fd-background px-2.5 py-1.5 text-sm text-fd-foreground outline-none placeholder:text-fd-muted-foreground focus-visible:ring-2 focus-visible:ring-fd-primary'

  const count = document.createElement('span')
  count.className = 'text-xs text-fd-muted-foreground'
  count.setAttribute('aria-live', 'polite')

  const chipList = document.createElement('div')
  chipList.className = 'flex flex-wrap items-center gap-1.5'

  const chipButtons = chips.map((chip) => {
    const button = document.createElement('button')
    button.type = 'button'
    button.textContent = chip.label
    button.setAttribute('aria-pressed', 'false')
    button.className =
      'cursor-pointer rounded-full border border-fd-border px-2.5 py-0.5 text-xs text-fd-muted-foreground transition-colors hover:text-fd-foreground aria-pressed:border-fd-primary aria-pressed:bg-fd-primary/10 aria-pressed:text-fd-primary'
    button.addEventListener('click', () => {
      button.setAttribute('aria-pressed', String(button.getAttribute('aria-pressed') !== 'true'))
      apply()
    })
    chipList.append(button)
    return { chip, button }
  })

  const reset = document.createElement('button')
  reset.type = 'button'
  reset.textContent = labels.reset
  reset.className =
    'cursor-pointer text-xs text-fd-muted-foreground underline underline-offset-2 hover:text-fd-foreground'
  reset.addEventListener('click', () => {
    search.value = ''
    for (const { button } of chipButtons) button.setAttribute('aria-pressed', 'false')
    sort = defaultSort
    updateHeaders()
    apply()
  })

  toolbar.append(search, count, chipList, reset)
  search.addEventListener('input', () => apply())

  const value = (row: HTMLTableRowElement, column: number) => row.cells[column]?.textContent?.trim() ?? ''

  function compare(a: HTMLTableRowElement, b: HTMLTableRowElement) {
    if (!sort) return 0
    const left = value(a, sort.column)
    const right = value(b, sort.column)
    if (numeric.has(sort.column)) {
      const leftNumber = Number(left.replaceAll(',', ''))
      const rightNumber = Number(right.replaceAll(',', ''))
      const leftValid = left !== '' && left !== '-' && Number.isFinite(leftNumber)
      const rightValid = right !== '' && right !== '-' && Number.isFinite(rightNumber)
      if (leftValid !== rightValid) return leftValid ? -1 : 1
      if (!leftValid) return 0
      return (leftNumber - rightNumber) * sort.direction
    }
    return left.localeCompare(right, locale) * sort.direction
  }

  const indicator = document.createElement('span')
  indicator.setAttribute('aria-hidden', 'true')
  indicator.dataset.sortIndicator = ''
  indicator.className = 'text-fd-primary'

  function updateHeaders() {
    for (const { cell } of headers) {
      cell.removeAttribute('aria-sort')
      cell.querySelector('[data-sort-indicator]')?.remove()
    }
    if (!sort) return
    const active = headers[sort.column]
    if (!active) return
    active.cell.setAttribute('aria-sort', sort.direction === 1 ? 'ascending' : 'descending')
    indicator.textContent = sort.direction === 1 ? '▲' : '▼'
    active.cell.querySelector('button')?.append(indicator)
  }

  function apply() {
    const query = search.value.trim().toLowerCase()
    const active = chipButtons.filter(({ button }) => button.getAttribute('aria-pressed') === 'true')
    let visible = 0
    for (const row of rows) {
      let show = !query || (row.textContent ?? '').toLowerCase().includes(query)
      if (show) {
        for (const { chip } of active) {
          if (!value(row, chip.column).includes(chip.needle)) {
            show = false
            break
          }
        }
      }
      row.hidden = !show
      if (show) visible += 1
    }
    if (sort) for (const row of rows.slice().sort(compare)) tbody.append(row)
    count.textContent = labels.showing(visible, rows.length)
  }

  for (const [column, { cell }] of headers.entries()) {
    const button = document.createElement('button')
    button.type = 'button'
    button.title = labels.sort
    button.className = 'inline-flex w-full cursor-pointer items-center gap-1 text-left hover:text-fd-primary'
    while (cell.firstChild) button.append(cell.firstChild)
    cell.append(button)
    button.addEventListener('click', () => {
      sort = sort?.column === column ? { column, direction: sort.direction === 1 ? -1 : 1 } : { column, direction: 1 }
      updateHeaders()
      apply()
    })
  }

  const container = wrapper.querySelector('[data-table-container]') ?? table
  container.before(toolbar)
  updateHeaders()
  apply()

  return () => {
    toolbar.remove()
    for (const { cell, html } of headers) {
      cell.innerHTML = html
      cell.removeAttribute('aria-sort')
    }
    for (const row of originalOrder) tbody.append(row)
    for (const row of rows) row.hidden = false
  }
}

export function ModelTableTools({ locale }: { locale: string }) {
  const pathname = usePathname()
  useEffect(() => {
    const language = locale === 'en' ? 'en' : 'zh-cn'
    const cleanups: Array<() => void> = []
    for (const wrapper of document.querySelectorAll<HTMLElement>('[data-models-table]')) {
      const cleanup = enhance(wrapper, language, LABELS[language])
      if (cleanup) cleanups.push(cleanup)
    }
    return () => {
      for (const cleanup of cleanups) cleanup()
    }
  }, [pathname, locale])
  return null
}
