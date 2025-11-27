import './index.css'

import { Download, ExternalLink, FileText, Monitor } from 'lucide-react'
import { FC, useRef } from 'react'
import { useTranslation } from 'react-i18next'

import { BackgroundBeams } from '@/components/ui/shadcn-io/background-beams'
import Footer from '@/components/website/Footer'
import {
  EnterpriseDownloadUrls,
  EnterpriseSystemInfo,
  EnterpriseVersionData,
  useEnterpriseVersionData
} from '@/hooks/useEnterpriseVersionData'
import { usePageMeta } from '@/hooks/usePageMeta'

const GITCODE_RELEASE_URL = 'https://gitcode.com/CherryHQ/cherry-studio-enterprise/releases'

interface DownloadButtonProps {
  info: EnterpriseSystemInfo
}

const DownloadButton: FC<DownloadButtonProps> = ({ info }) => {
  const { t } = useTranslation()

  const getButtonLabel = () => {
    if (info.arch === 'arm64' && info.type.includes('macOS')) {
      return t('download_page.download_apple')
    }
    if (info.arch === 'x64' && info.type.includes('macOS')) {
      return t('download_page.download_intel')
    }
    return t('download_page.download_with_arch', { arch: info.arch.toUpperCase() })
  }

  return (
    <a href={info.url} className="enterprise-main-download-btn" target="_blank" rel="noopener noreferrer">
      <Download size={20} />
      <span>{getButtonLabel()}</span>
    </a>
  )
}

interface VersionInfoProps {
  versionData: EnterpriseVersionData | null
  loading: boolean
  error: string | null
}

const VersionInfo: FC<VersionInfoProps> = ({ versionData, loading, error }) => {
  const { t } = useTranslation()

  if (error) {
    return (
      <div className="enterprise-version-info">
        <h1>Cherry Studio Enterprise</h1>
      </div>
    )
  }

  return (
    <div className="enterprise-version-info">
      <h1>
        {loading
          ? t('download_page.loading_version')
          : versionData
            ? `Cherry Studio Enterprise ${versionData.version}`
            : t('download_page.version_error')}
      </h1>
      {versionData && (
        <p className="version-date">
          {t('download_page.published_at_label')}
          {versionData.publishedAt}
        </p>
      )}
    </div>
  )
}

const FallbackDownload: FC = () => {
  const { t } = useTranslation()

  return (
    <div className="enterprise-download-buttons">
      <p className="fallback-notice">
        {t('enterprise_page.beta.download.fallback_notice') || '无法获取版本信息，请前往 GitCode 下载'}
      </p>
      <div className="button-group">
        <a
          href={GITCODE_RELEASE_URL}
          className="enterprise-main-download-btn"
          target="_blank"
          rel="noopener noreferrer">
          <ExternalLink size={20} />
          <span>{t('enterprise_page.beta.download.goto_gitcode') || '前往 GitCode 下载'}</span>
        </a>
      </div>
    </div>
  )
}

interface DownloadButtonsProps {
  systemInfo: EnterpriseSystemInfo[] | null
  onOtherVersionsClick: () => void
}

const DownloadButtons: FC<DownloadButtonsProps> = ({ systemInfo, onOtherVersionsClick }) => {
  const { t } = useTranslation()

  const getSystemName = () => {
    if (!systemInfo || systemInfo.length === 0) return null
    const type = systemInfo[0].type
    if (type.includes('Windows')) return 'Windows'
    if (type.includes('macOS')) return 'macOS'
    if (type.includes('Linux')) return 'Linux'
    return type
  }

  return (
    <div className="enterprise-download-buttons">
      {systemInfo && systemInfo.length > 0 && (
        <div className="system-detection">
          <div className="detected-system">
            <Monitor size={18} />
            <span>
              {t('download_page.current_system')}: <strong>{getSystemName()}</strong>
            </span>
          </div>
        </div>
      )}
      <div className="button-group">
        {systemInfo && systemInfo.map((info) => <DownloadButton key={info.name} info={info} />)}
        <button className="enterprise-alt-btn" onClick={onOtherVersionsClick} type="button">
          {t('download_page.other_versions')}
        </button>
      </div>
    </div>
  )
}

interface DownloadListProps {
  downloadUrls: EnterpriseDownloadUrls | null
}

const DownloadList: FC<DownloadListProps> = ({ downloadUrls }) => {
  const { t } = useTranslation()

  if (!downloadUrls) return null

  return (
    <div className="other-downloads">
      <h2>{t('download_page.other_downloads_title')}</h2>
      <ul id="download-list">
        {Object.values(downloadUrls).map((group) => (
          <div key={group.title}>
            <h3>{group.title}</h3>
            {group.items.map((item: { name: string; url: string; desc: string }) => (
              <li key={item.name}>
                <button className="download-item-btn" onClick={() => window.open(item.url, '_blank')} type="button">
                  <span className="download-item-name">{item.desc}</span>
                  <span className="download-item-desc">{item.name}</span>
                </button>
              </li>
            ))}
          </div>
        ))}
      </ul>
    </div>
  )
}

const EnterpriseDownloadPage: FC = () => {
  const { t } = useTranslation()
  usePageMeta('enterprise')
  const otherDownloadsRef = useRef<HTMLDivElement>(null)
  const { loading, error, versionData, systemInfo, downloadUrls } = useEnterpriseVersionData()

  const scrollToOtherDownloads = () => {
    otherDownloadsRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const renderDownloadContent = () => {
    if (loading) return null
    if (error) return <FallbackDownload />
    return <DownloadButtons systemInfo={systemInfo} onOtherVersionsClick={scrollToOtherDownloads} />
  }

  return (
    <div className="enterprise-download-page enterprise-page">
      {/* Hero Section */}
      <section className="hero-section">
        <BackgroundBeams className="absolute inset-0 z-0" />
        <div className="relative z-10 container">
          <VersionInfo versionData={versionData} loading={loading} error={error} />
          {renderDownloadContent()}
        </div>
      </section>

      {/* Beta Notice Section - 直接复用企业版样式 */}
      <section className="beta-section">
        <div className="container">
          <div className="beta-content">
            <div className="beta-card">
              <h3>{t('enterprise_page.beta.demo.title')}</h3>
              <div className="card-content">
                <ul>
                  <li>
                    <strong>{t('enterprise_page.beta.demo.admin_portal')}</strong>
                    <a href="https://admin.demo.cherry-ai.com" target="_blank" rel="noopener noreferrer">
                      admin.demo.cherry-ai.com
                    </a>
                  </li>
                  <li>
                    <strong>{t('enterprise_page.beta.demo.account')}</strong>admin
                  </li>
                  <li>
                    <strong>{t('enterprise_page.beta.demo.password')}</strong>password
                  </li>
                </ul>
              </div>
            </div>

            <div className="beta-card">
              <h3>{t('enterprise_page.beta.download.title')}</h3>
              <div className="card-content">
                <ul className="server-info">
                  <li>{t('enterprise_page.beta.download.server_url')} https://api.demo.cherry-ai.com</li>
                  <li>
                    <strong>{t('enterprise_page.beta.demo.account')}</strong>user
                  </li>
                  <li>
                    <strong>{t('enterprise_page.beta.demo.password')}</strong>password
                  </li>
                </ul>
              </div>
            </div>

            <div className="beta-card">
              <h3>{t('enterprise_page.beta.manual.title')}</h3>
              <div className="card-content">
                <p>{t('enterprise_page.beta.manual.description')}</p>
                <a
                  href="https://docs.enterprise.cherry-ai.com/"
                  className="doc-link"
                  target="_blank"
                  rel="noopener noreferrer">
                  <span className="icon">
                    <FileText size={20} />
                  </span>
                  {t('enterprise_page.beta.manual.view_manual')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Other Downloads Section */}
      <section className="other-downloads-section" ref={otherDownloadsRef}>
        <div className="container">
          <DownloadList downloadUrls={downloadUrls} />
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default EnterpriseDownloadPage
