import { AnimatePresence, m } from 'framer-motion'
import {
  Bot,
  Check,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  ClipboardCopy,
  ClipboardX,
  FileQuestion,
  Languages,
  LoaderCircle,
  Lock,
  type LucideIcon,
  Quote,
  ScanText,
  Search,
  TextSelect,
  WandSparkles,
  X
} from 'lucide-react'
import { Fragment, useEffect, useLayoutEffect, useRef, useState } from 'react'

import logo from '@/assets/images/logo.png'
import {
  type AssistantsDemoCopy,
  assistantsTranslation,
  type DemoLocale,
  type SelectionActionId,
  type WindowActionId
} from '@/content/demos/assistants'
import { spring } from '@/lib/motion'
import { cn } from '@/lib/utils'
import { useDemoScript } from '../primitives/useDemoScript'
import { type ActionSession, SelectionActionWindow } from './SelectionActionWindow'

// Built-in order and icons from the desktop `feature.selection.action_items` default.
const ACTIONS: { id: SelectionActionId; icon: LucideIcon }[] = [
  { id: 'translate', icon: Languages },
  { id: 'explain', icon: FileQuestion },
  { id: 'summary', icon: ScanText },
  { id: 'search', icon: Search },
  { id: 'copy', icon: ClipboardCopy },
  { id: 'ask-agent', icon: Bot },
  { id: 'refine', icon: WandSparkles },
  { id: 'quote', icon: Quote }
]
const ACTION_ICONS = Object.fromEntries(ACTIONS.map((action) => [action.id, action.icon])) as Record<
  SelectionActionId,
  LucideIcon
>
const WINDOW_ACTIONS: SelectionActionId[] = ['translate', 'explain', 'summary', 'refine']
const SAMPLES = ['p0-1', 'p1-0', 'p0-0', 'p1-1']
const TOOLBAR_HEIGHT = 36
const COPY_ICON = 'absolute inset-0 size-4 transition-[color,opacity,transform] duration-300'

interface Anchor {
  x: number
  below: number
  above: number
}
type CopyState = { status: 'normal' | 'success' | 'fail'; animation: 'none' | 'enter' | 'exit' }

interface SelectionAssistantTabProps {
  copy: AssistantsDemoCopy
  locale: DemoLocale
  playing: boolean
}

/** `t` is the title (paragraph -1); `p1-0` is paragraph 1, sentence 0. */
const parseSentenceId = (id: string) => (id === 't' ? [-1, 0] : id.slice(1).split('-').map(Number)) as [number, number]

/** True when part of `node`'s own text falls inside `range`, not just a touching boundary. */
function coversText(range: Range, node: Node) {
  if (!range.intersectsNode(node)) return false
  const part = document.createRange()
  part.selectNodeContents(node)
  if (range.compareBoundaryPoints(Range.START_TO_START, part) > 0)
    part.setStart(range.startContainer, range.startOffset)
  if (range.compareBoundaryPoints(Range.END_TO_END, part) < 0) part.setEnd(range.endContainer, range.endOffset)
  return part.toString().trim().length > 0
}

export function SelectionAssistantTab({ copy, locale, playing }: SelectionAssistantTabProps) {
  const root = useRef<HTMLDivElement>(null)
  const article = useRef<HTMLDivElement>(null)
  const scroller = useRef<HTMLDivElement>(null)
  const toolbar = useRef<HTMLDivElement>(null)
  const pointerDown = useRef(false)
  const consumed = useRef('')
  const userActed = useRef(false)
  const selection = useRef<{ text: string; ids: string[] }>({ text: '', ids: [] })
  const copyTimer = useRef<ReturnType<typeof setTimeout>>(undefined)
  const sampleIndex = useRef(0)
  const [anchor, setAnchor] = useState<Anchor | null>(null)
  const [toolbarWidth, setToolbarWidth] = useState(0)
  const [compact, setCompact] = useState(false)
  const [hovered, setHovered] = useState<SelectionActionId | null>(null)
  const [copyState, setCopyState] = useState<CopyState>({ status: 'normal', animation: 'none' })
  const [session, setSession] = useState<ActionSession | null>(null)
  const [capsule, setCapsule] = useState<{ step: number; done: boolean } | null>(null)
  const [toast, setToast] = useState<string | null>(null)
  const translation = assistantsTranslation[locale].article
  const resultTag = locale === 'en' ? 'zh-CN' : 'en-US'

  const readRange = () => {
    const current = window.getSelection()
    if (!current || current.isCollapsed || current.rangeCount === 0 || !article.current) return null
    const range = current.getRangeAt(0)
    if (!article.current.contains(range.commonAncestorContainer) || !current.toString().trim()) return null
    return range
  }

  const showFor = (range: Range) => {
    const box = root.current?.getBoundingClientRect()
    const rects = range.getClientRects()
    if (!box || rects.length === 0) return
    const first = rects[0]
    const last = rects[rects.length - 1]
    const ids = Array.from(article.current?.querySelectorAll<HTMLElement>('[data-sentence]') ?? [])
      .filter((node) => coversText(range, node))
      .map((node) => node.dataset.sentence ?? '')
    selection.current = { text: range.toString().trim(), ids: ids.length ? ids : ['p0-0'] }
    setAnchor({ x: last.right - box.left, below: last.bottom - box.top + 8, above: first.top - box.top - 8 })
  }

  const hide = () => {
    setAnchor(null)
    setHovered(null)
  }

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined
    const onChange = () => {
      clearTimeout(timer)
      if (!readRange()) return hide()
      // Touch and keyboard selections never fire mouseup, so settle on the selection itself.
      if (pointerDown.current) return
      timer = setTimeout(() => {
        const range = readRange()
        if (range && range.toString().trim() !== consumed.current) showFor(range)
      }, 220)
    }
    const onPointerUp = () => {
      if (!pointerDown.current) return
      pointerDown.current = false
      consumed.current = ''
      requestAnimationFrame(() => {
        const range = readRange()
        if (range) showFor(range)
      })
    }
    document.addEventListener('selectionchange', onChange)
    document.addEventListener('pointerup', onPointerUp)
    return () => {
      clearTimeout(timer)
      document.removeEventListener('selectionchange', onChange)
      document.removeEventListener('pointerup', onPointerUp)
    }
  }, [])

  useEffect(() => {
    const node = root.current
    if (!node) return
    const observer = new ResizeObserver(([entry]) => setCompact(entry.contentRect.width < 700))
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  useLayoutEffect(() => {
    if (anchor && toolbar.current) setToolbarWidth(toolbar.current.offsetWidth)
  }, [anchor, compact])

  useEffect(() => () => clearTimeout(copyTimer.current), [])

  // Agent capsule: running steps tick by, then it settles on Done like the desktop capsule stack.
  useEffect(() => {
    if (!capsule || capsule.done || !playing) return
    const timer = setTimeout(
      () => setCapsule(capsule.step >= 3 ? { ...capsule, done: true } : { ...capsule, step: capsule.step + 1 }),
      950
    )
    return () => clearTimeout(timer)
  }, [capsule, playing])

  useEffect(() => {
    if (!toast) return
    const timer = setTimeout(() => setToast(null), 2400)
    return () => clearTimeout(timer)
  }, [toast])

  const buildResult = (action: WindowActionId, ids: string[]) => {
    const parts = ids.map(parseSentenceId)
    if (action !== 'translate') {
      const paragraphs = [...new Set(parts.map(([paragraph]) => Math.max(0, paragraph)))]
      return paragraphs.map((index) => copy.results[action][index]).join('\n\n')
    }
    const joiner = locale === 'en' ? '' : ' '
    return parts.reduce((output, [paragraph, sentence], index) => {
      const line = paragraph < 0 ? translation.title : translation.paragraphs[paragraph][sentence]
      const separator = index === 0 ? '' : paragraph === parts[index - 1][0] ? joiner : '\n\n'
      return output + separator + line
    }, '')
  }

  const runCopy = () => {
    const done = (ok: boolean) => {
      setCopyState({ status: ok ? 'success' : 'fail', animation: 'enter' })
      clearTimeout(copyTimer.current)
      copyTimer.current = setTimeout(() => setCopyState((state) => ({ ...state, animation: 'exit' })), 2000)
    }
    if (!navigator.clipboard) return done(false)
    navigator.clipboard.writeText(selection.current.text).then(
      () => done(true),
      () => done(false)
    )
  }

  const runAction = (id: SelectionActionId, fromUser: boolean) => {
    if (fromUser) userActed.current = true
    const { text, ids } = selection.current
    if (id === 'copy') return runCopy()
    // The toolbar hides after an action; a late selectionchange must not bring it back.
    consumed.current = text
    hide()
    if (WINDOW_ACTIONS.includes(id)) {
      const action = id as WindowActionId
      setSession((previous) => ({
        id: (previous?.id ?? 0) + 1,
        action,
        original: text,
        result: buildResult(action, ids),
        focus: fromUser
      }))
    } else if (id === 'search') {
      window.open(`https://www.google.com/search?q=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer')
    } else if (id === 'ask-agent') {
      setCapsule({ step: 1, done: false })
    } else if (id === 'quote') {
      setToast(copy.quoted)
    }
  }

  const select = (id: string) => {
    consumed.current = ''
    const node = article.current?.querySelector(`[data-sentence="${id}"]`)
    const view = scroller.current
    if (!node || !view) return
    const offset = node.getBoundingClientRect().top - view.getBoundingClientRect().top
    if (offset < 0 || offset > view.clientHeight - 60) view.scrollTop += offset - 24
    const range = document.createRange()
    range.selectNodeContents(node)
    const current = window.getSelection()
    current?.removeAllRanges()
    current?.addRange(range)
    showFor(range)
  }

  const selectSample = () => {
    userActed.current = true
    select(SAMPLES[sampleIndex.current % SAMPLES.length])
    sampleIndex.current += 1
    requestAnimationFrame(() => toolbar.current?.querySelector('button')?.focus({ preventScroll: true }))
  }

  useDemoScript(async ({ wait, reduced }) => {
    await wait(900)
    if (userActed.current) return
    select('p0-0')
    if (reduced) return runAction('translate', false)
    await wait(1100)
    if (userActed.current) return
    setHovered('translate')
    await wait(700)
    if (userActed.current) return
    runAction('translate', false)
  }, playing)

  const boxWidth = root.current?.clientWidth ?? 0
  const boxHeight = root.current?.clientHeight ?? 0
  const width = toolbarWidth || (compact ? 300 : 660)
  const position = anchor && {
    left: Math.max(8, Math.min(anchor.x - width / 2, boxWidth - width - 8)),
    top: anchor.below + TOOLBAR_HEIGHT < boxHeight - 8 ? anchor.below : Math.max(8, anchor.above - TOOLBAR_HEIGHT)
  }
  const sessionIcon = session ? ACTION_ICONS[session.action] : Languages

  const renderCopyIcon = () => {
    const showStatus = copyState.status !== 'normal'
    const entering = copyState.animation === 'enter'
    const StatusIcon = copyState.status === 'fail' ? ClipboardX : ClipboardCheck
    return (
      <>
        <ClipboardCopy
          className={cn(COPY_ICON, entering && showStatus ? 'scale-0 opacity-0' : 'scale-100 opacity-100')}
        />
        {showStatus && (
          <StatusIcon
            className={cn(
              COPY_ICON,
              copyState.status === 'fail' ? 'text-red-500!' : 'text-primary!',
              entering ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
            )}
          />
        )}
      </>
    )
  }

  return (
    <div ref={root} className="relative flex h-full flex-col gap-2.5 p-3 sm:p-4">
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg border border-border bg-background/70">
        <div className="flex h-9 shrink-0 items-center gap-2 border-b border-border px-3" aria-hidden="true">
          <ChevronLeft className="size-3.5 text-muted-foreground" />
          <ChevronRight className="size-3.5 text-muted-foreground/50" />
          <span className="flex h-6 min-w-0 flex-1 items-center gap-1.5 rounded-md bg-secondary px-2.5 font-mono text-[11px] text-muted-foreground">
            <Lock className="size-3 shrink-0" />
            <span className="truncate">{copy.browser.url}</span>
          </span>
        </div>
        <div
          ref={scroller}
          onScroll={() => {
            if (!anchor) return
            const range = readRange()
            range ? showFor(range) : hide()
          }}
          className="min-h-0 flex-1 overflow-y-auto [scrollbar-width:thin]">
          <article
            ref={article}
            onPointerDown={() => {
              pointerDown.current = true
              userActed.current = true
              hide()
            }}
            className="mx-auto max-w-[620px] cursor-text px-5 py-5 select-text selection:bg-primary/30 sm:px-8">
            <p className="font-mono text-[10px] tracking-wider text-muted-foreground uppercase">
              {copy.browser.site} · {copy.browser.byline}
            </p>
            <h3 data-sentence="t" className="mt-2 text-lg font-semibold tracking-tight text-balance">
              {copy.article.title}
            </h3>
            {copy.article.paragraphs.map((sentences, paragraph) => (
              <p key={paragraph} className="mt-3 text-[14px] leading-6 text-foreground/80">
                {sentences.map((sentence, index) => (
                  <Fragment key={index}>
                    {index > 0 && locale === 'en' ? ' ' : ''}
                    <span data-sentence={`p${paragraph}-${index}`}>{sentence}</span>
                  </Fragment>
                ))}
              </p>
            ))}
          </article>
        </div>
      </div>

      <div className="flex shrink-0 items-center justify-between gap-3">
        <p className="min-w-0 truncate text-xs text-muted-foreground">{copy.hint}</p>
        <button
          type="button"
          onMouseDown={(event) => event.preventDefault()}
          onClick={selectSample}
          className="inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-full border border-border px-3 py-1 text-xs text-muted-foreground transition-colors duration-200 hover:border-hairline-strong hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
          <TextSelect className="size-3.5" aria-hidden="true" />
          {copy.sample}
        </button>
      </div>

      {anchor && position && (
        <div
          ref={toolbar}
          role="toolbar"
          aria-label={copy.tabs.selection}
          onMouseDown={(event) => event.preventDefault()}
          onKeyDown={(event) => {
            if (event.key === 'Escape') hide()
          }}
          style={position}
          className={cn(
            'absolute z-40 inline-flex h-9 items-stretch overflow-hidden rounded-[10px] bg-card select-none motion-safe:animate-in motion-safe:fade-in motion-safe:zoom-in-95 motion-safe:duration-150',
            'shadow-[0_2px_3px_rgb(50_50_50/0.1)] [--toolbar-border:rgb(0_0_0/0.08)] dark:shadow-[0_2px_3px_rgb(50_50_50/0.3)] dark:[--toolbar-border:rgb(255_255_255/0.2)]'
          )}>
          <span className="flex items-center rounded-l-[10px] border-y-[0.5px] border-l-[0.5px] border-(--toolbar-border) pr-1.5 pl-2">
            <img src={logo} alt="" className="size-[22px] rounded-full object-cover" draggable={false} />
          </span>
          <span className="flex items-stretch rounded-r-[10px] border-y-[0.5px] border-r-[0.5px] border-(--toolbar-border)">
            {ACTIONS.map(({ id, icon: Icon }) => {
              const label = copy.actions[id]
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => runAction(id, true)}
                  aria-label={label}
                  title={compact ? label : undefined}
                  className={cn(
                    'group flex h-full cursor-pointer items-center gap-0.5 px-2 transition-colors duration-100 outline-none last:rounded-r-[10px] last:pr-3 last:pl-2 hover:bg-accent focus-visible:bg-accent focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-inset',
                    hovered === id && 'bg-accent'
                  )}>
                  <span
                    aria-hidden="true"
                    className={cn(
                      'relative flex size-4 items-center justify-center [&_svg]:text-card-foreground [&_svg]:transition-colors [&_svg]:duration-100 group-hover:[&_svg]:text-primary group-focus-visible:[&_svg]:text-primary',
                      hovered === id && '[&_svg]:text-primary'
                    )}>
                    {id === 'copy' ? renderCopyIcon() : <Icon className="absolute inset-0 size-full" />}
                  </span>
                  {!compact && (
                    <span
                      className={cn(
                        'max-w-[120px] truncate text-sm leading-[1.1] text-card-foreground transition-colors duration-100 group-hover:text-primary group-focus-visible:text-primary',
                        hovered === id && 'text-primary'
                      )}>
                      {label}
                    </span>
                  )}
                </button>
              )
            })}
          </span>
        </div>
      )}

      <AnimatePresence>
        {session && (
          <SelectionActionWindow
            key={session.id}
            session={session}
            copy={copy}
            label={copy.actions[session.action]}
            icon={sessionIcon}
            resultTag={session.action === 'translate' ? resultTag : locale === 'en' ? 'en-US' : 'zh-CN'}
            playing={playing}
            onClose={() => setSession(null)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {capsule && (
          <m.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={spring.settle}
            className="group absolute right-3 bottom-14 z-30 flex h-9 items-center gap-2 rounded-full border border-border bg-popover pr-1.5 pl-[7px] text-xs shadow-md">
            <span
              aria-hidden="true"
              className="inline-flex size-[18px] shrink-0 items-center justify-center rounded-sm bg-muted text-[11px] leading-none">
              {copy.agent.avatar}
            </span>
            <span className="font-medium">{copy.agent.name}</span>
            <span className="hidden max-w-[180px] truncate text-muted-foreground group-focus-within:inline group-hover:inline">
              {copy.agent.session}
            </span>
            <span
              aria-live="polite"
              className={cn(
                'inline-flex items-center gap-1 whitespace-nowrap tabular-nums',
                capsule.done ? 'text-emerald-600 dark:text-emerald-400' : 'text-muted-foreground'
              )}>
              {capsule.done ? (
                <Check className="size-3" aria-hidden="true" />
              ) : (
                <LoaderCircle className="size-3 motion-safe:animate-spin" aria-hidden="true" />
              )}
              {capsule.done ? copy.agent.done : copy.agent.step.replace('{n}', String(capsule.step))}
            </span>
            <button
              type="button"
              onClick={() => setCapsule(null)}
              aria-label={copy.agent.dismiss}
              className="flex size-6 cursor-pointer items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-2 focus-visible:outline-primary">
              <X className="size-3" aria-hidden="true" />
            </button>
          </m.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toast && (
          <m.p
            role="status"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={spring.settle}
            className="absolute bottom-14 left-1/2 z-30 -translate-x-1/2 rounded-full border border-border bg-popover px-3 py-1.5 text-xs whitespace-nowrap shadow-md">
            <Quote className="mr-1.5 inline size-3 text-primary" aria-hidden="true" />
            {toast}
          </m.p>
        )}
      </AnimatePresence>
    </div>
  )
}
