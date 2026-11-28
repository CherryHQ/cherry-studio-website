import {
  Clock,
  FileSearch,
  Languages,
  type LucideIcon,
  MessageSquare,
  MousePointerClick,
  Palette,
  Plus,
  Search,
  Store,
  X
} from 'lucide-react'
import type { ReactNode, SVGProps } from 'react'

import { cn } from '@/lib/utils'

export type AppNav = 'agents' | 'assistants' | 'tasks' | 'translate' | 'paintings' | 'knowledge' | 'marketplace'

// Default sidebar shortcuts, in preference order (preferenceSchemas `ui.sidebar_shortcut`).
const SIDEBAR_APPS: { id: AppNav; icon: LucideIcon }[] = [
  { id: 'agents', icon: MousePointerClick },
  { id: 'assistants', icon: MessageSquare },
  { id: 'tasks', icon: Clock },
  { id: 'translate', icon: Languages },
  { id: 'paintings', icon: Palette },
  { id: 'knowledge', icon: FileSearch }
]

export function SidebarCollapseIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} aria-hidden="true" {...props}>
      <rect x="3.5" y="4" width="17" height="16" rx="4" />
      <path d="M8.2 8v8" strokeLinecap="round" />
    </svg>
  )
}

/** The bundled default user avatar (renderer/assets/images/avatar.svg). */
export function DefaultAvatar({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 1158 1158" aria-hidden="true" className={cn('shrink-0 rounded-full', className)}>
      <rect width="1158" height="1158" fill="#7EDBC2" fillOpacity="0.25" />
      <circle cx="579.5" cy="447" r="202" fill="#49B8A3" fillOpacity="0.97" />
      <path
        d="M579.5 689C796.272 689 972 864.728 972 1081.5V1158H187V1081.5C187 864.728 362.728 689 579.5 689Z"
        fill="#6ACBB9"
        fillOpacity="0.42"
      />
    </svg>
  )
}

/** EmojiIcon from @cherrystudio/ui: the glyph over a blurred, enlarged copy of itself. */
export function EmojiIcon({ emoji, size }: { emoji: string; size: number }) {
  return (
    <span
      aria-hidden="true"
      className="relative flex shrink-0 items-center justify-center overflow-hidden rounded-full"
      style={{ width: size, height: size }}>
      <span
        className="absolute inset-0 flex scale-150 items-center justify-center opacity-40 blur-sm"
        style={{ fontSize: size * 1.2, lineHeight: 1 }}>
        {emoji}
      </span>
      <span className="relative" style={{ fontSize: size * 0.7, lineHeight: 1 }}>
        {emoji}
      </span>
    </span>
  )
}

/** Strips the "Cherry Studio — " window-title prefix the demos use for their tab label. */
export function tabTitle(windowTitle: string) {
  return windowTitle.replace(/^Cherry Studio\s*[—-]\s*/, '')
}

interface AppShellProps {
  active: AppNav
  tab: { title: string; emoji?: string }
  children: ReactNode
}

/**
 * Desktop window chrome from the renderer AppShell: 50px icon rail (with the macOS window controls in its top band),
 * a 44px tab bar, and the rounded content card the page renders into.
 */
export default function AppShell({ active, tab, children }: AppShellProps) {
  // Marketplace opens as a tab with its own icon and is not one of the default rail shortcuts.
  const ActiveIcon =
    active === 'marketplace' ? Store : (SIDEBAR_APPS.find((app) => app.id === active)?.icon ?? MessageSquare)

  return (
    <div className="app-surface flex h-full bg-sidebar text-foreground">
      <aside className="hidden w-[50px] shrink-0 flex-col items-center sm:flex" aria-hidden="true">
        <div className="flex h-11 shrink-0 items-center gap-1.5 pl-1">
          <span className="size-2.5 rounded-full bg-foreground/20" />
          <span className="size-2.5 rounded-full bg-foreground/20" />
          <span className="size-2.5 rounded-full bg-foreground/20" />
        </div>
        <div className="flex flex-1 flex-col items-center gap-1 px-1.5">
          {SIDEBAR_APPS.map(({ id, icon: Icon }) => (
            <span
              key={id}
              className={cn(
                'flex size-9 items-center justify-center rounded-full text-muted-foreground',
                id === active && 'bg-sidebar-foreground/12 text-sidebar-foreground'
              )}>
              <Icon
                className="size-[18px]"
                strokeWidth={1.6}
                fill={id === active && id === 'assistants' ? 'currentColor' : 'none'}
              />
            </span>
          ))}
        </div>
        <span className="flex size-9 items-center justify-center pb-2.5">
          <DefaultAvatar className="size-6.5" />
        </span>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex h-11 shrink-0 items-center gap-1 pl-1.5 sm:pl-0" aria-hidden="true">
          <span className="flex h-[30px] min-w-[56px] max-w-[180px] items-center gap-1.5 rounded-[10px] bg-sidebar-foreground/12 px-2 text-sidebar-foreground">
            {tab.emoji ? (
              <EmojiIcon emoji={tab.emoji} size={14} />
            ) : (
              <ActiveIcon className="size-3.5 shrink-0" strokeWidth={1.8} />
            )}
            <span className="min-w-0 flex-1 truncate text-xs font-medium">{tab.title}</span>
            <X className="size-2.5 shrink-0" />
          </span>
          <span className="ml-0.5 flex size-7 items-center justify-center text-muted-foreground">
            <Plus className="size-3.5" />
          </span>
          <span className="mr-2 ml-auto flex size-8 items-center justify-center text-muted-foreground">
            <Search className="size-4" strokeWidth={1.8} />
          </span>
        </div>

        <div className="flex min-h-0 flex-1 pr-1.5 pb-1.5 pl-1.5 sm:pl-0">
          <div className="relative flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden rounded-[12px] border-[0.5px] border-border bg-background">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
