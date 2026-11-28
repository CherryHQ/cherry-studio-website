import { m } from 'framer-motion'
import { Check } from 'lucide-react'
import type { ComponentType } from 'react'
import { useTranslation } from 'react-i18next'

import DemoMount from '@/components/demos/primitives/DemoMount'
import BlurInText from '@/components/website/BlurInText'
import { reveal } from '@/lib/motion'

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
  },
  {
    chapter: 'create',
    demos: [{ load: () => import('@/components/demos/create/ArtifactsDemo'), height: 'min-h-[540px]' }]
  }
]
const chapterIds = [...new Set(steps.map((step) => step.chapter))]

/** One chapter: its copy across the top, then its demos at full width so each window keeps a desktop proportion. */
function Chapter({ chapter, index }: { chapter: ChapterId; index: number }) {
  const { t } = useTranslation()
  const points = t(`home_page.capabilities.chapters.${chapter}.points`, { returnObjects: true }) as string[]
  const demos = steps.filter((step) => step.chapter === chapter).flatMap((step) => step.demos)

  return (
    <article
      aria-labelledby={`capability-${chapter}`}
      className="border-t border-border py-16 first:border-t-0 sm:py-20">
      <m.div {...reveal()} className="grid gap-x-16 gap-y-5 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-end">
        <div>
          <p className="text-sm text-muted-foreground">
            0{index + 1} · {t(`home_page.capabilities.chapters.${chapter}.nav`)}
          </p>
          <h3 id={`capability-${chapter}`} className="mt-2 text-3xl font-display text-balance sm:text-4xl">
            {t(`home_page.capabilities.chapters.${chapter}.title`)}
          </h3>
        </div>
        <div>
          <p className="text-pretty text-muted-foreground zh:leading-[1.8]">
            {t(`home_page.capabilities.chapters.${chapter}.description`)}
          </p>
          <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-1.5 text-sm">
            {points.map((point) => (
              <li key={point} className="flex gap-2 text-foreground/85">
                <Check className="mt-0.5 size-3.5 shrink-0 text-primary" aria-hidden="true" />
                {point}
              </li>
            ))}
          </ul>
        </div>
      </m.div>
      {/* Frames grow toward a 16:10 window, capped so a wide screen never turns the demo into a wall. */}
      <div data-fill="" className="@container mt-10 grid gap-10 [--demo-fill-h:min(700px,58cqw)]">
        {demos.map((demo, demoIndex) => (
          <DemoMount key={demoIndex} load={demo.load} className={demo.height} />
        ))}
      </div>
    </article>
  )
}

export default function CapabilitiesSection() {
  const { t } = useTranslation()

  return (
    <section
      id="home-capabilities"
      data-dock-hide=""
      className="relative isolate overflow-x-clip pt-20 sm:pt-28"
      aria-labelledby="home-capabilities-title">
      <m.div {...reveal()} className="site-container mx-auto mb-6 max-w-3xl text-center">
        <p className="mb-3 text-sm font-medium text-muted-foreground">{t('home_page.capabilities.eyebrow')}</p>
        <h2 id="home-capabilities-title" className="text-4xl font-display text-balance sm:text-6xl">
          <BlurInText text={t('home_page.capabilities.title')} />
        </h2>
        <p className="mt-5 text-pretty text-muted-foreground sm:text-lg">{t('home_page.capabilities.subtitle')}</p>
      </m.div>
      <div className="site-container">
        {chapterIds.map((chapter, index) => (
          <Chapter key={chapter} chapter={chapter} index={index} />
        ))}
      </div>
    </section>
  )
}
