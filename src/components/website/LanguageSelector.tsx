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
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        className={cn(
          'flex items-center justify-center gap-1.5',
          'min-w-[70px] px-2.5 py-1.5',
          'rounded-md border border-gray-200 bg-white',
          'text-sm font-medium text-gray-700',
          'transition-all duration-200 ease-in-out',
          'hover:border-[#ea5e5d] hover:bg-gray-50',
          'focus:ring-2 focus:ring-[#ea5e5d]/20 focus:outline-none',
          'active:scale-95',
          'sm:min-w-[80px] sm:gap-1.5 sm:px-3 sm:py-2'
        )}
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        aria-label="Select Language"
        aria-expanded={isOpen}>
        <span className="text-xs font-semibold tracking-wide sm:text-sm">{currentLanguage.short}</span>
        <span className={cn('text-[10px] text-gray-400 transition-transform duration-200', isOpen && 'rotate-180')}>
          ▼
        </span>
      </button>

      {isOpen && (
        <div
          className={cn(
            'absolute top-full right-0 z-[1000]',
            'mt-1 min-w-[140px]',
            'rounded-lg border border-gray-200 bg-white shadow-lg',
            'py-1.5',
            'animate-in fade-in slide-in-from-top-2 duration-200',
            'sm:mt-1 sm:min-w-[160px]'
          )}>
          {languages.map((language) => {
            const isActive = language.code === i18n.language
            return (
              <button
                key={language.code}
                className={cn(
                  'flex w-full items-center gap-2.5',
                  'px-3 py-2',
                  'text-left text-sm text-gray-700',
                  'transition-colors duration-200',
                  'hover:bg-gray-100',
                  'active:bg-gray-200',
                  'sm:px-4 sm:py-2.5',
                  isActive && 'bg-red-50 text-[#ea5e5d]'
                )}
                onClick={() => handleLanguageChange(language.code)}
                type="button">
                <span className="text-base sm:text-lg">{language.flag}</span>
                <span className="flex-1 text-xs sm:text-sm">{language.name}</span>
                {isActive && <span className="text-xs font-bold text-[#ea5e5d]">✓</span>}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default LanguageSelector
