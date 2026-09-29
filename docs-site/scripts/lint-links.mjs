// Fails when a page links to another locale's page: in-page links must resolve inside the page's
// own locale directory, otherwise the generator rewrites them to /docs/<source language>/…
import { readdirSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const app = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const contentRoot = path.join(app, 'content')
const locales = JSON.parse(readFileSync(path.join(app, 'locales.json'), 'utf8'))
const aliases = JSON.parse(readFileSync(path.join(app, 'page-aliases.json'), 'utf8'))
const canonicalFile = (file) => aliases[file] || file

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    if (entry.name.startsWith('.') || entry.name === 'i18n' || entry.name === 'assets') return []
    const file = path.join(dir, entry.name)
    return entry.isDirectory() ? walk(file) : file.endsWith('.md') && entry.name !== 'SUMMARY.md' ? [file] : []
  })
}

const inventories = new Map()
for (const locale of locales) {
  const dir = path.join(contentRoot, locale.directory)
  inventories.set(locale.code, new Set(walk(dir).map((file) => path.relative(dir, file).split(path.sep).join('/'))))
}

// Same file selection as generate-content.mjs: one file per canonical name, canonical names win.
const selected = new Map()
for (const [code, files] of inventories) {
  const mapped = new Map()
  for (const file of [...files].sort()) {
    const key = canonicalFile(file)
    if (!mapped.has(key) || file === key || file.endsWith('/README.md')) mapped.set(key, file)
  }
  selected.set(code, mapped)
}

const failures = []
let checked = 0
for (const locale of locales) {
  for (const file of selected.get(locale.code).values()) {
    const relative = path.posix.join(locale.directory, file)
    const body = readFileSync(path.join(contentRoot, locale.directory, file), 'utf8')
    const raw = body.matchAll(/(?:\]\(|href=")([^)\s"]+)/g)
    for (const match of raw) {
      const target = match[1]
      if (!target || target.startsWith('#') || /^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(target)) continue
      const resolved = path.posix.normalize(
        path.posix.join(path.posix.dirname(relative), decodeURIComponent(target.split(/[?#]/)[0]))
      )
      const targetLocale = locales.find((item) => item.directory && resolved.startsWith(`${item.directory}/`))
      if (!targetLocale || targetLocale.code === locale.code) continue
      const inner = resolved.slice(targetLocale.directory.length + 1)
      const contentFile = inner.endsWith('.md') ? inner : `${inner.replace(/\/$/, '')}/README.md`
      const known =
        inventories.get(targetLocale.code).has(contentFile) ||
        selected.get(targetLocale.code).has(canonicalFile(contentFile)) ||
        selected.get('zh-cn').has(canonicalFile(contentFile))
      if (known) failures.push(`${relative}: ${target} → /docs/${targetLocale.code}/…`)
      checked++
    }
  }
}

if (failures.length) {
  console.error(`Found ${failures.length} link(s) pointing at another locale:\n`)
  for (const failure of failures) console.error(`  ${failure}`)
  console.error('\nWrite links relative to this locale (e.g. ../<path> or ./<file>.md) so they stay in it.')
  process.exit(1)
}
console.log(`lint-links: ${checked} cross-locale candidates checked, 0 links leave their locale`)
