'use client'

import { usePathname } from 'next/navigation'
import Script from 'next/script'
import { useEffect, useState } from 'react'

const OVERSEAS_HOSTS = new Set(['cherryai.com', 'www.cherryai.com'])
const OVERSEAS_MEASUREMENT_ID = 'G-FQ9WGZFVB9'
const CHINA_MEASUREMENT_ID = 'G-JTJVLD1BNN'

declare global {
  interface Window {
    dataLayer?: unknown[][]
    gtag?: (...args: unknown[]) => void
    __docsGoogleAnalyticsId?: string
    __docsGoogleAnalyticsPage?: string
  }
}

function getMeasurementId() {
  return OVERSEAS_HOSTS.has(window.location.hostname.toLowerCase()) ? OVERSEAS_MEASUREMENT_ID : CHINA_MEASUREMENT_ID
}

export function GoogleAnalytics() {
  const pathname = usePathname()
  const [measurementId, setMeasurementId] = useState<string>()

  useEffect(() => {
    setMeasurementId(getMeasurementId())
  }, [])

  useEffect(() => {
    if (!measurementId || window.__docsGoogleAnalyticsId === measurementId) return

    window.dataLayer = window.dataLayer ?? []
    window.gtag = window.gtag ?? ((...args: unknown[]) => window.dataLayer?.push(args))
    window.gtag('js', new Date())
    window.gtag('config', measurementId, { send_page_view: false })
    window.__docsGoogleAnalyticsId = measurementId
  }, [measurementId])

  useEffect(() => {
    if (!measurementId || !window.gtag) return

    const pagePath = `${window.location.pathname}${window.location.search}`
    if (window.__docsGoogleAnalyticsPage === pagePath) return

    window.gtag('event', 'page_view', {
      page_location: window.location.href,
      page_path: pagePath,
      page_title: document.title
    })
    window.__docsGoogleAnalyticsPage = pagePath
  }, [measurementId, pathname])

  if (!measurementId) return null

  return <Script src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`} strategy="afterInteractive" />
}
