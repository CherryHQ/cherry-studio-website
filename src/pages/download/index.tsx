import './index.css'

import { FC, useRef } from 'react'
import { useTranslation } from 'react-i18next'

import Footer from '@/components/website/Footer'
import { usePageMeta } from '@/hooks/usePageMeta'
import { useVersionData } from '@/hooks/useVersionData'

import Changelog from './components/Changelog'
import DownloadButtons from './components/DownloadButtons'
import DownloadList from './components/DownloadList'
import IntelVersion from './components/IntelVersion'
import VersionInfo from './components/VersionInfo'

const DownloadPage: FC = () => {
  const { t } = useTranslation()
  usePageMeta('download')

  const otherDownloadsRef = useRef<HTMLDivElement>(null)
  const { loading, versionData, systemInfo, downloadUrls } = useVersionData()

  const scrollToOtherDownloads = () => {
    otherDownloadsRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="page-wrapper">
      {/* Download page content */}
      <section className="download-section">
        <div className="auto-container">
          <VersionInfo versionData={versionData} loading={loading} />
          {/* Main download buttons */}
          <DownloadButtons systemInfo={systemInfo} onOtherVersionsClick={scrollToOtherDownloads} />
          {/* Other downloads */}
          <div ref={otherDownloadsRef}>
            <DownloadList downloadUrls={downloadUrls} assets={versionData?.assets || []} />
          </div>
          {/* Cloud downloads */}
          <div className="cloud-downloads mt-10">
            <h2 className="cloud-download-title">{t('download_page.cloud_download')}</h2>
            <ul className="cloud-download-list">
              <li>
                <strong>{t('download_page.quark_drive')}：</strong>
                <a href="https://pan.quark.cn/s/4044324d0ecd" target="_blank" rel="noopener noreferrer">
                  {t('download_page.click_download')}
                </a>
              </li>
            </ul>
          </div>
          {/* Changelog */}
          <Changelog versionData={versionData} />
          {/* Intel Version */}
          <IntelVersion />
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default DownloadPage
