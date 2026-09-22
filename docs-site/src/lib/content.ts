import type { Item, Node, Root } from 'fumadocs-core/page-tree'

import data from '../../generated/content.json'
import redirects from '../../generated/legacy-redirects.json'
import languages from '../../locales.json'

export const locales = languages
export type Locale = (typeof locales)[number]['code']
export const pages = data.pages
export type DocumentationSection = 'desktop' | 'mobile'

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

export function isMobileSlug(slug: string) {
  return slug === 'mobile' || slug.startsWith('mobile/')
}

export function getTree(locale: string): Root {
  // Next.js adds basePath to framework links; raw article links already include /docs.
  return JSON.parse(JSON.stringify(data.trees[locale as keyof typeof data.trees]).replaceAll('"/docs/', '"/'))
}

function filterTreeNodes(nodes: Node[], keepPage: (page: Item) => boolean): Node[] {
  const filtered: Node[] = []
  let pendingSeparator: Node | undefined

  for (const node of nodes) {
    if (node.type === 'separator') {
      pendingSeparator = node
      continue
    }

    if (node.type === 'page') {
      if (!keepPage(node)) continue
      if (pendingSeparator) filtered.push(pendingSeparator)
      pendingSeparator = undefined
      filtered.push(node)
      continue
    }

    const children = filterTreeNodes(node.children, keepPage)
    const index = node.index && keepPage(node.index) ? node.index : undefined
    if (!index && children.length === 0) continue

    if (pendingSeparator) filtered.push(pendingSeparator)
    pendingSeparator = undefined
    filtered.push({ ...node, index, children })
  }

  return filtered
}

export function getSectionTree(locale: string, section: DocumentationSection): Root {
  const tree = getTree(locale)
  const mobilePrefix = `/${locale}/mobile`
  const isMobilePage = (page: Item) => page.url === `${mobilePrefix}/` || page.url.startsWith(`${mobilePrefix}/`)
  const keepPage = section === 'mobile' ? isMobilePage : (page: Item) => !isMobilePage(page)
  const children = filterTreeNodes(tree.children, keepPage)
  const sectionChildren = children[0]?.type === 'separator' ? children.slice(1) : children

  return {
    ...tree,
    name: section === 'mobile' ? 'Cherry Studio Mobile' : tree.name,
    children: sectionChildren,
    fallback: tree.fallback
      ? {
          ...tree.fallback,
          children: filterTreeNodes(tree.fallback.children, keepPage)
        }
      : undefined
  }
}
export function siteUrl(locale: string) {
  return locale === 'zh-cn' ? 'https://cherryai.com.cn' : 'https://cherryai.com'
}
export function canonicalUrl(locale: string, slug: string) {
  return `${siteUrl(locale)}/docs/${locale}/${slug ? `${slug.split('/').map(encodeURIComponent).join('/')}/` : ''}`
}
