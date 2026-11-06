export type WebsiteConfigs = Record<string, unknown>
let snapshot: { configs: WebsiteConfigs; expires: number } | undefined
let inFlight: Promise<WebsiteConfigs> | undefined
export async function fetchWebsiteConfigs(): Promise<WebsiteConfigs> {
  if (snapshot && snapshot.expires > Date.now()) return snapshot.configs
  if (!inFlight) {
    inFlight = fetch('/api/configs?product=website')
      .then(async (response) => {
        if (!response.ok) throw new Error(`Website configuration unavailable (${response.status})`)
        const data = await response.json()
        if (!data.configs || typeof data.configs !== 'object' || Array.isArray(data.configs))
          throw new Error('Invalid website configuration')
        snapshot = { configs: data.configs, expires: Date.now() + 30_000 }
        return data.configs as WebsiteConfigs
      })
      .finally(() => {
        inFlight = undefined
      })
  }
  return inFlight
}
export function safePublicURL(value: unknown): string {
  if (typeof value !== 'string' || !value) return ''
  try {
    const url = new URL(value)
    return ['https:', 'http:'].includes(url.protocol) && !url.username && !url.password ? value : ''
  } catch {
    return ''
  }
}
export function localizedText(value: Record<string, unknown>, fallback: string, language: string): string {
  const translations = value.translations as Record<string, unknown> | undefined
  const translated = translations?.[language.toLowerCase().startsWith('zh') ? 'zh' : 'en']
  return typeof translated === 'string' && translated.trim()
    ? translated
    : typeof value[fallback] === 'string'
      ? (value[fallback] as string)
      : ''
}
