import { useInView } from 'framer-motion'
import { useMemo, useRef } from 'react'

import { phraseSegments } from '@/lib/phrases'

// "Shimmer, then settle" (Incidental AI Design Academy, MIT): words arrive one by one out of a soft blur when the
// heading first scrolls into view. Chinese is split into words, so a line never breaks inside one.

export default function BlurInText({ text }: { text: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -15% 0px' })
  const parts = useMemo(() => phraseSegments(text), [text])
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
