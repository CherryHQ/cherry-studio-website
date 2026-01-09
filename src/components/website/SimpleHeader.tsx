import { ExternalLink, Menu, Star, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router-dom'

import cherryLogo from '@/assets/images/cherry-logo.svg'
import githubIcon from '@/assets/images/icons/github.svg'
import { cn } from '@/lib/utils'

import MobileMenu from './MobileMenu'

const SimpleHeader: React.FC = () => {
  const { t } = useTranslation()
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [starCount, setStarCount] = useState<number | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const fetchStarCount = async () => {
      try {
        const response = await fetch('https://api.github.com/repos/CherryHQ/cherry-studio')
        if (response.ok) {
          const data = await response.json()
          setStarCount(data.stargazers_count)
        }
      } catch (error) {
        console.error('Failed to fetch star count:', error)
      }
    }
    fetchStarCount()
  }, [])

  const formatStarCount = (count: number) => {
    if (count >= 1000) {
      return (count / 1000).toFixed(1) + 'k'
    }
    return count.toString()
  }

  const navLinks = [
    { path: '/', label: t('nav.home') },
    { path: '/download', label: t('nav.download') },
    { path: '/enterprise', label: t('enterprise') },
    { path: '/theme', label: t('nav.theme') },
    { path: 'https://docs.cherry-ai.com/', label: t('nav.docs'), external: true }
  ]

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 border-b border-border/50 transition-all duration-300',
        isScrolled ? 'glass py-3' : 'bg-background/80 backdrop-blur-sm py-4'
      )}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="group flex items-center gap-3">
            <div className="relative">
              <img
                src={cherryLogo}
                alt="Cherry Studio"
                className="h-8 w-auto transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute -inset-1 -z-10 rounded-full bg-primary/20 opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-100" />
            </div>
            <span className="hidden text-lg font-semibold text-foreground sm:block">Cherry Studio</span>
          </Link>

          {/* Right Section - Navigation + GitHub */}
          <div className="flex items-center gap-1">
            {/* Desktop Navigation */}
            <nav className="hidden items-center gap-1 lg:flex">
              {navLinks.map((link) =>
                link.external ? (
                  <a
                    key={link.path}
                    href={link.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      'flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors duration-200',
                      'text-muted-foreground hover:text-foreground'
                    )}>
                    {link.label}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                ) : (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={cn(
                      'relative px-4 py-2 text-sm font-medium transition-colors duration-200',
                      location.pathname === link.path
                        ? 'text-primary'
                        : 'text-muted-foreground hover:text-foreground'
                    )}>
                    {link.label}
                    {location.pathname === link.path && (
                      <span className="absolute bottom-0 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full bg-primary" />
                    )}
                  </Link>
                )
              )}
            </nav>

            {/* GitHub with Star Count */}
            <a
              href="https://github.com/CherryHQ/cherry-studio"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 hidden items-center gap-2 rounded-lg border border-border/50 bg-secondary/50 px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors duration-200 hover:bg-secondary hover:text-foreground sm:flex"
              title="GitHub">
              <img src={githubIcon} alt="GitHub" className="h-4 w-4 opacity-70 invert" />
              {starCount !== null && (
                <span className="flex items-center gap-1">
                  <Star className="h-3.5 w-3.5 fill-yellow-500 text-yellow-500" />
                  {formatStarCount(starCount)}
                </span>
              )}
            </a>

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              className="ml-2 flex h-9 w-9 items-center justify-center rounded-lg text-foreground transition-colors duration-200 hover:bg-accent lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </header>
  )
}

export default SimpleHeader
