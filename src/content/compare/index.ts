import { marked } from 'marked'

// 对比页正文：每种语言一个 Markdown 文件，文件名就是 URL slug（/compare/<slug>）。
// scripts/finalize-static-site.mjs 读取同一批文件生成静态 HTML、sitemap 和 FAQ 结构化数据，
// 所以新增或删除页面只需要改这里的列表和对应的 Markdown 文件。

export const COMPARE_SLUGS = ['manus', 'chatgpt-desktop-app', 'lm-studio'] as const

export type CompareSlug = (typeof COMPARE_SLUGS)[number]
export type CompareLocale = 'en' | 'zh'

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

// marked 输出的表格外面包一层可横向滚动的容器，窄屏上不撑破页面。
// finalize-static-site.mjs 里有同样的处理，改这里时两边一起改。
export function renderCompareMarkdown(markdown: string): string {
  const html = marked.parse(markdown, { async: false })
  return html.replace(/<table>/g, '<div class="overflow-x-auto"><table>').replace(/<\/table>/g, '</table></div>')
}
