import { ArrowUp, ChevronDown, Gauge, Plus } from 'lucide-react'
import { type CSSProperties, type KeyboardEvent, type PointerEvent, useRef, useState } from 'react'

import { effortDemo } from '@/content/demos/chatTools'
import { cn } from '@/lib/utils'
import { useDemoLocale } from '../primitives/useDemoLocale'
import { useDemoPlayback, useDemoScript } from '../primitives/useDemoScript'

// Desktop ModelSpeedControl: the slider starts on Medium and the peak is the last declared effort.
const START_INDEX = 2
const THUMB = 18
// Desktop ModelSpeedControl.css peak splash: per-droplet offsets and sizes.
const DROPLETS = [
  { x: 17, y: -21, size: 4 },
  { x: 25, y: -9, size: 3 },
  { x: 22, y: 10, size: 4 },
  { x: 10, y: 22, size: 3 },
  { x: -6, y: -24, size: 2 }
]
// The site's primary is monochrome, so the peak uses fixed hues ending at the app's hue-300 shift.
const PEAK_START = 'oklch(0.6 0.17 255)'
const PEAK_HUE = 'oklch(0.68 0.2 300)'
const SPARKLE_DOT = 'oklch(0.98 0.01 280)'
const sparkleStyle = {
  backgroundImage: `radial-gradient(circle, ${SPARKLE_DOT} 0 0.7px, transparent 1.2px), radial-gradient(circle, ${SPARKLE_DOT} 0 0.5px, transparent 1px)`,
  backgroundSize: '43px 13px, 67px 17px',
  backgroundPosition: '0 2px, 19px 8px'
}
// @cherrystudio/ui Slider snapOnRelease: range and thumb settle over 250ms.
const SNAP = 'duration-250 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none'
const CHIP =
  'h-6 cursor-pointer rounded-md bg-muted/60 px-2 text-[11px] text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'

const clamp01 = (value: number) => Math.min(1, Math.max(0, value))

export default function EffortSliderDemo() {
  const { locale } = useDemoLocale()
  const copy = effortDemo[locale]
  const stops = copy.levels.length
  const peak = stops - 1
  const ref = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const playing = useDemoPlayback(ref)
  const userRef = useRef(false)
  const [open, setOpen] = useState(true)
  // null is provider Default: Opus 4.8 declares no default effort, so the thumb rests on the first stop.
  const [selected, setSelected] = useState<number | null>(START_INDEX)
  const [position, setPosition] = useState(START_INDEX / peak)
  const [dragging, setDragging] = useState(false)
  const [burst, setBurst] = useState(0)
  const selectedRef = useRef(selected)

  const choose = (next: number | null) => {
    const previous = selectedRef.current
    if (next === previous) return
    selectedRef.current = next
    if (next === peak) setBurst((value) => value + 1)
    setSelected(next)
  }

  const track = (raw: number) => {
    setPosition(clamp01(raw))
    choose(Math.round(clamp01(raw) * peak))
  }

  const settle = (next: number | null) => {
    choose(next)
    setPosition((next ?? 0) / peak)
  }

  const takeOver = () => {
    userRef.current = true
    setDragging(false)
  }

  useDemoScript(async ({ wait, reduced }) => {
    if (reduced) {
      settle(peak)
      return
    }
    await wait(700)
    const from = (selectedRef.current ?? 0) / peak
    const steps = 46
    for (let step = 1; step <= steps; step++) {
      if (userRef.current) return
      if (step === 1) setDragging(true)
      const t = step / steps
      track(from + (1 - from) * (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2))
      await wait(22)
    }
    if (userRef.current) return
    setDragging(false)
    settle(peak)
  }, playing && open)

  const fractionAt = (clientX: number) => {
    const rect = trackRef.current!.getBoundingClientRect()
    return clamp01((clientX - rect.left - THUMB / 2) / (rect.width - THUMB))
  }

  // A press jumps to the nearest stop; only a drag tracks the pointer continuously.
  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return
    takeOver()
    event.currentTarget.setPointerCapture(event.pointerId)
    settle(Math.round(fractionAt(event.clientX) * peak))
  }

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!event.currentTarget.hasPointerCapture(event.pointerId)) return
    setDragging(true)
    track(fractionAt(event.clientX))
  }

  const release = () => {
    if (!dragging) return
    setDragging(false)
    settle(Math.round(position * peak))
  }

  const current = selected ?? 0
  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const keys: Record<string, number> = {
      ArrowRight: current + 1,
      ArrowUp: current + 1,
      ArrowLeft: current - 1,
      ArrowDown: current - 1,
      Home: 0,
      End: peak
    }
    if (!(event.key in keys)) return
    event.preventDefault()
    takeOver()
    settle(Math.min(peak, Math.max(0, keys[event.key])))
  }

  const label = selected === null ? copy.default : copy.levels[selected]
  const isPeak = selected === peak

  return (
    <div ref={ref} role="region" aria-label={copy.region} className="glass-card min-w-0 rounded-xl">
      <div className="flex h-[264px] flex-col px-3 pt-3 pb-3 sm:px-4">
        <p className="font-mono text-[10px] tracking-wider text-muted-foreground/80 uppercase">{copy.hint}</p>

        {open && (
          <div className="mt-auto mb-2 flex justify-end sm:pr-[34px]">
            <div className="w-72 max-w-full rounded-lg border-[0.5px] border-border bg-popover p-3 text-xs text-popover-foreground shadow-xl motion-safe:animate-in motion-safe:fade-in-0 motion-safe:zoom-in-95 motion-safe:slide-in-from-bottom-2">
              <div className="flex min-h-7 items-center gap-3">
                <div className="flex min-w-0 items-baseline gap-1.5">
                  <span className="shrink-0 text-muted-foreground">{copy.effort}:</span>
                  <span aria-live="polite" className="truncate font-medium text-foreground">
                    {label}
                  </span>
                </div>
                <div className="ml-auto flex shrink-0 items-center gap-0.5">
                  {selected !== null && (
                    <button
                      type="button"
                      onClick={() => {
                        takeOver()
                        settle(null)
                      }}
                      className={CHIP}>
                      {copy.default}
                    </button>
                  )}
                  {selected !== 0 && (
                    <button
                      type="button"
                      onClick={() => {
                        takeOver()
                        settle(0)
                      }}
                      className={CHIP}>
                      {copy.off}
                    </button>
                  )}
                </div>
              </div>

              <div className="mt-2.5">
                <div
                  className="flex items-center justify-between text-[11px] leading-none font-medium"
                  aria-hidden="true">
                  <span className="text-muted-foreground">{copy.faster}</span>
                  <span className="text-primary">{copy.smarter}</span>
                </div>
                <div
                  ref={trackRef}
                  role="slider"
                  tabIndex={0}
                  aria-label={copy.effort}
                  aria-valuemin={0}
                  aria-valuemax={peak}
                  aria-valuenow={current}
                  aria-valuetext={label}
                  onPointerDown={onPointerDown}
                  onPointerMove={onPointerMove}
                  onPointerUp={release}
                  onPointerCancel={release}
                  onLostPointerCapture={release}
                  onKeyDown={onKeyDown}
                  className="relative mt-1.5 flex h-7 cursor-pointer touch-none items-center rounded-full select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                  <div className="relative h-4 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className={cn('absolute inset-y-0 left-0 bg-primary', !dragging && `transition-[width] ${SNAP}`)}
                      style={{ width: `${position * 100}%` }}>
                      <span
                        className={cn(
                          'absolute inset-0 transition-opacity duration-240 ease-out motion-reduce:transition-none',
                          isPeak ? 'opacity-100' : 'opacity-0'
                        )}
                        style={{ backgroundImage: `linear-gradient(90deg, ${PEAK_START}, ${PEAK_HUE})` }}
                      />
                      <span
                        className={cn(
                          'absolute inset-0 transition-opacity duration-240 ease-out motion-reduce:opacity-0',
                          isPeak ? 'opacity-45 motion-safe:animate-sparkle' : 'opacity-0'
                        )}
                        style={sparkleStyle}
                      />
                    </div>
                  </div>

                  <div className="pointer-events-none absolute inset-x-[9px] top-1/2 z-10 h-0" aria-hidden="true">
                    {copy.levels.map((level, stop) => (
                      <span
                        key={level}
                        className={cn(
                          'absolute size-0.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-background transition-opacity duration-100 motion-reduce:transition-none',
                          stop === current && 'opacity-0'
                        )}
                        style={{ left: `${(stop / peak) * 100}%` }}
                      />
                    ))}
                  </div>

                  <span
                    aria-hidden="true"
                    className={cn(
                      'pointer-events-none absolute top-1/2 z-20 size-[18px] -translate-y-1/2 rounded-full bg-popover shadow-xs motion-reduce:transition-none',
                      dragging ? 'scale-110 transition-[scale] duration-150' : `transition-[left,scale] ${SNAP}`
                    )}
                    style={{ left: `calc(${position} * (100% - ${THUMB}px))` }}
                  />

                  {isPeak && burst > 0 && (
                    <span
                      key={burst}
                      aria-hidden="true"
                      className="pointer-events-none absolute top-1/2 right-[9px] z-30 motion-reduce:hidden">
                      {DROPLETS.map((droplet, drop) => (
                        <span
                          key={drop}
                          className="absolute rounded-full opacity-0 motion-safe:animate-splash"
                          style={
                            {
                              width: droplet.size,
                              height: droplet.size,
                              background: PEAK_HUE,
                              '--droplet-x': `${droplet.x}px`,
                              '--droplet-y': `${droplet.y}px`
                            } as CSSProperties
                          }
                        />
                      ))}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        <div
          className={cn('rounded-[20px] border-[0.5px] border-border bg-composer pt-2 shadow-sm', !open && 'mt-auto')}>
          <p className="truncate px-3.5 py-1 text-sm leading-6 text-muted-foreground" aria-hidden="true">
            {copy.placeholder}
          </p>
          <div className="flex h-10 items-center justify-between gap-4 px-2 py-1.25">
            <span
              aria-hidden="true"
              title={copy.toolMenu}
              className="flex size-[30px] shrink-0 items-center justify-center rounded-full text-muted-foreground dark:text-foreground">
              <Plus className="size-[18px]" />
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                aria-label={copy.title}
                aria-expanded={open}
                onClick={() => {
                  takeOver()
                  setOpen((value) => !value)
                  if (!open) setBurst(0)
                }}
                className={cn(
                  'inline-flex h-7 cursor-pointer items-center gap-1 rounded-md px-1.5 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary dark:text-foreground',
                  open && 'bg-accent'
                )}>
                <Gauge className="size-3.5 shrink-0" aria-hidden="true" />
                <span>{label}</span>
                <ChevronDown
                  className="size-[13px] shrink-0 text-muted-foreground dark:text-current"
                  aria-hidden="true"
                />
              </button>
              <span
                aria-hidden="true"
                title={copy.send}
                className="mt-px mr-0.5 flex size-[22px] items-center justify-center rounded-full bg-foreground/25">
                <ArrowUp className="size-3.5 text-composer" strokeWidth={2.5} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
