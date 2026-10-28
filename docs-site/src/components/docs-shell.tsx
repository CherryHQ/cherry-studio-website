'use client'

import type { Root } from 'fumadocs-core/page-tree'
import { DocsLayout } from 'fumadocs-ui/layouts/docs'
import { Sidebar, SidebarProvider, SidebarTrigger, useSidebar } from 'fumadocs-ui/layouts/docs/slots/sidebar'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { type ComponentProps, type ReactNode, useEffect } from 'react'

import { getSectionLabels, type SectionLabels } from '@/lib/section-labels'

function DocsSidebar(props: ComponentProps<typeof Sidebar>) {
  const { open, mode } = useSidebar()

  useEffect(() => {
    if (mode !== 'drawer' || !open) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [mode, open])

  return <Sidebar {...props} />
}

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
      containerProps={{
        // Let the browser size and position the directory scrollbar within its viewport.
        className:
          'mt-[72px] min-h-[calc(100dvh-72px)] [--fd-banner-height:72px] [&_[id^=nd-sidebar]]:min-h-0 [&_[id^=nd-sidebar]]:overflow-hidden [&_[id^=nd-sidebar]_[data-radix-scroll-area-viewport]]:overflow-y-auto! [&_[id^=nd-sidebar]_[data-radix-scroll-area-viewport]]:[scrollbar-width:thin]! [&_[id^=nd-sidebar]_[data-radix-scroll-area-viewport]]:[scrollbar-color:var(--color-fd-border)_transparent] [&_[id^=nd-sidebar]_[data-radix-scroll-area-viewport]::-webkit-scrollbar]:block! [&_[id^=nd-sidebar]_[data-radix-scroll-area-viewport]::-webkit-scrollbar]:w-1.5 [&_[id^=nd-sidebar]_[data-orientation=vertical]]:hidden [&_[id^=nd-sidebar]_[data-radix-scroll-area-viewport]_p]:font-semibold'
      }}
      tree={mobile ? mobileTree : desktopTree}
      nav={{
        title: labels.docs,
        url: mobile ? `/${locale}/mobile/` : `/${locale}/`
      }}
      slots={{ sidebar: { provider: SidebarProvider, root: DocsSidebar, trigger: SidebarTrigger, useSidebar } }}
      sidebar={{
        className: 'border-border/50 bg-transparent data-[collapsed=true]:bg-fd-background',
        banner: <SectionSwitch locale={locale} labels={labels} mobile={mobile} />
      }}
      themeSwitch={{ mode: 'light-dark-system' }}
      githubUrl="https://github.com/CherryHQ/cherry-studio-website">
      {children}
    </DocsLayout>
  )
}
