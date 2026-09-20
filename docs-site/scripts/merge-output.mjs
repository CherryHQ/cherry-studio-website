import { cpSync, existsSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const app = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.resolve(app, '../dist')
const output = path.join(app, 'out')
if (!existsSync(path.join(output, 'zh-cn/index.html')) || !existsSync(path.join(dist, 'index.html')))
  throw new Error('Build both website and docs before merging')
const target = path.join(dist, 'docs')
rmSync(target, { recursive: true, force: true })
cpSync(output, target, { recursive: true })
const data = JSON.parse(readFileSync(path.join(app, 'generated/content.json'), 'utf8'))
const locale = process.env.SITE_LOCALE === 'zh' ? 'zh-cn' : 'en'
// Portable static fallback; production nginx performs the same redirect before serving HTML.
writeFileSync(
  path.join(target, 'index.html'),
  `<!doctype html><html lang="${locale}"><head><meta charset="utf-8"><meta http-equiv="refresh" content="0;url=/docs/${locale}/"><meta name="robots" content="noindex"><title>Cherry Studio Docs</title></head><body><a href="/docs/${locale}/">Cherry Studio Docs</a></body></html>`
)
const domain = process.env.SITE_LOCALE === 'zh' ? 'https://cherryai.com.cn' : 'https://cherryai.com'
const escapeXml = (value) => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('"', '&quot;')
const entries = data.pages
  .filter((page) => !page.fallback && (domain.endsWith('.cn') ? page.locale === 'zh-cn' : page.locale !== 'zh-cn'))
  .map(
    (page) =>
      `<url><loc>${escapeXml(`${domain}/docs/${page.locale}/${page.slug ? `${page.slug.split('/').map(encodeURIComponent).join('/')}/` : ''}`)}</loc></url>`
  )
writeFileSync(
  path.join(target, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${entries.join('')}</urlset>`
)
const robots = path.join(dist, 'robots.txt')
writeFileSync(robots, `${readFileSync(robots, 'utf8')}Sitemap: ${domain}/docs/sitemap.xml\n`)
console.log(`Merged documentation into ${target}`)
