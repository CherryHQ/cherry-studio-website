import { AnimatePresence, m } from 'framer-motion'
import { ArrowUpDown, Boxes, ChevronDown, Eye, Globe, Lightbulb, Pin, Search, Settings2, Wrench, X } from 'lucide-react'
import { type KeyboardEvent, type ReactNode, useEffect, useId, useMemo, useRef, useState } from 'react'

import { type Capability, modelSelectorDemo, type SelectorModel, selectorModels } from '@/content/demos/models'
import productStats from '@/content/product-stats.json'
import { ease } from '@/lib/motion'
import { cn } from '@/lib/utils'
import DemoFrame from '../primitives/DemoFrame'
import Kbd from '../primitives/Kbd'
import ProviderIcon from '../primitives/ProviderIcon'
import { useDemoLocale } from '../primitives/useDemoLocale'
import { useDemoPlayback, useDemoScript } from '../primitives/useDemoScript'

// Icons and colors from desktop components/tags/Model/*Tag.tsx; CustomTag tints the background at hex alpha 20.
const CAPS: Record<Capability, { Icon: typeof Eye; text: string; bg: string }> = {
  vision: { Icon: Eye, text: 'text-cap-vision', bg: 'bg-cap-vision/12' },
  reasoning: { Icon: Lightbulb, text: 'text-cap-reasoning dark:brightness-150', bg: 'bg-cap-reasoning/15' },
  tools: { Icon: Wrench, text: 'text-cap-tools', bg: 'bg-cap-tools/12' },
  web: { Icon: Globe, text: 'text-cap-web dark:brightness-125', bg: 'bg-cap-web/12' },
  embedding: { Icon: Boxes, text: 'text-cap-embedding', bg: 'bg-cap-embedding/12' },
  rerank: { Icon: ArrowUpDown, text: 'text-cap-rerank', bg: 'bg-cap-rerank/12' }
}
const CAP_ORDER: Capability[] = ['vision', 'reasoning', 'tools', 'web', 'embedding', 'rerank']

// Desktop HoverCard waits 1500ms; the demo shortens it so the card shows up while people are still looking.
const DETAIL_DELAY = 500
const numbers = new Intl.NumberFormat('en-US')

interface Row {
  key: string
  model: SelectorModel
  pinned: boolean
}

interface Group {
  key: string
  title: string
  rows: Row[]
}

const isMac = () =>
  typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent)

export default function ModelSelectorDemo() {
  const { locale } = useDemoLocale()
  const copy = modelSelectorDemo[locale]
  const ref = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const touched = useRef(false)
  const listboxId = useId()
  const playing = useDemoPlayback(ref)
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [tags, setTags] = useState<Capability[]>([])
  const [focusedKey, setFocusedKey] = useState('')
  const [detailKey, setDetailKey] = useState('')
  const [current, setCurrent] = useState(copy.initialModel)
  const [mac] = useState(isMac)

  const groups = useMemo<Group[]>(() => {
    const needle = query.trim().toLowerCase()
    const matches = (model: SelectorModel) =>
      tags.every((tag) => model.caps.includes(tag)) &&
      (!needle ||
        [model.name, model.id, copy.providers[model.provider]].some((value) => value.toLowerCase().includes(needle)))
    const visible = selectorModels.filter(matches)
    const pinnedRows = copy.pinnedIds
      .map((id) => visible.find((model) => model.id === id))
      .filter((model): model is SelectorModel => Boolean(model))
      .map((model) => ({ key: `pinned:${model.id}`, model, pinned: true }))
    const byProvider = new Map<string, Row[]>()
    for (const model of visible) {
      const rows = byProvider.get(model.provider) ?? []
      rows.push({ key: model.id, model, pinned: false })
      byProvider.set(model.provider, rows)
    }
    return [
      ...(pinnedRows.length ? [{ key: 'pinned', title: copy.pinned, rows: pinnedRows }] : []),
      ...[...byProvider].map(([provider, rows]) => ({ key: provider, title: copy.providers[provider], rows }))
    ]
  }, [copy, query, tags])

  const rows = useMemo(() => groups.flatMap((group) => group.rows), [groups])
  const focusedRow = rows.find((row) => row.key === focusedKey)
  const detailRow = rows.find((row) => row.key === detailKey)
  const currentModel = selectorModels.find((model) => model.id === current) ?? selectorModels[0]

  const { replay, reduced } = useDemoScript(async ({ wait, reduced }) => {
    touched.current = false
    setTags([])
    setCurrent(copy.initialModel)
    if (reduced) {
      setOpen(true)
      setQuery(copy.autoQuery)
      return
    }
    setOpen(false)
    setQuery('')
    setFocusedKey('')
    await wait(800)
    if (touched.current) return
    setOpen(true)
    await wait(650)
    for (let index = 1; index <= copy.autoQuery.length; index++) {
      if (touched.current) return
      setQuery(copy.autoQuery.slice(0, index))
      await wait(110)
    }
  }, playing)

  // Like desktop, a changed query or filter moves focus back to the first match.
  useEffect(() => {
    if (open) setFocusedKey(rows[0]?.key ?? '')
  }, [open, rows])

  useEffect(() => {
    setDetailKey('')
    if (!open || !focusedKey) return
    const timer = setTimeout(() => setDetailKey(focusedKey), reduced ? 0 : DETAIL_DELAY)
    return () => clearTimeout(timer)
  }, [open, focusedKey, reduced])

  // Scroll only the list; scrollIntoView would also move the page while the demo autoplays.
  useEffect(() => {
    const list = listRef.current
    const option = list?.querySelector<HTMLElement>(`[data-key="${CSS.escape(focusedKey)}"]`)
    if (!list || !option) return
    const top = option.offsetTop - 28
    const bottom = option.offsetTop + option.offsetHeight
    if (top < list.scrollTop) list.scrollTop = top
    else if (bottom > list.scrollTop + list.clientHeight) list.scrollTop = bottom - list.clientHeight
  }, [focusedKey])

  useEffect(() => {
    if (!open) return
    const close = (event: PointerEvent) => {
      const target = event.target as Node
      if (panelRef.current?.contains(target) || triggerRef.current?.contains(target)) return
      setOpen(false)
    }
    document.addEventListener('pointerdown', close)
    return () => document.removeEventListener('pointerdown', close)
  }, [open])

  const take = () => {
    touched.current = true
  }

  const openPanel = () => {
    take()
    setQuery('')
    setOpen(true)
    requestAnimationFrame(() => inputRef.current?.focus({ preventScroll: true }))
  }

  const closePanel = (refocus = true) => {
    setOpen(false)
    if (refocus) triggerRef.current?.focus({ preventScroll: true })
  }

  const select = (row: Row) => {
    take()
    setCurrent(row.model.id)
    closePanel()
  }

  const onRegionKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if ((event.metaKey || event.ctrlKey) && event.shiftKey && event.key.toLowerCase() === 'm') {
      event.preventDefault()
      if (open) closePanel()
      else openPanel()
    } else if (event.key === 'Escape' && open) {
      take()
      closePanel()
    }
  }

  const onSearchKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.nativeEvent.isComposing) return
    const index = rows.findIndex((row) => row.key === focusedKey)
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault()
      take()
      if (!rows.length) return
      const step = event.key === 'ArrowDown' ? 1 : -1
      setFocusedKey(rows[(index < 0 ? 0 : index + step + rows.length) % rows.length].key)
    } else if (event.key === 'Enter') {
      event.preventDefault()
      if (rows[index]) select(rows[index])
    } else if (event.key === 'Escape') {
      event.preventDefault()
      take()
      closePanel()
    }
  }

  const toggleTag = (tag: Capability) => {
    take()
    setTags((previous) => (previous.includes(tag) ? previous.filter((item) => item !== tag) : [...previous, tag]))
  }

  const optionId = (key: string) => `${listboxId}-${key.replace(/[^\w-]/g, '_')}`

  const shortcut = mac ? ['⌘', '⇧', 'M'] : ['Ctrl', 'Shift', 'M']

  return (
    <div ref={ref} role="region" aria-label={copy.window} onKeyDown={onRegionKeyDown}>
      <DemoFrame title={copy.window} onReplay={replay} bodyClassName="h-[440px]">
        <div className="@container relative flex h-full flex-col">
          <div className="flex h-10 shrink-0 items-center gap-2 border-b border-border px-3 text-xs">
            <button
              ref={triggerRef}
              type="button"
              aria-haspopup="listbox"
              aria-expanded={open}
              aria-label={`${copy.selectModel}: ${currentModel.name}`}
              onClick={() => (open ? closePanel(false) : openPanel())}
              className={cn(
                'inline-flex h-7 cursor-pointer items-center gap-1.5 rounded-md px-1.5 font-medium transition-colors duration-150 hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
                open && 'bg-accent'
              )}>
              <span className="flex size-5 shrink-0 items-center justify-center rounded-full border border-border bg-background">
                <ProviderIcon id={currentModel.provider} className="size-3" />
              </span>
              <span className="max-w-52 truncate">{currentModel.name}</span>
              <ChevronDown className="size-3.5 text-muted-foreground" aria-hidden="true" />
            </button>
          </div>

          <div
            className={cn(
              'flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center transition-opacity duration-200',
              open && 'opacity-0'
            )}>
            <p className="text-gradient text-lg font-semibold tracking-tight" aria-hidden="true">
              {currentModel.name}
            </p>
            <p className="flex flex-wrap items-center justify-center gap-1.5 text-xs text-muted-foreground">
              <span className="inline-flex gap-1">
                {shortcut.map((key) => (
                  <Kbd key={key}>{key}</Kbd>
                ))}
              </span>
              {copy.hint}
            </p>
          </div>

          <AnimatePresence>
            {open && (
              <div className="absolute top-11 left-2 z-20 flex gap-2 sm:left-3">
                <m.div
                  ref={panelRef}
                  initial={{ opacity: 0, scale: 0.95, y: -8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.12, ease: 'easeIn' } }}
                  transition={{ duration: 0.15, ease: ease.expo }}
                  className="flex h-[380px] w-[min(400px,calc(100cqw-16px))] origin-top-left flex-col overflow-hidden rounded-lg border-[0.5px] border-border bg-popover pt-1 shadow-(--shadow-float)">
                  <div className="flex h-9 shrink-0 items-center gap-2 border-b border-border/60 px-3">
                    <div className="relative min-w-0 flex-1">
                      <Search
                        className="pointer-events-none absolute top-1/2 left-0 size-3.5 -translate-y-1/2 text-muted-foreground"
                        aria-hidden="true"
                      />
                      <input
                        ref={inputRef}
                        type="text"
                        role="combobox"
                        aria-expanded={open}
                        aria-controls={listboxId}
                        aria-activedescendant={focusedRow ? optionId(focusedRow.key) : undefined}
                        aria-label={copy.searchPlaceholder}
                        spellCheck={false}
                        value={query}
                        placeholder={copy.searchPlaceholder}
                        onChange={(event) => {
                          take()
                          setQuery(event.target.value)
                        }}
                        onKeyDown={onSearchKeyDown}
                        className="h-7 w-full rounded-md bg-transparent py-0 pr-6 pl-5 text-xs leading-7 outline-none placeholder:text-muted-foreground focus-visible:outline-1 focus-visible:outline-offset-1 focus-visible:outline-primary/60"
                      />
                      {query && (
                        <button
                          type="button"
                          aria-label={copy.clear}
                          onMouseDown={(event) => event.preventDefault()}
                          onClick={() => {
                            take()
                            setQuery('')
                            inputRef.current?.focus()
                          }}
                          className="absolute top-1/2 right-0 flex size-[22px] -translate-y-1/2 cursor-pointer items-center justify-center rounded-md text-muted-foreground hover:bg-accent/40 hover:text-foreground focus-visible:outline-2 focus-visible:outline-primary">
                          <X className="size-2.5" aria-hidden="true" />
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-1.5 overflow-x-auto border-b border-border/60 px-3 py-2 [mask-image:linear-gradient(to_right,black_calc(100%-24px),transparent)] [scrollbar-width:none]">
                    {CAP_ORDER.map((tag) => {
                      const { Icon, text, bg } = CAPS[tag]
                      const active = tags.includes(tag)
                      return (
                        <button
                          key={tag}
                          type="button"
                          aria-pressed={active}
                          onClick={() => toggleTag(tag)}
                          className={cn(
                            'inline-flex h-5 shrink-0 cursor-pointer items-center gap-1 rounded-full px-2 text-[10px] leading-none whitespace-nowrap transition-colors duration-200 hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary',
                            active ? cn(text, bg) : 'bg-muted-foreground/10 text-muted-foreground'
                          )}>
                          <Icon className="size-2.5" aria-hidden="true" />
                          {copy.capabilities[tag]}
                        </button>
                      )
                    })}
                  </div>

                  <div
                    ref={listRef}
                    id={listboxId}
                    role="listbox"
                    tabIndex={-1}
                    aria-label={copy.selectModel}
                    className="relative min-h-0 flex-1 overflow-y-auto py-1 [scrollbar-width:thin]">
                    {groups.length === 0 && (
                      <p className="flex h-full items-center justify-center text-xs text-muted-foreground">
                        {copy.noMatches}
                      </p>
                    )}
                    {groups.map((group) => (
                      <div key={group.key}>
                        <p className="sticky top-0 z-1 flex h-7 items-center gap-1.5 bg-popover px-4 text-[11px] text-muted-foreground">
                          {group.key === 'pinned' && <Pin className="size-3 -rotate-45" aria-hidden="true" />}
                          {group.title}
                        </p>
                        {group.rows.map((row) => {
                          const selected = row.model.id === current
                          const focused = row.key === focusedKey
                          return (
                            <div key={row.key} className="px-1.5">
                              <button
                                id={optionId(row.key)}
                                data-key={row.key}
                                type="button"
                                role="option"
                                aria-selected={selected}
                                tabIndex={-1}
                                onMouseEnter={() => setFocusedKey(row.key)}
                                onFocus={() => setFocusedKey(row.key)}
                                onClick={() => select(row)}
                                className={cn(
                                  'relative flex h-8 w-full cursor-pointer items-center gap-2 rounded-[10px] px-2 py-1 text-left text-xs transition-colors duration-100',
                                  selected && 'bg-accent/70 text-accent-foreground',
                                  !selected && focused && 'bg-accent/60',
                                  !selected && !focused && 'text-foreground'
                                )}>
                                {selected && (
                                  <span
                                    aria-hidden="true"
                                    className="absolute top-1/2 left-0 h-[60%] w-0.75 -translate-y-1/2 rounded-full bg-primary"
                                  />
                                )}
                                <span className="flex size-6 shrink-0 items-center justify-center rounded-full border border-border bg-background">
                                  <ProviderIcon id={row.model.provider} className="size-3.5" />
                                </span>
                                <span className="flex min-w-0 flex-1 items-center gap-1.5 overflow-hidden">
                                  <span className="max-w-full shrink-0 truncate">{row.model.name}</span>
                                  {row.pinned && (
                                    <span className="min-w-0 flex-[1_999_0%] truncate text-muted-foreground">
                                      | {copy.providers[row.model.provider]}
                                    </span>
                                  )}
                                </span>
                                <span className="ml-2 flex h-[18px] shrink-0 items-center gap-1" aria-hidden="true">
                                  {row.model.caps.map((tag) => {
                                    const { Icon, text, bg } = CAPS[tag]
                                    return (
                                      <span
                                        key={tag}
                                        className={cn('flex h-full items-center rounded-full px-[7px]', text, bg)}>
                                        <Icon className="size-[9px]" />
                                      </span>
                                    )
                                  })}
                                </span>
                                <Pin
                                  aria-hidden="true"
                                  className={cn(
                                    'size-3 shrink-0',
                                    row.pinned || copy.pinnedIds.includes(row.model.id)
                                      ? '-rotate-45 text-foreground'
                                      : 'text-transparent'
                                  )}
                                />
                              </button>
                            </div>
                          )
                        })}
                      </div>
                    ))}
                  </div>

                  <div className="flex shrink-0 items-center gap-2 border-t border-border/60 p-1">
                    <span className="flex min-w-0 flex-1 items-center gap-2 rounded-md px-2 py-1.5 text-xs text-muted-foreground">
                      <Settings2 className="size-3.5 shrink-0" aria-hidden="true" />
                      <span className="truncate">{copy.configureCustom}</span>
                    </span>
                    <span className="shrink-0 px-2 font-mono text-[10px] text-muted-foreground tabular-nums">
                      {copy.footer(productStats.labels.providers, productStats.labels.models)}
                    </span>
                  </div>
                </m.div>

                <AnimatePresence>
                  {detailRow && (
                    <m.div
                      key={detailRow.key}
                      aria-hidden="true"
                      initial={{ opacity: 0, x: -8, y: detailOffset(listRef.current, detailRow.key), scale: 0.97 }}
                      animate={{ opacity: 1, x: 0, y: detailOffset(listRef.current, detailRow.key), scale: 1 }}
                      exit={{ opacity: 0, transition: { duration: 0.1 } }}
                      transition={{ duration: 0.15, ease: ease.expo }}
                      className="hidden w-84 origin-left self-start rounded-lg border-[0.5px] border-border bg-popover p-3 shadow-(--shadow-float) @3xl:block">
                      <p className="text-sm font-medium text-foreground">{detailRow.model.name}</p>
                      <dl className="mt-3 space-y-1.5 border-t border-border pt-3">
                        <DetailRow label={copy.detail.provider} value={copy.providers[detailRow.model.provider]} />
                        <DetailRow
                          label={copy.detail.modelId}
                          value={<span className="font-mono">{detailRow.model.id}</span>}
                        />
                      </dl>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {detailRow.model.caps.map((tag) => {
                          const { Icon, text, bg } = CAPS[tag]
                          return (
                            <span
                              key={tag}
                              className={cn(
                                'inline-flex h-5 items-center gap-1 rounded-full px-2 text-[10px] leading-none',
                                text,
                                bg
                              )}>
                              <Icon className="size-2.5" />
                              {copy.capabilities[tag]}
                            </span>
                          )
                        })}
                      </div>
                      <dl className="mt-3 space-y-1.5 border-t border-border pt-3">
                        <DetailRow label={copy.detail.contextWindow} value={numbers.format(detailRow.model.context)} />
                        {detailRow.model.maxOutput && (
                          <DetailRow label={copy.detail.maxOutput} value={numbers.format(detailRow.model.maxOutput)} />
                        )}
                      </dl>
                    </m.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </AnimatePresence>
        </div>
      </DemoFrame>
    </div>
  )
}

// Aligns the card's top with the hovered row, clamped so it stays inside the demo body.
function detailOffset(list: HTMLDivElement | null, key: string) {
  const option = list?.querySelector<HTMLElement>(`[data-key="${CSS.escape(key)}"]`)
  if (!list || !option) return 0
  const top = list.offsetTop + option.offsetTop - list.scrollTop
  return Math.max(0, Math.min(top, 380 - 236))
}

function DetailRow({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="grid grid-cols-[6.75rem_minmax(0,1fr)] gap-3 text-xs leading-5">
      <dt className="truncate text-muted-foreground">{label}</dt>
      <dd className="min-w-0 truncate text-foreground">{value}</dd>
    </div>
  )
}
