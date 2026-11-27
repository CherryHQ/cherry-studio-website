import { m, useReducedMotion } from 'framer-motion'
import { ArrowUp, ChevronDown, CirclePause, Gauge, Plus, ShieldCheck, ToolCase } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import { agentDemo, agentScript } from '@/content/demos/agents'
import { type DelegationStatus, delegationDemo, delegationScript } from '@/content/demos/delegation'
import { cn } from '@/lib/utils'
import AppShell, { tabTitle } from '../primitives/AppShell'
import DemoFrame from '../primitives/DemoFrame'
import StreamingText from '../primitives/StreamingText'
import { useDemoLocale } from '../primitives/useDemoLocale'
import { useDemoPlayback, useDemoScript } from '../primitives/useDemoScript'
import { useStickToBottom } from '../primitives/useStickToBottom'
import { AgentSessionBar, blockEnter, CliLogo, EmojiAvatar, TOOLBAR_ICON, UserAvatar } from './parts'

interface RunState {
  draft: number
  user: boolean
  intro: boolean
  /** One entry per delegation card shown so far, in target order. */
  cards: DelegationStatus[]
  busy: boolean
  summary: boolean
}

const INITIAL: RunState = { draft: 0, user: false, intro: false, cards: [], busy: false, summary: false }
const TERMINAL: DelegationStatus[] = ['completed', 'cancelled']
const FOCUS = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
// @cherrystudio/ui Button (size sm) variants used by AgentDelegationCard and PermissionRequestComposer.
const BUTTON = 'inline-flex h-8 items-center justify-center rounded-md px-3 text-[13px] font-medium whitespace-nowrap'
const OUTLINE = 'border border-border bg-background'

/**
 * An Agent delegates parts of one task to local CLI Agents in its workspace. Each delegation is an
 * AgentDelegationCard; Claude Code pauses on a command approval routed back to this conversation.
 */
export default function AgentDelegationDemo({ bezel }: { bezel?: boolean }) {
  const { locale, tag } = useDemoLocale()
  const copy = delegationDemo[locale]
  const agent = agentDemo[locale]
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
  // A cancelled card stays cancelled, whatever the script does next.
  const setCard = (index: number, status: DelegationStatus) =>
    setState((previous) => ({
      ...previous,
      cards: previous.cards.map((current, i) => (i === index && current !== 'cancelled' ? status : current))
    }))

  const { replay } = useDemoScript(async ({ wait, reduced: skip }) => {
    approveRef.current = null
    if (skip) {
      setElapsed(38)
      setState({ ...INITIAL, user: true, intro: true, cards: ['completed', 'completed', 'completed'], summary: true })
      return
    }
    setState(INITIAL)
    setElapsed(0)
    await wait(500)
    for (let count = 1; count <= copy.task.length; count += locale === 'zh' ? 1 : 3) {
      update({ draft: count })
      await wait(locale === 'zh' ? 40 : 26)
    }
    await wait(400)
    update({ draft: 0, user: true, busy: true })
    await wait(700)
    update({ intro: true })
    await wait(1600)
    for (const _ of delegationScript.targets) {
      setState((previous) => ({ ...previous, cards: [...previous.cards, 'pending'] }))
      await wait(280)
    }
    await wait(500)
    for (const index of [0, 1, 2]) {
      setCard(index, 'running')
      await wait(220)
    }
    await wait(1500)
    setCard(0, 'awaiting')
    // Codex and OpenCode keep working while Claude Code waits for the approval.
    const others = (async () => {
      await wait(2400)
      setCard(2, 'completed')
      await wait(1500)
      setCard(1, 'completed')
    })()
    others.catch(() => {})
    await Promise.race([
      new Promise<void>((resolve) => {
        approveRef.current = resolve
      }),
      wait(4500)
    ])
    approveRef.current = null
    setCard(0, 'running')
    await wait(2300)
    setCard(0, 'completed')
    await others
    await wait(400)
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

  const approval = (
    <m.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className="overflow-hidden">
      <div className="rounded-[17px] border-[0.5px] border-border p-2.5 shadow-[0_1px_5px_rgba(15,23,42,0.05)] dark:shadow-[0_1px_5px_rgba(0,0,0,0.14)]">
        <h4 className="flex items-center gap-2 px-1 text-sm leading-5 font-semibold">
          <ShieldCheck className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
          {copy.approval.title}
        </h4>
        <p className="mt-1 flex flex-wrap items-center gap-x-1.5 px-1 text-xs text-muted-foreground">
          <span>{copy.approval.source}</span>
          <span className="text-foreground">{delegationScript.targets[0].name}</span>
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
    </m.div>
  )

  const composer = (
    <div className="rounded-[20px] border-[0.5px] border-border bg-composer pt-2 shadow-sm" aria-hidden="true">
      <div className="min-h-[46px] px-[15px] pt-1.5 text-sm leading-[1.4]">
        {state.draft > 0 ? (
          <span>
            {copy.task.slice(0, state.draft)}
            <span className="ml-px inline-block h-4 w-px translate-y-0.5 bg-foreground motion-safe:animate-caret" />
          </span>
        ) : (
          <span className="line-clamp-2 text-muted-foreground">
            {state.busy ? agent.placeholderBusy : agent.placeholder}
          </span>
        )}
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
    </div>
  )

  return (
    <div ref={ref} role="region" aria-label={copy.region} className="@container">
      <DemoFrame
        chromeless
        bezel={bezel}
        title={agent.window}
        onReplay={replay}
        bodyClassName="h-[clamp(480px,62.5cqw,78svh)]">
        <AppShell active="agents" tab={{ title: tabTitle(agent.window), emoji: '🤖' }}>
          <div className="flex h-full min-h-0 flex-col">
            <AgentSessionBar
              agentName={copy.agentName}
              workspace={delegationScript.workspace}
              model={agentScript.model}
              picking={!state.user}
            />
            <div ref={scroller} className="relative min-h-0 flex-1 overflow-y-auto px-4 [scrollbar-width:none] sm:px-6">
              {!state.user && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center">
                  <EmojiAvatar size={48} />
                  <p className="text-lg font-medium">{agent.greeting}</p>
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
                        <div className="mt-3 grid items-start gap-2.5 @4xl:grid-cols-3">
                          {state.cards.map((status, index) => {
                            const target = delegationScript.targets[index]
                            return (
                              <m.div
                                key={target.id}
                                layout={!reduced}
                                {...blockEnter}
                                className="min-w-0 space-y-3 overflow-hidden rounded-lg border border-border bg-background p-3">
                                <div className="flex items-center justify-between gap-2">
                                  <span className="flex min-w-0 items-center gap-2 text-sm font-medium">
                                    <CliLogo id={target.id} name={target.name} />
                                    <span className="truncate">{target.name}</span>
                                  </span>
                                  <span
                                    role="status"
                                    className="shrink-0 rounded-md border border-border px-2 py-0.5 text-xs font-medium">
                                    {copy.status[status]}
                                  </span>
                                </div>
                                <div className="text-xs break-all text-muted-foreground">
                                  {delegationScript.workspacePath}
                                </div>
                                {status === 'awaiting' && approval}
                                <div className="flex justify-between gap-2">
                                  <span className={cn(BUTTON, OUTLINE)}>{copy.open}</span>
                                  {!TERMINAL.includes(status) && (
                                    <button
                                      type="button"
                                      onClick={() => cancel(index)}
                                      className={cn(BUTTON, OUTLINE, 'cursor-pointer hover:bg-accent', FOCUS)}>
                                      {copy.cancel}
                                    </button>
                                  )}
                                </div>
                              </m.div>
                            )
                          })}
                        </div>
                      )}
                      {state.summary && (
                        <p className="mt-3 text-sm leading-relaxed">
                          <StreamingText
                            key={`${locale}-summary`}
                            text={copy.summary}
                            locale={tag}
                            active={playing}
                            rate={44}
                          />
                        </p>
                      )}
                    </div>
                  </m.div>
                )}
              </div>
            </div>
            <div className="shrink-0 px-3 pb-3 sm:px-5">{composer}</div>
          </div>
        </AppShell>
      </DemoFrame>
    </div>
  )
}
