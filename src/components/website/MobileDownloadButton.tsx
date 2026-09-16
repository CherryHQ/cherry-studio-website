import * as Popover from '@radix-ui/react-popover'
import { Smartphone } from 'lucide-react'
import { QRCodeSVG } from 'qrcode.react'
import { type PointerEvent, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Button, buttonVariants } from '@/components/ui/button'
import { mobileDownloads } from '@/config/mobileDownloads'
import { cn } from '@/lib/utils'
import { detectMobilePlatform, isMobileDevice } from '@/utils/systemDetection'

interface MobileDownloadButtonProps {
  variant?: 'text' | 'primary'
}

export default function MobileDownloadButton({ variant = 'text' }: MobileDownloadButtonProps) {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const openedByHoverRef = useRef(false)
  const closeTimerRef = useRef<number | null>(null)
  const isMobile = isMobileDevice()
  const mobilePlatform = detectMobilePlatform()
  const currentDownload = mobileDownloads.find(({ platform }) => platform === mobilePlatform)
  const isPrimary = variant === 'primary'

  const cancelClose = () => {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current)
      closeTimerRef.current = null
    }
  }

  useEffect(() => cancelClose, [])

  const handleOpenChange = (nextOpen: boolean) => {
    cancelClose()
    if (nextOpen) openedByHoverRef.current = false
    setOpen(nextOpen)
  }

  const handlePointerLeave = (event: PointerEvent<HTMLElement>) => {
    if (isMobile || event.pointerType !== 'mouse' || !openedByHoverRef.current) return
    cancelClose()
    // Keep the panel open while the pointer crosses the gap below the button.
    closeTimerRef.current = window.setTimeout(() => {
      if (openedByHoverRef.current) setOpen(false)
    }, 180)
  }

  if (isPrimary && currentDownload?.url) {
    return (
      <Button variant="glow" size="lg" asChild>
        <a href={currentDownload.url}>
          <Smartphone aria-hidden="true" />
          {currentDownload.platform === 'android' ? 'Android' : 'iOS'}
          <span aria-hidden="true">·</span>
          {t(`mobile_download.direct_${currentDownload.channel}`)}
        </a>
      </Button>
    )
  }

  return (
    <Popover.Root open={open} onOpenChange={handleOpenChange}>
      <Popover.Trigger asChild>
        <button
          type="button"
          className={cn(
            isPrimary
              ? buttonVariants({ variant: 'glow', size: 'lg' })
              : 'hover:text-foreground inline-flex cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-md py-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
          )}
          onPointerEnter={(event) => {
            if (isMobile || event.pointerType !== 'mouse') return
            cancelClose()
            if (!open) {
              openedByHoverRef.current = true
              setOpen(true)
            }
          }}
          onPointerLeave={handlePointerLeave}>
          <Smartphone aria-hidden="true" className="h-3.5 w-3.5" />
          {t(isMobile && !isPrimary ? 'mobile_download.other_platforms' : 'mobile_download.button')}
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          aria-label={t('mobile_download.button')}
          sideOffset={10}
          collisionPadding={12}
          onPointerEnter={cancelClose}
          onPointerLeave={handlePointerLeave}
          onFocusCapture={() => {
            openedByHoverRef.current = false
            cancelClose()
          }}
          onOpenAutoFocus={(event) => {
            if (openedByHoverRef.current) event.preventDefault()
          }}
          onCloseAutoFocus={(event) => {
            if (openedByHoverRef.current) event.preventDefault()
          }}
          className="border-border bg-popover text-popover-foreground z-50 w-96 max-w-[calc(100vw-24px)] rounded-2xl border p-5 shadow-xl outline-none">
          <div className={cn('grid gap-5 text-center', !isMobile && 'grid-cols-2')}>
            {mobileDownloads.map(({ platform, channel, url }) => {
              const name = platform === 'android' ? 'Android' : 'iOS'
              const description = t(`mobile_download.${channel}`)

              return (
                <div key={platform} className="min-w-0">
                  <p className="mb-3 text-sm font-semibold">{name}</p>
                  {isMobile ? (
                    <Button
                      variant={platform === mobilePlatform ? 'default' : 'outline'}
                      className="w-full"
                      disabled={!url}
                      asChild={Boolean(url)}>
                      {url ? (
                        <a href={url}>{t(`mobile_download.direct_${channel}`)}</a>
                      ) : (
                        t('mobile_download.unavailable')
                      )}
                    </Button>
                  ) : url ? (
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${name} · ${description}`}
                      className="focus-visible:ring-ring block rounded-xl bg-white p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2">
                      <QRCodeSVG
                        value={url}
                        size={160}
                        level="M"
                        marginSize={4}
                        title={t('mobile_download.qr_alt', { platform: name })}
                        className="h-auto w-full"
                      />
                    </a>
                  ) : (
                    <div className="bg-muted text-muted-foreground flex aspect-square items-center justify-center rounded-xl px-3 text-xs">
                      {t('mobile_download.unavailable')}
                    </div>
                  )}
                  {!isMobile && <p className="text-muted-foreground mt-3 text-xs">{description}</p>}
                </div>
              )
            })}
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}
