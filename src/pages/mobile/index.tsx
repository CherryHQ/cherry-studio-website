import { ArrowUpRight, Download, MessageSquare, Palette, Plug } from 'lucide-react'
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
  const [isCompact, setIsCompact] = useState(() => window.matchMedia('(max-width: 639px)').matches)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const compactQuery = window.matchMedia('(max-width: 639px)')
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updateLayout = () => setIsCompact(compactQuery.matches)
    const updateMotion = () => setPrefersReducedMotion(motionQuery.matches)

    compactQuery.addEventListener('change', updateLayout)
    motionQuery.addEventListener('change', updateMotion)
    return () => {
      compactQuery.removeEventListener('change', updateLayout)
      motionQuery.removeEventListener('change', updateMotion)
    }
  }, [])

  useEffect(() => {
    if (!isCompact || prefersReducedMotion || isHovered) return

    const interval = window.setInterval(() => {
      if (!document.hidden) setActiveFeature((activeFeature + 1) % features.length)
    }, 5000)
    return () => window.clearInterval(interval)
  }, [isCompact, prefersReducedMotion, isHovered, activeFeature])

  return (
    <div className="bg-background text-foreground min-h-screen">
      <main className="mx-auto max-w-[1200px] px-4 pt-28 pb-12 sm:px-6 sm:pt-36 sm:pb-20 lg:px-8">
        <section className="mx-auto max-w-3xl text-center" aria-labelledby="mobile-title">
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <h1
              id="mobile-title"
              className="text-3xl leading-tight font-semibold tracking-tight text-balance sm:text-5xl">
              {t('mobile_download.title')}
            </h1>
            <span className="border-border text-muted-foreground rounded-full border px-2.5 py-1 text-xs">
              {t('mobile_page.beta')}
            </span>
          </div>
          <p className="text-muted-foreground mt-4 text-base leading-7 text-pretty sm:text-lg">
            {t('mobile_page.description')}
          </p>

          <div id="mobile-install" className="mt-8 grid scroll-mt-28 gap-4 text-left sm:grid-cols-2">
            {mobileDownloads.map(({ platform, channel, url }) => {
              const name = platform === 'android' ? 'Android' : 'iOS'
              const isCurrentPlatform = platform === mobilePlatform

              return (
                <article
                  key={platform}
                  className={cn(
                    'bg-card flex flex-wrap items-center justify-center gap-4 rounded-2xl border p-5',
                    isCurrentPlatform ? 'border-foreground/35' : 'border-border'
                  )}>
                  <div className="min-w-40 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-xl font-semibold">{name}</h2>
                      {isCurrentPlatform && (
                        <span className="text-muted-foreground text-sm">{t('mobile_page.current_device')}</span>
                      )}
                    </div>
                    <p className="text-muted-foreground mt-2 text-sm leading-6 sm:min-h-12">
                      {t(`mobile_page.channels.${channel}`)}
                    </p>
                    <Button
                      variant={isCurrentPlatform || !isMobile ? 'default' : 'outline'}
                      className="mt-4 h-auto min-h-10 w-full px-3 py-2 whitespace-normal"
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
                  </div>
                  {!isMobile && url && (
                    <div className="w-36 shrink-0 text-center">
                      <div className="rounded-lg bg-white p-2">
                        <QRCodeSVG
                          value={url}
                          size={128}
                          level="M"
                          marginSize={4}
                          title={t('mobile_download.qr_alt', { platform: name })}
                          className="h-auto w-full"
                        />
                      </div>
                      <p className="text-muted-foreground mt-2 text-sm leading-5">{t('mobile_page.scan')}</p>
                    </div>
                  )}
                </article>
              )
            })}
          </div>
          <p className="text-muted-foreground mt-4 text-sm leading-6">{t('mobile_page.setup_note')}</p>
        </section>

        <section
          aria-label={t('mobile_page.preview_label')}
          onPointerEnter={(event) => {
            if (event.pointerType === 'mouse') setIsHovered(true)
          }}
          onPointerLeave={() => setIsHovered(false)}
          className="mx-auto mt-12 max-w-5xl sm:mt-16 sm:px-4">
          <div className="mb-5 flex justify-center sm:hidden">
            <div
              role="group"
              aria-label={t('mobile_page.preview_label')}
              className="inline-flex gap-1 rounded-full border border-black/10 bg-white/80 p-1 backdrop-blur-md dark:border-white/20 dark:bg-black/40">
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
                      ? 'bg-black/10 text-black shadow-sm dark:bg-white/20 dark:text-white'
                      : 'text-muted-foreground hover:text-foreground'
                  )}>
                  <Icon aria-hidden="true" className="h-4 w-4" />
                  <span className="hidden min-[380px]:inline">{t(`mobile_page.tabs.${id}`)}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="sm:grid sm:grid-cols-3 sm:gap-10">
            {features.map(({ id, image, icon: Icon }, index) => (
              <figure
                key={id}
                id={`mobile-feature-${id}`}
                className={cn(
                  'mx-auto w-full max-w-[280px] motion-safe:animate-in motion-safe:fade-in-0 motion-safe:duration-300 sm:mx-0 sm:max-w-none sm:animate-none',
                  activeFeature !== index && 'hidden sm:block',
                  index === 1 && 'sm:pt-10'
                )}>
                <img
                  src={image}
                  alt={t(`mobile_page.features.${id}.alt`)}
                  width={736}
                  height={1600}
                  loading={index === 0 ? 'eager' : 'lazy'}
                  className="border-border h-auto w-full rounded-[2rem] border shadow-xl shadow-black/5 dark:shadow-black/30"
                />
                <figcaption className="mt-5 min-h-28 px-1 sm:min-h-0">
                  <h2 className="flex items-center gap-2 text-lg font-semibold">
                    <Icon aria-hidden="true" className="h-4 w-4" />
                    {t(`mobile_page.features.${id}.title`)}
                  </h2>
                  <p className="text-muted-foreground mt-2 text-base leading-7">
                    {t(`mobile_page.features.${id}.description`)}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
