import { m } from 'framer-motion'
import { AtSign, Columns2, Folder, Grid2X2, Rows3 } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import { type GroupLayout, modelCompareDemo } from '@/content/demos/models'
import { spring } from '@/lib/motion'
import { cn } from '@/lib/utils'
import BeatDots from '../primitives/BeatDots'
import DemoFrame from '../primitives/DemoFrame'
import ProviderIcon from '../primitives/ProviderIcon'
import StreamingText from '../primitives/StreamingText'
import { useDemoLocale } from '../primitives/useDemoLocale'
import { useDemoPlayback, useDemoScript } from '../primitives/useDemoScript'

// Same order and icons as desktop MessageGroupMenuBar.
const LAYOUTS: { id: GroupLayout; Icon: typeof Folder }[] = [
  { id: 'fold', Icon: Folder },
  { id: 'vertical', Icon: Rows3 },
  { id: 'horizontal', Icon: Columns2 },
  { id: 'grid', Icon: Grid2X2 }
]

const containerClass: Record<GroupLayout, string> = {
  fold: 'grid-cols-1 gap-2',
  vertical: 'grid-cols-1 gap-4',
  horizontal: 'grid-cols-[repeat(3,minmax(300px,1fr))] gap-4 overflow-x-auto pb-1 [scrollbar-width:thin]',
  grid: 'grid-cols-1 gap-3 @lg:grid-cols-2 @lg:gap-4'
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
  const playing = useDemoPlayback(ref)
  const touched = useRef(false)
  const justFocused = useRef(false)
  const [state, setState] = useState<DemoState>(INITIAL)
  const [layout, setLayout] = useState<GroupLayout>('horizontal')
  const [selected, setSelected] = useState(copy.models[0].id)
  const [expanded, setExpanded] = useState<string | null>(null)
  const models = copy.models
  const allDone = state.done.length === models.length

  const { replay, reduced } = useDemoScript(async ({ wait, reduced }) => {
    touched.current = false
    setExpanded(null)
    setSelected(models[0].id)
    if (reduced) {
      setLayout(wideScreen() ? 'horizontal' : 'vertical')
      setState({ sent: true, started: models.map((model) => model.id), done: [] })
      return
    }
    setLayout(wideScreen() ? 'horizontal' : 'vertical')
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

  // Once every answer has landed, show the grid overview unless the visitor already took over.
  useEffect(() => {
    if (!allDone || reduced) return
    const timer = setTimeout(() => {
      if (!touched.current && wideScreen()) setLayout('grid')
    }, 1500)
    return () => clearTimeout(timer)
  }, [allDone, reduced])

  const chooseLayout = (next: GroupLayout) => {
    touched.current = true
    setExpanded(null)
    setLayout(next)
  }

  const isGrid = layout === 'grid'
  // Fold hides answers with display:none, so projecting them would animate from an empty box.
  const projected = layout !== 'fold'

  return (
    <div ref={ref} role="region" aria-label={copy.window}>
      <DemoFrame title={copy.window} onReplay={replay} bodyClassName="h-[420px]">
        <div className="@container flex h-full flex-col">
          <div className="min-h-0 flex-1 overflow-y-auto px-4 [scrollbar-width:none] sm:px-6">
            <div className="space-y-4 py-4">
              {state.sent && (
                <m.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={spring.block}
                  className="flex justify-end">
                  <div className="max-w-[85%] rounded-[10px] bg-chat-user px-4 py-2.5 text-[14px] leading-6">
                    <div className="mb-1 flex flex-wrap gap-1" aria-hidden="true">
                      {models.map((model) => (
                        <span
                          key={model.id}
                          className="inline-flex items-center gap-0.5 rounded-md bg-primary/12 px-1.5 text-xs font-medium text-primary">
                          <AtSign className="size-3" />
                          {model.name}
                        </span>
                      ))}
                    </div>
                    {copy.prompt}
                  </div>
                </m.div>
              )}

              {state.sent && (
                <div className={cn('grid w-full', containerClass[layout])}>
                  {models.map((model) => {
                    const started = state.started.includes(model.id)
                    const done = state.done.includes(model.id)
                    const hidden = layout === 'fold' && model.id !== selected
                    const open = isGrid && expanded === model.id
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
                            'overflow-hidden rounded-[10px] border-[0.5px] border-border bg-background/30 p-2.5 transition-colors hover:border-hairline-strong',
                          isGrid && (open ? 'h-auto @lg:col-span-2' : 'h-[136px]')
                        )}>
                        {layout !== 'fold' && (
                          <div className="mb-2 flex items-center gap-2 text-xs">
                            <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-secondary ring-1 ring-border">
                              <ProviderIcon id={model.provider} className="size-3.5" />
                            </span>
                            <span className="truncate font-medium">{model.name}</span>
                          </div>
                        )}
                        <div
                          className={cn(
                            'text-[13.5px] leading-[22px] text-foreground/90',
                            isGrid &&
                              !open &&
                              'h-[66px] overflow-hidden [mask-image:linear-gradient(to_bottom,black_55%,transparent)]'
                          )}>
                          {started ? (
                            <StreamingText
                              key={`${locale}-${model.id}`}
                              text={model.answer}
                              locale={tag}
                              active={playing}
                              rate={model.rate}
                              onDone={() => finish(model.id)}
                            />
                          ) : (
                            <span className="inline-flex items-center gap-2 text-[13px] text-muted-foreground">
                              {copy.waiting}
                              <BeatDots />
                            </span>
                          )}
                        </div>
                        <div className="mt-2 flex flex-wrap items-center gap-x-3 font-mono text-[10.5px] text-muted-foreground tabular-nums">
                          <span>
                            {copy.firstToken} {started ? `${model.latency} ms` : '—'}
                          </span>
                          <span>
                            {done ? model.tokensPerSecond : '—'} {copy.tokensPerSecond}
                          </span>
                        </div>
                        {isGrid && (
                          <button
                            type="button"
                            aria-expanded={open}
                            aria-label={`${open ? copy.collapse : copy.expand} ${model.name}`}
                            onFocus={() => {
                              justFocused.current = expanded !== model.id
                              setExpanded(model.id)
                            }}
                            onClick={() => {
                              if (justFocused.current) justFocused.current = false
                              else setExpanded(open ? null : model.id)
                            }}
                            onKeyDown={(event) => event.key === 'Escape' && setExpanded(null)}
                            className="absolute inset-0 cursor-pointer rounded-[10px] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary"
                          />
                        )}
                      </m.div>
                    )
                  })}
                </div>
              )}
            </div>
          </div>

          <div className="shrink-0 px-4 pb-3 sm:px-6">
            <div className="flex h-10 items-center justify-between gap-1 overflow-hidden rounded-[10px] border-[0.5px] border-border px-1.5">
              <div className="flex min-w-0 flex-1 items-center gap-1 overflow-hidden">
                <div className="flex shrink-0 items-center gap-0.5">
                  {LAYOUTS.map(({ id, Icon }) => (
                    <button
                      key={id}
                      type="button"
                      aria-pressed={layout === id}
                      aria-label={`${copy.groupStyle}: ${copy.layouts[id]}`}
                      title={`${copy.groupStyle}: ${copy.layouts[id]}`}
                      onClick={() => chooseLayout(id)}
                      className={cn(
                        'flex size-7 cursor-pointer items-center justify-center rounded-md transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary',
                        layout === id
                          ? 'bg-muted text-foreground'
                          : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                      )}>
                      <Icon className="size-3.5" aria-hidden="true" />
                    </button>
                  ))}
                </div>
                {layout === 'fold' && (
                  <div className="ml-1 flex min-w-0 flex-1 overflow-x-auto px-1 [scrollbar-width:none]">
                    <div className="inline-flex shrink-0 items-center gap-0.5 rounded-lg bg-muted p-0.5">
                      {models.map((model) => {
                        const active = model.id === selected
                        const processing = state.started.includes(model.id) && !state.done.includes(model.id)
                        return (
                          <button
                            key={model.id}
                            type="button"
                            aria-pressed={active}
                            aria-label={model.name}
                            onClick={() => {
                              touched.current = true
                              setSelected(model.id)
                            }}
                            className={cn(
                              'flex h-6.5 cursor-pointer items-center gap-[5px] rounded-md px-2 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary',
                              active
                                ? 'bg-background text-foreground shadow-sm'
                                : 'text-muted-foreground hover:text-foreground'
                            )}>
                            <span
                              className={cn(
                                'flex size-5 shrink-0 items-center justify-center rounded-full bg-secondary ring-1 ring-border',
                                processing && 'motion-safe:animate-pulse'
                              )}>
                              <ProviderIcon id={model.provider} className="size-3" />
                            </span>
                            <span
                              className={cn('text-xs font-medium whitespace-nowrap', !active && 'hidden sm:inline')}>
                              {model.name}
                            </span>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>
              <span
                aria-live="polite"
                className="hidden shrink-0 px-1.5 font-mono text-[10.5px] text-muted-foreground tabular-nums sm:inline">
                {state.sent && !allDone
                  ? `${copy.streaming} ${state.done.length}/${models.length}`
                  : state.sent
                    ? `${models.length} ${copy.answers}`
                    : ''}
              </span>
            </div>
          </div>
        </div>
      </DemoFrame>
    </div>
  )
}
