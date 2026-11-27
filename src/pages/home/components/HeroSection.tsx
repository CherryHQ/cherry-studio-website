import { m, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, History } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { fetchNotice, type NoticeResponse } from '@/assets/js/notice'
import ChatStreamDemo from '@/components/demos/chat/ChatStreamDemo'
import BlurInText from '@/components/website/BlurInText'
import MobileDownloadButton from '@/components/website/MobileDownloadButton'
import ParticleTitle from '@/components/website/ParticleTitle'
import { useVersionData } from '@/hooks/useVersionData'
import { spring } from '@/lib/motion'
import { cn } from '@/lib/utils'
import { isMobileDevice } from '@/utils/systemDetection'
import { getDocsUrl, isEnglishSite } from '@/utils/urls'
import HeroBackdrop, { HERO_PALETTE } from './HeroBackdrop'

/**
 * The opening reads like unwrapping a gift: a sunlit colour panel, the wordmark assembling out of scattered dots, and
 * the app window resting over it. Scrolling lifts the window over the wordmark and opens onto the page below.
 */
export default function HeroSection() {
  const { t, i18n } = useTranslation()
  const { versionData } = useVersionData()
  const [notice, setNotice] = useState<NoticeResponse['data'] | null>(null)

  const language = i18n.resolvedLanguage || i18n.language
  const isEn = isEnglishSite(language)
  const isMobile = isMobileDevice()
  const stableMajorVersion = Number(versionData?.version.match(/^v?(\d+)\./)?.[1])

  const section = useRef<HTMLElement>(null)
  const reduced = useReducedMotion() ?? false
  const { scrollY } = useScroll()
  // The wordmark trails the scroll at half speed, so the window slides up over it.
  const wordmarkY = useTransform(scrollY, [0, 600], [0, reduced ? 0 : 300])
  const windowScale = useTransform(scrollY, [0, 400], [reduced ? 1 : 0.94, 1])

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
    <section ref={section} className={cn('relative isolate overflow-hidden bg-background', HERO_PALETTE)}>
      <HeroBackdrop className="inset-x-0 top-0 -z-10 h-[calc(100svh-var(--site-header-height)+clamp(120px,22vw,320px))]" />

      <m.div
        style={{ y: wordmarkY }}
        className="site-container flex flex-col items-center pt-10 text-center text-(--hero-ink) sm:pt-14">
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
        style={{ scale: windowScale }}
        className="site-container relative z-10 -mt-[clamp(36px,6.6vw,96px)] origin-top">
        <m.div
          initial={{ opacity: 0, y: 120 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring.gentle, delay: 0.5 }}
          className="mx-auto max-w-5xl text-left xl:max-w-6xl 2xl:max-w-7xl">
          <ChatStreamDemo />
        </m.div>
      </m.div>

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
    </section>
  )
}
