import { ExternalLink, Laptop } from 'lucide-react'
import { type FC, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'

import Footer from '@/components/website/Footer'
import { usePageMeta } from '@/hooks/usePageMeta'
import { useVersionData } from '@/hooks/useVersionData'
import { type DetectedArch, detectPlatform, detectSystem, isMobileDevice } from '@/utils/systemDetection'
import { getSiteRegion, isEnglishSite } from '@/utils/urls'
import Changelog from './components/Changelog'
import MobileDownloads from './components/MobileDownloads'
import { PlatformDownloadOptions, PlatformDownloadPrimary } from './components/PlatformDownloads'
import type { DownloadPlatform, Platform } from './components/PlatformTabs'
import PlatformTabs from './components/PlatformTabs'
import VersionInfo from './components/VersionInfo'

interface DownloadPageProps {
  edition?: 'stable' | 'v1' | 'v2'
}

const CLOUD_DRIVE_DOWNLOAD_URL = 'https://pan.quark.cn/s/4044324d0ecd'
const RELEASE_HISTORY_URLS = {
  cn: 'https://gitcode.com/CherryHQ/cherry-studio/releases',
  global: 'https://github.com/CherryHQ/cherry-studio/releases'
} as const

const DownloadPage: FC<DownloadPageProps> = ({ edition = 'stable' }) => {
  const { t, i18n } = useTranslation()
  const [searchParams] = useSearchParams()
  const platformParam = searchParams.get('platform')
  const archParam = searchParams.get('arch')

  const isV2 = edition === 'v2'
  const isV1 = edition === 'v1'
  const mobileAvailable = !isV1
  const { loading, error, versionData } = useVersionData({
    releaseLine: isV1 ? 'v1' : 'stable',
    exactMajorVersion: isV1 ? 1 : undefined,
    minimumMajorVersion: isV2 ? 2 : undefined
  })
  const [activePlatform, setActivePlatform] = useState<DownloadPlatform>(() => {
    if (platformParam === 'windows' || platformParam === 'macos' || platformParam === 'linux') {
      return platformParam
    }
    if (mobileAvailable && platformParam === 'mobile') {
      return 'mobile'
    }
    return mobileAvailable && isMobileDevice() ? 'mobile' : 'windows'
  })
  const [detectedPlatform, setDetectedPlatform] = useState<Platform | null>(null)
  const [detectedArch, setDetectedArch] = useState<DetectedArch | null>(null)
  const [systemDetectionReady, setSystemDetectionReady] = useState(false)
  const userSelectedPlatformRef = useRef(false)
  const isMobile = isMobileDevice()
  const showMobile = mobileAvailable && activePlatform === 'mobile'
  const desktopPlatform = activePlatform === 'mobile' ? 'windows' : activePlatform
  const displayPlatform = showMobile ? activePlatform : desktopPlatform
  usePageMeta(
    showMobile ? 'mobile_download' : edition === 'v1' ? 'downloadV1' : edition === 'v2' ? 'downloadV2' : 'download'
  )
  const autoDownloadRequested = searchParams.get('autodownload')?.toLowerCase() === 'true'
  // Do not auto-download a desktop build when v1 links explicitly request the unavailable mobile one.
  const autoDownloadAllowed = autoDownloadRequested && !isMobile && (mobileAvailable || platformParam !== 'mobile')
  const releaseHistoryUrl = RELEASE_HISTORY_URLS[getSiteRegion()]

  useEffect(() => {
    let cancelled = false
    userSelectedPlatformRef.current = false
    setSystemDetectionReady(false)
    setDetectedPlatform(null)
    setDetectedArch(null)

    // Optional debug overrides: /download?platform=windows&arch=arm64
    // platform: windows|macos|linux|mobile
    // arch: arm64|x64|ia32|unknown|null
    if (mobileAvailable && platformParam === 'mobile') {
      setActivePlatform('mobile')
      setSystemDetectionReady(true)
      return
    }

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
    setActivePlatform(mobileAvailable && isMobileDevice() ? 'mobile' : 'windows')
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
  }, [platformParam, archParam, mobileAvailable])

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <main className="site-page-top flex-1 pb-16 sm:pb-24">
        <div className="site-container site-split">
          <div className="min-w-0">
            <p className="mb-4 font-mono text-xs tracking-widest text-primary uppercase">{t('download')}</p>
            <h1 className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              {showMobile
                ? t('mobile_download.title')
                : isMobile
                  ? t('mobile_download.desktop_title')
                  : 'Cherry Studio'}
              {!showMobile && versionData && (
                <span className="mt-2 block font-mono text-xl font-medium text-primary">{versionData.version}</span>
              )}
            </h1>
            {showMobile ? (
              <p className="text-muted-foreground mt-4 text-sm">{t('mobile_page.availability')}</p>
            ) : (
              <VersionInfo
                versionData={versionData}
                loading={loading}
                changelog={<Changelog versionData={versionData} />}
                unavailableMessage={error ? t('download_page.version_error') : undefined}
              />
            )}
            {isMobile && !showMobile && (
              <div className="mt-5 flex max-w-md items-start gap-2 text-xs text-muted-foreground">
                <Laptop className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{t('download_page.mobile_hint')}</span>
              </div>
            )}
          </div>

          <div className="min-w-0">
            <div className="overflow-hidden rounded-lg border border-border bg-card text-left">
              <PlatformTabs
                activePlatform={displayPlatform}
                detectedPlatform={detectedPlatform}
                detectedArch={detectedArch}
                mobileAvailable={mobileAvailable}
                excludeDesktopAutocapture={!isV1}
                onPlatformChange={(platform) => {
                  userSelectedPlatformRef.current = true
                  setActivePlatform(platform)
                }}
              />

              {showMobile ? (
                <MobileDownloads />
              ) : (
                <>
                  <PlatformDownloadPrimary
                    excludeAutocapture={!isV1}
                    platform={desktopPlatform}
                    detectedArch={detectedPlatform === desktopPlatform ? detectedArch : null}
                    versionData={versionData}
                    loading={loading}
                    autoDownload={autoDownloadAllowed && detectedPlatform === desktopPlatform}
                    autoDownloadReady={systemDetectionReady}
                  />
                  <PlatformDownloadOptions
                    excludeAutocapture={!isV1}
                    platform={desktopPlatform}
                    detectedArch={detectedPlatform === desktopPlatform ? detectedArch : null}
                    versionData={versionData}
                    loading={loading}
                  />
                </>
              )}
            </div>

            {!showMobile && (
              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
                <a
                  href={releaseHistoryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-sm underline-offset-4 transition-colors hover:underline">
                  {t('download_page.release_history')}
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
                {isEnglishSite(i18n.resolvedLanguage || i18n.language) && (
                  <a
                    href="https://discord.gg/wez8HtpxqQ"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-sm underline-offset-4 transition-colors hover:underline">
                    {t('download_page.join_discord')}
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}
                <a
                  href={CLOUD_DRIVE_DOWNLOAD_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ph-no-autocapture={!isV1 ? '' : undefined}
                  className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-sm underline-offset-4 transition-colors hover:underline">
                  {t('download_page.cloud_drive_download')}
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default DownloadPage
