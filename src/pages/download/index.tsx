import { ExternalLink, Laptop } from 'lucide-react'
import { type FC, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import Footer from '@/components/website/Footer'
import { usePageMeta } from '@/hooks/usePageMeta'
import { useVersionData } from '@/hooks/useVersionData'
import { type DetectedArch, detectPlatform, detectSystem, isMobileDevice } from '@/utils/systemDetection'
import { getSiteRegion } from '@/utils/urls'
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
  const { t } = useTranslation()
  usePageMeta('download')

  const isV2 = edition === 'v2'
  const isV1 = edition === 'v1'
  const { loading, error, versionData } = useVersionData({
    releaseLine: isV1 ? 'v1' : 'stable',
    exactMajorVersion: isV1 ? 1 : undefined,
    minimumMajorVersion: isV2 ? 2 : undefined
  })
  const [activePlatform, setActivePlatform] = useState<DownloadPlatform>(() =>
    isMobileDevice() ? 'mobile' : 'windows'
  )
  const [detectedPlatform, setDetectedPlatform] = useState<Platform | null>(null)
  const [detectedArch, setDetectedArch] = useState<DetectedArch | null>(null)
  const [systemDetectionReady, setSystemDetectionReady] = useState(false)
  const userSelectedPlatformRef = useRef(false)
  const isMobile = isMobileDevice()
  const showMobile = activePlatform === 'mobile'
  const autoDownloadRequested =
    new URLSearchParams(window.location.search).get('autodownload')?.toLowerCase() === 'true'
  const releaseHistoryUrl = RELEASE_HISTORY_URLS[getSiteRegion()]

  useEffect(() => {
    let cancelled = false

    // Optional debug overrides: /download?platform=windows&arch=arm64
    // platform: windows|macos|linux|mobile
    // arch: arm64|x64|ia32|unknown|null
    const params = new URLSearchParams(window.location.search)
    const platformParam = params.get('platform')
    const archParam = params.get('arch')

    if (platformParam === 'mobile') {
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
    <div className="bg-background min-h-screen overflow-hidden">
      <section className="pt-36 pb-40 sm:pt-40 sm:pb-44">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-3xl leading-tight font-semibold tracking-tight text-black sm:text-5xl dark:text-white">
              {showMobile
                ? t('mobile_download.title')
                : isMobile
                  ? t('mobile_download.desktop_title')
                  : 'Cherry Studio'}
              {!showMobile && versionData && ` ${versionData.version}`}
            </h1>
            {showMobile ? (
              <p className="text-muted-foreground mt-4 text-sm">{t('mobile_page.beta')}</p>
            ) : (
              <VersionInfo
                versionData={versionData}
                loading={loading}
                changelog={<Changelog versionData={versionData} />}
                unavailableMessage={error ? t('download_page.version_error') : undefined}
              />
            )}
          </div>

          {isMobile && !showMobile && (
            <div className="mx-auto mt-5 flex max-w-md items-start justify-center gap-2 text-xs text-black/55 dark:text-white/60">
              <Laptop className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{t('download_page.mobile_hint')}</span>
            </div>
          )}

          <div className="border-border bg-card mx-auto mt-9 max-w-3xl overflow-hidden rounded-3xl border text-left shadow-sm dark:border-white/15">
            <PlatformTabs
              activePlatform={activePlatform}
              detectedPlatform={detectedPlatform}
              detectedArch={detectedArch}
              onPlatformChange={(platform) => {
                userSelectedPlatformRef.current = true
                setActivePlatform(platform)
              }}
            />

            {activePlatform === 'mobile' ? (
              <MobileDownloads />
            ) : (
              <>
                <PlatformDownloadPrimary
                  platform={activePlatform}
                  detectedArch={detectedPlatform === activePlatform ? detectedArch : null}
                  versionData={versionData}
                  loading={loading}
                  autoDownload={autoDownloadRequested && !isMobile && detectedPlatform === activePlatform}
                  autoDownloadReady={systemDetectionReady}
                />
                <PlatformDownloadOptions
                  platform={activePlatform}
                  detectedArch={detectedPlatform === activePlatform ? detectedArch : null}
                  versionData={versionData}
                  loading={loading}
                />
              </>
            )}
          </div>

          {!showMobile && (
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
              <a
                href={releaseHistoryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-sm underline-offset-4 transition-colors hover:underline">
                {t('download_page.release_history')}
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
              <a
                href={CLOUD_DRIVE_DOWNLOAD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-sm underline-offset-4 transition-colors hover:underline">
                {t('download_page.cloud_drive_download')}
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default DownloadPage
