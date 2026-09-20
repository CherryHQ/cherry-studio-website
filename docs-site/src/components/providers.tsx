'use client'

import { RootProvider } from 'fumadocs-ui/provider/next'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import type { ComponentProps, ReactNode } from 'react'

import { uiTranslations } from '@/lib/ui-translations'
import routes from '../../generated/routes.json'
import locales from '../../locales.json'

// Large documentation trees should load articles only when a reader navigates to them.
function DocumentationLink({ href, ...props }: ComponentProps<'a'> & { prefetch?: boolean }) {
  if (href === undefined) return <a {...props} />
  return <Link {...props} href={href} prefetch={false} />
}

export function Providers({ locale, children }: { locale: string; children: ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  return (
    <RootProvider
      components={{ Link: DocumentationLink }}
      theme={{ storageKey: 'theme-preference' }}
      i18n={{
        locale,
        locales: locales.map((item) => ({ name: item.label, locale: item.code })),
        onLocaleChange: (next) => {
          const parts = pathname.replace(/^\/docs(?=\/)/, '').split('/')
          parts[1] = next
          const slug = decodeURIComponent(parts.slice(2).join('/').replace(/\/$/, ''))
          const available = routes[next as keyof typeof routes].includes(slug)
          router.push(available ? parts.join('/') : `/${next}/`)
        },
        translations: uiTranslations(locale)
      }}
      search={{ options: { type: 'static', api: `/docs/search/${locale}.json` } }}>
      {children}
    </RootProvider>
  )
}
