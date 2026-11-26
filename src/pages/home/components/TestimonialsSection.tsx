import { ArrowUpRight } from 'lucide-react'
import type { FC, ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

import SectionBackdrop from '@/components/website/SectionBackdrop'
import { type TestimonialPlatform, testimonials } from '@/content/testimonials'
import { isEnglishSite } from '@/utils/urls'

type SourcePlatform = TestimonialPlatform | 'github'

const platformIcons: Record<SourcePlatform, ReactNode> = {
  producthunt: (
    <svg className="size-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm-1.5 5v10h2v-3h2a3 3 0 000-6h-4zm2 2h2a1 1 0 110 2h-2V9z" />
    </svg>
  ),
  github: (
    <svg className="size-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  ),
  medium: (
    <svg className="size-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
    </svg>
  ),
  hackernews: (
    <svg className="size-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M0 0v24h24V0H0zm5.2 4h2.3l4.5 8.2L16.5 4h2.3l-5.7 10.4V20h-2.2v-5.6L5.2 4z" />
    </svg>
  ),
  alternativeto: (
    <svg className="size-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2a10 10 0 110 20 10 10 0 010-20zm-1.9 4.6L6 17.4h2.2l.9-2.5h4.1l.9 2.5H16L11.9 6.6h-1.8zm.9 2.9l1.4 3.9H9.6l1.4-3.9z" />
    </svg>
  )
}

const platformNames: Record<SourcePlatform, string> = {
  producthunt: 'Product Hunt',
  github: 'GitHub',
  medium: 'Medium',
  hackernews: 'Hacker News',
  alternativeto: 'AlternativeTo'
}

const communitySources: { platform: SourcePlatform; url: string }[] = [
  { platform: 'producthunt', url: 'https://www.producthunt.com/products/cherry-studio/reviews' },
  { platform: 'alternativeto', url: 'https://alternativeto.net/software/cherry-studio/about/' },
  { platform: 'hackernews', url: 'https://hn.algolia.com/?query=Cherry%20Studio' },
  { platform: 'github', url: 'https://github.com/CherryHQ/cherry-studio' },
  {
    platform: 'medium',
    url: 'https://medium.com/@PowerUpSkills/the-one-ai-client-to-rule-them-all-cherry-studio-in-2025-ac71837eb892'
  }
]

function Avatar({ name, src }: { name: string; src?: string }) {
  if (src) {
    return <img src={src} alt="" loading="lazy" className="size-10 rounded-full object-cover ring-1 ring-border" />
  }
  return (
    <span
      aria-hidden="true"
      className="flex size-10 items-center justify-center rounded-full bg-secondary font-mono text-sm font-medium text-muted-foreground ring-1 ring-border">
      {name.slice(0, 1).toUpperCase()}
    </span>
  )
}

const TestimonialsSection: FC = () => {
  const { t, i18n } = useTranslation()
  const isEn = isEnglishSite(i18n.resolvedLanguage || i18n.language)

  return (
    <section
      className="site-section relative isolate overflow-hidden bg-background"
      aria-labelledby="home-testimonials">
      <SectionBackdrop variant="arcs" />
      <div className="site-container relative">
        <div className="mb-10 max-w-2xl sm:mb-14">
          <p className="mb-3 font-mono text-xs tracking-wider text-primary uppercase">{t('testimonials.eyebrow')}</p>
          <h2 id="home-testimonials" className="text-gradient text-4xl font-display text-balance sm:text-5xl">
            {t('testimonials.title')}
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground">{t('testimonials.subtitle')}</p>
        </div>

        <ul className="columns-1 gap-4 md:columns-2 lg:columns-3">
          {testimonials.map((item) => (
            <li key={item.id} className="mb-4 break-inside-avoid">
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="glass-card group flex flex-col gap-5 rounded-xl p-6 transition-[border-color,transform] duration-300 ease-settle hover:-translate-y-0.5 hover:border-hairline-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                <blockquote className="text-pretty text-[15px] leading-relaxed text-foreground/90 zh:leading-[1.8]">
                  “{isEn ? item.content.en : item.content.zh}”
                </blockquote>
                <div className="mt-auto flex items-center gap-3">
                  <Avatar name={item.handle?.replace('@', '') ?? item.name} src={item.avatar} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-foreground">{item.name}</p>
                    {item.handle && <p className="truncate text-xs text-muted-foreground">{item.handle}</p>}
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs text-muted-foreground transition-colors group-hover:text-primary">
                    {platformIcons[item.platform]}
                    <span className="sr-only sm:not-sr-only">
                      {t('testimonials.view_on', { platform: platformNames[item.platform] })}
                    </span>
                    <ArrowUpRight className="size-3.5" aria-hidden="true" />
                  </span>
                </div>
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
          <p className="text-sm text-muted-foreground">{t('testimonials.source_hint')}</p>
          <ul className="flex flex-wrap items-center gap-2">
            {communitySources.map((source) => (
              <li key={source.platform}>
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-hairline-strong hover:text-foreground focus-visible:outline-2 focus-visible:outline-primary">
                  {platformIcons[source.platform]}
                  {platformNames[source.platform]}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection
