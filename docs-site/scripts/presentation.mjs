import { toText } from 'hast-util-to-text'
import rehypeStringify from 'rehype-stringify'
import { unified } from 'unified'
import { visit } from 'unist-util-visit'

const serializer = unified().use(rehypeStringify)
const html = (children) => serializer.stringify({ type: 'root', children })

// Read only sanitized, rewritten, highlighted nodes. Ordinary Markdown stays HTML.
export function presentationBlocks(nodes) {
  const blocks = []
  let pending = []
  const flush = () => {
    if (pending.length) blocks.push({ kind: 'html', html: html(pending) })
    pending = []
  }
  for (const node of nodes) {
    const props = node.properties || {}
    let block
    if (node.tagName === 'aside' && 'dataHint' in props) {
      const aliases = { danger: 'error', tip: 'info' }
      const style = aliases[props.dataHint] || props.dataHint
      block = {
        kind: 'callout',
        style: ['info', 'warning', 'error', 'success', 'idea'].includes(style) ? style : 'info',
        children: presentationBlocks(node.children)
      }
    } else if ('dataSteps' in props) {
      block = {
        kind: 'steps',
        steps: node.children
          .filter((child) => 'dataStep' in (child.properties || {}))
          .map((child) => presentationBlocks(child.children))
      }
    } else if ('dataTabs' in props) {
      block = {
        kind: 'tabs',
        tabs: node.children
          .filter((child) => 'dataTab' in (child.properties || {}))
          .map((child) => {
            const anchors = []
            visit(child, 'element', (element) => {
              if (element.properties.id) anchors.push(String(element.properties.id))
            })
            return { title: String(child.properties.dataTab), anchors, children: presentationBlocks(child.children) }
          })
      }
    } else if ('dataCards' in props) {
      block = {
        kind: 'cards',
        cards: node.children
          .filter((child) => 'dataCard' in (child.properties || {}))
          .map((child) => {
            const children = child.children.filter((item) => item.type !== 'text' || item.value.trim())
            let link
            visit(children[0], 'element', (element) => {
              if (!link && element.tagName === 'a') link = element
            })
            return {
              title: toText(children[0]),
              href: link?.properties.href?.replace(/^\/docs(?=\/)/, ''),
              children: presentationBlocks(children.slice(1))
            }
          })
      }
    }
    if (block) {
      flush()
      blocks.push(block)
    } else pending.push(node)
  }
  flush()
  return blocks
}
