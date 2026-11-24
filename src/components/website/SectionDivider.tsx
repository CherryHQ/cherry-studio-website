import type { FC } from 'react'

import { cn } from '@/lib/utils'

interface SectionDividerProps {
  className?: string
}

const SectionDivider: FC<SectionDividerProps> = ({ className }) => {
  return (
    <div aria-hidden="true" className={cn('site-container py-2', className)}>
      <div className="h-px bg-border" />
    </div>
  )
}

export default SectionDivider
