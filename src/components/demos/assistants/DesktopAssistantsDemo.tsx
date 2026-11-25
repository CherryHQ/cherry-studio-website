import { TextSelect, Zap } from 'lucide-react'
import { useRef, useState } from 'react'

import { assistantsDemo } from '@/content/demos/assistants'
import { cn } from '@/lib/utils'
import DemoFrame from '../primitives/DemoFrame'
import { useDemoLocale } from '../primitives/useDemoLocale'
import { useDemoPlayback } from '../primitives/useDemoScript'
import { QuickAssistantTab } from './QuickAssistantTab'
import { SelectionAssistantTab } from './SelectionAssistantTab'

type Tab = 'selection' | 'quick'

const TABS = [
  { id: 'selection', icon: TextSelect },
  { id: 'quick', icon: Zap }
] as const

export default function DesktopAssistantsDemo() {
  const { locale, tag } = useDemoLocale()
  const copy = assistantsDemo[locale]
  const ref = useRef<HTMLDivElement>(null)
  const playing = useDemoPlayback(ref)
  const [tab, setTab] = useState<Tab>('selection')
  const [replayKey, setReplayKey] = useState(0)

  const replay = () => {
    window.getSelection()?.removeAllRanges()
    setTab('selection')
    setReplayKey((key) => key + 1)
  }

  return (
    <div ref={ref} role="region" aria-label={copy.region}>
      <DemoFrame
        title={tab === 'selection' ? copy.tabs.selection : copy.quick.window}
        onReplay={replay}
        bodyClassName="h-[440px]">
        <div className="flex h-full flex-col">
          <div role="tablist" className="flex h-11 shrink-0 items-center gap-1 border-b border-border px-3">
            {TABS.map(({ id, icon: Icon }) => (
              <button
                key={id}
                id={`assistants-tab-${id}`}
                type="button"
                role="tab"
                aria-selected={tab === id}
                aria-controls={`assistants-panel-${id}`}
                onClick={() => setTab(id)}
                className={cn(
                  'inline-flex h-7 cursor-pointer items-center gap-1.5 rounded-md px-2.5 text-[13px] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
                  tab === id ? 'bg-accent text-foreground' : 'text-muted-foreground hover:text-foreground'
                )}>
                <Icon className="size-3.5" aria-hidden="true" />
                {copy.tabs[id]}
              </button>
            ))}
          </div>
          {/* Both tabs stay mounted so the selection autoplay runs once, not on every tab switch. */}
          <div
            id="assistants-panel-selection"
            role="tabpanel"
            aria-labelledby="assistants-tab-selection"
            hidden={tab !== 'selection'}
            className="min-h-0 flex-1">
            <SelectionAssistantTab
              key={`${locale}-${replayKey}`}
              copy={copy}
              locale={locale}
              playing={playing && tab === 'selection'}
            />
          </div>
          <div
            id="assistants-panel-quick"
            role="tabpanel"
            aria-labelledby="assistants-tab-quick"
            hidden={tab !== 'quick'}
            className="min-h-0 flex-1">
            <QuickAssistantTab
              key={locale}
              copy={copy}
              locale={locale}
              tag={tag}
              playing={playing && tab === 'quick'}
              active={tab === 'quick'}
            />
          </div>
        </div>
      </DemoFrame>
    </div>
  )
}
