import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import test from 'node:test'
import { fileURLToPath } from 'node:url'

import { parseSummary } from './content.mjs'

const app = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const locales = JSON.parse(readFileSync(path.join(app, 'locales.json'), 'utf8'))
const groupNames = {
  'zh-cn': ['开始使用', '日常使用', 'Agent 与自动化', '配置与数据', '故障排查', '开发者与贡献'],
  en: [
    'Getting Started',
    'Everyday Tasks',
    'Agents & Automation',
    'Configuration & Data',
    'Troubleshooting',
    'Developers & Contribution'
  ]
}

for (const locale of locales) {
  const root = path.join(app, 'content', locale.directory)
  const entries = parseSummary(readFileSync(path.join(root, 'SUMMARY.md'), 'utf8'))
  const sections = []
  for (const entry of entries) {
    if (entry.type === 'separator') sections.push([])
    else sections.at(-1).push(entry)
  }

  test(`${locale.code}: desktop and mobile each expose the same six task groups`, () => {
    assert.equal(sections.length, 2)
    for (const section of sections) {
      assert.deepEqual(
        section.filter((entry) => entry.depth === 0).map((entry) => entry.name),
        groupNames[locale.code]
      )
      assert.ok(section.filter((entry) => entry.depth === 0).every((entry) => entry.type === 'folder'))
    }
    const files = entries.filter((entry) => entry.type === 'page').map((entry) => entry.file)
    assert.equal(new Set(files).size, files.length, 'each article has one primary navigation entry')
    assert.ok(sections[0].filter((entry) => entry.type === 'page').every((entry) => !entry.file.startsWith('mobile/')))
    assert.ok(sections[1].filter((entry) => entry.type === 'page').every((entry) => entry.file.startsWith('mobile/')))
  })

  test(`${locale.code}: knowledge-base guidance has one primary entry with legacy pages below it`, () => {
    const primary = entries.findIndex((entry) => entry.file === 'knowledge-base/knowledge-base.md')
    assert.ok(primary >= 0)
    assert.equal(entries[primary].depth, 1)
    for (const file of [
      'cherrystudio/preview/knowledge-base.md',
      'advanced-basic/knowledge-content/knowledge-base.md'
    ]) {
      const index = entries.findIndex((entry) => entry.file === file)
      assert.ok(index > primary)
      assert.equal(entries[index].depth, 2)
      assert.ok(entries.slice(primary + 1, index).every((entry) => entry.depth > 1))
    }
  })

  test(`${locale.code}: mobile contributions stay in the mobile section and lead to maintained guidance`, () => {
    const guide = readFileSync(path.join(root, 'mobile/development.md'), 'utf8')
    assert.match(guide, /\]\(\.\.\/contribution\/docs\.md\)/)
    assert.match(guide, /\]\(troubleshooting\.md\)/)
    assert.ok(sections[1].some((entry) => entry.file === 'mobile/development.md'))
  })
}
