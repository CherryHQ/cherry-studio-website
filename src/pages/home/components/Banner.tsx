import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Download } from 'lucide-react'
import { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import cherrysDashboard from '@/assets/images/resource/cherrys.webp'
import { fetchNotice, NoticeResponse } from '@/assets/js/notice'
import { Button } from '@/components/ui/button'

interface CarouselItem {
  tagline: string
  title: string
  subtitle: string
  description: string
}

// 打字机效果组件（带删除效果）
const Typewriter: FC<{
  text: string
  onComplete?: () => void
  typingSpeed?: number
  deleteSpeed?: number
}> = ({ text, onComplete, typingSpeed = 100, deleteSpeed = 50 }) => {
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [currentText, setCurrentText] = useState(text)

  // 当 text 变化时，开始删除当前文字
  useEffect(() => {
    if (text !== currentText && !isDeleting && displayText.length > 0) {
      setIsDeleting(true)
    } else if (text !== currentText && displayText.length === 0) {
      setCurrentText(text)
    }
  }, [text, currentText, isDeleting, displayText.length])

  useEffect(() => {
    if (isDeleting) {
      // 删除模式
      if (displayText.length > 0) {
        const timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1))
        }, deleteSpeed)
        return () => clearTimeout(timeout)
      } else {
        // 删除完成，切换到新文字
        setIsDeleting(false)
        setCurrentText(text)
      }
    } else {
      // 打字模式
      if (displayText.length < currentText.length) {
        const timeout = setTimeout(() => {
          setDisplayText(currentText.slice(0, displayText.length + 1))
        }, typingSpeed)
        return () => clearTimeout(timeout)
      } else if (displayText.length === currentText.length && currentText === text) {
        onComplete?.()
      }
    }
  }, [displayText, currentText, text, isDeleting, typingSpeed, deleteSpeed, onComplete])

  return (
    <span className="gradient-text">
      {displayText}
      <span className="bg-primary ml-1 inline-block h-[1em] w-[3px] animate-pulse align-middle" />
    </span>
  )
}

const HomeBanner: FC = () => {
  const { t, i18n } = useTranslation()
  const [notice, setNotice] = useState<NoticeResponse['data'] | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTypingComplete, setIsTypingComplete] = useState(false)

  // 根据语言获取轮播内容
  const getCarouselItems = (): CarouselItem[] => {
    if (i18n.language === 'zh-CN') {
      return [
        {
          tagline: '全能 AI 桌面客户端',
          title: 'Cherry Studio',
          subtitle: '一站式 AI 对话管理',
          description: '集成 OpenAI、Claude、Gemini、DeepSeek 等 300+ 主流模型，统一管理多平台 AI 对话'
        },
        {
          tagline: '数据安全 隐私无忧',
          title: '本地存储',
          subtitle: '您的数据由您掌控',
          description: '对话记录完全存储在本地，支持私有化部署，数据安全有保障'
        },
        {
          tagline: '打造专属 AI 大脑',
          title: '智能知识库',
          subtitle: '让 AI 更懂你',
          description: '导入文档、网页一键构建知识库，AI 精准理解您的业务场景'
        },
        {
          tagline: '开箱即用',
          title: '千款 AI 助手',
          subtitle: '效率提升 10 倍',
          description: '内置写作、编程、翻译等专业助手，覆盖工作学习全场景'
        }
      ]
    }
    return [
      {
        tagline: 'All-in-One AI Desktop Client',
        title: 'Cherry Studio',
        subtitle: 'Unified AI Management',
        description: 'Integrate 300+ models from OpenAI, Claude, Gemini, DeepSeek and more in one place'
      },
      {
        tagline: 'Your Data, Your Control',
        title: 'Local Storage',
        subtitle: '100% Privacy Protected',
        description: 'All conversations stored locally. Support private deployment. Your data never leaves your device'
      },
      {
        tagline: 'Build Your AI Brain',
        title: 'Knowledge Base',
        subtitle: 'AI That Understands You',
        description: 'Import docs and web pages to build custom knowledge. Get contextual AI responses'
      },
      {
        tagline: 'Ready to Use',
        title: '1000+ AI Assistants',
        subtitle: '10x Your Productivity',
        description: 'Built-in assistants for writing, coding, translation and more. Cover all your needs'
      }
    ]
  }

  const carouselItems = getCarouselItems()
  const currentItem = carouselItems[currentIndex]

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
    if (isTypingComplete) {
      const timeout = setTimeout(() => {
        setIsTypingComplete(false)
        setCurrentIndex((prev) => (prev + 1) % carouselItems.length)
      }, 2500)
      return () => clearTimeout(timeout)
    }
  }, [isTypingComplete, carouselItems.length])

  const handleTypeComplete = () => {
    setIsTypingComplete(true)
  }

  return (
    <section className="bg-background relative min-h-screen overflow-hidden pt-20">
      {/* Background Elements */}
      <div className="grid-pattern absolute inset-0 opacity-50" />

      {/* Gradient Orbs */}
      <div className="bg-primary/10 absolute top-1/4 left-1/4 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px]" />
      <div className="absolute top-3/4 right-1/4 h-[400px] w-[400px] translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/10 blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="pt-16 pb-8 text-center sm:pt-24 lg:pt-32">
          {/* Tagline */}
          <div className="mb-4 h-6">
            <AnimatePresence mode="wait">
              <motion.p
                key={`tagline-${currentIndex}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="text-primary text-sm font-medium tracking-widest uppercase">
                {currentItem.tagline}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Main Heading with Typewriter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-6">
            <h1 className="text-foreground text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              {currentItem.title}{' '}
              <Typewriter
                key={`${i18n.language}-${currentIndex}`}
                text={currentItem.subtitle}
                onComplete={handleTypeComplete}
              />
            </h1>
          </motion.div>

          {/* Description - Animated */}
          <div className="mx-auto mb-8 h-[60px] max-w-2xl">
            <AnimatePresence mode="wait">
              <motion.p
                key={currentIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="text-muted-foreground text-lg">
                {currentItem.description}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Notice */}
          {notice && notice.status && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-8"
              style={{
                color: notice.text_color,
                fontSize: `${notice.text_size}px`
              }}
              dangerouslySetInnerHTML={{ __html: notice.notice }}
            />
          )}

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col items-center justify-center gap-4 sm:flex-row">
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
          </motion.div>
        </div>

        {/* Product Screenshot */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative mt-8 sm:mt-12">
          <img src={cherrysDashboard} alt="Cherry Studio Dashboard" className="w-full rounded-xl shadow-2xl" />
        </motion.div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="from-background absolute right-0 bottom-0 left-0 h-32 bg-gradient-to-t to-transparent" />
    </section>
  )
}

export default HomeBanner
