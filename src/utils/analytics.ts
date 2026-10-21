import posthog from 'posthog-js'

import { getSiteRegion } from '@/utils/urls'

const ENTERPRISE_PORTAL_URLS = {
  cn: 'https://enterprise.cherryai.com.cn/',
  global: 'https://enterprise.cherryai.com/'
} as const

/** The primary conversion event for community traffic sent to the enterprise site. */
export const EV_CTA_TO_ENTERPRISE = 'cta_to_enterprise'

interface RuntimeEnv {
  POSTHOG_KEY?: string
  POSTHOG_HOST?: string
}

declare global {
  interface Window {
    env?: RuntimeEnv
    gtag?: (...args: unknown[]) => void
  }
}

let ready = false

function runtimeEnv(key: keyof RuntimeEnv): string | undefined {
  if (typeof window === 'undefined') return undefined
  return window.env?.[key]?.trim() || undefined
}

/**
 * Keep the community site on the same PostHog project and capture policy as the
 * enterprise marketing site: pageviews, route changes, page leaves, autocapture,
 * and identified-only person profiles. Session replay remains controlled by the
 * existing enterprise policy (disabled in the SDK).
 */
export function initAnalytics(): void {
  if (ready || typeof window === 'undefined') return

  const key = runtimeEnv('POSTHOG_KEY') || import.meta.env.VITE_PUBLIC_POSTHOG_KEY
  if (!key) return

  const host = runtimeEnv('POSTHOG_HOST') || import.meta.env.VITE_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com'
  const handoverId = crossDomainHandoverId(key)

  posthog.init(key, {
    api_host: host,
    defaults: '2026-01-30',
    capture_pageview: 'history_change',
    capture_pageleave: true,
    autocapture: true,
    disable_session_recording: true,
    person_profiles: 'identified_only',
    ...(handoverId ? { bootstrap: { distinctID: handoverId } } : {})
  })

  ready = true
}

// Cookies do not cross registrable domains. Pass the anonymous PostHog id to
// the enterprise portal so community → enterprise journeys stay in one person
// funnel. The enterprise site consumes and removes this parameter on startup.
function crossDomainHandoverId(key: string): string | null {
  const params = new URLSearchParams(window.location.search)
  const id = params.get('ph_did')
  if (!id) return null

  params.delete('ph_did')
  const query = params.toString()
  window.history.replaceState(null, '', window.location.pathname + (query ? `?${query}` : '') + window.location.hash)

  try {
    const storageKey = `ph_${key}_posthog`
    if (localStorage.getItem(storageKey) || document.cookie.includes(storageKey)) return null
  } catch {
    // If storage is unavailable, use the handed-over id as the best fallback.
  }

  return id
}

/** Capture a custom event after PostHog has initialized. */
export function capture(event: string, properties?: Record<string, unknown>): void {
  if (!ready) return
  posthog.capture(event, properties)
}

/** Build the enterprise link while forwarding source parameters and the id. */
export function getEnterpriseUrl(): string {
  const url = new URL(ENTERPRISE_PORTAL_URLS[getSiteRegion() === 'cn' ? 'cn' : 'global'])

  if (typeof window !== 'undefined') {
    for (const [key, value] of new URLSearchParams(window.location.search)) {
      url.searchParams.set(key, value)
    }
  }

  if (ready) url.searchParams.set('ph_did', posthog.get_distinct_id())
  return url.toString()
}

/** Capture and open the enterprise portal from a CTA. */
export function goToEnterprise(location: string, properties?: Record<string, unknown>): void {
  capture(EV_CTA_TO_ENTERPRISE, { location, ...properties })
  window.open(getEnterpriseUrl(), '_blank', 'noopener')
}

/** Existing GA4 download event, retained for the current download funnel. */
interface DownloadEventParams {
  platform: string
  packageName: string
  trigger: 'button' | 'auto'
}

export const trackDownload = ({ platform, packageName, trigger }: DownloadEventParams): void => {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return

  window.gtag('event', 'download_click', {
    platform,
    package_name: packageName,
    trigger,
    transport_type: 'beacon'
  })
}

export { posthog }
