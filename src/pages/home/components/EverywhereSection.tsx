import { m } from 'framer-motion'
import { useTranslation } from 'react-i18next'

import DemoMount from '@/components/demos/primitives/DemoMount'
import BlurInText from '@/components/website/BlurInText'
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
      <div className="site-container">
        <m.div {...reveal()} className="mx-auto mb-12 max-w-3xl text-center">
          <p className="mb-3 text-sm font-medium text-muted-foreground">{t('home_page.everywhere.eyebrow')}</p>
          <h2 id="home-everywhere" className="text-4xl font-display text-balance sm:text-6xl">
            <BlurInText text={t('home_page.everywhere.title')} />
          </h2>
          <p className="mt-5 text-pretty text-muted-foreground sm:text-lg">{t('home_page.everywhere.subtitle')}</p>
        </m.div>

        <DemoMount
          load={() => import('@/components/demos/assistants/SelectionAgentDemo')}
          className="mx-auto min-h-[620px] max-w-7xl"
        />

        <dl className="mx-auto mt-14 grid max-w-7xl grid-cols-2 gap-px overflow-hidden rounded-[20px] border border-border bg-border md:grid-cols-4">
          {stats.map((stat, index) => (
            <m.div key={stat.key} {...reveal(index)} className="flex flex-col-reverse bg-background px-6 py-6">
              <dt className="mt-1 text-sm text-muted-foreground">{t(`home_page.everywhere.stats.${stat.key}`)}</dt>
              <dd className="font-display text-4xl tabular-nums">{stat.value}</dd>
            </m.div>
          ))}
        </dl>
      </div>
    </section>
  )
}
