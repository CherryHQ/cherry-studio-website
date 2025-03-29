import './index.css'

import { FC, useEffect, useRef } from 'react'

import { script } from '@/assets/js/script'
import Footer from '@/components/website/Footer'
import Header from '@/components/website/Header'
import { usePreloader } from '@/hooks/usePreloader'
import { useVersionData } from '@/hooks/useVersionData'

import Changelog from './components/Changelog'
import DownloadButtons from './components/DownloadButtons'
import DownloadList from './components/DownloadList'
import VersionInfo from './components/VersionInfo'

const DownloadPage: FC = () => {
  const otherDownloadsRef = useRef<HTMLDivElement>(null)
  const { loading, versionData, systemInfo, downloadUrls } = useVersionData()

  usePreloader()

  useEffect(() => {
    setTimeout(script, 500)
  }, [])

  const scrollToOtherDownloads = () => {
    otherDownloadsRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      {/* Loading animation */}
      <div className="preloader">
        <div className="loader"></div>
      </div>

      <div className="page-wrapper">
        <Header />

        {/* Download page content */}
        <section className="download-section">
          <div className="auto-container">
            <VersionInfo versionData={versionData} loading={loading} />

            {/* Main download buttons */}
            <DownloadButtons systemInfo={systemInfo} onOtherVersionsClick={scrollToOtherDownloads} />

            {/* Cloud downloads */}
            <div className="cloud-downloads">
              <h2 className="cloud-download-title">网盘下载</h2>
              <ul className="cloud-download-list">
                <li>
                  <strong>夸克网盘：</strong>
                  <a href="https://pan.quark.cn/s/c8533a1ec63e" target="_blank" rel="noopener noreferrer">
                    点击下载
                  </a>
                </li>
              </ul>
            </div>

            {/* Changelog */}
            <Changelog versionData={versionData} />

            {/* Other downloads */}
            <div ref={otherDownloadsRef}>
              <DownloadList downloadUrls={downloadUrls} assets={versionData?.assets || []} />
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  )
}

export default DownloadPage
