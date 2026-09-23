import { useEffect, useSyncExternalStore } from 'react'

import { mobileDownloads } from '@/config/mobileDownloads'

const releasesURL =
  'https://api.gitcode.com/api/v5/repos/CherryHQ/cherry-studio-app/releases?direction=desc&page=1&per_page=100'
const cacheDuration = 5 * 60 * 1000
const retryDelay = 30 * 1000

interface AndroidRelease {
  url: string
  publishedAt: number
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function getAndroidRelease(value: unknown): AndroidRelease | null {
  if (
    !isRecord(value) ||
    typeof value.tag_name !== 'string' ||
    !/^v?\d+\.\d+\.\d+(?:-[\w.-]+)?$/.test(value.tag_name) ||
    value.draft === true ||
    value.release_status === 'draft' ||
    typeof value.created_at !== 'string' ||
    !Array.isArray(value.assets)
  ) {
    return null
  }

  const publishedAt = Date.parse(value.created_at)
  if (!Number.isFinite(publishedAt)) return null

  for (const asset of value.assets) {
    if (
      !isRecord(asset) ||
      asset.type !== 'attach' ||
      typeof asset.name !== 'string' ||
      !asset.name.toLowerCase().endsWith('.apk') ||
      typeof asset.browser_download_url !== 'string'
    ) {
      continue
    }

    try {
      const url = new URL(asset.browser_download_url)
      const expectedPath = `/CherryHQ/cherry-studio-app/releases/download/${encodeURIComponent(value.tag_name)}/${encodeURIComponent(asset.name)}`
      if (url.origin === 'https://gitcode.com' && url.pathname === expectedPath && !url.username && !url.password) {
        return { url: url.href, publishedAt }
      }
    } catch {
      // Ignore malformed attachment URLs and try the remaining APKs.
    }
  }

  return null
}

let downloads = mobileDownloads
let request: Promise<void> | null = null
let refreshAfter = 0
const listeners = new Set<() => void>()
const getSnapshot = () => downloads
const getServerSnapshot = () => mobileDownloads

function subscribe(listener: () => void): () => void {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

async function refreshDownloads(): Promise<void> {
  if (request) return request
  if (Date.now() < refreshAfter) return

  request = (async () => {
    const controller = new AbortController()
    const timeout = window.setTimeout(() => controller.abort(), 8000)

    try {
      const response = await fetch(releasesURL, {
        signal: controller.signal,
        credentials: 'omit',
        cache: 'no-store'
      })
      if (!response.ok) throw new Error(`GitCode returned ${response.status}`)

      const data: unknown = await response.json()
      if (!Array.isArray(data)) throw new Error('GitCode returned an invalid release list')

      // Include beta releases, exclude legacy tags, and skip releases whose APK is not uploaded yet.
      const latest = data
        .map(getAndroidRelease)
        .filter((release): release is AndroidRelease => release !== null)
        .sort((a, b) => b.publishedAt - a.publishedAt)[0]
      if (!latest) throw new Error('GitCode returned no Android release')

      refreshAfter = Date.now() + cacheDuration
      if (downloads.find(({ platform }) => platform === 'android')?.url !== latest.url) {
        downloads = mobileDownloads.map((download) =>
          download.platform === 'android' ? { ...download, url: latest.url } : download
        )
        for (const listener of listeners) listener()
      }
    } catch {
      // Keep the last successful URL (or the configured fallback) on errors and timeouts.
      refreshAfter = Date.now() + retryDelay
    } finally {
      window.clearTimeout(timeout)
      request = null
    }
  })()

  return request
}

export function useMobileDownloads() {
  const state = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  useEffect(() => {
    const refresh = () => void refreshDownloads()
    refresh()
    window.addEventListener('focus', refresh)
    return () => window.removeEventListener('focus', refresh)
  }, [])

  return state
}
