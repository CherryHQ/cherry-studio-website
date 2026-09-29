import { Bot, Boxes, FileText, Library, Sparkles, WandSparkles } from 'lucide-react'
import type { FC } from 'react'
import { Trans, useTranslation } from 'react-i18next'

const tints = ['#fb7185', '#34d399', '#fb923c']

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
    <section className="bg-background relative overflow-hidden py-16 sm:py-24">
      <div className="relative z-10 mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-8 max-w-3xl text-center sm:mb-16">
          <h2 className="text-foreground mb-4 text-2xl font-bold sm:text-4xl lg:text-5xl">{t('highlights.title')}</h2>
          <p className="text-muted-foreground text-base sm:text-lg">{t('highlights.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
          {whyItems.map((item, index) => {
            const color = tints[index % tints.length]

            return (
              <div
                key={item.key}
                className="border-border/50 bg-card/50 hover:border-border hover:bg-card/80 rounded-2xl border p-6 transition-colors">
                <h3 className="text-foreground mb-3 flex items-center gap-3 text-lg font-bold sm:text-xl">
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                    style={{ backgroundColor: `${color}15` }}>
                    <item.icon className="h-5 w-5" style={{ color }} />
                  </div>
                  {t(`${item.key}.title`)}
                </h3>
                <p className="text-muted-foreground pl-13 text-sm leading-relaxed sm:text-base">
                  <Trans
                    i18nKey={`${item.key}.description`}
                    components={{
                      highlight: (
                        <span
                          className="font-medium text-foreground"
                          style={{
                            textDecoration: 'underline',
                            textDecorationColor: color,
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
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default WhySection
