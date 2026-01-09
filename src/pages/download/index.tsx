import { FC, useRef } from 'react'
import { useTranslation } from 'react-i18next'

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

  const scrollToOtherDownloads = () => {
    otherDownloadsRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="bg-background min-h-screen">
      <section className="pt-32 pb-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <VersionInfo versionData={versionData} loading={loading} />
          <DownloadButtons systemInfo={systemInfo} onOtherVersionsClick={scrollToOtherDownloads} />

          <div ref={otherDownloadsRef}>
            <DownloadList downloadUrls={downloadUrls} assets={versionData?.assets || []} />
          </div>

          {/* Cloud downloads */}
          <div className="border-border bg-card mt-10 rounded-2xl border p-8">
            <h2 className="text-foreground mb-6 text-2xl font-bold">{t('download_page.cloud_download')}</h2>
            <ul className="space-y-4">
              <li className="text-muted-foreground">
                <strong className="text-foreground">{t('download_page.quark_drive')}：</strong>
                <a
                  href="https://pan.quark.cn/s/4044324d0ecd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary ml-2 hover:underline">
                  {t('download_page.click_download')}
                </a>
              </li>
            </ul>
          </div>

          <Changelog versionData={versionData} />
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default DownloadPage
