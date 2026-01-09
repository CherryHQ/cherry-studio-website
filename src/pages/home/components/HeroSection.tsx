import { ArrowRight, Download } from 'lucide-react'
import { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import screenshotDark from '@/assets/images/screenshots/home-page-dark.png'
import screenshotLight from '@/assets/images/screenshots/home-page-light.png'
import { fetchNotice, NoticeResponse } from '@/assets/js/notice'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/hooks/useTheme'

const HeroSection: FC = () => {
  const { t, i18n } = useTranslation()
  const { isDark } = useTheme()
  const [notice, setNotice] = useState<NoticeResponse['data'] | null>(null)

  const isZh = i18n.language === 'zh-CN'

  useEffect(() => {
    const getNotices = async () => {
      const noticeContent = await fetchNotice()
      if (noticeContent?.status) {
        setNotice(noticeContent)
      }
    }
    getNotices()
  }, [])

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
            {isZh
              ? 'AI Agent + Coding Agent + 300+ 智能助手，统一接入主流大模型'
              : 'AI Agent + Coding Agent + 300+ assistants, unified access to frontier LLMs.'}
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

      {/* Product Screenshot */}
      <div className="relative mx-auto mt-16 max-w-6xl px-4 sm:mt-20 sm:px-6 lg:px-8">
        <img src={isDark ? screenshotDark : screenshotLight} alt="Cherry Studio Dashboard" className="w-full" />
      </div>

      {/* Bottom Gradient Fade */}
      <div className="from-background absolute right-0 bottom-0 left-0 h-48 bg-gradient-to-t to-transparent" />
    </section>
  )
}

export default HeroSection
