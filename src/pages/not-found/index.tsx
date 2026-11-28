import { ArrowLeft, Download } from 'lucide-react'
import type { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import LogoDrawDemo from '@/components/demos/mobile/LogoDrawDemo'
import { Button } from '@/components/ui/button'
import Footer from '@/components/website/Footer'
import HeroBackdrop from '@/components/website/HeroBackdrop'
import { usePageMeta } from '@/hooks/usePageMeta'

const NotFoundPage: FC = () => {
  const { t } = useTranslation()
  usePageMeta('notFound')

  return (
    <div className="relative isolate overflow-hidden bg-background flex min-h-screen flex-col">
      <HeroBackdrop className="inset-x-0 top-0 -z-10 h-full" fade={72} />
      <main className="site-container site-page-top flex flex-1 flex-col items-start justify-center pb-16">
        <LogoDrawDemo bare size={72} className="mb-8" />
        <p className="on-silk text-sm font-medium text-muted-foreground">{t('not_found.code')}</p>
        <h1 className="mt-4 on-silk text-balance text-5xl font-display sm:text-7xl">{t('not_found.title')}</h1>
        <p className="on-silk text-muted-foreground mt-4 max-w-md text-base">{t('not_found.description')}</p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Button size="lg" className="rounded-full px-5" asChild>
            <Link to="/">
              <ArrowLeft className="h-4 w-4" />
              {t('not_found.back_home')}
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="rounded-full px-5" asChild>
            <Link to="/download">
              <Download className="h-4 w-4" />
              {t('not_found.download')}
            </Link>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default NotFoundPage
