import { cn } from '@/lib/utils'

const treatments = {
  grid: 'w-[62%] bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] [background-size:36px_36px] [mask-image:radial-gradient(ellipse_at_85%_20%,black_10%,transparent_72%)]',
  dots: 'w-[64%] bg-[radial-gradient(circle_at_center,var(--input)_1px,transparent_1.5px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_at_84%_50%,black_5%,transparent_65%)]',
  arcs: 'w-[56%] bg-[repeating-radial-gradient(circle_at_94%_14%,transparent_0_41px,var(--border)_41px_42px)] [mask-image:radial-gradient(ellipse_at_95%_8%,black_3%,transparent_70%)]',
  rules:
    'right-auto left-0 w-[45%] bg-[repeating-linear-gradient(to_bottom,transparent_0_13px,var(--border)_13px_14px)] [mask-image:radial-gradient(ellipse_at_0%_86%,black_3%,transparent_59%)]'
} as const

export default function SectionBackdrop({ variant }: { variant: keyof typeof treatments | 'modules' }) {
  if (variant === 'modules') {
    return (
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden [mask-image:radial-gradient(ellipse_at_94%_0%,black_4%,transparent_55%)]">
        <div className="absolute top-0 right-0 grid w-[min(78%,720px)] grid-cols-12 gap-1.5">
          {Array.from({ length: 96 }, (_, index) => (
            <span
              key={index}
              className={cn('h-4 rounded-xs', index % 7 !== 0 && (index % 5 === 0 ? 'bg-border/65' : 'bg-border/35'))}
            />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div
      aria-hidden="true"
      className={cn('pointer-events-none absolute inset-y-0 right-0 -z-10 opacity-75', treatments[variant])}
    />
  )
}
