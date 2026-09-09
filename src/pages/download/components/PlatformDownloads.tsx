import { Download } from 'lucide-react'
import { type FC, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components/ui/button'
import type { VersionData } from '@/hooks/useVersionData'
import type { DetectedArch } from '@/utils/systemDetection'
import type { Platform } from './PlatformTabs'

interface DownloadItemConfig {
  name: string
  url: string
  desc: string
  hint: string
  isRecommended?: boolean
}

interface DownloadItemDefinition extends Omit<DownloadItemConfig, 'name' | 'url'> {
  assetNames: string[]
}

interface PlatformDownloadsProps {
  platform: Platform
  detectedArch?: DetectedArch | null
  versionData: VersionData | null
  loading: boolean
  autoDownload?: boolean
  autoDownloadReady?: boolean
}

const getDownloadItems = (
  platform: Platform,
  versionData: VersionData,
  t: (key: string) => string
): DownloadItemConfig[] => {
  const cleanVersion = versionData.cleanVersion
  const packageNames = (currentSuffix: string, legacySuffix: string) => [
    `Cherry-Studio-CN-${cleanVersion}-${currentSuffix}`,
    `Cherry-Studio-${cleanVersion}-${currentSuffix}`,
    `Cherry-Studio-${cleanVersion}-${legacySuffix}`
  ]

  const configs: Record<Platform, DownloadItemDefinition[]> = {
    windows: [
      {
        assetNames: packageNames('win-x64-setup.exe', 'x64-setup.exe'),
        desc: t('download_page.windows_standard'),
        hint: t('download_page.best_for_most'),
        isRecommended: true
      },
      {
        assetNames: packageNames('win-x64-portable.exe', 'x64-portable.exe'),
        desc: t('download_page.windows_portable'),
        hint: t('download_page.no_install_needed')
      },
      {
        assetNames: packageNames('win-arm64-setup.exe', 'arm64-setup.exe'),
        desc: t('download_page.windows_standard_arm'),
        hint: t('download_page.for_arm_devices')
      },
      {
        assetNames: packageNames('win-arm64-portable.exe', 'arm64-portable.exe'),
        desc: t('download_page.windows_portable_arm'),
        hint: t('download_page.for_arm_devices')
      }
    ],
    macos: [
      {
        assetNames: packageNames('mac-arm64.dmg', 'arm64.dmg'),
        desc: t('download_page.macos_apple'),
        hint: t('download_page.apple_silicon'),
        isRecommended: true
      },
      {
        assetNames: packageNames('mac-x64.dmg', 'x64.dmg'),
        desc: t('download_page.macos_intel'),
        hint: t('download_page.intel_mac')
      }
    ],
    linux: [
      {
        assetNames: packageNames('linux-x64.AppImage', 'x86_64.AppImage'),
        desc: t('download_page.linux_appimage'),
        hint: t('download_page.universal_linux'),
        isRecommended: true
      },
      {
        assetNames: packageNames('linux-arm64.AppImage', 'arm64.AppImage'),
        desc: t('download_page.linux_appimage_arm'),
        hint: t('download_page.for_arm_devices')
      },
      {
        assetNames: packageNames('linux-x64.deb', 'amd64.deb'),
        desc: t('download_page.linux_deb'),
        hint: t('download_page.for_debian_ubuntu')
      },
      {
        assetNames: packageNames('linux-arm64.deb', 'arm64.deb'),
        desc: t('download_page.linux_deb_arm'),
        hint: t('download_page.for_arm_devices')
      },
      {
        assetNames: packageNames('linux-x64.rpm', 'x86_64.rpm'),
        desc: t('download_page.linux_rpm'),
        hint: t('download_page.for_fedora_rhel')
      },
      {
        assetNames: packageNames('linux-arm64.rpm', 'aarch64.rpm'),
        desc: t('download_page.linux_rpm_arm'),
        hint: t('download_page.for_arm_devices')
      }
    ]
  }

  const assetURLs = new Map(
    versionData.assets
      .filter((asset) => asset.browser_download_url)
      .map((asset) => [asset.name, asset.browser_download_url])
  )
  return configs[platform].flatMap((item) => {
    const name = item.assetNames.find((assetName) => assetURLs.has(assetName))
    const url = name ? assetURLs.get(name) : undefined
    return name && url ? [{ name, url, desc: item.desc, hint: item.hint, isRecommended: item.isRecommended }] : []
  })
}

const PrimarySkeleton: FC = () => {
  return (
    <div className="border-border border-b p-4 sm:px-8 sm:py-8">
      <div className="mx-auto h-12 w-full max-w-72 animate-pulse rounded-full bg-black/10 dark:bg-white/10" />
    </div>
  )
}

const pickRecommendedItem = (
  items: DownloadItemConfig[],
  platform: Platform,
  detectedArch: DetectedArch | null
): DownloadItemConfig | undefined => {
  const fallback = items.find((item) => item.isRecommended) ?? items[0]
  if (!items.length) return undefined

  // This page does not provide 32-bit builds. Prefer x64 for ia32 detection.
  const arch: Exclude<DetectedArch, 'ia32'> | null =
    detectedArch === 'arm64' ? 'arm64' : detectedArch === 'x64' ? 'x64' : detectedArch === 'ia32' ? 'x64' : null
  if (!arch) return fallback

  const isArm64Name = (name: string) => {
    const n = name.toLowerCase()
    return n.includes('arm64') || n.includes('aarch64')
  }

  const isX64Name = (name: string) => {
    const n = name.toLowerCase()
    return n.includes('x64') || n.includes('x86_64') || n.includes('amd64')
  }

  const candidates = items.filter((item) => (arch === 'arm64' ? isArm64Name(item.name) : isX64Name(item.name)))
  if (!candidates.length) return fallback

  if (platform === 'windows') {
    return candidates.find((item) => item.name.toLowerCase().includes('setup')) ?? candidates[0]
  }

  if (platform === 'macos') {
    return candidates.find((item) => item.name.toLowerCase().endsWith('.dmg')) ?? candidates[0]
  }

  if (platform === 'linux') {
    return candidates.find((item) => item.name.toLowerCase().endsWith('.appimage')) ?? candidates[0]
  }

  return candidates[0]
}

type PlatformDownloadPrimaryProps = PlatformDownloadsProps

export const PlatformDownloadPrimary: FC<PlatformDownloadPrimaryProps> = ({
  platform,
  detectedArch = null,
  versionData,
  loading,
  autoDownload = false,
  autoDownloadReady = true
}) => {
  const { t } = useTranslation()
  const autoDownloadTriggeredRef = useRef(false)

  const items = versionData ? getDownloadItems(platform, versionData, t) : []
  const recommendedItem = pickRecommendedItem(items, platform, detectedArch)

  useEffect(() => {
    if (!autoDownload || !autoDownloadReady || loading || !recommendedItem?.url || autoDownloadTriggeredRef.current) {
      return
    }

    autoDownloadTriggeredRef.current = true
    window.location.href = recommendedItem.url
  }, [autoDownload, autoDownloadReady, loading, recommendedItem?.url])

  if (loading) {
    return <PrimarySkeleton />
  }

  if (!versionData || !recommendedItem) return null

  return (
    <div className="border-border border-b p-4 sm:px-8 sm:py-8">
      <Button
        size="lg"
        onClick={() => (window.location.href = recommendedItem.url)}
        className="bg-foreground text-background hover:bg-foreground/85 mx-auto flex h-12 w-auto min-w-64 gap-2 rounded-full px-8 text-sm sm:min-w-72">
        <Download className="h-4 w-4" />
        {t('download_page.download_now', { package: recommendedItem.desc })}
      </Button>
    </div>
  )
}

type PlatformDownloadOptionsProps = Pick<
  PlatformDownloadsProps,
  'platform' | 'detectedArch' | 'versionData' | 'loading'
>

export const PlatformDownloadOptions: FC<PlatformDownloadOptionsProps> = ({
  platform,
  detectedArch = null,
  versionData,
  loading
}) => {
  const { t } = useTranslation()

  const items = versionData ? getDownloadItems(platform, versionData, t) : []
  const recommendedItem = pickRecommendedItem(items, platform, detectedArch)
  const otherItems = recommendedItem ? items.filter((item) => item.url !== recommendedItem.url) : items

  if (loading || !versionData) return null

  return (
    <div>
      {otherItems.length > 0 && (
        <div id="other-download-packages" className="bg-secondary/20 divide-border divide-y">
          {otherItems.map((item) => (
            <button
              type="button"
              key={item.url}
              onClick={() => (window.location.href = item.url)}
              className="group hover:bg-secondary/55 flex w-full min-w-0 cursor-pointer items-center justify-between gap-4 px-5 py-3.5 text-left transition-colors">
              <div className="min-w-0 flex-1">
                <div className="text-foreground text-sm font-medium">{item.desc}</div>
              </div>
              <Download className="text-muted-foreground group-hover:text-primary h-4 w-4 shrink-0 transition-colors dark:text-white/60" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
