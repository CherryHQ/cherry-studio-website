// Fails when a page file can never be rendered because another file claims the same canonical name
// (the generator keeps one file per canonical name, so duplicate files silently disappear).
import { existsSync, readdirSync, readFileSync } from 'node:fs'
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

const shadowed = []
let checked = 0
for (const locale of locales) {
  const dir = path.join(contentRoot, locale.directory)
  if (!existsSync(dir)) continue
  const prefix = locale.directory ? `${locale.directory}/` : ''
  const files = walk(dir).map((file) => path.relative(dir, file).split(path.sep).join('/'))
  const byCanonical = new Map()
  for (const file of files) {
    const key = canonicalFile(file)
    if (!byCanonical.has(key)) byCanonical.set(key, [])
    byCanonical.get(key).push(file)
  }
  for (const [key, group] of byCanonical) {
    checked++
    if (group.length < 2) continue
    // Replicates generate-content.mjs: iterate sorted files, canonical names and README indexes overwrite.
    const sorted = [...group].sort()
    let winner = sorted[0]
    for (const file of sorted) if (file === key || file.endsWith('/README.md')) winner = file
    for (const file of group)
      if (file !== winner) shadowed.push({ id: `${prefix}${file}`, winner: `${prefix}${winner}`, key })
  }
}

if (shadowed.length) {
  console.error(`Found ${shadowed.length} page file(s) that can never render:\n`)
  for (const entry of shadowed)
    console.error(`  ${entry.id} is shadowed by ${entry.winner} (canonical name ${entry.key})`)
  console.error('\nDelete the duplicate file, or map it through page-aliases.json.')
  process.exit(1)
}
console.log(`lint-shadowed: ${checked} canonical names checked, 0 shadowed files`)
