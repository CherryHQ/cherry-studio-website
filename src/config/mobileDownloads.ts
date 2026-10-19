interface MobileDownload {
  platform: 'android' | 'ios'
  channel: 'apk' | 'testflight' | 'store'
  url: string
}

// Keep a known-good APK fallback here; useMobileDownloads resolves the latest GitCode release.
// Store listings are the primary downloads; APK and TestFlight remain alternative channels.
export const mobileDownloads: MobileDownload[] = [
  {
    platform: 'ios',
    channel: 'store',
    url: 'https://apps.apple.com/us/app/cherry-studio-app/id6809783714'
  },
  {
    platform: 'android',
    channel: 'store',
    url: 'https://play.google.com/store/apps/details?id=com.cherryai.cherrystudio_app'
  },
  {
    platform: 'android',
    channel: 'apk',
    url: 'https://gitcode.com/CherryHQ/cherry-studio-app/releases/download/v0.1.0-beta.2/cherry-studio-0.1.0-2026-09-17-android.apk'
  },
  { platform: 'ios', channel: 'testflight', url: 'https://testflight.apple.com/join/2ryzjB66' }
]
