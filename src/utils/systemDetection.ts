export interface SystemInfo {
  name: string
  url: string
  type: string
  arch: string
}

// 国际域名列表（这些域名只使用英文，隐藏语言切换）
const INTERNATIONAL_DOMAINS = ['cherryai.com', 'www.cherryai.com']

/**
 * 检测当前是否是国际域名
 * cherryai.com 和 www.cherryai.com 被视为国际域名
 */
export function isInternationalDomain(): boolean {
  const hostname = window.location.hostname.toLowerCase()
  return INTERNATIONAL_DOMAINS.includes(hostname)
}

export type DetectedPlatform = 'windows' | 'macos' | 'linux' | null

export function isMobileDevice(): boolean {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}

export function detectPlatform(): DetectedPlatform {
  if (isMobileDevice()) {
    return null
  }

  const ua = navigator.userAgent.toLowerCase()
  const platform = navigator.platform.toLowerCase()

  if (ua.includes('windows') || platform.includes('win')) {
    return 'windows'
  }

  if (ua.includes('mac') || platform.includes('mac')) {
    return 'macos'
  }

  if (ua.includes('linux') || platform.includes('linux')) {
    return 'linux'
  }

  return null
}

export function getSystemInfo(version: string): SystemInfo[] | null {
  if (isMobileDevice()) {
    return null
  }

  const ua = navigator.userAgent.toLowerCase()
  const platform = navigator.platform.toLowerCase()
  const cleanVersion = version.replace(/^v/, '')

  // Windows system detection
  if (ua.includes('windows') || platform.includes('win')) {
    return [
      {
        name: `Cherry-Studio-${cleanVersion}-x64-setup.exe`,
        url: `https://gitcode.com/CherryHQ/cherry-studio/releases/download/${version}/Cherry-Studio-${cleanVersion}-x64-setup.exe`,
        type: 'Windows',
        arch: 'x64'
      }
      // {
      //   name: `Cherry-Studio-${cleanVersion}-arm64-setup.exe`,
      //   url: `https://gitcode.com/CherryHQ/cherry-studio/releases/download/${version}/Cherry-Studio-${cleanVersion}-arm64-setup.exe`,
      //   type: 'Windows',
      //   arch: 'arm64'
      // }
    ]
  }

  // macOS system detection
  if (ua.includes('mac') || platform.includes('mac')) {
    return [
      {
        name: `Cherry-Studio-${cleanVersion}-arm64.dmg`,
        url: `https://gitcode.com/CherryHQ/cherry-studio/releases/download/${version}/Cherry-Studio-${cleanVersion}-arm64.dmg`,
        type: `macOS (M芯片)`,
        arch: 'arm64'
      },
      {
        name: `Cherry-Studio-${cleanVersion}-x64.dmg`,
        url: `https://gitcode.com/CherryHQ/cherry-studio/releases/download/${version}/Cherry-Studio-${cleanVersion}-x64.dmg`,
        type: `macOS (Intel芯片)`,
        arch: 'x64'
      }
    ]
  }

  // Linux system detection
  if (ua.includes('linux') || platform.includes('linux')) {
    return [
      {
        name: `Cherry-Studio-${cleanVersion}-x86_64.AppImage`,
        url: `https://gitcode.com/CherryHQ/cherry-studio/releases/download/${version}/Cherry-Studio-${cleanVersion}-x86_64.AppImage`,
        type: 'Linux',
        arch: 'x86_64'
      }
    ]
  }

  return null
}
