import { ArrowUpRight, Sparkles, Zap } from 'lucide-react'
import type { FC } from 'react'
import { useTranslation } from 'react-i18next'

import SectionBackdrop from '@/components/website/SectionBackdrop'

interface FlagshipModel {
  nameKey: string
  descriptionKey: string
  href: string | { en: string; zh: string }
  features: string[]
  icon: typeof Zap
}

const flagshipModels: FlagshipModel[] = [
  {
    nameKey: 'flagship_models.deepseek.name',
    descriptionKey: 'flagship_models.deepseek.description',
    href: {
      zh: 'https://api-docs.deepseek.com/zh-cn/news/news260813',
      en: 'https://api-docs.deepseek.com/news/news260813'
    },
    features: [
      'flagship_models.deepseek.feature1',
      'flagship_models.deepseek.feature2',
      'flagship_models.deepseek.feature3'
    ],
    icon: Zap
  },
  {
    nameKey: 'flagship_models.featured.name',
    descriptionKey: 'flagship_models.featured.description',
    href: 'https://docs.bigmodel.cn/cn/guide/models/text/glm-5.3',
    features: [
      'flagship_models.featured.feature1',
      'flagship_models.featured.feature2',
      'flagship_models.featured.feature3'
    ],
    icon: Sparkles
  }
]

const FlagshipModelsSection: FC = () => {
  const { t, i18n } = useTranslation()
  const isZh = i18n.language.startsWith('zh')

  return (
    <section className="relative isolate overflow-hidden bg-background site-section">
      <SectionBackdrop variant="grid" />
      <div className="site-container relative z-10">
        <div className="mb-8 max-w-3xl sm:mb-12">
          <h2 className="text-gradient mb-3 text-3xl font-semibold tracking-tight text-balance sm:mb-4 sm:text-4xl">
            {t('flagship_models.title')}
          </h2>
          <p className="text-sm text-muted-foreground sm:text-base">{t('flagship_models.subtitle')}</p>
        </div>

        <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
          {flagshipModels.map((model) => (
            <a
              key={model.nameKey}
              href={typeof model.href === 'string' ? model.href : model.href[isZh ? 'zh' : 'en']}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card group relative overflow-hidden rounded-2xl p-6 transition-[border-color,transform] duration-300 ease-settle hover:-translate-y-0.5 hover:border-hairline-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:p-8">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-24 -right-24 size-64 rounded-full bg-primary/15 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
              />
              <div className="relative">
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-xl border border-border bg-primary/10 text-primary">
                      <model.icon className="size-4" aria-hidden="true" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">{t(model.nameKey)}</h3>
                  </div>
                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-5 text-muted-foreground transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground"
                  />
                </div>
                <p className="mb-5 text-sm leading-relaxed text-muted-foreground zh:leading-7">
                  {t(model.descriptionKey)}
                </p>
                <div className="flex flex-wrap gap-2">
                  {model.features.map((featureKey) => (
                    <span
                      key={featureKey}
                      className="rounded-full border border-border bg-background/60 px-3 py-1 text-xs text-muted-foreground">
                      {t(featureKey)}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>
        <p className="mt-6 text-sm text-muted-foreground">{t('flagship_models.cta')}</p>
      </div>
    </section>
  )
}

export default FlagshipModelsSection
