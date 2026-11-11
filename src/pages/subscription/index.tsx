import { ArrowRight, Clock, Gauge, Wallet } from 'lucide-react'
import type { FC } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import Footer from '@/components/website/Footer'
import SectionDivider from '@/components/website/SectionDivider'
import SubscriptionFaq from '@/components/website/SubscriptionFaq'
import { usePageMeta } from '@/hooks/usePageMeta'
import { cn } from '@/lib/utils'
import { isEnglishSite } from '@/utils/urls'
import ChinaPricingPage from './china'

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
    <div className="bg-background min-h-screen">
      <section className="px-4 pt-28 pb-6 sm:px-6 sm:pt-32 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-foreground text-5xl font-bold tracking-tight sm:text-6xl">
            {t('pricing.headline_brand')} <span className="text-primary">{t('pricing.headline_plan')}</span>
          </h1>
          <p className="text-muted-foreground mt-5 text-lg leading-8">{t('pricing.subtitle')}</p>
        </div>
      </section>

      <section className="px-4 pt-2 pb-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-5xl gap-10 sm:grid-cols-3">
          {BADGE_ICONS.map((Icon, index) => (
            <div key={t(`pricing.badges.${index}.title`)} className="text-center sm:text-left">
              <div className="bg-primary/10 text-primary mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="text-foreground text-base font-semibold">
                <Trans
                  i18nKey={`pricing.badges.${index}.title`}
                  components={{
                    limited: <span className="whitespace-nowrap text-xs font-normal text-muted-foreground" />
                  }}
                />
              </h3>
              <p className="text-muted-foreground mt-2 text-sm leading-6">
                {t(`pricing.badges.${index}.description`, PRICE)}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="relative mx-auto max-w-lg">
          <div className="border-primary/30 bg-card relative rounded-3xl border-2 p-10 text-center shadow-xl">
            <div className="flex items-baseline justify-center gap-2">
              <span className="text-foreground text-6xl font-bold tracking-tight">${PRICE.price}</span>
              <span className="text-muted-foreground text-2xl line-through">
                {t('pricing.list_price', { list: PRICE.list })}
              </span>
              <span className="text-muted-foreground text-xl">{t('pricing.per_month')}</span>
            </div>
            <Button size="lg" className="mt-8 w-full" asChild>
              <a href={FLASH_PLANS_URL}>{t('pricing.subscribe')}</a>
            </Button>
            <p className="text-muted-foreground mt-4 text-xs">{t('pricing.cancel_note')}</p>
          </div>
        </div>
      </section>

      <SectionDivider />

      <section aria-labelledby="flash-usage-title" className="px-4 py-16 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center justify-between gap-4">
            <h2 id="flash-usage-title" className="text-[23px] font-semibold leading-9 tracking-tight sm:text-[26px]">
              {t('pricing.models_title')}
            </h2>
            <span className="flex items-center gap-2.5 font-mono text-sm font-semibold">
              <span className="h-[17px] w-1 rounded-sm bg-primary" aria-hidden="true" />
              Flash
            </span>
          </div>
          <table
            aria-label={t('pricing.usage.table_label')}
            aria-describedby="flash-usage-note"
            className="mt-7 block w-full text-left">
            <thead className="block">
              <tr className="grid grid-cols-[minmax(0,1fr)_86px] gap-3 rounded-lg border border-border bg-secondary/70 px-2.5 py-3 text-[13px] text-muted-foreground sm:grid-cols-[minmax(200px,1.2fr)_minmax(80px,1fr)_140px] sm:gap-5 sm:px-5 sm:py-3.5 lg:grid-cols-[minmax(220px,1.15fr)_minmax(100px,1.8fr)_160px] lg:gap-8">
                <th scope="col" className="font-normal">
                  {table.model}
                </th>
                <th scope="col" className="hidden font-normal sm:block">
                  {t('pricing.usage.single_model')}
                </th>
                <th scope="col" className="text-right font-normal">
                  {t('pricing.usage.monthly_usage')}
                </th>
              </tr>
            </thead>
            <tbody className="block">
              {models.map((model) => (
                <tr
                  key={model.id}
                  className="grid grid-cols-[minmax(0,1fr)_86px] items-center gap-3 px-2.5 py-5 sm:grid-cols-[minmax(200px,1.2fr)_minmax(80px,1fr)_140px] sm:gap-5 sm:px-5 sm:py-6 lg:grid-cols-[minmax(220px,1.15fr)_minmax(100px,1.8fr)_160px] lg:gap-8">
                  <th scope="row" className="font-mono text-[13px] font-normal sm:text-base">
                    {model.name}
                  </th>
                  <td className="col-span-2 row-start-2 sm:col-auto sm:row-auto">
                    <span className="block h-2 overflow-hidden rounded-[3px] bg-secondary sm:h-2.5" aria-hidden="true">
                      <span
                        className={cn(
                          'block h-full rounded-[3px] bg-gradient-to-r from-primary/60 to-primary',
                          model.id === 'deepseek-v41' ? 'w-full' : 'w-3/4'
                        )}
                      />
                    </span>
                    <span className="sr-only">{t('pricing.usage.exclusive_model')}</span>
                  </td>
                  <td className="whitespace-nowrap text-right font-mono text-base tabular-nums">
                    <span className="text-xs text-muted-foreground">{t('pricing.usage.up_to')}</span> {model.allowance}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p
            id="flash-usage-note"
            className="border-t border-border pt-[18px] text-[13px] leading-6 text-muted-foreground">
            {t('pricing.usage.note')}
          </p>

          <section aria-labelledby="flash-rates-title" className="mt-12 sm:mt-16">
            <h3 id="flash-rates-title" className="text-[23px] font-semibold leading-9 tracking-tight sm:text-[26px]">
              {t('pricing.rates.title')}
            </h3>
            <p
              id="flash-rates-description"
              className="mt-2 text-sm leading-[26px] text-muted-foreground sm:text-[15px]">
              {table.rate_unit}
            </p>
            <div className="mt-6 border-b border-border">
              <span className="-mb-px inline-block border-b-2 border-foreground px-[22px] pb-4 pt-3 font-mono text-[17px] font-semibold">
                Flash
              </span>
            </div>
            <p className="mt-3.5 text-xs text-muted-foreground lg:hidden">{t('pricing.rates.scroll_hint')}</p>
            <div
              role="region"
              aria-label={t('pricing.rates.table_label')}
              aria-describedby="flash-rates-description"
              // biome-ignore lint/a11y/noNoninteractiveTabindex: Keyboard users need to scroll the pricing table horizontally.
              tabIndex={0}
              className="overflow-x-auto overscroll-x-contain focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-4">
              <table className="w-full min-w-[900px] border-collapse font-mono text-sm tabular-nums sm:text-[15px] [&_td]:whitespace-nowrap [&_td]:border-b [&_td]:border-border [&_td]:px-5 [&_td]:py-[22px] [&_td:last-child]:pr-0 [&_th]:whitespace-nowrap [&_th]:border-b [&_th]:border-border [&_th]:px-5 [&_th]:text-left [&_th:first-child]:pl-0 [&_th:last-child]:pr-0">
                <caption className="sr-only">{t('pricing.rates.caption')}</caption>
                <thead>
                  <tr>
                    {['model', ...RATE_KEYS].map((key) => (
                      <th scope="col" key={key} className="py-[26px] text-sm font-semibold">
                        {table[key]}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {models.map((model) => (
                    <tr key={model.id} className="hover:bg-secondary/30">
                      <th scope="row" className="py-[22px] font-normal">
                        {model.name}
                      </th>
                      {RATE_KEYS.map((key) => (
                        <td key={key}>
                          <RateValue value={model[key]} free={Boolean(model.free?.includes(key))} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <div className="border-border bg-secondary/30 mt-8 rounded-xl border p-5">
            <h3 className="text-foreground text-sm font-semibold">{t('pricing.peak_title')}</h3>
            <p className="text-muted-foreground mt-2 text-sm leading-6">{t('pricing.peak_body')}</p>
          </div>

          <Link
            to="/subscription/usage"
            className="text-muted-foreground hover:text-foreground mt-5 inline-flex items-center gap-1 text-sm transition-colors hover:underline">
            {t('pricing.rules_link')}
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </section>

      <SectionDivider />

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-foreground text-center text-2xl font-bold sm:text-3xl">{t('pricing.faq_title')}</h2>
          <SubscriptionFaq variant="flash" />
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-foreground text-2xl font-bold sm:text-3xl">{t('pricing.cta_title')}</h2>
          <p className="text-muted-foreground mt-3 text-base">{t('pricing.cta_body', PRICE)}</p>
          <Button size="lg" className="mt-6" asChild>
            <a href={FLASH_PLANS_URL}>{t('pricing.subscribe')}</a>
          </Button>
          <p className="text-muted-foreground mt-4 text-xs">{t('pricing.cancel_note')}</p>
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
