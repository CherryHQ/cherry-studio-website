import { ChevronDown, Globe } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { cn } from '@/lib/utils'

const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const languages = [
    { code: 'zh-CN', name: '简体中文', flag: '🇨🇳', short: 'ZH' },
    { code: 'en-US', name: 'English', flag: '🇺🇸', short: 'EN' }
  ]

  const currentLanguage = languages.find((lang) => i18n.language === lang.code) || languages[0]

  const handleLanguageChange = (languageCode: string) => {
    i18n.changeLanguage(languageCode)
    setIsOpen(false)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className={cn(
          'flex items-center gap-1.5',
          'h-9 px-3',
          'border-border bg-secondary/50 rounded-lg border',
          'text-foreground text-sm font-medium',
          'transition-all duration-200',
          'hover:bg-secondary hover:border-primary/30',
          'focus:ring-primary/20 focus:ring-2 focus:outline-none',
          'active:scale-95'
        )}
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        aria-label="Select Language"
        aria-expanded={isOpen}>
        <Globe className="text-muted-foreground h-4 w-4" />
        <span className="text-xs font-semibold tracking-wide">{currentLanguage.short}</span>
        <ChevronDown
          className={cn('text-muted-foreground h-3 w-3 transition-transform duration-200', isOpen && 'rotate-180')}
        />
      </button>

      {isOpen && (
        <div
          className={cn(
            'absolute right-0 bottom-full z-[1000]',
            'mb-2 min-w-[160px]',
            'border-border bg-card rounded-xl border shadow-2xl',
            'py-1.5',
            'animate-in fade-in slide-in-from-bottom-2 duration-200'
          )}>
          {languages.map((language) => {
            const isActive = language.code === i18n.language
            return (
              <button
                key={language.code}
                className={cn(
                  'flex w-full items-center gap-3',
                  'px-4 py-2.5',
                  'text-left text-sm',
                  'transition-colors duration-200',
                  'hover:bg-accent',
                  isActive ? 'text-primary bg-primary/10' : 'text-foreground'
                )}
                onClick={() => handleLanguageChange(language.code)}
                type="button">
                <span className="text-lg">{language.flag}</span>
                <span className="flex-1">{language.name}</span>
                {isActive && (
                  <span className="bg-primary text-primary-foreground flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold">
                    ✓
                  </span>
                )}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default LanguageSelector
