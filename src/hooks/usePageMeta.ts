import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

type PageType = 'home' | 'download' | 'enterprise' | 'theme' | 'careers'

export const usePageMeta = (pageType: PageType) => {
  const { t, i18n } = useTranslation()

  useEffect(() => {
    // 更新页面标题
    const title = t(`page_title.${pageType}`)
    document.title = title

    // 更新页面描述
    const description = t(`page_description.${pageType}`)
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', description)
    }

    // 更新 Open Graph 标题
    const ogTitle = document.querySelector('meta[property="og:title"]')
    if (ogTitle) {
      ogTitle.setAttribute('content', title)
    }

    // 更新 Open Graph 描述
    const ogDescription = document.querySelector('meta[property="og:description"]')
    if (ogDescription) {
      ogDescription.setAttribute('content', description)
    }

    // 更新 Twitter 标题
    const twitterTitle = document.querySelector('meta[name="twitter:title"]')
    if (twitterTitle) {
      twitterTitle.setAttribute('content', title)
    }

    // 更新 Twitter 描述
    const twitterDescription = document.querySelector('meta[name="twitter:description"]')
    if (twitterDescription) {
      twitterDescription.setAttribute('content', description)
    }

    // 更新微信分享标题
    const wechatTitle = document.querySelector('meta[itemprop="name"]')
    if (wechatTitle) {
      wechatTitle.setAttribute('content', title)
    }

    // 更新微信分享描述
    const wechatDescription = document.querySelector('meta[itemprop="description"]')
    if (wechatDescription) {
      wechatDescription.setAttribute('content', description)
    }

    // 更新 QQ 分享标题
    const qqTitle = document.querySelector('meta[name="qq:title"]')
    if (qqTitle) {
      qqTitle.setAttribute('content', title)
    }

    // 更新 QQ 分享描述
    const qqDescription = document.querySelector('meta[name="qq:description"]')
    if (qqDescription) {
      qqDescription.setAttribute('content', description)
    }

    // 更新 HTML lang 属性
    const htmlElement = document.documentElement
    const langMap: Record<string, string> = {
      zh: 'zh-CN',
      en: 'en',
      ja: 'ja',
      ko: 'ko',
      ru: 'ru',
      fr: 'fr',
      th: 'th'
    }
    const langCode = langMap[i18n.language] || 'zh-CN'
    htmlElement.setAttribute('lang', langCode)

    // 更新 og:locale
    const ogLocale = document.querySelector('meta[property="og:locale"]')
    if (ogLocale) {
      const localeMap: Record<string, string> = {
        zh: 'zh_CN',
        en: 'en_US',
        ja: 'ja_JP',
        ko: 'ko_KR',
        ru: 'ru_RU',
        fr: 'fr_FR',
        th: 'th_TH'
      }
      const locale = localeMap[i18n.language] || 'zh_CN'
      ogLocale.setAttribute('content', locale)
    }
  }, [t, i18n.language, pageType])
}
