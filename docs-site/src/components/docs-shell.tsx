'use client'

import type { Root } from 'fumadocs-core/page-tree'
import { DocsLayout } from 'fumadocs-ui/layouts/docs'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'

import { getSectionLabels, type SectionLabels } from '@/lib/section-labels'

// Passed as `sidebar.banner`, which the sidebar renders outside its scroll viewport.
function SectionSwitch({ locale, labels, mobile }: { locale: string; labels: SectionLabels; mobile: boolean }) {
  const sections = [
    { key: 'desktop', label: labels.desktop, url: `/${locale}/`, active: !mobile },
    { key: 'mobile', label: labels.mobile, url: `/${locale}/mobile/`, active: mobile }
  ]

  return (
    <div className="grid grid-cols-2 gap-0.5 rounded-lg border bg-fd-secondary/50 p-0.5">
      {sections.map((section) => (
        <Link
          key={section.key}
          href={section.url}
          prefetch={false}
          aria-current={section.active ? 'page' : undefined}
          className={`rounded-md px-2 py-1.5 text-center text-sm transition-colors ${
            section.active
              ? 'bg-fd-primary/10 font-medium text-fd-primary'
              : 'text-fd-muted-foreground hover:text-fd-accent-foreground'
          }`}>
          {section.label}
        </Link>
      ))}
    </div>
  )
}

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
      sidebar={{ banner: <SectionSwitch locale={locale} labels={labels} mobile={mobile} /> }}
      githubUrl="https://github.com/CherryHQ/cherry-studio-website">
      {children}
    </DocsLayout>
  )
}
