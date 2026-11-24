import { ArrowRight, Cloud, Image, Languages, MessageSquare, Shield, Users } from 'lucide-react'
import type { FC } from 'react'
import { Trans, useTranslation } from 'react-i18next'

import { getDocsUrl } from '@/utils/urls'
import SectionBackdrop from './SectionBackdrop'

interface Feature {
  icon: React.ElementType
  titleKey: string
  descriptionKey: string
  slug: string
}

const features: Feature[] = [
  {
    icon: MessageSquare,
    titleKey: 'features.conversation.title',
    descriptionKey: 'features.conversation.description',
    slug: 'cherrystudio/preview/chat/'
  },
  {
    icon: Image,
    titleKey: 'features.drawing.title',
    descriptionKey: 'features.drawing.description',
    slug: 'cherrystudio/preview/drawing/'
  },
  {
    icon: Languages,
    titleKey: 'features.translation.title',
    descriptionKey: 'features.translation.description',
    slug: 'cherrystudio/preview/translation/'
  },
  {
    icon: Users,
    titleKey: 'features.assistants.title',
    descriptionKey: 'features.assistants.description',
    slug: 'advanced-basic/agent/'
  },
  {
    icon: Shield,
    titleKey: 'features.knowledge_base.title',
    descriptionKey: 'features.knowledge_base.description',
    slug: 'knowledge-base/knowledge-base/'
  },
  {
    icon: Cloud,
    titleKey: 'features.backup.title',
    descriptionKey: 'features.backup.description',
    slug: 'pre-basic/data-settings/'
  }
]

const FeaturesSection: FC = () => {
  const { t, i18n } = useTranslation()
  const docsUrl = getDocsUrl(i18n.language)

  return (
    <section className="isolate bg-background relative overflow-hidden site-section">
      <SectionBackdrop variant="grid" />
      <div className="site-container relative z-10">
        {/* Section Header */}
        <div className="mb-8 sm:mb-12">
          <h2 className="text-foreground mb-3 text-3xl font-semibold tracking-tight sm:mb-4 sm:text-4xl">
            {t('features.title')}
          </h2>
          <p className="text-muted-foreground max-w-2xl text-sm sm:text-base">
            <Trans i18nKey="features.description">
              以下仅为部分功能介绍，更多功能可以下载客户端体验，或在
              <a href={docsUrl} className="text-primary hover:underline">
                官方文档
              </a>
              中了解。
            </Trans>
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <a
              key={feature.titleKey}
              href={`${docsUrl}${feature.slug}`}
              className="group relative overflow-hidden rounded-lg border border-border bg-card p-6 transition-colors duration-300 hover:border-input focus-visible:outline-2 focus-visible:outline-primary">
              {/* Content */}
              <div className="relative z-10">
                {/* Icon */}
                <div className="mb-4 inline-flex size-9 items-center justify-center rounded-md border border-border bg-secondary text-muted-foreground">
                  <feature.icon className="size-4" aria-hidden="true" />
                </div>

                {/* Title */}
                <h3 className="text-foreground mb-2 flex items-center gap-2 text-lg font-semibold">
                  {t(feature.titleKey)}
                  <ArrowRight className="h-4 w-4 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100" />
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
