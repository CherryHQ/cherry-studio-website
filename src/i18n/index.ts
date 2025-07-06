import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

import en from './lang/en.json'
import fr from './lang/fr.json'
import ja from './lang/ja.json'
import ko from './lang/ko.json'
import ru from './lang/ru.json'
import th from './lang/th.json'
import zh from './lang/zh.json'
import zhTW from './lang/zh-TW.json'

const resources = {
  en: {
    translation: en
  },
  zh: {
    translation: zh
  },
  'zh-TW': {
    translation: zhTW
  },
  ja: {
    translation: ja
  },
  ko: {
    translation: ko
  },
  ru: {
    translation: ru
  },
  fr: {
    translation: fr
  },
  th: {
    translation: th
  }
}

// 更新HTML lang属性的函数
const updateHtmlLang = (language: string) => {
  const langMap: Record<string, string> = {
    zh: 'zh-CN',
    'zh-TW': 'zh-TW',
    en: 'en',
    ja: 'ja',
    ko: 'ko',
    ru: 'ru',
    fr: 'fr',
    th: 'th'
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
 