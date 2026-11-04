import { type FC, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, Navigate, useLocation, useParams } from 'react-router-dom'

import Footer from '@/components/website/Footer'
import {
  type CompareLocale,
  type CompareSlug,
  formatArticleDate,
  getArticleCategory,
  getArticleLastmod,
  getCompareMarkdown,
  getReadingMinutes,
  getRelatedArticles,
  isCompareSlug,
  renderCompareMarkdown,
  splitArticleHtml
} from '@/content/compare'
import style from '@/content/compare/article-style.json'
import { usePageMeta } from '@/hooks/usePageMeta'
import NotFoundPage from '@/pages/not-found'
import { isEnglishSite } from '@/utils/urls'

const CompareArticle: FC<{ slug: CompareSlug; locale: CompareLocale; markdown: string }> = ({
  slug,
  locale,
  markdown
}) => {
  const { t } = useTranslation()
  usePageMeta(`article:${slug}`)

  const { header, body } = useMemo(() => splitArticleHtml(renderCompareMarkdown(markdown)), [markdown])
  const category = getArticleCategory(slug)
  const lastmod = getArticleLastmod(slug)
  const related = getRelatedArticles(locale, slug)

  return (
    <div className="bg-background min-h-screen">
      <article className={style.article}>
        {/* 结构和 finalize-static-site.mjs 生成的静态 HTML、BreadcrumbList 结构化数据保持一致 */}
        <header className={style.header}>
          <nav aria-label={t('articles.breadcrumb')}>
            <ol className={style.breadcrumb}>
              <li>
                <Link to="/resources/articles/" className={style.breadcrumbLink}>
                  {t('articles.title')}
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link to={`/resources/articles/#${category}`} className={style.breadcrumbCategory}>
                  {t(`articles.categories.${category}.title`)}
                </Link>
              </li>
            </ol>
          </nav>
          {/* 正文来自仓库内的 Markdown，不含用户输入 */}
          <div dangerouslySetInnerHTML={{ __html: header }} />
          <p className={style.meta}>
            <time dateTime={lastmod}>{t('articles.updated', { date: formatArticleDate(locale, lastmod) })}</time>
            <span aria-hidden="true">·</span>
            <span>{t('articles.reading_time', { count: getReadingMinutes(locale, markdown) })}</span>
          </p>
        </header>
        <div className={style.body} dangerouslySetInnerHTML={{ __html: body }} />

        {related.length > 0 && (
          <nav className={style.related} aria-label={t('compare.related')}>
            <p className={style.relatedTitle}>{t('compare.related')}</p>
            <ul className={style.relatedList}>
              {related.map((other) => (
                <li key={other}>
                  <Link to={`/resources/articles/${other}`} className={style.relatedCard}>
                    <span className={style.relatedCategory}>
                      {t(`articles.categories.${getArticleCategory(other)}.title`)}
                    </span>
                    <span className={style.relatedLinkTitle}>{t(`compare.links.${other}`)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </article>

      <Footer />
    </div>
  )
}

const ComparePage: FC = () => {
  const { slug } = useParams()
  const { i18n } = useTranslation()
  const locale: CompareLocale = isEnglishSite(i18n.resolvedLanguage || i18n.language) ? 'en' : 'zh'
  const markdown = isCompareSlug(slug) ? getCompareMarkdown(locale, slug) : undefined

  if (!isCompareSlug(slug) || !markdown) return <NotFoundPage />

  return <CompareArticle key={slug} slug={slug} locale={locale} markdown={markdown} />
}

export default ComparePage

export function LegacyCompareRedirect() {
  const { slug } = useParams()
  const { search, hash } = useLocation()
  if (!isCompareSlug(slug)) return <NotFoundPage />
  return <Navigate replace to={`/resources/articles/${slug}${search}${hash}`} />
}
