'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

// Progressive enhancement for the model reference tables. The generator
// (.github/scripts/fetch_models.mjs) marks each table with data-models-table and embeds the toolbar
// spec `num:<columns>;sort:<column>;search:<columns>;cap:<column>:<label>[,…];in:…;out:…`,
// so the labels and column layout live in the generator and this component stays format-only.

type Labels = {
  search: string
  clear: string
  reset: string
  sort: string
  showing: (visible: number, total: number) => string
  elsewhere: (count: number) => string
  more: (count: number) => string
  category: (title: string) => string
  separator: string
}

const LABELS: Record<'zh-cn' | 'en', Labels> = {
  'zh-cn': {
    search: '搜索模型名称、API ID 或服务商…',
    clear: '清除',
    reset: '重置',
    sort: '点击排序',
    showing: (visible, total) => `显示 ${visible} / ${total}`,
    elsewhere: (count) => `其他分类中还有 ${count} 个匹配：`,
    more: (count) => `（另有 ${count} 个）`,
    category: (title) => `（${title}）`,
    separator: '、'
  },
  en: {
    search: 'Search by model, API ID or provider…',
    clear: 'Clear',
    reset: 'Reset',
    sort: 'Click to sort',
    showing: (visible, total) => `${visible} / ${total} shown`,
    elsewhere: (count) => `Also found in other categories (${count}): `,
    more: (count) => ` (+${count} more)`,
    category: (title) => ` (${title})`,
    separator: ', '
  }
}

const NOTICE_LIMIT = 8

type Chip = { label: string; column: number; needle: string }

function parseSpec(value: string) {
  const numeric = new Set<number>()
  const chips: Chip[] = []
  let sortColumn: number | null = null
  let searchColumns: number[] | null = null
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
    if (key === 'search') {
      searchColumns = rest.split(',').map(Number)
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
  return { numeric, chips, sortColumn, searchColumns }
}

const escapeRegExp = (text: string) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

// "qwen 3.7" also matches "Qwen3.7" and "qwen-3-7": whitespace in the query stands for any
// separator or none, everything else stays literal.
function buildMatcher(query: string) {
  const chunks = query.trim().split(/\s+/).filter(Boolean).map(escapeRegExp)
  if (!chunks.length) return null
  return new RegExp(chunks.join('[\\s\\-_.·/－．／]*'), 'i')
}

type IndexModel = { name: string; id: string; provider: string; category: string }
type SearchIndex = { pages: { file: string; title: string }[]; models: IndexModel[] }

const indexCache = new Map<string, Promise<SearchIndex | null>>()

function loadIndex(language: string) {
  if (!indexCache.has(language)) {
    indexCache.set(
      language,
      fetch(`/docs/models-search/${language}.json`)
        .then((response) => (response.ok ? (response.json() as Promise<SearchIndex>) : null))
        .catch(() => null)
    )
  }
  return indexCache.get(language) as Promise<SearchIndex | null>
}

function enhance(wrapper: HTMLElement, language: 'zh-cn' | 'en', pathname: string, labels: Labels) {
  const table = wrapper.querySelector('table')
  const body = table?.tBodies[0]
  const head = table?.tHead?.rows[0]
  if (!table || !body || !head) return
  const tbody = body

  const { numeric, chips, sortColumn, searchColumns } = parseSpec(wrapper.dataset.modelsTable ?? '')
  const rows = [...tbody.rows]
  const originalOrder = rows.slice()
  const headers = [...head.cells].map((cell) => ({ cell, html: cell.innerHTML }))
  const searchText = rows.map((row) =>
    (searchColumns
      ? searchColumns.map((column) => row.cells[column]?.textContent ?? '').join(' ')
      : (row.textContent ?? '')
    ).toLowerCase()
  )
  const segments = pathname.split('/').filter(Boolean)
  const marker = segments.indexOf('models-info')
  const currentCategory = marker >= 0 ? (segments[marker + 1] ?? null) : null

  const defaultSort: { column: number; direction: 1 | -1 } | null =
    sortColumn == null ? null : { column: sortColumn, direction: 1 }
  let sort: { column: number; direction: 1 | -1 } | null = defaultSort
  let searchIndex: SearchIndex | null = null
  let indexRequested = false

  const toolbar = document.createElement('div')
  toolbar.className = 'my-3 flex flex-wrap items-center gap-x-3 gap-y-2'

  const searchWrap = document.createElement('div')
  searchWrap.className = 'relative inline-flex max-w-full'
  const search = document.createElement('input')
  search.type = 'search'
  search.placeholder = labels.search
  search.setAttribute('aria-label', labels.search)
  search.autocapitalize = 'off'
  search.setAttribute('autocorrect', 'off')
  search.spellcheck = false
  search.className =
    'w-80 max-w-full rounded-lg border border-fd-border bg-fd-background py-1.5 pr-8 pl-2.5 text-sm text-fd-foreground outline-none placeholder:text-fd-muted-foreground focus-visible:ring-2 focus-visible:ring-fd-primary [&::-webkit-search-cancel-button]:appearance-none'
  const clear = document.createElement('button')
  clear.type = 'button'
  clear.textContent = '✕'
  clear.setAttribute('aria-label', labels.clear)
  clear.className =
    'absolute top-1/2 right-2 flex h-5 w-5 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full text-xs text-fd-muted-foreground hover:text-fd-foreground'
  clear.addEventListener('click', () => {
    search.value = ''
    apply()
    search.focus()
  })
  searchWrap.append(search, clear)

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

  const notice = document.createElement('p')
  notice.className = 'my-3 text-sm text-fd-muted-foreground'
  notice.setAttribute('role', 'status')
  notice.hidden = true

  toolbar.append(searchWrap, count, chipList, reset)
  search.addEventListener('input', () => apply())
  search.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      search.value = ''
      apply()
    }
  })

  const initialQuery = new URLSearchParams(window.location.search).get('q')
  if (initialQuery) search.value = initialQuery

  function ensureIndex() {
    if (indexRequested) return
    indexRequested = true
    void loadIndex(language).then((data) => {
      searchIndex = data
      apply()
    })
  }

  // Hovering an abbreviated value shows the exact number; sorting uses it when present.
  const numericValue = (row: HTMLTableRowElement, column: number) => {
    const cell = row.cells[column]
    const source = (cell?.querySelector('[title]')?.getAttribute('title') ?? cell?.textContent ?? '').trim()
    if (!source || source === '-') return null
    const match = /^([\d.,]+)\s*([KM])?$/.exec(source)
    if (!match) return null
    const amount = Number(match[1].replaceAll(',', ''))
    if (!Number.isFinite(amount)) return null
    return amount * (match[2] === 'K' ? 1000 : match[2] === 'M' ? 1000000 : 1)
  }

  function compare(a: HTMLTableRowElement, b: HTMLTableRowElement) {
    if (!sort) return 0
    if (numeric.has(sort.column)) {
      const left = numericValue(a, sort.column)
      const right = numericValue(b, sort.column)
      if (left == null || right == null) {
        if (left === right) return 0
        return left == null ? 1 : -1
      }
      return (left - right) * sort.direction
    }
    const left = (a.cells[sort.column]?.textContent ?? '').trim()
    const right = (b.cells[sort.column]?.textContent ?? '').trim()
    return left.localeCompare(right, language) * sort.direction
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

  function updateNotice(query: string, currentMatches: number) {
    notice.replaceChildren()
    notice.hidden = true
    if (!query || currentMatches > 0 || !searchIndex) return
    const matcher = buildMatcher(query)
    if (!matcher) return
    const matches = searchIndex.models.filter(
      (model) => model.category !== currentCategory && matcher.test(`${model.name} ${model.id} ${model.provider}`)
    )
    if (!matches.length) return
    const shown = matches.slice(0, NOTICE_LIMIT)
    notice.append(document.createTextNode(labels.elsewhere(matches.length)))
    shown.forEach((model, index) => {
      if (index) notice.append(document.createTextNode(labels.separator))
      const link = document.createElement('a')
      link.href = `/docs/${language}/other/models-info/${model.category}/?q=${encodeURIComponent(query)}`
      link.textContent = model.name
      link.className = 'text-fd-primary underline underline-offset-2'
      notice.append(link)
      const page = searchIndex?.pages.find((entry) => entry.file === model.category)
      if (page) notice.append(document.createTextNode(labels.category(page.title)))
    })
    if (matches.length > shown.length)
      notice.append(document.createTextNode(labels.more(matches.length - shown.length)))
    notice.hidden = false
  }

  function apply() {
    const query = search.value.trim()
    const matcher = buildMatcher(query)
    const active = chipButtons.filter(({ button }) => button.getAttribute('aria-pressed') === 'true')
    let visible = 0
    let queryMatches = 0
    for (const [index, row] of rows.entries()) {
      const matchesQuery = !matcher || matcher.test(searchText[index])
      let show = matchesQuery
      if (show) {
        for (const { chip } of active) {
          if (!(row.cells[chip.column]?.textContent ?? '').includes(chip.needle)) {
            show = false
            break
          }
        }
      }
      row.hidden = !show
      if (show) visible += 1
      if (matchesQuery) queryMatches += 1
    }
    if (sort) for (const row of rows.slice().sort(compare)) tbody.append(row)
    count.textContent = labels.showing(visible, rows.length)
    clear.hidden = search.value === ''
    if (query) ensureIndex()
    updateNotice(query, queryMatches)
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
  toolbar.after(notice)
  updateHeaders()
  apply()

  return () => {
    toolbar.remove()
    notice.remove()
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
      const cleanup = enhance(wrapper, language, pathname, LABELS[language])
      if (cleanup) cleanups.push(cleanup)
    }
    return () => {
      for (const cleanup of cleanups) cleanup()
    }
  }, [pathname, locale])
  return null
}
