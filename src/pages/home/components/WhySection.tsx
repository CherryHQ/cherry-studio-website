import { Bot, Boxes, FileText, Library, Sparkles, WandSparkles } from 'lucide-react'
import type { FC } from 'react'
import { Trans, useTranslation } from 'react-i18next'

import FeatureBento from '@/components/website/FeatureBento'

const whyItems = [
  { key: 'highlights.agents', icon: Bot },
  { key: 'highlights.multi_model', icon: Boxes },
  { key: 'highlights.knowledge', icon: Library },
  { key: 'highlights.images', icon: WandSparkles },
  { key: 'highlights.assistants', icon: Sparkles },
  { key: 'highlights.documents', icon: FileText }
]

const WhySection: FC = () => {
  const { t } = useTranslation()

  return (
    <section className="isolate bg-background relative overflow-hidden site-section">
      <div className="site-container relative z-10">
        <div className="mb-8 max-w-3xl sm:mb-12">
          <h2 className="mb-4 text-4xl font-display text-balance sm:text-5xl">{t('highlights.title')}</h2>
          <p className="text-muted-foreground text-base sm:text-lg">{t('highlights.subtitle')}</p>
        </div>

        <FeatureBento
          items={whyItems.map((item) => ({
            key: item.key,
            icon: item.icon,
            title: t(`${item.key}.title`),
            description: (
              <Trans
                i18nKey={`${item.key}.description`}
                components={{ highlight: <span className="font-medium text-foreground" /> }}
              />
            )
          }))}
        />
      </div>
    </section>
  )
}

export default WhySection
