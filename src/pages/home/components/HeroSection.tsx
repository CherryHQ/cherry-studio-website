import { ArrowDown, ArrowRight, Download, History } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { fetchNotice, type NoticeResponse } from '@/assets/js/notice'
import MobileDownloadButton from '@/components/website/MobileDownloadButton'
import { useVersionData } from '@/hooks/useVersionData'
import { isMobileDevice } from '@/utils/systemDetection'
import { getDocsUrl, isEnglishSite } from '@/utils/urls'
import WorkspacePanel from './WorkspacePanel'

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
    <section className="relative overflow-hidden border-b border-border bg-background text-foreground">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-[40%] hidden w-[70%] [mask-image:linear-gradient(to_right,transparent,black_34%)] lg:block">
        <div className="absolute -top-16 left-10 grid w-[1000px] origin-center -rotate-[24deg] skew-x-[22deg] grid-cols-12 border-t border-l border-border/70">
          {Array.from({ length: 96 }, (_, index) => (
            <span
              key={index}
              className={
                [9, 20, 21, 31, 42, 43, 56, 67, 69, 77, 89, 91].includes(index)
                  ? 'relative z-10 aspect-square -translate-x-1.5 -translate-y-1.5 border border-input/65 bg-secondary shadow-[5px_5px_0_var(--border)]'
                  : 'aspect-square border-r border-b border-border/70'
              }
            />
          ))}
        </div>
      </div>
      <div className="site-container site-split site-section relative">
        <div className="min-w-0">
          <Link
            to="/download"
            className="mb-6 inline-flex flex-wrap items-center gap-2 rounded-md border border-border bg-card px-2 py-1 font-mono text-xs text-muted-foreground transition-colors duration-300 hover:border-primary/60 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
            <span className="size-1.5 rounded-full bg-primary" aria-hidden="true" />
            <span>
              {versionData?.version ? `Cherry Studio ${versionData.version}` : t('mobile_download.desktop_title')}
            </span>
            {versionData?.version && <span className="text-primary">{t('stable_badge')}</span>}
          </Link>

          <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl xl:text-6xl">
            <span className="block">{t('home_page.title_first')}</span>
            <span className="mt-2 block text-foreground">{t('home_page.title_second')}</span>
          </h1>
          <p className="mt-5 max-w-lg text-pretty text-base text-muted-foreground sm:text-lg">{t('home_page.intro')}</p>

          {notice?.status && notice.notice && (
            <p className="mt-4 text-muted-foreground" style={{ fontSize: notice.text_size }}>
              {notice.notice}
            </p>
          )}

          <div className="mt-6 flex flex-wrap items-center gap-3">
            {isMobile ? (
              <MobileDownloadButton
                variant="primary"
                className="rounded-md bg-foreground px-4 font-semibold text-background hover:bg-foreground/85"
              />
            ) : (
              <Link
                to="/download"
                data-ph-no-autocapture=""
                className="inline-flex items-center gap-2 rounded-md bg-foreground px-4 py-2.5 text-base font-semibold text-background transition-colors duration-300 hover:bg-foreground/85 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary active:translate-y-px">
                <Download className="size-4" aria-hidden="true" />
                {t('home_page.download_desktop')}
              </Link>
            )}
            <a
              href="#home-capabilities"
              className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2.5 text-sm font-semibold text-foreground transition-colors duration-300 hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary active:translate-y-px">
              {t('home_page.explore')}
              <ArrowDown className="size-3.5" aria-hidden="true" />
            </a>
          </div>

          <p className="mt-4 font-mono text-xs text-muted-foreground">{t('home_page.platforms')}</p>

          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
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

        <WorkspacePanel />
      </div>
    </section>
  )
}
