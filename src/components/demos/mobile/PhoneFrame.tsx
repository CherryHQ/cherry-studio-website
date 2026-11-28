import { RotateCcw } from 'lucide-react'
import { type ReactNode, useLayoutEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { cn } from '@/lib/utils'

/** iPhone 15 Pro logical size; screens are laid out in these points and scaled to the frame width. */
export const SCREEN_WIDTH = 393
export const SCREEN_HEIGHT = 852
export const STATUS_BAR_HEIGHT = 54
export const HOME_INSET = 34

interface PhoneFrameProps {
  children: ReactNode
  /** Rendered above the screen content and below the status bar, e.g. a sheet with its scrim. */
  overlay?: ReactNode
  className?: string
  screenClassName?: string
  /** `light` draws white status bar glyphs for a dark screen such as the camera. */
  statusBar?: 'auto' | 'light'
  onReplay?: () => void
  /** Hide the replay row, for placements that replay on their own. */
  bare?: boolean
}

/**
 * An iPhone bezel whose screen is a 393×852pt canvas scaled to fit, so the app's real point sizes
 * (16pt body, 44pt controls) keep their proportions. Children fill the whole screen under the status bar.
 */
export default function PhoneFrame({
  children,
  overlay,
  className,
  screenClassName,
  statusBar = 'auto',
  onReplay,
  bare
}: PhoneFrameProps) {
  const { t } = useTranslation()
  const screen = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0.76)

  useLayoutEffect(() => {
    const node = screen.current
    if (!node) return
    const observer = new ResizeObserver(() => setScale(node.clientWidth / SCREEN_WIDTH))
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <figure className={cn('mx-auto w-full max-w-[320px] min-w-0', className)}>
      <div className="relative w-full rounded-[52px] p-[10px] bg-[linear-gradient(150deg,#3a3a3e_0%,#1b1b1d_38%,#141416_62%,#2e2e32_100%)] shadow-[0_0_0_1px_rgb(0_0_0/0.35),0_30px_60px_-30px_rgb(0_0_0/0.65)] dark:shadow-[0_0_0_1px_rgb(255_255_255/0.22),0_0_90px_-12px_rgb(255_255_255/0.14),0_40px_80px_-30px_rgb(0_0_0/0.9)]">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-[3px] rounded-[49px] border border-white/[0.12] dark:border-white/[0.18]"
        />
        <div
          ref={screen}
          className="relative aspect-[393/852] w-full overflow-hidden rounded-[42px] bg-black ring-1 ring-white/[0.08]">
          <div
            style={{ width: SCREEN_WIDTH, height: SCREEN_HEIGHT, transform: `scale(${scale})` }}
            className={cn(
              'absolute top-0 left-0 origin-top-left overflow-hidden bg-[#f9f9f9] text-[16px] leading-6 text-[#171717] antialiased [font-family:-apple-system,BlinkMacSystemFont,"SF_Pro_Text","Segoe_UI",Roboto,"PingFang_SC","Noto_Sans_SC",sans-serif] dark:bg-black dark:text-[#ededed]',
              screenClassName
            )}>
            <div className="absolute inset-0">{children}</div>
            {overlay}
            <StatusBar light={statusBar === 'light'} />
            <span
              aria-hidden="true"
              className={cn(
                'pointer-events-none absolute bottom-2 left-1/2 z-50 h-[5px] w-[139px] -translate-x-1/2 rounded-full',
                statusBar === 'light' ? 'bg-white' : 'bg-black dark:bg-white'
              )}
            />
          </div>
        </div>
      </div>
      {!bare && onReplay && (
        <figcaption className="mt-3 flex items-center justify-end gap-3 px-1 text-xs text-muted-foreground">
          <button
            type="button"
            onClick={onReplay}
            className="inline-flex shrink-0 cursor-pointer items-center gap-1 rounded-sm whitespace-nowrap hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
            <RotateCcw className="size-3" aria-hidden="true" />
            {t('demos.replay')}
          </button>
        </figcaption>
      )}
    </figure>
  )
}

/** iOS status bar: time left of the Dynamic Island, signal, Wi-Fi and battery to its right. */
function StatusBar({ light }: { light: boolean }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute inset-x-0 top-0 z-50 flex h-[54px] items-center justify-between',
        light ? 'text-white' : 'text-black dark:text-white'
      )}>
      <span className="w-[133px] pt-1 text-center text-[17px] leading-none font-semibold tracking-[-0.02em] tabular-nums">
        9:41
      </span>
      <span className="absolute top-[11px] left-1/2 h-[37px] w-[126px] -translate-x-1/2 rounded-full bg-black" />
      <span className="flex w-[133px] items-center justify-center gap-[6px] pt-1">
        <svg viewBox="0 0 18 12" className="h-[11px] w-[17px]" fill="currentColor">
          <rect x="0" y="8" width="3" height="4" rx="1" />
          <rect x="5" y="5.5" width="3" height="6.5" rx="1" />
          <rect x="10" y="3" width="3" height="9" rx="1" />
          <rect x="15" y="0" width="3" height="12" rx="1" />
        </svg>
        <svg viewBox="0 0 16 12" className="h-[11px] w-[15px]" fill="currentColor">
          <path d="M8 2.3c2.2 0 4.2.8 5.8 2.2l1.2-1.2A10 10 0 0 0 8 .6 10 10 0 0 0 1 3.3l1.2 1.2A8.3 8.3 0 0 1 8 2.3Zm0 3.4c1.3 0 2.5.5 3.4 1.3l1.2-1.2A6.6 6.6 0 0 0 8 4a6.6 6.6 0 0 0-4.6 1.8L4.6 7c.9-.8 2.1-1.3 3.4-1.3ZM8 9.1c-.5 0-1 .2-1.3.5L8 10.9l1.3-1.3c-.3-.3-.8-.5-1.3-.5Z" />
        </svg>
        <span className="relative flex h-[13px] w-[27px] items-center rounded-[4px] border border-current/40 p-[2px]">
          <span className="h-full w-full rounded-[2px] bg-current" />
          <span className="absolute top-1/2 -right-[3px] h-[4px] w-[1.5px] -translate-y-1/2 rounded-r-sm bg-current/40" />
        </span>
      </span>
    </div>
  )
}
