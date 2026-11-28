import { m, useReducedMotion } from 'framer-motion'
import { Check, ClipboardCopy, FileText, Pencil, TextQuote } from 'lucide-react'
import { useEffect, useState } from 'react'

import type { AgentKind, SelectionAgentCopy } from '@/content/demos/selectionAgent'
import { cn } from '@/lib/utils'
import { blockEnter, UserAvatar } from '../../agents/parts'
import { EmojiIcon } from '../../primitives/AppShell'
import BeatDots from '../../primitives/BeatDots'
import StreamingText from '../../primitives/StreamingText'

export interface AgentTurn {
  kind: AgentKind
  paragraph: number
  quote: string
  instruction: string
}

/** How long each tool call runs; the capsule counts them as steps. The edit outlasts the autoplay on purpose. */
export const TOOL_MS: Record<AgentKind, number[]> = { reply: [], tasks: [420, 2300] }

/** `phase` 0 waits for the first token, 1..tools runs each tool, tools+1 streams, tools+2 is done. */
export const donePhase = (kind: AgentKind) => TOOL_MS[kind].length + 2

interface AgentThreadProps {
  turn: AgentTurn
  copy: SelectionAgentCopy
  tag: string
  phase: number
  playing: boolean
  /** The main window draws the same session at its full width. */
  roomy?: boolean
  onDone?: () => void
}

function ToolRow({ index, live, copy }: { index: number; live: boolean; copy: SelectionAgentCopy }) {
  const [label, liveLabel] = index === 0 ? copy.tools.view : copy.tools.modify
  const Icon = index === 0 ? FileText : Pencil
  return (
    <m.div {...blockEnter} className="flex min-h-6 items-center gap-1.5 text-[13px] text-muted-foreground">
      <Icon className="size-3.5 shrink-0 text-muted-foreground/80" aria-hidden="true" />
      <span className="shrink-0">{live ? liveLabel : label}</span>
      <code className="truncate rounded bg-muted px-1.5 py-px font-mono text-[11.5px] leading-4">
        {copy.tools.file}
      </code>
      {live && <BeatDots className="shrink-0 text-muted-foreground/80" />}
    </m.div>
  )
}

/** One agent turn as AgentSessionMessages draws it: the quoted request, tool calls, then the streamed answer. */
export function AgentThread({ turn, copy, tag, phase, playing, roomy, onDone }: AgentThreadProps) {
  const reduced = useReducedMotion()
  const tools = TOOL_MS[turn.kind].length
  const complete = phase >= donePhase(turn.kind)
  const streaming = phase === tools + 1
  const [introDone, setIntroDone] = useState(complete)
  const [items, setItems] = useState(complete ? Number.POSITIVE_INFINITY : 0)
  const [copied, setCopied] = useState(false)
  const agent = copy.agents[turn.kind]
  const reply = copy.replies[turn.paragraph]
  const task = copy.tasks[turn.paragraph]
  const avatar = roomy ? 30 : 24

  // Task items land one by one, like rows appended to the file.
  useEffect(() => {
    if (turn.kind !== 'tasks' || !introDone || !playing || complete) return
    if (items >= task.items.length) return onDone?.()
    const timer = setTimeout(() => setItems((count) => count + 1), reduced ? 0 : 140)
    return () => clearTimeout(timer)
  }, [turn.kind, introDone, playing, complete, items, task.items.length, reduced, onDone])

  useEffect(() => {
    if (!copied) return
    const timer = setTimeout(() => setCopied(false), 1500)
    return () => clearTimeout(timer)
  }, [copied])

  const copyDraft = () => {
    navigator.clipboard?.writeText(reply.draft).then(
      () => setCopied(true),
      () => {}
    )
  }

  const stream = (text: string, active: boolean, done?: () => void) =>
    complete ? text : <StreamingText text={text} locale={tag} active={active && playing} rate={56} onDone={done} />

  return (
    <div className={cn('flex flex-col', roomy ? 'gap-4' : 'gap-3')}>
      <m.div {...blockEnter} className="flex justify-end">
        <div className="flex max-w-[calc(100%-2rem)] items-start gap-2">
          <div className="min-w-0 rounded-[10px] bg-muted px-3 py-2 text-[13px] leading-relaxed">
            <p className="flex min-w-0 items-center gap-1.5 text-xs text-muted-foreground">
              <TextQuote className="size-3 shrink-0" aria-hidden="true" />
              <span className="truncate">{turn.quote.replace(/\s+/g, ' ').trim()}</span>
            </p>
            <p className="mt-0.5">{turn.instruction}</p>
          </div>
          <UserAvatar className={cn('mt-0.5', roomy ? 'size-[30px]' : 'size-6')} />
        </div>
      </m.div>

      <m.div {...blockEnter} data-turn="assistant" className="flex items-start gap-2">
        <span className="mt-px">
          <EmojiIcon emoji={agent.avatar} size={avatar} />
        </span>
        <div className="flex min-w-0 flex-1 flex-col gap-1.5">
          <span className="flex h-5 items-center gap-2 text-[13px] font-semibold">
            {agent.name}
            {phase === 0 && <BeatDots className="text-muted-foreground" />}
          </span>
          {Array.from({ length: Math.min(tools, phase) }, (_, index) => (
            <ToolRow key={index} index={index} live={phase === index + 1} copy={copy} />
          ))}
          {phase > tools && (
            <div className="flex flex-col gap-2 text-[13px] leading-relaxed" aria-live="polite">
              <p>{stream(turn.kind === 'reply' ? reply.intro : task.intro, streaming, () => setIntroDone(true))}</p>
              {turn.kind === 'reply' && introDone && (
                <m.div
                  {...blockEnter}
                  className="rounded-lg border border-border bg-background px-3 py-2.5 whitespace-pre-wrap">
                  {stream(reply.draft, streaming, onDone)}
                </m.div>
              )}
              {turn.kind === 'tasks' && introDone && (
                <ul className="flex flex-col gap-1">
                  {task.items.slice(0, items).map((item) => (
                    <m.li {...blockEnter} key={item} className="flex items-start gap-2">
                      <span
                        aria-hidden="true"
                        className="mt-1 flex size-3.5 shrink-0 items-center justify-center rounded-[4px] border border-border"
                      />
                      <span className="min-w-0">{item}</span>
                    </m.li>
                  ))}
                </ul>
              )}
              {turn.kind === 'reply' && complete && (
                <button
                  type="button"
                  onClick={copyDraft}
                  className="flex h-6 w-fit cursor-pointer items-center gap-1 rounded-md px-1.5 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-2 focus-visible:outline-primary">
                  {copied ? (
                    <Check className="size-3.5" aria-hidden="true" />
                  ) : (
                    <ClipboardCopy className="size-3.5" aria-hidden="true" />
                  )}
                  {copied ? copy.window.copied : copy.window.copy}
                </button>
              )}
            </div>
          )}
        </div>
      </m.div>
    </div>
  )
}
