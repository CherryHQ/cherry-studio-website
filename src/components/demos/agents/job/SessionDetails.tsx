import {
  Bot,
  ChevronDown,
  ChevronRight,
  Circle,
  CircleCheck,
  EllipsisVertical,
  FolderOpen,
  Gauge,
  ListChecks,
  LoaderCircle,
  Package
} from 'lucide-react'
import { type ReactNode, useId, useState } from 'react'

import { type AgentJobCopy, agentJobScript, type JobStatus } from '@/content/demos/agentJob'
import { cn } from '@/lib/utils'

const FOCUS = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
// The app's success / info status tokens.
const TONE: Record<JobStatus, string> = {
  completed: 'text-green-600 dark:text-green-400',
  running: 'text-blue-500 dark:text-blue-400',
  pending: 'text-muted-foreground'
}
const MAX_CONTEXT = 200_000

/** AgentSessionDetailsSections TaskStatusIcon. */
export function TaskStatusIcon({ status, label }: { status: JobStatus; label: string }) {
  const Icon = status === 'completed' ? CircleCheck : status === 'running' ? LoaderCircle : Circle
  return (
    <span
      role="img"
      aria-label={label}
      className={cn('flex size-5 shrink-0 items-center justify-center', TONE[status])}>
      <Icon className={cn('size-3.5', status === 'running' && 'motion-safe:animate-spin')} />
    </span>
  )
}

/** contextUsageColor.ts: green to amber over the first half, amber to red over the second. */
export function contextColor(percent: number) {
  const amber = 'oklch(0.83 0.164 84)'
  if (percent <= 50) return `color-mix(in oklch, oklch(0.723 0.219 149.6) ${100 - percent * 2}%, ${amber})`
  return `color-mix(in oklch, ${amber} ${100 - (percent - 50) * 2}%, oklch(0.637 0.237 25.3))`
}

const compact = (tokens: number) => tokens.toLocaleString('en-US', { notation: 'compact', maximumFractionDigits: 1 })

/** DetailsSection: an accordion row with its icon, title and a right-aligned summary. */
function Section({
  icon,
  title,
  summary,
  subtitle,
  defaultOpen = false,
  nested = false,
  children
}: {
  icon?: ReactNode
  title: string
  summary: ReactNode
  subtitle?: string
  defaultOpen?: boolean
  nested?: boolean
  children: ReactNode
}) {
  const [open, setOpen] = useState(defaultOpen)
  const id = useId()
  return (
    <div className={cn('border-b border-border last:border-0', !nested && 'mx-3')}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((value) => !value)}
        className={cn(
          'flex w-full cursor-pointer items-start gap-2 rounded-md py-2.5 text-left text-xs font-medium',
          FOCUS
        )}>
        <span className="min-w-0 flex-1">
          <span className="flex min-w-0 items-center gap-2 text-muted-foreground [&>svg]:size-3.5 [&>svg]:shrink-0">
            {icon}
            <span className="shrink-0">{title}</span>
            <span className="ms-auto text-right font-normal tabular-nums">{summary}</span>
          </span>
          {subtitle && (
            <span title={subtitle} className="mt-1 block truncate ps-5.5 font-normal text-muted-foreground">
              {subtitle}
            </span>
          )}
        </span>
        <ChevronDown
          aria-hidden="true"
          className={cn('mt-px size-3.5 shrink-0 text-muted-foreground transition-transform', open && 'rotate-180')}
        />
      </button>
      {open && (
        <div id={id} className="pb-3">
          {children}
        </div>
      )}
    </div>
  )
}

interface SessionDetailsProps {
  copy: AgentJobCopy
  todos: JobStatus[]
  subagents: JobStatus[]
  steps: number[]
  outputs: boolean
  context: number
  onOpenFlow: (index: number) => void
}

/** AgentSessionDetailsSections in their default order: workspace, plan, sub-agents, outputs and context. */
export function SessionDetails({ copy, todos, subagents, steps, outputs, context, onOpenFlow }: SessionDetailsProps) {
  const [contextOpen, setContextOpen] = useState(false)
  const { details, status } = copy
  const done = todos.filter((item) => item === 'completed').length
  const current = todos.indexOf('running')
  const live = subagents.map((item, index) => ({ item, index })).filter(({ item }) => item !== 'completed')
  const finished = subagents.map((item, index) => ({ item, index })).filter(({ item }) => item === 'completed')
  const running = subagents.filter((item) => item === 'running').length
  const used = Math.round((context / 100) * MAX_CONTEXT)

  const rows = (list: { item: JobStatus; index: number }[]) => (
    <div className="space-y-1.5">
      {list.map(({ item, index }) => {
        const meta = agentJobScript.subagents[index]
        const step = copy.subagents[index].steps[Math.max(0, steps[index] - 1)]
        return (
          <button
            key={index}
            type="button"
            onClick={() => onOpenFlow(index)}
            className={cn(
              'flex w-full cursor-pointer items-start gap-2 rounded-sm p-1 text-left transition-colors hover:bg-accent',
              FOCUS
            )}>
            <TaskStatusIcon status={item} label={status[item]} />
            <span className="min-w-0 flex-1">
              <span className="line-clamp-2 text-xs leading-5 text-foreground">
                {item === 'running' ? step.text : copy.subagents[index].title}
              </span>
              <span className="mt-0.5 block truncate text-xs text-muted-foreground">
                {item === 'completed' ? `${meta.type} · ${meta.tokens} · ${meta.seconds}s` : meta.type}
              </span>
            </span>
          </button>
        )
      })}
    </div>
  )

  return (
    <div className="py-1">
      <div className="flex items-center justify-between gap-2 py-1 ps-3 pe-2">
        <span className="text-xs font-medium text-muted-foreground">{details.title}</span>
        <span
          aria-hidden="true"
          title={details.customize}
          className="flex size-7 items-center justify-center text-muted-foreground">
          <EllipsisVertical className="size-3.5" />
        </span>
      </div>
      <div className="flex min-w-0 items-center gap-2 px-3 py-2" title={details.workspace}>
        <FolderOpen className="size-3.5 shrink-0 text-muted-foreground" strokeWidth={1.5} aria-hidden="true" />
        <span className="min-w-0 flex-1 truncate text-xs font-medium">{agentJobScript.workspace}</span>
        <ChevronRight className="size-3.5 shrink-0 text-muted-foreground" aria-hidden="true" />
      </div>
      <div className="border-t border-border">
        {todos.length > 0 && (
          <Section
            icon={<ListChecks strokeWidth={1.5} />}
            title={details.plan}
            summary={copy.taskCount.replace('{completed}', String(done)).replace('{total}', String(todos.length))}
            subtitle={current >= 0 ? copy.todos[current] : undefined}>
            <ol className="space-y-1">
              {todos.map((item, index) => (
                <li key={copy.todos[index]} className="flex gap-2 text-xs">
                  <TaskStatusIcon status={item} label={status[item]} />
                  <span className="pt-0.5">{copy.todos[index]}</span>
                </li>
              ))}
            </ol>
          </Section>
        )}
        {subagents.length > 0 && (
          <Section
            icon={<Bot strokeWidth={1.5} />}
            title={details.subagents}
            summary={running > 0 ? `${running} ${status.running}` : String(subagents.length)}
            defaultOpen>
            {rows(live)}
            {finished.length > 0 && (
              <Section nested title={details.finished} summary={finished.length}>
                {rows(finished)}
              </Section>
            )}
          </Section>
        )}
        {outputs && (
          <Section icon={<Package strokeWidth={1.5} />} title={details.outputs} summary={agentJobScript.outputs.length}>
            <ul>
              {agentJobScript.outputs.map((path) => (
                <li key={path} className="truncate rounded-md px-2 py-1.5 text-xs" title={path}>
                  {path.split('/').pop()}
                </li>
              ))}
            </ul>
          </Section>
        )}
      </div>
      <div className="border-t border-border px-3 py-2">
        <button
          type="button"
          aria-expanded={contextOpen}
          onClick={() => setContextOpen((value) => !value)}
          className={cn(
            'flex w-full cursor-pointer items-center gap-2 rounded-md py-1 text-xs font-medium text-muted-foreground',
            FOCUS
          )}>
          <Gauge className="size-3.5 shrink-0" strokeWidth={1.5} aria-hidden="true" />
          <span>{details.context}</span>
          {!contextOpen && (
            <span className="ms-auto flex items-center gap-2 font-normal tabular-nums">
              {context}%
              <span
                aria-hidden="true"
                className="relative inline-grid size-4 place-items-center rounded-full transition-[background] duration-500"
                style={{ background: `conic-gradient(${contextColor(context)} ${context}%, var(--border) 0)` }}>
                <span className="absolute inset-[2px] rounded-full bg-card" />
              </span>
            </span>
          )}
          <ChevronRight
            aria-hidden="true"
            className={cn('size-3.5 shrink-0 transition-transform', contextOpen && 'ms-auto rotate-90')}
          />
        </button>
        {contextOpen && (
          <div className="space-y-2 pt-2 text-xs">
            <div className="flex items-center justify-between gap-2 tabular-nums">
              <span>{details.contextUsed.replace('{percent}', String(context))}</span>
              <span className="text-muted-foreground">
                {compact(used)} / {compact(MAX_CONTEXT)}
              </span>
            </div>
            <div className="flex h-1.5 w-full overflow-hidden rounded-full bg-muted">
              <div className="h-full rounded-full bg-blue-500" style={{ width: `${context}%` }} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
