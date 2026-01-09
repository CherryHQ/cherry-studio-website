import { ChevronDown, Download, Star } from 'lucide-react'
import { type FC, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

import type { Platform } from './EnterprisePlatformTabs'

interface DownloadItemConfig {
  name: string
  url: string
  desc: string
  hint: string
  isRecommended?: boolean
}

interface EnterprisePlatformDownloadsProps {
  platform: Platform
  version: string
  variant?: 'dark' | 'light'
}

const getDownloadItems = (platform: Platform, version: string, t: (key: string) => string): DownloadItemConfig[] => {
  const cleanVersion = version.replace(/^v/, '')
  const baseUrl = `https://gitcode.com/CherryHQ/cherry-studio-enterprise/releases/download/${version}`

  const configs: Record<Platform, DownloadItemConfig[]> = {
    windows: [
      {
        name: `Cherry-Studio-Enterprise-${cleanVersion}-x64-setup.exe`,
        url: `${baseUrl}/Cherry-Studio-Enterprise-${cleanVersion}-x64-setup.exe`,
        desc: t('download_page.windows_standard'),
        hint: t('download_page.best_for_most'),
        isRecommended: true
      },
      {
        name: `Cherry-Studio-Enterprise-${cleanVersion}-arm64-setup.exe`,
        url: `${baseUrl}/Cherry-Studio-Enterprise-${cleanVersion}-arm64-setup.exe`,
        desc: t('download_page.windows_standard_arm'),
        hint: t('download_page.for_arm_devices')
      }
    ],
    macos: [
      {
        name: `Cherry-Studio-Enterprise-${cleanVersion}-arm64.dmg`,
        url: `${baseUrl}/Cherry-Studio-Enterprise-${cleanVersion}-arm64.dmg`,
        desc: t('download_page.macos_apple'),
        hint: t('download_page.apple_silicon'),
        isRecommended: true
      },
      {
        name: `Cherry-Studio-Enterprise-${cleanVersion}-x64.dmg`,
        url: `${baseUrl}/Cherry-Studio-Enterprise-${cleanVersion}-x64.dmg`,
        desc: t('download_page.macos_intel'),
        hint: t('download_page.intel_mac')
      }
    ],
    linux: [
      {
        name: `Cherry-Studio-Enterprise-${cleanVersion}-x86_64.AppImage`,
        url: `${baseUrl}/Cherry-Studio-Enterprise-${cleanVersion}-x86_64.AppImage`,
        desc: t('download_page.linux_appimage'),
        hint: t('download_page.universal_linux'),
        isRecommended: true
      },
      {
        name: `Cherry-Studio-Enterprise-${cleanVersion}-arm64.AppImage`,
        url: `${baseUrl}/Cherry-Studio-Enterprise-${cleanVersion}-arm64.AppImage`,
        desc: t('download_page.linux_appimage_arm'),
        hint: t('download_page.for_arm_devices')
      },
      {
        name: `Cherry-Studio-Enterprise-${cleanVersion}-amd64.deb`,
        url: `${baseUrl}/Cherry-Studio-Enterprise-${cleanVersion}-amd64.deb`,
        desc: t('download_page.linux_deb'),
        hint: t('download_page.for_debian_ubuntu')
      },
      {
        name: `Cherry-Studio-Enterprise-${cleanVersion}-arm64.deb`,
        url: `${baseUrl}/Cherry-Studio-Enterprise-${cleanVersion}-arm64.deb`,
        desc: t('download_page.linux_deb_arm'),
        hint: t('download_page.for_arm_devices')
      },
      {
        name: `Cherry-Studio-Enterprise-${cleanVersion}-x86_64.rpm`,
        url: `${baseUrl}/Cherry-Studio-Enterprise-${cleanVersion}-x86_64.rpm`,
        desc: t('download_page.linux_rpm'),
        hint: t('download_page.for_fedora_rhel')
      },
      {
        name: `Cherry-Studio-Enterprise-${cleanVersion}-aarch64.rpm`,
        url: `${baseUrl}/Cherry-Studio-Enterprise-${cleanVersion}-aarch64.rpm`,
        desc: t('download_page.linux_rpm_arm'),
        hint: t('download_page.for_arm_devices')
      }
    ]
  }

  return configs[platform]
}

const EnterprisePlatformDownloads: FC<EnterprisePlatformDownloadsProps> = ({ platform, version, variant = 'dark' }) => {
  const { t } = useTranslation()
  const [showOthers, setShowOthers] = useState(false)
  const isLight = variant === 'light'

  if (!version) return null

  const items = getDownloadItems(platform, version, t)
  const recommendedItem = items.find((item) => item.isRecommended)
  const otherItems = items.filter((item) => !item.isRecommended)

  return (
    <div className="mx-auto max-w-2xl space-y-4">
      {/* Recommended Download */}
      {recommendedItem && (
        <div
          className={cn(
            'rounded-2xl border-2 border-green-500/30 p-6',
            isLight ? 'bg-green-50 dark:bg-green-500/10' : 'bg-green-500/10 backdrop-blur-sm'
          )}>
          <div className="mb-4 flex items-center gap-2">
            <Star className="h-5 w-5 fill-current text-green-500" />
            <span className="font-semibold text-green-600 dark:text-green-400">
              {t('download_page.recommended_download')}
            </span>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0 flex-1">
              <h3 className={cn('text-lg font-semibold', isLight ? 'text-foreground' : 'text-white')}>
                {recommendedItem.desc}
              </h3>
              <p className={cn('mt-1 text-sm', isLight ? 'text-muted-foreground' : 'text-white/60')}>
                {recommendedItem.hint}
              </p>
              <p className={cn('mt-2 truncate font-mono text-xs', isLight ? 'text-muted-foreground/60' : 'text-white/40')}>
                {recommendedItem.name}
              </p>
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
        <div
          className={cn(
            'rounded-2xl border',
            isLight ? 'border-border bg-secondary/50' : 'border-white/10 bg-white/5 backdrop-blur-sm'
          )}>
          <button
            type="button"
            onClick={() => setShowOthers(!showOthers)}
            className={cn(
              'flex w-full cursor-pointer items-center justify-between rounded-2xl px-6 py-4 transition-colors',
              isLight ? 'hover:bg-secondary' : 'hover:bg-white/5'
            )}>
            <span className={cn('font-medium', isLight ? 'text-foreground' : 'text-white/80')}>
              {t('download_page.other_versions_expand')}
            </span>
            <ChevronDown
              className={cn(
                'h-5 w-5 transition-transform duration-200',
                isLight ? 'text-muted-foreground' : 'text-white/50',
                showOthers && 'rotate-180'
              )}
            />
          </button>

          {showOthers && (
            <div
              className={cn('space-y-2 border-t px-6 py-4', isLight ? 'border-border' : 'border-white/10')}>
              {otherItems.map((item) => (
                <button
                  type="button"
                  key={item.url}
                  onClick={() => (window.location.href = item.url)}
                  className={cn(
                    'flex w-full cursor-pointer items-center justify-between gap-4 rounded-xl border px-4 py-3 text-left transition-all duration-200',
                    isLight
                      ? 'border-border bg-background hover:border-blue-500/30 hover:bg-blue-50 dark:hover:bg-blue-500/10'
                      : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10'
                  )}>
                  <div className="min-w-0 flex-1">
                    <div className={cn('font-medium', isLight ? 'text-foreground' : 'text-white/90')}>{item.desc}</div>
                    <div className={cn('text-sm', isLight ? 'text-muted-foreground' : 'text-white/50')}>{item.hint}</div>
                  </div>
                  <Download className={cn('h-4 w-4 shrink-0', isLight ? 'text-muted-foreground' : 'text-white/50')} />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default EnterprisePlatformDownloads
