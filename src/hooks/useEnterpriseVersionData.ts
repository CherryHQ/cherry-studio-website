import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { isMobileDevice } from '../utils/systemDetection'

export interface EnterpriseAsset {
  name: string
  browser_download_url: string
  type: string
}

export interface EnterpriseVersionData {
  version: string
  publishedAt: string
  assets: EnterpriseAsset[]
}

export interface EnterpriseDownloadItem {
  name: string
  url: string
  desc: string
}

export interface EnterpriseDownloadGroup {
  title: string
  items: EnterpriseDownloadItem[]
}

export interface EnterpriseDownloadUrls {
  windows: EnterpriseDownloadGroup
  macos: EnterpriseDownloadGroup
  linux: EnterpriseDownloadGroup
}

export interface EnterpriseSystemInfo {
  name: string
  url: string
  type: string
  arch: string
}

// 企业版系统检测
function getEnterpriseSystemInfo(version: string): EnterpriseSystemInfo[] | null {
  if (isMobileDevice()) {
    console.log('Mobile device detected, skipping enterprise system info.')
    return null
  }

  const ua = navigator.userAgent.toLowerCase()
  const platform = navigator.platform.toLowerCase()
  const cleanVersion = version.replace(/^v/, '')
  const baseUrl = `https://gitcode.com/CherryHQ/cherry-studio-enterprise/releases/download/${version}`

  // Windows system detection
  if (ua.includes('windows') || platform.includes('win')) {
    return [
      {
        name: `Cherry-Studio-Enterprise-${cleanVersion}-x64-setup.exe`,
        url: `${baseUrl}/Cherry-Studio-Enterprise-${cleanVersion}-x64-setup.exe`,
        type: 'Windows',
        arch: 'x64'
      }
    ]
  }

  // macOS system detection
  if (ua.includes('mac') || platform.includes('mac')) {
    return [
      {
        name: `Cherry-Studio-Enterprise-${cleanVersion}-arm64.dmg`,
        url: `${baseUrl}/Cherry-Studio-Enterprise-${cleanVersion}-arm64.dmg`,
        type: 'macOS (M芯片)',
        arch: 'arm64'
      },
      {
        name: `Cherry-Studio-Enterprise-${cleanVersion}-x64.dmg`,
        url: `${baseUrl}/Cherry-Studio-Enterprise-${cleanVersion}-x64.dmg`,
        type: 'macOS (Intel芯片)',
        arch: 'x64'
      }
    ]
  }

  // Linux system detection
  if (ua.includes('linux') || platform.includes('linux')) {
    return [
      {
        name: `Cherry-Studio-Enterprise-${cleanVersion}-x86_64.AppImage`,
        url: `${baseUrl}/Cherry-Studio-Enterprise-${cleanVersion}-x86_64.AppImage`,
        type: 'Linux',
        arch: 'x86_64'
      }
    ]
  }

  return null
}
const ENTERPRISE_API_URL = 'https://releases.enterprise.cherry-ai.com'

export function useEnterpriseVersionData() {
  const { t } = useTranslation()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [versionData, setVersionData] = useState<EnterpriseVersionData | null>(null)
  const [systemInfo, setSystemInfo] = useState<EnterpriseSystemInfo[] | null>(null)
  const [downloadUrls, setDownloadUrls] = useState<EnterpriseDownloadUrls | null>(null)

  useEffect(() => {
    const fetchVersionData = async () => {
      try {
        const response = await fetch(ENTERPRISE_API_URL)
        const data = await response.json()

        const version = data.tag_name
        const cleanVersion = version.replace(/^v/, '')
        const baseUrl = `https://gitcode.com/CherryHQ/cherry-studio-enterprise/releases/download/${version}`

        const versionData: EnterpriseVersionData = {
          version,
          publishedAt: new Date(data.created_at).toLocaleDateString(),
          assets: data.assets?.filter((asset: EnterpriseAsset) => asset.type === 'attach') || []
        }

        const downloadUrls: EnterpriseDownloadUrls = {
          windows: {
            title: t('download_page.windows_package'),
            items: [
              {
                name: `Cherry-Studio-Enterprise-${cleanVersion}-x64-setup.exe`,
                url: `${baseUrl}/Cherry-Studio-Enterprise-${cleanVersion}-x64-setup.exe`,
                desc: t('download_page.windows_standard')
              },
              {
                name: `Cherry-Studio-Enterprise-${cleanVersion}-arm64-setup.exe`,
                url: `${baseUrl}/Cherry-Studio-Enterprise-${cleanVersion}-arm64-setup.exe`,
                desc: t('download_page.windows_standard_arm')
              }
            ]
          },
          macos: {
            title: t('download_page.macos_package'),
            items: [
              {
                name: `Cherry-Studio-Enterprise-${cleanVersion}-arm64.dmg`,
                url: `${baseUrl}/Cherry-Studio-Enterprise-${cleanVersion}-arm64.dmg`,
                desc: t('download_page.macos_apple')
              },
              {
                name: `Cherry-Studio-Enterprise-${cleanVersion}-x64.dmg`,
                url: `${baseUrl}/Cherry-Studio-Enterprise-${cleanVersion}-x64.dmg`,
                desc: t('download_page.macos_intel')
              }
            ]
          },
          linux: {
            title: t('download_page.linux_package'),
            items: [
              {
                name: `Cherry-Studio-Enterprise-${cleanVersion}-x86_64.AppImage`,
                url: `${baseUrl}/Cherry-Studio-Enterprise-${cleanVersion}-x86_64.AppImage`,
                desc: t('download_page.linux_appimage')
              },
              {
                name: `Cherry-Studio-Enterprise-${cleanVersion}-arm64.AppImage`,
                url: `${baseUrl}/Cherry-Studio-Enterprise-${cleanVersion}-arm64.AppImage`,
                desc: t('download_page.linux_appimage_arm')
              },
              {
                name: `Cherry-Studio-Enterprise-${cleanVersion}-amd64.deb`,
                url: `${baseUrl}/Cherry-Studio-Enterprise-${cleanVersion}-amd64.deb`,
                desc: t('download_page.linux_deb')
              },
              {
                name: `Cherry-Studio-Enterprise-${cleanVersion}-arm64.deb`,
                url: `${baseUrl}/Cherry-Studio-Enterprise-${cleanVersion}-arm64.deb`,
                desc: t('download_page.linux_deb_arm')
              },
              {
                name: `Cherry-Studio-Enterprise-${cleanVersion}-x86_64.rpm`,
                url: `${baseUrl}/Cherry-Studio-Enterprise-${cleanVersion}-x86_64.rpm`,
                desc: t('download_page.linux_rpm')
              },
              {
                name: `Cherry-Studio-Enterprise-${cleanVersion}-aarch64.rpm`,
                url: `${baseUrl}/Cherry-Studio-Enterprise-${cleanVersion}-aarch64.rpm`,
                desc: t('download_page.linux_rpm_arm')
              }
            ]
          }
        }

        setVersionData(versionData)
        setSystemInfo(getEnterpriseSystemInfo(version))
        setDownloadUrls(downloadUrls)
        setLoading(false)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch enterprise version data')
        setLoading(false)
      }
    }

    fetchVersionData()
  }, [t])

  return { loading, error, versionData, systemInfo, downloadUrls }
}
