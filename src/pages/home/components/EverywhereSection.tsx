import { m } from 'framer-motion'
import { useTranslation } from 'react-i18next'

import DemoMount from '@/components/demos/primitives/DemoMount'
import SectionBackdrop from '@/components/website/SectionBackdrop'
import productStats from '@/content/product-stats.json'
import { reveal } from '@/lib/motion'

const stats = [
  { key: 'mcp', value: productStats.labels.mcpServers },
  { key: 'mini_apps', value: productStats.labels.miniApps },
  { key: 'translate', value: productStats.labels.translateLanguages },
  { key: 'locales', value: productStats.labels.uiLocales }
] as const

export default function EverywhereSection() {
  const { t } = useTranslation()

  return (
    <section
      className="relative isolate overflow-hidden border-t border-border py-20 sm:py-28"
      aria-labelledby="home-everywhere">
      <SectionBackdrop variant="beams" />
      <div className="site-container">
        <m.div {...reveal()} className="mx-auto mb-12 max-w-3xl text-center">
          <p className="mb-3 font-mono text-xs tracking-wider text-primary uppercase">
            {t('home_page.everywhere.eyebrow')}
          </p>
          <h2
            id="home-everywhere"
            className="text-gradient text-3xl font-semibold tracking-tight text-balance sm:text-5xl">
            {t('home_page.everywhere.title')}
          </h2>
          <p className="mt-5 text-pretty text-muted-foreground sm:text-lg">{t('home_page.everywhere.subtitle')}</p>
        </m.div>

        <DemoMount
          load={() => import('@/components/demos/assistants/DesktopAssistantsDemo')}
          className="mx-auto min-h-[540px] max-w-5xl"
        />

        <dl className="mx-auto mt-14 grid max-w-5xl grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-4">
          {stats.map((stat, index) => (
            <m.div key={stat.key} {...reveal(index)} className="flex flex-col-reverse bg-background px-6 py-6">
              <dt className="mt-1 text-sm text-muted-foreground">{t(`home_page.everywhere.stats.${stat.key}`)}</dt>
              <dd className="font-mono text-3xl font-semibold tracking-tight tabular-nums">{stat.value}</dd>
            </m.div>
          ))}
        </dl>
      </div>
    </section>
  )
}
