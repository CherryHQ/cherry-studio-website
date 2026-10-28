import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import Footer from '@/components/website/Footer'
import { COMPARE_SLUGS, type CompareLocale, hasCompare } from '@/content/compare'
import { usePageMeta } from '@/hooks/usePageMeta'
import { isEnglishSite } from '@/utils/urls'

export default function ArticlesPage() {
  const { t, i18n } = useTranslation()
  usePageMeta('articles')
  const locale: CompareLocale = isEnglishSite(i18n.resolvedLanguage || i18n.language) ? 'en' : 'zh'

  return (
    <div className="bg-background min-h-screen">
      <main className="mx-auto min-h-svh max-w-5xl px-4 pt-32 pb-16 sm:px-6 lg:px-8">
        <h1 className="text-foreground text-3xl font-semibold text-balance sm:text-4xl">{t('articles.title')}</h1>
        <p className="text-muted-foreground mt-4 text-lg leading-8 text-pretty">{t('articles.description')}</p>
        <ul className="mt-12 space-y-8">
          {COMPARE_SLUGS.filter((slug) => hasCompare(locale, slug)).map((slug) => (
            <li key={slug}>
              <h2 className="text-foreground text-xl font-semibold text-balance">
                <Link
                  to={`/resources/articles/${slug}`}
                  className="underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4">
                  {t(`compare.links.${slug}`)}
                </Link>
              </h2>
              <p className="text-muted-foreground mt-2 leading-7 text-pretty">
                {t(`page_description.compare_${slug.replace(/-/g, '_')}`)}
              </p>
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </div>
  )
}
