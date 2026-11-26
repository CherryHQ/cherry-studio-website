import { AnimatePresence, m } from 'framer-motion'
import { Check, ChevronRight, CircleCheck, Loader2, MonitorSmartphone, Plus, Smartphone } from 'lucide-react'
import { type ReactNode, useRef, useState } from 'react'

import { type PairingCopy, type PairingStage, pairingDemo } from '@/content/demos/mobile'
import { ease, press, spring } from '@/lib/motion'
import { cn } from '@/lib/utils'
import BeatDots from '../primitives/BeatDots'
import StreamingText from '../primitives/StreamingText'
import { useDemoLocale } from '../primitives/useDemoLocale'
import { useDemoPlayback, useDemoScript } from '../primitives/useDemoScript'
import { LogoMark } from './LogoDrawDemo'
import {
  ChatHeader,
  CherryAvatar,
  ComposerCircle,
  ComposerSurface,
  canvasFocus,
  SelectionMark,
  SendSlot,
  tone
} from './MobileUi'
import PhoneFrame from './PhoneFrame'
import ShimmerText from './ShimmerText'

type Step = 'scan' | 'verify' | 'import' | 'agent'
type AgentPhase = 'idle' | 'typing' | 'approval' | 'running' | 'answer' | 'done' | 'denied'

interface DemoState {
  step: Step
  progress: PairingStage[]
  claim: boolean
  approved: boolean
  connected: boolean
  sync: 'fetching' | 'list' | 'importing' | 'done'
  agent: AgentPhase
  typed: string
  pressed: 'approve' | 'continue' | 'paste' | null
}

const STEPS: Step[] = ['scan', 'verify', 'import', 'agent']
const STAGES: PairingStage[] = ['connecting', 'requesting', 'waiting', 'syncing', 'saving']
const CODE = '482913'

const INITIAL: DemoState = {
  step: 'scan',
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
  step === 'scan' || step === 'verify'
    ? { ...INITIAL, step }
    : { ...INITIAL, step, progress: STAGES, approved: true, connected: true }

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
      await until(() => pasted.current, 2200)
      if (!pasted.current) {
        update({ pressed: 'paste' })
        await wait(200)
      }
      update({ pressed: null })
      await wait(250)
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
      await wait(1400)
    }
    if (from <= 2) {
      update({ step: 'import', sync: 'fetching' })
      await wait(1100)
      update({ sync: 'list' })
      await wait(1600)
      update({ sync: 'importing' })
      await wait(1200)
      update({ sync: 'done' })
      await wait(1900)
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
    await until(() => decision.current !== null, 3200)
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
          }>
          <AnimatePresence initial={false}>
            <m.div
              key={state.step}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-30%', opacity: 0.6 }}
              transition={{ duration: 0.35, ease: ease.sheet }}
              className="absolute inset-0">
              {state.step === 'scan' && (
                <ScanScreen
                  copy={copy}
                  pressed={state.pressed === 'paste'}
                  onPaste={() => {
                    pasted.current = true
                  }}
                />
              )}
              {state.step === 'verify' && <VerifyScreen copy={copy} state={state} />}
              {state.step === 'import' && <ImportScreen copy={copy} phase={state.sync} />}
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
                ? 'border-foreground/30 bg-foreground/10 text-foreground'
                : 'border-border text-muted-foreground hover:border-hairline-strong hover:text-foreground'
            )}>
            <span
              className={cn(
                'flex size-4 items-center justify-center rounded-full font-mono text-[10px]',
                index < stepIndex ? 'bg-foreground text-background' : 'bg-secondary'
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

/**
 * OnboardingPage step variant: docked mark with "Cherry Studio" and Back, a three-segment progress
 * bar, a 24pt heading with its description, then the footer actions above the home indicator.
 */
function OnboardingScreen({
  copy,
  step,
  title,
  description,
  back = true,
  footer,
  children
}: {
  copy: PairingCopy
  step: number
  title: string
  description: string
  back?: boolean
  footer?: ReactNode
  children: ReactNode
}) {
  return (
    <div className={cn('flex h-full flex-col pt-[54px]', tone.background)}>
      <div className="flex min-h-16 shrink-0 items-center justify-between px-6 py-3">
        <span className="flex items-center gap-3">
          <LogoMark height={28} />
          <span className="text-[18px] leading-7 font-semibold">Cherry Studio</span>
        </span>
        {back && (
          <span aria-hidden="true" className="rounded-xl px-3 py-2 text-[14px] leading-5 font-medium">
            {copy.onboarding.back}
          </span>
        )}
      </div>
      <div aria-label={copy.onboarding.step(step)} role="img" className="flex shrink-0 gap-1.5 px-6 pt-2 pb-3">
        {[1, 2, 3].map((index) => (
          <span
            key={index}
            className={cn(
              'h-0.5 flex-1 rounded-full',
              index <= step ? 'bg-[#171717] dark:bg-[#ededed]' : 'bg-black/[0.08] dark:bg-white/[0.09]'
            )}
          />
        ))}
      </div>
      <div className="flex min-h-0 flex-1 flex-col gap-6 overflow-hidden px-6 pt-6 pb-6">
        <div className="flex flex-col gap-3">
          <p className="text-[24px] leading-8 font-semibold">{title}</p>
          <p className={cn('text-[16px] leading-6', tone.muted)}>{description}</p>
        </div>
        {children}
      </div>
      {footer && <div className="flex shrink-0 flex-col gap-3 px-6 pt-3 pb-[34px]">{footer}</div>}
    </div>
  )
}

/** OnboardingButton: CherryUI Button at lg size; primary is the foreground fill, secondary is outlined. */
function OnboardingButton({
  children,
  variant = 'primary',
  pressed,
  onClick,
  loading
}: {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'text'
  pressed?: boolean
  onClick?: () => void
  loading?: boolean
}) {
  const className = cn(
    'flex w-full items-center justify-center gap-2.5 rounded-xl px-5 py-3 text-[18px] leading-7 font-medium',
    variant === 'primary' && 'bg-[#171717] text-[#f5f5f5] shadow-xs dark:bg-[#ededed] dark:text-black',
    variant === 'secondary' && cn('border', tone.border)
  )
  const content = (
    <>
      {loading && <Loader2 className="size-5 motion-safe:animate-spin" aria-hidden="true" />}
      {children}
    </>
  )
  if (!onClick) {
    return (
      <span aria-hidden="true" className={className}>
        {content}
      </span>
    )
  }
  return (
    <m.button
      type="button"
      {...press}
      animate={{ scale: pressed ? 0.97 : 1 }}
      onClick={onClick}
      className={cn(className, 'cursor-pointer', canvasFocus)}>
      {content}
    </m.button>
  )
}

/** OnboardingMessage: ContentState with a leading spinner while loading. */
function OnboardingMessage({ children, loading }: { children: string; loading?: boolean }) {
  return (
    <p role="status" className={cn('flex items-center gap-3 py-6 text-[16px] leading-6', tone.muted)}>
      {loading && <Loader2 className="size-5 shrink-0 motion-safe:animate-spin" aria-hidden="true" />}
      {children}
    </p>
  )
}

/** OnboardingScannerScreen: the square camera view with a two-thirds frame; paste is the footer action. */
function ScanScreen({ copy, pressed, onPaste }: { copy: PairingCopy; pressed: boolean; onPaste: () => void }) {
  return (
    <OnboardingScreen
      copy={copy}
      step={1}
      title={copy.scan.title}
      description={copy.scan.guidance}
      footer={
        <OnboardingButton variant="secondary" pressed={pressed} onClick={onPaste}>
          {copy.scan.paste}
        </OnboardingButton>
      }>
      <div
        aria-hidden="true"
        className="relative aspect-square w-full overflow-hidden rounded-3xl bg-[radial-gradient(circle_at_50%_40%,#4a4a4c,#151516_75%)]">
        <span className="absolute inset-x-10 top-[18%] bottom-[22%] rounded-lg bg-[#2a2a2c] p-3 shadow-[0_10px_30px_rgb(0_0_0/0.5)] [transform:perspective(500px)_rotateX(10deg)]">
          <span className="flex h-full items-center justify-center rounded bg-[#1d1d1f]">
            <span className="rounded-md bg-white p-1.5">
              <QrCode className="size-[104px]" />
            </span>
          </span>
        </span>
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="aspect-square w-2/3 rounded-3xl border-2 border-white" />
        </span>
      </div>
    </OnboardingScreen>
  )
}

/** OnboardingPairingScreen: the stage list, with the verification code card while the PC decides. */
function VerifyScreen({ copy, state }: { copy: PairingCopy; state: DemoState }) {
  const current = state.progress.at(-1)
  const waiting = current === 'waiting' && !state.approved
  return (
    <OnboardingScreen
      copy={copy}
      step={1}
      title={copy.pair.title}
      description={copy.pair.desktopName}
      footer={<OnboardingButton>{state.connected ? copy.pair.continue : copy.pair.cancel}</OnboardingButton>}>
      {state.connected ? (
        <OnboardingMessage>{copy.pair.complete}</OnboardingMessage>
      ) : waiting ? (
        <div className={cn('flex flex-col gap-4 rounded-2xl p-6', tone.card)}>
          <p className="text-[16px] leading-6">{copy.pair.approveOnDesktop}</p>
          <p className="font-mono text-[30px] leading-9">
            <span className="sr-only">{copy.pair.verificationCode}: </span>
            {CODE}
          </p>
        </div>
      ) : (
        <OnboardingMessage loading>{copy.pair.inProgress}</OnboardingMessage>
      )}
      <ol className="flex flex-col gap-5">
        {state.progress.map((stage, index) => {
          const complete = state.connected || index < state.progress.length - 1
          return (
            <m.li
              key={stage}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={spring.settle}
              className="flex items-center gap-4">
              {complete ? (
                <Check className="size-5 shrink-0" aria-hidden="true" />
              ) : (
                <span className={cn('w-5 text-center text-[14px]', tone.muted)}>{index + 1}</span>
              )}
              <span className="text-[16px] leading-6">{copy.pair.stages[stage]}</span>
            </m.li>
          )
        })}
      </ol>
    </OnboardingScreen>
  )
}

/** OnboardingDesktopSyncScreen: provider checkboxes, the credentials notice, Sync and Retry. */
function ImportScreen({ copy, phase }: { copy: PairingCopy; phase: DemoState['sync'] }) {
  const loaded = phase !== 'fetching'
  return (
    <div className="relative h-full">
      <OnboardingScreen
        copy={copy}
        step={2}
        title={copy.sync.title}
        description={copy.sync.source}
        back={phase !== 'importing'}
        footer={
          loaded ? (
            <>
              <p className={cn('text-center text-[13px] leading-[18px]', tone.muted)}>{copy.sync.notice}</p>
              <OnboardingButton loading={phase === 'importing'}>
                {copy.sync.apply(copy.sync.providers.length)}
              </OnboardingButton>
              <OnboardingButton variant="text">{copy.sync.retry}</OnboardingButton>
            </>
          ) : undefined
        }>
        {loaded ? (
          <ul className="flex flex-col">
            {copy.sync.providers.map((provider, index) => (
              <m.li
                key={provider.provider}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: phase === 'importing' ? 0.4 : 1, y: 0 }}
                transition={{ ...spring.settle, delay: index * 0.05 }}
                className="flex min-h-14 items-center gap-3 py-3">
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[16px] leading-6">{provider.name}</span>
                  <span className={cn('block text-[14px] leading-5', tone.muted)}>
                    {copy.sync.modelCount(provider.models)}
                  </span>
                </span>
                <SelectionMark selected square />
              </m.li>
            ))}
          </ul>
        ) : (
          <OnboardingMessage loading>{copy.sync.fetching}</OnboardingMessage>
        )}
      </OnboardingScreen>
      <AnimatePresence>
        {phase === 'done' && (
          <m.p
            role="status"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={spring.settle}
            className={cn(
              'absolute inset-x-4 top-[58px] flex items-start gap-2.5 rounded-2xl px-4 py-3 text-[14px] leading-5 shadow-[0_10px_30px_-10px_rgb(0_0_0/0.3)]',
              tone.card
            )}>
            <CircleCheck className="mt-px size-5 shrink-0 text-[oklch(0.5175_0.1453_147.65)]" aria-hidden="true" />
            {copy.sync.success}
          </m.p>
        )}
      </AnimatePresence>
    </div>
  )
}

/** Remote chat with the PC Agent: the same header and transcript, a Bash tool group, the remote composer. */
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
  const running = agent === 'running'
  return (
    <div className={cn('relative h-full', tone.chat)}>
      <div className="flex h-full flex-col justify-end gap-4 overflow-hidden px-4 pt-[122px] pb-[136px]">
        {sent && (
          <m.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={spring.settle}
            className={cn('w-fit max-w-[88%] self-end rounded-[18px] px-4 py-[10px]', tone.secondary)}>
            {copy.prompt}
          </m.p>
        )}
        {sent && (
          <m.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring.settle, delay: 0.15 }}
            className="flex flex-col gap-2.5">
            <div className="flex items-center gap-2 text-[14px] leading-5">
              <CherryAvatar />
              <span className="font-semibold">{copy.agentName}</span>
            </div>
            <div className={cn('flex min-h-9 items-center gap-1 border-b', tone.borderSubtle)}>
              {running ? (
                <ShimmerText active={playing} className="text-[14px] leading-5">
                  {copy.toolName}
                </ShimmerText>
              ) : (
                <span className={cn('text-[14px] leading-5', tone.tertiary)}>{copy.toolName}</span>
              )}
              <ChevronRight className={cn('size-3', tone.tertiary)} aria-hidden="true" />
              <span
                className={cn(
                  'ms-auto text-[13px] tabular-nums',
                  agent === 'approval'
                    ? 'text-[oklch(0.528_0.15_54.65)] dark:text-[oklch(0.82_0.17_76)]'
                    : tone.tertiary
                )}>
                {agent === 'approval' ? copy.awaiting : agent === 'denied' ? copy.denied : running ? '1s' : ''}
              </span>
            </div>
            {agent === 'approval' && <BeatDots className="p-0.5 text-[#7d7d7d]" />}
            {(agent === 'answer' || agent === 'done') && (
              <p className="text-[16px] leading-[26px]">
                <StreamingText
                  text={copy.answer}
                  locale={tag}
                  active={agent === 'answer' && playing}
                  rate={36}
                  onDone={onDone}
                />
              </p>
            )}
          </m.div>
        )}
      </div>
      <ChatHeader agentName={copy.agentName} sidebarLabel={copy.openMenu} newChatLabel={copy.newChat} />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 px-4 pb-[38px]">
        <ComposerSurface>
          {agent === 'typing' ? (
            <>
              <p className="min-h-8 py-1 text-[16px] leading-5">
                {state.typed}
                <span className="ms-px inline-block h-[18px] w-[2px] translate-y-[3px] bg-[#2563eb] motion-safe:animate-caret" />
              </p>
              <div className="mt-[10px] flex items-center gap-2">
                <ComposerCircle>
                  <Plus className="size-[18px]" strokeWidth={1.9} />
                </ComposerCircle>
                <span className={cn('flex h-8 items-center gap-[6px] rounded-full px-[10px]', tone.secondary)}>
                  <FolderGlyph />
                  <span className="text-[14px] font-semibold">{copy.workspace}</span>
                </span>
                <span className="ms-auto">
                  <SendSlot state={state.typed ? 'ready' : 'disabled'} />
                </span>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <ComposerCircle>
                <Plus className="size-[18px]" strokeWidth={1.9} />
              </ComposerCircle>
              <span className={cn('min-w-0 flex-1 truncate text-[16px] leading-5', tone.placeholder)}>
                {copy.placeholder}
              </span>
              <SendSlot state={running || agent === 'answer' ? 'stop' : 'disabled'} />
            </div>
          )}
        </ComposerSurface>
      </div>
    </div>
  )
}

function FolderGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-5"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinejoin="round">
      <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
    </svg>
  )
}

/** ToolApprovalSheet: not dismissible, so no handle; the tool's name, its arguments, then Deny and Continue. */
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
            transition={{ duration: 0.35, ease: ease.sheet }}
            className="absolute inset-0 bg-black/40"
          />
          <m.div
            role="dialog"
            aria-label={copy.toolName}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.35, ease: ease.sheet }}
            className={cn(
              'absolute inset-x-0 bottom-0 flex h-[479px] flex-col rounded-t-[32px] pt-3 dark:border-x dark:border-t dark:border-white/[0.09]',
              tone.sheet
            )}>
            <div className="flex min-h-14 items-start px-5 py-1.5">
              <p className="py-2 text-[18px] leading-7 font-semibold">{copy.toolName}</p>
            </div>
            <div className="flex min-h-0 flex-1 flex-col gap-2 px-5 pt-2 pb-4">
              <p className={cn('text-[14px] leading-5 font-medium', tone.muted)}>{copy.arguments}</p>
              <pre
                className={cn(
                  'rounded-xl p-3 font-mono text-[13px] leading-5 whitespace-pre-wrap',
                  'bg-[#f2f2f2] dark:bg-[#1a1a1a]'
                )}>
                {`{\n  "command": "${copy.command}"\n}`}
              </pre>
            </div>
            <div className={cn('flex gap-3 border-t px-4 pt-3 pb-[34px]', tone.border)}>
              <m.button
                type="button"
                {...press}
                onClick={() => onRespond('deny')}
                className={cn(
                  'flex-1 cursor-pointer rounded-xl border px-4 py-2.5 text-[16px] leading-6 font-medium',
                  tone.border,
                  tone.card,
                  canvasFocus
                )}>
                {copy.deny}
              </m.button>
              <m.button
                type="button"
                {...press}
                animate={{ scale: pressed ? 0.97 : 1 }}
                onClick={() => onRespond('continue')}
                className={cn(
                  'flex-1 cursor-pointer rounded-xl bg-[#171717] px-4 py-2.5 text-[16px] leading-6 font-medium text-[#f5f5f5] shadow-xs dark:bg-[#ededed] dark:text-black',
                  canvasFocus
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
