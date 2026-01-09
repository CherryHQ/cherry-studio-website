import { Bot, Download, FileText, Palette, Puzzle, Sparkles, Zap } from 'lucide-react'
import type { FC } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { useVersionData } from '@/hooks/useVersionData'

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
  const { versionData } = useVersionData()

  return (
    <section className="bg-background relative overflow-hidden py-16 sm:py-24">
      <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 text-center sm:mb-16">
          <h2 className="text-foreground mb-4 text-2xl font-bold sm:text-4xl lg:text-5xl">
            {t('highlights.title')}
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg">{t('highlights.subtitle')}</p>
        </div>

        {/* Highlights List */}
        <div className="space-y-8 sm:space-y-10">
          {highlights.map((highlight) => (
            <div key={highlight.key} className="group">
              <h3 className="text-foreground mb-2 flex items-center gap-2 text-xl font-bold sm:text-2xl">
                <highlight.icon className="h-5 w-5 sm:h-6 sm:w-6" style={{ color: highlight.color }} />
                {t(`${highlight.key}.title`)}
              </h3>
              <p className="text-muted-foreground text-base leading-relaxed sm:text-lg">
                <Trans
                  i18nKey={`${highlight.key}.description`}
                  components={{
                    highlight: (
                      <span
                        className="font-medium text-foreground"
                        style={{
                          textDecoration: 'underline',
                          textDecorationColor: highlight.color,
                          textDecorationThickness: '4px',
                          textUnderlineOffset: '4px',
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

        {/* Download Button */}
        <div className="border-border/50 mt-12 border-t pt-12 text-center sm:mt-16 sm:pt-16">
          <Button variant="glow" size="lg" asChild>
            <Link to="/download" className="gap-2">
              <Download className="h-5 w-5" />
              Download {versionData?.version}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

export default HighlightsSection
