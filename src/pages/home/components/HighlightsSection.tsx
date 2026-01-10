import { Bot, FileText, Palette, Puzzle, Sparkles, Zap } from 'lucide-react'
import type { FC } from 'react'
import { Trans, useTranslation } from 'react-i18next'

const highlights = [
  { key: 'highlights.multi_model', color: '#60a5fa', icon: Bot },
  { key: 'highlights.assistants', color: '#c084fc', icon: Sparkles },
  { key: 'highlights.documents', color: '#34d399', icon: FileText },
  { key: 'highlights.productivity', color: '#fb923c', icon: Zap },
  { key: 'highlights.customizable', color: '#fb7185', icon: Palette },
  { key: 'highlights.extensible', color: '#818cf8', icon: Puzzle }
]

const HighlightsSection: FC = () => {
  const { t } = useTranslation()

  return (
    <section className="bg-background relative overflow-hidden py-16 sm:py-24">
      <div className="relative z-10 mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto mb-8 max-w-3xl text-center sm:mb-16">
          <h2 className="text-foreground mb-4 text-2xl font-bold sm:text-4xl lg:text-5xl">{t('highlights.title')}</h2>
          <p className="text-muted-foreground text-base sm:text-lg">{t('highlights.subtitle')}</p>
        </div>

        {/* Highlights Grid */}
        <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2">
          {highlights.map((highlight) => (
            <div
              key={highlight.key}
              className="group rounded-2xl border border-border/50 bg-card/50 p-6 transition-colors hover:border-border hover:bg-card/80">
              <h3 className="text-foreground mb-3 flex items-center gap-3 text-lg font-bold sm:text-xl">
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                  style={{ backgroundColor: `${highlight.color}15` }}>
                  <highlight.icon className="h-5 w-5" style={{ color: highlight.color }} />
                </div>
                {t(`${highlight.key}.title`)}
              </h3>
              <p className="text-muted-foreground pl-13 text-sm leading-relaxed sm:text-base">
                <Trans
                  i18nKey={`${highlight.key}.description`}
                  components={{
                    highlight: (
                      <span
                        className="font-medium text-foreground"
                        style={{
                          textDecoration: 'underline',
                          textDecorationColor: highlight.color,
                          textDecorationThickness: '3px',
                          textUnderlineOffset: '3px',
                          textDecorationSkipInk: 'none'
                        }}
                      />
                    )
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
