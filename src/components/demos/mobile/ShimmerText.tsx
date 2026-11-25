import { AnimatePresence, animate, m, useMotionValue, useReducedMotion, useTransform } from 'framer-motion'
import { useEffect } from 'react'

import { ease, spring } from '@/lib/motion'
import { cn } from '@/lib/utils'

// Mobile ShimmerText: a band 55% of the text's width sweeps through the glyphs every 2000ms, linear.
// Positions -122%..222% start the band fully left of the text and end it fully right of it.
const BAND = 'linear-gradient(90deg, transparent, var(--muted-foreground), transparent)'
const BASE = 'linear-gradient(var(--foreground), var(--foreground))'

interface ShimmerTextProps {
  children: string
  /** Runs the sweep while true; otherwise shows the plain text. */
  active?: boolean
  className?: string
}

export default function ShimmerText({ children, active = true, className }: ShimmerTextProps) {
  const reduced = useReducedMotion()
  const sweep = useMotionValue(0)
  const backgroundPosition = useTransform(sweep, (t) => `${-122 + 344 * t}% 0%, 0% 0%`)

  useEffect(() => {
    sweep.set(0)
    if (!active || reduced) return
    const controls = animate(sweep, 1, { duration: 2, ease: 'linear', repeat: Number.POSITIVE_INFINITY })
    return () => controls.stop()
  }, [active, reduced, sweep])

  return (
    <m.span
      className={cn('inline-block max-w-full truncate bg-clip-text bg-no-repeat text-transparent', className)}
      style={{ backgroundImage: `${BAND}, ${BASE}`, backgroundSize: '55% 100%, 100% 100%', backgroundPosition }}>
      {children}
    </m.span>
  )
}

/**
 * TextAnimation.Rotating: the next phrase rises 8px on spring.settle and fades in after 60ms over 200ms,
 * while the outgoing one clears upward within 120ms so the two never read as one smear.
 */
export function RotatingText({ phrases, index, active }: { phrases: string[]; index: number; active?: boolean }) {
  return (
    <span className="relative block h-5 min-w-0 flex-1 overflow-hidden">
      <AnimatePresence initial={false}>
        <m.span
          key={index}
          className="absolute inset-x-0 top-0 flex h-5 items-center"
          initial={{ y: 8, opacity: 0 }}
          animate={{
            y: 0,
            opacity: 1,
            transition: { y: spring.settle, opacity: { delay: 0.06, duration: 0.2, ease: ease.settle } }
          }}
          exit={{
            y: -8,
            opacity: 0,
            transition: { y: spring.settle, opacity: { duration: 0.12, ease: ease.settle } }
          }}>
          <ShimmerText active={active}>{phrases[index]}</ShimmerText>
        </m.span>
      </AnimatePresence>
    </span>
  )
}
