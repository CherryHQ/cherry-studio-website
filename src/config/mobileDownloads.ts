interface MobileDownload {
  platform: 'android' | 'ios'
  channel: 'apk' | 'testflight' | 'store'
  url: string
}

// Keep a known-good APK fallback here; useMobileDownloads resolves the latest GitCode release.
// The TestFlight invitation URL is managed here directly.
// When a store listing is available, update its URL and channel to 'store'.
export const mobileDownloads: MobileDownload[] = [
  {
    platform: 'android',
    channel: 'apk',
    url: 'https://gitcode.com/CherryHQ/cherry-studio-app/releases/download/v0.1.0-beta.2/cherry-studio-0.1.0-2026-09-17-android.apk'
  },
  { platform: 'ios', channel: 'testflight', url: 'https://testflight.apple.com/join/2ryzjB66' }
]
