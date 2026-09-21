import { DocsBody, DocsPage, DocsTitle } from 'fumadocs-ui/page'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { canonicalUrl, getPage, locales, pages } from '@/lib/content'

type Props = { params: Promise<{ lang: string; slug?: string[] }> }
export const dynamicParams = false
export function generateStaticParams({ params }: { params: { lang: string } }) {
  return pages
    .filter((page) => page.locale === params.lang)
    .map((page) => ({ slug: page.slug ? page.slug.split('/') : [] }))
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug = [] } = await params
  const page = getPage(lang, slug.join('/'))
  if (!page) return {}
  const originalLocale = page.fallback ? 'zh-cn' : lang
  return {
    title: `${page.title} | Cherry Studio Docs`,
    description: page.description,
    alternates: {
      canonical: canonicalUrl(originalLocale, page.slug),
      languages: Object.fromEntries(
        locales.flatMap((locale) => {
          const translated = getPage(locale.code, page.slug)
          return translated && !translated.fallback ? [[locale.code, canonicalUrl(locale.code, page.slug)]] : []
        })
      )
    },
    robots: page.fallback ? { index: false, follow: true } : undefined
  }
}
export default async function Page({ params }: Props) {
  const { lang, slug = [] } = await params
  const page = getPage(lang, slug.join('/'))
  if (!page) notFound()
  return (
    <DocsPage
      toc={page.toc}
      editOnGithub={{
        owner: 'CherryHQ',
        repo: 'cherry-studio-website',
        sha: 'main',
        path: `docs-site/content/${page.file}`
      }}>
      <DocsTitle>{page.title}</DocsTitle>
      <DocsBody>
        <div
          lang={page.fallback ? 'zh-cn' : lang}
          className="[&_[id]]:scroll-mt-40 lg:[&_[id]]:scroll-mt-28 [&_[data-cards]]:grid [&_[data-cards]]:gap-3 [&_[data-cards]]:sm:grid-cols-2 [&_[data-card]]:rounded-xl [&_[data-card]]:border [&_[data-card]]:border-fd-border [&_[data-card]]:p-4 [&_[data-table-container]]:my-6 [&_[data-table-container]]:overflow-x-auto [&_[data-table-container]]:rounded-lg [&_[data-table-container]_table]:my-0 [&_aside]:my-5 [&_aside]:rounded-xl [&_aside]:border [&_aside]:border-fd-border [&_aside]:bg-fd-muted/50 [&_aside]:px-5 [&_aside]:py-1 [&_figure]:my-6 [&_figcaption]:text-center [&_figcaption]:text-sm [&_figcaption]:text-fd-muted-foreground [&_img]:rounded-xl [&_pre]:overflow-x-auto [&_pre]:rounded-xl [&_pre]:bg-fd-muted [&_pre]:p-4"
          dangerouslySetInnerHTML={{ __html: page.html }}
        />
      </DocsBody>
    </DocsPage>
  )
}
