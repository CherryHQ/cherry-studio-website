import { createHash } from 'node:crypto'
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  renameSync,
  rmSync,
  writeFileSync
} from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createSearchAPI } from 'fumadocs-core/search/server'

import { findMissingAnchors, parseSummary, renderMarkdown, safeResolve, slugFor, urlFor } from './content.mjs'

const app = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const locales = JSON.parse(readFileSync(path.join(app, 'locales.json'), 'utf8'))
const aliases = JSON.parse(readFileSync(path.join(app, 'page-aliases.json'), 'utf8'))
const canonicalFile = (file) => aliases[file] || file
const contentRoot = path.join(app, 'content')
const generated = path.join(app, 'generated')
for (const dir of [generated, path.join(app, 'public/content-assets'), path.join(app, 'public/search')]) {
  mkdirSync(dir, { recursive: true })
}
// Publish complete JSON files so development readers never see missing/partial content.
function writeAtomic(file, data) {
  const temporary = `${file}.tmp`
  writeFileSync(temporary, data)
  renameSync(temporary, file)
}
const issues = []
const pages = []
const trees = {}
const inventories = new Map()
function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    if (entry.name.startsWith('.') || entry.name === 'i18n' || entry.name === 'assets') return []
    const file = path.join(dir, entry.name)
    return entry.isDirectory() ? walk(file) : file.endsWith('.md') && entry.name !== 'SUMMARY.md' ? [file] : []
  })
}
for (const locale of locales) {
  const dir = path.join(contentRoot, locale.directory)
  const files = walk(dir).map((file) => path.relative(dir, file))
  inventories.set(locale.code, new Set(files))
}
// Reserve an explicit overview slug for README/named-page collisions in any language.
const colliding = new Set()
for (const files of inventories.values()) {
  for (const file of files) {
    if (file.endsWith('/README.md') && files.has(file.replace('/README.md', '.md'))) colliding.add(canonicalFile(file))
  }
}
const getSlug = (file) => `${slugFor(canonicalFile(file))}${colliding.has(canonicalFile(file)) ? '/overview' : ''}`
const translatedFiles = new Map()
for (const [locale, files] of inventories) {
  const mapped = new Map()
  // Canonical filenames win; otherwise prefer the matching legacy directory index.
  for (const file of [...files].sort()) {
    const key = canonicalFile(file)
    if (!mapped.has(key) || file === key || file.endsWith('/README.md')) mapped.set(key, file)
  }
  translatedFiles.set(locale, mapped)
}
const copied = new Map()
function copyAsset(file) {
  if (copied.has(file)) return copied.get(file)
  const bytes = readFileSync(file)
  const name = `${createHash('sha256').update(bytes).digest('hex').slice(0, 24)}${path.extname(file).toLowerCase()}`
  copyFileSync(file, path.join(app, 'public/content-assets', name))
  const url = `/docs/content-assets/${name}`
  copied.set(file, url)
  return url
}
function expandIncludes(markdown, file, seen = new Set()) {
  if (seen.has(file)) throw new Error(`Recursive include in ${file}`)
  const chain = new Set([...seen, file])
  return markdown.replace(/{%\s*include\s+["']([^"']+)["']\s*%}/g, (_, target) => {
    const included = safeResolve(contentRoot, path.relative(contentRoot, path.resolve(path.dirname(file), target)))
    if (!existsSync(included)) {
      issues.push({ type: 'missing-include', file, target })
      return `\n[Missing include: ${target}]\n`
    }
    return expandIncludes(readFileSync(included, 'utf8'), included, chain)
  })
}
const sourceFiles = new Map()
for (const locale of locales) {
  const own = translatedFiles.get(locale.code)
  // Missing pages are explicit source-language fallbacks. Existing translations retain their own paths.
  // Pages a locale deliberately drops (listed with a redirect target in locales.json)
  // get no Chinese fallback; their URLs redirect instead.
  const removed = locale.removed || {}
  for (const file of new Set([...translatedFiles.get('zh-cn').keys(), ...own.keys()])) {
    if (removed[file]) continue
    const fallback = !own.has(file)
    const sourceLocale = fallback ? locales[0] : locale
    const relative = path.posix.join(sourceLocale.directory, translatedFiles.get(sourceLocale.code).get(file))
    const absolute = safeResolve(contentRoot, relative)
    const slug = getSlug(file)
    const report = (issue) => issues.push({ locale: locale.code, file: relative, ...issue })
    const rewrite = (raw, attribute) => {
      if (/^https?:\/\/docs\.cherryai\.com(?:\.cn)?\//i.test(raw)) {
        const old = new URL(raw)
        const oldPath = decodeURIComponent(old.pathname).replace(/^\//, '').replace(/\/$/, '')
        const oldLocale =
          locales.find((item) => item.directory && oldPath.startsWith(`${item.directory}/`)) || locales[0]
        const localPath = oldLocale.directory ? oldPath.slice(oldLocale.directory.length + 1) : oldPath
        const oldFile = [`${localPath}.md`, `${localPath}/README.md`, localPath || 'README.md'].find(
          (candidate) =>
            inventories.get(oldLocale.code).has(candidate) ||
            translatedFiles.get(oldLocale.code).has(canonicalFile(candidate))
        )
        if (oldFile) return urlFor(oldLocale.code, getSlug(oldFile)) + old.search + old.hash
      }
      if (!raw || raw.startsWith('#') || /^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(raw)) return raw
      const [, pathname, suffix] = raw.match(/^([^?#]*)(.*)$/s)
      let decoded
      try {
        decoded = decodeURIComponent(pathname)
      } catch {
        return raw
      }
      const target = path.posix.normalize(
        decoded.startsWith('/') ? decoded.slice(1) : path.posix.join(path.posix.dirname(relative), decoded)
      )
      let disk
      try {
        disk = safeResolve(contentRoot, target)
      } catch {
        report({ type: 'invalid-path', target: raw })
        return '#'
      }
      const targetLocale =
        locales.find((item) => item.directory && target.startsWith(`${item.directory}/`)) || locales[0]
      const targetFile = targetLocale.directory ? target.slice(targetLocale.directory.length + 1) : target
      let contentFile = targetFile
      if (!contentFile.endsWith('.md')) contentFile = `${contentFile.replace(/\/$/, '')}/README.md`
      const replacement = removed[canonicalFile(contentFile)]
      if (replacement && targetLocale.code === locale.code) return urlFor(locale.code, getSlug(replacement)) + suffix
      if (
        inventories.get(targetLocale.code).has(contentFile) ||
        translatedFiles.get(targetLocale.code).has(canonicalFile(contentFile)) ||
        translatedFiles.get('zh-cn').has(canonicalFile(contentFile))
      ) {
        const code = targetLocale.code === sourceLocale.code ? locale.code : targetLocale.code
        return urlFor(code, getSlug(contentFile)) + suffix
      }
      if (existsSync(disk) && !readdirSafe(disk)) return copyAsset(disk) + suffix
      // Old translations frequently reference source assets relative to their own directory.
      if (target.includes('.gitbook/assets/')) {
        disk = safeResolve(contentRoot, target.slice(target.indexOf('.gitbook/assets/')))
        if (existsSync(disk)) return copyAsset(disk) + suffix
      }
      report({ type: attribute === 'src' ? 'missing-asset' : 'missing-link', target: raw })
      // Keep a usable source link instead of generating an internal broken URL.
      return `https://github.com/CherryHQ/cherry-studio-website/blob/main/docs-site/content/${target.split('/').map(encodeURIComponent).join('/')}${suffix}`
    }
    const raw = expandIncludes(readFileSync(absolute, 'utf8'), absolute)
    const rendered = await renderMarkdown(raw, rewrite, report)
    if (sourceFiles.has(`${locale.code}/${slug}`)) throw new Error(`Duplicate page slug: ${locale.code}/${slug}`)
    const page = { locale: locale.code, slug, file: relative, fallback, ...rendered }
    page.title ||= slug || 'Cherry Studio'
    pages.push(page)
    sourceFiles.set(`${locale.code}/${slug}`, page)
  }
  console.log(`Converted ${locale.label}: ${pages.filter((p) => p.locale === locale.code).length} pages`)
}
function readdirSafe(file) {
  try {
    readdirSync(file)
    return true
  } catch {
    return false
  }
}
for (const locale of locales) {
  const entries = parseSummary(readFileSync(path.join(contentRoot, locale.directory, 'SUMMARY.md'), 'utf8'))
  const children = []
  const stack = [{ children }]
  const listed = new Set()
  for (const entry of entries) {
    if (entry.type === 'separator') {
      children.push(entry)
      stack.length = 1
      continue
    }
    if (entry.type === 'folder') {
      while (stack.length > entry.depth + 1) stack.pop()
      const parent = stack.at(-1)
      if (parent?.type === 'page') {
        const index = { ...parent }
        Object.assign(parent, { type: 'folder', index, children: [] })
        delete parent.url
      }
      if (!parent?.children) {
        issues.push({ type: 'invalid-navigation-folder', locale: locale.code, name: entry.name })
        continue
      }
      const folder = { type: 'folder', name: entry.name, children: [] }
      parent.children.push(folder)
      stack.push(folder)
      continue
    }
    const slug = getSlug(entry.file)
    const page = sourceFiles.get(`${locale.code}/${slug}`)
    if (!page) {
      issues.push({ type: 'missing-navigation', locale: locale.code, file: entry.file })
      continue
    }
    if (listed.has(slug)) continue
    listed.add(slug)
    const item = { type: 'page', name: entry.name, url: urlFor(locale.code, slug) }
    while (stack.length > entry.depth + 1) stack.pop()
    const parent = stack.at(-1)
    if (parent.type === 'page') {
      const index = { ...parent }
      Object.assign(parent, { type: 'folder', index, children: [] })
      delete parent.url
    }
    parent.children.push(item)
    stack.push(item)
  }
  const fallbacks = pages.filter((p) => p.locale === locale.code && p.fallback && !listed.has(p.slug))
  if (fallbacks.length)
    children.push({
      type: 'folder',
      name: '简体中文 · Untranslated',
      children: fallbacks.map((p) => ({ type: 'page', name: p.title, url: urlFor(locale.code, p.slug).slice(5) }))
    })
  for (const page of pages.filter((p) => p.locale === locale.code && !p.fallback && !listed.has(p.slug)))
    issues.push({ type: 'unlisted-page', locale: locale.code, file: page.file })
  trees[locale.code] = { name: 'Cherry Studio', children }
  const api = createSearchAPI('simple', {
    indexes: pages
      .filter((p) => p.locale === locale.code && (listed.has(p.slug) || p.fallback))
      .map((p) => ({ title: p.title, content: p.text, url: urlFor(locale.code, p.slug).slice(5) }))
  })
  writeAtomic(path.join(app, `public/search/${locale.code}.json`), JSON.stringify(await api.export()))
}
// Check anchors after every page has been rendered.
const byUrl = new Map(pages.map((p) => [urlFor(p.locale, p.slug), p]))
issues.push(...findMissingAnchors(pages))
const legacyRedirects = {}
for (const page of pages) {
  if (page.fallback) continue
  const sourceLocale = locales.find((l) => l.code === page.locale)
  const original = sourceLocale.directory ? page.file.slice(sourceLocale.directory.length + 1) : page.file
  legacyRedirects[`/${[sourceLocale.directory, slugFor(original)].filter(Boolean).join('/')}`] = urlFor(
    page.locale,
    page.slug
  )
}
// Include renamed paths even when their source file has been replaced or falls back to Chinese.
for (const locale of locales) {
  for (const original of Object.keys(aliases)) {
    const target = urlFor(locale.code, getSlug(original))
    if (byUrl.has(target)) {
      legacyRedirects[`/${[locale.directory, slugFor(original)].filter(Boolean).join('/')}`] = target
      legacyRedirects[`/docs/${locale.code}/${slugFor(original)}`] = target
    }
  }
}
// Pages a locale removed point at their replacement.
for (const locale of locales) {
  for (const [original, replacement] of Object.entries(locale.removed || {})) {
    const target = urlFor(locale.code, getSlug(replacement))
    if (!byUrl.has(target)) throw new Error(`Removed page ${locale.code}/${original} redirects to a missing page`)
    const olds = [original, ...Object.keys(aliases).filter((alias) => aliases[alias] === original)]
    for (const old of olds) {
      legacyRedirects[`/docs/${locale.code}/${slugFor(old)}`] = target
      if (locale.directory) legacyRedirects[`/${locale.directory}/${slugFor(old)}`] = target
    }
    legacyRedirects[`/docs/${locale.code}/${getSlug(original)}`] = target
  }
}
writeAtomic(path.join(generated, 'legacy-redirects.json'), JSON.stringify(legacyRedirects, null, 2))
writeAtomic(
  path.join(generated, 'routes.json'),
  JSON.stringify(
    Object.fromEntries(locales.map((l) => [l.code, pages.filter((p) => p.locale === l.code).map((p) => p.slug)]))
  )
)
writeAtomic(path.join(generated, 'content.json'), JSON.stringify({ pages, trees }))
writeAtomic(
  path.join(generated, 'report.json'),
  JSON.stringify(
    {
      counts: locales.map((l) => ({
        locale: l.code,
        pages: pages.filter((p) => p.locale === l.code).length,
        fallback: pages.filter((p) => p.locale === l.code && p.fallback).length
      })),
      issues
    },
    null,
    2
  )
)
console.log(
  `Generated ${pages.length} pages, ${copied.size} asset references. ${issues.length} source issues recorded in generated/report.json`
)
if (
  issues.some((issue) =>
    [
      'unsupported-tag',
      'missing-include',
      'missing-link',
      'missing-asset',
      'missing-card-target',
      'missing-anchor',
      'translation-artifact',
      'invalid-math',
      'duplicate-anchor',
      'invalid-navigation-folder',
      'unlisted-page'
    ].includes(issue.type)
  )
)
  process.exitCode = 1

const assetNames = new Set([...copied.values()].map((url) => path.basename(url)))
for (const name of readdirSync(path.join(app, 'public/content-assets'))) {
  if (!assetNames.has(name)) rmSync(path.join(app, 'public/content-assets', name))
}
for (const name of readdirSync(path.join(app, 'public/search'))) {
  if (!locales.some((locale) => name === `${locale.code}.json`)) rmSync(path.join(app, 'public/search', name))
}
