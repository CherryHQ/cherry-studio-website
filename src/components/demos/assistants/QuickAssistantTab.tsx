import { AnimatePresence, m, useReducedMotion } from 'framer-motion'
import {
  ArrowLeft,
  ArrowLeftRight,
  ChevronDown,
  CircleArrowLeft,
  Copy,
  CornerDownLeft,
  FileText,
  Languages,
  Lightbulb,
  Loader2,
  type LucideIcon,
  MessageSquare,
  Pin,
  X,
  Zap
} from 'lucide-react'
import { type KeyboardEvent, type ReactNode, useEffect, useRef, useState } from 'react'

import {
  type AssistantsDemoCopy,
  assistantsTranslation,
  type DemoLocale,
  type QuickFeatureId
} from '@/content/demos/assistants'
import { ease } from '@/lib/motion'
import { cn } from '@/lib/utils'
import Kbd from '../primitives/Kbd'
import ProviderIcon from '../primitives/ProviderIcon'
import StreamingText from '../primitives/StreamingText'
import { useStickToBottom } from '../primitives/useStickToBottom'

type Route = 'home' | QuickFeatureId
type Phase = 'preparing' | 'streaming' | 'done'

// Feature order and icons from desktop quickAssistant/home/components/FeatureMenus.
const FEATURES: { id: QuickFeatureId; icon: LucideIcon }[] = [
  { id: 'chat', icon: MessageSquare },
  { id: 'translate', icon: Languages },
  { id: 'summary', icon: FileText },
  { id: 'explanation', icon: Lightbulb }
]

const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent)

interface QuickAssistantTabProps {
  copy: AssistantsDemoCopy
  locale: DemoLocale
  tag: string
  playing: boolean
  active: boolean
}

function FooterAction({ onClick, children }: { onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex cursor-pointer items-center gap-1 rounded px-1.5 py-0.5 whitespace-nowrap text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-2 focus-visible:outline-primary">
      {children}
    </button>
  )
}

/** Mounted per answer route so the stick-to-bottom observer always sees live nodes. */
function AnswerScroller({ children }: { children: ReactNode }) {
  const scroller = useRef<HTMLDivElement>(null)
  const thread = useRef<HTMLDivElement>(null)
  useStickToBottom(scroller, thread)
  return (
    <div ref={scroller} className="min-h-0 flex-1 overflow-y-auto [scrollbar-width:thin]">
      <div ref={thread} className="pb-2 text-[14px] leading-relaxed text-foreground/90" aria-live="polite">
        {children}
      </div>
    </div>
  )
}

const separator = <div className="my-2.5 h-px shrink-0 bg-border" aria-hidden="true" />

export function QuickAssistantTab({ copy, locale, tag, playing, active }: QuickAssistantTabProps) {
  const text = copy.quick
  const reduced = useReducedMotion()
  const input = useRef<HTMLInputElement>(null)
  const dialog = useRef<HTMLDivElement>(null)
  const reopen = useRef<HTMLButtonElement>(null)
  const [open, setOpen] = useState(true)
  const [route, setRoute] = useState<Route>('home')
  const [selected, setSelected] = useState(0)
  const [value, setValue] = useState('')
  const [clipboard, setClipboard] = useState(text.clipboard)
  const [pinned, setPinned] = useState(false)
  const [phase, setPhase] = useState<Phase>('done')
  const [run, setRun] = useState(0)
  const [asked, setAsked] = useState('')
  const [copied, setCopied] = useState(false)

  // Answer routes without an input keep focus on the window so Esc and C still reach it.
  const focusInput = () =>
    requestAnimationFrame(() => (input.current ?? dialog.current)?.focus({ preventScroll: true }))

  useEffect(() => {
    if (active && open) focusInput()
  }, [active])

  useEffect(() => {
    if (phase !== 'preparing' || !playing) return
    const timer = setTimeout(() => setPhase('streaming'), reduced ? 0 : 520)
    return () => clearTimeout(timer)
  }, [phase, playing, reduced])

  useEffect(() => {
    if (!copied) return
    const timer = setTimeout(() => setCopied(false), 1600)
    return () => clearTimeout(timer)
  }, [copied])

  const requestText = value || clipboard
  const loading = phase !== 'done'
  const answer =
    route === 'home'
      ? ''
      : asked
        ? text.customReply
        : route === 'translate'
          ? assistantsTranslation[locale].clipboard
          : text.answers[route]
  const answerTag = route === 'translate' && !asked ? (locale === 'en' ? 'zh-CN' : 'en-US') : tag

  const start = (feature: QuickFeatureId) => {
    if (!requestText) return
    setAsked(value)
    setRoute(feature)
    setRun((count) => count + 1)
    setPhase('preparing')
    focusInput()
  }

  const goHome = () => {
    setRoute('home')
    setValue('')
    setAsked('')
    setSelected(0)
    focusInput()
  }

  const close = () => {
    setOpen(false)
    requestAnimationFrame(() => reopen.current?.focus({ preventScroll: true }))
  }

  const handleEscape = () => {
    if (loading) setPhase('done')
    else if (route === 'home') close()
    else goHome()
  }

  const copyAnswer = () => {
    if (loading || !answer) return
    navigator.clipboard?.writeText(answer).then(
      () => setCopied(true),
      () => {}
    )
  }

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const inInput = event.target === input.current
    if (event.nativeEvent.isComposing) return
    if (event.key === 'Escape') handleEscape()
    else if (route === 'home' && event.key === 'ArrowDown') setSelected((index) => (index + 1) % FEATURES.length)
    else if (route === 'home' && event.key === 'ArrowUp')
      setSelected((index) => (index - 1 + FEATURES.length) % FEATURES.length)
    else if (inInput && event.key === 'Enter' && !loading) start(route === 'home' ? FEATURES[selected].id : 'chat')
    else if (inInput && event.key === 'Backspace' && !value && route === 'home') setClipboard('')
    else if (!inInput && event.key.toLowerCase() === 'c' && route !== 'home' && !event.metaKey && !event.ctrlKey)
      copyAnswer()
    else return
    event.preventDefault()
  }

  // The real toggle is CommandOrControl+E; it only reopens while focus is inside the demo.
  const onPanelKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!open && (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'e') {
      event.preventDefault()
      setOpen(true)
      focusInput()
    }
  }

  const clipboardPreview = clipboard && (
    <div className="mb-2.5 shrink-0 rounded-lg bg-muted p-3">
      <div className="flex items-center text-muted-foreground">
        <Copy className="size-3.5 shrink-0" aria-hidden="true" />
        <p className="mx-3 line-clamp-2 min-w-0 flex-1 text-xs">{clipboard}</p>
        <button
          type="button"
          onClick={() => {
            setClipboard('')
            focusInput()
          }}
          aria-label={text.clipboardClear}
          className="flex shrink-0 cursor-pointer items-center justify-center rounded p-1 transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-primary">
          <X className="size-3.5" aria-hidden="true" />
        </button>
      </div>
    </div>
  )

  const inputBar = (
    <div className="mt-2.5 flex shrink-0 items-center gap-2">
      <span className="flex size-[30px] shrink-0 items-center justify-center rounded-full bg-secondary ring-1 ring-border">
        <ProviderIcon id="anthropic" className="size-4" />
      </span>
      <input
        ref={input}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder={clipboard && route === 'home' ? text.placeholderTitle : text.placeholderEmpty}
        aria-label={text.window}
        className="min-w-0 flex-1 bg-transparent text-lg text-foreground outline-none placeholder:text-muted-foreground"
      />
    </div>
  )

  const answerView = (
    <AnswerScroller>
      {phase === 'preparing' ? (
        <Loader2 className="size-4 text-muted-foreground motion-safe:animate-spin" aria-hidden="true" />
      ) : (
        <StreamingText
          key={run}
          text={answer}
          locale={answerTag}
          active={phase === 'streaming' && playing}
          rate={44}
          onDone={() => setPhase('done')}
        />
      )}
    </AnswerScroller>
  )

  return (
    <div onKeyDown={onPanelKeyDown} className="relative flex h-full flex-col items-center gap-3 bg-grid px-3 pt-3 pb-3">
      <p className="flex min-h-6 max-w-full flex-wrap items-center justify-center gap-x-1.5 gap-y-1 text-center text-xs text-muted-foreground">
        <Zap className="size-3 text-primary" aria-hidden="true" />
        {text.shortcut}
        <span className="inline-flex gap-0.5">
          <Kbd>{isMac ? '⌘' : 'Ctrl'}</Kbd>
          <Kbd>E</Kbd>
        </span>
      </p>

      <AnimatePresence mode="wait" initial={false}>
        {open ? (
          <m.div
            key="window"
            ref={dialog}
            role="dialog"
            tabIndex={-1}
            aria-label={text.window}
            onKeyDown={onKeyDown}
            initial={{ opacity: 0, scale: 0.97, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, transition: { duration: 0.12 } }}
            transition={{ duration: 0.22, ease: ease.expo }}
            className="flex h-[340px] w-[min(560px,100%)] flex-col rounded-xl outline-none border border-border bg-popover px-2.5 py-2 shadow-(--shadow-float)">
            {route === 'home' && (
              <>
                {inputBar}
                {separator}
                {clipboardPreview}
                <div className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto">
                  {FEATURES.map(({ id, icon: Icon }, index) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => start(id)}
                      onMouseEnter={() => setSelected(index)}
                      className={cn(
                        'flex w-full shrink-0 cursor-pointer items-center gap-3 rounded-lg px-4 py-1.5 text-left transition-colors hover:bg-accent focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary',
                        index === selected && 'bg-accent'
                      )}>
                      <Icon className="size-4 shrink-0 text-foreground" aria-hidden="true" />
                      <span className="flex-1 truncate text-sm">{text.features[id]}</span>
                      {index === selected && (
                        <CornerDownLeft className="size-4 text-muted-foreground" aria-hidden="true" />
                      )}
                    </button>
                  ))}
                </div>
              </>
            )}
            {route === 'chat' && (
              <>
                {inputBar}
                {separator}
                {answerView}
              </>
            )}
            {(route === 'summary' || route === 'explanation') && (
              <>
                <div className="mt-2.5" />
                {clipboardPreview}
                {answerView}
              </>
            )}
            {route === 'translate' && (
              <div className="flex min-h-0 flex-1 flex-col p-3">
                <div className="mb-4 flex items-center gap-3 sm:gap-5" aria-hidden="true">
                  <span className="flex h-9 min-w-0 flex-1 items-center truncate rounded-md border border-input bg-muted px-3 text-sm text-muted-foreground/70">
                    {text.anyLanguage}
                  </span>
                  <ArrowLeftRight className="size-4 shrink-0 text-muted-foreground" />
                  <span className="flex h-9 min-w-0 flex-1 items-center gap-2 rounded-md border border-input px-3 text-sm">
                    <span>{text.target.emoji}</span>
                    <span className="flex-1 truncate">{text.target.label}</span>
                    <ChevronDown className="size-3.5 text-muted-foreground" />
                  </span>
                </div>
                {answerView}
              </div>
            )}
            {separator}
            <div className="flex shrink-0 items-center justify-between py-1 text-xs">
              <div className="flex min-w-0 items-center gap-1 overflow-hidden">
                <FooterAction onClick={handleEscape}>
                  {loading ? (
                    <Loader2 className="size-3 text-red-500 motion-safe:animate-spin" aria-hidden="true" />
                  ) : (
                    <CircleArrowLeft className="size-3.5 text-foreground" aria-hidden="true" />
                  )}
                  {loading ? text.footer.escPause : route === 'home' ? text.footer.escClose : text.footer.escBack}
                </FooterAction>
                {route === 'home' && !value && clipboard && (
                  <FooterAction
                    onClick={() => {
                      setClipboard('')
                      focusInput()
                    }}>
                    <ArrowLeft className="size-3.5" aria-hidden="true" />
                    {text.footer.backspace}
                  </FooterAction>
                )}
                {route !== 'home' && !loading && (
                  <FooterAction onClick={copyAnswer}>
                    <Copy className="size-3.5 text-foreground" aria-hidden="true" />
                    <span aria-live="polite">{copied ? text.footer.copied : text.footer.copy}</span>
                  </FooterAction>
                )}
              </div>
              <button
                type="button"
                onClick={() => setPinned((state) => !state)}
                aria-pressed={pinned}
                aria-label={text.pin}
                title={text.pin}
                className="mr-1 flex size-6 shrink-0 cursor-pointer items-center justify-center rounded focus-visible:outline-2 focus-visible:outline-primary">
                <Pin
                  className={cn(
                    'size-3.5 transition-transform',
                    pinned ? 'rotate-[40deg] text-primary' : 'text-foreground'
                  )}
                  aria-hidden="true"
                />
              </button>
            </div>
          </m.div>
        ) : (
          <m.div
            key="closed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-1 items-center">
            <button
              ref={reopen}
              type="button"
              onClick={() => {
                setOpen(true)
                focusInput()
              }}
              className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-border bg-popover px-4 py-2 text-sm shadow-(--shadow-float) transition-colors hover:border-hairline-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
              {text.window}
              <span className="inline-flex gap-0.5" aria-hidden="true">
                <Kbd>{isMac ? '⌘' : 'Ctrl'}</Kbd>
                <Kbd>E</Kbd>
              </span>
            </button>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  )
}
