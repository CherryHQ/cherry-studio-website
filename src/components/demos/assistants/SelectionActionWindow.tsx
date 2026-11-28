import { AnimatePresence, m, useReducedMotion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'
import {
  ArrowRight,
  ChevronDown,
  CircleHelp,
  CircleX,
  Copy,
  Droplet,
  Loader2,
  Pause,
  Pin,
  RefreshCw,
  Settings2,
  Volume2
} from 'lucide-react'
import { type KeyboardEvent, useEffect, useRef, useState } from 'react'

import type { AssistantsDemoCopy, LanguageTag, WindowActionId } from '@/content/demos/assistants'
import { ease } from '@/lib/motion'
import { cn } from '@/lib/utils'
import StreamingText from '../primitives/StreamingText'
import { useStickToBottom } from '../primitives/useStickToBottom'

export interface ActionSession {
  id: number
  action: WindowActionId
  original: string
  result: string
  /** Focus the window when the user opened it, never when autoplay did. */
  focus: boolean
}

interface SelectionActionWindowProps {
  session: ActionSession
  copy: AssistantsDemoCopy
  label: string
  icon: LucideIcon
  resultTag: string
  playing: boolean
  onClose: () => void
}

type Phase = 'preparing' | 'streaming' | 'done'

/** Browser speech stands in for the desktop's TTS playback. */
export function readAloud(text: string, lang: string) {
  const speech = typeof window === 'undefined' ? undefined : window.speechSynthesis
  if (!speech) return
  speech.cancel()
  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = lang
  speech.speak(utterance)
}

const footerButton =
  'flex h-[22px] min-w-0 cursor-pointer items-center gap-1.5 overflow-hidden rounded bg-muted px-2 text-xs whitespace-nowrap text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-primary'
const windowButton =
  'flex size-6 cursor-pointer items-center justify-center rounded text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-2 focus-visible:outline-primary'

function LanguageChip({ tag, className }: { tag: LanguageTag; className?: string }) {
  return (
    <span
      className={cn('flex h-6 items-center gap-2 rounded border border-input bg-background px-2 text-xs', className)}>
      <span aria-hidden="true">{tag.emoji}</span>
      <span className="flex-1 truncate">{tag.label}</span>
      <ChevronDown className="size-3 shrink-0 text-muted-foreground" aria-hidden="true" />
    </span>
  )
}

/** Mirrors desktop ActionWindow (macOS): muted title bar, original-text toggle, streamed result and the Esc/R/C footer. */
export function SelectionActionWindow({
  session,
  copy,
  label,
  icon: Icon,
  resultTag,
  playing,
  onClose
}: SelectionActionWindowProps) {
  const text = copy.actionWindow
  const reduced = useReducedMotion()
  const rootRef = useRef<HTMLDivElement>(null)
  const scroller = useRef<HTMLDivElement>(null)
  const content = useRef<HTMLDivElement>(null)
  const footerTimer = useRef<ReturnType<typeof setTimeout>>(undefined)
  const [phase, setPhase] = useState<Phase>('preparing')
  const [run, setRun] = useState(0)
  const [pinned, setPinned] = useState(false)
  const [opacity, setOpacity] = useState(100)
  const [showOpacity, setShowOpacity] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [showOriginal, setShowOriginal] = useState(false)
  const [showFooter, setShowFooter] = useState(true)
  const [copied, setCopied] = useState(false)
  const isTranslate = session.action === 'translate'
  useStickToBottom(scroller, content)

  // The desktop footer fades out 3s after opening and returns for 2s on each shortcut.
  const flashFooter = (ms: number) => {
    clearTimeout(footerTimer.current)
    setShowFooter(true)
    footerTimer.current = setTimeout(() => setShowFooter(false), ms)
  }

  useEffect(() => {
    flashFooter(3000)
    return () => clearTimeout(footerTimer.current)
  }, [])

  useEffect(() => {
    if (session.focus) rootRef.current?.focus({ preventScroll: true })
  }, [session.focus])

  useEffect(() => {
    if (phase !== 'preparing' || !playing) return
    const timer = setTimeout(() => setPhase('streaming'), reduced ? 0 : isTranslate ? 650 : 450)
    return () => clearTimeout(timer)
  }, [phase, playing, reduced, isTranslate])

  useEffect(() => {
    if (!copied) return
    const timer = setTimeout(() => setCopied(false), 1600)
    return () => clearTimeout(timer)
  }, [copied])

  const loading = phase !== 'done'
  const regenerate = () => {
    setRun((value) => value + 1)
    setPhase('preparing')
  }
  const copyResult = () => {
    if (loading || !navigator.clipboard) return
    navigator.clipboard.writeText(session.result).then(
      () => setCopied(true),
      () => {}
    )
  }
  const handleEscape = () => (loading ? setPhase('done') : onClose())

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.metaKey || event.ctrlKey || event.altKey) return
    const key = event.key.toLowerCase()
    if (key === 'escape') handleEscape()
    else if (key === 'r') regenerate()
    else if (key === 'c') copyResult()
    else return
    flashFooter(2000)
    event.preventDefault()
    event.stopPropagation()
  }

  const originalToggle = (
    <button
      type="button"
      onClick={() => setShowOriginal((value) => !value)}
      aria-expanded={showOriginal}
      className="flex cursor-pointer items-center py-1 text-xs whitespace-nowrap text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-primary">
      {showOriginal ? text.hideOriginal : text.showOriginal}
      <ChevronDown
        className={cn('size-3.5 transition-transform duration-200', showOriginal && 'rotate-180')}
        aria-hidden="true"
      />
    </button>
  )

  return (
    <m.div
      ref={rootRef}
      role="dialog"
      aria-label={label}
      tabIndex={-1}
      onKeyDown={onKeyDown}
      initial={{ opacity: 0, y: 8, scale: 0.98 }}
      animate={{ opacity: opacity / 100, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.12 } }}
      transition={{ duration: 0.2, ease: ease.expo }}
      className="absolute top-12 right-3 z-30 flex h-[258px] w-[min(440px,calc(100%-24px))] flex-col overflow-hidden rounded-lg border border-border bg-popover shadow-(--shadow-float) outline-none">
      <div className="relative flex h-8 shrink-0 items-center bg-muted px-2">
        <span className="flex w-[70px] shrink-0 items-center gap-2 pl-1">
          <button
            type="button"
            onClick={onClose}
            aria-label={text.close}
            className="size-3 cursor-pointer rounded-full bg-[#ff5f57] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          />
          <span className="size-3 rounded-full bg-[#febc2e]" aria-hidden="true" />
          <span className="size-3 rounded-full bg-[#28c840]" aria-hidden="true" />
        </span>
        <Icon className="ml-1 size-3.5 shrink-0 text-foreground" aria-hidden="true" />
        <span className="ml-2 min-w-0 flex-1 truncate text-sm">{label}</span>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setPinned((value) => !value)}
            aria-pressed={pinned}
            aria-label={pinned ? text.pinned : text.pin}
            title={pinned ? text.pinned : text.pin}
            className={cn(windowButton, pinned && 'bg-accent text-foreground')}>
            <Pin className={cn('size-[13px] transition-transform', pinned && 'rotate-45')} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => setShowOpacity((value) => !value)}
            aria-expanded={showOpacity}
            aria-label={text.opacity}
            title={text.opacity}
            className={cn(windowButton, showOpacity && 'bg-accent text-foreground')}>
            <Droplet className="size-[13px]" aria-hidden="true" />
          </button>
        </div>
        {showOpacity && (
          <div className="absolute top-full right-2 z-10 mt-2 flex h-[120px] w-9 flex-col items-center justify-center gap-1 rounded bg-popover px-2 pt-2 pb-2 shadow-md">
            <span className="font-mono text-[10px] text-muted-foreground tabular-nums">{opacity}%</span>
            <input
              type="range"
              min={20}
              max={100}
              value={opacity}
              aria-label={text.opacity}
              onChange={(event) => setOpacity(Number(event.target.value))}
              onPointerUp={() => setShowOpacity(false)}
              className="h-[80px] w-1.5 cursor-pointer accent-primary [direction:rtl] [writing-mode:vertical-lr]"
            />
          </div>
        )}
      </div>

      <div ref={scroller} className="min-h-0 flex-1 overflow-y-auto [scrollbar-width:thin]">
        <div ref={content} className="p-4 pb-11 text-sm leading-relaxed">
          {isTranslate ? (
            <div className="relative flex flex-wrap items-center gap-x-1.5 gap-y-1">
              <span className="flex h-6 min-w-0 items-center rounded bg-muted px-2 text-xs whitespace-nowrap text-muted-foreground">
                {phase === 'preparing' ? (
                  copy.translate.detecting
                ) : (
                  <>
                    <span className="mr-1" aria-hidden="true">
                      {copy.translate.from.emoji}
                    </span>
                    <span className="truncate">{copy.translate.from.label}</span>
                  </>
                )}
              </span>
              <ArrowRight className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
              <LanguageChip tag={copy.translate.to} className="min-w-[100px]" />
              <span className="ml-auto flex shrink-0 items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setShowSettings((value) => !value)}
                  aria-expanded={showSettings}
                  aria-label={copy.translate.settings}
                  title={copy.translate.settings}
                  className="flex size-7 cursor-pointer items-center justify-center rounded text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-2 focus-visible:outline-primary">
                  <Settings2 className="size-3.5" aria-hidden="true" />
                </button>
                <span title={copy.translate.smartTips} className="flex">
                  <CircleHelp className="size-3.5 text-muted-foreground" aria-hidden="true" />
                </span>
                {originalToggle}
              </span>
              {showSettings && (
                <div className="absolute top-full right-0 z-10 mt-1 flex w-[200px] flex-col gap-2 rounded-md border border-border bg-popover p-2 shadow-md">
                  {[
                    { label: copy.translate.preferredTarget, tag: copy.translate.preferred },
                    { label: copy.translate.alterLanguage, tag: copy.translate.alter }
                  ].map((row) => (
                    <div key={row.label} className="flex flex-col gap-1.5 py-1">
                      <span className="text-xs text-muted-foreground">{row.label}</span>
                      <LanguageChip tag={row.tag} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="flex justify-end">{originalToggle}</div>
          )}
          {showOriginal && (
            <p className="mt-2 rounded bg-muted p-2 text-xs break-words whitespace-pre-wrap text-muted-foreground">
              {session.original}
            </p>
          )}
          <div className={cn('min-h-6 break-words', isTranslate ? 'mt-4' : 'mt-1')} aria-live="polite">
            {phase === 'preparing' ? (
              <Loader2 className="size-4 text-muted-foreground motion-safe:animate-spin" aria-hidden="true" />
            ) : (
              <StreamingText
                key={run}
                text={session.result}
                locale={resultTag}
                active={phase === 'streaming' && playing}
                rate={isTranslate ? 28 : 46}
                onDone={() => setPhase('done')}
              />
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {copied && (
          <m.p
            role="status"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute top-10 left-1/2 z-20 -translate-x-1/2 rounded-full border border-border bg-popover px-3 py-1 text-xs shadow-md">
            {text.copied}
          </m.p>
        )}
      </AnimatePresence>

      <div
        className={cn(
          'absolute bottom-0 left-1/2 flex h-8 w-[calc(100%-16px)] -translate-x-1/2 items-center justify-center gap-1.5 rounded-lg px-2 py-1.5 backdrop-blur-sm transition-opacity duration-300 focus-within:opacity-100 hover:opacity-100',
          showFooter ? 'opacity-100' : 'opacity-0'
        )}>
        <button type="button" onClick={handleEscape} className={cn(footerButton, loading && 'hover:text-red-500')}>
          {loading ? (
            <>
              <span className="relative size-4 shrink-0" aria-hidden="true">
                <Pause className="absolute top-px left-px size-3.5 text-red-500" />
                <Loader2 className="absolute inset-0 size-4 text-red-500 motion-safe:animate-spin" />
              </span>
              <span className="truncate">{text.escStop}</span>
            </>
          ) : (
            <>
              <CircleX className="size-3.5 shrink-0" aria-hidden="true" />
              <span className="truncate">{text.escClose}</span>
            </>
          )}
        </button>
        <button type="button" onClick={regenerate} className={footerButton}>
          <RefreshCw className="size-3.5 shrink-0" aria-hidden="true" />
          <span className="truncate">{text.regenerate}</span>
        </button>
        <button
          type="button"
          onClick={copyResult}
          aria-disabled={phase === 'preparing'}
          className={cn(footerButton, phase === 'preparing' && 'opacity-20')}>
          <Copy className="size-3.5 shrink-0" aria-hidden="true" />
          <span className="truncate">{text.copy}</span>
        </button>
        {phase === 'done' && (
          <button type="button" onClick={() => readAloud(session.result, resultTag)} className={footerButton}>
            <Volume2 className="size-3.5 shrink-0" aria-hidden="true" />
            <span className="truncate">{text.readAloud}</span>
          </button>
        )}
      </div>
    </m.div>
  )
}
