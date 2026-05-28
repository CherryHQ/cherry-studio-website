import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

import {
  getDomainDefaultLanguage,
  isLanguageRedirectDomain,
  LANGUAGE_QUERY_PARAM,
  redirectToLanguageDomain
} from '@/utils/urls'
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

const LANGUAGE_STORAGE_KEY = 'i18n-language'

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

const getUrlLanguage = (): SupportedLanguage | null => {
  try {
    const language = new URL(window.location.href).searchParams.get(LANGUAGE_QUERY_PARAM)
    return normalizeToSupportedLanguage(language)
  } catch {
    return null
  }
}

const getStoredLanguage = (): SupportedLanguage | null => {
  try {
    const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY)
    return normalizeToSupportedLanguage(stored)
  } catch {
    return null
  }
}

const getBrowserLanguage = (): SupportedLanguage | null => {
  try {
    const browserLang =
      (typeof navigator !== 'undefined' && (navigator.languages?.[0] || navigator.language)) || undefined

    if (browserLang) return normalizeToSupportedLanguage(browserLang) ?? 'en-US'
    return null
  } catch {
    return null
  }
}

const persistUrlLanguage = (language: SupportedLanguage | null) => {
  if (!language) return

  try {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language)
  } catch {
    // ignore
  }

  try {
    const url = new URL(window.location.href)
    if (!url.searchParams.has(LANGUAGE_QUERY_PARAM)) return

    url.searchParams.delete(LANGUAGE_QUERY_PARAM)
    window.history.replaceState(window.history.state, '', `${url.pathname}${url.search}${url.hash}`)
  } catch {
    // ignore
  }
}

const getInitialLanguage = (
  domainDefaultLanguage: SupportedLanguage | null,
  urlLanguage: SupportedLanguage | null,
  storedLanguage: SupportedLanguage | null,
  browserLanguage: SupportedLanguage | null
): SupportedLanguage => {
  // 固定语言域名优先：cherryai.com 只显示英文，cherryai.com.cn 只显示中文
  if (domainDefaultLanguage) return domainDefaultLanguage

  // 1) URL 参数：跨域语言切换落地时优先，随后会写入当前域名的 localStorage
  if (urlLanguage) return urlLanguage

  // 2) localStorage：用户手动切换过则优先
  if (storedLanguage) return storedLanguage

  // 3) 浏览器语言：简体/繁体中文都设为中文，其他设为英文
  if (browserLanguage) return browserLanguage

  // 4) 都没有：默认中文
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
const shouldRedirectLanguageDomain = isLanguageRedirectDomain()
const urlLanguage = getUrlLanguage()
const storedLanguage = getStoredLanguage()
const browserLanguage = getBrowserLanguage()
const preferredLanguage = urlLanguage ?? storedLanguage ?? browserLanguage

const isRedirectingToPreferredDomain =
  shouldRedirectLanguageDomain && !!preferredLanguage && redirectToLanguageDomain(preferredLanguage, { replace: true })

if (!isRedirectingToPreferredDomain) {
  persistUrlLanguage(urlLanguage)
}

const initialLanguage = getInitialLanguage(domainDefaultLanguage, urlLanguage, storedLanguage, browserLanguage)

i18n
  .use(LanguageDetector) // 仅用于缓存到 localStorage（caches），初始语言由我们控制
  .use(initReactI18next)
  .init({
    resources,
    supportedLngs: [...SUPPORTED_LANGUAGES],
    fallbackLng: domainDefaultLanguage ?? 'zh-CN',
    lng: initialLanguage,
    detection: {
      // 缓存 key 兼容旧逻辑；未来 LanguageSelector 仍会触发 detector 写入该 key
      order: ['localStorage'],
      caches: isRedirectingToPreferredDomain ? [] : ['localStorage'],
      lookupLocalStorage: LANGUAGE_STORAGE_KEY
    },
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
