import { ArrowRight, Bot, BrushIcon, Download, MessageSquare, ServerIcon } from 'lucide-react'
import { FC, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { annotate } from 'rough-notation'

import aiCodingDark from '@/assets/images/screenshots/ai-coding-dark.png'
import aiCodingLight from '@/assets/images/screenshots/ai-coding-light.png'
import aiPaintingsDark from '@/assets/images/screenshots/ai-paintings-dark.png'
import aiPaintingsLight from '@/assets/images/screenshots/ai-paintings-light.png'
import aiProvidersDark from '@/assets/images/screenshots/ai-providers-dark.png'
import aiProvidersLight from '@/assets/images/screenshots/ai-providers-light.png'
import homePageDark from '@/assets/images/screenshots/home-page-dark.png'
import homePageLight from '@/assets/images/screenshots/home-page-light.png'
import { fetchNotice, NoticeResponse } from '@/assets/js/notice'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useTheme } from '@/hooks/useTheme'

interface FeatureTab {
  id: string
  labelZh: string
  labelEn: string
  icon: React.ReactNode
  screenshotDark: string
  screenshotLight: string
}

const featureTabs: FeatureTab[] = [
  {
    id: 'chat',
    labelZh: 'AI 对话',
    labelEn: 'AI Chat',
    icon: <MessageSquare className="h-4 w-4" />,
    screenshotDark: homePageDark,
    screenshotLight: homePageLight
  },
  {
    id: 'coding',
    labelZh: 'AI 编程',
    labelEn: 'AI Coding',
    icon: <Bot className="h-4 w-4" />,
    screenshotDark: aiCodingDark,
    screenshotLight: aiCodingLight
  },
  {
    id: 'paintings',
    labelZh: 'AI 绘画',
    labelEn: 'AI Art',
    icon: <BrushIcon className="h-4 w-4" />,
    screenshotDark: aiPaintingsDark,
    screenshotLight: aiPaintingsLight
  },
  {
    id: 'providers',
    labelZh: '多服务商',
    labelEn: 'Providers',
    icon: <ServerIcon className="h-4 w-4" />,
    screenshotDark: aiProvidersDark,
    screenshotLight: aiProvidersLight
  }
]

const HeroSection: FC = () => {
  const { t, i18n } = useTranslation()
  const { isDark } = useTheme()
  const [notice, setNotice] = useState<NoticeResponse['data'] | null>(null)
  const [activeTab, setActiveTab] = useState('chat')
  const [isPaused, setIsPaused] = useState(false)

  const isZh = i18n.language === 'zh-CN'

  // Auto-switch tabs every 5 seconds
  useEffect(() => {
    if (isPaused) return

    const interval = setInterval(() => {
      setActiveTab((current) => {
        const currentIndex = featureTabs.findIndex((tab) => tab.id === current)
        const nextIndex = (currentIndex + 1) % featureTabs.length
        return featureTabs[nextIndex].id
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [isPaused])

  const ref1 = useRef<HTMLSpanElement>(null)
  const ref2 = useRef<HTMLSpanElement>(null)
  const ref3 = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const getNotices = async () => {
      const noticeContent = await fetchNotice()
      if (noticeContent?.status) {
        setNotice(noticeContent)
      }
    }
    getNotices()
  }, [])

  useEffect(() => {
    if (ref1.current && ref2.current && ref3.current) {
      const a1 = annotate(ref1.current, {
        type: 'underline',
        color: '#f472b6',
        strokeWidth: 2,
        padding: 2
      })
      const a2 = annotate(ref2.current, {
        type: 'underline',
        color: '#22d3ee',
        strokeWidth: 2,
        padding: 2
      })
      const a3 = annotate(ref3.current, {
        type: 'underline',
        color: '#a78bfa',
        strokeWidth: 2,
        padding: 2
      })

      a1.show()
      a2.show()
      a3.show()

      return () => {
        a1.remove()
        a2.remove()
        a3.remove()
      }
    }
  }, [isZh])

  return (
    <section className="bg-background relative min-h-screen overflow-hidden pt-20">
      {/* Subtle gradient background */}
      <div className="via-primary/[0.02] absolute inset-0 bg-gradient-to-b from-transparent to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="pt-16 pb-8 text-center sm:pt-24 lg:pt-32">
          {/* Main Heading */}
          <h1 className="text-foreground mb-6 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
            {isZh ? 'Agentic AI 全平台客户端' : 'Agentic AI for Desktop & Mobile'}
          </h1>

          {/* Subtitle */}
          <p className="text-muted-foreground mx-auto mb-10 max-w-2xl text-lg">
            {isZh ? (
              <>
                <span ref={ref1}>AI Agent</span>
                {' + '}
                <span ref={ref2}>Coding Agent</span>
                {' + '}
                <span ref={ref3}>300+ 智能助手</span>
                ，统一接入主流大模型
              </>
            ) : (
              <>
                <span ref={ref1}>AI Agent</span>
                {' + '}
                <span ref={ref2}>Coding Agent</span>
                {' + '}
                <span ref={ref3}>300+ assistants</span>, unified access to frontier LLMs.
              </>
            )}
          </p>

          {/* Notice */}
          {notice && notice.status && (
            <div
              className="mb-8"
              style={{
                color: notice.text_color,
                fontSize: `${notice.text_size}px`
              }}
              dangerouslySetInnerHTML={{ __html: notice.notice }}
            />
          )}

          {/* CTA Buttons */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button variant="glow" size="lg" asChild>
              <Link to="/download" className="gap-2">
                <Download className="h-5 w-5" />
                {t('banner.download_client')}
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="https://docs.cherry-ai.com" target="_blank" rel="noopener noreferrer" className="gap-2">
                {t('nav.docs')}
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Feature Tabs */}
      <div
        className="relative mx-auto mt-16 max-w-6xl px-4 sm:mt-20 sm:px-6 lg:px-8"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}>
        {/* Tab Navigation */}
        <div className="mb-6 flex justify-center">
          <div className="bg-muted/50 inline-flex gap-1 rounded-full p-1 backdrop-blur-sm">
            {featureTabs.map((tab) => (
              <button
                type="button"
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200',
                  activeTab === tab.id
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                )}>
                {tab.icon}
                <span>{isZh ? tab.labelZh : tab.labelEn}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Screenshot Display */}
        <div className="relative overflow-hidden rounded-lg">
          {featureTabs.map((tab) => (
            <img
              key={tab.id}
              src={isDark ? tab.screenshotDark : tab.screenshotLight}
              alt={isZh ? tab.labelZh : tab.labelEn}
              className={cn(
                'w-full transition-opacity duration-300',
                activeTab === tab.id ? 'block opacity-100' : 'hidden opacity-0'
              )}
            />
          ))}
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="from-background absolute right-0 bottom-0 left-0 h-48 bg-gradient-to-t to-transparent" />
    </section>
  )
}

export default HeroSection
