import { RotateCcw } from 'lucide-react'
import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

import { cn } from '@/lib/utils'

interface DemoFrameProps {
  title: string
  children: ReactNode
  className?: string
  bodyClassName?: string
  toolbar?: ReactNode
  onReplay?: () => void
  /** Hide the "simulated" caption when a section already explains the demo. */
  bare?: boolean
  /** Skip the title bar for demos that draw the app's own window chrome. */
  chromeless?: boolean
  /** Set the window in a frosted-glass bezel with a soft lift, for showcase placements over colour. */
  bezel?: boolean
}

/** Desktop window chrome around an interactive product demo. */
export default function DemoFrame({
  title,
  children,
  className,
  bodyClassName,
  toolbar,
  onReplay,
  bare,
  chromeless,
  bezel
}: DemoFrameProps) {
  const { t } = useTranslation()
  const windowBody = (
    <div className="glass-card overflow-hidden rounded-[20px]">
      {!chromeless && (
        <div className="flex h-10 items-center gap-3 border-b border-border px-3.5">
          <span className="flex gap-1.5" aria-hidden="true">
            <span className="size-2.5 rounded-full bg-foreground/20" />
            <span className="size-2.5 rounded-full bg-foreground/20" />
            <span className="size-2.5 rounded-full bg-foreground/20" />
          </span>
          <span className="min-w-0 flex-1 truncate text-center font-mono text-[11px] text-muted-foreground">
            {title}
          </span>
          <span className="flex min-w-[42px] items-center justify-end gap-1">{toolbar}</span>
        </div>
      )}
      {/* Inside a [data-fill] stage the body grows to --demo-fill-h, never below its own design height. */}
      <div className={cn('relative bg-card/60', bodyClassName, 'in-data-fill:min-h-(--demo-fill-h)')}>{children}</div>
    </div>
  )

  return (
    <figure className={cn('min-w-0', className)}>
      {bezel ? (
        <div className="relative rounded-[28px] bg-white/15 p-2 shadow-[0_40px_100px_-40px_rgb(11_29_38/0.45),0_16px_48px_-24px_rgb(255_111_97/0.35)] ring-1 ring-white/35 ring-inset backdrop-blur-2xl dark:bg-white/8 dark:ring-white/15">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-[28px] bg-linear-to-b from-white/35 to-transparent dark:from-white/15"
          />
          <div className="relative">{windowBody}</div>
        </div>
      ) : (
        windowBody
      )}
      {!bare && (
        <figcaption className="mt-2.5 flex items-center justify-between gap-3 px-1 text-xs text-muted-foreground">
          <span>{t('demos.simulated')}</span>
          {onReplay && (
            <button
              type="button"
              onClick={onReplay}
              className="inline-flex shrink-0 cursor-pointer items-center gap-1 rounded-sm whitespace-nowrap hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
              <RotateCcw className="size-3" aria-hidden="true" />
              {t('demos.replay')}
            </button>
          )}
        </figcaption>
      )}
    </figure>
  )
}
