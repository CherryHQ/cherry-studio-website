import { AnimatePresence, m, useReducedMotion } from 'framer-motion'
import {
  ArrowUp,
  ArrowUpRight,
  Check,
  ChevronDown,
  CirclePause,
  Ellipsis,
  FileCode2,
  FileText,
  Gauge,
  Monitor,
  MousePointerClick,
  Plus,
  ShieldCheck,
  ToolCase,
  Waypoints,
  X
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import { agentDemo, agentScript } from '@/content/demos/agents'
import { type DelegationStatus, delegationDemo, delegationScript } from '@/content/demos/delegation'
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
import { LaunchPage } from './LaunchPage'
import { AgentSessionBar, blockEnter, CliLogo, EmojiAvatar, TOOLBAR_ICON, UserAvatar } from './parts'

interface RunState {
  /** One entry per delegation card shown so far, in target order. */
  cards: DelegationStatus[]
  /** Target indexes in the order their results were delivered back. */
  results: number[]
  busy: boolean
  summary: boolean
  /** The file pane previewing the reported web page. */
  preview: boolean
}

const INITIAL: RunState = {
  cards: [],
  results: [],
  busy: false,
  summary: false,
  preview: false
}
const TERMINAL: DelegationStatus[] = ['completed', 'cancelled']
const FOCUS = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
// @cherrystudio/ui Button (size sm) variants used by AgentDelegationCard and PermissionRequestComposer.
const BUTTON = 'inline-flex h-8 items-center justify-center rounded-md px-3 text-[13px] font-medium whitespace-nowrap'
const OUTLINE = 'border border-border bg-background'
const SIDEBAR_ROW = 'flex h-8 min-w-0 items-center gap-2 rounded-lg px-2'
// Status tone of each delegation row; the app's info/warning/success tokens.
const TONE: Record<DelegationStatus, string> = {
  pending: 'text-muted-foreground',
  running: 'text-blue-500 dark:text-blue-400',
  awaiting: 'text-amber-600 dark:text-amber-400',
  completed: 'text-green-600 dark:text-green-400',
  cancelled: 'text-muted-foreground'
}

/** The step a running local Agent is on, advancing every 0.6s and sweeping with the app's shimmer. */
function LiveStep({ steps, active }: { steps: string[]; active: boolean }) {
  const [step, setStep] = useState(0)
  useEffect(() => {
    if (!active) return
    const timer = setInterval(() => setStep((value) => Math.min(value + 1, steps.length - 1)), 600)
    return () => clearInterval(timer)
  }, [active, steps.length])
  return <ShimmerText active={active}>{`${steps[step]}…`}</ShimmerText>
}

/**
 * An Agent delegates parts of one task to local CLI Agents in its workspace (CherryHQ/cherry-studio#21221). Each
 * delegation opens a session under its Agent in the sidebar, runs as an AgentDelegationCard, routes Claude Code's
 * command approval back here, and delivers its result to this conversation when it finishes.
 */
export default function AgentDelegationDemo({ bezel }: { bezel?: boolean }) {
  const { locale, tag } = useDemoLocale()
  const copy = delegationDemo[locale]
  const agent = agentDemo[locale]
  const targets = delegationScript.targets[locale]
  const reduced = useReducedMotion() ?? false
  const ref = useRef<HTMLDivElement>(null)
  const scroller = useRef<HTMLDivElement>(null)
  const thread = useRef<HTMLDivElement>(null)
  const approveRef = useRef<(() => void) | null>(null)
  const playing = useDemoPlayback(ref)
  const [state, setState] = useState<RunState>(INITIAL)
  const [elapsed, setElapsed] = useState(0)
  useStickToBottom(scroller, thread)

  const update = (patch: Partial<RunState>) => setState((previous) => ({ ...previous, ...patch }))
  // A cancelled card stays cancelled, whatever the script does next; completing a card delivers its result.
  const setCard = (index: number, status: DelegationStatus) =>
    setState((previous) => {
      if (previous.cards[index] === 'cancelled') return previous
      return {
        ...previous,
        cards: previous.cards.map((current, i) => (i === index ? status : current)),
        results: status === 'completed' ? [...previous.results, index] : previous.results
      }
    })

  const { replay } = useDemoScript(async ({ wait, reduced: skip }) => {
    approveRef.current = null
    if (skip) {
      setElapsed(38)
      setState({
        ...INITIAL,
        cards: ['completed', 'completed', 'completed'],
        results: [2, 1, 0],
        summary: true,
        preview: true
      })
      return
    }
    setElapsed(0)
    // The prompt is already sent and the finished page is on screen within about two seconds.
    setState({ ...INITIAL, busy: true })
    await wait(150)
    update({ cards: ['running', 'running', 'running'] })
    await wait(400)
    setCard(0, 'awaiting')
    // Codex and Grok Build keep working while Claude Code waits for the approval.
    const others = (async () => {
      await wait(300)
      setCard(2, 'completed')
      await wait(300)
      setCard(1, 'completed')
    })()
    others.catch(() => {})
    await Promise.race([
      new Promise<void>((resolve) => {
        approveRef.current = resolve
      }),
      wait(900)
    ])
    approveRef.current = null
    setCard(0, 'running')
    await wait(400)
    setCard(0, 'completed')
    update({ preview: true })
    await others
    await wait(300)
    update({ busy: false, summary: true })
  }, playing)

  useEffect(() => {
    if (!state.busy || !playing || reduced) return
    const timer = setInterval(() => setElapsed((value) => value + 1), 1000)
    return () => clearInterval(timer)
  }, [state.busy, playing, reduced])

  const cancel = (index: number) => {
    setCard(index, 'cancelled')
    if (index === 0) approveRef.current?.()
  }

  const sidebar = (
    <nav
      aria-hidden="true"
      className="hidden w-[214px] shrink-0 flex-col gap-0.5 overflow-y-auto border-r-[0.5px] border-border p-1.5 text-[13px] [scrollbar-width:none] @4xl:flex">
      <div className="flex min-h-8 items-center gap-1">
        <span className={cn(SIDEBAR_ROW, 'flex-1')}>
          <Plus className="size-4 shrink-0" />
          {copy.addAgent}
        </span>
        <span className="flex size-[30px] items-center justify-center text-muted-foreground">
          <Ellipsis className="size-4" />
        </span>
      </div>
      <div className={SIDEBAR_ROW}>
        <EmojiAvatar size={22} />
        <span className="truncate">{copy.agentName}</span>
      </div>
      <div className={cn(SIDEBAR_ROW, 'bg-accent pl-9 font-medium text-foreground')}>
        <span className="truncate">{copy.session}</span>
      </div>
      {delegationScript.roster[locale].map((runtime) => {
        const target = targets.findIndex((item) => item.id === runtime.id)
        const delegated = target >= 0 && state.cards[target] && state.cards[target] !== 'pending'
        return (
          <div key={runtime.id}>
            <div className={SIDEBAR_ROW}>
              <CliLogo id={runtime.id} name={runtime.name} />
              <span className="truncate">{runtime.name}</span>
              <Monitor className="size-3 shrink-0 text-muted-foreground" />
            </div>
            <AnimatePresence initial={false}>
              {delegated && (
                <m.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 32 }}
                  className={cn(SIDEBAR_ROW, 'gap-1.5 pl-9')}>
                  <span className="truncate">{copy.targets[target].session}</span>
                  {!TERMINAL.includes(state.cards[target]) && (
                    <span className="size-1.5 shrink-0 rounded-full bg-primary motion-safe:animate-pulse" />
                  )}
                </m.div>
              )}
            </AnimatePresence>
            {(copy.history[runtime.id] ?? []).map((session) => (
              <div key={session} className={cn(SIDEBAR_ROW, 'pl-9 text-muted-foreground')}>
                <span className="truncate">{session}</span>
              </div>
            ))}
          </div>
        )
      })}
    </nav>
  )

  // PermissionRequestComposer: a pending delegated approval takes the composer's place in the parent conversation.
  const approval = (
    <div className="rounded-[17px] border-[0.5px] border-border bg-background p-2.5 shadow-[0_1px_5px_rgba(15,23,42,0.05)] dark:shadow-[0_1px_5px_rgba(0,0,0,0.14)]">
      <h4 className="flex items-center gap-2 px-1 text-sm leading-5 font-semibold">
        <ShieldCheck className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
        {copy.approval.title}
      </h4>
      <p className="mt-1 flex flex-wrap items-center gap-x-1.5 px-1 text-xs text-muted-foreground">
        <span>{copy.approval.source}</span>
        <span className="text-foreground">
          {targets[0].name} / {copy.targets[0].session}
        </span>
      </p>
      <div className="mt-2 rounded-[12px] bg-muted px-3 py-2 dark:bg-muted/30">
        <div className="mb-1 text-xs text-muted-foreground">{copy.approval.command}</div>
        <code className="block font-mono text-xs break-all text-foreground">{delegationScript.approvalCommand}</code>
      </div>
      <div className="mt-2.5 flex flex-wrap justify-end gap-2 px-1 pb-0.5">
        <button type="button" onClick={() => cancel(0)} className={cn(BUTTON, OUTLINE, 'cursor-pointer', FOCUS)}>
          {copy.approval.deny}
        </button>
        <button
          type="button"
          onClick={() => approveRef.current?.()}
          className={cn(BUTTON, 'cursor-pointer bg-secondary text-secondary-foreground', FOCUS)}>
          {copy.approval.alwaysAllow.replace('{target}', delegationScript.approvalTarget)}
        </button>
        <button
          type="button"
          onClick={() => approveRef.current?.()}
          className={cn(BUTTON, 'cursor-pointer bg-foreground text-background hover:bg-foreground/85', FOCUS)}>
          {copy.approval.allowOnce}
        </button>
      </div>
    </div>
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

  // ReportArtifacts MessageFileCards: the files an Agent reported, under the final answer.
  const outputs = (
    <m.section {...blockEnter} className="my-1 flex w-full max-w-xl flex-col gap-1.5 text-sm">
      <p className="font-medium text-muted-foreground">{copy.outputs}</p>
      {delegationScript.outputs.map((path, index) => {
        const name = path.split('/').pop() ?? path
        const Icon = index === 0 ? FileCode2 : FileText
        return (
          <div
            key={path}
            className="group/artifact flex w-full min-w-0 items-center overflow-hidden rounded-lg border-[0.5px] border-border bg-muted/40 transition-colors hover:bg-accent">
            <button
              type="button"
              onClick={() => index === 0 && update({ preview: !state.preview })}
              title={path}
              className={cn(
                'group/preview flex min-h-12 min-w-0 flex-1 items-center gap-2.5 px-2.5 py-2 text-left',
                index === 0 ? 'cursor-pointer' : 'cursor-default',
                FOCUS
              )}>
              <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-background">
                <Icon
                  className={cn('size-5', ['text-orange-500', 'text-blue-500', 'text-muted-foreground'][index])}
                  aria-hidden="true"
                />
              </span>
              <span className="flex min-w-0 flex-1 flex-col">
                <span className="truncate text-[13px] leading-5 font-medium">{name}</span>
                <span className="grid min-w-0 text-xs leading-4 text-muted-foreground">
                  <span
                    className={cn(
                      'col-start-1 row-start-1 truncate',
                      index === 0 && 'group-hover/preview:invisible group-focus-visible/preview:invisible'
                    )}>
                    {copy.outputTypes[index]}
                  </span>
                  {index === 0 && (
                    <span className="invisible col-start-1 row-start-1 truncate group-hover/preview:visible group-focus-visible/preview:visible">
                      {copy.openPreview}
                    </span>
                  )}
                </span>
              </span>
            </button>
            <span className={cn(BUTTON, OUTLINE, 'mr-2 gap-1 rounded-lg')} aria-hidden="true">
              {copy.openWith}
              <ChevronDown className="size-3.5 text-muted-foreground" />
            </span>
          </div>
        )
      })}
    </m.section>
  )

  // File pane on the right, wiping in from its trailing edge like the desktop right pane.
  const previewPane = (
    <m.aside
      key="preview"
      aria-label={copy.preview}
      initial={reduced ? false : { opacity: 0, clipPath: 'inset(0 0 0 100%)' }}
      animate={{ opacity: 1, clipPath: 'inset(0 0 0 0%)' }}
      exit={{ opacity: 0, clipPath: 'inset(0 0 0 100%)' }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="hidden w-[40%] max-w-[460px] shrink-0 flex-col border-l-[0.5px] border-border @4xl:flex">
      <div className="flex h-11 shrink-0 items-center gap-2 border-b-[0.5px] border-border px-3 text-[13px]">
        <FileCode2 className="size-4 shrink-0 text-orange-500" aria-hidden="true" />
        <span className="min-w-0 flex-1 truncate font-medium">index.html</span>
        <span className="truncate text-xs text-muted-foreground">{copy.preview}</span>
        <button
          type="button"
          aria-label={copy.close}
          onClick={() => update({ preview: false })}
          className={cn(
            'flex size-7 cursor-pointer items-center justify-center rounded-md text-muted-foreground hover:bg-accent',
            FOCUS
          )}>
          <X className="size-4" />
        </button>
      </div>
      <div className="@container min-h-0 flex-1">
        <LaunchPage copy={copy.launch} playing={playing} />
      </div>
    </m.aside>
  )

  const agentName = <span className="truncate text-sm leading-5 font-semibold">{copy.agentName}</span>

  return (
    <div ref={ref} role="region" aria-label={copy.region} className="@container">
      <DemoFrame
        chromeless
        bezel={bezel}
        title={agent.window}
        onReplay={replay}
        bodyClassName="h-[clamp(480px,62.5cqw,78svh)]">
        <AppShell active="agents" tab={{ title: copy.session, emoji: '🤖' }}>
          <div className="flex h-full min-h-0">
            {sidebar}
            <div className="flex min-w-0 flex-1 flex-col">
              <AgentSessionBar
                agentName={copy.agentName}
                workspace={delegationScript.workspace}
                model={agentScript.model[locale]}
                picking={false}
                pane={state.preview ? 'files' : undefined}
              />
              <div
                ref={scroller}
                className="relative min-h-0 flex-1 overflow-y-auto px-4 [scrollbar-width:none] sm:px-6">
                <div ref={thread} className="space-y-5 py-4">
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
                      <div className="mt-2 flex min-h-7 items-center gap-1.5 py-0.5 text-[13px] text-muted-foreground">
                        <span>{state.busy ? agent.processing : agent.processed}</span>
                        <span aria-hidden="true" className="text-muted-foreground/70">
                          ·
                        </span>
                        <span>{agent.seconds.replace('{s}', String(elapsed))}</span>
                      </div>
                      <p className="pt-2 text-sm leading-relaxed">
                        <StreamingText key={locale} text={copy.intro} locale={tag} active={playing} rate={40} />
                      </p>
                      {state.cards.length > 0 && (
                        <m.div {...blockEnter} className="mt-3 flex flex-col gap-1">
                          <div className="flex min-h-7 items-center gap-1.5 text-[13px] text-muted-foreground">
                            <Waypoints className="size-3.5 shrink-0 text-muted-foreground/80" aria-hidden="true" />
                            {copy.delegated.replace('{count}', String(state.cards.length))}
                            {state.busy && <BeatDots className="text-muted-foreground/80" />}
                          </div>
                          {state.cards.map((status, index) => {
                            const target = targets[index]
                            return (
                              <m.div
                                key={target.id}
                                {...blockEnter}
                                className="group/row flex min-h-9 min-w-0 items-center gap-2.5 rounded-lg px-2 text-[13px] hover:bg-accent/50">
                                <CliLogo id={target.id} name={target.name} />
                                <span className="shrink-0 font-medium">{target.name}</span>
                                <span className="truncate text-muted-foreground">{copy.targets[index].session}</span>
                                <span className="ml-auto flex shrink-0 items-center gap-2 text-xs">
                                  {status === 'running' && (
                                    <span className="hidden max-w-56 truncate @3xl:inline">
                                      <LiveStep steps={copy.targets[index].steps} active={playing} />
                                    </span>
                                  )}
                                  {status === 'completed' && (
                                    <span className="hidden text-muted-foreground @3xl:inline">
                                      {copy.targets[index].stat}
                                    </span>
                                  )}
                                  <span
                                    role="status"
                                    className={cn('flex items-center gap-1 font-medium', TONE[status])}>
                                    {status === 'running' && <BeatDots />}
                                    {status === 'completed' && <Check className="size-3.5" aria-hidden="true" />}
                                    {copy.status[status]}
                                  </span>
                                  {!TERMINAL.includes(status) && (
                                    <button
                                      type="button"
                                      onClick={() => cancel(index)}
                                      aria-label={`${copy.cancel} · ${target.name}`}
                                      className={cn(
                                        'flex size-6 cursor-pointer items-center justify-center rounded-md text-muted-foreground opacity-0 group-hover/row:opacity-100 hover:bg-accent focus-visible:opacity-100',
                                        FOCUS
                                      )}>
                                      <X className="size-3.5" />
                                    </button>
                                  )}
                                </span>
                              </m.div>
                            )
                          })}
                        </m.div>
                      )}
                    </div>
                  </m.div>
                  {state.results.map((index) => {
                    const target = targets[index]
                    return (
                      <m.div key={target.id} {...blockEnter} className="flex flex-col items-end gap-1.5">
                        <span className="mr-10 flex items-center gap-1.5 text-xs text-muted-foreground">
                          <MousePointerClick className="size-3.5" aria-hidden="true" />
                          {copy.from.replace('{agent}', target.name).replace('{session}', copy.targets[index].session)}
                          <ArrowUpRight className="size-3" aria-hidden="true" />
                        </span>
                        <div className="flex max-w-[calc(100%-2.5rem)] items-start gap-2.5">
                          <p className="rounded-[10px] bg-muted px-4 py-2.5 text-sm leading-relaxed">
                            {copy.targets[index].result}
                          </p>
                          <UserAvatar className="mt-1.5" />
                        </div>
                      </m.div>
                    )
                  })}
                  {state.summary && (
                    <m.div {...blockEnter} className="flex items-start gap-2.5">
                      <EmojiAvatar size={30} />
                      <div className="flex min-w-0 flex-1 flex-col gap-2">
                        {agentName}
                        <p className="text-sm leading-relaxed">
                          <StreamingText
                            key={`${locale}-summary`}
                            text={copy.summary}
                            locale={tag}
                            active={playing}
                            rate={44}
                          />
                        </p>
                        {outputs}
                      </div>
                    </m.div>
                  )}
                </div>
              </div>
              <div className="shrink-0 px-3 pb-3 sm:px-5">
                <AnimatePresence mode="wait" initial={false}>
                  <m.div
                    key={state.cards[0] === 'awaiting' ? 'approval' : 'composer'}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={spring.settle}>
                    {state.cards[0] === 'awaiting' ? approval : composer}
                  </m.div>
                </AnimatePresence>
              </div>
            </div>
            <AnimatePresence>{state.preview && previewPane}</AnimatePresence>
          </div>
        </AppShell>
      </DemoFrame>
    </div>
  )
}
