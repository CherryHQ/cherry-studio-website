import { AnimatePresence, m } from 'framer-motion'
import {
  ArrowUp,
  AtSign,
  BookOpen,
  Check,
  ChevronDown,
  ChevronRight,
  Copy,
  FileText,
  Globe,
  MessageSquareText,
  Paperclip,
  Plug,
  Plus,
  RotateCcw,
  Square,
  Zap
} from 'lucide-react'
import { useRef, useState } from 'react'

import { chatDemo } from '@/content/demos/chat'
import { ease, spring } from '@/lib/motion'
import { cn } from '@/lib/utils'
import BeatDots from '../primitives/BeatDots'
import DemoFrame from '../primitives/DemoFrame'
import ProviderIcon from '../primitives/ProviderIcon'
import StreamingText from '../primitives/StreamingText'
import { useDemoLocale } from '../primitives/useDemoLocale'
import { useDemoPlayback, useDemoScript } from '../primitives/useDemoScript'
import { useStickToBottom } from '../primitives/useStickToBottom'

type Phase = 'idle' | 'compose' | 'sent' | 'thinking' | 'tool' | 'answer' | 'done'

interface DemoState {
  phase: Phase
  panelOpen: boolean
  panelIndex: number
  toolChip: boolean
  typed: string
  thinkingIndex: number
  toolDone: boolean
}

const INITIAL: DemoState = {
  phase: 'idle',
  panelOpen: false,
  panelIndex: 0,
  toolChip: false,
  typed: '',
  thinkingIndex: 0,
  toolDone: false
}

const PHASE_ORDER: Phase[] = ['idle', 'compose', 'sent', 'thinking', 'tool', 'answer', 'done']
const reached = (phase: Phase, target: Phase) => PHASE_ORDER.indexOf(phase) >= PHASE_ORDER.indexOf(target)

const toolIcons = { web: Globe, knowledge: BookOpen, mcp: Plug, files: Paperclip, mention: AtSign, phrases: Zap }

// Desktop message block entrance: slide 10px from the right on a 0.3s spring without bounce.
const blockEnter = { initial: { opacity: 0, x: 10 }, animate: { opacity: 1, x: 0 }, transition: spring.block }

export default function ChatStreamDemo() {
  const { locale, tag } = useDemoLocale()
  const copy = chatDemo[locale]
  const ref = useRef<HTMLDivElement>(null)
  const scroller = useRef<HTMLDivElement>(null)
  const thread = useRef<HTMLDivElement>(null)
  const playing = useDemoPlayback(ref)
  const [scenarioIndex, setScenarioIndex] = useState(0)
  const [state, setState] = useState<DemoState>(INITIAL)
  const scenario = copy.scenarios[scenarioIndex]
  const toolPanelIndex = copy.panelItems.findIndex((item) => item.id === scenario.tool)
  const update = (patch: Partial<DemoState>) => setState((previous) => ({ ...previous, ...patch }))
  useStickToBottom(scroller, thread)

  const { replay } = useDemoScript(async ({ wait, reduced }) => {
    if (reduced) {
      setState({
        ...INITIAL,
        phase: 'done',
        toolChip: true,
        typed: scenario.prompt,
        thinkingIndex: scenario.thinking.length - 1,
        toolDone: true
      })
      return
    }
    setState(INITIAL)
    await wait(700)
    update({ phase: 'compose', panelOpen: true, panelIndex: 0 })
    for (let index = 1; index <= toolPanelIndex; index++) {
      await wait(360)
      update({ panelIndex: index })
    }
    await wait(520)
    update({ panelOpen: false, toolChip: true })
    await wait(260)
    const cjk = locale === 'zh'
    for (let index = 1; index <= scenario.prompt.length; index++) {
      update({ typed: scenario.prompt.slice(0, index) })
      await wait(cjk ? 62 : 26)
    }
    await wait(480)
    update({ phase: 'sent' })
    await wait(520)
    update({ phase: 'thinking' })
    // ThinkingBlock keeps each preview sentence visible for at least one second.
    for (let index = 0; index < scenario.thinking.length; index++) {
      update({ thinkingIndex: index })
      await wait(1150)
    }
    update({ phase: 'tool' })
    await wait(1500)
    update({ toolDone: true })
    await wait(450)
    update({ phase: 'answer' })
  }, playing)

  const choose = (index: number) => {
    setScenarioIndex(index)
    replay()
  }

  const { phase } = state
  const sent = reached(phase, 'sent')
  const busy = reached(phase, 'sent') && phase !== 'done'
  const ToolIcon = toolIcons[scenario.tool]

  const composer = (
    <div
      key={sent ? 'docked' : 'centered'}
      className={cn(
        'relative w-full rounded-[20px] border-[0.5px] border-hairline-strong bg-composer p-3 shadow-sm',
        sent && 'motion-safe:animate-dock-down origin-bottom'
      )}>
      <AnimatePresence>
        {state.panelOpen && (
          <m.div
            aria-hidden="true"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ y: { duration: 0.14, ease: ease.expo }, opacity: { duration: 0.2, ease: ease.expo } }}
            className="absolute bottom-full left-0 z-20 mb-2 w-[min(280px,100%)] overflow-hidden rounded-xl border border-border bg-popover/80 p-1 shadow-(--shadow-float) backdrop-blur-2xl">
            <p className="px-2.5 pt-1.5 pb-1 font-mono text-[10px] tracking-wider text-muted-foreground uppercase">
              / {copy.panelTitle}
            </p>
            {copy.panelItems.map((item, index) => {
              const Icon = toolIcons[item.id]
              return (
                <div
                  key={item.id}
                  className={cn(
                    'flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-[13px] transition-colors duration-100',
                    index === state.panelIndex ? 'bg-accent text-foreground' : 'text-muted-foreground'
                  )}>
                  <Icon className="size-3.5 shrink-0" aria-hidden="true" />
                  <span className="flex-1 truncate">{item.label}</span>
                  {item.hint && <span className="font-mono text-[10px] text-muted-foreground/70">{item.hint}</span>}
                </div>
              )
            })}
          </m.div>
        )}
      </AnimatePresence>

      <div className="flex min-h-[44px] flex-wrap items-start gap-1.5 px-1 text-[14px] leading-6">
        {state.toolChip && (
          <span className="inline-flex h-6 items-center gap-1 rounded-md bg-primary/12 px-1.5 text-xs font-medium text-primary motion-safe:animate-in motion-safe:fade-in motion-safe:zoom-in-95">
            <ToolIcon className="size-3" aria-hidden="true" />
            {scenario.toolLabel}
          </span>
        )}
        {sent ? (
          <span className="text-muted-foreground/70">{copy.placeholder}</span>
        ) : state.typed ? (
          <span className="text-foreground">
            {state.typed}
            <span className="ml-px inline-block h-4 w-px translate-y-0.5 bg-foreground motion-safe:animate-caret" />
          </span>
        ) : (
          <span className="text-muted-foreground/70">
            {phase === 'compose' ? '/' : copy.placeholder}
            {phase === 'compose' && (
              <span className="ml-px inline-block h-4 w-px translate-y-0.5 bg-foreground motion-safe:animate-caret" />
            )}
          </span>
        )}
      </div>

      <div className="mt-2 flex items-center justify-between">
        <div className="flex items-center gap-0.5 text-muted-foreground">
          {[Plus, Globe, BookOpen, AtSign].map((Icon, index) => (
            <span key={index} className="flex size-7 items-center justify-center rounded-full">
              <Icon className="size-4" aria-hidden="true" />
            </span>
          ))}
        </div>
        <span
          className={cn(
            'flex size-7 items-center justify-center rounded-full transition-colors duration-200',
            busy || state.typed ? 'bg-foreground text-background' : 'bg-secondary text-muted-foreground'
          )}>
          {busy ? (
            <Square className="size-2.5 fill-current" aria-hidden="true" />
          ) : (
            <ArrowUp className="size-4" aria-hidden="true" />
          )}
        </span>
      </div>
    </div>
  )

  const chips = (
    <div className="flex flex-wrap justify-center gap-1.5">
      {copy.scenarios.map((item, index) => (
        <button
          key={item.id}
          type="button"
          onClick={() => choose(index)}
          aria-pressed={index === scenarioIndex}
          className={cn(
            'cursor-pointer rounded-full border px-3 py-1 text-xs transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
            index === scenarioIndex
              ? 'border-primary/40 bg-primary/10 text-foreground'
              : 'border-border text-muted-foreground hover:border-hairline-strong hover:text-foreground'
          )}>
          {item.chip}
        </button>
      ))}
    </div>
  )

  return (
    <div ref={ref} role="region" aria-label={copy.window}>
      <DemoFrame title={copy.window} onReplay={() => choose(scenarioIndex)} bodyClassName="h-[480px] sm:h-[500px]">
        <div className="grid h-full md:grid-cols-[168px_minmax(0,1fr)]">
          <aside
            className="hidden flex-col gap-1 border-r border-border bg-sidebar/50 p-2.5 md:flex"
            aria-hidden="true">
            <div className="mb-2 flex items-center gap-2 rounded-lg px-2 py-1.5">
              <span className="flex size-6 items-center justify-center rounded-full bg-primary/15 text-xs">🍒</span>
              <span className="truncate text-xs font-medium">{copy.assistant}</span>
            </div>
            {copy.topics.map((topic, index) => (
              <div
                key={topic}
                className={cn(
                  'flex items-center gap-2 truncate rounded-lg px-2 py-1.5 text-xs transition-colors duration-200',
                  index === scenarioIndex ? 'bg-accent text-foreground' : 'text-muted-foreground'
                )}>
                <MessageSquareText className="size-3 shrink-0" />
                <span className="truncate">{topic}</span>
              </div>
            ))}
          </aside>

          <div className="flex min-h-0 min-w-0 flex-col">
            <div className="flex h-10 shrink-0 items-center gap-2 border-b border-border px-4 text-xs">
              <span className="inline-flex items-center gap-1.5 rounded-md px-1.5 py-1 font-medium">
                <ProviderIcon id={scenario.model.provider} className="size-3.5" />
                {scenario.model.name}
                <ChevronDown className="size-3 text-muted-foreground" aria-hidden="true" />
              </span>
            </div>

            {!sent ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-5 px-5 sm:px-10">
                <p className="text-gradient text-xl font-semibold tracking-tight">{copy.greeting}</p>
                {composer}
                {chips}
              </div>
            ) : (
              <>
                <div ref={scroller} className="min-h-0 flex-1 overflow-y-auto px-5 [scrollbar-width:none] sm:px-8">
                  <div ref={thread} className="space-y-5 py-5">
                    <m.div {...blockEnter} className="flex justify-end">
                      <p className="max-w-[85%] rounded-[10px] bg-chat-user px-4 py-2.5 text-[14px] leading-6">
                        {scenario.prompt}
                      </p>
                    </m.div>

                    {reached(phase, 'thinking') && (
                      <m.div {...blockEnter} className="space-y-2.5">
                        <div className="flex items-center gap-2 text-xs">
                          <span className="flex size-6 items-center justify-center rounded-full bg-secondary ring-1 ring-border">
                            <ProviderIcon id={scenario.model.provider} className="size-3.5" />
                          </span>
                          <span className="font-medium">{scenario.model.name}</span>
                        </div>

                        <div className="flex min-h-7 items-center gap-1.5 text-[13px] text-muted-foreground">
                          {phase === 'thinking' ? (
                            <>
                              <span className="shrink-0">{copy.thinking}</span>
                              <BeatDots className="mx-1 shrink-0" />
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
                            </>
                          ) : (
                            <>
                              <span>{copy.thought}</span>
                              <ChevronRight className="size-3.5" aria-hidden="true" />
                            </>
                          )}
                        </div>

                        {reached(phase, 'tool') && (
                          <m.div
                            {...blockEnter}
                            className="rounded-[10px] border border-border bg-background/40 px-3 py-2 text-[13px]">
                            <div className="flex items-center gap-2">
                              <ToolIcon className="size-3.5 text-muted-foreground" aria-hidden="true" />
                              <span className="font-medium">{scenario.toolLabel}</span>
                              {state.toolDone ? (
                                <span className="inline-flex items-center gap-1 text-muted-foreground">
                                  <Check className="size-3 text-primary" aria-hidden="true" />
                                  {scenario.toolDone}
                                </span>
                              ) : (
                                <span className="text-shimmer">{scenario.toolRunning}</span>
                              )}
                            </div>
                            {state.toolDone && (
                              <div className="mt-2 flex flex-wrap gap-1.5">
                                {scenario.sources.map((source, index) => (
                                  <m.span
                                    key={source}
                                    initial={{ opacity: 0, scale: 0.96 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ ...spring.settle, delay: index * 0.05 }}
                                    className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-2 py-0.5 text-[11px] text-muted-foreground">
                                    <FileText className="size-3" aria-hidden="true" />
                                    {source}
                                  </m.span>
                                ))}
                              </div>
                            )}
                          </m.div>
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
                          <div className="flex gap-0.5 text-muted-foreground motion-safe:animate-in motion-safe:fade-in motion-safe:duration-200">
                            {[Copy, RotateCcw, AtSign].map((Icon, index) => (
                              <span key={index} className="flex size-7 items-center justify-center rounded-md">
                                <Icon className="size-3.5" aria-hidden="true" />
                              </span>
                            ))}
                          </div>
                        )}
                      </m.div>
                    )}
                  </div>
                </div>
                <div className="shrink-0 space-y-2.5 px-4 pt-1 pb-4 sm:px-6">
                  {composer}
                  {phase === 'done' && chips}
                </div>
              </>
            )}
          </div>
        </div>
      </DemoFrame>
    </div>
  )
}
