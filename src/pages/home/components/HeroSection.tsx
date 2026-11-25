import { m } from 'framer-motion'
import { ArrowDown, ArrowRight, Download, History } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { fetchNotice, type NoticeResponse } from '@/assets/js/notice'
import ChatStreamDemo from '@/components/demos/chat/ChatStreamDemo'
import MobileDownloadButton from '@/components/website/MobileDownloadButton'
import SectionBackdrop from '@/components/website/SectionBackdrop'
import { useVersionData } from '@/hooks/useVersionData'
import { spring } from '@/lib/motion'
import { isMobileDevice } from '@/utils/systemDetection'
import { getDocsUrl, isEnglishSite } from '@/utils/urls'

export default function HeroSection() {
  const { t, i18n } = useTranslation()
  const { versionData } = useVersionData()
  const [notice, setNotice] = useState<NoticeResponse['data'] | null>(null)

  const language = i18n.resolvedLanguage || i18n.language
  const isEn = isEnglishSite(language)
  const isMobile = isMobileDevice()
  const stableMajorVersion = Number(versionData?.version.match(/^v?(\d+)\./)?.[1])

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
    <section className="relative isolate overflow-hidden bg-background text-foreground">
      <SectionBackdrop variant="grid-glow" />
      <div className="site-container flex flex-col items-center pt-14 pb-12 text-center sm:pt-20 lg:pt-24">
        <Link
          to="/download"
          className="glass-card mb-7 inline-flex items-center gap-2 rounded-full py-1 pr-3 pl-1.5 font-mono text-xs text-muted-foreground transition-colors duration-300 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
          <span className="rounded-full bg-primary/15 px-2 py-0.5 text-primary">
            {versionData?.version ? t('stable_badge') : 'New'}
          </span>
          <span>
            {versionData?.version ? `Cherry Studio ${versionData.version}` : t('mobile_download.desktop_title')}
          </span>
          <ArrowRight className="size-3" aria-hidden="true" />
        </Link>

        <h1 className="max-w-4xl text-5xl font-semibold tracking-[-0.035em] text-balance sm:text-6xl lg:text-7xl zh:tracking-normal">
          <span className="text-gradient block pb-1">{t('home_page.title_first')}</span>
          <span className="block bg-linear-to-r from-primary via-[color-mix(in_oklab,var(--color-primary)_60%,var(--color-violet))] to-violet bg-clip-text pb-2 text-transparent">
            {t('home_page.title_second')}
          </span>
        </h1>
        <p className="mt-6 max-w-2xl text-pretty text-base text-muted-foreground sm:text-lg zh:leading-[1.8]">
          {t('home_page.intro')}
        </p>

        {notice?.status && notice.notice && (
          <p className="mt-4" style={{ color: notice.text_color, fontSize: notice.text_size }}>
            {notice.notice}
          </p>
        )}

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {isMobile ? (
            <MobileDownloadButton
              variant="primary"
              className="rounded-full bg-foreground px-5 font-semibold text-background hover:bg-foreground/85"
            />
          ) : (
            <Link
              to="/download"
              data-ph-no-autocapture=""
              className="inline-flex h-11 items-center gap-2 rounded-full bg-foreground px-6 text-[15px] font-semibold text-background shadow-[0_8px_32px_-8px_var(--color-primary)] transition-[background-color,transform] duration-200 hover:bg-foreground/85 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary active:scale-[0.97]">
              <Download className="size-4" aria-hidden="true" />
              {t('home_page.download_desktop')}
            </Link>
          )}
          <a
            href="#home-capabilities"
            className="inline-flex h-11 items-center gap-2 rounded-full border border-border bg-surface-glass px-5 text-sm font-semibold text-foreground backdrop-blur transition-colors duration-200 hover:border-hairline-strong hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary active:scale-[0.97]">
            {t('home_page.explore')}
            <ArrowDown className="size-3.5" aria-hidden="true" />
          </a>
        </div>

        <p className="mt-5 font-mono text-xs text-muted-foreground">{t('home_page.platforms')}</p>

        <div className="mt-3 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
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

      <div className="site-container relative pb-16 sm:pb-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-[15%] top-6 -z-10 h-72 rounded-full bg-primary/25 blur-[120px] dark:bg-primary/20"
        />
        <m.div
          initial={{ opacity: 0, y: 28, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ ...spring.gentle, delay: 0.15 }}
          className="mx-auto max-w-5xl text-left">
          <ChatStreamDemo />
        </m.div>
      </div>
    </section>
  )
}
