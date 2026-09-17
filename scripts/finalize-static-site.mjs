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
    baiduAnalytics: true,
    // 中文站 sitemap 额外带的站点
    extraSitemapEntries: [
      { url: 'https://docs.cherryai.com.cn/', priority: '0.8' },
      { url: 'https://enterprise.cherryai.com.cn/', priority: '0.7' }
    ]
  },
  en: {
    lang: 'en',
    domain: 'https://cherryai.com',
    title: 'Cherry Studio - The All-in-One AI Workstation',
    ogTitle: 'Cherry Studio - The All-in-One AI Workstation | Free and Open Source',
    shareTitle: 'Cherry Studio - All-in-One Multi-Model AI Assistant',
    description:
      'Open-source AI desktop client for Mac, Windows and Linux. Run frontier models from DeepSeek, Qwen, GLM and more, with your data stored locally.',
    keywords:
      'Cherry Studio, AI assistant, AI client, LLM, ChatGPT, Claude, Gemini, DeepSeek, artificial intelligence, AI chat, AI knowledge base, AI image generation, AI translation, AI agent, macOS, Windows, Linux, open-source AI, multi-model AI, Ollama, LM Studio, local LLM',
    ogLocale: 'en_US',
    ogLocaleAlternate: 'zh_CN',
    imageAlt: 'Cherry Studio - Multi-model AI assistant desktop client',
    rssTitle: 'Cherry Studio Updates',
    websiteAlternateName: 'Cherry Studio Official Website',
    publisherName: 'Cherry Studio Team',
    baiduAnalytics: false,
    extraSitemapEntries: []
  }
}

const config = configs[target]

if (!config) {
  throw new Error(`Unsupported SITE_LOCALE "${target}". Expected "zh" or "en".`)
}

const translations = JSON.parse(readFileSync(join(process.cwd(), `src/i18n/lang/${target}.json`), 'utf8'))

const DEFAULT_ROBOTS = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
const NOINDEX_ROBOTS = 'noindex, follow'

// 与 src/hooks/usePageMeta.ts 的页面表保持一致；canonicalPath 指回正式页面。
// 英文站额外生成每个路由的静态 HTML，中文站目前仍只输出首页。
const ROUTES = {
  en: [
    { path: '/download', key: 'download' },
    { path: '/download/v1', key: 'download_v1', canonicalPath: '/download', noindex: true },
    { path: '/download/v2', key: 'download_v2', canonicalPath: '/download' },
    { path: '/flash', key: 'flash', chineseCounterpart: false, flashPlan: true },
    { path: '/flash/usage', key: 'flash_usage', chineseCounterpart: false, dropSoftwareApplication: true },
    { path: '/theme', key: 'theme', dropSoftwareApplication: true }
  ],
  // 中文站保持原有产物：只输出首页，不额外生成路由 HTML
  zh: []
}

const NOT_FOUND = { path: '/404', key: 'not_found', noindex: true }

const SITEMAP = {
  en: [
    { path: '/', priority: '1.0' },
    { path: '/download', priority: '0.9' },
    { path: '/flash', priority: '0.9' },
    { path: '/flash/usage', priority: '0.6' },
    { path: '/theme', priority: '0.7' }
  ],
  zh: [
    { path: '/', priority: '1.0' },
    { path: '/download', priority: '0.9' },
    { path: '/mobile', priority: '0.9' }
  ]
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

function dropJsonLd(html, type) {
  return html.replace(
    /<script type="application\/ld\+json">\s*([\s\S]*?)\s*<\/script>/g,
    (fullMatch, jsonText) => (JSON.parse(jsonText)['@type'] === type ? '' : fullMatch)
  )
}

function appendJsonLd(html, data) {
  const block = `<script type="application/ld+json">\n${JSON.stringify(data, null, 2)}\n  </script>`
  return html.replace('</head>', `  ${block}\n</head>`)
}

// 英文站的 llms.txt / 404 页与中文站共用同一套 meta 生成逻辑
function buildRouteHtml(route) {
  const title = translations.page_title[route.key]
  const description = translations.page_description[route.key]
  const canonicalPath = route.canonicalPath ?? route.path
  const canonicalUrl = `${config.domain}${canonicalPath}`
  const englishUrl = `https://cherryai.com${canonicalPath}`
  let html = readFileSync(join(distDir, 'index.html'), 'utf8')

  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`)
  html = replaceMetaContent(html, 'name', 'description', description)
  html = replaceMetaContent(
    html,
    'name',
    'robots',
    route.noindex ? NOINDEX_ROBOTS : DEFAULT_ROBOTS
  )
  html = replaceLinkHref(html, 'canonical', '', canonicalUrl)

  for (const language of ['en', 'x-default']) {
    html = replaceLinkHref(html, 'alternate', `\\s+hreflang="${language}"`, englishUrl)
  }
  if (route.chineseCounterpart === false) {
    html = html.replace(/<link\s+rel="alternate"\s+hreflang="zh-CN"[^>]*>/g, '')
  } else {
    html = replaceLinkHref(html, 'alternate', '\\s+hreflang="zh-CN"', `https://cherryai.com.cn${canonicalPath}`)
  }

  for (const [attribute, name, content] of [
    ['property', 'og:url', canonicalUrl],
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

  if (route.dropSoftwareApplication) {
    // 桌面客户端的免费说明不描述这些页面
    html = dropJsonLd(html, 'SoftwareApplication')
  }

  if (route.flashPlan) {
    html = dropJsonLd(html, 'SoftwareApplication')
    html = appendJsonLd(html, buildFlashProductJsonLd(canonicalUrl))
    html = appendJsonLd(html, buildFlashFaqJsonLd())
  }

  return html
}

function buildFlashProductJsonLd(url) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Cherry Studio Flash',
    description:
      'Monthly subscription bundling DeepSeek V4 Flash, Qwen 3.8 Flash and GLM 5.3 Flash inside Cherry Studio, with no separate provider accounts.',
    brand: {
      '@type': 'Brand',
      name: 'Cherry Studio'
    },
    offers: {
      '@type': 'Offer',
      price: '8',
      priceCurrency: 'USD',
      url,
      availability: 'https://schema.org/InStock',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: '8',
        priceCurrency: 'USD',
        billingDuration: 1,
        billingIncrement: 1,
        unitCode: 'MON'
      }
    }
  }
}

function buildFlashFaqJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: translations.pricing.faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer
      }
    }))
  }
}

function writeRouteHtml(route) {
  const html = buildRouteHtml(route)
  const dir = join(distDir, route.path)

  mkdirSync(dir, { recursive: true })
  writeFileSync(join(dir, 'index.html'), html)
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
  const robots =
    target === 'en'
      ? `User-agent: *
Allow: /
Content-Signal: search=yes, ai-input=yes, use=reference

# 显式放行 AI 检索与训练爬虫
User-agent: GPTBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Claude-SearchBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: PerplexityBot
Allow: /

Sitemap: ${config.domain}/sitemap.xml
`
      : `User-agent: *\nAllow: /\n\nSitemap: ${config.domain}/sitemap.xml\n`

  writeFileSync(join(distDir, 'robots.txt'), robots)
}

function applySitemapTarget() {
  const entries = SITEMAP[target]
    .map(
      ({ path, priority }) => `  <url>
    <loc>${config.domain}${path === '/' ? '/' : path}</loc>
    <priority>${priority}</priority>
  </url>`
    )
    .join('\n')

  const extras = config.extraSitemapEntries
    .map(
      ({ url, priority }) => `  <url>
    <loc>${url}</loc>
    <priority>${priority}</priority>
  </url>`
    )
    .join('\n')

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}${extras ? `\n${extras}` : ''}
</urlset>
`

  writeFileSync(join(distDir, 'sitemap.xml'), sitemap)
}

const LLMS_INTRO =
  'Open-source AI desktop client for macOS, Windows and Linux. Run 300+ models from 50+ providers in one app, with conversations stored locally.'

const LLMS_PAGES = ['home', 'download', 'flash', 'flash_usage', 'theme']
const LLMS_PATH_BY_KEY = {
  home: '/',
  download: '/download',
  flash: '/flash',
  flash_usage: '/flash/usage',
  theme: '/theme'
}

const LLMS_FULL = `# Cherry Studio

Cherry Studio is a free, open-source AI desktop client for macOS, Windows and Linux,
released under the AGPL-3.0 licence.

## What it does

- AI chat and autonomous agents
- Image generation across multiple drawing models
- Inline and full-page translation
- Knowledge base built from local files and web pages
- Works with text, images, Office documents and PDFs
- 300+ built-in assistants, no prompt engineering required

## Models and providers

- 300+ models from 50+ providers, including OpenAI, Anthropic, Google, DeepSeek, Qwen and GLM
- Local models via Ollama and LM Studio
- Bring your own API keys, or subscribe to the Flash plan

## Data ownership

- Conversations are stored on the user's own machine
- Providers are reached with the user's own API keys
- Local and cloud backup, including WebDAV
- Free and open source under AGPL-3.0

## Pricing

Cherry Studio itself is free and open source.

Flash is an optional subscription at $8 per month (regular price $10) that bundles
frontier models with no separate provider accounts:

- DeepSeek V4 Flash: input Off-peak $0.22 / Peak $0.44, output Off-peak $0.66 / Peak $1.32, monthly allowance $18
- DeepSeek V4.1 Flash: input Off-peak $0.15 / Peak $0.30, output Off-peak $0.60 / Peak $1.20, monthly allowance $16
- Qwen 3.8 Flash: input $0.15, output $0.47, monthly allowance $12
- GLM 5.3 Flash: input $0.15, output $0.50, monthly allowance $12

Full pricing: https://cherryai.com/flash

## Frequently asked questions

${translations.pricing.faq.map((item) => `Q: ${item.question}\nA: ${item.answer}`).join('\n\n')}

## Links

- Website: https://cherryai.com
- Download: https://cherryai.com/download
- Flash: https://cherryai.com/flash
- GitHub: https://github.com/CherryHQ/cherry-studio
- Discord: https://discord.gg/wez8HtpxqQ
`

function applyLlmsTarget() {
  if (target !== 'en') return

  const pages = LLMS_PAGES.map(
    (key) =>
      `- [${translations.page_title[key]}](${config.domain}${LLMS_PATH_BY_KEY[key]}): ${translations.page_description[key]}`
  ).join('\n')

  const llms = `# Cherry Studio

> ${LLMS_INTRO}

## Pages

${pages}

## Links

- [Download](${config.domain}/download)
- [Flash](${config.domain}/flash)
- [GitHub](https://github.com/CherryHQ/cherry-studio)
- [Discord](https://discord.gg/wez8HtpxqQ)
`

  writeFileSync(join(distDir, 'llms.txt'), llms)
  writeFileSync(join(distDir, 'llms-full.txt'), LLMS_FULL)
}

applyIndexTarget()

for (const route of ROUTES[target]) {
  writeRouteHtml(route)
}

// 404 页面：中英文站都输出，供静态托管直接使用
writeFileSync(join(distDir, '404.html'), buildRouteHtml(NOT_FOUND))

applyRobotsTarget()
applySitemapTarget()
applyLlmsTarget()

console.log(`Finalized ${target} static site for ${config.domain}`)
