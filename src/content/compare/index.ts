import { marked } from 'marked'

import catalog from './catalog.json'

// 文章正文：每种语言一个 Markdown 文件，文件名就是 URL slug（/resources/articles/<slug>）。
// scripts/finalize-static-site.mjs 读取同一批文件和 catalog.json 生成静态 HTML、sitemap 和结构化数据，
// 所以新增或删除页面只需要改这里的列表、catalog.json 和对应的 Markdown 文件。

export const COMPARE_SLUGS = [
  'manus',
  'chatgpt-desktop-app',
  'lm-studio',
  'chatbox',
  'ai-translation',
  'mcp',
  'ai-knowledge-base',
  'ai-office-assistant'
] as const

export type CompareSlug = (typeof COMPARE_SLUGS)[number]
export type CompareLocale = 'en' | 'zh'
export type ArticleCategory = 'compare' | 'use-cases'

export const ARTICLE_CATEGORIES = catalog.categories as ArticleCategory[]

const files = import.meta.glob<string>('./*/*.md', { query: '?raw', import: 'default', eager: true })

export function isCompareSlug(value: string | undefined): value is CompareSlug {
  return COMPARE_SLUGS.includes(value as CompareSlug)
}

export function getCompareMarkdown(locale: CompareLocale, slug: CompareSlug): string | undefined {
  return files[`./${locale}/${slug}.md`]
}

export function hasCompare(locale: CompareLocale, slug: CompareSlug): boolean {
  return getCompareMarkdown(locale, slug) !== undefined
}

export function getArticleCategory(slug: CompareSlug): ArticleCategory {
  return (catalog.articles as Record<string, { category: ArticleCategory }>)[slug].category
}

// 当前语言已上线、按分类分组的文章，分类顺序和组内顺序都跟 catalog.json 一致
export function getArticlesByCategory(locale: CompareLocale): { category: ArticleCategory; slugs: CompareSlug[] }[] {
  return ARTICLE_CATEGORIES.map((category) => ({
    category,
    slugs: COMPARE_SLUGS.filter((slug) => getArticleCategory(slug) === category && hasCompare(locale, slug))
  })).filter(({ slugs }) => slugs.length > 0)
}

// 相关文章：同分类在前，其他分类补足，让每篇文章都链到不同类型的内容
export function getRelatedArticles(locale: CompareLocale, slug: CompareSlug, limit = 6): CompareSlug[] {
  const others = COMPARE_SLUGS.filter((other) => other !== slug && hasCompare(locale, other))
  const category = getArticleCategory(slug)
  return [
    ...others.filter((other) => getArticleCategory(other) === category),
    ...others.filter((other) => getArticleCategory(other) !== category)
  ].slice(0, limit)
}

// marked 输出的表格外面包一层可横向滚动的容器，窄屏上不撑破页面。
// finalize-static-site.mjs 里有同样的处理，改这里时两边一起改。
export function renderCompareMarkdown(markdown: string): string {
  const html = marked.parse(markdown, { async: false })
  return html.replace(/<table>/g, '<div class="overflow-x-auto"><table>').replace(/<\/table>/g, '</table></div>')
}
