import { Code2, Handshake, Headphones, Layers, LineChart, Palette, PenLine, Settings2, Users } from 'lucide-react'
import type { FC } from 'react'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components/ui/button'
import Footer from '@/components/website/Footer'
import SectionBackdrop from '@/components/website/SectionBackdrop'
import { usePageMeta } from '@/hooks/usePageMeta'

const JD_COLLECTION_URL = 'https://mcnnox2fhjfq.feishu.cn/wiki/SnERwz76Zi9HPEkMuG5cSTHanVd'
const APPLICATION_EMAIL = 'join@cherry-ai.com'

const CareersPage: FC = () => {
  const { t } = useTranslation()
  usePageMeta('careers')

  const positions = [
    { key: 'designer', icon: Palette, table: 'ldx7Nenw6VUg5dly' },
    { key: 'fde', icon: Handshake, table: 'ldxcDrKorwZBKY8i' },
    { key: 'technical_director', icon: Layers, table: 'ldxOwuMYDuEmE5Xt' },
    { key: 'engineering_intern', icon: Code2, table: 'ldxOPacqg7TLd4kX' },
    { key: 'talent_operations', icon: Users, table: 'ldxcj4PsIjJNn1JP' },
    { key: 'commercial_operations_intern', icon: LineChart, table: 'ldxSeabyfQ0Njg7A' },
    { key: 'backend', icon: Settings2, table: 'ldxz0HLNWBvC0aC1' },
    { key: 'technical_support_intern', icon: Headphones, table: 'ldxlPzgsxSEMnI7Z' },
    { key: 'content_operations_intern', icon: PenLine, table: 'ldxyJLL0OOGJax9s' }
  ]

  const benefits = ['ai_native', 'open_source', 'early_team', 'product']

  return (
    <div className="relative isolate overflow-hidden bg-background min-h-screen">
      <SectionBackdrop variant="grid-glow" />
      {/* Hero */}
      <section className="site-page-top pb-12 sm:pb-16">
        <div className="site-container">
          <span className="mb-4 inline-block font-mono text-xs tracking-widest text-primary uppercase">
            {t('careers.badge')}
          </span>
          <h1 className="mb-5 text-gradient text-balance text-4xl font-semibold tracking-[-0.03em] sm:text-6xl zh:tracking-normal">
            {t('careers.title')}
          </h1>
          <p className="mb-6 max-w-2xl text-pretty text-lg text-muted-foreground">{t('careers.subtitle')}</p>
          <Button size="lg" className="rounded-full px-5" asChild>
            <a href={`mailto:${APPLICATION_EMAIL}`}>{t('careers.apply_button')}</a>
          </Button>
          <p className="mt-3 text-sm text-muted-foreground">{APPLICATION_EMAIL}</p>
        </div>
      </section>

      {/* Benefits */}
      <section className="border-t border-border/50 py-16">
        <div className="site-container">
          <h2 className="mb-6 text-3xl font-semibold tracking-tight text-foreground">{t('careers.why_join')}</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {benefits.map((key) => (
              <div key={key} className="glass-card rounded-xl p-6">
                <h3 className="mb-2 font-semibold text-foreground">{t(`careers.benefits.${key}.title`)}</h3>
                <p className="text-sm text-muted-foreground">{t(`careers.benefits.${key}.description`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="border-t border-border/50 py-16">
        <div className="site-container">
          <h2 className="mb-6 text-3xl font-semibold tracking-tight text-foreground">{t('careers.positions_title')}</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {positions.map((pos) => (
              <a
                key={pos.key}
                href={`${JD_COLLECTION_URL}?table=${pos.table}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 glass-card rounded-xl p-5 transition-[border-color,transform] duration-300 ease-settle hover:-translate-y-0.5 hover:border-hairline-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-border bg-primary/10 text-primary">
                  <pos.icon aria-hidden="true" className="size-4" />
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
          <div className="mt-6">
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
          <Button size="lg" className="rounded-full px-5" asChild>
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
