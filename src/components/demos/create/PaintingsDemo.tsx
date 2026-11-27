import { AnimatePresence, m } from 'framer-motion'
import {
  ArrowUp,
  BookOpen,
  ChevronDown,
  ChevronUp,
  CirclePause,
  Info,
  Mic,
  Palette,
  Plus,
  RefreshCcw,
  RotateCcw,
  RotateCcwSquare,
  RotateCwSquare,
  Search,
  Settings2,
  Trash2,
  ZoomIn,
  ZoomOut
} from 'lucide-react'
import { type CSSProperties, type ReactNode, useEffect, useRef, useState } from 'react'

import circularCutout from '@/assets/images/paintings/circular-cutout.webp'
import lightTrails from '@/assets/images/paintings/light-trails.webp'
import tennisCollage from '@/assets/images/paintings/tennis-collage.webp'
import trainWindow from '@/assets/images/paintings/train-window.webp'
import y2kStreet from '@/assets/images/paintings/y2k-street.webp'
import {
  type PaintingFieldKey,
  type PaintingOptionKey,
  type PaintingsDemoCopy,
  type PaintingTemplateId,
  paintingsDemo
} from '@/content/demos/create'
import { ease } from '@/lib/motion'
import { cn } from '@/lib/utils'
import AppShell, { tabTitle } from '../primitives/AppShell'
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

type FieldValue = string | number | boolean
type Field =
  | { type: 'chips'; key: 'size' | 'aspectRatio'; options: string[]; initial: string }
  | { type: 'slider'; key: 'numImages'; min: number; max: number; initial: number }
  | { type: 'select'; key: 'personGeneration' | 'quality' | 'style'; options: PaintingOptionKey[] }
  | { type: 'switch'; key: 'addWatermark' | 'promptExtend'; initial: boolean }
  | { type: 'text'; key: 'negativePrompt' | 'seed'; multiline?: boolean }

// Fields in provider-registry order (packages/provider-registry/data), rendered as imageGenerationToFields does.
const MODELS = [
  {
    id: 'dall-e-3',
    name: 'DALL-E-3',
    provider: 'openai',
    icon: 'openai',
    fields: [
      { type: 'select', key: 'quality', options: ['standard', 'hd'] },
      { type: 'chips', key: 'size', options: ['1024x1024', '1792x1024', '1024x1792'], initial: '1024x1024' },
      { type: 'select', key: 'style', options: ['vivid', 'natural'] }
    ]
  },
  {
    id: 'imagen-4.0-generate-001',
    name: 'Imagen 4',
    provider: 'gemini',
    icon: 'google',
    fields: [
      {
        type: 'chips',
        key: 'aspectRatio',
        options: ['ASPECT_1_1', 'ASPECT_3_4', 'ASPECT_4_3', 'ASPECT_9_16', 'ASPECT_16_9'],
        initial: 'ASPECT_1_1'
      },
      { type: 'slider', key: 'numImages', min: 1, max: 4, initial: 1 },
      { type: 'select', key: 'personGeneration', options: ['DONT_ALLOW', 'ALLOW_ADULT', 'ALLOW_ALL'] }
    ]
  },
  {
    id: 'qwen-image',
    name: 'Qwen Image',
    provider: 'dashscope',
    icon: 'qwen',
    fields: [
      { type: 'switch', key: 'addWatermark', initial: false },
      { type: 'text', key: 'negativePrompt', multiline: true },
      { type: 'slider', key: 'numImages', min: 1, max: 4, initial: 1 },
      { type: 'switch', key: 'promptExtend', initial: true },
      { type: 'text', key: 'seed' },
      {
        type: 'chips',
        key: 'size',
        options: ['1664x928', '1472x1140', '1328x1328', '1140x1472', '928x1664'],
        initial: '1328x1328'
      }
    ]
  }
] as const satisfies readonly {
  id: string
  name: string
  provider: keyof PaintingsDemoCopy['providers']
  icon: string
  fields: readonly Field[]
}[]

type Model = (typeof MODELS)[number]
type Params = Partial<Record<PaintingFieldKey, FieldValue>>
type Stage = 'templates' | 'loading' | 'revealing' | 'done'

// Keys that carry an InfoTooltip in the desktop KEY_LABELS table.
const HAS_TIP = new Set<PaintingFieldKey>([
  'numImages',
  'negativePrompt',
  'promptExtend',
  'seed',
  'personGeneration',
  'style'
])

interface Painting {
  id: number
  template: number
  model: Model
  sizeLabel: string | null
  ratio: number | null
  prompt: string
}

interface State {
  stage: Stage
  active: number
  selected: boolean
  prompt: string
  model: Model
  params: Params
  history: Painting[]
  current: Painting | null
  dockCollapsed: boolean
}

const GENERATE_MS = 2600
const INITIAL_TEMPLATE = 1
const DEFAULT_MODEL = MODELS[2]
const MIN_SCALE = 0.25
const MAX_SCALE = 4
const SCALE_STEP = 0.25

let nextPaintingId = 1

const defaults = (model: Model): Params =>
  Object.fromEntries(model.fields.flatMap((field) => ('initial' in field ? [[field.key, field.initial]] : [])))

/** Chip label and ratio like desktop paintings/form/sizeLabel.ts (`ASPECT_3_4` → `3:4`, `1024x1024` → `1024×1024`). */
function parseSize(value: string) {
  const aspect = value.match(/^(?:ASPECT_)?(\d+)[_:](\d+)$/i)
  if (aspect) return { label: `${aspect[1]}:${aspect[2]}`, w: Number(aspect[1]), h: Number(aspect[2]) }
  const dims = value.match(/^(\d+)x(\d+)$/)
  if (dims) return { label: `${dims[1]}×${dims[2]}`, w: Number(dims[1]), h: Number(dims[2]) }
  return null
}

function RatioThumb({ value, selected }: { value: string; selected: boolean }) {
  const size = parseSize(value)
  if (!size) return null
  const scale = 14 / Math.max(size.w, size.h)
  return (
    <span className="flex size-3.5 shrink-0 items-center justify-center" aria-hidden="true">
      <span
        className={cn('inline-block rounded-[2px] border border-current', !selected && 'opacity-40')}
        style={{ width: Math.max(6, Math.round(size.w * scale)), height: Math.max(6, Math.round(size.h * scale)) }}
      />
    </span>
  )
}

export default function PaintingsDemo() {
  const { locale } = useDemoLocale()
  const copy = paintingsDemo[locale]
  const ref = useRef<HTMLDivElement>(null)
  const composerRef = useRef<HTMLDivElement>(null)
  const touched = useRef(false)
  const playing = useDemoPlayback(ref)
  const [menu, setMenu] = useState<'model' | 'params' | null>(null)
  const [search, setSearch] = useState('')
  const [hovered, setHovered] = useState<number | null>(null)
  const [view, setView] = useState({ scale: 1, rotation: 0 })
  const templates = copy.templates

  const initial: State = {
    stage: 'templates',
    active: INITIAL_TEMPLATE,
    selected: false,
    prompt: '',
    model: DEFAULT_MODEL,
    params: defaults(DEFAULT_MODEL),
    history: [],
    current: null,
    dockCollapsed: false
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
    const sizeField = previous.model.fields.find((field) => field.type === 'chips')
    const size = sizeField ? parseSize(String(previous.params[sizeField.key] ?? sizeField.initial)) : null
    const painting: Painting = {
      id: nextPaintingId++,
      template: previous.active,
      model: previous.model,
      sizeLabel: size?.label ?? null,
      ratio: size ? size.w / size.h : null,
      prompt: previous.prompt.trim()
    }
    return {
      ...previous,
      stage: 'loading',
      current: painting,
      dockCollapsed: false,
      history: [painting, ...previous.history].slice(0, 6)
    }
  }

  const { reduced, replay } = useDemoScript(async ({ wait, reduced }) => {
    touched.current = false
    setMenu(null)
    setView({ scale: 1, rotation: 0 })
    if (reduced) {
      setState({ ...start(select(initial, 0)), stage: 'done', dockCollapsed: true })
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

  const { stage, current, model, params } = state
  const busy = stage === 'loading' || stage === 'revealing'
  const fieldValue = (field: Field) => params[field.key] ?? ('initial' in field ? field.initial : undefined)
  // Summary mirrors PaintingComposer.paramsSummary: chips, sliders and chosen selects, in field order.
  const summary = model.fields
    .flatMap((field) => {
      const value = fieldValue(field)
      if (field.type === 'chips') return [parseSize(String(value))?.label ?? String(value)]
      if (field.type === 'slider') return [String(value)]
      if (field.type === 'select' && value) return [copy.options[value as PaintingOptionKey]]
      return []
    })
    .join(' · ')

  const setParam = (key: PaintingFieldKey, value: FieldValue) =>
    act((previous) => ({ ...previous, params: { ...previous.params, [key]: value } }))

  const send = () => {
    setMenu(null)
    if (busy) {
      act((previous) => ({ ...previous, stage: 'templates', current: null, history: previous.history.slice(1) }))
      return
    }
    setView({ scale: 1, rotation: 0 })
    act(start)
  }
  const newImage = () => {
    setMenu(null)
    act((previous) => ({ ...previous, stage: 'templates', current: null, dockCollapsed: false }))
  }

  const middle = Math.floor(templates.length / 2)
  const slotOf = (index: number) => ((index - state.active + middle + templates.length) % templates.length) - middle + 2
  const labelIndex = hovered ?? (state.selected ? state.active : null)
  const labelSlot = labelIndex === null ? null : FAN[slotOf(labelIndex)]

  const templateStage = (
    <section className="[container-type:size] absolute inset-0 z-0 flex min-h-0 items-center justify-center overflow-hidden px-3 pt-3 pb-36">
      <div className="flex h-full max-h-80 min-h-0 w-full flex-col items-center">
        <p className="max-w-xl shrink-0 text-center text-[clamp(17px,4cqw,26px)] leading-[1.1] font-bold tracking-tight text-balance">
          {copy.title}
        </p>
        {/* Desktop card sizes; narrow containers get larger cards so the fan stays legible on phones. */}
        <div className="[container-type:size] relative mt-[clamp(8px,5cqh,30px)] max-h-[220px] min-h-0 w-full flex-1 [--card-h:clamp(44px,min(18cqw,66cqh),148px)] [--card-w:clamp(36px,min(14cqw,53cqh),118px)] @max-md:[--card-h:clamp(44px,min(30cqw,66cqh),148px)] @max-md:[--card-w:clamp(36px,min(23cqw,53cqh),118px)]">
          <div role="group" aria-label={copy.stylesLabel} className="absolute inset-0 overflow-hidden">
            {templates.map((template, index) => {
              const slot = FAN[slotOf(index)]
              const selected = state.selected && index === state.active
              return (
                <button
                  key={template.id}
                  type="button"
                  aria-pressed={selected}
                  aria-label={template.label}
                  onClick={() => act((previous) => select(previous, index))}
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
                  <span className="pointer-events-none block size-full overflow-hidden rounded-xl bg-card">
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
        </div>
        <p className="mt-[clamp(4px,2cqh,10px)] max-w-lg shrink-0 px-4 pb-1 text-center text-xs leading-5 text-muted-foreground">
          {copy.caption}
        </p>
      </div>
    </section>
  )

  const image = current ? IMAGES[templates[current.template].id] : null
  // Like the desktop skeleton: sized to the requested ratio while drawing, relocked to the real image once it arrives.
  const boxRatio = image ? (stage === 'loading' && current?.ratio ? current.ratio : image.ratio) : 1
  const railButton =
    'flex size-7 cursor-pointer items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted/55 hover:text-foreground focus-visible:outline-2 focus-visible:outline-primary disabled:cursor-default disabled:opacity-50'
  const rail = [
    {
      label: copy.zoomOut,
      icon: ZoomOut,
      disabled: view.scale <= MIN_SCALE,
      run: () => ({ ...view, scale: view.scale - SCALE_STEP })
    },
    {
      label: copy.zoomIn,
      icon: ZoomIn,
      disabled: view.scale >= MAX_SCALE,
      run: () => ({ ...view, scale: view.scale + SCALE_STEP })
    },
    { label: copy.rotateLeft, icon: RotateCcwSquare, run: () => ({ ...view, rotation: view.rotation - 90 }) },
    { label: copy.rotateRight, icon: RotateCwSquare, run: () => ({ ...view, rotation: view.rotation + 90 }) },
    { label: copy.reset, icon: RefreshCcw, run: () => ({ scale: 1, rotation: 0 }) }
  ]

  const artboard = current && image && (
    <div className="flex min-h-0 w-full flex-1 flex-col p-2">
      <div
        className="[container-type:size] relative flex min-h-0 flex-1 items-center justify-center overflow-hidden"
        role="status"
        aria-live="polite">
        <span className="sr-only">
          {stage === 'loading' ? copy.generating : stage === 'revealing' ? copy.revealing : ''}
        </span>
        <div
          className="flex w-(--box-w) flex-col [--box-w:min(100cqw,calc((100cqh-32px)*var(--ratio)))]"
          style={{ '--ratio': boxRatio } as CSSProperties}>
          <div className="mb-2 flex w-full min-w-0 items-center justify-between gap-2 text-xs text-muted-foreground">
            <span className="flex max-w-xs min-w-0 flex-1 items-center gap-1.5 overflow-hidden">
              <Palette className="size-3.5 shrink-0" aria-hidden="true" />
              <span className="truncate">{current.prompt}</span>
            </span>
            {current.sizeLabel && (
              <span className="shrink-0 tabular-nums">
                {stage === 'done' ? `${current.model.name} · ${current.sizeLabel}` : current.sizeLabel}
              </span>
            )}
          </div>
          <div className="w-full overflow-hidden rounded-md bg-background" style={{ aspectRatio: boxRatio }}>
            {stage === 'done' ? (
              <img
                src={image.src}
                alt={current.prompt}
                draggable={false}
                className="size-full object-cover transition-transform duration-150"
                style={{ transform: `scale(${view.scale}) rotate(${view.rotation}deg)` }}
              />
            ) : (
              <PaintingSkeleton
                key={current.id}
                imageUrl={stage === 'revealing' ? image.src : undefined}
                reduced={reduced}
                paused={!playing}
                onRevealed={() =>
                  setState((previous) =>
                    previous.stage === 'revealing' ? { ...previous, stage: 'done', dockCollapsed: true } : previous
                  )
                }
              />
            )}
          </div>
        </div>
        {stage === 'done' && (
          <>
            <div
              role="toolbar"
              aria-label={copy.toolbar}
              className="absolute top-1/2 left-4 z-20 flex -translate-y-1/2 flex-col items-center gap-1 rounded-full border border-border bg-background/90 p-1 shadow-md backdrop-blur-xl motion-safe:animate-in motion-safe:fade-in">
              {rail.map(({ label, icon: Icon, disabled, run }) => (
                <button
                  key={label}
                  type="button"
                  aria-label={label}
                  title={label}
                  disabled={disabled}
                  onClick={() => setView(run())}
                  className={railButton}>
                  <Icon className="size-4" aria-hidden="true" />
                </button>
              ))}
            </div>
            <span className="absolute bottom-2.5 left-1/2 -translate-x-1/2 rounded-full bg-foreground/60 px-2 py-1 text-xs text-background tabular-nums">
              1 / 1
            </span>
          </>
        )}
      </div>
    </div>
  )

  const popover =
    'absolute bottom-full left-0 z-30 mb-2 overflow-hidden rounded-[8px] border border-border bg-popover shadow-(--shadow-float)'
  const pill =
    'inline-flex h-7 min-w-0 shrink-0 cursor-pointer items-center gap-1.5 rounded-full px-2 text-xs transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
  const sectionTitle =
    'mb-1.5 flex items-center gap-1 text-xs tracking-wider text-muted-foreground uppercase select-none'
  const control =
    'w-full rounded-[8px] border border-border bg-secondary px-2.5 py-1.5 text-xs text-foreground outline-none focus-visible:outline-2 focus-visible:outline-primary'
  const query = search.trim().toLowerCase()
  const groups = (['openai', 'gemini', 'dashscope'] as const)
    .map((provider) => ({
      provider,
      models: MODELS.filter((entry) => entry.provider === provider && entry.name.toLowerCase().includes(query))
    }))
    .filter((group) => group.models.length > 0)

  const renderField = (field: Field) => {
    const value = fieldValue(field)
    const title = copy.fields[field.key]
    let input: ReactNode
    if (field.type === 'chips') {
      input = (
        <div className="grid grid-cols-3 gap-2">
          {field.options.map((option) => {
            const selected = value === option
            return (
              <button
                key={option}
                type="button"
                aria-pressed={selected}
                onClick={() => setParam(field.key, option)}
                className={cn(
                  'flex min-h-10 min-w-0 cursor-pointer flex-col items-center justify-center gap-0.5 rounded-[10px] px-1 py-1 text-[11px] leading-tight transition-all focus-visible:outline-2 focus-visible:outline-primary',
                  selected
                    ? 'bg-accent text-foreground ring-1 ring-foreground/35 ring-inset'
                    : 'bg-muted text-muted-foreground hover:bg-accent hover:text-foreground'
                )}>
                <RatioThumb value={option} selected={selected} />
                <span className="block max-w-full truncate font-medium tracking-tight tabular-nums">
                  {parseSize(option)?.label ?? option}
                </span>
              </button>
            )
          })}
        </div>
      )
    } else if (field.type === 'slider') {
      input = (
        <div className="flex items-center gap-3">
          <input
            type="range"
            aria-label={title}
            min={field.min}
            max={field.max}
            value={Number(value)}
            onChange={(event) => setParam(field.key, Number(event.target.value))}
            className="h-1.5 flex-1 cursor-pointer accent-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
          />
          <input
            type="number"
            aria-label={title}
            min={field.min}
            max={field.max}
            value={Number(value)}
            onChange={(event) =>
              setParam(field.key, Math.min(field.max, Math.max(field.min, Number(event.target.value) || field.min)))
            }
            className={cn(control, 'w-20 tabular-nums')}
          />
        </div>
      )
    } else if (field.type === 'select') {
      input = (
        <select
          aria-label={title}
          value={String(value ?? '')}
          onChange={(event) => setParam(field.key, event.target.value)}
          className={cn(control, 'cursor-pointer', !value && 'text-muted-foreground')}>
          <option value="" disabled>
            {title}
          </option>
          {field.options.map((option) => (
            <option key={option} value={option}>
              {copy.options[option]}
            </option>
          ))}
        </select>
      )
    } else if (field.type === 'switch') {
      input = (
        <button
          type="button"
          role="switch"
          aria-checked={Boolean(value)}
          aria-label={title}
          onClick={() => setParam(field.key, !value)}
          className={cn(
            'relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
            value ? 'bg-primary' : 'bg-foreground/15'
          )}>
          <span
            className={cn(
              'size-4 rounded-full bg-background shadow-sm transition-transform',
              value ? 'translate-x-[18px]' : 'translate-x-0.5'
            )}
          />
        </button>
      )
    } else if (field.multiline) {
      input = (
        <textarea
          aria-label={title}
          rows={4}
          value={String(value ?? '')}
          onChange={(event) => setParam(field.key, event.target.value)}
          className={cn(control, 'resize-none')}
        />
      )
    } else {
      input = (
        <div className="flex items-center gap-2">
          <input
            aria-label={title}
            value={String(value ?? '')}
            onChange={(event) => setParam(field.key, event.target.value)}
            className={cn(control, 'flex-1')}
          />
          <button
            type="button"
            aria-label={copy.randomSeed}
            title={copy.randomSeed}
            onClick={() => setParam(field.key, String(Math.floor(Math.random() * 1_000_000)))}
            className="flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-md border border-border text-muted-foreground hover:bg-accent hover:text-foreground focus-visible:outline-2 focus-visible:outline-primary">
            <RotateCcw className="size-3.5" aria-hidden="true" />
          </button>
        </div>
      )
    }
    return (
      <div key={field.key}>
        <p className={sectionTitle}>
          {title}
          {HAS_TIP.has(field.key) && <Info className="size-3.5 opacity-70" aria-hidden="true" />}
        </p>
        {input}
      </div>
    )
  }

  const canSend = !busy && Boolean(state.prompt.trim())
  const composer = (
    <div
      ref={composerRef}
      onKeyDown={(event) => {
        if (event.key === 'Escape') setMenu(null)
      }}
      className="relative mb-3 rounded-[20px] border-[0.5px] border-border bg-composer pt-2 shadow-sm">
      <textarea
        aria-label={copy.placeholder}
        rows={2}
        value={state.prompt}
        placeholder={copy.placeholder}
        onChange={(event) => {
          const prompt = event.target.value
          act((previous) => ({ ...previous, prompt }))
        }}
        onKeyDown={(event) => {
          if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing) {
            event.preventDefault()
            if (canSend) send()
          }
        }}
        className="block h-[46px] w-full resize-none bg-transparent px-[15px] pt-1.5 text-[14px] leading-[1.4] text-foreground outline-none [scrollbar-width:none] placeholder:text-muted-foreground/70"
      />
      <div className="relative flex h-10 items-center justify-between gap-4 px-2 py-1.25">
        <div className="flex min-w-0 flex-1 items-center gap-1.5">
          <div className="relative min-w-0 shrink">
            <button
              type="button"
              aria-label={`${model.name} | ${copy.providers[model.provider]}`}
              aria-expanded={menu === 'model'}
              onClick={() => {
                setSearch('')
                setMenu(menu === 'model' ? null : 'model')
              }}
              className={cn(
                pill,
                'w-auto max-w-[200px] shrink justify-between max-sm:max-w-[124px] gap-2 border border-border bg-secondary text-muted-foreground hover:text-foreground'
              )}>
              <span className="flex min-w-0 flex-1 items-center gap-2 overflow-hidden">
                <ProviderIcon id={model.icon} className="size-[18px] shrink-0" />
                <span className="min-w-0 truncate text-foreground">
                  {model.name}
                  <span className="text-muted-foreground"> | {copy.providers[model.provider]}</span>
                </span>
              </span>
              <ChevronDown className="size-3 shrink-0 text-muted-foreground" aria-hidden="true" />
            </button>
            <AnimatePresence>
              {menu === 'model' && (
                <m.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.16, ease: ease.expo }}
                  className={cn(popover, 'w-[min(420px,calc(100vw-7rem))] pb-1.5')}>
                  <label className="flex h-9 items-center gap-2 border-b border-border px-3">
                    <Search className="size-3.5 shrink-0 text-muted-foreground" aria-hidden="true" />
                    <input
                      // biome-ignore lint/a11y/noAutofocus: the desktop selector focuses its search on open
                      autoFocus
                      value={search}
                      onChange={(event) => setSearch(event.target.value)}
                      placeholder={copy.searchModels}
                      aria-label={copy.searchModels}
                      className="min-w-0 flex-1 bg-transparent text-xs outline-none placeholder:text-muted-foreground"
                    />
                  </label>
                  {groups.map((group) => (
                    <div key={group.provider} className="px-1.5">
                      <p className="flex h-7 items-center px-2.5 text-[11px] text-muted-foreground">
                        {copy.providers[group.provider]}
                      </p>
                      {group.models.map((entry) => {
                        const selected = entry.id === model.id
                        return (
                          <button
                            key={entry.id}
                            type="button"
                            aria-pressed={selected}
                            onClick={() => {
                              setMenu(null)
                              act((previous) => ({ ...previous, model: entry, params: defaults(entry) }))
                            }}
                            className={cn(
                              'relative flex h-8 w-full cursor-pointer items-center gap-2 rounded-[10px] px-2 text-left text-xs transition-colors focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary',
                              selected ? 'bg-accent/70' : 'hover:bg-accent/60'
                            )}>
                            {selected && (
                              <span className="absolute top-1/2 left-0 h-[60%] w-0.75 -translate-y-1/2 rounded-full bg-primary" />
                            )}
                            <ProviderIcon id={entry.icon} className="size-4 shrink-0" />
                            <span className="truncate">{entry.name}</span>
                          </button>
                        )
                      })}
                    </div>
                  ))}
                </m.div>
              )}
            </AnimatePresence>
          </div>

          <div className="relative min-w-0 shrink">
            <button
              type="button"
              aria-label={summary ? `${copy.settings}: ${summary}` : copy.settings}
              aria-expanded={menu === 'params'}
              onClick={() => setMenu(menu === 'params' ? null : 'params')}
              className={cn(pill, 'max-w-full text-muted-foreground hover:bg-accent hover:text-foreground')}>
              <Settings2 className="size-4 shrink-0" aria-hidden="true" />
              {summary && <span className="max-w-55 truncate tabular-nums max-sm:sr-only">{summary}</span>}
            </button>
            <AnimatePresence>
              {menu === 'params' && (
                <m.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.16, ease: ease.expo }}
                  className={cn(popover, '-left-24 w-[min(300px,calc(100vw-5rem))] p-3 sm:left-0')}>
                  <div className="flex max-h-[268px] flex-col gap-4 overflow-y-auto pr-1 [scrollbar-width:thin]">
                    {model.fields.map(renderField)}
                  </div>
                </m.div>
              )}
            </AnimatePresence>
          </div>

          {/* Prompt library and the "+" quick panel open desktop-only surfaces, so they are shown but inert here. */}
          <span aria-hidden="true" className={cn(pill, 'cursor-default text-muted-foreground max-sm:hidden')}>
            <BookOpen className="size-4" />
            <span>{copy.prompts}</span>
          </span>
          <span
            aria-hidden="true"
            className="flex size-[30px] shrink-0 items-center max-sm:hidden justify-center rounded-full text-muted-foreground dark:text-foreground">
            <Plus className="size-[18px]" />
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span
            aria-hidden="true"
            className="flex size-7.5 items-center justify-center rounded-full text-muted-foreground dark:text-foreground">
            <Mic className="size-4.5" />
          </span>
          {busy ? (
            <button
              type="button"
              aria-label={copy.pause}
              onClick={send}
              className="flex size-7.5 cursor-pointer items-center justify-center rounded-full text-destructive hover:bg-accent focus-visible:outline-2 focus-visible:outline-primary">
              <CirclePause className="size-5" aria-hidden="true" />
            </button>
          ) : (
            <button
              type="button"
              aria-label={copy.send}
              disabled={!canSend}
              onClick={send}
              className={cn(
                'mt-px mr-0.5 flex size-[22px] cursor-pointer items-center justify-center rounded-full transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed',
                canSend ? 'bg-primary text-primary-foreground' : 'bg-muted-foreground/35 text-background'
              )}>
              <ArrowUp className="size-3.5" strokeWidth={2.5} aria-hidden="true" />
            </button>
          )}
        </div>
      </div>
    </div>
  )

  const hasImages = stage === 'done'
  const dockToggle =
    'inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-full border border-border bg-background/90 px-3 text-xs text-muted-foreground shadow-sm backdrop-blur-xl hover:bg-accent hover:text-foreground focus-visible:outline-2 focus-visible:outline-primary'

  return (
    <div ref={ref} role="region" aria-label={copy.window}>
      <DemoFrame chromeless title={copy.window} onReplay={replay} bodyClassName="h-[510px]">
        <AppShell active="paintings" tab={{ title: tabTitle(copy.window) }}>
          <div className="flex h-full px-2 pt-2 pb-1">
            <nav
              aria-label={copy.selectImage}
              className="flex h-full w-[68px] shrink-0 flex-col gap-2 overflow-y-auto border-r border-border px-2 py-2 [scrollbar-width:none]">
              <button
                type="button"
                aria-label={copy.newImage}
                title={copy.newImage}
                disabled={busy}
                onClick={newImage}
                className="sticky top-0 z-10 mb-1 flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-[12px] border border-dashed border-border bg-background text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-default disabled:opacity-50">
                <Plus className="size-4" aria-hidden="true" />
              </button>
              {state.history.map((painting) => {
                const selectedItem = current?.id === painting.id
                const running = selectedItem && busy
                return (
                  <div
                    key={painting.id}
                    className={cn(
                      'group relative size-11 shrink-0 rounded-[12px] bg-secondary motion-safe:animate-in motion-safe:fade-in motion-safe:zoom-in-95',
                      selectedItem && 'bg-background'
                    )}>
                    <button
                      type="button"
                      aria-label={copy.selectImage}
                      aria-pressed={selectedItem}
                      disabled={busy}
                      onClick={() => {
                        setView({ scale: 1, rotation: 0 })
                        act((previous) => ({ ...previous, stage: 'done', current: painting, dockCollapsed: true }))
                      }}
                      className="absolute inset-0 cursor-pointer overflow-hidden rounded-[12px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-default">
                      {running ? (
                        <PaintingSkeleton reduced={reduced} paused={!playing} onRevealed={() => {}} />
                      ) : (
                        <img
                          src={IMAGES[templates[painting.template].id].src}
                          alt=""
                          className="size-full object-cover"
                        />
                      )}
                    </button>
                    {selectedItem && (
                      <span className="pointer-events-none absolute inset-0 z-10 rounded-[12px] ring-1 ring-muted-foreground/55 ring-inset" />
                    )}
                    <button
                      type="button"
                      aria-label={copy.deleteImage}
                      title={copy.deleteImage}
                      disabled={running}
                      onClick={() =>
                        act((previous) => ({
                          ...previous,
                          history: previous.history.filter((item) => item.id !== painting.id),
                          ...(selectedItem ? { stage: 'templates', current: null, dockCollapsed: false } : null)
                        }))
                      }
                      className="absolute -top-1 -right-1 z-20 flex size-5 cursor-pointer items-center justify-center rounded-full border border-border bg-background/95 text-destructive opacity-0 shadow-sm transition group-hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-primary disabled:hidden">
                      <Trash2 className="size-3" aria-hidden="true" />
                    </button>
                  </div>
                )
              })}
            </nav>

            <div className="relative flex min-w-0 flex-1 flex-col overflow-hidden">
              <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
                {stage !== 'templates' && artboard}
              </div>
              {stage === 'templates' && templateStage}
              {hasImages && state.dockCollapsed ? (
                <div className="relative z-20 flex shrink-0 items-center justify-center px-2 pt-1 pb-2">
                  <button
                    type="button"
                    aria-expanded={false}
                    onClick={() => act((previous) => ({ ...previous, dockCollapsed: false }))}
                    className={dockToggle}>
                    <ChevronUp className="size-3.5" aria-hidden="true" />
                    {copy.expandPrompt}
                  </button>
                </div>
              ) : (
                <div className="relative z-20 shrink-0 px-2 pt-2 pb-2">
                  {hasImages && (
                    <div className="mb-1 flex justify-center">
                      <button
                        type="button"
                        aria-expanded={true}
                        onClick={() => {
                          setMenu(null)
                          act((previous) => ({ ...previous, dockCollapsed: true }))
                        }}
                        className={dockToggle}>
                        <ChevronDown className="size-3.5" aria-hidden="true" />
                        {copy.minimizePrompt}
                      </button>
                    </div>
                  )}
                  {composer}
                </div>
              )}
            </div>
          </div>
        </AppShell>
      </DemoFrame>
    </div>
  )
}
