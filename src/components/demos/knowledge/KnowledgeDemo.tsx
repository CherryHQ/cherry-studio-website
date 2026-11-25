import { AnimatePresence, m, useReducedMotion } from 'framer-motion'
import { Check, FlaskConical, LoaderCircle, Plus, SlidersHorizontal } from 'lucide-react'
import { type DragEvent, useEffect, useRef, useState } from 'react'

import { type KnowledgeItemType, knowledgeDemo } from '@/content/demos/knowledge'
import { ease, spring } from '@/lib/motion'
import { cn } from '@/lib/utils'
import DemoFrame from '../primitives/DemoFrame'
import { useDemoLocale } from '../primitives/useDemoLocale'
import { useDemoPlayback, useDemoScript } from '../primitives/useDemoScript'
import { type RecallState, RecallTestPanel, TYPE_ICONS } from './RecallTestPanel'

interface Item {
  id: string
  type: KnowledgeItemType
  title: string
  updated: string
  /** Milliseconds since it was added; null for items that were already indexed. */
  elapsed: number | null
}

type Stage = 'pending' | 'reading' | 'embedding' | 'ready'

// Desktop pipeline: idle (Waiting) → reading (files, URLs, notes only) → embedding with a live % → completed.
const PENDING_MS = 500
const READING_MS = 900
const EMBEDDING_MS = 2200
const TICK_MS = 100
const TYPE_ORDER: KnowledgeItemType[] = ['file', 'directory', 'url', 'note']

function stageOf(item: Item): { stage: Stage; percent: number } {
  if (item.elapsed === null) return { stage: 'ready', percent: 100 }
  const time = item.elapsed
  if (time < PENDING_MS) return { stage: 'pending', percent: 0 }
  const reads = item.type !== 'directory'
  if (reads && time < PENDING_MS + READING_MS) return { stage: 'reading', percent: 0 }
  const start = PENDING_MS + (reads ? READING_MS : 0)
  if (time >= start + EMBEDDING_MS) return { stage: 'ready', percent: 100 }
  const progress = (time - start) / EMBEDDING_MS
  return { stage: 'embedding', percent: Math.round(100 * (1 - (1 - progress) ** 2)) }
}

const STAGE_TONE: Record<Stage, string> = {
  pending: 'text-zinc-500',
  reading: 'text-sky-600 dark:text-sky-400',
  embedding: 'text-amber-600 dark:text-amber-400',
  ready: 'text-emerald-600 dark:text-emerald-400'
}

const ROW_GRID =
  'grid grid-cols-[minmax(0,1fr)_7.5rem] items-center gap-2 sm:grid-cols-[minmax(0,1fr)_3.5rem_8rem_6rem]'

export default function KnowledgeDemo() {
  const { locale } = useDemoLocale()
  const copy = knowledgeDemo[locale]
  const ref = useRef<HTMLDivElement>(null)
  const recallInput = useRef<HTMLInputElement>(null)
  const nextId = useRef(0)
  const sampleCursor = useRef<Record<KnowledgeItemType, number>>({ file: 0, url: 0, note: 0, directory: 0 })
  const dragDepth = useRef(0)
  const touched = useRef(false)
  const playing = useDemoPlayback(ref)
  const reduced = useReducedMotion()
  const initialItems = (): Item[] => copy.items.map((item, index) => ({ ...item, id: `seed-${index}`, elapsed: null }))
  const [items, setItems] = useState<Item[]>(initialItems)
  const [menuOpen, setMenuOpen] = useState(false)
  const [addPressed, setAddPressed] = useState(false)
  const [dragging, setDragging] = useState(false)
  const [panelOpen, setPanelOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [recall, setRecall] = useState<RecallState>({ status: 'empty' })
  const processing = items.some((item) => stageOf(item).stage !== 'ready')

  useEffect(() => {
    if (!processing || !playing) return
    const timer = setInterval(() => {
      setItems((list) =>
        list.map((item) =>
          item.elapsed !== null && stageOf(item).stage !== 'ready' ? { ...item, elapsed: item.elapsed + TICK_MS } : item
        )
      )
    }, TICK_MS)
    return () => clearInterval(timer)
  }, [processing, playing])

  useEffect(() => {
    if (recall.status !== 'searching' || !playing) return
    const timer = setTimeout(() => setRecall({ status: 'done', query: recall.query }), reduced ? 0 : 650)
    return () => clearTimeout(timer)
  }, [recall, playing, reduced])

  const addItem = (type: KnowledgeItemType, title?: string) => {
    const pool = copy.samples[type]
    const name = title ?? pool[sampleCursor.current[type]++ % pool.length]
    nextId.current += 1
    const item: Item = {
      id: `added-${nextId.current}`,
      type,
      title: name,
      updated: copy.justNow,
      elapsed: reduced ? Number.MAX_SAFE_INTEGER : 0
    }
    setItems((list) => [item, ...list])
  }

  const runSearch = (value = query) => {
    if (!value.trim()) return
    setRecall({ status: 'searching', query: value.trim() })
  }

  const openPanel = () => {
    setPanelOpen(true)
    requestAnimationFrame(() => recallInput.current?.focus({ preventScroll: true }))
  }

  const { replay } = useDemoScript(async ({ wait, reduced: instant }) => {
    sampleCursor.current = { file: 0, url: 0, note: 0, directory: 0 }
    setItems(initialItems())
    setPanelOpen(false)
    setQuery('')
    setRecall({ status: 'empty' })
    const query = copy.recall.query
    if (instant) {
      addItem('file')
      addItem('file')
      setPanelOpen(true)
      setQuery(query)
      setRecall({ status: 'done', query })
      return
    }
    await wait(900)
    if (touched.current) return
    setAddPressed(true)
    await wait(260)
    setAddPressed(false)
    addItem('file')
    await wait(420)
    addItem('file')
    await wait(PENDING_MS + READING_MS + EMBEDDING_MS + 900)
    if (touched.current) return
    setPanelOpen(true)
    await wait(520)
    const cjk = locale === 'zh'
    for (let index = 1; index <= query.length; index++) {
      setQuery(query.slice(0, index))
      await wait(cjk ? 90 : 32)
    }
    await wait(380)
    runSearch(query)
  }, playing)

  const onDragEnter = (event: DragEvent) => {
    event.preventDefault()
    dragDepth.current += 1
    setDragging(true)
  }
  const onDragLeave = () => {
    dragDepth.current = Math.max(0, dragDepth.current - 1)
    if (dragDepth.current === 0) setDragging(false)
  }
  const onDrop = (event: DragEvent) => {
    event.preventDefault()
    dragDepth.current = 0
    setDragging(false)
    touched.current = true
    const names = Array.from(event.dataTransfer.files, (file) => file.name).slice(0, 5)
    if (names.length === 0) addItem('file')
    for (const name of names) addItem('file', name)
  }

  return (
    <div ref={ref} role="region" aria-label={copy.region}>
      <DemoFrame
        title={copy.window}
        onReplay={() => {
          touched.current = false
          replay()
        }}
        bodyClassName="h-[460px]">
        <div className="grid h-full md:grid-cols-[180px_minmax(0,1fr)]">
          <aside className="hidden flex-col gap-1 border-r-[0.5px] border-border p-1.5 md:flex" aria-hidden="true">
            <div className="flex h-8 items-center gap-2 rounded-md px-2.5 text-[13px] text-muted-foreground">
              <Plus className="size-3.5 shrink-0" />
              <span className="truncate">{copy.newBase}</span>
            </div>
            <div className="mt-1 space-y-0.5">
              {copy.bases.map((base, index) => (
                <div
                  key={base}
                  className={cn(
                    'flex h-8 items-center truncate rounded-md px-2.5 text-[13px]',
                    index === 0 ? 'bg-muted text-foreground' : 'text-muted-foreground'
                  )}>
                  {base}
                </div>
              ))}
            </div>
          </aside>

          <main
            className="relative flex min-h-0 min-w-0 flex-col overflow-hidden"
            onDragEnter={onDragEnter}
            onDragOver={(event) => event.preventDefault()}
            onDragLeave={onDragLeave}
            onDrop={onDrop}>
            <div className="mx-3 flex h-11 shrink-0 items-center gap-2 border-b border-border">
              <span className="min-w-0 flex-1 truncate text-sm font-medium">{copy.bases[0]}</span>
              <button
                type="button"
                onClick={() => {
                  touched.current = true
                  openPanel()
                }}
                className="inline-flex h-7 cursor-pointer items-center gap-1.5 rounded-md px-2 text-[13px] text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-2 focus-visible:outline-primary">
                <FlaskConical className="size-3.5" aria-hidden="true" />
                {copy.recallTest}
              </button>
              <span className="flex size-6 items-center justify-center text-muted-foreground" aria-hidden="true">
                <SlidersHorizontal className="size-3.5" />
              </span>
            </div>

            <div className="flex h-11 shrink-0 items-center justify-between gap-2 px-3">
              <span className="min-w-0 truncate pl-2 text-xs text-muted-foreground">
                {copy.updated.replace('{time}', copy.justNow)}
              </span>
              <div
                className="relative"
                onBlur={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget)) setMenuOpen(false)
                }}
                onKeyDown={(event) => {
                  if (event.key === 'Escape') setMenuOpen(false)
                }}>
                <button
                  type="button"
                  aria-expanded={menuOpen}
                  aria-haspopup="true"
                  onClick={() => {
                    touched.current = true
                    setMenuOpen((open) => !open)
                  }}
                  className={cn(
                    'inline-flex h-7 cursor-pointer items-center gap-1 rounded-md px-2 text-xs font-medium text-muted-foreground transition-[background-color,color,scale] duration-150 hover:bg-accent hover:text-foreground focus-visible:outline-2 focus-visible:outline-primary',
                    (menuOpen || addPressed) && 'bg-accent text-foreground',
                    addPressed && 'scale-95'
                  )}>
                  <Plus className="size-3" aria-hidden="true" />
                  {copy.add}
                </button>
                <AnimatePresence>
                  {menuOpen && (
                    <m.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -2 }}
                      transition={{ duration: 0.16, ease: ease.expo }}
                      className="absolute top-full right-0 z-30 mt-1 w-44 space-y-0.5 rounded-xl border border-border bg-popover p-1.5 shadow-(--shadow-float)">
                      {TYPE_ORDER.map((type) => {
                        const { icon: Icon, tint } = TYPE_ICONS[type]
                        return (
                          <button
                            key={type}
                            type="button"
                            onClick={() => {
                              addItem(type)
                              setMenuOpen(false)
                            }}
                            className="flex h-8 w-full cursor-pointer items-center gap-2 rounded-lg px-2.5 text-left text-[13px] transition-colors hover:bg-accent focus-visible:bg-accent focus-visible:outline-none">
                            <Icon className={cn('size-3.5', tint)} aria-hidden="true" />
                            {copy.types[type]}
                          </button>
                        )
                      })}
                      <p className="px-2.5 pt-1 pb-0.5 text-[11px] text-muted-foreground">{copy.addHint}</p>
                    </m.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div
              className={cn(ROW_GRID, 'mx-3 h-9 shrink-0 border-b border-border px-2.5 text-xs text-muted-foreground')}
              aria-hidden="true">
              <span>{copy.columns.name}</span>
              <span className="hidden sm:block">{copy.columns.type}</span>
              <span>{copy.columns.status}</span>
              <span className="hidden sm:block">{copy.columns.updated}</span>
            </div>

            <ul className="min-h-0 flex-1 overflow-y-auto px-3 py-1 [scrollbar-width:thin]" aria-live="polite">
              <AnimatePresence initial={false}>
                {items.map((item) => {
                  const { icon: Icon, tint } = TYPE_ICONS[item.type]
                  const { stage, percent } = stageOf(item)
                  return (
                    <m.li
                      key={item.id}
                      layout="position"
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={spring.settle}
                      className={cn(ROW_GRID, 'rounded-md px-2.5 py-1.5 transition-colors hover:bg-muted')}>
                      <span className="flex min-w-0 items-center gap-2">
                        <span className="flex size-6 shrink-0 items-center justify-center rounded bg-secondary">
                          <Icon className={cn('size-3.5', tint)} aria-hidden="true" />
                        </span>
                        <span className="truncate text-[13px]" title={item.title}>
                          {item.title}
                        </span>
                      </span>
                      <span className="hidden truncate text-xs text-muted-foreground sm:block">
                        {copy.types[item.type]}
                      </span>
                      <span className={cn('inline-flex items-center gap-1 text-xs tabular-nums', STAGE_TONE[stage])}>
                        {stage === 'ready' ? (
                          <Check className="size-3 shrink-0" aria-hidden="true" />
                        ) : (
                          <LoaderCircle className="size-3 shrink-0 motion-safe:animate-spin" aria-hidden="true" />
                        )}
                        <span className="truncate">
                          {copy.status[stage]}
                          {stage === 'embedding' && ` ${percent}%`}
                        </span>
                      </span>
                      <span className="hidden truncate text-xs text-muted-foreground/80 sm:block">{item.updated}</span>
                    </m.li>
                  )
                })}
              </AnimatePresence>
            </ul>

            {dragging && (
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-3 z-20 flex items-center justify-center rounded-lg border border-dashed border-primary bg-background/90 text-sm font-medium">
                {copy.drop}
              </div>
            )}

            <AnimatePresence>
              {panelOpen && (
                <m.div
                  key="backdrop"
                  aria-hidden="true"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="absolute inset-0 z-30 bg-black/40"
                />
              )}
              {panelOpen && (
                <RecallTestPanel
                  key="panel"
                  copy={copy}
                  query={query}
                  state={recall}
                  inputRef={recallInput}
                  onQueryChange={(value) => {
                    touched.current = true
                    setQuery(value)
                  }}
                  onSearch={() => {
                    touched.current = true
                    runSearch()
                  }}
                  onClose={() => setPanelOpen(false)}
                />
              )}
            </AnimatePresence>
          </main>
        </div>
      </DemoFrame>
    </div>
  )
}
