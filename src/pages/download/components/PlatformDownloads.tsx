import { ChevronDown, Download, Star } from 'lucide-react'
import { type FC, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components/ui/button'
import type { VersionData } from '@/hooks/useVersionData'
import { cn } from '@/lib/utils'
import type { DetectedArch } from '@/utils/systemDetection'
import type { Platform } from './PlatformTabs'

interface DownloadItemConfig {
  name: string
  url: string
  desc: string
  hint: string
  isRecommended?: boolean
}

interface PlatformDownloadsProps {
  platform: Platform
  detectedArch?: DetectedArch | null
  isDetectedSystem?: boolean
  versionData: VersionData | null
  loading: boolean
}

const getDownloadItems = (platform: Platform, version: string, t: (key: string) => string): DownloadItemConfig[] => {
  const cleanVersion = version.replace(/^v/, '')
  const baseUrl = `https://gitcode.com/CherryHQ/cherry-studio/releases/download/${version}`

  const configs: Record<Platform, DownloadItemConfig[]> = {
    windows: [
      {
        name: `Cherry-Studio-${cleanVersion}-x64-setup.exe`,
        url: `${baseUrl}/Cherry-Studio-${cleanVersion}-x64-setup.exe`,
        desc: t('download_page.windows_standard'),
        hint: t('download_page.best_for_most'),
        isRecommended: true
      },
      {
        name: `Cherry-Studio-${cleanVersion}-x64-portable.exe`,
        url: `${baseUrl}/Cherry-Studio-${cleanVersion}-x64-portable.exe`,
        desc: t('download_page.windows_portable'),
        hint: t('download_page.no_install_needed')
      },
      {
        name: `Cherry-Studio-${cleanVersion}-arm64-setup.exe`,
        url: `${baseUrl}/Cherry-Studio-${cleanVersion}-arm64-setup.exe`,
        desc: t('download_page.windows_standard_arm'),
        hint: t('download_page.for_arm_devices')
      },
      {
        name: `Cherry-Studio-${cleanVersion}-arm64-portable.exe`,
        url: `${baseUrl}/Cherry-Studio-${cleanVersion}-arm64-portable.exe`,
        desc: t('download_page.windows_portable_arm'),
        hint: t('download_page.for_arm_devices')
      }
    ],
    macos: [
      {
        name: `Cherry-Studio-${cleanVersion}-arm64.dmg`,
        url: `${baseUrl}/Cherry-Studio-${cleanVersion}-arm64.dmg`,
        desc: t('download_page.macos_apple'),
        hint: t('download_page.apple_silicon'),
        isRecommended: true
      },
      {
        name: `Cherry-Studio-${cleanVersion}-x64.dmg`,
        url: `${baseUrl}/Cherry-Studio-${cleanVersion}-x64.dmg`,
        desc: t('download_page.macos_intel'),
        hint: t('download_page.intel_mac')
      }
    ],
    linux: [
      {
        name: `Cherry-Studio-${cleanVersion}-x86_64.AppImage`,
        url: `${baseUrl}/Cherry-Studio-${cleanVersion}-x86_64.AppImage`,
        desc: t('download_page.linux_appimage'),
        hint: t('download_page.universal_linux'),
        isRecommended: true
      },
      {
        name: `Cherry-Studio-${cleanVersion}-arm64.AppImage`,
        url: `${baseUrl}/Cherry-Studio-${cleanVersion}-arm64.AppImage`,
        desc: t('download_page.linux_appimage_arm'),
        hint: t('download_page.for_arm_devices')
      },
      {
        name: `Cherry-Studio-${cleanVersion}-amd64.deb`,
        url: `${baseUrl}/Cherry-Studio-${cleanVersion}-amd64.deb`,
        desc: t('download_page.linux_deb'),
        hint: t('download_page.for_debian_ubuntu')
      },
      {
        name: `Cherry-Studio-${cleanVersion}-arm64.deb`,
        url: `${baseUrl}/Cherry-Studio-${cleanVersion}-arm64.deb`,
        desc: t('download_page.linux_deb_arm'),
        hint: t('download_page.for_arm_devices')
      },
      {
        name: `Cherry-Studio-${cleanVersion}-x86_64.rpm`,
        url: `${baseUrl}/Cherry-Studio-${cleanVersion}-x86_64.rpm`,
        desc: t('download_page.linux_rpm'),
        hint: t('download_page.for_fedora_rhel')
      },
      {
        name: `Cherry-Studio-${cleanVersion}-aarch64.rpm`,
        url: `${baseUrl}/Cherry-Studio-${cleanVersion}-aarch64.rpm`,
        desc: t('download_page.linux_rpm_arm'),
        hint: t('download_page.for_arm_devices')
      }
    ]
  }

  return configs[platform]
}

const SkeletonLoader: FC<{ highlighted?: boolean }> = ({ highlighted = true }) => {
  const containerClassName = highlighted
    ? 'rounded-2xl border-2 border-green-500/30 bg-green-500/10 p-6'
    : 'border-border rounded-2xl border bg-[rgb(250,250,250)] p-6 dark:bg-secondary/30'

  const pillClassName = highlighted ? 'bg-green-500/30' : 'bg-muted'

  return (
    <div className="space-y-6">
      {/* Recommended Download Skeleton */}
      <div className={containerClassName}>
        <div className="mb-4 flex items-center gap-2">
          <div className={cn('h-5 w-5 animate-pulse rounded', pillClassName)} />
          <div className={cn('h-5 w-32 animate-pulse rounded', pillClassName)} />
        </div>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0 flex-1 space-y-2">
            <div className="bg-muted h-6 w-48 animate-pulse rounded" />
            <div className="bg-muted h-4 w-32 animate-pulse rounded" />
            <div className="bg-muted h-3 w-64 animate-pulse rounded" />
          </div>
          <div className={cn('h-11 w-32 shrink-0 animate-pulse rounded-lg', pillClassName)} />
        </div>
      </div>

      {/* Other Downloads Skeleton */}
      <div className="border-border bg-card rounded-2xl border">
        <div className="flex w-full items-center justify-between px-6 py-4">
          <div className="bg-muted h-5 w-40 animate-pulse rounded" />
          <div className="bg-muted h-5 w-5 animate-pulse rounded" />
        </div>
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

const PlatformDownloads: FC<PlatformDownloadsProps> = ({
  platform,
  detectedArch = null,
  isDetectedSystem = false,
  versionData,
  loading
}) => {
  const { t } = useTranslation()
  const [showOthers, setShowOthers] = useState(false)

  if (loading) {
    return <SkeletonLoader highlighted={isDetectedSystem} />
  }

  if (!versionData) return null

  const items = getDownloadItems(platform, versionData.version, t)
  const recommendedItem = pickRecommendedItem(items, platform, detectedArch)
  const otherItems = recommendedItem ? items.filter((item) => item.url !== recommendedItem.url) : items

  const recommendedContainerClassName = isDetectedSystem
    ? 'rounded-2xl border-2 border-green-500/30 bg-green-500/10 p-6'
    : 'border-border rounded-2xl border bg-[rgb(250,250,250)] p-6 dark:bg-secondary/30'

  return (
    <div className="space-y-6">
      {/* Recommended Download */}
      {recommendedItem && (
        <div className={recommendedContainerClassName}>
          {isDetectedSystem && (
            <div className="mb-4 flex items-center gap-2">
              <Star className="h-5 w-5 fill-current text-green-500" />
              <span className="font-semibold text-green-600 dark:text-green-400">
                {t('download_page.recommended_download')}
              </span>
            </div>
          )}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0 flex-1">
              <h3 className="text-foreground text-lg font-semibold">{recommendedItem.desc}</h3>
              <p className="text-muted-foreground mt-1 text-sm">{recommendedItem.hint}</p>
              <p className="text-muted-foreground mt-2 truncate font-mono text-xs">{recommendedItem.name}</p>
            </div>
            <Button
              variant="glow"
              size="lg"
              onClick={() => (window.location.href = recommendedItem.url)}
              className="shrink-0 cursor-pointer gap-2">
              <Download className="h-5 w-5" />
              {t('download_page.download_now')}
            </Button>
          </div>
        </div>
      )}

      {/* Other Downloads Toggle */}
      {otherItems.length > 0 && (
        <div className="border-border bg-card rounded-2xl border">
          <button
            type="button"
            onClick={() => setShowOthers(!showOthers)}
            className="hover:bg-secondary/50 flex w-full cursor-pointer items-center justify-between rounded-2xl px-6 py-4 transition-colors">
            <span className="text-foreground font-medium">{t('download_page.other_versions_expand')}</span>
            <ChevronDown
              className={cn(
                'text-muted-foreground h-5 w-5 transition-transform duration-200',
                showOthers && 'rotate-180'
              )}
            />
          </button>

          {showOthers && (
            <div className="border-border space-y-2 border-t px-6 py-4">
              {otherItems.map((item) => (
                <button
                  type="button"
                  key={item.url}
                  onClick={() => (window.location.href = item.url)}
                  className="border-border bg-secondary/30 hover:border-primary/30 hover:bg-secondary flex w-full cursor-pointer items-center justify-between gap-4 rounded-xl border px-4 py-3 text-left transition-all duration-200">
                  <div className="min-w-0 flex-1">
                    <div className="text-foreground font-medium">{item.desc}</div>
                    <div className="text-muted-foreground text-sm">{item.hint}</div>
                  </div>
                  <Download className="text-muted-foreground h-4 w-4 shrink-0" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default PlatformDownloads
