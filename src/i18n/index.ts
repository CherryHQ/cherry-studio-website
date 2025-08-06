import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

import en from './lang/en.json'
import zh from './lang/zh.json'
import zhTW from './lang/zh-tw.json'

const resources = {
  'en-US': {
    translation: en
  },
  'zh-CN': {
    translation: zh
  },
  'zh-TW': {
    translation: zhTW
  }
}

// 更新HTML lang属性的函数
const updateHtmlLang = (language: string) => {
  const langMap: Record<string, string> = {
    'zh-CN': 'zh-CN',
    'zh-TW': 'zh-TW',
    'en-US': 'en-US'
  }
  const langCode = langMap[language] || 'zh-CN'
  document.documentElement.setAttribute('lang', langCode)
}

i18n
  .use(LanguageDetector) // 使用语言检测器
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    detection: {
      order: ['localStorage', 'navigator'], // 优先从本地存储中检测语言，然后是浏览器语言
      caches: ['localStorage'], // 缓存语言到localStorage
      lookupLocalStorage: 'i18nextLng' // localStorage中存储语言的键名
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
