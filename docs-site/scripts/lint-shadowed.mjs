// Fails when a page file can never be rendered because another file claims the same canonical name
// (the generator keeps one file per canonical name, so legacy duplicates silently disappear).
//
// `--write-baseline` records today's known-dead files, so the check can guard against new ones while
// the existing backlog is burned down by deleting the files (and their SUMMARY references).
import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const app = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const contentRoot = path.join(app, 'content')
const baselineFile = path.join(app, 'shadowed-baseline.json')
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

if (process.argv.includes('--write-baseline')) {
  const files = shadowed.map((entry) => entry.id).sort()
  writeFileSync(
    baselineFile,
    `${JSON.stringify(
      {
        '//': 'Page files that can never render because a same-named page wins. Delete the file, then remove its entry here.',
        files
      },
      null,
      2
    )}\n`
  )
  console.log(`lint-shadowed: baseline written with ${files.length} known dead file(s)`)
  process.exit(0)
}

const known = new Set(existsSync(baselineFile) ? JSON.parse(readFileSync(baselineFile, 'utf8')).files : [])
const added = shadowed.filter((entry) => !known.has(entry.id))

if (added.length) {
  console.error(`Found ${added.length} new page file(s) that can never render:\n`)
  for (const entry of added) console.error(`  ${entry.id} is shadowed by ${entry.winner} (canonical name ${entry.key})`)
  console.error('\nRename or delete them, or run `node docs-site/scripts/lint-shadowed.mjs --write-baseline`.')
  process.exit(1)
}
console.log(
  `lint-shadowed: ${checked} canonical names checked, 0 new shadowed files (${shadowed.length} known dead files in the baseline)`
)
