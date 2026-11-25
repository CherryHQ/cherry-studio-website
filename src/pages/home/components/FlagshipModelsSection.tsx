import { ArrowUpRight, Sparkles, X, Zap, ZoomIn } from 'lucide-react'
import { type FC, useState } from 'react'
import { useTranslation } from 'react-i18next'

import flagshipModelDarkEn from '@/assets/images/screenshots/flagship-model-dark-en.webp'
import flagshipModelDarkZh from '@/assets/images/screenshots/flagship-model-dark-zh.webp'
import flagshipModelLightEn from '@/assets/images/screenshots/flagship-model-light-en.webp'
import flagshipModelLightZh from '@/assets/images/screenshots/flagship-model-light-zh.webp'
import SectionBackdrop from '@/components/website/SectionBackdrop'
import { cn } from '@/lib/utils'

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
  const [isImageOpen, setIsImageOpen] = useState(false)
  const isZh = i18n.language.startsWith('zh')
  const flagshipModelLight = isZh ? flagshipModelLightZh : flagshipModelLightEn
  const flagshipModelDark = isZh ? flagshipModelDarkZh : flagshipModelDarkEn

  return (
    <>
      <section className="isolate bg-background relative overflow-hidden site-section">
        <SectionBackdrop variant="grid" />
        <div className="site-container relative z-10">
          {/* Content Grid */}
          <div className="site-split">
            <div className="flex min-w-0 flex-col gap-4">
              {/* Section Header */}
              <div className="mb-2">
                <h2 className="text-foreground mb-3 text-3xl font-semibold tracking-tight sm:mb-4 sm:text-4xl">
                  {t('flagship_models.title')}
                </h2>
                <p className="text-muted-foreground text-sm sm:text-base">{t('flagship_models.subtitle')}</p>
              </div>

              {flagshipModels.map((model) => (
                <a
                  key={model.nameKey}
                  href={typeof model.href === 'string' ? model.href : model.href[isZh ? 'zh' : 'en']}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    'border-border/50 bg-card/50 group relative overflow-hidden rounded-lg border p-6',
                    'transition-all duration-300 hover:border-border hover:bg-card/80'
                  )}>
                  <div className="relative z-10">
                    {/* Header */}
                    <div className="mb-3 flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex size-9 items-center justify-center rounded-md border border-border bg-secondary text-muted-foreground">
                          <model.icon className="size-4" aria-hidden="true" />
                        </div>
                        <h3 className="text-foreground text-lg font-semibold">{t(model.nameKey)}</h3>
                      </div>
                      <ArrowUpRight className="text-muted-foreground h-5 w-5 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                    </div>

                    {/* Description */}
                    <p className="text-muted-foreground mb-4 text-sm leading-relaxed">{t(model.descriptionKey)}</p>

                    {/* Features */}
                    <div className="flex flex-wrap gap-2">
                      {model.features.map((featureKey) => (
                        <span
                          key={featureKey}
                          className="bg-muted/50 text-muted-foreground rounded-full px-3 py-1 text-xs">
                          {t(featureKey)}
                        </span>
                      ))}
                    </div>
                  </div>
                </a>
              ))}

              {/* CTA */}
              <div className="text-muted-foreground mt-2 text-sm">{t('flagship_models.cta')}</div>
            </div>
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsImageOpen(true)}
                className="group relative block w-full cursor-zoom-in overflow-hidden rounded-lg border border-border bg-card transition-colors hover:border-primary/50 focus-visible:outline-2 focus-visible:outline-offset-4">
                <img
                  src={flagshipModelLight}
                  alt={t('flagship_models.title')}
                  className="block h-auto w-full dark:hidden"
                />
                <img
                  src={flagshipModelDark}
                  alt={t('flagship_models.title')}
                  className="hidden h-auto w-full dark:block"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/10">
                  <ZoomIn className="h-5 w-5 text-white opacity-0 drop-shadow-lg transition-opacity group-hover:opacity-100" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Image Modal */}
      {isImageOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setIsImageOpen(false)}>
          <button
            type="button"
            onClick={() => setIsImageOpen(false)}
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20">
            <X className="h-6 w-6" />
          </button>
          <img
            src={flagshipModelLight}
            alt={t('flagship_models.title')}
            className="block max-h-[90vh] max-w-[90vw] rounded-lg object-contain dark:hidden"
            onClick={(e) => e.stopPropagation()}
          />
          <img
            src={flagshipModelDark}
            alt={t('flagship_models.title')}
            className="hidden max-h-[90vh] max-w-[90vw] rounded-lg object-contain dark:block"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  )
}

export default FlagshipModelsSection
