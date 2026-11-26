import { Cloud, Image, Languages, type LucideIcon, MessageSquare, Shield, Users } from 'lucide-react'
import type { FC } from 'react'
import { Trans, useTranslation } from 'react-i18next'

import FeatureBento from '@/components/website/FeatureBento'
import SectionBackdrop from '@/components/website/SectionBackdrop'
import { getDocsUrl } from '@/utils/urls'

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
          <h2 className="text-gradient mb-3 text-4xl font-display text-balance sm:mb-4 sm:text-5xl">
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

        <FeatureBento
          items={features.map((feature) => ({
            key: feature.titleKey,
            icon: feature.icon as LucideIcon,
            title: t(feature.titleKey),
            description: t(feature.descriptionKey),
            href: `${docsUrl}${feature.slug}`
          }))}
        />
      </div>
    </section>
  )
}

export default FeaturesSection
