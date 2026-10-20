import { getSiteRegion } from '@/utils/urls'

interface MobileDownload {
  platform: 'android' | 'ios'
  channel: 'apk' | 'testflight' | 'store'
  url: string
  primary: boolean
}

const isChinaSite = getSiteRegion() === 'cn'

export const mobileReleaseSource = isChinaSite
  ? {
      name: 'GitCode',
      apiUrl:
        'https://api.gitcode.com/api/v5/repos/CherryHQ/cherry-studio-app/releases?direction=desc&page=1&per_page=100',
      downloadOrigin: 'https://gitcode.com'
    }
  : {
      name: 'GitHub',
      apiUrl: 'https://api.github.com/repos/CherryHQ/cherry-studio-app/releases?per_page=100',
      downloadOrigin: 'https://github.com'
    }

// Keep a published APK fallback; useMobileDownloads resolves newer releases from the same regional source.
// Each platform has one primary channel, shared by the download page and hover-card QR codes.
export const mobileDownloads: MobileDownload[] = [
  {
    platform: 'ios',
    channel: 'store',
    url: isChinaSite
      ? 'https://apps.apple.com/cn/app/cherry-studio-%E5%85%A8%E8%83%BD-ai-%E5%B7%A5%E4%BD%9C%E7%AB%99/id6809783714'
      : 'https://apps.apple.com/us/app/cherry-studio-ai-anywhere/id6809783714',
    primary: true
  },
  {
    platform: 'android',
    channel: 'store',
    url: 'https://play.google.com/store/apps/details?id=com.cherryai.cherrystudio_app',
    primary: !isChinaSite
  },
  {
    platform: 'android',
    channel: 'apk',
    url: `${mobileReleaseSource.downloadOrigin}/CherryHQ/cherry-studio-app/releases/download/v0.3.0/cherry-studio-0.3.0-android.apk`,
    primary: isChinaSite
  },
  { platform: 'ios', channel: 'testflight', url: 'https://testflight.apple.com/join/2ryzjB66', primary: false }
]
