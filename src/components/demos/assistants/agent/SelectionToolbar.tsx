import {
  Bot,
  ClipboardCheck,
  ClipboardCopy,
  FileQuestion,
  Languages,
  ListTodo,
  type LucideIcon,
  ScanText,
  Search
} from 'lucide-react'
import type { CSSProperties, Ref } from 'react'

import logo from '@/assets/images/logo.png'
import type { SelectionAgentCopy } from '@/content/demos/selectionAgent'
import { cn } from '@/lib/utils'

export type ToolbarAction = 'translate' | 'explain' | 'summary' | 'search' | 'copy' | 'ask-agent' | 'tasks'

// The default `feature.selection.action_items`, then one custom action whose runner is an agent.
const ACTIONS: { id: ToolbarAction; icon: LucideIcon; label: keyof SelectionAgentCopy['actions'] }[] = [
  { id: 'translate', icon: Languages, label: 'translate' },
  { id: 'explain', icon: FileQuestion, label: 'explain' },
  { id: 'summary', icon: ScanText, label: 'summary' },
  { id: 'search', icon: Search, label: 'search' },
  { id: 'copy', icon: ClipboardCopy, label: 'copy' },
  { id: 'ask-agent', icon: Bot, label: 'askAgent' },
  { id: 'tasks', icon: ListTodo, label: 'tasks' }
]

export const actionIcon = (id: ToolbarAction) => ACTIONS.find((action) => action.id === id)?.icon ?? Bot
export const actionLabel = (copy: SelectionAgentCopy, id: ToolbarAction) =>
  copy.actions[ACTIONS.find((action) => action.id === id)?.label ?? 'askAgent']

interface SelectionToolbarProps {
  copy: SelectionAgentCopy
  compact: boolean
  hovered: ToolbarAction | null
  copied: boolean
  style: CSSProperties
  onAction: (id: ToolbarAction) => void
  onEscape: () => void
  toolbarRef?: Ref<HTMLDivElement>
}

/** Mirrors desktop SelectionToolbarView: the logo cell, then one button per enabled action. */
export function SelectionToolbar({
  copy,
  compact,
  hovered,
  copied,
  style,
  onAction,
  onEscape,
  toolbarRef
}: SelectionToolbarProps) {
  return (
    <div
      ref={toolbarRef}
      role="toolbar"
      aria-label={copy.actions.askAgent}
      data-cherry-window=""
      onMouseDown={(event) => event.preventDefault()}
      onKeyDown={(event) => {
        if (event.key === 'Escape') onEscape()
      }}
      style={style}
      className={cn(
        'absolute z-50 inline-flex h-9 items-stretch overflow-hidden rounded-[10px] bg-card select-none motion-safe:animate-in motion-safe:fade-in motion-safe:zoom-in-95 motion-safe:duration-150',
        'shadow-[0_2px_3px_rgb(50_50_50/0.1)] [--toolbar-border:rgb(0_0_0/0.08)] dark:shadow-[0_2px_3px_rgb(50_50_50/0.3)] dark:[--toolbar-border:rgb(255_255_255/0.2)]'
      )}>
      <span className="flex items-center rounded-l-[10px] border-y-[0.5px] border-l-[0.5px] border-(--toolbar-border) pr-1.5 pl-2">
        <img src={logo} alt="" className="size-[22px] rounded-full object-cover" draggable={false} />
      </span>
      <span className="flex items-stretch rounded-r-[10px] border-y-[0.5px] border-r-[0.5px] border-(--toolbar-border)">
        {ACTIONS.map(({ id, icon, label }) => {
          const Icon = id === 'copy' && copied ? ClipboardCheck : icon
          const name = copy.actions[label]
          const lit = hovered === id
          return (
            <button
              key={id}
              type="button"
              data-action={id}
              onClick={() => onAction(id)}
              aria-label={name}
              title={compact ? name : undefined}
              className={cn(
                'group flex h-full cursor-pointer items-center gap-0.5 px-2 transition-colors duration-100 outline-none last:rounded-r-[10px] last:pr-3 last:pl-2 hover:bg-accent focus-visible:bg-accent focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-inset',
                lit && 'bg-accent'
              )}>
              <Icon
                aria-hidden="true"
                className={cn(
                  'size-4 shrink-0 text-card-foreground transition-colors duration-100 group-hover:text-primary group-focus-visible:text-primary',
                  (lit || (id === 'copy' && copied)) && 'text-primary'
                )}
              />
              {!compact && (
                <span
                  className={cn(
                    'max-w-[120px] truncate text-sm leading-[1.1] text-card-foreground transition-colors duration-100 group-hover:text-primary group-focus-visible:text-primary',
                    lit && 'text-primary'
                  )}>
                  {name}
                </span>
              )}
            </button>
          )
        })}
      </span>
    </div>
  )
}
