import { AnimatePresence, m } from 'framer-motion'
import {
  AtSign,
  Boxes,
  Check,
  ChevronRight,
  Copy,
  createLucideIcon,
  Ellipsis,
  FileText,
  Folder,
  Plus,
  RotateCcw,
  Split,
  ToolCase,
  Volume2
} from 'lucide-react'
import { type KeyboardEvent, type ReactNode, useEffect, useMemo, useRef, useState } from 'react'

import { type MobileComposerCopy, mobileComposerDemo } from '@/content/demos/mobile'
import { ease } from '@/lib/motion'
import { cn } from '@/lib/utils'
import BeatDots from '../primitives/BeatDots'
import { tokenize, useStreamedCount } from '../primitives/StreamingText'
import { useDemoLocale } from '../primitives/useDemoLocale'
import { useDemoPlayback, useDemoScript } from '../primitives/useDemoScript'
import { useStickToBottom } from '../primitives/useStickToBottom'
import {
  BrandAvatar,
  ChatHeader,
  CherryAvatar,
  ComposerCircle,
  ComposerSurface,
  canvasFocus,
  SendSlot,
  SheetHandle,
  tone
} from './MobileUi'
import { FloatingDock } from './NavIcon'
import PhoneFrame from './PhoneFrame'
import ShimmerText from './ShimmerText'

type Phase = 'draft' | 'editing' | 'sent' | 'thinking' | 'answer' | 'done'

interface DemoState {
  phase: Phase
  typed: string
  elapsed: number
}

const INITIAL: DemoState = { phase: 'draft', typed: '', elapsed: 0 }
const THINK_SECONDS = 3
// Composer editor: the resting row grows into field + toolbar over 90ms on the settle curve.
const editorMotion = { duration: 0.09, ease: ease.settle }
// BottomSheet presentation curve.
const sheetMotion = { duration: 0.35, ease: ease.sheet }
// app-icons pins camera and images to the desktop's Lucide revision, which predates these glyph redraws.
const Camera = createLucideIcon('camera', [
  [
    'path',
    { d: 'M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z', key: 'body' }
  ],
  ['circle', { cx: '12', cy: '13', r: '3', key: 'lens' }]
])
const Images = createLucideIcon('images', [
  ['path', { d: 'M18 22H4a2 2 0 0 1-2-2V6', key: 'back' }],
  ['path', { d: 'm22 13-1.296-1.296a2.41 2.41 0 0 0-3.408 0L11 18', key: 'hill' }],
  ['circle', { cx: '12', cy: '8', r: '2', key: 'sun' }],
  ['rect', { width: '16', height: '16', x: '6', y: '2', rx: '2', key: 'front' }]
])

export default function MobileComposerDemo() {
  const { locale, tag } = useDemoLocale()
  const copy = mobileComposerDemo[locale]
  const ref = useRef<HTMLDivElement>(null)
  const scroller = useRef<HTMLDivElement>(null)
  const thread = useRef<HTMLDivElement>(null)
  const playing = useDemoPlayback(ref)
  const [state, setState] = useState<DemoState>(INITIAL)
  const [sheetOpen, setSheetOpen] = useState(false)
  const update = (patch: Partial<DemoState>) => setState((previous) => ({ ...previous, ...patch }))
  useStickToBottom(scroller, thread)

  const { replay } = useDemoScript(async ({ wait, reduced }) => {
    setSheetOpen(false)
    if (reduced) {
      setState({ phase: 'done', typed: '', elapsed: THINK_SECONDS })
      return
    }
    setState(INITIAL)
    await wait(900)
    update({ phase: 'editing' })
    await wait(350)
    for (let index = 1; index <= copy.prompt.length; index++) {
      update({ typed: copy.prompt.slice(0, index) })
      await wait(locale === 'zh' ? 70 : 24)
    }
    await wait(500)
    update({ phase: 'sent', typed: '' })
    await wait(900)
    update({ phase: 'thinking', elapsed: 0 })
    for (let second = 1; second <= THINK_SECONDS; second++) {
      await wait(1000)
      update({ elapsed: second })
    }
    update({ phase: 'answer' })
  }, playing)

  const { phase } = state
  const sent = phase === 'sent' || phase === 'thinking' || phase === 'answer' || phase === 'done'
  const streaming = phase === 'sent' || phase === 'thinking' || phase === 'answer'

  return (
    <div ref={ref} role="region" aria-label={copy.region}>
      <PhoneFrame
        onReplay={replay}
        overlay={<ToolsSheet copy={copy} open={sheetOpen} onClose={() => setSheetOpen(false)} />}>
        <div className={cn('relative h-full', tone.chat)}>
          <div ref={scroller} className="absolute inset-0 overflow-y-auto [scrollbar-width:none]">
            <div ref={thread} className="flex min-h-full flex-col px-4 pt-[122px] pb-[188px]">
              {sent ? (
                <Conversation
                  copy={copy}
                  state={state}
                  tag={tag}
                  playing={playing}
                  onDone={() => update({ phase: 'done' })}
                />
              ) : (
                <div className="flex flex-1 flex-col items-center justify-center gap-6 px-6 pb-10">
                  <CherryAvatar size={48} />
                  <p className="max-w-[320px] text-center text-[20px] leading-[26px] font-medium">{copy.greeting}</p>
                </div>
              )}
            </div>
          </div>

          <ChatHeader agentName={copy.agentName} sidebarLabel={copy.openMenu} newChatLabel={copy.newChat} />

          <div className="absolute inset-x-0 bottom-0 z-10 px-4 pb-[76px]">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 -top-6 bottom-0 bg-linear-to-b from-[#f9f9f9]/0 to-[#f9f9f9] to-[24px] dark:from-black/0 dark:to-black"
            />
            <ComposerSurface className="relative overflow-hidden">
              <m.div layout transition={editorMotion}>
                {phase === 'editing' ? (
                  <div>
                    <p className="min-h-8 py-1 text-[16px] leading-5 break-words">
                      {state.typed ? (
                        <>
                          {state.typed}
                          <span className="ms-px inline-block h-[18px] w-[2px] translate-y-[3px] bg-[#2563eb] motion-safe:animate-caret" />
                        </>
                      ) : (
                        <span className={tone.placeholder}>{copy.placeholder}</span>
                      )}
                    </p>
                    <div className="mt-[10px] flex items-center gap-2">
                      <PlusButton label={copy.attach} onClick={() => setSheetOpen(true)} />
                      <span
                        className={cn(
                          'flex h-8 min-w-0 items-center gap-[6px] rounded-full px-[10px]',
                          tone.secondary
                        )}>
                        <BrandAvatar id={copy.modelProvider} size={20} />
                        <span className="truncate text-[14px] leading-5 font-semibold">{copy.model}</span>
                      </span>
                      <span className="ms-auto">
                        <SendSlot state={state.typed ? 'ready' : 'disabled'} />
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <PlusButton label={copy.attach} onClick={() => setSheetOpen(true)} />
                    <span className={cn('min-w-0 flex-1 truncate text-[16px] leading-5', tone.placeholder)}>
                      {copy.placeholder}
                    </span>
                    <SendSlot state={streaming ? 'stop' : 'disabled'} />
                  </div>
                )}
              </m.div>
            </ComposerSurface>
          </div>
          {/* A phone's chat root shows the floating nav dock, with the composer resting above it. */}
          <FloatingDock className="z-10" />
        </div>
      </PhoneFrame>
    </div>
  )
}

function PlusButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-haspopup="dialog"
      onClick={onClick}
      className={cn('shrink-0 cursor-pointer rounded-full active:opacity-60', canvasFocus)}>
      <ComposerCircle>
        <Plus className="size-[18px]" strokeWidth={1.9} aria-hidden="true" />
      </ComposerCircle>
    </button>
  )
}

function Conversation({
  copy,
  state,
  tag,
  playing,
  onDone
}: {
  copy: MobileComposerCopy
  state: DemoState
  tag: string
  playing: boolean
  onDone: () => void
}) {
  const { phase } = state
  const [expanded, setExpanded] = useState(false)
  const answered = phase === 'answer' || phase === 'done'

  return (
    <div className="flex flex-col gap-4">
      <p className={cn('text-center font-mono text-[13px] leading-[18px]', tone.muted)}>{copy.time}</p>
      <m.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: ease.settle }}
        className="flex justify-end">
        <p className={cn('w-fit max-w-[88%] rounded-[18px] px-4 py-[10px] text-[16px] leading-6', tone.secondary)}>
          {copy.prompt}
        </p>
      </m.div>

      <div className="flex flex-col gap-2.5">
        <div className="flex items-start gap-2">
          <CherryAvatar />
          <p className="mt-0.5 flex min-w-0 flex-wrap items-center gap-x-1.5 text-[14px] leading-5">
            <span className="font-semibold">{copy.agentName}</span>
            <BrandAvatar id={copy.modelProvider} size={16} />
            <span className={tone.tertiary}>{copy.model}</span>
          </p>
        </div>

        {phase === 'sent' && (
          <span role="status" aria-label={copy.thinking} className="flex h-7 items-center">
            <BeatDots className="p-0.5 text-[#7d7d7d]" />
          </span>
        )}

        {phase !== 'sent' && (
          <div className={cn('border-b', tone.borderSubtle, expanded && 'pb-4')}>
            <button
              type="button"
              aria-expanded={expanded}
              onClick={() => setExpanded((open) => !open)}
              className={cn('flex min-h-9 w-full cursor-pointer items-center gap-1 text-start', canvasFocus)}>
              {phase === 'thinking' ? (
                <ShimmerText active={playing} className="text-[14px] leading-5">
                  {copy.thinking}
                </ShimmerText>
              ) : (
                <span className={cn('text-[14px] leading-5', tone.tertiary)}>{copy.took(state.elapsed)}</span>
              )}
              <ChevronRight
                aria-hidden="true"
                className={cn(
                  'size-3 shrink-0 transition-transform duration-200',
                  tone.tertiary,
                  expanded && 'rotate-90'
                )}
              />
              {phase === 'thinking' && (
                <span className={cn('ms-auto text-[13px] tabular-nums', tone.tertiary)}>{state.elapsed}s</span>
              )}
            </button>
            {expanded && <p className={cn('pt-1 text-[14px] leading-[22px]', tone.muted)}>{copy.reasoning}</p>}
          </div>
        )}

        {answered && (
          <Answer items={copy.answer} tag={tag} streaming={phase === 'answer'} playing={playing} onDone={onDone} />
        )}

        {phase === 'done' && <Toolbar copy={copy} />}
      </div>
    </div>
  )
}

/** Markdown answer: a numbered list with bold lead-ins, streamed token by token. */
function Answer({
  items,
  tag,
  streaming,
  playing,
  onDone
}: {
  items: MobileComposerCopy['answer']
  tag: string
  streaming: boolean
  playing: boolean
  onDone: () => void
}) {
  const segments = useMemo(
    () => items.map((item) => [tokenize(item.title, tag), tokenize(` — ${item.body}`, tag)] as const),
    [items, tag]
  )
  const total = segments.reduce((sum, [title, body]) => sum + title.length + body.length, 0)
  const { count } = useStreamedCount(total, streaming && playing, 34, onDone)
  let budget = streaming ? count : total

  return (
    <div className="text-[16px] leading-[26px]">
      <span className="sr-only">{items.map((item) => `${item.title} — ${item.body}`).join(' ')}</span>
      <ol aria-hidden="true" className="list-decimal space-y-2 ps-[26px]">
        {segments.map(([title, body], index) => {
          if (budget <= 0) return null
          const titleTokens = title.slice(0, budget)
          budget -= title.length
          const bodyTokens = budget > 0 ? body.slice(0, budget) : []
          budget -= body.length
          return (
            <li key={items[index].title} className="ps-1">
              <strong className="font-semibold">{titleTokens.join('')}</strong>
              {bodyTokens.join('')}
            </li>
          )
        })}
      </ol>
    </div>
  )
}

/** AssistantMessageToolbar default pins (copy, read aloud, retry, answer with, fork) and More, then usage. */
function Toolbar({ copy }: { copy: MobileComposerCopy }) {
  const [copied, setCopied] = useState(false)
  useEffect(() => {
    if (!copied) return
    const timer = setTimeout(() => setCopied(false), 1500)
    return () => clearTimeout(timer)
  }, [copied])
  const icons = [
    [Volume2, copy.actions.readAloud],
    [RotateCcw, copy.actions.regenerate],
    [AtSign, copy.actions.answerWith],
    [Split, copy.actions.fork],
    [Ellipsis, copy.actions.more]
  ] as const

  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="flex min-h-7 items-center gap-1">
      <button
        type="button"
        aria-label={copy.actions.copy}
        onClick={() => setCopied(true)}
        className={cn('flex size-[27px] cursor-pointer items-center justify-center rounded-lg', canvasFocus)}>
        {copied ? (
          <Check className="size-[15px] text-[oklch(0.5175_0.1453_147.65)]" aria-hidden="true" />
        ) : (
          <Copy className={cn('size-[15px]', tone.muted)} aria-hidden="true" />
        )}
      </button>
      {icons.map(([Icon, label]) => (
        <span key={label} title={label} aria-hidden="true" className="flex size-[27px] items-center justify-center">
          <Icon className={cn('size-[15px]', tone.muted)} />
        </span>
      ))}
      <span className={cn('ms-auto text-[13px] tabular-nums', tone.muted)}>{copy.usage}</span>
    </m.div>
  )
}

/**
 * ChatInputMenu: the + action opens a content-height sheet with only a drag handle (its title is the
 * accessible name), three media tiles, then the Folders, Plugins and Skills rows.
 */
function ToolsSheet({ copy, open, onClose }: { copy: MobileComposerCopy; open: boolean; onClose: () => void }) {
  const panel = useRef<HTMLDivElement>(null)
  const opener = useRef<Element | null>(null)

  useEffect(() => {
    if (open) {
      opener.current = document.activeElement
      panel.current?.querySelector('button')?.focus({ preventScroll: true })
    } else if (opener.current instanceof HTMLElement) {
      opener.current.focus({ preventScroll: true })
      opener.current = null
    }
  }, [open])

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') onClose()
  }
  const tiles: [typeof Camera, string][] = [
    [Camera, copy.media.camera],
    [Images, copy.media.photos],
    [FileText, copy.media.file]
  ]
  const rows: [typeof Folder, string, string?][] = [
    [Folder, copy.tools.folders, copy.tools.noFolder],
    [Boxes, copy.tools.plugins],
    [ToolCase, copy.tools.skills]
  ]

  return (
    <AnimatePresence>
      {open && (
        <div className="absolute inset-0 z-40">
          <m.button
            type="button"
            tabIndex={-1}
            aria-label={copy.closeSheet}
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={sheetMotion}
            className="absolute inset-0 cursor-default bg-black/40"
          />
          <m.div
            ref={panel}
            role="dialog"
            aria-modal="true"
            aria-label={copy.attach}
            onKeyDown={onKeyDown}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={sheetMotion}
            className={cn(
              'absolute inset-x-0 bottom-0 rounded-t-[32px] pb-[34px] dark:border-x dark:border-t dark:border-white/[0.09]',
              tone.sheet
            )}>
            <SheetHandle />
            <div className="flex flex-col gap-5 px-6 pt-1 pb-3">
              <div className="flex gap-3">
                {tiles.map(([Icon, label]) => (
                  <SheetAction
                    key={label}
                    onClick={onClose}
                    className="min-h-20 flex-1 flex-col gap-3 rounded-2xl px-2 py-4">
                    <Icon className="size-6" strokeWidth={1.8} aria-hidden="true" />
                    <span className="text-[14px] leading-5">{label}</span>
                  </SheetAction>
                ))}
              </div>
              <div>
                {rows.map(([Icon, label, value]) => (
                  <SheetAction key={label} onClick={onClose} row className="min-h-14 w-full gap-3 rounded-xl py-2">
                    <Icon className={cn('size-5', tone.muted)} strokeWidth={1.8} aria-hidden="true" />
                    <span className="min-w-0 flex-1 text-start text-[16px] leading-6">{label}</span>
                    {value && <span className={cn('max-w-40 truncate text-[14px]', tone.muted)}>{value}</span>}
                    <ChevronRight className={cn('size-4', tone.muted)} aria-hidden="true" />
                  </SheetAction>
                ))}
              </div>
            </div>
          </m.div>
        </div>
      )}
    </AnimatePresence>
  )
}

function SheetAction({
  children,
  className,
  row,
  onClick
}: {
  children: ReactNode
  className?: string
  row?: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex cursor-pointer items-center active:opacity-60',
        !row && tone.secondary,
        canvasFocus,
        className
      )}>
      {children}
    </button>
  )
}
