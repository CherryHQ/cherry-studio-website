import { m } from 'framer-motion'
import {
  ArrowUp,
  ChevronDown,
  Code,
  DownloadIcon,
  Eye,
  FileCode2,
  LinkIcon,
  SquareSplitHorizontal,
  X
} from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'

import { artifactsDemo } from '@/content/demos/create'
import { spring } from '@/lib/motion'
import { cn } from '@/lib/utils'
import DemoFrame from '../primitives/DemoFrame'
import ProviderIcon from '../primitives/ProviderIcon'
import StreamingText, { tokenize } from '../primitives/StreamingText'
import { useDemoLocale } from '../primitives/useDemoLocale'
import { useDemoPlayback, useDemoScript } from '../primitives/useDemoScript'
import { useStickToBottom } from '../primitives/useStickToBottom'
import { buildArtifactSource, type CodeLine } from './artifactSource'
import { CodeView } from './CodeView'
import { PomodoroApp } from './PomodoroApp'

type Phase = 'idle' | 'sent' | 'intro' | 'code' | 'done'
type View = 'split' | 'code' | 'preview'

interface DemoState {
  phase: Phase
  codeCount: number
  paneOpen: boolean
  view: View
}

const INITIAL: DemoState = { phase: 'idle', codeCount: 0, paneOpen: false, view: 'preview' }
const PHASE_ORDER: Phase[] = ['idle', 'sent', 'intro', 'code', 'done']
const reached = (phase: Phase, target: Phase) => PHASE_ORDER.indexOf(phase) >= PHASE_ORDER.indexOf(target)

// Desktop right pane (chat/shell/rightPaneTransition.ts): clip-path wipe on CHAT_SHELL_TRANSITION, 0.3s easeInOut.
const PANE_CLIP_COLLAPSED = 'inset(0% 0% 0% 100%)'
const PANE_CLIP_REVEALED = 'inset(0% 0% 0% 0%)'
const PANE_TRANSITION = { duration: 0.3, ease: 'easeInOut' } as const
const INTRO_RATE = 40
const LINE_MS = 55

const blockEnter = { initial: { opacity: 0, x: 10 }, animate: { opacity: 1, x: 0 }, transition: spring.block }

const VIEWS = [
  { value: 'split', icon: SquareSplitHorizontal },
  { value: 'code', icon: Code },
  { value: 'preview', icon: Eye }
] as const

/** The streaming source tail under the artifact card, pinned to its newest line. */
function CodeTail({ lines, count }: { lines: CodeLine[]; count: number }) {
  const scroller = useRef<HTMLDivElement>(null)
  const content = useRef<HTMLDivElement>(null)
  useStickToBottom(scroller, content)
  return (
    <div
      ref={scroller}
      aria-hidden="true"
      className="mt-2 max-h-[132px] max-w-xl overflow-hidden rounded-lg border-[0.5px] border-border bg-secondary/40 px-3 py-2 [mask-image:linear-gradient(to_bottom,transparent,black_28px)]">
      <div ref={content}>
        <CodeView lines={lines} count={count} />
      </div>
    </div>
  )
}

export default function ArtifactsDemo() {
  const { locale, tag } = useDemoLocale()
  const copy = artifactsDemo[locale]
  const ref = useRef<HTMLDivElement>(null)
  const scroller = useRef<HTMLDivElement>(null)
  const thread = useRef<HTMLDivElement>(null)
  const touched = useRef(false)
  const playing = useDemoPlayback(ref)
  const [state, setState] = useState<DemoState>(INITIAL)
  const lines = useMemo(() => buildArtifactSource(copy.app), [copy.app])
  const update = (patch: Partial<DemoState>) => setState((previous) => ({ ...previous, ...patch }))
  useStickToBottom(scroller, thread)

  const { reduced, replay } = useDemoScript(async ({ wait, reduced }) => {
    touched.current = false
    if (reduced) {
      setState({ phase: 'done', codeCount: lines.length, paneOpen: true, view: 'preview' })
      return
    }
    setState(INITIAL)
    await wait(500)
    update({ phase: 'sent' })
    await wait(700)
    update({ phase: 'intro' })
    await wait((tokenize(copy.intro, tag).length / INTRO_RATE) * 1000 + 300)
    update({ phase: 'code' })
    for (let count = 1; count <= lines.length; count++) {
      update({ codeCount: count })
      await wait(LINE_MS)
    }
    await wait(350)
    update({ phase: 'done', paneOpen: true })
    await wait(1800)
    if (!touched.current) update({ view: 'split' })
  }, playing)

  // The chat column shrinks when the pane docks; keep the newest message in view once the 0.3s wipe settles.
  useEffect(() => {
    const timer = setTimeout(
      () => scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: 'smooth' }),
      320
    )
    return () => clearTimeout(timer)
  }, [state.paneOpen])

  const act = (patch: Partial<DemoState>) => {
    touched.current = true
    update(patch)
  }

  const { phase, paneOpen, view } = state
  const streaming = phase === 'code'

  const card = (
    <div className="flex w-full max-w-xl items-center overflow-hidden rounded-lg border-[0.5px] border-border bg-secondary/50 transition-colors hover:bg-accent">
      <button
        type="button"
        aria-label={`${copy.openPreview}: ${copy.app.title}`}
        aria-expanded={paneOpen}
        disabled={streaming}
        onClick={() => act({ paneOpen: !paneOpen })}
        className="flex min-h-12 min-w-0 flex-1 cursor-pointer items-center gap-2.5 px-2.5 py-2 text-left focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary disabled:cursor-default">
        <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-background">
          <FileCode2 className="size-4 text-orange-500" aria-hidden="true" />
        </span>
        <span className="min-w-0 truncate text-[13px] leading-5 font-medium text-foreground">{copy.app.title}</span>
        {streaming ? (
          <span className="flex shrink-0 items-center gap-1.5 text-xs text-muted-foreground">
            <span className="size-1.5 rounded-full bg-primary motion-safe:animate-pulse" />
            {copy.generating}
          </span>
        ) : (
          <span className="shrink-0 rounded-sm bg-background px-1.5 py-0.5 text-[10px] leading-4 font-medium text-muted-foreground">
            HTML
          </span>
        )}
      </button>
      {!streaming && (
        <span aria-hidden="true" className="mr-2 flex shrink-0 items-center gap-0.5 text-muted-foreground opacity-70">
          {[LinkIcon, DownloadIcon].map((Icon, index) => (
            <span key={index} className="flex size-7 items-center justify-center">
              <Icon className="size-[15px]" />
            </span>
          ))}
        </span>
      )}
    </div>
  )

  const chat = (
    <div className="flex min-h-0 min-w-0 flex-col">
      <div className="flex h-10 shrink-0 items-center gap-2 border-b border-border px-4 text-xs">
        <span className="inline-flex items-center gap-1.5 rounded-md px-1.5 py-1 font-medium">
          <ProviderIcon id={copy.model.provider} className="size-3.5" />
          {copy.model.name}
          <ChevronDown className="size-3 text-muted-foreground" aria-hidden="true" />
        </span>
      </div>
      <div ref={scroller} className="min-h-0 flex-1 overflow-y-auto px-4 [scrollbar-width:none] sm:px-6">
        <div ref={thread} className="space-y-4 py-4">
          {reached(phase, 'sent') && (
            <m.div {...blockEnter} className="flex justify-end">
              <p className="max-w-[85%] rounded-[10px] bg-chat-user px-4 py-2.5 text-[14px] leading-6">{copy.prompt}</p>
            </m.div>
          )}
          {reached(phase, 'intro') && (
            <m.div {...blockEnter} className="space-y-2.5">
              <div className="flex items-center gap-2 text-xs">
                <span className="flex size-6 items-center justify-center rounded-full bg-secondary ring-1 ring-border">
                  <ProviderIcon id={copy.model.provider} className="size-3.5" />
                </span>
                <span className="font-medium">{copy.model.name}</span>
              </div>
              <p className="text-[14px] leading-6 text-foreground/90">
                <StreamingText
                  key={locale}
                  text={copy.intro}
                  locale={tag}
                  active={(phase === 'intro' || reduced) && playing}
                  rate={INTRO_RATE}
                />
              </p>
              {reached(phase, 'code') && (
                <m.div {...blockEnter}>
                  {card}
                  {streaming && <CodeTail lines={lines} count={state.codeCount} />}
                </m.div>
              )}
              {phase === 'done' && (
                <p className="text-[14px] leading-6 text-foreground/90 motion-safe:animate-in motion-safe:fade-in motion-safe:duration-300">
                  {copy.outro}
                </p>
              )}
            </m.div>
          )}
        </div>
      </div>
      <div className="hidden shrink-0 px-4 pt-1 pb-4 @2xl:block">
        <div
          aria-hidden="true"
          className="flex items-center justify-between rounded-[20px] border-[0.5px] border-hairline-strong bg-composer py-2 pr-2 pl-4 text-[14px] text-muted-foreground/70 shadow-sm">
          <span className="truncate">{copy.placeholder}</span>
          <span className="flex size-7 items-center justify-center rounded-full bg-secondary text-muted-foreground">
            <ArrowUp className="size-4" />
          </span>
        </div>
      </div>
    </div>
  )

  const pane = (
    <div className="relative min-h-0 min-w-0 overflow-hidden">
      {/* Fixed at its settled size so the clip wipes over a laid-out pane, like the desktop docked box. */}
      <m.div
        initial={false}
        animate={{
          clipPath: paneOpen ? PANE_CLIP_REVEALED : PANE_CLIP_COLLAPSED,
          opacity: paneOpen ? 1 : 0
        }}
        transition={reduced ? { duration: 0 } : PANE_TRANSITION}
        // React 18 has no typed `inert`; it keeps the collapsed pane out of the tab order.
        {...{ inert: paneOpen ? undefined : '' }}
        className="absolute right-0 bottom-0 flex h-[55.56cqh] w-full flex-col border-t border-border bg-card @2xl:h-full @2xl:w-[53.49cqw] @2xl:border-t-0 @2xl:border-l">
        <div className="flex h-10 shrink-0 items-center gap-2 border-b border-border px-2">
          <span className="min-w-0 flex-1 truncate px-1 text-sm font-medium">{copy.app.title}</span>
          <div
            role="group"
            aria-label={copy.viewMode}
            className="inline-flex shrink-0 items-center rounded-full border border-border/60 bg-muted/60 p-0.5">
            {VIEWS.map(({ value, icon: Icon }) => (
              <button
                key={value}
                type="button"
                aria-pressed={view === value}
                aria-label={copy[value]}
                onClick={() => act({ view: value })}
                className={cn(
                  'inline-flex h-7 cursor-pointer items-center gap-1.5 rounded-full px-2.5 text-xs font-medium whitespace-nowrap transition-[background-color,color,box-shadow] focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary',
                  view === value
                    ? 'bg-background text-foreground shadow-xs'
                    : 'text-muted-foreground hover:text-foreground'
                )}>
                <Icon className="size-3.5" aria-hidden="true" />
                <span className="hidden @md:inline">{copy[value]}</span>
              </button>
            ))}
          </div>
          <button
            type="button"
            aria-label={copy.closePreview}
            onClick={() => act({ paneOpen: false })}
            className="flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-2 focus-visible:outline-primary">
            <X className="size-4" aria-hidden="true" />
          </button>
        </div>
        <div
          className={cn(
            'grid min-h-0 flex-1',
            view === 'split' ? 'grid-cols-[minmax(0,1fr)_1px_minmax(0,1fr)]' : 'grid-cols-1'
          )}>
          <div className={cn('min-h-0 overflow-auto p-3 [scrollbar-width:thin]', view === 'preview' && 'hidden')}>
            <CodeView lines={lines} numbered />
          </div>
          <span aria-hidden="true" className={cn('bg-border', view !== 'split' && 'hidden')} />
          <div className={cn('min-h-0 min-w-0', view === 'code' && 'hidden')}>
            <PomodoroApp app={copy.app} playing={playing} />
          </div>
        </div>
      </m.div>
    </div>
  )

  return (
    <div ref={ref} role="region" aria-label={copy.window}>
      <DemoFrame title={copy.window} onReplay={replay} bodyClassName="h-[460px]">
        <div className="h-full [container-type:size]">
          <div
            className={cn(
              'grid h-full transition-[grid-template-columns,grid-template-rows] duration-300 ease-in-out motion-reduce:transition-none @2xl:grid-rows-1',
              paneOpen
                ? 'grid-rows-[minmax(0,1fr)_minmax(0,1.25fr)] @2xl:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]'
                : 'grid-rows-[minmax(0,1fr)_minmax(0,0fr)] @2xl:grid-cols-[minmax(0,1fr)_minmax(0,0fr)]'
            )}>
            {chat}
            {pane}
          </div>
        </div>
      </DemoFrame>
    </div>
  )
}
