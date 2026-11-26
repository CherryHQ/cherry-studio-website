import { AnimatePresence, m } from 'framer-motion'
import {
  ArrowUpDown,
  Boxes,
  ChevronDown,
  Eye,
  Globe,
  Lightbulb,
  Maximize2,
  Minimize2,
  Pin,
  Search,
  Settings2,
  Wrench,
  X
} from 'lucide-react'
import { type KeyboardEvent, type ReactNode, useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from 'react'

import { type Capability, modelSelectorDemo, type SelectorModel, selectorModels } from '@/content/demos/models'
import { ease } from '@/lib/motion'
import { cn } from '@/lib/utils'
import DemoFrame from '../primitives/DemoFrame'
import { useDemoLocale } from '../primitives/useDemoLocale'
import { useDemoPlayback, useDemoScript } from '../primitives/useDemoScript'
import ModelLogo from './ModelLogo'

// Icons and colors from desktop components/tags/Model/*Tag.tsx; CustomTag tints the background with hex alpha 20.
const CAPS: Record<Capability, { Icon: typeof Eye; text: string; bg: string }> = {
  vision: { Icon: Eye, text: 'text-cap-vision', bg: 'bg-cap-vision/[0.125]' },
  reasoning: { Icon: Lightbulb, text: 'text-cap-reasoning', bg: 'bg-cap-reasoning/[0.125]' },
  tools: { Icon: Wrench, text: 'text-cap-tools', bg: 'bg-cap-tools/[0.125]' },
  web: { Icon: Globe, text: 'text-cap-web', bg: 'bg-cap-web/[0.125]' },
  embedding: { Icon: Boxes, text: 'text-cap-embedding', bg: 'bg-cap-embedding/[0.125]' },
  rerank: { Icon: ArrowUpDown, text: 'text-cap-rerank', bg: 'bg-cap-rerank/[0.125]' }
}
// Desktop MODEL_DISPLAY_TAGS order: input modalities, capabilities, then web search.
const CAP_ORDER: Capability[] = ['vision', 'reasoning', 'tools', 'embedding', 'rerank', 'web']
const AVAILABLE_TAGS = CAP_ORDER.filter((tag) => selectorModels.some((model) => model.caps.includes(tag)))

// Desktop HoverCard waits 1500ms; the demo shortens it so the card shows up while people are still looking.
const DETAIL_DELAY = 500
const PANEL_WIDTH = 400
const PANEL_HEIGHT = 380
const GROUP_HEADER_HEIGHT = 28
const PAGE_SIZE = 12
const numbers = new Intl.NumberFormat('en-US')

interface Row {
  key: string
  model: SelectorModel
  inPinnedGroup: boolean
}

interface Group {
  key: string
  title: string
  provider?: string
  rows: Row[]
}

export default function ModelSelectorDemo() {
  const { locale } = useDemoLocale()
  const copy = modelSelectorDemo[locale]
  const ref = useRef<HTMLDivElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const touched = useRef(false)
  const listboxId = useId()
  const playing = useDemoPlayback(ref)
  const [open, setOpen] = useState(false)
  const [dialog, setDialog] = useState(false)
  const [query, setQuery] = useState('')
  const [tags, setTags] = useState<Capability[]>([])
  const [pinnedIds, setPinnedIds] = useState(copy.pinnedIds)
  const [focusedKey, setFocusedKey] = useState('')
  const [detailKey, setDetailKey] = useState('')
  const [current, setCurrent] = useState(copy.initialModel)
  const [panelLeft, setPanelLeft] = useState(0)

  const groups = useMemo<Group[]>(() => {
    const needle = query.trim().toLowerCase()
    const matches = (model: SelectorModel) =>
      tags.every((tag) => model.caps.includes(tag)) &&
      (!needle ||
        [model.name, model.id, copy.providers[model.provider]].some((value) => value.toLowerCase().includes(needle)))
    const visible = selectorModels.filter(matches)
    // Like desktop useModelSelectorData: the pinned group only shows without a query, and then owns those rows.
    const showPinned = !needle
    const pinnedRows = showPinned
      ? pinnedIds
          .map((id) => visible.find((model) => model.id === id))
          .filter((model): model is SelectorModel => Boolean(model))
          .map((model) => ({ key: `${model.id}_pinned`, model, inPinnedGroup: true }))
      : []
    const byProvider = new Map<string, Row[]>()
    for (const model of visible) {
      if (showPinned && pinnedIds.includes(model.id)) continue
      const rows = byProvider.get(model.provider) ?? []
      rows.push({ key: model.id, model, inPinnedGroup: false })
      byProvider.set(model.provider, rows)
    }
    return [
      ...(pinnedRows.length ? [{ key: 'pinned', title: copy.pinned, rows: pinnedRows }] : []),
      ...[...byProvider].map(([provider, rows]) => ({ key: provider, title: copy.providers[provider], provider, rows }))
    ]
  }, [copy, query, tags, pinnedIds])

  const rows = useMemo(() => groups.flatMap((group) => group.rows), [groups])
  const focusedRow = rows.find((row) => row.key === focusedKey)
  const detailRow = rows.find((row) => row.key === detailKey)
  const currentModel = selectorModels.find((model) => model.id === current) ?? selectorModels[0]

  const { replay, reduced } = useDemoScript(async ({ wait, reduced }) => {
    touched.current = false
    setTags([])
    setDialog(false)
    setPinnedIds(copy.pinnedIds)
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
    await wait(900)
    for (let index = 1; index <= copy.autoQuery.length; index++) {
      if (touched.current) return
      setQuery(copy.autoQuery.slice(0, index))
      await wait(110)
    }
  }, playing)

  // Desktop focuses the selected model on open, and the first match once a query or tag filter is set.
  const filtering = query.trim().length > 0 || tags.length > 0
  const navigationKey = rows.map((row) => row.key).join('|')
  useEffect(() => {
    if (!open) return
    const target = filtering ? rows[0] : (rows.find((row) => row.model.id === current) ?? rows[0])
    setFocusedKey(target?.key ?? '')
    scrollToRow(target?.key, 'start')
  }, [open, navigationKey])

  useEffect(() => {
    setDetailKey('')
    if (!open || dialog || !focusedKey) return
    const timer = setTimeout(() => setDetailKey(focusedKey), reduced ? 0 : DETAIL_DELAY)
    return () => clearTimeout(timer)
  }, [open, dialog, focusedKey, reduced])

  // The popover opens under the trigger but stays inside the window, like Radix collision padding.
  useLayoutEffect(() => {
    if (!open) return
    const place = () => {
      const body = bodyRef.current
      const trigger = triggerRef.current
      if (!body || !trigger) return
      const left = trigger.getBoundingClientRect().left - body.getBoundingClientRect().left
      setPanelLeft(Math.max(8, Math.min(left, body.clientWidth - PANEL_WIDTH - 8)))
    }
    place()
    window.addEventListener('resize', place)
    return () => window.removeEventListener('resize', place)
  }, [open])

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

  // Scroll only the list; scrollIntoView would also move the page while the demo autoplays.
  function scrollToRow(key: string | undefined, align: 'start' | 'auto' = 'auto') {
    requestAnimationFrame(() => {
      const list = listRef.current
      const option = key ? list?.querySelector<HTMLElement>(`[data-key="${CSS.escape(key)}"]`) : null
      if (!list || !option) return
      const top = option.offsetTop - GROUP_HEADER_HEIGHT
      const bottom = option.offsetTop + option.offsetHeight
      if (align === 'start' || top < list.scrollTop) list.scrollTop = top
      else if (bottom > list.scrollTop + list.clientHeight) list.scrollTop = bottom - list.clientHeight
    })
  }

  const take = () => {
    touched.current = true
  }

  const openPanel = () => {
    take()
    setQuery('')
    setTags([])
    setOpen(true)
    requestAnimationFrame(() => inputRef.current?.focus({ preventScroll: true }))
  }

  const closePanel = (refocus = true) => {
    setOpen(false)
    setQuery('')
    setTags([])
    if (refocus) triggerRef.current?.focus({ preventScroll: true })
  }

  const select = (row: Row) => {
    take()
    setCurrent(row.model.id)
    closePanel()
  }

  const togglePin = (id: string) => {
    take()
    setPinnedIds((previous) => (previous.includes(id) ? previous.filter((item) => item !== id) : [...previous, id]))
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
    const at = index < 0 ? 0 : index
    let next = -1
    if (event.key === 'ArrowDown') next = index < 0 ? 0 : (index + 1) % rows.length
    else if (event.key === 'ArrowUp') next = (at - 1 + rows.length) % rows.length
    else if (event.key === 'PageDown') next = Math.min(rows.length - 1, at + PAGE_SIZE)
    else if (event.key === 'PageUp') next = Math.max(0, at - PAGE_SIZE)
    else if (event.key === 'Enter') {
      event.preventDefault()
      if (rows[index]) select(rows[index])
      return
    } else if (event.key === 'Escape') {
      event.preventDefault()
      take()
      closePanel()
      return
    } else return
    event.preventDefault()
    take()
    if (!rows[next]) return
    setFocusedKey(rows[next].key)
    scrollToRow(rows[next].key)
  }

  const toggleTag = (tag: Capability) => {
    take()
    setTags((previous) => (previous.includes(tag) ? previous.filter((item) => item !== tag) : [...previous, tag]))
  }

  const optionId = (key: string) => `${listboxId}-${key.replace(/[^\w-]/g, '_')}`

  return (
    <div ref={ref} role="region" aria-label={copy.window} onKeyDown={onRegionKeyDown}>
      <DemoFrame title={copy.window} onReplay={replay} bodyClassName="h-[440px]">
        <div ref={bodyRef} className="@container relative flex h-full flex-col">
          {/* Desktop ChatNavbar: sidebar toggle, then the conversation controls portal; it turns icon-only when crowded. */}
          <div className="flex h-11 shrink-0 items-center border-b border-border px-2">
            <span
              aria-hidden="true"
              title={copy.showSidebar}
              className="flex size-[30px] shrink-0 items-center justify-center rounded-md text-muted-foreground">
              <svg viewBox="0 0 24 24" fill="none" className="size-[18px]">
                <rect x="3.5" y="4" width="17" height="16" rx="4" stroke="currentColor" strokeWidth="1.7" />
                <path d="M9.5 5v14" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7" />
              </svg>
            </span>
            <div className="ml-2 flex min-w-0 flex-1 items-center gap-1.5 overflow-hidden text-xs font-medium">
              <span
                aria-hidden="true"
                className="inline-flex h-7 shrink-0 items-center gap-1.5 rounded-lg px-1.5 @max-md:w-8 @max-md:justify-center">
                <span className="text-[17px] leading-none">😀</span>
                <span className="max-w-40 truncate @max-md:sr-only">{copy.assistant}</span>
                <ChevronDown className="size-3.5 text-muted-foreground @max-md:hidden" />
              </span>
              <button
                ref={triggerRef}
                type="button"
                aria-haspopup="listbox"
                aria-expanded={open}
                aria-keyshortcuts="Meta+Shift+M Control+Shift+M"
                aria-label={`${copy.selectModel}: ${currentModel.name}`}
                onClick={() => (open ? closePanel(false) : openPanel())}
                className={cn(
                  'inline-flex h-7 min-w-0 cursor-pointer items-center gap-1.5 rounded-lg px-1.5 transition-colors @max-md:w-8 @max-md:justify-center duration-150 hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
                  open && 'bg-accent'
                )}>
                <ModelLogo name={currentModel.name} provider={currentModel.provider} className="size-5" />
                <span className="max-w-52 truncate @max-md:sr-only">
                  {currentModel.name} | {copy.providers[currentModel.provider]}
                </span>
                <ChevronDown className="size-3.5 shrink-0 text-muted-foreground @max-md:hidden" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Desktop ConversationGreeting for an empty topic. */}
          <div
            className="flex flex-1 flex-col items-center justify-center gap-4 px-6 pb-10 text-center"
            aria-hidden="true">
            <span className="text-[44px] leading-none">😀</span>
            <p className="text-lg font-medium text-foreground">{copy.greeting}</p>
          </div>

          <AnimatePresence>
            {open && dialog && (
              <m.div
                key="overlay"
                aria-hidden="true"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-10 bg-black/50"
              />
            )}
            {open && (
              <div
                className={cn('absolute z-20 flex gap-2', dialog ? 'inset-x-3 top-[30px] justify-center' : 'top-12')}
                style={dialog ? undefined : { left: panelLeft }}>
                <m.div
                  ref={panelRef}
                  initial={{ opacity: 0, scale: 0.95, y: dialog ? 0 : -8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.12, ease: 'easeIn' } }}
                  transition={{ duration: 0.15, ease: ease.expo }}
                  style={{ height: PANEL_HEIGHT }}
                  className={cn(
                    'flex flex-col overflow-hidden rounded-lg border-[0.5px] border-border bg-popover pt-1 shadow-lg',
                    dialog ? 'w-[min(560px,100%)] origin-center' : 'w-[min(400px,calc(100cqw-16px))] origin-top-left'
                  )}>
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
                        className="h-7 w-full rounded-md bg-transparent py-0 pr-6 pl-5 text-xs leading-7 outline-none placeholder:text-muted-foreground focus-visible:outline-1 focus-visible:outline-offset-1 focus-visible:outline-primary/40"
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

                  <div className="flex shrink-0 items-center gap-2 border-b border-border/60 px-3 py-2">
                    <div className="flex min-w-0 flex-1 items-center gap-1.5 overflow-x-auto [mask-image:linear-gradient(to_right,black_calc(100%-24px),transparent)] [scrollbar-width:none]">
                      {AVAILABLE_TAGS.map((tag) => {
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
                              active ? cn(text, bg) : 'bg-[#aaaaaa]/[0.125] text-[#aaaaaa]'
                            )}>
                            <Icon className="size-2.5" aria-hidden="true" />
                            {copy.capabilities[tag]}
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  <div
                    ref={listRef}
                    id={listboxId}
                    role="listbox"
                    tabIndex={-1}
                    aria-label={copy.selectModel}
                    className="relative min-h-0 flex-1 overflow-y-auto py-1 [scrollbar-width:thin]">
                    {groups.length === 0 && (
                      <p className="flex h-full items-center justify-center px-3 py-4 text-xs text-muted-foreground">
                        {copy.noMatches}
                      </p>
                    )}
                    {groups.map((group) => (
                      <div key={group.key}>
                        <p className="group/header sticky top-0 z-1 flex h-7 items-center gap-1 bg-popover px-4 text-[11px] text-muted-foreground">
                          <span className="truncate leading-4">{group.title}</span>
                          {group.provider && (
                            <Settings2
                              aria-hidden="true"
                              className="size-3 shrink-0 translate-y-[2px] opacity-0 transition group-hover/header:opacity-60"
                            />
                          )}
                        </p>
                        {group.rows.map((row) => (
                          <ModelRow
                            key={row.key}
                            row={row}
                            id={optionId(row.key)}
                            copy={copy}
                            selected={row.model.id === current}
                            focused={row.key === focusedKey}
                            pinned={pinnedIds.includes(row.model.id)}
                            onHover={() => setFocusedKey(row.key)}
                            onSelect={() => select(row)}
                            onPin={() => togglePin(row.model.id)}
                          />
                        ))}
                      </div>
                    ))}
                  </div>

                  <div className="relative z-1 flex shrink-0 items-end border-t border-border/60 bg-popover">
                    <div className="min-w-0 flex-1 p-1">
                      <button
                        type="button"
                        onClick={() => {
                          take()
                          closePanel()
                        }}
                        className="flex w-full cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-left text-xs text-muted-foreground transition-colors hover:bg-accent/60 hover:text-foreground focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary">
                        <Settings2 className="size-3.5 shrink-0" aria-hidden="true" />
                        <span className="min-w-0 flex-1 truncate">{copy.configureCustom}</span>
                      </button>
                    </div>
                    <div className="shrink-0 p-1">
                      <button
                        type="button"
                        aria-label={copy.switchToDialog}
                        title={copy.switchToDialog}
                        onClick={() => {
                          take()
                          setDialog((value) => !value)
                          requestAnimationFrame(() => inputRef.current?.focus({ preventScroll: true }))
                        }}
                        className="flex size-7 cursor-pointer items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary">
                        {dialog ? (
                          <Minimize2 className="size-3.5" aria-hidden="true" />
                        ) : (
                          <Maximize2 className="size-3.5" aria-hidden="true" />
                        )}
                      </button>
                    </div>
                  </div>
                </m.div>

                <AnimatePresence>
                  {detailRow && !dialog && (
                    <m.div
                      key={detailRow.key}
                      aria-hidden="true"
                      initial={{ opacity: 0, x: -8, y: detailOffset(listRef.current, detailRow.key), scale: 0.97 }}
                      animate={{ opacity: 1, x: 0, y: detailOffset(listRef.current, detailRow.key), scale: 1 }}
                      exit={{ opacity: 0, transition: { duration: 0.1 } }}
                      transition={{ duration: 0.15, ease: ease.expo }}
                      className="hidden w-84 origin-left self-start rounded-lg border-[0.5px] border-border bg-popover p-3 shadow-lg @3xl:block">
                      <p className="text-sm font-medium break-words text-foreground">{detailRow.model.name}</p>
                      <dl className="mt-3 space-y-1.5 border-t border-border pt-3">
                        <DetailRow label={copy.detail.provider} value={copy.providers[detailRow.model.provider]} />
                        <DetailRow
                          label={copy.detail.modelId}
                          value={<span className="font-mono">{detailRow.model.id}</span>}
                        />
                      </dl>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {CAP_ORDER.filter((tag) => detailRow.model.caps.includes(tag)).map((tag) => {
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

interface ModelRowProps {
  row: Row
  id: string
  copy: (typeof modelSelectorDemo)['en']
  selected: boolean
  focused: boolean
  pinned: boolean
  onHover: () => void
  onSelect: () => void
  onPin: () => void
}

// Mirrors desktop ModelSelectorRow: the option and its pin action are siblings inside one 32px row.
function ModelRow({ row, id, copy, selected, focused, pinned, onHover, onSelect, onPin }: ModelRowProps) {
  const { model } = row
  return (
    <div className="px-1 py-0.5" onMouseEnter={onHover}>
      <div
        data-key={row.key}
        className={cn(
          'group/row relative flex h-8 w-full items-center gap-1 rounded-[10px] px-2 py-1 pr-0.5 text-left text-xs transition-colors',
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
        <button
          id={id}
          type="button"
          role="option"
          aria-selected={selected}
          tabIndex={-1}
          onFocus={onHover}
          onClick={onSelect}
          className="flex min-w-0 flex-1 cursor-pointer items-center gap-2 overflow-hidden text-left outline-none">
          <ModelLogo name={model.name} provider={model.provider} className="size-6 border border-border" />
          <span className="flex min-w-0 flex-1 items-center gap-1.5 overflow-hidden">
            <span className="max-w-full min-w-0 shrink-0 truncate">{model.name}</span>
            {row.inPinnedGroup && (
              <span className="min-w-0 flex-[1_999_0%] truncate text-muted-foreground">
                | {copy.providers[model.provider]}
              </span>
            )}
          </span>
          <span
            className="ml-2 flex h-[18px] max-w-[65%] shrink-0 items-center justify-end gap-1 overflow-hidden"
            aria-hidden="true">
            {CAP_ORDER.filter((tag) => model.caps.includes(tag)).map((tag) => {
              const { Icon, text, bg } = CAPS[tag]
              return (
                <span key={tag} className={cn('flex h-full items-center rounded-full px-[7px]', text, bg)}>
                  <Icon className="size-[9px]" />
                </span>
              )
            })}
          </span>
        </button>
        <button
          type="button"
          aria-label={pinned ? copy.unpin : copy.pin}
          aria-pressed={pinned}
          onClick={onPin}
          className={cn(
            'ml-0 flex size-4 shrink-0 cursor-pointer items-center justify-center rounded-sm text-muted-foreground transition hover:opacity-100! focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-primary',
            pinned ? '-rotate-45 text-foreground opacity-100' : 'opacity-0 group-hover/row:opacity-60',
            selected && 'text-foreground'
          )}>
          <Pin className="size-3" aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}

// Aligns the card's top with the hovered row, clamped so it stays inside the demo body.
function detailOffset(list: HTMLDivElement | null, key: string) {
  const option = list?.querySelector<HTMLElement>(`[data-key="${CSS.escape(key)}"]`)
  if (!list || !option) return 0
  const top = list.offsetTop + option.offsetTop - list.scrollTop
  return Math.max(0, Math.min(top, PANEL_HEIGHT - 236))
}

function DetailRow({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="grid grid-cols-[6.75rem_minmax(0,1fr)] gap-3 text-xs leading-5">
      <dt className="truncate text-muted-foreground">{label}</dt>
      <dd className="min-w-0 truncate text-foreground">{value}</dd>
    </div>
  )
}
