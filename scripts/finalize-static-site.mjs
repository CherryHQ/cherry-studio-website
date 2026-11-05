import { createHash } from 'node:crypto'
import { existsSync, mkdirSync, readdirSync, readFileSync, renameSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'

import { marked } from 'marked'

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
      { url: 'https://cherryai.com.cn/docs/zh-cn/', priority: '0.8' },
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
    extraSitemapEntries: [
      { url: 'https://cherryai.com/docs/en/', priority: '0.8' },
      { url: 'https://enterprise.cherryai.com/', priority: '0.7' }
    ]
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

// 文章页：src/content/compare/<locale>/<slug>.md 存在就生成 /resources/articles/<slug>。
// 某种语言审核通过前不放文件，该语言站点就不会生成也不会进 sitemap，另一种语言的页面也不输出指向它的 hreflang。
const COMPARE_DIR = join(process.cwd(), 'src/content/compare')
const ARTICLE_CATALOG = JSON.parse(readFileSync(join(COMPARE_DIR, 'catalog.json'), 'utf8'))
// 只有最早三篇用过 /compare/<slug> 地址，需要保留旧地址跳转
const LEGACY_COMPARE_SLUGS = new Set(['manus', 'chatgpt-desktop-app', 'lm-studio'])
const style = JSON.parse(readFileSync(join(COMPARE_DIR, 'article-style.json'), 'utf8'))

function listCompareSlugs(locale) {
  const dir = join(COMPARE_DIR, locale)
  if (!existsSync(dir)) return []
  return readdirSync(dir)
    .filter((file) => file.endsWith('.md'))
    .map((file) => file.slice(0, -3))
    .sort()
}

function articleMeta(slug) {
  const meta = ARTICLE_CATALOG.articles[slug]
  if (!meta) throw new Error(`src/content/compare/catalog.json is missing article "${slug}"`)
  return meta
}

const compareRoutes = listCompareSlugs(target).map((slug) => ({
  path: `/resources/articles/${slug}`,
  category: articleMeta(slug).category,
  lastmod: articleMeta(slug).lastmod,
  key: `compare_${slug.replace(/-/g, '_')}`,
  compare: slug,
  chineseCounterpart: existsSync(join(COMPARE_DIR, 'zh', `${slug}.md`)),
  englishCounterpart: existsSync(join(COMPARE_DIR, 'en', `${slug}.md`)),
  dropSoftwareApplication: true
}))

const articlesIndex = { path: '/resources/articles/', key: 'articles', articlesIndex: true, dropSoftwareApplication: true }
ROUTES[target].push(articlesIndex, ...compareRoutes)

const NOT_FOUND = { path: '/404', key: 'not_found', noindex: true }

// lastmod 是页面正文最后一次实质修改的日期（YYYY-MM-DD）。Google 用它决定先重新
// 抓哪些页面，所以只在正文、结构化数据或链接真正变化时才改；改样式、改页脚不要动。
// 每次部署都刷新的话，Google 会学会无视这个日期。不填则不输出 lastmod。
const SITEMAP = {
  en: [
    { path: '/', priority: '1.0', lastmod: '2026-10-19' },
    { path: '/download', priority: '0.9', lastmod: '2026-10-20' },
    { path: '/mobile', priority: '0.9', lastmod: '2026-09-22' },
    { path: '/flash', priority: '0.9', lastmod: '2026-10-19' },
    { path: '/flash/usage', priority: '0.6', lastmod: '2026-10-19' },
    { path: '/theme', priority: '0.7', lastmod: '2026-02-13' }
  ],
  zh: [
    { path: '/', priority: '1.0' },
    { path: '/download', priority: '0.9' },
    { path: '/mobile', priority: '0.9' }
  ]
}

SITEMAP[target].push(
  {
    path: articlesIndex.path,
    priority: '0.7',
    lastmod: ['2026-11-01', ...compareRoutes.map(({ lastmod }) => lastmod)].sort().at(-1)
  },
  ...compareRoutes.map(({ path, lastmod }) => ({ path, priority: '0.7', lastmod }))
)

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

function escapeHtml(value) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
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

  if (route.englishCounterpart === false) {
    // 只有中文版的文章：不指向不存在的英文页，x-default 指回中文页本身
    html = html.replace(/<link\s+rel="alternate"\s+hreflang="en"[^>]*>/g, '')
    html = replaceLinkHref(html, 'alternate', '\\s+hreflang="x-default"', canonicalUrl)
  } else {
    for (const language of ['en', 'x-default']) {
      html = replaceLinkHref(html, 'alternate', `\\s+hreflang="${language}"`, englishUrl)
    }
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

  if (route.redirectTo) {
    // Portable fallback for hosts that do not consume nginx.conf or _redirects.
    html = html.replace(
      '</head>',
      `<meta http-equiv="refresh" content="0;url=${route.redirectTo}"/><script>location.replace(${JSON.stringify(route.redirectTo)}+location.search+location.hash)</script></head>`
    )
    return html.replace(
      '<div id="root"></div>',
      `<div id="root"><a href="${route.redirectTo}">${escapeHtml(title)}</a></div>`
    )
  }

  if (route.articlesIndex) {
    // 与 src/pages/resources/articles/index.tsx 保持同样的结构和样式
    const groups = articleGroups()
    const sections = groups
      .map(({ category, routes }) => {
        const items = routes
          .map(
            ({ path, compare, key, lastmod }) =>
              `<li><a href="${path}" class="${style.indexCard}"><h3 class="${style.indexCardTitle}">${escapeHtml(translations.compare.links[compare])}</h3><p class="${style.indexCardDescription}">${escapeHtml(translations.page_description[key])}</p><span class="${style.indexCardFooter}"><time datetime="${lastmod}">${formatArticleDate(lastmod)}</time><span class="${style.indexCardMore}" aria-hidden="true">${escapeHtml(translations.articles.read_more)} →</span></span></a></li>`
          )
          .join('')
        const { title: categoryTitle, description: categoryDescription } = translations.articles.categories[category]
        return `<section id="${category}" class="${style.indexSection}"><h2 class="${style.indexSectionTitle}">${escapeHtml(categoryTitle)}</h2><p class="${style.indexSectionDescription}">${escapeHtml(categoryDescription)}</p><ul class="${style.indexList}">${items}</ul></section>`
      })
      .join('')
    html = html.replace(
      '<div id="root"></div>',
      `<div id="root"><div class="bg-background min-h-screen"><main class="${style.index}"><h1 class="${style.indexTitle}">${escapeHtml(translations.articles.title)}</h1><p class="${style.indexDescription}">${escapeHtml(translations.articles.description)}</p>${sections}</main></div></div>`
    )
    html = appendJsonLd(html, {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: translations.articles.title,
      description,
      url: canonicalUrl,
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: groups
          .flatMap(({ routes }) => routes)
          .map(({ path, compare }, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: translations.compare.links[compare],
            url: `${config.domain}${path}`
          }))
      }
    })
  }

  if (route.compare) {
    const markdown = readFileSync(join(COMPARE_DIR, target, `${route.compare}.md`), 'utf8')
    const { header, body } = splitArticleHtml(renderCompareMarkdown(markdown))
    // 正文直接写进 #root：不跑 JS 的爬虫也能读到全文，createRoot 挂载后会整块替换掉
    html = html.replace(
      '<div id="root"></div>',
      `<div id="root"><div class="bg-background min-h-screen"><article class="${style.article}">${buildArticleHeaderHtml(route, markdown, header)}<div class="${style.body}">${body}</div>${buildRelatedHtml(route)}</article></div></div>`
    )
    html = appendJsonLd(html, buildCompareArticleJsonLd(markdown, canonicalUrl, description, route.lastmod))
    html = appendJsonLd(html, buildArticleBreadcrumbJsonLd(route, markdown, canonicalUrl))
    const faq = extractFaq(markdown)
    if (faq.length > 0) html = appendJsonLd(html, buildFaqJsonLd(faq))
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
      'Monthly subscription bundling DeepSeek V4.1 Flash, Qwen 3.8 Flash and GLM 5.3 Flash inside Cherry Studio, with no separate provider accounts.',
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

// 与 src/content/compare/index.ts 的 renderCompareMarkdown 保持一致
function renderCompareMarkdown(markdown) {
  return marked
    .parse(markdown, { async: false })
    .replace(/<table>/g, '<div class="overflow-x-auto"><table>')
    .replace(/<\/table>/g, '</table></div>')
}

function markdownToPlainText(text) {
  return text
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\s+/g, ' ')
    .trim()
}

// FAQ 写法约定：「## FAQ」之后每个问题是一个三级标题，下面是答案段落
function extractFaq(markdown) {
  const section = markdown.split(/^## (?:FAQ|常见问题)\s*$/m)[1]
  if (!section) return []

  return section
    .split(/^### /m)
    .slice(1)
    .map((block) => {
      const [question, ...answer] = block.split('\n')
      return { question: question.trim(), answer: markdownToPlainText(answer.join('\n')) }
    })
    .filter((item) => item.question && item.answer)
}

function buildFaqJsonLd(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer
      }
    }))
  }
}

// 按 catalog.json 的分类顺序分组，组内按 catalog.json 里的书写顺序（和 COMPARE_SLUGS 保持一致）
function articleGroups() {
  const order = Object.keys(ARTICLE_CATALOG.articles)
  return ARTICLE_CATALOG.categories
    .map((category) => ({
      category,
      routes: compareRoutes
        .filter((route) => route.category === category)
        .sort((a, b) => order.indexOf(a.compare) - order.indexOf(b.compare))
    }))
    .filter(({ routes }) => routes.length > 0)
}

// 与 src/content/compare/index.ts 的 getRelatedArticles 保持一致：同分类在前，其他分类补足
function relatedRoutes(route, limit = 6) {
  const others = articleGroups()
    .flatMap(({ routes }) => routes)
    .filter((other) => other.compare !== route.compare)
  return [
    ...others.filter((other) => other.category === route.category),
    ...others.filter((other) => other.category !== route.category)
  ].slice(0, limit)
}

// 与 src/content/compare/index.ts 的同名函数保持一致
function formatArticleDate(date) {
  return new Intl.DateTimeFormat(target === 'zh' ? 'zh-CN' : 'en-US', { dateStyle: 'long', timeZone: 'UTC' }).format(
    new Date(`${date}T00:00:00Z`)
  )
}

function getReadingMinutes(markdown) {
  const text = markdown.replace(/!\[[^\]]*\]\([^)]*\)/g, '').replace(/\]\([^)]*\)/g, ']')
  const units = target === 'zh' ? (text.match(/[\u4e00-\u9fff]/g) ?? []).length : text.split(/\s+/).length
  return Math.max(1, Math.round(units / (target === 'zh' ? 400 : 220)))
}

function splitArticleHtml(html) {
  const index = html.indexOf('<h2')
  return index === -1 ? { header: '', body: html } : { header: html.slice(0, index), body: html.slice(index) }
}

// 与 src/pages/compare/index.tsx 的文章头部、面包屑和相关文章保持同样的结构和样式
function buildArticleHeaderHtml(route, markdown, headerHtml) {
  const { articles } = translations
  const breadcrumb = `<nav aria-label="${escapeHtml(articles.breadcrumb)}"><ol class="${style.breadcrumb}"><li><a href="/resources/articles/" class="${style.breadcrumbLink}">${escapeHtml(articles.title)}</a></li><li aria-hidden="true">/</li><li><a href="/resources/articles/#${route.category}" class="${style.breadcrumbCategory}">${escapeHtml(articles.categories[route.category].title)}</a></li></ol></nav>`
  const updated = articles.updated.replace('{{date}}', formatArticleDate(route.lastmod))
  const readingTime = articles.reading_time.replace('{{count}}', String(getReadingMinutes(markdown)))
  const meta = `<p class="${style.meta}"><time datetime="${route.lastmod}">${escapeHtml(updated)}</time><span aria-hidden="true">·</span><span>${escapeHtml(readingTime)}</span></p>`
  return `<header class="${style.header}">${breadcrumb}<div>${headerHtml}</div>${meta}</header>`
}

function buildRelatedHtml(route) {
  const related = relatedRoutes(route)
  if (related.length === 0) return ''
  const items = related
    .map(
      ({ path, compare, category }) =>
        `<li><a href="${path}" class="${style.relatedCard}"><span class="${style.relatedCategory}">${escapeHtml(translations.articles.categories[category].title)}</span><span class="${style.relatedLinkTitle}">${escapeHtml(translations.compare.links[compare])}</span></a></li>`
    )
    .join('')
  return `<nav class="${style.related}" aria-label="${escapeHtml(translations.compare.related)}"><p class="${style.relatedTitle}">${escapeHtml(translations.compare.related)}</p><ul class="${style.relatedList}">${items}</ul></nav>`
}

function buildArticleBreadcrumbJsonLd(route, markdown, url) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: translations.articles.title,
        item: `${config.domain}/resources/articles/`
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: translations.articles.categories[route.category].title,
        item: `${config.domain}/resources/articles/#${route.category}`
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: markdown.match(/^# (.+)$/m)?.[1].trim() ?? translations.compare.links[route.compare],
        item: url
      }
    ]
  }
}

function buildCompareArticleJsonLd(markdown, url, description, lastmod) {
  const headline = markdown.match(/^# (.+)$/m)?.[1].trim()
  const image = markdown.match(/!\[[^\]]*\]\((\/[^)]+)\)/)?.[1]

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description,
    inLanguage: config.lang,
    url,
    mainEntityOfPage: url,
    ...(image ? { image: `${config.domain}${image}` } : {}),
    datePublished: lastmod,
    dateModified: lastmod,
    author: {
      '@type': 'Organization',
      name: 'Cherry Studio',
      url: config.domain
    },
    publisher: {
      '@type': 'Organization',
      name: config.publisherName,
      logo: {
        '@type': 'ImageObject',
        url: `${config.domain}/assets/images/favicon.png`
      }
    }
  }
}

function writeRouteHtml(route) {
  const html = buildRouteHtml(route)

  // 英文站跑在 Cloudflare Workers 静态资源上，默认 html_handling 是 auto-trailing-slash：
  // /download/index.html 会让 /download 被 307 到 /download/，和不带斜杠的 canonical、
  // sitemap 互相矛盾，拖慢收录。写成 /download.html 后 /download 直接返回 200，
  // /download/ 反过来跳到 /download。不全局改成 drop-trailing-slash，是因为文档站
  // 的 canonical 带斜杠，那样会把文档页搞反。中文站走 nginx，保持目录 + index.html。
  if (target === 'en' && !route.path.endsWith('/')) {
    const file = join(distDir, `${route.path}.html`)
    mkdirSync(dirname(file), { recursive: true })
    writeFileSync(file, html)
    return
  }

  const dir = join(distDir, route.path)
  mkdirSync(dir, { recursive: true })
  writeFileSync(join(dir, 'index.html'), html)
}

function applyIndexTarget() {
  const indexPath = join(distDir, 'index.html')
  let html = readFileSync(indexPath, 'utf8')
  // Keep the blocking theme initializer, but give each version a new URL.
  // This also bypasses browsers that cached the old fixed URL as immutable.
  const themeScript = join(distDir, 'theme-init.js')
  const themeHash = createHash('sha256').update(readFileSync(themeScript)).digest('hex').slice(0, 8)
  const themeName = `theme-init-${themeHash}.js`
  renameSync(themeScript, join(distDir, 'assets', themeName))
  html = html.replace('src="/theme-init.js"', `src="/assets/${themeName}"`)
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
      ({ path, priority, lastmod }) => `  <url>
    <loc>${config.domain}${path === '/' ? '/' : path}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ''}
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

const LLMS_PAGES = ['home', 'download', 'flash', 'flash_usage', 'theme', 'articles', ...compareRoutes.map(({ key }) => key)]
const LLMS_PATH_BY_KEY = {
  home: '/',
  download: '/download',
  flash: '/flash',
  flash_usage: '/flash/usage',
  theme: '/theme',
  articles: '/resources/articles/',
  ...Object.fromEntries(compareRoutes.map(({ key, path }) => [key, path]))
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

- DeepSeek V4.1 Flash: input Off-peak $0.15 / Peak $0.30, output Off-peak $0.60 / Peak $1.20, monthly allowance $20
- Qwen 3.8 Flash: input $0.15, output $0.47, monthly allowance $15
- GLM 5.3 Flash: input $0.15, output $0.50, monthly allowance $15

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

for (const route of compareRoutes.filter(({ compare }) => LEGACY_COMPARE_SLUGS.has(compare))) {
  writeRouteHtml({
    path: `/compare/${route.compare}`,
    key: route.key,
    canonicalPath: route.path,
    redirectTo: route.path,
    noindex: true,
    chineseCounterpart: route.chineseCounterpart,
    dropSoftwareApplication: true
  })
}

// 404 页面：中英文站都输出，供静态托管直接使用
writeFileSync(join(distDir, '404.html'), buildRouteHtml(NOT_FOUND))

applyRobotsTarget()
applySitemapTarget()
applyLlmsTarget()

console.log(`Finalized ${target} static site for ${config.domain}`)
