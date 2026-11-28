import { m } from 'framer-motion'
import { ArrowUp, Plus } from 'lucide-react'
import { useLayoutEffect, useRef } from 'react'

import type { SelectionAgentCopy } from '@/content/demos/selectionAgent'
import { ease } from '@/lib/motion'
import { AgentSessionBar, TOOLBAR_ICON } from '../../agents/parts'
import AppShell from '../../primitives/AppShell'
import { AgentThread, type AgentTurn, donePhase } from './AgentThread'

interface MainWindowProps {
  turn: AgentTurn
  copy: SelectionAgentCopy
  tag: string
}

/** The main window after `navigation.focus_or_open_conversation`: the same agent session, opened as a tab. */
export function MainWindow({ turn, copy, tag }: MainWindowProps) {
  const agent = copy.agents[turn.kind]
  const title = (turn.kind === 'reply' ? copy.replies : copy.tasks)[turn.paragraph].title
  const scroller = useRef<HTMLDivElement>(null)

  // Opens on the agent's answer, the part the visitor came back for.
  useLayoutEffect(() => {
    const view = scroller.current
    const answer = view?.querySelector('[data-turn="assistant"]')
    if (view && answer) view.scrollTop += answer.getBoundingClientRect().top - view.getBoundingClientRect().top - 12
  }, [])

  return (
    <m.div
      data-cherry-window=""
      initial={{ opacity: 0, scale: 0.96, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.14 } }}
      transition={{ duration: 0.3, ease: ease.expo }}
      // A window on the desktop, not a takeover: centred at a desktop-window shape with the mail app showing around it.
      className="absolute top-9 bottom-14 left-1/2 z-20 max-h-[600px] w-[min(88%,760px)] -translate-x-1/2 overflow-hidden rounded-xl border border-border shadow-(--shadow-float)">
      <AppShell active="agents" tab={{ title, emoji: agent.avatar }}>
        <div className="flex h-full min-h-0 flex-col">
          <AgentSessionBar
            agentName={agent.name}
            avatar={agent.avatar}
            workspace={agent.workspace ?? copy.compose.noWorkspace}
            model={copy.main.model}
            picking={false}
          />
          <div ref={scroller} className="min-h-0 flex-1 overflow-y-auto px-4 [scrollbar-width:none] @[720px]:px-8">
            <div className="mx-auto max-w-[680px] py-3">
              <AgentThread turn={turn} copy={copy} tag={tag} phase={donePhase(turn.kind)} playing={false} roomy />
            </div>
          </div>
          <div className="mx-auto w-full max-w-[720px] shrink-0 px-3 pb-3" aria-hidden="true">
            <div className="rounded-[20px] border-[0.5px] border-border bg-composer pt-2 shadow-sm">
              <p className="truncate px-[15px] text-sm leading-[1.4] text-muted-foreground">{copy.main.placeholder}</p>
              <div className="flex h-10 items-center justify-between px-2">
                <span className={TOOLBAR_ICON}>
                  <Plus className="size-[18px]" />
                </span>
                <span className="mr-0.5 flex size-[22px] items-center justify-center rounded-full bg-muted-foreground/35 text-background">
                  <ArrowUp className="size-3.5" strokeWidth={2.6} />
                </span>
              </div>
            </div>
          </div>
        </div>
      </AppShell>
    </m.div>
  )
}
