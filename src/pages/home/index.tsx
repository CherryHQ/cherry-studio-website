import type { FC } from 'react'

import Footer from '@/components/website/Footer'
import WebsiteBanner from '@/components/website/WebsiteBanner'
import { usePageMeta } from '@/hooks/usePageMeta'
import CapabilitiesSection from './components/CapabilitiesSection'
import CommunitySection from './components/CommunitySection'
import ContributorsSection from './components/ContributorsSection'
import DownloadDock from './components/DownloadDock'
import DownloadSection from './components/DownloadSection'
import EverywhereSection from './components/EverywhereSection'
import FAQSection from './components/FAQSection'
import HeroSection from './components/HeroSection'
import ProvidersSection from './components/ProvidersSection'
import TeamCollaborationSection from './components/TeamCollaborationSection'
import TestimonialsSection from './components/TestimonialsSection'
import WhySection from './components/WhySection'

const HomePage: FC = () => {
  usePageMeta('home')

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main id="home-content" tabIndex={-1} className="pt-[60px]">
        <WebsiteBanner />
        <HeroSection />
        <ProvidersSection />
        <CapabilitiesSection />
        <EverywhereSection />
        <div className="bg-background [&>section]:border-t [&>section]:border-border">
          <WhySection />
          <TeamCollaborationSection />
          <TestimonialsSection />
          <ContributorsSection />
          <FAQSection />
          <CommunitySection />
        </div>
        <DownloadSection />
      </main>
      <DownloadDock />
      <Footer />
    </div>
  )
}

export default HomePage
