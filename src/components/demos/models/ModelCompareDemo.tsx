import { AnimatePresence, m } from 'framer-motion'
import { Columns2, Expand, Folder, Grid2X2, Rows3, Settings, Shrink, Trash2 } from 'lucide-react'
import { type ReactNode, useEffect, useRef, useState } from 'react'

import { type CompareAnswer, type GroupLayout, modelCompareDemo } from '@/content/demos/models'
import { ease, spring } from '@/lib/motion'
import { cn } from '@/lib/utils'
import AppShell, { tabTitle } from '../primitives/AppShell'
import BeatDots from '../primitives/BeatDots'
import DemoFrame from '../primitives/DemoFrame'
import StreamingText from '../primitives/StreamingText'
import { useDemoLocale } from '../primitives/useDemoLocale'
import { useDemoPlayback, useDemoScript } from '../primitives/useDemoScript'
import ModelLogo from './ModelLogo'

// Same order and icons as desktop MessageGroupMenuBar.
const LAYOUTS: { id: GroupLayout; Icon: typeof Folder }[] = [
  { id: 'fold', Icon: Folder },
  { id: 'vertical', Icon: Rows3 },
  { id: 'horizontal', Icon: Columns2 },
  { id: 'grid', Icon: Grid2X2 }
]

// Desktop MessageGroup GridContainer, except horizontal columns shrink to 260px (420px in the app) so all three
// answers sit side by side in the demo window; grid is always two columns.
const containerClass: Record<GroupLayout, string> = {
  fold: 'grid-cols-1 gap-2',
  vertical: 'grid-cols-1 gap-4',
  horizontal: 'grid-cols-[repeat(3,minmax(260px,1fr))] gap-4 overflow-x-auto pb-1 [scrollbar-width:thin]',
  grid: 'grid-cols-2 gap-4'
}

interface DemoState {
  sent: boolean
  started: string[]
  done: string[]
}

const INITIAL: DemoState = { sent: false, started: [], done: [] }

const wideScreen = () => typeof window !== 'undefined' && window.matchMedia('(min-width: 768px)').matches

export default function ModelCompareDemo() {
  const { locale, tag } = useDemoLocale()
  const copy = modelCompareDemo[locale]
  const ref = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const groupRef = useRef<HTMLDivElement>(null)
  const playing = useDemoPlayback(ref)
  const touched = useRef(false)
  const [state, setState] = useState<DemoState>(INITIAL)
  // Desktop default for chat.message.multi_model.style.
  const [layout, setLayout] = useState<GroupLayout>('horizontal')
  const [compactTabs, setCompactTabs] = useState(false)
  const [selected, setSelected] = useState(copy.models[0].id)
  const [detail, setDetail] = useState<string | null>(null)
  const models = copy.models

  const { replay, reduced } = useDemoScript(async ({ wait, reduced }) => {
    touched.current = false
    setDetail(null)
    setCompactTabs(false)
    setSelected(models[0].id)
    setLayout(wideScreen() ? 'horizontal' : 'vertical')
    if (reduced) {
      setState({ sent: true, started: models.map((model) => model.id), done: [] })
      return
    }
    setState(INITIAL)
    await wait(600)
    setState((previous) => ({ ...previous, sent: true }))
    await wait(450)
    // Requests leave together; each model's first token lands after its own latency.
    let elapsed = 0
    for (const model of [...models].sort((a, b) => a.latency - b.latency)) {
      await wait(model.latency - elapsed)
      elapsed = model.latency
      setState((previous) => ({ ...previous, started: [...previous.started, model.id] }))
    }
  }, playing)

  const finish = (id: string) => setState((previous) => ({ ...previous, done: [...new Set([...previous.done, id])] }))

  // The group menu bar sits under the answers like desktop, so keep it in view as content grows;
  // 300px grid cards would push their tops out of view, so grid scrolls to the group instead.
  useEffect(() => {
    const scroller = scrollRef.current
    if (!scroller) return
    const frame = requestAnimationFrame(() =>
      scroller.scrollTo({
        top: layout === 'grid' ? (groupRef.current?.offsetTop ?? 0) - 16 : scroller.scrollHeight,
        behavior: reduced ? 'auto' : 'smooth'
      })
    )
    return () => cancelAnimationFrame(frame)
  }, [state, layout, selected, reduced])

  const chooseLayout = (next: GroupLayout) => {
    touched.current = true
    setDetail(null)
    setLayout(next)
  }

  const isGrid = layout === 'grid'
  const detailModel = models.find((model) => model.id === detail)
  // Fold hides answers with display:none, so projecting them would animate from an empty box.
  const projected = layout !== 'fold'

  // The popover copy shows the whole answer at once instead of streaming a second time.
  const renderBody = (model: CompareAnswer, whole = false) => {
    const started = state.started.includes(model.id)
    const done = state.done.includes(model.id)
    return (
      <MessageItem
        copy={copy}
        model={model}
        showModel={layout !== 'fold'}
        footer={done && `${copy.tokens(model.tokens)} · ${copy.tokensPerSecond(model.tokensPerSecond)}`}>
        {started && whole ? (
          <span className="whitespace-pre-wrap">{model.answer}</span>
        ) : started ? (
          <span className="whitespace-pre-wrap">
            <StreamingText
              key={`${locale}-${model.id}`}
              text={model.answer}
              locale={tag}
              active={playing}
              rate={model.rate}
              onDone={() => finish(model.id)}
            />
          </span>
        ) : (
          <span className="inline-flex min-h-7 items-center gap-1.5 text-[13px] leading-5 text-muted-foreground">
            {copy.preparing}
            <BeatDots />
          </span>
        )}
      </MessageItem>
    )
  }

  return (
    <div ref={ref} role="region" aria-label={copy.window} className="@container">
      <DemoFrame chromeless title={copy.window} onReplay={replay} bodyClassName="h-[clamp(480px,62.5cqw,700px)]">
        <AppShell active="assistants" tab={{ title: tabTitle(copy.window), emoji: '😀' }}>
          <div className="@container relative flex h-full flex-col">
            <div
              ref={scrollRef}
              className="relative min-h-0 flex-1 overflow-y-auto px-4 [scrollbar-width:none] sm:px-6">
              <div className="py-4">
                {state.sent && (
                  <m.div
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={spring.block}
                    className="mb-4 flex justify-end">
                    {/* Desktop MessageContent lists mentioned models as plain @names above the text. */}
                    <div className="max-w-[85%] rounded-[10px] bg-chat-user px-4 py-2.5 text-[14px] leading-6">
                      <div className="mb-2.5 flex flex-wrap gap-2" aria-hidden="true">
                        {models.map((model) => (
                          <span key={model.id} className="text-primary">
                            @{model.name}
                          </span>
                        ))}
                      </div>
                      {copy.prompt}
                    </div>
                  </m.div>
                )}

                {state.sent && (
                  <div ref={groupRef} className={isGrid || layout === 'horizontal' ? 'py-1' : undefined}>
                    <div className={cn('grid w-full', containerClass[layout])}>
                      {models.map((model) => {
                        const hidden = layout === 'fold' && model.id !== selected
                        return (
                          <m.div
                            key={model.id}
                            layout={projected && 'position'}
                            transition={spring.settle}
                            className={cn(
                              'relative min-w-0',
                              hidden && 'hidden',
                              layout === 'horizontal' && 'rounded-[10px] border-[0.5px] border-border p-2.5',
                              isGrid &&
                                'h-[300px] cursor-pointer overflow-hidden rounded-[10px] border-[0.5px] border-border p-2.5'
                            )}>
                            {renderBody(model)}
                            {isGrid && (
                              <button
                                type="button"
                                aria-haspopup="dialog"
                                aria-expanded={detail === model.id}
                                aria-label={`${copy.expand} ${model.name}`}
                                onClick={() => {
                                  touched.current = true
                                  setDetail(detail === model.id ? null : model.id)
                                }}
                                className="absolute inset-0 cursor-pointer rounded-[10px] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary"
                              />
                            )}
                          </m.div>
                        )
                      })}
                    </div>

                    <GroupMenuBar
                      copy={copy}
                      layout={layout}
                      onLayout={chooseLayout}
                      compactTabs={compactTabs}
                      onCompactTabs={() => {
                        touched.current = true
                        setCompactTabs((value) => !value)
                      }}
                      models={models}
                      selected={selected}
                      processing={(id) => state.started.includes(id) && !state.done.includes(id)}
                      onSelect={(id) => {
                        touched.current = true
                        setSelected(id)
                      }}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Desktop GridMessagePopover: the full answer opens in a popover above the clicked card. */}
            <AnimatePresence>
              {isGrid && detailModel && (
                <m.div
                  key={detailModel.id}
                  role="dialog"
                  aria-label={detailModel.name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.12 } }}
                  transition={{ duration: 0.15, ease: ease.expo }}
                  onKeyDown={(event) => event.key === 'Escape' && setDetail(null)}
                  className="absolute inset-x-4 top-4 z-10 max-h-[60%] overflow-y-auto rounded-lg border-[0.5px] border-border bg-popover p-4 shadow-lg sm:inset-x-16">
                  {renderBody(detailModel, true)}
                  <button
                    type="button"
                    aria-label={`${copy.collapse} ${detailModel.name}`}
                    onClick={() => setDetail(null)}
                    className="sr-only focus-visible:not-sr-only focus-visible:absolute focus-visible:top-2 focus-visible:right-2 focus-visible:rounded-md focus-visible:bg-accent focus-visible:px-2 focus-visible:py-1 focus-visible:text-xs">
                    {copy.collapse} {detailModel.name}
                  </button>
                </m.div>
              )}
            </AnimatePresence>
          </div>
        </AppShell>
      </DemoFrame>
    </div>
  )
}

// Desktop MessageHeader with its body slot: assistant avatar and name, the model identity, content, then tokens.
function MessageItem({
  copy,
  model,
  showModel,
  footer,
  children
}: {
  copy: (typeof modelCompareDemo)['en']
  model: CompareAnswer
  showModel: boolean
  footer: string | false
  children: ReactNode
}) {
  return (
    <div className="flex h-full items-start gap-2.5">
      <span
        aria-hidden="true"
        className="flex size-[30px] shrink-0 items-center justify-center overflow-hidden rounded-full text-[24px] leading-none">
        😀
      </span>
      <div className="flex h-full min-w-0 flex-1 flex-col">
        <div className="flex w-full min-w-0 items-center gap-1.5">
          <span className="truncate text-sm leading-5 font-semibold">{copy.assistant}</span>
          {showModel && (
            <span className="flex min-w-0 shrink items-center gap-1 text-xs leading-5 text-muted-foreground">
              <ModelLogo name={model.name} provider={model.provider} className="size-4" />
              <span className="truncate">{model.name}</span>
            </span>
          )}
        </div>
        <div className="mt-2 min-h-0 flex-1 overflow-hidden text-[14px] leading-6 text-foreground">{children}</div>
        <div className="mt-1 flex min-h-6.5 shrink-0 items-center justify-end text-xs leading-5 text-muted-foreground tabular-nums">
          {footer}
        </div>
      </div>
    </div>
  )
}

interface GroupMenuBarProps {
  copy: (typeof modelCompareDemo)['en']
  layout: GroupLayout
  onLayout: (layout: GroupLayout) => void
  compactTabs: boolean
  onCompactTabs: () => void
  models: CompareAnswer[]
  selected: string
  processing: (id: string) => boolean
  onSelect: (id: string) => void
}

// Desktop MessageGroupMenuBar: layout switcher, fold tabs or grid settings, then group actions on the right.
function GroupMenuBar({
  copy,
  layout,
  onLayout,
  compactTabs,
  onCompactTabs,
  models,
  selected,
  processing,
  onSelect
}: GroupMenuBarProps) {
  const foldToggle = compactTabs ? copy.foldExpand : copy.foldCompress
  return (
    <div className="mt-2 flex h-9 items-center justify-between gap-1 overflow-hidden rounded-[10px] border-[0.5px] border-border px-1.5 py-5">
      <div className="flex min-w-0 flex-1 items-center gap-1 overflow-hidden">
        <div className="flex shrink-0 items-center gap-0.5">
          {LAYOUTS.map(({ id, Icon }) => (
            <button
              key={id}
              type="button"
              aria-pressed={layout === id}
              aria-label={`${copy.groupStyle}: ${copy.layouts[id]}`}
              title={`${copy.groupStyle}: ${copy.layouts[id]}`}
              onClick={() => onLayout(id)}
              className={cn(
                'flex size-7 cursor-pointer items-center justify-center rounded-md focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary',
                layout === id
                  ? 'bg-muted text-foreground'
                  : 'text-muted-foreground hover:bg-accent hover:text-foreground'
              )}>
              <Icon className="size-3.5" aria-hidden="true" />
            </button>
          ))}
        </div>
        {layout === 'fold' && (
          <>
            <div className="ml-1 flex min-w-0 flex-1 overflow-x-auto px-1 [scrollbar-width:none]">
              <div
                role="radiogroup"
                aria-label={copy.layouts.fold}
                className="inline-flex shrink-0 items-center rounded-full border border-border/60 bg-muted/60 p-0.5">
                {models.map((model) => {
                  const active = model.id === selected
                  const showName = !compactTabs || active
                  return (
                    <button
                      key={model.id}
                      type="button"
                      role="radio"
                      aria-checked={active}
                      aria-label={model.name}
                      title={showName ? undefined : model.name}
                      onClick={() => onSelect(model.id)}
                      className={cn(
                        'inline-flex h-6.5 shrink-0 cursor-pointer items-center gap-1 rounded-full px-2 text-xs font-medium whitespace-nowrap transition-[background-color,color,box-shadow] focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary',
                        active
                          ? 'bg-background text-foreground shadow-xs'
                          : 'text-muted-foreground hover:text-foreground'
                      )}>
                      <span className="flex items-center gap-[5px] py-0.5">
                        <ModelLogo
                          name={model.name}
                          provider={model.provider}
                          className={cn('size-5', processing(model.id) && 'motion-safe:animate-pulse')}
                        />
                        {showName && <span>{model.name}</span>}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
            <button
              type="button"
              aria-label={foldToggle}
              title={foldToggle}
              onClick={onCompactTabs}
              className="flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary">
              {compactTabs ? (
                <Expand className="size-3.5" aria-hidden="true" />
              ) : (
                <Shrink className="size-3.5" aria-hidden="true" />
              )}
            </button>
          </>
        )}
        {layout === 'grid' && <Settings className="ml-1.5 size-4 shrink-0 text-foreground" aria-hidden="true" />}
      </div>
      <span aria-hidden="true" className="flex size-7 shrink-0 items-center justify-center">
        <Trash2 className="size-3.5 text-destructive" />
      </span>
    </div>
  )
}
