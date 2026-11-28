import { m, useInView, useReducedMotion } from 'framer-motion'
import { ArrowRight, Plus } from 'lucide-react'
import { type FC, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import BlurInText from '@/components/website/BlurInText'
import { ease } from '@/lib/motion'
import { cn } from '@/lib/utils'
import { getDocsUrl } from '@/utils/urls'

interface FAQItem {
  question: string
  answer: string
}

const CYCLE_MS = 5000

const FAQSection: FC = () => {
  const { t, i18n } = useTranslation()
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const isZh = i18n.language.startsWith('zh')

  const faqItems = t('home_faq.items', { returnObjects: true }) as FAQItem[]
  // The list cycles through its answers while on screen; hovering pauses it and a click hands control to the reader.
  const list = useRef<HTMLDivElement>(null)
  const inView = useInView(list, { amount: 0.5 })
  const reduced = useReducedMotion() ?? false
  const [paused, setPaused] = useState(false)
  const [manual, setManual] = useState(false)
  const cycling = inView && !paused && !manual && !reduced

  useEffect(() => {
    if (!cycling) return
    const timer = window.setTimeout(() => setOpenIndex((current) => ((current ?? -1) + 1) % faqItems.length), CYCLE_MS)
    return () => window.clearTimeout(timer)
  }, [cycling, openIndex, faqItems.length])

  const toggleItem = (index: number) => {
    setManual(true)
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

        <div
          ref={list}
          onPointerEnter={() => setPaused(true)}
          onPointerLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
          className="divide-y divide-border border-y border-border">
          {faqItems.map(({ question, answer }, index) => {
            const isOpen = openIndex === index
            return (
              <div key={question} className="relative">
                {/* Time left before the list moves on; it restarts whenever the open answer changes. */}
                {isOpen && cycling && (
                  <m.span
                    key={openIndex}
                    aria-hidden="true"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: CYCLE_MS / 1000, ease: 'linear' }}
                    className="absolute inset-x-0 -bottom-px h-px origin-left bg-foreground/60"
                  />
                )}
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
                        'flex size-7 shrink-0 items-center justify-center rounded-full border border-border transition-[background-color,border-color,color,scale] duration-300 ease-overshoot group-active:scale-90',
                        isOpen ? 'border-foreground bg-foreground text-background' : 'text-muted-foreground'
                      )}>
                      <Plus
                        aria-hidden="true"
                        className={cn(
                          'size-3.5 transition-transform duration-300 ease-overshoot',
                          isOpen && 'rotate-[135deg]'
                        )}
                      />
                    </span>
                  </button>
                </h3>
                {/* The panel opens to its height while the answer drifts in from slightly above; closing is quicker. */}
                <m.div
                  id={`home-faq-answer-${index}`}
                  initial={false}
                  animate={isOpen ? { height: 'auto' } : { height: 0 }}
                  transition={{ duration: isOpen ? 0.38 : 0.26, ease: ease.settle }}
                  aria-hidden={!isOpen}
                  className="overflow-hidden">
                  <m.p
                    initial={false}
                    animate={
                      isOpen ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0, y: -8, filter: 'blur(4px)' }
                    }
                    transition={{ duration: isOpen ? 0.34 : 0.18, delay: isOpen ? 0.06 : 0, ease: ease.settle }}
                    className="max-w-2xl pr-10 pb-5 text-pretty text-sm leading-6 text-muted-foreground zh:leading-7">
                    {answer}
                  </m.p>
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
