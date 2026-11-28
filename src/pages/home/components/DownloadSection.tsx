import { m } from 'framer-motion'
import { Apple, Download, Monitor, Smartphone, Terminal } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import logo from '@/assets/images/logo.png'
import BlurInText from '@/components/website/BlurInText'
import { reveal } from '@/lib/motion'
import { cn } from '@/lib/utils'
import { isMobileDevice } from '@/utils/systemDetection'

// The home page's only platform list: each chip opens the download page on that platform.
const PLATFORMS = [
  { id: 'macos', icon: Apple },
  { id: 'windows', icon: Monitor },
  { id: 'linux', icon: Terminal },
  { id: 'mobile', icon: Smartphone }
] as const

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
      data-dock-hide=""
      className="relative isolate overflow-hidden border-t border-border py-24 sm:py-32">
      <m.div {...reveal()} className="site-container flex flex-col items-center text-center">
        {/* The app icon is full-bleed artwork, so it is the tile rather than sitting inside one. */}
        <img src={logo} alt="" className="mb-8 size-16 rounded-2xl shadow-(--shadow-float)" />
        <h2 id="home-download-heading" className="max-w-3xl text-5xl font-display text-balance sm:text-7xl">
          <BlurInText text={t('home_page.cta_download')} />
        </h2>
        <ul className="mt-5 flex flex-wrap items-center justify-center gap-2" aria-label={t('home_page.platforms')}>
          {PLATFORMS.map(({ id, icon: Icon }) => (
            <li key={id}>
              <Link
                to={`/download?platform=${id}`}
                className="inline-flex h-8 items-center gap-1.5 rounded-full border border-border px-3 text-xs font-medium text-muted-foreground transition-colors hover:border-hairline-strong hover:text-foreground focus-visible:outline-2 focus-visible:outline-primary">
                <Icon className="size-3.5" aria-hidden="true" />
                {t(`download_page.platform_${id}`)}
              </Link>
            </li>
          ))}
        </ul>
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
