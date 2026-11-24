import { Download, Monitor, Smartphone } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { isMobileDevice } from '@/utils/systemDetection'
import SectionBackdrop from './SectionBackdrop'

export default function DownloadSection() {
  const { t } = useTranslation()
  const isMobile = isMobileDevice()
  const actions = [
    { href: '/download', label: t('home_page.download_desktop'), icon: Monitor },
    { href: '/mobile', label: t('mobile_download.button'), icon: Smartphone }
  ]

  return (
    <section
      aria-labelledby="home-download-heading"
      className="isolate relative border-t border-border bg-card py-10 sm:py-12">
      <SectionBackdrop variant="dots" />
      <div className="site-container site-split lg:items-center">
        <div>
          <h2
            id="home-download-heading"
            className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {t('home_page.cta_download')}
          </h2>
          <p className="mt-3 font-mono text-xs text-muted-foreground">{t('home_page.platforms')}</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {(isMobile ? [actions[1], actions[0]] : actions).map(({ href, label, icon: Icon }, index) => (
            <Button
              key={href}
              asChild
              size="lg"
              variant={index === 0 ? 'default' : 'outline'}
              className="h-11 rounded-md px-4">
              <Link to={href}>
                {index === 0 ? <Download aria-hidden="true" /> : <Icon aria-hidden="true" />}
                {label}
              </Link>
            </Button>
          ))}
        </div>
      </div>
    </section>
  )
}
