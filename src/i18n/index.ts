import i18n from 'i18next'
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

// 检测浏览器语言并返回支持的语言
const detectBrowserLanguage = (): string => {
  const browserLang = navigator.language || navigator.languages?.[0] || 'en'

  // 繁体中文检测
  if (browserLang === 'zh-TW' || browserLang === 'zh-HK' || browserLang === 'zh-MO') {
    return 'zh-TW'
  }

  // 简体中文检测
  if (browserLang.startsWith('zh')) {
    return 'zh'
  }

  // 日语检测
  if (browserLang.startsWith('ja')) {
    return 'ja'
  }

  // 韩语检测
  if (browserLang.startsWith('ko')) {
    return 'ko'
  }

  // 俄语检测
  if (browserLang.startsWith('ru')) {
    return 'ru'
  }

  // 法语检测
  if (browserLang.startsWith('fr')) {
    return 'fr'
  }

  // 泰语检测
  if (browserLang.startsWith('th')) {
    return 'th'
  }

  // 其他情况返回英文
  return 'en'
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

i18n.use(initReactI18next).init({
  resources,
  lng: detectBrowserLanguage(),
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false
  }
})

// 监听语言变化，更新HTML lang属性
i18n.on('languageChanged', (lng) => {
  updateHtmlLang(lng)
})

// 初始化时设置HTML lang属性
updateHtmlLang(i18n.language)

export default i18n
 