import { ArrowRight, Clock, Gauge, Wallet } from 'lucide-react'
import type { FC } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import Footer from '@/components/website/Footer'
import SubscriptionFaq from '@/components/website/SubscriptionFaq'
import { usePageMeta } from '@/hooks/usePageMeta'
import { cn } from '@/lib/utils'
import { isEnglishSite } from '@/utils/urls'
import ChinaPricingPage from './china'
import { ModelMark, PLAN_BUTTON, PLAN_SURFACE, TABLE_LABEL, USAGE_GRID } from './planStyles'

const PRICE = { price: 8, list: 10 }
const FLASH_PLANS_URL = 'https://cloud.cherryai.com/account/plans'
const RATE_KEYS = ['input', 'output', 'cache_read', 'cache_write'] as const
const BADGE_ICONS = [Wallet, Clock, Gauge]

interface PricingModel {
  id: string
  name: string
  input: string
  output: string
  cache_read: string
  cache_write: string
  allowance: string
  tokens: string
  free?: string[]
}

function RateValue({ value, free }: { value: string; free: boolean }) {
  const { t } = useTranslation()

  if (free) {
    return <>{t('pricing.table.free')}</>
  }

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

function FlashContent() {
  const { t } = useTranslation()
  usePageMeta('flash')

  const models = t('pricing.models', { returnObjects: true }) as PricingModel[]
  const table = t('pricing.table', { returnObjects: true }) as Record<string, string>

  return (
    <div className="relative isolate overflow-hidden bg-background min-h-screen">
      <section className="site-container site-page-top pb-16 text-center sm:pb-24">
        <h1 className="font-display text-6xl leading-none text-balance sm:text-8xl">
          <span>{t('pricing.headline_brand')}</span>{' '}
          <span className="font-accent text-muted-foreground">{t('pricing.headline_plan')}</span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-pretty text-muted-foreground">{t('pricing.subtitle')}</p>

        <div className="relative mx-auto mt-12 max-w-md">
          <div className="rounded-[28px] bg-card p-8 text-left shadow-[inset_0_0_0_1px_var(--color-border),var(--shadow-float)] sm:p-10">
            <p className="text-sm font-medium text-muted-foreground">Flash</p>
            <div className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="font-display text-8xl leading-none tabular-nums">${PRICE.price}</span>
              <span className="text-2xl text-muted-foreground line-through tabular-nums">
                {t('pricing.list_price', { list: PRICE.list })}
              </span>
              <span className="text-lg text-muted-foreground">{t('pricing.per_month')}</span>
            </div>
            <a href={FLASH_PLANS_URL} className={cn(PLAN_BUTTON, 'mt-8 flex w-full')}>
              {t('pricing.subscribe')}
            </a>
            <p className="mt-4 text-center text-xs text-muted-foreground">{t('pricing.cancel_note')}</p>
          </div>
        </div>

        <ul className="mx-auto mt-14 grid max-w-5xl gap-4 text-left md:grid-cols-3">
          {BADGE_ICONS.map((Icon, index) => (
            <li key={t(`pricing.badges.${index}.title`)} className={cn(PLAN_SURFACE, 'p-6')}>
              <span className="flex size-10 items-center justify-center rounded-full bg-background shadow-[inset_0_0_0_1px_var(--color-border)]">
                <Icon className="size-[18px]" aria-hidden="true" />
              </span>
              <h3 className="mt-6 text-base font-semibold text-foreground">
                <Trans
                  i18nKey={`pricing.badges.${index}.title`}
                  components={{
                    limited: <span className="text-xs font-normal whitespace-nowrap text-muted-foreground" />
                  }}
                />
              </h3>
              <p className="mt-2 text-sm leading-6 text-pretty text-muted-foreground">
                {t(`pricing.badges.${index}.description`, PRICE)}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="flash-usage-title" className="border-t border-border py-20 sm:py-28">
        <div className="site-container max-w-5xl">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 id="flash-usage-title" className="font-display text-4xl sm:text-5xl">
              {t('pricing.models_title')}
            </h2>
            <span className="rounded-full px-3 py-1 text-sm font-medium text-muted-foreground shadow-[inset_0_0_0_1px_var(--color-border)]">
              Flash
            </span>
          </div>
          <table
            aria-label={t('pricing.usage.table_label')}
            aria-describedby="flash-usage-note"
            className="mt-10 block w-full text-left">
            <thead className="block">
              <tr className={cn(USAGE_GRID, TABLE_LABEL, 'px-6 pb-3')}>
                <th scope="col" className="font-medium">
                  {table.model}
                </th>
                <th scope="col" className="hidden font-medium sm:block">
                  {t('pricing.usage.single_model')}
                </th>
                <th scope="col" className="text-right font-medium">
                  {t('pricing.usage.monthly_usage')}
                </th>
              </tr>
            </thead>
            <tbody className="block space-y-2">
              {models.map((model) => (
                <tr key={model.id} className={cn(USAGE_GRID, PLAN_SURFACE, 'items-center px-6 py-5')}>
                  <th scope="row" className="flex items-center gap-3 text-base font-medium">
                    <ModelMark model={model.id} />
                    {model.name}
                  </th>
                  <td className="col-span-2 row-start-2 sm:col-auto sm:row-auto">
                    <span className="block h-1.5 overflow-hidden rounded-full bg-secondary" aria-hidden="true">
                      <span
                        className={cn(
                          'block h-full rounded-full bg-foreground',
                          model.id === 'deepseek-v41' ? 'w-full' : 'w-3/4'
                        )}
                      />
                    </span>
                    <span className="sr-only">{t('pricing.usage.exclusive_model')}</span>
                  </td>
                  <td className="text-right whitespace-nowrap">
                    <span className="text-xs text-muted-foreground">{t('pricing.usage.up_to')}</span>{' '}
                    <span className="font-display text-3xl tabular-nums">{model.allowance}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p id="flash-usage-note" className="mt-5 px-6 text-[13px] leading-6 text-muted-foreground">
            {t('pricing.usage.note')}
          </p>

          <section aria-labelledby="flash-rates-title" className="mt-24">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h3 id="flash-rates-title" className="font-display text-4xl sm:text-5xl">
                  {t('pricing.rates.title')}
                </h3>
                <p id="flash-rates-description" className="mt-3 text-[15px] text-muted-foreground">
                  {table.rate_unit}
                </p>
              </div>
              <span className="inline-flex rounded-full bg-secondary p-1">
                <span className="rounded-full bg-background px-4 py-1.5 text-sm font-medium shadow-[inset_0_0_0_1px_var(--color-border)]">
                  Flash
                </span>
              </span>
            </div>
            <p className="mt-4 text-xs text-muted-foreground lg:hidden">{t('pricing.rates.scroll_hint')}</p>
            <div
              role="region"
              aria-label={t('pricing.rates.table_label')}
              aria-describedby="flash-rates-description"
              // biome-ignore lint/a11y/noNoninteractiveTabindex: Keyboard users need to scroll the pricing table horizontally.
              tabIndex={0}
              className={cn(
                PLAN_SURFACE,
                'mt-8 overflow-x-auto overscroll-x-contain px-6 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring'
              )}>
              <table className="w-full min-w-[820px] border-collapse text-[15px] tabular-nums [&_td]:border-t [&_td]:border-border [&_td]:px-4 [&_td]:py-5 [&_td]:whitespace-nowrap [&_td:last-child]:pr-0 [&_th]:px-4 [&_th]:text-left [&_th]:whitespace-nowrap [&_th:first-child]:pl-0">
                <caption className="sr-only">{t('pricing.rates.caption')}</caption>
                <thead>
                  <tr>
                    {['model', ...RATE_KEYS].map((key) => (
                      <th scope="col" key={key} className={cn(TABLE_LABEL, 'py-4')}>
                        {table[key]}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {models.map((model) => (
                    <tr key={model.id}>
                      <th scope="row" className="border-t border-border py-5 font-medium">
                        <span className="flex items-center gap-3">
                          <ModelMark model={model.id} />
                          {model.name}
                        </span>
                      </th>
                      {RATE_KEYS.map((key) => (
                        <td key={key} className="text-foreground/85">
                          <RateValue value={model[key]} free={Boolean(model.free?.includes(key))} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <div className={cn(PLAN_SURFACE, 'mt-6 p-6')}>
            <h3 className="text-sm font-semibold text-foreground">{t('pricing.peak_title')}</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{t('pricing.peak_body')}</p>
          </div>

          <Link
            to="/subscription/usage"
            className="mt-6 inline-flex items-center gap-1 rounded-sm text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-primary">
            {t('pricing.rules_link')}
            <ArrowRight className="size-3.5" aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="border-t border-border px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-center text-4xl sm:text-5xl">{t('pricing.faq_title')}</h2>
          <SubscriptionFaq variant="flash" />
        </div>
      </section>

      <section className="relative isolate overflow-hidden border-t border-border px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-4xl text-balance sm:text-6xl">{t('pricing.cta_title')}</h2>
          <p className="mt-4 text-base text-muted-foreground">{t('pricing.cta_body', PRICE)}</p>
          <a href={FLASH_PLANS_URL} className={cn(PLAN_BUTTON, 'mt-8')}>
            {t('pricing.subscribe')}
          </a>
          <p className="mt-4 text-xs text-muted-foreground">{t('pricing.cancel_note')}</p>
        </div>
      </section>

      <Footer />
    </div>
  )
}

const SubscriptionPage: FC = () => {
  const { i18n } = useTranslation()

  if (!isEnglishSite(i18n.resolvedLanguage || i18n.language)) return <ChinaPricingPage />

  return <FlashContent />
}

export default SubscriptionPage
