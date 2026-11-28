import { AnimatePresence, animate, m, useReducedMotion } from 'framer-motion'
import { Check } from 'lucide-react'
import { type ComponentType, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import DemoMount from '@/components/demos/primitives/DemoMount'
import BlurInText from '@/components/website/BlurInText'
import { ease, reveal } from '@/lib/motion'
import { cn } from '@/lib/utils'

type ChapterId = 'agents' | 'browser' | 'marketplace' | 'tasks' | 'knowledge' | 'create'

interface Step {
  chapter: ChapterId
  demos: { load: () => Promise<{ default: ComponentType }>; height: string }[]
}

// Demos in story order; a chapter shows every demo listed under it.
const steps: Step[] = [
  {
    chapter: 'agents',
    demos: [{ load: () => import('@/components/demos/agents/AgentJobDemo'), height: 'min-h-[610px]' }]
  },
  {
    chapter: 'browser',
    demos: [{ load: () => import('@/components/demos/browser/BrowserAgentDemo'), height: 'min-h-[610px]' }]
  },
  {
    chapter: 'marketplace',
    demos: [{ load: () => import('@/components/demos/marketplace/MarketplaceDemo'), height: 'min-h-[610px]' }]
  },
  {
    chapter: 'tasks',
    demos: [{ load: () => import('@/components/demos/tasks/ScheduledTasksDemo'), height: 'min-h-[610px]' }]
  },
  {
    chapter: 'knowledge',
    demos: [{ load: () => import('@/components/demos/knowledge/KnowledgeWikiDemo'), height: 'min-h-[610px]' }]
  },
  {
    chapter: 'create',
    demos: [{ load: () => import('@/components/demos/create/PaintingsDemo'), height: 'min-h-[540px]' }]
  }
]
const chapterIds = [...new Set(steps.map((step) => step.chapter))]

function ChapterText({ chapter }: { chapter: ChapterId }) {
  const { t } = useTranslation()
  const points = t(`home_page.capabilities.chapters.${chapter}.points`, { returnObjects: true }) as string[]
  return (
    <div>
      <h3 className="text-3xl font-display text-balance sm:text-4xl">
        {t(`home_page.capabilities.chapters.${chapter}.title`)}
      </h3>
      <p className="mt-3 text-pretty text-muted-foreground zh:leading-[1.8]">
        {t(`home_page.capabilities.chapters.${chapter}.description`)}
      </p>
      <ul className="mt-4 flex flex-col gap-1.5 text-sm">
        {points.map((point) => (
          <li key={point} className="flex gap-2 text-foreground/85">
            <Check className="mt-0.5 size-3.5 shrink-0 text-primary" aria-hidden="true" />
            {point}
          </li>
        ))}
      </ul>
    </div>
  )
}

/**
 * Chapter list on the left stays in view and follows the reader; the demos on the right scroll past one after
 * another, each at a desktop-window proportion.
 */
export default function CapabilitiesSection() {
  const { t } = useTranslation()
  const [active, setActive] = useState<ChapterId>(chapterIds[0])
  const reduced = useReducedMotion() ?? false
  const articles = useRef<Partial<Record<ChapterId, HTMLElement | null>>>({})
  const stack = useRef<HTMLDivElement>(null)

  // Puts a chapter's demo in the middle of the screen, level with the copy beside it. A demo that mounts on the
  // way can change height, so the target is measured again on arrival and corrected.
  const centre = (chapter: ChapterId, attempt = 0) => {
    const element = articles.current[chapter]?.querySelector('[data-fill]')
    if (!element) return
    const rect = element.getBoundingClientRect()
    const header = Number.parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue('--site-header-height')
    )
    const offset = rect.top + rect.height / 2 - (header + (window.innerHeight - header) / 2)
    if (Math.abs(offset) < 4 || attempt > 2) return
    const target = window.scrollY + offset
    // Stepped by hand: demos measuring height: auto restore the scroll position, which cancels a native smooth scroll.
    if (reduced) window.scrollTo(0, target)
    else
      animate(window.scrollY, target, {
        duration: attempt ? 0.3 : 0.7,
        ease: ease.settle,
        onUpdate: (y) => window.scrollTo(0, y),
        onComplete: () => requestAnimationFrame(() => centre(chapter, attempt + 1))
      })
  }

  useEffect(() => {
    // The chapter crossing the middle band of the screen is the current one.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive((entry.target as HTMLElement).dataset.chapter as ChapterId)
        }
      },
      { rootMargin: '-45% 0px -45% 0px' }
    )
    for (const element of Object.values(articles.current)) if (element) observer.observe(element)
    // Between the first and last demo, scrolling always comes to rest on one of them, centred. Snapping switches on
    // and off only where a demo is already centred, so it never jumps, and past either end the page scrolls freely.
    const root = document.documentElement
    const desktop = window.matchMedia('(min-width: 1024px)')
    let frame = 0
    const sync = () => {
      frame = 0
      const demos = stack.current?.querySelectorAll('[data-snap]')
      const header = Number.parseFloat(getComputedStyle(root).getPropertyValue('--site-header-height'))
      const middle = header + (window.innerHeight - header) / 2
      const centre = (element?: Element) => {
        const rect = element?.getBoundingClientRect()
        return rect ? rect.top + rect.height / 2 : Number.NaN
      }
      const inside =
        desktop.matches &&
        !!demos?.length &&
        centre(demos[0]) <= middle + 2 &&
        centre(demos[demos.length - 1]) >= middle - 2
      root.classList.toggle('snap-y', inside)
      root.classList.toggle('snap-mandatory', inside)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(sync)
    }
    sync()
    window.addEventListener('scroll', onScroll, { passive: true })
    desktop.addEventListener('change', sync)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      desktop.removeEventListener('change', sync)
      root.classList.remove('snap-y', 'snap-mandatory')
    }
  }, [])

  return (
    <section
      id="home-capabilities"
      data-dock-hide=""
      className="relative isolate overflow-x-clip pt-20 sm:pt-28"
      aria-labelledby="home-capabilities-title">
      <m.div {...reveal()} className="site-container mx-auto mb-10 max-w-3xl text-center">
        <p className="mb-3 text-sm font-medium text-muted-foreground">{t('home_page.capabilities.eyebrow')}</p>
        <h2 id="home-capabilities-title" className="text-4xl font-display text-balance sm:text-6xl">
          <BlurInText text={t('home_page.capabilities.title')} />
        </h2>
        <p className="mt-5 text-pretty text-muted-foreground sm:text-lg">{t('home_page.capabilities.subtitle')}</p>
      </m.div>

      <div className="site-container grid gap-12 lg:grid-cols-[minmax(240px,300px)_minmax(0,1fr)] xl:gap-16 2xl:max-w-[min(110rem,94vw)] 2xl:grid-cols-[minmax(280px,340px)_minmax(0,1fr)]">
        <aside className="hidden lg:block">
          <div className="sticky top-(--site-header-height) flex h-[calc(100svh-var(--site-header-height))] flex-col justify-center gap-10 py-8">
            <nav aria-label={t('home_page.capabilities.eyebrow')}>
              <ol className="relative space-y-0.5 border-l border-border pl-4">
                {chapterIds.map((chapter, index) => (
                  <li key={chapter}>
                    <a
                      href={`#capability-${chapter}`}
                      onClick={(event) => {
                        event.preventDefault()
                        centre(chapter)
                      }}
                      aria-current={active === chapter ? 'step' : undefined}
                      // Plain CSS states: a shared-layout animation here would reset the page scroll mid-glide.
                      className={cn(
                        'relative flex items-center gap-3 rounded-md px-2 py-1.5 text-sm transition-colors duration-200 before:absolute before:inset-y-1 before:-left-[17px] before:w-px before:transition-colors focus-visible:outline-2 focus-visible:outline-primary',
                        active === chapter
                          ? 'bg-accent text-foreground before:bg-foreground'
                          : 'text-muted-foreground before:bg-transparent hover:text-foreground'
                      )}>
                      <span className="font-mono text-[11px] text-muted-foreground">0{index + 1}</span>
                      {t(`home_page.capabilities.chapters.${chapter}.nav`)}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
            <AnimatePresence mode="wait" initial={false}>
              <m.div
                key={active}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2, ease: ease.settle }}>
                <ChapterText chapter={active} />
              </m.div>
            </AnimatePresence>
          </div>
        </aside>

        <div ref={stack}>
          {chapterIds.map((chapter) => (
            <article
              key={chapter}
              id={`capability-${chapter}`}
              data-chapter={chapter}
              ref={(element) => {
                articles.current[chapter] = element
              }}
              className="pb-16 sm:pb-20 lg:flex lg:min-h-[calc(100svh-var(--site-header-height))] lg:flex-col lg:justify-center lg:py-12">
              <div className="mb-8 lg:hidden">
                <ChapterText chapter={chapter} />
              </div>
              {/* Frames grow toward a 16:10 window and use most of the screen height, so large screens get a large
                  window rather than empty margins. */}
              <div
                data-fill=""
                className="@container grid gap-10 [--demo-fill-h:min(calc(100svh-var(--site-header-height)-9rem),64cqw)]">
                {steps
                  .filter((step) => step.chapter === chapter)
                  .flatMap((step) => step.demos)
                  .map((demo, index) => (
                    <div key={index} data-snap="" className="lg:snap-center">
                      <DemoMount load={demo.load} className={demo.height} />
                    </div>
                  ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
