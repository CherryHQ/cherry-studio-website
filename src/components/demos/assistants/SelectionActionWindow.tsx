import { m, useReducedMotion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'
import { ArrowRight, ChevronDown, CircleX, Copy, Loader2, Pause, Pin, RefreshCw, X } from 'lucide-react'
import { type KeyboardEvent, useEffect, useRef, useState } from 'react'

import type { AssistantsDemoCopy, WindowActionId } from '@/content/demos/assistants'
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

const footerButton =
  'flex h-[22px] min-w-0 cursor-pointer items-center gap-1.5 overflow-hidden rounded bg-muted px-2 text-xs whitespace-nowrap text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-primary'
const windowButton =
  'flex size-6 cursor-pointer items-center justify-center rounded text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-2 focus-visible:outline-primary'

/** Mirrors desktop ActionWindow: muted title bar, original-text toggle, streamed result and the Esc/R/C footer. */
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
  const [phase, setPhase] = useState<Phase>('preparing')
  const [run, setRun] = useState(0)
  const [pinned, setPinned] = useState(false)
  const [showOriginal, setShowOriginal] = useState(false)
  const isTranslate = session.action === 'translate'
  useStickToBottom(scroller, content)

  useEffect(() => {
    if (session.focus) rootRef.current?.focus({ preventScroll: true })
  }, [session.focus])

  useEffect(() => {
    if (phase !== 'preparing' || !playing) return
    const timer = setTimeout(() => setPhase('streaming'), reduced ? 0 : isTranslate ? 650 : 450)
    return () => clearTimeout(timer)
  }, [phase, playing, reduced, isTranslate])

  const regenerate = () => {
    setRun((value) => value + 1)
    setPhase('preparing')
  }
  const copyResult = () => {
    navigator.clipboard?.writeText(session.result).catch(() => {})
  }
  const handleEscape = () => (phase === 'streaming' ? setPhase('done') : onClose())

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.metaKey || event.ctrlKey || event.altKey) return
    const key = event.key.toLowerCase()
    if (key === 'handleEscape') handleEscape()
    else if (key === 'r' && phase !== 'preparing') regenerate()
    else if (key === 'c' && phase === 'done') copyResult()
    else return
    event.preventDefault()
    event.stopPropagation()
  }

  const originalToggle = (
    <button
      type="button"
      onClick={() => setShowOriginal((value) => !value)}
      aria-expanded={showOriginal}
      className="flex cursor-pointer items-center gap-0.5 rounded-sm py-1 text-xs whitespace-nowrap text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-primary">
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
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.12 } }}
      transition={{ duration: 0.2, ease: ease.expo }}
      className="absolute top-12 right-3 z-30 flex h-[248px] w-[min(344px,calc(100%-24px))] flex-col overflow-hidden rounded-lg border border-border bg-popover shadow-(--shadow-float) outline-none">
      <div className="flex h-8 shrink-0 items-center border-b border-border bg-muted px-2">
        <Icon className="ml-1 size-3.5 shrink-0 text-foreground" aria-hidden="true" />
        <span className="ml-2 min-w-0 flex-1 truncate text-sm">{label}</span>
        <div className="flex gap-1.5">
          <button
            type="button"
            onClick={() => setPinned((value) => !value)}
            aria-pressed={pinned}
            aria-label={pinned ? text.pinned : text.pin}
            title={pinned ? text.pinned : text.pin}
            className={cn(windowButton, pinned && 'bg-accent text-foreground')}>
            <Pin className={cn('size-[13px] transition-transform', pinned && 'rotate-45')} aria-hidden="true" />
          </button>
          <button type="button" onClick={onClose} aria-label={text.close} title={text.close} className={windowButton}>
            <X className="size-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div ref={scroller} className="min-h-0 flex-1 overflow-y-auto [scrollbar-width:thin]">
        <div ref={content} className="p-4 pb-11 text-[13px] leading-[1.7]">
          {isTranslate ? (
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="flex h-6 items-center gap-1 rounded bg-muted px-2 text-xs text-muted-foreground">
                {phase === 'preparing' ? (
                  copy.translate.detecting
                ) : (
                  <>
                    <span aria-hidden="true">{copy.translate.from.emoji}</span>
                    {copy.translate.from.label}
                  </>
                )}
              </span>
              <ArrowRight className="size-3.5 shrink-0 text-muted-foreground" aria-hidden="true" />
              <span className="flex h-6 items-center gap-1 rounded border border-border px-2 text-xs">
                <span aria-hidden="true">{copy.translate.to.emoji}</span>
                {copy.translate.to.label}
                <ChevronDown className="size-3 text-muted-foreground" aria-hidden="true" />
              </span>
              <span className="ml-auto">{originalToggle}</span>
            </div>
          ) : (
            <div className="flex justify-end">{originalToggle}</div>
          )}
          {showOriginal && (
            <p className="mt-2 rounded bg-muted p-2 text-xs break-words whitespace-pre-wrap text-muted-foreground">
              {session.original}
            </p>
          )}
          <div className={cn('min-h-6 break-words', isTranslate ? 'mt-3' : 'mt-1')} aria-live="polite">
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

      <div className="absolute bottom-0 left-1/2 flex h-8 w-[calc(100%-16px)] -translate-x-1/2 items-center justify-center gap-1.5 rounded-lg backdrop-blur-sm">
        <button type="button" onClick={handleEscape} className={footerButton}>
          {phase === 'streaming' ? (
            <>
              <span className="relative size-3.5 shrink-0" aria-hidden="true">
                <Pause className="absolute inset-0.5 size-2.5 text-red-500" />
                <Loader2 className="absolute inset-0 size-3.5 text-red-500 motion-safe:animate-spin" />
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
        <button
          type="button"
          onClick={regenerate}
          disabled={phase === 'preparing'}
          className={cn(footerButton, 'disabled:cursor-default disabled:opacity-40')}>
          <RefreshCw className="size-3.5 shrink-0" aria-hidden="true" />
          <span className="truncate">{text.regenerate}</span>
        </button>
        <button
          type="button"
          onClick={copyResult}
          disabled={phase !== 'done'}
          className={cn(footerButton, 'disabled:cursor-default disabled:opacity-40')}>
          <Copy className="size-3.5 shrink-0" aria-hidden="true" />
          <span className="truncate">{text.copy}</span>
        </button>
      </div>
    </m.div>
  )
}
