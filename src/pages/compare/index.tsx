import { type FC, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, Navigate, useLocation, useParams } from 'react-router-dom'

import Footer from '@/components/website/Footer'
import {
  type CompareLocale,
  type CompareSlug,
  getArticleCategory,
  getCompareMarkdown,
  getRelatedArticles,
  isCompareSlug,
  renderCompareMarkdown
} from '@/content/compare'
import articleStyle from '@/content/compare/article-style.json'
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

  const html = useMemo(() => renderCompareMarkdown(markdown), [markdown])
  const category = getArticleCategory(slug)
  const related = getRelatedArticles(locale, slug)

  return (
    <div className="bg-background min-h-screen">
      <article className={articleStyle.className}>
        {/* 面包屑：和 finalize-static-site.mjs 生成的静态 HTML、BreadcrumbList 结构化数据保持一致 */}
        <nav aria-label={t('articles.breadcrumb')} className="mb-8 text-sm">
          <ol className="text-muted-foreground flex flex-wrap items-center gap-x-2 gap-y-1">
            <li>
              <Link to="/resources/articles/" className="hover:text-foreground focus-visible:outline-2">
                {t('articles.title')}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link to={`/resources/articles/#${category}`} className="hover:text-foreground focus-visible:outline-2">
                {t(`articles.categories.${category}.title`)}
              </Link>
            </li>
          </ol>
        </nav>
        {/* 正文来自仓库内的 Markdown，不含用户输入 */}
        <div className="article-body" dangerouslySetInnerHTML={{ __html: html }} />

        {related.length > 0 && (
          <nav className="border-border mt-14 border-t pt-6" aria-label={t('compare.related')}>
            <p className="text-foreground text-sm font-semibold">{t('compare.related')}</p>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {related.map((other) => (
                <li key={other}>
                  <Link
                    to={`/resources/articles/${other}`}
                    className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                    {t(`compare.links.${other}`)}
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
