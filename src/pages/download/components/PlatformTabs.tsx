import { Monitor } from 'lucide-react'
import type { FC } from 'react'
import { useTranslation } from 'react-i18next'

import { cn } from '@/lib/utils'

export type Platform = 'windows' | 'macos' | 'linux'

interface PlatformTabsProps {
  activePlatform: Platform
  detectedPlatform: Platform | null
  onPlatformChange: (platform: Platform) => void
}

const platforms: { id: Platform; icon: string }[] = [
  { id: 'windows', icon: 'icon-windows' },
  { id: 'macos', icon: 'icon-mac' },
  { id: 'linux', icon: 'icon-linux' }
]

const PlatformTabs: FC<PlatformTabsProps> = ({ activePlatform, detectedPlatform, onPlatformChange }) => {
  const { t } = useTranslation()

  return (
    <div className="mb-8">
      {detectedPlatform && (
        <p className="text-muted-foreground mb-4 flex items-center justify-center gap-2 text-sm">
          <Monitor className="h-4 w-4" />
          {t('download_page.current_system')}:
          <span className="text-foreground font-medium">
            {t(`download_page.platform_${detectedPlatform}`)}
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
                'flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-medium transition-all duration-200',
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
