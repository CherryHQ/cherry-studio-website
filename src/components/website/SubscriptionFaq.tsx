import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'

import { cn } from '@/lib/utils'

const SUPPORT_EMAIL = 'support@cherry-ai.com'
const PLUS_FAQ_KEYS = ['quota', 'invoice', 'cancel', 'refund', 'accounts'] as const

interface FaqItem {
  id: string
  question: string
  answer: string
}

export default function SubscriptionFaq({
  variant,
  headingLevel: QuestionHeading = 'h3'
}: {
  variant: 'plus' | 'flash'
  headingLevel?: 'h2' | 'h3'
}) {
  const { t } = useTranslation()
  const items: FaqItem[] =
    variant === 'plus'
      ? PLUS_FAQ_KEYS.map((id) => ({
          id,
          question: t(`plus_page.faq.${id}.question`),
          answer: t(`plus_page.faq.${id}.answer`)
        }))
      : (t('pricing.faq', { returnObjects: true }) as Omit<FaqItem, 'id'>[]).map((item, index) => ({
          ...item,
          id: String(index)
        }))
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null)

  return (
    <div className="mt-10 grid gap-4">
      {items.map((item) => {
        const isOpen = openId === item.id
        const questionId = `${variant}-question-${item.id}`
        const answerId = `${variant}-answer-${item.id}`
        const emailIndex = item.answer.indexOf(SUPPORT_EMAIL)
        const emailLink = (
          <a href={`mailto:${SUPPORT_EMAIL}`} className="break-all text-primary hover:underline">
            {SUPPORT_EMAIL}
          </a>
        )

        return (
          <article key={item.id} className="overflow-hidden rounded-2xl border border-border bg-secondary/20">
            <QuestionHeading>
              <button
                type="button"
                id={questionId}
                aria-expanded={isOpen}
                aria-controls={answerId}
                onClick={() => setOpenId(isOpen ? null : item.id)}
                className="flex w-full cursor-pointer items-center justify-between gap-6 p-6 text-left text-base font-medium leading-6 hover:bg-secondary/60 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring">
                {item.question}
                <ChevronDown
                  aria-hidden="true"
                  className={cn(
                    'size-5 shrink-0 text-muted-foreground motion-safe:transition-transform',
                    isOpen && 'rotate-180'
                  )}
                />
              </button>
            </QuestionHeading>
            <div
              id={answerId}
              role="region"
              aria-labelledby={questionId}
              hidden={!isOpen}
              className="border-t border-border px-6 pb-6 pt-4 text-sm leading-6 text-muted-foreground">
              <p>
                {variant === 'plus' ? (
                  <Trans i18nKey={`plus_page.faq.${item.id}.answer`} components={{ email: emailLink }} />
                ) : emailIndex < 0 ? (
                  item.answer
                ) : (
                  <>
                    {item.answer.slice(0, emailIndex)}
                    {emailLink}
                    {item.answer.slice(emailIndex + SUPPORT_EMAIL.length)}
                  </>
                )}
              </p>
            </div>
          </article>
        )
      })}
    </div>
  )
}
