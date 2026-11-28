import { MeshGradient } from '@paper-design/shaders-react'
import { useReducedMotion } from 'framer-motion'

import { cn } from '@/lib/utils'

// Flowing coral silk: Paper Shaders' mesh gradient (Apache-2.0). It is the same on both themes and fades into the
// page at the bottom; the shader pauses itself when off screen or in a hidden tab.
const CORAL = ['#0b1d26', '#ff6f61', '#ffb4a2', '#ffe8e0']
// An eased scrim curve: a linear fade leaves a visible band where it starts and ends.
const SCRIM = [1, 0.987, 0.951, 0.896, 0.825, 0.741, 0.648, 0.55, 0.45, 0.352, 0.259, 0.175, 0.104, 0.049, 0.013, 0]

/** A mask that holds the silk to `from`% of the height, then eases it out to the bottom edge. */
function fadeMask(from: number) {
  const stops = SCRIM.map(
    (alpha, index) => `rgb(0 0 0/${alpha}) ${from + ((100 - from) * index) / (SCRIM.length - 1)}%`
  )
  return `linear-gradient(to bottom, ${stops.join(', ')})`
}

/** `fade` is where the bottom fade starts, as a percentage of the height; `false` keeps the silk to the edge. */
export default function HeroBackdrop({ className, fade = 80 }: { className?: string; fade?: number | false }) {
  const reduced = useReducedMotion() ?? false
  return (
    <div
      aria-hidden="true"
      className={cn('pointer-events-none absolute', className)}
      style={fade === false ? undefined : { maskImage: fadeMask(fade) }}>
      <MeshGradient
        style={{ position: 'absolute', inset: 0 }}
        width="100%"
        height="100%"
        // Soft colour fields lose nothing at a capped resolution, and scrolling stays smooth.
        minPixelRatio={1}
        maxPixelCount={1600 * 1000}
        colors={CORAL}
        distortion={0.85}
        swirl={0.4}
        grainOverlay={0.12}
        speed={reduced ? 0 : 0.35}
      />
      {/* A rose tint evens out the silk's lightest patches so white copy stays readable on every part of it. */}
      <span className="absolute inset-0 bg-[rgb(46_14_24/0.42)]" />
    </div>
  )
}
