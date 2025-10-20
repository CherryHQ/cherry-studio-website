import { AnimatePresence, motion } from 'framer-motion'
import { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import cherrysDashboard from '@/assets/images/resource/cherrys.webp'
import { fetchNotice, NoticeResponse } from '@/assets/js/notice'
import { Ripple } from '@/components/ui/shadcn-io/ripple'

interface CarouselItem {
  titleKey: string
  headingKey: string
  subheadingKey: string
  descriptionKey: string
}

const carouselItems: CarouselItem[] = [
  {
    titleKey: 'banner.powerful_ai_assistant',
    headingKey: 'banner.cherry_studio_title',
    subheadingKey: 'banner.multi_provider_client',
    descriptionKey: 'banner.multi_provider_description'
  },
  {
    titleKey: 'banner.privacy_security',
    headingKey: 'banner.local_storage_title',
    subheadingKey: 'banner.no_privacy_leak',
    descriptionKey: 'banner.local_storage_description'
  },
  {
    titleKey: 'banner.personalized_knowledge_base',
    headingKey: 'banner.knowledge_base_integration_title',
    subheadingKey: 'banner.your_personal_assistant',
    descriptionKey: 'banner.knowledge_base_description'
  }
]

const HomeBanner: FC = () => {
  const { t } = useTranslation()
  const [notice, setNotice] = useState<NoticeResponse['data'] | null>(null)
  const [currentSlide, setCurrentSlide] = useState(0)

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
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselItems.length)
    }, 6000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative min-h-[80vh] overflow-visible bg-gradient-to-br from-[#ff5f5f] via-[#ff8f8f] to-[#ffc3c3] pb-[60px]">
      <Ripple className="z-0" mainCircleSize={500} mainCircleOpacity={0.3} numCircles={12} />
      <section className="relative z-10 pt-[140px]">
        <div className="mx-auto max-w-[1400px] px-4">
          <div className="relative flex min-h-[180px] flex-col items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-center">
                <h4 className="mb-2 text-lg font-semibold tracking-wide text-gray-900 uppercase">
                  {t(carouselItems[currentSlide].titleKey)}
                </h4>
                <h1 className="mb-4 text-5xl leading-tight font-black font-semibold text-gray-900 md:leading-tight">
                  {t(carouselItems[currentSlide].headingKey)} {t(carouselItems[currentSlide].subheadingKey)}
                </h1>
                <div className="mx-auto max-w-4xl text-lg leading-relaxed font-thin text-gray-800">
                  {t(carouselItems[currentSlide].descriptionKey)}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {notice && notice.status && (
            <div
              className="mx-auto mt-2 text-center"
              style={{
                color: notice.text_color,
                fontSize: `${notice.text_size}px`
              }}
              dangerouslySetInnerHTML={{ __html: notice.notice }}
            />
          )}

          <div className="mt-[35px] text-center">
            <Link
              to="/download"
              className="relative inline-block overflow-hidden rounded-[55px] bg-white px-[30px] py-[13px] text-lg leading-[30px] font-semibold text-[#ff5f5f] shadow-[0_4px_15px_rgba(0,0,0,0.1)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-gradient-to-r hover:from-[#ff5f5f] hover:to-[#ff8f8f] hover:text-white hover:shadow-[0_10px_30px_rgba(255,95,95,0.4)]">
              {t('banner.download_client')}
            </Link>
          </div>

          <div className="relative z-[2] mt-[30px] flex justify-center">
            <img src={cherrysDashboard} alt="Cherry Studio Dashboard" className="block w-full max-w-[1270px]" />
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomeBanner
