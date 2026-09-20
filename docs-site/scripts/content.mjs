import path from 'node:path'
import GithubSlugger from 'github-slugger'
import { toText } from 'hast-util-to-text'
import { pinyin } from 'pinyin-pro'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize'
import rehypeStringify from 'rehype-stringify'
import remarkGfm from 'remark-gfm'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { unified } from 'unified'
import { visit } from 'unist-util-visit'

export function slugFor(file) {
  return file
    .replace(/\.md$/i, '')
    .replace(/(^|\/)README$/i, '')
    .replace(/\/$/, '')
}

export function urlFor(locale, slug) {
  return `/docs/${locale}/${slug ? `${slug.split('/').map(encodeURIComponent).join('/')}/` : ''}`
}

export function safeResolve(root, file) {
  const resolved = path.resolve(root, file)
  if (resolved !== root && !resolved.startsWith(`${root}${path.sep}`))
    throw new Error(`Path outside content root: ${file}`)
  return resolved
}

export function convertGitBook(markdown, report) {
  // Operate on text nodes, leaving fenced code examples intact.
  const blocks = markdown.split(/(^```[^\n]*\n[\s\S]*?^```\s*$|^~~~[^\n]*\n[\s\S]*?^~~~\s*$)/m)
  return blocks
    .map((block, index) => {
      if (index % 2) return block
      return block.replace(/{%\s*([\w-]+)([\s\S]*?)%}/g, (raw, tag, args) => {
        const value = (name) => args.match(new RegExp(`${name}=["']([^"']*)["']`))?.[1] || ''
        switch (tag) {
          case 'hint':
            return `\n<aside data-hint="${value('style') || 'info'}">\n\n`
          case 'endhint':
            return '\n\n</aside>\n\n'
          case 'tabs':
          case 'endtabs':
          case 'stepper':
          case 'endstepper':
          case 'step':
          case 'endstep':
          case 'content-ref':
          case 'endcontent-ref':
            return '\n\n'
          case 'tab':
            return `\n\n### ${value('title')}\n\n`
          case 'endtab':
            return '\n\n'
          case 'embed':
            return `\n\n[${value('url')}](${value('url')})\n\n`
          default:
            report({ type: 'unsupported-tag', tag })
            return `\n\n${raw.replaceAll('{', '&#123;')}\n\n`
        }
      })
    })
    .join('')
}

export async function renderMarkdown(markdown, rewrite, report) {
  const toc = []
  const anchors = []
  const links = []
  const slugger = new GithubSlugger()
  const unicodeSlugger = new GithubSlugger()
  let title = ''
  let text = ''
  const schema = {
    ...defaultSchema,
    clobberPrefix: '',
    tagNames: [
      ...defaultSchema.tagNames,
      'aside',
      'figure',
      'figcaption',
      'mark',
      'details',
      'summary',
      'video',
      'source'
    ],
    attributes: {
      ...defaultSchema.attributes,
      '*': [...(defaultSchema.attributes['*'] || []), 'id'],
      aside: ['dataHint'],
      div: ['dataCards', 'dataCard'],
      img: ['src', 'alt', 'title', 'width', 'height'],
      video: ['src', 'controls', 'poster'],
      source: ['src', 'type']
    }
  }
  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(() => (tree) => {
      visit(tree, 'element', (node) => {
        if (node.tagName !== 'table' || node.properties.dataView !== 'cards') return
        const head = node.children.find((child) => child.tagName === 'thead')
        const headers =
          head?.children
            .find((child) => child.tagName === 'tr')
            ?.children.filter((child) => child.type === 'element') || []
        const body = node.children.find((child) => child.tagName === 'tbody')
        const rows = body?.children.filter((child) => child.tagName === 'tr') || []
        node.tagName = 'div'
        node.properties = { dataCards: true }
        node.children = rows.map((row) => {
          const cells = row.children.filter((child) => child.tagName === 'td')
          const targetIndex = headers.findIndex((header) => 'dataCardTarget' in header.properties)
          const target = cells[targetIndex]?.children.find((child) => child.tagName === 'a')
          const visible = cells.filter((_, index) => !('dataHidden' in (headers[index]?.properties || {})))
          return {
            type: 'element',
            tagName: 'div',
            properties: { dataCard: true },
            children: visible.map((cell, index) => ({
              type: 'element',
              tagName: index === 0 && target ? 'a' : 'div',
              properties: index === 0 && target ? { href: target.properties.href } : {},
              children: cell.children
            }))
          }
        })
      })
    })
    .use(rehypeSanitize, schema)
    .use(() => (tree) => {
      visit(tree, 'element', (node) => {
        const props = node.properties
        if (/^h[1-6]$/.test(node.tagName)) {
          const label = toText(node)
          const explicit = node.children.find((child) => child.type === 'element' && child.properties?.id)?.properties
            .id
          const id = String(
            explicit ||
              slugger.slug(
                /[\u3400-\u9fff]/.test(label)
                  ? pinyin(label, { toneType: 'none', type: 'array', nonZh: 'consecutive' })
                      .map((part) => part.trim())
                      .filter(Boolean)
                      .join('-')
                  : label
              )
          )
          if (explicit) {
            for (const child of node.children) {
              if (child.type === 'element' && child.properties?.id === explicit) delete child.properties.id
            }
          }
          const unicodeId = unicodeSlugger.slug(label)
          if (unicodeId !== id && !explicit) {
            node.children.push({ type: 'element', tagName: 'span', properties: { id: unicodeId }, children: [] })
          }
          props.id = id
          if (node.tagName === 'h1' && !title) {
            title = label
            // DocsTitle provides the visible h1, retain the original anchor.
            node.tagName = 'span'
            node.children = []
          } else toc.push({ title: label, url: `#${id}`, depth: Number(node.tagName[1]) })
        }
        if (props.id) anchors.push(String(props.id))
        for (const key of ['href', 'src', 'poster']) {
          if (typeof props[key] === 'string') {
            props[key] = rewrite(props[key], key)
            if (key === 'href') links.push(props[key])
          }
        }
        if (node.tagName === 'img') {
          props.loading = 'lazy'
          if (
            String(props.src).startsWith(
              'https://github.com/CherryHQ/cherry-studio-website/blob/main/docs-site/content/'
            )
          ) {
            node.tagName = 'a'
            node.properties = { href: props.src }
            node.children = [{ type: 'text', value: `[Image unavailable in source: ${props.alt || 'image'}]` }]
          }
        }
        if (node.tagName === 'a' && /^https?:/.test(String(props.href))) props.rel = 'noopener noreferrer'
      })
      text = toText(tree)
    })
    .use(rehypeStringify)
    .process(convertGitBook(markdown.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, ''), report))
  return { html: String(result), title, toc, text, anchors, links }
}

export function parseSummary(markdown) {
  const entries = []
  for (const line of markdown.split('\n')) {
    const heading = line.match(/^##\s+(.+)/)
    if (heading) entries.push({ type: 'separator', name: heading[1].replace(/<[^>]*>/g, '').trim() })
    const match = line.match(/^(\s*)[-*]\s+\[([^\]]+)\]\(([^)]+)\)/)
    if (match) entries.push({ type: 'page', name: match[2], file: match[3], depth: Math.floor(match[1].length / 2) })
  }
  return entries
}
