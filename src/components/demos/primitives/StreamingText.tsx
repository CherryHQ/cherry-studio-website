import { useReducedMotion } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'

import { cn } from '@/lib/utils'

const CJK_OR_WORD = /\s+|[　-鿿＀-￯]|[^\s　-鿿＀-￯]+/g

/** Word segments for English, single characters for CJK, matching how streamed tokens read. */
export function tokenize(text: string, locale: string) {
  if (typeof Intl !== 'undefined' && 'Segmenter' in Intl) {
    return Array.from(new Intl.Segmenter(locale, { granularity: 'word' }).segment(text), (part) => part.segment)
  }
  return text.match(CJK_OR_WORD) ?? []
}

/**
 * Reveals `tokens` at a steady rate while `active`, like desktop useSmoothStream draining its buffer.
 * Returns how many tokens are visible; reduced motion shows everything at once.
 */
export function useStreamedCount(total: number, active: boolean, rate = 38, onDone?: () => void) {
  const reduced = useReducedMotion()
  const [count, setCount] = useState(0)
  const doneRef = useRef(onDone)
  doneRef.current = onDone

  useEffect(() => {
    if (!active) return
    if (reduced) {
      setCount(total)
      return
    }
    const timer = setInterval(() => {
      setCount((value) => Math.min(total, value + 1))
    }, 1000 / rate)
    return () => clearInterval(timer)
  }, [active, rate, reduced, total])

  useEffect(() => {
    if (count > 0 && count >= total) doneRef.current?.()
  }, [count, total])

  return { count, reset: () => setCount(0) }
}

interface StreamingTextProps {
  text: string
  locale: string
  active: boolean
  rate?: number
  onDone?: () => void
  className?: string
}

/** Streams text token by token; each token fades in over 250ms ease-out as in the desktop Streamdown renderer. */
export default function StreamingText({ text, locale, active, rate, onDone, className }: StreamingTextProps) {
  const tokens = useMemo(() => tokenize(text, locale), [text, locale])
  const { count } = useStreamedCount(tokens.length, active, rate, onDone)

  return (
    <span className={cn('whitespace-pre-wrap', className)}>
      <span className="sr-only">{active || count > 0 ? text : ''}</span>
      <span aria-hidden="true">
        {tokens.slice(0, count).map((token, index) => (
          <span
            key={index}
            className="motion-safe:animate-in motion-safe:fade-in motion-safe:duration-250 motion-safe:ease-out">
            {token}
          </span>
        ))}
      </span>
    </span>
  )
}
