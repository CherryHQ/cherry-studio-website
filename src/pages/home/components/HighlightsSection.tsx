import { Bot, FileText, Palette, Puzzle, Sparkles, Zap } from 'lucide-react'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import { cn } from '@/lib/utils'

interface Highlight {
  icon: React.ElementType
  titleKey: string
  descriptionKey: string
  gradient: string
  iconColor: string
}

const highlights: Highlight[] = [
  {
    icon: Bot,
    titleKey: 'highlights.multi_model.title',
    descriptionKey: 'highlights.multi_model.description',
    gradient: 'from-blue-500/10 to-cyan-500/10',
    iconColor: 'text-blue-500'
  },
  {
    icon: Sparkles,
    titleKey: 'highlights.assistants.title',
    descriptionKey: 'highlights.assistants.description',
    gradient: 'from-purple-500/10 to-pink-500/10',
    iconColor: 'text-purple-500'
  },
  {
    icon: FileText,
    titleKey: 'highlights.documents.title',
    descriptionKey: 'highlights.documents.description',
    gradient: 'from-green-500/10 to-emerald-500/10',
    iconColor: 'text-green-500'
  },
  {
    icon: Zap,
    titleKey: 'highlights.productivity.title',
    descriptionKey: 'highlights.productivity.description',
    gradient: 'from-orange-500/10 to-amber-500/10',
    iconColor: 'text-orange-500'
  },
  {
    icon: Palette,
    titleKey: 'highlights.customizable.title',
    descriptionKey: 'highlights.customizable.description',
    gradient: 'from-rose-500/10 to-red-500/10',
    iconColor: 'text-rose-500'
  },
  {
    icon: Puzzle,
    titleKey: 'highlights.extensible.title',
    descriptionKey: 'highlights.extensible.description',
    gradient: 'from-indigo-500/10 to-violet-500/10',
    iconColor: 'text-indigo-500'
  }
]

const HighlightsSection: FC = () => {
  const { t } = useTranslation()

  return (
    <section className="bg-background relative overflow-hidden py-24">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="from-primary/5 absolute inset-0 bg-gradient-to-br via-transparent to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="text-foreground mb-4 text-3xl font-bold sm:text-4xl lg:text-5xl">
            {t('highlights.title')}
          </h2>
          <p className="text-muted-foreground text-lg">{t('highlights.subtitle')}</p>
        </div>

        {/* Highlights Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {highlights.map((highlight, index) => (
            <div
              key={highlight.titleKey}
              className={cn(
                'group relative overflow-hidden rounded-2xl p-6',
                'border-border/50 hover:border-border border bg-gradient-to-br transition-all duration-300',
                highlight.gradient,
                'hover:shadow-lg hover:-translate-y-1'
              )}
              style={{ animationDelay: `${index * 100}ms` }}>
              {/* Icon */}
              <div
                className={cn(
                  'mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl',
                  'bg-background/80 backdrop-blur-sm',
                  highlight.iconColor
                )}>
                <highlight.icon className="h-6 w-6" />
              </div>

              {/* Content */}
              <h3 className="text-foreground mb-2 text-xl font-semibold">{t(highlight.titleKey)}</h3>
              <p className="text-muted-foreground leading-relaxed">{t(highlight.descriptionKey)}</p>

              {/* Decorative Element */}
              <div
                className={cn(
                  'absolute -right-8 -bottom-8 h-32 w-32 rounded-full opacity-20 blur-2xl transition-opacity duration-300 group-hover:opacity-40',
                  highlight.iconColor.replace('text-', 'bg-')
                )}
              />
            </div>
          ))}
        </div>

        {/* Bottom Stats */}
        <div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4">
          {[
            { value: '50+', labelKey: 'highlights.stats.providers' },
            { value: '300+', labelKey: 'highlights.stats.assistants' },
            { value: '30K+', labelKey: 'highlights.stats.stars' },
            { value: '3', labelKey: 'highlights.stats.platforms' }
          ].map((stat) => (
            <div key={stat.labelKey} className="text-center">
              <div className="text-primary mb-2 text-3xl font-bold sm:text-4xl">{stat.value}</div>
              <div className="text-muted-foreground text-sm">{t(stat.labelKey)}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HighlightsSection
