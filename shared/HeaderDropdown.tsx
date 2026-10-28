'use client'

import { type ReactNode, useEffect, useRef } from 'react'

import { cn } from '../src/lib/utils'
import type { HeaderLink } from './header-navigation'

interface HeaderDropdownProps {
  item: HeaderLink
  renderItem: (item: HeaderLink, className: string) => ReactNode
  mobile?: boolean
}

export function HeaderDropdown({ item, renderItem, mobile = false }: HeaderDropdownProps) {
  const container = useRef<HTMLDetailsElement>(null)
  const hovered = useRef(false)

  useEffect(() => {
    if (mobile) return
    const closeOutside = (event: PointerEvent) => {
      if (event.target instanceof Node && !container.current?.contains(event.target)) {
        container.current?.removeAttribute('open')
      }
    }
    document.addEventListener('pointerdown', closeOutside)
    return () => document.removeEventListener('pointerdown', closeOutside)
  }, [mobile])

  return (
    <details
      ref={container}
      className="group relative"
      onPointerEnter={(event) => {
        if (!mobile && event.pointerType === 'mouse') {
          hovered.current = true
          event.currentTarget.open = true
        }
      }}
      onPointerLeave={(event) => {
        if (!mobile && event.pointerType === 'mouse') {
          hovered.current = false
          if (!event.currentTarget.contains(document.activeElement)) event.currentTarget.open = false
        }
      }}
      onBlur={(event) => {
        if (!mobile && event.relatedTarget && !event.currentTarget.contains(event.relatedTarget)) {
          event.currentTarget.open = false
        }
      }}
      onKeyDown={(event) => {
        if (event.key === 'Escape') {
          event.preventDefault()
          event.stopPropagation()
          event.currentTarget.open = false
          event.currentTarget.querySelector('summary')?.focus()
        }
      }}>
      <summary
        onClick={(event) => {
          // A mouse click must not immediately undo the hover-open action.
          if (hovered.current && event.detail > 0) {
            event.preventDefault()
            if (container.current) container.current.open = true
          }
        }}
        className={cn(
          'flex cursor-pointer list-none items-center justify-between gap-3 rounded-lg px-4 py-2 font-medium focus-visible:outline-2 focus-visible:outline-offset-4 [&::-webkit-details-marker]:hidden',
          mobile ? 'py-3 text-sm' : 'text-[15px] leading-5',
          item.active ? 'text-foreground' : 'text-muted-foreground hover:bg-accent hover:text-foreground'
        )}>
        {item.label}
        <span
          aria-hidden="true"
          className="mb-1 size-2 rotate-45 border-r border-b border-current transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-open:translate-y-1 group-open:rotate-[225deg] motion-reduce:transition-none"
        />
      </summary>
      <div className={mobile ? 'px-4 pb-2' : 'absolute right-0 top-full w-64 pt-2'}>
        <div
          className={cn(
            'flex flex-col gap-1',
            !mobile && 'rounded-xl border border-border bg-background p-2 shadow-lg'
          )}
          onClick={(event) => {
            if ((event.target as HTMLElement).closest('a')) container.current?.removeAttribute('open')
          }}>
          {item.children?.map((child) => (
            <div key={child.href}>
              {renderItem(
                child,
                cn(
                  'flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2',
                  child.active
                    ? 'bg-accent text-foreground'
                    : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                )
              )}
            </div>
          ))}
        </div>
      </div>
    </details>
  )
}
