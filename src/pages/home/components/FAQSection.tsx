import { ArrowRight, Minus, Plus } from 'lucide-react'
import { type FC, useState } from 'react'
import { useTranslation } from 'react-i18next'

import SectionBackdrop from '@/components/website/SectionBackdrop'
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
      className="isolate relative scroll-mt-[60px] border-border bg-card border-t py-10 sm:py-12">
      <SectionBackdrop variant="rules" />
      <div className="site-container site-split">
        <div className="max-w-sm">
          <h2
            id="home-faq-heading"
            className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
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

        <div className="divide-y divide-border border-y border-border">
          {faqItems.map(({ question, answer }, index) => {
            const isOpen = openIndex === index
            const Icon = isOpen ? Minus : Plus
            return (
              <div key={question}>
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`home-faq-answer-${index}`}
                    onClick={() => toggleItem(index)}
                    className="flex w-full cursor-pointer items-center justify-between gap-4 py-4 pr-1 text-left text-base font-medium text-foreground transition-colors hover:text-primary focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary">
                    <span>{question}</span>
                    <Icon aria-hidden="true" className="size-4 shrink-0 text-muted-foreground" />
                  </button>
                </h3>
                <div id={`home-faq-answer-${index}`} hidden={!isOpen} className="max-w-2xl pb-5 pr-6">
                  <p className="text-pretty text-sm leading-6 text-muted-foreground">{answer}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default FAQSection
