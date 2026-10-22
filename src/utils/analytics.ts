import posthog from 'posthog-js'

import { getEnterpriseUrl } from './urls'

/**
 * GA4 自定义事件。
 *
 * gtag 由 index.html 里的内联脚本挂到 window 上。构建期（Node）没有 window，
 * 浏览器里也可能被广告拦截插件拿掉，所以每次调用前都要判断，缺失时静默跳过。
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

interface DownloadEventParams {
  platform: string
  packageName: string
  /** button：用户点击；auto：下载页按系统自动开始下载 */
  trigger: 'button' | 'auto'
}

/** Primary conversion from the community site into the enterprise site. */
export const EV_CTA_TO_ENTERPRISE = 'cta_to_enterprise'

interface RuntimeAnalyticsConfig {
  POSTHOG_KEY?: string
  POSTHOG_HOST?: string
}

let posthogReady = false
const currentPosthogContext: Record<string, unknown> = {
  customer_type: 'anonymous',
  lifecycle_stage: 'anonymous_visit',
  analytics_surface: 'community_website',
  person_id: null
}

function runtimeAnalyticsConfig(): RuntimeAnalyticsConfig {
  if (typeof window === 'undefined') return {}
  return window.env ?? {}
}

// Cookies do not cross the community and enterprise registrable domains. The
// source site therefore hands the same anonymous person/session IDs to the
// enterprise site through one-time query parameters.
function readCrossDomainHandover(key: string): { distinctID: string; sessionID?: string } | null {
  if (typeof window === 'undefined') return null

  const params = new URLSearchParams(window.location.search)
  const distinctID = params.get('ph_did')
  const sessionID = params.get('ph_sid') || undefined
  if (!distinctID) return null

  params.delete('ph_did')
  params.delete('ph_sid')
  const query = params.toString()
  window.history.replaceState(null, '', window.location.pathname + (query ? `?${query}` : '') + window.location.hash)

  try {
    const storageKey = `ph_${key}_posthog`
    if (localStorage.getItem(storageKey) || document.cookie.includes(storageKey)) return null
  } catch {
    // Storage can be unavailable in private browsing; the handed-over ID is
    // still useful in that case.
  }

  return sessionID ? { distinctID, sessionID } : { distinctID }
}

export function initPosthog(): void {
  if (posthogReady || typeof window === 'undefined') return

  const runtime = runtimeAnalyticsConfig()
  const key = runtime.POSTHOG_KEY || import.meta.env.VITE_PUBLIC_POSTHOG_KEY
  if (!key) return

  const host = runtime.POSTHOG_HOST || import.meta.env.VITE_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com'
  const handover = readCrossDomainHandover(key)

  try {
    posthog.init(key, {
      api_host: host,
      defaults: '2026-01-30',
      capture_pageview: 'history_change',
      capture_pageleave: true,
      autocapture: true,
      disable_session_recording: true,
      person_profiles: 'identified_only',
      before_send: (event) => {
        if (!event) return event
        event.properties = { ...event.properties, ...currentPosthogContext }
        return event
      },
      ...(handover ? { bootstrap: handover } : {})
    })
    posthog.register(currentPosthogContext)
    posthogReady = true
  } catch (error) {
    // Analytics must never prevent the community site from rendering.
    console.warn('[posthog] disabled after initialization failure', error)
  }
}

export function capturePosthog(event: string, properties?: Record<string, unknown>): void {
  if (!posthogReady) return
  posthog.capture(event, properties)
}

/** Build the enterprise URL and carry the anonymous PostHog identity across. */
export function getEnterprisePortalUrl(language: string, path = '/'): string {
  const url = new URL(getEnterpriseUrl(language))
  url.pathname = path.startsWith('/') ? path : `/${path}`
  url.search = window.location.search
  url.searchParams.delete('ph_did')
  url.searchParams.delete('ph_sid')
  url.searchParams.set('source', 'community_website')

  if (posthogReady) {
    url.searchParams.set('ph_did', posthog.get_distinct_id())
    url.searchParams.set('ph_sid', posthog.get_session_id())
  }

  return url.toString()
}

export function trackEnterpriseNavigation(location: string): void {
  capturePosthog(EV_CTA_TO_ENTERPRISE, { location, source: 'community_website' })
}

/**
 * 下载按钮用 window.location.href 跳到安装包，不是 <a> 链接，
 * GA4 增强型衡量的 file_download 抓不到，所以单独上报。
 * 事件名 download_click 需要在 GA4 后台标记为关键事件才会计入转化。
 */
export const trackDownload = ({ platform, packageName, trigger }: DownloadEventParams): void => {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return

  window.gtag('event', 'download_click', {
    platform,
    package_name: packageName,
    trigger,
    // 紧接着就会跳转，beacon 能保证事件在页面离开前发出
    transport_type: 'beacon'
  })
}
