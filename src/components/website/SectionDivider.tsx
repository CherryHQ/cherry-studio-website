import type { FC } from 'react'

import { cn } from '@/lib/utils'

interface SectionDividerProps {
  className?: string
}

const SectionDivider: FC<SectionDividerProps> = ({ className }) => {
  return (
    <div className={cn('flex items-center justify-center py-8', className)}>
      <div className="relative h-px w-full max-w-4xl">
        {/* 主线条 - 两边渐变淡出 */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-border to-transparent" />
        {/* 中间发光效果 */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/30 to-transparent blur-sm" />
      </div>
    </div>
  )
}

export default SectionDivider
