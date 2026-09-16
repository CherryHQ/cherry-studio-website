interface MobileDownload {
  platform: 'android' | 'ios'
  channel: 'apk' | 'testflight' | 'store'
  url: string
}

// Set the public APK URL and TestFlight invitation URL here.
// When a store listing is available, update its URL and channel to 'store'.
export const mobileDownloads: MobileDownload[] = [
  {
    platform: 'android',
    channel: 'apk',
    url: 'https://gitcode.com/CherryHQ/cherry-studio-app/releases/download/v0.1.0-beta.1/cherry-studio-0.1.0-2026-09-16-android.apk'
  },
  { platform: 'ios', channel: 'testflight', url: 'https://testflight.apple.com/join/2ryzjB66' }
]
