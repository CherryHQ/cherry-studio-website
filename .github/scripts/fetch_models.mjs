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
const OUTPUT_DIRS = {
  'zh-cn': path.join(app, 'docs-site/content/other/models-info'),
  en: path.join(app, 'docs-site/content/i18n/english/other/models-info')
}
const LOCALES = ['zh-cn', 'en']

const CAPABILITIES = {
  'function-call': { 'zh-cn': '函数调用', en: 'Function calling' },
  reasoning: { 'zh-cn': '推理', en: 'Reasoning' },
  'image-recognition': { 'zh-cn': '识图', en: 'Image recognition' },
  'image-generation': { 'zh-cn': '图片生成', en: 'Image generation' },
  'audio-recognition': { 'zh-cn': '语音识别', en: 'Speech recognition' },
  'audio-generation': { 'zh-cn': '语音生成', en: 'Speech generation' },
  'video-recognition': { 'zh-cn': '识视频', en: 'Video recognition' },
  'video-generation': { 'zh-cn': '视频生成', en: 'Video generation' },
  'structured-output': { 'zh-cn': '结构化输出', en: 'Structured output' },
  'file-input': { 'zh-cn': '文件输入', en: 'File input' },
  embedding: { 'zh-cn': '嵌入', en: 'Embedding' },
  rerank: { 'zh-cn': '重排', en: 'Rerank' },
  'computer-use': { 'zh-cn': '计算机操作', en: 'Computer use' },
  'file-search': { 'zh-cn': '文件检索', en: 'File search' }
}
const MODALITIES = {
  text: { 'zh-cn': '文本', en: 'Text' },
  image: { 'zh-cn': '图片', en: 'Image' },
  audio: { 'zh-cn': '音频', en: 'Audio' },
  video: { 'zh-cn': '视频', en: 'Video' },
  vector: { 'zh-cn': '向量', en: 'Vector' }
}
const MODALITY_ORDER = ['text', 'image', 'audio', 'video', 'vector']

const CATEGORIES = [
  {
    file: 'chat-text.md',
    'zh-cn': { title: '文本对话', summary: '个仅接受文本输入的对话模型。' },
    en: { title: 'Text Chat', summary: 'text-only chat models.' }
  },
  {
    file: 'chat-multimodal.md',
    'zh-cn': { title: '多模态对话', summary: '个支持图片或视频输入的对话模型。' },
    en: { title: 'Multimodal Chat', summary: 'chat models that accept image or video input.' }
  },
  {
    file: 'image-generation.md',
    'zh-cn': { title: '图像生成', summary: '个图像生成模型。' },
    en: { title: 'Image Generation', summary: 'image generation models.' }
  },
  {
    file: 'video-generation.md',
    'zh-cn': { title: '视频生成', summary: '个视频生成模型。' },
    en: { title: 'Video Generation', summary: 'video generation models.' }
  },
  {
    file: 'audio.md',
    'zh-cn': { title: '语音', summary: '个语音识别或语音生成模型。' },
    en: { title: 'Audio', summary: 'speech recognition and speech generation models.' }
  },
  {
    file: 'embedding-rerank.md',
    'zh-cn': { title: '嵌入与重排', summary: '个向量嵌入与重排模型。' },
    en: { title: 'Embedding & Rerank', summary: 'vector embedding and rerank models.' }
  }
]

const COLUMNS = {
  'zh-cn': ['模型名称', 'API ID', '服务商', '上下文长度', '最大输出', '能力', '输入模态', '输出模态'],
  en: ['Model', 'API ID', 'Provider', 'Context', 'Max output', 'Capabilities', 'Input modalities', 'Output modalities']
}
const STAMP_LABELS = { 'zh-cn': '数据更新时间', en: 'Data updated' }

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

function capabilityList(model, lang) {
  const values = model.capabilities || []
  if (!values.length) return '-'
  return values.map((value) => CAPABILITIES[value]?.[lang] ?? value).join(lang === 'en' ? ', ' : '、')
}

// The modality vocabulary of a page: every modality that occurs in any row, in fixed order.
// Cells and filter chips reuse it, so lists stay consistently ordered and unknown values drop out.
function vocabularyOf(models) {
  const seen = new Set()
  for (const model of models) {
    for (const modality of [...(model.inputModalities || []), ...(model.outputModalities || [])]) seen.add(modality)
  }
  return MODALITY_ORDER.filter((modality) => seen.has(modality))
}

// A missing array means the source has no data (shown as `-`), not that nothing is supported.
function modalityCell(values, vocabulary, lang) {
  if (!Array.isArray(values) || !values.length) return '-'
  const present = new Set(values)
  const listed = vocabulary.filter((modality) => present.has(modality))
  if (!listed.length) return '-'
  return listed.map((modality) => MODALITIES[modality][lang]).join(lang === 'en' ? ', ' : '、')
}

function renderTable(models, lang, vocabulary) {
  const rows = models.map((model) =>
    [
      cell(model.name),
      cell(model.id),
      cell(model.ownedBy),
      model.contextWindow == null ? '-' : group(model.contextWindow),
      model.maxOutputTokens == null ? '-' : group(model.maxOutputTokens),
      cell(capabilityList(model, lang)),
      cell(modalityCell(model.inputModalities, vocabulary, lang)),
      cell(modalityCell(model.outputModalities, vocabulary, lang))
    ].join(' | ')
  )
  return [
    `| ${COLUMNS[lang].join(' | ')} |`,
    `| ${COLUMNS[lang].map(() => '---').join(' | ')} |`,
    ...rows.map((row) => `| ${row} |`)
  ].join('\n')
}

// Spec for the table toolbar, consumed by docs-site/src/components/model-table-tools.tsx — the
// format is `num:<columns>;sort:<column>;cap:<column>:<label>[,…];in:<column>:<label>=<needle>[,…];out:…`.
// Only filters that split the rows which carry data are emitted.
function chipsSpec(models, vocabulary, lang) {
  const partial = (predicate, hasData) => {
    const matches = models.filter(predicate).length
    return matches > 0 && matches < models.filter(hasData).length
  }
  const parts = ['num:3,4', 'sort:2']
  const capabilities = Object.entries(CAPABILITIES)
    .filter(([kind]) =>
      partial(
        (model) => (model.capabilities || []).includes(kind),
        (model) => (model.capabilities || []).length > 0
      )
    )
    .map(([, names]) => names[lang])
  if (capabilities.length) parts.push(`cap:5:${capabilities.join(',')}`)
  const modalityGroup = (field, column, key, suffix) => {
    const items = vocabulary.filter((modality) =>
      partial(
        (model) => (model[field] || []).includes(modality),
        (model) => (model[field] || []).length > 0
      )
    )
    if (!items.length) return
    const list = items.map((modality) => {
      const name = MODALITIES[modality][lang]
      return `${name}${suffix}=${name}`
    })
    parts.push(`${key}:${column}:${list.join(',')}`)
  }
  modalityGroup('inputModalities', 6, 'in', lang === 'en' ? ' input' : '输入')
  modalityGroup('outputModalities', 7, 'out', lang === 'en' ? ' output' : '输出')
  return parts.join(';')
}

function pageIntro(lang) {
  if (lang === 'en')
    return `Data comes from the model catalog bundled with Cherry Studio ([provider-registry](${REPOSITORY})), synced automatically with the application repository. A \`-\` means the source data does not provide that field. Information is for reference only.`
  return `数据来自 Cherry Studio 内置模型目录（[provider-registry](${REPOSITORY})），随应用仓库自动同步；表中 \`-\` 表示数据源未提供该字段，信息仅供参考。`
}

function renderSubpage(category, models, stamp, lang) {
  const vocabulary = vocabularyOf(models)
  return `# ${category[lang].title}

${pageIntro(lang)}

> **${STAMP_LABELS[lang]}**: ${stamp}

<div data-models-table="${chipsSpec(models, vocabulary, lang)}">

${renderTable(models, lang, vocabulary)}

</div>
`
}

function renderIndex(counts, stamp, version, lang) {
  const links = CATEGORIES.map((category) =>
    lang === 'en'
      ? `* [${category.en.title}](${category.file}): ${counts.get(category.file)} ${category.en.summary}`
      : `* [${category['zh-cn'].title}](${category.file})：${counts.get(category.file)} ${category['zh-cn'].summary}`
  )
  if (lang === 'en')
    return `# Model Reference

This page mirrors the model catalog bundled with Cherry Studio ([provider-registry](${REPOSITORY})), synced automatically with the application repository. Information is for reference only: always confirm context length, capabilities and pricing with the model provider. A \`-\` means the source data does not provide that field.

> **${STAMP_LABELS[lang]}**: ${stamp} (catalog version \`${version}\`)

## Categories

${links.join('\n')}

***

### 💡 Get help and send feedback

If you run into questions, bugs or feature suggestions while configuring or using Cherry Studio, please use the official channels listed in [Feedback and suggestions](../../question-contact/suggestions.md).
`
  return `# 模型数据

本页数据来自 Cherry Studio 内置模型目录（[provider-registry](${REPOSITORY})），随应用仓库自动同步；信息仅供参考，实际上下文长度、能力与价格请以模型服务商为准。表中 \`-\` 表示数据源未提供该字段。

> **${STAMP_LABELS[lang]}**: ${stamp}（数据版本 \`${version}\`）

## 分类目录

${links.join('\n')}

***

### 💡 获取帮助与提交反馈

如果您在配置或使用过程中遇到任何疑问、Bug 或有功能改进建议，请参考 [反馈与建议](../../question-contact/suggestions.md) 中提供的官方渠道。
`
}

function formatStamp(now, lang) {
  const toStamp = (date) => date.toISOString().slice(0, 19).replace('T', ' ')
  const cst = new Date(now.getTime() + 8 * 60 * 60 * 1000)
  return `${toStamp(now)} UTC / ${toStamp(cst)} CST (${lang === 'en' ? 'Beijing time' : '北京时间'})`
}

function writeAtomic(file, contents) {
  const temporary = `${file}.tmp`
  writeFileSync(temporary, contents)
  renameSync(temporary, file)
}

// Timestamps differ on every run; normalize them so an unchanged catalog is not rewritten.
const stripStamp = (contents) => contents.replace(/\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/g, '<stamp>')

async function main() {
  const response = await fetch(SOURCE, { headers: { 'user-agent': 'cherry-studio-website-model-sync' } })
  if (!response.ok) throw new Error(`Failed to fetch the model catalog: ${response.status}`)
  const catalog = await response.json()
  if (!Array.isArray(catalog.models) || !catalog.models.length || typeof catalog.version !== 'string')
    throw new Error('Unexpected model catalog shape')

  const buckets = new Map(CATEGORIES.map((category) => [category.file, []]))
  for (const model of catalog.models) buckets.get(categoryOf(model)).push(model)
  const compare = (a, b) => a.ownedBy.localeCompare(b.ownedBy, 'en') || a.name.localeCompare(b.name, 'en')
  for (const models of buckets.values()) models.sort(compare)

  const counts = new Map([...buckets].map(([file, models]) => [file, models.length]))
  const now = new Date()
  const files = []
  for (const lang of LOCALES) {
    const stamp = formatStamp(now, lang)
    files.push({ file: path.join(OUTPUT_DIRS[lang], 'README.md'), contents: renderIndex(counts, stamp, catalog.version, lang) })
    for (const category of CATEGORIES) {
      files.push({
        file: path.join(OUTPUT_DIRS[lang], category.file),
        contents: renderSubpage(category, buckets.get(category.file), stamp, lang)
      })
    }
  }

  const changed = files.some(
    ({ file, contents }) => !existsSync(file) || stripStamp(readFileSync(file, 'utf8')) !== stripStamp(contents)
  )
  if (!changed) {
    console.log('Model catalog unchanged; keeping the current snapshot')
    return
  }

  for (const directory of Object.values(OUTPUT_DIRS)) mkdirSync(directory, { recursive: true })
  for (const { file, contents } of files) writeAtomic(file, contents)
  const total = [...counts.values()].reduce((sum, count) => sum + count, 0)
  console.log(`Wrote ${files.length} pages for ${total} models (catalog version ${catalog.version})`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
