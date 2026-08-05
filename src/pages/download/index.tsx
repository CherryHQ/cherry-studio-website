import { Laptop } from 'lucide-react'
import { type FC, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import Footer from '@/components/website/Footer'
import { usePageMeta } from '@/hooks/usePageMeta'
import { useVersionData } from '@/hooks/useVersionData'
import { type DetectedArch, detectPlatform, detectSystem, isMobileDevice } from '@/utils/systemDetection'
import Changelog from './components/Changelog'
import { PlatformDownloadOptions, PlatformDownloadPrimary } from './components/PlatformDownloads'
import type { Platform } from './components/PlatformTabs'
import PlatformTabs from './components/PlatformTabs'
import VersionInfo from './components/VersionInfo'

interface DownloadPageProps {
  edition?: 'stable' | 'v1' | 'v2'
}

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
              changelog={<Changelog versionData={versionData} />}
              unavailableMessage={error ? t('download_page.version_error') : undefined}
            />
          </div>

          {isMobile && (
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
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default DownloadPage
