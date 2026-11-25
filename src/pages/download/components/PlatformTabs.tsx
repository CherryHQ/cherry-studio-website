import { Apple, type LucideIcon, Monitor, Smartphone, Terminal } from 'lucide-react'
import type { FC } from 'react'
import { useTranslation } from 'react-i18next'

import { cn } from '@/lib/utils'
import type { DetectedArch } from '@/utils/systemDetection'

export type Platform = 'windows' | 'macos' | 'linux'
export type DownloadPlatform = Platform | 'mobile'

interface PlatformTabsProps {
  activePlatform: DownloadPlatform
  detectedPlatform: Platform | null
  detectedArch?: DetectedArch | null
  mobileAvailable?: boolean
  excludeDesktopAutocapture?: boolean
  onPlatformChange: (platform: DownloadPlatform) => void
}

const platforms: { id: DownloadPlatform; icon: LucideIcon }[] = [
  { id: 'windows', icon: Monitor },
  { id: 'macos', icon: Apple },
  { id: 'linux', icon: Terminal },
  { id: 'mobile', icon: Smartphone }
]

const PlatformTabs: FC<PlatformTabsProps> = ({
  activePlatform,
  detectedPlatform,
  detectedArch = null,
  mobileAvailable = true,
  excludeDesktopAutocapture = false,
  onPlatformChange
}) => {
  const { t } = useTranslation()
  const visiblePlatforms = mobileAvailable ? platforms : platforms.filter(({ id }) => id !== 'mobile')

  const archLabel =
    detectedArch === 'arm64'
      ? t('download_page.arch_arm64')
      : detectedArch === 'x64'
        ? t('download_page.arch_x64')
        : t('download_page.arch_ia32')

  return (
    <div className="border-border border-b p-2 sm:p-3">
      <div className={cn('grid gap-1', mobileAvailable ? 'grid-cols-4' : 'grid-cols-3')}>
        {visiblePlatforms.map(({ id, icon: PlatformIcon }) => {
          const isActive = activePlatform === id
          const isDetected = detectedPlatform === id

          return (
            <button
              type="button"
              key={id}
              data-ph-no-autocapture={excludeDesktopAutocapture && id !== 'mobile' ? '' : undefined}
              aria-pressed={isActive}
              onClick={() => onPlatformChange(id)}
              className={cn(
                'flex min-w-0 cursor-pointer items-center justify-center gap-1.5 rounded-lg px-1 py-3 text-xs font-semibold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-primary sm:gap-2 sm:px-2 sm:text-sm',
                isActive
                  ? 'bg-primary/10 text-primary ring-1 ring-primary/30 shadow-[0_0_24px_-8px_var(--color-primary)]'
                  : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
              )}>
              <PlatformIcon className="hidden size-4 shrink-0 min-[375px]:block" aria-hidden="true" />
              <span>{t(`download_page.platform_${id}`)}</span>
              {isDetected && detectedArch && <span className="hidden opacity-55 md:inline">· {archLabel}</span>}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default PlatformTabs
