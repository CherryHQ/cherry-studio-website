import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

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
  const { t } = useTranslation()
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
            title: t('download_page.windows_package'),
            items: [
              {
                name: `Cherry-Studio-${cleanVersion}-x64-setup.exe`,
                url: `https://gitcode.com/CherryHQ/cherry-studio/releases/download/${version}/Cherry-Studio-${cleanVersion}-x64-setup.signed.exe`,
                desc: t('download_page.windows_standard')
              },
              {
                name: `Cherry-Studio-${cleanVersion}-x64-portable.exe`,
                url: `https://gitcode.com/CherryHQ/cherry-studio/releases/download/${version}/Cherry-Studio-${cleanVersion}-x64-portable.signed.exe`,
                desc: t('download_page.windows_portable')
              },
              {
                name: `Cherry-Studio-${cleanVersion}-arm64-setup.exe`,
                url: `https://gitcode.com/CherryHQ/cherry-studio/releases/download/${version}/Cherry-Studio-${cleanVersion}-arm64-setup.signed.exe`,
                desc: t('download_page.windows_standard_arm')
              },
              {
                name: `Cherry-Studio-${cleanVersion}-arm64-portable.exe`,
                url: `https://gitcode.com/CherryHQ/cherry-studio/releases/download/${version}/Cherry-Studio-${cleanVersion}-arm64-portable.signed.exe`,
                desc: t('download_page.windows_portable_arm')
              }
            ]
          },
          macos: {
            title: t('download_page.macos_package'),
            items: [
              {
                name: `Cherry-Studio-${cleanVersion}-x64.dmg`,
                url: `https://gitcode.com/CherryHQ/cherry-studio/releases/download/${version}/Cherry-Studio-${cleanVersion}-x64.dmg`,
                desc: t('download_page.macos_intel')
              },
              {
                name: `Cherry-Studio-${cleanVersion}-arm64.dmg`,
                url: `https://gitcode.com/CherryHQ/cherry-studio/releases/download/${version}/Cherry-Studio-${cleanVersion}-arm64.dmg`,
                desc: t('download_page.macos_apple')
              }
            ]
          },
          linux: {
            title: t('download_page.linux_package'),
            items: [
              {
                name: `Cherry-Studio-${cleanVersion}-x86_64.AppImage`,
                url: `https://gitcode.com/CherryHQ/cherry-studio/releases/download/${version}/Cherry-Studio-${cleanVersion}-x86_64.AppImage`,
                desc: t('download_page.linux_appimage')
              },
              {
                name: `Cherry-Studio-${cleanVersion}-arm64.AppImage`,
                url: `https://gitcode.com/CherryHQ/cherry-studio/releases/download/${version}/Cherry-Studio-${cleanVersion}-arm64.AppImage`,
                desc: t('download_page.linux_appimage_arm')
              },
              {
                name: `Cherry-Studio-${cleanVersion}-amd64.deb`,
                url: `https://gitcode.com/CherryHQ/cherry-studio/releases/download/${version}/Cherry-Studio-${cleanVersion}-amd64.deb`,
                desc: t('download_page.linux_deb')
              },
              {
                name: `Cherry-Studio-${cleanVersion}-arm64.deb`,
                url: `https://gitcode.com/CherryHQ/cherry-studio/releases/download/${version}/Cherry-Studio-${cleanVersion}-arm64.deb`,
                desc: t('download_page.linux_deb_arm')
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
  }, [t])

  return { loading, error, versionData, systemInfo, downloadUrls }
}
