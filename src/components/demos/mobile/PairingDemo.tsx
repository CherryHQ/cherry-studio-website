import { AnimatePresence, m } from 'framer-motion'
import {
  Check,
  ChevronLeft,
  CircleCheck,
  Folder,
  Loader2,
  Menu,
  MonitorSmartphone,
  Plus,
  ScanLine,
  Smartphone,
  Terminal
} from 'lucide-react'
import { useRef, useState } from 'react'

import { type PairingCopy, type PairingStage, pairingDemo } from '@/content/demos/mobile'
import { press, spring } from '@/lib/motion'
import { cn } from '@/lib/utils'
import BeatDots from '../primitives/BeatDots'
import ProviderIcon from '../primitives/ProviderIcon'
import StreamingText from '../primitives/StreamingText'
import { useDemoLocale } from '../primitives/useDemoLocale'
import { useDemoPlayback, useDemoScript } from '../primitives/useDemoScript'
import PhoneFrame from './PhoneFrame'
import ShimmerText from './ShimmerText'

type Step = 'scan' | 'verify' | 'import' | 'agent'
type AgentPhase = 'idle' | 'typing' | 'approval' | 'running' | 'answer' | 'done' | 'denied'

interface DemoState {
  step: Step
  scanned: boolean
  progress: PairingStage[]
  claim: boolean
  approved: boolean
  connected: boolean
  sync: 'fetching' | 'list' | 'importing' | 'done'
  agent: AgentPhase
  typed: string
  pressed: 'approve' | 'continue' | null
}

const STEPS: Step[] = ['scan', 'verify', 'import', 'agent']
const STAGES: PairingStage[] = ['connecting', 'requesting', 'waiting', 'syncing', 'saving']
const CODE = '482913'

const INITIAL: DemoState = {
  step: 'scan',
  scanned: false,
  progress: [],
  claim: false,
  approved: false,
  connected: false,
  sync: 'fetching',
  agent: 'idle',
  typed: '',
  pressed: null
}

/** State as it stands when the timeline enters `step`, so the step chips can start anywhere. */
const entering = (step: Step): DemoState =>
  step === 'scan'
    ? INITIAL
    : step === 'verify'
      ? { ...INITIAL, step, scanned: true }
      : { ...INITIAL, step, scanned: true, progress: STAGES, approved: true, connected: true }

const focusRing = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'

export default function PairingDemo() {
  const { locale, tag } = useDemoLocale()
  const copy = pairingDemo[locale]
  const ref = useRef<HTMLDivElement>(null)
  const playing = useDemoPlayback(ref)
  const [state, setState] = useState<DemoState>(INITIAL)
  const update = (patch: Partial<DemoState>) => setState((previous) => ({ ...previous, ...patch }))
  const start = useRef<Step>('scan')
  const pasted = useRef(false)
  const approved = useRef(false)
  const decision = useRef<'continue' | 'deny' | null>(null)

  const { replay } = useDemoScript(async ({ wait, reduced }) => {
    // Waits for the visitor's own tap, or plays it for them after `ms`.
    const until = async (done: () => boolean, ms: number) => {
      for (let elapsed = 0; elapsed < ms && !done(); elapsed += 100) await wait(100)
    }
    pasted.current = false
    approved.current = false
    decision.current = null
    const from = STEPS.indexOf(start.current)
    if (reduced) {
      setState({ ...entering('agent'), sync: 'done', agent: 'done' })
      return
    }
    setState(entering(start.current))
    await wait(500)

    if (from <= 0) {
      await until(() => pasted.current, 1800)
      update({ scanned: true })
      await wait(800)
    }
    if (from <= 1) {
      update({ step: 'verify', progress: ['connecting'] })
      await wait(650)
      update({ progress: ['connecting', 'requesting'] })
      await wait(650)
      update({ progress: ['connecting', 'requesting', 'waiting'], claim: true })
      await until(() => approved.current, 2800)
      if (!approved.current) {
        update({ pressed: 'approve' })
        await wait(200)
      }
      update({ pressed: null, approved: true, progress: STAGES.slice(0, 4) })
      await wait(550)
      update({ progress: STAGES })
      await wait(450)
      update({ connected: true })
      await wait(1300)
    }
    if (from <= 2) {
      update({ step: 'import', sync: 'fetching' })
      await wait(1100)
      update({ sync: 'list' })
      await wait(1500)
      update({ sync: 'importing' })
      await wait(1200)
      update({ sync: 'done' })
      await wait(1800)
    }
    update({ step: 'agent', agent: 'idle', typed: '' })
    await wait(700)
    update({ agent: 'typing' })
    for (let index = 1; index <= copy.agent.prompt.length; index++) {
      update({ typed: copy.agent.prompt.slice(0, index) })
      await wait(locale === 'zh' ? 70 : 30)
    }
    await wait(450)
    update({ agent: 'approval', typed: '' })
    await until(() => decision.current !== null, 3000)
    if (decision.current === 'deny') {
      update({ agent: 'denied' })
      return
    }
    if (!decision.current) {
      update({ pressed: 'continue' })
      await wait(200)
    }
    update({ pressed: null, agent: 'running' })
    await wait(1800)
    update({ agent: 'answer' })
  }, playing)

  const jump = (step: Step) => {
    start.current = step
    replay()
  }

  const approve = () => {
    approved.current = true
    update({ approved: true })
  }
  const respond = (choice: 'continue' | 'deny') => {
    decision.current = choice
    update({ agent: choice === 'deny' ? 'denied' : 'running' })
  }

  const stepIndex = STEPS.indexOf(state.step)

  return (
    <div ref={ref} role="region" aria-label={copy.region} className="space-y-5">
      <div className="grid items-center gap-6 md:grid-cols-[minmax(0,1fr)_300px] md:gap-10">
        <DesktopCard copy={copy} state={state} onApprove={approve} onReject={() => jump('scan')} />
        <PhoneFrame
          onReplay={() => jump('scan')}
          overlay={
            <ApprovalSheet
              copy={copy.agent}
              open={state.step === 'agent' && state.agent === 'approval'}
              pressed={state.pressed === 'continue'}
              onRespond={respond}
            />
          }
          screenClassName={state.step === 'scan' ? 'text-white dark:bg-black bg-black' : undefined}>
          <AnimatePresence mode="popLayout" initial={false}>
            <m.div
              key={state.step}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={spring.settle}
              className="absolute inset-0">
              {state.step === 'scan' && (
                <ScanScreen
                  copy={copy.scan}
                  scanned={state.scanned}
                  playing={playing}
                  onPaste={() => {
                    pasted.current = true
                  }}
                />
              )}
              {state.step === 'verify' && <VerifyScreen copy={copy.pair} state={state} />}
              {state.step === 'import' && <ImportScreen copy={copy.sync} phase={state.sync} />}
              {state.step === 'agent' && (
                <AgentScreen
                  copy={copy.agent}
                  state={state}
                  tag={tag}
                  playing={playing}
                  onDone={() => update({ agent: 'done' })}
                />
              )}
            </m.div>
          </AnimatePresence>
        </PhoneFrame>
      </div>

      <nav aria-label={copy.stepNav} className="flex flex-wrap justify-center gap-1.5">
        {STEPS.map((step, index) => (
          <button
            key={step}
            type="button"
            aria-current={step === state.step ? 'step' : undefined}
            onClick={() => jump(step)}
            className={cn(
              'inline-flex cursor-pointer items-center gap-1.5 rounded-full border px-3 py-1 text-xs transition-colors duration-200',
              focusRing,
              step === state.step
                ? 'border-primary/40 bg-primary/10 text-foreground'
                : 'border-border text-muted-foreground hover:border-hairline-strong hover:text-foreground'
            )}>
            <span
              className={cn(
                'flex size-4 items-center justify-center rounded-full font-mono text-[10px]',
                index < stepIndex ? 'bg-primary text-primary-foreground' : 'bg-secondary'
              )}>
              {index < stepIndex ? <Check className="size-2.5" aria-hidden="true" /> : index + 1}
            </span>
            {copy.steps[step]}
          </button>
        ))}
      </nav>
    </div>
  )
}

/** Desktop Settings → Device Connections: the pairing QR, then the claim the phone raised. */
function DesktopCard({
  copy,
  state,
  onApprove,
  onReject
}: {
  copy: PairingCopy
  state: DemoState
  onApprove: () => void
  onReject: () => void
}) {
  const desktop = copy.desktop
  const showClaim = state.claim && !state.approved
  return (
    <div className="glass-card flex h-[400px] min-w-0 flex-col overflow-hidden rounded-xl md:h-[500px]">
      <div className="flex h-10 shrink-0 items-center gap-3 border-b border-border px-3.5">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-[#ff5f57]/80" />
          <span className="size-2.5 rounded-full bg-[#febc2e]/80" />
          <span className="size-2.5 rounded-full bg-[#28c840]/80" />
        </span>
        <span className="min-w-0 flex-1 truncate text-center font-mono text-[11px] text-muted-foreground">
          Cherry Studio — {desktop.title}
        </span>
        <span className="w-[42px]" />
      </div>
      <div className="flex min-h-0 flex-1 flex-col gap-4 bg-card/60 p-4 md:p-6">
        <div className="flex items-center gap-3 rounded-xl border border-border bg-background/40 px-3.5 py-2.5">
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary/12 text-primary">
            <MonitorSmartphone className="size-4" aria-hidden="true" />
          </span>
          <span className="flex items-center gap-2 text-[13px] font-medium">
            <span className="size-2 rounded-full bg-primary" aria-hidden="true" />
            {desktop.ready}
          </span>
        </div>
        <div className="flex min-h-0 flex-1 flex-col gap-3">
          <div>
            <p className="text-[13px] font-medium">{state.connected ? desktop.pairedDevices : desktop.pairTitle}</p>
            {!state.connected && (
              <p className={cn('mt-1 text-xs leading-5 text-muted-foreground', showClaim && 'max-md:hidden')}>
                {desktop.pairHint}
              </p>
            )}
          </div>
          <div className="flex min-h-0 flex-1 items-center justify-center">
            <AnimatePresence mode="wait" initial={false}>
              {state.connected ? (
                <m.div
                  key="paired"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={spring.settle}
                  className="w-full max-w-sm space-y-3">
                  <div className="flex items-center gap-3 rounded-lg border border-border px-3 py-2.5">
                    <Smartphone className="size-4 text-muted-foreground" aria-hidden="true" />
                    <span className="min-w-0 flex-1">
                      <span className="block text-[13px] font-medium">{desktop.deviceName}</span>
                      <span className="block text-[11px] text-muted-foreground">
                        {desktop.platform} · {desktop.lastSeen}
                      </span>
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] text-primary">
                      <CircleCheck className="size-3.5" aria-hidden="true" />
                      {desktop.approved}
                    </span>
                  </div>
                </m.div>
              ) : showClaim ? (
                <m.div
                  key="claim"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={spring.settle}
                  className="flex w-full max-w-sm flex-col gap-2.5 rounded-lg border border-border bg-background/50 p-3">
                  <div>
                    <p className="text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
                      {desktop.claimTitle}
                    </p>
                    <p className="mt-1 truncate text-sm font-medium">{desktop.deviceName}</p>
                    <p className="text-xs text-muted-foreground">{desktop.platform}</p>
                  </div>
                  <p className="font-mono text-2xl tracking-[0.3em]">{CODE}</p>
                  <p className="text-xs leading-5 text-muted-foreground">{desktop.codeHint}</p>
                  <div aria-hidden="true" className="hidden flex-col gap-1.5 text-[13px] sm:flex">
                    {[desktop.capabilities.configuration, desktop.capabilities.agent].map((label) => (
                      <span key={label} className="flex items-center gap-2">
                        <span className="flex size-4 items-center justify-center rounded-[4px] bg-primary text-primary-foreground">
                          <Check className="size-3" strokeWidth={3} />
                        </span>
                        {label}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <m.button
                      type="button"
                      {...press}
                      animate={{ scale: state.pressed === 'approve' ? 0.97 : 1 }}
                      onClick={onApprove}
                      className={cn(
                        'h-8 cursor-pointer rounded-md bg-primary px-3.5 text-[13px] font-medium text-primary-foreground',
                        focusRing
                      )}>
                      {desktop.approve}
                    </m.button>
                    <m.button
                      type="button"
                      {...press}
                      onClick={onReject}
                      className={cn(
                        'h-8 cursor-pointer rounded-md border border-border px-3.5 text-[13px] hover:bg-accent',
                        focusRing
                      )}>
                      {desktop.reject}
                    </m.button>
                  </div>
                </m.div>
              ) : (
                <m.div
                  key="qr"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: state.claim ? 0.4 : 1 }}
                  exit={{ opacity: 0 }}
                  className="rounded-xl bg-white p-3 shadow-sm ring-1 ring-black/5">
                  <QrCode className="size-[132px] md:size-[164px]" />
                </m.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}

function ScanScreen({
  copy,
  scanned,
  playing,
  onPaste
}: {
  copy: PairingCopy['scan']
  scanned: boolean
  playing: boolean
  onPaste: () => void
}) {
  return (
    <div className="flex h-full flex-col bg-black px-5 pb-8 text-white">
      <div className="flex h-11 items-center gap-2" aria-hidden="true">
        <ChevronLeft className="size-5" />
        <span className="text-[16px] font-semibold">{copy.title}</span>
      </div>
      <p className="text-[12px] text-white/55">{copy.step}</p>
      <div className="flex flex-1 items-center justify-center">
        <div aria-hidden="true" className="relative size-[200px]">
          {[
            'top-0 left-0 border-t-[3px] border-l-[3px] rounded-tl-2xl',
            'top-0 right-0 border-t-[3px] border-r-[3px] rounded-tr-2xl',
            'bottom-0 left-0 border-b-[3px] border-l-[3px] rounded-bl-2xl',
            'bottom-0 right-0 border-b-[3px] border-r-[3px] rounded-br-2xl'
          ].map((corner) => (
            <span
              key={corner}
              className={cn(
                'absolute size-9 transition-colors duration-300',
                corner,
                scanned ? 'border-[#23af69]' : 'border-white/90'
              )}
            />
          ))}
          <span className="absolute inset-8 rounded-lg bg-white/95 p-2 opacity-90 [transform:perspective(400px)_rotateX(14deg)_rotateZ(-4deg)]">
            <QrCode className="size-full" />
          </span>
          {!scanned && playing && (
            <m.span
              className="absolute inset-x-5 h-0.5 rounded-full bg-[#23af69] shadow-[0_0_12px_#23af69]"
              initial={{ top: '12%' }}
              animate={{ top: ['12%', '88%', '12%'] }}
              transition={{ duration: 2.4, ease: 'easeInOut', repeat: Number.POSITIVE_INFINITY }}
            />
          )}
          {scanned && (
            <m.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={spring.morph}
              className="absolute inset-0 m-auto flex size-12 items-center justify-center rounded-full bg-[#23af69] text-white">
              <Check className="size-6" strokeWidth={3} />
            </m.span>
          )}
        </div>
      </div>
      <p className="mb-4 text-center text-[13px] leading-5 text-white/70">{copy.guidance}</p>
      <m.button
        type="button"
        {...press}
        onClick={onPaste}
        className="flex h-11 cursor-pointer items-center justify-center gap-2 rounded-full bg-white/15 text-[14px] font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
        <ScanLine className="size-4" aria-hidden="true" />
        {copy.paste}
      </m.button>
    </div>
  )
}

function VerifyScreen({ copy, state }: { copy: PairingCopy['pair']; state: DemoState }) {
  const current = state.progress.at(-1)
  const waiting = current === 'waiting' && !state.connected
  return (
    <div className="flex h-full flex-col px-5 pb-8">
      <div className="flex h-11 items-center gap-2" aria-hidden="true">
        <ChevronLeft className="size-5" />
        <span className="text-[16px] font-semibold">{copy.title}</span>
      </div>
      <div className="mt-2 space-y-1.5">
        <p className="text-[22px] leading-7 font-semibold">{copy.desktopName}</p>
        <p aria-live="polite" className="text-[14px] leading-5 text-muted-foreground">
          {state.connected ? copy.complete : waiting ? copy.approveOnDesktop : copy.inProgress}
        </p>
      </div>
      <AnimatePresence initial={false}>
        {waiting && (
          <m.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={spring.settle}
            className="overflow-hidden">
            <div className="mt-4 flex flex-col items-center gap-1 rounded-2xl bg-white p-4 dark:bg-[#1c1c1e]">
              <span className="text-[12px] text-muted-foreground">{copy.verificationCode}</span>
              <span className="font-mono text-[28px] tracking-[0.2em]">{CODE}</span>
            </div>
          </m.div>
        )}
      </AnimatePresence>
      <p className="mt-5 mb-2.5 text-[13px] font-medium text-muted-foreground">{copy.progress}</p>
      <ol className="space-y-2.5">
        {state.progress.map((stage, index) => {
          const complete = state.connected || index < state.progress.length - 1
          return (
            <m.li
              key={stage}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={spring.settle}
              className="flex items-start gap-3">
              <span className="flex size-5 shrink-0 items-center justify-center text-[13px] text-muted-foreground">
                {complete ? <Check className="size-4 text-foreground" aria-hidden="true" /> : index + 1}
              </span>
              <span className="min-w-0">
                <span className="block text-[14px] leading-5">{copy.stages[stage]}</span>
                <span className="block text-[12px] text-muted-foreground">
                  {complete ? copy.done : copy.inProgress}
                </span>
              </span>
            </m.li>
          )
        })}
      </ol>
      <span
        aria-hidden="true"
        className={cn(
          'mx-auto mt-auto inline-flex h-9 items-center rounded-full px-5 text-[14px] font-medium transition-colors duration-200',
          state.connected ? 'bg-foreground text-background' : 'bg-black/[0.06] dark:bg-white/10'
        )}>
        {state.connected ? copy.done : copy.cancel}
      </span>
    </div>
  )
}

function ImportScreen({ copy, phase }: { copy: PairingCopy['sync']; phase: DemoState['sync'] }) {
  return (
    <div className="relative flex h-full flex-col px-5 pb-8">
      <div className="flex h-11 items-center" aria-hidden="true">
        <ChevronLeft className="size-5" />
      </div>
      <p className="text-[12px] text-muted-foreground">{copy.step}</p>
      <p className="mt-1 text-[22px] leading-7 font-semibold">{copy.title}</p>
      <p className="mt-1 text-[14px] text-muted-foreground">{copy.source}</p>
      <div className="mt-5 min-h-0 flex-1">
        {phase === 'fetching' ? (
          <p role="status" className="flex items-center gap-2 text-[14px] text-muted-foreground">
            <Loader2 className="size-4 motion-safe:animate-spin" aria-hidden="true" />
            {copy.fetching}
          </p>
        ) : (
          <ul className="space-y-2">
            {copy.providers.map((provider, index) => (
              <m.li
                key={provider.provider}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: phase === 'importing' ? 0.6 : 1, y: 0 }}
                transition={{ ...spring.settle, delay: index * 0.05 }}
                className="flex items-center gap-3 rounded-2xl bg-white px-3.5 py-2.5 dark:bg-[#1c1c1e]">
                <ProviderIcon id={provider.provider} className="size-5" />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[14px] font-medium">{provider.name}</span>
                  <span className="block text-[12px] text-muted-foreground">{copy.modelCount(provider.models)}</span>
                </span>
                <span className="flex size-5 items-center justify-center rounded-full bg-foreground text-background">
                  <Check className="size-3" strokeWidth={3} aria-hidden="true" />
                </span>
              </m.li>
            ))}
          </ul>
        )}
      </div>
      {phase !== 'fetching' && (
        <div className="space-y-2.5">
          <p className="text-center text-[11px] leading-4 text-muted-foreground">{copy.notice}</p>
          <span
            aria-hidden="true"
            className="flex h-11 items-center justify-center gap-2 rounded-full bg-foreground text-[14px] font-medium text-background">
            {phase === 'importing' && <Loader2 className="size-4 motion-safe:animate-spin" />}
            {copy.apply(copy.providers.length)}
          </span>
        </div>
      )}
      <AnimatePresence>
        {phase === 'done' && (
          <m.p
            role="status"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={spring.settle}
            className="absolute inset-x-4 top-2 flex items-start gap-2 rounded-2xl bg-foreground px-3.5 py-2.5 text-[12px] leading-[18px] text-background shadow-lg">
            <CircleCheck className="mt-px size-4 shrink-0" aria-hidden="true" />
            {copy.success}
          </m.p>
        )}
      </AnimatePresence>
    </div>
  )
}

function AgentScreen({
  copy,
  state,
  tag,
  playing,
  onDone
}: {
  copy: PairingCopy['agent']
  state: DemoState
  tag: string
  playing: boolean
  onDone: () => void
}) {
  const { agent } = state
  const sent = agent !== 'idle' && agent !== 'typing'
  const toolStatus =
    agent === 'approval'
      ? copy.approvalRequested
      : agent === 'denied'
        ? copy.denied
        : agent === 'running'
          ? copy.running
          : copy.approved
  return (
    <div className="flex h-full flex-col">
      <div className="flex h-12 shrink-0 items-center gap-3 px-4" aria-hidden="true">
        <Menu className="size-5" />
        <span className="min-w-0 flex-1 text-center">
          <span className="block truncate text-[15px] leading-5 font-semibold">{copy.agentName}</span>
          <span className="flex items-center justify-center gap-1 text-[11px] text-muted-foreground">
            <span className="size-1.5 rounded-full bg-[#23af69]" />
            {copy.connected}
          </span>
        </span>
        <span className="size-5" />
      </div>
      <div className="flex min-h-0 flex-1 flex-col justify-end gap-3 overflow-hidden px-4 pb-3">
        {sent && (
          <m.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={spring.settle}
            className="ms-auto max-w-[85%] rounded-[20px] bg-white px-4 py-2.5 text-[14px] leading-5 dark:bg-[#1c1c1e]">
            {copy.prompt}
          </m.p>
        )}
        {sent && (
          <m.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring.settle, delay: 0.15 }}
            className="space-y-2">
            <div className="rounded-2xl border border-black/[0.06] bg-white/70 px-3 py-2.5 dark:border-white/10 dark:bg-white/[0.04]">
              <div className="flex items-center gap-2 text-[13px]">
                <Terminal className="size-3.5 text-muted-foreground" aria-hidden="true" />
                <span className="font-medium">{copy.toolName}</span>
                <span className="ms-auto text-[12px] text-muted-foreground">
                  {agent === 'running' ? <ShimmerText active={playing}>{toolStatus}</ShimmerText> : toolStatus}
                </span>
              </div>
              <p className="mt-1.5 font-mono text-[11px] text-muted-foreground">$ {copy.command}</p>
              {(agent === 'answer' || agent === 'done') && (
                <p className="mt-1 font-mono text-[11px] text-foreground/80">{copy.output}</p>
              )}
            </div>
            {agent === 'approval' && (
              <p className="flex items-center gap-2 text-[13px] text-muted-foreground">
                <BeatDots />
                {copy.awaiting}
              </p>
            )}
            {(agent === 'answer' || agent === 'done') && (
              <p className="text-[14px] leading-[22px]">
                <StreamingText
                  text={copy.answer}
                  locale={tag}
                  active={agent === 'answer' && playing}
                  rate={36}
                  onDone={onDone}
                />
              </p>
            )}
            {agent === 'done' && (
              <p className="text-[11px] text-muted-foreground motion-safe:animate-in motion-safe:fade-in">
                {copy.finished}
              </p>
            )}
          </m.div>
        )}
      </div>
      <div className="shrink-0 space-y-2 px-3 pb-6">
        <span
          aria-hidden="true"
          className="inline-flex h-7 items-center gap-1.5 rounded-full bg-black/[0.05] px-2.5 text-[12px] dark:bg-white/10">
          <Folder className="size-3.5" />
          {copy.workspace}
        </span>
        <div
          aria-hidden="true"
          className="flex items-center gap-2 rounded-[26px] border border-black/[0.06] bg-white/90 px-2.5 py-[9px] dark:border-white/10 dark:bg-[#1c1c1e]/90">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-black/[0.05] dark:bg-white/10">
            <Plus className="size-[18px]" />
          </span>
          <span className="min-w-0 flex-1 truncate text-[14px]">
            {state.typed || <span className="text-muted-foreground">{copy.placeholder}</span>}
          </span>
        </div>
      </div>
    </div>
  )
}

/** ToolApprovalSheet: the tool's title, its arguments, then Deny beside Continue. */
function ApprovalSheet({
  copy,
  open,
  pressed,
  onRespond
}: {
  copy: PairingCopy['agent']
  open: boolean
  pressed: boolean
  onRespond: (choice: 'continue' | 'deny') => void
}) {
  return (
    <AnimatePresence>
      {open && (
        <div className="absolute inset-0 z-30">
          <m.div
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/40"
          />
          <m.div
            role="dialog"
            aria-label={copy.toolName}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={spring.settle}
            className="absolute inset-x-0 bottom-0 rounded-t-[32px] bg-white px-5 pt-2 pb-8 dark:bg-[#1c1c1e]">
            <span aria-hidden="true" className="mx-auto block h-1 w-9 rounded-full bg-black/20 dark:bg-white/25" />
            <p className="mt-4 text-[12px] text-muted-foreground">{copy.approvalRequested}</p>
            <p className="text-[18px] leading-7 font-semibold">{copy.toolName}</p>
            <p className="mt-3 text-[12px] font-medium text-muted-foreground">{copy.arguments}</p>
            <pre className="mt-1.5 rounded-xl bg-black/[0.05] px-3 py-2.5 font-mono text-[11px] leading-4 dark:bg-white/[0.06]">
              {`{ "command": "${copy.command}" }`}
            </pre>
            <div className="mt-5 grid grid-cols-2 gap-2.5">
              <m.button
                type="button"
                {...press}
                onClick={() => onRespond('deny')}
                className={cn(
                  'h-11 cursor-pointer rounded-full bg-black/[0.06] text-[14px] font-medium dark:bg-white/10',
                  focusRing
                )}>
                {copy.deny}
              </m.button>
              <m.button
                type="button"
                {...press}
                animate={{ scale: pressed ? 0.97 : 1 }}
                onClick={() => onRespond('continue')}
                className={cn(
                  'h-11 cursor-pointer rounded-full bg-foreground text-[14px] font-medium text-background',
                  focusRing
                )}>
                {copy.continue}
              </m.button>
            </div>
          </m.div>
        </div>
      )}
    </AnimatePresence>
  )
}

// A deterministic stand-in for the invitation QR: three finder patterns and seeded modules.
const QR_PATH = (() => {
  const size = 25
  let seed = 7
  const random = () => {
    seed = (seed * 16807) % 2147483647
    return seed / 2147483647
  }
  const finder = (x: number, y: number) => x < 7 && y < 7
  const inFinder = (x: number, y: number) => finder(x, y) || finder(size - 1 - x, y) || finder(x, size - 1 - y)
  const parts: string[] = []
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      if (inFinder(x, y)) continue
      if (random() < 0.48) parts.push(`M${x} ${y}h1v1h-1z`)
    }
  }
  for (const [ox, oy] of [
    [0, 0],
    [size - 7, 0],
    [0, size - 7]
  ]) {
    parts.push(`M${ox} ${oy}h7v7h-7zM${ox + 1} ${oy + 1}v5h5v-5z`, `M${ox + 2} ${oy + 2}h3v3h-3z`)
  }
  return parts.join('')
})()

function QrCode({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 25 25" shapeRendering="crispEdges" className={className}>
      <path d={QR_PATH} fill="#111" fillRule="evenodd" />
    </svg>
  )
}
