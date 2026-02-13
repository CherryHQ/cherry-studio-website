import { Monitor } from 'lucide-react'
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

const platforms: { id: Platform; icon: string }[] = [
  { id: 'windows', icon: 'icon-windows' },
  { id: 'macos', icon: 'icon-mac' },
  { id: 'linux', icon: 'icon-linux' }
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
    <div className="mb-8">
      {detectedPlatform && (
        <p className="text-muted-foreground mb-4 flex items-center justify-center gap-2 text-sm">
          <Monitor className="h-4 w-4 shrink-0" />
          <span className="whitespace-pre-line text-left leading-relaxed">
            {t('download_page.detected_system_arch', {
              platform: t(`download_page.platform_${detectedPlatform}`),
              arch: archLabel
            })}
          </span>
        </p>
      )}
      <div className="flex justify-center">
        <div className="bg-secondary/50 inline-flex rounded-xl p-1.5">
          {platforms.map(({ id, icon }) => (
            <button
              type="button"
              key={id}
              onClick={() => onPlatformChange(id)}
              className={cn(
                'flex cursor-pointer items-center gap-2 rounded-lg px-6 py-3 text-sm font-medium transition-all duration-200',
                activePlatform === id
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              )}>
              <i className={cn(icon, 'text-lg')} />
              {t(`download_page.platform_${id}`)}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PlatformTabs
