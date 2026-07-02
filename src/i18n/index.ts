import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import { getDomainDefaultLanguage, isLanguageRedirectDomain, redirectToLanguageDomain } from '@/utils/urls'
import en from './lang/en.json'
import zh from './lang/zh.json'

const resources = {
  'en-US': {
    translation: en
  },
  'zh-CN': {
    translation: zh
  }
}

const SUPPORTED_LANGUAGES = ['en-US', 'zh-CN'] as const

type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number]

const normalizeToSupportedLanguage = (input: string | null | undefined): SupportedLanguage | null => {
  if (!input) return null

  const lower = input.toLowerCase()

  // 简体 / 繁体 / 任何中文变体：都映射到 zh-CN
  if (lower.startsWith('zh')) return 'zh-CN'

  // 任何英文变体：映射到 en-US
  if (lower.startsWith('en')) return 'en-US'

  // 其他语言不在 supportedLngs 内；返回 null 让上层决定（通常映射到英文）
  return null
}

const getEnvironmentLanguage = (): SupportedLanguage | null => {
  return normalizeToSupportedLanguage(import.meta.env.VITE_SITE_LOCALE)
}

const getInitialLanguage = (domainDefaultLanguage: SupportedLanguage | null): SupportedLanguage => {
  // 固定语言域名优先：cherryai.com 只显示英文，cherryai.com.cn 只显示中文
  if (domainDefaultLanguage) return domainDefaultLanguage

  // 本地和非固定域名通过 VITE_SITE_LOCALE 区分语言
  const environmentLanguage = getEnvironmentLanguage()
  if (environmentLanguage) return environmentLanguage

  return 'zh-CN'
}

// 更新HTML lang属性的函数
const updateHtmlLang = (language: string) => {
  const lower = language.toLowerCase()

  // 与 index.html 的 hreflang 保持一致：英文用 'en'，中文用 'zh-CN'
  if (lower.startsWith('en')) {
    document.documentElement.setAttribute('lang', 'en')
    return
  }

  if (lower.startsWith('zh')) {
    document.documentElement.setAttribute('lang', 'zh-CN')
    return
  }

  document.documentElement.setAttribute('lang', 'en')
}

const domainDefaultLanguage = getDomainDefaultLanguage()
const shouldRedirectLanguageDomain = !domainDefaultLanguage && isLanguageRedirectDomain()
const initialLanguage = getInitialLanguage(domainDefaultLanguage)

if (shouldRedirectLanguageDomain) {
  redirectToLanguageDomain(initialLanguage, { replace: true })
}

i18n.use(initReactI18next).init({
  resources,
  supportedLngs: [...SUPPORTED_LANGUAGES],
  fallbackLng: domainDefaultLanguage ?? 'zh-CN',
  lng: initialLanguage,
  interpolation: {
    escapeValue: false
  }
})

// 监听语言变化，更新HTML lang属性
i18n.on('languageChanged', () => {
  updateHtmlLang(i18n.resolvedLanguage || i18n.language)
})

// 初始化时设置HTML lang属性
updateHtmlLang(i18n.resolvedLanguage || i18n.language)

export default i18n
