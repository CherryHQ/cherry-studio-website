import { useEffect, useState } from 'react'

import { getSystemInfo, SystemInfo } from '../utils/systemDetection'

export interface Asset {
  name: string
  browser_download_url: string
  type: string
}

export interface VersionData {
  version: string
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

export function useVersionData() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [versionData, setVersionData] = useState<VersionData | null>(null)
  const [systemInfo, setSystemInfo] = useState<SystemInfo[] | null>(null)
  const [downloadUrls, setDownloadUrls] = useState<DownloadUrls | null>(null)

  useEffect(() => {
    const fetchVersionData = async () => {
      try {
        const response = await fetch('https://releases.cherry-ai.com')
        const data = await response.json()

        const version = data.tag_name
        const cleanVersion = version.replace(/^v/, '')

        const versionData: VersionData = {
          version,
          publishedAt: new Date(data.created_at).toLocaleDateString(),
          changelog: data.body,
          assets: data.assets.filter((asset: Asset) => asset.type === 'attach')
        }

        const downloadUrls: DownloadUrls = {
          windows: {
            title: 'Windows系统安装包',
            items: [
              {
                name: `Cherry-Studio-${cleanVersion}-x64-setup.exe`,
                url: `https://gitcode.com/CherryHQ/cherry-studio/releases/download/${version}/Cherry-Studio-${cleanVersion}-x64-setup.exe`,
                desc: 'Windows 标准版'
              },
              {
                name: `Cherry-Studio-${cleanVersion}-x64-portable.exe`,
                url: `https://gitcode.com/CherryHQ/cherry-studio/releases/download/${version}/Cherry-Studio-${cleanVersion}-x64-portable.exe`,
                desc: 'Windows 便携版'
              },
              {
                name: `Cherry-Studio-${cleanVersion}-arm64-setup.exe`,
                url: `https://gitcode.com/CherryHQ/cherry-studio/releases/download/${version}/Cherry-Studio-${cleanVersion}-arm64-setup.exe`,
                desc: 'Windows 标准版 (ARM 版)'
              },
              {
                name: `Cherry-Studio-${cleanVersion}-arm64-portable.exe`,
                url: `https://gitcode.com/CherryHQ/cherry-studio/releases/download/${version}/Cherry-Studio-${cleanVersion}-arm64-portable.exe`,
                desc: 'Windows 便携版 (ARM 版)'
              }
            ]
          },
          macos: {
            title: 'MacOS系统安装包',
            items: [
              {
                name: `Cherry-Studio-${cleanVersion}-x64.dmg`,
                url: `https://gitcode.com/CherryHQ/cherry-studio/releases/download/${version}/Cherry-Studio-${cleanVersion}-x64.dmg`,
                desc: 'Intel 芯片'
              },
              {
                name: `Cherry-Studio-${cleanVersion}-arm64.dmg`,
                url: `https://gitcode.com/CherryHQ/cherry-studio/releases/download/${version}/Cherry-Studio-${cleanVersion}-arm64.dmg`,
                desc: 'Apple 芯片'
              }
            ]
          },
          linux: {
            title: 'Linux 系统安装包',
            items: [
              {
                name: `Cherry-Studio-${cleanVersion}-x86_64.AppImage`,
                url: `https://gitcode.com/CherryHQ/cherry-studio/releases/download/${version}/Cherry-Studio-${cleanVersion}-x86_64.AppImage`,
                desc: 'AppImage 版本'
              },
              {
                name: `Cherry-Studio-${cleanVersion}-arm64.AppImage`,
                url: `https://gitcode.com/CherryHQ/cherry-studio/releases/download/${version}/Cherry-Studio-${cleanVersion}-arm64.AppImage`,
                desc: 'AppImage 版本 (ARM 版)'
              }
            ]
          }
        }

        setVersionData(versionData)
        setSystemInfo(getSystemInfo(version))
        setDownloadUrls(downloadUrls)
        setLoading(false)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch version data')
        setLoading(false)
      }
    }

    fetchVersionData()
  }, [])

  return { loading, error, versionData, systemInfo, downloadUrls }
}
