import type { CSSProperties, ReactNode } from 'react'

import { cn } from '@/lib/utils'

/**
 * Endless row after Incidental AI Design Academy's MIT "Marquee". The second copy is for the loop only, so it renders
 * with `hidden` set; hover pauses the row, and under reduced motion it becomes a plain scrollable row.
 */
export default function Marquee({
  children,
  reverse,
  seconds
}: {
  children: (hidden: boolean) => ReactNode
  reverse?: boolean
  seconds?: number
}) {
  return (
    <div className="group flex overflow-hidden motion-reduce:overflow-x-auto motion-reduce:[scrollbar-width:none]">
      <div
        className={cn(
          'flex w-max motion-safe:animate-marquee group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused]',
          reverse && '[animation-direction:reverse]'
        )}
        style={seconds ? ({ animationDuration: `${seconds}s` } as CSSProperties) : undefined}>
        {children(false)}
        <div className="flex motion-reduce:hidden">{children(true)}</div>
      </div>
    </div>
  )
}
