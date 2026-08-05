import { useEffect, useSyncExternalStore } from 'react'

import { getDomainDefaultLanguage } from '@/utils/urls'

export interface Asset {
  name: string
  browser_download_url: string
  type: string
}

export interface VersionData {
  version: string
  cleanVersion: string
  publishedAt: string
  changelog: string
  assets: Asset[]
}

export interface DownloadItem {
  name: string
  url: string
  desc: string
}

export interface DownloadGroup {
  title: string
  items: DownloadItem[]
}

export interface DownloadUrls {
  windows: DownloadGroup
  macos: DownloadGroup
  linux: DownloadGroup
}

export type ReleaseLine = 'stable' | 'v1'

interface UseVersionDataOptions {
  releaseLine?: ReleaseLine
  exactMajorVersion?: number
  minimumMajorVersion?: number
}

interface ReleasePayload {
  tag_name: string
  created_at: string
  body: string
  assets: Asset[]
}

interface VersionDataState {
  loading: boolean
  error: string | null
  versionData: VersionData | null
}

interface VersionDataStore {
  request: Promise<void> | null
  updatedAt: number
  getSnapshot: () => VersionDataState
  setState: (state: VersionDataState) => void
  subscribe: (listener: () => void) => () => void
}

const releasesURL = import.meta.env.VITE_RELEASES_URL?.trim() || 'https://releases.cherry-ai.com'
const versionDataCachePrefix = 'cherry-version-data:v2'

function getReleaseRegion(): 'cn' | 'global' {
  const domainLanguage = getDomainDefaultLanguage()
  if (domainLanguage) return domainLanguage === 'zh-CN' ? 'cn' : 'global'

  return import.meta.env.VITE_SITE_LOCALE?.toLowerCase().startsWith('en') ? 'global' : 'cn'
}

function getMajorVersion(version: string): number | null {
  const match = version.match(/^v?(\d+)\./)
  return match ? Number(match[1]) : null
}

async function fetchWebsiteRelease(): Promise<ReleasePayload> {
  const requestURL = new URL(releasesURL, window.location.origin)

  const response = await fetch(requestURL, {
    headers: {
      'X-Release-Channel': 'website',
      'X-Region': getReleaseRegion()
    }
  })
  if (!response.ok) {
    throw new Error(`Release service returned ${response.status}`)
  }
  return (await response.json()) as ReleasePayload
}

async function fetchRetainedV1Release(): Promise<ReleasePayload> {
  const requestURL = new URL(releasesURL, window.location.origin)
  requestURL.searchParams.set('major', '1')

  const response = await fetch(requestURL, {
    headers: {
      'X-Release-Channel': 'website',
      'X-Region': getReleaseRegion()
    }
  })
  if (!response.ok) {
    throw new Error(`Release service returned ${response.status}`)
  }
  return (await response.json()) as ReleasePayload
}

function isVersionData(value: unknown): value is VersionData {
  if (!value || typeof value !== 'object') return false

  const candidate = value as Partial<VersionData>
  return (
    typeof candidate.version === 'string' &&
    typeof candidate.cleanVersion === 'string' &&
    typeof candidate.publishedAt === 'string' &&
    typeof candidate.changelog === 'string' &&
    Array.isArray(candidate.assets) &&
    candidate.assets.every(
      (asset) =>
        asset &&
        typeof asset.name === 'string' &&
        typeof asset.browser_download_url === 'string' &&
        typeof asset.type === 'string'
    )
  )
}

function getVersionDataCacheKey(releaseLine: ReleaseLine): string {
  return `${versionDataCachePrefix}:${getReleaseRegion()}:${releaseLine}`
}

function readCachedVersionData(releaseLine: ReleaseLine): { versionData: VersionData; updatedAt: number } | null {
  try {
    const cached = window.sessionStorage.getItem(getVersionDataCacheKey(releaseLine))
    if (!cached) return null

    const parsed = JSON.parse(cached) as { versionData?: unknown; updatedAt?: unknown }
    if (
      !isVersionData(parsed.versionData) ||
      typeof parsed.updatedAt !== 'number' ||
      !Number.isFinite(parsed.updatedAt) ||
      parsed.updatedAt <= 0 ||
      parsed.updatedAt > Date.now()
    ) {
      window.sessionStorage.removeItem(getVersionDataCacheKey(releaseLine))
      return null
    }

    return {
      versionData: parsed.versionData,
      updatedAt: parsed.updatedAt
    }
  } catch {
    return null
  }
}

function writeCachedVersionData(releaseLine: ReleaseLine, versionData: VersionData, updatedAt: number): void {
  try {
    window.sessionStorage.setItem(
      getVersionDataCacheKey(releaseLine),
      JSON.stringify({
        versionData,
        updatedAt
      })
    )
  } catch {
    // The in-memory store remains available when session storage is unavailable or full.
  }
}

function createVersionDataStore(releaseLine: ReleaseLine): VersionDataStore {
  const cached = readCachedVersionData(releaseLine)
  let state: VersionDataState = cached
    ? {
        loading: false,
        error: null,
        versionData: cached.versionData
      }
    : {
        loading: true,
        error: null,
        versionData: null
      }
  const listeners = new Set<() => void>()

  return {
    request: null,
    updatedAt: cached?.updatedAt ?? 0,
    getSnapshot: () => state,
    setState: (nextState) => {
      state = nextState
      for (const listener of listeners) listener()
    },
    subscribe: (listener) => {
      listeners.add(listener)
      return () => listeners.delete(listener)
    }
  }
}

const versionDataStores: Record<ReleaseLine, VersionDataStore> = {
  stable: createVersionDataStore('stable'),
  v1: createVersionDataStore('v1')
}

async function loadVersionData(releaseLine: ReleaseLine, store: VersionDataStore): Promise<void> {
  const currentState = store.getSnapshot()
  if (store.request) return store.request

  store.setState({
    loading: !currentState.versionData,
    error: null,
    versionData: currentState.versionData
  })

  store.request = (async () => {
    try {
      const data = releaseLine === 'v1' ? await fetchRetainedV1Release() : await fetchWebsiteRelease()
      if (!data.tag_name || !Array.isArray(data.assets)) {
        throw new Error('Release service returned invalid data')
      }

      const version = data.tag_name
      const cleanVersion = version.replace(/^v/, '')
      const publishedAt = new Date(data.created_at)
      const versionData: VersionData = {
        version,
        publishedAt: Number.isNaN(publishedAt.getTime()) ? '' : publishedAt.toLocaleDateString(),
        changelog: data.body ?? '',
        assets: data.assets.filter((asset: Asset) => asset.type === 'attach'),
        cleanVersion
      }
      const updatedAt = Date.now()

      store.updatedAt = updatedAt
      writeCachedVersionData(releaseLine, versionData, updatedAt)
      store.setState({
        loading: false,
        error: null,
        versionData
      })
    } catch (err) {
      store.setState({
        loading: false,
        error: err instanceof Error ? err.message : 'Failed to fetch version data',
        versionData: currentState.versionData
      })
    } finally {
      store.request = null
    }
  })()

  return store.request
}

export function useVersionData({
  releaseLine = 'stable',
  exactMajorVersion,
  minimumMajorVersion
}: UseVersionDataOptions = {}) {
  const store = versionDataStores[releaseLine]
  const state = useSyncExternalStore(store.subscribe, store.getSnapshot, store.getSnapshot)

  useEffect(() => {
    void loadVersionData(releaseLine, store)
  }, [releaseLine, store])

  const majorVersion = state.versionData ? getMajorVersion(state.versionData.version) : null
  const versionIsSupported =
    (exactMajorVersion === undefined || majorVersion === exactMajorVersion) &&
    (minimumMajorVersion === undefined || (majorVersion !== null && majorVersion >= minimumMajorVersion))

  if (!state.loading && state.versionData && !versionIsSupported) {
    return {
      loading: false,
      error: `No release available for major version ${exactMajorVersion ?? minimumMajorVersion}`,
      versionData: null
    }
  }

  return state
}
