'use client'

import type { Root } from 'fumadocs-core/page-tree'
import { DocsLayout } from 'fumadocs-ui/layouts/docs'
import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'

import { getSectionLabels } from '@/lib/section-labels'

export function DocsShell({
  children,
  locale,
  desktopTree,
  mobileTree
}: {
  children: ReactNode
  locale: string
  desktopTree: Root
  mobileTree: Root
}) {
  const pathname = usePathname()
  const segments = pathname.split('/').filter(Boolean)
  const localeIndex = segments.indexOf(locale)
  const mobile = localeIndex >= 0 && segments[localeIndex + 1] === 'mobile'
  const labels = getSectionLabels(locale)

  return (
    <DocsLayout
      key={mobile ? 'mobile' : 'desktop'}
      containerProps={{ className: 'mt-[72px] min-h-[calc(100dvh-72px)] [--fd-banner-height:72px]' }}
      tree={mobile ? mobileTree : desktopTree}
      nav={{
        title: labels.docs,
        url: mobile ? `/${locale}/mobile/` : `/${locale}/`
      }}
      links={[
        {
          text: labels.desktop,
          url: `/${locale}/`,
          active: mobile ? 'none' : 'nested-url'
        },
        {
          text: labels.mobile,
          url: `/${locale}/mobile/`,
          active: mobile ? 'nested-url' : 'none'
        }
      ]}
      githubUrl="https://github.com/CherryHQ/cherry-studio-website">
      {children}
    </DocsLayout>
  )
}
