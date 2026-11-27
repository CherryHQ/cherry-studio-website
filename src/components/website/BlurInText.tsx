import { useInView } from 'framer-motion'
import { useMemo, useRef } from 'react'

// "Shimmer, then settle" (Incidental AI Design Academy, MIT): words arrive one by one out of a soft blur when the
// heading first scrolls into view. CJK text is split per character.
const SEGMENT = /\s+|[　-鿿＀-￯]|[^\s　-鿿＀-￯]+/g

export default function BlurInText({ text }: { text: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -15% 0px' })
  const parts = useMemo(() => text.match(SEGMENT) ?? [text], [text])
  let index = 0

  return (
    <span ref={ref}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {parts.map((part, key) =>
          /^\s+$/.test(part) ? (
            part
          ) : (
            <span
              key={key}
              className={inView ? 'inline-block motion-safe:animate-blur-in' : 'inline-block motion-safe:opacity-0'}
              style={{ animationDelay: `${index++ * 60}ms` }}>
              {part}
            </span>
          )
        )}
      </span>
    </span>
  )
}
