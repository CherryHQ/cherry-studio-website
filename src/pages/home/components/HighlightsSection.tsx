import { Bot, FileText, Palette, Puzzle, Sparkles, Zap } from 'lucide-react'
import type { FC } from 'react'
import { Trans, useTranslation } from 'react-i18next'

import FeatureBento from '@/components/website/FeatureBento'
import SectionBackdrop from '@/components/website/SectionBackdrop'

const highlights = [
  { key: 'highlights.multi_model', icon: Bot },
  { key: 'highlights.assistants', icon: Sparkles },
  { key: 'highlights.documents', icon: FileText },
  { key: 'highlights.productivity', icon: Zap },
  { key: 'highlights.customizable', icon: Palette },
  { key: 'highlights.extensible', icon: Puzzle }
]

const HighlightsSection: FC = () => {
  const { t } = useTranslation()

  return (
    <section className="isolate bg-background relative overflow-hidden site-section">
      <SectionBackdrop variant="dots" />
      <div className="site-container relative z-10">
        {/* Section Header */}
        <div className="mb-8 max-w-3xl sm:mb-12">
          <h2 className="text-gradient mb-4 text-4xl font-display text-balance sm:text-5xl">{t('highlights.title')}</h2>
          <p className="text-muted-foreground text-base sm:text-lg">{t('highlights.subtitle')}</p>
        </div>

        {/* Highlights Grid */}
        <FeatureBento
          items={highlights.map((item) => ({
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

export default HighlightsSection
