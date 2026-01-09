import { ArrowUpRight, Cloud, Image, Languages, MessageSquare, Shield, Users } from 'lucide-react'
import { FC } from 'react'
import { Trans, useTranslation } from 'react-i18next'

import { cn } from '@/lib/utils'

interface Feature {
  icon: React.ElementType
  titleKey: string
  descriptionKey: string
  href: string
  gradient: string
  iconColor: string
  iconBg: string
}

const features: Feature[] = [
  {
    icon: MessageSquare,
    titleKey: 'features.conversation.title',
    descriptionKey: 'features.conversation.description',
    href: 'https://docs.cherry-ai.com/cherrystudio/preview/chat',
    gradient: 'from-blue-500/20 to-cyan-500/20',
    iconColor: 'text-blue-500',
    iconBg: 'bg-blue-500/10'
  },
  {
    icon: Image,
    titleKey: 'features.drawing.title',
    descriptionKey: 'features.drawing.description',
    href: 'https://docs.cherry-ai.com/cherrystudio/preview/drawing',
    gradient: 'from-purple-500/20 to-pink-500/20',
    iconColor: 'text-purple-500',
    iconBg: 'bg-purple-500/10'
  },
  {
    icon: Languages,
    titleKey: 'features.translation.title',
    descriptionKey: 'features.translation.description',
    href: 'https://docs.cherry-ai.com/cherrystudio/preview/translation',
    gradient: 'from-green-500/20 to-emerald-500/20',
    iconColor: 'text-green-500',
    iconBg: 'bg-green-500/10'
  },
  {
    icon: Users,
    titleKey: 'features.assistants.title',
    descriptionKey: 'features.assistants.description',
    href: 'https://docs.cherry-ai.com/cherrystudio/preview/agents',
    gradient: 'from-orange-500/20 to-amber-500/20',
    iconColor: 'text-orange-500',
    iconBg: 'bg-orange-500/10'
  },
  {
    icon: Shield,
    titleKey: 'features.knowledge_base.title',
    descriptionKey: 'features.knowledge_base.description',
    href: 'https://docs.cherry-ai.com/advanced-basic/knowledge-base',
    gradient: 'from-red-500/20 to-rose-500/20',
    iconColor: 'text-red-500',
    iconBg: 'bg-red-500/10'
  },
  {
    icon: Cloud,
    titleKey: 'features.backup.title',
    descriptionKey: 'features.backup.description',
    href: 'https://docs.cherry-ai.com/cherrystudio/preview/settings/data',
    gradient: 'from-indigo-500/20 to-violet-500/20',
    iconColor: 'text-indigo-500',
    iconBg: 'bg-indigo-500/10'
  }
]

const FeaturesSection: FC = () => {
  const { t } = useTranslation()

  return (
    <section className="bg-background relative overflow-hidden py-24">
      {/* Background */}
      <div className="dot-pattern absolute inset-0 opacity-30" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="text-foreground mb-4 text-3xl font-bold sm:text-4xl lg:text-5xl">{t('features.title')}</h2>
          <p className="text-muted-foreground mx-auto max-w-2xl">
            <Trans i18nKey="features.description">
              以下仅为部分功能介绍，更多功能可以下载客户端体验，或在
              <a
                href="https://docs.cherry-ai.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline">
                官方文档
              </a>
              中了解。
            </Trans>
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <a
              key={feature.titleKey}
              href={feature.href}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'border-border/50 bg-card/50 group relative overflow-hidden rounded-2xl border p-6',
                'transition-all duration-300',
                'hover:border-primary/30 hover:bg-card'
              )}>
              {/* Gradient Background */}
              <div
                className={cn(
                  'absolute -inset-px rounded-2xl bg-gradient-to-br opacity-0 transition-opacity duration-300',
                  feature.gradient,
                  'group-hover:opacity-100'
                )}
              />

              {/* Content */}
              <div className="relative z-10">
                {/* Icon */}
                <div
                  className={cn(
                    'mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl',
                    feature.iconBg,
                    feature.iconColor
                  )}>
                  <feature.icon className="h-6 w-6" />
                </div>

                {/* Title */}
                <h3 className="text-foreground mb-2 flex items-center gap-2 text-lg font-semibold">
                  {t(feature.titleKey)}
                  <ArrowUpRight className="h-4 w-4 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                </h3>

                {/* Description */}
                <p className="text-muted-foreground text-sm leading-relaxed">{t(feature.descriptionKey)}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection
