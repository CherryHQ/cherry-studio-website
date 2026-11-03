import { ArrowLeft, Mail } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import Footer from '@/components/website/Footer'
import SubscriptionFaq from '@/components/website/SubscriptionFaq'
import { usePageMeta } from '@/hooks/usePageMeta'
import { isEnglishSite } from '@/utils/urls'

export default function FaqPage() {
  const { t, i18n } = useTranslation()
  const variant = isEnglishSite(i18n.language) ? 'flash' : 'plus'
  usePageMeta('faq')

  return (
    <>
      <main className="min-h-[70vh] bg-background px-4 pb-20 pt-28 text-foreground sm:px-8 sm:pt-32">
        <div className="mx-auto max-w-3xl">
          <Link
            to="/flash"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">
            <ArrowLeft className="size-4" aria-hidden="true" />
            {t('faq_page.back')}
          </Link>
          <h1 className="mt-8 text-3xl font-bold tracking-tight sm:text-4xl">{t('faq_page.title')}</h1>
          <p className="mt-4 text-base leading-7 text-muted-foreground">{t('faq_page.description')}</p>
          <SubscriptionFaq key={variant} variant={variant} headingLevel="h2" />
          <aside className="mt-10 rounded-2xl border border-border p-6">
            <h2 className="font-semibold">{t('faq_page.contact_title')}</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{t('faq_page.contact_description')}</p>
            <a
              href="mailto:support@cherry-ai.com"
              className="mt-4 inline-flex items-center gap-2 text-sm text-primary underline-offset-4 hover:underline">
              <Mail className="size-4 shrink-0" aria-hidden="true" />
              support@cherry-ai.com
            </a>
          </aside>
        </div>
      </main>
      <Footer />
    </>
  )
}
