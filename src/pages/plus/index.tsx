import { ArrowDown, ArrowUpRight, MessageSquare, PenLine, Plus, Workflow } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link, Navigate } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import Footer from '@/components/website/Footer'
import { usePageMeta } from '@/hooks/usePageMeta'
import { isEnglishSite } from '@/utils/urls'

const contactUrl = 'mailto:support@cherry-ai.com?subject=Cherry%20Studio%20Plus'
const benefits = [
  { key: 'chat', icon: MessageSquare },
  { key: 'create', icon: PenLine },
  { key: 'work', icon: Workflow }
] as const
const steps = ['download', 'explore', 'plus'] as const
const questions = ['what', 'price', 'models', 'free', 'subscribe'] as const

function PlusContent() {
  const { t } = useTranslation()
  usePageMeta('plus')

  return (
    <div className="bg-background min-h-screen">
      <main className="mx-auto max-w-6xl border-x border-border/60 pt-24 sm:pt-28">
        <section className="grid items-center gap-14 px-6 py-16 sm:px-12 sm:py-24 lg:grid-cols-[1.4fr_1fr] lg:gap-10">
          <div>
            <p className="mb-7 flex items-center gap-2.5 text-xs font-medium tracking-wide text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              {t('plus_page.eyebrow')}
            </p>
            <div className="mb-7 inline-flex items-center gap-2 text-lg font-semibold tracking-tight">
              Cherry Studio <span className="rounded-md bg-primary/10 px-2 py-0.5 text-primary">Plus</span>
            </div>
            <h1 className="text-4xl leading-[1.08] font-semibold tracking-[-0.045em] sm:text-5xl lg:text-[3.5rem]">
              {t('plus_page.title')}
              <span className="mt-2 block text-primary">{t('plus_page.title_accent')}</span>
            </h1>
            <p className="mt-6 max-w-lg text-base leading-7 text-muted-foreground">{t('plus_page.description')}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button size="lg" asChild>
                <a href="#plan">
                  {t('plus_page.explore')} <ArrowDown aria-hidden="true" />
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/download">{t('plus_page.download')}</Link>
              </Button>
            </div>
            <p className="mt-5 text-xs leading-6 text-muted-foreground">{t('plus_page.hero_note')}</p>
          </div>
          <div
            aria-hidden="true"
            className="relative mx-auto w-full max-w-sm overflow-hidden rounded-2xl border border-primary/15 bg-primary/[0.035] p-6">
            <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.15em] text-primary/70 uppercase">
              <span>Cherry Studio</span>
              <span>Plus / 01</span>
            </div>
            <div className="relative my-9 flex aspect-square items-center justify-center">
              <div className="absolute inset-0 rounded-full border border-primary/10" />
              <div className="absolute inset-6 rounded-full border border-dashed border-primary/20" />
              <div className="absolute inset-12 rounded-full border border-primary/15 bg-primary/[0.025]" />
              <div className="relative flex size-40 rotate-[-8deg] items-center justify-center rounded-[2rem] border border-white/20 bg-primary text-white shadow-[0_20px_60px_-20px_var(--primary)] transition-transform duration-500 motion-safe:hover:rotate-0">
                <Plus className="size-24" strokeWidth={1.5} />
              </div>
              <span className="absolute top-8 right-4 flex size-9 items-center justify-center rounded-lg border border-primary/20 bg-background text-primary">
                +
              </span>
              <span className="absolute bottom-8 left-5 flex size-7 items-center justify-center rounded-md border border-primary/15 bg-background text-primary/60">
                +
              </span>
            </div>
            <p className="text-sm font-medium">{t('plus_page.art_label')}</p>
            <p className="mt-1 text-xs text-muted-foreground">{t('plus_page.art_caption')}</p>
          </div>
        </section>

        <section id="plan" className="scroll-mt-24 border-t border-border bg-secondary/20 px-6 py-14 sm:px-12 sm:py-20">
          <div className="grid gap-9 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
            <div>
              <p className="text-xs font-medium tracking-widest text-primary uppercase">
                {t('plus_page.plan_eyebrow')}
              </p>
              <h2 className="mt-4 max-w-xs text-3xl leading-tight font-semibold tracking-tight">
                {t('plus_page.plan_title')}
              </h2>
              <p className="mt-4 max-w-sm text-sm leading-7 text-muted-foreground">{t('plus_page.plan_description')}</p>
            </div>
            <div className="rounded-2xl border border-border bg-background p-6 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="text-lg font-semibold">{t('plus_page.plan_name')}</h3>
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  {t('plus_page.status')}
                </span>
              </div>
              <p className="mt-7 text-2xl font-semibold tracking-tight">{t('plus_page.price')}</p>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{t('plus_page.plan_note')}</p>
              <dl className="my-7 divide-y divide-border border-y border-border text-sm">
                {['price', 'models', 'usage', 'availability'].map((key) => (
                  <div key={key} className="flex flex-wrap justify-between gap-x-4 gap-y-1 py-3.5">
                    <dt>{t(`plus_page.detail_${key}`)}</dt>
                    <dd className="text-muted-foreground">{t('plus_page.announced_soon')}</dd>
                  </div>
                ))}
              </dl>
              <Button className="w-full" size="lg" asChild>
                <a href={contactUrl}>
                  {t('plus_page.contact')} <ArrowUpRight aria-hidden="true" />
                </a>
              </Button>
              <p className="mt-3 text-center text-xs leading-6 text-muted-foreground">{t('plus_page.contact_note')}</p>
            </div>
          </div>
        </section>

        <section className="border-t border-border px-6 py-14 sm:px-12 sm:py-20">
          <p className="text-xs font-medium tracking-widest text-primary uppercase">{t('plus_page.why_eyebrow')}</p>
          <h2 className="mt-4 max-w-xl text-3xl leading-tight font-semibold tracking-tight">
            {t('plus_page.why_title')}
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">{t('plus_page.why_description')}</p>
          <div className="mt-10 grid gap-8 sm:grid-cols-3">
            {benefits.map(({ key, icon: Icon }) => (
              <div key={key}>
                <Icon aria-hidden="true" className="mb-5 size-5 text-primary" strokeWidth={1.5} />
                <h3 className="text-base font-medium">{t(`plus_page.${key}_title`)}</h3>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">{t(`plus_page.${key}_description`)}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-t border-border px-6 py-14 sm:px-12 sm:py-20">
          <p className="text-xs font-medium tracking-widest text-primary uppercase">{t('plus_page.steps_eyebrow')}</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight">{t('plus_page.steps_title')}</h2>
          <ol className="mt-9 grid gap-8 sm:grid-cols-3">
            {steps.map((key, index) => (
              <li key={key} className="border-t border-border pt-5">
                <span className="font-mono text-xs text-primary">0{index + 1}</span>
                <h3 className="mt-4 text-base font-medium">{t(`plus_page.step_${key}_title`)}</h3>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">{t(`plus_page.step_${key}_description`)}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="grid gap-8 border-t border-border px-6 py-14 sm:px-12 sm:py-20 lg:grid-cols-[1fr_1.5fr] lg:gap-14">
          <div>
            <h2 className="max-w-xs text-3xl leading-tight font-semibold tracking-tight">{t('plus_page.faq_title')}</h2>
            <p className="mt-4 text-sm text-muted-foreground">{t('plus_page.faq_intro')}</p>
          </div>
          <div className="divide-y divide-border border-y border-border">
            {questions.map((key) => (
              <details key={key} name="plus-faq" className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-5 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring [&::-webkit-details-marker]:hidden">
                  {t(`plus_page.faq_${key}_question`)}
                  <Plus
                    aria-hidden="true"
                    className="size-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-45"
                  />
                </summary>
                <p className="pr-8 pb-5 text-sm leading-7 text-muted-foreground">{t(`plus_page.faq_${key}_answer`)}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="flex flex-col items-start justify-between gap-7 border-t border-border bg-primary/[0.035] px-6 py-12 sm:px-12 lg:flex-row lg:items-center">
          <div>
            <h2 className="max-w-lg text-2xl leading-tight font-semibold tracking-tight">
              {t('plus_page.closing_title')}
            </h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">{t('plus_page.closing_description')}</p>
          </div>
          <Button size="lg" className="shrink-0" asChild>
            <a href={contactUrl}>
              {t('plus_page.contact')} <ArrowUpRight aria-hidden="true" />
            </a>
          </Button>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default function PlusPage() {
  const { i18n } = useTranslation()
  if (!isEnglishSite(i18n.resolvedLanguage || i18n.language)) return <Navigate to="/" replace />
  return <PlusContent />
}
