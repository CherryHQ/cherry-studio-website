import { Laptop, TriangleAlert } from 'lucide-react'
import { type FC, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import Footer from '@/components/website/Footer'
import { usePageMeta } from '@/hooks/usePageMeta'
import { useVersionData } from '@/hooks/useVersionData'
import { type DetectedArch, detectPlatform, detectSystem, isMobileDevice } from '@/utils/systemDetection'
import Changelog from './components/Changelog'
import { PlatformDownloadOptions, PlatformDownloadPrimary, V2ReleaseEntry } from './components/PlatformDownloads'
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
    <div className="bg-background min-h-screen overflow-hidden">
      <section className="pt-36 pb-40 sm:pt-40 sm:pb-44">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-3xl leading-tight font-semibold tracking-tight text-black sm:text-5xl dark:text-white">
              {versionData ? `Cherry Studio ${versionData.version}` : 'Cherry Studio'}
            </h1>
            <VersionInfo
              versionData={versionData}
              loading={loading}
              isPreview={isV2}
              changelog={<Changelog versionData={versionData} />}
              unavailableMessage={
                error ? t(isV2 ? 'download_page.v2_version_error' : 'download_page.version_error') : undefined
              }
            />
          </div>

          {isMobile && (
            <div className="mx-auto mt-5 flex max-w-md items-start justify-center gap-2 text-xs text-black/55 dark:text-white/60">
              <Laptop className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{t('download_page.mobile_hint')}</span>
            </div>
          )}

          {isV2 && (
            <div
              role="alert"
              className="mx-auto mt-8 flex max-w-3xl items-start gap-3 rounded-2xl border border-amber-300/80 bg-amber-50 px-5 py-3.5 text-left sm:items-center dark:border-amber-500/30 dark:bg-amber-500/10">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-400">
                <TriangleAlert className="h-4 w-4" />
              </span>
              <div className="min-w-0 lg:flex lg:items-center lg:gap-3">
                <p className="shrink-0 font-semibold text-amber-950 dark:text-amber-100">
                  {t('download_page.v2_notice_title')}
                </p>
                <p className="mt-1 text-sm leading-6 text-amber-900/75 lg:mt-0 lg:whitespace-nowrap dark:text-amber-100/70">
                  {t('download_page.v2_notice_description')}
                </p>
              </div>
            </div>
          )}

          <div
            className={`border-border bg-card mx-auto max-w-3xl overflow-hidden rounded-3xl border text-left shadow-sm dark:border-white/15 ${
              isV2 ? 'mt-4' : 'mt-9'
            }`}>
            <PlatformTabs
              activePlatform={activePlatform}
              detectedPlatform={detectedPlatform}
              detectedArch={detectedArch}
              onPlatformChange={(platform) => {
                userSelectedPlatformRef.current = true
                setActivePlatform(platform)
              }}
            />

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
          </div>
          {!isV2 && (
            <div className="mx-auto mt-5 max-w-3xl">
              <V2ReleaseEntry />
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default DownloadPage
