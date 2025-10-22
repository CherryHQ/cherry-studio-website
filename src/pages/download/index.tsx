import './index.css'

import { FC, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'

import intelLogo from '@/assets/images/cherry-studio-intel-logo.webp'
import Footer from '@/components/website/Footer'
import { usePageMeta } from '@/hooks/usePageMeta'
import { useVersionData } from '@/hooks/useVersionData'

import Changelog from './components/Changelog'
import DownloadButtons from './components/DownloadButtons'
import DownloadList from './components/DownloadList'
import VersionInfo from './components/VersionInfo'

const DownloadPage: FC = () => {
  const { t } = useTranslation()
  usePageMeta('download')

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
      <section className="download-section">
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
                <a href="https://pan.quark.cn/s/4044324d0ecd" target="_blank" rel="noopener noreferrer">
                  {t('download_page.click_download')}
                </a>
              </li>
            </ul>
          </div>
          {/* Other downloads */}
          <div ref={otherDownloadsRef}>
            <DownloadList downloadUrls={downloadUrls} assets={versionData?.assets || []} />
          </div>
          {/* Intel Version */}
          <div className="intel-version">
            <div className="intel-version-header">
              <h2 className="intel-version-title">
                <img src={intelLogo} alt={t('download_page.intel_version.title')} />
                {t('download_page.intel_version.title')}
              </h2>
              <div className="intel-version-subtitle">{t('download_page.intel_version.subtitle')}</div>
              <div className="intel-version-description">{t('download_page.intel_version.description')}</div>
            </div>

            <div className="intel-features">
              <div className="intel-feature-item">
                <div className="intel-feature-title">{t('download_page.intel_version.features.local_model.title')}</div>
                <div className="intel-feature-description">
                  {t('download_page.intel_version.features.local_model.description')}
                </div>
              </div>
              <div className="intel-feature-item">
                <div className="intel-feature-title">
                  {t('download_page.intel_version.features.long_context.title')}
                </div>
                <div className="intel-feature-description">
                  {t('download_page.intel_version.features.long_context.description')}
                </div>
              </div>
              <div className="intel-feature-item">
                <div className="intel-feature-title">
                  {t('download_page.intel_version.features.knowledge_base.title')}
                </div>
                <div className="intel-feature-description">
                  {t('download_page.intel_version.features.knowledge_base.description')}
                </div>
              </div>
              <div className="intel-feature-item">
                <div className="intel-feature-title">
                  {t('download_page.intel_version.features.protocol_extension.title')}
                </div>
                <div className="intel-feature-description">
                  {t('download_page.intel_version.features.protocol_extension.description')}
                </div>
              </div>
            </div>

            <div className="intel-download-section">
              <div className="intel-download-buttons gap-2">
                <div className="intel-download-button">
                  <a href="https://pan.quark.cn/s/705e01ff21d9" target="_blank" rel="noopener noreferrer">
                    {t('download_page.quark_drive')}
                  </a>
                </div>
                <div className="intel-download-button">
                  <a
                    href="https://1drv.ms/f/c/100833ac71368975/Eg6uwM0KlbhKuDIDzXnQjSoBEYHlX7lFpkvdWSZVnMtmtg"
                    target="_blank"
                    rel="noopener noreferrer">
                    OneDrive
                  </a>
                </div>
              </div>
            </div>
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
