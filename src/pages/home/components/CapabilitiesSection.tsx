import { AnimatePresence, m, useMotionValueEvent, useScroll, useSpring } from 'framer-motion'
import { Check } from 'lucide-react'
import {
  type ComponentType,
  type CSSProperties,
  type ReactNode,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore
} from 'react'
import { useTranslation } from 'react-i18next'

import DemoMount from '@/components/demos/primitives/DemoMount'
import BlurInText from '@/components/website/BlurInText'
import { ease, reveal, spring } from '@/lib/motion'
import { cn } from '@/lib/utils'

type ChapterId = 'agents' | 'browser' | 'marketplace' | 'tasks' | 'knowledge' | 'create'

interface Step {
  chapter: ChapterId
  demos: { load: () => Promise<{ default: ComponentType }>; height: string }[]
}

// One step per screen: chapters with two large demos get one screen per demo.
const steps: Step[] = [
  {
    chapter: 'agents',
    demos: [{ load: () => import('@/components/demos/agents/AgentRunDemo'), height: 'min-h-[680px]' }]
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
  },
  {
    chapter: 'create',
    demos: [{ load: () => import('@/components/demos/create/ArtifactsDemo'), height: 'min-h-[540px]' }]
  }
]
const chapterIds = [...new Set(steps.map((step) => step.chapter))]
// Caption under each chromeless demo frame, and the tallest a filled frame body may grow.
const FRAME_CHROME = 40
const FILL_MAX = 760
const WINDOW_RATIO = 10 / 16

function useMinWidth(query: string) {
  return useSyncExternalStore(
    (notify) => {
      const list = window.matchMedia(query)
      list.addEventListener('change', notify)
      return () => list.removeEventListener('change', notify)
    },
    () => window.matchMedia(query).matches,
    () => false
  )
}

/**
 * Centers its content in the available box, lets demo frames grow into the free height (`--demo-fill-h`),
 * and scales everything down when it still would not fit.
 */
function FitToBox({ children, frames = 1 }: { children: ReactNode; frames?: number }) {
  const outer = useRef<HTMLDivElement>(null)
  const inner = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)
  const [fill, setFill] = useState(0)

  useEffect(() => {
    const box = outer.current
    const content = inner.current
    if (!box || !content) return
    // offsetHeight ignores transforms; the threshold stops width-driven reflow from oscillating.
    const update = () => {
      // Never taller than a 16:10 desktop window, so a tall viewport does not turn the demo square.
      const free = (box.clientHeight - frames * FRAME_CHROME - (frames - 1) * 16) / frames
      setFill(Math.min(FILL_MAX, free, box.clientWidth * WINDOW_RATIO))
      const next = Math.min(1, box.clientHeight / Math.max(1, content.offsetHeight))
      setScale((current) => (Math.abs(current - next) < 0.015 ? current : next))
    }
    const observer = new ResizeObserver(update)
    observer.observe(box)
    observer.observe(content)
    update()
    return () => observer.disconnect()
  }, [frames])

  return (
    <div ref={outer} className="relative min-h-0 flex-1">
      <div
        ref={inner}
        data-fill=""
        className="absolute top-1/2 left-1/2"
        style={
          {
            width: `${100 / scale}%`,
            transform: `translate(-50%, -50%) scale(${scale})`,
            '--demo-fill-h': `${Math.max(0, fill)}px`
          } as CSSProperties
        }>
        {children}
      </div>
    </div>
  )
}

function ChapterText({ chapter, compact }: { chapter: ChapterId; compact?: boolean }) {
  const { t } = useTranslation()
  const points = t(`home_page.capabilities.chapters.${chapter}.points`, { returnObjects: true }) as string[]

  return (
    <div className="max-w-3xl">
      <p className="text-sm text-muted-foreground">
        0{chapterIds.indexOf(chapter) + 1} · {t(`home_page.capabilities.chapters.${chapter}.nav`)}
      </p>
      <h3
        className={cn(
          'font-display mt-2 text-3xl text-balance sm:text-4xl',
          compact && 'xl:text-[2.75rem] xl:leading-[1.05]'
        )}>
        {t(`home_page.capabilities.chapters.${chapter}.title`)}
      </h3>
      <p className={cn('mt-3 text-pretty text-muted-foreground zh:leading-[1.8]', compact && 'line-clamp-4')}>
        {t(`home_page.capabilities.chapters.${chapter}.description`)}
      </p>
      <ul
        className={cn(
          'mt-4 flex flex-wrap gap-x-6 gap-y-1.5 text-sm',
          compact && 'flex-col [@media(max-height:760px)]:hidden'
        )}>
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

function StepDemos({ step, stacked }: { step: Step; stacked?: boolean }) {
  return (
    <div className={cn('grid gap-4', step.demos.length > 1 && !stacked && 'md:grid-cols-2')}>
      {step.demos.map((demo, index) => (
        <DemoMount key={index} load={demo.load} className={demo.height} />
      ))}
    </div>
  )
}

/** Desktop: the section pins to one screen and scrolling swaps steps in place. */
function PinnedStory() {
  const { t } = useTranslation()
  const track = useRef<HTMLDivElement>(null)
  const [index, setIndex] = useState(0)
  const { scrollYProgress } = useScroll({ target: track, offset: ['start start', 'end end'] })
  const progress = useSpring(scrollYProgress, { stiffness: 220, damping: 40, mass: 0.6 })
  const step = steps[index]

  // Steps stay mounted once shown, so scrolling back and forth never remounts a demo or restarts its script.
  const [visited, setVisited] = useState<number[]>([0])

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    const next = Math.min(steps.length - 1, Math.max(0, Math.floor(value * steps.length)))
    setIndex(next)
    setVisited((current) => (current.includes(next) ? current : [...current, next]))
  })

  // Warm the next demo's chunk so the swap does not wait on the network.
  useEffect(() => {
    for (const demo of steps[index + 1]?.demos ?? []) void demo.load()
  }, [index])

  const goTo = (target: number) => {
    const element = track.current
    if (!element) return
    const top = element.getBoundingClientRect().top + window.scrollY
    const span = element.offsetHeight - window.innerHeight
    window.scrollTo({ top: top + span * ((target + 0.5) / steps.length) })
  }

  return (
    <div ref={track} data-dock-hide="" className="relative" style={{ height: `${steps.length * 100}svh` }}>
      <div className="site-container sticky top-(--site-header-height) grid h-[calc(100svh-var(--site-header-height))] grid-cols-[minmax(240px,290px)_minmax(0,1fr)] gap-10 xl:grid-cols-[minmax(260px,340px)_minmax(0,1fr)] xl:gap-16">
        <div className="flex min-h-0 flex-col justify-center gap-10 py-8">
          <nav aria-label={t('home_page.capabilities.eyebrow')}>
            <div className="relative pl-5">
              <span className="absolute inset-y-1 left-0 w-px bg-border" aria-hidden="true" />
              <m.span
                className="absolute inset-y-1 left-0 w-px origin-top bg-primary"
                style={{ scaleY: progress }}
                aria-hidden="true"
              />
              <ol className="space-y-0.5">
                {chapterIds.map((chapter, chapterIndex) => (
                  <li key={chapter}>
                    <button
                      type="button"
                      onClick={() => goTo(steps.findIndex((item) => item.chapter === chapter))}
                      aria-current={step.chapter === chapter ? 'step' : undefined}
                      className={cn(
                        'relative flex w-full cursor-pointer items-center gap-3 rounded-md px-2 py-1.5 text-left text-sm transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-primary',
                        step.chapter === chapter ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                      )}>
                      {step.chapter === chapter && (
                        <m.span
                          layoutId="capability-nav-active"
                          transition={spring.settle}
                          className="absolute inset-0 -z-10 rounded-md bg-accent"
                          aria-hidden="true"
                        />
                      )}
                      <span className="font-mono text-[11px] text-muted-foreground">0{chapterIndex + 1}</span>
                      {t(`home_page.capabilities.chapters.${chapter}.nav`)}
                    </button>
                  </li>
                ))}
              </ol>
            </div>
          </nav>
          <AnimatePresence mode="wait" initial={false}>
            <m.div
              key={step.chapter}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2, ease: ease.settle }}>
              <ChapterText chapter={step.chapter} compact />
            </m.div>
          </AnimatePresence>
        </div>

        <div className="grid min-h-0 py-8">
          {visited.map((stepIndex) => (
            <div
              key={stepIndex}
              hidden={stepIndex !== index}
              className="col-start-1 row-start-1 flex min-h-0 flex-col motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-3 motion-safe:duration-300 motion-safe:ease-out">
              <FitToBox frames={steps[stepIndex].demos.length}>
                <StepDemos step={steps[stepIndex]} stacked />
              </FitToBox>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/** Small screens: plain scrolling, but every step still gets a screen of its own. */
function StackedStory() {
  return (
    <div className="site-container">
      {steps.map((step, index) => (
        <article
          key={index}
          className="flex min-h-[calc(100svh-var(--site-header-height))] flex-col justify-center gap-8 py-12">
          {steps[index - 1]?.chapter !== step.chapter && <ChapterText chapter={step.chapter} />}
          <StepDemos step={step} />
        </article>
      ))}
    </div>
  )
}

export default function CapabilitiesSection() {
  const { t } = useTranslation()
  const pinned = useMinWidth('(min-width: 1024px)')

  return (
    <section
      id="home-capabilities"
      className="relative isolate overflow-x-clip pt-20 sm:pt-28"
      aria-labelledby="home-capabilities-title">
      <m.div {...reveal()} className="site-container mx-auto mb-4 max-w-3xl text-center">
        <p className="mb-3 text-sm font-medium text-muted-foreground">{t('home_page.capabilities.eyebrow')}</p>
        <h2 id="home-capabilities-title" className="text-4xl font-display text-balance sm:text-6xl">
          <BlurInText text={t('home_page.capabilities.title')} />
        </h2>
        <p className="mt-5 text-pretty text-muted-foreground sm:text-lg">{t('home_page.capabilities.subtitle')}</p>
      </m.div>
      {pinned ? <PinnedStory /> : <StackedStory />}
    </section>
  )
}
