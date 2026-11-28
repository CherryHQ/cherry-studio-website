import { AnimatePresence, m, useReducedMotion } from 'framer-motion'
import {
  ArrowDownUp,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Braces,
  Check,
  ChevronDown,
  ChevronRight,
  CirclePause,
  ExternalLink,
  Gauge,
  Heart,
  LoaderCircle,
  Maximize2,
  Plus,
  RotateCw,
  Search,
  ShieldCheck,
  Sparkles,
  SquareDashedMousePointer,
  Star,
  ToolCase,
  X
} from 'lucide-react'
import { type ReactNode, useEffect, useRef, useState } from 'react'

import { agentDemo, agentScript } from '@/content/demos/agents'
import { type BrowserDemoCopy, browserDemo, browserScript, type StayId } from '@/content/demos/browser'
import { cn } from '@/lib/utils'
import { AgentSessionBar, blockEnter, EmojiAvatar, TOOLBAR_ICON, UserAvatar } from '../agents/parts'
import AppShell from '../primitives/AppShell'
import BeatDots from '../primitives/BeatDots'
import DemoFrame from '../primitives/DemoFrame'
import StreamingText from '../primitives/StreamingText'
import { useDemoLocale } from '../primitives/useDemoLocale'
import { useDemoPlayback, useDemoScript } from '../primitives/useDemoScript'
import { useStickToBottom } from '../primitives/useStickToBottom'

interface Pointer {
  x: number
  y: number
  visible: boolean
  /** Bumps per move so the travel tilt replays. */
  move: number
  heading: number
  /** Short moves scoot; the first placement snaps like the desktop cursor. */
  duration: number
  pressed: boolean
}

interface RunState {
  /** Automation cells shown so far; the last one runs until `done` catches up. */
  tools: number
  done: number
  busy: boolean
  loaded: boolean
  sortOpen: boolean
  sorted: boolean
  hovered: StayId | 'sort' | 'topRated' | null
  /** Page scroll in px; hovering brings an element into view as CDP does. */
  scroll: number
  lead: boolean
  table: boolean
  closing: boolean
}

const INITIAL: RunState = {
  tools: 0,
  done: 0,
  busy: false,
  loaded: false,
  sortOpen: false,
  sorted: false,
  hovered: null,
  scroll: 0,
  lead: false,
  table: false,
  closing: false
}
const HIDDEN: Pointer = { x: 0, y: 0, visible: false, move: 0, heading: 0, duration: 0, pressed: false }
const FOCUS = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
// WebviewNavigation navigationButtonClassName on a ghost icon-sm Button.
const NAV_BUTTON = 'flex size-7 shrink-0 items-center justify-center rounded text-muted-foreground'
// Staynest's own palette: a web page keeps its brand colours and honours prefers-color-scheme.
const BRAND = 'text-[#0f766e] dark:text-[#5eead4]'
const SITE_LINE = 'border-[#e7e5e4] dark:border-white/10'
const SITE_MUTED = 'text-[#78716c] dark:text-[#a8a29e]'

/** Desktop browser-cursor.svg: the host-drawn Agent pointer, tip at (16, 4) of its 32x36 sprite. */
function CursorSprite() {
  return (
    <svg
      viewBox="0 0 48 54"
      width="32"
      height="36"
      aria-hidden="true"
      className="drop-shadow-[0_2px_3px_rgb(0_0_0/0.25)]">
      <path
        d="M24 2.8c.8 0 1.5.5 1.9 1.2l17 34.4c.9 1.8-.9 3.7-2.7 2.9l-10.9-4.8v14.1c0 1.1-.9 2-2 2h-6.6c-1.1 0-2-.9-2-2V36.5L7.8 41.3c-1.8.8-3.6-1.1-2.7-2.9L22.1 4c.4-.7 1.1-1.2 1.9-1.2Z"
        fill="#fff"
        stroke="#121316"
        strokeLinejoin="round"
        strokeWidth="2.4"
      />
    </svg>
  )
}

/**
 * BrowserCursorOverlay: never intercepts input. Long moves bow along a curve (x and y on different eases) and tilt
 * toward travel; a press dips the sprite.
 */
function AgentPointer({ pointer }: { pointer: Pointer }) {
  const curve = pointer.duration > 0.3
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
      <m.div
        className="absolute top-0 left-0"
        initial={false}
        animate={{ x: pointer.x, y: pointer.y, opacity: pointer.visible ? 1 : 0 }}
        transition={{
          x: { duration: pointer.duration, ease: curve ? [0.2, 0.6, 0.35, 1] : [0.25, 1, 0.5, 1] },
          y: { duration: pointer.duration, ease: curve ? [0.6, 0, 0.4, 1] : [0.25, 1, 0.5, 1] },
          opacity: { duration: 0.2 }
        }}>
        <m.div
          key={pointer.move}
          className="absolute -top-1 -left-4 origin-[16px_4px]"
          initial={{ rotate: 0 }}
          animate={{ rotate: [0, pointer.heading, 0], scale: pointer.pressed ? 0.9 : 1 }}
          transition={{ rotate: { duration: pointer.duration + 0.15, times: [0, 0.45, 1] }, scale: { duration: 0.1 } }}>
          <CursorSprite />
        </m.div>
      </m.div>
    </div>
  )
}

/** Flat illustrations standing in for each stay's listing photo. */
function StayPhoto({ id }: { id: StayId }) {
  const scenes: Record<StayId, ReactNode> = {
    kanade: (
      <>
        <rect width="120" height="90" fill="url(#kanade)" />
        <circle cx="88" cy="26" r="9" fill="#ffe3b3" opacity="0.9" />
        <path d="M14 52 Q60 30 106 52 L98 52 L98 90 L22 90 L22 52Z" fill="#3b2a2f" />
        <path d="M8 54 Q60 26 112 54" stroke="#2a1d21" strokeWidth="5" fill="none" strokeLinecap="round" />
        <rect x="34" y="62" width="14" height="28" fill="#f7c873" opacity="0.85" />
        <rect x="72" y="62" width="14" height="28" fill="#f7c873" opacity="0.85" />
        <circle cx="26" cy="66" r="3.5" fill="#ff8a5c" />
        <circle cx="94" cy="66" r="3.5" fill="#ff8a5c" />
        <defs>
          <linearGradient id="kanade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#f4a76a" />
            <stop offset="1" stopColor="#b8505a" />
          </linearGradient>
        </defs>
      </>
    ),
    kamogawa: (
      <>
        <rect width="120" height="90" fill="url(#kamogawa)" />
        <path d="M0 40 L18 30 L30 38 L46 26 L62 36 L80 28 L98 38 L120 30 L120 62 L0 62Z" fill="#1e3a4c" />
        {[10, 30, 50, 70, 90].map((x) => (
          <rect key={x} x={x + 4} y="46" width="6" height="6" fill="#ffd58a" opacity="0.9" />
        ))}
        <rect y="62" width="120" height="28" fill="#2f7a8c" />
        <path
          d="M0 70 Q30 66 60 70 T120 70 M0 80 Q30 76 60 80 T120 80"
          stroke="#9fe0e8"
          strokeWidth="1.5"
          fill="none"
          opacity="0.6"
        />
        <defs>
          <linearGradient id="kamogawa" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#8ec5e0" />
            <stop offset="1" stopColor="#d9eef3" />
          </linearGradient>
        </defs>
      </>
    ),
    arashi: (
      <>
        <rect width="120" height="90" fill="url(#arashi)" />
        {[8, 22, 34, 50, 64, 78, 92, 106].map((x, index) => (
          <g key={x} opacity={index % 2 ? 0.75 : 1}>
            <rect x={x} y="0" width="6" height="90" rx="3" fill={index % 2 ? '#2f6b3a' : '#3f8a4a'} />
            <rect x={x} y={20 + (index % 3) * 18} width="6" height="2" fill="#24522c" />
          </g>
        ))}
        <path d="M44 90 Q60 60 76 90Z" fill="#d9c9a3" opacity="0.8" />
        <defs>
          <linearGradient id="arashi" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#c9e6a7" />
            <stop offset="1" stopColor="#6aa86a" />
          </linearGradient>
        </defs>
      </>
    ),
    sanjo: (
      <>
        <rect width="120" height="90" fill="url(#sanjo)" />
        <rect x="18" y="30" width="26" height="60" fill="#2a2846" />
        <rect x="48" y="14" width="30" height="76" fill="#35325a" />
        <rect x="82" y="38" width="22" height="52" fill="#2a2846" />
        {[0, 1, 2, 3, 4, 5].map((row) =>
          [0, 1, 2].map((col) => (
            <rect
              key={`${row}-${col}`}
              x={53 + col * 8}
              y={22 + row * 10}
              width="4"
              height="5"
              fill="#ffd27a"
              opacity={(row + col) % 3 ? 0.9 : 0.3}
            />
          ))
        )}
        <defs>
          <linearGradient id="sanjo" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#6d5bd0" />
            <stop offset="1" stopColor="#e7a3b8" />
          </linearGradient>
        </defs>
      </>
    )
  }
  return (
    <svg viewBox="0 0 120 90" preserveAspectRatio="xMidYMid slice" className="size-full" aria-hidden="true">
      {scenes[id]}
    </svg>
  )
}

function Favicon({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn('flex size-3.5 shrink-0 items-center justify-center rounded-[4px] bg-[#0f766e]', className)}>
      <svg viewBox="0 0 16 16" className="size-[70%]" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round">
        <path d="M3 8.5 8 4l5 4.5M5 7.5V12h6V7.5" strokeLinejoin="round" />
      </svg>
    </span>
  )
}

/** The fictional booking site rendered inside the browser pane's guest. */
function StaynestPage({
  copy,
  state,
  order,
  setTarget
}: {
  copy: BrowserDemoCopy
  state: RunState
  order: StayId[]
  setTarget: (key: string) => (node: HTMLElement | null) => void
}) {
  const { site, stays } = copy
  const sortIndex = state.sorted ? 1 : 0
  return (
    <div className="@container absolute inset-0 overflow-hidden bg-white text-[#1c1917] dark:bg-[#161615] dark:text-[#f5f5f4]">
      <header
        className={cn(
          'relative z-10 flex h-11 items-center gap-3 border-b bg-white px-4 dark:bg-[#161615]',
          SITE_LINE
        )}>
        <span className="flex shrink-0 items-center gap-1.5">
          <Favicon className="size-5 rounded-md" />
          <span className={cn('text-[15px] font-bold tracking-tight', BRAND)}>staynest</span>
        </span>
        <span
          className={cn(
            'mx-auto flex h-7.5 min-w-0 items-center gap-2 rounded-full border px-3 text-[11px] shadow-[0_1px_6px_rgb(0_0_0/0.06)]',
            SITE_LINE
          )}>
          <span className="truncate font-medium">{site.search}</span>
          <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[#0f766e] text-white">
            <Search className="size-3" strokeWidth={2.4} />
          </span>
        </span>
        <span className="hidden size-7 shrink-0 rounded-full bg-linear-to-br from-[#fbbf24] to-[#f97316] @md:block" />
      </header>

      <m.div animate={{ y: -state.scroll }} transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}>
        <div className="px-4 pt-3">
          <div className="flex items-baseline justify-between gap-3">
            <h5 className="truncate text-[17px] font-semibold tracking-tight">{site.heading}</h5>
            <span className={cn('shrink-0 text-[11px]', SITE_MUTED)}>{site.count}</span>
          </div>
          <div className="relative mt-2.5 flex items-center gap-1.5">
            <span
              ref={setTarget('sort')}
              className={cn(
                'flex h-7 shrink-0 items-center gap-1 rounded-full border px-2.5 text-[11px] font-medium transition-colors',
                state.sortOpen || state.sorted
                  ? 'border-[#0f766e] bg-[#0f766e]/8 text-[#0f766e] dark:border-[#5eead4] dark:bg-[#5eead4]/10 dark:text-[#5eead4]'
                  : SITE_LINE
              )}>
              <ArrowDownUp className="size-3" />
              {site.sortLabel}: {site.sorts[sortIndex]}
              <ChevronDown className={cn('size-3 transition-transform', state.sortOpen && 'rotate-180')} />
            </span>
            {site.filters.map((filter, index) => (
              <span
                key={filter}
                className={cn(
                  'h-7 shrink-0 items-center rounded-full border px-2.5 text-[11px]',
                  SITE_LINE,
                  index === 0 ? 'flex' : 'hidden @md:flex'
                )}>
                {filter}
              </span>
            ))}
            <AnimatePresence>
              {state.sortOpen && (
                <m.div
                  role="menu"
                  initial={{ opacity: 0, y: -4, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -4, transition: { duration: 0.12 } }}
                  transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
                  className={cn(
                    'absolute top-full left-0 z-10 mt-1.5 w-40 origin-top-left rounded-xl border bg-white p-1 shadow-[0_12px_32px_-8px_rgb(0_0_0/0.22)] dark:bg-[#232322]',
                    SITE_LINE
                  )}>
                  {site.sorts.map((sort, index) => (
                    <span
                      key={sort}
                      ref={index === 1 ? setTarget('topRated') : undefined}
                      className={cn(
                        'flex h-7.5 items-center justify-between rounded-lg px-2.5 text-[12px]',
                        index === 1 && state.hovered === 'topRated' && 'bg-[#f5f5f4] dark:bg-white/8'
                      )}>
                      {sort}
                      {index === sortIndex && <Check className={cn('size-3.5', BRAND)} />}
                    </span>
                  ))}
                </m.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="flex flex-col gap-2.5 px-4 pt-3">
          {order.map((id) => {
            const stay = stays[id]
            const hovered = state.hovered === id
            return (
              <m.article
                key={id}
                layout="position"
                ref={setTarget(id)}
                transition={{ layout: { type: 'spring', stiffness: 380, damping: 34 } }}
                className={cn(
                  'flex gap-3 rounded-2xl border bg-white p-2 transition-[box-shadow,border-color] duration-200 dark:bg-[#1d1d1c]',
                  SITE_LINE,
                  hovered &&
                    'border-[#0f766e]/50 shadow-[0_10px_28px_-12px_rgb(15_118_110/0.45)] dark:border-[#5eead4]/40'
                )}>
                <div className="relative aspect-[4/3] w-[28%] max-w-30 shrink-0 overflow-hidden rounded-xl">
                  <StayPhoto id={id} />
                  <Heart className="absolute top-1.5 right-1.5 size-3.5 fill-black/25 text-white" />
                </div>
                <div className="flex min-w-0 flex-1 flex-col py-0.5">
                  <div className="flex min-w-0 items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h6 className="truncate text-[13px] leading-4 font-semibold">{stay.name}</h6>
                      <p className={cn('mt-0.5 truncate text-[10.5px]', SITE_MUTED)}>{stay.area}</p>
                    </div>
                    <span className="flex shrink-0 items-center gap-1">
                      <span className="hidden text-right @md:block">
                        <span className="block text-[11px] leading-3.5 font-medium">{stay.verdict}</span>
                        <span className={cn('block text-[10px] leading-3', SITE_MUTED)}>{stay.reviews}</span>
                      </span>
                      <span className="rounded-md rounded-bl-none bg-[#0f766e] px-1.5 py-0.5 text-[11px] font-bold text-white tabular-nums">
                        {stay.rating}
                      </span>
                    </span>
                  </div>
                  <div className="mt-1.5 hidden gap-1 @md:flex">
                    {stay.perks.map((perk) => (
                      <span
                        key={perk}
                        className="rounded-md bg-[#f5f5f4] px-1.5 py-0.5 text-[10px] text-[#57534e] dark:bg-white/8 dark:text-[#d6d3d1]">
                        {perk}
                      </span>
                    ))}
                  </div>
                  <div className="mt-auto flex items-end justify-between gap-2 pt-1">
                    <span
                      className={cn(
                        'truncate text-[10.5px]',
                        stay.flexible ? 'font-medium text-[#15803d] dark:text-[#4ade80]' : SITE_MUTED
                      )}>
                      {stay.flexible ? site.flexible : site.fixed}
                    </span>
                    <span className="shrink-0 text-right">
                      <span className="text-[14px] font-bold tabular-nums">{stay.price}</span>
                      <span className={cn('ml-0.5 text-[10px]', SITE_MUTED)}>{site.perNight}</span>
                    </span>
                  </div>
                </div>
              </m.article>
            )
          })}
        </div>
      </m.div>
    </div>
  )
}

/** MessageAutomationRepl row: Braces icon, the Agent's cell title, then a check once done; expands to code and output. */
function ToolRow({
  tool,
  done,
  copy,
  running
}: {
  tool: BrowserDemoCopy['tools'][number]
  done: boolean
  copy: BrowserDemoCopy
  running: string
}) {
  const [open, setOpen] = useState(false)
  return (
    <m.div {...blockEnter} className="w-full">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className="group/repl flex min-h-7 w-fit max-w-full cursor-pointer items-center gap-2 rounded-md py-0.5 text-left text-[13px] leading-5 text-muted-foreground outline-none hover:text-foreground focus-visible:bg-accent/50 focus-visible:outline-2 focus-visible:outline-primary">
        <Braces className="size-3.5 shrink-0" aria-hidden="true" />
        <span className="min-w-0 truncate">{tool.title}</span>
        {done ? (
          <Check className="size-3 shrink-0" aria-hidden="true" />
        ) : (
          <span className="shrink-0 text-xs text-primary opacity-85">{running}</span>
        )}
        <ChevronRight
          aria-hidden="true"
          className={cn('size-3 shrink-0 opacity-50 transition-transform', open && 'rotate-90')}
        />
      </button>
      {open && (
        <div className="mt-1.5 flex min-w-0 flex-col gap-3 border-l border-border pl-3">
          <section className="overflow-hidden rounded-md border border-border">
            <div className="bg-muted px-3 py-1 text-xs text-muted-foreground">{copy.codeLabel}</div>
            <pre className="overflow-x-auto px-3 py-2 font-mono text-xs leading-relaxed text-foreground [scrollbar-width:none]">
              {tool.code}
            </pre>
          </section>
          {done && (
            <section className="min-w-0">
              <div className="mb-1 text-xs text-muted-foreground">{copy.outputLabel}</div>
              <pre className="rounded-md bg-muted p-3 font-mono text-xs break-words whitespace-pre-wrap text-foreground">
                {tool.output}
              </pre>
            </section>
          )}
        </div>
      )}
    </m.div>
  )
}

/**
 * An Agent drives the session's built-in browser pane (Cherry Studio 2.1): each automation cell appears in the chat
 * while the host-drawn pointer moves, clicks and hovers on the page, and the extracted result lands as a table.
 */
export default function BrowserAgentDemo() {
  const { locale, tag } = useDemoLocale()
  const copy = browserDemo[locale]
  const agent = agentDemo[locale]
  const reduced = useReducedMotion() ?? false
  const ref = useRef<HTMLDivElement>(null)
  const scroller = useRef<HTMLDivElement>(null)
  const thread = useRef<HTMLDivElement>(null)
  const page = useRef<HTMLDivElement>(null)
  const targets = useRef<Record<string, HTMLElement | null>>({})
  const playing = useDemoPlayback(ref)
  const [state, setState] = useState<RunState>(INITIAL)
  const [pointer, setPointer] = useState<Pointer>(HIDDEN)
  const [elapsed, setElapsed] = useState(0)
  const [processOpen, setProcessOpen] = useState(true)
  useStickToBottom(scroller, thread)

  const update = (patch: Partial<RunState>) => setState((previous) => ({ ...previous, ...patch }))
  const setTarget = (key: string) => (node: HTMLElement | null) => {
    targets.current[key] = node
  }

  const { replay } = useDemoScript(async ({ wait, reduced: skip }) => {
    setPointer(HIDDEN)
    setProcessOpen(true)
    if (skip) {
      setElapsed(4)
      setProcessOpen(false)
      setState({ ...INITIAL, tools: 4, done: 4, loaded: true, sorted: true, lead: true, table: true, closing: true })
      return
    }
    setElapsed(0)
    setState({ ...INITIAL, busy: true, tools: 1 })

    let cursor = HIDDEN
    const place = (patch: Partial<Pointer>) => {
      cursor = { ...cursor, ...patch }
      setPointer(cursor)
    }
    // Aims at a fraction of a page element, measured live so it follows layout at any width; returns travel seconds.
    const aim = (key: string, fx = 0.5, fy = 0.5) => {
      const node = targets.current[key]
      const frame = page.current?.getBoundingClientRect()
      if (!node || !frame) return 0
      const rect = node.getBoundingClientRect()
      const x = rect.left - frame.left + rect.width * fx
      const y = rect.top - frame.top + rect.height * fy
      if (!cursor.visible) {
        place({ x, y, visible: true, duration: 0, heading: 0, move: cursor.move + 1 })
        return 0
      }
      const distance = Math.hypot(x - cursor.x, y - cursor.y)
      const direction = Math.atan2(y - cursor.y, x - cursor.x) + Math.PI / 2
      const duration = distance > 120 ? 0.36 : 0.24
      const heading = Math.sin(direction + Math.PI / 4) * 22 * Math.min(1, distance / 160)
      place({ x, y, duration, heading, move: cursor.move + 1 })
      return duration
    }
    const press = async () => {
      place({ pressed: true })
      await wait(90)
      place({ pressed: false })
    }

    await wait(450)
    update({ loaded: true })
    await wait(220)
    update({ done: 1, tools: 2 })
    aim('sort', 0.6, 0.55)
    update({ hovered: 'sort' })
    await wait(180)
    await press()
    update({ sortOpen: true })
    await wait(140)
    await wait(aim('topRated', 0.4, 0.5) * 1000)
    update({ hovered: 'topRated' })
    await wait(80)
    await press()
    update({ sortOpen: false, sorted: true, hovered: null })
    await wait(340)
    update({ done: 2, tools: 3 })
    let scroll = 0
    for (const id of browserScript.topRated.slice(0, 3)) {
      const node = targets.current[id]
      const frame = page.current?.getBoundingClientRect()
      const overflow = node && frame ? node.getBoundingClientRect().bottom + 12 - frame.bottom : 0
      if (overflow > 0) {
        scroll += overflow
        update({ scroll })
        await wait(300)
      }
      await wait(aim(id, 0.66, 0.42) * 1000)
      update({ hovered: id })
      await wait(140)
    }
    update({ done: 3, tools: 4, hovered: null })
    place({ visible: false })
    await wait(300)
    update({ done: 4, busy: false, lead: true })
    setProcessOpen(false)
    await wait(250)
    update({ table: true })
    await wait(400)
    update({ closing: true })
  }, playing)

  useEffect(() => {
    if (!state.busy || !playing || reduced) return
    const timer = setInterval(() => setElapsed((value) => value + 1), 1000)
    return () => clearInterval(timer)
  }, [state.busy, playing, reduced])

  const order = state.sorted ? browserScript.topRated : browserScript.recommended
  const latest = state.tools > 0 ? copy.tools[state.tools - 1] : undefined
  const groupLive = state.done < state.tools
  const tabTitle = state.loaded ? copy.site.title : browserScript.host
  const top = browserScript.topRated.slice(0, 3)

  const processHeader = (
    <span className="flex min-w-0 items-center gap-1.5 text-[13px] text-muted-foreground">
      <span className="truncate">{state.busy ? agent.processing : agent.processed}</span>
      <span aria-hidden="true" className="text-muted-foreground/70">
        ·
      </span>
      <span className="shrink-0">{agent.seconds.replace('{s}', String(elapsed))}</span>
    </span>
  )

  const processBody = (
    <div className="flex flex-col gap-3 pt-2">
      <p className="text-sm leading-relaxed">
        <StreamingText key={locale} text={copy.intro} locale={tag} active={playing} rate={48} />
      </p>
      {latest && (
        <div>
          <div className="flex min-h-7 max-w-full items-center gap-1.5 text-[13px] text-muted-foreground">
            <Sparkles className="size-3.5 shrink-0 text-muted-foreground/80" aria-hidden="true" />
            <span className="truncate">{latest.title}</span>
            {groupLive && <BeatDots className="shrink-0 text-muted-foreground/80" />}
            <ChevronDown className="size-3.5 shrink-0 opacity-60" aria-hidden="true" />
          </div>
          <div className="flex flex-col gap-0.5 pt-1.5">
            {copy.tools.slice(0, state.tools).map((tool, index) => (
              <ToolRow key={tool.title} tool={tool} done={index < state.done} copy={copy} running={agent.running} />
            ))}
          </div>
        </div>
      )}
    </div>
  )

  // Streamdown table wrapper: a tinted frame around the bordered table, as markdown.css draws it.
  const table = (
    <m.div {...blockEnter} className="rounded-[10px] border-[0.5px] border-border bg-muted/60 p-1.5">
      <div className="overflow-hidden rounded-md border-[0.5px] border-border bg-background">
        <table className="w-full border-separate border-spacing-0 text-[12.5px] leading-snug">
          <thead>
            <tr className="bg-muted/60 text-left font-medium">
              {[copy.table.stay, copy.table.rating, copy.table.price, copy.table.cancel].map((head, index) => (
                <th
                  key={head}
                  className={cn(
                    'border-b-[0.5px] border-border px-2.5 py-1.5 font-medium whitespace-nowrap',
                    index > 0 && 'border-l-[0.5px] text-right',
                    index === 3 && 'hidden text-center @5xl:table-cell'
                  )}>
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {top.map((id, row) => {
              const stay = copy.stays[id]
              const best = id === 'kamogawa'
              return (
                <m.tr
                  key={id}
                  initial={reduced ? false : { opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: row * 0.08, duration: 0.25 }}
                  className={cn(best && 'bg-primary/[0.04]')}>
                  <td className={cn('px-2.5 py-1.5', row < 2 && 'border-b-[0.5px] border-border')}>
                    <span className="flex min-w-0 items-center gap-1.5 font-medium">
                      <span className="truncate">{stay.name}</span>
                      {best && <Star className="size-3 shrink-0 fill-amber-400 text-amber-400" aria-hidden="true" />}
                    </span>
                    <span className="block truncate text-[11px] text-muted-foreground">
                      {stay.area.split(' · ')[0]}
                    </span>
                  </td>
                  <td
                    className={cn(
                      'border-l-[0.5px] border-border px-2.5 py-1.5 text-right tabular-nums',
                      row < 2 && 'border-b-[0.5px]'
                    )}>
                    {stay.rating}
                  </td>
                  <td
                    className={cn(
                      'border-l-[0.5px] border-border px-2.5 py-1.5 text-right font-medium tabular-nums',
                      row < 2 && 'border-b-[0.5px]'
                    )}>
                    {stay.price}
                    <span className="block text-[11px] font-normal whitespace-nowrap text-muted-foreground @5xl:hidden">
                      {stay.flexible ? copy.site.flexible : copy.site.fixed}
                    </span>
                  </td>
                  <td
                    className={cn(
                      'hidden border-l-[0.5px] border-border px-2.5 py-1.5 text-center @5xl:table-cell',
                      row < 2 && 'border-b-[0.5px]'
                    )}>
                    {stay.flexible ? (
                      <span className="inline-flex items-center gap-1 text-green-600 dark:text-green-400">
                        <Check className="size-3.5" aria-hidden="true" />
                        {copy.table.yes}
                      </span>
                    ) : (
                      <span className="text-muted-foreground">{copy.table.no}</span>
                    )}
                  </td>
                </m.tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </m.div>
  )

  const composer = (
    <div className="rounded-[20px] border-[0.5px] border-border bg-composer pt-2 shadow-sm" aria-hidden="true">
      <div className="min-h-[46px] px-[15px] pt-1.5 text-sm leading-[1.4]">
        <span className="line-clamp-2 text-muted-foreground">
          {state.busy ? agent.placeholderBusy : agent.placeholder}
        </span>
      </div>
      <div className="flex h-10 items-center justify-between gap-4 px-2 py-1.25">
        <div className="flex min-w-0 items-center gap-1.5">
          {[ToolCase, ShieldCheck, Plus].map((Icon, index) => (
            <span key={index} className={TOOLBAR_ICON}>
              <Icon className="size-[18px]" />
            </span>
          ))}
        </div>
        <div className="flex shrink-0 items-center gap-1.5">
          <span className="flex h-7 items-center gap-1 rounded-md px-1.5 text-xs text-muted-foreground dark:text-foreground">
            <Gauge className="size-3.5 shrink-0" />
            {agent.effort.value}
            <ChevronDown className="size-[13px] shrink-0 text-muted-foreground dark:text-current" />
          </span>
          {state.busy ? (
            <span className="flex size-7.5 items-center justify-center rounded-full text-destructive">
              <CirclePause className="size-5" />
            </span>
          ) : (
            <span className="mr-0.5 flex size-[22px] items-center justify-center rounded-full bg-muted-foreground/35 text-background">
              <ArrowUp className="size-3.5" strokeWidth={2.6} />
            </span>
          )}
        </div>
      </div>
    </div>
  )

  // SessionBrowserView: page tabs and pane controls, the Agent-active strip, then WebviewNavigation over the guest.
  const browserPane = (
    <m.aside
      aria-label={copy.pane.browser}
      initial={reduced ? false : { opacity: 0, clipPath: 'inset(0 0 0 100%)' }}
      animate={{ opacity: 1, clipPath: 'inset(0 0 0 0%)' }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="flex w-[48%] shrink-0 flex-col overflow-hidden border-l-[0.5px] border-border bg-background @4xl:w-[52%] @6xl:w-[55%]">
      <div
        className="flex h-11 shrink-0 items-center gap-2 border-b-[0.5px] border-border bg-card px-2"
        aria-hidden="true">
        <div className="flex min-w-0 flex-1 items-center">
          <div className="flex h-7 max-w-48 min-w-0 flex-1 basis-28 items-center gap-1 rounded-md bg-accent pr-1 pl-2 text-sm text-foreground">
            {state.loaded ? (
              <Favicon />
            ) : (
              <LoaderCircle className="size-3.5 shrink-0 animate-spin motion-reduce:animate-none" />
            )}
            <span className="min-w-0 flex-1 truncate text-[13px]">{tabTitle}</span>
            {state.busy && <span className="size-1.5 shrink-0 rounded-full bg-primary" />}
            <span className="flex size-5 shrink-0 items-center justify-center text-muted-foreground">
              <X className="size-3" />
            </span>
          </div>
        </div>
        <span className={NAV_BUTTON}>
          <Plus className="size-3.5" />
        </span>
        <span className={NAV_BUTTON}>
          <Maximize2 className="size-3.5" />
        </span>
        <span className={NAV_BUTTON}>
          <svg viewBox="0 0 24 24" fill="none" className="size-4">
            <rect x="3.5" y="4" width="17" height="16" rx="4" stroke="currentColor" strokeWidth="1.7" />
            <path d="M15.8 8v8" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7" />
          </svg>
        </span>
      </div>
      <AnimatePresence initial={false}>
        {state.busy && (
          <m.div
            role="status"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="shrink-0 overflow-hidden border-b-[0.5px] border-border text-xs text-muted-foreground">
            <span className="block truncate px-3 py-1">{copy.pane.agentActive.replace('{title}', tabTitle)}</span>
          </m.div>
        )}
      </AnimatePresence>
      <div className="flex h-8.75 shrink-0 items-center gap-2 border-b-[0.5px] border-border px-2" aria-hidden="true">
        <span className="flex shrink-0 items-center gap-0.5">
          <span className={cn(NAV_BUTTON, 'opacity-50')}>
            <ArrowLeft size={14} />
          </span>
          <span className={cn(NAV_BUTTON, 'opacity-50')}>
            <ArrowRight size={14} />
          </span>
          <span className={NAV_BUTTON}>
            <RotateCw size={14} />
          </span>
        </span>
        <span className="mx-1 flex h-7 min-w-0 flex-1 items-center gap-1.5 overflow-hidden rounded-md border border-border px-2.5 text-xs">
          <span className="shrink-0 text-muted-foreground">{browserScript.host}</span>
          {state.loaded && (
            <>
              <span className="shrink-0 text-muted-foreground/60">/</span>
              <span className="min-w-0 truncate">{copy.site.title}</span>
            </>
          )}
        </span>
        <span className="flex shrink-0 items-center gap-0.5">
          <span className={NAV_BUTTON}>
            <SquareDashedMousePointer size={14} />
          </span>
          <span className={NAV_BUTTON}>
            <ExternalLink size={14} />
          </span>
        </span>
      </div>
      <div ref={page} className="relative min-h-0 flex-1 bg-white dark:bg-[#161615]">
        <AnimatePresence>
          {state.loaded && (
            <m.div
              key="page"
              initial={reduced ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0">
              <StaynestPage copy={copy} state={state} order={order} setTarget={setTarget} />
            </m.div>
          )}
        </AnimatePresence>
        {!state.loaded && (
          <div className="absolute inset-x-0 top-0 h-0.5 overflow-hidden">
            <m.div
              className="h-full w-1/3 bg-[#0f766e]"
              initial={{ x: '-100%' }}
              animate={{ x: '300%' }}
              transition={{ duration: 0.6, ease: 'easeInOut', repeat: Number.POSITIVE_INFINITY }}
            />
          </div>
        )}
        <AgentPointer pointer={pointer} />
      </div>
    </m.aside>
  )

  const agentName = <span className="truncate text-sm leading-5 font-semibold">{copy.agentName}</span>

  return (
    <div ref={ref} role="region" aria-label={copy.region} className="@container">
      <DemoFrame chromeless title={agent.window} onReplay={replay} bodyClassName="h-[570px]">
        <AppShell active="agents" tab={{ title: copy.session, emoji: '🤖' }}>
          <div className="flex h-full min-h-0">
            <div className="flex min-w-0 flex-1 flex-col">
              <AgentSessionBar
                agentName={copy.agentName}
                workspace="trips"
                model={agentScript.model[locale]}
                picking={false}
                pane="browser"
              />
              <div
                ref={scroller}
                className="relative min-h-0 flex-1 overflow-y-auto px-4 [scrollbar-width:none] @5xl:px-6">
                <div ref={thread} className="space-y-4 py-4">
                  <m.div {...blockEnter} className="flex justify-end">
                    <div className="flex max-w-[calc(100%-2.5rem)] items-start gap-2.5">
                      <p className="rounded-[10px] bg-muted px-4 py-2.5 text-sm leading-relaxed">{copy.task}</p>
                      <UserAvatar className="mt-1.5" />
                    </div>
                  </m.div>
                  <m.div {...blockEnter} className="flex items-start gap-2.5">
                    <EmojiAvatar size={30} />
                    <div className="flex min-w-0 flex-1 flex-col">
                      {agentName}
                      <div className="mt-2 min-w-0">
                        {state.busy ? (
                          <div className="pb-2">
                            <div className="flex min-h-7 items-center py-0.5">{processHeader}</div>
                            {processBody}
                          </div>
                        ) : (
                          <div className="mb-1">
                            <button
                              type="button"
                              aria-expanded={processOpen}
                              onClick={() => setProcessOpen((open) => !open)}
                              className={cn(
                                'flex min-h-7 cursor-pointer items-center gap-1.5 rounded py-0.5 outline-none hover:text-foreground',
                                FOCUS
                              )}>
                              {processHeader}
                              <ChevronDown
                                aria-hidden="true"
                                className={cn(
                                  'size-3.5 shrink-0 opacity-60 transition-transform',
                                  !processOpen && '-rotate-90'
                                )}
                              />
                            </button>
                            {processOpen && <div className="pb-2">{processBody}</div>}
                          </div>
                        )}
                        {state.lead && (
                          <div className="flex flex-col gap-2.5 text-sm leading-relaxed">
                            <p>
                              <StreamingText
                                key={`${locale}-lead`}
                                text={copy.lead}
                                locale={tag}
                                active={playing}
                                rate={60}
                              />
                            </p>
                            {state.table && table}
                            {state.closing && (
                              <p>
                                <StreamingText
                                  key={`${locale}-closing`}
                                  text={copy.closing}
                                  locale={tag}
                                  active={playing}
                                  rate={60}
                                />
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </m.div>
                </div>
              </div>
              <div className="shrink-0 px-3 pb-3 @5xl:px-5">{composer}</div>
            </div>
            {browserPane}
          </div>
        </AppShell>
      </DemoFrame>
    </div>
  )
}
