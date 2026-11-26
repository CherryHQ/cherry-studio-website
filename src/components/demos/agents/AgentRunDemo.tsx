import { AnimatePresence, m, useReducedMotion } from 'framer-motion'
import {
  ArrowRight,
  ArrowUp,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleAlert,
  CirclePause,
  FileText,
  Folder,
  FolderOpen,
  FolderPen,
  Gauge,
  Hand,
  HelpCircle,
  ListChecks,
  ListCollapse,
  type LucideIcon,
  Pencil,
  Plus,
  ShieldAlert,
  ShieldCheck,
  SquareTerminal,
  ToolCase,
  Waypoints,
  Wrench,
  X
} from 'lucide-react'
import { type ReactNode, useEffect, useRef, useState } from 'react'

import {
  type AgentDemoCopy,
  agentDemo,
  agentScript,
  codeClis,
  type PermissionMode,
  type TodoStatus
} from '@/content/demos/agents'
import productStats from '@/content/product-stats.json'
import { spring } from '@/lib/motion'
import { cn } from '@/lib/utils'
import BeatDots from '../primitives/BeatDots'
import { cliIcon, providerIcon } from '../primitives/brand'
import DemoFrame from '../primitives/DemoFrame'
import Kbd from '../primitives/Kbd'
import ProviderIcon from '../primitives/ProviderIcon'
import StreamingText from '../primitives/StreamingText'
import { useDemoLocale } from '../primitives/useDemoLocale'
import { useDemoPlayback, useDemoScript } from '../primitives/useDemoScript'
import { useStickToBottom } from '../primitives/useStickToBottom'

type Bash = 'test' | 'retest' | 'commit'
type ToolCall =
  | { id: string; kind: 'todo'; done: boolean; todos: TodoStatus[] }
  | { id: string; kind: 'bash'; done: boolean; run: Bash }
  | { id: string; kind: 'edit'; done: boolean }
  | { id: string; kind: 'ask'; done: true; choice: number }

interface RunState {
  draft: number
  user: boolean
  intro: boolean
  tools: ToolCall[]
  asking: boolean
  busy: boolean
  summary: number | null
}

const INITIAL: RunState = { draft: 0, user: false, intro: false, tools: [], asking: false, busy: false, summary: null }

// PermissionModeOption.tsx PERMISSION_MODE_ICONS.
const MODE_ICONS: Record<PermissionMode, LucideIcon> = {
  default: Hand,
  acceptEdits: FolderPen,
  auto: ShieldCheck,
  bypassPermissions: ShieldAlert
}
// ToolBlockGroup.tsx TOOL_GROUP_ICON_BY_NAME (AskUserQuestion falls back to Wrench).
const GROUP_ICONS: Record<ToolCall['kind'], LucideIcon> = {
  todo: ListChecks,
  bash: SquareTerminal,
  edit: FileText,
  ask: Wrench
}
const BASH_OUTPUT: Record<Bash, { command: string; lines: string[] }> = {
  test: { command: agentScript.testCommand, lines: agentScript.testFail },
  retest: { command: agentScript.testCommand, lines: agentScript.testPass },
  commit: { command: agentScript.commitCommand, lines: agentScript.commitOutput }
}
// Desktop message block entrance: slide 10px from the right on a 0.3s spring without bounce.
const blockEnter = { initial: { opacity: 0, x: 10 }, animate: { opacity: 1, x: 0 }, transition: spring.block }
// TerminalOutput.tsx TERMINAL_SURFACE_CLASS.
const TERMINAL =
  'rounded-md bg-[#f5f5f5] px-2.5 py-2 font-mono text-xs leading-normal break-all whitespace-pre-wrap text-[#1e1e1e] dark:bg-[#1e1e1e] dark:text-[#d4d4d4]'
// ComposerControlScaffolding.tsx COMPOSER_SEND_ACCESSORY_BUTTON_CLASS footprint.
const TOOLBAR_ICON =
  'flex size-7.5 shrink-0 items-center justify-center rounded-full text-muted-foreground dark:text-foreground'
const FOCUS = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
// The app's --cs-info status token (blue 500, 400 in dark).
const INFO = 'text-blue-500 dark:text-blue-400'
const MONO_CLI = new Set(['open-code', 'pi-cli', 'qoder-cli', 'github-copilot-cli'])
const CLI_ASSET: Record<string, string> = { opencode: 'open-code', 'kimi-code': 'kimi-cli', pi: 'pi-cli' }
const CLI_PROVIDER: Record<string, string> = {
  openclaw: 'openclaw',
  'deepseek-harness': 'deepseek',
  'minimax-code': 'minimax'
}

/** ToolBlockGroup getToolTitle: the description alone when it already contains the verb. */
function joinTitle(label: string, description: string) {
  return description.toLowerCase().includes(label.toLowerCase()) ? description : `${label} ${description}`
}

/** ToolHeader getReadableToolActivity for the calls in this script. */
function activityOf(tool: ToolCall, copy: AgentDemoCopy) {
  const live = tool.done ? 0 : 1
  const { activity } = copy
  if (tool.kind === 'todo') {
    const active = tool.todos.indexOf('in_progress')
    return {
      label: activity.modify[live],
      description: activity.taskList,
      params: active >= 0 ? copy.todos[active] : activity.taskList
    }
  }
  if (tool.kind === 'edit') return { label: activity.modify[live], description: activity.codeFiles, params: 'date.ts' }
  if (tool.kind === 'bash' && tool.run === 'commit') {
    return { label: activity.write[live], description: activity.projectChanges }
  }
  return { label: activity.check[live], description: activity.projectChecks }
}

function groupTitle(tool: ToolCall | undefined, asking: boolean, copy: AgentDemoCopy) {
  if (asking) return `${copy.processing}...`
  if (!tool) return ''
  if (tool.kind === 'ask') return copy.processed
  const { label, description } = activityOf(tool, copy)
  return joinTitle(label, description)
}

function UserAvatar({ className }: { className?: string }) {
  // Desktop default user avatar (src/renderer/assets/images/avatar.svg).
  return (
    <svg viewBox="0 0 1158 1158" aria-hidden="true" className={cn('size-[30px] shrink-0 rounded-full', className)}>
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

function EmojiAvatar({ size }: { size: number }) {
  return (
    <span
      aria-hidden="true"
      className="relative flex shrink-0 items-center justify-center overflow-hidden rounded-full"
      style={{ width: size, height: size }}>
      <span
        className="absolute inset-0 flex scale-150 items-center justify-center opacity-40 blur-sm"
        style={{ fontSize: size * 1.2 }}>
        🤖
      </span>
      <span className="relative leading-none" style={{ fontSize: size * 0.7 }}>
        🤖
      </span>
    </span>
  )
}

function Terminal({ text }: { text: string }) {
  return <div className={TERMINAL}>{text}</div>
}

function Disclosure({ header, children }: { header: ReactNode; children: ReactNode }) {
  const [open, setOpen] = useState(false)
  return (
    <m.div {...blockEnter} className="w-full">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className="flex min-h-7 w-fit max-w-full cursor-pointer items-center gap-2 rounded-md py-0.5 text-left text-[13px] leading-5 text-muted-foreground outline-none hover:text-foreground focus-visible:bg-accent/50 focus-visible:outline-2 focus-visible:outline-primary">
        {header}
      </button>
      {open && (
        <div className="mt-1.5 rounded-xl bg-muted px-4 py-3 text-[13px] leading-5 text-muted-foreground">
          {children}
        </div>
      )}
    </m.div>
  )
}

function Section({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <div className="mb-1 text-xs font-medium text-muted-foreground">{label}</div>
      {children}
    </div>
  )
}

function ToolRow({ tool, copy }: { tool: ToolCall; copy: AgentDemoCopy }) {
  if (tool.kind === 'ask') {
    const option = copy.question.options[tool.choice]
    return (
      <Disclosure
        header={
          <>
            <HelpCircle className="size-4 shrink-0 text-muted-foreground/80" aria-hidden="true" />
            <span>{copy.question.title}</span>
            <span className="shrink-0 rounded-full bg-muted px-1.5 py-0.5 text-xs leading-4 text-muted-foreground">
              1 {copy.question.answered}
            </span>
          </>
        }>
        <div className="space-y-2">
          <div className="flex min-w-0 items-center gap-2">
            <span className="shrink-0 rounded-md bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground">
              {copy.question.header}
            </span>
            <span className="min-w-0 flex-1 text-sm text-foreground">{copy.question.text}</span>
          </div>
          <div className="flex items-center gap-2 rounded-lg border border-primary/30 bg-primary/10 p-2">
            <CheckCircle2 className="size-4 shrink-0 text-primary" aria-hidden="true" />
            <span className="text-sm text-primary">{option.label}</span>
          </div>
        </div>
      </Disclosure>
    )
  }

  const { label, description, params } = activityOf(tool, copy)
  const bash = tool.kind === 'bash' ? BASH_OUTPUT[tool.run] : undefined
  const header = (
    <span className="flex min-w-0 max-w-full items-center gap-1 overflow-hidden">
      <span className="shrink-0">{label}</span>
      <span className="min-w-0 truncate">{params ?? description}</span>
      {bash && (
        <code className="hidden min-w-0 shrink-[2] truncate rounded bg-muted px-1.5 py-0.5 font-mono text-[12px] leading-4 sm:block">
          {bash.command}
        </code>
      )}
      {!tool.done && <span className="ml-1.5 shrink-0 text-xs text-primary opacity-85">{copy.running}</span>}
    </span>
  )

  return (
    <Disclosure header={header}>
      {tool.kind === 'todo' && (
        <div className="space-y-1.5">
          {copy.todos.map((todo, index) => {
            const status = tool.todos[index]
            return (
              <div key={todo} className="flex min-w-0 items-start gap-2 rounded-md bg-muted/30 p-2">
                <div className="min-w-0 flex-1 truncate text-foreground">{todo}</div>
                <span
                  className={cn(
                    'shrink-0 rounded border px-1.5 py-0.5 text-[11px]',
                    status === 'completed' && 'border-green-500/30 bg-green-500/10 text-green-600 dark:text-green-400',
                    status === 'in_progress' && 'border-blue-500/30 bg-blue-500/10 text-blue-600 dark:text-blue-400',
                    status === 'pending' && 'border-border bg-muted text-muted-foreground'
                  )}>
                  {copy.todoStatus[status]}
                </span>
              </div>
            )
          })}
        </div>
      )}
      {tool.kind === 'edit' && (
        <div className="overflow-x-auto rounded-md bg-background font-mono text-xs leading-[1.6] [scrollbar-width:none]">
          {agentScript.diff.map((line, index) => (
            <div
              key={index}
              className={cn(
                'flex min-w-max gap-3 px-2 whitespace-pre',
                line.kind === 'del'
                  ? 'bg-red-500/12 text-red-700 dark:text-red-300'
                  : 'bg-green-500/12 text-green-700 dark:text-green-300'
              )}>
              <span className="w-3 shrink-0 text-right opacity-60 select-none">{(index % 3) + 1}</span>
              <span>{line.text}</span>
            </div>
          ))}
        </div>
      )}
      {bash && (
        <div className="flex flex-col gap-3">
          <Section label={copy.sections.command}>
            <Terminal text={bash.command} />
          </Section>
          {tool.done && (
            <Section label={copy.sections.output}>
              <Terminal text={bash.lines.join('\n')} />
            </Section>
          )}
        </div>
      )}
    </Disclosure>
  )
}

function CliLogo({ id, name }: { id: string; name: string }) {
  const asset = CLI_ASSET[id] ?? id
  const src = cliIcon(asset)
  const provider = CLI_PROVIDER[id]
  return (
    <span className="flex size-[22px] shrink-0 items-center justify-center overflow-hidden rounded-[32%] bg-muted">
      {src ? (
        <img src={src} alt="" className={cn('size-[76%] object-contain', MONO_CLI.has(asset) && 'dark:invert')} />
      ) : provider && providerIcon(provider).light ? (
        <ProviderIcon id={provider} className="size-[70%]" />
      ) : (
        <span className="font-mono text-[10px] font-semibold text-muted-foreground">{name[0]}</span>
      )}
    </span>
  )
}

export default function AgentRunDemo() {
  const { locale, tag } = useDemoLocale()
  const copy = agentDemo[locale]
  const reduced = useReducedMotion() ?? false
  const ref = useRef<HTMLDivElement>(null)
  const scroller = useRef<HTMLDivElement>(null)
  const thread = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const pickRef = useRef<((choice: number) => void) | null>(null)
  const playing = useDemoPlayback(ref)
  const [state, setState] = useState<RunState>(INITIAL)
  const [elapsed, setElapsed] = useState(0)
  const [mode, setMode] = useState<PermissionMode>('auto')
  const [panelOpen, setPanelOpen] = useState(false)
  const [confirming, setConfirming] = useState(false)
  const [processOpen, setProcessOpen] = useState(true)
  const [groupOpen, setGroupOpen] = useState(true)
  const update = (patch: Partial<RunState>) => setState((previous) => ({ ...previous, ...patch }))
  const push = (tool: ToolCall) => setState((previous) => ({ ...previous, tools: [...previous.tools, tool] }))
  const finish = (id: string) =>
    setState((previous) => ({
      ...previous,
      tools: previous.tools.map((tool) => (tool.id === id ? { ...tool, done: true } : tool))
    }))
  useStickToBottom(scroller, thread)

  const { replay } = useDemoScript(async ({ wait, reduced: skip }) => {
    setProcessOpen(true)
    setGroupOpen(true)
    pickRef.current = null
    const todos = (...list: TodoStatus[]) => list
    if (skip) {
      setElapsed(41)
      setState({
        ...INITIAL,
        user: true,
        intro: true,
        tools: [
          { id: 't1', kind: 'todo', done: true, todos: todos('in_progress', 'pending', 'pending') },
          { id: 'b1', kind: 'bash', done: true, run: 'test' },
          { id: 't2', kind: 'todo', done: true, todos: todos('completed', 'in_progress', 'pending') },
          { id: 'e1', kind: 'edit', done: true },
          { id: 't3', kind: 'todo', done: true, todos: todos('completed', 'completed', 'in_progress') },
          { id: 'b2', kind: 'bash', done: true, run: 'retest' },
          { id: 't4', kind: 'todo', done: true, todos: todos('completed', 'completed', 'completed') },
          { id: 'q1', kind: 'ask', done: true, choice: 0 },
          { id: 'b3', kind: 'bash', done: true, run: 'commit' }
        ],
        summary: 0
      })
      return
    }
    setState(INITIAL)
    setElapsed(0)
    const call = async (tool: ToolCall, ms: number) => {
      push(tool)
      await wait(ms)
      finish(tool.id)
      await wait(450)
    }
    await wait(500)
    const length = copy.task.length
    for (let count = 1; count <= length; count += locale === 'zh' ? 1 : 3) {
      update({ draft: count })
      await wait(locale === 'zh' ? 45 : 30)
    }
    update({ draft: length })
    await wait(450)
    update({ draft: 0, user: true, busy: true })
    await wait(800)
    update({ intro: true })
    await wait(1400)
    await call({ id: 't1', kind: 'todo', done: false, todos: todos('in_progress', 'pending', 'pending') }, 300)
    await call({ id: 'b1', kind: 'bash', done: false, run: 'test' }, 2000)
    await call({ id: 't2', kind: 'todo', done: false, todos: todos('completed', 'in_progress', 'pending') }, 300)
    await call({ id: 'e1', kind: 'edit', done: false }, 1500)
    await call({ id: 't3', kind: 'todo', done: false, todos: todos('completed', 'completed', 'in_progress') }, 300)
    await call({ id: 'b2', kind: 'bash', done: false, run: 'retest' }, 1800)
    await call({ id: 't4', kind: 'todo', done: false, todos: todos('completed', 'completed', 'completed') }, 300)
    update({ asking: true })
    const choice = await Promise.race([
      new Promise<number>((resolve) => {
        pickRef.current = resolve
      }),
      wait(6500).then(() => 0)
    ])
    pickRef.current = null
    update({ asking: false })
    push({ id: 'q1', kind: 'ask', done: true, choice })
    await wait(500)
    if (choice === 0) await call({ id: 'b3', kind: 'bash', done: false, run: 'commit' }, 1300)
    update({ busy: false, summary: choice })
  }, playing)

  useEffect(() => {
    if (!state.busy || !playing || reduced) return
    const timer = setInterval(() => setElapsed((value) => value + 1), 1000)
    return () => clearInterval(timer)
  }, [state.busy, playing, reduced])

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: reduced ? 'auto' : 'smooth' })
  }, [state.asking, reduced])

  useEffect(() => {
    if (!panelOpen) return
    const close = (event: PointerEvent) => {
      if (!panelRef.current?.contains(event.target as Node)) setPanelOpen(false)
    }
    document.addEventListener('pointerdown', close)
    return () => document.removeEventListener('pointerdown', close)
  }, [panelOpen])

  const { tools } = state
  const latest = tools.at(-1)
  const groupLive = state.asking || (latest ? !latest.done : false)
  const GroupIcon = latest ? GROUP_ICONS[latest.kind] : Wrench
  const todoCall = [...tools].reverse().find((tool) => tool.kind === 'todo')
  const plan = todoCall?.kind === 'todo' ? todoCall.todos : null
  const planDone = plan?.filter((status) => status === 'completed').length ?? 0
  const showCapsule = !!plan && planDone < plan.length
  const ModeIcon = MODE_ICONS[mode]
  const elapsedText = copy.seconds.replace('{s}', String(elapsed))
  const cliTitle = copy.cliTitle.replace('{count}', productStats.labels.codeClis)
  const selectMode = (next: PermissionMode) => {
    setPanelOpen(false)
    if (next === mode) return
    if (next === 'bypassPermissions') setConfirming(true)
    else setMode(next)
  }

  const processHeader = (
    <span className="flex min-w-0 items-center gap-1.5 text-[13px]">
      <span className="truncate text-muted-foreground">{state.busy ? copy.processing : copy.processed}</span>
      <span aria-hidden="true" className="text-muted-foreground/70">
        ·
      </span>
      <span className="shrink-0 text-muted-foreground">{elapsedText}</span>
    </span>
  )

  const processBody = (
    <div className="flex flex-col gap-3 pt-2">
      <p className="text-sm leading-relaxed">
        <StreamingText key={locale} text={copy.intro} locale={tag} active={playing} rate={40} />
      </p>
      {tools.length > 0 && (
        <m.div {...blockEnter}>
          <button
            type="button"
            aria-expanded={groupOpen}
            onClick={() => setGroupOpen((open) => !open)}
            className="group/tool-group flex min-h-7 max-w-full cursor-pointer items-center gap-1.5 rounded py-0.5 text-left text-[13px] outline-none focus-visible:bg-accent/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
            <GroupIcon
              className="size-3.5 shrink-0 text-muted-foreground/80 group-hover/tool-group:text-foreground"
              aria-hidden="true"
            />
            <span className="truncate text-muted-foreground group-hover/tool-group:text-foreground">
              {groupTitle(latest, state.asking, copy)}
            </span>
            {groupLive && <BeatDots className="shrink-0 text-muted-foreground/80" />}
            <ChevronDown
              aria-hidden="true"
              className={cn(
                'size-3.5 shrink-0 opacity-0 transition-[transform,opacity] duration-200 group-hover/tool-group:opacity-60 group-focus-visible/tool-group:opacity-60',
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
                <div className="flex flex-col gap-1 pt-2">
                  {tools.map((tool) => (
                    <ToolRow key={tool.id} tool={tool} copy={copy} />
                  ))}
                </div>
              </m.div>
            )}
          </AnimatePresence>
        </m.div>
      )}
    </div>
  )

  const composer = (
    <div className="relative rounded-[20px] border-[0.5px] border-border bg-composer pt-2 shadow-sm">
      <div aria-hidden="true" className="min-h-[46px] px-[15px] pt-1.5 text-sm leading-[1.4]">
        {state.draft > 0 ? (
          <span>
            {copy.task.slice(0, state.draft)}
            <span className="ml-px inline-block h-4 w-px translate-y-0.5 bg-foreground motion-safe:animate-caret" />
          </span>
        ) : (
          <span className="line-clamp-2 text-muted-foreground">
            {state.busy ? copy.placeholderBusy : copy.placeholder}
          </span>
        )}
      </div>
      <div className="flex h-10 items-center justify-between gap-4 px-2 py-1.25">
        <div className="flex min-w-0 items-center gap-1.5">
          <span className={TOOLBAR_ICON} aria-hidden="true">
            <svg
              viewBox="0 0 24 24"
              className="size-[18px]"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round">
              <g transform="translate(12 12) scale(1.1) translate(-12 -12)">
                <path d="M13 4H6a2 2 0 0 0-2 2v13l4-3h10a2 2 0 0 0 2-2v-3" />
                <path d="M18 3.5v5" />
                <path d="M15.5 6h5" />
              </g>
            </svg>
          </span>
          <span className={TOOLBAR_ICON} aria-hidden="true">
            <ToolCase className="size-[18px]" />
          </span>
          <button
            type="button"
            aria-haspopup="menu"
            aria-expanded={panelOpen}
            aria-label={`${copy.permission.title} · ${copy.permission.modes.find((item) => item.mode === mode)?.title}`}
            onClick={() => setPanelOpen((open) => !open)}
            className={cn(
              TOOLBAR_ICON,
              'cursor-pointer transition-colors hover:bg-accent/60 hover:text-foreground',
              panelOpen && 'bg-accent',
              FOCUS
            )}>
            <ModeIcon
              className={cn('size-[18px]', mode === 'bypassPermissions' && 'text-destructive')}
              aria-hidden="true"
            />
          </button>
          <span className={TOOLBAR_ICON} aria-hidden="true">
            <Plus className="size-[18px]" />
          </span>
        </div>
        <div className="flex shrink-0 items-center gap-1.5" aria-hidden="true">
          <span className="flex h-7 items-center gap-1 rounded-md px-1.5 text-xs text-muted-foreground dark:text-foreground">
            <Gauge className="size-3.5 shrink-0" />
            {copy.effort.value}
            <ChevronDown className="size-[13px] shrink-0 text-muted-foreground dark:text-current" />
          </span>
          {state.busy && state.draft === 0 ? (
            <span className="flex size-7.5 items-center justify-center rounded-full text-destructive">
              <CirclePause className="size-5" />
            </span>
          ) : (
            <span
              className={cn(
                'mr-0.5 flex size-[22px] items-center justify-center rounded-full transition-colors',
                state.draft > 0 ? 'bg-primary text-primary-foreground' : 'bg-muted-foreground/35 text-background'
              )}>
              <ArrowUp className="size-3.5" strokeWidth={2.6} />
            </span>
          )}
        </div>
      </div>

      <AnimatePresence>
        {panelOpen && (
          <m.div
            ref={panelRef}
            role="menu"
            aria-label={copy.permission.title}
            onKeyDown={(event) => {
              if (event.key === 'Escape') setPanelOpen(false)
            }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] } }}
            exit={{ opacity: 0, y: 8, transition: { duration: 0.1 } }}
            className="absolute right-2 bottom-full left-2 z-30 mb-1 overflow-hidden rounded-xl border-[0.5px] border-border bg-popover/90 py-1.25 shadow-(--shadow-float) backdrop-blur-2xl">
            {copy.permission.modes.map((item) => {
              const Icon = MODE_ICONS[item.mode]
              const risky = item.mode === 'bypassPermissions'
              return (
                <button
                  key={item.mode}
                  type="button"
                  role="menuitemradio"
                  aria-checked={item.mode === mode}
                  onClick={() => selectMode(item.mode)}
                  className="mx-[5px] mb-px flex h-[34px] w-[calc(100%-10px)] cursor-pointer items-center justify-between gap-3 rounded-md px-2 py-1 text-left hover:bg-accent focus-visible:bg-accent focus-visible:outline-none">
                  <span className="flex max-w-[40%] shrink-0 items-center gap-1.5">
                    <Icon
                      className={cn('size-[13px] shrink-0', risky ? 'text-destructive' : 'text-muted-foreground')}
                      aria-hidden="true"
                    />
                    <span className={cn('truncate text-[13px] leading-4', risky && 'text-destructive')}>
                      {item.title}
                    </span>
                  </span>
                  <span className="flex min-w-0 flex-1 items-center justify-end gap-1 text-[12px] leading-4 text-muted-foreground">
                    <span className={cn('min-w-0 flex-1 truncate text-right', risky && 'text-destructive')}>
                      {item.description}
                    </span>
                    {item.warning && (
                      <CircleAlert
                        aria-label={item.warning}
                        className={cn(
                          'size-3.5 shrink-0',
                          risky ? 'text-destructive' : 'text-amber-500 dark:text-amber-400'
                        )}
                      />
                    )}
                    {item.mode === mode && <Check className="size-3 shrink-0" aria-hidden="true" />}
                  </span>
                </button>
              )
            })}
            <div className="flex items-center gap-2 px-3 pt-2 pb-[5px] text-[12px] text-muted-foreground">
              <span className="truncate">{copy.permission.title}</span>
              <Kbd className="ml-auto">{copy.permission.close}</Kbd>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  )

  const questionPanel = (
    <div className="flex flex-col rounded-[17px] border-[0.5px] border-border bg-background/90 p-2.5 backdrop-blur">
      <div className="flex items-center justify-between gap-3 px-1">
        <h4 className="min-w-0 flex-1 text-sm leading-5 font-semibold">{copy.question.text}</h4>
        <div className="flex shrink-0 items-center gap-0.5 text-muted-foreground" aria-hidden="true">
          <span className="flex size-7 items-center justify-center opacity-50">
            <ChevronLeft className="size-4" />
          </span>
          <span className="min-w-11 text-center text-xs">{copy.question.progress}</span>
          <span className="flex size-7 items-center justify-center opacity-50">
            <ChevronRight className="size-4" />
          </span>
          <span className="flex size-7 items-center justify-center">
            <X className="size-4" />
          </span>
        </div>
      </div>
      <div className="mt-2 flex flex-col gap-1.5">
        {copy.question.options.map((option, index) => (
          <button
            key={option.label}
            type="button"
            onClick={() => pickRef.current?.(index)}
            className="group flex min-h-11 w-full cursor-pointer items-center gap-3 rounded-[12px] px-3 py-2 text-left hover:bg-muted focus-visible:bg-muted focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-semibold text-muted-foreground transition-colors group-hover:bg-foreground group-hover:text-background group-focus-visible:bg-foreground group-focus-visible:text-background">
              {index + 1}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm leading-5 font-semibold">{option.label}</span>
              <span className="block truncate text-xs leading-4 font-medium text-muted-foreground">
                {option.description}
              </span>
            </span>
            <ArrowRight
              className="size-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
              aria-hidden="true"
            />
          </button>
        ))}
      </div>
      <div className="mt-2 flex items-end gap-2 border-t border-border/60 pt-2" aria-hidden="true">
        <div className="flex min-w-0 flex-1 items-start gap-2 rounded-[12px] bg-muted/70 px-3 py-2">
          <Pencil className="mt-0.5 size-3.5 shrink-0 text-muted-foreground" />
          <span className="truncate text-sm leading-5 text-muted-foreground/70">{copy.question.custom}</span>
        </div>
        <span className="flex h-9 items-center px-2.5 text-sm font-semibold text-muted-foreground">
          {copy.question.skip}
        </span>
      </div>
    </div>
  )

  return (
    <div ref={ref} role="region" aria-label={copy.region}>
      <DemoFrame title={copy.window} onReplay={replay} bodyClassName="h-[520px]">
        <div className="flex h-full min-h-0 flex-col">
          <div className="flex h-11 shrink-0 items-center justify-between gap-2 px-3" aria-hidden="true">
            <div className="flex min-w-0 items-center gap-0.5">
              <span className="flex size-[30px] shrink-0 items-center justify-center text-muted-foreground">
                <svg viewBox="0 0 24 24" fill="none" className="size-[18px]">
                  <rect x="3.5" y="4" width="17" height="16" rx="4" stroke="currentColor" strokeWidth="1.7" />
                  <path d="M9.5 5v14" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7" />
                </svg>
              </span>
              <span className="flex size-7 shrink-0 items-center justify-center">
                <EmojiAvatar size={20} />
              </span>
              <span className="hidden h-8 shrink-0 items-center gap-1.5 rounded-lg px-2.5 text-xs font-medium md:flex">
                {copy.agentName}
                {!state.user && <ChevronDown className="size-3.5 text-muted-foreground" />}
              </span>
              <span className="flex h-8 min-w-0 items-center gap-1.5 rounded-lg px-2.5 text-xs font-medium">
                <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-background">
                  <ProviderIcon id={agentScript.model.provider} className="size-3.5" />
                </span>
                <span className="hidden truncate sm:inline">
                  {agentScript.model.name} | {agentScript.model.providerName}
                </span>
                <ChevronDown className="hidden size-3.5 shrink-0 text-muted-foreground sm:block" />
              </span>
              <span className="flex h-8 shrink-0 items-center gap-1.5 rounded-lg px-2.5 text-xs font-medium">
                <Folder className="size-5 text-muted-foreground" />
                <span className="hidden sm:inline">{copy.workspace}</span>
                <ChevronDown className="hidden size-3.5 text-muted-foreground sm:block" />
              </span>
            </div>
            <div className="flex shrink-0 items-center gap-0.5 text-muted-foreground">
              {[FolderOpen, ListCollapse, Waypoints].map((Icon, index) => (
                <span key={index} className="flex size-[30px] items-center justify-center">
                  <Icon className="size-3.5" />
                </span>
              ))}
            </div>
          </div>

          <div ref={scroller} className="relative min-h-0 flex-1 overflow-y-auto px-4 [scrollbar-width:none] sm:px-6">
            {!state.user && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center">
                <EmojiAvatar size={48} />
                <p className="text-lg font-medium">{copy.greeting}</p>
              </div>
            )}
            <div ref={thread} className="space-y-4 py-4">
              {state.user && (
                <m.div {...blockEnter} className="flex justify-end">
                  <div className="flex max-w-[calc(100%-2.5rem)] items-start gap-2.5">
                    <p className="rounded-[10px] bg-muted px-4 py-2.5 text-sm leading-relaxed">{copy.task}</p>
                    <UserAvatar className="mt-1.5" />
                  </div>
                </m.div>
              )}

              {state.intro && (
                <m.div {...blockEnter} className="flex items-start gap-2.5">
                  <EmojiAvatar size={30} />
                  <div className="flex min-w-0 flex-1 flex-col">
                    <span className="truncate text-sm leading-5 font-semibold">{copy.agentName}</span>
                    <div className="mt-2 min-w-0">
                      {state.busy ? (
                        <div className="mb-2 pb-2">
                          <div className="flex min-h-7 items-center py-0.5">{processHeader}</div>
                          {processBody}
                        </div>
                      ) : (
                        <div className="mb-2">
                          <button
                            type="button"
                            aria-expanded={processOpen}
                            onClick={() => setProcessOpen((open) => !open)}
                            className="flex min-h-7 cursor-pointer items-center gap-1.5 rounded py-0.5 outline-none hover:text-foreground focus-visible:bg-accent/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
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
                      {state.summary !== null && (
                        <p className="text-sm leading-relaxed">
                          <StreamingText
                            key={`${locale}-${state.summary}`}
                            text={copy.summary[state.summary]}
                            locale={tag}
                            active={playing}
                            rate={44}
                          />
                        </p>
                      )}
                    </div>
                  </div>
                </m.div>
              )}
            </div>
          </div>

          <div className="shrink-0 px-3 pb-3 sm:px-5">
            <AnimatePresence initial={false}>
              {showCapsule && !state.asking && (
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
                        strokeDashoffset={50.27 * (1 - planDone / (plan?.length ?? 1))}
                        className={cn('stroke-current transition-[stroke-dashoffset] duration-300', INFO)}
                      />
                    </svg>
                    <span className="tabular-nums">
                      {copy.stepProgress
                        .replace('{current}', String(Math.min(planDone + 1, plan?.length ?? 1)))
                        .replace('{total}', String(plan?.length ?? 0))}
                    </span>
                  </span>
                </m.div>
              )}
            </AnimatePresence>
            <AnimatePresence mode="wait" initial={false}>
              <m.div
                key={state.asking ? 'ask' : 'composer'}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={spring.settle}>
                {state.asking ? questionPanel : composer}
              </m.div>
            </AnimatePresence>
          </div>
        </div>

        <AnimatePresence>
          {confirming && (
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-40 flex items-center justify-center bg-black/40 p-4">
              <div
                role="alertdialog"
                aria-modal="true"
                aria-label={copy.permission.confirm.title}
                className="w-full max-w-sm rounded-xl border border-border bg-popover p-5 shadow-(--shadow-float)">
                <h4 className="text-base font-semibold">{copy.permission.confirm.title}</h4>
                <p className="mt-1.5 text-sm text-muted-foreground">{copy.permission.confirm.description}</p>
                <p className="mt-3 text-sm">
                  <span className="text-muted-foreground">{copy.permission.confirm.scope}: </span>
                  <span className="font-medium">{copy.agentName}</span>
                </p>
                <p className="mt-2 text-sm text-muted-foreground">{copy.permission.confirm.protections}</p>
                <div className="mt-5 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setConfirming(false)}
                    className={cn(
                      'h-8 cursor-pointer rounded-md border border-border px-3 text-sm hover:bg-accent',
                      FOCUS
                    )}>
                    {copy.permission.confirm.cancel}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMode('bypassPermissions')
                      setConfirming(false)
                    }}
                    className={cn(
                      'h-8 cursor-pointer rounded-md bg-destructive px-3 text-sm text-white hover:bg-destructive/90',
                      FOCUS
                    )}>
                    {copy.permission.confirm.ok}
                  </button>
                </div>
              </div>
            </m.div>
          )}
        </AnimatePresence>
      </DemoFrame>

      <div className="mt-6">
        <div className="flex items-baseline gap-2">
          <ListChecks className="size-4 shrink-0 translate-y-0.5 text-primary" aria-hidden="true" />
          <h3 className="text-[15px] font-semibold tracking-tight">{cliTitle}</h3>
        </div>
        <p className="mt-1 text-[13px] text-muted-foreground">{copy.cliSubtitle}</p>
        <ul className="mt-3.5 flex flex-wrap gap-1.5">
          {codeClis.map((cli) => (
            <li
              key={cli.id}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-glass py-1 pr-3 pl-1 text-xs">
              <CliLogo id={cli.id} name={cli.name} />
              {cli.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
