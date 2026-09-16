import { ArrowUpRight, Download } from 'lucide-react'
import { QRCodeSVG } from 'qrcode.react'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components/ui/button'
import { mobileDownloads } from '@/config/mobileDownloads'
import { detectMobilePlatform, isMobileDevice } from '@/utils/systemDetection'

export default function MobileDownloads() {
  const { t } = useTranslation()
  const isMobile = isMobileDevice()
  const currentPlatform = detectMobilePlatform()

  return (
    <div className="p-6 sm:p-8">
      <div className="grid gap-8 sm:grid-cols-2">
        {mobileDownloads.map(({ platform, channel, url }) => {
          const name = platform === 'android' ? 'Android' : 'iOS'

          return (
            <section key={platform} className="flex min-w-0 flex-col items-center text-center">
              <h2 className="text-lg font-semibold">{name}</h2>
              <p className="text-muted-foreground mt-1 text-sm">{t(`mobile_page.channels.${channel}`)}</p>
              {!isMobile && url && (
                <div className="mt-5 rounded-xl bg-white p-2">
                  <QRCodeSVG
                    value={url}
                    size={144}
                    level="M"
                    marginSize={4}
                    title={t('mobile_download.qr_alt', { platform: name })}
                  />
                </div>
              )}
              {!isMobile && url && (
                <p className="text-muted-foreground mt-3 text-xs">{t(`mobile_download.${channel}`)}</p>
              )}
              <Button
                variant={currentPlatform === platform ? 'default' : 'outline'}
                className="mt-5"
                disabled={!url}
                asChild={Boolean(url)}>
                {url ? (
                  <a href={url}>
                    {channel === 'apk' ? <Download aria-hidden="true" /> : <ArrowUpRight aria-hidden="true" />}
                    {t(`mobile_download.direct_${channel}`)}
                  </a>
                ) : (
                  t('mobile_download.unavailable')
                )}
              </Button>
            </section>
          )
        })}
      </div>
      <p className="text-muted-foreground mt-8 text-center text-sm leading-6">{t('mobile_page.setup_note')}</p>
    </div>
  )
}
