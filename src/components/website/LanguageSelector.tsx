import './LanguageSelector.css'

import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const languages = [
    { code: 'zh', name: '简体中文', flag: '🇨🇳', short: '简' },
    { code: 'zh-TW', name: '繁體中文', flag: 'cn', short: '繁' },
    { code: 'en', name: 'English', flag: '🇺🇸', short: 'EN' },
    { code: 'ja', name: '日本語', flag: '🇯🇵', short: '日' },
    { code: 'ko', name: '한국어', flag: '🇰🇷', short: '한' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺', short: 'RU' },
    { code: 'fr', name: 'Français', flag: '🇫🇷', short: 'FR' },
    { code: 'th', name: 'ไทย', flag: '🇹🇭', short: 'TH' }
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
    <div className="language-selector" ref={dropdownRef}>
      <button
        className="language-selector-button"
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        aria-label="Select Language">
        <span className="language-flag">{currentLanguage.flag}</span>
        <span className="language-code">{currentLanguage.short}</span>
        <span className={`language-arrow ${isOpen ? 'open' : ''}`}>▼</span>
      </button>

      {isOpen && (
        <div className="language-dropdown">
          {languages.map((language) => (
            <button
              key={language.code}
              className={`language-option ${language.code === i18n.language ? 'active' : ''}`}
              onClick={() => handleLanguageChange(language.code)}
              type="button">
              <span className="language-flag">{language.flag}</span>
              <span className="language-name">{language.name}</span>
              {language.code === i18n.language && <span className="checkmark">✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default LanguageSelector