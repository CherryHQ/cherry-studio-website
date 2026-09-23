const ENGLISH_DOMAIN = 'cherryai.com'
const CHINESE_DOMAIN = 'cherryai.com.cn'
export const EXTERNAL_DOCS_URL = 'https://docs.cherryai.com.cn/'

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

export function getSiteRegion(): 'cn' | 'global' {
  const domainLanguage = getDomainDefaultLanguage()
  if (domainLanguage) return domainLanguage === 'zh-CN' ? 'cn' : 'global'

  return import.meta.env.VITE_SITE_LOCALE?.toLowerCase().startsWith('en') ? 'global' : 'cn'
}

export function isEnglishSite(language: string): boolean {
  return getSiteRegion() === 'global' && language.toLowerCase().startsWith('en')
}

export function isLanguageRedirectDomain(): boolean {
  return LANGUAGE_REDIRECT_DOMAINS.includes(getCurrentHostname())
}

export function getLanguageDomain(language: string): string {
  return language.toLowerCase().startsWith('zh') ? CHINESE_DOMAIN : ENGLISH_DOMAIN
}

export function redirectToLanguageDomain(language: string, options?: { replace?: boolean }): boolean {
  if (typeof window === 'undefined') return false

  const hostname = getCurrentHostname()
  const targetHostname = getLanguageDomain(language)

  if (isLocalDevelopmentHost(hostname) || hostname === targetHostname) return false

  const targetUrl = new URL(window.location.href)
  targetUrl.protocol = 'https:'
  targetUrl.host = targetHostname

  // Plus has no Chinese counterpart. Language switching returns to the Chinese homepage.
  if (targetHostname === CHINESE_DOMAIN && /^\/plus\/?$/i.test(targetUrl.pathname)) {
    targetUrl.pathname = '/'
    targetUrl.search = ''
    targetUrl.hash = ''
  }

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
  return language.toLowerCase().startsWith('zh')
    ? 'https://enterprise.cherryai.com.cn'
    : 'https://enterprise.cherryai.com'
}

export function getDocsUrl(language: string): string {
  return `/docs/${language.toLowerCase().startsWith('zh') ? 'zh-cn' : 'en'}/`
}

export function getMobileDocsUrl(language: string): string {
  return `${getDocsUrl(language)}mobile/`
}
