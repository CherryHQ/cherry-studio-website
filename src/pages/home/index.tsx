import { FC } from 'react'

import Footer from '@/components/website/Footer'
import SectionDivider from '@/components/website/SectionDivider'
import { usePageMeta } from '@/hooks/usePageMeta'

import CommunitySection from './components/CommunitySection'
import ContributorsSection from './components/ContributorsSection'
import FeaturesSection from './components/FeaturesSection'
import HeroSection from './components/HeroSection'
import ProvidersSection from './components/ProvidersSection'
import TestimonialsSection from './components/TestimonialsSection'

const HomePage: FC = () => {
  usePageMeta('home')

  return (
    <div className="bg-background min-h-screen">
      <HeroSection />
      <SectionDivider />
      <FeaturesSection />
      <SectionDivider />
      <ProvidersSection />
      <SectionDivider />
      <TestimonialsSection />
      <SectionDivider />
      <ContributorsSection />
      <CommunitySection />
      <Footer />
    </div>
  )
}

export default HomePage
