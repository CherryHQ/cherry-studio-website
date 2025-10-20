import { FC, useEffect } from 'react'

import Footer from '@/components/website/Footer'
import { usePageMeta } from '@/hooks/usePageMeta'

import HomeBanner from './components/Banner'
import Contributors from './components/Contributors'
import Features from './components/Features'
import JoinCommunity from './components/JoinCommunity'
import Project from './components/Project'
import Providers from './components/Providers'

const HomePage: FC = () => {
  // 使用页面元数据 hook
  usePageMeta('home')

  useEffect(() => {
    // 处理页面加载时的哈希值
    const hash = window.location.hash
    if (hash) {
      // 等待页面渲染完成后再滚动
      setTimeout(() => {
        const element = document.getElementById(hash.substring(1))
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 100)
    }
  }, [])

  return (
    <>
      <div className="page-wrapper">
        <HomeBanner />
        <Providers />
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
