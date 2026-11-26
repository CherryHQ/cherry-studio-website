import { m } from 'framer-motion'
import { ArrowUpRight, type LucideIcon } from 'lucide-react'
import type { PointerEvent, ReactNode } from 'react'

import { reveal } from '@/lib/motion'
import { cn } from '@/lib/utils'

export interface FeatureBentoItem {
  key: string
  icon: LucideIcon
  title: ReactNode
  description: ReactNode
  href?: string
}

// Column spans on the 6-column grid: wide/narrow, narrow/wide, then halves; the pattern repeats.
const SPANS = ['lg:col-span-4', 'lg:col-span-2', 'lg:col-span-2', 'lg:col-span-4', 'lg:col-span-3', 'lg:col-span-3']

function trackPointer(event: PointerEvent<HTMLElement>) {
  const rect = event.currentTarget.getBoundingClientRect()
  event.currentTarget.style.setProperty('--mx', `${event.clientX - rect.left}px`)
  event.currentTarget.style.setProperty('--my', `${event.clientY - rect.top}px`)
}

/** Editorial bento grid for feature lists: mixed spans, a pointer spotlight and oversized line glyphs. */
export default function FeatureBento({ items, className }: { items: FeatureBentoItem[]; className?: string }) {
  return (
    <ul className={cn('grid gap-4 md:grid-cols-2 lg:grid-cols-6', className)}>
      {items.map((item, index) => {
        const span = SPANS[index % SPANS.length]
        const wide = span === 'lg:col-span-4'
        const Card = item.href ? 'a' : 'div'
        return (
          <m.li key={item.key} {...reveal(index)} className={cn('min-w-0', span)}>
            <Card
              {...(item.href ? { href: item.href } : {})}
              onPointerMove={trackPointer}
              className={cn(
                'group relative flex h-full min-h-[240px] flex-col overflow-hidden rounded-[26px] bg-card p-7 shadow-[inset_0_0_0_1px_var(--color-border)] transition-[box-shadow,transform] duration-300 ease-settle hover:-translate-y-0.5 hover:shadow-[inset_0_0_0_1px_var(--color-hairline-strong),var(--shadow-card)] sm:p-8',
                wide && 'lg:min-h-[280px]',
                item.href && 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
              )}>
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background:
                    'radial-gradient(420px circle at var(--mx, 50%) var(--my, 0%), color-mix(in oklab, var(--color-foreground) 7%, transparent), transparent 60%)'
                }}
              />
              {wide && (
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-6 -bottom-10 hidden text-foreground/[0.07] transition-transform duration-500 ease-settle group-hover:-translate-y-1 group-hover:rotate-[-4deg] sm:block">
                  <div className="absolute inset-0 bg-[radial-gradient(circle,var(--color-foreground)_1px,transparent_1.5px)] [mask-image:radial-gradient(circle,black,transparent_70%)] [background-size:14px_14px] opacity-40" />
                  <item.icon className="relative size-56" strokeWidth={0.75} />
                </div>
              )}
              <span
                aria-hidden="true"
                className="font-display absolute top-6 right-7 text-4xl leading-none text-foreground/15 tabular-nums transition-colors duration-300 group-hover:text-foreground/30">
                {String(index + 1).padStart(2, '0')}
              </span>

              <span className="relative flex size-10 items-center justify-center rounded-full bg-background shadow-[inset_0_0_0_1px_var(--color-border)] transition-transform duration-300 ease-settle group-hover:scale-105">
                <item.icon className="size-[18px]" aria-hidden="true" />
              </span>
              <div className={cn('relative mt-auto pt-10', wide && 'max-w-md')}>
                <h3 className="font-display flex items-center gap-2 text-2xl leading-tight text-balance text-foreground">
                  {item.title}
                  {item.href && (
                    <ArrowUpRight
                      aria-hidden="true"
                      className="size-4 shrink-0 text-muted-foreground opacity-0 transition-[opacity,transform] duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                    />
                  )}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-pretty text-muted-foreground zh:leading-7">
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
