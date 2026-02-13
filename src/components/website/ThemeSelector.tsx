import type { FC } from 'react'
import { useTranslation } from 'react-i18next'

import { cn } from '@/lib/utils'
import { useTheme } from '@/hooks/useTheme'

type ThemeOption = 'dark' | 'light' | 'system'

const options: { id: ThemeOption; labelKey: string }[] = [
  { id: 'dark', labelKey: 'theme_switcher.dark' },
  { id: 'light', labelKey: 'theme_switcher.light' },
  { id: 'system', labelKey: 'theme_switcher.system' }
]

const ThemeSelector: FC = () => {
  const { t } = useTranslation()
  const { theme, setTheme } = useTheme()

  return (
    <div className="bg-secondary/50 inline-flex h-9 cursor-pointer items-center rounded-lg p-1">
      {options.map((opt) => (
        <button
          key={opt.id}
          type="button"
          onClick={() => setTheme(opt.id)}
          className={cn(
            'h-7 cursor-pointer rounded-md border px-2 text-xs font-medium transition-all duration-200',
            theme === opt.id
              ? 'border-border bg-background text-foreground'
              : 'border-transparent text-muted-foreground hover:border-border/50 hover:bg-background/50 hover:text-foreground'
          )}>
          {t(opt.labelKey)}
        </button>
      ))}
    </div>
  )
}

export default ThemeSelector
