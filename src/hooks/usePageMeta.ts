import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { getLanguageDomain } from '@/utils/urls'

type PageType =
  | 'home'
  | 'download'
  | 'downloadV1'
  | 'downloadV2'
  | 'mobile'
  | 'theme'
  | 'careers'
  | 'flash'
  | 'flashUsage'
  | 'notFound'

interface PageMetaConfig {
  path: string
  // 归档页把 canonical 指回正式页面（与线上英文站一致）
  canonicalPath?: string
  noindex?: boolean
  // Flash 相关页面只在英文站存在，中文站没有对应页面
  chineseCounterpart?: boolean
}

const PAGE_META: Record<PageType, PageMetaConfig> = {
  home: { path: '/' },
  download: { path: '/download' },
  downloadV1: { path: '/download/v1', canonicalPath: '/download', noindex: true },
  downloadV2: { path: '/download/v2', canonicalPath: '/download' },
  mobile: { path: '/mobile' },
  theme: { path: '/theme' },
  careers: { path: '/careers' },
  flash: { path: '/flash', chineseCounterpart: false },
  flashUsage: { path: '/flash/usage', chineseCounterpart: false },
  notFound: { path: '/404', noindex: true }
}

export const usePageMeta = (pageType: PageType) => {
  const { t, i18n } = useTranslation()

  useEffect(() => {
    const config = PAGE_META[pageType]

    // 更新页面标题
    const title = t(`page_title.${pageType}`)
    document.title = title

    // 更新页面描述
    const description = t(`page_description.${pageType}`)
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', description)
    }

    // 更新 robots
    const robots = document.querySelector('meta[name="robots"]')
    if (robots) {
      robots.setAttribute(
        'content',
        config.noindex
          ? 'noindex, follow'
          : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
      )
    }

    // 更新 canonical 链接和多语言链接
    const currentLanguage = i18n.resolvedLanguage || i18n.language
    const canonicalOrigin = `https://${getLanguageDomain(currentLanguage)}`
    const pagePath = config.canonicalPath ?? config.path
    const canonicalUrl = `${canonicalOrigin}${pagePath}`

    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (canonical) {
      canonical.href = canonicalUrl
    }

    if (config.chineseCounterpart === false) {
      document.querySelector('link[rel="alternate"][hreflang="zh-CN"]')?.remove()
    }
    const alternates = [
      ...(config.chineseCounterpart === false
        ? []
        : [{ language: 'zh-CN', href: `https://cherryai.com.cn${pagePath}` }]),
      { language: 'en', href: `https://cherryai.com${pagePath}` },
      { language: 'x-default', href: canonicalUrl }
    ]
    for (const { language, href } of alternates) {
      const link =
        document.querySelector<HTMLLinkElement>(`link[rel="alternate"][hreflang="${language}"]`) ??
        document.createElement('link')
      link.rel = 'alternate'
      link.hreflang = language
      link.href = href
      if (!link.isConnected) document.head.appendChild(link)
    }

    document.querySelector('meta[property="og:url"]')?.setAttribute('content', canonicalUrl)

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

    // 更新 HTML lang 属性（兼容 en / en-US / zh / zh-CN）
    const htmlElement = document.documentElement
    const resolvedLanguage = i18n.resolvedLanguage || i18n.language
    const baseLang = resolvedLanguage.split('-')[0]

    const htmlLangMap: Record<string, string> = {
      zh: 'zh-CN',
      en: 'en',
      ja: 'ja',
      ko: 'ko',
      ru: 'ru',
      fr: 'fr',
      th: 'th'
    }
    const htmlLang = htmlLangMap[baseLang] || 'en'
    htmlElement.setAttribute('lang', htmlLang)

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
      const locale = localeMap[baseLang] || 'en_US'
      ogLocale.setAttribute('content', locale)
    }
  }, [t, i18n.language, pageType])
}
