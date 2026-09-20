import { DocsLayout } from 'fumadocs-ui/layouts/docs'
import { notFound } from 'next/navigation'
import type { ReactNode } from 'react'

import { Providers } from '@/components/providers'
import { DocsSiteHeader } from '@/components/site-header'
import { getTree, isLocale, locales } from '@/lib/content'
import '../styles.css'

export function generateStaticParams() {
  return locales.map((locale) => ({ lang: locale.code }))
}
export const dynamicParams = false

export default async function Layout({ children, params }: { children: ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const chinese = lang.startsWith('zh')
  return (
    <html lang={lang} suppressHydrationWarning>
      <body className="flex min-h-screen flex-col font-sans [--fd-layout-width:97rem] [--color-fd-primary:#e64b6a] dark:[--color-fd-primary:#fb8ca4]">
        <Providers locale={lang}>
          <DocsSiteHeader locale={lang} />
          <DocsLayout
            containerProps={{ className: 'mt-[72px] min-h-[calc(100dvh-72px)] [--fd-banner-height:72px]' }}
            tree={getTree(lang)}
            nav={{ title: chinese ? '文档' : 'Documentation', url: `/${lang}/` }}
            githubUrl="https://github.com/CherryHQ/cherry-studio-website">
            {children}
          </DocsLayout>
        </Providers>
      </body>
    </html>
  )
}
