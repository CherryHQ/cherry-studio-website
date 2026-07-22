import { useEffect, useRef, useState } from 'react'

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

function getReleaseRegion(): 'cn' | 'global' {
  const domainLanguage = getDomainDefaultLanguage()
  if (domainLanguage) return domainLanguage === 'zh-CN' ? 'cn' : 'global'

  return import.meta.env.VITE_SITE_LOCALE?.toLowerCase().startsWith('en') ? 'global' : 'cn'
}

export function useVersionData() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [versionData, setVersionData] = useState<VersionData | null>(null)
  const [systemInfo, setSystemInfo] = useState<SystemInfo[] | null>(null)
  const fetchedRef = useRef(false)

  useEffect(() => {
    if (fetchedRef.current) return
    fetchedRef.current = true

    const fetchVersionData = async () => {
      try {
        const response = await fetch('https://releases.cherry-ai.com', {
          headers: {
            'X-Release-Channel': 'website',
            'X-Region': getReleaseRegion()
          }
        })
        const data = await response.json()

        const version = data.tag_name
        const cleanVersion = version.replace(/^v/, '')

        const versionData: VersionData = {
          version,
          publishedAt: new Date(data.created_at).toLocaleDateString(),
          changelog: data.body,
          assets: data.assets.filter((asset: Asset) => asset.type === 'attach'),
          cleanVersion
        }

        setVersionData(versionData)
        setSystemInfo(getSystemInfo(version))
        setLoading(false)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch version data')
        setLoading(false)
      }
    }

    fetchVersionData()
  }, [])

  return { loading, error, versionData, systemInfo }
}
