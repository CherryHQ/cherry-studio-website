import type { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'

import { DocumentPage } from '@/components/document-page'
import { getPage, getRedirect, getRedirectSlugs, pages } from '@/lib/content'
import { getDocumentMetadata } from '@/lib/document-metadata'

type Props = { params: Promise<{ lang: string; slug?: string[] }> }

export const dynamicParams = false

export function generateStaticParams({ params }: { params: { lang: string } }) {
  const slugs = [
    ...pages.filter((page) => page.locale === params.lang).map((page) => page.slug),
    ...getRedirectSlugs(params.lang)
  ]
  return [...new Set(slugs)].map((slug) => ({ slug: slug ? slug.split('/') : [] }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug = [] } = await params
  return getDocumentMetadata(lang, slug.join('/'))
}

export default async function DocsRoute({ params }: Props) {
  const { lang, slug = [] } = await params
  const joined = slug.join('/')
  const target = getRedirect(lang, joined)
  if (target) redirect(target.replace(/^\/docs/, ''))

  const page = getPage(lang, joined)
  if (!page) notFound()

  return <DocumentPage lang={lang} page={page} />
}
