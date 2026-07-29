import { ArrowRight, Download } from 'lucide-react'
import { type FC, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { useVersionData, type VersionData } from '@/hooks/useVersionData'
import type { DetectedArch } from '@/utils/systemDetection'
import type { Platform } from './PlatformTabs'

interface DownloadItemConfig {
  name: string
  url: string
  desc: string
  hint: string
  isRecommended?: boolean
}

type DownloadItemDefinition = Omit<DownloadItemConfig, 'url'>

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
  const cleanVersion = versionData.version.replace(/^v/, '')

  const configs: Record<Platform, DownloadItemDefinition[]> = {
    windows: [
      {
        name: `Cherry-Studio-${cleanVersion}-x64-setup.exe`,
        desc: t('download_page.windows_standard'),
        hint: t('download_page.best_for_most'),
        isRecommended: true
      },
      {
        name: `Cherry-Studio-${cleanVersion}-x64-portable.exe`,
        desc: t('download_page.windows_portable'),
        hint: t('download_page.no_install_needed')
      },
      {
        name: `Cherry-Studio-${cleanVersion}-arm64-setup.exe`,
        desc: t('download_page.windows_standard_arm'),
        hint: t('download_page.for_arm_devices')
      },
      {
        name: `Cherry-Studio-${cleanVersion}-arm64-portable.exe`,
        desc: t('download_page.windows_portable_arm'),
        hint: t('download_page.for_arm_devices')
      }
    ],
    macos: [
      {
        name: `Cherry-Studio-${cleanVersion}-arm64.dmg`,
        desc: t('download_page.macos_apple'),
        hint: t('download_page.apple_silicon'),
        isRecommended: true
      },
      {
        name: `Cherry-Studio-${cleanVersion}-x64.dmg`,
        desc: t('download_page.macos_intel'),
        hint: t('download_page.intel_mac')
      }
    ],
    linux: [
      {
        name: `Cherry-Studio-${cleanVersion}-x86_64.AppImage`,
        desc: t('download_page.linux_appimage'),
        hint: t('download_page.universal_linux'),
        isRecommended: true
      },
      {
        name: `Cherry-Studio-${cleanVersion}-arm64.AppImage`,
        desc: t('download_page.linux_appimage_arm'),
        hint: t('download_page.for_arm_devices')
      },
      {
        name: `Cherry-Studio-${cleanVersion}-amd64.deb`,
        desc: t('download_page.linux_deb'),
        hint: t('download_page.for_debian_ubuntu')
      },
      {
        name: `Cherry-Studio-${cleanVersion}-arm64.deb`,
        desc: t('download_page.linux_deb_arm'),
        hint: t('download_page.for_arm_devices')
      },
      {
        name: `Cherry-Studio-${cleanVersion}-x86_64.rpm`,
        desc: t('download_page.linux_rpm'),
        hint: t('download_page.for_fedora_rhel')
      },
      {
        name: `Cherry-Studio-${cleanVersion}-aarch64.rpm`,
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
    const url = assetURLs.get(item.name)
    return url ? [{ ...item, url }] : []
  })
}

const PrimarySkeleton: FC<{ multiple?: boolean }> = ({ multiple = false }) => {
  return (
    <div className="border-border border-b p-4 sm:px-8 sm:py-8">
      <div className={multiple ? 'mx-auto grid max-w-xl gap-2 sm:grid-cols-2' : undefined}>
        <div className="mx-auto h-12 w-full max-w-72 animate-pulse rounded-full bg-black/10 dark:bg-white/10" />
        {multiple && (
          <div className="mx-auto h-12 w-full max-w-72 animate-pulse rounded-full bg-black/10 dark:bg-white/10" />
        )}
      </div>
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

export const V2ReleaseEntry: FC = () => {
  const { t } = useTranslation()
  const { loading, versionData } = useVersionData({
    releaseLine: 'v2',
    minimumMajorVersion: 2
  })

  if (loading || !versionData) return null

  return (
    <Link
      to="/download/v2"
      className="group mx-auto flex w-fit max-w-full items-center gap-2.5 rounded-lg px-2 py-2 text-left focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none">
      <span className="flex min-w-0 items-center gap-2.5">
        <span className="bg-primary/10 text-primary shrink-0 rounded-md px-2 py-1 text-xs font-semibold dark:bg-primary/15">
          {t('download_page.preview_release')}
        </span>
        <span className="text-muted-foreground group-hover:text-foreground min-w-0 text-sm transition-colors">
          <span className="text-foreground font-medium">Cherry Studio 2.0</span>
          <span className="mx-2 text-black/20 dark:text-white/20" aria-hidden="true">
            ·
          </span>
          <span>{t('download_page.v2_entry_description')}</span>
        </span>
      </span>
      <ArrowRight className="text-muted-foreground group-hover:text-primary h-4 w-4 shrink-0 transition-all group-hover:translate-x-0.5" />
    </Link>
  )
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
    return <PrimarySkeleton multiple={platform === 'macos'} />
  }

  if (!versionData || !recommendedItem) return null

  if (platform === 'macos') {
    const orderedItems = [recommendedItem, ...items.filter((item) => item.url !== recommendedItem.url)]

    return (
      <div className="border-border border-b p-4 sm:px-8 sm:py-8">
        <div className="mx-auto grid max-w-xl gap-2 sm:grid-cols-2">
          {orderedItems.map((item) => (
            <Button
              key={item.url}
              size="lg"
              onClick={() => (window.location.href = item.url)}
              className="bg-foreground text-background hover:bg-foreground/85 h-12 w-full gap-2 rounded-full px-5 text-sm">
              <Download className="h-4 w-4" />
              {t('download_page.download_now', { package: item.desc })}
            </Button>
          ))}
        </div>
      </div>
    )
  }

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

  if (loading || !versionData || platform === 'macos') return null

  return (
    <div>
      {otherItems.length > 0 && (
        <div id="other-download-packages" className="bg-secondary/20 divide-border divide-y px-5">
          {otherItems.map((item) => (
            <button
              type="button"
              key={item.url}
              onClick={() => (window.location.href = item.url)}
              className="group hover:bg-secondary/60 -mx-2 flex w-[calc(100%+1rem)] min-w-0 cursor-pointer items-center justify-between gap-4 rounded-xl px-2 py-3.5 text-left transition-colors">
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
