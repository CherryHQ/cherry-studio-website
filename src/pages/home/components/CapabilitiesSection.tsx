import { m, useInView, useScroll, useSpring } from 'framer-motion'
import { Check } from 'lucide-react'
import { type ComponentType, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import DemoMount from '@/components/demos/primitives/DemoMount'
import SectionBackdrop from '@/components/website/SectionBackdrop'
import { reveal, spring } from '@/lib/motion'
import { cn } from '@/lib/utils'

type DemoLoader = () => Promise<{ default: ComponentType }>

interface Chapter {
  id: 'chat' | 'compare' | 'agents' | 'knowledge' | 'create'
  /** Demos rendered in a bento grid; `wide` spans both columns. */
  demos: { load: DemoLoader; height: string; wide?: boolean }[]
}

const chapters: Chapter[] = [
  {
    id: 'chat',
    demos: [
      { load: () => import('@/components/demos/chat-tools/EffortSliderDemo'), height: 'min-h-[300px]' },
      { load: () => import('@/components/demos/chat-tools/AnchorRailDemo'), height: 'min-h-[300px]' }
    ]
  },
  {
    id: 'compare',
    demos: [{ load: () => import('@/components/demos/models/ModelCompareDemo'), height: 'min-h-[500px]', wide: true }]
  },
  {
    id: 'agents',
    demos: [{ load: () => import('@/components/demos/agents/AgentRunDemo'), height: 'min-h-[680px]', wide: true }]
  },
  {
    id: 'knowledge',
    demos: [
      { load: () => import('@/components/demos/knowledge/KnowledgeDemo'), height: 'min-h-[540px]', wide: true },
      { load: () => import('@/components/demos/knowledge/TranslateDemo'), height: 'min-h-[340px]', wide: true }
    ]
  },
  {
    id: 'create',
    demos: [
      { load: () => import('@/components/demos/create/PaintingsDemo'), height: 'min-h-[540px]', wide: true },
      { load: () => import('@/components/demos/create/ArtifactsDemo'), height: 'min-h-[540px]', wide: true }
    ]
  }
]

function ChapterBlock({ chapter, index, onActive }: { chapter: Chapter; index: number; onActive: () => void }) {
  const { t } = useTranslation()
  const ref = useRef<HTMLElement>(null)
  // The chapter crossing the middle band of the viewport drives the sticky navigation.
  const active = useInView(ref, { margin: '-45% 0px -45% 0px' })
  const points = t(`home_page.capabilities.chapters.${chapter.id}.points`, { returnObjects: true }) as string[]

  useEffect(() => {
    if (active) onActive()
  }, [active, onActive])

  return (
    <article ref={ref} id={`capability-${chapter.id}`} aria-labelledby={`capability-${chapter.id}-title`}>
      <m.div {...reveal()} className="max-w-2xl">
        <p className="font-mono text-xs text-muted-foreground">
          0{index + 1} · {t(`home_page.capabilities.chapters.${chapter.id}.nav`)}
        </p>
        <h3
          id={`capability-${chapter.id}-title`}
          className="mt-3 text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
          {t(`home_page.capabilities.chapters.${chapter.id}.title`)}
        </h3>
        <p className="mt-3 text-pretty text-muted-foreground zh:leading-[1.8]">
          {t(`home_page.capabilities.chapters.${chapter.id}.description`)}
        </p>
        <ul className="mt-5 grid gap-2 text-sm sm:grid-cols-3 sm:gap-4">
          {points.map((point) => (
            <li key={point} className="flex gap-2 text-foreground/85">
              <Check className="mt-0.5 size-3.5 shrink-0 text-primary" aria-hidden="true" />
              {point}
            </li>
          ))}
        </ul>
      </m.div>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {chapter.demos.map((demo, demoIndex) => (
          <DemoMount key={demoIndex} load={demo.load} className={cn(demo.height, demo.wide && 'md:col-span-2')} />
        ))}
      </div>
    </article>
  )
}

export default function CapabilitiesSection() {
  const { t } = useTranslation()
  const [activeId, setActiveId] = useState<Chapter['id']>('chat')
  const listRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 60%', 'end 60%'] })
  const progress = useSpring(scrollYProgress, { stiffness: 220, damping: 40, mass: 0.6 })

  return (
    <section
      id="home-capabilities"
      className="relative isolate overflow-x-clip py-20 sm:py-28"
      aria-labelledby="home-capabilities-title">
      <SectionBackdrop variant="glow" />
      <div className="site-container">
        <m.div {...reveal()} className="mx-auto mb-16 max-w-3xl text-center sm:mb-20">
          <p className="mb-3 font-mono text-xs tracking-wider text-primary uppercase">
            {t('home_page.capabilities.eyebrow')}
          </p>
          <h2
            id="home-capabilities-title"
            className="text-gradient text-3xl font-semibold tracking-tight text-balance sm:text-5xl">
            {t('home_page.capabilities.title')}
          </h2>
          <p className="mt-5 text-pretty text-muted-foreground sm:text-lg">{t('home_page.capabilities.subtitle')}</p>
        </m.div>

        <div className="lg:grid lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-14">
          <nav
            aria-label={t('home_page.capabilities.eyebrow')}
            className="sticky top-[calc(var(--site-header-height)+48px)] hidden self-start lg:block">
            <div className="relative pl-5">
              <span className="absolute inset-y-1 left-0 w-px bg-border" aria-hidden="true" />
              <m.span
                className="absolute inset-y-1 left-0 w-px origin-top bg-primary shadow-[0_0_10px_var(--color-primary)]"
                style={{ scaleY: progress }}
                aria-hidden="true"
              />
              <ol className="space-y-1">
                {chapters.map((chapter, index) => (
                  <li key={chapter.id}>
                    <a
                      href={`#capability-${chapter.id}`}
                      aria-current={activeId === chapter.id ? 'step' : undefined}
                      className={cn(
                        'relative flex items-center gap-3 rounded-md px-2 py-1.5 text-sm transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-primary',
                        activeId === chapter.id ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                      )}>
                      {activeId === chapter.id && (
                        <m.span
                          layoutId="capability-nav-active"
                          transition={spring.settle}
                          className="absolute inset-0 -z-10 rounded-md bg-accent"
                          aria-hidden="true"
                        />
                      )}
                      <span className="font-mono text-[11px] text-muted-foreground">0{index + 1}</span>
                      {t(`home_page.capabilities.chapters.${chapter.id}.nav`)}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </nav>

          <div ref={listRef} className="space-y-24 sm:space-y-32">
            {chapters.map((chapter, index) => (
              <ChapterBlock key={chapter.id} chapter={chapter} index={index} onActive={() => setActiveId(chapter.id)} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
