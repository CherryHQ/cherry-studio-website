import type { Root } from 'fumadocs-core/page-tree'

import data from '../../generated/content.json'
import redirects from '../../generated/legacy-redirects.json'
import languages from '../../locales.json'

export const locales = languages
export type Locale = (typeof locales)[number]['code']
export const pages = data.pages
export function isLocale(locale: string) {
  return locales.some((item) => item.code === locale)
}
export function getPage(locale: string, slug: string) {
  let decoded: string
  try {
    decoded = decodeURIComponent(slug)
  } catch {
    return undefined
  }
  return pages.find((page) => page.locale === locale && page.slug === decoded)
}
export function getRedirect(locale: string, slug: string) {
  return redirects[`/docs/${locale}/${slug}` as keyof typeof redirects]
}
export function getRedirectSlugs(locale: string) {
  const prefix = `/docs/${locale}/`
  return Object.keys(redirects)
    .filter((path) => path.startsWith(prefix))
    .map((path) => path.slice(prefix.length))
}
export function getTree(locale: string): Root {
  // Next.js adds basePath to framework links; raw article links already include /docs.
  return JSON.parse(JSON.stringify(data.trees[locale as keyof typeof data.trees]).replaceAll('"/docs/', '"/'))
}
export function siteUrl(locale: string) {
  return locale === 'zh-cn' ? 'https://cherryai.com.cn' : 'https://cherryai.com'
}
export function canonicalUrl(locale: string, slug: string) {
  return `${siteUrl(locale)}/docs/${locale}/${slug ? `${slug.split('/').map(encodeURIComponent).join('/')}/` : ''}`
}
