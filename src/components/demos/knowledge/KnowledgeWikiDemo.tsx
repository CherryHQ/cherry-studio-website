import { AnimatePresence, m, useReducedMotion } from 'framer-motion'
import {
  ArrowUp,
  ChevronDown,
  CirclePause,
  FileSearch,
  FileText,
  Gauge,
  type LucideIcon,
  Plus,
  ShieldCheck,
  StickyNote,
  ToolCase
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import { agentDemo, agentScript } from '@/content/demos/agents'
import { type KnowledgeWikiCopy, knowledgeWikiDemo, type WikiPageId } from '@/content/demos/knowledgeWiki'
import { cn } from '@/lib/utils'
import { AgentSessionBar, blockEnter, EmojiAvatar, TOOLBAR_ICON, UserAvatar } from '../agents/parts'
import AppShell from '../primitives/AppShell'
import BeatDots from '../primitives/BeatDots'
import DemoFrame from '../primitives/DemoFrame'
import StreamingText from '../primitives/StreamingText'
import { useDemoLocale } from '../primitives/useDemoLocale'
import { useDemoPlayback, useDemoScript } from '../primitives/useDemoScript'
import { useStickToBottom } from '../primitives/useStickToBottom'
import { ChangeBadge, orderPages, WikiPane, type WikiPhase } from './wiki/WikiPane'

type Tool = 'read' | 'search' | 'kbRead' | 'manage' | 'search2'
type ToolState = 'running' | 'done'

interface RunState {
  tools: Partial<Record<Tool, ToolState>>
  phase: WikiPhase
  /** 1 while filing the meeting, 2 while answering the follow-up, 0 when idle. */
  busy: 0 | 1 | 2
  summary: boolean
  followUp: boolean
  answer: boolean
}

// Mid-flow: the transcript is already read when the demo comes on screen.
const INITIAL: RunState = {
  tools: { read: 'done' },
  phase: 'before',
  busy: 1,
  summary: false,
  followUp: false,
  answer: false
}
const FINAL: RunState = {
  tools: { read: 'done', search: 'done', kbRead: 'done', manage: 'done', search2: 'done' },
  phase: 'ready',
  busy: 0,
  summary: true,
  followUp: true,
  answer: true
}
const FOCUS = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
// markdown.css sup[data-citation]: a pill on the --reference token (#cfe1ff light).
const CITE =
  'mx-[0.12em] inline-flex h-[1.55em] min-w-[1.55em] -translate-y-[0.45em] cursor-pointer items-center justify-center rounded-full bg-[#cfe1ff] px-[0.25em] align-baseline text-[10px] leading-none text-black dark:bg-accent dark:text-foreground'

/** ToolBlockGroup icons and ToolHeader / MessageKnowledgeSearch titles for the calls in this script. */
function toolLine(
  tool: Tool,
  state: ToolState,
  copy: KnowledgeWikiCopy
): { icon: LucideIcon; label: string; params: string } {
  const { labels, args, results } = copy
  const live = state === 'running' ? 1 : 0
  if (tool === 'read')
    return { icon: FileText, label: `${labels.view[live]} ${labels.documentFiles}`, params: args.transcript }
  if (tool === 'kbRead') return { icon: FileSearch, label: labels.view[live], params: args.read }
  if (tool === 'manage') return { icon: FileText, label: labels.create[live], params: args.manage }
  const query = tool === 'search' ? args.query : args.query2
  const count = tool === 'search' ? results.search : results.search2
  return {
    icon: FileSearch,
    label: state === 'running' ? labels.searching : labels.searchResults.replace('{count}', String(count)),
    params: query
  }
}

function ToolRow({ tool, state, copy }: { tool: Tool; state: ToolState; copy: KnowledgeWikiCopy }) {
  const { icon: Icon, label, params } = toolLine(tool, state, copy)
  return (
    <m.div {...blockEnter} className="flex min-h-7 min-w-0 items-center gap-1.5 py-0.5 text-[13px] leading-5">
      <Icon className="size-3.5 shrink-0 text-muted-foreground/80" aria-hidden="true" />
      <span className="shrink-0 text-muted-foreground">{label}</span>
      <span className="min-w-0 truncate text-muted-foreground/70">{params}</span>
      {state === 'running' && (
        <span className="ml-1 shrink-0 text-xs text-primary opacity-85">{copy.labels.running}</span>
      )}
    </m.div>
  )
}

/**
 * An Agent files a meeting into the team knowledge base (cherry-tools kb_search / kb_read / kb_manage): the new and
 * rewritten notes land in the base with their links and a diff of the changed paragraph, then a follow-up is answered
 * from those pages with citations.
 */
export default function KnowledgeWikiDemo() {
  const { locale, tag } = useDemoLocale()
  const copy = knowledgeWikiDemo[locale]
  const agent = agentDemo[locale]
  // Chinese streams one character per token, so it needs twice the rate to finish on the same beat.
  const pace = locale === 'zh' ? 2 : 1
  const reduced = useReducedMotion() ?? false
  const ref = useRef<HTMLDivElement>(null)
  const scroller = useRef<HTMLDivElement>(null)
  const thread = useRef<HTMLDivElement>(null)
  const touched = useRef(false)
  const playing = useDemoPlayback(ref)
  const [state, setState] = useState<RunState>(INITIAL)
  const [run, setRun] = useState(0)
  const [elapsed, setElapsed] = useState<[number, number]>([18, 0])
  const [sentence, setSentence] = useState(0)
  const [paneOpen, setPaneOpen] = useState(true)
  const [page, setPage] = useState<WikiPageId | null>(null)
  const [reveal, setReveal] = useState(false)
  useStickToBottom(scroller, thread)

  const update = (patch: Partial<RunState>) => setState((previous) => ({ ...previous, ...patch }))
  const setTool = (tool: Tool, value: ToolState) =>
    setState((previous) => ({ ...previous, tools: { ...previous.tools, [tool]: value } }))
  const open = (id: WikiPageId | null) => {
    touched.current = true
    setReveal(false)
    setPaneOpen(true)
    setPage(id)
  }

  const { replay } = useDemoScript(async ({ wait, reduced: skip }) => {
    setRun((value) => value + 1)
    touched.current = false
    setPaneOpen(true)
    if (skip) {
      setElapsed([23, 4])
      setSentence(copy.answer.length)
      setPage('pricing')
      setState(FINAL)
      return
    }
    setElapsed([18, 0])
    setSentence(0)
    setPage(null)
    setReveal(false)
    setState(INITIAL)
    await wait(250)
    setTool('search', 'running')
    await wait(300)
    setTool('search', 'done')
    setTool('kbRead', 'running')
    await wait(250)
    setTool('kbRead', 'done')
    setTool('manage', 'running')
    await wait(300)
    // kb_manage returns once the notes are queued; the base embeds them right after.
    setTool('manage', 'done')
    update({ phase: 'indexing' })
    await wait(500)
    update({ phase: 'ready' })
    await wait(200)
    // A visitor who already opened a page keeps it.
    if (!touched.current) {
      setReveal(true)
      setPage('pricing')
    }
    await wait(300)
    update({ summary: true })
    await wait(1000)
    update({ busy: 2, followUp: true })
    await wait(250)
    setTool('search2', 'running')
    await wait(350)
    setTool('search2', 'done')
    update({ answer: true })
    await wait(900)
    update({ busy: 0 })
  }, playing)

  useEffect(() => {
    if (!state.busy || !playing || reduced) return
    const turn = state.busy - 1
    const timer = setInterval(
      () => setElapsed((value) => (turn === 0 ? [value[0] + 1, value[1]] : [value[0], value[1] + 1])),
      1000
    )
    return () => clearInterval(timer)
  }, [state.busy, playing, reduced])

  const written = orderPages(copy.pages, 'ready').filter((item) => item.change)
  const agentName = <span className="truncate text-sm leading-5 font-semibold">{copy.agentName}</span>
  const turnHeader = (live: boolean, seconds: number) => (
    <div className="mt-2 flex min-h-7 items-center gap-1.5 py-0.5 text-[13px] text-muted-foreground">
      <span>{live ? agent.processing : agent.processed}</span>
      <span aria-hidden="true" className="text-muted-foreground/70">
        ·
      </span>
      <span>{agent.seconds.replace('{s}', String(seconds))}</span>
      {live && <BeatDots className="ml-0.5 text-muted-foreground/80" />}
    </div>
  )
  const userBubble = (text: string) => (
    <m.div {...blockEnter} className="flex justify-end">
      <div className="flex max-w-[calc(100%-2.5rem)] items-start gap-2.5">
        <p className="rounded-[10px] bg-muted px-4 py-2.5 text-sm leading-relaxed">{text}</p>
        <UserAvatar className="mt-1.5" />
      </div>
    </m.div>
  )
  const toolsOf = (list: Tool[]) =>
    list.map((tool) => {
      const value = state.tools[tool]
      return value ? <ToolRow key={tool} tool={tool} state={value} copy={copy} /> : null
    })

  // The notes kb_manage wrote, as the result under the call; each opens in the knowledge pane.
  const writtenCard = (
    <m.div
      {...blockEnter}
      className="mt-1 flex w-full max-w-md flex-col overflow-hidden rounded-lg border-[0.5px] border-border bg-muted/40">
      {written.map((item, index) => (
        <button
          key={item.id}
          type="button"
          onClick={() => open(item.id)}
          className={cn(
            'flex min-h-10 min-w-0 cursor-pointer items-center gap-2.5 px-2.5 text-left transition-colors hover:bg-accent',
            index > 0 && 'border-t-[0.5px] border-border',
            page === item.id && paneOpen && 'bg-accent',
            FOCUS
          )}>
          <StickyNote className="size-4 shrink-0 text-amber-500" aria-hidden="true" />
          <span className="min-w-0 flex-1 truncate text-[13px] font-medium">{item.title}</span>
          {item.change && <ChangeBadge change={item.change} copy={copy} />}
        </button>
      ))}
    </m.div>
  )

  const citationCount = copy.citations.length
  const answer = (
    <p className="text-sm leading-relaxed">
      {copy.answer.map((segment, index) => (
        <span key={`${run}-${locale}-${index}`}>
          <StreamingText
            text={segment.text}
            locale={tag}
            active={playing && sentence >= index}
            rate={64 * pace}
            onDone={() => setSentence((value) => Math.max(value, index + 1))}
          />
          {segment.cite && sentence > index && (
            <button
              type="button"
              aria-label={copy.labels.citationSource.replace('{number}', String(segment.cite))}
              onClick={() => open(copy.citations[segment.cite! - 1])}
              className={cn(CITE, FOCUS)}>
              {segment.cite}
            </button>
          )}
        </span>
      ))}
    </p>
  )
  // CitationsList: the "N citations" pill under the answer.
  const citations = (
    <m.div
      {...blockEnter}
      className="inline-flex h-8 items-center gap-2 self-start rounded-full border border-border bg-card px-2.5 text-xs">
      <span className="flex items-center gap-0.5" aria-hidden="true">
        {copy.citations.map((id) => (
          <span
            key={id}
            className="flex size-5 items-center justify-center rounded-full border border-border bg-background text-muted-foreground">
            <FileSearch className="size-3" strokeWidth={2} />
          </span>
        ))}
      </span>
      <span className="h-3.5 w-px bg-border" />
      <span className="font-medium text-muted-foreground">
        {copy.labels.citations.replace('{count}', String(citationCount))}
      </span>
    </m.div>
  )

  const composer = (
    <div className="rounded-[20px] border-[0.5px] border-border bg-composer pt-2 shadow-sm" aria-hidden="true">
      <div className="min-h-[46px] px-[15px] pt-1.5 text-sm leading-[1.4]">
        <span className="line-clamp-2 text-muted-foreground">
          {state.busy ? agent.placeholderBusy : agent.placeholder}
        </span>
      </div>
      <div className="flex h-10 items-center justify-between gap-4 px-2 py-1.25">
        <div className="flex min-w-0 items-center gap-1.5">
          {[ToolCase, ShieldCheck, Plus].map((Icon, index) => (
            <span key={index} className={TOOLBAR_ICON}>
              <Icon className="size-[18px]" />
            </span>
          ))}
        </div>
        <div className="flex shrink-0 items-center gap-1.5">
          <span className="flex h-7 items-center gap-1 rounded-md px-1.5 text-xs text-muted-foreground dark:text-foreground">
            <Gauge className="size-3.5 shrink-0" />
            {agent.effort.value}
            <ChevronDown className="size-[13px] shrink-0 text-muted-foreground dark:text-current" />
          </span>
          {state.busy ? (
            <span className="flex size-7.5 items-center justify-center rounded-full text-destructive">
              <CirclePause className="size-5" />
            </span>
          ) : (
            <span className="mr-0.5 flex size-[22px] items-center justify-center rounded-full bg-muted-foreground/35 text-background">
              <ArrowUp className="size-3.5" strokeWidth={2.6} />
            </span>
          )}
        </div>
      </div>
    </div>
  )

  return (
    <div ref={ref} role="region" aria-label={copy.region} className="@container">
      <DemoFrame chromeless title={agent.window} onReplay={replay} bodyClassName="h-[570px]">
        <AppShell active="agents" tab={{ title: copy.session, emoji: '🤖' }}>
          <div className="flex h-full min-h-0">
            <div className="flex min-w-0 flex-1 flex-col">
              <AgentSessionBar
                agentName={copy.agentName}
                workspace={agent.workspace}
                model={agentScript.model[locale]}
                picking={false}
              />
              <div
                ref={scroller}
                className="relative min-h-0 flex-1 overflow-y-auto px-4 [scrollbar-width:none] sm:px-6">
                <div ref={thread} className="space-y-5 py-4">
                  {userBubble(copy.task)}
                  <m.div {...blockEnter} className="flex items-start gap-2.5">
                    <EmojiAvatar size={30} />
                    <div className="flex min-w-0 flex-1 flex-col">
                      {agentName}
                      {turnHeader(state.busy === 1, elapsed[0])}
                      <p className="pt-2 pb-1 text-sm leading-relaxed">
                        <StreamingText
                          key={`${run}-${locale}`}
                          text={copy.intro}
                          locale={tag}
                          active={playing}
                          rate={44 * pace}
                        />
                      </p>
                      {toolsOf(['read', 'search', 'kbRead', 'manage'])}
                      {state.tools.manage === 'done' && writtenCard}
                      {state.summary && (
                        <p className="pt-3 text-sm leading-relaxed">
                          <StreamingText
                            key={`${run}-${locale}-summary`}
                            text={copy.summary}
                            locale={tag}
                            active={playing}
                            rate={80 * pace}
                          />
                        </p>
                      )}
                    </div>
                  </m.div>
                  {state.followUp && userBubble(copy.followUp)}
                  {state.followUp && (
                    <m.div {...blockEnter} className="flex items-start gap-2.5">
                      <EmojiAvatar size={30} />
                      <div className="flex min-w-0 flex-1 flex-col gap-2">
                        <div className="flex flex-col">
                          {agentName}
                          {turnHeader(state.busy === 2, elapsed[1])}
                          {toolsOf(['search2'])}
                        </div>
                        {state.answer && answer}
                        {state.answer && sentence >= copy.answer.length && citations}
                      </div>
                    </m.div>
                  )}
                </div>
              </div>
              <div className="shrink-0 px-3 pb-3 sm:px-5">{composer}</div>
            </div>
            <AnimatePresence>
              {paneOpen && (
                <WikiPane
                  key="wiki"
                  copy={copy}
                  phase={state.phase}
                  open={page}
                  reveal={reveal}
                  reduced={reduced}
                  onOpen={open}
                  onClose={() => setPaneOpen(false)}
                />
              )}
            </AnimatePresence>
          </div>
        </AppShell>
      </DemoFrame>
    </div>
  )
}
