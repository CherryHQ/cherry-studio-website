import { AnimatePresence, m } from 'framer-motion'
import { TextSelect } from 'lucide-react'
import { type PointerEvent, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'

import { assistantsDemo } from '@/content/demos/assistants'
import type { DemoLocale } from '@/content/demos/chat'
import { type AgentKind, type SelectionAgentCopy, selectionAgentDemo } from '@/content/demos/selectionAgent'
import { ease } from '@/lib/motion'
import { cn } from '@/lib/utils'
import DemoFrame from '../primitives/DemoFrame'
import { useDemoLocale } from '../primitives/useDemoLocale'
import { useDemoPlayback, useDemoScript } from '../primitives/useDemoScript'
import { type AgentStatus, type AgentWin, AgentWindow, type Box } from './agent/AgentWindow'
import { CapsuleStack } from './agent/CapsuleStack'
import { MailBackdrop } from './agent/MailBackdrop'
import { MainWindow } from './agent/MainWindow'
import { actionIcon, actionLabel, SelectionToolbar, type ToolbarAction } from './agent/SelectionToolbar'
import { type ActionSession, SelectionActionWindow } from './SelectionActionWindow'

const MENUBAR = 24
const TOOLBAR_HEIGHT = 36
// Desktop windows scaled to the demo: the 560px agent window and the 180×36 capsule slot 12px from the corner.
const WINDOW = { width: 400, maxWidth: 470, height: 300 }
const SLOT = { width: 180, height: 36, inset: 12 }

interface Anchor {
  x: number
  below: number
  above: number
}
type Point = { x: number; y: number }

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

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(value, max))
const windowSize = (width: number, height: number) => ({
  width: Math.min(clamp(width * 0.42, WINDOW.width, WINDOW.maxWidth), width - 24),
  height: Math.min(WINDOW.height, height - 56)
})
/** Below the selection's last line, or above its first when the bottom edge is too close. */
const placeToolbar = (anchor: Anchor, width: number, height: number, toolbarWidth: number) => ({
  left: clamp(anchor.x - toolbarWidth / 2, 8, width - toolbarWidth - 8),
  top: anchor.below + TOOLBAR_HEIGHT < height - 8 ? anchor.below : Math.max(MENUBAR + 8, anchor.above - TOOLBAR_HEIGHT)
})
const isIdle = (win: AgentWin) =>
  (win.stage === 'compose' && !win.draft.trim()) || (win.stage === 'conversation' && win.status === 'done')

function Cursor({ point, pressed }: { point: Point | null; pressed: boolean }) {
  return (
    <m.div
      aria-hidden="true"
      className="pointer-events-none absolute top-0 left-0 z-50"
      initial={false}
      animate={{
        x: point?.x ?? 0,
        y: point?.y ?? 0,
        opacity: point ? 1 : 0,
        scale: pressed ? 0.86 : 1
      }}
      transition={{ duration: 0.26, ease: ease.inOut, scale: { duration: 0.1 } }}>
      <svg viewBox="0 0 24 24" className="size-[18px] drop-shadow-[0_1px_1.5px_rgb(0_0_0/0.35)]">
        <path
          d="M5 3.2v15.6l4.2-4.1 2.6 6 2.6-1.1-2.6-5.9h5.9z"
          fill="#111"
          stroke="#fff"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
      </svg>
    </m.div>
  )
}

interface DesktopProps {
  copy: SelectionAgentCopy
  locale: DemoLocale
  tag: string
  playing: boolean
}

function SelectionDesktop({ copy, locale, tag, playing }: DesktopProps) {
  const root = useRef<HTMLDivElement>(null)
  const body = useRef<HTMLDivElement>(null)
  const scroller = useRef<HTMLDivElement>(null)
  const toolbar = useRef<HTMLDivElement>(null)
  const pointerDown = useRef(false)
  const consumed = useRef('')
  const userActed = useRef(false)
  const selection = useRef({ text: '', paragraph: 0 })
  const nextId = useRef(1)
  const sampleIndex = useRef(0)
  const copiedTimer = useRef<ReturnType<typeof setTimeout>>(undefined)
  const [size, setSize] = useState({ width: 0, height: 0 })
  const [anchor, setAnchor] = useState<Anchor | null>(null)
  const [toolbarWidth, setToolbarWidth] = useState(0)
  const [hovered, setHovered] = useState<ToolbarAction | null>(null)
  const [copied, setCopied] = useState(false)
  const [windows, setWindowState] = useState<AgentWin[]>([])
  // Mirrors `windows` synchronously, since the autoplay script reads it between renders.
  const windowsRef = useRef(windows)
  const [focused, setFocused] = useState<number | null>(null)
  const [action, setAction] = useState<ActionSession & { tool: ToolbarAction }>()
  const [main, setMain] = useState<AgentWin['turn'] | null>(null)
  const [autoClose, setAutoClose] = useState(true)
  const [cursor, setCursor] = useState<Point | null>(null)
  const [pressed, setPressed] = useState(false)
  const [capsuleHint, setCapsuleHint] = useState<number | null>(null)
  const [windowHint, setWindowHint] = useState<{ id: number; control: 'collapse' | 'main' } | null>(null)
  const anchorRef = useRef<Anchor | null>(null)
  // The autoplay script outlives the render it started in, so it reads state through this.
  const live = useRef({ focused, autoClose })
  live.current = { focused, autoClose }
  const compact = size.width > 0 && size.width < 700
  const win = windowSize(size.width, size.height)
  const slot: Box = {
    left: size.width - SLOT.inset - SLOT.width,
    top: size.height - SLOT.inset - SLOT.height,
    width: SLOT.width,
    height: SLOT.height
  }

  useEffect(() => {
    const node = root.current
    if (!node) return
    const observer = new ResizeObserver(([entry]) =>
      setSize({ width: entry.contentRect.width, height: entry.contentRect.height })
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  useLayoutEffect(() => {
    if (anchor && toolbar.current) setToolbarWidth(toolbar.current.offsetWidth)
  }, [anchor, compact])

  useEffect(() => () => clearTimeout(copiedTimer.current), [])

  const readRange = () => {
    const current = window.getSelection()
    if (!current || current.isCollapsed || current.rangeCount === 0 || !body.current) return null
    const range = current.getRangeAt(0)
    if (!body.current.contains(range.commonAncestorContainer) || !current.toString().trim()) return null
    return range
  }

  const showFor = (range: Range) => {
    const box = root.current?.getBoundingClientRect()
    const rects = range.getClientRects()
    if (!box || rects.length === 0) return
    const first = rects[0]
    const last = rects[rects.length - 1]
    const paragraph = Array.from(body.current?.querySelectorAll<HTMLElement>('[data-paragraph]') ?? []).find((node) =>
      coversText(range, node)
    )
    selection.current = { text: range.toString().trim(), paragraph: Number(paragraph?.dataset.paragraph ?? 0) }
    anchorRef.current = { x: last.right - box.left, below: last.bottom - box.top + 8, above: first.top - box.top - 8 }
    setAnchor(anchorRef.current)
  }

  const hideToolbar = () => {
    setAnchor(null)
    setHovered(null)
  }

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined
    const onChange = () => {
      clearTimeout(timer)
      if (!readRange()) return hideToolbar()
      // Touch and keyboard selections never fire pointerup, so settle on the selection itself.
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

  const estimate = compact ? 250 : 600
  const toolbarBox = anchor && placeToolbar(anchor, size.width, size.height, toolbarWidth || estimate)

  const setWindows = (change: (list: AgentWin[]) => AgentWin[]) => {
    windowsRef.current = change(windowsRef.current)
    setWindowState(windowsRef.current)
  }
  const update = (id: number, change: (current: AgentWin) => AgentWin) =>
    setWindows((list) => list.map((item) => (item.id === id ? change(item) : item)))
  const close = (id: number) => {
    setWindows((list) => list.filter((item) => item.id !== id))
    setFocused((current) => (current === id ? null : current))
  }
  const collapse = (id: number) => {
    update(id, (item) =>
      item.stage === 'compose' || item.collapsed ? item : { ...item, collapsed: true, collapsedAt: Date.now() }
    )
    setFocused((current) => (current === id ? null : current))
  }

  /** Opens next to the toolbar; idle, unpinned windows give way to the new one, as main replaces them. */
  const openAgent = (kind: AgentKind) => {
    const id = nextId.current++
    const { text, paragraph } = selection.current
    const width = root.current?.clientWidth ?? 0
    const height = root.current?.clientHeight ?? 0
    const bar = toolbar.current?.offsetWidth || estimate
    const box = anchorRef.current ? placeToolbar(anchorRef.current, width, height, bar) : { left: 8, top: MENUBAR + 8 }
    const size = windowSize(width, height)
    const next: AgentWin = {
      id,
      turn: { kind, paragraph, quote: text, instruction: kind === 'tasks' ? copy.tasksPrompt : '' },
      stage: kind === 'reply' ? 'compose' : 'starting',
      draft: '',
      left: clamp(box.left + (bar - size.width) / 2, 8, width - size.width - 8),
      top: clamp(box.top, MENUBAR + 8, height - size.height - 8),
      collapsed: false,
      collapsedAt: 0,
      pinned: false,
      status: 'starting',
      steps: 0
    }
    setWindows((list) => [...list.filter((item) => item.collapsed || item.pinned || !isIdle(item)), next])
    setFocused(id)
    setAction(undefined)
    return id
  }

  const runAction = (id: ToolbarAction) => {
    const { text, paragraph } = selection.current
    if (id === 'copy') {
      navigator.clipboard?.writeText(text).then(
        () => {
          setCopied(true)
          clearTimeout(copiedTimer.current)
          copiedTimer.current = setTimeout(() => setCopied(false), 1600)
        },
        () => {}
      )
      return 0
    }
    // The toolbar hides after an action; a late selectionchange must not bring it back.
    consumed.current = text
    hideToolbar()
    if (id === 'search') {
      window.open(`https://www.google.com/search?q=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer')
      return 0
    }
    if (id === 'ask-agent' || id === 'tasks') return openAgent(id === 'tasks' ? 'tasks' : 'reply')
    setAction((previous) => ({
      id: (previous?.id ?? 0) + 1,
      tool: id,
      action: id,
      original: text,
      result: copy.results[id][paragraph],
      focus: true
    }))
    return 0
  }

  /** Auto Close: an idle window closes on blur and a running one collapses, unless it is pinned. */
  const blurFocused = () => {
    const { focused, autoClose } = live.current
    const current = windowsRef.current.find((item) => item.id === focused)
    setFocused(null)
    if (!current || !autoClose || current.pinned || current.collapsed) return
    if (isIdle(current)) close(current.id)
    else if (current.stage !== 'compose') collapse(current.id)
  }

  const onDesktopPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (!event.isTrusted) return
    userActed.current = true
    setCursor(null)
    setCapsuleHint(null)
    setWindowHint(null)
    const target = event.target as Element
    if (!target.closest('[role="toolbar"]')) hideToolbar()
    const agentWindow = target.closest<HTMLElement>('[data-window]')
    if (!agentWindow || Number(agentWindow.dataset.window) !== focused) blurFocused()
    if (!target.closest('[data-cherry-window], [role="dialog"], [data-capsule]')) setMain(null)
  }

  const handlers = {
    onFocus: useCallback((id: number) => setFocused(id), []),
    onDraft: (id: number, draft: string) => update(id, (item) => ({ ...item, draft })),
    onSend: (id: number) =>
      update(id, (item) =>
        item.draft.trim()
          ? { ...item, stage: 'conversation', turn: { ...item.turn, instruction: item.draft.trim() } }
          : item
      ),
    onStarted: useCallback((id: number) => update(id, (item) => ({ ...item, stage: 'conversation' })), []),
    onProgress: useCallback(
      (id: number, status: AgentStatus, steps: number) =>
        update(id, (item) => (item.status === status && item.steps === steps ? item : { ...item, status, steps })),
      []
    ),
    onCollapse: collapse,
    onClose: close,
    onEscape: (id: number) => {
      const current = windowsRef.current.find((item) => item.id === id)
      if (current && isIdle(current)) close(id)
    },
    onPin: (id: number) => update(id, (item) => ({ ...item, pinned: !item.pinned })),
    onOpenMain: (id: number) => {
      const current = windowsRef.current.find((item) => item.id === id)
      if (!current) return
      setMain(current.turn)
      close(id)
    }
  }

  const restore = (id: number) => {
    update(id, (item) => ({ ...item, collapsed: false }))
    setFocused(id)
  }

  const select = (paragraph: number) => {
    consumed.current = ''
    const node = body.current?.querySelector(`[data-paragraph="${paragraph}"]`)
    if (!node) return null
    const range = document.createRange()
    range.selectNodeContents(node)
    const current = window.getSelection()
    current?.removeAllRanges()
    current?.addRange(range)
    showFor(range)
    const rects = range.getClientRects()
    const last = rects[rects.length - 1]
    const box = root.current?.getBoundingClientRect()
    return last && box ? { x: last.right - box.left, y: last.bottom - box.top - 10 } : null
  }

  const selectSample = () => {
    userActed.current = true
    setCursor(null)
    select(sampleIndex.current % copy.mail.paragraphs.length)
    sampleIndex.current += 1
    requestAnimationFrame(() => toolbar.current?.querySelector('button')?.focus({ preventScroll: true }))
  }

  const pointAt = (selector: string) => {
    const node = root.current?.querySelector(selector)
    const box = root.current?.getBoundingClientRect()
    if (!node || !box) return null
    const rect = node.getBoundingClientRect()
    return { x: rect.left - box.left + rect.width / 2 - 4, y: rect.top - box.top + rect.height / 2 - 3 }
  }

  useDemoScript(async ({ wait, reduced }) => {
    const moveTo = (selector: string) => {
      if (!reduced) setCursor((current) => pointAt(selector) ?? current)
    }
    const click = async () => {
      setPressed(true)
      await wait(90)
      setPressed(false)
    }
    const stopped = () => userActed.current

    const end = select(0)
    if (!reduced && end) setCursor(end)
    await wait(260)
    if (stopped()) return
    moveTo('[data-action="ask-agent"]')
    await wait(260)
    if (stopped()) return
    setHovered('ask-agent')
    await wait(100)
    if (stopped()) return
    await click()
    const reply = runAction('ask-agent')
    const instruction = copy.compose.instruction
    for (let step = 1; step <= 5; step++) {
      await wait(36)
      if (stopped()) return
      handlers.onDraft(reply, instruction.slice(0, Math.ceil((instruction.length * step) / 5)))
    }
    moveTo(`[data-window="${reply}"] [data-control="send"]`)
    await wait(200)
    if (stopped()) return
    await click()
    handlers.onSend(reply)
    await wait(1000)
    if (stopped()) return
    // A click back in Mail blurs the running window, which Auto Close folds into a capsule.
    moveTo('[data-subject]')
    await wait(220)
    if (stopped()) return
    await click()
    collapse(reply)
    setFocused(null)
    window.getSelection()?.removeAllRanges()
    await wait(260)
    if (stopped()) return

    const second = select(1)
    if (!reduced && second) setCursor(second)
    await wait(220)
    if (stopped()) return
    moveTo('[data-action="tasks"]')
    await wait(240)
    if (stopped()) return
    setHovered('tasks')
    await wait(100)
    if (stopped()) return
    await click()
    const tasks = runAction('tasks')
    await wait(700)
    if (stopped()) return
    moveTo(`[data-window="${tasks}"] [data-control="collapse"]`)
    await wait(220)
    if (stopped()) return
    setWindowHint({ id: tasks, control: 'collapse' })
    await click()
    collapse(tasks)
    setWindowHint(null)
    await wait(320)
    if (stopped()) return

    moveTo(`[data-capsule="${reply}"]`)
    await wait(240)
    if (stopped()) return
    setCapsuleHint(reply)
    await wait(200)
    if (stopped()) return
    await click()
    setCapsuleHint(null)
    update(reply, (item) => ({ ...item, collapsed: false }))
    setFocused(reply)
    await wait(240)
    if (stopped()) return
    moveTo(`[data-window="${reply}"] [data-control="main"]`)
    await wait(220)
    if (stopped()) return
    setWindowHint({ id: reply, control: 'main' })
    await wait(300)
    if (stopped()) return
    await click()
    setWindowHint(null)
    handlers.onOpenMain(reply)
    await wait(300)
    setCursor(null)
  }, playing)

  const capsules = windows
    .filter((item) => item.collapsed)
    .map((item) => ({
      id: item.id,
      avatar: copy.agents[item.turn.kind].avatar,
      name: copy.agents[item.turn.kind].name,
      title: (item.turn.kind === 'reply' ? copy.replies : copy.tasks)[item.turn.paragraph].title,
      status: item.status,
      steps: item.steps,
      collapsedAt: item.collapsedAt
    }))
  const legacy = assistantsDemo[locale]

  return (
    <div className="flex h-full flex-col">
      <div
        ref={root}
        onPointerDownCapture={onDesktopPointerDown}
        className="@container relative min-h-0 flex-1 overflow-hidden">
        <MailBackdrop
          copy={copy}
          bodyRef={body}
          scrollerRef={scroller}
          onScroll={() => {
            if (!anchor) return
            const range = readRange()
            range ? showFor(range) : hideToolbar()
          }}
          onBodyPointerDown={() => {
            pointerDown.current = true
          }}
        />

        {/* Cherry Studio's own windows float over the other app, in the desktop app's theme. */}
        <div className="app-surface pointer-events-none absolute inset-0 text-foreground *:pointer-events-auto">
          <AnimatePresence>{main && <MainWindow key="main" turn={main} copy={copy} tag={tag} />}</AnimatePresence>

          <AnimatePresence>
            {action && (
              <SelectionActionWindow
                key={action.id}
                session={action}
                copy={legacy}
                label={actionLabel(copy, action.tool)}
                icon={actionIcon(action.tool)}
                resultTag={action.action === 'translate' ? (locale === 'en' ? 'zh-CN' : 'en-US') : tag}
                playing={playing}
                onClose={() => setAction(undefined)}
              />
            )}
          </AnimatePresence>

          <AnimatePresence>
            {windows.map((item) => (
              <AgentWindow
                key={item.id}
                win={item}
                copy={copy}
                tag={tag}
                playing={playing}
                focused={focused === item.id}
                width={win.width}
                height={win.height}
                slot={slot}
                hint={windowHint?.id === item.id ? windowHint.control : null}
                {...handlers}
              />
            ))}
          </AnimatePresence>

          {anchor && toolbarBox && (
            <SelectionToolbar
              toolbarRef={toolbar}
              copy={copy}
              compact={compact}
              hovered={hovered}
              copied={copied}
              style={toolbarBox}
              onAction={(id) => {
                userActed.current = true
                setCursor(null)
                runAction(id)
              }}
              onEscape={hideToolbar}
            />
          )}

          <CapsuleStack capsules={capsules} copy={copy} hovered={capsuleHint} onRestore={restore} onClose={close} />
        </div>

        <Cursor point={cursor} pressed={pressed} />
      </div>

      <div className="flex h-10 shrink-0 items-center justify-between gap-3 border-t border-border px-3 text-xs text-muted-foreground sm:px-4">
        <p className="flex min-w-0 items-center gap-1.5">
          <span className="truncate">{copy.hint}</span>
          <button
            type="button"
            onMouseDown={(event) => event.preventDefault()}
            onClick={selectSample}
            className="inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-full border border-border px-2.5 py-0.5 transition-colors duration-200 hover:border-hairline-strong hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
            <TextSelect className="size-3.5" aria-hidden="true" />
            {copy.sample}
          </button>
        </p>
        <button
          type="button"
          role="switch"
          aria-checked={autoClose}
          title={copy.autoClose.description}
          onClick={() => setAutoClose((value) => !value)}
          className="inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-full hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
          {copy.autoClose.title}
          <span
            aria-hidden="true"
            className={cn(
              'relative h-4 w-7 rounded-full transition-colors duration-200',
              autoClose ? 'bg-primary' : 'bg-foreground/20'
            )}>
            <span
              className={cn(
                'absolute top-0.5 left-0.5 size-3 rounded-full bg-background shadow-sm transition-transform duration-200',
                autoClose && 'translate-x-3'
              )}
            />
          </span>
        </button>
      </div>
    </div>
  )
}

/** Cherry Studio 2.2 selection agents: select text in another app, Ask Agent, park running windows as capsules. */
export default function SelectionAgentDemo() {
  const { locale, tag } = useDemoLocale()
  const copy = selectionAgentDemo[locale]
  const ref = useRef<HTMLDivElement>(null)
  const playing = useDemoPlayback(ref)
  const [replayKey, setReplayKey] = useState(0)

  const replay = () => {
    window.getSelection()?.removeAllRanges()
    setReplayKey((key) => key + 1)
  }

  return (
    <div ref={ref} role="region" aria-label={copy.region} className="@container">
      <DemoFrame chromeless title={copy.region} onReplay={replay} bodyClassName="h-[clamp(480px,62.5cqw,800px)]">
        <SelectionDesktop key={`${locale}-${replayKey}`} copy={copy} locale={locale} tag={tag} playing={playing} />
      </DemoFrame>
    </div>
  )
}
