import { useEffect, useState } from 'react'

import { getDomainDefaultLanguage } from '@/utils/urls'
import { getSystemInfo, type SystemInfo } from '../utils/systemDetection'

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

interface GitHubReleasePayload {
  tag_name: string
  created_at: string
  published_at: string | null
  body: string | null
  draft: boolean
  assets: Array<Pick<Asset, 'name' | 'browser_download_url'>>
}

const releasesURL = import.meta.env.VITE_RELEASES_URL?.trim() || 'https://releases.cherry-ai.com'
// Advance this tag only after the release manager confirms that both mirrors are ready.
const approvedV2PreviewTag = import.meta.env.VITE_V2_PREVIEW_TAG?.trim() || 'v2.0.0-rc.1'
const approvedV2PreviewURL = `https://api.github.com/repos/CherryHQ/cherry-studio/releases/tags/${encodeURIComponent(approvedV2PreviewTag)}`

function getReleaseRegion(): 'cn' | 'global' {
  const domainLanguage = getDomainDefaultLanguage()
  if (domainLanguage) return domainLanguage === 'zh-CN' ? 'cn' : 'global'

  return import.meta.env.VITE_SITE_LOCALE?.toLowerCase().startsWith('en') ? 'global' : 'cn'
}

function getMajorVersion(version: string): number | null {
  const match = version.match(/^v?(\d+)\./)
  return match ? Number(match[1]) : null
}

function compareVersions(left: string, right: string): number {
  const parse = (version: string) => {
    const match = version.match(/^v?(\d+)\.(\d+)\.(\d+)(?:-(beta|rc)\.(\d+))?$/i)
    if (!match) return null
    const prereleaseRank = match[4]?.toLowerCase() === 'beta' ? 0 : match[4]?.toLowerCase() === 'rc' ? 1 : 2
    return [Number(match[1]), Number(match[2]), Number(match[3]), prereleaseRank, Number(match[5] ?? 0)]
  }

  const leftParts = parse(left)
  const rightParts = parse(right)
  if (!leftParts || !rightParts) return left.localeCompare(right)

  for (let index = 0; index < leftParts.length; index += 1) {
    if (leftParts[index] !== rightParts[index]) return leftParts[index] - rightParts[index]
  }
  return 0
}

async function fetchWebsiteRelease(signal: AbortSignal): Promise<ReleasePayload> {
  const response = await fetch(releasesURL, {
    headers: {
      'X-Release-Channel': 'website',
      'X-Region': getReleaseRegion()
    },
    signal
  })
  if (!response.ok) {
    throw new Error(`Release service returned ${response.status}`)
  }
  return (await response.json()) as ReleasePayload
}

async function fetchApprovedV2Preview(signal: AbortSignal): Promise<ReleasePayload> {
  const response = await fetch(approvedV2PreviewURL, {
    headers: { Accept: 'application/vnd.github+json' },
    signal
  })
  if (!response.ok) {
    throw new Error(`Preview release service returned ${response.status}`)
  }

  const data = (await response.json()) as GitHubReleasePayload
  if (data.draft || data.tag_name !== approvedV2PreviewTag) {
    throw new Error('Preview release is unavailable')
  }

  return {
    tag_name: data.tag_name,
    created_at: data.published_at ?? data.created_at,
    body: data.body ?? '',
    assets: data.assets.map((asset) => ({ ...asset, type: 'attach' }))
  }
}

async function withTimeout<T>(promise: Promise<T>, timeoutMs: number): Promise<T> {
  let timeoutID = 0
  const timeout = new Promise<never>((_, reject) => {
    timeoutID = window.setTimeout(() => reject(new Error('Release request timed out')), timeoutMs)
  })
  return Promise.race([promise, timeout]).finally(() => window.clearTimeout(timeoutID))
}

async function getV2Release(signal: AbortSignal): Promise<ReleasePayload> {
  const fallback: ReleasePayload = {
    tag_name: approvedV2PreviewTag,
    created_at: '',
    body: '',
    assets: []
  }
  const [websiteResult, previewResult] = await Promise.allSettled([
    withTimeout(fetchWebsiteRelease(signal), 5000),
    withTimeout(fetchApprovedV2Preview(signal), 5000)
  ])
  if (signal.aborted) throw new DOMException('Aborted', 'AbortError')

  const candidates = [fallback]
  if (websiteResult.status === 'fulfilled' && (getMajorVersion(websiteResult.value.tag_name) ?? 0) >= 2) {
    candidates.push(websiteResult.value)
  }
  if (previewResult.status === 'fulfilled') {
    candidates.push(previewResult.value)
  }

  return candidates.sort((left, right) => compareVersions(left.tag_name, right.tag_name)).at(-1) ?? fallback
}

export function useVersionData({ releaseLine = 'stable', minimumMajorVersion }: UseVersionDataOptions = {}) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [versionData, setVersionData] = useState<VersionData | null>(null)
  const [systemInfo, setSystemInfo] = useState<SystemInfo[] | null>(null)

  useEffect(() => {
    const controller = new AbortController()

    const fetchVersionData = async () => {
      setLoading(true)
      setError(null)
      setVersionData(null)
      setSystemInfo(null)

      try {
        const data =
          releaseLine === 'v2' ? await getV2Release(controller.signal) : await fetchWebsiteRelease(controller.signal)
        if (!data.tag_name || !Array.isArray(data.assets)) {
          throw new Error('Release service returned invalid data')
        }
        const version = data.tag_name
        const majorVersion = getMajorVersion(version)
        if (minimumMajorVersion !== undefined && (majorVersion === null || majorVersion < minimumMajorVersion)) {
          throw new Error(`No release available for major version ${minimumMajorVersion}`)
        }
        const cleanVersion = version.replace(/^v/, '')
        const publishedAt = new Date(data.created_at)

        const versionData: VersionData = {
          version,
          publishedAt: Number.isNaN(publishedAt.getTime()) ? '' : publishedAt.toLocaleDateString(),
          changelog: data.body ?? '',
          assets: data.assets.filter((asset: Asset) => asset.type === 'attach'),
          cleanVersion
        }

        setVersionData(versionData)
        setSystemInfo(getSystemInfo(version))
      } catch (err) {
        if (controller.signal.aborted) return
        setError(err instanceof Error ? err.message : 'Failed to fetch version data')
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }

    void fetchVersionData()

    return () => controller.abort()
  }, [minimumMajorVersion, releaseLine])

  return { loading, error, versionData, systemInfo }
}
