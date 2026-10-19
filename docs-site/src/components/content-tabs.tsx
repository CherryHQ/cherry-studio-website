'use client'

import { Tab, Tabs } from 'fumadocs-ui/components/tabs'
import { type ReactNode, useEffect, useState } from 'react'

type ContentTab = { title: string; anchors: string[]; content: ReactNode }

export function ContentTabs({ tabs }: { tabs: ContentTab[] }) {
  const [target, setTarget] = useState({ index: 0, anchor: '' })

  useEffect(() => {
    const followAnchor = () => {
      let anchor: string
      try {
        anchor = decodeURIComponent(window.location.hash.slice(1))
      } catch {
        return
      }
      const index = tabs.findIndex((tab) => tab.anchors.includes(anchor))
      if (index >= 0) setTarget({ index, anchor })
    }
    followAnchor()
    window.addEventListener('hashchange', followAnchor)
    return () => window.removeEventListener('hashchange', followAnchor)
  }, [tabs])

  useEffect(() => {
    if (target.anchor) document.getElementById(target.anchor)?.scrollIntoView()
  }, [target])

  return (
    <Tabs key={`${target.index}:${target.anchor}`} items={tabs.map((tab) => tab.title)} defaultIndex={target.index}>
      {tabs.map((tab) => (
        <Tab key={tab.title} value={tab.title} forceMount>
          {tab.content}
        </Tab>
      ))}
    </Tabs>
  )
}
