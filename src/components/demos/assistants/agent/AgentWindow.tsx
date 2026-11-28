import { m, useReducedMotion } from 'framer-motion'
import { ArrowUp, CirclePause, CircleSlash, Droplet, Folder, LoaderCircle, Pin, Plus, TextQuote, X } from 'lucide-react'
import { type KeyboardEvent, type ReactNode, useCallback, useEffect, useRef, useState } from 'react'

import type { SelectionAgentCopy } from '@/content/demos/selectionAgent'
import { ease } from '@/lib/motion'
import { cn } from '@/lib/utils'
import { EmojiIcon } from '../../primitives/AppShell'
import { useStickToBottom } from '../../primitives/useStickToBottom'
import { AgentThread, type AgentTurn, donePhase, TOOL_MS } from './AgentThread'

export type AgentStage = 'compose' | 'starting' | 'conversation'
export type AgentStatus = 'starting' | 'running' | 'done'

export interface AgentWin {
  id: number
  turn: AgentTurn
  stage: AgentStage
  /** The compose bar's instruction, owned here because it decides whether closing loses anything. */
  draft: string
  left: number
  top: number
  collapsed: boolean
  collapsedAt: number
  pinned: boolean
  status: AgentStatus
  steps: number
}

export interface Box {
  left: number
  top: number
  width: number
  height: number
}

export interface AgentWindowHandlers {
  onFocus: (id: number) => void
  onDraft: (id: number, draft: string) => void
  onSend: (id: number) => void
  onStarted: (id: number) => void
  onProgress: (id: number, status: AgentStatus, steps: number) => void
  onCollapse: (id: number) => void
  onClose: (id: number) => void
  onEscape: (id: number) => void
  onPin: (id: number) => void
  onOpenMain: (id: number) => void
}

interface AgentWindowProps extends AgentWindowHandlers {
  win: AgentWin
  copy: SelectionAgentCopy
  tag: string
  playing: boolean
  focused: boolean
  width: number
  height: number
  /** Where the capsule nearest the corner sits, which collapse shrinks toward. */
  slot: Box
  /** A control the autoplay cursor is resting on. */
  hint: 'collapse' | 'main' | null
}

const headerButton =
  'relative flex size-7 cursor-pointer items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-2 focus-visible:outline-primary'
const tooltip =
  'pointer-events-none absolute top-full right-0 z-10 mt-1.5 rounded-md bg-foreground px-2 py-1 text-[11px] whitespace-nowrap text-background shadow-md transition-opacity duration-150'

/** macOS window controls: red closes, yellow collapses into a capsule instead of minimizing to the Dock. */
function TrafficLights({
  copy,
  focused,
  canCollapse,
  hint,
  onClose,
  onCollapse
}: {
  copy: SelectionAgentCopy
  focused: boolean
  canCollapse: boolean
  hint: boolean
  onClose: () => void
  onCollapse: () => void
}) {
  const light = 'size-3 rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2'
  return (
    <span className="group/lights absolute top-1/2 left-3.5 flex -translate-y-1/2 gap-2">
      <button
        type="button"
        onClick={onClose}
        aria-label={copy.window.close}
        className={cn(
          light,
          'cursor-pointer',
          focused ? 'bg-[#ff5f57]' : 'bg-foreground/15 group-hover/lights:bg-[#ff5f57]'
        )}
      />
      <button
        type="button"
        data-control="collapse"
        onClick={onCollapse}
        disabled={!canCollapse}
        aria-label={copy.window.collapse}
        title={copy.window.collapse}
        className={cn(
          light,
          'relative',
          canCollapse ? 'cursor-pointer' : 'cursor-default',
          canCollapse && (focused ? 'bg-[#febc2e]' : 'bg-foreground/15 group-hover/lights:bg-[#febc2e]'),
          !canCollapse && 'bg-foreground/15',
          hint && 'ring-2 ring-[#febc2e]/40'
        )}
      />
      <span
        aria-hidden="true"
        className={cn(light, focused ? 'bg-[#28c840]' : 'bg-foreground/15 group-hover/lights:bg-[#28c840]')}
      />
    </span>
  )
}

function WindowHeader({
  win,
  copy,
  hint,
  opacity,
  onOpacity,
  onPin,
  onOpenMain,
  lights
}: {
  win: AgentWin
  copy: SelectionAgentCopy
  hint: boolean
  opacity: number
  onOpacity: (value: number) => void
  onPin: () => void
  onOpenMain?: () => void
  lights: ReactNode
}) {
  const [slider, setSlider] = useState(false)
  const agent = copy.agents[win.turn.kind]
  const title = win.turn.kind === 'reply' ? copy.replies : copy.tasks
  const session = win.stage === 'conversation' ? title[win.turn.paragraph].title : undefined

  return (
    <div className="relative flex h-10 shrink-0 items-center gap-2 pr-1.5 pl-[74px]">
      {lights}
      <EmojiIcon emoji={agent.avatar} size={20} />
      <div className="flex min-w-0 flex-1 items-center gap-2 text-[13px]">
        <span className="max-w-1/2 shrink-0 truncate font-medium">{agent.name}</span>
        {session && <span className="truncate text-muted-foreground">{session}</span>}
      </div>
      <div className="relative flex shrink-0 gap-0.5">
        {onOpenMain && (
          <button
            type="button"
            data-control="main"
            onClick={onOpenMain}
            aria-label={copy.window.openInMain}
            className={cn('group/main', headerButton, hint && 'bg-accent text-foreground')}>
            {/* BackToMainWindowIcon from the desktop WindowIcons. */}
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-3.5"
              aria-hidden="true">
              <path d="M20 11V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h5" />
              <path d="M8.5 11.5v-2a1 1 0 0 1 1-1h2" />
              <rect x="13" y="13" width="7.5" height="7.5" rx="2" />
            </svg>
            <span
              className={cn(
                tooltip,
                hint ? 'opacity-100' : 'opacity-0 group-hover/main:opacity-100 group-focus-visible/main:opacity-100'
              )}>
              {copy.window.openInMain}
            </span>
          </button>
        )}
        <button
          type="button"
          onClick={onPin}
          aria-pressed={win.pinned}
          aria-label={copy.window.pin}
          title={win.pinned ? copy.window.pinned : copy.window.pin}
          className={cn(headerButton, win.pinned && 'bg-accent text-foreground')}>
          <Pin className={cn('size-3.5 transition-transform', win.pinned && 'rotate-45')} aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => setSlider((open) => !open)}
          aria-expanded={slider}
          aria-label={copy.window.opacity}
          title={copy.window.opacity}
          className={cn(headerButton, slider && 'bg-accent text-foreground')}>
          <Droplet className="size-3.5" aria-hidden="true" />
        </button>
        {slider && (
          <div className="absolute top-full right-0 z-10 mt-2 flex h-[120px] w-9 flex-col items-center justify-center gap-1 rounded bg-popover p-2 shadow-md">
            <span className="font-mono text-[10px] text-muted-foreground tabular-nums">{opacity}%</span>
            <input
              type="range"
              min={20}
              max={100}
              value={opacity}
              aria-label={copy.window.opacity}
              onChange={(event) => onOpacity(Number(event.target.value))}
              onPointerUp={() => setSlider(false)}
              className="h-[80px] w-1.5 cursor-pointer accent-primary [direction:rtl] [writing-mode:vertical-lr]"
            />
          </div>
        )}
      </div>
    </div>
  )
}

/** Mirrors desktop SelectionAgentWindow: the compose bar, then the started session's header, messages and composer. */
export function AgentWindow({
  win,
  copy,
  tag,
  playing,
  focused,
  width,
  height,
  slot,
  hint,
  ...handlers
}: AgentWindowProps) {
  const reduced = useReducedMotion()
  const input = useRef<HTMLTextAreaElement>(null)
  const scroller = useRef<HTMLDivElement>(null)
  const content = useRef<HTMLDivElement>(null)
  const [phase, setPhase] = useState(0)
  const [opacity, setOpacity] = useState(100)
  const [hasQuote, setHasQuote] = useState(true)
  const { id, turn, stage } = win
  const { onProgress, onStarted } = handlers
  const tools = TOOL_MS[turn.kind].length
  const done = phase >= donePhase(turn.kind)
  useStickToBottom(scroller, content)

  useEffect(() => {
    if (stage === 'compose' && focused) input.current?.focus({ preventScroll: true })
  }, [stage, focused])

  // A hidden window misses the smooth follow, so a restore lands on the newest content.
  useEffect(() => {
    if (!win.collapsed) scroller.current?.scrollTo({ top: scroller.current.scrollHeight })
  }, [win.collapsed])

  // An agent-bound action has no compose bar; its session starts at once.
  useEffect(() => {
    if (stage !== 'starting' || !playing) return
    const timer = setTimeout(() => onStarted(id), reduced ? 0 : 260)
    return () => clearTimeout(timer)
  }, [stage, playing, reduced, id, onStarted])

  useEffect(() => {
    if (stage !== 'conversation' || phase > tools || !playing) return
    const timer = setTimeout(
      () => setPhase((value) => value + 1),
      reduced ? 0 : phase === 0 ? 200 : TOOL_MS[turn.kind][phase - 1]
    )
    return () => clearTimeout(timer)
  }, [stage, phase, tools, playing, reduced, turn.kind])

  useEffect(() => {
    if (stage === 'compose') return
    const status = stage === 'starting' ? 'starting' : done ? 'done' : 'running'
    onProgress(id, status, Math.min(phase, tools))
  }, [stage, phase, done, tools, id, onProgress])

  const finish = useCallback(() => setPhase(donePhase(turn.kind)), [turn.kind])

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape' && !event.nativeEvent.isComposing) handlers.onEscape(id)
    else if (event.key === 'Enter' && !event.shiftKey && event.target === input.current) {
      event.preventDefault()
      if (win.draft.trim()) handlers.onSend(id)
    }
  }

  const compose = stage === 'compose'
  const lights = (
    <TrafficLights
      copy={copy}
      focused={focused}
      canCollapse={stage !== 'compose'}
      hint={hint === 'collapse'}
      onClose={() => handlers.onClose(id)}
      onCollapse={() => handlers.onCollapse(id)}
    />
  )
  const lines = turn.quote.trim().split('\n').length
  const size =
    lines > 1
      ? copy.compose.lines.replace('{n}', String(lines))
      : copy.compose.chars.replace('{n}', String(turn.quote.length))
  const agent = copy.agents[turn.kind]
  const shown = { x: 0, y: 0, scaleX: 1, scaleY: 1, opacity: opacity / 100, visibility: 'visible' as const }
  const parked = {
    x: slot.left - win.left,
    y: slot.top - win.top,
    scaleX: slot.width / width,
    scaleY: slot.height / height,
    opacity: 0,
    transitionEnd: { visibility: 'hidden' as const }
  }

  return (
    <m.div
      role="dialog"
      aria-label={agent.name}
      aria-hidden={win.collapsed || undefined}
      data-cherry-window=""
      data-window={id}
      onPointerDown={() => handlers.onFocus(id)}
      onKeyDown={onKeyDown}
      initial={{ opacity: 0, y: 6, scaleX: 0.98, scaleY: 0.98 }}
      animate={{ ...(win.collapsed ? parked : shown), height: compose ? 'auto' : height }}
      exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.12 } }}
      transition={{ duration: reduced ? 0 : 0.2, ease: ease.inOut }}
      style={{ left: win.left, top: win.top, width, originX: 0, originY: 0, zIndex: focused ? 31 : 30 }}
      className="absolute flex flex-col overflow-hidden rounded-xl border border-border bg-popover text-foreground shadow-(--shadow-float)">
      {compose ? (
        <div className="flex flex-col pb-1">
          <div className="relative flex h-10 items-center gap-2.5 pr-3 pl-[74px]">
            {lights}
            <div className="group/quote flex min-w-0 flex-1 items-center gap-1">
              {hasQuote && (
                <>
                  <span
                    className="flex min-w-0 items-center gap-1.5 text-[13px] text-muted-foreground"
                    title={turn.quote}>
                    <TextQuote className="size-3.5 shrink-0" aria-hidden="true" />
                    <span className="min-w-0 truncate">{turn.quote.replace(/\s+/g, ' ').trim()}</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => setHasQuote(false)}
                    aria-label={copy.window.close}
                    className="flex size-5 shrink-0 cursor-pointer items-center justify-center rounded-full text-muted-foreground opacity-0 transition-opacity group-hover/quote:opacity-100 hover:bg-accent focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-primary">
                    <X className="size-3" aria-hidden="true" />
                  </button>
                </>
              )}
            </div>
            {hasQuote && (
              <span className="shrink-0 text-xs text-muted-foreground">
                {copy.menubar.app} · {size}
              </span>
            )}
          </div>
          <textarea
            ref={input}
            rows={2}
            value={win.draft}
            onChange={(event) => handlers.onDraft(id, event.target.value)}
            placeholder={copy.compose.placeholder}
            aria-label={copy.compose.placeholder}
            className="mx-3.5 resize-none bg-transparent text-[17px] leading-relaxed outline-none placeholder:text-muted-foreground"
          />
          <div className="flex h-10 items-center justify-between gap-3 px-2">
            <div className="flex min-w-0 items-center gap-0.5 overflow-hidden text-[13px]">
              <span className="flex h-7 min-w-0 items-center gap-1.5 rounded-md px-2">
                <span className="flex size-[18px] shrink-0 items-center justify-center rounded-sm bg-muted text-[11px] leading-none">
                  {agent.avatar}
                </span>
                <span className="truncate">{agent.name}</span>
              </span>
              <span className="flex h-7 min-w-0 items-center gap-1.5 rounded-md px-2">
                {agent.workspace ? (
                  <Folder className="size-3.5 shrink-0 text-muted-foreground" aria-hidden="true" />
                ) : (
                  <CircleSlash className="size-3.5 shrink-0 text-muted-foreground" aria-hidden="true" />
                )}
                <span className="truncate">{agent.workspace ?? copy.compose.noWorkspace}</span>
              </span>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <span className="hidden text-xs text-muted-foreground @[1000px]:inline">{copy.compose.saved}</span>
              <button
                type="button"
                data-control="send"
                onClick={() => handlers.onSend(id)}
                aria-label={copy.compose.send}
                aria-disabled={!win.draft.trim()}
                className={cn(
                  'flex size-[22px] cursor-pointer items-center justify-center rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
                  win.draft.trim()
                    ? 'bg-primary text-primary-foreground'
                    : 'cursor-not-allowed bg-muted-foreground/35 text-background'
                )}>
                <ArrowUp className="size-3.5" strokeWidth={2.6} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <WindowHeader
            win={win}
            copy={copy}
            hint={hint === 'main'}
            opacity={opacity}
            onOpacity={setOpacity}
            onPin={() => handlers.onPin(id)}
            onOpenMain={stage === 'conversation' ? () => handlers.onOpenMain(id) : undefined}
            lights={lights}
          />
          {stage === 'starting' ? (
            <div role="status" className="flex items-center gap-2 px-4 pt-1 text-[13px] text-muted-foreground">
              <LoaderCircle className="size-3.5 motion-safe:animate-spin" aria-hidden="true" />
              {copy.window.starting.replace('{name}', agent.name)}
            </div>
          ) : (
            <>
              <div ref={scroller} className="min-h-0 flex-1 overflow-y-auto px-3 [scrollbar-width:none]">
                <div ref={content} className="pt-1 pb-3">
                  <AgentThread turn={turn} copy={copy} tag={tag} phase={phase} playing={playing} onDone={finish} />
                </div>
              </div>
              <div className="shrink-0 px-2.5 pb-2.5">
                <div className="rounded-[16px] border-[0.5px] border-border bg-composer pt-1.5" aria-hidden="true">
                  <p className="truncate px-3 text-xs leading-6 text-muted-foreground">{copy.main.placeholder}</p>
                  <div className="flex h-8 items-center justify-between px-1.5">
                    <span className="flex size-6 items-center justify-center text-muted-foreground">
                      <Plus className="size-4" />
                    </span>
                    <span
                      className={cn(
                        'mr-0.5 flex size-[20px] items-center justify-center rounded-full',
                        done ? 'bg-muted-foreground/35 text-background' : 'text-destructive'
                      )}>
                      {done ? (
                        <ArrowUp className="size-3" strokeWidth={2.6} />
                      ) : (
                        <CirclePause className="size-[18px]" />
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </m.div>
  )
}
