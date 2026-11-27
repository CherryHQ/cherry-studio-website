import { MeshGradient } from '@paper-design/shaders-react'
import { useReducedMotion } from 'framer-motion'

import { cn } from '@/lib/utils'

// Flowing coral silk: Paper Shaders' mesh gradient (Apache-2.0). It is the same on both themes and fades into the
// page at the bottom; the shader pauses itself when off screen or in a hidden tab.
const CORAL = ['#0b1d26', '#ff6f61', '#ffb4a2', '#ffe8e0']

export default function HeroBackdrop({ className }: { className?: string }) {
  const reduced = useReducedMotion() ?? false
  return (
    <div
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute [mask-image:linear-gradient(to_bottom,#000_80%,transparent)]',
        className
      )}>
      <MeshGradient
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
    </div>
  )
}
