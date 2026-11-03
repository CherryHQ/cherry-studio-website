import { ArrowRight, Clock3, Gauge, MessageCircle, Wallet, X } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import Footer from '@/components/website/Footer'
import SectionDivider from '@/components/website/SectionDivider'
import SubscriptionFaq from '@/components/website/SubscriptionFaq'
import { usePageMeta } from '@/hooks/usePageMeta'
import { cn } from '@/lib/utils'

const SUBSCRIPTION_URL = 'https://cloud.cherryai.com/account/plans'
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

  useEffect(() => {
    // This page has its own subscription support dialog. Restore the site chatbot on navigation.
    const chatbotClasses = ['[&>#dify-chatbot-bubble-button]:hidden!', '[&>#dify-chatbot-bubble-window]:hidden!']
    document.body.classList.add(...chatbotClasses)
    return () => document.body.classList.remove(...chatbotClasses)
  }, [])

  return (
    <>
      <a
        href="#plus-main"
        className="fixed left-4 top-4 z-[60] -translate-y-24 rounded-lg bg-foreground px-4 py-2 text-background focus:translate-y-0">
        {t('plus_page.skip_link')}
      </a>
      <main id="plus-main" className="bg-background text-foreground">
        <section aria-labelledby="plus-title" className="px-4 pb-6 pt-28 text-center sm:px-8 sm:pt-32">
          <h1
            id="plus-title"
            className="text-5xl font-bold leading-none tracking-[-2px] sm:text-6xl sm:tracking-[-2.5px]">
            Cherry <span className="text-primary">Plus</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground sm:text-xl">{t('plus_page.subtitle')}</p>
        </section>

        <section aria-label={t('plus_page.benefits_label')} className="px-4 pb-12 pt-2 sm:px-8">
          <div className="mx-auto grid max-w-5xl gap-10 sm:grid-cols-3">
            {benefits.map(({ key, icon: Icon }) => (
              <article key={key} className="text-center">
                <div className="mx-auto flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="size-5" strokeWidth={1.65} aria-hidden="true" />
                </div>
                <h2 className="mt-4 text-base font-semibold leading-6">{t(`plus_page.benefits.${key}.title`)}</h2>
                <p className="mx-auto mt-2 max-w-[350px] whitespace-pre-line text-sm leading-6 text-muted-foreground">
                  {t(`plus_page.benefits.${key}.description`)}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section aria-label={t('plus_page.pricing_label')} className="px-4 pb-20 sm:px-8">
          <div className="mx-auto max-w-lg rounded-3xl border-2 border-primary/35 bg-background p-10 text-center shadow-xl">
            <div className="flex items-baseline justify-center gap-2 tabular-nums">
              <strong className="text-6xl font-bold leading-none tracking-[-2px]">19.9</strong>
              <span className="text-xl text-muted-foreground">{t('plus_page.per_month')}</span>
            </div>
            <Button asChild size="lg" className="mt-8 w-full">
              <a href={SUBSCRIPTION_URL} target="_blank" rel="noopener noreferrer">
                {t('plus_page.subscribe')}
              </a>
            </Button>
            <p className="mt-3.5 text-xs leading-5 text-muted-foreground">{t('plus_page.fine_print')}</p>
          </div>
        </section>

        <SectionDivider className="py-4 sm:py-4" />

        <section aria-labelledby="plus-usage-title" className="px-4 py-16 sm:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="flex items-center justify-between gap-4">
              <h2 id="plus-usage-title" className="text-[23px] font-semibold leading-9 tracking-tight sm:text-[26px]">
                {t('plus_page.usage.title')}
              </h2>
              <span className="flex items-center gap-2.5 font-mono text-sm font-semibold">
                <span className="h-[17px] w-1 rounded-sm bg-primary" aria-hidden="true" />
                Plus
              </span>
            </div>

            <table
              aria-label={t('plus_page.usage.table_label')}
              aria-describedby="plus-usage-note"
              className="mt-7 block w-full text-left">
              <thead className="block">
                <tr className="grid grid-cols-[minmax(0,1fr)_86px] gap-3 rounded-lg border border-border bg-secondary/70 px-2.5 py-3 text-[13px] text-muted-foreground sm:grid-cols-[minmax(200px,1.2fr)_minmax(80px,1fr)_110px] sm:gap-5 sm:px-5 sm:py-3.5 lg:grid-cols-[minmax(220px,1.15fr)_minmax(100px,1.8fr)_140px] lg:gap-8">
                  <th scope="col" className="font-normal">
                    {t('plus_page.usage.model')}
                  </th>
                  <th scope="col" className="hidden font-normal sm:block">
                    {t('plus_page.usage.single_model')}
                  </th>
                  <th scope="col" className="text-right font-normal">
                    {t('plus_page.usage.monthly_usage')}
                  </th>
                </tr>
              </thead>
              <tbody className="block">
                {usageLimits.map(({ model, amount }) => (
                  <tr
                    key={model}
                    className="grid grid-cols-[minmax(0,1fr)_86px] items-center gap-3 px-2.5 py-5 sm:grid-cols-[minmax(200px,1.2fr)_minmax(80px,1fr)_110px] sm:gap-5 sm:px-5 sm:py-6 lg:grid-cols-[minmax(220px,1.15fr)_minmax(100px,1.8fr)_140px] lg:gap-8">
                    <th scope="row" className="font-mono text-[13px] font-normal sm:text-base">
                      {model}
                    </th>
                    <td className="col-span-2 row-start-2 sm:col-auto sm:row-auto">
                      <span
                        className="block h-2 overflow-hidden rounded-[3px] bg-secondary sm:h-2.5"
                        aria-hidden="true">
                        <span
                          className={cn(
                            'block h-full rounded-[3px] bg-gradient-to-r from-primary/60 to-primary',
                            amount === 40 ? 'w-full' : 'w-3/4'
                          )}
                        />
                      </span>
                      <span className="sr-only">{t('plus_page.usage.exclusive_model')}</span>
                    </td>
                    <td className="whitespace-nowrap text-right font-mono text-base tabular-nums">
                      <span className="text-xs text-muted-foreground">{t('plus_page.usage.up_to')}</span> ¥{amount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p
              id="plus-usage-note"
              className="border-t border-border pt-[18px] text-[13px] leading-6 text-muted-foreground">
              {t('plus_page.usage.note')}
            </p>

            <section aria-labelledby="plus-rates-title" className="mt-12 sm:mt-16">
              <h3 id="plus-rates-title" className="text-[23px] font-semibold leading-9 tracking-tight sm:text-[26px]">
                {t('plus_page.rates.title')}
              </h3>
              <p
                id="plus-rates-description"
                className="mt-2 text-sm leading-[26px] text-muted-foreground sm:text-[15px]">
                {t('plus_page.rates.description')}
              </p>
              <div className="mt-6 border-b border-border">
                <span className="-mb-px inline-block border-b-2 border-foreground px-[22px] pb-4 pt-3 font-mono text-[17px] font-semibold">
                  Plus
                </span>
              </div>
              <p className="mt-3.5 text-xs text-muted-foreground lg:hidden">{t('plus_page.rates.scroll_hint')}</p>
              <div
                role="region"
                aria-label={t('plus_page.rates.table_label')}
                aria-describedby="plus-rates-description"
                // biome-ignore lint/a11y/noNoninteractiveTabindex: Keyboard users need to scroll the pricing table horizontally.
                tabIndex={0}
                className="overflow-x-auto overscroll-x-contain focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-4">
                <table className="w-full min-w-[720px] border-collapse font-mono text-sm tabular-nums sm:text-[15px] [&_td]:whitespace-nowrap [&_td]:border-b [&_td]:border-border [&_td]:px-5 [&_td]:py-[22px] [&_td:last-child]:pr-0 [&_th]:whitespace-nowrap [&_th]:border-b [&_th]:border-border [&_th]:px-5 [&_th]:text-left [&_th:first-child]:pl-0 [&_th:last-child]:pr-0">
                  <caption className="sr-only">{t('plus_page.rates.caption')}</caption>
                  <thead>
                    <tr>
                      {['model', 'input', 'output', 'cache_read', 'cache_write'].map((key) => (
                        <th scope="col" key={key} className="py-[26px] text-sm font-semibold">
                          {t(`plus_page.rates.${key}`)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {rates.map((rate) => (
                      <tr key={`${rate.model}-${rate.period}`} className="hover:bg-secondary/30">
                        <th scope="row" className="py-[22px] font-normal">
                          {rate.model}
                          {rate.period && (
                            <span className="ml-2 inline-block border border-border px-1.5 py-px align-middle text-[11px] text-muted-foreground">
                              {t(`plus_page.rates.${rate.period}`)}
                            </span>
                          )}
                        </th>
                        <td>¥{rate.input}</td>
                        <td>¥{rate.output}</td>
                        <td>¥{rate.read}</td>
                        <td>{rate.write ? `¥${rate.write}` : t('plus_page.rates.free')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
            <aside className="mt-8 rounded-2xl border border-border bg-secondary/20 p-5">
              <h3 className="text-sm font-semibold leading-5">{t('plus_page.peak.title')}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{t('plus_page.peak.description')}</p>
            </aside>
            <a
              href="https://cherryai.com/subscription/usage"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-1 text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline">
              {t('plus_page.usage.rules')}
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
          </div>
        </section>

        <SectionDivider className="py-4 sm:py-4" />

        <section id="plus-faq" aria-labelledby="plus-faq-title" className="scroll-mt-24 px-4 py-16 sm:px-8">
          <div className="mx-auto max-w-3xl">
            <h2
              id="plus-faq-title"
              tabIndex={-1}
              className="text-center text-2xl font-bold leading-10 tracking-tight sm:text-3xl">
              {t('plus_page.faq.title')}
            </h2>
            <SubscriptionFaq variant="plus" />
          </div>
        </section>

        <section aria-labelledby="plus-cta-title" className="px-4 py-16 text-center sm:px-8">
          <h2 id="plus-cta-title" className="text-2xl font-bold leading-10 tracking-tight sm:text-3xl">
            {t('plus_page.cta.title')}
          </h2>
          <p className="mt-3 text-base leading-7 text-muted-foreground">{t('plus_page.cta.description')}</p>
          <Button asChild size="lg" className="mt-6 min-w-[186px]">
            <a href={SUBSCRIPTION_URL} target="_blank" rel="noopener noreferrer">
              {t('plus_page.subscribe')}
            </a>
          </Button>
          <p className="mt-3.5 text-xs leading-5 text-muted-foreground">{t('plus_page.fine_print')}</p>
        </section>
      </main>
      <Footer />

      <button
        type="button"
        aria-label={t('plus_page.support.open')}
        aria-haspopup="dialog"
        aria-controls="plus-support-dialog"
        onClick={() => supportDialog.current?.showModal()}
        className="fixed bottom-5 right-4 z-40 flex size-12 cursor-pointer items-center justify-center rounded-full bg-chart-4 text-primary-foreground shadow-lg motion-safe:transition-transform hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">
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
