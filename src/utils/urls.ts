const ENGLISH_DOMAIN = 'cherryai.com'
const CHINESE_DOMAIN = 'cherryai.com.cn'

export const LANGUAGE_QUERY_PARAM = 'lng'

const DOMAIN_LANGUAGE_MAP: Record<string, 'en-US' | 'zh-CN'> = {
  [ENGLISH_DOMAIN]: 'en-US',
  [`www.${ENGLISH_DOMAIN}`]: 'en-US',
  [CHINESE_DOMAIN]: 'zh-CN',
  [`www.${CHINESE_DOMAIN}`]: 'zh-CN'
}

const LANGUAGE_REDIRECT_DOMAINS = [
  ENGLISH_DOMAIN,
  `www.${ENGLISH_DOMAIN}`,
  CHINESE_DOMAIN,
  `www.${CHINESE_DOMAIN}`,
  'cherry-ai.com',
  'www.cherry-ai.com'
]

function getCurrentHostname(): string {
  if (typeof window === 'undefined') return ''
  return window.location.hostname.toLowerCase()
}

function isLocalDevelopmentHost(hostname: string): boolean {
  return (
    import.meta.env.DEV ||
    hostname === '' ||
    hostname === 'localhost' ||
    hostname.endsWith('.localhost') ||
    hostname === '127.0.0.1' ||
    hostname === '0.0.0.0' ||
    hostname === '::1'
  )
}

export function getDomainDefaultLanguage(): 'en-US' | 'zh-CN' | null {
  return DOMAIN_LANGUAGE_MAP[getCurrentHostname()] ?? null
}

export function isLanguageRedirectDomain(): boolean {
  return LANGUAGE_REDIRECT_DOMAINS.includes(getCurrentHostname())
}

export function getLanguageDomain(language: string): string {
  return language.toLowerCase().startsWith('zh') ? CHINESE_DOMAIN : ENGLISH_DOMAIN
}

function getRedirectLanguage(language: string): 'en-US' | 'zh-CN' {
  return language.toLowerCase().startsWith('zh') ? 'zh-CN' : 'en-US'
}

export function redirectToLanguageDomain(language: string, options?: { replace?: boolean }): boolean {
  if (typeof window === 'undefined') return false

  const hostname = getCurrentHostname()
  const targetLanguage = getRedirectLanguage(language)
  const targetHostname = getLanguageDomain(language)

  if (isLocalDevelopmentHost(hostname) || hostname === targetHostname) return false

  const targetUrl = new URL(window.location.href)
  targetUrl.protocol = 'https:'
  targetUrl.host = targetHostname
  targetUrl.searchParams.set(LANGUAGE_QUERY_PARAM, targetLanguage)

  if (options?.replace) {
    window.location.replace(targetUrl.toString())
  } else {
    window.location.assign(targetUrl.toString())
  }

  return true
}

/**
 * 获取企业版网址
 */
export function getEnterpriseUrl(language: string): string {
  language
  return 'https://enterprise.cherry-ai.com'
  // return language === 'en-US' ? 'https://enterprise.cherryai.com/' : 'https://enterprise.cherry-ai.com'
}
