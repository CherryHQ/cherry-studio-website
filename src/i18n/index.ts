import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

import { isInternationalDomain } from '@/utils/urls'
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

const getInitialLanguage = (isInternational: boolean): SupportedLanguage => {
  // 国际域名强制使用英文
  if (isInternational) return 'en-US'

  // 1) localStorage：用户手动切换过则优先
  try {
    const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY)
    const normalized = normalizeToSupportedLanguage(stored)
    if (normalized) return normalized
  } catch {
    // ignore
  }

  // 2) 浏览器语言：简体/繁体中文都设为中文，其他设为英文
  try {
    const browserLang =
      (typeof navigator !== 'undefined' && (navigator.languages?.[0] || navigator.language)) || undefined

    if (browserLang) {
      return normalizeToSupportedLanguage(browserLang) ?? 'en-US'
    }
  } catch {
    // ignore
  }

  // 3) 都没有：默认中文
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

// 判断是否是国际域名（cherryai.com / www.cherryai.com）
const isInternational = isInternationalDomain()

const initialLanguage = getInitialLanguage(isInternational)

i18n
  .use(LanguageDetector) // 仅用于缓存到 localStorage（caches），初始语言由我们控制
  .use(initReactI18next)
  .init({
    resources,
    supportedLngs: [...SUPPORTED_LANGUAGES],
    fallbackLng: isInternational ? 'en-US' : 'zh-CN',
    lng: initialLanguage,
    detection: {
      // 缓存 key 兼容旧逻辑；未来 LanguageSelector 仍会触发 detector 写入该 key
      order: isInternational ? [] : ['localStorage'],
      caches: isInternational ? [] : ['localStorage'],
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
