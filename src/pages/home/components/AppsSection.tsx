import { Apple, ArrowRight, Monitor, Terminal } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import chatDarkEn from '@/assets/images/screenshots/product-features-0819/chat-dark-en.webp'
import chatDarkZh from '@/assets/images/screenshots/product-features-0819/chat-dark-zh.webp'
import chatLightEn from '@/assets/images/screenshots/product-features-0819/chat-light-en.webp'
import chatLightZh from '@/assets/images/screenshots/product-features-0819/chat-light-zh.webp'
import { useTheme } from '@/hooks/useTheme'
import SectionBackdrop from './SectionBackdrop'

const platforms = [
  { id: 'macos', icon: Apple },
  { id: 'windows', icon: Monitor },
  { id: 'linux', icon: Terminal }
] as const
const platformLinkStyle =
  'inline-flex items-center gap-1 rounded-sm font-medium text-foreground underline decoration-border underline-offset-4 hover:decoration-current hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'

export default function AppsSection() {
  const { t, i18n } = useTranslation()
  const { isDark } = useTheme()
  const isZh = i18n.language.startsWith('zh')
  const desktopScreenshot = isZh ? (isDark ? chatDarkZh : chatLightZh) : isDark ? chatDarkEn : chatLightEn

  return (
    <section
      id="apps"
      aria-labelledby="home-apps-heading"
      className="isolate relative site-section scroll-mt-[60px] bg-background">
      <SectionBackdrop variant="modules" />
      <div className="site-container">
        <div className="site-split">
          <div>
            <p className="mb-3 font-mono text-xs tracking-widest text-primary uppercase">{t('home_page.apps_label')}</p>
            <h2
              id="home-apps-heading"
              className="max-w-lg text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              {t('home_page.apps_title')}
            </h2>
            <p className="mt-4 max-w-md text-pretty text-base leading-7 text-muted-foreground">
              {t('home_page.apps_intro')}
            </p>
          </div>

          <dl className="divide-y divide-border border-y border-border">
            {platforms.map(({ id, icon: Icon }) => (
              <div
                key={id}
                id={id === 'macos' ? 'desktop-app' : undefined}
                className="grid scroll-mt-[72px] gap-1.5 py-3 sm:grid-cols-[8rem_minmax(0,1fr)] sm:gap-4">
                <dt className="flex items-start gap-2 text-sm font-medium text-foreground">
                  <Icon aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                  {t(`download_page.platform_${id}`)}
                </dt>
                <dd className="text-pretty text-sm leading-6 text-muted-foreground">
                  {t(`home_page.apps_platform_${id}`)}{' '}
                  <Link to={`/download?platform=${id}`} className={platformLinkStyle}>
                    {t('download')}
                    <ArrowRight aria-hidden="true" className="size-3" />
                  </Link>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <figure className="mt-8 overflow-hidden rounded-lg border border-border bg-card sm:mt-10">
          <figcaption className="border-b border-border px-4 py-3 font-mono text-xs text-muted-foreground">
            Cherry Studio · {t('home_page.preview_chat')}
          </figcaption>
          <div className="relative aspect-[16/10] w-full max-h-[min(68vh,680px)]">
            <img
              src={desktopScreenshot}
              alt={t('home_page.desktop_app_screenshot')}
              width={2408}
              height={1644}
              loading="lazy"
              className="absolute inset-0 size-full object-contain"
            />
          </div>
        </figure>
      </div>
    </section>
  )
}
