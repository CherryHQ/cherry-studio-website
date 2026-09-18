import { ArrowRight, ChevronDown, Clock, Gauge, Wallet } from 'lucide-react'
import { type FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, Navigate } from 'react-router-dom'

import deepseekLogo from '@/assets/images/provider_logo/deepseek-color.svg'
import qwenLogo from '@/assets/images/provider_logo/qwen-color.svg'
import zhipuLogo from '@/assets/images/provider_logo/zhipu-color.svg'
import { Button } from '@/components/ui/button'
import Footer from '@/components/website/Footer'
import SectionDivider from '@/components/website/SectionDivider'
import { usePageMeta } from '@/hooks/usePageMeta'
import { cn } from '@/lib/utils'
import { isEnglishSite } from '@/utils/urls'

const PRICE = { price: 8, list: 10 }
const RATE_KEYS = ['input', 'output', 'cache_read', 'cache_write'] as const
const BADGE_ICONS = [Wallet, Clock, Gauge]
const MODEL_LOGOS: Record<string, string> = {
  deepseek: deepseekLogo,
  'deepseek-v41': deepseekLogo,
  qwen: qwenLogo,
  glm: zhipuLogo
}

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

interface PricingFaqItem {
  question: string
  answer: string
}

function RateValue({ value, free }: { value: string; free: boolean }) {
  const { t } = useTranslation()

  if (free) {
    return (
      <span className="bg-primary/10 text-primary rounded-full px-2 py-0.5 text-[11px] font-semibold">
        {t('pricing.table.free')}
      </span>
    )
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

function BillingFaq({ items }: { items: PricingFaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div className="mt-10 space-y-4">
      {items.map((item, index) => {
        const isOpen = openIndex === index

        return (
          <div
            key={item.question}
            className="border-border bg-secondary/30 overflow-hidden rounded-xl border transition-all duration-200">
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="hover:bg-secondary/50 text-foreground flex w-full cursor-pointer items-center justify-between gap-4 p-6 text-left font-medium transition-colors">
                <span className="pr-4">{item.question}</span>
                <ChevronDown
                  className={cn(
                    'text-muted-foreground h-5 w-5 shrink-0 transition-transform duration-200',
                    isOpen && 'rotate-180'
                  )}
                />
              </button>
            </h3>
            <div className={cn('grid transition-all duration-200', isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]')}>
              <div className="overflow-hidden">
                <div className="text-muted-foreground border-border border-t px-6 pt-4 pb-6 text-sm leading-relaxed">
                  {item.answer}
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

function FlashContent() {
  const { t } = useTranslation()
  usePageMeta('flash')

  const models = t('pricing.models', { returnObjects: true }) as PricingModel[]
  const faq = t('pricing.faq', { returnObjects: true }) as PricingFaqItem[]
  const table = t('pricing.table', { returnObjects: true }) as Record<string, string>

  return (
    <div className="bg-background min-h-screen">
      <section className="px-4 pt-20 pb-6 sm:px-6 sm:pt-24 lg:px-8">
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
              <h3 className="text-foreground text-base font-semibold">{t(`pricing.badges.${index}.title`)}</h3>
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
              <Link to="/download">{t('pricing.subscribe')}</Link>
            </Button>
            <p className="text-muted-foreground mt-4 text-xs">{t('pricing.cancel_note')}</p>
          </div>
        </div>
      </section>

      <SectionDivider />

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <h2 className="text-foreground text-2xl font-bold sm:text-3xl">{t('pricing.models_title')}</h2>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {models.map((model) => (
              <div
                key={model.id}
                className="border-border/60 bg-card/50 hover:border-primary/30 flex flex-col rounded-2xl border p-6 transition-colors">
                <div className="flex items-center gap-3">
                  <img src={MODEL_LOGOS[model.id]} alt={model.name} className="h-8 w-8 shrink-0" />
                  <h3 className="text-foreground text-base font-semibold">{model.name}</h3>
                </div>
                <div className="border-border/60 mt-6 border-t pt-6">
                  <p className="text-muted-foreground text-xs">{table.included}</p>
                  <div className="mt-1 flex items-baseline gap-2">
                    <p className="text-primary text-4xl font-bold tracking-tight">{model.allowance}</p>
                    <p className="text-muted-foreground text-sm font-medium">{model.tokens}</p>
                  </div>
                </div>
                <dl className="mt-6 mb-5 space-y-2 text-xs">
                  {RATE_KEYS.map((key) => (
                    <div key={key} className="flex items-baseline justify-between gap-3">
                      <dt className="text-muted-foreground shrink-0">{table[key]}</dt>
                      <dd className="text-foreground flex items-baseline justify-end gap-1.5 text-right font-medium tabular-nums">
                        <RateValue value={model[key]} free={Boolean(model.free?.includes(key))} />
                      </dd>
                    </div>
                  ))}
                </dl>
                <p className="text-muted-foreground/70 border-border/60 mt-auto border-t pt-3 text-left text-[11px]">
                  {table.rate_unit}
                </p>
              </div>
            ))}
          </div>

          <div className="border-border bg-secondary/30 mt-8 rounded-xl border p-5">
            <h3 className="text-foreground text-sm font-semibold">{t('pricing.peak_title')}</h3>
            <p className="text-muted-foreground mt-2 text-sm leading-6">{t('pricing.peak_body')}</p>
          </div>

          <Link
            to="/flash/usage"
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
          <BillingFaq items={faq} />
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-foreground text-2xl font-bold sm:text-3xl">{t('pricing.cta_title')}</h2>
          <p className="text-muted-foreground mt-3 text-base">{t('pricing.cta_body', PRICE)}</p>
          <Button size="lg" className="mt-6" asChild>
            <Link to="/download">{t('pricing.subscribe')}</Link>
          </Button>
          <p className="text-muted-foreground mt-4 text-xs">{t('pricing.cancel_note')}</p>
        </div>
      </section>

      <Footer />
    </div>
  )
}

const FlashPage: FC = () => {
  const { i18n } = useTranslation()

  if (!isEnglishSite(i18n.resolvedLanguage || i18n.language)) return <Navigate to="/" replace />

  return <FlashContent />
}

export default FlashPage
