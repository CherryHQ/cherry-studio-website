import { m } from 'framer-motion'
import { ArrowRight, Plus } from 'lucide-react'
import { type FC, useState } from 'react'
import { useTranslation } from 'react-i18next'

import BlurInText from '@/components/website/BlurInText'
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
      className="relative isolate border-t border-border py-16 sm:py-24">
      <div className="site-container mx-auto max-w-3xl">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 id="home-faq-heading" className="text-3xl font-display text-balance sm:text-4xl">
              <BlurInText text={t('home_faq.title')} />
            </h2>
            {isZh && <p className="mt-2 text-sm text-muted-foreground">{t('home_faq.subtitle')}</p>}
          </div>
          <a
            href={getDocsUrl(i18n.language)}
            className="inline-flex items-center gap-1 rounded-sm text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
            {t('nav.docs')}
            <ArrowRight className="size-4" aria-hidden="true" />
          </a>
        </div>

        <div className="divide-y divide-border border-y border-border">
          {faqItems.map(({ question, answer }, index) => {
            const isOpen = openIndex === index
            return (
              <div key={question}>
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`home-faq-answer-${index}`}
                    onClick={() => toggleItem(index)}
                    className="group flex w-full cursor-pointer items-center justify-between gap-4 py-5 text-left text-base font-medium text-foreground focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary">
                    <span className="transition-colors group-hover:text-muted-foreground">{question}</span>
                    <span
                      className={cn(
                        'flex size-7 shrink-0 items-center justify-center rounded-full border border-border transition-[background-color,border-color,color] duration-200',
                        isOpen ? 'border-foreground bg-foreground text-background' : 'text-muted-foreground'
                      )}>
                      <Plus
                        aria-hidden="true"
                        className={cn('size-3.5 transition-transform duration-200 ease-settle', isOpen && 'rotate-45')}
                      />
                    </span>
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
                  <p className="max-w-2xl pr-10 pb-5 text-pretty text-sm leading-6 text-muted-foreground zh:leading-7">
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
