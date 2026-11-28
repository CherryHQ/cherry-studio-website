import { Bot, Boxes, FileText, Library, Sparkles, WandSparkles } from 'lucide-react'
import type { FC, ReactNode } from 'react'
import { Trans, useTranslation } from 'react-i18next'

import lightTrails from '@/assets/images/paintings/light-trails.webp'
import trainWindow from '@/assets/images/paintings/train-window.webp'
import y2kStreet from '@/assets/images/paintings/y2k-street.webp'
import { cliIcon } from '@/components/demos/primitives/brand'
import ProviderIcon from '@/components/demos/primitives/ProviderIcon'
import BlurInText from '@/components/website/BlurInText'
import FeatureBento from '@/components/website/FeatureBento'
import { cn } from '@/lib/utils'

const TILE = 'flex items-center justify-center rounded-xl bg-background shadow-[inset_0_0_0_1px_var(--color-border)]'
// Hover lifts each piece a little further than the last, so the cluster fans out.
const LIFT = 'transition-transform duration-300 ease-out group-hover:-translate-y-1'

const CLIS = [
  { id: 'claude-code' },
  { id: 'openai-codex' },
  { id: 'grok-build-cli', mono: true },
  { id: 'cursor-cli', mono: true },
  { id: 'gemini-cli' },
  { id: 'kiro-cli' }
]
const PROVIDERS = [
  'anthropic',
  'openai',
  'google',
  'deepseek',
  'qwen',
  'moonshot',
  'mistral',
  'zhipu',
  'ollama',
  'grok'
]
const FILES = [
  { label: 'PDF', className: 'bg-red-500/12 text-red-600 dark:text-red-400' },
  { label: 'DOCX', className: 'bg-blue-500/12 text-blue-600 dark:text-blue-400' },
  { label: 'MD', className: 'bg-foreground/8 text-foreground' },
  { label: 'URL', className: 'bg-emerald-500/12 text-emerald-600 dark:text-emerald-400' }
]
const PAINTINGS = [lightTrails, y2kStreet, trainWindow]
const AVATARS = ['🧑‍💻', '📊', '✍️', '🎨', '🔬', '🌍', '⚖️', '🧠']
const LANGUAGES = ['English', '中文', '日本語', 'Español', 'Deutsch']

const visuals: Record<string, ReactNode> = {
  'highlights.agents': (
    <div className="flex -space-x-2">
      {CLIS.map(({ id, mono }, index) => (
        <span
          key={id}
          className={cn(TILE, LIFT, 'size-12 rounded-2xl ring-4 ring-card')}
          style={{ transitionDelay: `${index * 30}ms` }}>
          <img src={cliIcon(id)} alt="" className={cn('size-6', mono && 'dark:invert')} />
        </span>
      ))}
    </div>
  ),
  'highlights.multi_model': (
    <div className="grid grid-cols-5 gap-2">
      {PROVIDERS.map((id, index) => (
        <span key={id} className={cn(TILE, LIFT, 'size-9')} style={{ transitionDelay: `${index * 20}ms` }}>
          <ProviderIcon id={id} className="size-[18px]" />
        </span>
      ))}
    </div>
  ),
  'highlights.knowledge': (
    <div className="flex items-end gap-2">
      {FILES.map((file, index) => (
        <span
          key={file.label}
          className={cn(TILE, LIFT, 'h-16 w-12 flex-col justify-end gap-1 pb-2')}
          style={{ transitionDelay: `${index * 30}ms` }}>
          <span className="h-0.5 w-6 rounded-full bg-foreground/10" />
          <span className="h-0.5 w-5 rounded-full bg-foreground/10" />
          <span className={cn('mt-1 rounded px-1 py-0.5 text-[9px] font-semibold', file.className)}>{file.label}</span>
        </span>
      ))}
    </div>
  ),
  'highlights.images': (
    <div className="relative h-24 w-48">
      {PAINTINGS.map((src, index) => (
        <img
          key={src}
          src={src}
          alt=""
          loading="lazy"
          className="absolute top-1 h-20 w-16 rounded-xl object-cover shadow-md ring-2 ring-card transition-transform duration-300 ease-out"
          style={{ left: index * 44, rotate: `${(index - 1) * 8}deg`, zIndex: index === 1 ? 2 : 1 }}
        />
      ))}
    </div>
  ),
  'highlights.assistants': (
    <div className="grid grid-cols-4 gap-2">
      {AVATARS.map((emoji, index) => (
        <span
          key={emoji}
          className={cn(TILE, LIFT, 'size-10 rounded-full text-lg')}
          style={{ transitionDelay: `${index * 20}ms` }}>
          {emoji}
        </span>
      ))}
    </div>
  ),
  'highlights.documents': (
    <div className="flex max-w-xs flex-wrap gap-1.5">
      {LANGUAGES.map((language, index) => (
        <span
          key={language}
          className={cn(
            TILE,
            LIFT,
            'h-8 rounded-full px-3 text-xs font-medium',
            index === 0 && 'bg-foreground text-background shadow-none'
          )}
          style={{ transitionDelay: `${index * 25}ms` }}>
          {language}
        </span>
      ))}
    </div>
  )
}

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
      <div className="site-container relative z-10">
        <div className="mb-8 max-w-3xl sm:mb-12">
          <h2 className="mb-4 text-4xl font-display text-balance sm:text-5xl">
            <BlurInText text={t('highlights.title')} />
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg">{t('highlights.subtitle')}</p>
        </div>

        <FeatureBento
          items={whyItems.map((item) => ({
            key: item.key,
            icon: item.icon,
            visual: visuals[item.key],
            title: t(`${item.key}.title`),
            description: (
              <Trans
                i18nKey={`${item.key}.description`}
                components={{ highlight: <span className="font-medium text-foreground" /> }}
              />
            )
          }))}
        />
      </div>
    </section>
  )
}

export default WhySection
