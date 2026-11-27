import { m } from 'framer-motion'
import { ArrowRight, Plus } from 'lucide-react'
import { type FC, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { ease } from '@/lib/motion'
import { cn } from '@/lib/utils'
import { getDocsUrl } from '@/utils/urls'

interface FAQItem {
  question: string
  answer: string
}

const FAQSection: FC = () => {
  const { t, i18n } = useTranslation()
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const isZh = i18n.language.startsWith('zh')

  const faqItems = t('home_faq.items', { returnObjects: true }) as FAQItem[]

  const toggleItem = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index))
  }

  return (
    <section
      id="faq"
      aria-labelledby="home-faq-heading"
      className="relative isolate border-t border-border py-20 sm:py-28">
      <div className="site-container site-split">
        <div className="max-w-sm">
          <h2 id="home-faq-heading" className="text-4xl font-display text-balance sm:text-5xl">
            {t('home_faq.title')}
          </h2>
          {isZh && <p className="mt-3 text-base text-muted-foreground">{t('home_faq.subtitle')}</p>}
          <a
            href={getDocsUrl(i18n.language)}
            className="mt-4 inline-flex rounded-sm text-sm font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
            {t('nav.docs')}
            <ArrowRight className="ml-1 size-4" aria-hidden="true" />
          </a>
        </div>

        <div className="space-y-2">
          {faqItems.map(({ question, answer }, index) => {
            const isOpen = openIndex === index
            return (
              <div
                key={question}
                className={cn(
                  'rounded-xl border px-5 transition-colors duration-200',
                  isOpen ? 'glass-card border-hairline-strong' : 'border-border hover:border-hairline-strong'
                )}>
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`home-faq-answer-${index}`}
                    onClick={() => toggleItem(index)}
                    className="flex w-full cursor-pointer items-center justify-between gap-4 py-4 pr-1 text-left text-base font-medium text-foreground transition-colors hover:text-primary focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary">
                    <span>{question}</span>
                    <Plus
                      aria-hidden="true"
                      className={cn(
                        'size-4 shrink-0 text-muted-foreground transition-transform duration-200 ease-settle',
                        isOpen && 'rotate-45 text-primary'
                      )}
                    />
                  </button>
                </h3>
                {/* Desktop tool accordions open in 200ms and close in 160ms. */}
                <m.div
                  id={`home-faq-answer-${index}`}
                  initial={false}
                  animate={isOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
                  transition={{ duration: isOpen ? 0.2 : 0.16, ease: ease.settle }}
                  aria-hidden={!isOpen}
                  className="overflow-hidden">
                  <p className="max-w-2xl pr-6 pb-5 text-pretty text-sm leading-6 text-muted-foreground zh:leading-7">
                    {answer}
                  </p>
                </m.div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default FAQSection
