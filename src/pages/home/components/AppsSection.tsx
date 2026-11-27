import { Apple, ArrowRight, Monitor, Terminal } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const platforms = [
  { id: 'macos', icon: Apple },
  { id: 'windows', icon: Monitor },
  { id: 'linux', icon: Terminal }
] as const
const platformLinkStyle =
  'inline-flex items-center gap-1 rounded-sm font-medium text-foreground underline decoration-border underline-offset-4 hover:decoration-current hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'

export default function AppsSection() {
  const { t } = useTranslation()

  return (
    <section id="apps" aria-labelledby="home-apps-heading" className="relative isolate site-section bg-background">
      <div className="site-container">
        <div className="site-split">
          <div>
            <p className="mb-3 text-sm font-medium text-muted-foreground">{t('home_page.apps_label')}</p>
            <h2 id="home-apps-heading" className="max-w-lg text-balance text-4xl font-display sm:text-5xl">
              {t('home_page.apps_title')}
            </h2>
            <p className="mt-4 max-w-md text-pretty text-base leading-7 text-muted-foreground">
              {t('home_page.apps_intro')}
            </p>
          </div>

          <dl className="glass-card divide-y divide-border rounded-2xl px-5">
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
      </div>
    </section>
  )
}
