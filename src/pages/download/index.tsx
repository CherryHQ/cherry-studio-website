import './index.css'

import { FC, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'

import Footer from '@/components/website/Footer'
import { useVersionData } from '@/hooks/useVersionData'

import Changelog from './components/Changelog'
import DownloadButtons from './components/DownloadButtons'
import DownloadList from './components/DownloadList'
import VersionInfo from './components/VersionInfo'

const DownloadPage: FC = () => {
  const { t } = useTranslation()
  const otherDownloadsRef = useRef<HTMLDivElement>(null)
  const { loading, versionData, systemInfo, downloadUrls } = useVersionData()

  useEffect(() => {
    const handleFocus = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    window.addEventListener('focus', handleFocus)
    return () => {
      window.removeEventListener('focus', handleFocus)
    }
  }, [])

  const scrollToOtherDownloads = () => {
    otherDownloadsRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="page-wrapper">
      {/* Download page content */}
      <section className="download-section" style={{ marginTop: 50 }}>
        <div className="auto-container">
          <VersionInfo versionData={versionData} loading={loading} />
          {/* Main download buttons */}
          <DownloadButtons systemInfo={systemInfo} onOtherVersionsClick={scrollToOtherDownloads} />
          {/* Cloud downloads */}
          <div className="cloud-downloads">
            <h2 className="cloud-download-title">{t('download_page.cloud_download')}</h2>
            <ul className="cloud-download-list">
              <li>
                <strong>{t('download_page.quark_drive')}：</strong>
                <a href="https://pan.quark.cn/s/c8533a1ec63e" target="_blank" rel="noopener noreferrer">
                  {t('download_page.click_download')}
                </a>
              </li>
            </ul>
          </div>
          {/* Other downloads */}
          <div ref={otherDownloadsRef}>
            <DownloadList downloadUrls={downloadUrls} assets={versionData?.assets || []} />
          </div>
          {/* Changelog */}
          <Changelog versionData={versionData} />
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default DownloadPage
