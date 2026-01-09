import { X } from 'lucide-react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router-dom'

import { cn } from '@/lib/utils'

import LanguageSelector from './LanguageSelector'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const location = useLocation()
  const { t } = useTranslation()

  const navLinks = [
    { path: '/', label: t('nav.home') },
    { path: '/download', label: t('nav.download') },
    { path: '/enterprise', label: t('enterprise') },
    { path: '/theme', label: t('nav.theme') },
    { path: '/careers', label: t('nav.careers') },
    { path: 'https://docs.cherry-ai.com/', label: t('nav.docs'), external: true },
    { path: 'https://docs.cherry-ai.com/contact-us/questions', label: t('nav.contact'), external: true }
  ]

  return (
    <>
      {/* Overlay */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        )}
        onClick={onClose}
      />

      {/* Menu Panel */}
      <div
        className={cn(
          'fixed top-0 right-0 z-50 h-full w-[280px] max-w-[80vw]',
          'bg-card border-border border-l',
          'transform transition-transform duration-300 ease-out',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}>
        {/* Header */}
        <div className="border-border flex items-center justify-between border-b px-4 py-4">
          <LanguageSelector />
          <button
            className="text-muted-foreground hover:bg-accent hover:text-foreground flex h-9 w-9 items-center justify-center rounded-lg transition-colors"
            onClick={onClose}
            type="button">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="px-2 py-4">
          <ul className="space-y-1">
            {navLinks.map((link) => {
              const isActive = !link.external && location.pathname === link.path

              return (
                <li key={link.path}>
                  {link.external ? (
                    <a
                      href={link.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        'flex items-center rounded-lg px-4 py-3 text-sm font-medium',
                        'text-muted-foreground transition-colors duration-200',
                        'hover:bg-accent hover:text-foreground'
                      )}
                      onClick={onClose}>
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      to={link.path}
                      className={cn(
                        'flex items-center rounded-lg px-4 py-3 text-sm font-medium',
                        'transition-colors duration-200',
                        isActive
                          ? 'bg-primary/10 text-primary'
                          : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                      )}
                      onClick={onClose}>
                      {link.label}
                      {isActive && <span className="bg-primary ml-auto h-2 w-2 rounded-full" />}
                    </Link>
                  )}
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="border-border absolute right-0 bottom-0 left-0 border-t p-4">
          <p className="text-muted-foreground text-center text-xs">Cherry Studio</p>
        </div>
      </div>
    </>
  )
}

export default MobileMenu
