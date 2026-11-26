import { AnimatePresence, m } from 'framer-motion'
import {
  AtSign,
  Boxes,
  ChevronDown,
  CirclePause,
  Clock,
  Copy,
  Ellipsis,
  Eraser,
  FileSearch,
  Gauge,
  GitBranch,
  Globe,
  Languages,
  LoaderCircle,
  type LucideIcon,
  Menu,
  MessageSquare,
  MousePointerClick,
  NotebookPen,
  Palette,
  Paperclip,
  Plus,
  RefreshCw,
  Search,
  Trash,
  Volume2,
  X,
  Zap
} from 'lucide-react'
import { type ReactNode, type SVGProps, useRef, useState } from 'react'

import { type ChatPanelItemId, chatDemo } from '@/content/demos/chat'
import { ease, spring } from '@/lib/motion'
import { cn } from '@/lib/utils'
import BeatDots from '../primitives/BeatDots'
import DemoFrame from '../primitives/DemoFrame'
import Kbd from '../primitives/Kbd'
import ProviderIcon from '../primitives/ProviderIcon'
import StreamingText from '../primitives/StreamingText'
import { useDemoLocale } from '../primitives/useDemoLocale'
import { useDemoPlayback, useDemoScript } from '../primitives/useDemoScript'
import { useStickToBottom } from '../primitives/useStickToBottom'

type Phase = 'idle' | 'compose' | 'sent' | 'process' | 'answer' | 'done'

interface DemoState {
  phase: Phase
  panelOpen: boolean
  panelIndex: number
  webActive: boolean
  kbToken: boolean
  typed: string
  thinkingIndex: number
  thinkingDone: boolean
  toolStarted: boolean
  toolDone: boolean
  elapsed: number
}

const INITIAL: DemoState = {
  phase: 'idle',
  panelOpen: false,
  panelIndex: 0,
  webActive: false,
  kbToken: false,
  typed: '',
  thinkingIndex: 0,
  thinkingDone: false,
  toolStarted: false,
  toolDone: false,
  elapsed: 0
}

const PHASE_ORDER: Phase[] = ['idle', 'compose', 'sent', 'process', 'answer', 'done']
const reached = (phase: Phase, target: Phase) => PHASE_ORDER.indexOf(phase) >= PHASE_ORDER.indexOf(target)

// Default assistant seed (src/shared/data/presets/defaultAssistant.ts).
const ASSISTANT_EMOJI = '😀'

// Default sidebar shortcuts, in preference order (preferenceSchemas `ui.sidebar_shortcut`).
const SIDEBAR_APPS: LucideIcon[] = [MousePointerClick, MessageSquare, Clock, Languages, Palette, FileSearch]

// Desktop message block entrance: slide 10px from the right on a 0.3s spring without bounce.
const blockEnter = { initial: { opacity: 0, x: 10 }, animate: { opacity: 1, x: 0 }, transition: spring.block }

/** NewConversationIcon from the desktop renderer. */
function NewConversationIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}>
      <g transform="translate(12 12) scale(1.1) translate(-12 -12)">
        <path d="M13 4H6a2 2 0 0 0-2 2v13l4-3h10a2 2 0 0 0 2-2v-3" />
        <path d="M18 3.5v5" />
        <path d="M15.5 6h5" />
      </g>
    </svg>
  )
}

function McpLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" fillRule="evenodd" aria-hidden="true" {...props}>
      <path d="M15.688 2.343a2.588 2.588 0 00-3.61 0l-9.626 9.44a.863.863 0 01-1.203 0 .823.823 0 010-1.18l9.626-9.44a4.313 4.313 0 016.016 0 4.116 4.116 0 011.204 3.54 4.3 4.3 0 013.609 1.18l.05.05a4.115 4.115 0 010 5.9l-8.706 8.537a.274.274 0 000 .393l1.788 1.754a.823.823 0 010 1.18.863.863 0 01-1.203 0l-1.788-1.753a1.92 1.92 0 010-2.754l8.706-8.538a2.47 2.47 0 000-3.54l-.05-.049a2.588 2.588 0 00-3.607-.003l-7.172 7.034-.002.002-.098.097a.863.863 0 01-1.204 0 .823.823 0 010-1.18l7.273-7.133a2.47 2.47 0 00-.003-3.537z" />
      <path d="M14.485 4.703a.823.823 0 000-1.18.863.863 0 00-1.204 0l-7.119 6.982a4.115 4.115 0 000 5.9 4.314 4.314 0 006.016 0l7.12-6.982a.823.823 0 000-1.18.863.863 0 00-1.204 0l-7.119 6.982a2.588 2.588 0 01-3.61 0 2.47 2.47 0 010-3.54l7.12-6.982z" />
    </svg>
  )
}

function SidebarCollapseIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} aria-hidden="true" {...props}>
      <rect x="3.5" y="4" width="17" height="16" rx="4" />
      <path d="M8.2 8v8" strokeLinecap="round" />
    </svg>
  )
}

/** The bundled default user avatar (renderer/assets/images/avatar.svg). */
function DefaultAvatar({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 1158 1158" aria-hidden="true" className={cn('shrink-0 rounded-full', className)}>
      <rect width="1158" height="1158" fill="#7EDBC2" fillOpacity="0.25" />
      <circle cx="579.5" cy="447" r="202" fill="#49B8A3" fillOpacity="0.97" />
      <path
        d="M579.5 689C796.272 689 972 864.728 972 1081.5V1158H187V1081.5C187 864.728 362.728 689 579.5 689Z"
        fill="#6ACBB9"
        fillOpacity="0.42"
      />
    </svg>
  )
}

/** `icon-ic_send` glyph: a filled circle with an arrow cut out of it. */
function SendGlyph() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-[22px]">
      <circle cx="12" cy="12" r="11" fill="currentColor" />
      <path
        d="M12 17.4V7.5M8.1 11.4 12 7.5l3.9 3.9"
        fill="none"
        stroke="var(--composer)"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/** EmojiIcon from @cherrystudio/ui: the glyph over a blurred, enlarged copy of itself. */
function EmojiIcon({ emoji, size }: { emoji: string; size: number }) {
  return (
    <span
      aria-hidden="true"
      className="relative flex shrink-0 items-center justify-center overflow-hidden rounded-full"
      style={{ width: size, height: size }}>
      <span
        className="absolute inset-0 flex scale-150 items-center justify-center opacity-40 blur-sm"
        style={{ fontSize: size * 1.2, lineHeight: 1 }}>
        {emoji}
      </span>
      <span className="relative" style={{ fontSize: size * 0.7, lineHeight: 1 }}>
        {emoji}
      </span>
    </span>
  )
}

const panelIcons: Record<ChatPanelItemId, ReactNode> = {
  new: <NewConversationIcon />,
  attachment: <Paperclip />,
  web: <Globe />,
  knowledge: <FileSearch />,
  mcp: <McpLogo />,
  prompts: <Zap />,
  clear: <Eraser />
}

const messageActions: LucideIcon[] = [Copy, Volume2, RefreshCw, AtSign, Languages, NotebookPen, Trash, Menu]

export default function ChatStreamDemo() {
  const { locale, tag } = useDemoLocale()
  const copy = chatDemo[locale]
  const ref = useRef<HTMLDivElement>(null)
  const scroller = useRef<HTMLDivElement>(null)
  const thread = useRef<HTMLDivElement>(null)
  const playing = useDemoPlayback(ref)
  const [scenarioIndex, setScenarioIndex] = useState(0)
  const [state, setState] = useState<DemoState>(INITIAL)
  const [processOpen, setProcessOpen] = useState(false)
  const scenario = copy.scenarios[scenarioIndex]
  const toolPanelIndex = copy.panelItems.findIndex((item) => item.id === scenario.tool)
  const update = (patch: Partial<DemoState>) => setState((previous) => ({ ...previous, ...patch }))
  useStickToBottom(scroller, thread)

  const { replay } = useDemoScript(async ({ wait, reduced }) => {
    setProcessOpen(false)
    const toolPatch = { webActive: scenario.tool === 'web' }
    if (reduced) {
      setState({
        ...INITIAL,
        ...toolPatch,
        phase: 'done',
        typed: scenario.prompt,
        thinkingDone: true,
        toolStarted: true,
        toolDone: true,
        elapsed: 5
      })
      return
    }
    setState(INITIAL)
    await wait(700)
    update({ phase: 'compose', panelOpen: true, panelIndex: 0 })
    for (let index = 1; index <= toolPanelIndex; index++) {
      await wait(320)
      update({ panelIndex: index })
    }
    await wait(520)
    update({ panelOpen: false, ...toolPatch, kbToken: scenario.tool === 'knowledge' })
    await wait(320)
    const cjk = locale === 'zh'
    for (let index = 1; index <= scenario.prompt.length; index++) {
      update({ typed: scenario.prompt.slice(0, index) })
      await wait(cjk ? 62 : 26)
    }
    await wait(480)
    update({ phase: 'sent', kbToken: false })
    await wait(520)
    update({ phase: 'process' })
    // ThinkingBlock keeps each preview sentence visible for at least one second.
    for (let index = 0; index < scenario.thinking.length; index++) {
      update({ thinkingIndex: index, elapsed: index })
      await wait(1150)
    }
    update({ thinkingDone: true, toolStarted: true, elapsed: 3 })
    await wait(800)
    update({ elapsed: 4 })
    await wait(700)
    update({ toolDone: true, elapsed: 5 })
    await wait(450)
    update({ phase: 'answer' })
  }, playing)

  const choose = (index: number) => {
    setScenarioIndex(index)
    replay()
  }

  const { phase } = state
  const sent = reached(phase, 'sent')
  const busy = sent && phase !== 'done'
  const composing = phase === 'compose'
  const showSlash = composing && state.panelOpen

  const processRows = (
    <div className="flex flex-col gap-3 pt-2 text-[13px] leading-5">
      {state.thinkingDone ? (
        <span className="text-muted-foreground">{copy.reasoned}</span>
      ) : (
        <div className="flex min-h-7 min-w-0 items-center gap-1 text-muted-foreground">
          <span className="shrink-0">{copy.thinking}</span>
          <BeatDots className="mx-1 shrink-0 opacity-60" />
          <AnimatePresence mode="wait" initial={false}>
            <m.span
              key={state.thinkingIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={spring.settle}
              className="min-w-0 truncate">
              {scenario.thinking[state.thinkingIndex]}
            </m.span>
          </AnimatePresence>
        </div>
      )}
      {state.toolStarted && (
        <m.div {...blockEnter} className="flex min-w-0 items-center gap-3 text-muted-foreground">
          {scenario.tool === 'mcp' ? (
            <>
              <span className="min-w-0 truncate text-foreground/90">{scenario.query}</span>
              <span className="shrink-0 text-xs text-primary">{state.toolDone ? copy.mcpDone : copy.mcpRunning}</span>
            </>
          ) : state.toolDone ? (
            <>
              {scenario.tool === 'web' && <span className="min-w-0 flex-1 truncate">{scenario.query}</span>}
              <span className={cn('shrink-0', scenario.tool === 'web' && 'text-muted-foreground/70')}>
                {scenario.toolResult}
              </span>
            </>
          ) : (
            <span className="flex min-w-0 items-center gap-1.5">
              <LoaderCircle className="size-3.5 shrink-0 motion-safe:animate-spin" aria-hidden="true" />
              <span className="shrink-0">{copy.searching}</span>
              <span className="min-w-0 truncate">{scenario.query}</span>
            </span>
          )}
        </m.div>
      )}
    </div>
  )

  const composer = (
    <div className="relative mx-auto w-full max-w-[848px] px-4 sm:px-6">
      <AnimatePresence>
        {state.panelOpen && (
          <m.div
            aria-hidden="true"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ y: { duration: 0.14, ease: ease.expo }, opacity: { duration: 0.2, ease: 'easeOut' } }}
            className="absolute right-6 bottom-full left-6 z-20 mb-1 overflow-hidden rounded-xl border-[0.5px] border-border bg-card/90 py-1.25 backdrop-blur-2xl sm:right-8 sm:left-8">
            {copy.panelItems.map((item, index) => (
              <div
                key={item.id}
                className={cn(
                  'mx-[5px] mb-px flex h-7 items-center gap-1.5 rounded-md px-2 text-[13px] transition-colors duration-100',
                  index === state.panelIndex && 'bg-accent'
                )}>
                <span className="flex size-[13px] shrink-0 text-muted-foreground [&>svg]:size-full">
                  {panelIcons[item.id]}
                </span>
                <span className="truncate">{item.label}</span>
              </div>
            ))}
            <div className="flex items-center justify-end gap-2 px-3 pt-2 pb-[5px] text-[12px] text-muted-foreground sm:gap-4">
              {[
                ['Esc', copy.panelHints.close],
                ['▲▼', copy.panelHints.select],
                ['Tab/↩︎', copy.panelHints.confirm]
              ].map(([key, label]) => (
                <span key={key} className="flex items-center gap-1">
                  <Kbd>{key}</Kbd>
                  <span className="hidden sm:inline">{label}</span>
                </span>
              ))}
            </div>
          </m.div>
        )}
      </AnimatePresence>

      <div className="mb-0 rounded-[20px] border-[0.5px] border-border bg-composer pt-2 shadow-sm">
        <div className="min-h-[46px] px-[15px] pt-1.5 text-[14px] leading-[1.4]">
          {state.kbToken && (
            <span className="mr-1 inline-flex items-baseline gap-1 text-primary motion-safe:animate-in motion-safe:fade-in">
              <Boxes className="size-[1em] translate-y-[0.12em] opacity-80" aria-hidden="true" />
              {scenario.query}
            </span>
          )}
          {state.typed && !sent ? (
            <span className="text-foreground">
              {state.typed}
              <span className="ml-px inline-block h-4 w-px translate-y-0.5 bg-foreground motion-safe:animate-caret" />
            </span>
          ) : showSlash ? (
            <span className="text-foreground">
              /
              <span className="ml-px inline-block h-4 w-px translate-y-0.5 bg-foreground motion-safe:animate-caret" />
            </span>
          ) : state.kbToken ? null : (
            <span className="text-muted-foreground/70">{copy.placeholder}</span>
          )}
        </div>

        <div className="flex h-10 items-center justify-between gap-4 px-2 py-1.25">
          <div className="flex min-w-0 items-center gap-1.5 text-muted-foreground dark:text-foreground">
            <span className="flex size-7.5 items-center justify-center rounded-full">
              <NewConversationIcon className="size-[18px]" />
            </span>
            <span
              className={cn(
                'flex size-7.5 items-center justify-center rounded-full transition-colors duration-150',
                state.webActive && 'bg-accent text-primary'
              )}>
              <Globe className="size-[18px]" aria-hidden="true" />
            </span>
            <span className="flex size-[30px] items-center justify-center rounded-full">
              <Plus className="size-[18px]" aria-hidden="true" />
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="flex h-7 items-center gap-1 rounded-md px-1.5 text-xs text-muted-foreground dark:text-foreground">
              <Gauge className="size-3.5" aria-hidden="true" />
              {copy.effort}
              <ChevronDown className="size-[13px] text-muted-foreground" aria-hidden="true" />
            </span>
            {busy ? (
              <span className="flex size-7.5 items-center justify-center rounded-full text-destructive">
                <CirclePause className="size-5" aria-hidden="true" />
              </span>
            ) : (
              <span
                className={cn(
                  'mr-0.5 flex transition-colors duration-200',
                  state.typed && !sent ? 'text-primary' : 'text-foreground/25'
                )}>
                <SendGlyph />
              </span>
            )}
          </div>
        </div>
      </div>
      <p className="truncate pt-1.5 pb-2.5 text-center text-[11px] text-muted-foreground">{copy.disclaimer}</p>
    </div>
  )

  return (
    <div ref={ref} role="region" aria-label={copy.window}>
      <DemoFrame
        chromeless
        title={copy.window}
        onReplay={() => choose(scenarioIndex)}
        bodyClassName="h-[480px] sm:h-[500px]">
        <div className="flex h-full bg-sidebar">
          <aside className="hidden w-[50px] shrink-0 flex-col items-center sm:flex" aria-hidden="true">
            {/* macOS draws the window controls inside the rail's top band. */}
            <div className="flex h-11 shrink-0 items-center gap-1.5 pl-1">
              <span className="size-2.5 rounded-full bg-foreground/20" />
              <span className="size-2.5 rounded-full bg-foreground/20" />
              <span className="size-2.5 rounded-full bg-foreground/20" />
            </div>
            <div className="flex flex-1 flex-col items-center gap-1 px-1.5">
              {SIDEBAR_APPS.map((Icon, index) => (
                <span
                  key={index}
                  className={cn(
                    'flex size-9 items-center justify-center rounded-full text-muted-foreground',
                    Icon === MessageSquare && 'bg-foreground/12 text-foreground'
                  )}>
                  <Icon
                    className="size-[18px]"
                    strokeWidth={1.6}
                    fill={Icon === MessageSquare ? 'currentColor' : 'none'}
                  />
                </span>
              ))}
            </div>
            <span className="flex size-9 items-center justify-center pb-2.5">
              <DefaultAvatar className="size-6.5" />
            </span>
          </aside>

          <div className="flex min-w-0 flex-1 flex-col">
            <div className="flex h-11 shrink-0 items-center gap-1 pl-1.5 sm:pl-0" aria-hidden="true">
              <span className="flex h-[30px] min-w-[56px] max-w-[160px] items-center gap-1.5 rounded-[10px] bg-foreground/12 px-2">
                <EmojiIcon emoji={ASSISTANT_EMOJI} size={14} />
                <span className="min-w-0 flex-1 truncate text-xs font-medium">{scenario.topic}</span>
                <X className="size-2.5 shrink-0" />
              </span>
              <span className="ml-0.5 flex size-7 items-center justify-center text-muted-foreground">
                <Plus className="size-3.5" />
              </span>
              <span className="mr-2 ml-auto flex size-8 items-center justify-center text-muted-foreground">
                <Search className="size-4" strokeWidth={1.8} />
              </span>
            </div>

            <div className="flex min-h-0 flex-1 pr-1.5 pb-1.5 pl-1.5 sm:pl-0">
              <div className="flex min-w-0 flex-1 overflow-hidden rounded-[12px] border-[0.5px] border-border bg-background">
                <nav
                  aria-label={copy.section}
                  className="hidden w-[210px] shrink-0 flex-col border-r-[0.5px] border-border p-1.5 text-[13px] md:flex">
                  <div className="flex min-h-8 items-center gap-1" aria-hidden="true">
                    <span className="flex min-h-8 flex-1 items-center gap-1.5 rounded-lg px-1.5">
                      <span className="flex size-6 items-center justify-center">
                        <Plus className="size-4" />
                      </span>
                      {copy.addAssistant}
                    </span>
                    <span className="flex size-[30px] items-center justify-center text-muted-foreground">
                      <Ellipsis className="size-4" />
                    </span>
                  </div>
                  <div className="flex h-9 items-center px-2.5 text-muted-foreground" aria-hidden="true">
                    {copy.section}
                  </div>
                  <div className="flex h-9 items-center" aria-hidden="true">
                    <span className="flex h-8 w-full items-center gap-1.5 rounded-lg px-1.5">
                      <EmojiIcon emoji={ASSISTANT_EMOJI} size={24} />
                      <span className="truncate">{copy.assistant}</span>
                    </span>
                  </div>
                  {copy.scenarios.map((item, index) => (
                    <div key={item.id} className="flex h-9 items-center">
                      <button
                        type="button"
                        onClick={() => choose(index)}
                        aria-current={index === scenarioIndex ? 'true' : undefined}
                        className={cn(
                          'flex h-8 w-full cursor-pointer items-center gap-1.5 rounded-lg px-1.5 text-left transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-primary',
                          index === scenarioIndex ? 'bg-black/8 font-medium dark:bg-white/14' : 'hover:bg-foreground/5'
                        )}>
                        <span className="size-6 shrink-0" />
                        <span className="min-w-0 truncate">{item.topic}</span>
                      </button>
                    </div>
                  ))}
                </nav>

                <div className="flex min-h-0 min-w-0 flex-1 flex-col">
                  <div className="flex h-11 shrink-0 items-center gap-1.5 px-2 text-xs" aria-hidden="true">
                    <span className="flex size-[30px] shrink-0 items-center justify-center text-muted-foreground">
                      <SidebarCollapseIcon className="size-[18px]" />
                    </span>
                    <span className="flex size-7 shrink-0 items-center justify-center">
                      <EmojiIcon emoji={ASSISTANT_EMOJI} size={20} />
                    </span>
                    <span className="hidden shrink-0 font-medium sm:inline">{copy.assistant}</span>
                    <span className="flex h-7 min-w-0 items-center gap-1.5 px-1.5 font-medium">
                      <ProviderIcon id={scenario.model.provider} className="size-5 shrink-0 rounded-full" />
                      <span className="truncate">
                        {scenario.model.name} | {scenario.model.providerName}
                      </span>
                      <ChevronDown className="size-3.5 shrink-0 text-muted-foreground" />
                    </span>
                    <span className="ml-auto flex shrink-0 items-center gap-0.5 text-muted-foreground">
                      <span className="flex size-[30px] items-center justify-center">
                        <Globe className="size-3.5" />
                      </span>
                      <span className="flex size-[30px] items-center justify-center">
                        <GitBranch className="size-3.5" />
                      </span>
                    </span>
                  </div>

                  <div className="relative min-h-0 flex-1">
                    {!sent && (
                      <div
                        className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center"
                        aria-hidden="true">
                        <EmojiIcon emoji={ASSISTANT_EMOJI} size={48} />
                        <p className="text-lg font-medium">{copy.greeting}</p>
                      </div>
                    )}
                    <div ref={scroller} className="h-full overflow-y-auto [scrollbar-width:none]">
                      <div ref={thread} className="mx-auto max-w-[848px] space-y-2.5 px-4 py-4 sm:px-6">
                        {sent && (
                          <m.div {...blockEnter} className="flex justify-end">
                            <div className="flex max-w-[calc(100%-2.5rem)] items-start gap-2.5">
                              <p className="rounded-[10px] bg-muted px-4 py-2.5 text-[14px] leading-6">
                                {scenario.prompt}
                              </p>
                              <DefaultAvatar className="mt-1.5 size-[30px]" />
                            </div>
                          </m.div>
                        )}

                        {reached(phase, 'process') && (
                          <m.div {...blockEnter} className="flex gap-2.5 pt-2.5">
                            <EmojiIcon emoji={ASSISTANT_EMOJI} size={30} />
                            <div className="min-w-0 flex-1">
                              <div className="flex min-w-0 items-center gap-1.5">
                                <span className="truncate text-sm leading-5 font-semibold">{copy.assistant}</span>
                                <span className="flex min-w-0 items-center gap-1 text-xs text-muted-foreground/70">
                                  <ProviderIcon id={scenario.model.provider} className="size-4 rounded-full" />
                                  <span className="truncate">{scenario.model.name}</span>
                                </span>
                              </div>

                              <div className="mt-2">
                                {phase === 'process' ? (
                                  <div className="mb-2 pb-2">
                                    <div className="flex min-h-7 items-center gap-1.5 text-[13px]">
                                      <span className="text-muted-foreground/70">{copy.processing}</span>
                                      <span className="text-muted-foreground/70" aria-hidden="true">
                                        ·
                                      </span>
                                      <span className="text-muted-foreground">{copy.seconds(state.elapsed)}</span>
                                    </div>
                                    {processRows}
                                  </div>
                                ) : (
                                  <div className="mb-2">
                                    <button
                                      type="button"
                                      aria-expanded={processOpen}
                                      onClick={() => setProcessOpen((open) => !open)}
                                      className="group flex min-h-7 cursor-pointer items-center gap-1.5 rounded py-0.5 text-[13px] focus-visible:outline-2 focus-visible:outline-primary">
                                      <span className="text-muted-foreground/70 transition-colors group-hover:text-foreground">
                                        {copy.processed}
                                      </span>
                                      <span className="text-muted-foreground/70" aria-hidden="true">
                                        ·
                                      </span>
                                      <span className="text-muted-foreground transition-colors group-hover:text-foreground">
                                        {copy.seconds(state.elapsed)}
                                      </span>
                                      <ChevronDown
                                        className={cn(
                                          'size-3.5 opacity-60 transition-transform',
                                          !processOpen && '-rotate-90'
                                        )}
                                        aria-hidden="true"
                                      />
                                    </button>
                                    {processOpen && <div className="pb-2">{processRows}</div>}
                                  </div>
                                )}

                                {reached(phase, 'answer') && (
                                  <div className="text-[14px] leading-6 text-foreground/90">
                                    <StreamingText
                                      key={`${locale}-${scenario.id}`}
                                      text={scenario.answer}
                                      locale={tag}
                                      active={phase === 'answer' && playing}
                                      rate={42}
                                      onDone={() => update({ phase: 'done' })}
                                    />
                                  </div>
                                )}

                                {phase === 'done' && (
                                  <div
                                    className="mt-1 flex min-h-6.5 items-center gap-0.5 text-muted-foreground/70 motion-safe:animate-in motion-safe:fade-in motion-safe:duration-200"
                                    aria-hidden="true">
                                    {messageActions.map((Icon, index) => (
                                      <span
                                        key={index}
                                        className="flex size-6.5 items-center justify-center rounded-md">
                                        <Icon className="size-[15px]" />
                                      </span>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                          </m.div>
                        )}
                      </div>
                    </div>
                  </div>

                  {composer}
                </div>
              </div>
            </div>
          </div>
        </div>
      </DemoFrame>
    </div>
  )
}
