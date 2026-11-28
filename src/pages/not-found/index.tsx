import { ArrowLeft, Download } from 'lucide-react'
import type { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import Footer from '@/components/website/Footer'
import { usePageMeta } from '@/hooks/usePageMeta'

const NotFoundPage: FC = () => {
  const { t } = useTranslation()
  usePageMeta('notFound')

  return (
    <div className="bg-background flex min-h-screen flex-col">
      <main className="site-container site-page-top flex flex-1 flex-col items-start justify-center pb-16">
        <p className="text-primary font-mono text-xs tracking-widest uppercase">{t('not_found.code')}</p>
        <h1 className="text-foreground mt-4 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
          {t('not_found.title')}
        </h1>
        <p className="text-muted-foreground mt-4 max-w-md text-base">{t('not_found.description')}</p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Button size="lg" className="rounded-md px-4" asChild>
            <Link to="/">
              <ArrowLeft className="h-4 w-4" />
              {t('not_found.back_home')}
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
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
