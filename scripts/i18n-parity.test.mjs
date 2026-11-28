import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'

const readJson = (path) => JSON.parse(readFileSync(new URL(path, import.meta.url), 'utf8'))
const en = readJson('../src/i18n/lang/en.json')
const zh = readJson('../src/i18n/lang/zh.json')
const stats = readJson('../src/content/product-stats.json').labels

// Keys that intentionally exist on one site only (site-specific sections and copy).
const EN_ONLY = new Set([
  'community.discord_prompt',
  'community.join_discord',
  'compare.links.claude-desktop-app',
  'contribution.description',
  'contribution.title',
  'contributors.commit_count_one',
  'contributors.commit_count_other',
  'download_page.join_discord',
  'footer.community.title',
  'page_description.compare_claude_desktop_app',
  'page_title.compare_claude_desktop_app',
  'statistics.forks'
])
const ZH_ONLY_SUBTREES = [
  'agents',
  'compare.links.claude-code',
  'contribution',
  'contributors.commit_count',
  'home_faq.subtitle',
  'page_description.compare_claude_code',
  'page_title.compare_claude_code'
]

function leafPaths(value, prefix = '') {
  if (value === null || typeof value !== 'object' || Array.isArray(value)) return [prefix]
  return Object.entries(value).flatMap(([key, child]) => leafPaths(child, prefix ? `${prefix}.${key}` : key))
}

function leafStrings(value) {
  if (typeof value === 'string') return [value]
  if (value && typeof value === 'object') return Object.values(value).flatMap(leafStrings)
  return []
}

test('every new locale key exists in both languages', () => {
  const enKeys = new Set(leafPaths(en))
  const zhKeys = new Set(leafPaths(zh))
  const missingInZh = [...enKeys].filter((key) => !zhKeys.has(key) && !EN_ONLY.has(key))
  const missingInEn = [...zhKeys].filter(
    (key) => !enKeys.has(key) && !ZH_ONLY_SUBTREES.some((root) => key === root || key.startsWith(`${root}.`))
  )
  assert.deepEqual(missingInZh, [], 'keys missing from zh.json')
  assert.deepEqual(missingInEn, [], 'keys missing from en.json')
})

// Placeholders filled by the calling component; any other placeholder must be a product stat.
const CALL_SITE_PARAMS = new Set(['arch', 'contributions', 'count', 'date', 'list', 'package', 'platform', 'price', 'rate', 'store'])

test('product stat placeholders resolve to a value in product-stats.json', () => {
  for (const text of [...leafStrings(en), ...leafStrings(zh)]) {
    for (const [, name] of text.matchAll(/\{\{(\w+)\}\}/g)) {
      if (!CALL_SITE_PARAMS.has(name)) assert.ok(stats[name], `unknown placeholder "${name}" in: ${text}`)
    }
  }
})
