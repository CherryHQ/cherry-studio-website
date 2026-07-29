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

export type ReleaseLine = 'stable' | 'v2'

interface UseVersionDataOptions {
  releaseLine?: ReleaseLine
  minimumMajorVersion?: number
}

interface ReleasePayload {
  tag_name: string
  created_at: string
  body: string
  assets: Asset[]
}

interface ClientRCManifest {
  version: string
  releaseDate: string
  releaseNotes: string
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
const clientReleaseEndpoint = '/_release/client/rc'
const versionDataCachePrefix = 'cherry-version-data:v1'
const versionDataCacheTTL = 5 * 60 * 1000

const clientAssetNames = (version: string) => [
  `Cherry-Studio-${version}-x64-setup.exe`,
  `Cherry-Studio-${version}-x64-portable.exe`,
  `Cherry-Studio-${version}-arm64-setup.exe`,
  `Cherry-Studio-${version}-arm64-portable.exe`,
  `Cherry-Studio-${version}-arm64.dmg`,
  `Cherry-Studio-${version}-x64.dmg`,
  `Cherry-Studio-${version}-x86_64.AppImage`,
  `Cherry-Studio-${version}-arm64.AppImage`,
  `Cherry-Studio-${version}-amd64.deb`,
  `Cherry-Studio-${version}-arm64.deb`,
  `Cherry-Studio-${version}-x86_64.rpm`,
  `Cherry-Studio-${version}-aarch64.rpm`
]

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

function getReleaseTag(manifestURL: string, version: string): string {
  try {
    const parts = new URL(manifestURL).pathname.split('/')
    const downloadIndex = parts.lastIndexOf('download')
    if (downloadIndex >= 0 && parts[downloadIndex + 1]) {
      return decodeURIComponent(parts[downloadIndex + 1])
    }
  } catch {
    // The version header still gives us a safe fallback for conventional release tags.
  }
  return `v${version.replace(/^v/, '')}`
}

function parseYamlScalar(value: string): string {
  const trimmed = value.trim()
  if (
    trimmed.length >= 2 &&
    ((trimmed.startsWith("'") && trimmed.endsWith("'")) || (trimmed.startsWith('"') && trimmed.endsWith('"')))
  ) {
    return trimmed.slice(1, -1)
  }
  return trimmed
}

function getYamlScalar(source: string, key: string): string {
  const match = source.match(new RegExp(`^${key}:\\s*(.+?)\\s*$`, 'm'))
  return match ? parseYamlScalar(match[1]) : ''
}

function getYamlBlock(source: string, key: string): string {
  const lines = source.split(/\r?\n/)
  const start = lines.findIndex((line) => new RegExp(`^${key}:\\s*[|>][+-]?\\s*$`).test(line))
  if (start < 0) return ''

  const block: string[] = []
  for (const line of lines.slice(start + 1)) {
    if (line.trim() && !/^\s/.test(line)) break
    block.push(line)
  }

  const indentation = block.reduce((smallest, line) => {
    if (!line.trim()) return smallest
    const width = line.match(/^\s*/)?.[0].length ?? 0
    return Math.min(smallest, width)
  }, Number.POSITIVE_INFINITY)
  const indent = Number.isFinite(indentation) ? indentation : 0

  return block
    .map((line) => line.slice(indent))
    .join('\n')
    .trim()
}

function parseClientRCManifest(source: string): ClientRCManifest {
  return {
    version: getYamlScalar(source, 'version'),
    releaseDate: getYamlScalar(source, 'releaseDate'),
    releaseNotes: getYamlBlock(source, 'releaseNotes')
  }
}

async function fetchClientRCRelease(): Promise<ReleasePayload> {
  const region = getReleaseRegion()
  const requestURL = new URL(clientReleaseEndpoint, window.location.origin)
  requestURL.searchParams.set('region', region)

  const response = await fetch(requestURL)
  if (!response.ok) {
    throw new Error(`Release service returned ${response.status}`)
  }

  const manifest = parseClientRCManifest(await response.text())
  const version = manifest.version || response.headers.get('X-Release-Version')?.trim()
  if (!version) {
    throw new Error('Release service returned invalid client metadata')
  }

  const tag = getReleaseTag(response.headers.get('X-Release-Manifest') ?? '', version)
  const cleanVersion = version.replace(/^v/, '')
  const assets = clientAssetNames(cleanVersion).map((name) => {
    const assetURL = new URL(
      `/_release/download/${encodeURIComponent(tag)}/${encodeURIComponent(name)}`,
      window.location.origin
    )
    assetURL.searchParams.set('region', region)
    return {
      name,
      browser_download_url: assetURL.toString(),
      type: 'attach'
    }
  })

  return {
    tag_name: tag,
    created_at: manifest.releaseDate,
    body: manifest.releaseNotes,
    assets
  }
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
  v2: createVersionDataStore('v2')
}

async function loadVersionData(releaseLine: ReleaseLine, store: VersionDataStore): Promise<void> {
  const currentState = store.getSnapshot()
  const cacheIsFresh = Boolean(currentState.versionData && Date.now() - store.updatedAt < versionDataCacheTTL)
  if (store.request || cacheIsFresh) return store.request ?? Promise.resolve()

  store.setState({
    loading: !currentState.versionData,
    error: null,
    versionData: currentState.versionData
  })

  store.request = (async () => {
    try {
      const data = releaseLine === 'v2' ? await fetchClientRCRelease() : await fetchWebsiteRelease()
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

export function useVersionData({ releaseLine = 'stable', minimumMajorVersion }: UseVersionDataOptions = {}) {
  const store = versionDataStores[releaseLine]
  const state = useSyncExternalStore(store.subscribe, store.getSnapshot, store.getSnapshot)

  useEffect(() => {
    void loadVersionData(releaseLine, store)
  }, [releaseLine, store])

  const majorVersion = state.versionData ? getMajorVersion(state.versionData.version) : null
  const versionIsSupported =
    minimumMajorVersion === undefined || (majorVersion !== null && majorVersion >= minimumMajorVersion)

  if (!state.loading && state.versionData && !versionIsSupported) {
    return {
      loading: false,
      error: `No release available for major version ${minimumMajorVersion}`,
      versionData: null
    }
  }

  return state
}
