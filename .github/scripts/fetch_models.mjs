// Mirrors Cherry Studio's bundled model catalog (packages/provider-registry) into the docs site.
// The application repository refreshes that catalog regularly; this script keeps the reference
// pages in sync and skips writing when the catalog content has not changed.
import { existsSync, mkdirSync, readFileSync, renameSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const SOURCE =
  'https://raw.githubusercontent.com/CherryHQ/cherry-studio/main/packages/provider-registry/data/models.json'
const REPOSITORY = 'https://github.com/CherryHQ/cherry-studio/tree/main/packages/provider-registry'
const app = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..')
const outputDir = path.join(app, 'docs-site/content/other/models-info')

const CAPABILITIES = {
  'function-call': '函数调用',
  reasoning: '推理',
  'image-recognition': '识图',
  'image-generation': '图片生成',
  'audio-recognition': '语音识别',
  'audio-generation': '语音生成',
  'video-recognition': '识视频',
  'video-generation': '视频生成',
  'structured-output': '结构化输出',
  'file-input': '文件输入',
  embedding: '嵌入',
  rerank: '重排',
  'computer-use': '计算机操作',
  'file-search': '文件检索'
}
const MODALITIES = { text: '文本', image: '图片', audio: '音频', video: '视频', vector: '向量' }

const CATEGORIES = [
  { file: 'chat-text.md', title: '文本对话', summary: '个仅接受文本输入的对话模型。' },
  { file: 'chat-multimodal.md', title: '多模态对话', summary: '个支持图片或视频输入的对话模型。' },
  { file: 'image-generation.md', title: '图像生成', summary: '个图像生成模型。' },
  { file: 'video-generation.md', title: '视频生成', summary: '个视频生成模型。' },
  { file: 'audio.md', title: '语音', summary: '个语音识别或语音生成模型。' },
  { file: 'embedding-rerank.md', title: '嵌入与重排', summary: '个向量嵌入与重排模型。' }
]

function categoryOf(model) {
  const capabilities = new Set(model.capabilities || [])
  const outputs = new Set(model.outputModalities || [])
  if (capabilities.has('embedding') || outputs.has('vector') || capabilities.has('rerank'))
    return 'embedding-rerank.md'
  if (capabilities.has('video-generation')) return 'video-generation.md'
  if (capabilities.has('image-generation')) return 'image-generation.md'
  if (capabilities.has('audio-recognition') || capabilities.has('audio-generation') || outputs.has('audio'))
    return 'audio.md'
  const inputs = model.inputModalities || []
  return inputs.some((modality) => modality !== 'text') ? 'chat-multimodal.md' : 'chat-text.md'
}

const group = (value) => String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
const cell = (value) => String(value).replaceAll('|', '\\|')
const labels = (map, values) => (values.length ? values.map((value) => map[value] ?? value).join('、') : '-')

function renderTable(models) {
  const rows = models.map((model) =>
    [
      cell(model.name),
      cell(model.id),
      cell(model.ownedBy),
      model.contextWindow == null ? '-' : group(model.contextWindow),
      model.maxOutputTokens == null ? '-' : group(model.maxOutputTokens),
      labels(CAPABILITIES, model.capabilities || []),
      labels(MODALITIES, model.inputModalities || []),
      labels(MODALITIES, model.outputModalities || [])
    ].join(' | ')
  )
  return [
    '| 模型名称 | API ID | 服务商 | 上下文长度 | 最大输出 | 能力 | 输入模态 | 输出模态 |',
    '| --- | --- | --- | --- | --- | --- | --- | --- |',
    ...rows.map((row) => `| ${row} |`)
  ].join('\n')
}

function pageIntro() {
  return `数据来自 Cherry Studio 内置模型目录（[provider-registry](${REPOSITORY})），随应用仓库自动同步；表中 \`-\` 表示数据源未提供该字段，信息仅供参考。`
}

function renderSubpage(category, models, stamp) {
  return `# ${category.title}

${pageIntro()}

> **数据更新时间**: ${stamp}

${renderTable(models)}
`
}

function renderIndex(counts, stamp, version) {
  const links = CATEGORIES.map(
    (category) =>
      `* [${category.title}](${category.file})：${counts.get(category.file)} ${category.summary}`
  )
  return `# 模型数据

本页数据来自 Cherry Studio 内置模型目录（[provider-registry](${REPOSITORY})），随应用仓库自动同步；信息仅供参考，实际上下文长度、能力与价格请以模型服务商为准。表中 \`-\` 表示数据源未提供该字段。

> **数据更新时间**: ${stamp}（数据版本 \`${version}\`）

## 分类目录

${links.join('\n')}

***

### 💡 获取帮助与提交反馈

如果您在配置或使用过程中遇到任何疑问、Bug 或有功能改进建议，请参考 [反馈与建议](../../question-contact/suggestions.md) 中提供的官方渠道。
`
}

function formatStamp(now) {
  const toStamp = (date) => date.toISOString().slice(0, 19).replace('T', ' ')
  const cst = new Date(now.getTime() + 8 * 60 * 60 * 1000)
  return `${toStamp(now)} UTC / ${toStamp(cst)} CST (北京时间)`
}

function writeAtomic(file, contents) {
  const temporary = `${file}.tmp`
  writeFileSync(temporary, contents)
  renameSync(temporary, file)
}

const stripStamp = (contents) => contents.replace(/^> \*\*数据更新时间\*\*: .*$/m, '> **数据更新时间**: <stamp>')

async function main() {
  const response = await fetch(SOURCE, { headers: { 'user-agent': 'cherry-studio-website-model-sync' } })
  if (!response.ok) throw new Error(`Failed to fetch the model catalog: ${response.status}`)
  const catalog = await response.json()
  if (!Array.isArray(catalog.models) || !catalog.models.length || typeof catalog.version !== 'string')
    throw new Error('Unexpected model catalog shape')

  const buckets = new Map(CATEGORIES.map((category) => [category.file, []]))
  for (const model of catalog.models) buckets.get(categoryOf(model)).push(model)

  const compare = (a, b) => a.ownedBy.localeCompare(b.ownedBy, 'en') || a.name.localeCompare(b.name, 'en')
  const stamp = formatStamp(new Date())
  const counts = new Map([...buckets].map(([file, models]) => [file, models.length]))
  const files = new Map([
    ['README.md', renderIndex(counts, stamp, catalog.version)],
    ...[...buckets].map(([file, models]) => [file, renderSubpage(CATEGORIES.find((c) => c.file === file), models.sort(compare), stamp)])
  ])

  const changed = [...files].some(([name, contents]) => {
    const existing = path.join(outputDir, name)
    return !existsSync(existing) || stripStamp(readFileSync(existing, 'utf8')) !== stripStamp(contents)
  })
  if (!changed) {
    console.log('Model catalog unchanged; keeping the current snapshot')
    return
  }

  mkdirSync(outputDir, { recursive: true })
  for (const [name, contents] of files) writeAtomic(path.join(outputDir, name), contents)
  const total = [...counts.values()].reduce((sum, count) => sum + count, 0)
  console.log(`Wrote ${files.size} pages for ${total} models (catalog version ${catalog.version})`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
