import { ArrowRight, BookOpen, Bot, Boxes, MessageSquare, PanelsTopLeft } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { cn } from '@/lib/utils'

const workflows = [
  { id: 'agent', icon: Bot },
  { id: 'chat', icon: MessageSquare },
  { id: 'knowledge', icon: BookOpen }
] as const

export default function WorkspacePanel() {
  const { t } = useTranslation()
  const [workflow, setWorkflow] = useState<(typeof workflows)[number]>(workflows[0])
  const label = t(`home_page.preview_${workflow.id}`)
  const Icon = workflow.icon

  return (
    <section
      aria-label={t('home_page.workspace_panel')}
      className="relative min-w-0 rounded-md border border-border bg-card">
      <div className="flex items-center justify-between gap-2 border-b border-border px-4 py-3 font-mono text-xs text-muted-foreground">
        <span className="flex items-center gap-2 text-foreground">
          <PanelsTopLeft className="size-4 text-primary" aria-hidden="true" />
          Cherry Studio
        </span>
        <span className="tracking-wider uppercase">{t('home_page.workspace_panel')}</span>
      </div>

      <div className="px-4 pt-4 sm:px-6 sm:pt-6">
        <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-1.5 sm:gap-2" aria-live="polite">
          <div className="flex min-h-16 flex-col items-center justify-center gap-2 rounded-md border border-border bg-background px-1 py-2 text-center font-mono text-xs text-muted-foreground">
            <Boxes className="size-4 text-muted-foreground" aria-hidden="true" />
            {t('home_page.workflow_models')}
          </div>
          <ArrowRight className="size-3.5 text-muted-foreground" aria-hidden="true" />
          <div className="flex min-h-16 flex-col items-center justify-center gap-2 rounded-md border border-primary/50 bg-primary/10 px-1 py-2 text-center font-mono text-xs text-primary">
            <Icon className="size-4" aria-hidden="true" />
            {label}
          </div>
          <ArrowRight className="size-3.5 text-primary" aria-hidden="true" />
          <div className="flex min-h-16 items-center justify-center rounded-md border border-border bg-background px-1 py-2 text-center font-mono text-xs text-muted-foreground">
            {t(`home_page.workflow_${workflow.id}_output`)}
          </div>
        </div>
        <p aria-live="polite" className="mt-3 min-h-10 text-pretty text-sm text-muted-foreground">
          {t(`home_page.workflow_${workflow.id}_detail`)}
        </p>
      </div>

      <div
        className="mt-3 grid divide-y divide-border border-t border-border"
        role="group"
        aria-label={t('home_page.workspace_panel')}>
        {workflows.map((item) => (
          <button
            key={item.id}
            type="button"
            aria-pressed={workflow.id === item.id}
            onClick={() => setWorkflow(item)}
            className={cn(
              'flex cursor-pointer items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors duration-300 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary sm:px-6',
              workflow.id === item.id
                ? 'bg-primary/8 text-primary'
                : 'text-muted-foreground hover:bg-accent hover:text-foreground'
            )}>
            <item.icon aria-hidden="true" className="size-4 shrink-0" />
            {t(`home_page.preview_${item.id}`)}
            <ArrowRight aria-hidden="true" className="ml-auto size-3.5" />
          </button>
        ))}
      </div>
    </section>
  )
}
