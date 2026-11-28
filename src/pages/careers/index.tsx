import {
  ArrowUpRight,
  Boxes,
  Code2,
  GitBranch,
  Handshake,
  Headphones,
  Layers,
  LineChart,
  MapPin,
  Palette,
  PenLine,
  Rocket,
  Settings2,
  Sparkles,
  Users
} from 'lucide-react'
import type { FC } from 'react'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components/ui/button'
import FeatureBento from '@/components/website/FeatureBento'
import Footer from '@/components/website/Footer'
import HeroBackdrop from '@/components/website/HeroBackdrop'
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

  const benefits = [
    { key: 'ai_native', icon: Sparkles },
    { key: 'open_source', icon: GitBranch },
    { key: 'early_team', icon: Rocket },
    { key: 'product', icon: Boxes }
  ]

  return (
    <div className="relative isolate overflow-hidden bg-background min-h-screen">
      <HeroBackdrop className="inset-x-0 top-0 -z-10 h-[560px] sm:h-[620px]" fade={72} />
      {/* Hero */}
      <section className="site-page-top pb-12 sm:pb-16">
        <div className="site-container">
          <span className="mb-4 on-silk inline-block text-sm font-medium text-muted-foreground">
            {t('careers.badge')}
          </span>
          <h1 className="mb-5 on-silk text-balance text-5xl font-display sm:text-7xl">{t('careers.title')}</h1>
          <p className="mb-6 on-silk max-w-2xl text-pretty text-lg text-muted-foreground">{t('careers.subtitle')}</p>
          <Button size="lg" className="rounded-full px-5" asChild>
            <a href={`mailto:${APPLICATION_EMAIL}`}>{t('careers.apply_button')}</a>
          </Button>
          <p className="mt-3 on-silk text-sm text-muted-foreground">{APPLICATION_EMAIL}</p>
        </div>
      </section>

      {/* Benefits: no top rule, the silk is still fading out here */}
      <section className="py-20 sm:py-28">
        <div className="site-container">
          <h2 className="font-display mb-10 text-4xl sm:text-5xl">{t('careers.why_join')}</h2>
          <FeatureBento
            items={benefits.map(({ key, icon }) => ({
              key,
              icon,
              title: t(`careers.benefits.${key}.title`),
              description: t(`careers.benefits.${key}.description`)
            }))}
          />
        </div>
      </section>

      {/* Open Positions */}
      <section className="border-t border-border py-20 sm:py-28">
        <div className="site-container">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-display text-4xl sm:text-5xl">{t('careers.positions_title')}</h2>
            <a
              href={JD_COLLECTION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium shadow-[inset_0_0_0_1px_var(--color-border)] transition-colors hover:bg-accent focus-visible:outline-2 focus-visible:outline-primary">
              {t('careers.view_full_jd')}
              <ArrowUpRight className="size-3.5" aria-hidden="true" />
            </a>
          </div>
          <ul className="overflow-hidden rounded-[26px] bg-card/70 shadow-[inset_0_0_0_1px_var(--color-border)]">
            {positions.map((pos, index) => (
              <li key={pos.key} className="border-border not-first:border-t">
                <a
                  href={`${JD_COLLECTION_URL}?table=${pos.table}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-5 px-6 py-6 transition-colors duration-200 hover:bg-accent/50 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary sm:px-8">
                  <span className="font-display hidden w-10 text-2xl text-foreground/25 tabular-nums sm:block">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="min-w-0">
                    <span className="flex items-center gap-3">
                      <pos.icon aria-hidden="true" className="size-4 shrink-0 text-muted-foreground" />
                      <span className="font-display text-2xl leading-tight">
                        {t(`careers.positions.${pos.key}.title`)}
                      </span>
                    </span>
                    <span className="mt-2 block text-[15px] leading-relaxed text-pretty text-muted-foreground">
                      {t(`careers.positions.${pos.key}.description`)}
                    </span>
                  </span>
                  <span className="flex size-10 items-center justify-center rounded-full shadow-[inset_0_0_0_1px_var(--color-border)] transition-[background-color,color,transform] duration-300 ease-settle group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:bg-foreground group-hover:text-background">
                    <ArrowUpRight className="size-4" aria-hidden="true" />
                    <span className="sr-only">{t('careers.view_position')}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Location and CTA */}
      <section className="relative isolate overflow-hidden border-t border-border py-24 sm:py-32">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <p className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm text-muted-foreground shadow-[inset_0_0_0_1px_var(--color-border)]">
            <MapPin className="size-3.5" aria-hidden="true" />
            <span className="sr-only">{t('careers.location_title')}: </span>
            {t('careers.location')}
          </p>
          <h2 className="font-display mt-6 text-4xl text-balance sm:text-6xl">{t('careers.cta_title')}</h2>
          <p className="mt-4 text-muted-foreground">{t('careers.cta_subtitle')}</p>
          <a
            href={`mailto:${APPLICATION_EMAIL}`}
            className="mt-8 inline-flex h-12 items-center justify-center rounded-full bg-foreground px-8 text-[15px] font-semibold text-background transition-[background-color,transform] duration-200 hover:bg-foreground/85 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary active:scale-[0.98]">
            {t('careers.apply_button')}
          </a>
          <p className="mt-3 text-sm text-muted-foreground">{APPLICATION_EMAIL}</p>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default CareersPage
