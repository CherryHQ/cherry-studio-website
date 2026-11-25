import { AnimatePresence, m, useReducedMotion } from 'framer-motion'
import {
  ArrowUp,
  Bot,
  Check,
  ChevronDown,
  CircleCheck,
  CircleHelp,
  FilePen,
  FolderPen,
  Hand,
  ListChecks,
  ListTodo,
  LoaderCircle,
  type LucideIcon,
  Route,
  ShieldAlert,
  ShieldCheck,
  SquareTerminal,
  Terminal,
  X
} from 'lucide-react'
import { type ReactNode, useEffect, useRef, useState } from 'react'

import { agentDemo, agentScript, codeClis, type PermissionMode, type TodoStatus } from '@/content/demos/agents'
import productStats from '@/content/product-stats.json'
import { spring } from '@/lib/motion'
import { cn } from '@/lib/utils'
import BeatDots from '../primitives/BeatDots'
import { cliIcon, providerIcon } from '../primitives/brand'
import DemoFrame from '../primitives/DemoFrame'
import ProviderIcon from '../primitives/ProviderIcon'
import StreamingText from '../primitives/StreamingText'
import { useDemoLocale } from '../primitives/useDemoLocale'
import { useDemoPlayback, useDemoScript } from '../primitives/useDemoScript'
import { useStickToBottom } from '../primitives/useStickToBottom'

type ToolId = 'test' | 'edit' | 'retest' | 'commit'
interface ToolRun {
  lines: number
  done: boolean
}

interface RunState {
  user: boolean
  intro: boolean
  todos: TodoStatus[] | null
  group: boolean
  tools: Partial<Record<ToolId, ToolRun>>
  asking: boolean
  choice: number | null
  summary: boolean
}

const INITIAL: RunState = {
  user: false,
  intro: false,
  todos: null,
  group: false,
  tools: {},
  asking: false,
  choice: null,
  summary: false
}

const MODE_ICONS: Record<PermissionMode, LucideIcon> = {
  default: Hand,
  plan: Route,
  acceptEdits: FolderPen,
  auto: ShieldCheck,
  bypassPermissions: ShieldAlert
}

// Desktop message block entrance: slide 10px from the right on a 0.3s spring without bounce.
const blockEnter = { initial: { opacity: 0, x: 10 }, animate: { opacity: 1, x: 0 }, transition: spring.block }
// Desktop TERMINAL_SURFACE_CLASS colors.
const TERMINAL =
  'rounded-md bg-[#f5f5f5] px-2.5 py-2 font-mono text-[11.5px] leading-[1.55] text-[#1e1e1e] dark:bg-[#1e1e1e] dark:text-[#d4d4d4]'
// Logos drawn in currentColor or pure black need inverting on dark surfaces.
const MONO_CLI = new Set(['open-code', 'pi-cli', 'qoder-cli', 'github-copilot-cli'])
const CLI_ASSET: Record<string, string> = { opencode: 'open-code', 'kimi-code': 'kimi-cli', pi: 'pi-cli' }
const CLI_PROVIDER: Record<string, string> = {
  openclaw: 'openclaw',
  'deepseek-harness': 'deepseek',
  'minimax-code': 'minimax'
}

function lineTone(line: string) {
  if (/×|failed|→/.test(line)) return 'text-[#c62828] dark:text-[#f48771]'
  if (/✓|passed/.test(line)) return 'text-[#2e7d32] dark:text-[#89d185]'
  if (line.startsWith('$')) return 'text-[#0451a5] dark:text-[#569cd6]'
  return undefined
}

function ToolCard({
  icon: Icon,
  label,
  detail,
  running,
  settled = false,
  children
}: {
  icon: LucideIcon
  label: string
  detail?: ReactNode
  running: boolean
  /** Folds the card once later work has moved past it, keeping the newest step in view. */
  settled?: boolean
  children: ReactNode
}) {
  const [open, setOpen] = useState(true)
  useEffect(() => {
    if (settled) setOpen(false)
  }, [settled])
  return (
    <m.div {...blockEnter} className="w-full overflow-hidden rounded-[7px] border border-border bg-background">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className="flex w-full min-w-0 cursor-pointer items-center gap-1.5 px-2.5 py-2 text-left text-[13px] leading-5 text-muted-foreground outline-none hover:text-foreground focus-visible:bg-accent/50 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary">
        <Icon className={cn('size-3.5 shrink-0', running && 'motion-safe:animate-pulse')} aria-hidden="true" />
        <span className="shrink-0">{label}</span>
        {detail && (
          <code className="hidden min-w-0 truncate rounded bg-muted px-1.5 py-0.5 font-mono text-[11.5px] leading-4 sm:block">
            {detail}
          </code>
        )}
        <span className="ml-auto flex shrink-0 items-center">
          {running ? (
            <LoaderCircle className="size-3.5 text-cap-web motion-safe:animate-spin" aria-hidden="true" />
          ) : (
            <Check className="size-3.5 text-primary" aria-hidden="true" />
          )}
        </span>
      </button>
      {open && <div className="px-2.5 pb-2.5">{children}</div>}
    </m.div>
  )
}

function TerminalOutput({ lines }: { lines: string[] }) {
  return (
    <pre className={cn(TERMINAL, 'overflow-x-auto whitespace-pre [scrollbar-width:none]')}>
      {lines.map((line, index) => (
        <div key={index} className={cn('min-h-[1.55em]', lineTone(line))}>
          {line}
        </div>
      ))}
    </pre>
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
  const menuRef = useRef<HTMLDivElement>(null)
  const pickRef = useRef<((choice: number) => void) | null>(null)
  const playing = useDemoPlayback(ref)
  const [state, setState] = useState<RunState>(INITIAL)
  const [mode, setMode] = useState<PermissionMode>('auto')
  const [menuOpen, setMenuOpen] = useState(false)
  const [groupOpen, setGroupOpen] = useState(true)
  const update = (patch: Partial<RunState>) => setState((previous) => ({ ...previous, ...patch }))
  const setTool = (id: ToolId, run: ToolRun) =>
    setState((previous) => ({ ...previous, tools: { ...previous.tools, [id]: run } }))
  useStickToBottom(scroller, thread)

  const { replay } = useDemoScript(async ({ wait, reduced: skip }) => {
    setGroupOpen(true)
    pickRef.current = null
    const full = (id: ToolId, lines: number) => ({ [id]: { lines, done: true } })
    if (skip) {
      setState({
        ...INITIAL,
        user: true,
        intro: true,
        todos: ['completed', 'completed', 'completed'],
        group: true,
        tools: {
          ...full('test', agentScript.testFail.length),
          ...full('edit', agentScript.diff.length),
          ...full('retest', agentScript.testPass.length),
          ...full('commit', agentScript.commitOutput.length)
        },
        choice: 0,
        summary: true
      })
      return
    }
    setState(INITIAL)
    const stream = async (id: ToolId, total: number, startDelay: number, pace: number) => {
      setTool(id, { lines: 0, done: false })
      await wait(startDelay)
      for (let line = 1; line <= total; line++) {
        setTool(id, { lines: line, done: false })
        await wait(pace)
      }
      setTool(id, { lines: total, done: true })
    }
    await wait(600)
    update({ user: true })
    await wait(900)
    update({ intro: true })
    await wait(1300)
    update({ todos: ['in_progress', 'pending', 'pending'] })
    await wait(1000)
    update({ group: true })
    await stream('test', agentScript.testFail.length, 900, 150)
    update({ todos: ['completed', 'in_progress', 'pending'] })
    await wait(700)
    await stream('edit', agentScript.diff.length, 700, 90)
    update({ todos: ['completed', 'completed', 'in_progress'] })
    await wait(600)
    await stream('retest', agentScript.testPass.length, 800, 140)
    update({ todos: ['completed', 'completed', 'completed'] })
    await wait(800)
    update({ asking: true })
    const choice = await Promise.race([
      new Promise<number>((resolve) => {
        pickRef.current = resolve
      }),
      wait(6000).then(() => 0)
    ])
    pickRef.current = null
    update({ asking: false, choice })
    await wait(600)
    if (choice === 0) {
      await stream('commit', agentScript.commitOutput.length, 700, 160)
      await wait(400)
    }
    update({ summary: true })
  }, playing)

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: reduced ? 'auto' : 'smooth' })
  }, [state.asking, reduced])

  useEffect(() => {
    if (!menuOpen) return
    const close = (event: PointerEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) setMenuOpen(false)
    }
    document.addEventListener('pointerdown', close)
    return () => document.removeEventListener('pointerdown', close)
  }, [menuOpen])

  const { tools, todos } = state
  const activeMode = copy.modes.find((item) => item.mode === mode)!
  const ModeIcon = MODE_ICONS[mode]
  const dangerous = mode === 'bypassPermissions'
  const groupLive = state.group && !tools.retest?.done
  const groupTitle = !groupLive
    ? copy.groupDone
    : tools.edit && !tools.edit.done
      ? copy.groupLive.edit
      : copy.groupLive.checks
  const GroupIcon = tools.edit && !tools.edit.done ? FilePen : SquareTerminal
  const activeTodo = todos?.indexOf('in_progress') ?? -1
  const cliTitle = copy.cliTitle.replace('{count}', productStats.labels.codeClis)

  const permissionPill = (
    <div
      ref={menuRef}
      className="relative"
      onKeyDown={(event) => {
        if (event.key === 'Escape') setMenuOpen(false)
      }}>
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={menuOpen}
        aria-label={`${copy.permissionLabel}: ${activeMode.title}`}
        onClick={() => setMenuOpen((open) => !open)}
        className={cn(
          'inline-flex h-7 cursor-pointer items-center gap-1.5 rounded-full border px-2.5 text-xs transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
          dangerous
            ? 'border-destructive/40 bg-destructive/10 text-destructive'
            : 'border-border text-foreground hover:bg-accent'
        )}>
        <ModeIcon
          className={cn('size-3.5', dangerous ? 'text-destructive' : 'text-muted-foreground')}
          aria-hidden="true"
        />
        <span className="max-w-[9rem] truncate">{activeMode.title}</span>
        <ChevronDown className="size-3 opacity-60" aria-hidden="true" />
      </button>
      <AnimatePresence>
        {menuOpen && (
          <m.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="float-card absolute top-full right-0 z-40 mt-1.5 w-[min(320px,calc(100vw-56px))] rounded-xl p-1">
            {copy.modes.map((item) => {
              const Icon = MODE_ICONS[item.mode]
              const risky = item.mode === 'bypassPermissions'
              return (
                <button
                  key={item.mode}
                  type="button"
                  aria-pressed={item.mode === mode}
                  onClick={() => {
                    setMode(item.mode)
                    setMenuOpen(false)
                  }}
                  className={cn(
                    'flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-2.5 py-2 text-left hover:bg-accent focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary',
                    item.mode === mode && 'bg-accent'
                  )}>
                  <Icon
                    className={cn('size-4 shrink-0', risky ? 'text-destructive' : 'text-muted-foreground')}
                    aria-hidden="true"
                  />
                  <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                    <span
                      className={cn(
                        'truncate text-[13px] font-medium',
                        risky ? 'text-destructive' : 'text-foreground'
                      )}>
                      {item.title}
                    </span>
                    <span className={cn('truncate text-xs', risky ? 'text-destructive/80' : 'text-muted-foreground')}>
                      {item.description}
                    </span>
                  </span>
                  {item.mode === mode && (
                    <Check className="size-3.5 shrink-0 text-muted-foreground" aria-hidden="true" />
                  )}
                </button>
              )
            })}
          </m.div>
        )}
      </AnimatePresence>
    </div>
  )

  return (
    <div ref={ref} role="region" aria-label={copy.region}>
      <DemoFrame title={copy.window} onReplay={replay} bodyClassName="h-[520px]">
        <div className="flex h-full min-h-0 flex-col">
          <div className="flex h-12 shrink-0 items-center gap-2.5 border-b border-border px-3 sm:px-4">
            <span
              className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/12 text-primary"
              aria-hidden="true">
              <Bot className="size-4" />
            </span>
            <div className="flex min-w-0 flex-1 items-center gap-2">
              <span className="truncate text-[13px] font-medium">{copy.agentName}</span>
              <span className="hidden shrink-0 rounded bg-muted px-1.5 py-0.5 font-mono text-[10.5px] text-muted-foreground sm:inline">
                {copy.workspace}
              </span>
              <span className="hidden items-center gap-1 text-xs text-muted-foreground md:inline-flex">
                <ProviderIcon id={agentScript.model.provider} className="size-3.5" />
                {agentScript.model.name}
              </span>
            </div>
            {permissionPill}
          </div>

          <div ref={scroller} className="min-h-0 flex-1 overflow-y-auto px-4 [scrollbar-width:none] sm:px-6">
            <div ref={thread} className="space-y-3.5 py-4">
              {state.user && (
                <m.div {...blockEnter} className="flex justify-end">
                  <p className="max-w-[85%] rounded-[10px] bg-chat-user px-3.5 py-2 text-[13.5px] leading-6">
                    {copy.task}
                  </p>
                </m.div>
              )}

              {state.intro && (
                <m.div {...blockEnter} className="space-y-3">
                  <p className="text-[13.5px] leading-6 text-foreground/90">
                    <StreamingText key={locale} text={copy.intro} locale={tag} active={playing} rate={40} />
                  </p>

                  {todos && (
                    <ToolCard
                      icon={ListTodo}
                      label={copy.todoLabel}
                      detail={activeTodo >= 0 ? copy.todos[activeTodo] : undefined}
                      running={activeTodo >= 0}>
                      <div className="space-y-1">
                        {copy.todos.map((todo, index) => {
                          const status = todos[index]
                          return (
                            <div
                              key={todo}
                              className="flex min-w-0 items-center gap-2 rounded-md bg-muted/40 px-2 py-1.5 text-[12.5px]">
                              {status === 'completed' ? (
                                <CircleCheck className="size-3.5 shrink-0 text-primary" aria-hidden="true" />
                              ) : status === 'in_progress' ? (
                                <LoaderCircle
                                  className="size-3.5 shrink-0 text-cap-web motion-safe:animate-spin"
                                  aria-hidden="true"
                                />
                              ) : (
                                <span
                                  className="size-3.5 shrink-0 rounded-full border border-muted-foreground/50"
                                  aria-hidden="true"
                                />
                              )}
                              <span
                                className={cn(
                                  'min-w-0 flex-1 truncate transition-colors duration-200',
                                  status === 'completed'
                                    ? 'text-muted-foreground line-through decoration-muted-foreground/50'
                                    : 'text-foreground'
                                )}>
                                {todo}
                              </span>
                              <span
                                className={cn(
                                  'hidden shrink-0 rounded border px-1.5 py-0.5 text-[10.5px] leading-none transition-colors duration-200 sm:inline',
                                  status === 'completed' && 'border-primary/30 bg-primary/10 text-primary',
                                  status === 'in_progress' && 'border-cap-web/30 bg-cap-web/10 text-cap-web',
                                  status === 'pending' && 'border-border bg-muted text-muted-foreground'
                                )}>
                                {copy.todoStatus[status]}
                              </span>
                            </div>
                          )
                        })}
                      </div>
                    </ToolCard>
                  )}

                  {state.group && (
                    <m.div {...blockEnter}>
                      <button
                        type="button"
                        aria-expanded={groupOpen}
                        onClick={() => setGroupOpen((open) => !open)}
                        className="group/tool-group flex min-h-7 max-w-full cursor-pointer items-center gap-1.5 rounded py-0.5 text-left text-[13px] text-muted-foreground outline-none hover:text-foreground focus-visible:bg-accent/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                        <GroupIcon className="size-3.5 shrink-0" aria-hidden="true" />
                        <span className="truncate">{groupTitle}</span>
                        {groupLive && <BeatDots className="ml-0.5 shrink-0" />}
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
                            animate={{
                              height: 'auto',
                              opacity: 1,
                              transition: { duration: reduced ? 0 : 0.2, ease: 'easeOut' }
                            }}
                            exit={{
                              height: 0,
                              opacity: 0,
                              transition: { duration: reduced ? 0 : 0.16, ease: 'easeIn' }
                            }}
                            className="overflow-hidden">
                            <div className="flex flex-col gap-2 pt-2">
                              {tools.test && (
                                <ToolCard
                                  icon={Terminal}
                                  label={copy.bashLabel}
                                  detail={agentScript.testCommand}
                                  running={!tools.test.done}
                                  settled={!!tools.edit}>
                                  <TerminalOutput
                                    lines={[
                                      `$ ${agentScript.testCommand}`,
                                      ...agentScript.testFail.slice(0, tools.test.lines)
                                    ]}
                                  />
                                </ToolCard>
                              )}
                              {tools.edit && (
                                <ToolCard
                                  icon={FilePen}
                                  label={copy.editLabel}
                                  detail={agentScript.editFile}
                                  running={!tools.edit.done}
                                  settled={!!tools.retest?.done}>
                                  <div className="overflow-x-auto rounded-md border border-border font-mono text-[11.5px] leading-[1.6] [scrollbar-width:none]">
                                    {agentScript.diff.slice(0, tools.edit.lines).map((line, index) => (
                                      <div
                                        key={index}
                                        className={cn(
                                          'flex min-w-max gap-2 px-2 whitespace-pre',
                                          line.kind === 'hunk' && 'bg-cap-web/8 text-muted-foreground',
                                          line.kind === 'del' && 'bg-[#f87171]/12 text-[#b91c1c] dark:text-[#fca5a5]',
                                          line.kind === 'add' && 'bg-[#4ade80]/12 text-[#15803d] dark:text-[#86efac]',
                                          line.kind === 'same' && 'text-foreground/80'
                                        )}>
                                        <span className="w-2 shrink-0 select-none opacity-70">
                                          {line.kind === 'del' ? '-' : line.kind === 'add' ? '+' : ' '}
                                        </span>
                                        <span>{line.text}</span>
                                      </div>
                                    ))}
                                  </div>
                                </ToolCard>
                              )}
                              {tools.retest && (
                                <ToolCard
                                  icon={Terminal}
                                  label={copy.bashLabel}
                                  detail={agentScript.testCommand}
                                  running={!tools.retest.done}>
                                  <TerminalOutput
                                    lines={[
                                      `$ ${agentScript.testCommand}`,
                                      ...agentScript.testPass.slice(0, tools.retest.lines)
                                    ]}
                                  />
                                </ToolCard>
                              )}
                            </div>
                          </m.div>
                        )}
                      </AnimatePresence>
                    </m.div>
                  )}

                  {state.choice !== null && (
                    <m.div
                      {...blockEnter}
                      className="w-full overflow-hidden rounded-[7px] border border-border bg-background">
                      <div className="flex items-center gap-2 px-2.5 py-2 text-[13px] text-muted-foreground">
                        <CircleHelp className="size-3.5 shrink-0" aria-hidden="true" />
                        <span className="min-w-0 flex-1 truncate">{copy.question.title}</span>
                        <span className="shrink-0 rounded-full bg-muted px-1.5 py-0.5 text-[11px] leading-4">
                          1 {copy.question.answered}
                        </span>
                      </div>
                      <div className="space-y-2 px-2.5 pb-2.5">
                        <div className="flex min-w-0 items-center gap-2 text-[13px]">
                          <span className="shrink-0 rounded-md bg-secondary px-1.5 py-0.5 text-[11px] font-medium">
                            {copy.question.header}
                          </span>
                          <span className="min-w-0 truncate">{copy.question.text}</span>
                        </div>
                        <div className="flex items-center gap-2 rounded-lg border border-primary/30 bg-primary/10 p-2 text-[13px] text-primary">
                          <CircleCheck className="size-4 shrink-0" aria-hidden="true" />
                          {copy.question.options[state.choice].label}
                        </div>
                      </div>
                    </m.div>
                  )}

                  {tools.commit && (
                    <ToolCard
                      icon={Terminal}
                      label={copy.bashLabel}
                      detail={agentScript.commitCommand}
                      running={!tools.commit.done}>
                      <TerminalOutput
                        lines={[
                          `$ ${agentScript.commitCommand}`,
                          ...agentScript.commitOutput.slice(0, tools.commit.lines)
                        ]}
                      />
                    </ToolCard>
                  )}

                  {state.summary && state.choice !== null && (
                    <p className="text-[13.5px] leading-6 text-foreground/90">
                      <StreamingText
                        key={`${locale}-${state.choice}`}
                        text={copy.summary[state.choice]}
                        locale={tag}
                        active={playing}
                        rate={44}
                      />
                    </p>
                  )}
                </m.div>
              )}
            </div>
          </div>

          <div className="shrink-0 px-3 pt-1 pb-3 sm:px-5 sm:pb-4">
            <AnimatePresence mode="wait" initial={false}>
              {state.asking ? (
                <m.div
                  key="ask"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={spring.settle}
                  className="rounded-[17px] border-[0.5px] border-hairline-strong bg-background/90 p-2.5 shadow-(--shadow-float) backdrop-blur">
                  <div className="flex items-center justify-between gap-3 px-1">
                    <p className="min-w-0 flex-1 text-sm leading-5 font-semibold">{copy.question.text}</p>
                    <span className="flex shrink-0 items-center gap-1 text-xs text-muted-foreground">
                      {copy.question.progress}
                      <X className="size-3.5" aria-hidden="true" />
                    </span>
                  </div>
                  <div className="mt-2 flex flex-col gap-1">
                    {copy.question.options.map((option, index) => (
                      <button
                        key={option.label}
                        type="button"
                        onClick={() => pickRef.current?.(index)}
                        className="group flex min-h-11 w-full cursor-pointer items-center gap-3 rounded-[12px] px-2.5 py-1.5 text-left hover:bg-muted focus-visible:bg-muted focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary">
                        <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-muted text-[13px] font-semibold text-muted-foreground transition-colors group-hover:bg-foreground group-hover:text-background group-focus-visible:bg-foreground group-focus-visible:text-background">
                          {index + 1}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-[13px] leading-5 font-semibold">{option.label}</span>
                          <span className="block truncate text-xs leading-4 text-muted-foreground">
                            {option.description}
                          </span>
                        </span>
                      </button>
                    ))}
                  </div>
                </m.div>
              ) : (
                <m.div
                  key="composer"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  aria-hidden="true"
                  className="flex items-center gap-2 rounded-[17px] border-[0.5px] border-hairline-strong bg-composer py-2 pr-2 pl-3.5 shadow-sm">
                  <span className="min-w-0 flex-1 truncate text-[13px] text-muted-foreground/70">
                    {copy.placeholder}
                  </span>
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-secondary text-muted-foreground">
                    <ArrowUp className="size-4" />
                  </span>
                </m.div>
              )}
            </AnimatePresence>
          </div>
        </div>
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
