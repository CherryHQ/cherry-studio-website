import type { FC } from 'react'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components/ui/button'
import Footer from '@/components/website/Footer'
import { usePageMeta } from '@/hooks/usePageMeta'

const CareersPage: FC = () => {
  const { t } = useTranslation()
  usePageMeta('careers')

  const positions = [
    { key: 'frontend', icon: '💻' },
    { key: 'backend', icon: '⚙️' },
    { key: 'fullstack', icon: '🔧' },
    { key: 'mobile', icon: '📱' },
    { key: 'ai', icon: '🤖' }
  ]

  const benefits = ['no_clock', 'equity', 'ai_native', 'growth']

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
            <a
              href="https://mcnnox2fhjfq.feishu.cn/share/base/form/shrcnaepLR6BrddSI3mv0899Wpf"
              target="_blank"
              rel="noopener noreferrer">
              {t('careers.apply_button')}
            </a>
          </Button>
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
              <div
                key={pos.key}
                className="flex items-center justify-between rounded-lg border border-border/50 bg-card/50 p-5 transition-colors hover:border-border">
                <div className="flex items-center gap-4">
                  <span className="text-2xl">{pos.icon}</span>
                  <div>
                    <h3 className="font-semibold text-foreground">{t(`careers.positions.${pos.key}.title`)}</h3>
                    <p className="text-sm text-muted-foreground">{t(`careers.positions.${pos.key}.description`)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button variant="outline" asChild>
              <a
                href="https://github.com/CherryHQ/cherry-studio/issues/11953"
                target="_blank"
                rel="noopener noreferrer">
                {t('careers.view_full_jd')}
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="border-t border-border/50 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-4 text-2xl font-bold text-foreground">{t('careers.location_title')}</h2>
          <p className="text-muted-foreground">{t('careers.location')}</p>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border/50 bg-secondary/30 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-4 text-2xl font-bold text-foreground">{t('careers.cta_title')}</h2>
          <p className="mb-8 text-muted-foreground">{t('careers.cta_subtitle')}</p>
          <Button size="lg" asChild>
            <a
              href="https://mcnnox2fhjfq.feishu.cn/share/base/form/shrcnaepLR6BrddSI3mv0899Wpf"
              target="_blank"
              rel="noopener noreferrer">
              {t('careers.apply_button')}
            </a>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default CareersPage
