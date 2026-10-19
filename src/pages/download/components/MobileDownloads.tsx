import { Download, FlaskConical } from 'lucide-react'
import { QRCodeSVG } from 'qrcode.react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import StoreDownloadBadge from '@/components/website/StoreDownloadBadge'
import { useMobileDownloads } from '@/hooks/useMobileDownloads'
import { cn } from '@/lib/utils'
import { isMobileDevice } from '@/utils/systemDetection'

type MobileDownload = ReturnType<typeof useMobileDownloads>[number]
type Platform = MobileDownload['platform']
type Channel = MobileDownload['channel']

const storeNames: Record<Platform, string> = { android: 'Google Play', ios: 'App Store' }
const channelNames: Record<Exclude<Channel, 'store'>, string> = { apk: 'APK', testflight: 'TestFlight' }

function channelLabel({ platform, channel }: MobileDownload) {
  return channel === 'store' ? storeNames[platform] : channelNames[channel]
}

function ChannelButton(download: MobileDownload) {
  const { t } = useTranslation()
  const { channel, url } = download
  const Icon = channel === 'apk' ? Download : FlaskConical

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t(`mobile_download.direct_${channel}`)}
      className="border-border bg-background hover:bg-secondary/60 focus-visible:ring-ring inline-flex h-12 w-44 items-center gap-3 rounded-xl border px-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2">
      <Icon aria-hidden="true" className="h-5 w-5 shrink-0" />
      <span className="flex min-w-0 flex-col leading-none">
        <span className="text-muted-foreground text-[10px] font-medium">{t(`mobile_page.channels.${channel}`)}</span>
        <span className="mt-1 text-[15px] font-semibold">{channelLabel(download)}</span>
      </span>
    </a>
  )
}

export default function MobileDownloads() {
  const { t } = useTranslation()
  const mobileDownloads = useMobileDownloads()
  const isMobile = isMobileDevice()
  const [selected, setSelected] = useState<Partial<Record<Platform, Channel>>>({})
  const storeDownloads = mobileDownloads.filter(({ channel }) => channel === 'store')

  return (
    <div className="px-6 py-10 text-center sm:px-10 sm:py-12">
      <div className="flex flex-col items-center justify-center gap-10 sm:flex-row sm:items-start sm:gap-20">
        {storeDownloads.map((store) => {
          const name = store.platform === 'android' ? 'Android' : 'iPhone / iPad'
          const options = mobileDownloads.filter(({ platform, url }) => platform === store.platform && url)
          const current = options.find(({ channel }) => channel === selected[store.platform]) ?? store

          return (
            <section key={store.platform} aria-label={name} className="flex flex-col items-center gap-5">
              {options.length > 1 && (
                <div role="group" aria-label={name} className="bg-secondary inline-flex rounded-lg p-0.5 text-xs">
                  {options.map((option) => (
                    <button
                      key={option.channel}
                      type="button"
                      aria-pressed={option.channel === current.channel}
                      onClick={() => setSelected((value) => ({ ...value, [store.platform]: option.channel }))}
                      className={cn(
                        'text-muted-foreground hover:text-foreground focus-visible:ring-ring rounded-md px-3 py-1 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2',
                        option.channel === current.channel && 'bg-background text-foreground shadow-sm'
                      )}>
                      {channelLabel(option)}
                    </button>
                  ))}
                </div>
              )}
              {!isMobile && current.url && (
                <div className="rounded-xl bg-white p-2 ring-1 ring-black/5">
                  <QRCodeSVG
                    value={current.url}
                    size={136}
                    level="M"
                    marginSize={1}
                    title={t('mobile_download.qr_alt', { platform: name })}
                  />
                </div>
              )}
              {!current.url ? (
                <span className="text-muted-foreground text-sm">{t('mobile_download.unavailable')}</span>
              ) : current.channel === 'store' ? (
                <StoreDownloadBadge platform={current.platform} url={current.url} />
              ) : (
                <ChannelButton {...current} />
              )}
            </section>
          )
        })}
      </div>
    </div>
  )
}
