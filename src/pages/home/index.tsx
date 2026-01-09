import { FC, useEffect } from 'react'

import Footer from '@/components/website/Footer'
import { usePageMeta } from '@/hooks/usePageMeta'

import HomeBanner from './components/Banner'
import Contributors from './components/Contributors'
import Features from './components/Features'
import JoinCommunity from './components/JoinCommunity'
import Providers from './components/Providers'

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
      <HomeBanner />
      <Providers />
      <Features />
      <Contributors />
      <JoinCommunity />
      <Footer />
    </div>
  )
}

export default HomePage
