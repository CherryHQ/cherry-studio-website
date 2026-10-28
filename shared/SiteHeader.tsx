'use client'

import { ArrowUpRight, Menu, Star, X } from 'lucide-react'
import { type ReactNode, useEffect, useRef, useState } from 'react'

import { cn } from '../src/lib/utils'
import { HeaderDropdown } from './HeaderDropdown'
import type { HeaderLink } from './header-navigation'

export type { HeaderLink } from './header-navigation'

const GITHUB_STARS_CACHE_KEY = 'cherry-studio:github-stars'
const GITHUB_STARS_CACHE_TTL = 24 * 60 * 60 * 1000
// Keeps the static docs header complete before hydration or when the GitHub API is unavailable.
const GITHUB_STARS_FALLBACK = 52_059

interface GitHubStarsCache {
  count: number
  updatedAt: number
}

function isGitHubStarsCache(value: unknown): value is GitHubStarsCache {
  const cache = value as Partial<GitHubStarsCache> | null
  return typeof cache?.count === 'number' && Number.isFinite(cache.count) && typeof cache?.updatedAt === 'number'
}

function readGitHubStarsCache(): GitHubStarsCache | null {
  if (typeof window === 'undefined') return null
  for (const name of ['localStorage', 'sessionStorage'] as const) {
    try {
      const cached = JSON.parse(window[name].getItem(GITHUB_STARS_CACHE_KEY) ?? 'null')
      if (isGitHubStarsCache(cached)) return cached
    } catch {}
  }
  return null
}

function writeGitHubStarsCache(cache: GitHubStarsCache) {
  const serialized = JSON.stringify(cache)
  for (const name of ['localStorage', 'sessionStorage'] as const) {
    try {
      window[name].setItem(GITHUB_STARS_CACHE_KEY, serialized)
    } catch {}
  }
}

function formatStarCount(count: number) {
  return count >= 1000 ? `${(count / 1000).toFixed(1)}k` : String(count)
}

interface LinkProps {
  href: string
  className: string
  children: ReactNode
  'aria-current'?: 'page'
}
interface SiteHeaderProps {
  logo: string
  mobileLogo: string
  githubIcon: string
  links: HeaderLink[]
  menuLabel: string
  closeLabel: string
  bordered?: boolean
  mobileControls?: ReactNode
  renderLink?: (props: LinkProps) => ReactNode
  onLinkClick?: (item: HeaderLink) => void
}

/** Shared visual navigation; each app supplies its routing, translations and controls. */
export function SiteHeader({
  logo,
  mobileLogo,
  githubIcon,
  links,
  menuLabel,
  closeLabel,
  bordered = false,
  mobileControls,
  renderLink = (props) => <a {...props} />,
  onLinkClick
}: SiteHeaderProps) {
  const [scrolled, setScrolled] = useState(false)
  // Keep the first client render identical to the static HTML; apply cached stars in the effect.
  const [starCount, setStarCount] = useState(GITHUB_STARS_FALLBACK)
  const dialog = useRef<HTMLDialogElement>(null)
  const linkContent = (item: HeaderLink) => (
    <>
      {item.label}
      {item.badge && (
        <sup className="rounded-full bg-[#e54d4d]/10 px-1.5 py-0.5 text-[10px] font-semibold leading-none text-[#e54d4d] dark:bg-[#dc2626]/10 dark:text-[#dc2626]">
          {item.badge}
        </sup>
      )}
    </>
  )
  const link = (item: HeaderLink, className: string) =>
    item.external ? (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(event) => {
          onLinkClick?.(item)
          const refreshedHref = item.onClick?.()
          if (refreshedHref) event.currentTarget.href = refreshedHref
        }}
        className={className}>
        {linkContent(item)}
        <ArrowUpRight className="h-3 w-3" />
      </a>
    ) : (
      renderLink({
        href: item.href,
        className,
        'aria-current': item.active ? 'page' : undefined,
        children: linkContent(item)
      })
    )

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    const cached = readGitHubStarsCache()
    if (cached) setStarCount(cached.count)
    if (cached && Date.now() - cached.updatedAt < GITHUB_STARS_CACHE_TTL) {
      return () => window.removeEventListener('scroll', onScroll)
    }
    const controller = new AbortController()
    fetch('https://api.github.com/repos/CherryHQ/cherry-studio', { signal: controller.signal })
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => {
        if (typeof data?.stargazers_count !== 'number') return
        setStarCount(data.stargazers_count)
        writeGitHubStarsCache({ count: data.stargazers_count, updatedAt: Date.now() })
      })
      .catch(() => {})
    return () => {
      window.removeEventListener('scroll', onScroll)
      controller.abort()
    }
  }, [])

  return (
    <>
      <header
        className={cn(
          'site-header fixed inset-x-0 top-0 z-50 flex h-[72px] items-center border-b border-transparent bg-background/80 text-foreground antialiased backdrop-blur-sm',
          (bordered || scrolled) && 'border-border/50'
        )}>
        <div className="mx-auto flex w-full max-w-[97rem] items-center justify-between px-4">
          <div className="flex min-w-0 items-center gap-8">
            {renderLink({
              href: '/',
              className: 'group flex shrink-0 items-center gap-3',
              children: (
                <>
                  <img src={mobileLogo} alt="Cherry Studio" className="h-8 w-auto sm:hidden" />
                  <img src={logo} alt="" className="hidden h-8 w-auto rounded-[22%] sm:block" />
                  <span className="hidden text-lg font-semibold text-foreground sm:block">Cherry Studio</span>
                </>
              )
            })}
            <nav aria-label={menuLabel} className="hidden shrink-0 items-center gap-1 whitespace-nowrap lg:flex">
              {links.map((item) => (
                <span key={item.href}>
                  {item.children ? (
                    <HeaderDropdown item={item} renderItem={link} />
                  ) : (
                    link(
                      item,
                      cn(
                        'flex items-center gap-1.5 px-4 py-2 text-base font-medium transition-colors',
                        item.active ? 'text-black dark:text-white' : 'text-muted-foreground hover:text-foreground'
                      )
                    )
                  )}
                </span>
              ))}
            </nav>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            <a
              href="https://github.com/CherryHQ/cherry-studio"
              target="_blank"
              rel="noopener noreferrer"
              title="GitHub"
              className="flex h-9 shrink-0 items-center justify-center gap-2 rounded-lg border border-border/50 bg-secondary/50 px-3 py-2 text-sm font-medium text-muted-foreground transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-secondary hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 motion-reduce:transition-none">
              <img src={githubIcon} alt="GitHub" className="h-4 w-4 dark:invert" />
              <span className="flex w-[3.25rem] shrink-0 items-center gap-1">
                <Star className="h-3.5 w-3.5 shrink-0 fill-yellow-500 text-yellow-500" />
                <span className="min-w-[2rem] tabular-nums">{formatStarCount(starCount)}</span>
              </span>
            </a>
            <button
              type="button"
              aria-label={menuLabel}
              aria-haspopup="dialog"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-foreground hover:bg-accent lg:hidden"
              onClick={() => dialog.current?.showModal()}>
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>
      <dialog
        ref={dialog}
        aria-label={menuLabel}
        className="site-header-menu fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none border-0 bg-transparent p-0 text-foreground antialiased backdrop:bg-black/60"
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current?.close()
        }}>
        <div className="ml-auto flex h-full w-[280px] max-w-[85vw] flex-col border-l border-border bg-background shadow-xl">
          <div className="flex items-center justify-between border-b border-border px-4 py-4">
            <span className="font-semibold">Cherry Studio</span>
            <button
              type="button"
              aria-label={closeLabel}
              className="flex h-9 w-9 items-center justify-center rounded-[8px] hover:bg-accent"
              onClick={() => dialog.current?.close()}>
              <X className="h-5 w-5" />
            </button>
          </div>
          <nav
            aria-label={menuLabel}
            className="space-y-1 p-2"
            onClick={(event) => {
              if ((event.target as HTMLElement).closest('a')) dialog.current?.close()
            }}>
            {links.map((item) => (
              <div key={item.href}>
                {item.children ? (
                  <HeaderDropdown item={item} renderItem={link} mobile />
                ) : (
                  link(
                    item,
                    cn(
                      'flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium',
                      item.active
                        ? 'bg-accent text-foreground'
                        : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                    )
                  )
                )}
              </div>
            ))}
          </nav>
          {mobileControls && (
            <div className="mt-auto flex flex-wrap gap-3 border-t border-border p-4">{mobileControls}</div>
          )}
        </div>
      </dialog>
    </>
  )
}
