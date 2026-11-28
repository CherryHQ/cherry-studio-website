import { AnimatePresence, m, useReducedMotion } from 'framer-motion'
import { Check, LoaderCircle, X } from 'lucide-react'
import { useState } from 'react'

import type { SelectionAgentCopy } from '@/content/demos/selectionAgent'
import { spring } from '@/lib/motion'
import { cn } from '@/lib/utils'
import type { AgentStatus } from './AgentWindow'

export interface CapsuleItem {
  id: number
  avatar: string
  name: string
  title: string
  status: AgentStatus
  steps: number
  collapsedAt: number
}

/** Beyond this many capsules, the rest fold into "+N". */
const MAX_VISIBLE = 5
/** Lower ranks sit nearer the corner: what runs, then what has finished. */
const RANK: Record<AgentStatus, number> = { starting: 1, running: 1, done: 2 }

interface CapsuleStackProps {
  capsules: CapsuleItem[]
  copy: SelectionAgentCopy
  /** The capsule the autoplay cursor rests on, which shows its hover state. */
  hovered: number | null
  onRestore: (id: number) => void
  onClose: (id: number) => void
}

/** Mirrors desktop SelectionCapsuleStack: collapsed agent windows parked at the work area's bottom-right corner. */
export function CapsuleStack({ capsules, copy, hovered, onRestore, onClose }: CapsuleStackProps) {
  const reduced = useReducedMotion()
  const [expanded, setExpanded] = useState(false)
  const ordered = [...capsules].sort((a, b) => RANK[a.status] - RANK[b.status] || a.collapsedAt - b.collapsedAt)
  const visible = expanded ? ordered : ordered.slice(0, MAX_VISIBLE)
  const text = copy.capsule

  return (
    // Column-reverse puts the first capsule nearest the corner, 12px in from both edges.
    <div className="pointer-events-none! absolute right-1 bottom-1 z-40 flex flex-col-reverse items-end gap-2 p-2 *:pointer-events-auto">
      <AnimatePresence initial={false}>
        {visible.map((capsule) => {
          const active = capsule.status !== 'done'
          const Icon = active ? LoaderCircle : Check
          const hover = hovered === capsule.id
          return (
            <m.div
              key={capsule.id}
              layout={!reduced}
              data-capsule={capsule.id}
              initial={{ opacity: 0, y: 6, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1, transition: { ...spring.settle, delay: reduced ? 0 : 0.12 } }}
              exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.12 } }}
              transition={spring.settle}
              className={cn(
                'group flex h-9 items-center gap-1 rounded-full border border-border bg-popover pr-3 text-xs text-foreground shadow-md focus-within:pr-1.5 hover:pr-1.5',
                hover && 'pr-1.5'
              )}>
              <button
                type="button"
                onClick={() => onRestore(capsule.id)}
                className="flex h-full min-w-0 cursor-pointer items-center gap-2 rounded-full pl-[7px] focus-visible:outline-2 focus-visible:outline-primary">
                <span
                  aria-hidden="true"
                  className="inline-flex size-[18px] shrink-0 items-center justify-center rounded-sm bg-muted text-[11px] leading-none">
                  {capsule.avatar}
                </span>
                <span className="font-medium whitespace-nowrap">{capsule.name}</span>
                <span
                  className={cn(
                    'max-w-45 truncate text-muted-foreground group-focus-within:inline group-hover:inline',
                    hover ? 'inline' : 'hidden'
                  )}>
                  {capsule.title}
                </span>
                <span
                  aria-live="polite"
                  className={cn(
                    'inline-flex items-center gap-1 whitespace-nowrap tabular-nums',
                    active ? 'text-muted-foreground' : 'text-emerald-600 dark:text-emerald-400'
                  )}>
                  <Icon className={cn('size-3', active && 'motion-safe:animate-spin')} aria-hidden="true" />
                  {active
                    ? capsule.steps > 0
                      ? text.step.replace('{n}', String(capsule.steps))
                      : text.running
                    : text.done}
                </span>
              </button>
              <button
                type="button"
                onClick={() => onClose(capsule.id)}
                aria-label={text.close}
                className={cn(
                  'size-5 shrink-0 cursor-pointer items-center justify-center rounded-full text-muted-foreground group-focus-within:inline-flex group-hover:inline-flex hover:bg-accent focus-visible:outline-2 focus-visible:outline-primary',
                  hover ? 'inline-flex' : 'hidden'
                )}>
                <X className="size-3" aria-hidden="true" />
              </button>
            </m.div>
          )
        })}
      </AnimatePresence>
      {ordered.length > MAX_VISIBLE && (
        <button
          type="button"
          onClick={() => setExpanded((value) => !value)}
          className="h-9 cursor-pointer rounded-full border border-border bg-popover px-3 text-xs text-muted-foreground shadow-md">
          {expanded ? text.showLess : text.more.replace('{n}', String(ordered.length - MAX_VISIBLE))}
        </button>
      )}
    </div>
  )
}
