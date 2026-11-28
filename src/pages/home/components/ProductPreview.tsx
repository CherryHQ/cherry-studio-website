import { BookOpen, Bot, BrushIcon, MessageSquare, ServerIcon } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import agentDarkEn from '@/assets/images/screenshots/product-features-0819/agent-dark-en.webp'
import agentDarkZh from '@/assets/images/screenshots/product-features-0819/agent-dark-zh.webp'
import agentLightEn from '@/assets/images/screenshots/product-features-0819/agent-light-en.webp'
import agentLightZh from '@/assets/images/screenshots/product-features-0819/agent-light-zh.webp'
import chatDarkEn from '@/assets/images/screenshots/product-features-0819/chat-dark-en.webp'
import chatDarkZh from '@/assets/images/screenshots/product-features-0819/chat-dark-zh.webp'
import chatLightEn from '@/assets/images/screenshots/product-features-0819/chat-light-en.webp'
import chatLightZh from '@/assets/images/screenshots/product-features-0819/chat-light-zh.webp'
import drawingDarkEn from '@/assets/images/screenshots/product-features-0819/drawing-dark-en.webp'
import drawingDarkZh from '@/assets/images/screenshots/product-features-0819/drawing-dark-zh.webp'
import drawingLightEn from '@/assets/images/screenshots/product-features-0819/drawing-light-en.webp'
import drawingLightZh from '@/assets/images/screenshots/product-features-0819/drawing-light-zh.webp'
import knowledgeDarkEn from '@/assets/images/screenshots/product-features-0819/knowledge-dark-en.webp'
import knowledgeDarkZh from '@/assets/images/screenshots/product-features-0819/knowledge-dark-zh.webp'
import knowledgeLightEn from '@/assets/images/screenshots/product-features-0819/knowledge-light-en.webp'
import knowledgeLightZh from '@/assets/images/screenshots/product-features-0819/knowledge-light-zh.webp'
import providerDarkEn from '@/assets/images/screenshots/product-features-0819/provider-dark-en.webp'
import providerDarkZh from '@/assets/images/screenshots/product-features-0819/provider-dark-zh.webp'
import providerLightEn from '@/assets/images/screenshots/product-features-0819/provider-light-en.webp'
import providerLightZh from '@/assets/images/screenshots/product-features-0819/provider-light-zh.webp'
import { useTheme } from '@/hooks/useTheme'
import { cn } from '@/lib/utils'

interface FeatureTab {
  id: string
  icon: React.ReactNode
  screenshotDark: string
  screenshotDarkZh: string
  screenshotLight: string
  screenshotLightZh: string
}

const featureTabs: FeatureTab[] = [
  {
    id: 'agent',
    icon: <Bot className="h-4 w-4" />,
    screenshotDark: agentDarkEn,
    screenshotDarkZh: agentDarkZh,
    screenshotLight: agentLightEn,
    screenshotLightZh: agentLightZh
  },
  {
    id: 'chat',
    icon: <MessageSquare className="h-4 w-4" />,
    screenshotDark: chatDarkEn,
    screenshotDarkZh: chatDarkZh,
    screenshotLight: chatLightEn,
    screenshotLightZh: chatLightZh
  },
  {
    id: 'drawing',
    icon: <BrushIcon className="h-4 w-4" />,
    screenshotDark: drawingDarkEn,
    screenshotDarkZh: drawingDarkZh,
    screenshotLight: drawingLightEn,
    screenshotLightZh: drawingLightZh
  },
  {
    id: 'knowledge',
    icon: <BookOpen className="h-4 w-4" />,
    screenshotDark: knowledgeDarkEn,
    screenshotDarkZh: knowledgeDarkZh,
    screenshotLight: knowledgeLightEn,
    screenshotLightZh: knowledgeLightZh
  },
  {
    id: 'providers',
    icon: <ServerIcon className="h-4 w-4" />,
    screenshotDark: providerDarkEn,
    screenshotDarkZh: providerDarkZh,
    screenshotLight: providerLightEn,
    screenshotLightZh: providerLightZh
  }
]

export default function ProductPreview() {
  const { t, i18n } = useTranslation()
  const { isDark } = useTheme()
  const [activeTab, setActiveTab] = useState(featureTabs[0])
  const isZh = i18n.language.startsWith('zh')
  const localScreenshot = isDark ? activeTab.screenshotDarkZh : activeTab.screenshotLightZh
  const internationalScreenshot = isDark ? activeTab.screenshotDark : activeTab.screenshotLight

  return (
    <section
      id="home-capabilities"
      className="relative isolate scroll-mt-[60px] overflow-hidden border-b border-border bg-background text-foreground">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 -z-10 w-[65%] bg-[radial-gradient(circle_at_center,var(--input)_1px,transparent_1.5px)] [background-size:16px_16px] opacity-40 [mask-image:radial-gradient(ellipse_at_75%_50%,black_15%,transparent_76%)]"
      />
      <div className="site-container site-split site-section">
        <div>
          <p className="mb-4 font-mono text-xs tracking-widest text-primary uppercase">{t('home_page.preview')}</p>
          <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            {t('home_page.preview_title')}
          </h2>
          <p className="mt-4 max-w-md text-pretty text-sm leading-6 text-muted-foreground sm:text-base">
            {t('home_page.preview_intro')}
          </p>
        </div>
        <figure className="relative min-w-0">
          <div className="relative rounded-md border border-border bg-card">
            <figcaption className="flex items-center justify-between gap-2 border-b border-border px-4 py-3 font-mono text-xs text-muted-foreground">
              <span className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-primary" aria-hidden="true" />
                Cherry Studio
              </span>
              <span>{t('home_page.preview')}</span>
            </figcaption>
            <img
              src={isZh ? localScreenshot : internationalScreenshot}
              alt={t(`home_page.preview_${activeTab.id}`)}
              width={2408}
              height={1644}
              loading="lazy"
              className="block aspect-[2408/1644] w-full object-contain"
            />
            <div
              className="flex flex-wrap gap-1 border-t border-border p-2"
              role="group"
              aria-label={t('home_page.preview')}>
              {featureTabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  aria-pressed={activeTab.id === tab.id}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    'inline-flex cursor-pointer items-center gap-1.5 rounded-md px-2 py-2 text-xs font-medium transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-primary active:translate-y-px',
                    activeTab.id === tab.id
                      ? 'bg-primary/12 text-primary'
                      : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                  )}>
                  <span className="hidden sm:block" aria-hidden="true">
                    {tab.icon}
                  </span>
                  {t(`home_page.preview_${tab.id}`)}
                </button>
              ))}
            </div>
          </div>
        </figure>
      </div>
    </section>
  )
}
