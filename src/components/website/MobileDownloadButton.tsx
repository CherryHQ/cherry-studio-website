import { Portal as HoverCardPortal } from '@radix-ui/react-hover-card'
import { Smartphone } from 'lucide-react'
import { QRCodeSVG } from 'qrcode.react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import { useMobileDownloads } from '@/hooks/useMobileDownloads'
import { isMobileDevice } from '@/utils/systemDetection'

interface MobileDownloadButtonProps {
  variant?: 'text' | 'primary'
}

export default function MobileDownloadButton({ variant = 'text' }: MobileDownloadButtonProps) {
  const { t } = useTranslation()
  const mobileDownloads = useMobileDownloads()
  const trigger =
    variant === 'primary' ? (
      <Button variant="glow" size="lg" asChild>
        <Link to="/mobile">
          <Smartphone aria-hidden="true" />
          {t('mobile_download.button')}
        </Link>
      </Button>
    ) : (
      <Link
        to="/mobile"
        className="hover:text-foreground inline-flex items-center gap-1.5 whitespace-nowrap rounded-md py-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
        <Smartphone aria-hidden="true" className="h-3.5 w-3.5" />
        {t('mobile_download.button')}
      </Link>
    )

  if (isMobileDevice()) return trigger

  return (
    <HoverCard openDelay={150} closeDelay={180}>
      <HoverCardTrigger asChild>{trigger}</HoverCardTrigger>
      <HoverCardPortal>
        <HoverCardContent
          side="bottom"
          sideOffset={10}
          collisionPadding={12}
          className="border-border w-96 max-w-[calc(100vw-24px)] rounded-2xl p-5">
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
                    <div className="bg-muted text-muted-foreground flex aspect-square items-center justify-center rounded-xl px-3 text-sm">
                      {t('mobile_download.unavailable')}
                    </div>
                  )}
                  <p className="text-muted-foreground mt-3 text-sm">{description}</p>
                </div>
              )
            })}
          </div>
        </HoverCardContent>
      </HoverCardPortal>
    </HoverCard>
  )
}
