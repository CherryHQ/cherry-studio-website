import { createContext, type FC, type ReactNode, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark' | 'system'

interface ThemeContextType {
  theme: Theme
  resolvedTheme: 'light' | 'dark'
  setTheme: (theme: Theme) => void
  isDark: boolean
  isLight: boolean
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const ThemeProvider: FC<{ children: ReactNode }> = ({ children }) => {
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

  return (
    <ThemeContext.Provider
      value={{
        theme,
        resolvedTheme,
        setTheme,
        isDark: resolvedTheme === 'dark',
        isLight: resolvedTheme === 'light'
      }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
