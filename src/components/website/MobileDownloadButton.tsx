import * as Popover from '@radix-ui/react-popover'
import { Smartphone } from 'lucide-react'
import { QRCodeSVG } from 'qrcode.react'
import { type PointerEvent, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components/ui/button'
import { mobileDownloads } from '@/config/mobileDownloads'

export default function MobileDownloadButton() {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const openedByHoverRef = useRef(false)
  const closeTimerRef = useRef<number | null>(null)

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
    if (event.pointerType !== 'mouse' || !openedByHoverRef.current) return
    cancelClose()
    // Keep the panel open while the pointer crosses the gap below the button.
    closeTimerRef.current = window.setTimeout(() => {
      if (openedByHoverRef.current) setOpen(false)
    }, 180)
  }

  return (
    <Popover.Root open={open} onOpenChange={handleOpenChange}>
      <Popover.Trigger asChild>
        <Button
          type="button"
          variant="outline"
          size="lg"
          onPointerEnter={(event) => {
            if (event.pointerType !== 'mouse') return
            cancelClose()
            if (!open) {
              openedByHoverRef.current = true
              setOpen(true)
            }
          }}
          onPointerLeave={handlePointerLeave}>
          <Smartphone aria-hidden="true" />
          {t('mobile_download.button')}
        </Button>
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
          <div className="grid grid-cols-2 gap-5 text-center">
            {mobileDownloads.map(({ platform, channel, url }) => {
              const name = platform === 'android' ? 'Android' : 'iOS'
              const description = t(`mobile_download.${channel}`)

              return (
                <div key={platform} className="min-w-0">
                  <p className="mb-3 text-sm font-semibold">{name}</p>
                  {url ? (
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
                  <p className="text-muted-foreground mt-3 text-xs">{description}</p>
                </div>
              )
            })}
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}
