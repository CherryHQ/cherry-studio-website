import { BatteryFull, RotateCcw, Signal, Wifi } from 'lucide-react'
import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

import { cn } from '@/lib/utils'

interface PhoneFrameProps {
  children: ReactNode
  /** Rendered above everything on the screen, status bar included, e.g. a sheet scrim. */
  overlay?: ReactNode
  className?: string
  screenClassName?: string
  onReplay?: () => void
  /** Hide the "simulated" caption when a section already explains the demo. */
  bare?: boolean
}

/**
 * A 300×620 phone bezel with a dynamic island and status bar. The screen uses the mobile app's
 * background tokens (light #f5f5f5, dark black); children fill the area below the status bar.
 */
export default function PhoneFrame({ children, overlay, className, screenClassName, onReplay, bare }: PhoneFrameProps) {
  const { t } = useTranslation()

  return (
    <figure className={cn('mx-auto w-full max-w-[300px] min-w-0', className)}>
      <div className="relative aspect-[300/620] w-full rounded-[44px] bg-[#121214] p-[9px] shadow-[0_0_0_1px_rgb(255_255_255/0.1),0_30px_60px_-30px_rgb(0_0_0/0.65)] ring-1 ring-black/40 dark:bg-[#1b1c1e]">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-[3px] rounded-[41px] border border-white/[0.07]"
        />
        <div
          className={cn(
            'relative flex h-full flex-col overflow-hidden rounded-[36px] bg-[#f5f5f5] text-foreground dark:bg-black',
            screenClassName
          )}>
          <div
            aria-hidden="true"
            className="relative flex h-11 shrink-0 items-center justify-between px-6 pt-1 text-[12px] font-semibold">
            <span className="w-12 tabular-nums">9:41</span>
            <span className="absolute top-[9px] left-1/2 h-[26px] w-[84px] -translate-x-1/2 rounded-full bg-black" />
            <span className="flex w-12 items-center justify-end gap-1">
              <Signal className="size-3.5" strokeWidth={2.5} />
              <Wifi className="size-3.5" strokeWidth={2.5} />
              <BatteryFull className="size-4" strokeWidth={2} />
            </span>
          </div>
          <div className="relative min-h-0 flex-1">{children}</div>
          {overlay}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute bottom-2 left-1/2 z-50 h-1 w-[104px] -translate-x-1/2 rounded-full bg-foreground/70"
          />
        </div>
      </div>
      {!bare && (
        <figcaption className="mt-3 flex items-center justify-between gap-3 px-1 font-mono text-[11px] text-muted-foreground">
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
