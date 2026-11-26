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
  githubIcon: string
  links: HeaderLink[]
  menuLabel: string
  closeLabel: string
  downloadAction?: { href: string; label: string }
  themeControl?: ReactNode
  mobileControls?: ReactNode
  renderLink?: (props: LinkProps) => ReactNode
  onLinkClick?: (item: HeaderLink) => void
}

/** Shared visual navigation; each app supplies its routing, translations and controls. */
export function SiteHeader({
  logo,
  githubIcon,
  links,
  menuLabel,
  closeLabel,
  downloadAction,
  themeControl,
  mobileControls,
  renderLink = (props) => <a {...props} />,
  onLinkClick
}: SiteHeaderProps) {
  // Keep the first client render identical to the static HTML; apply cached stars in the effect.
  const [starCount, setStarCount] = useState(GITHUB_STARS_FALLBACK)
  const dialog = useRef<HTMLDialogElement>(null)
  const linkContent = (item: HeaderLink) => (
    <>
      {item.label}
      {item.badge && (
        <sup className="rounded-sm bg-secondary px-1.5 py-0.5 text-[10px] font-semibold leading-none text-muted-foreground">
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
    const cached = readGitHubStarsCache()
    if (cached) setStarCount(cached.count)
    if (cached && Date.now() - cached.updatedAt < GITHUB_STARS_CACHE_TTL) return
    const controller = new AbortController()
    fetch('https://api.github.com/repos/CherryHQ/cherry-studio', { signal: controller.signal })
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => {
        if (typeof data?.stargazers_count !== 'number') return
        setStarCount(data.stargazers_count)
        writeGitHubStarsCache({ count: data.stargazers_count, updatedAt: Date.now() })
      })
      .catch(() => {})
    return () => controller.abort()
  }, [])

  return (
    <>
      <header className="site-header fixed inset-x-0 top-0 z-50 flex h-[60px] items-center px-3 text-foreground antialiased sm:px-4">
        {/* Floating pill bar inside the fixed 60px band, so docs offsets stay unchanged. */}
        <div className="mx-auto flex h-12 w-full max-w-(--site-layout-width) items-center justify-between gap-3 rounded-full border border-border bg-background/70 pr-2 pl-4 shadow-[0_10px_40px_-18px_rgb(0_0_0/0.25)] backdrop-blur-xl backdrop-saturate-150 sm:pl-5">
          <div className="flex h-full min-w-0 items-center gap-7">
            {renderLink({
              href: '/',
              className:
                'flex shrink-0 items-center gap-2 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary',
              children: (
                <>
                  <img src={logo} alt="" className="size-6 rounded-md" />
                  <span className="whitespace-nowrap text-sm font-semibold text-foreground">Cherry Studio</span>
                </>
              )
            })}
            <nav
              aria-label={menuLabel}
              className="hidden h-full shrink-0 items-center gap-0.5 whitespace-nowrap min-[1100px]:flex">
              {links.map((item) => (
                <span key={item.href} className="flex h-full items-center">
                  {item.children ? (
                    <HeaderDropdown item={item} renderItem={link} />
                  ) : (
                    link(
                      item,
                      cn(
                        'flex h-8 items-center gap-1.5 rounded-full px-3 text-sm font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-primary',
                        item.active ? 'bg-accent text-foreground' : 'text-muted-foreground hover:text-foreground'
                      )
                    )
                  )}
                </span>
              ))}
            </nav>
          </div>
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <a
              href="https://github.com/CherryHQ/cherry-studio"
              target="_blank"
              rel="noopener noreferrer"
              title="GitHub"
              className="hidden h-8 shrink-0 items-center justify-center gap-2 rounded-full border border-border px-3 text-sm font-medium text-muted-foreground transition-colors duration-300 hover:bg-accent hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:flex">
              <img src={githubIcon} alt="GitHub" className="size-4 dark:invert" />
              <span className="flex w-[3.25rem] shrink-0 items-center gap-1">
                <Star aria-hidden="true" className="size-3.5 shrink-0" />
                <span className="min-w-[2rem] tabular-nums">{formatStarCount(starCount)}</span>
              </span>
            </a>
            {themeControl}
            {downloadAction &&
              renderLink({
                href: downloadAction.href,
                className:
                  'inline-flex h-8 items-center whitespace-nowrap rounded-full bg-foreground px-3 text-xs sm:px-4 sm:text-sm font-semibold text-background transition-[background-color,transform] duration-200 hover:bg-foreground/85 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary active:scale-[0.97]',
                children: downloadAction.label
              })}
            <button
              type="button"
              aria-label={menuLabel}
              aria-haspopup="dialog"
              className="flex size-8 items-center justify-center rounded-full border border-border text-foreground hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary min-[1100px]:hidden"
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
        <div className="ml-auto flex h-full w-full flex-col overflow-y-auto bg-background sm:max-w-md sm:border-l sm:border-border">
          <div className="flex items-center justify-between border-b border-border px-4 py-4">
            <span className="flex items-center gap-2 font-semibold">
              <img src={logo} alt="" className="size-6 rounded-md" />
              Cherry Studio
            </span>
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
            className="divide-y divide-border px-4 py-2"
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
                      'flex items-center gap-2 rounded-md px-4 py-3 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-[-2px]',
                      item.active
                        ? 'bg-accent text-foreground'
                        : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                    )
                  )
                )}
              </div>
            ))}
          </nav>
          <a
            href="https://github.com/CherryHQ/cherry-studio"
            target="_blank"
            rel="noopener noreferrer"
            className="mx-8 my-4 inline-flex w-fit items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <img src={githubIcon} alt="" className="size-4 dark:invert" /> GitHub
            <ArrowUpRight aria-hidden="true" className="size-3" />
          </a>
          {mobileControls && (
            <div className="mt-auto flex flex-wrap gap-3 border-t border-border p-4">{mobileControls}</div>
          )}
        </div>
      </dialog>
    </>
  )
}
