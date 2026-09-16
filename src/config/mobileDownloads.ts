interface MobileDownload {
  platform: 'android' | 'ios'
  channel: 'apk' | 'testflight' | 'store'
  url: string
}

// Set the public APK URL and TestFlight invitation URL here.
// When a store listing is available, update its URL and channel to 'store'.
export const mobileDownloads: MobileDownload[] = [
  { platform: 'android', channel: 'apk', url: '' },
  { platform: 'ios', channel: 'testflight', url: 'https://testflight.apple.com/join/2ryzjB66' }
]
