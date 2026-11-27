import { m } from 'framer-motion'
import { Download, Smartphone } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import logo from '@/assets/images/logo.png'
import { reveal } from '@/lib/motion'
import { cn } from '@/lib/utils'
import { isMobileDevice } from '@/utils/systemDetection'

export default function DownloadSection() {
  const { t } = useTranslation()
  const isMobile = isMobileDevice()
  const actions = [
    { href: '/download', label: t('home_page.download_desktop'), icon: Download },
    { href: '/mobile', label: t('mobile_download.button'), icon: Smartphone }
  ]

  return (
    <section
      aria-labelledby="home-download-heading"
      className="relative isolate overflow-hidden border-t border-border py-24 sm:py-32">
      <m.div {...reveal()} className="site-container flex flex-col items-center text-center">
        <span className="relative mb-8 flex size-16 items-center justify-center rounded-2xl border border-border bg-card">
          <img src={logo} alt="" className="size-10 rounded-xl" />
        </span>
        <h2 id="home-download-heading" className="max-w-3xl text-5xl font-display text-balance sm:text-7xl">
          {t('home_page.cta_download')}
        </h2>
        <p className="mt-4 font-mono text-xs text-muted-foreground">{t('home_page.platforms')}</p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          {(isMobile ? [actions[1], actions[0]] : actions).map(({ href, label, icon: Icon }, index) => (
            <Link
              key={href}
              to={href}
              className={cn(
                'inline-flex h-11 items-center gap-2 rounded-full px-6 text-sm font-semibold transition-[background-color,border-color,transform] duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary active:scale-[0.97]',
                index === 0
                  ? 'bg-foreground text-background hover:bg-foreground/85'
                  : 'border border-border bg-surface-glass text-foreground backdrop-blur hover:border-hairline-strong hover:bg-accent'
              )}>
              <Icon className="size-4" aria-hidden="true" />
              {label}
            </Link>
          ))}
        </div>
      </m.div>
    </section>
  )
}
