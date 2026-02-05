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

/**
 * 根据当前语言获取企业版网址
 * 英文使用 cherryai.com，中文使用 cherry-ai.com
 */
export function getEnterpriseUrl(language: string): string {
  return language === 'en-US' ? 'https://enterprise.cherryai.com/' : 'https://enterprise.cherry-ai.com'
}
