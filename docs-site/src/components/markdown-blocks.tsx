import { Callout, type CalloutType } from 'fumadocs-ui/components/callout'
import { Card, Cards } from 'fumadocs-ui/components/card'
import { Step, Steps } from 'fumadocs-ui/components/steps'
import { Fragment } from 'react'

import { ContentTabs } from './content-tabs'

export type MarkdownBlock =
  | { kind: 'html'; html: string }
  | { kind: 'callout'; style: CalloutType; children: MarkdownBlock[] }
  | { kind: 'steps'; steps: MarkdownBlock[][] }
  | { kind: 'cards'; cards: { title: string; href?: string; children: MarkdownBlock[] }[] }
  | { kind: 'tabs'; tabs: { title: string; anchors: string[]; children: MarkdownBlock[] }[] }

export function MarkdownBlocks({ blocks }: { blocks: MarkdownBlock[] }) {
  return blocks.map((block, index) => {
    switch (block.kind) {
      case 'html':
        return (
          <div
            key={index}
            className="contents [.prose-no-margin>&>:first-child]:mt-0 [.prose-no-margin>&>:last-child]:mb-0"
            dangerouslySetInnerHTML={{ __html: block.html }}
          />
        )
      case 'callout':
        return (
          <Callout
            key={index}
            type={block.style}
            className="[&_p]:my-0 [&_ul]:my-0 [&_ol]:my-0 [&_.prose-no-margin]:flex [&_.prose-no-margin]:flex-col [&_.prose-no-margin]:gap-2">
            <MarkdownBlocks blocks={block.children} />
          </Callout>
        )
      case 'steps':
        return (
          <Steps key={index}>
            {block.steps.map((step, i) => (
              <Step key={i}>
                <MarkdownBlocks blocks={step} />
              </Step>
            ))}
          </Steps>
        )
      case 'cards':
        return (
          <Cards
            key={index}
            className={block.cards.length === 3 ? 'grid-cols-1 md:grid-cols-3' : 'grid-cols-1 sm:grid-cols-2'}>
            {block.cards.map((card, i) => (
              <Card key={i} title={card.title} href={card.href}>
                <MarkdownBlocks blocks={card.children} />
              </Card>
            ))}
          </Cards>
        )
      case 'tabs':
        return (
          <ContentTabs
            key={index}
            tabs={block.tabs.map((tab) => ({
              title: tab.title,
              anchors: tab.anchors,
              content: <MarkdownBlocks blocks={tab.children} />
            }))}
          />
        )
      default:
        return <Fragment key={index} />
    }
  })
}
