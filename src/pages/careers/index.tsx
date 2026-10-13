import type { FC } from 'react'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components/ui/button'
import Footer from '@/components/website/Footer'
import { usePageMeta } from '@/hooks/usePageMeta'

const JD_COLLECTION_URL = 'https://mcnnox2fhjfq.feishu.cn/wiki/SnERwz76Zi9HPEkMuG5cSTHanVd'
const APPLICATION_EMAIL = 'join@cherry-ai.com'

const CareersPage: FC = () => {
  const { t } = useTranslation()
  usePageMeta('careers')

  const positions = [
    { key: 'designer', icon: '🎨', table: 'ldx7Nenw6VUg5dly' },
    { key: 'fde', icon: '🤝', table: 'ldxcDrKorwZBKY8i' },
    { key: 'engineer', icon: '💻', table: 'ldxla0rK7nDuI9GU' },
    { key: 'backend', icon: '⚙️', table: 'ldxz0HLNWBvC0aC1' },
    { key: 'engineering_intern', icon: '🔧', table: 'ldxOPacqg7TLd4kX' },
    { key: 'visual_design_intern', icon: '🎬', table: 'ldxSOCA5cmjzZEci' },
    { key: 'commercial_operations_intern', icon: '📈', table: 'ldxSeabyfQ0Njg7A' },
    { key: 'content_operations_intern', icon: '✍️', table: 'ldxCJgzVmKoUrgwE' },
    { key: 'technical_support_intern', icon: '🛠️', table: 'ldxlPzgsxSEMnI7Z' },
    { key: 'talent_operations', icon: '🌱', table: 'ldxcj4PsIjJNn1JP' }
  ]

  const benefits = ['ai_native', 'open_source', 'early_team', 'product']

  return (
    <div className="bg-background min-h-screen pt-20">
      {/* Hero */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <span className="mb-4 inline-block rounded-md bg-foreground/10 px-3 py-1 text-sm font-medium text-foreground">
            {t('careers.badge')}
          </span>
          <h1 className="mb-6 text-4xl font-bold text-foreground sm:text-5xl">{t('careers.title')}</h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">{t('careers.subtitle')}</p>
          <Button size="lg" asChild>
            <a href={`mailto:${APPLICATION_EMAIL}`}>{t('careers.apply_button')}</a>
          </Button>
          <p className="mt-3 text-sm text-muted-foreground">{APPLICATION_EMAIL}</p>
        </div>
      </section>

      {/* Benefits */}
      <section className="border-t border-border/50 py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-10 text-center text-2xl font-bold text-foreground">{t('careers.why_join')}</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {benefits.map((key) => (
              <div key={key} className="rounded-lg border border-border/50 bg-card/50 p-6">
                <h3 className="mb-2 font-semibold text-foreground">{t(`careers.benefits.${key}.title`)}</h3>
                <p className="text-sm text-muted-foreground">{t(`careers.benefits.${key}.description`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="border-t border-border/50 py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-10 text-center text-2xl font-bold text-foreground">{t('careers.positions_title')}</h2>
          <div className="space-y-4">
            {positions.map((pos) => (
              <a
                key={pos.key}
                href={`${JD_COLLECTION_URL}?table=${pos.table}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 rounded-lg border border-border/50 bg-card/50 p-5 transition-colors hover:border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                <span className="text-2xl" aria-hidden="true">
                  {pos.icon}
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-foreground">{t(`careers.positions.${pos.key}.title`)}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{t(`careers.positions.${pos.key}.description`)}</p>
                  <p className="mt-3 text-sm text-foreground">
                    {t('careers.view_position')} <span aria-hidden="true">↗</span>
                  </p>
                </div>
              </a>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button variant="outline" asChild>
              <a href={JD_COLLECTION_URL} target="_blank" rel="noopener noreferrer">
                {t('careers.view_full_jd')}
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="border-t border-border/50 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-6 text-2xl font-bold text-foreground">{t('careers.location_title')}</h2>
          <p className="text-muted-foreground">{t('careers.location')}</p>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border/50 bg-secondary/30 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-4 text-2xl font-bold text-foreground">{t('careers.cta_title')}</h2>
          <p className="mb-8 text-muted-foreground">{t('careers.cta_subtitle')}</p>
          <Button size="lg" asChild>
            <a href={`mailto:${APPLICATION_EMAIL}`}>{t('careers.apply_button')}</a>
          </Button>
          <p className="mt-3 text-sm text-muted-foreground">{APPLICATION_EMAIL}</p>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default CareersPage
