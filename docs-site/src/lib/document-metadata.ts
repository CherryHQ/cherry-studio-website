import type { Metadata } from 'next'

import { canonicalUrl, getPage, locales } from '@/lib/content'

export function getDocumentMetadata(lang: string, slug: string): Metadata {
  const page = getPage(lang, slug)
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
