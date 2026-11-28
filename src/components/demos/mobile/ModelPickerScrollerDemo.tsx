import { AnimatePresence, animate, m, useMotionValue, useReducedMotion } from 'framer-motion'
import { Eye, Plus, Search } from 'lucide-react'
import {
  type KeyboardEvent,
  type PointerEvent as ReactPointerEvent,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react'

import { type ModelPickerCopy, modelPickerDemo, type PickerBadge, type SheetDetent } from '@/content/demos/mobile'
import { spring } from '@/lib/motion'
import { cn } from '@/lib/utils'
import { useDemoLocale } from '../primitives/useDemoLocale'
import { useDemoPlayback, useDemoScript } from '../primitives/useDemoScript'
import {
  BrandAvatar,
  BrandMark,
  ChatHeader,
  CherryAvatar,
  ComposerCircle,
  ComposerSurface,
  canvasFocus,
  FilterIcon,
  SelectionMark,
  SendSlot,
  tone
} from './MobileUi'
import PhoneFrame, { SCREEN_HEIGHT, STATUS_BAR_HEIGHT } from './PhoneFrame'

// ModelPickerDrawer sizes ['medium', 'full']: 60% of the height below the top safe area, then all of it.
const DETENTS: SheetDetent[] = ['medium', 'full']
const AVAILABLE = SCREEN_HEIGHT - STATUS_BAR_HEIGHT
const HEIGHT: Record<SheetDetent, number> = { medium: Math.round(AVAILABLE * 0.6), full: AVAILABLE }
// ModelPickerFastScroller: 8pt rail inset, 48pt targets, 500ms long press before a drag scrubs.
const RAIL_INSET = 8
const ITEM = 48
const LONG_PRESS = 500
const PREVIEW_HEIGHT = 144

type PreviewSource = 'pointer' | 'focus' | 'script'

interface Gesture {
  startY: number
  startScroll: number
  mode: 'press' | 'scroll' | 'scrub'
  index: number
  timer: ReturnType<typeof setTimeout>
}

/** The canvas is CSS-scaled, so pointer deltas convert back to app points through this ratio. */
const canvasScale = (node: HTMLElement) => node.getBoundingClientRect().height / node.offsetHeight || 1

export default function ModelPickerScrollerDemo() {
  const { locale } = useDemoLocale()
  const copy = modelPickerDemo[locale]
  const providers = copy.providers
  const reduced = useReducedMotion() ?? false
  const ref = useRef<HTMLDivElement>(null)
  const playing = useDemoPlayback(ref)

  const list = useRef<HTMLDivElement>(null)
  const rail = useRef<HTMLDivElement>(null)
  const headers = useRef<(HTMLDivElement | null)[]>([])
  const markers = useRef<(HTMLButtonElement | null)[]>([])
  const gesture = useRef<Gesture | null>(null)
  const navigating = useRef<ReturnType<typeof setTimeout> | null>(null)

  const [detent, setDetent] = useState<SheetDetent>('medium')
  const sheetHeight = useMotionValue(HEIGHT.medium)
  const [active, setActive] = useState(0)
  const [preview, setPreview] = useState<{ index: number; source: PreviewSource } | null>(null)
  const [finger, setFinger] = useState<number | null>(null)
  const [railScroll, setRailScroll] = useState(0)
  const [selected, setSelected] = useState(copy.selected)

  useEffect(() => {
    if (reduced) {
      sheetHeight.set(HEIGHT[detent])
      return
    }
    const controls = animate(sheetHeight, HEIGHT[detent], spring.settle)
    return () => controls.stop()
  }, [detent, reduced, sheetHeight])

  const highlighted = preview?.index ?? active

  const navigate = useCallback(
    (index: number) => {
      const header = headers.current[index]
      if (!header || !list.current) return
      setActive(index)
      if (navigating.current) clearTimeout(navigating.current)
      navigating.current = setTimeout(() => {
        navigating.current = null
      }, 600)
      list.current.scrollTo({ top: header.offsetTop, behavior: reduced ? 'auto' : 'smooth' })
    },
    [reduced]
  )

  // Keep the highlighted marker inside the rail's visible window, as the native index does.
  useEffect(() => {
    const node = rail.current
    if (!node || gesture.current) return
    const top = RAIL_INSET + active * ITEM
    if (top < node.scrollTop) node.scrollTop = top - RAIL_INSET
    else if (top + ITEM > node.scrollTop + node.clientHeight)
      node.scrollTop = top + ITEM + RAIL_INSET - node.clientHeight
  }, [active])

  const onListScroll = () => {
    const node = list.current
    if (!node || navigating.current) return
    let index = 0
    headers.current.forEach((header, i) => {
      if (header && header.offsetTop <= node.scrollTop + 4) index = i
    })
    setActive(index)
  }

  const indexAt = (clientY: number) => {
    const node = rail.current
    if (!node) return -1
    const y = (clientY - node.getBoundingClientRect().top) / canvasScale(node) + node.scrollTop - RAIL_INSET
    return Math.min(providers.length - 1, Math.max(0, Math.floor(y / ITEM)))
  }

  const onRailPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.button !== 0 || !rail.current) return
    event.preventDefault()
    rail.current.setPointerCapture(event.pointerId)
    const index = indexAt(event.clientY)
    const timer = setTimeout(() => {
      if (gesture.current?.mode === 'press') gesture.current.mode = 'scrub'
    }, LONG_PRESS)
    gesture.current = { startY: event.clientY, startScroll: rail.current.scrollTop, mode: 'press', index, timer }
    setPreview({ index, source: 'pointer' })
  }

  const onRailPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const current = gesture.current
    const node = rail.current
    if (!current || !node) return
    const dy = (event.clientY - current.startY) / canvasScale(node)
    // Movement before the hold scrolls the rail and cancels the tap; after it, movement scrubs.
    if (current.mode === 'press' && Math.abs(dy) > 6) {
      current.mode = 'scroll'
      clearTimeout(current.timer)
      setPreview(null)
    }
    if (current.mode === 'scroll') {
      node.scrollTop = current.startScroll - dy
      setRailScroll(node.scrollTop)
    }
    if (current.mode === 'scrub') {
      const rect = node.getBoundingClientRect()
      if (event.clientY < rect.top || event.clientY >= rect.bottom) return
      current.index = indexAt(event.clientY)
      setPreview({ index: current.index, source: 'pointer' })
    }
  }

  const endRailGesture = (commit: boolean) => {
    const current = gesture.current
    if (!current) return
    clearTimeout(current.timer)
    gesture.current = null
    setPreview(null)
    if (commit && current.mode !== 'scroll') navigate(current.index)
  }

  const onMarkerKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = providers.length - 1
    const next =
      event.key === 'ArrowDown'
        ? Math.min(last, index + 1)
        : event.key === 'ArrowUp'
          ? Math.max(0, index - 1)
          : event.key === 'Home'
            ? 0
            : event.key === 'End'
              ? last
              : -1
    if (next < 0) return
    event.preventDefault()
    navigate(next)
    markers.current[next]?.focus()
  }

  const onHandleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'ArrowUp') setDetent('full')
    else if (event.key === 'ArrowDown') setDetent('medium')
    else if (event.key === 'Enter' || event.key === ' ') setDetent(detent === 'full' ? 'medium' : 'full')
    else return
    event.preventDefault()
  }

  const drag = useRef<{ startY: number; startHeight: number; scale: number; moved: boolean } | null>(null)

  // Only the header and search region resize the sheet; the list and index scroll freely.
  const onHandlePointerDown = (event: ReactPointerEvent<HTMLButtonElement>) => {
    if (event.button !== 0) return
    event.currentTarget.setPointerCapture(event.pointerId)
    drag.current = {
      startY: event.clientY,
      startHeight: sheetHeight.get(),
      scale: canvasScale(event.currentTarget),
      moved: false
    }
  }

  const onHandlePointerMove = (event: ReactPointerEvent<HTMLButtonElement>) => {
    const current = drag.current
    if (!current) return
    const dy = (event.clientY - current.startY) / current.scale
    if (Math.abs(dy) > 3) current.moved = true
    const raw = current.startHeight - dy
    // Rubber-band past the largest and smallest detents instead of stopping dead.
    const height =
      raw > HEIGHT.full
        ? HEIGHT.full + (raw - HEIGHT.full) * 0.2
        : raw < HEIGHT.medium
          ? HEIGHT.medium - (HEIGHT.medium - raw) * 0.3
          : raw
    sheetHeight.set(height)
  }

  const onHandlePointerUp = () => {
    const current = drag.current
    drag.current = null
    if (!current) return
    if (!current.moved) {
      setDetent(detent === 'full' ? 'medium' : 'full')
      return
    }
    const nearest = sheetHeight.get() > (HEIGHT.medium + HEIGHT.full) / 2 ? 'full' : 'medium'
    if (nearest === detent) animate(sheetHeight, HEIGHT[nearest], spring.settle)
    setDetent(nearest)
  }

  const { replay } = useDemoScript(async ({ wait, reduced: still }) => {
    if (still) return
    setDetent('medium')
    list.current?.scrollTo({ top: 0 })
    setActive(0)
    await wait(900)
    setDetent('full')
    await wait(1000)
    setFinger(0)
    setPreview({ index: 0, source: 'script' })
    await wait(LONG_PRESS + 150)
    for (let index = 1; index <= 4; index++) {
      setFinger(index)
      setPreview({ index, source: 'script' })
      await wait(320)
    }
    await wait(250)
    setPreview(null)
    setFinger(null)
    navigate(4)
  }, playing)

  const railHeight = rail.current?.clientHeight ?? 0
  const previewCenter = preview ? RAIL_INSET + (preview.index + 0.5) * ITEM - railScroll : 0
  const previewTop = Math.max(0, Math.min(railHeight - PREVIEW_HEIGHT, previewCenter - PREVIEW_HEIGHT / 2))
  const previewProvider = preview ? providers[preview.index] : null

  return (
    <div ref={ref} role="region" aria-label={copy.region} className="flex flex-col items-center gap-4">
      <PhoneFrame
        onReplay={replay}
        overlay={
          <div className="absolute inset-0 z-30">
            <div aria-hidden="true" className="absolute inset-0 bg-black/40" />
            <m.div
              style={{ height: sheetHeight }}
              className={cn(
                'absolute inset-x-0 bottom-0 flex flex-col overflow-hidden rounded-t-[32px] dark:border-x dark:border-t dark:border-white/[0.09]',
                tone.sheet
              )}>
              <button
                type="button"
                aria-label={copy.handle}
                aria-expanded={detent === 'full'}
                onKeyDown={onHandleKeyDown}
                onPointerDown={onHandlePointerDown}
                onPointerMove={onHandlePointerMove}
                onPointerUp={onHandlePointerUp}
                onPointerCancel={onHandlePointerUp}
                className={cn(
                  'flex shrink-0 cursor-grab touch-none flex-col rounded-t-[32px] text-start active:cursor-grabbing',
                  canvasFocus
                )}>
                <span aria-hidden="true" className="flex justify-center pt-3">
                  <span className="h-1 w-9 rounded-full bg-black/[0.21] dark:bg-white/[0.24]" />
                </span>
                <span className="flex min-h-14 items-start px-5 py-1.5">
                  <span className="py-2 text-[18px] leading-7 font-semibold">{copy.title}</span>
                </span>
              </button>
              <div aria-hidden="true" className="flex shrink-0 items-center gap-2 px-5 pb-2">
                <span
                  className={cn(
                    'flex h-10 min-w-0 flex-1 items-center gap-2 rounded-xl border px-3 text-[16px] dark:bg-black',
                    tone.card,
                    tone.border,
                    tone.placeholder
                  )}>
                  <Search className="size-4 shrink-0" />
                  {copy.search}
                </span>
                <span className="flex size-10 items-center justify-center" title={copy.filter}>
                  <FilterIcon className="size-5" />
                </span>
              </div>

              <div className="relative min-h-0 flex-1">
                <div
                  ref={list}
                  onScroll={onListScroll}
                  className="h-full overflow-y-auto overscroll-contain pb-[34px] [scrollbar-width:none]">
                  {providers.map((provider, groupIndex) => (
                    <div key={provider.id}>
                      <div
                        ref={(node) => {
                          headers.current[groupIndex] = node
                        }}
                        className={cn(
                          'px-5 pb-1 text-[13px] leading-[18px] font-medium',
                          groupIndex === 0 ? 'pt-1' : 'pt-3',
                          tone.muted
                        )}>
                        {provider.name}
                      </div>
                      {provider.models.map((model) => (
                        <ModelRow
                          key={model.name}
                          copy={copy}
                          provider={provider.id}
                          name={model.name}
                          badges={model.badges}
                          selected={model.name === selected}
                          onSelect={() => setSelected(model.name)}
                        />
                      ))}
                    </div>
                  ))}
                </div>

                <div className="pointer-events-none absolute inset-y-0 right-0 flex w-12 items-center pb-[34px]">
                  <div
                    className="pointer-events-auto relative max-h-[80%] w-full"
                    style={{ height: providers.length * ITEM + RAIL_INSET * 2 }}>
                    <span
                      aria-hidden="true"
                      className="absolute inset-y-0 left-1/2 w-9 -translate-x-1/2 rounded-full border border-white/65 bg-white/45 shadow-sm shadow-black/10 backdrop-blur-xl dark:border-white/[0.09] dark:bg-[#1a1a1a]/55 dark:shadow-black/20"
                    />
                    <div
                      ref={rail}
                      role="toolbar"
                      aria-orientation="vertical"
                      aria-label={`${copy.fastScroll}. ${copy.fastScrollHint}`}
                      onPointerDown={onRailPointerDown}
                      onPointerMove={onRailPointerMove}
                      onPointerUp={() => endRailGesture(true)}
                      onPointerCancel={() => endRailGesture(false)}
                      onScroll={(event) => setRailScroll(event.currentTarget.scrollTop)}
                      className="relative h-full touch-none overflow-y-auto rounded-full py-2 [scrollbar-width:none]">
                      {providers.map((provider, index) => (
                        <div key={provider.id} className="flex h-12 items-center justify-center">
                          <button
                            ref={(node) => {
                              markers.current[index] = node
                            }}
                            type="button"
                            tabIndex={index === active ? 0 : -1}
                            aria-label={`${provider.name}, ${copy.providerMarker}`}
                            aria-current={index === active ? 'true' : undefined}
                            onClick={(event) => {
                              if (event.detail === 0) navigate(index)
                            }}
                            onKeyDown={(event) => onMarkerKeyDown(event, index)}
                            onFocus={(event) => {
                              if (event.currentTarget.matches(':focus-visible')) setPreview({ index, source: 'focus' })
                            }}
                            onBlur={() => setPreview((current) => (current?.source === 'focus' ? null : current))}
                            className={cn(
                              'flex size-8 cursor-pointer items-center justify-center rounded-full transition-[background-color,opacity] duration-150',
                              canvasFocus,
                              index === highlighted ? tone.secondary : 'opacity-80'
                            )}>
                            <span className="flex size-5 overflow-hidden rounded-[5px] ring-1 ring-black/[0.06] dark:ring-white/10">
                              <BrandMark id={provider.id} className="size-full" />
                            </span>
                          </button>
                        </div>
                      ))}
                    </div>
                    {finger !== null && (
                      <m.span
                        aria-hidden="true"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1, top: RAIL_INSET + (finger + 0.5) * ITEM - railScroll - 22 }}
                        transition={spring.tactile}
                        className="pointer-events-none absolute left-1/2 -ml-[22px] size-11 rounded-full bg-black/15 ring-1 ring-black/20 dark:bg-white/20 dark:ring-white/25"
                      />
                    )}
                    <AnimatePresence>
                      {previewProvider && (
                        <m.div
                          key="preview"
                          aria-hidden="true"
                          initial={false}
                          exit={{ opacity: 0, transition: { duration: 0.12 } }}
                          style={{ top: previewTop }}
                          className="pointer-events-none absolute right-16 flex min-h-36 w-38 flex-col items-center justify-center gap-3 rounded-3xl border border-white/65 bg-white/60 px-4 py-5 shadow-md shadow-black/10 backdrop-blur-2xl dark:border-white/[0.09] dark:bg-[#1a1a1a]/65 dark:shadow-black/25">
                          <span className="flex size-12 overflow-hidden rounded-xl ring-1 ring-black/[0.06] dark:ring-white/10">
                            <BrandMark id={previewProvider.id} className="size-full" />
                          </span>
                          <span className="line-clamp-2 w-full text-center text-[18px] leading-7 font-semibold">
                            {previewProvider.name}
                          </span>
                        </m.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </m.div>
          </div>
        }>
        <ChatBackdrop copy={copy} />
      </PhoneFrame>

      <fieldset className="flex flex-wrap items-center justify-center gap-1.5">
        <legend className="sr-only">{copy.detentLabel}</legend>
        <span aria-hidden="true" className="me-1 font-mono text-[11px] text-muted-foreground">
          {copy.detentLabel}
        </span>
        {DETENTS.map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={item === detent}
            onClick={() => setDetent(item)}
            className={cn(
              'cursor-pointer rounded-full border px-3 py-1 font-mono text-[11px] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
              item === detent
                ? 'border-foreground/30 bg-foreground/10 text-foreground'
                : 'border-border text-muted-foreground hover:border-hairline-strong hover:text-foreground'
            )}>
            {copy.detents[item]}
          </button>
        ))}
      </fieldset>
    </div>
  )
}

/** ModelPickerList row: 28pt model art, the name, Free/Vision marks, and the selection mark slot. */
function ModelRow({
  copy,
  provider,
  name,
  badges,
  selected,
  onSelect
}: {
  copy: ModelPickerCopy
  provider: string
  name: string
  badges: PickerBadge[]
  selected: boolean
  onSelect: () => void
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      aria-label={[name, ...badges.map((badge) => copy.badges[badge])].join(', ')}
      onClick={onSelect}
      className={cn(
        'flex min-h-14 w-full cursor-pointer items-center gap-3 py-2.5 ps-5 pe-[64px] text-start transition-colors duration-150 active:bg-black/10 dark:active:bg-white/[0.07]',
        canvasFocus,
        selected && tone.secondary
      )}>
      <span className="flex h-6 w-7 items-center">
        <BrandAvatar id={provider} size={28} />
      </span>
      <span className="min-w-0 flex-1">
        <span className={cn('block truncate text-[16px] leading-6', selected ? 'font-semibold' : 'font-medium')}>
          {name}
        </span>
        {badges.length > 0 && (
          <span aria-hidden="true" className="mt-0.5 flex items-center gap-1">
            {badges.map((badge) =>
              badge === 'free' ? (
                <span
                  key={badge}
                  className="rounded-sm bg-[oklch(0.976_0.029_145.4)] px-[5px] text-[13px] leading-[18px] font-medium text-[oklch(0.518_0.145_147.7)] dark:bg-[oklch(0.231_0.072_149.7)] dark:text-[oklch(0.731_0.216_148.3)]">
                  {copy.freeChip}
                </span>
              ) : (
                <span key={badge} className="flex size-4 items-center justify-center">
                  <Eye className={cn('size-3', tone.tagBlueText)} strokeWidth={2.2} />
                </span>
              )
            )}
          </span>
        )}
      </span>
      <span className="flex size-6 shrink-0 items-center justify-center">
        {selected && (
          <span className="scale-[0.84]">
            <SelectionMark selected />
          </span>
        )}
      </span>
    </button>
  )
}

/** The chat behind the sheet, with the composer in its editing layout where the model pill opened it. */
function ChatBackdrop({ copy }: { copy: ModelPickerCopy }) {
  const provider = copy.providers.find((item) => item.models.some((model) => model.name === copy.selected))?.id ?? ''
  return (
    <div aria-hidden="true" className={cn('relative h-full', tone.chat)}>
      <div className="flex flex-col gap-4 px-4 pt-[122px]">
        <p className={cn('w-fit max-w-[88%] self-end rounded-[18px] px-4 py-[10px]', tone.secondary)}>{copy.prompt}</p>
        <div className="flex items-center gap-2 text-[14px] leading-5">
          <CherryAvatar />
          <span className="font-semibold">{copy.agentName}</span>
          <BrandAvatar id={provider} size={16} />
          <span className={tone.tertiary}>{copy.selected}</span>
        </div>
        <p className="text-[16px] leading-[26px]">{copy.answer}</p>
      </div>
      <ChatHeader agentName={copy.agentName} sidebarLabel={copy.openMenu} newChatLabel={copy.newChat} />
      <div className="absolute inset-x-0 bottom-0 px-4 pb-[38px]">
        <ComposerSurface>
          <p className={cn('min-h-8 py-1 text-[16px] leading-5', tone.placeholder)}>{copy.placeholder}</p>
          <div className="mt-[10px] flex items-center gap-2">
            <ComposerCircle>
              <Plus className="size-[18px]" strokeWidth={1.9} />
            </ComposerCircle>
            <span className={cn('flex h-8 items-center gap-[6px] rounded-full px-[10px]', tone.secondary)}>
              <BrandAvatar id={provider} size={20} />
              <span className="text-[14px] font-semibold">{copy.selected}</span>
            </span>
            <span className="ms-auto">
              <SendSlot state="disabled" />
            </span>
          </div>
        </ComposerSurface>
      </div>
    </div>
  )
}
