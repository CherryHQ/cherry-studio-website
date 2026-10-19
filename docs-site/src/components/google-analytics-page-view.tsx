'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

declare global {
  interface Window {
    dataLayer?: unknown[][]
    gtag?: (...args: unknown[]) => void
    __docsGoogleAnalyticsId?: string
    __docsGoogleAnalyticsPage?: string
  }
}

export function GoogleAnalyticsPageView() {
  const pathname = usePathname()

  useEffect(() => {
    if (!window.gtag) return

    const pagePath = `${window.location.pathname}${window.location.search}`
    if (window.__docsGoogleAnalyticsPage === pagePath) return

    window.gtag('event', 'page_view', {
      page_location: window.location.href,
      page_path: pagePath,
      page_title: document.title
    })
    window.__docsGoogleAnalyticsPage = pagePath
  }, [pathname])

  return null
}
