import { cn } from '@/lib/utils'

/** Mobile message-part-pending beat: an 875ms loop with the middle dot half a beat behind. */
export default function BeatDots({ className }: { className?: string }) {
  return (
    <span aria-hidden="true" className={cn('inline-flex items-center gap-[3px]', className)}>
      {[0, 437.5, 0].map((delay, index) => (
        <span
          key={index}
          className="size-1 rounded-full bg-current motion-safe:animate-beat"
          style={{ animationDelay: `${delay}ms` }}
        />
      ))}
    </span>
  )
}
