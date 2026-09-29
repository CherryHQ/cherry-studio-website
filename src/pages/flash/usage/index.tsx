import type { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, Navigate } from 'react-router-dom'

import Footer from '@/components/website/Footer'
import { usePageMeta } from '@/hooks/usePageMeta'
import { isEnglishSite } from '@/utils/urls'

interface UsageModel {
  id: string
  name: string
  input: string
  output: string
  cache_read: string
  cache_write: string
  allowance: string
  free?: string[]
}

interface Section {
  title: string
  body: string[]
}

const RATE_KEYS = ['input', 'output', 'cache_read', 'cache_write'] as const

function RateCell({ value, free, freeLabel }: { value: string; free: boolean; freeLabel: string }) {
  if (free) return <>{freeLabel}</>

  return (
    <>
      {value.split(' / ').map((part) => (
        <span key={part} className="block whitespace-nowrap">
          {part}
        </span>
      ))}
    </>
  )
}

function UsageContent() {
  const { t } = useTranslation()
  usePageMeta('flashUsage')

  const intro = t('usage.intro', { returnObjects: true }) as Section
  const background = t('usage.background', { returnObjects: true }) as Section & {
    steps_title: string
    steps: string[]
  }
  const how = t('usage.how', { returnObjects: true }) as Section & { callout: string }
  const modelsSection = t('usage.models', { returnObjects: true }) as { title: string; note: string }
  const limits = t('usage.limits', { returnObjects: true }) as {
    title: string
    intro: string
    peak_note: string
    console: string
    change: string
  }
  const overage = t('usage.overage', { returnObjects: true }) as { title: string; body: string }
  const privacy = t('usage.privacy', { returnObjects: true }) as {
    title: string
    intro: string
    col_model: string
    col_training: string
    value_no: string
  }
  const goals = t('usage.goals', { returnObjects: true }) as { title: string; items: string[] }

  const table = t('pricing.table', { returnObjects: true }) as Record<string, string>
  const models = t('pricing.models', { returnObjects: true }) as UsageModel[]

  return (
    <div className="bg-background min-h-screen">
      <article className="mx-auto max-w-3xl px-4 pt-28 pb-20 sm:px-6 sm:pt-32 lg:px-8">
        <header>
          <h1 className="text-foreground text-3xl font-bold tracking-tight sm:text-4xl">{t('usage.title')}</h1>
          <p className="text-muted-foreground mt-4 text-lg leading-8">{t('usage.subtitle')}</p>
        </header>

        <section className="mt-12">
          <h2 className="text-foreground text-xl font-semibold">{intro.title}</h2>
          {intro.body.map((paragraph) => (
            <p key={paragraph} className="text-muted-foreground mt-4 leading-7">
              {paragraph}
            </p>
          ))}
        </section>

        <section className="mt-12">
          <h2 className="text-foreground text-xl font-semibold">{background.title}</h2>
          {background.body.map((paragraph) => (
            <p key={paragraph} className="text-muted-foreground mt-4 leading-7">
              {paragraph}
            </p>
          ))}
          <p className="text-foreground mt-5 font-medium">{background.steps_title}</p>
          <ol className="mt-3 space-y-3">
            {background.steps.map((step, index) => (
              <li key={step} className="text-muted-foreground flex gap-3 leading-7">
                <span className="bg-secondary text-foreground mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold tabular-nums">
                  {index + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-12">
          <h2 className="text-foreground text-xl font-semibold">{how.title}</h2>
          {how.body.map((paragraph) => (
            <p key={paragraph} className="text-muted-foreground mt-4 leading-7">
              {paragraph}
            </p>
          ))}
          <p className="border-border bg-secondary/40 text-foreground mt-5 rounded-lg border-l-2 border-l-primary px-4 py-3 font-medium">
            {how.callout}
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-foreground text-xl font-semibold">{modelsSection.title}</h2>
          <ul className="mt-4 space-y-2">
            {models.map((model) => (
              <li key={model.id} className="text-muted-foreground flex items-baseline gap-2.5 leading-7">
                <span className="bg-primary/60 mt-2 h-1.5 w-1.5 shrink-0 rounded-full" />
                <span className="text-foreground">{model.name}</span>
              </li>
            ))}
          </ul>
          <p className="text-muted-foreground mt-4 text-sm">{modelsSection.note}</p>
        </section>

        <section className="mt-12">
          <h2 className="text-foreground text-xl font-semibold">{limits.title}</h2>
          <p className="text-muted-foreground mt-4 leading-7">{limits.intro}</p>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[620px] border-collapse text-sm">
              <thead>
                <tr className="border-border border-b">
                  <th className="text-muted-foreground py-3 pr-4 text-left text-xs font-medium">{table.model}</th>
                  {RATE_KEYS.map((key) => (
                    <th key={key} className="text-muted-foreground py-3 pr-4 text-left text-xs font-medium">
                      {table[key]}
                    </th>
                  ))}
                  <th className="text-muted-foreground py-3 pr-4 text-left text-xs font-medium">{table.allowance}</th>
                </tr>
              </thead>
              <tbody>
                {models.map((model) => (
                  <tr key={model.id} className="border-border/60 border-b last:border-0">
                    <td className="text-foreground py-3 pr-4 font-medium">{model.name}</td>
                    {RATE_KEYS.map((key) => (
                      <td key={key} className="text-muted-foreground py-3 pr-4 tabular-nums">
                        <RateCell value={model[key]} free={Boolean(model.free?.includes(key))} freeLabel={table.free} />
                      </td>
                    ))}
                    <td className="text-foreground py-3 font-semibold tabular-nums">{model.allowance}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-muted-foreground mt-5 text-sm leading-6">{limits.peak_note}</p>
          <p className="text-muted-foreground mt-3 text-sm leading-6">{limits.console}</p>
          <p className="text-muted-foreground mt-3 text-sm leading-6">{limits.change}</p>
        </section>

        <section className="mt-12">
          <h2 className="text-foreground text-xl font-semibold">{overage.title}</h2>
          <p className="text-muted-foreground mt-4 leading-7">{overage.body}</p>
        </section>

        <section className="mt-12">
          <h2 className="text-foreground text-xl font-semibold">{privacy.title}</h2>
          <p className="text-muted-foreground mt-4 leading-7">{privacy.intro}</p>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-border border-b">
                  <th className="text-muted-foreground py-3 pr-4 text-left text-xs font-medium">{privacy.col_model}</th>
                  <th className="text-muted-foreground py-3 text-left text-xs font-medium">{privacy.col_training}</th>
                </tr>
              </thead>
              <tbody>
                {models.map((model) => (
                  <tr key={model.id} className="border-border/60 border-b last:border-0">
                    <td className="text-foreground py-3 pr-4 font-medium">{model.name}</td>
                    <td className="text-foreground py-3">{privacy.value_no}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-foreground text-xl font-semibold">{goals.title}</h2>
          <ul className="mt-4 space-y-3">
            {goals.items.map((item) => (
              <li key={item} className="text-muted-foreground flex gap-3 leading-7">
                <span className="bg-primary/60 mt-3 h-1.5 w-1.5 shrink-0 rounded-full" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <p className="border-border mt-14 border-t pt-6">
          <Link to="/flash" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
            ← {t('nav.pricing')}
          </Link>
        </p>
      </article>

      <Footer />
    </div>
  )
}

const FlashUsagePage: FC = () => {
  const { i18n } = useTranslation()

  if (!isEnglishSite(i18n.resolvedLanguage || i18n.language)) return <Navigate to="/" replace />

  return <UsageContent />
}

export default FlashUsagePage
