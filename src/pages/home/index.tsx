import './index.css'

import { FC } from 'react'

import Footer from '@/components/website/Footer'

import HomeBanner from './components/Banner'
import Contributors from './components/Contributors'
import Features from './components/Features'
import JoinCommunity from './components/JoinCommunity'
import Project from './components/Project'
import Sponsors from './components/Sponsors'

const HomePage: FC = () => {
  return (
    <>
      <div className="page-wrapper">
        <HomeBanner />
        <Sponsors />
        <Features />
        <Project />
        <Contributors />
        <JoinCommunity />
        <Footer />
      </div>
      {/* <!--Scroll to top--> */}
      <div className="scroll-to-top scroll-to-target" data-target="html">
        <span className="fa fa-arrow-up"></span>
      </div>
      <div id="copy-message" className="copy-message" style={{ display: 'none' }}>
        已复制 RSS 链接!
      </div>
    </>
  )
}

export default HomePage
