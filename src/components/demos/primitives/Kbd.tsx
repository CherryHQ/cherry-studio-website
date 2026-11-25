import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

export default function Kbd({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <kbd
      className={cn(
        'inline-flex h-5 min-w-5 items-center justify-center rounded-[5px] border border-border bg-secondary px-1 font-mono text-[10px] font-medium text-muted-foreground shadow-[inset_0_-1px_0_var(--color-border)]',
        className
      )}>
      {children}
    </kbd>
  )
}
