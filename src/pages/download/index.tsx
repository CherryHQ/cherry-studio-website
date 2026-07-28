import { FlaskConical } from 'lucide-react'
import { type FC, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import Footer from '@/components/website/Footer'
import { usePageMeta } from '@/hooks/usePageMeta'
import { useVersionData } from '@/hooks/useVersionData'
import { type DetectedArch, detectPlatform, detectSystem, isMobileDevice } from '@/utils/systemDetection'
import Changelog from './components/Changelog'
import PlatformDownloads from './components/PlatformDownloads'
import type { Platform } from './components/PlatformTabs'
import PlatformTabs from './components/PlatformTabs'
import VersionInfo from './components/VersionInfo'

interface DownloadPageProps {
  edition?: 'stable' | 'v2'
}

const DownloadPage: FC<DownloadPageProps> = ({ edition = 'stable' }) => {
  const { t } = useTranslation()
  usePageMeta('download')

  const isV2 = edition === 'v2'
  const { loading, error, versionData } = useVersionData({
    releaseLine: isV2 ? 'v2' : 'stable',
    minimumMajorVersion: isV2 ? 2 : undefined
  })
  const [activePlatform, setActivePlatform] = useState<Platform>('windows')
  const [detectedPlatform, setDetectedPlatform] = useState<Platform | null>(null)
  const [detectedArch, setDetectedArch] = useState<DetectedArch | null>(null)
  const [systemDetectionReady, setSystemDetectionReady] = useState(false)
  const userSelectedPlatformRef = useRef(false)
  const isMobile = isMobileDevice()
  const autoDownloadRequested =
    new URLSearchParams(window.location.search).get('autodownload')?.toLowerCase() === 'true'

  useEffect(() => {
    let cancelled = false

    // Optional debug overrides: /download?platform=windows&arch=arm64
    // platform: windows|macos|linux
    // arch: arm64|x64|ia32|unknown|null
    const params = new URLSearchParams(window.location.search)
    const platformParam = params.get('platform')
    const archParam = params.get('arch')

    const overridePlatform =
      platformParam === 'windows' || platformParam === 'macos' || platformParam === 'linux' ? platformParam : null

    const overrideArch: DetectedArch | null =
      archParam === 'arm64'
        ? 'arm64'
        : archParam === 'x64'
          ? 'x64'
          : archParam === 'ia32'
            ? 'ia32'
            : archParam === 'null' || archParam === 'unknown'
              ? null
              : null

    if (overridePlatform) {
      setDetectedPlatform(overridePlatform)
      setActivePlatform(overridePlatform)
      setDetectedArch(overrideArch)
      setSystemDetectionReady(true)
      return
    }

    // Fast path: sync OS detection for immediate UX.
    const detected = detectPlatform()
    if (detected) {
      setDetectedPlatform(detected)
      if (!userSelectedPlatformRef.current) {
        setActivePlatform(detected)
      }
    }

    // Best-effort: async architecture detection (UA-CH/WebGL heuristics etc.).
    void (async () => {
      const system = await detectSystem()
      if (cancelled) return

      if (!system) {
        setSystemDetectionReady(true)
        return
      }

      setDetectedPlatform(system.platform)
      if (!userSelectedPlatformRef.current) {
        setActivePlatform(system.platform)
      }
      setDetectedArch(system.arch)
      setSystemDetectionReady(true)
    })()

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div className="bg-background min-h-screen">
      <section className="min-h-screen pt-32 pb-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <VersionInfo
            versionData={versionData}
            loading={loading}
            unavailableMessage={
              error ? t(isV2 ? 'download_page.v2_version_error' : 'download_page.version_error') : undefined
            }
          />

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
            detectedArch={detectedArch}
            onPlatformChange={(platform) => {
              userSelectedPlatformRef.current = true
              setActivePlatform(platform)
            }}
          />

          {isV2 && (
            <div className="mb-6 flex items-start gap-3 rounded-2xl border border-amber-500/30 bg-amber-500/10 px-5 py-4">
              <FlaskConical className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
              <div>
                <p className="text-foreground font-medium">{t('download_page.v2_notice_title')}</p>
                <p className="text-muted-foreground mt-1 text-sm">{t('download_page.v2_notice_description')}</p>
              </div>
            </div>
          )}

          {/* Platform Downloads */}
          <PlatformDownloads
            platform={activePlatform}
            detectedArch={detectedPlatform === activePlatform ? detectedArch : null}
            isDetectedSystem={detectedPlatform === activePlatform}
            versionData={versionData}
            loading={loading}
            autoDownload={autoDownloadRequested && !isMobile && detectedPlatform === activePlatform}
            autoDownloadReady={systemDetectionReady}
            showV2Entry={!isV2}
          />

          <Changelog versionData={versionData} />
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default DownloadPage
