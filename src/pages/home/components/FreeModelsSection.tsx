import { ArrowUpRight, Sparkles, X, Zap, ZoomIn } from 'lucide-react'
import { type FC, useState } from 'react'
import { useTranslation } from 'react-i18next'

import freeModelDark from '@/assets/images/screenshots/free-model-dark.webp'
import freeModelLight from '@/assets/images/screenshots/free-model-light.webp'
import { cn } from '@/lib/utils'

interface FreeModel {
  nameKey: string
  descriptionKey: string
  href: string
  features: string[]
  icon: typeof Zap
  iconColor: string
  iconBg: string
}

const freeModels: FreeModel[] = [
  {
    nameKey: 'free_models.glm.name',
    descriptionKey: 'free_models.glm.description',
    href: 'https://docs.cherry-ai.com/pre-basic/providers/cherryai/mian-fei-ti-yan-zhi-pu-glm4.5air-qing-liang-gao-xiao-xin-xuan-ze',
    features: ['free_models.glm.feature1', 'free_models.glm.feature2', 'free_models.glm.feature3'],
    icon: Zap,
    iconColor: 'text-amber-500',
    iconBg: 'bg-amber-500/10'
  },
  {
    nameKey: 'free_models.qwen.name',
    descriptionKey: 'free_models.qwen.description',
    href: 'https://docs.cherry-ai.com/pre-basic/providers/cherryai/mian-fei-ti-yan-qwen38b-you-gui-ji-liu-dong-ti-gong',
    features: ['free_models.qwen.feature1', 'free_models.qwen.feature2', 'free_models.qwen.feature3'],
    icon: Sparkles,
    iconColor: 'text-purple-500',
    iconBg: 'bg-purple-500/10'
  }
]

const FreeModelsSection: FC = () => {
  const { t } = useTranslation()
  const [isImageOpen, setIsImageOpen] = useState(false)

  return (
    <>
      <section className="bg-background relative overflow-hidden py-8 sm:py-16">
        <div className="relative z-10 mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="mx-auto mb-8 max-w-3xl text-center sm:mb-16">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-green-500/10 px-4 py-1.5 text-sm font-medium text-green-600 dark:text-green-400">
              <Sparkles className="h-4 w-4" />
              {t('free_models.badge')}
            </div>
            <h2 className="text-foreground mb-3 text-2xl font-bold sm:mb-4 sm:text-4xl lg:text-5xl">
              {t('free_models.title')}
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base">{t('free_models.subtitle')}</p>
          </div>

          {/* Content Grid */}
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            {/* Left: Screenshot */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsImageOpen(true)}
                className="group relative cursor-zoom-in overflow-hidden rounded-xl transition-transform hover:scale-[1.02]">
                <img src={freeModelLight} alt="Cherry Studio Free Models" className="block h-auto w-full dark:hidden" />
                <img src={freeModelDark} alt="Cherry Studio Free Models" className="hidden h-auto w-full dark:block" />
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/10">
                  <ZoomIn className="h-5 w-5 text-white opacity-0 drop-shadow-lg transition-opacity group-hover:opacity-100" />
                </div>
              </button>
            </div>

            {/* Right: Model Cards */}
            <div className="flex flex-col gap-4">
              {freeModels.map((model) => (
                <a
                  key={model.nameKey}
                  href={model.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    'border-border/50 bg-card/50 group relative overflow-hidden rounded-2xl border p-6',
                    'transition-all duration-300 hover:border-border hover:bg-card/80'
                  )}>
                  <div className="relative z-10">
                    {/* Header */}
                    <div className="mb-3 flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className={cn('flex h-10 w-10 items-center justify-center rounded-xl', model.iconBg)}>
                          <model.icon className={cn('h-5 w-5', model.iconColor)} />
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
              <div className="text-muted-foreground mt-2 text-center text-sm">{t('free_models.cta')}</div>
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
            src={freeModelLight}
            alt="Cherry Studio Free Models"
            className="block max-h-[90vh] max-w-[90vw] rounded-lg object-contain dark:hidden"
            onClick={(e) => e.stopPropagation()}
          />
          <img
            src={freeModelDark}
            alt="Cherry Studio Free Models"
            className="hidden max-h-[90vh] max-w-[90vw] rounded-lg object-contain dark:block"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  )
}

export default FreeModelsSection
