import { m } from 'framer-motion'
import { ArrowUpRight, type LucideIcon } from 'lucide-react'
import { type PointerEvent, type ReactNode, useRef } from 'react'

import { reveal } from '@/lib/motion'
import { cn } from '@/lib/utils'

export interface FeatureBentoItem {
  key: string
  icon: LucideIcon
  title: ReactNode
  description: ReactNode
  href?: string
  /** Small illustration shown in place of the icon. */
  visual?: ReactNode
}

// Column spans on the 6-column grid: wide/narrow, narrow/wide, then halves; the pattern repeats.
const SPANS = ['lg:col-span-4', 'lg:col-span-2', 'lg:col-span-2', 'lg:col-span-4', 'lg:col-span-3', 'lg:col-span-3']

const SPOT = 'color-mix(in oklab, var(--color-foreground) 4.5%, transparent)'
const RIM = 'color-mix(in oklab, var(--color-foreground) 45%, transparent)'
// Keep only the 1px padding ring: the content-box layer is subtracted from the full layer.
const RIM_MASK = {
  WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
  WebkitMaskComposite: 'xor',
  mask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
  maskComposite: 'exclude'
} as const

/**
 * Feature grid with Incidental AI Design Academy's MIT "Spotlight cards" (one pointer lights every card's surface
 * and 1px rim) and "Tilt card" (the hovered card tilts toward the pointer with a moving glare).
 */
export default function FeatureBento({ items, className }: { items: FeatureBentoItem[]; className?: string }) {
  const grid = useRef<HTMLUListElement>(null)

  const onMove = (event: PointerEvent<HTMLUListElement>) => {
    for (const card of grid.current?.querySelectorAll<HTMLElement>('[data-card]') ?? []) {
      const rect = card.getBoundingClientRect()
      card.style.setProperty('--x', `${event.clientX - rect.left}px`)
      card.style.setProperty('--y', `${event.clientY - rect.top}px`)
    }
  }
  const tilt = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== 'mouse') return
    const card = event.currentTarget
    const rect = card.getBoundingClientRect()
    const px = (event.clientX - rect.left) / rect.width
    const py = (event.clientY - rect.top) / rect.height
    card.style.setProperty('--ry', `${(px - 0.5) * 8}deg`)
    card.style.setProperty('--rx', `${(0.5 - py) * 6}deg`)
  }

  return (
    <ul
      ref={grid}
      onPointerMove={onMove}
      className={cn('group/grid grid gap-4 [perspective:1200px] md:grid-cols-2 lg:grid-cols-6', className)}>
      {items.map((item, index) => {
        const span = SPANS[index % SPANS.length]
        const wide = span === 'lg:col-span-4'
        const Card = item.href ? 'a' : 'div'
        return (
          <m.li key={item.key} {...reveal(index)} className={cn('min-w-0', span)}>
            <Card
              {...(item.href ? { href: item.href } : {})}
              data-card=""
              onPointerMove={tilt}
              onPointerLeave={(event) => {
                event.currentTarget.style.removeProperty('--rx')
                event.currentTarget.style.removeProperty('--ry')
              }}
              className={cn(
                'group relative flex h-full flex-col overflow-hidden glass-card rounded-[20px] p-6 [transform:rotateX(var(--rx,0deg))_rotateY(var(--ry,0deg))] transition-transform duration-200 ease-out will-change-transform motion-reduce:transform-none',
                item.href && 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
              )}>
              {/* Surface light and rim light both follow the grid-wide pointer; they fade in while it is over the grid. */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/grid:opacity-100"
                style={{
                  background: `radial-gradient(420px circle at var(--x, 50%) var(--y, 50%), ${SPOT}, transparent 65%)`
                }}
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-[inherit] p-px opacity-0 transition-opacity duration-300 group-hover/grid:opacity-100"
                style={{
                  background: `radial-gradient(200px circle at var(--x, 50%) var(--y, 50%), ${RIM}, transparent 60%)`,
                  ...RIM_MASK
                }}
              />
              {item.visual ? (
                <div className="relative flex h-24 items-center" aria-hidden="true">
                  {item.visual}
                </div>
              ) : (
                <span className="relative flex size-10 items-center justify-center rounded-full bg-background shadow-[inset_0_0_0_1px_var(--color-border)]">
                  <item.icon className="size-[18px]" aria-hidden="true" />
                </span>
              )}
              <div className={cn('relative mt-auto pt-6', wide && 'max-w-md')}>
                <h3 className="font-display flex items-center gap-2 text-xl leading-tight text-balance text-foreground">
                  {item.title}
                  {item.href && (
                    <ArrowUpRight
                      aria-hidden="true"
                      className="size-4 shrink-0 text-muted-foreground opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    />
                  )}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-pretty text-muted-foreground zh:leading-6">
                  {item.description}
                </p>
              </div>
            </Card>
          </m.li>
        )
      })}
    </ul>
  )
}
