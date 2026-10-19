import { notFound } from 'next/navigation'
import type { ReactNode } from 'react'

import { DocsShell } from '@/components/docs-shell'
import { GoogleAnalytics } from '@/components/google-analytics'
import { Providers } from '@/components/providers'
import { DocsSiteHeader } from '@/components/site-header'
import { getSectionTree, isLocale, locales } from '@/lib/content'
import '../styles.css'

export function generateStaticParams() {
  return locales.map((locale) => ({ lang: locale.code }))
}
export const dynamicParams = false

export default async function Layout({ children, params }: { children: ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  return (
    <html lang={lang} suppressHydrationWarning>
      <body className="flex min-h-screen flex-col font-sans [--fd-layout-width:97rem] [--color-fd-primary:#e64b6a] dark:[--color-fd-primary:#fb8ca4] [&_#nd-sidebar-mobile]:top-[72px]">
        <GoogleAnalytics />
        <Providers locale={lang}>
          <DocsSiteHeader locale={lang} />
          <DocsShell
            locale={lang}
            desktopTree={getSectionTree(lang, 'desktop')}
            mobileTree={getSectionTree(lang, 'mobile')}>
            {children}
          </DocsShell>
        </Providers>
      </body>
    </html>
  )
}
