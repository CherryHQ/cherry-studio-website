import * as Popover from '@radix-ui/react-popover'
import { ArrowUpRight, Download, MessageSquare, Palette, Plug, QrCode } from 'lucide-react'
import { QRCodeSVG } from 'qrcode.react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import chatScreenshot from '@/assets/images/screenshots/mobile/chat.png'
import paintingsScreenshot from '@/assets/images/screenshots/mobile/paintings.png'
import pluginsScreenshot from '@/assets/images/screenshots/mobile/plugins.png'
import { Button } from '@/components/ui/button'
import Footer from '@/components/website/Footer'
import { mobileDownloads } from '@/config/mobileDownloads'
import { usePageMeta } from '@/hooks/usePageMeta'
import { cn } from '@/lib/utils'
import { detectMobilePlatform, isMobileDevice } from '@/utils/systemDetection'

const features = [
  { id: 'chat', image: chatScreenshot, icon: MessageSquare },
  { id: 'paintings', image: paintingsScreenshot, icon: Palette },
  { id: 'plugins', image: pluginsScreenshot, icon: Plug }
] as const

export default function MobilePage() {
  const { t } = useTranslation()
  usePageMeta('mobile')
  const mobilePlatform = detectMobilePlatform()
  const isMobile = isMobileDevice()
  const [activeFeature, setActiveFeature] = useState(0)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updateMotion = () => setPrefersReducedMotion(motionQuery.matches)

    motionQuery.addEventListener('change', updateMotion)
    return () => motionQuery.removeEventListener('change', updateMotion)
  }, [])

  useEffect(() => {
    if (prefersReducedMotion || isHovered) return

    const interval = window.setInterval(() => {
      if (!document.hidden) setActiveFeature((activeFeature + 1) % features.length)
    }, 5000)
    return () => window.clearInterval(interval)
  }, [prefersReducedMotion, isHovered, activeFeature])

  return (
    <div className="bg-background text-foreground min-h-screen">
      <main className="mx-auto grid max-w-6xl items-center gap-12 px-4 pt-28 pb-16 sm:px-6 sm:pt-32 sm:pb-20 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <section
          aria-labelledby="mobile-title"
          className="mx-auto w-full max-w-[360px] text-center lg:order-2 lg:mx-0 lg:text-left">
          <span className="text-muted-foreground text-sm font-medium">{t('mobile_page.beta')}</span>
          <h1 id="mobile-title" className="mt-2 text-3xl leading-tight font-semibold tracking-tight text-balance">
            {t('mobile_download.title')}
          </h1>
          <p className="text-muted-foreground mt-3 text-base leading-7 text-pretty">{t('mobile_page.description')}</p>

          <div
            id="mobile-install"
            className="divide-border border-border mt-6 scroll-mt-28 divide-y border-y text-left">
            {mobileDownloads.map(({ platform, channel, url }) => {
              const name = platform === 'android' ? 'Android' : 'iOS'
              const isCurrentPlatform = platform === mobilePlatform

              return (
                <div key={platform} className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3 py-4">
                  <div className="min-w-32 flex-1">
                    <h2 className="text-base font-medium">{name}</h2>
                    <p className="text-muted-foreground mt-1 text-sm leading-5">
                      {t(`mobile_page.channels.${channel}`)}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <Button
                      variant={isCurrentPlatform ? 'default' : 'outline'}
                      className="h-auto min-h-10 px-3 py-1.5 lg:min-h-9"
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
                    {!isMobile && url && (
                      <Popover.Root>
                        <Popover.Trigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="lg:h-9 lg:w-9"
                            aria-label={`${name} · ${t('mobile_page.scan')}`}
                            title={t('mobile_page.scan')}>
                            <QrCode aria-hidden="true" />
                          </Button>
                        </Popover.Trigger>
                        <Popover.Portal>
                          <Popover.Content
                            side="bottom"
                            align="end"
                            sideOffset={10}
                            collisionPadding={16}
                            aria-label={t('mobile_download.qr_alt', { platform: name })}
                            className="border-border bg-popover text-popover-foreground z-50 rounded-2xl border p-4 text-center shadow-lg outline-none">
                            <p className="mb-3 text-sm font-medium">{name}</p>
                            <div className="rounded-lg bg-white p-2">
                              <QRCodeSVG
                                value={url}
                                size={160}
                                level="M"
                                marginSize={4}
                                title={t('mobile_download.qr_alt', { platform: name })}
                              />
                            </div>
                            <p className="text-muted-foreground mt-3 text-sm">{t(`mobile_download.${channel}`)}</p>
                          </Popover.Content>
                        </Popover.Portal>
                      </Popover.Root>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
          <p className="text-muted-foreground mt-4 text-sm leading-5">{t('mobile_page.setup_note')}</p>
        </section>

        <section
          aria-label={t('mobile_page.preview_label')}
          onPointerEnter={(event) => {
            if (event.pointerType === 'mouse') setIsHovered(true)
          }}
          onPointerLeave={() => setIsHovered(false)}
          className="mx-auto w-full max-w-sm lg:order-1">
          {features.map(({ id, image }, index) => (
            <figure
              key={id}
              id={`mobile-feature-${id}`}
              className={cn(
                'mx-auto w-full max-w-[248px] motion-safe:animate-in motion-safe:fade-in-0 motion-safe:duration-300 sm:max-w-[260px]',
                activeFeature !== index && 'hidden'
              )}>
              <img
                src={image}
                alt={t(`mobile_page.features.${id}.alt`)}
                width={736}
                height={1600}
                loading={index === 0 ? 'eager' : 'lazy'}
                className="border-border h-auto w-full rounded-[2rem] border shadow-lg shadow-black/5 dark:shadow-black/20"
              />
              <figcaption className="text-muted-foreground mt-5 min-h-14 text-center text-sm leading-6">
                {t(`mobile_page.features.${id}.description`)}
              </figcaption>
            </figure>
          ))}
          <div className="mt-3 flex justify-center">
            <div
              role="group"
              aria-label={t('mobile_page.preview_label')}
              className="inline-flex gap-1 rounded-full border border-black/10 p-1 dark:border-white/20">
              {features.map(({ id, icon: Icon }, index) => (
                <button
                  key={id}
                  type="button"
                  aria-label={t(`mobile_page.features.${id}.title`)}
                  aria-pressed={activeFeature === index}
                  aria-controls={`mobile-feature-${id}`}
                  onClick={() => setActiveFeature(index)}
                  className={cn(
                    'focus-visible:ring-ring flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2',
                    activeFeature === index
                      ? 'bg-black/5 text-black dark:bg-white/10 dark:text-white'
                      : 'text-muted-foreground hover:text-foreground'
                  )}>
                  <Icon aria-hidden="true" className="h-4 w-4" />
                  <span>{t(`mobile_page.tabs.${id}`)}</span>
                </button>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
