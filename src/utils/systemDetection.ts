export interface SystemInfo {
  name: string
  url: string
  type: string
  arch: string
  text: string
}

export function isMobileDevice(): boolean {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
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
        url: `https://gitcode.com/CherryHQ/cherry-studio/releases/download/${version}/Cherry-Studio-${cleanVersion}-x64-setup.signed.exe`,
        type: 'Windows',
        arch: 'x64',
        text: '立即下载(x64)'
      },
      {
        name: `Cherry-Studio-${cleanVersion}-arm64-setup.exe`,
        url: `https://gitcode.com/CherryHQ/cherry-studio/releases/download/${version}/Cherry-Studio-${cleanVersion}-arm64-setup.signed.exe`,
        type: 'Windows',
        arch: 'arm64',
        text: '立即下载(ARM64)'
      }
    ]
  }

  // macOS system detection
  if (ua.includes('mac') || platform.includes('mac')) {
    return [
      {
        name: `Cherry-Studio-${cleanVersion}-arm64.dmg`,
        url: `https://gitcode.com/CherryHQ/cherry-studio/releases/download/${version}/Cherry-Studio-${cleanVersion}-arm64.dmg`,
        type: `macOS (M芯片)`,
        arch: 'arm64',
        text: '下载（Apple 芯片）'
      },
      {
        name: `Cherry-Studio-${cleanVersion}-x64.dmg`,
        url: `https://gitcode.com/CherryHQ/cherry-studio/releases/download/${version}/Cherry-Studio-${cleanVersion}-x64.dmg`,
        type: `macOS (Intel芯片)`,
        arch: 'x64',
        text: '下载（Intel 芯片）'
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
        arch: 'x86_64',
        text: '立即下载'
      }
    ]
  }

  return null
}
