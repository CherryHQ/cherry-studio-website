import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const app = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const root = path.resolve(app, '../dist')
const data = JSON.parse(readFileSync(path.join(app, 'generated/content.json'), 'utf8'))
const failures = new Set()
let checked = 0
let checkedAnchors = 0
const exportedIds = new Map()
const pageUrls = new Set(data.pages.map((page) => `/docs/${page.locale}/${page.slug ? `${page.slug}/` : ''}`))
const decodeHtml = (value) => value.replaceAll('&amp;', '&').replaceAll('&quot;', '"').replaceAll('&#x27;', "'")
function idsFor(url) {
  if (!exportedIds.has(url)) {
    const html = readFileSync(path.join(root, decodeURIComponent(url), 'index.html'), 'utf8')
    exportedIds.set(url, new Set([...html.matchAll(/\bid="([^"]*)"/g)].map((match) => decodeHtml(match[1]))))
  }
  return exportedIds.get(url)
}
for (const page of data.pages) {
  const file = path.join(root, 'docs', page.locale, page.slug, 'index.html')
  assert.ok(existsSync(file), `Missing exported page: ${file}`)
  const html = readFileSync(file, 'utf8')
  assert.ok(html.includes('<html lang='), `Missing document language: ${file}`)
  if (page.fallback) assert.match(html, /noindex/)
  const pageUrl = `/docs/${page.locale}/${page.slug ? `${page.slug}/` : ''}`
  for (const match of html.matchAll(/href="([^"]*#[^"]+)"/g)) {
    const link = new URL(decodeHtml(match[1]), `https://docs.invalid${pageUrl}`)
    if (link.origin !== 'https://docs.invalid' || !pageUrls.has(decodeURIComponent(link.pathname))) continue
    const anchor = decodeURIComponent(link.hash.slice(1))
    if (anchor && !idsFor(link.pathname).has(anchor)) failures.add(`${pageUrl} -> ${link.pathname}#${anchor}`)
    checkedAnchors++
  }
  for (const match of html.matchAll(/(?:href|src)="(\/docs\/[^"?#]*)(?:[?#][^"]*)?"/g)) {
    const target = path.join(root, decodeURIComponent(match[1]))
    if (!existsSync(target) && !existsSync(`${target}.html`)) failures.add(match[1])
    checked++
  }
}
for (const locale of new Set(data.pages.map((page) => page.locale))) {
  const index = JSON.parse(readFileSync(path.join(root, 'docs/search', `${locale}.json`), 'utf8'))
  assert.equal(index.type, 'simple')
}
assert.ok(existsSync(path.join(root, 'docs/404.html')))
assert.ok(!failures.size, `Broken exported URLs:\n${[...failures].join('\n')}`)
console.log(
  `Verified ${data.pages.length} exported articles and ${checked} local document/resource references and ${checkedAnchors} exported heading links; all locale search indexes and 404 are present.`
)
