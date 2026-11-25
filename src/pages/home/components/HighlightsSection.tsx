import { Bot, FileText, Palette, Puzzle, Sparkles, Zap } from 'lucide-react'
import type { FC } from 'react'
import { Trans, useTranslation } from 'react-i18next'

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
          <h2 className="text-gradient mb-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            {t('highlights.title')}
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg">{t('highlights.subtitle')}</p>
        </div>

        {/* Highlights Grid */}
        <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2">
          {highlights.map((highlight) => (
            <div
              key={highlight.key}
              className="group glass-card rounded-xl p-6 transition-[border-color,transform] duration-300 ease-settle hover:-translate-y-0.5 hover:border-hairline-strong">
              <h3 className="text-foreground mb-3 flex items-center gap-3 text-lg font-semibold">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-border bg-primary/10 text-primary">
                  <highlight.icon className="size-4" aria-hidden="true" />
                </span>
                {t(`${highlight.key}.title`)}
              </h3>
              <p className="text-muted-foreground pl-12 text-sm leading-relaxed sm:text-base">
                <Trans
                  i18nKey={`${highlight.key}.description`}
                  components={{
                    highlight: <span className="font-medium text-foreground" />
                  }}
                />
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HighlightsSection
