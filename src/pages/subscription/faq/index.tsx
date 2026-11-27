import { ArrowLeft, Mail } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import Footer from '@/components/website/Footer'
import HeroBackdrop from '@/components/website/HeroBackdrop'
import SubscriptionFaq from '@/components/website/SubscriptionFaq'
import { usePageMeta } from '@/hooks/usePageMeta'
import { isEnglishSite } from '@/utils/urls'

export default function SubscriptionFaqPage() {
  const { t, i18n } = useTranslation()
  const variant = isEnglishSite(i18n.language) ? 'flash' : 'plus'
  usePageMeta('faq')

  return (
    <>
      <main className="site-page-top relative isolate min-h-[70vh] overflow-hidden bg-background px-6 pb-16 text-foreground">
        <HeroBackdrop className="inset-x-0 top-0 -z-10 h-[440px] sm:h-[500px] [mask-image:linear-gradient(to_bottom,#000_72%,transparent)]" />
        <div className="mx-auto max-w-3xl">
          <Link
            to="/subscription"
            className="inline-flex on-silk items-center gap-2 text-sm text-muted-foreground hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">
            <ArrowLeft className="size-4" aria-hidden="true" />
            {t('faq_page.back')}
          </Link>
          <h1 className="mt-8 on-silk text-balance text-5xl font-display sm:text-7xl">{t('faq_page.title')}</h1>
          <p className="mt-4 on-silk text-base leading-7 text-muted-foreground">{t('faq_page.description')}</p>
          <SubscriptionFaq key={variant} variant={variant} headingLevel="h2" />
          <aside className="mt-10 rounded-lg border border-border p-6">
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
