import { m, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, History } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { fetchNotice, type NoticeResponse } from '@/assets/js/notice'
import AgentDelegationDemo from '@/components/demos/agents/AgentDelegationDemo'
import BlurInText from '@/components/website/BlurInText'
import HeroBackdrop from '@/components/website/HeroBackdrop'
import MobileDownloadButton from '@/components/website/MobileDownloadButton'
import ParticleTitle from '@/components/website/ParticleTitle'
import { useVersionData } from '@/hooks/useVersionData'
import { spring } from '@/lib/motion'
import { cn } from '@/lib/utils'
import { isMobileDevice } from '@/utils/systemDetection'
import { getDocsUrl, isEnglishSite } from '@/utils/urls'

/**
 * The opening reads like unwrapping a gift: a sunlit colour panel, the wordmark assembling out of scattered dots, and
 * the app window resting over it. Scrolling lifts the window over the wordmark and opens onto the page below.
 */
const EXPAND_SCREENS = 0.6
// Height kept clear at the bottom of the screen for the download dock.
const DOCK_SPACE = 104

export default function HeroSection() {
  const { t, i18n } = useTranslation()
  const { versionData } = useVersionData()
  const [notice, setNotice] = useState<NoticeResponse['data'] | null>(null)

  const language = i18n.resolvedLanguage || i18n.language
  const isEn = isEnglishSite(language)
  const isMobile = isMobileDevice()
  const stableMajorVersion = Number(versionData?.version.match(/^v?(\d+)\./)?.[1])

  const reduced = useReducedMotion() ?? false
  const headline = useRef<HTMLDivElement>(null)
  const frame = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()
  // Over the first ~60% of a screen of scrolling the stage stays pinned: the headline lifts away while the window
  // grows from resting under the wordmark to filling the screen, centred.
  const progress = useTransform(scrollY, (y) => {
    const p = Math.min(1, Math.max(0, y / (window.innerHeight * EXPAND_SCREENS)))
    return 1 - (1 - p) ** 3
  })
  // Start: tucked under the wordmark. End: as large as fits above the download dock, centred in that space.
  const layout = () => {
    const stage = frame.current?.parentElement?.clientHeight ?? window.innerHeight
    const height = frame.current?.offsetHeight || 1
    const room = stage - DOCK_SPACE - 16
    const endScale = Math.min(1, room / height)
    return {
      startScale: Math.min(window.innerWidth < 768 ? 0.94 : 0.72, endScale),
      endScale,
      startY: (headline.current?.offsetHeight ?? 0) - Math.min(96, Math.max(36, window.innerWidth * 0.066)),
      endY: 16 + Math.max(0, (room - height * endScale) / 2)
    }
  }
  const windowScale = useTransform(progress, (p) => {
    const { startScale, endScale } = layout()
    return startScale + (endScale - startScale) * p
  })
  const windowY = useTransform(progress, (p) => {
    const { startY, endY } = layout()
    return startY + (endY - startY) * p
  })
  const headlineY = useTransform(progress, [0, 1], [0, -80])
  const headlineOpacity = useTransform(progress, [0, 0.6], [1, 0])

  useEffect(() => {
    let active = true
    void fetchNotice().then((result) => {
      if (active) setNotice(result)
    })
    return () => {
      active = false
    }
  }, [language])

  return (
    <>
      <section
        className="relative isolate bg-background"
        style={
          reduced ? undefined : { height: `calc(100svh - var(--site-header-height) + ${EXPAND_SCREENS * 100}svh)` }
        }>
        <div
          className={cn(
            // Clip sideways only, so the window's soft shadow fades out instead of ending on the stage's bottom edge.
            'overflow-x-clip',
            !reduced && 'sticky top-(--site-header-height) h-[calc(100svh-var(--site-header-height))]'
          )}>
          <HeroBackdrop className="inset-0 -z-10 [mask-image:linear-gradient(to_bottom,#000_45%,transparent)]" />
          <m.div
            ref={headline}
            style={reduced ? undefined : { y: headlineY, opacity: headlineOpacity }}
            className="site-container flex flex-col items-center pt-10 text-center text-white sm:pt-14">
            <h1 className="w-full max-w-6xl">
              <span className="block text-[clamp(24px,3vw,44px)] leading-tight font-accent text-balance">
                <BlurInText text={`${t('home_page.title_first')}${isEn ? ' ' : ''}${t('home_page.title_second')}`} />
              </span>
              <span className="sr-only">Cherry Studio</span>
              <ParticleTitle
                className="mt-1 h-[clamp(110px,19vw,290px)]"
                density={1 / 210}
                lines={[{ text: 'Cherry Studio', font: '650 {size}px "Inter Tight", sans-serif' }]}
              />
            </h1>
            {notice?.status && notice.notice && (
              <p className="mt-2" style={{ color: notice.text_color, fontSize: notice.text_size }}>
                {notice.notice}
              </p>
            )}
          </m.div>

          <m.div
            ref={frame}
            style={reduced ? undefined : { y: windowY, scale: windowScale }}
            className={cn(
              'z-10 w-[min(1480px,calc(100vw-32px))] origin-top text-left sm:w-[min(1480px,calc(100vw-48px))]',
              reduced ? 'mx-auto -mt-[clamp(36px,6.6vw,96px)] pb-6' : 'absolute inset-x-0 top-0 mx-auto'
            )}>
            <m.div
              initial={{ opacity: 0, y: 120 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...spring.gentle, delay: 0.1 }}>
              <AgentDelegationDemo bezel />
            </m.div>
          </m.div>
        </div>
      </section>

      <div className="site-container flex flex-col items-center pt-12 pb-20 text-center sm:pb-28">
        <p className="max-w-2xl text-pretty text-base text-muted-foreground sm:text-lg zh:leading-[1.8]">
          {t('home_page.intro')}
        </p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
          {versionData?.version && (
            <Link to="/download" className="rounded-sm hover:text-foreground focus-visible:outline-2">
              {t('stable_badge')} · Cherry Studio {versionData.version}
            </Link>
          )}
          {!isMobile && <MobileDownloadButton className="hover:text-foreground" />}
          {!isEn && isMobile && (
            <Link to="/download" className="rounded-sm hover:text-foreground focus-visible:outline-2">
              {t('mobile_download.desktop')}
            </Link>
          )}
          {!isEn && !isMobile && stableMajorVersion >= 2 && (
            <Link
              to="/download/v1"
              className="inline-flex items-center gap-1.5 rounded-sm hover:text-foreground focus-visible:outline-2">
              <History className="size-3.5" aria-hidden="true" />
              {t('download_v1')}
            </Link>
          )}
          {!isEn && (
            <a
              href={getDocsUrl(language)}
              className="inline-flex items-center gap-1.5 rounded-sm hover:text-foreground focus-visible:outline-2">
              {t('nav.docs')}
              <ArrowRight className="size-3.5" aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </>
  )
}
