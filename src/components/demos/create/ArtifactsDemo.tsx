import { m } from 'framer-motion'
import {
  Check,
  Code,
  Code2,
  Compass,
  Copy,
  DownloadIcon,
  Eye,
  GripVertical,
  Maximize2,
  Minimize2,
  SaveIcon,
  ShieldAlert,
  SquareSplitHorizontal,
  X,
  ZoomIn,
  ZoomOut
} from 'lucide-react'
import { useEffect, useId, useMemo, useRef, useState } from 'react'

import { artifactsDemo } from '@/content/demos/create'
import { spring } from '@/lib/motion'
import { cn } from '@/lib/utils'
import AppShell, { tabTitle } from '../primitives/AppShell'
import DemoFrame from '../primitives/DemoFrame'
import ProviderIcon from '../primitives/ProviderIcon'
import StreamingText, { tokenize } from '../primitives/StreamingText'
import { useDemoLocale } from '../primitives/useDemoLocale'
import { useDemoPlayback, useDemoScript } from '../primitives/useDemoScript'
import { useStickToBottom } from '../primitives/useStickToBottom'
import { buildArtifactSource, type CodeLine } from './artifactSource'
import { CodeView } from './CodeView'
import { SilkWallpaperApp } from './SilkWallpaperApp'

type Phase = 'idle' | 'sent' | 'intro' | 'code' | 'done'
type ViewMode = 'split' | 'code' | 'preview'

interface DemoState {
  phase: Phase
  codeCount: number
  approved: boolean
  popup: ViewMode | null
}

const INITIAL: DemoState = { phase: 'idle', codeCount: 0, approved: false, popup: null }
const PHASE_ORDER: Phase[] = ['idle', 'sent', 'intro', 'code', 'done']
const reached = (phase: Phase, target: Phase) => PHASE_ORDER.indexOf(phase) >= PHASE_ORDER.indexOf(target)

const INTRO_RATE = 40
const LINE_MS = 55
// Desktop HtmlArtifactView: 240px initial preview, zoom 50–200% in 10% steps.
const PREVIEW_HEIGHT = 240
const MIN_ZOOM = 50
const MAX_ZOOM = 200
const ZOOM_STEP = 10

const blockEnter = { initial: { opacity: 0, x: 10 }, animate: { opacity: 1, x: 0 }, transition: spring.block }

const VIEWS = [
  { value: 'split', icon: SquareSplitHorizontal },
  { value: 'code', icon: Code },
  { value: 'preview', icon: Eye }
] as const

const sourceText = (lines: CodeLine[]) => lines.map((line) => line.map(([, text]) => text).join('')).join('\n')

/** material-icon-theme `html` glyph, which the desktop FileIcon renders for `.html` artifacts. */
function HtmlFileIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={className}>
      <path
        fill="#e65100"
        d="m4 4l2 22l10 2l10-2l2-22Zm19.72 7H11.28l.29 3h11.86l-.802 9.335L15.99 25l-6.635-1.646L8.93 19h3.02l.19 2l3.86.77l3.84-.77l.29-4H8.84L8 8h16Z"
      />
    </svg>
  )
}

/** The fenced HTML block while it streams: CodeBlockView with its toolbar hidden, capped and pinned to the tail. */
function StreamingCodeBlock({ lines, count }: { lines: CodeLine[]; count: number }) {
  const scroller = useRef<HTMLDivElement>(null)
  const content = useRef<HTMLDivElement>(null)
  useStickToBottom(scroller, content)
  return (
    <div aria-hidden="true" className="overflow-clip rounded-lg border-[0.5px] border-border bg-secondary/40">
      <div className="flex h-8 items-center gap-1.5 border-b-[0.5px] border-border px-2.5 text-xs leading-none font-medium text-muted-foreground">
        <HtmlFileIcon className="size-[1.1em]" />
        HTML
      </div>
      <div ref={scroller} className="max-h-[180px] overflow-hidden px-3 py-2">
        <div ref={content}>
          <CodeView lines={lines} count={count} />
        </div>
      </div>
    </div>
  )
}

export default function ArtifactsDemo() {
  const { locale, tag } = useDemoLocale()
  const copy = artifactsDemo[locale]
  const hintId = useId()
  const ref = useRef<HTMLDivElement>(null)
  const scroller = useRef<HTMLDivElement>(null)
  const thread = useRef<HTMLDivElement>(null)
  const touched = useRef(false)
  const playing = useDemoPlayback(ref)
  const [state, setState] = useState<DemoState>(INITIAL)
  const [showCode, setShowCode] = useState(false)
  const [zoom, setZoom] = useState(100)
  const [fullscreen, setFullscreen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [saved, setSaved] = useState(false)
  const lines = useMemo(() => buildArtifactSource(copy.app), [copy.app])
  const html = useMemo(() => sourceText(lines), [lines])
  const update = (patch: Partial<DemoState>) => setState((previous) => ({ ...previous, ...patch }))
  useStickToBottom(scroller, thread)

  const { reduced, replay } = useDemoScript(async ({ wait, reduced }) => {
    touched.current = false
    setShowCode(false)
    setZoom(100)
    setFullscreen(false)
    if (reduced) {
      setState({ phase: 'done', codeCount: lines.length, approved: true, popup: null })
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
    update({ phase: 'done' })
    await wait(1500)
    if (touched.current) return
    update({ approved: true })
    await wait(1800)
    if (touched.current) return
    update({ popup: 'preview' })
    await wait(1400)
    if (!touched.current) update({ popup: 'split' })
  }, playing)

  useEffect(() => {
    if (!copied && !saved) return
    const timer = setTimeout(() => {
      setCopied(false)
      setSaved(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [copied, saved])

  const act = (patch: Partial<DemoState>) => {
    touched.current = true
    update(patch)
  }
  const closePopup = () => {
    setFullscreen(false)
    act({ popup: null })
  }
  // Real file actions on the artifact source, standing in for the desktop's temp-file open and save dialog.
  const openBlob = (download: boolean) => {
    const url = URL.createObjectURL(new Blob([html], { type: 'text/html' }))
    const link = document.createElement('a')
    link.href = url
    if (download) link.download = `${copy.app.title}.html`
    else link.target = '_blank'
    link.rel = 'noopener'
    link.click()
    setTimeout(() => URL.revokeObjectURL(url), 1000)
  }

  const { phase, approved, popup } = state
  const iconButton =
    'flex size-6 cursor-pointer items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-primary disabled:cursor-default disabled:opacity-50'
  const divider = <span aria-hidden="true" className="h-3.5 w-px bg-border" />

  const consentCard = (
    <button
      type="button"
      aria-label={copy.viewWebpage}
      aria-describedby={hintId}
      title={copy.viewWebpageHint}
      onClick={() => act({ approved: true })}
      className="flex w-full max-w-xl cursor-pointer items-center overflow-hidden rounded-lg border-[0.5px] border-border bg-secondary/40 text-left transition-colors hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
      <span className="flex min-h-12 min-w-0 flex-1 items-center gap-2.5 px-2.5 py-2">
        <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-background">
          <HtmlFileIcon className="size-5" />
        </span>
        <span className="truncate text-[13px] leading-5 font-medium text-foreground">{copy.app.title}</span>
        <span className="shrink-0 rounded-sm bg-background px-1.5 py-0.5 text-[10px] leading-4 font-medium text-muted-foreground">
          HTML
        </span>
      </span>
      <span className="mr-2 flex shrink-0 items-center gap-1.5 px-2 text-xs text-muted-foreground">
        <ShieldAlert className="size-3.5 text-amber-500" aria-hidden="true" />
        {copy.viewWebpage}
      </span>
      <span id={hintId} className="sr-only">
        {copy.viewWebpageHint}
      </span>
    </button>
  )

  const inlinePreview = (
    <div className="group relative w-full overflow-hidden rounded-lg" style={{ height: PREVIEW_HEIGHT }}>
      <div className="relative h-full min-h-0 overflow-hidden bg-background">
        {showCode ? (
          <div className="h-full overflow-auto p-3 [scrollbar-width:thin]">
            <CodeView lines={lines} />
          </div>
        ) : (
          <div
            className="origin-top-left"
            style={{ width: `${10000 / zoom}%`, height: `${10000 / zoom}%`, transform: `scale(${zoom / 100})` }}>
            <SilkWallpaperApp app={copy.app} playing={playing} />
          </div>
        )}
        <div className="pointer-events-none absolute top-1.5 right-1.5 z-10 flex items-center gap-0.5 rounded-md border border-border bg-popover p-0.5 opacity-0 shadow-sm transition-opacity duration-150 group-hover:pointer-events-auto group-hover:opacity-100 group-has-[:focus-visible]:pointer-events-auto group-has-[:focus-visible]:opacity-100 motion-reduce:transition-none">
          {!showCode && (
            <>
              <button
                type="button"
                aria-label={copy.zoomOut}
                title={copy.zoomOut}
                disabled={zoom <= MIN_ZOOM}
                onClick={() => setZoom((value) => Math.max(MIN_ZOOM, value - ZOOM_STEP))}
                className={iconButton}>
                <ZoomOut className="size-3" aria-hidden="true" />
              </button>
              <button
                type="button"
                aria-label={copy.resetZoom}
                title={copy.resetZoom}
                onClick={() => setZoom(100)}
                className={cn(iconButton, 'w-auto min-w-9 px-1 text-xs tabular-nums')}>
                {zoom}%
              </button>
              <button
                type="button"
                aria-label={copy.zoomIn}
                title={copy.zoomIn}
                disabled={zoom >= MAX_ZOOM}
                onClick={() => setZoom((value) => Math.min(MAX_ZOOM, value + ZOOM_STEP))}
                className={iconButton}>
                <ZoomIn className="size-3" aria-hidden="true" />
              </button>
              {divider}
            </>
          )}
          <button
            type="button"
            aria-label={copy.openExternal}
            title={copy.openExternal}
            onClick={() => openBlob(false)}
            className={iconButton}>
            <Compass className="size-3" aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label={copy.download}
            title={copy.download}
            onClick={() => openBlob(true)}
            className={iconButton}>
            <DownloadIcon className="size-3" aria-hidden="true" />
          </button>
          {showCode ? (
            <button
              type="button"
              aria-label={copy.copySource}
              title={copy.copySource}
              onClick={() => {
                void navigator.clipboard?.writeText(html).then(() => setCopied(true))
              }}
              className={iconButton}>
              {copied ? (
                <Check className="size-3 text-emerald-500" aria-hidden="true" />
              ) : (
                <Copy className="size-3" aria-hidden="true" />
              )}
            </button>
          ) : (
            <button
              type="button"
              aria-label={copy.maximize}
              title={copy.maximize}
              onClick={() => act({ popup: 'preview' })}
              className={iconButton}>
              <Maximize2 className="size-3" aria-hidden="true" />
            </button>
          )}
          {divider}
          <button
            type="button"
            aria-label={showCode ? copy.preview : copy.code}
            title={showCode ? copy.preview : copy.code}
            aria-pressed={showCode}
            onClick={() => {
              touched.current = true
              setShowCode((value) => !value)
            }}
            className={iconButton}>
            {showCode ? <Eye className="size-3" aria-hidden="true" /> : <Code2 className="size-3" aria-hidden="true" />}
          </button>
        </div>
      </div>
    </div>
  )

  const codePanel = (
    <div className="relative h-full min-h-0 overflow-auto bg-secondary/40 p-3 [scrollbar-width:thin]">
      <CodeView lines={lines} numbered />
      <button
        type="button"
        aria-label={copy.save}
        title={copy.save}
        onClick={() => setSaved(true)}
        className="sticky bottom-1 ml-auto flex size-9 cursor-pointer items-center justify-center rounded-md border border-border bg-popover text-popover-foreground shadow-lg hover:bg-accent focus-visible:outline-2 focus-visible:outline-primary">
        {saved ? (
          <Check className="size-4 text-emerald-500" aria-hidden="true" />
        ) : (
          <SaveIcon className="size-4" aria-hidden="true" />
        )}
      </button>
    </div>
  )
  const previewPanel = (
    <div className="h-full min-h-0 min-w-0">
      <SilkWallpaperApp app={copy.app} playing={playing} />
    </div>
  )

  const dialog = popup && (
    <div
      className={cn(
        'absolute inset-0 z-30 flex items-center justify-center',
        !fullscreen && 'bg-black/35 backdrop-blur-[2px]'
      )}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label={copy.app.title}
        onKeyDown={(event) => {
          if (event.key === 'Escape') closePopup()
        }}
        className={cn(
          'grid grid-rows-[45px_minmax(0,1fr)] overflow-hidden bg-card shadow-xl motion-safe:animate-in motion-safe:fade-in motion-safe:zoom-in-95 motion-safe:duration-200',
          fullscreen ? 'size-full' : 'h-[80%] w-[90%] rounded-3xl'
        )}>
        <header className="relative flex items-center justify-between gap-4 border-b border-border bg-background px-2.5">
          <p className="min-w-0 flex-1 truncate pl-3 text-sm font-bold text-foreground @max-md:sr-only">
            {copy.app.title}
          </p>
          <div
            role="radiogroup"
            aria-label={copy.viewMode}
            className="absolute top-1/2 left-1/2 inline-flex -translate-x-1/2 -translate-y-1/2 items-center rounded-full border border-border/60 bg-muted/60 p-0.5 @max-md:left-2 @max-md:translate-x-0">
            {VIEWS.map(({ value, icon: Icon }) => (
              <button
                key={value}
                type="button"
                role="radio"
                aria-checked={popup === value}
                aria-label={copy[value]}
                onClick={() => act({ popup: value })}
                className={cn(
                  'inline-flex h-7 cursor-pointer items-center justify-center gap-1.5 rounded-full px-2.5 text-xs font-medium whitespace-nowrap transition-[background-color,color,box-shadow] focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary',
                  popup === value
                    ? 'bg-background text-foreground shadow-xs'
                    : 'text-muted-foreground hover:text-foreground'
                )}>
                <Icon className="size-3.5" aria-hidden="true" />
                <span className="@max-md:hidden">{copy[value]}</span>
              </button>
            ))}
          </div>
          <div className="flex flex-1 items-center justify-end gap-2 pr-1">
            <button
              type="button"
              aria-label={copy.fullscreen}
              aria-pressed={fullscreen}
              onClick={() => setFullscreen((value) => !value)}
              className="flex size-7 cursor-pointer items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-2 focus-visible:outline-primary">
              {fullscreen ? (
                <Minimize2 className="size-3.5" aria-hidden="true" />
              ) : (
                <Maximize2 className="size-3.5" aria-hidden="true" />
              )}
            </button>
            <button
              type="button"
              aria-label={copy.close}
              onClick={closePopup}
              className="flex size-7 cursor-pointer items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-2 focus-visible:outline-primary">
              <X className="size-3.5" aria-hidden="true" />
            </button>
          </div>
        </header>
        <div className="min-h-0 overflow-hidden bg-background">
          {popup === 'split' ? (
            <div className="grid h-full grid-cols-[minmax(0,1fr)_1px_minmax(0,1fr)]">
              {codePanel}
              <span aria-hidden="true" className="relative flex items-center justify-center bg-border">
                <span className="z-10 flex h-4 w-3 shrink-0 items-center justify-center rounded-xs border border-border bg-background shadow-xs">
                  <GripVertical className="size-2.5 text-muted-foreground" />
                </span>
              </span>
              {previewPanel}
            </div>
          ) : popup === 'code' ? (
            codePanel
          ) : (
            previewPanel
          )}
        </div>
      </div>
    </div>
  )

  return (
    <div ref={ref} role="region" aria-label={copy.window}>
      <DemoFrame chromeless title={copy.window} onReplay={replay} bodyClassName="h-[510px]">
        <AppShell active="assistants" tab={{ title: tabTitle(copy.window), emoji: '😀' }}>
          <div className="relative h-full [container-type:size]">
            <div ref={scroller} className="h-full overflow-y-auto px-4 [scrollbar-width:none] sm:px-6">
              <div ref={thread} className="mx-auto max-w-3xl space-y-6 py-5">
                {reached(phase, 'sent') && (
                  <m.div {...blockEnter} className="flex justify-end">
                    <p className="max-w-[85%] rounded-[10px] bg-chat-user px-4 py-2.5 text-[14px] leading-6">
                      {copy.prompt}
                    </p>
                  </m.div>
                )}
                {reached(phase, 'intro') && (
                  <m.div {...blockEnter} className="flex items-start gap-2.5">
                    <span className="flex size-[30px] shrink-0 items-center justify-center rounded-full bg-background ring-1 ring-border">
                      <ProviderIcon id={copy.model.provider} className="size-4" />
                    </span>
                    <div className="flex min-w-0 flex-1 flex-col">
                      <span className="truncate text-sm leading-5 font-semibold">{copy.model.name}</span>
                      <div className="mt-2 min-w-0 space-y-2.5 text-[14px] leading-6 text-foreground/90">
                        <p>
                          <StreamingText
                            key={locale}
                            text={copy.intro}
                            locale={tag}
                            active={(phase === 'intro' || reduced) && playing}
                            rate={INTRO_RATE}
                          />
                        </p>
                        {phase === 'code' && (
                          <m.div {...blockEnter}>
                            <StreamingCodeBlock lines={lines} count={state.codeCount} />
                          </m.div>
                        )}
                        {phase === 'done' && (
                          <div className="motion-safe:animate-in motion-safe:fade-in motion-safe:duration-300">
                            {!approved ? consentCard : popup ? null : inlinePreview}
                          </div>
                        )}
                        {phase === 'done' && (
                          <p className="motion-safe:animate-in motion-safe:fade-in motion-safe:duration-300">
                            {copy.outro}
                          </p>
                        )}
                      </div>
                    </div>
                  </m.div>
                )}
              </div>
            </div>
            {dialog}
          </div>
        </AppShell>
      </DemoFrame>
    </div>
  )
}
