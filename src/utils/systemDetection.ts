export type DetectedPlatform = 'windows' | 'macos' | 'linux' | null
export type DetectedArch = 'arm64' | 'x64' | 'ia32' | null

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

function detectArchFromUserAgent(ua: string): DetectedArch {
  // arm first (covers linux/mac/windows ARM user agents)
  if (ua.includes('aarch64') || ua.includes('arm64')) return 'arm64'

  // x64 synonyms
  if (ua.includes('x86_64') || ua.includes('amd64') || ua.includes('win64') || ua.includes('x64')) return 'x64'

  // 32-bit x86 (rare for modern desktop)
  if (ua.includes('i386') || ua.includes('i686') || ua.includes('ia32')) return 'ia32'

  return null
}

function detectAppleSiliconFromWebGL(): DetectedArch {
  try {
    const canvas = document.createElement('canvas')
    const gl = (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')) as
      | WebGLRenderingContext
      | WebGL2RenderingContext
      | null
    if (!gl) return null

    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info')
    if (!debugInfo) return null

    const renderer = gl.getParameter((debugInfo as any).UNMASKED_RENDERER_WEBGL)
    if (typeof renderer !== 'string') return null

    const r = renderer.toLowerCase()

    // Apple Silicon usually exposes "Apple M1/M2/..." or "Apple GPU"
    if (r.includes('apple') && (/(\bapple\s*m\d\b)/i.test(renderer) || r.includes('apple gpu'))) {
      return 'arm64'
    }

    // Intel macs commonly expose "Intel" in renderer
    if (r.includes('intel')) {
      return 'x64'
    }

    return null
  } catch {
    return null
  }
}

export async function detectArchitecture(platform: DetectedPlatform = detectPlatform()): Promise<DetectedArch> {
  if (isMobileDevice()) return null

  const ua = navigator.userAgent.toLowerCase()

  // 1) Fast path: parse classic UA
  const fromUa = detectArchFromUserAgent(ua)
  if (fromUa) return fromUa

  // 2) UA Client Hints (Chrome/Edge etc) - best-effort
  const uaData = (navigator as any).userAgentData
  if (uaData?.getHighEntropyValues) {
    try {
      const { architecture, bitness } = await uaData.getHighEntropyValues(['architecture', 'bitness'])
      const arch = typeof architecture === 'string' ? architecture.toLowerCase() : ''
      const bits = typeof bitness === 'string' ? bitness : ''

      if (arch.includes('arm')) return 'arm64'
      if (arch.includes('x86')) return bits === '32' ? 'ia32' : 'x64'
    } catch {
      // ignore
    }
  }

  // 3) macOS fallback: try WebGL renderer heuristic (works on some Safari/Chrome configurations)
  if (platform === 'macos') {
    const webglArch = detectAppleSiliconFromWebGL()
    if (webglArch) return webglArch
  }

  return null
}

export async function detectSystem(): Promise<{
  platform: Exclude<DetectedPlatform, null>
  arch: DetectedArch
} | null> {
  const platform = detectPlatform()
  if (!platform) return null

  const arch = await detectArchitecture(platform)
  return { platform, arch }
}
