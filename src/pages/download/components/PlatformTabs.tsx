import { Apple, type LucideIcon, Monitor, Terminal } from 'lucide-react'
import type { FC } from 'react'
import { useTranslation } from 'react-i18next'

import { cn } from '@/lib/utils'
import type { DetectedArch } from '@/utils/systemDetection'

export type Platform = 'windows' | 'macos' | 'linux'

interface PlatformTabsProps {
  activePlatform: Platform
  detectedPlatform: Platform | null
  detectedArch?: DetectedArch | null
  onPlatformChange: (platform: Platform) => void
}

const platforms: { id: Platform; icon: LucideIcon }[] = [
  { id: 'windows', icon: Monitor },
  { id: 'macos', icon: Apple },
  { id: 'linux', icon: Terminal }
]

const PlatformTabs: FC<PlatformTabsProps> = ({
  activePlatform,
  detectedPlatform,
  detectedArch = null,
  onPlatformChange
}) => {
  const { t } = useTranslation()

  const archLabel =
    detectedArch === 'arm64'
      ? t('download_page.arch_arm64')
      : detectedArch === 'x64'
        ? t('download_page.arch_x64')
        : detectedArch === 'ia32'
          ? t('download_page.arch_ia32')
          : t('download_page.arch_unknown')

  return (
    <div className="border-border border-b p-2 sm:p-3">
      <div className="grid grid-cols-3 gap-1">
        {platforms.map(({ id, icon: PlatformIcon }) => {
          const isActive = activePlatform === id
          const isDetected = detectedPlatform === id

          return (
            <button
              type="button"
              key={id}
              aria-pressed={isActive}
              onClick={() => onPlatformChange(id)}
              className={cn(
                'flex min-w-0 cursor-pointer items-center justify-center gap-1.5 rounded-2xl px-2 py-3 text-xs font-semibold transition-colors duration-200 sm:gap-2 sm:px-5 sm:text-sm',
                isActive
                  ? 'bg-secondary text-foreground shadow-sm dark:bg-white/15 dark:text-white dark:ring-1 dark:ring-white/10'
                  : 'text-muted-foreground hover:bg-secondary/50 hover:text-foreground dark:text-white/65 dark:hover:bg-white/10 dark:hover:text-white'
              )}>
              <PlatformIcon className="h-4 w-4 shrink-0" />
              <span>{t(`download_page.platform_${id}`)}</span>
              {isDetected && <span className="hidden opacity-55 sm:inline">· {archLabel}</span>}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default PlatformTabs
