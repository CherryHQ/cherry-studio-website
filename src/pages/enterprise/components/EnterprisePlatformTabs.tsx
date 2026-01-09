import { Monitor } from 'lucide-react'
import type { FC } from 'react'
import { useTranslation } from 'react-i18next'

import { cn } from '@/lib/utils'

export type Platform = 'windows' | 'macos' | 'linux'

interface EnterprisePlatformTabsProps {
  activePlatform: Platform
  detectedPlatform: Platform | null
  onPlatformChange: (platform: Platform) => void
  variant?: 'dark' | 'light'
}

const platforms: { id: Platform; icon: string }[] = [
  { id: 'windows', icon: 'icon-windows' },
  { id: 'macos', icon: 'icon-mac' },
  { id: 'linux', icon: 'icon-linux' }
]

const EnterprisePlatformTabs: FC<EnterprisePlatformTabsProps> = ({
  activePlatform,
  detectedPlatform,
  onPlatformChange,
  variant = 'dark'
}) => {
  const { t } = useTranslation()
  const isLight = variant === 'light'

  return (
    <div className="mb-8">
      {detectedPlatform && (
        <p
          className={cn(
            'mb-4 flex items-center justify-center gap-2 text-sm',
            isLight ? 'text-muted-foreground' : 'text-white/70'
          )}>
          <Monitor className="h-4 w-4 text-blue-500" />
          {t('download_page.current_system')}:
          <span className={cn('font-medium', isLight ? 'text-foreground' : 'text-white')}>
            {t(`download_page.platform_${detectedPlatform}`)}
          </span>
        </p>
      )}
      <div className="flex justify-center">
        <div
          className={cn(
            'inline-flex rounded-xl p-1.5',
            isLight ? 'bg-secondary border-border border' : 'bg-white/10 backdrop-blur-sm'
          )}>
          {platforms.map(({ id, icon }) => (
            <button
              type="button"
              key={id}
              onClick={() => onPlatformChange(id)}
              className={cn(
                'flex cursor-pointer items-center gap-2 rounded-lg px-6 py-3 text-sm font-medium transition-all duration-200',
                activePlatform === id
                  ? isLight
                    ? 'bg-background text-foreground shadow-sm'
                    : 'bg-white/20 text-white shadow-sm'
                  : isLight
                    ? 'text-muted-foreground hover:text-foreground'
                    : 'text-white/60 hover:text-white'
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

export default EnterprisePlatformTabs
