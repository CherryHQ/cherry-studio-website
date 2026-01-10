import { ChevronDown } from 'lucide-react'
import { type FC, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { cn } from '@/lib/utils'

interface FAQItem {
  question: string
  answer: string
}

const FAQSection: FC = () => {
  const { t } = useTranslation()
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqItems = t('home_faq.items', { returnObjects: true }) as FAQItem[]

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="border-border bg-card border-t px-6 py-24">
      <div className="mx-auto max-w-[900px]">
        <div className="mb-12 text-center">
          <h2 className="text-foreground mb-4 text-3xl font-bold sm:text-4xl">{t('home_faq.title')}</h2>
          <p className="text-muted-foreground text-lg">{t('home_faq.subtitle')}</p>
        </div>

        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className="border-border bg-secondary/30 overflow-hidden rounded-xl border transition-all duration-200">
              <button
                type="button"
                onClick={() => toggleItem(index)}
                className="hover:bg-secondary/50 flex w-full cursor-pointer items-center justify-between gap-4 p-6 text-left transition-colors">
                <span className="text-foreground pr-4 font-medium">{item.question}</span>
                <ChevronDown
                  className={cn(
                    'text-muted-foreground h-5 w-5 shrink-0 transition-transform duration-200',
                    openIndex === index && 'rotate-180'
                  )}
                />
              </button>
              <div
                className={cn(
                  'grid transition-all duration-200',
                  openIndex === index ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                )}>
                <div className="overflow-hidden">
                  <div className="text-muted-foreground border-border border-t px-6 pb-6 pt-4 text-sm leading-relaxed">
                    {item.answer}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FAQSection
