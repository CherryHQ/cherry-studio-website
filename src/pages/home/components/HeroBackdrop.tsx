import LeafShadows from '@/components/website/LeafShadows'
import { cn } from '@/lib/utils'

// Sunlit colour panel behind the hero: drifting colour fields, leaf shadows and a few glints of light. The panel's
// palette is exposed as --hero-* variables so the hero copy on top can use the matching ink.
export const HERO_PALETTE =
  '[--hero-base:#f47fa5] [--hero-a:#ff6f9a] [--hero-b:#ffa3c0] [--hero-c:#ff9f8a] [--hero-ink:#ffffff] [--hero-leaf:rgb(150_18_70/0.32)] dark:[--hero-base:#3a0f22] dark:[--hero-a:#7a1d45] dark:[--hero-b:#5a1840] dark:[--hero-c:#7a2e2a] dark:[--hero-leaf:rgb(0_0_0/0.5)]'

const FIELDS = [
  { className: 'top-[-30%] left-[-15%] size-[70vw] bg-(--hero-a)', delay: '0s' },
  { className: 'top-[10%] right-[-20%] size-[65vw] bg-(--hero-b)', delay: '-7s' },
  { className: 'bottom-[-35%] left-[20%] size-[60vw] bg-(--hero-c)', delay: '-14s' }
]
const GLINTS = [
  { className: 'top-[14%] left-[18%] h-24 w-40', delay: '0s' },
  { className: 'top-[30%] right-[14%] h-32 w-52', delay: '-2.5s' },
  { className: 'top-[52%] left-[8%] h-20 w-32', delay: '-4.5s' }
]

export default function HeroBackdrop({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn('pointer-events-none absolute overflow-hidden bg-(--hero-base)', className)}>
      {FIELDS.map((field) => (
        <span
          key={field.delay}
          className={cn(
            'absolute rounded-full opacity-90 blur-[90px] motion-safe:animate-drift dark:opacity-70',
            field.className
          )}
          style={{ animationDelay: field.delay }}
        />
      ))}
      <LeafShadows className="absolute inset-0 text-(--hero-leaf) mix-blend-multiply dark:mix-blend-normal" />
      {GLINTS.map((glint) => (
        <span
          key={glint.delay}
          className={cn(
            'absolute rounded-[50%] bg-white/35 blur-2xl motion-safe:animate-glint dark:bg-white/10',
            glint.className
          )}
          style={{ animationDelay: glint.delay }}
        />
      ))}
      {/* The page curves up over the bottom of the panel, echoing the download dock. */}
      <span className="absolute -inset-x-[6%] -bottom-px h-28 rounded-[50%_50%_0_0/100%_100%_0_0] bg-background sm:h-36" />
    </div>
  )
}
