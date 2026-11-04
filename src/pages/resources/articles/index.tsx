import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import Footer from '@/components/website/Footer'
import { type CompareLocale, getArticlesByCategory } from '@/content/compare'
import { usePageMeta } from '@/hooks/usePageMeta'
import { isEnglishSite } from '@/utils/urls'

// 和 finalize-static-site.mjs 里生成的静态列表保持同样的结构和样式
export default function ArticlesPage() {
  const { t, i18n } = useTranslation()
  usePageMeta('articles')
  const locale: CompareLocale = isEnglishSite(i18n.resolvedLanguage || i18n.language) ? 'en' : 'zh'
  const groups = getArticlesByCategory(locale)

  return (
    <div className="bg-background min-h-screen">
      <main className="mx-auto min-h-svh max-w-5xl px-4 pt-32 pb-16 sm:px-6 lg:px-8">
        <h1 className="text-foreground text-3xl font-semibold text-balance sm:text-4xl">{t('articles.title')}</h1>
        {groups.length > 1 && (
          <nav aria-label={t('articles.categories_label')} className="mt-8 flex flex-wrap gap-2">
            {groups.map(({ category }) => (
              <a
                key={category}
                href={`#${category}`}
                className="border-border text-muted-foreground hover:text-foreground rounded-full border px-4 py-1.5 text-sm transition-colors">
                {t(`articles.categories.${category}.title`)}
              </a>
            ))}
          </nav>
        )}
        {groups.map(({ category, slugs }) => (
          <section key={category} id={category} className="mt-14 scroll-mt-28">
            <h2 className="text-foreground text-2xl font-semibold">{t(`articles.categories.${category}.title`)}</h2>
            <p className="text-muted-foreground mt-2 leading-7 text-pretty">
              {t(`articles.categories.${category}.description`)}
            </p>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2">
              {slugs.map((slug) => (
                <li key={slug}>
                  <Link
                    to={`/resources/articles/${slug}`}
                    className="border-border hover:border-foreground/30 block h-full rounded-xl border p-5 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4">
                    <h3 className="text-foreground text-lg font-semibold text-balance">{t(`compare.links.${slug}`)}</h3>
                    <p className="text-muted-foreground mt-2 text-sm leading-6 text-pretty">
                      {t(`page_description.compare_${slug.replace(/-/g, '_')}`)}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </main>
      <Footer />
    </div>
  )
}
