import { FC, useEffect } from 'react'

import Footer from '@/components/website/Footer'
import { usePageMeta } from '@/hooks/usePageMeta'

import CommunitySection from './components/CommunitySection'
import ContributorsSection from './components/ContributorsSection'
import FeaturesSection from './components/FeaturesSection'
import HeroSection from './components/HeroSection'
import ProvidersSection from './components/ProvidersSection'

const HomePage: FC = () => {
  usePageMeta('home')

  useEffect(() => {
    const hash = window.location.hash
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash.substring(1))
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 100)
    }
  }, [])

  return (
    <div className="bg-background min-h-screen">
      <HeroSection />
      <ProvidersSection />
      <FeaturesSection />
      <ContributorsSection />
      <CommunitySection />
      <Footer />
    </div>
  )
}

export default HomePage
