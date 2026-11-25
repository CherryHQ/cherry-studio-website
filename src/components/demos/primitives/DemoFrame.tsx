import { RotateCcw } from 'lucide-react'
import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

import { cn } from '@/lib/utils'

interface DemoFrameProps {
  title: string
  children: ReactNode
  className?: string
  bodyClassName?: string
  toolbar?: ReactNode
  onReplay?: () => void
  /** Hide the "simulated" caption when a section already explains the demo. */
  bare?: boolean
}

/** Desktop window chrome around an interactive product demo. */
export default function DemoFrame({
  title,
  children,
  className,
  bodyClassName,
  toolbar,
  onReplay,
  bare
}: DemoFrameProps) {
  const { t } = useTranslation()

  return (
    <figure className={cn('min-w-0', className)}>
      <div className="glass-card overflow-hidden rounded-xl">
        <div className="flex h-10 items-center gap-3 border-b border-border px-3.5">
          <span className="flex gap-1.5" aria-hidden="true">
            <span className="size-2.5 rounded-full bg-[#ff5f57]/80" />
            <span className="size-2.5 rounded-full bg-[#febc2e]/80" />
            <span className="size-2.5 rounded-full bg-[#28c840]/80" />
          </span>
          <span className="min-w-0 flex-1 truncate text-center font-mono text-[11px] text-muted-foreground">
            {title}
          </span>
          <span className="flex min-w-[42px] items-center justify-end gap-1">{toolbar}</span>
        </div>
        <div className={cn('relative bg-card/60', bodyClassName)}>{children}</div>
      </div>
      {!bare && (
        <figcaption className="mt-2.5 flex items-center justify-between gap-3 px-1 font-mono text-[11px] text-muted-foreground">
          <span>{t('demos.simulated')}</span>
          {onReplay && (
            <button
              type="button"
              onClick={onReplay}
              className="inline-flex cursor-pointer items-center gap-1 rounded-sm hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
              <RotateCcw className="size-3" aria-hidden="true" />
              {t('demos.replay')}
            </button>
          )}
        </figcaption>
      )}
    </figure>
  )
}
