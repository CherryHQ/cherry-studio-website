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
  const langMap: Record<string, string> = {
    'zh-CN': 'zh-CN',
    'en-US': 'en-US'
  }
  const langCode = langMap[language] || 'zh-CN'
  document.documentElement.setAttribute('lang', langCode)
}

// 判断是否是国际域名（cherryai.com / www.cherryai.com）
const isInternational = isInternationalDomain()

i18n
  .use(LanguageDetector) // 使用语言检测器
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en-US',
    // 国际域名强制使用英文
    lng: isInternational ? 'en-US' : undefined,
    detection: {
      // 国际域名不使用语言检测，直接使用英文
      order: isInternational ? [] : ['localStorage', 'navigator'],
      caches: isInternational ? [] : ['localStorage'],
      lookupLocalStorage: 'i18n-language'
    },
    interpolation: {
      escapeValue: false
    }
  })

// 监听语言变化，更新HTML lang属性
i18n.on('languageChanged', (lng: string) => {
  updateHtmlLang(lng)
})

// 初始化时设置HTML lang属性
updateHtmlLang(i18n.language)

export default i18n
