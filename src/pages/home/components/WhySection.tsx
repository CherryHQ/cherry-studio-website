import { Bot, Boxes, FileText, Library, Sparkles, WandSparkles } from 'lucide-react'
import type { FC } from 'react'
import { Trans, useTranslation } from 'react-i18next'

import SectionBackdrop from '@/components/website/SectionBackdrop'

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
      <SectionBackdrop variant="grid" />
      <div className="site-container relative z-10">
        <div className="mb-8 max-w-3xl sm:mb-12">
          <h2 className="text-gradient mb-4 text-4xl font-display text-balance sm:text-5xl">{t('highlights.title')}</h2>
          <p className="text-muted-foreground text-base sm:text-lg">{t('highlights.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
          {whyItems.map((item) => (
            <div
              key={item.key}
              className="glass-card rounded-xl p-6 transition-[border-color,transform] duration-300 ease-settle hover:-translate-y-0.5 hover:border-hairline-strong">
              <h3 className="text-foreground mb-3 flex items-center gap-3 text-lg font-semibold">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-border bg-primary/10 text-primary">
                  <item.icon className="size-4" aria-hidden="true" />
                </span>
                {t(`${item.key}.title`)}
              </h3>
              <p className="text-muted-foreground pl-12 text-sm leading-relaxed sm:text-base">
                <Trans
                  i18nKey={`${item.key}.description`}
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

export default WhySection
