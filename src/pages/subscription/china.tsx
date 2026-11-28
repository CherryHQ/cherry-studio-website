import { ArrowRight, Clock3, Gauge, MessageCircle, Wallet, X } from 'lucide-react'
import { useRef } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import Footer from '@/components/website/Footer'
import HeroBackdrop from '@/components/website/HeroBackdrop'
import SubscriptionFaq from '@/components/website/SubscriptionFaq'
import { usePageMeta } from '@/hooks/usePageMeta'
import { cn } from '@/lib/utils'
import { ModelMark, PLAN_BUTTON, PLAN_SURFACE, TABLE_LABEL, USAGE_GRID } from './planStyles'

const SUBSCRIPTION_URL = 'https://cloud.cherryai.com.cn/account/plans'
const SUPPORT_EMAIL = 'support@cherry-ai.com'
const benefits = [
  { key: 'cost', icon: Wallet },
  { key: 'freedom', icon: Clock3 },
  { key: 'transparency', icon: Gauge }
] as const
const usageLimits = [
  { model: 'DeepSeek V4.1 Flash', amount: 40 },
  { model: 'Qwen 3.8 Flash', amount: 30 },
  { model: 'GLM 5.3 Flash', amount: 30 }
]
const rates = [
  { model: 'DeepSeek V4.1 Flash', period: 'off_peak', input: '1.00', output: '4.00', read: '0.02', write: null },
  { model: 'DeepSeek V4.1 Flash', period: 'peak', input: '2.00', output: '8.00', read: '0.04', write: null },
  { model: 'Qwen 3.8 Flash', period: null, input: '0.80', output: '2.70', read: '0.10', write: '1.25' },
  { model: 'GLM 5.3 Flash', period: null, input: '0.80', output: '2.80', read: '0.23', write: null }
]

export default function ChinaPricingPage() {
  const { t } = useTranslation()
  const supportDialog = useRef<HTMLDialogElement>(null)
  usePageMeta('plus')

  return (
    <>
      <a
        href="#plus-main"
        className="fixed left-4 top-4 z-[60] -translate-y-24 rounded-lg bg-foreground px-4 py-2 text-background focus:translate-y-0">
        {t('plus_page.skip_link')}
      </a>
      <main id="plus-main" className="relative isolate overflow-hidden bg-background text-foreground">
        <HeroBackdrop className="inset-x-0 top-0 -z-10 h-[760px] sm:h-[860px] [mask-image:linear-gradient(to_bottom,#000_62%,transparent)]" />
        <section aria-labelledby="plus-title" className="site-container site-page-top pb-16 text-center sm:pb-24">
          <h1 id="plus-title" className="on-silk font-display text-6xl leading-none text-balance sm:text-8xl">
            <span>Cherry</span> <span className="font-accent text-muted-foreground">Plus</span>
          </h1>
          <p className="mx-auto mt-6 on-silk max-w-xl text-lg text-pretty text-muted-foreground">
            {t('plus_page.subtitle')}
          </p>

          <section aria-label={t('plus_page.pricing_label')} className="relative mx-auto mt-12 max-w-md">
            <div className="rounded-[28px] bg-card p-8 text-left shadow-[inset_0_0_0_1px_var(--color-border),var(--shadow-float)] sm:p-10">
              <p className="text-sm font-medium text-muted-foreground">{t('plus_page.offer.title')}</p>
              <div className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <strong className="font-display text-8xl leading-none font-normal tabular-nums">¥9.9</strong>
                <span className="sr-only">{t('plus_page.offer.original_price')}</span>
                <del className="text-2xl text-muted-foreground tabular-nums decoration-1">¥19.9</del>
                <span className="text-lg text-muted-foreground">/ {t('plus_page.offer.first_month')}</span>
              </div>
              <p className="mt-3 text-xs leading-5 text-muted-foreground">
                {t('plus_page.offer.renewal')} · {t('plus_page.offer.ends_on')}{' '}
                <time dateTime="2026-11-30">2026/11/30</time>
              </p>
              <a
                href={SUBSCRIPTION_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(PLAN_BUTTON, 'mt-8 flex w-full')}>
                {t('plus_page.subscribe')}
              </a>
              <p className="mt-4 text-center text-xs leading-5 text-muted-foreground">{t('plus_page.fine_print')}</p>
            </div>
          </section>

          <ul
            aria-label={t('plus_page.benefits_label')}
            className="mx-auto mt-14 grid max-w-5xl gap-4 text-left md:grid-cols-3">
            {benefits.map(({ key, icon: Icon }) => (
              <li key={key} className={cn(PLAN_SURFACE, 'p-6')}>
                <span className="flex size-10 items-center justify-center rounded-full bg-background shadow-[inset_0_0_0_1px_var(--color-border)]">
                  <Icon className="size-[18px]" aria-hidden="true" />
                </span>
                <h2 className="mt-6 text-base font-semibold">
                  <Trans
                    i18nKey={`plus_page.benefits.${key}.title`}
                    components={{
                      limited: <span className="text-xs font-normal whitespace-nowrap text-muted-foreground" />
                    }}
                  />
                </h2>
                <p className="mt-2 text-sm leading-6 text-pretty text-muted-foreground">
                  {t(`plus_page.benefits.${key}.description`)}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="plus-usage-title" className="border-t border-border py-20 sm:py-28">
          <div className="site-container max-w-5xl">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 id="plus-usage-title" className="font-display text-4xl sm:text-5xl">
                {t('plus_page.usage.title')}
              </h2>
              <span className="rounded-full px-3 py-1 text-sm font-medium text-muted-foreground shadow-[inset_0_0_0_1px_var(--color-border)]">
                Plus
              </span>
            </div>

            <table
              aria-label={t('plus_page.usage.table_label')}
              aria-describedby="plus-usage-note"
              className="mt-10 block w-full text-left">
              <thead className="block">
                <tr className={cn(USAGE_GRID, TABLE_LABEL, 'px-6 pb-3')}>
                  <th scope="col" className="font-medium">
                    {t('plus_page.usage.model')}
                  </th>
                  <th scope="col" className="hidden font-medium sm:block">
                    {t('plus_page.usage.single_model')}
                  </th>
                  <th scope="col" className="text-right font-medium">
                    {t('plus_page.usage.monthly_usage')}
                  </th>
                </tr>
              </thead>
              <tbody className="block space-y-2">
                {usageLimits.map(({ model, amount }) => (
                  <tr key={model} className={cn(USAGE_GRID, PLAN_SURFACE, 'items-center px-6 py-5')}>
                    <th scope="row" className="flex items-center gap-3 text-base font-medium">
                      <ModelMark model={model} />
                      {model}
                    </th>
                    <td className="col-span-2 row-start-2 sm:col-auto sm:row-auto">
                      <span className="block h-1.5 overflow-hidden rounded-full bg-secondary" aria-hidden="true">
                        <span
                          className={cn('block h-full rounded-full bg-foreground', amount === 40 ? 'w-full' : 'w-3/4')}
                        />
                      </span>
                      <span className="sr-only">{t('plus_page.usage.exclusive_model')}</span>
                    </td>
                    <td className="text-right whitespace-nowrap">
                      <span className="text-xs text-muted-foreground">{t('plus_page.usage.up_to')}</span>{' '}
                      <span className="font-display text-3xl tabular-nums">¥{amount}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p id="plus-usage-note" className="mt-5 px-6 text-[13px] leading-6 text-muted-foreground">
              {t('plus_page.usage.note')}
            </p>

            <section aria-labelledby="plus-rates-title" className="mt-24">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <h3 id="plus-rates-title" className="font-display text-4xl sm:text-5xl">
                    {t('plus_page.rates.title')}
                  </h3>
                  <p id="plus-rates-description" className="mt-3 text-[15px] text-muted-foreground">
                    {t('plus_page.rates.description')}
                  </p>
                </div>
                <span className="inline-flex rounded-full bg-secondary p-1">
                  <span className="rounded-full bg-background px-4 py-1.5 text-sm font-medium shadow-[inset_0_0_0_1px_var(--color-border)]">
                    Plus
                  </span>
                </span>
              </div>
              <p className="mt-4 text-xs text-muted-foreground lg:hidden">{t('plus_page.rates.scroll_hint')}</p>
              <div
                role="region"
                aria-label={t('plus_page.rates.table_label')}
                aria-describedby="plus-rates-description"
                // biome-ignore lint/a11y/noNoninteractiveTabindex: Keyboard users need to scroll the pricing table horizontally.
                tabIndex={0}
                className={cn(
                  PLAN_SURFACE,
                  'mt-8 overflow-x-auto overscroll-x-contain px-6 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring'
                )}>
                <table className="w-full min-w-[720px] border-collapse text-[15px] tabular-nums [&_td]:border-t [&_td]:border-border [&_td]:px-4 [&_td]:py-5 [&_td]:whitespace-nowrap [&_td:last-child]:pr-0 [&_th]:px-4 [&_th]:text-left [&_th]:whitespace-nowrap [&_th:first-child]:pl-0">
                  <caption className="sr-only">{t('plus_page.rates.caption')}</caption>
                  <thead>
                    <tr>
                      {['model', 'input', 'output', 'cache_read', 'cache_write'].map((key) => (
                        <th scope="col" key={key} className={cn(TABLE_LABEL, 'py-4')}>
                          {t(`plus_page.rates.${key}`)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {rates.map((rate) => (
                      <tr key={`${rate.model}-${rate.period}`}>
                        <th scope="row" className="border-t border-border py-5 font-medium">
                          <span className="flex items-center gap-3">
                            <ModelMark model={rate.model} />
                            {rate.model}
                            {rate.period && (
                              <span className="rounded-full px-2 py-0.5 text-[11px] font-normal text-muted-foreground shadow-[inset_0_0_0_1px_var(--color-border)]">
                                {t(`plus_page.rates.${rate.period}`)}
                              </span>
                            )}
                          </span>
                        </th>
                        <td className="text-foreground/85">¥{rate.input}</td>
                        <td className="text-foreground/85">¥{rate.output}</td>
                        <td className="text-foreground/85">¥{rate.read}</td>
                        <td className="text-foreground/85">
                          {rate.write ? `¥${rate.write}` : t('plus_page.rates.free')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
            <aside className={cn(PLAN_SURFACE, 'mt-6 p-6')}>
              <h3 className="text-sm font-semibold leading-5">{t('plus_page.peak.title')}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{t('plus_page.peak.description')}</p>
            </aside>
          </div>
        </section>

        <section
          id="plus-faq"
          aria-labelledby="plus-faq-title"
          className="scroll-mt-24 border-t border-border px-4 py-20 sm:px-8 sm:py-28">
          <div className="mx-auto max-w-3xl">
            <h2 id="plus-faq-title" tabIndex={-1} className="font-display text-center text-4xl sm:text-5xl">
              {t('plus_page.faq.title')}
            </h2>
            <SubscriptionFaq variant="plus" />
          </div>
        </section>

        <section
          aria-labelledby="plus-cta-title"
          className="relative isolate overflow-hidden border-t border-border px-4 py-24 text-center sm:px-8 sm:py-32">
          <h2 id="plus-cta-title" className="font-display text-4xl text-balance sm:text-6xl">
            {t('plus_page.cta.title')}
          </h2>
          <p className="mt-4 text-base leading-7 text-muted-foreground">{t('plus_page.cta.description')}</p>
          <a href={SUBSCRIPTION_URL} target="_blank" rel="noopener noreferrer" className={cn(PLAN_BUTTON, 'mt-8')}>
            {t('plus_page.subscribe')}
          </a>
          <p className="mt-4 text-xs leading-5 text-muted-foreground">{t('plus_page.fine_print')}</p>
        </section>
      </main>
      <Footer />

      <button
        type="button"
        aria-label={t('plus_page.support.open')}
        aria-haspopup="dialog"
        aria-controls="plus-support-dialog"
        onClick={() => supportDialog.current?.showModal()}
        className="fixed bottom-5 right-4 z-40 flex size-12 cursor-pointer items-center justify-center rounded-full border border-border bg-card text-foreground shadow-md hover:bg-accent motion-safe:transition-transform hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">
        <MessageCircle className="size-6" aria-hidden="true" />
      </button>
      <dialog
        ref={supportDialog}
        id="plus-support-dialog"
        aria-labelledby="plus-support-title"
        aria-describedby="plus-support-description"
        className="fixed inset-0 m-auto w-[calc(100%-2rem)] max-w-[400px] rounded-[20px] border border-border bg-background p-6 text-foreground shadow-2xl backdrop:bg-black/35 backdrop:backdrop-blur-sm"
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            const bounds = event.currentTarget.getBoundingClientRect()
            if (
              event.clientX < bounds.left ||
              event.clientX > bounds.right ||
              event.clientY < bounds.top ||
              event.clientY > bounds.bottom
            ) {
              supportDialog.current?.close()
            }
          }
        }}>
        <div className="flex items-center justify-between gap-3">
          <h2 id="plus-support-title" className="text-xl font-semibold">
            {t('plus_page.support.title')}
          </h2>
          <Button
            variant="ghost"
            size="icon"
            aria-label={t('plus_page.support.close')}
            onClick={() => supportDialog.current?.close()}>
            <X aria-hidden="true" />
          </Button>
        </div>
        <p id="plus-support-description" className="mb-6 mt-4 text-sm leading-6 text-muted-foreground">
          {t('plus_page.support.description')}
        </p>
        <Button asChild className="w-full">
          <a href={`mailto:${SUPPORT_EMAIL}`}>{t('plus_page.support.email')}</a>
        </Button>
        <Link
          to="/subscription/faq"
          onClick={() => supportDialog.current?.close()}
          className="mt-4 flex items-center justify-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          {t('plus_page.support.faq')}
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </dialog>
    </>
  )
}
