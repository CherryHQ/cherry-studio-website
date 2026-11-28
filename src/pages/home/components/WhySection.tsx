import { m, useInView, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { type FC, type ReactNode, useEffect, useRef, useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'

import lightTrails from '@/assets/images/paintings/light-trails.webp'
import trainWindow from '@/assets/images/paintings/train-window.webp'
import y2kStreet from '@/assets/images/paintings/y2k-street.webp'
import { cliIcon } from '@/components/demos/primitives/brand'
import ProviderIcon from '@/components/demos/primitives/ProviderIcon'
import { useDemoLocale } from '@/components/demos/primitives/useDemoLocale'
import BlurInText from '@/components/website/BlurInText'
import Marquee from '@/components/website/Marquee'
import type { DemoLocale } from '@/content/demos/chat'
import productStats from '@/content/product-stats.json'
import { reveal } from '@/lib/motion'
import { cn } from '@/lib/utils'

const TILE = 'flex shrink-0 items-center justify-center bg-background shadow-[inset_0_0_0_1px_var(--color-border)]'
// The Chinese site shows only domestic providers and coding agents.
const CLIS: Record<DemoLocale, { id: string; mono?: boolean }[]> = {
  en: [
    { id: 'claude-code' },
    { id: 'openai-codex' },
    { id: 'grok-build-cli', mono: true },
    { id: 'cursor-cli', mono: true },
    { id: 'gemini-cli' },
    { id: 'kiro-cli' }
  ],
  zh: [
    { id: 'qwen-code' },
    { id: 'kimi-cli' },
    { id: 'deepseek-harness-cli' },
    { id: 'glm-acp-agent-cli', mono: true },
    { id: 'qoder-cli', mono: true },
    { id: 'trae-cli' }
  ]
}
const PROVIDER_ROWS: Record<DemoLocale, string[][]> = {
  en: [
    ['anthropic', 'openai', 'google', 'grok', 'mistral', 'openrouter', 'ollama'],
    ['deepseek', 'qwen', 'moonshot', 'zhipu', 'minimax', 'doubao', 'step']
  ],
  zh: [
    ['deepseek', 'qwen', 'moonshot', 'zhipu', 'minimax'],
    ['doubao', 'step', 'wenxin', 'mimo', 'longcat']
  ]
}
const FILES = [
  { label: 'PDF', tone: 'text-red-600 dark:text-red-400' },
  { label: 'DOCX', tone: 'text-blue-600 dark:text-blue-400' },
  { label: 'MD', tone: 'text-foreground' },
  { label: 'URL', tone: 'text-emerald-600 dark:text-emerald-400' }
]
const PAINTINGS = [lightTrails, y2kStreet, trainWindow]
// A gentle fan for stacked tiles; hover straightens and spreads them.
const FAN = ['-rotate-[8deg]', '-rotate-[5deg]', '-rotate-[2deg]', 'rotate-[2deg]', 'rotate-[5deg]', 'rotate-[8deg]']
const AVATARS = ['🧑‍💻', '📊', '✍️', '🎨', '🔬', '🌍', '⚖️']
// One line in each language the translation strip cycles through.
const PHRASES = [
  { lang: 'English', text: 'Ship the launch page today.' },
  { lang: '中文', text: '今天就把发布页上线。' },
  { lang: '日本語', text: '今日中にローンチページを公開しよう。' },
  { lang: 'Español', text: 'Publica la página de lanzamiento hoy.' },
  { lang: 'Deutsch', text: 'Bring die Launch-Seite heute live.' }
]

/** A card: an illustration filling the top, then the title and copy. */
function Card({
  className,
  visual,
  title,
  description,
  index
}: {
  className?: string
  visual: ReactNode
  title: ReactNode
  description: ReactNode
  index: number
}) {
  return (
    <m.li {...reveal(index)} className={cn('group min-w-0', className)}>
      <div className="glass-card flex h-full flex-col overflow-hidden rounded-[24px] transition-[transform,border-color] duration-300 ease-settle hover:-translate-y-1 hover:border-hairline-strong">
        <div
          aria-hidden="true"
          className="relative flex h-48 items-center justify-center overflow-hidden bg-[radial-gradient(120%_90%_at_50%_0%,color-mix(in_oklab,var(--color-foreground)_6%,transparent),transparent)]">
          {visual}
        </div>
        <div className="flex flex-1 flex-col p-6 pt-5">
          <h3 className="font-display text-xl leading-tight text-balance text-foreground">{title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-pretty text-muted-foreground zh:leading-6">{description}</p>
        </div>
      </div>
    </m.li>
  )
}

/** Cycles the translation strip's sentence while it is on screen. */
function useCycle(length: number, ms: number) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { amount: 0.4 })
  const reduced = useReducedMotion() ?? false
  const [index, setIndex] = useState(0)
  useEffect(() => {
    if (!inView || reduced) return
    const timer = setInterval(() => setIndex((value) => (value + 1) % length), ms)
    return () => clearInterval(timer)
  }, [inView, reduced, length, ms])
  return { ref, index }
}

const WhySection: FC = () => {
  const { t } = useTranslation()
  const { locale } = useDemoLocale()
  const { ref: stripRef, index: phrase } = useCycle(PHRASES.length, 1800)
  const copy = (key: string) => ({
    title: t(`highlights.${key}.title`),
    description: (
      <Trans
        i18nKey={`highlights.${key}.description`}
        components={{ highlight: <span className="font-medium text-foreground" /> }}
      />
    )
  })

  return (
    <section className="isolate bg-background relative overflow-hidden site-section">
      <div className="site-container relative z-10">
        <div className="mb-8 max-w-3xl sm:mb-12">
          <h2 className="mb-4 text-4xl font-display text-balance sm:text-5xl">
            <BlurInText text={t('highlights.title')} />
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg">{t('highlights.subtitle')}</p>
        </div>

        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
          {/* Lead card: the model count with two drifting rows of providers. */}
          <m.li {...reveal(0)} className="group min-w-0 md:col-span-2 lg:col-span-4">
            <div className="glass-card flex h-full flex-col overflow-hidden rounded-[24px] transition-[border-color] duration-300 hover:border-hairline-strong lg:flex-row">
              <div className="flex flex-col justify-between gap-6 p-7 lg:w-[42%]">
                <div className="flex items-baseline gap-5">
                  <div>
                    <p className="font-display text-6xl leading-none text-foreground tabular-nums">
                      {productStats.labels.models}
                    </p>
                    <p className="mt-2 text-xs text-muted-foreground">{t('home_page.stat_models')}</p>
                  </div>
                  <div>
                    <p className="font-display text-6xl leading-none text-muted-foreground/60 tabular-nums">
                      {productStats.labels.providers}
                    </p>
                    <p className="mt-2 text-xs text-muted-foreground">{t('home_page.stat_providers')}</p>
                  </div>
                </div>
                <div>
                  <h3 className="font-display text-xl leading-tight text-foreground">{copy('multi_model').title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-pretty text-muted-foreground zh:leading-6">
                    {copy('multi_model').description}
                  </p>
                </div>
              </div>
              <div
                aria-hidden="true"
                className="grid min-h-48 flex-1 content-center gap-3 py-8 [mask-image:linear-gradient(90deg,transparent,black_18%,black_82%,transparent)]">
                {PROVIDER_ROWS[locale].map((row, index) => (
                  <Marquee key={index} reverse={index === 1} seconds={28}>
                    {(hidden) => (
                      <ul aria-hidden={hidden || undefined} className="flex shrink-0 gap-3 pr-3">
                        {row.map((id) => (
                          // Provider logos are full-bleed tile artwork, so they fill the tile and take its rounding.
                          <li
                            key={id}
                            className="size-16 shrink-0 overflow-hidden rounded-2xl ring-1 ring-foreground/10 ring-inset">
                            <ProviderIcon id={id} className="size-full object-cover" />
                          </li>
                        ))}
                      </ul>
                    )}
                  </Marquee>
                ))}
              </div>
            </div>
          </m.li>

          <Card
            index={1}
            className="lg:col-span-2"
            {...copy('agents')}
            visual={
              <div className="flex items-center -space-x-3 transition-[gap] duration-500 ease-settle group-hover:space-x-1">
                {CLIS[locale].map(({ id, mono }, index) => (
                  <span
                    key={id}
                    className={cn(
                      TILE,
                      'size-16 rounded-2xl ring-4 ring-card transition-transform duration-500 ease-settle group-hover:rotate-0',
                      FAN[index]
                    )}>
                    <img src={cliIcon(id)} alt="" className={cn('size-8', mono && 'dark:invert')} />
                  </span>
                ))}
              </div>
            }
          />

          <Card
            index={2}
            className="lg:col-span-2"
            {...copy('images')}
            visual={
              <div className="relative h-36 w-60">
                {PAINTINGS.map((src, index) => (
                  <img
                    key={src}
                    src={src}
                    alt=""
                    loading="lazy"
                    className={cn(
                      'absolute top-0 left-1/2 h-36 w-28 rounded-2xl object-cover shadow-lg ring-4 ring-card transition-transform duration-500 ease-settle',
                      index === 0 &&
                        '-translate-x-[110%] -rotate-[9deg] group-hover:-translate-x-[125%] group-hover:-rotate-[14deg]',
                      index === 1 && 'z-10 -translate-x-1/2 group-hover:-translate-y-2 group-hover:scale-105',
                      index === 2 &&
                        'translate-x-[10%] rotate-[9deg] group-hover:translate-x-[25%] group-hover:rotate-[14deg]'
                    )}
                  />
                ))}
              </div>
            }
          />

          <Card
            index={3}
            className="lg:col-span-2"
            {...copy('assistants')}
            visual={
              <div className="flex flex-col items-center gap-3">
                <p className="font-display text-6xl leading-none text-foreground tabular-nums">
                  {productStats.labels.assistants}
                </p>
                <div className="flex -space-x-2">
                  {AVATARS.map((emoji, index) => (
                    <span
                      key={emoji}
                      className={cn(
                        TILE,
                        'size-10 rounded-full text-lg ring-2 ring-card transition-transform duration-300 group-hover:-translate-y-1'
                      )}
                      style={{ transitionDelay: `${index * 35}ms` }}>
                      {emoji}
                    </span>
                  ))}
                </div>
              </div>
            }
          />

          <Card
            index={4}
            className="lg:col-span-2"
            {...copy('knowledge')}
            visual={
              <div className="flex items-center -space-x-6 transition-[gap] duration-500 ease-settle group-hover:-space-x-2">
                {FILES.map((file, index) => (
                  <span
                    key={file.label}
                    className={cn(
                      TILE,
                      'h-28 w-[88px] flex-col justify-end gap-1.5 rounded-xl pb-3 shadow-md ring-4 ring-card transition-transform duration-500 ease-settle group-hover:rotate-0',
                      FAN[index + 1]
                    )}>
                    <span className="h-0.5 w-12 rounded-full bg-foreground/10" />
                    <span className="h-0.5 w-10 rounded-full bg-foreground/10" />
                    <span className="h-0.5 w-12 rounded-full bg-foreground/10" />
                    <span className={cn('mt-1.5 text-[10px] font-semibold', file.tone)}>{file.label}</span>
                  </span>
                ))}
              </div>
            }
          />

          {/* Closing strip: one sentence turning through languages. */}
          <m.li {...reveal(5)} className="min-w-0 md:col-span-2 lg:col-span-6">
            <div
              ref={stripRef}
              className="glass-card flex flex-col gap-6 overflow-hidden rounded-[24px] p-7 lg:flex-row lg:items-center lg:gap-12">
              <div className="lg:w-[38%]">
                <h3 className="font-display text-xl leading-tight text-foreground">{copy('documents').title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-pretty text-muted-foreground zh:leading-6">
                  {copy('documents').description}
                </p>
              </div>
              <div aria-hidden="true" className="flex flex-1 items-center gap-4 rounded-2xl bg-muted/60 px-6 py-5">
                <span className="shrink-0 rounded-full bg-foreground px-3 py-1 text-xs font-medium text-background">
                  {PHRASES[phrase].lang}
                </span>
                <ArrowRight className="size-4 shrink-0 text-muted-foreground" />
                <m.p
                  key={phrase}
                  initial={{ opacity: 0, y: 8, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 0.35 }}
                  className="min-w-0 truncate font-display text-2xl text-foreground sm:text-3xl">
                  {PHRASES[phrase].text}
                </m.p>
              </div>
            </div>
          </m.li>
        </ul>
      </div>
    </section>
  )
}

export default WhySection
