import type { FC } from 'react'

import Footer from '@/components/website/Footer'
import SectionDivider from '@/components/website/SectionDivider'
import { usePageMeta } from '@/hooks/usePageMeta'
import CommunitySection from './components/CommunitySection'
import ContributorsSection from './components/ContributorsSection'
import FAQSection from './components/FAQSection'
import FeaturesSection from './components/FeaturesSection'
import FreeModelsSection from './components/FreeModelsSection'
import HeroSection from './components/HeroSection'
import HighlightsSection from './components/HighlightsSection'
import ProvidersSection from './components/ProvidersSection'
import TestimonialsSection from './components/TestimonialsSection'

const HomePage: FC = () => {
  usePageMeta('home')

  return (
    <div className="bg-background min-h-screen">
      <HeroSection />
      <SectionDivider />
      <FreeModelsSection />
      <SectionDivider />
      <FeaturesSection />
      <SectionDivider />
      <ProvidersSection />
      <SectionDivider />
      <TestimonialsSection />
      <SectionDivider />
      <HighlightsSection />
      <SectionDivider />
      <ContributorsSection />
      <FAQSection />
      <CommunitySection />
      <Footer />
    </div>
  )
}

export default HomePage
