import { AnimatePresence, animate, m, useMotionValue, useReducedMotion } from 'framer-motion'
import { Brain, Check, ChevronDown, Eye, Globe, Menu, Search, SquarePen, Wrench } from 'lucide-react'
import {
  type KeyboardEvent,
  type PointerEvent as ReactPointerEvent,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState
} from 'react'

import { type ModelCapability, modelPickerDemo, type SheetDetent } from '@/content/demos/mobile'
import { spring } from '@/lib/motion'
import { cn } from '@/lib/utils'
import ProviderIcon from '../primitives/ProviderIcon'
import { useDemoLocale } from '../primitives/useDemoLocale'
import { useDemoPlayback, useDemoScript } from '../primitives/useDemoScript'
import PhoneFrame from './PhoneFrame'

// BottomSheet sizes: compact/medium/large resolve to 40/60/80% of the available height, full to all of it.
const DETENTS: SheetDetent[] = ['compact', 'medium', 'large', 'full']
const FRACTION: Record<SheetDetent, number> = { compact: 0.4, medium: 0.6, large: 0.8, full: 1 }
// ModelPickerFastScroller: 8pt rail inset, 48pt targets, 500ms long press before a drag scrubs.
const RAIL_INSET = 8
const ITEM = 48
const LONG_PRESS = 500
const PREVIEW_HEIGHT = 144

const capIcons: Record<ModelCapability, typeof Eye> = { vision: Eye, reasoning: Brain, tools: Wrench, web: Globe }
const capColors: Record<ModelCapability, string> = {
  vision: 'text-cap-vision',
  reasoning: 'text-cap-reasoning',
  tools: 'text-cap-tools',
  web: 'text-cap-web'
}

type PreviewSource = 'pointer' | 'focus' | 'script'

interface Gesture {
  startY: number
  startScroll: number
  mode: 'press' | 'scroll' | 'scrub'
  index: number
  timer: ReturnType<typeof setTimeout>
}

export default function ModelPickerScrollerDemo() {
  const { locale } = useDemoLocale()
  const copy = modelPickerDemo[locale]
  const providers = copy.providers
  const reduced = useReducedMotion() ?? false
  const ref = useRef<HTMLDivElement>(null)
  const playing = useDemoPlayback(ref)

  const area = useRef<HTMLDivElement>(null)
  const list = useRef<HTMLDivElement>(null)
  const rail = useRef<HTMLDivElement>(null)
  const headers = useRef<(HTMLDivElement | null)[]>([])
  const markers = useRef<(HTMLButtonElement | null)[]>([])
  const gesture = useRef<Gesture | null>(null)
  const navigating = useRef<ReturnType<typeof setTimeout> | null>(null)

  const [available, setAvailable] = useState(0)
  const [detent, setDetent] = useState<SheetDetent>('medium')
  const sheetHeight = useMotionValue(0)
  const [active, setActive] = useState(0)
  const [preview, setPreview] = useState<{ index: number; source: PreviewSource } | null>(null)
  const [finger, setFinger] = useState<number | null>(null)
  const [railScroll, setRailScroll] = useState(0)
  const [selected, setSelected] = useState(copy.selected)

  useLayoutEffect(() => {
    const node = area.current
    if (!node) return
    const observer = new ResizeObserver(() => setAvailable(node.clientHeight))
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!available) return
    const target = available * FRACTION[detent]
    if (reduced || sheetHeight.get() === 0) {
      sheetHeight.set(target)
      return
    }
    const controls = animate(sheetHeight, target, spring.settle)
    return () => controls.stop()
  }, [available, detent, reduced, sheetHeight])

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
    const y = clientY - node.getBoundingClientRect().top + node.scrollTop - RAIL_INSET
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
    const dy = event.clientY - current.startY
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
    const index = DETENTS.indexOf(detent)
    if (event.key === 'ArrowUp') setDetent(DETENTS[Math.min(DETENTS.length - 1, index + 1)])
    else if (event.key === 'ArrowDown') setDetent(DETENTS[Math.max(0, index - 1)])
    else if (event.key === 'Enter' || event.key === ' ') setDetent(DETENTS[(index + 1) % DETENTS.length])
    else return
    event.preventDefault()
  }

  const drag = useRef<{
    startY: number
    startHeight: number
    lastY: number
    lastTime: number
    velocity: number
  } | null>(null)

  const onHandlePointerDown = (event: ReactPointerEvent<HTMLButtonElement>) => {
    if (event.button !== 0) return
    event.currentTarget.setPointerCapture(event.pointerId)
    const now = performance.now()
    drag.current = {
      startY: event.clientY,
      startHeight: sheetHeight.get(),
      lastY: event.clientY,
      lastTime: now,
      velocity: 0
    }
  }

  const onHandlePointerMove = (event: ReactPointerEvent<HTMLButtonElement>) => {
    const current = drag.current
    if (!current || !available) return
    const now = performance.now()
    current.velocity = (event.clientY - current.lastY) / Math.max(1, now - current.lastTime)
    current.lastY = event.clientY
    current.lastTime = now
    const raw = current.startHeight - (event.clientY - current.startY)
    const min = available * FRACTION.compact
    // Rubber-band past the smallest and largest detents instead of stopping dead.
    const height = raw > available ? available + (raw - available) * 0.2 : raw < min ? min - (min - raw) * 0.3 : raw
    sheetHeight.set(height)
  }

  const onHandlePointerUp = () => {
    const current = drag.current
    drag.current = null
    if (!current || !available || Math.abs(current.lastY - current.startY) < 3) return
    // Project the release velocity forward so a flick reaches the next detent.
    const projected = sheetHeight.get() - current.velocity * 180
    const nearest = DETENTS.reduce((best, item) =>
      Math.abs(available * FRACTION[item] - projected) < Math.abs(available * FRACTION[best] - projected) ? item : best
    )
    if (nearest === detent) {
      animate(sheetHeight, available * FRACTION[nearest], { ...spring.settle, velocity: -current.velocity * 1000 })
    }
    setDetent(nearest)
  }

  const { replay } = useDemoScript(async ({ wait, reduced: still }) => {
    if (still) return
    setDetent('medium')
    list.current?.scrollTo({ top: 0 })
    setActive(0)
    await wait(700)
    setDetent('large')
    await wait(900)
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
            <div ref={area} className="absolute inset-x-0 top-11 bottom-0">
              <m.div
                style={{ height: sheetHeight }}
                className="absolute inset-x-0 bottom-0 flex flex-col overflow-hidden rounded-t-[32px] border-t border-black/[0.04] bg-white shadow-[0_-12px_40px_-20px_rgb(0_0_0/0.35)] dark:border-white/10 dark:bg-[#1c1c1e]">
                <button
                  type="button"
                  aria-label={copy.handle}
                  onKeyDown={onHandleKeyDown}
                  onPointerDown={onHandlePointerDown}
                  onPointerMove={onHandlePointerMove}
                  onPointerUp={onHandlePointerUp}
                  onPointerCancel={onHandlePointerUp}
                  className="flex shrink-0 cursor-grab touch-none flex-col items-center rounded-t-[32px] pt-2 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary active:cursor-grabbing">
                  <span aria-hidden="true" className="h-1 w-9 rounded-full bg-black/20 dark:bg-white/25" />
                  <span className="flex h-11 items-center text-[17px] font-semibold">{copy.title}</span>
                </button>
                <div aria-hidden="true" className="shrink-0 px-5 pb-2">
                  <span className="flex h-10 items-center gap-2 rounded-full bg-black/[0.05] px-3.5 text-[15px] text-muted-foreground dark:bg-white/10">
                    <Search className="size-4" />
                    {copy.search}
                  </span>
                </div>

                <div className="relative min-h-0 flex-1">
                  <div
                    ref={list}
                    onScroll={onListScroll}
                    className="h-full overflow-y-auto overscroll-contain pb-8 [scrollbar-width:none]">
                    {providers.map((provider, groupIndex) => (
                      <div key={provider.id}>
                        <div
                          ref={(node) => {
                            headers.current[groupIndex] = node
                          }}
                          className="flex h-9 items-end px-5 pb-1.5 text-[13px] font-medium text-muted-foreground">
                          {provider.name}
                        </div>
                        {provider.models.map((model) => {
                          const isSelected = model.name === selected
                          return (
                            <button
                              key={model.name}
                              type="button"
                              aria-pressed={isSelected}
                              onClick={() => setSelected(model.name)}
                              className={cn(
                                'flex w-full cursor-pointer items-start gap-3 py-2.5 ps-5 pe-[60px] text-start transition-colors duration-150 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary',
                                isSelected
                                  ? 'bg-black/[0.05] dark:bg-white/[0.08]'
                                  : 'hover:bg-black/[0.03] dark:hover:bg-white/[0.04]'
                              )}>
                              <span className="mt-px flex size-6 shrink-0 items-center justify-center rounded-full bg-white ring-1 ring-black/[0.06] dark:bg-white/10 dark:ring-white/10">
                                <ProviderIcon id={provider.id} className="size-3.5" />
                              </span>
                              <span className="min-w-0 flex-1">
                                <span
                                  className={cn('block truncate text-[15px] leading-6', isSelected && 'font-semibold')}>
                                  {model.name}
                                </span>
                                <span className="sr-only">
                                  {model.caps.map((cap) => copy.capabilities[cap]).join(', ')}
                                </span>
                                <span className="mt-0.5 flex gap-1.5">
                                  {model.caps.map((cap) => {
                                    const Icon = capIcons[cap]
                                    return (
                                      <Icon key={cap} className={cn('size-3', capColors[cap])} aria-hidden="true" />
                                    )
                                  })}
                                </span>
                              </span>
                              <span className="flex h-6 w-4 shrink-0 items-center">
                                {isSelected && <Check className="size-4" aria-hidden="true" />}
                              </span>
                            </button>
                          )
                        })}
                      </div>
                    ))}
                  </div>

                  <div className="pointer-events-none absolute inset-y-0 right-0 flex w-12 items-center pb-6">
                    <div
                      className="pointer-events-auto relative w-full max-h-[80%]"
                      style={{ height: providers.length * ITEM + RAIL_INSET * 2 }}>
                      <span
                        aria-hidden="true"
                        className="absolute inset-y-0 left-1/2 w-9 -translate-x-1/2 rounded-full border border-white/65 bg-white/60 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.07]"
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
                                if (event.currentTarget.matches(':focus-visible'))
                                  setPreview({ index, source: 'focus' })
                              }}
                              onBlur={() => setPreview((current) => (current?.source === 'focus' ? null : current))}
                              className={cn(
                                'flex size-8 cursor-pointer items-center justify-center rounded-full transition-[background-color,opacity] duration-150 focus-visible:outline-2 focus-visible:outline-primary',
                                index === highlighted ? 'bg-black/[0.07] dark:bg-white/15' : 'opacity-80'
                              )}>
                              <ProviderIcon id={provider.id} className="size-5 rounded-sm" />
                            </button>
                          </div>
                        ))}
                      </div>
                      {finger !== null && (
                        <m.span
                          aria-hidden="true"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1, top: RAIL_INSET + (finger + 0.5) * ITEM - railScroll - 18 }}
                          transition={spring.tactile}
                          className="pointer-events-none absolute left-1/2 -ml-[18px] size-9 rounded-full bg-foreground/15 ring-1 ring-foreground/20"
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
                            className="pointer-events-none absolute right-16 flex min-h-36 w-[152px] flex-col items-center justify-center gap-3 rounded-3xl border border-white/65 bg-white/75 px-4 py-5 shadow-md shadow-black/10 backdrop-blur-2xl dark:border-white/10 dark:bg-[#2c2c2e]/80 dark:shadow-black/25">
                            <span className="flex size-12 items-center justify-center rounded-xl bg-white ring-1 ring-black/[0.06] dark:bg-white/10 dark:ring-white/10">
                              <ProviderIcon id={previewProvider.id} className="size-7" />
                            </span>
                            <span className="line-clamp-2 w-full text-center text-[18px] leading-6 font-semibold">
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
          </div>
        }>
        <div aria-hidden="true" className="flex h-full flex-col">
          <div className="flex h-11 items-center justify-between px-4">
            <Menu className="size-5" />
            <span className="inline-flex items-center gap-1.5 text-[14px] font-medium">
              {copy.chatTitle}
              <ChevronDown className="size-3.5 text-muted-foreground" />
            </span>
            <SquarePen className="size-5" />
          </div>
          <div className="flex flex-1 flex-col justify-end gap-3 px-4 pb-24">
            <span className="ms-auto h-10 w-2/3 rounded-[20px] bg-white dark:bg-[#1c1c1e]" />
            <span className="h-3 w-5/6 rounded-full bg-foreground/10" />
            <span className="h-3 w-3/4 rounded-full bg-foreground/10" />
          </div>
        </div>
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
                ? 'border-primary/40 bg-primary/10 text-foreground'
                : 'border-border text-muted-foreground hover:border-hairline-strong hover:text-foreground'
            )}>
            {copy.detents[item]}
          </button>
        ))}
      </fieldset>
    </div>
  )
}
