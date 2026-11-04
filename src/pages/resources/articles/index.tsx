import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import Footer from '@/components/website/Footer'
import { type CompareLocale, formatArticleDate, getArticleLastmod, getArticlesByCategory } from '@/content/compare'
import style from '@/content/compare/article-style.json'
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
      <main className={style.index}>
        <h1 className={style.indexTitle}>{t('articles.title')}</h1>
        {groups.length > 1 && (
          <nav aria-label={t('articles.categories_label')} className={style.indexChips}>
            {groups.map(({ category, slugs }) => (
              <a key={category} href={`#${category}`} className={style.indexChip}>
                {t(`articles.categories.${category}.title`)}
                <span className={style.indexChipCount}>{slugs.length}</span>
              </a>
            ))}
          </nav>
        )}
        {groups.map(({ category, slugs }) => (
          <section key={category} id={category} className={style.indexSection}>
            <h2 className={style.indexSectionTitle}>{t(`articles.categories.${category}.title`)}</h2>
            <p className={style.indexSectionDescription}>{t(`articles.categories.${category}.description`)}</p>
            <ul className={style.indexList}>
              {slugs.map((slug) => (
                <li key={slug}>
                  <Link to={`/resources/articles/${slug}`} className={style.indexCard}>
                    <h3 className={style.indexCardTitle}>{t(`compare.links.${slug}`)}</h3>
                    <p className={style.indexCardDescription}>
                      {t(`page_description.compare_${slug.replace(/-/g, '_')}`)}
                    </p>
                    <span className={style.indexCardFooter}>
                      <time dateTime={getArticleLastmod(slug)}>
                        {formatArticleDate(locale, getArticleLastmod(slug))}
                      </time>
                      <span className={style.indexCardMore} aria-hidden="true">
                        {t('articles.read_more')} →
                      </span>
                    </span>
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
