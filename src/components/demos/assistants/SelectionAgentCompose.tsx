import { m } from 'framer-motion'
import { ArrowUp, Check, CircleSlash, LoaderCircle, TextQuote, X } from 'lucide-react'
import { type KeyboardEvent, useEffect, useRef, useState } from 'react'

import type { AssistantsDemoCopy } from '@/content/demos/assistants'
import { ease, spring } from '@/lib/motion'
import { cn } from '@/lib/utils'

interface ComposeProps {
  copy: AssistantsDemoCopy
  quote: string
  onClose: () => void
  onSend: (instruction: string) => void
}

const ghostButton =
  'inline-flex h-7 max-w-48 cursor-pointer items-center gap-1.5 rounded-md px-2 text-[13px] transition-colors hover:bg-accent focus-visible:outline-2 focus-visible:outline-primary'

/** Mirrors desktop SelectionAgentComposeBar: the quoted selection, an instruction, then where it runs. */
export function SelectionAgentCompose({ copy, quote, onClose, onSend }: ComposeProps) {
  const text = copy.agent
  const input = useRef<HTMLTextAreaElement>(null)
  const [value, setValue] = useState('')
  const [hasQuote, setHasQuote] = useState(true)
  const lines = quote.trim().split('\n').length

  useEffect(() => {
    input.current?.focus({ preventScroll: true })
  }, [])

  const send = () => {
    if (value.trim()) onSend(value.trim())
  }

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.nativeEvent.isComposing) return
    if (event.key === 'Escape' && !value.trim()) onClose()
    else if (event.key === 'Enter' && !event.shiftKey && event.target === input.current) send()
    else return
    event.preventDefault()
  }

  return (
    <m.div
      role="dialog"
      aria-label={text.name}
      onKeyDown={onKeyDown}
      initial={{ opacity: 0, y: 8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, y: 40, transition: { duration: 0.2, ease: ease.inOut } }}
      transition={{ duration: 0.2, ease: ease.expo }}
      className="absolute top-12 right-3 z-30 flex w-[min(460px,calc(100%-24px))] flex-col overflow-hidden rounded-xl border border-border bg-popover pb-1 shadow-(--shadow-float)">
      <div className="flex h-11 items-center gap-2.5 pr-2 pl-3">
        <span className="flex shrink-0 gap-2" aria-hidden="true">
          <span className="size-3 rounded-full bg-[#ff5f57]" />
          <span className="size-3 rounded-full bg-[#febc2e]" />
          <span className="size-3 rounded-full bg-[#28c840]" />
        </span>
        <div className="group/quote flex min-w-0 flex-1 items-center gap-1">
          {hasQuote && (
            <>
              <span className="flex min-w-0 items-center gap-1.5 text-sm text-muted-foreground" title={quote}>
                <TextQuote className="size-3.5 shrink-0" aria-hidden="true" />
                <span className="min-w-0 truncate">{quote.replace(/\s+/g, ' ').trim()}</span>
              </span>
              <button
                type="button"
                onClick={() => {
                  setHasQuote(false)
                  input.current?.focus()
                }}
                aria-label={`${text.quote} ×`}
                className="flex size-5 shrink-0 cursor-pointer items-center justify-center rounded-full text-muted-foreground opacity-0 transition-opacity group-hover/quote:opacity-100 hover:bg-accent focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-primary">
                <X className="size-3" aria-hidden="true" />
              </button>
            </>
          )}
        </div>
        {hasQuote && (
          <span className="shrink-0 text-xs text-muted-foreground">
            {lines > 1 ? text.lines.replace('{n}', String(lines)) : text.chars.replace('{n}', String(quote.length))}
          </span>
        )}
        <button
          type="button"
          onClick={onClose}
          aria-label={copy.actionWindow.close}
          className="flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-2 focus-visible:outline-primary">
          <X className="size-3.5" aria-hidden="true" />
        </button>
      </div>
      <textarea
        ref={input}
        rows={2}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder={text.placeholder}
        aria-label={text.placeholder}
        className="mx-3.5 resize-none bg-transparent text-lg leading-relaxed text-foreground outline-none placeholder:text-muted-foreground"
      />
      <div className="flex h-10 items-center justify-between gap-4 px-2 py-1.5">
        <div className="flex min-w-0 items-center gap-1 overflow-hidden">
          <span className={ghostButton}>
            <span
              aria-hidden="true"
              className="inline-flex size-[18px] shrink-0 items-center justify-center rounded-sm bg-muted text-[11px] leading-none">
              {text.avatar}
            </span>
            <span className="truncate">{text.name}</span>
          </span>
          <span className={ghostButton}>
            <CircleSlash className="size-3.5 shrink-0 text-muted-foreground" aria-hidden="true" />
            <span className="truncate">{text.workspace}</span>
          </span>
        </div>
        <div className="flex shrink-0 items-center gap-1.5">
          <span className="hidden text-xs text-muted-foreground sm:inline">{text.saved}</span>
          <button
            type="button"
            onClick={send}
            aria-label={text.send}
            aria-disabled={!value.trim()}
            className={cn(
              'flex size-[22px] cursor-pointer items-center justify-center rounded-full text-primary-foreground transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
              value.trim() ? 'bg-primary' : 'cursor-not-allowed bg-muted-foreground/40'
            )}>
            <ArrowUp className="size-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </m.div>
  )
}

export interface AgentCapsuleState {
  title: string
  step: number
  done: boolean
}

interface CapsuleProps {
  copy: AssistantsDemoCopy
  capsule: AgentCapsuleState
  onClose: () => void
}

/** Mirrors desktop SelectionCapsuleStack: a blurred, still-running agent window folds into this capsule. */
export function SelectionAgentCapsule({ copy, capsule, onClose }: CapsuleProps) {
  const text = copy.agent
  const Icon = capsule.done ? Check : LoaderCircle
  return (
    <m.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 6 }}
      transition={spring.settle}
      className="group absolute right-3 bottom-14 z-30 flex h-9 max-w-[calc(100%-24px)] items-center gap-1 rounded-full border border-border bg-popover pr-3 text-xs text-foreground shadow-md focus-within:pr-1.5 hover:pr-1.5">
      <span className="flex h-full min-w-0 items-center gap-2 pl-[7px]">
        <span
          aria-hidden="true"
          className="inline-flex size-[18px] shrink-0 items-center justify-center rounded-sm bg-muted text-[11px] leading-none">
          {text.avatar}
        </span>
        <span className="font-medium whitespace-nowrap">{text.name}</span>
        <span className="hidden min-w-0 max-w-45 truncate text-muted-foreground group-focus-within:inline group-hover:inline">
          {capsule.title}
        </span>
        <span
          aria-live="polite"
          className={cn(
            'inline-flex items-center gap-1 whitespace-nowrap tabular-nums',
            capsule.done ? 'text-emerald-600 dark:text-emerald-400' : 'text-muted-foreground'
          )}>
          <Icon className={cn('size-3', !capsule.done && 'motion-safe:animate-spin')} aria-hidden="true" />
          {capsule.done ? text.done : capsule.step > 0 ? text.step.replace('{n}', String(capsule.step)) : text.running}
        </span>
      </span>
      <button
        type="button"
        onClick={onClose}
        aria-label={text.dismiss}
        className="flex h-5 w-0 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-full text-muted-foreground opacity-0 group-focus-within:w-5 group-focus-within:opacity-100 group-hover:w-5 group-hover:opacity-100 hover:bg-accent focus-visible:outline-2 focus-visible:outline-primary">
        <X className="size-3" aria-hidden="true" />
      </button>
    </m.div>
  )
}
