import { useEffect, useState } from 'react'

import { getSystemInfo, SystemInfo } from '../utils/systemDetection'

export interface Asset {
  name: string
  size: number
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
        const response = await fetch('https://data1.cherry-ai.com:48443/items/cherry_version')
        const responseData = await response.json()
        const data = responseData.data.cherry_version

        const version = data.version
        const cleanVersion = version.replace(/^v/, '')

        const versionData: VersionData = {
          version,
          publishedAt: new Date(data.published_at).toLocaleDateString(),
          changelog: data.body,
          assets: data.assets
        }

        const downloadUrls: DownloadUrls = {
          windows: {
            title: 'Windows系统安装包',
            items: [
              {
                name: `Cherry-Studio-${cleanVersion}-x64-setup.exe`,
                url: `https://gitcode.com/CherryHQ/cherry-studio/releases/download/${version}/Cherry-Studio-${cleanVersion}-x64-setup.exe`,
                desc: 'Windows 标准安装包'
              },
              // {
              //   name: `Cherry-Studio-${cleanVersion}-x64-setup.exe`,
              //   url: `https://download-cf.ocoolai.com/https://github.com/CherryHQ/cherry-studio/releases/download/${version}/Cherry-Studio-${cleanVersion}-x64-setup.exe`,
              //   desc: 'Windows标准安装包【备用下载线路1】'
              // },
              // {
              //   name: `Cherry-Studio-${cleanVersion}-x64-setup.exe`,
              //   url: `https://download.ocoolai.com/https://github.com/CherryHQ/cherry-studio/releases/download/${version}/Cherry-Studio-${cleanVersion}-x64-setup.exe`,
              //   desc: 'Windows标准安装包【备用下载线路2】'
              // },
              // {
              //   name: `Cherry-Studio-${cleanVersion}-x64-setup.exe`,
              //   url: `https://download.ocoolai.online/https://github.com/CherryHQ/cherry-studio/releases/download/${version}/Cherry-Studio-${cleanVersion}-x64-setup.exe`,
              //   desc: 'Windows标准安装包【备用下载线路3】'
              // },
              {
                name: `Cherry-Studio-${cleanVersion}-x64-portable.exe`,
                url: `https://gitcode.com/CherryHQ/cherry-studio/releases/download/${version}/Cherry-Studio-${cleanVersion}-x64-portable.exe`,
                desc: 'Windows 便携版'
              }
              // {
              //   name: `Cherry-Studio-${cleanVersion}-x64-portable.exe`,
              //   url: `https://download-cf.ocoolai.com/https://github.com/CherryHQ/cherry-studio/releases/download/${version}/Cherry-Studio-${cleanVersion}-x64-portable.exe`,
              //   desc: 'Windows便携版【备用下载线路1】'
              // },
              // {
              //   name: `Cherry-Studio-${cleanVersion}-x64-portable.exe`,
              //   url: `https://download.ocoolai.com/https://github.com/CherryHQ/cherry-studio/releases/download/${version}/Cherry-Studio-${cleanVersion}-x64-portable.exe`,
              //   desc: 'Windows便携版【备用下载线路2】'
              // },
              // {
              //   name: `Cherry-Studio-${cleanVersion}-x64-portable.exe`,
              //   url: `https://download.ocoolai.online/https://github.com/CherryHQ/cherry-studio/releases/download/${version}/Cherry-Studio-${cleanVersion}-x64-portable.exe`,
              //   desc: 'Windows便携版【备用下载线路3】'
              // }
            ]
          },
          macos: {
            title: 'MacOS系统安装包',
            items: [
              {
                name: `Cherry-Studio-${cleanVersion}-x64.dmg`,
                url: `https://gitcode.com/CherryHQ/cherry-studio/releases/download/${version}/Cherry-Studio-${cleanVersion}-x64.dmg`,
                desc: 'Intel 芯片 Mac'
              },
              // {
              //   name: `Cherry-Studio-${cleanVersion}-x64.dmg`,
              //   url: `https://download-cf.ocoolai.com/https://github.com/CherryHQ/cherry-studio/releases/download/${version}/Cherry-Studio-${cleanVersion}-x64.dmg`,
              //   desc: 'Intel芯片Mac【备用下载线路1】'
              // },
              // {
              //   name: `Cherry-Studio-${cleanVersion}-x64.dmg`,
              //   url: `https://download.ocoolai.com/https://github.com/CherryHQ/cherry-studio/releases/download/${version}/Cherry-Studio-${cleanVersion}-x64.dmg`,
              //   desc: 'Intel芯片Mac【备用下载线路2】'
              // },
              // {
              //   name: `Cherry-Studio-${cleanVersion}-x64.dmg`,
              //   url: `https://download.ocoolai.online/https://github.com/CherryHQ/cherry-studio/releases/download/${version}/Cherry-Studio-${cleanVersion}-x64.dmg`,
              //   desc: 'Intel芯片Mac【备用下载线路3】'
              // },
              {
                name: `Cherry-Studio-${cleanVersion}-arm64.dmg`,
                url: `https://gitcode.com/CherryHQ/cherry-studio/releases/download/${version}/Cherry-Studio-${cleanVersion}-arm64.dmg`,
                desc: 'Apple Silicon 芯片 Mac'
              }
              // {
              //   name: `Cherry-Studio-${cleanVersion}-arm64.dmg`,
              //   url: `https://download-cf.ocoolai.com/https://github.com/CherryHQ/cherry-studio/releases/download/${version}/Cherry-Studio-${cleanVersion}-arm64.dmg`,
              //   desc: 'Apple Silicon芯片Mac【备用下载线路1】'
              // },
              // {
              //   name: `Cherry-Studio-${cleanVersion}-arm64.dmg`,
              //   url: `https://download.ocoolai.com/https://github.com/CherryHQ/cherry-studio/releases/download/${version}/Cherry-Studio-${cleanVersion}-arm64.dmg`,
              //   desc: 'Apple Silicon芯片Mac【备用下载线路2】'
              // },
              // {
              //   name: `Cherry-Studio-${cleanVersion}-arm64.dmg`,
              //   url: `https://download.ocoolai.online/https://github.com/CherryHQ/cherry-studio/releases/download/${version}/Cherry-Studio-${cleanVersion}-arm64.dmg`,
              //   desc: 'Apple Silicon芯片Mac【备用下载线路3】'
              // }
            ]
          },
          linux: {
            title: 'Linux系统安装包',
            items: [
              {
                name: `Cherry-Studio-${cleanVersion}-x86_64.AppImage`,
                url: `https://gitcode.com/CherryHQ/cherry-studio/releases/download/${version}/Cherry-Studio-${cleanVersion}-x86_64.AppImage`,
                desc: 'x86_64 架构'
              },
              // {
              //   name: `Cherry-Studio-${cleanVersion}-x86_64.AppImage`,
              //   url: `https://download-cf.ocoolai.com/https://github.com/CherryHQ/cherry-studio/releases/download/${version}/Cherry-Studio-${cleanVersion}-x86_64.AppImage`,
              //   desc: 'x86_64架构【备用下载线路1】'
              // },
              // {
              //   name: `Cherry-Studio-${cleanVersion}-x86_64.AppImage`,
              //   url: `https://download.ocoolai.com/https://github.com/CherryHQ/cherry-studio/releases/download/${version}/Cherry-Studio-${cleanVersion}-x86_64.AppImage`,
              //   desc: 'x86_64架构【备用下载线路2】'
              // },
              // {
              //   name: `Cherry-Studio-${cleanVersion}-x86_64.AppImage`,
              //   url: `https://download.ocoolai.online/https://github.com/CherryHQ/cherry-studio/releases/download/${version}/Cherry-Studio-${cleanVersion}-x86_64.AppImage`,
              //   desc: 'x86_64架构【备用下载线路3】'
              // },
              {
                name: `Cherry-Studio-${cleanVersion}-arm64.AppImage`,
                url: `https://gitcode.com/CherryHQ/cherry-studio/releases/download/${version}/Cherry-Studio-${cleanVersion}-arm64.AppImage`,
                desc: 'ARM 架构'
              }
              // {
              //   name: `Cherry-Studio-${cleanVersion}-arm64.AppImage`,
              //   url: `https://download-cf.ocoolai.com/https://github.com/CherryHQ/cherry-studio/releases/download/${version}/Cherry-Studio-${cleanVersion}-arm64.AppImage`,
              //   desc: 'ARM架构【备用下载线路1】'
              // },
              // {
              //   name: `Cherry-Studio-${cleanVersion}-arm64.AppImage`,
              //   url: `https://download.ocoolai.com/https://github.com/CherryHQ/cherry-studio/releases/download/${version}/Cherry-Studio-${cleanVersion}-arm64.AppImage`,
              //   desc: 'ARM架构【备用下载线路2】'
              // },
              // {
              //   name: `Cherry-Studio-${cleanVersion}-arm64.AppImage`,
              //   url: `https://download.ocoolai.online/https://github.com/CherryHQ/cherry-studio/releases/download/${version}/Cherry-Studio-${cleanVersion}-arm64.AppImage`,
              //   desc: 'ARM架构【备用下载线路3】'
              // }
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
