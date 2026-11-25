import { useInView } from 'framer-motion'
import { type ComponentType, lazy, Suspense, useRef, useState } from 'react'

import { cn } from '@/lib/utils'

interface DemoMountProps {
  load: () => Promise<{ default: ComponentType }>
  /** Reserve the demo's final size so mounting it never shifts the layout. */
  className?: string
}

/** Loads a demo chunk only when it approaches the viewport. */
export default function DemoMount({ load, className }: DemoMountProps) {
  const ref = useRef<HTMLDivElement>(null)
  const near = useInView(ref, { once: true, margin: '0px 0px 400px 0px' })
  const [Demo] = useState(() => lazy(load))
  const placeholder = <div aria-hidden="true" className="glass-card h-full min-h-[inherit] rounded-xl" />

  return (
    <div ref={ref} className={cn('min-w-0', className)}>
      {near ? (
        <Suspense fallback={placeholder}>
          <Demo />
        </Suspense>
      ) : (
        placeholder
      )}
    </div>
  )
}
