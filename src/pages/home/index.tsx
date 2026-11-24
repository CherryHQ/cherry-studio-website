import type { FC } from 'react'
import { useTranslation } from 'react-i18next'

import Footer from '@/components/website/Footer'
import WebsiteBanner from '@/components/website/WebsiteBanner'
import { usePageMeta } from '@/hooks/usePageMeta'
import { isEnglishSite } from '@/utils/urls'
import AppsSection from './components/AppsSection'
import CommunitySection from './components/CommunitySection'
import ContributorsSection from './components/ContributorsSection'
import DownloadSection from './components/DownloadSection'
import FAQSection from './components/FAQSection'
import FeaturesSection from './components/FeaturesSection'
import FlagshipModelsSection from './components/FlagshipModelsSection'
import HeroSection from './components/HeroSection'
import HighlightsSection from './components/HighlightsSection'
import ProductPreview from './components/ProductPreview'
import ProvidersSection from './components/ProvidersSection'
import TeamCollaborationSection from './components/TeamCollaborationSection'
import TestimonialsSection from './components/TestimonialsSection'
import WhySection from './components/WhySection'

const HomePage: FC = () => {
  usePageMeta('home')
  const { i18n } = useTranslation()
  const isEn = isEnglishSite(i18n.resolvedLanguage || i18n.language)

  // 中文站额外展示国产旗舰模型与本地化功能入口。
  const sections = isEn
    ? [WhySection, TeamCollaborationSection, TestimonialsSection, ContributorsSection]
    : [
        FlagshipModelsSection,
        FeaturesSection,
        TeamCollaborationSection,
        TestimonialsSection,
        HighlightsSection,
        ContributorsSection
      ]

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main id="home-content" tabIndex={-1} className="pt-[60px]">
        <WebsiteBanner />
        <HeroSection />
        <ProvidersSection />
        <ProductPreview />
        <div className="bg-background [&>section+section]:border-t">
          {sections.map((Section, index) => (
            <Section key={index} />
          ))}
          <AppsSection />
          <FAQSection />
          <CommunitySection />
        </div>
        <DownloadSection />
      </main>
      <Footer />
    </div>
  )
}

export default HomePage
