import { Download, ExternalLink, FileText, Monitor } from 'lucide-react'
import { type FC, useRef } from 'react'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components/ui/button'
import { BackgroundBeams } from '@/components/ui/shadcn-io/background-beams'
import Footer from '@/components/website/Footer'
import {
  type EnterpriseDownloadUrls,
  type EnterpriseSystemInfo,
  type EnterpriseVersionData,
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
    <Button asChild variant="glow" size="lg">
      <a href={info.url} target="_blank" rel="noopener noreferrer" className="gap-2.5">
        <Download className="h-5 w-5" />
        <span>{getButtonLabel()}</span>
      </a>
    </Button>
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
      <div className="relative z-10 mx-auto mb-10 max-w-4xl text-center">
        <h1 className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-3xl font-bold text-transparent sm:text-4xl lg:text-5xl">
          Cherry Studio Enterprise
        </h1>
      </div>
    )
  }

  return (
    <div className="relative z-10 mx-auto mb-10 max-w-4xl text-center">
      <h1 className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-3xl leading-tight font-bold text-transparent sm:text-4xl lg:text-5xl">
        {loading
          ? t('download_page.loading_version')
          : versionData
            ? `Cherry Studio Enterprise ${versionData.version}`
            : t('download_page.version_error')}
      </h1>
      {versionData && (
        <p className="mt-4 text-lg text-white/70">
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
    <div className="mx-auto max-w-2xl rounded-2xl border border-white/10 bg-white/5 p-10 text-center backdrop-blur-xl">
      <p className="mb-5 text-[15px] text-white/80">
        {t('enterprise_page.beta.download.fallback_notice') || '无法获取版本信息，请前往 GitCode 下载'}
      </p>
      <Button asChild variant="glow" size="lg">
        <a href={GITCODE_RELEASE_URL} target="_blank" rel="noopener noreferrer" className="gap-2.5">
          <ExternalLink className="h-5 w-5" />
          <span>{t('enterprise_page.beta.download.goto_gitcode') || '前往 GitCode 下载'}</span>
        </a>
      </Button>
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
    <div className="mx-auto max-w-2xl rounded-2xl border border-white/10 bg-white/5 p-10 backdrop-blur-xl">
      {systemInfo && systemInfo.length > 0 && (
        <div className="mb-6 flex items-center justify-center gap-2 text-[15px] text-white/80">
          <Monitor className="h-[18px] w-[18px] text-blue-400" />
          <span>
            {t('download_page.current_system')}: <strong className="text-white">{getSystemName()}</strong>
          </span>
        </div>
      )}
      <div className="flex flex-wrap items-center justify-center gap-3">
        {systemInfo?.map((info) => (
          <DownloadButton key={info.name} info={info} />
        ))}
        <Button
          variant="outline"
          size="lg"
          onClick={onOtherVersionsClick}
          className="border-white/30 bg-transparent text-white/90 hover:border-white/50 hover:bg-white/10 hover:text-white">
          {t('download_page.other_versions')}
        </Button>
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
    <div className="border-border bg-card rounded-2xl border p-8 shadow-sm">
      <h2 className="text-foreground mb-10 text-center text-3xl font-bold">
        {t('download_page.other_downloads_title')}
      </h2>
      <ul className="space-y-0">
        {Object.values(downloadUrls).map((group) => (
          <div key={group.title}>
            <h3 className="border-primary text-foreground mt-8 mb-4 border-l-4 pl-4 text-xl font-semibold first:mt-0">
              {group.title}
            </h3>
            {group.items.map((item: { name: string; url: string; desc: string }) => (
              <li key={item.name} className="mb-4">
                <button
                  className="border-border bg-secondary/30 hover:border-primary/30 hover:bg-primary/5 hover:text-primary w-full rounded-xl border px-5 py-4 text-left transition-all duration-200"
                  onClick={() => window.open(item.url, '_blank')}
                  type="button">
                  <span className="text-foreground mr-2.5 text-sm font-bold">{item.desc}</span>
                  <span className="text-muted-foreground text-sm">{item.name}</span>
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
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0a0e27] to-[#1a1f3a] px-6 pt-32 pb-20 text-center">
        <BackgroundBeams className="absolute inset-0 z-0" />
        <div className="relative z-10 mx-auto max-w-6xl">
          <VersionInfo versionData={versionData} loading={loading} error={error} />
          {renderDownloadContent()}
        </div>
      </section>

      {/* Beta Notice Section */}
      <section className="border-border bg-secondary/30 border-t px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 md:grid-cols-3">
            {/* Demo Card */}
            <div className="border-border bg-card flex h-full flex-col rounded-xl border p-7 shadow-sm">
              <h3 className="text-foreground mb-5 flex items-center gap-2 text-base font-semibold">
                <span className="bg-primary h-4 w-1 rounded" />
                {t('enterprise_page.beta.demo.title')}
              </h3>
              <div className="text-muted-foreground flex flex-1 flex-col text-sm leading-relaxed">
                <ul className="space-y-3">
                  <li className="flex gap-2">
                    <strong className="text-foreground min-w-[80px] font-medium">
                      {t('enterprise_page.beta.demo.admin_portal')}
                    </strong>
                    <a
                      href="https://admin.demo.cherry-ai.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline">
                      admin.demo.cherry-ai.com
                    </a>
                  </li>
                  <li className="flex gap-2">
                    <strong className="text-foreground min-w-[80px] font-medium">
                      {t('enterprise_page.beta.demo.account')}
                    </strong>
                    admin
                  </li>
                  <li className="flex gap-2">
                    <strong className="text-foreground min-w-[80px] font-medium">
                      {t('enterprise_page.beta.demo.password')}
                    </strong>
                    password
                  </li>
                </ul>
              </div>
            </div>

            {/* Download Info Card */}
            <div className="border-border bg-card flex h-full flex-col rounded-xl border p-7 shadow-sm">
              <h3 className="text-foreground mb-5 flex items-center gap-2 text-base font-semibold">
                <span className="bg-primary h-4 w-1 rounded" />
                {t('enterprise_page.beta.download.title')}
              </h3>
              <div className="text-muted-foreground flex flex-1 flex-col text-sm leading-relaxed">
                <ul className="space-y-3">
                  <li className="flex flex-wrap gap-2">
                    {t('enterprise_page.beta.download.server_url')} https://api.demo.cherry-ai.com
                  </li>
                  <li className="flex gap-2">
                    <strong className="text-foreground min-w-[80px] font-medium">
                      {t('enterprise_page.beta.demo.account')}
                    </strong>
                    user
                  </li>
                  <li className="flex gap-2">
                    <strong className="text-foreground min-w-[80px] font-medium">
                      {t('enterprise_page.beta.demo.password')}
                    </strong>
                    password
                  </li>
                </ul>
              </div>
            </div>

            {/* Manual Card */}
            <div className="border-border bg-card flex h-full flex-col rounded-xl border p-7 shadow-sm">
              <h3 className="text-foreground mb-5 flex items-center gap-2 text-base font-semibold">
                <span className="bg-primary h-4 w-1 rounded" />
                {t('enterprise_page.beta.manual.title')}
              </h3>
              <div className="text-muted-foreground flex flex-1 flex-col text-sm leading-relaxed">
                <p className="mb-4">{t('enterprise_page.beta.manual.description')}</p>
                <Button variant="outline" asChild className="mt-auto w-full">
                  <a
                    href="https://docs.enterprise.cherry-ai.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="gap-2">
                    <FileText className="h-4 w-4" />
                    {t('enterprise_page.beta.manual.view_manual')}
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Other Downloads Section */}
      <section className="bg-card px-6 py-20" ref={otherDownloadsRef}>
        <div className="mx-auto max-w-4xl">
          <DownloadList downloadUrls={downloadUrls} />
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default EnterpriseDownloadPage
