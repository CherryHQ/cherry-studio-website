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

i18n
  .use(LanguageDetector) // 使用语言检测器
  .use(initReactI18next)
  .init({
    resources,
    supportedLngs: ['en-US', 'zh-CN'],
    fallbackLng: 'en-US',
    // 国际域名强制使用英文
    lng: isInternational ? 'en-US' : undefined,
    detection: {
      // 非国际域名：仅使用本地缓存决定语言；首次访问走 fallbackLng（英文）
      order: isInternational ? [] : ['localStorage'],
      caches: isInternational ? [] : ['localStorage'],
      lookupLocalStorage: 'i18n-language'
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
