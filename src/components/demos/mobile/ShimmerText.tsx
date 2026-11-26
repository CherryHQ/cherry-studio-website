import { animate, m, useMotionValue, useReducedMotion, useTransform } from 'framer-motion'
import { useEffect } from 'react'

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
