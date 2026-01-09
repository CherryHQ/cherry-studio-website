import { type FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import Footer from '@/components/website/Footer'
import { usePageMeta } from '@/hooks/usePageMeta'
import { useVersionData } from '@/hooks/useVersionData'
import { detectPlatform, isMobileDevice } from '@/utils/systemDetection'

import Changelog from './components/Changelog'
import PlatformDownloads from './components/PlatformDownloads'
import type { Platform } from './components/PlatformTabs'
import PlatformTabs from './components/PlatformTabs'
import VersionInfo from './components/VersionInfo'

const DownloadPage: FC = () => {
  const { t } = useTranslation()
  usePageMeta('download')

  const { loading, versionData, downloadUrls } = useVersionData()
  const [activePlatform, setActivePlatform] = useState<Platform>('windows')
  const [detectedPlatform, setDetectedPlatform] = useState<Platform | null>(null)
  const isMobile = isMobileDevice()

  useEffect(() => {
    const detected = detectPlatform()
    if (detected) {
      setDetectedPlatform(detected)
      setActivePlatform(detected)
    }
  }, [])

  return (
    <div className="bg-background min-h-screen">
      <section className="pt-32 pb-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <VersionInfo versionData={versionData} loading={loading} />

          {/* Mobile hint */}
          {isMobile && (
            <div className="border-border bg-card mb-8 rounded-2xl border p-6 text-center">
              <p className="text-muted-foreground mb-2">{t('download_page.mobile_detected')}</p>
              <p className="text-muted-foreground text-sm">{t('download_page.mobile_hint')}</p>
            </div>
          )}

          {/* Platform Tabs */}
          <PlatformTabs
            activePlatform={activePlatform}
            detectedPlatform={detectedPlatform}
            onPlatformChange={setActivePlatform}
          />

          {/* Platform Downloads */}
          <PlatformDownloads
            platform={activePlatform}
            downloadGroup={downloadUrls?.[activePlatform] || null}
            version={versionData?.version || ''}
          />

          {/* Cloud download backup link */}
          <div className="text-muted-foreground mt-6 text-center text-sm">
            {t('download_page.download_slow')}
            <a
              href="https://pan.quark.cn/s/4044324d0ecd"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary ml-1 hover:underline">
              {t('download_page.quark_drive')}
            </a>
          </div>

          <Changelog versionData={versionData} />
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default DownloadPage
