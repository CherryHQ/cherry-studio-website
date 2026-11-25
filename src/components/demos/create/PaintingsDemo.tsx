import { AnimatePresence, m } from 'framer-motion'
import {
  ArrowUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Minus,
  Palette,
  Plus,
  RotateCcwSquare,
  RotateCwSquare,
  Settings2,
  Square,
  ZoomIn,
  ZoomOut
} from 'lucide-react'
import { type CSSProperties, type KeyboardEvent, useEffect, useRef, useState } from 'react'

import circularCutout from '@/assets/images/paintings/circular-cutout.webp'
import lightTrails from '@/assets/images/paintings/light-trails.webp'
import tennisCollage from '@/assets/images/paintings/tennis-collage.webp'
import trainWindow from '@/assets/images/paintings/train-window.webp'
import y2kStreet from '@/assets/images/paintings/y2k-street.webp'
import { type PaintingTemplateId, paintingsDemo } from '@/content/demos/create'
import { ease } from '@/lib/motion'
import { cn } from '@/lib/utils'
import DemoFrame from '../primitives/DemoFrame'
import ProviderIcon from '../primitives/ProviderIcon'
import { useDemoLocale } from '../primitives/useDemoLocale'
import { useDemoPlayback, useDemoScript } from '../primitives/useDemoScript'
import { PaintingSkeleton } from './PaintingSkeleton'

const IMAGES: Record<PaintingTemplateId, { src: string; ratio: number }> = {
  'tennis-collage': { src: tennisCollage, ratio: 640 / 640 },
  'train-window': { src: trainWindow, ratio: 640 / 800 },
  'light-trails': { src: lightTrails, ratio: 640 / 800 },
  'circular-cutout': { src: circularCutout, ratio: 640 / 854 },
  'y2k-street': { src: y2kStreet, ratio: 640 / 800 }
}

// Fan slots from desktop PaintingTemplateShowcase: offsets in container units, -7/-3/0/3/7deg, .82/.92/1.12 scale.
const FAN = [
  { x: 'calc(-50% - 23cqw)', y: 8, rotation: -7, scale: 0.82, className: 'z-10 opacity-70' },
  { x: 'calc(-50% - 11.5cqw)', y: 3, rotation: -3, scale: 0.92, className: 'z-20 opacity-90' },
  { x: '-50%', y: -2, rotation: 0, scale: 1.12, className: 'z-40 opacity-100' },
  { x: 'calc(-50% + 11.5cqw)', y: 3, rotation: 3, scale: 0.92, className: 'z-20 opacity-90' },
  { x: 'calc(-50% + 23cqw)', y: 8, rotation: 7, scale: 0.82, className: 'z-10 opacity-70' }
] as const
const FAN_TRANSITION = 'duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]'

// Real image-generation entries from the desktop provider registry (sizes and image-count ranges).
const MODELS = [
  {
    id: 'gpt-image-1.5',
    name: 'GPT Image 1.5',
    provider: 'openai',
    sizes: ['auto', '1024x1024', '1536x1024', '1024x1536'],
    defaultSize: '1024x1024',
    maxImages: 10
  },
  {
    id: 'doubao-seedream-4-5',
    name: 'Seedream 4.5',
    provider: 'volcengine',
    sizes: ['1K', '2K', '4K'],
    defaultSize: '2K',
    maxImages: 0
  },
  {
    id: 'qwen-image',
    name: 'Qwen Image',
    provider: 'qwen',
    sizes: ['1328x1328', '1140x1472', '928x1664', '1472x1140', '1664x928'],
    defaultSize: '1328x1328',
    maxImages: 4
  }
] as const

type Model = (typeof MODELS)[number]
type Stage = 'templates' | 'loading' | 'revealing' | 'done'

interface Painting {
  id: number
  template: number
  model: Model
  size: string
  count: number
  prompt: string
}

interface State {
  stage: Stage
  active: number
  selected: boolean
  prompt: string
  model: Model
  size: string
  count: number
  history: Painting[]
  current: Painting | null
}

const GENERATE_MS = 2600
const INITIAL_TEMPLATE = 1

let nextPaintingId = 1

const parseSize = (size: string) => {
  const match = size.match(/^(\d+)x(\d+)$/)
  return match ? { label: `${match[1]}×${match[2]}`, ratio: Number(match[1]) / Number(match[2]) } : null
}

export default function PaintingsDemo() {
  const { locale } = useDemoLocale()
  const copy = paintingsDemo[locale]
  const ref = useRef<HTMLDivElement>(null)
  const composerRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([])
  const touched = useRef(false)
  const playing = useDemoPlayback(ref)
  const [menu, setMenu] = useState<'model' | 'params' | null>(null)
  const [hovered, setHovered] = useState<number | null>(null)
  const templates = copy.templates

  const initial: State = {
    stage: 'templates',
    active: INITIAL_TEMPLATE,
    selected: false,
    prompt: '',
    model: MODELS[0],
    size: MODELS[0].defaultSize,
    count: 1,
    history: [],
    current: null
  }
  const [state, setState] = useState<State>(initial)

  const select = (previous: State, index: number): State => ({
    ...previous,
    active: index,
    selected: true,
    prompt: templates[index].prompt
  })
  const start = (previous: State): State => {
    if (!previous.prompt.trim()) return previous
    const painting: Painting = {
      id: nextPaintingId++,
      template: previous.active,
      model: previous.model,
      size: previous.size,
      count: previous.count,
      prompt: previous.prompt.trim()
    }
    return { ...previous, stage: 'loading', current: painting, history: [painting, ...previous.history].slice(0, 6) }
  }

  const { reduced, replay } = useDemoScript(async ({ wait, reduced }) => {
    touched.current = false
    setMenu(null)
    if (reduced) {
      setState({ ...start(select(initial, 0)), stage: 'done' })
      return
    }
    setState(initial)
    await wait(1200)
    if (touched.current) return
    setState((previous) => select(previous, 0))
    await wait(1700)
    if (touched.current) return
    setState(start)
  }, playing)

  const act = (update: (previous: State) => State) => {
    touched.current = true
    setState(update)
  }

  useEffect(() => {
    if (state.stage !== 'loading' || !playing) return
    const timer = setTimeout(
      () => setState((previous) => (previous.stage === 'loading' ? { ...previous, stage: 'revealing' } : previous)),
      reduced ? 600 : GENERATE_MS
    )
    return () => clearTimeout(timer)
  }, [state.stage, state.current?.id, playing, reduced])

  useEffect(() => {
    if (!menu) return
    const close = (event: PointerEvent) => {
      if (!composerRef.current?.contains(event.target as Node)) setMenu(null)
    }
    document.addEventListener('pointerdown', close)
    return () => document.removeEventListener('pointerdown', close)
  }, [menu])

  const { stage, current } = state
  const busy = stage === 'loading' || stage === 'revealing'
  const sizeLabel = (size: string) => parseSize(size)?.label ?? (size === 'auto' ? copy.sizeAuto : size)
  const summary = [sizeLabel(state.size), state.model.maxImages ? String(state.count) : null]
    .filter(Boolean)
    .join(' · ')

  const rotate = (delta: number, focusCard = false) => {
    const next = (state.active + delta + templates.length) % templates.length
    act((previous) => select(previous, next))
    if (focusCard) cardRefs.current[next]?.focus()
  }
  const onFanKey = (event: KeyboardEvent, focusCard: boolean) => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return
    event.preventDefault()
    rotate(event.key === 'ArrowLeft' ? -1 : 1, focusCard)
  }

  const generate = () => {
    setMenu(null)
    act(
      busy
        ? (previous) => ({ ...previous, stage: 'templates', current: null, history: previous.history.slice(1) })
        : start
    )
  }

  const middle = Math.floor(templates.length / 2)
  const slotOf = (index: number) => ((index - state.active + middle + templates.length) % templates.length) - middle + 2
  const labelIndex = hovered ?? (state.selected ? state.active : null)
  const labelSlot = labelIndex === null ? null : FAN[slotOf(labelIndex)]

  const templateStage = (
    <section className="[container-type:size] flex min-h-0 flex-1 flex-col items-center justify-center px-3 pt-5 pb-1">
      <div className="flex h-full max-h-80 min-h-0 w-full flex-col items-center">
        <p className="max-w-xl shrink-0 text-center text-[clamp(17px,4cqw,26px)] leading-[1.1] font-bold tracking-tight text-balance">
          {copy.title}
        </p>
        {/* Desktop card sizes; narrow containers get larger cards so the fan stays legible on phones. */}
        <div className="[container-type:size] relative mt-[clamp(12px,6cqh,30px)] max-h-[220px] min-h-0 w-full flex-1 [--card-h:clamp(44px,min(18cqw,66cqh),148px)] [--card-w:clamp(36px,min(14cqw,53cqh),118px)] @max-md:[--card-h:clamp(44px,min(30cqw,66cqh),148px)] @max-md:[--card-w:clamp(36px,min(23cqw,53cqh),118px)]">
          <div role="group" aria-label={copy.stylesLabel} className="absolute inset-0 overflow-hidden">
            {templates.map((template, index) => {
              const slot = FAN[slotOf(index)]
              const selected = state.selected && index === state.active
              return (
                <button
                  key={template.id}
                  ref={(element) => {
                    cardRefs.current[index] = element
                  }}
                  type="button"
                  aria-pressed={selected}
                  aria-label={template.label}
                  onClick={() => act((previous) => select(previous, index))}
                  onKeyDown={(event) => onFanKey(event, true)}
                  onPointerEnter={() => setHovered(index)}
                  onPointerLeave={() => setHovered(null)}
                  onFocus={() => setHovered(index)}
                  onBlur={() => setHovered(null)}
                  className={cn(
                    'absolute top-1/2 left-1/2 h-(--card-h) w-(--card-w) cursor-pointer rounded-xl transition-[transform,opacity,box-shadow] will-change-transform hover:z-50 hover:shadow-lg focus-visible:z-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none',
                    FAN_TRANSITION,
                    slot.className,
                    selected && 'shadow-md'
                  )}
                  style={{
                    transform: `translate(${slot.x}, calc(-50% + ${slot.y}px)) rotate(${slot.rotation}deg) scale(${slot.scale})`
                  }}>
                  <span className="pointer-events-none block size-full overflow-hidden rounded-xl bg-card ring-1 ring-border">
                    <img src={IMAGES[template.id].src} alt="" draggable={false} className="size-full object-cover" />
                  </span>
                </button>
              )
            })}
          </div>
          {labelIndex !== null && labelSlot && (
            <span
              aria-hidden="true"
              className={cn(
                'pointer-events-none absolute left-1/2 z-50 rounded-md bg-foreground px-2 py-1 text-xs font-medium whitespace-nowrap text-background shadow-md transition-[transform,top] motion-reduce:transition-none',
                FAN_TRANSITION
              )}
              style={{
                top: `calc(50% + ${labelSlot.y}px - var(--card-h) * ${labelSlot.scale / 2} - 8px)`,
                transform: `translate(${labelSlot.x}, -100%)`
              }}>
              {templates[labelIndex].label}
            </span>
          )}
          {([-1, 1] as const).map((delta) => {
            const Icon = delta < 0 ? ChevronLeft : ChevronRight
            return (
              <button
                key={delta}
                type="button"
                aria-label={delta < 0 ? copy.previous : copy.next}
                onClick={() => rotate(delta)}
                onKeyDown={(event) => onFanKey(event, false)}
                className={cn(
                  'absolute top-1/2 z-50 flex size-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-border bg-background/80 text-muted-foreground shadow-sm backdrop-blur-xl transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
                  delta < 0
                    ? 'left-[max(4px,calc(50%-23cqw-var(--card-w)*0.41-48px))]'
                    : 'right-[max(4px,calc(50%-23cqw-var(--card-w)*0.41-48px))]'
                )}>
                <Icon className="size-4" aria-hidden="true" />
              </button>
            )
          })}
        </div>
        <p className="mt-[clamp(6px,3cqh,12px)] max-w-lg shrink-0 px-4 text-center text-xs leading-5 text-muted-foreground">
          {copy.caption}
        </p>
      </div>
    </section>
  )

  const image = current ? IMAGES[templates[current.template].id] : null
  const declaredRatio = current ? parseSize(current.size)?.ratio : undefined
  // Like the desktop skeleton: sized to the requested ratio while drawing, relocked to the real image once it arrives.
  const boxRatio = image ? (stage === 'loading' && declaredRatio ? declaredRatio : image.ratio) : 1

  const artboard = current && image && (
    <div className="flex min-h-0 flex-1 flex-col p-3 sm:p-4">
      <div
        className="[container-type:size] relative flex min-h-0 flex-1 items-center justify-center"
        role="status"
        aria-live="polite">
        <span className="sr-only">
          {stage === 'loading' ? copy.generating : stage === 'revealing' ? copy.revealing : ''}
        </span>
        {/* The prompt bar keeps a readable minimum width even above a narrow portrait result. */}
        <div
          className="flex w-full max-w-[max(min(100cqw,340px),var(--box-w))] flex-col [--box-w:min(100cqw,calc((100cqh-32px)*var(--ratio)))]"
          style={{ '--ratio': boxRatio } as CSSProperties}>
          <div className="mb-2 flex h-6 min-w-0 items-center justify-between gap-2 text-xs text-muted-foreground">
            <span className="flex min-w-0 items-center gap-1.5">
              <button
                type="button"
                aria-label={copy.newImage}
                disabled={busy}
                onClick={() => act((previous) => ({ ...previous, stage: 'templates', current: null }))}
                className="flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-md border border-dashed border-border hover:text-foreground focus-visible:outline-2 focus-visible:outline-primary disabled:cursor-default disabled:opacity-50 sm:hidden">
                <Plus className="size-3.5" aria-hidden="true" />
              </button>
              <Palette className="size-3.5 shrink-0" aria-hidden="true" />
              <span className="truncate">{current.prompt}</span>
            </span>
            <span className="shrink-0 tabular-nums">
              {stage === 'done' ? `${current.model.name} · ${sizeLabel(current.size)}` : sizeLabel(current.size)}
            </span>
          </div>
          <div
            className="mx-auto w-(--box-w) overflow-hidden rounded-md bg-background"
            style={{ aspectRatio: boxRatio }}>
            {stage === 'done' ? (
              <img src={image.src} alt={current.prompt} draggable={false} className="size-full object-cover" />
            ) : (
              <PaintingSkeleton
                key={current.id}
                imageUrl={stage === 'revealing' ? image.src : undefined}
                reduced={reduced}
                paused={!playing}
                onRevealed={() =>
                  setState((previous) => (previous.stage === 'revealing' ? { ...previous, stage: 'done' } : previous))
                }
              />
            )}
          </div>
        </div>
        {stage === 'done' && (
          <div
            aria-hidden="true"
            className="absolute top-1/2 left-0 z-20 hidden -translate-y-1/2 flex-col items-center gap-1 rounded-full border border-border bg-background/90 p-1 text-muted-foreground shadow-md backdrop-blur-xl motion-safe:animate-in motion-safe:fade-in md:flex">
            {[ZoomOut, ZoomIn, RotateCcwSquare, RotateCwSquare].map((Icon, index) => (
              <span key={index} className="flex size-7 items-center justify-center rounded-full">
                <Icon className="size-4" />
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )

  const popover =
    'absolute bottom-full left-0 z-30 mb-2 overflow-hidden rounded-xl border border-border bg-popover/80 p-1 shadow-(--shadow-float) backdrop-blur-2xl'
  const chip =
    'cursor-pointer rounded-md px-2 py-1 text-xs tabular-nums transition-colors duration-100 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary'
  const toolbarButton =
    'inline-flex h-7 min-w-0 cursor-pointer items-center gap-1.5 rounded-full px-2 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-default disabled:opacity-50'

  const composer = (
    <div className="shrink-0 px-3 pb-3 sm:px-4">
      <div
        ref={composerRef}
        onKeyDown={(event) => {
          if (event.key === 'Escape') setMenu(null)
        }}
        className="relative mx-auto w-full max-w-3xl rounded-[20px] border-[0.5px] border-hairline-strong bg-composer p-3 shadow-sm transition-colors has-[textarea:focus-visible]:border-primary/60">
        <textarea
          aria-label={copy.promptLabel}
          rows={2}
          value={state.prompt}
          disabled={busy}
          placeholder={copy.placeholder}
          onChange={(event) => {
            const prompt = event.target.value
            act((previous) => ({ ...previous, prompt }))
          }}
          onKeyDown={(event) => {
            if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing) {
              event.preventDefault()
              generate()
            }
          }}
          className="block h-12 w-full resize-none bg-transparent px-1 text-[14px] leading-6 text-foreground outline-none [scrollbar-width:none] placeholder:text-muted-foreground/70 disabled:opacity-70"
        />
        <div className="mt-2 flex items-center gap-1">
          <div className="relative min-w-0">
            <button
              type="button"
              aria-label={`${copy.selectModel}: ${state.model.name}`}
              aria-expanded={menu === 'model'}
              disabled={busy}
              onClick={() => setMenu(menu === 'model' ? null : 'model')}
              className={cn(toolbarButton, 'max-w-[200px] border border-border text-foreground')}>
              <ProviderIcon id={state.model.provider} className="size-3.5 shrink-0" />
              <span className="truncate">{state.model.name}</span>
              <ChevronDown className="size-3 shrink-0 text-muted-foreground max-sm:hidden" aria-hidden="true" />
            </button>
            <AnimatePresence>
              {menu === 'model' && (
                <m.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.16, ease: ease.expo }}
                  className={cn(popover, 'w-56')}>
                  <p className="px-2.5 pt-1.5 pb-1 font-mono text-[10px] tracking-wider text-muted-foreground uppercase">
                    {copy.selectModel}
                  </p>
                  {MODELS.map((model) => (
                    <button
                      key={model.id}
                      type="button"
                      aria-pressed={model.id === state.model.id}
                      onClick={() => {
                        setMenu(null)
                        act((previous) => ({
                          ...previous,
                          model,
                          size: model.defaultSize,
                          count: Math.min(previous.count, Math.max(1, model.maxImages))
                        }))
                      }}
                      className={cn(
                        'flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-left text-[13px] transition-colors duration-100 hover:bg-accent focus-visible:outline-2 focus-visible:outline-primary',
                        model.id === state.model.id ? 'bg-accent text-foreground' : 'text-muted-foreground'
                      )}>
                      <ProviderIcon id={model.provider} className="size-3.5 shrink-0" />
                      <span className="flex-1 truncate">{model.name}</span>
                      <span className="font-mono text-[10px] text-muted-foreground/70">{model.id}</span>
                    </button>
                  ))}
                </m.div>
              )}
            </AnimatePresence>
          </div>

          <div className="relative min-w-0">
            <button
              type="button"
              aria-label={`${copy.settings}: ${summary}`}
              aria-expanded={menu === 'params'}
              disabled={busy}
              onClick={() => setMenu(menu === 'params' ? null : 'params')}
              className={toolbarButton}>
              <Settings2 className="size-4 shrink-0" aria-hidden="true" />
              <span className="truncate tabular-nums">{summary}</span>
            </button>
            <AnimatePresence>
              {menu === 'params' && (
                <m.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.16, ease: ease.expo }}
                  className={cn(popover, '-left-16 w-[min(260px,calc(100vw-4rem))] space-y-3 p-3 sm:left-0')}>
                  <div>
                    <p className="mb-1.5 text-xs font-medium">{copy.imageSize}</p>
                    <div className="flex flex-wrap gap-1">
                      {state.model.sizes.map((size) => (
                        <button
                          key={size}
                          type="button"
                          aria-pressed={size === state.size}
                          onClick={() => act((previous) => ({ ...previous, size }))}
                          className={cn(
                            chip,
                            size === state.size
                              ? 'bg-foreground text-background'
                              : 'bg-secondary text-muted-foreground hover:text-foreground'
                          )}>
                          {sizeLabel(size)}
                        </button>
                      ))}
                    </div>
                  </div>
                  {state.model.maxImages > 0 && (
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-xs font-medium">{copy.numberImages}</p>
                      <div className="flex items-center gap-1">
                        {([-1, 1] as const).map((delta) => {
                          const Icon = delta < 0 ? Minus : Plus
                          const next = state.count + delta
                          const button = (
                            <button
                              key={delta}
                              type="button"
                              aria-label={delta < 0 ? copy.fewer : copy.more}
                              disabled={next < 1 || next > state.model.maxImages}
                              onClick={() => act((previous) => ({ ...previous, count: next }))}
                              className={cn(chip, 'bg-secondary px-1.5 disabled:cursor-default disabled:opacity-40')}>
                              <Icon className="size-3" aria-hidden="true" />
                            </button>
                          )
                          return delta < 0 ? (
                            <span key={delta} className="flex items-center gap-1">
                              {button}
                              <span className="w-6 text-center text-xs tabular-nums">{state.count}</span>
                            </span>
                          ) : (
                            button
                          )
                        })}
                      </div>
                    </div>
                  )}
                </m.div>
              )}
            </AnimatePresence>
          </div>

          <span className="flex-1" />
          <button
            type="button"
            aria-label={busy ? copy.stop : copy.generate}
            disabled={!busy && !state.prompt.trim()}
            onClick={generate}
            className={cn(
              'flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-full transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-default',
              busy || state.prompt.trim() ? 'bg-foreground text-background' : 'bg-secondary text-muted-foreground'
            )}>
            {busy ? (
              <Square className="size-2.5 fill-current" aria-hidden="true" />
            ) : (
              <ArrowUp className="size-4" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <div ref={ref} role="region" aria-label={copy.window}>
      <DemoFrame title={copy.window} onReplay={replay} bodyClassName="h-[460px]">
        <div className="flex h-full">
          <nav
            aria-label={copy.selectImage}
            className="hidden w-[68px] shrink-0 flex-col items-center gap-2 overflow-y-auto border-r border-border px-2 py-2 [scrollbar-width:none] sm:flex">
            <button
              type="button"
              aria-label={copy.newImage}
              disabled={busy}
              onClick={() => act((previous) => ({ ...previous, stage: 'templates', current: null }))}
              className="flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-[12px] border border-dashed border-border bg-background text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-default disabled:opacity-50">
              <Plus className="size-4" aria-hidden="true" />
            </button>
            {state.history.map((painting) => {
              const selectedItem = current?.id === painting.id
              const running = selectedItem && busy
              return (
                <button
                  key={painting.id}
                  type="button"
                  aria-label={`${copy.selectImage}: ${templates[painting.template].label}`}
                  aria-pressed={selectedItem}
                  disabled={busy}
                  onClick={() => act((previous) => ({ ...previous, stage: 'done', current: painting }))}
                  className="relative size-11 shrink-0 cursor-pointer overflow-hidden rounded-[12px] bg-secondary motion-safe:animate-in motion-safe:fade-in motion-safe:zoom-in-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-default">
                  {!running && (
                    <img src={IMAGES[templates[painting.template].id].src} alt="" className="size-full object-cover" />
                  )}
                  {running && (
                    <span className="absolute inset-x-1.5 bottom-1.5 h-1 overflow-hidden rounded-full bg-foreground/10">
                      <span className="block h-full w-1/2 rounded-full bg-foreground/60 motion-safe:animate-pulse" />
                    </span>
                  )}
                  {selectedItem && (
                    <span className="pointer-events-none absolute inset-0 rounded-[12px] ring-1 ring-muted-foreground/55 ring-inset" />
                  )}
                </button>
              )
            })}
          </nav>

          <div className="relative flex min-w-0 flex-1 flex-col">
            {stage === 'templates' ? templateStage : artboard}
            {composer}
          </div>
        </div>
      </DemoFrame>
    </div>
  )
}
