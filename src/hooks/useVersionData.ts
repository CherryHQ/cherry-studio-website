import { useEffect, useState } from 'react'

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

const releasesURL = import.meta.env.VITE_RELEASES_URL?.trim() || 'https://releases.cherry-ai.com'
const clientReleaseEndpoint = '/_release/client/rc'

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

async function fetchWebsiteRelease(signal: AbortSignal): Promise<ReleasePayload> {
  const requestURL = new URL(releasesURL, window.location.origin)

  const response = await fetch(requestURL, {
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

async function fetchClientRCRelease(signal: AbortSignal): Promise<ReleasePayload> {
  const region = getReleaseRegion()
  const requestURL = new URL(clientReleaseEndpoint, window.location.origin)
  requestURL.searchParams.set('region', region)

  const response = await fetch(requestURL, { signal })
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

export function useVersionData({ releaseLine = 'stable', minimumMajorVersion }: UseVersionDataOptions = {}) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [versionData, setVersionData] = useState<VersionData | null>(null)

  useEffect(() => {
    const controller = new AbortController()

    const fetchVersionData = async () => {
      setLoading(true)
      setError(null)
      setVersionData(null)

      try {
        const data =
          releaseLine === 'v2'
            ? await fetchClientRCRelease(controller.signal)
            : await fetchWebsiteRelease(controller.signal)
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

  return { loading, error, versionData }
}
