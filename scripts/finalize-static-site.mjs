import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const distDir = join(process.cwd(), 'dist')
const target = process.env.SITE_LOCALE || process.argv[2] || 'zh'

const configs = {
  zh: {
    lang: 'zh-CN',
    domain: 'https://cherryai.com.cn',
    title: 'Cherry Studio 官方网站 - 全能 AI 工作站',
    ogTitle: 'Cherry Studio 官方网站 - 全能 AI 工作站 | 免费开源',
    shareTitle: 'Cherry Studio - 全能的多模型 AI 助手',
    description:
      'Cherry Studio AI桌面客户端，开源、免费、且功能强大。AI agent、AI 对话、AI绘图、知识库等功能齐全，支持所有主流大模型，支持Windows/macOS/Linux，支持数据本地存储，是AI深度使用者的首选',
    keywords:
      'Cherry Studio, AI 助手, AI 客户端, LLM, ChatGPT, Claude, Gemini, DeepSeek, 人工智能, AI 对话, AI 知识库, AI 绘图, AI 翻译, AI agent, AI智能体, macOS, Windows, Linux, 开源 AI, 多模型 AI, Ollama, LM Studio, 本地大模型',
    ogLocale: 'zh_CN',
    ogLocaleAlternate: 'en_US',
    imageAlt: 'Cherry Studio - 多模型 AI 助手桌面客户端',
    rssTitle: 'Cherry Studio 更新日志',
    websiteAlternateName: 'Cherry Studio 官方网站',
    publisherName: '上海千彗科技有限公司',
    baiduAnalytics: true
  },
  en: {
    lang: 'en',
    domain: 'https://cherryai.com',
    title: 'Cherry Studio - The All-in-One AI Workstation',
    ogTitle: 'Cherry Studio - The All-in-One AI Workstation | Free and Open Source',
    shareTitle: 'Cherry Studio - All-in-One Multi-Model AI Assistant',
    description:
      'Cherry Studio is an open-source, free, and powerful AI desktop client. It includes AI agents, AI chat, AI image generation, knowledge base, and more, supports all major LLMs, runs on Windows/macOS/Linux, stores data locally, and is built for heavy AI users.',
    keywords:
      'Cherry Studio, AI assistant, AI client, LLM, ChatGPT, Claude, Gemini, DeepSeek, artificial intelligence, AI chat, AI knowledge base, AI image generation, AI translation, AI agent, macOS, Windows, Linux, open-source AI, multi-model AI, Ollama, LM Studio, local LLM',
    ogLocale: 'en_US',
    ogLocaleAlternate: 'zh_CN',
    imageAlt: 'Cherry Studio - Multi-model AI assistant desktop client',
    rssTitle: 'Cherry Studio Updates',
    websiteAlternateName: 'Cherry Studio Official Website',
    publisherName: 'Cherry Studio Team',
    baiduAnalytics: false
  }
}

const config = configs[target]

if (!config) {
  throw new Error(`Unsupported SITE_LOCALE "${target}". Expected "zh" or "en".`)
}

function replaceTagAttribute(html, tagPattern, attribute, value) {
  return html.replace(tagPattern, (tag) => {
    const escapedValue = value.replace(/"/g, '&quot;')
    const attrPattern = new RegExp(`\\s${attribute}="[^"]*"`)

    if (attrPattern.test(tag)) {
      return tag.replace(attrPattern, ` ${attribute}="${escapedValue}"`)
    }

    return tag.replace(/\/?>$/, ` ${attribute}="${escapedValue}"$&`)
  })
}

function replaceMetaContent(html, attribute, attributeValue, content) {
  const escapedAttributeValue = attributeValue.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const pattern = new RegExp(`<meta\\s+${attribute}="${escapedAttributeValue}"[^>]*>`, 'g')
  return replaceTagAttribute(html, pattern, 'content', content)
}

function replaceLinkHref(html, rel, extraSelector, href) {
  const pattern = new RegExp(`<link\\s+rel="${rel}"${extraSelector}[^>]*>`, 'g')
  return replaceTagAttribute(html, pattern, 'href', href)
}

function replaceJsonLd(html, type, updater) {
  return html.replace(
    /<script type="application\/ld\+json">\s*([\s\S]*?)\s*<\/script>/g,
    (fullMatch, jsonText) => {
      const data = JSON.parse(jsonText)

      if (data['@type'] !== type) return fullMatch

      const nextData = updater(data)
      const nextJson = JSON.stringify(nextData, null, 2)

      return `<script type="application/ld+json">\n${nextJson}\n  </script>`
    }
  )
}

function applyIndexTarget() {
  const indexPath = join(distDir, 'index.html')
  let html = readFileSync(indexPath, 'utf8')
  const currentUrl = `${config.domain}/`
  const socialImage = `${config.domain}/assets/images/social-card.jpg`

  html = html.replace(/<html lang="[^"]*">/, `<html lang="${config.lang}">`)
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${config.title}</title>`)
  html = replaceLinkHref(html, 'canonical', '', currentUrl)
  html = replaceLinkHref(html, 'alternate', '\\s+hreflang="zh-CN"', 'https://cherryai.com.cn/')
  html = replaceLinkHref(html, 'alternate', '\\s+hreflang="en"', 'https://cherryai.com/')
  html = replaceLinkHref(html, 'alternate', '\\s+hreflang="x-default"', currentUrl)
  html = replaceMetaContent(html, 'name', 'description', config.description)
  html = replaceMetaContent(html, 'name', 'keywords', config.keywords)
  html = replaceMetaContent(html, 'property', 'og:url', currentUrl)
  html = replaceMetaContent(html, 'property', 'og:title', config.ogTitle)
  html = replaceMetaContent(html, 'property', 'og:description', config.description)
  html = replaceMetaContent(html, 'property', 'og:image', socialImage)
  html = replaceMetaContent(html, 'property', 'og:locale', config.ogLocale)
  html = replaceMetaContent(html, 'property', 'og:locale:alternate', config.ogLocaleAlternate)
  html = replaceMetaContent(html, 'property', 'og:image:alt', config.imageAlt)
  html = replaceMetaContent(html, 'name', 'twitter:title', config.shareTitle)
  html = replaceMetaContent(html, 'name', 'twitter:description', config.description)
  html = replaceMetaContent(html, 'name', 'twitter:image', socialImage)
  html = replaceMetaContent(html, 'name', 'twitter:image:alt', config.imageAlt)
  html = replaceMetaContent(html, 'name', 'twitter:domain', config.domain.replace('https://', ''))
  html = replaceMetaContent(html, 'itemprop', 'name', config.shareTitle)
  html = replaceMetaContent(html, 'itemprop', 'description', config.description)
  html = replaceMetaContent(html, 'itemprop', 'image', socialImage)
  html = replaceMetaContent(html, 'name', 'qq:title', config.shareTitle)
  html = replaceMetaContent(html, 'name', 'qq:description', config.description)
  html = replaceMetaContent(html, 'name', 'qq:image', socialImage)
  html = html.replace(
    /<link rel="alternate" type="application\/rss\+xml" title="[^"]*" href="[^"]*" \/>/,
    `<link rel="alternate" type="application/rss+xml" title="${config.rssTitle}" href="https://cherry-rss.ocool.online/" />`
  )

  html = replaceJsonLd(html, 'Organization', (data) => ({
    ...data,
    url: config.domain,
    logo: `${config.domain}/assets/images/favicon.png`,
    description: config.description
  }))

  html = replaceJsonLd(html, 'SoftwareApplication', (data) => ({
    ...data,
    description: config.description,
    downloadUrl: `${config.domain}/download`,
    featureList:
      target === 'zh'
        ? data.featureList
        : [
            '50+ AI providers',
            '300+ AI models',
            'Local LLM support with Ollama and LM Studio',
            'AI chat, knowledge base, image generation, and translation',
            '300+ built-in assistants',
            'Cross-platform support for Windows, macOS, and Linux',
            'Free and open source'
          ]
  }))

  html = replaceJsonLd(html, 'WebSite', (data) => ({
    ...data,
    alternateName: config.websiteAlternateName,
    url: config.domain,
    description: config.description,
    publisher: {
      ...data.publisher,
      name: config.publisherName
    }
  }))

  html = html.replace(/\s*<script>\s*var _hmt[\s\S]*?hm\.src = "https:\/\/hm\.baidu\.com\/hm\.js\?449345f4fcbd338fc35a4ca7c70922d4";[\s\S]*?<\/script>/, (match) =>
    config.baiduAnalytics ? match : ''
  )

  if (target === 'en') {
    html = html.replace(/\s*<!--[\s\S]*?-->/g, '')
  }

  writeFileSync(indexPath, html)
}

function applyRobotsTarget() {
  const robots = `User-agent: *\nAllow: /\n\nSitemap: ${config.domain}/sitemap.xml\n`
  writeFileSync(join(distDir, 'robots.txt'), robots)
}

function applyPlusTarget() {
  if (target !== 'en') return

  const translations = JSON.parse(readFileSync(join(process.cwd(), 'src/i18n/lang/en.json'), 'utf8'))
  const title = translations.page_title.plus
  const description = translations.page_description.plus
  const url = `${config.domain}/plus`
  let html = readFileSync(join(distDir, 'index.html'), 'utf8')
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`)
  html = html.replace(/<link\s+rel="alternate"\s+hreflang="zh-CN"[^>]*>/g, '')
  html = replaceLinkHref(html, 'canonical', '', url)
  for (const language of ['en', 'x-default']) {
    html = replaceLinkHref(html, 'alternate', `\\s+hreflang="${language}"`, url)
  }
  for (const [attribute, name, content] of [
    ['name', 'description', description],
    ['property', 'og:url', url],
    ['property', 'og:title', title],
    ['property', 'og:description', description],
    ['name', 'twitter:title', title],
    ['name', 'twitter:description', description],
    ['itemprop', 'name', title],
    ['itemprop', 'description', description],
    ['name', 'qq:title', title],
    ['name', 'qq:description', description]
  ]) {
    html = replaceMetaContent(html, attribute, name, content)
  }
  // The desktop app's free offer does not describe the Plus plan.
  html = html.replace(/<script type="application\/ld\+json">\s*([\s\S]*?)\s*<\/script>/g, (match, json) =>
    JSON.parse(json)['@type'] === 'SoftwareApplication' ? '' : match
  )
  mkdirSync(join(distDir, 'plus'), { recursive: true })
  writeFileSync(join(distDir, 'plus/index.html'), html)
}

function applySitemapTarget() {
  const siteUrls = ['/', '/download', '/mobile', ...(target === 'en' ? ['/plus'] : [])]
  const priorities = ['1.0', '0.9', '0.9', '0.8']
  const entries = siteUrls
    .map(
      (path, index) => `  <url>
    <loc>${config.domain}${path === '/' ? '/' : path}</loc>
    <priority>${priorities[index]}</priority>
  </url>`
    )
    .join('\n')

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
  <url>
    <loc>https://docs.cherryai.com.cn/</loc>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://enterprise.cherryai.com.cn/</loc>
    <priority>0.7</priority>
  </url>
</urlset>
`

  writeFileSync(join(distDir, 'sitemap.xml'), sitemap)
}

applyIndexTarget()
applyPlusTarget()
applyRobotsTarget()
applySitemapTarget()

console.log(`Finalized ${target} static site for ${config.domain}`)
