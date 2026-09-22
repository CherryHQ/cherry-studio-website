'use client'

import { ArrowUpRight, Download, Menu, Star, X } from 'lucide-react'
import { type ReactNode, useEffect, useRef, useState } from 'react'

import { cn } from '../src/lib/utils'

export interface HeaderLink {
  href: string
  label: string
  external?: boolean
  active?: boolean
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
  downloadLabel: string
  menuLabel: string
  closeLabel: string
  mobileControls?: ReactNode
  renderLink?: (props: LinkProps) => ReactNode
}

/** Shared visual navigation; each app supplies its routing, translations and controls. */
export function SiteHeader({
  logo,
  mobileLogo,
  githubIcon,
  links,
  downloadLabel,
  menuLabel,
  closeLabel,
  mobileControls,
  renderLink = (props) => <a {...props} />
}: SiteHeaderProps) {
  const [scrolled, setScrolled] = useState(false)
  const [starCount, setStarCount] = useState<number | null>(null)
  const dialog = useRef<HTMLDialogElement>(null)
  const link = (item: HeaderLink, className: string) =>
    item.external ? (
      <a href={item.href} target="_blank" rel="noopener noreferrer" className={className}>
        {item.label}
        <ArrowUpRight className="h-3 w-3" />
      </a>
    ) : (
      renderLink({
        href: item.href,
        className,
        'aria-current': item.active ? 'page' : undefined,
        children: item.label
      })
    )

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    const controller = new AbortController()
    fetch('https://api.github.com/repos/CherryHQ/cherry-studio', { signal: controller.signal })
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => {
        if (typeof data?.stargazers_count === 'number') setStarCount(data.stargazers_count)
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
          'site-header fixed inset-x-0 top-0 z-50 flex h-[72px] items-center border-b border-border/50 bg-background/80 backdrop-blur-sm transition-all duration-300',
          scrolled && 'shadow-sm'
        )}>
        <div className="mx-auto flex w-full max-w-[97rem] items-center justify-between px-4">
          <div className="flex items-center gap-4">
            {renderLink({
              href: '/',
              className: 'group flex items-center gap-3',
              children: (
                <>
                  <img src={mobileLogo} alt="Cherry Studio" className="h-8 w-auto sm:hidden" />
                  <img src={logo} alt="" className="hidden h-8 w-auto rounded-[22%] sm:block" />
                  <span className="hidden text-lg font-semibold text-foreground sm:block">Cherry Studio</span>
                </>
              )
            })}
            <a
              href="https://github.com/CherryHQ/cherry-studio"
              target="_blank"
              rel="noopener noreferrer"
              title="GitHub"
              className="hidden h-[34px] w-[102px] items-center justify-center gap-2 rounded-lg border border-border/50 bg-secondary/50 px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground sm:flex">
              <img src={githubIcon} alt="GitHub" className="h-4 w-4 dark:invert" />
              {starCount !== null && (
                <span className="flex items-center gap-1">
                  <Star className="h-3.5 w-3.5 fill-yellow-500 text-yellow-500" />
                  {starCount >= 1000 ? `${(starCount / 1000).toFixed(1)}k` : starCount}
                </span>
              )}
            </a>
          </div>
          <div className="flex items-center gap-1">
            <nav aria-label={menuLabel} className="hidden items-center gap-1 lg:flex">
              {links.map((item) => (
                <span key={item.href}>
                  {link(
                    item,
                    cn(
                      'flex items-center gap-1.5 px-4 py-2 text-base font-medium transition-colors',
                      item.active ? 'text-black dark:text-white' : 'text-muted-foreground hover:text-foreground'
                    )
                  )}
                </span>
              ))}
            </nav>
            {renderLink({
              href: '/download',
              className:
                'ml-2 hidden items-center gap-2 rounded-lg bg-black px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-black/80 sm:flex dark:bg-white dark:text-black dark:hover:bg-white/80',
              children: (
                <>
                  <Download className="h-4 w-4" />
                  {downloadLabel}
                </>
              )
            })}
            <button
              type="button"
              aria-label={menuLabel}
              aria-haspopup="dialog"
              className="ml-2 flex h-9 w-9 items-center justify-center rounded-lg text-foreground hover:bg-accent lg:hidden"
              onClick={() => dialog.current?.showModal()}>
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>
      <dialog
        ref={dialog}
        aria-label={menuLabel}
        className="site-header-menu fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none border-0 bg-transparent p-0 text-foreground backdrop:bg-black/60"
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current?.close()
        }}>
        <div className="ml-auto flex h-full w-[280px] max-w-[85vw] flex-col border-l border-border bg-background shadow-xl">
          <div className="flex items-center justify-between border-b border-border px-4 py-4">
            <span className="font-semibold">Cherry Studio</span>
            <button
              type="button"
              aria-label={closeLabel}
              className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-accent"
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
            {[{ href: '/download', label: downloadLabel }, ...links].map((item) => (
              <div key={item.href}>
                {link(
                  item,
                  cn(
                    'flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium',
                    item.active
                      ? 'bg-accent text-foreground'
                      : 'text-muted-foreground hover:bg-accent hover:text-foreground'
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
