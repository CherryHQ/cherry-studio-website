import { AnimatePresence, animate, m, useMotionValue, useReducedMotion, useTransform } from 'framer-motion'
import {
  ArrowUp,
  Camera,
  ChevronDown,
  FileText,
  Images,
  Menu,
  Mic,
  Paperclip,
  Plus,
  Square,
  SquarePen,
  X
} from 'lucide-react'
import { type KeyboardEvent, useEffect, useLayoutEffect, useRef, useState } from 'react'

import { type ComposerMenuItem, mobileComposerDemo } from '@/content/demos/mobile'
import { ease, press, spring } from '@/lib/motion'
import { cn } from '@/lib/utils'
import BeatDots from '../primitives/BeatDots'
import ProviderIcon from '../primitives/ProviderIcon'
import StreamingText from '../primitives/StreamingText'
import { useDemoLocale } from '../primitives/useDemoLocale'
import { useDemoPlayback, useDemoScript } from '../primitives/useDemoScript'
import { useStickToBottom } from '../primitives/useStickToBottom'
import PhoneFrame from './PhoneFrame'
import { RotatingText } from './ShimmerText'

type Phase = 'idle' | 'compose' | 'sent' | 'pending' | 'answer' | 'done'

interface DemoState {
  phase: Phase
  menuOpen: boolean
  pressed: ComposerMenuItem | null
  attachment: ComposerMenuItem | null
  sentAttachment: ComposerMenuItem | null
  typed: string
  statusIndex: number
}

const INITIAL: DemoState = {
  phase: 'idle',
  menuOpen: false,
  pressed: null,
  attachment: null,
  sentAttachment: null,
  typed: '',
  statusIndex: 0
}

const menuIcons = { camera: Camera, photos: Images, file: Paperclip }

// composer-layout.ts: 32pt toolbar circles inside a 26pt-radius surface; the menu panel uses rounded-4xl.
const TRIGGER = 32
const PANEL_RADIUS = 32
// menu-motion.ts: open 350ms overshoot, close 250ms settle; the plus clears over the first 200 of 350ms.
const openMotion = { duration: 0.35, ease: ease.overshoot }
const closeMotion = { duration: 0.25, ease: ease.settle }
const FADE_SHARE = 0.2 / 0.35
const SLIDE = 40
const RESTING_SCALE = 0.97
const BLUR = 2

export default function MobileComposerDemo() {
  const { locale, tag } = useDemoLocale()
  const copy = mobileComposerDemo[locale]
  const ref = useRef<HTMLDivElement>(null)
  const scroller = useRef<HTMLDivElement>(null)
  const thread = useRef<HTMLDivElement>(null)
  const playing = useDemoPlayback(ref)
  const [state, setState] = useState<DemoState>(INITIAL)
  const update = (patch: Partial<DemoState>) => setState((previous) => ({ ...previous, ...patch }))
  useStickToBottom(scroller, thread)

  const { replay } = useDemoScript(async ({ wait, reduced }) => {
    if (reduced) {
      setState({ ...INITIAL, phase: 'done', sentAttachment: 'photos', statusIndex: copy.status.length - 1 })
      return
    }
    setState(INITIAL)
    await wait(800)
    update({ phase: 'compose', menuOpen: true })
    await wait(1100)
    update({ pressed: 'photos' })
    await wait(180)
    update({ menuOpen: false, pressed: null, attachment: 'photos' })
    await wait(600)
    for (let index = 1; index <= copy.prompt.length; index++) {
      update({ typed: copy.prompt.slice(0, index) })
      await wait(locale === 'zh' ? 70 : 30)
    }
    await wait(450)
    setState((previous) => ({
      ...previous,
      phase: 'sent',
      typed: '',
      sentAttachment: previous.attachment,
      attachment: null
    }))
    await wait(500)
    update({ phase: 'pending', statusIndex: 0 })
    for (let index = 1; index < copy.status.length; index++) {
      await wait(2200)
      update({ statusIndex: index })
    }
    await wait(1500)
    update({ phase: 'answer' })
  }, playing)

  const choose = (item: ComposerMenuItem) => update({ menuOpen: false, attachment: item })
  const { phase } = state
  const sent = phase === 'sent' || phase === 'pending' || phase === 'answer' || phase === 'done'
  const busy = phase === 'sent' || phase === 'pending' || phase === 'answer'
  const draftAttachment = state.attachment

  return (
    <div ref={ref} role="region" aria-label={copy.region}>
      <PhoneFrame onReplay={replay}>
        <div className="flex h-full flex-col">
          <div aria-hidden="true" className="flex h-11 shrink-0 items-center justify-between px-4">
            <Menu className="size-5" />
            <span className="inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-[14px] font-medium">
              <ProviderIcon id="anthropic" className="size-3.5" />
              {copy.model}
              <ChevronDown className="size-3.5 text-muted-foreground" />
            </span>
            <SquarePen className="size-5" />
          </div>

          <div className="relative min-h-0 flex-1">
            <div ref={scroller} className="h-full overflow-y-auto px-4 [scrollbar-width:none]">
              <div ref={thread} className="flex min-h-full flex-col justify-end gap-4 pt-4 pb-28">
                {!sent && (
                  <p className="text-gradient mb-auto pt-24 text-center text-[20px] leading-7 font-semibold tracking-tight">
                    {copy.greeting}
                  </p>
                )}
                {sent && (
                  <m.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={spring.settle}
                    className="flex flex-col items-end gap-1.5">
                    {state.sentAttachment && <AttachmentPreview item={state.sentAttachment} label={copy.attachments} />}
                    <p className="max-w-[85%] rounded-[20px] bg-white px-4 py-2.5 text-[15px] leading-6 shadow-[0_1px_2px_rgb(0_0_0/0.04)] dark:bg-[#1c1c1e]">
                      {copy.prompt}
                    </p>
                  </m.div>
                )}
                {(phase === 'pending' || phase === 'sent') && (
                  <div
                    role="status"
                    className="flex h-6 items-center gap-2 text-[14px] motion-safe:animate-in motion-safe:fade-in">
                    <BeatDots className="p-0.5 text-muted-foreground" />
                    {phase === 'pending' && (
                      <RotatingText phrases={copy.status} index={state.statusIndex} active={playing} />
                    )}
                  </div>
                )}
                {(phase === 'answer' || phase === 'done') && (
                  <div className="text-[15px] leading-6">
                    <StreamingText
                      key={locale}
                      text={copy.answer}
                      locale={tag}
                      active={phase === 'answer' && playing}
                      rate={40}
                      onDone={() => update({ phase: 'done' })}
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="absolute inset-x-0 bottom-0 px-3 pb-6">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 -top-5 bottom-0 bg-linear-to-b from-[#f5f5f5]/0 to-[#f5f5f5] to-[20px] dark:from-black/0 dark:to-black"
              />
              <div className="relative rounded-[26px] border border-black/[0.06] bg-white/90 px-2.5 py-[9px] shadow-[0_8px_24px_-12px_rgb(0_0_0/0.18)] backdrop-blur-xl dark:border-white/10 dark:bg-[#1c1c1e]/90">
                <AnimatePresence initial={false}>
                  {draftAttachment && (
                    <m.div
                      key={draftAttachment}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25, ease: ease.settle }}
                      className="overflow-hidden">
                      <div className="mb-2 flex items-center gap-2">
                        <span className="inline-flex h-8 max-w-[75%] items-center gap-1.5 rounded-full bg-black/[0.05] ps-2.5 pe-1 text-[13px] dark:bg-white/10">
                          {draftAttachment === 'file' ? (
                            <FileText className="size-3.5 shrink-0" aria-hidden="true" />
                          ) : (
                            <Images className="size-3.5 shrink-0" aria-hidden="true" />
                          )}
                          <span className="truncate">{copy.attachments[draftAttachment]}</span>
                          <m.button
                            type="button"
                            {...press}
                            onClick={() => update({ attachment: null })}
                            aria-label={copy.removeAttachment}
                            className="flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-full text-muted-foreground hover:text-foreground focus-visible:outline-2 focus-visible:outline-primary">
                            <X className="size-3.5" aria-hidden="true" />
                          </m.button>
                        </span>
                      </div>
                    </m.div>
                  )}
                </AnimatePresence>
                <div className="flex items-center gap-2">
                  <MorphMenu
                    label={copy.attach}
                    items={copy.menu}
                    open={state.menuOpen}
                    pressed={state.pressed}
                    onOpenChange={(menuOpen) => update({ menuOpen })}
                    onSelect={choose}
                  />
                  <p className="line-clamp-3 min-w-0 flex-1 text-[16px] leading-6 break-words">
                    {state.typed ? (
                      <span>
                        {state.typed}
                        <span className="ml-px inline-block h-4 w-px translate-y-0.5 bg-foreground motion-safe:animate-caret" />
                      </span>
                    ) : (
                      <span className="text-muted-foreground">{copy.placeholder}</span>
                    )}
                  </p>
                  <PrimarySlot mode={busy ? 'stop' : state.typed || draftAttachment ? 'send' : 'voice'} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </PhoneFrame>
    </div>
  )
}

/** Voice, send and stop share one slot and swap as a single object on spring.morph. */
function PrimarySlot({ mode }: { mode: 'voice' | 'send' | 'stop' }) {
  const Icon = mode === 'voice' ? Mic : mode === 'send' ? ArrowUp : Square
  return (
    <span
      aria-hidden="true"
      className={cn(
        'flex size-8 shrink-0 items-center justify-center rounded-full transition-colors duration-200',
        mode === 'voice' ? 'bg-black/[0.05] dark:bg-white/10' : 'bg-foreground text-background'
      )}>
      <AnimatePresence mode="popLayout" initial={false}>
        <m.span
          key={mode}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={spring.morph}>
          <Icon className={cn(mode === 'stop' ? 'size-3 fill-current' : 'size-4')} />
        </m.span>
      </AnimatePresence>
    </span>
  )
}

function AttachmentPreview({ item, label }: { item: ComposerMenuItem; label: Record<ComposerMenuItem, string> }) {
  if (item === 'file') {
    return (
      <span className="inline-flex items-center gap-2 rounded-2xl bg-white px-3 py-2 text-[13px] dark:bg-[#1c1c1e]">
        <FileText className="size-4" aria-hidden="true" />
        {label.file}
      </span>
    )
  }
  return (
    <span
      aria-hidden="true"
      className="relative block h-[84px] w-[112px] overflow-hidden rounded-2xl border border-black/[0.06] bg-[#fbfbf8] p-2.5 dark:border-white/10 dark:bg-[#e9e9e4]">
      {[
        'w-14 bg-[#2563eb]',
        'w-20 bg-[#111]/70',
        'w-16 bg-[#111]/70',
        'w-[72px] bg-[#dc2626]/80',
        'w-12 bg-[#111]/70'
      ].map((bar, index) => (
        <span key={index} className={cn('mb-2 block h-[3px] rounded-full', bar)} />
      ))}
      <span className="absolute right-2.5 bottom-2.5 size-6 rounded-md border-2 border-[#16a34a]/70" />
    </span>
  )
}

interface MorphMenuProps {
  label: string
  items: { id: ComposerMenuItem; label: string }[]
  open: boolean
  pressed: ComposerMenuItem | null
  onOpenChange: (open: boolean) => void
  onSelect: (item: ComposerMenuItem) => void
}

/**
 * Composer.Menu: the circular + trigger morphs into the panel. Width, height and corner radius interpolate
 * from the 32px circle to the measured panel, unclamped so the overshoot curve visibly overshoots.
 */
function MorphMenu({ label, items, open, pressed, onOpenChange, onSelect }: MorphMenuProps) {
  const reduced = useReducedMotion()
  const progress = useMotionValue(0)
  const content = useRef<HTMLDivElement>(null)
  const trigger = useRef<HTMLButtonElement>(null)
  const userOpened = useRef(false)
  const root = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState({ width: 180, height: 188 })
  const [presented, setPresented] = useState(false)

  useLayoutEffect(() => {
    const node = content.current
    if (node) setSize({ width: node.offsetWidth, height: node.offsetHeight })
  }, [items])

  useEffect(() => {
    if (open) setPresented(true)
    if (reduced) {
      progress.set(open ? 1 : 0)
      if (!open) setPresented(false)
      return
    }
    // Animating the same value from wherever it is makes a mid-flight reversal continue smoothly.
    const controls = animate(progress, open ? 1 : 0, open ? openMotion : closeMotion)
    if (!open) controls.then(() => setPresented(false))
    return () => controls.stop()
  }, [open, reduced, progress])

  useEffect(() => {
    if (open && userOpened.current) content.current?.querySelector('button')?.focus({ preventScroll: true })
    if (!open && userOpened.current) {
      userOpened.current = false
      trigger.current?.focus({ preventScroll: true })
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const dismiss = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) onOpenChange(false)
    }
    document.addEventListener('pointerdown', dismiss)
    return () => document.removeEventListener('pointerdown', dismiss)
  }, [open, onOpenChange])

  const width = useTransform(progress, (p) => TRIGGER + (size.width - TRIGGER) * p)
  const height = useTransform(progress, (p) => TRIGGER + (size.height - TRIGGER) * p)
  const radius = useTransform(progress, (p) => TRIGGER / 2 + (PANEL_RADIUS - TRIGGER / 2) * p)
  const panelOpacity = useTransform(progress, (p) => Math.min(1, Math.max(0, p)))
  const panelX = useTransform(progress, (p) => SLIDE * (1 - p))
  const panelScale = useTransform(progress, (p) => RESTING_SCALE + (1 - RESTING_SCALE) * p)
  const panelFilter = useTransform(progress, (p) => `blur(${Math.max(0, 1 - p) * BLUR}px)`)
  const fade = useTransform(progress, (p) => Math.min(1, Math.max(0, p / FADE_SHARE)))
  const plusOpacity = useTransform(fade, (f) => 1 - f)
  const plusFilter = useTransform(fade, (f) => `blur(${f * BLUR}px)`)
  const plusX = useTransform(progress, (p) => -SLIDE * p)
  const plusRotate = useTransform(progress, (p) => 45 * p)
  const plusScale = useTransform(progress, (p) => 1 - (1 - RESTING_SCALE) * p)

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') onOpenChange(false)
    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return
    event.preventDefault()
    const buttons = Array.from(content.current?.querySelectorAll('button') ?? [])
    const index = buttons.indexOf(document.activeElement as HTMLButtonElement)
    const next = (index + (event.key === 'ArrowDown' ? 1 : -1) + buttons.length) % buttons.length
    buttons[next]?.focus()
  }

  return (
    <div ref={root} className="relative size-8 shrink-0">
      <m.div
        style={{ width, height, borderRadius: radius }}
        onKeyDown={onKeyDown}
        className={cn(
          'absolute bottom-0 left-0 z-30 overflow-hidden',
          presented
            ? 'bg-white shadow-[0_18px_40px_-16px_rgb(0_0_0/0.3)] ring-1 ring-black/[0.06] dark:bg-[#1c1c1e] dark:ring-white/10'
            : 'bg-black/[0.05] dark:bg-white/10'
        )}>
        <m.div
          ref={content}
          aria-hidden={!open}
          style={{ opacity: panelOpacity, x: panelX, scale: panelScale, filter: panelFilter, originX: 0, originY: 1 }}
          className="absolute bottom-0 left-0 flex w-max min-w-[170px] flex-col gap-0.5 p-2">
          {items.map((item) => {
            const Icon = menuIcons[item.id]
            return (
              <m.button
                key={item.id}
                type="button"
                tabIndex={open ? 0 : -1}
                {...press}
                animate={{ scale: pressed === item.id ? 0.97 : 1 }}
                onClick={() => onSelect(item.id)}
                className={cn(
                  'flex min-h-14 cursor-pointer items-center gap-3 rounded-2xl px-3 py-2 text-start text-[16px] transition-colors duration-100 hover:bg-black/[0.04] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary dark:hover:bg-white/[0.06]',
                  pressed === item.id && 'bg-black/[0.06] dark:bg-white/10'
                )}>
                <span className="flex size-10 items-center justify-center rounded-full bg-black/[0.05] dark:bg-white/10">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <span className="pe-4">{item.label}</span>
              </m.button>
            )
          })}
        </m.div>
      </m.div>
      <m.button
        ref={trigger}
        type="button"
        aria-label={label}
        aria-expanded={open}
        tabIndex={open ? -1 : 0}
        onClick={() => {
          userOpened.current = true
          onOpenChange(true)
        }}
        whileTap={press.whileTap}
        className={cn(
          'absolute inset-0 z-40 flex cursor-pointer items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
          open && 'pointer-events-none'
        )}>
        <m.span
          style={{ opacity: plusOpacity, filter: plusFilter, x: plusX, rotate: plusRotate, scale: plusScale }}
          className="flex">
          <Plus className="size-[18px]" aria-hidden="true" />
        </m.span>
      </m.button>
    </div>
  )
}
