import { type FC, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, Navigate, useLocation, useParams } from 'react-router-dom'

import Footer from '@/components/website/Footer'
import {
  COMPARE_SLUGS,
  type CompareLocale,
  type CompareSlug,
  getCompareMarkdown,
  hasCompare,
  isCompareSlug,
  renderCompareMarkdown
} from '@/content/compare'
import articleStyle from '@/content/compare/article-style.json'
import { type PageType, usePageMeta } from '@/hooks/usePageMeta'
import NotFoundPage from '@/pages/not-found'
import { isEnglishSite } from '@/utils/urls'

const PAGE_TYPE_BY_SLUG: Record<CompareSlug, PageType> = {
  manus: 'compareManus',
  'chatgpt-desktop-app': 'compareChatgptDesktopApp',
  'lm-studio': 'compareLmStudio'
}

const CompareArticle: FC<{ slug: CompareSlug; locale: CompareLocale; markdown: string }> = ({
  slug,
  locale,
  markdown
}) => {
  const { t } = useTranslation()
  usePageMeta(PAGE_TYPE_BY_SLUG[slug])

  const html = useMemo(() => renderCompareMarkdown(markdown), [markdown])
  const related = COMPARE_SLUGS.filter((other) => other !== slug && hasCompare(locale, other))

  return (
    <div className="bg-background min-h-screen">
      <article className={articleStyle.className}>
        <Link
          to="/resources/articles/"
          className="mb-8 inline-block text-sm focus-visible:outline-2 focus-visible:outline-offset-4">
          {t('articles.back')}
        </Link>
        {/* 正文来自仓库内的 Markdown，不含用户输入 */}
        <div dangerouslySetInnerHTML={{ __html: html }} />

        {related.length > 0 && (
          <nav className="border-border mt-14 border-t pt-6" aria-label={t('compare.related')}>
            <p className="text-foreground text-sm font-semibold">{t('compare.related')}</p>
            <ul className="mt-3 space-y-2">
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
