import type { Node } from 'fumadocs-core/page-tree'

// Task groups are labels; folders that lead to an article keep their own navigation.
export function flattenSectionGroups(nodes: Node[]): Node[] {
  return nodes.flatMap((node) =>
    node.type === 'folder' && !node.index
      ? [{ type: 'separator' as const, name: node.name, icon: node.icon }, ...node.children]
      : [node]
  )
}
