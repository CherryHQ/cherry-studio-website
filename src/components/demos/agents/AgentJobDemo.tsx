import { AnimatePresence, m, useReducedMotion } from 'framer-motion'
import {
  ArrowUp,
  Bot,
  Check,
  ChevronDown,
  ChevronRight,
  CirclePause,
  FileCode2,
  FileText,
  Gauge,
  Globe,
  ListChecks,
  type LucideIcon,
  Plus,
  Presentation,
  ShieldCheck,
  SquareTerminal,
  ToolCase,
  X
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import { type AgentJobCopy, agentJobDemo, agentJobScript, type JobStatus } from '@/content/demos/agentJob'
import { agentDemo, agentScript } from '@/content/demos/agents'
import { spring } from '@/lib/motion'
import { cn } from '@/lib/utils'
import ShimmerText from '../mobile/ShimmerText'
import AppShell from '../primitives/AppShell'
import BeatDots from '../primitives/BeatDots'
import DemoFrame from '../primitives/DemoFrame'
import StreamingText from '../primitives/StreamingText'
import { useDemoLocale } from '../primitives/useDemoLocale'
import { useDemoPlayback, useDemoScript } from '../primitives/useDemoScript'
import { useStickToBottom } from '../primitives/useStickToBottom'
import { DeckViewer, SLIDE_COUNT } from './job/Deck'
import { contextColor, SessionDetails, TaskStatusIcon } from './job/SessionDetails'
import { AgentSessionBar, blockEnter, EmojiAvatar, TOOLBAR_ICON, UserAvatar } from './parts'

type ToolKind = 'todo' | 'write' | 'run'
interface ToolCall {
  id: string
  kind: ToolKind
  done: boolean
  /** The plan item a TodoWrite call marked in progress. */
  todo?: number
}

interface RunState {
  busy: boolean
  todos: JobStatus[]
  tools: ToolCall[]
  subagents: JobStatus[]
  /** Steps each sub-agent has started, in agentJobScript.subagents order. */
  steps: number[]
  built: number
  summary: boolean
  context: number
}

type Pane = { kind: 'deck' } | { kind: 'flow'; index: number } | null

const INITIAL: RunState = {
  busy: false,
  todos: [],
  tools: [],
  subagents: [],
  steps: [0, 0, 0],
  built: 0,
  summary: false,
  context: agentJobScript.context[0]
}
const DONE: JobStatus[] = ['completed', 'completed', 'completed', 'completed']
const FOCUS = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
// @cherrystudio/ui Button (size sm) variants used by the ReportArtifacts file cards.
const BUTTON = 'inline-flex h-8 items-center justify-center rounded-md px-3 text-[13px] font-medium whitespace-nowrap'
// ToolBlockGroup.tsx TOOL_GROUP_ICON_BY_NAME for TodoWrite, Write and Bash.
const TOOL_ICONS: Record<ToolKind, LucideIcon> = { todo: ListChecks, write: FileText, run: SquareTerminal }
// agentSessionDetailsLayout.ts: the card shows inline from 976px of chat width and reserves its width plus gutters.
const DETAILS_INLINE_MIN = 976
const DETAILS_INSET = 280 + 32 + 12
// Demo time-lapse: each 100ms of playback reads as 4s on the turn's elapsed clock.
const CLOCK_STEP = 4
const OUTPUT_ICONS: { icon: LucideIcon; tone: string }[] = [
  { icon: FileCode2, tone: 'text-orange-500' },
  { icon: Presentation, tone: 'text-[#D24726]' },
  { icon: FileText, tone: 'text-blue-500' }
]

/** message.tools.placeholder.elapsed.minutes / .seconds. */
function formatElapsed(total: number, copy: AgentJobCopy) {
  const minutes = Math.floor(total / 60)
  const seconds = String(total % 60)
  return minutes > 0
    ? copy.elapsed.minutes.replace('{m}', String(minutes)).replace('{s}', seconds)
    : copy.elapsed.seconds.replace('{s}', seconds)
}

/** ToolHeader getReadableToolActivity for the main agent's calls. */
function activityOf(tool: ToolCall, copy: AgentJobCopy) {
  const live = tool.done ? 0 : 1
  const { activity } = copy
  if (tool.kind === 'todo') {
    return {
      label: activity.modify[live],
      description: activity.taskList,
      params: tool.todo === undefined ? activity.taskList : copy.todos[tool.todo]
    }
  }
  if (tool.kind === 'write') {
    return { label: activity.write[live], description: activity.file, params: agentJobScript.writeFile }
  }
  return { label: activity.run[live], description: activity.projectTask, params: agentJobScript.command }
}

export default function AgentJobDemo() {
  const { locale, tag } = useDemoLocale()
  const copy = agentJobDemo[locale]
  const agent = agentDemo[locale]
  const reduced = useReducedMotion() ?? false
  const ref = useRef<HTMLDivElement>(null)
  const chatRef = useRef<HTMLDivElement>(null)
  const scroller = useRef<HTMLDivElement>(null)
  const thread = useRef<HTMLDivElement>(null)
  const popupRef = useRef<HTMLDivElement>(null)
  const paneRef = useRef<Pane>(null)
  const playing = useDemoPlayback(ref)
  const [state, setState] = useState<RunState>(INITIAL)
  const [elapsed, setElapsed] = useState(0)
  const [pane, setPane] = useState<Pane>(null)
  const [slide, setSlide] = useState(0)
  const [subtasksOpen, setSubtasksOpen] = useState(true)
  const [groupOpen, setGroupOpen] = useState(true)
  const [inline, setInline] = useState(false)
  const [detailsOpen, setDetailsOpen] = useState(true)
  const [popupOpen, setPopupOpen] = useState(false)
  paneRef.current = pane
  useStickToBottom(scroller, thread)

  const update = (patch: Partial<RunState>) => setState((previous) => ({ ...previous, ...patch }))
  const push = (tool: ToolCall) => setState((previous) => ({ ...previous, tools: [...previous.tools, tool] }))
  const finish = (id: string) =>
    setState((previous) => ({
      ...previous,
      tools: previous.tools.map((tool) => (tool.id === id ? { ...tool, done: true } : tool))
    }))
  const setSub = (index: number, patch: { status?: JobStatus; step?: number }) =>
    setState((previous) => ({
      ...previous,
      subagents: previous.subagents.map((value, i) => (i === index && patch.status ? patch.status : value)),
      steps: previous.steps.map((value, i) => (i === index && patch.step !== undefined ? patch.step : value))
    }))

  const { replay } = useDemoScript(async ({ wait, reduced: skip }) => {
    setPopupOpen(false)
    setGroupOpen(true)
    if (skip) {
      setElapsed(132)
      setState({
        busy: false,
        todos: DONE,
        tools: [
          { id: 't1', kind: 'todo', done: true, todo: 0 },
          { id: 'w1', kind: 'write', done: true },
          { id: 'r1', kind: 'run', done: true },
          { id: 't2', kind: 'todo', done: true }
        ],
        subagents: ['completed', 'completed', 'completed'],
        steps: copy.subagents.map((item) => item.steps.length),
        built: SLIDE_COUNT,
        summary: true,
        context: agentJobScript.context[1]
      })
      setSubtasksOpen(false)
      setSlide(0)
      setPane({ kind: 'deck' })
      return
    }
    // The task is already sent; sub-agents spawn at once and the deck is on screen by about 1.7s.
    setElapsed(0)
    setPane(null)
    setSlide(0)
    setSubtasksOpen(true)
    setState({
      ...INITIAL,
      busy: true,
      todos: ['running', 'pending', 'pending', 'pending'],
      tools: [{ id: 't1', kind: 'todo', done: false, todo: 0 }]
    })
    await wait(150)
    finish('t1')
    update({ subagents: ['running', 'running', 'running'], steps: [1, 1, 1] })
    const research = async (index: number, ms: number) => {
      const count = copy.subagents[index].steps.length
      for (let step = 2; step <= count; step += 1) {
        await wait(ms / count)
        setSub(index, { step })
      }
      await wait(ms / count)
      setSub(index, { status: 'completed' })
    }
    await Promise.all([research(0, 850), research(1, 600), research(2, 1100)])
    update({ todos: ['completed', 'running', 'pending', 'pending'], context: agentJobScript.context[1] })
    await wait(150)
    update({ todos: ['completed', 'completed', 'running', 'pending'] })
    push({ id: 'w1', kind: 'write', done: false })
    await wait(120)
    setPane((current) => current ?? { kind: 'deck' })
    // The cover stays in view while the thumbnail rail fills; flipping the main view per slide read as a blur.
    for (let built = 1; built <= SLIDE_COUNT; built += 1) {
      update({ built })
      await wait(170)
    }
    finish('w1')
    update({ todos: ['completed', 'completed', 'completed', 'running'] })
    push({ id: 'r1', kind: 'run', done: false })
    await wait(380)
    finish('r1')
    update({ todos: DONE })
    push({ id: 't2', kind: 'todo', done: true })
    await wait(120)
    update({ busy: false, summary: true })
    // The finished list folds away unless a visitor is reading one of its sub-agents.
    if (paneRef.current?.kind !== 'flow') setSubtasksOpen(false)
  }, playing)

  useEffect(() => {
    if (!state.busy || !playing || reduced) return
    const timer = setInterval(() => setElapsed((value) => value + CLOCK_STEP), 100)
    return () => clearInterval(timer)
  }, [state.busy, playing, reduced])

  // AgentSessionDetailsLayout: the card sits inline in a wide chat column and becomes a popover otherwise.
  useEffect(() => {
    const element = chatRef.current
    if (!element) return
    const observer = new ResizeObserver(() => setInline(element.clientWidth >= DETAILS_INLINE_MIN))
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!popupOpen) return
    const close = (event: PointerEvent) => {
      const target = event.target as Node
      if (!popupRef.current?.contains(target) && !(target as Element).closest?.('[data-pane="details"]'))
        setPopupOpen(false)
    }
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && setPopupOpen(false)
    document.addEventListener('pointerdown', close)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', close)
      document.removeEventListener('keydown', onKey)
    }
  }, [popupOpen])

  const openFlow = (index: number) => {
    setPopupOpen(false)
    setPane({ kind: 'flow', index })
  }

  const showInline = inline && detailsOpen
  const detailsVisible = showInline || (!inline && popupOpen)
  const { tools } = state
  const latest = tools.at(-1)
  const groupLive = latest ? !latest.done : false
  const GroupIcon = latest ? TOOL_ICONS[latest.kind] : ListChecks
  const planDone = state.todos.filter((item) => item === 'completed').length
  const subDone = state.subagents.filter((item) => item === 'completed').length
  const allSubsDone = state.subagents.length > 0 && subDone === state.subagents.length
  const flowIndex = pane?.kind === 'flow' ? pane.index : -1

  const details = (
    <SessionDetails
      copy={copy}
      todos={state.todos}
      subagents={state.subagents}
      steps={state.steps}
      outputs={state.summary}
      context={state.context}
      onOpenFlow={openFlow}
    />
  )

  const toolGroup = tools.length > 0 && (
    <m.div {...blockEnter}>
      <button
        type="button"
        aria-expanded={groupOpen}
        onClick={() => setGroupOpen((open) => !open)}
        className={cn(
          'group/tool-group flex min-h-7 max-w-full cursor-pointer items-center gap-1.5 rounded py-0.5 text-left text-[13px] outline-none',
          FOCUS
        )}>
        <GroupIcon
          className="size-3.5 shrink-0 text-muted-foreground/80 group-hover/tool-group:text-foreground"
          aria-hidden="true"
        />
        <span className="truncate text-muted-foreground group-hover/tool-group:text-foreground">
          {latest && `${activityOf(latest, copy).label} ${activityOf(latest, copy).description}`}
        </span>
        {groupLive && <BeatDots className="shrink-0 text-muted-foreground/80" />}
        <ChevronDown
          aria-hidden="true"
          className={cn(
            'size-3.5 shrink-0 opacity-0 transition-[transform,opacity] duration-200 group-hover/tool-group:opacity-60',
            groupOpen ? 'rotate-0 opacity-60' : '-rotate-90'
          )}
        />
      </button>
      <AnimatePresence initial={false}>
        {groupOpen && (
          <m.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1, transition: { duration: reduced ? 0 : 0.2, ease: 'easeOut' } }}
            exit={{ height: 0, opacity: 0, transition: { duration: reduced ? 0 : 0.16, ease: 'easeIn' } }}
            className="overflow-hidden">
            <div className="flex flex-col gap-1 pt-1">
              {tools.map((tool) => {
                const { label, params } = activityOf(tool, copy)
                return (
                  <m.div
                    key={tool.id}
                    {...blockEnter}
                    className="flex min-h-7 min-w-0 items-center gap-1 text-[13px] leading-5 text-muted-foreground">
                    <span className="shrink-0">{label}</span>
                    {tool.kind === 'run' ? (
                      <code className="min-w-0 truncate rounded bg-muted px-1.5 py-0.5 font-mono text-[12px] leading-4">
                        {params}
                      </code>
                    ) : (
                      <span className="min-w-0 truncate">{params}</span>
                    )}
                    {!tool.done && (
                      <span className="ml-1.5 shrink-0 text-xs text-primary opacity-85">{agent.running}</span>
                    )}
                  </m.div>
                )
              })}
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </m.div>
  )

  // MessagePartsRenderer: Agent / Task calls leave the tool stream for one grouped, collapsible subtask list.
  const subtasks = state.subagents.length > 0 && (
    <m.div {...blockEnter} className="-mx-2 mt-2">
      <button
        type="button"
        aria-expanded={subtasksOpen}
        onClick={() => setSubtasksOpen((open) => !open)}
        className={cn(
          'flex h-8 max-w-full cursor-pointer items-center gap-2 rounded-md px-2 text-xs text-muted-foreground hover:bg-accent/50',
          FOCUS
        )}>
        <ChevronDown className={cn('size-3.5 shrink-0', !subtasksOpen && '-rotate-90')} aria-hidden="true" />
        <span>{copy.subtasks}</span>
        <span className="tabular-nums">
          {allSubsDone
            ? `· ${copy.tasksCompleted.replace('{count}', String(subDone))}`
            : copy.taskCount.replace('{completed}', String(subDone)).replace('{total}', String(state.subagents.length))}
        </span>
        {allSubsDone && <Check className="size-3.5 shrink-0 text-green-600 dark:text-green-400" aria-hidden="true" />}
      </button>
      {subtasksOpen && (
        <div className="mt-1 flex flex-col gap-1">
          {state.subagents.map((status, index) => (
            <m.button
              key={index}
              type="button"
              {...blockEnter}
              aria-pressed={flowIndex === index}
              onClick={() => openFlow(index)}
              title={copy.subagents[index].title}
              className={cn(
                'flex h-8 w-full cursor-pointer items-center gap-2 rounded-md px-2 text-left text-sm hover:bg-accent',
                flowIndex === index && 'bg-accent',
                FOCUS
              )}>
              <TaskStatusIcon status={status} label={copy.status[status]} />
              <span className="min-w-0 flex-1 truncate">{copy.subagents[index].title}</span>
              {status !== 'completed' && (
                <span className="shrink-0 text-xs text-muted-foreground">{copy.status[status]}</span>
              )}
              <ChevronRight className="size-3.5 shrink-0 text-muted-foreground" aria-hidden="true" />
            </m.button>
          ))}
        </div>
      )}
    </m.div>
  )

  // ReportArtifacts file cards, appended after the final answer.
  const outputs = (
    <m.section {...blockEnter} className="my-1 flex w-full max-w-xl flex-col gap-1.5 text-sm">
      <p className="font-medium text-muted-foreground">{copy.outputs}</p>
      {agentJobScript.outputs.map((path, index) => {
        const name = path.split('/').pop() ?? path
        const { icon: Icon, tone } = OUTPUT_ICONS[index]
        const previewable = index === 0
        return (
          <div
            key={path}
            className={cn(
              'flex w-full min-w-0 items-center overflow-hidden rounded-lg border-[0.5px] border-border bg-muted/40 transition-colors hover:bg-accent',
              previewable && pane?.kind === 'deck' && 'bg-accent'
            )}>
            <button
              type="button"
              onClick={() => previewable && setPane(pane?.kind === 'deck' ? null : { kind: 'deck' })}
              title={path}
              className={cn(
                'group/preview flex min-h-12 min-w-0 flex-1 items-center gap-2.5 px-2.5 py-2 text-left',
                previewable ? 'cursor-pointer' : 'cursor-default',
                FOCUS
              )}>
              <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-background">
                <Icon className={cn('size-5', tone)} aria-hidden="true" />
              </span>
              <span className="flex min-w-0 flex-1 flex-col">
                <span className="truncate text-[13px] leading-5 font-medium">{name}</span>
                <span className="grid min-w-0 text-xs leading-4 text-muted-foreground">
                  <span
                    className={cn(
                      'col-start-1 row-start-1 truncate',
                      previewable && 'group-hover/preview:invisible group-focus-visible/preview:invisible'
                    )}>
                    {copy.outputTypes[index]}
                  </span>
                  {previewable && (
                    <span className="invisible col-start-1 row-start-1 truncate group-hover/preview:visible group-focus-visible/preview:visible">
                      {copy.openPreview}
                    </span>
                  )}
                </span>
              </span>
            </button>
            <span className={cn(BUTTON, 'mr-2 gap-1 rounded-lg border border-border bg-background')} aria-hidden="true">
              {copy.openWith}
              <ChevronDown className="size-3.5 text-muted-foreground" />
            </span>
          </div>
        )
      })}
    </m.section>
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

  // AgentTaskProgressCapsule: the current plan step floats over the composer until the plan completes.
  const capsule = state.todos.length > 0 && planDone < state.todos.length && (
    <m.div
      key="capsule"
      aria-hidden="true"
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 6 }}
      className="flex justify-center pb-2">
      <span className="flex h-9 items-center gap-1.5 rounded-full border border-border bg-popover px-2.5 text-sm shadow-sm">
        <svg viewBox="0 0 20 20" className="size-[17px] -rotate-90">
          <circle cx="10" cy="10" r="8" fill="none" strokeWidth="2" className="stroke-border" />
          <circle
            cx="10"
            cy="10"
            r="8"
            fill="none"
            strokeWidth="2"
            strokeDasharray={50.27}
            strokeDashoffset={50.27 * (1 - planDone / state.todos.length)}
            className="stroke-blue-500 transition-[stroke-dashoffset] duration-300 dark:stroke-blue-400"
          />
        </svg>
        <span className="tabular-nums">
          {copy.stepProgress
            .replace('{current}', String(Math.min(planDone + 1, state.todos.length)))
            .replace('{total}', String(state.todos.length))}
        </span>
      </span>
    </m.div>
  )

  const flow = (index: number) => {
    const status = state.subagents[index] ?? 'pending'
    const sub = copy.subagents[index]
    const meta = agentJobScript.subagents[index]
    const shown = sub.steps.slice(0, state.steps[index])
    return (
      <div className="flex h-full min-h-0 flex-col">
        <div className="flex shrink-0 items-center gap-2 border-b-[0.5px] border-border px-3 py-2">
          <div className="flex min-w-0 flex-1 items-center gap-2 text-[13px] text-muted-foreground">
            <Bot className="size-4 shrink-0" aria-hidden="true" />
            <span className="truncate" title={`${copy.mainTask} › ${sub.title}`}>
              {copy.mainTask} › {sub.title}
            </span>
          </div>
          <span
            role="status"
            className="flex shrink-0 items-center gap-0.5 rounded-md border border-border py-0.5 pr-2 pl-1 text-xs">
            <TaskStatusIcon status={status} label={copy.status[status]} />
            {copy.status[status]}
          </span>
          <button
            type="button"
            aria-label={copy.close}
            onClick={() => setPane(null)}
            className={cn(
              'flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-md text-muted-foreground hover:bg-accent',
              FOCUS
            )}>
            <X className="size-4" />
          </button>
        </div>
        <div className="flex shrink-0 items-center gap-3 border-b-[0.5px] border-border px-4 py-2 text-xs text-muted-foreground">
          <span className="flex h-1.5 min-w-0 flex-1 overflow-hidden rounded-full bg-muted">
            <span
              className="h-full rounded-full transition-[width] duration-500"
              style={{
                width: `${status === 'completed' ? meta.context : Math.round(meta.context * 0.6)}%`,
                background: contextColor(meta.context)
              }}
            />
          </span>
          <span className="shrink-0 tabular-nums">
            {meta.type} · {status === 'completed' ? `${meta.tokens} · ${meta.seconds}s` : copy.status.running}
          </span>
        </div>
        <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-4 py-4 [scrollbar-width:none]">
          <div className="flex justify-end">
            <p className="max-w-[85%] rounded-[10px] bg-muted px-3.5 py-2 text-[13px] leading-relaxed">{sub.title}</p>
          </div>
          <div className="flex flex-col gap-1">
            {shown.map((step, stepIndex) => {
              const live = status === 'running' && stepIndex === shown.length - 1
              const label =
                step.kind === 'search' ? copy.activity.search[live ? 1 : 0] : copy.activity.view[live ? 1 : 0]
              return (
                <m.div
                  key={step.text}
                  {...blockEnter}
                  className="flex min-h-7 min-w-0 items-center gap-1.5 text-[13px] text-muted-foreground">
                  <Globe className="size-3.5 shrink-0 text-muted-foreground/80" aria-hidden="true" />
                  <span className="shrink-0">{label}</span>
                  {live ? (
                    <ShimmerText className="min-w-0">{step.text}</ShimmerText>
                  ) : (
                    <span className="min-w-0 truncate">{step.text}</span>
                  )}
                </m.div>
              )
            })}
          </div>
          {status === 'completed' && (
            <m.p {...blockEnter} className="text-sm leading-relaxed">
              {sub.result}
            </m.p>
          )}
        </div>
      </div>
    )
  }

  // File pane on the right, wiping in from its trailing edge like the desktop right pane.
  const rightPane = pane && (
    <m.aside
      key="pane"
      aria-label={pane.kind === 'deck' ? copy.preview : copy.subagents[pane.index].title}
      initial={reduced ? false : { opacity: 0, clipPath: 'inset(0 0 0 100%)' }}
      animate={{ opacity: 1, clipPath: 'inset(0 0 0 0%)' }}
      exit={{ opacity: 0, transition: { duration: 0.15 } }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="hidden min-w-0 basis-[54%] max-w-[620px] flex-col border-l-[0.5px] border-border @2xl:flex">
      {pane.kind === 'deck' ? (
        <>
          <div className="flex h-11 shrink-0 items-center gap-2 border-b-[0.5px] border-border px-3 text-[13px]">
            <FileCode2 className="size-4 shrink-0 text-orange-500" aria-hidden="true" />
            <span className="min-w-0 flex-1 truncate font-medium">{agentJobScript.deckFile}</span>
            <span className="truncate text-xs text-muted-foreground">{copy.preview}</span>
            <button
              type="button"
              aria-label={copy.close}
              onClick={() => setPane(null)}
              className={cn(
                'flex size-7 cursor-pointer items-center justify-center rounded-md text-muted-foreground hover:bg-accent',
                FOCUS
              )}>
              <X className="size-4" />
            </button>
          </div>
          <div className="min-h-0 flex-1">
            <DeckViewer copy={copy.deck} built={state.built} current={slide} onSelect={setSlide} />
          </div>
        </>
      ) : (
        flow(pane.index)
      )}
    </m.aside>
  )

  const agentName = <span className="truncate text-sm leading-5 font-semibold">{copy.agentName}</span>

  return (
    <div ref={ref} role="region" aria-label={copy.region} className="@container">
      <DemoFrame chromeless title={agent.window} onReplay={replay} bodyClassName="h-[570px]">
        <AppShell active="agents" tab={{ title: copy.session, emoji: '🤖' }}>
          <div className="flex h-full min-h-0">
            {/* The shared session bar needs about 470px before its pickers collide with the pane shortcuts. */}
            <div ref={chatRef} className="relative flex min-w-0 flex-1 flex-col @2xl:min-w-[470px]">
              <AgentSessionBar
                agentName={copy.agentName}
                workspace={agentJobScript.workspace}
                model={agentScript.model[locale]}
                picking={false}
                pane={detailsVisible ? 'details' : pane?.kind === 'deck' ? 'files' : undefined}
                onPane={{
                  labels: { details: copy.details.title },
                  toggle: () => (inline ? setDetailsOpen((open) => !open) : setPopupOpen((open) => !open))
                }}
              />
              <div className="relative flex min-h-0 flex-1">
                <div
                  className="flex min-h-0 min-w-0 flex-1 flex-col"
                  style={{ marginRight: showInline ? DETAILS_INSET : 0 }}>
                  <div
                    ref={scroller}
                    className="relative min-h-0 flex-1 overflow-y-auto px-4 [scrollbar-width:none] sm:px-6">
                    <div ref={thread} className="space-y-5 py-4">
                      <div className="flex justify-end">
                        <div className="flex max-w-[calc(100%-2.5rem)] items-start gap-2.5">
                          <p className="rounded-[10px] bg-muted px-4 py-2.5 text-sm leading-relaxed">{copy.task}</p>
                          <UserAvatar className="mt-1.5" />
                        </div>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <EmojiAvatar size={30} />
                        <div className="flex min-w-0 flex-1 flex-col">
                          {agentName}
                          <div className="mt-2 flex min-h-7 items-center gap-1.5 py-0.5 text-[13px] text-muted-foreground">
                            <span>{state.busy ? agent.processing : agent.processed}</span>
                            <span aria-hidden="true" className="text-muted-foreground/70">
                              ·
                            </span>
                            <span className="tabular-nums">{formatElapsed(elapsed, copy)}</span>
                          </div>
                          <p className="pt-2 text-sm leading-relaxed">
                            <StreamingText key={locale} text={copy.intro} locale={tag} active={playing} rate={70} />
                          </p>
                          <div className="mt-2">{toolGroup}</div>
                          {state.summary && (
                            <m.div {...blockEnter} className="mt-3 flex flex-col gap-2">
                              <p className="text-sm leading-relaxed">
                                <StreamingText
                                  key={`${locale}-summary`}
                                  text={copy.summary}
                                  locale={tag}
                                  active={playing}
                                  rate={70}
                                />
                              </p>
                              {outputs}
                            </m.div>
                          )}
                          {subtasks}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="shrink-0 px-3 pb-3 sm:px-5">
                    <AnimatePresence initial={false}>{capsule}</AnimatePresence>
                    {composer}
                  </div>
                </div>
                {showInline && (
                  <aside
                    aria-label={copy.details.title}
                    className="absolute top-3 right-3 max-h-[calc(100%-24px)] w-[280px] overflow-y-auto rounded-xl border border-border bg-card [scrollbar-width:none]">
                    {details}
                  </aside>
                )}
              </div>
              <AnimatePresence>
                {!inline && popupOpen && (
                  <m.div
                    ref={popupRef}
                    role="dialog"
                    aria-label={copy.details.title}
                    initial={{ opacity: 0, y: -4, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -4, scale: 0.98 }}
                    transition={spring.tactile}
                    className="absolute top-11 right-3 z-20 max-h-[calc(100%-56px)] w-[280px] origin-top-right overflow-y-auto rounded-xl border border-border bg-popover shadow-lg [scrollbar-width:none]">
                    {details}
                  </m.div>
                )}
              </AnimatePresence>
            </div>
            <AnimatePresence>{rightPane}</AnimatePresence>
          </div>
        </AppShell>
      </DemoFrame>
    </div>
  )
}
