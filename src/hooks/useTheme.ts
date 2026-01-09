import { useEffect, useState } from 'react'

type Theme = 'light' | 'dark' | 'system'

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>('system')

  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('dark')

  useEffect(() => {
    const root = document.documentElement

    const applyTheme = (newTheme: 'light' | 'dark') => {
      setResolvedTheme(newTheme)
      if (newTheme === 'light') {
        root.classList.add('light')
        root.classList.remove('dark')
      } else {
        root.classList.add('dark')
        root.classList.remove('light')
      }
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    const handleSystemChange = (e: MediaQueryListEvent | MediaQueryList) => {
      if (theme === 'system') {
        applyTheme(e.matches ? 'dark' : 'light')
      }
    }

    if (theme === 'system') {
      applyTheme(mediaQuery.matches ? 'dark' : 'light')
    } else {
      applyTheme(theme)
    }

    mediaQuery.addEventListener('change', handleSystemChange)

    return () => {
      mediaQuery.removeEventListener('change', handleSystemChange)
    }
  }, [theme])

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
  }

  return {
    theme,
    resolvedTheme,
    setTheme,
    isDark: resolvedTheme === 'dark',
    isLight: resolvedTheme === 'light'
  }
}
