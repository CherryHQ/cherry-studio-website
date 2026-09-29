import { type FC, Fragment } from 'react'
import { useTranslation } from 'react-i18next'

import Footer from '@/components/website/Footer'
import SectionDivider from '@/components/website/SectionDivider'
import { usePageMeta } from '@/hooks/usePageMeta'
import { isEnglishSite } from '@/utils/urls'
import CommunitySection from './components/CommunitySection'
import ContributorsSection from './components/ContributorsSection'
import FAQSection from './components/FAQSection'
import FeaturesSection from './components/FeaturesSection'
import FlagshipModelsSection from './components/FlagshipModelsSection'
import HeroSection from './components/HeroSection'
import HighlightsSection from './components/HighlightsSection'
import ProvidersSection from './components/ProvidersSection'
import TestimonialsSection from './components/TestimonialsSection'
import WhySection from './components/WhySection'

const HomePage: FC = () => {
  usePageMeta('home')
  const { i18n } = useTranslation()
  const isEn = isEnglishSite(i18n.resolvedLanguage || i18n.language)

  // 英文站与线上英文官网保持一致：特性区换成 “Why Choose Cherry Studio”，
  // 不再展示国产模型高亮与旧版 Highlights；中文站保持原有区块顺序。
  const sections = isEn
    ? [WhySection, ProvidersSection, TestimonialsSection, ContributorsSection]
    : [
        FlagshipModelsSection,
        FeaturesSection,
        ProvidersSection,
        TestimonialsSection,
        HighlightsSection,
        ContributorsSection
      ]

  return (
    <div className="bg-background min-h-screen">
      <HeroSection />
      {sections.map((Section, index) => (
        <Fragment key={index}>
          <SectionDivider />
          <Section />
        </Fragment>
      ))}
      <FAQSection />
      <CommunitySection />
      <Footer />
    </div>
  )
}

export default HomePage
