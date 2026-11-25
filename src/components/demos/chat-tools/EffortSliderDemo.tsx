import { AnimatePresence, m } from 'framer-motion'
import { ChevronDown, Gauge } from 'lucide-react'
import { type CSSProperties, type KeyboardEvent, type PointerEvent, useRef, useState } from 'react'

import { effortDemo } from '@/content/demos/chatTools'
import { cn } from '@/lib/utils'
import ProviderIcon from '../primitives/ProviderIcon'
import { useDemoLocale } from '../primitives/useDemoLocale'
import { useDemoPlayback, useDemoScript } from '../primitives/useDemoScript'

const START_INDEX = 1
const THUMB = 18
// Mobile effortSliderMagnetRadius: half a gap, pulled in on a smoothstep.
const MAGNET_RADIUS = 0.5
// Desktop ModelSpeedControl.css peak splash: per-droplet offsets and sizes.
const DROPLETS = [
  { x: 17, y: -21, size: 4 },
  { x: 25, y: -9, size: 3 },
  { x: 22, y: 10, size: 4 },
  { x: 10, y: 22, size: 3 },
  { x: -6, y: -24, size: 2 }
]
const SPARKLE_DOT = 'color-mix(in oklab, white 96%, var(--primary))'
const sparkleStyle = {
  backgroundImage: `radial-gradient(circle, ${SPARKLE_DOT} 0 0.7px, transparent 1.2px), radial-gradient(circle, ${SPARKLE_DOT} 0 0.5px, transparent 1px)`,
  backgroundSize: '43px 13px, 67px 17px',
  backgroundPosition: '0 2px, 19px 8px'
}

const clamp01 = (value: number) => Math.min(1, Math.max(0, value))

/** Mobile effortSliderMath.magnetize: drag positions near a stop are pulled toward it. */
function magnetize(fraction: number, stops: number) {
  const value = clamp01(fraction) * (stops - 1)
  const nearest = Math.round(value)
  const delta = value - nearest
  const distance = Math.abs(delta)
  if (distance < 0.001 || distance > MAGNET_RADIUS) return clamp01(fraction)
  const t = 1 - distance / MAGNET_RADIUS
  return clamp01((value - delta * t * t * (3 - 2 * t)) / (stops - 1))
}

const labelVariants = {
  enter: (direction: number) => ({ y: direction >= 0 ? '100%' : '-100%', opacity: 0 }),
  center: { y: 0, opacity: 1 },
  exit: (direction: number) => ({ y: direction >= 0 ? '-100%' : '100%', opacity: 0 })
}

export default function EffortSliderDemo() {
  const { locale } = useDemoLocale()
  const copy = effortDemo[locale]
  const stops = copy.levels.length
  const peak = stops - 1
  const ref = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const playing = useDemoPlayback(ref)
  const userRef = useRef(false)
  const [index, setIndex] = useState(START_INDEX)
  const [position, setPosition] = useState(START_INDEX / peak)
  const [dragging, setDragging] = useState(false)
  const [direction, setDirection] = useState(1)
  const [burst, setBurst] = useState(0)
  const indexRef = useRef(index)

  const commit = (next: number) => {
    const previous = indexRef.current
    if (next === previous) return
    indexRef.current = next
    setDirection(next > previous ? 1 : -1)
    if (next === peak) setBurst((value) => value + 1)
    setIndex(next)
  }

  const seek = (raw: number) => {
    setPosition(magnetize(raw, stops))
    commit(Math.round(clamp01(raw) * peak))
  }

  const settle = (next: number) => {
    commit(next)
    setPosition(next / peak)
  }

  useDemoScript(async ({ wait, reduced }) => {
    if (reduced) {
      settle(peak)
      return
    }
    await wait(700)
    const from = indexRef.current / peak
    const steps = 46
    for (let step = 1; step <= steps; step++) {
      if (userRef.current) return
      if (step === 1) setDragging(true)
      const t = step / steps
      seek(from + (1 - from) * (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2))
      await wait(22)
    }
    if (userRef.current) return
    setDragging(false)
    settle(peak)
  }, playing)

  const fractionAt = (clientX: number) => {
    const rect = trackRef.current!.getBoundingClientRect()
    return clamp01((clientX - rect.left - THUMB / 2) / (rect.width - THUMB))
  }

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return
    userRef.current = true
    event.currentTarget.setPointerCapture(event.pointerId)
    setDragging(true)
    seek(fractionAt(event.clientX))
  }

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (dragging && event.currentTarget.hasPointerCapture(event.pointerId)) seek(fractionAt(event.clientX))
  }

  const release = () => {
    if (!dragging) return
    setDragging(false)
    settle(Math.round(position * peak))
  }

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const keys: Record<string, number> = {
      ArrowRight: index + 1,
      ArrowUp: index + 1,
      ArrowLeft: index - 1,
      ArrowDown: index - 1,
      Home: 0,
      End: peak
    }
    if (!(event.key in keys)) return
    event.preventDefault()
    userRef.current = true
    setDragging(false)
    settle(Math.min(peak, Math.max(0, keys[event.key])))
  }

  const isPeak = index === peak
  const fill = `calc(${position} * (100% - ${THUMB}px) + ${THUMB}px)`

  return (
    <div ref={ref} role="region" aria-label={copy.region} className="glass-card min-w-0 rounded-xl">
      <div className="flex h-[220px] flex-col px-4 pt-3.5 pb-4 sm:px-5">
        <div className="flex items-center justify-between gap-3">
          <span className="font-mono text-[10px] tracking-wider text-muted-foreground uppercase">{copy.title}</span>
          <span
            aria-hidden="true"
            className="inline-flex h-7 items-center gap-1 rounded-md px-1.5 text-xs text-muted-foreground">
            <ProviderIcon id="anthropic" className="size-3.5" />
            <span className="truncate">{copy.model}</span>
            <span className="mx-1 h-3 w-px bg-border" />
            <Gauge className="size-3.5 shrink-0" />
            <span className="text-foreground">{copy.levels[index]}</span>
            <ChevronDown className="size-3 shrink-0" />
          </span>
        </div>

        <div className="float-card mt-auto rounded-lg p-3 text-xs">
          <div className="flex min-h-7 items-center gap-3">
            <div className="flex min-w-0 items-baseline gap-1.5">
              <span className="shrink-0 text-muted-foreground">{copy.effort}:</span>
              <span className="relative inline-grid h-4 overflow-hidden font-medium leading-4 text-foreground">
                <AnimatePresence initial={false} custom={direction}>
                  <m.span
                    key={index}
                    custom={direction}
                    variants={labelVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                    className="col-start-1 row-start-1 whitespace-nowrap">
                    {copy.levels[index]}
                  </m.span>
                </AnimatePresence>
              </span>
            </div>
            {index !== 0 && (
              <button
                type="button"
                onClick={() => {
                  userRef.current = true
                  setDragging(false)
                  settle(0)
                }}
                className="ml-auto h-6 cursor-pointer rounded-md bg-muted/60 px-2 text-[11px] text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                {copy.off}
              </button>
            )}
          </div>

          <div className="mt-2.5">
            <div className="flex items-center justify-between text-[11px] leading-none font-medium" aria-hidden="true">
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
              aria-valuenow={index}
              aria-valuetext={copy.levels[index]}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={release}
              onPointerCancel={release}
              onLostPointerCapture={release}
              onKeyDown={onKeyDown}
              className="group relative mt-1.5 flex h-7 cursor-pointer touch-none items-center rounded-full select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
              <div className="relative h-4 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className={cn(
                    'absolute inset-y-0 left-0 overflow-hidden rounded-full bg-primary motion-reduce:transition-none',
                    !dragging && 'transition-[width] duration-200 ease-[cubic-bezier(0.33,1,0.68,1)]'
                  )}
                  style={{ width: fill }}>
                  <span
                    className={cn(
                      'absolute inset-0 bg-linear-to-r from-primary to-violet transition-opacity duration-240 ease-out motion-reduce:transition-none',
                      isPeak ? 'opacity-100' : 'opacity-0'
                    )}
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

              <div className="pointer-events-none absolute inset-x-[9px] top-1/2 h-0" aria-hidden="true">
                {copy.levels.map((level, stop) => (
                  <span
                    key={level}
                    className={cn(
                      'absolute size-1 -translate-x-1/2 -translate-y-1/2 rounded-full transition-opacity duration-100 motion-reduce:transition-none',
                      stop / peak <= position ? 'bg-primary-foreground/55' : 'bg-muted-foreground/45',
                      stop === index && 'opacity-0'
                    )}
                    style={{ left: `${(stop / peak) * 100}%` }}
                  />
                ))}
              </div>

              <span
                aria-hidden="true"
                className={cn(
                  'pointer-events-none absolute top-1/2 z-20 size-[18px] -translate-y-1/2 rounded-full bg-popover shadow-[0_1px_3px_rgb(0_0_0/0.3)] dark:bg-foreground motion-reduce:transition-none',
                  dragging
                    ? 'scale-110 transition-[scale] duration-150'
                    : 'transition-[left,scale] duration-200 ease-[cubic-bezier(0.33,1,0.68,1)]'
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
                      className="absolute rounded-full bg-violet opacity-0 motion-safe:animate-splash"
                      style={
                        {
                          width: droplet.size,
                          height: droplet.size,
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

        <p className="mt-2.5 text-center font-mono text-[10px] text-muted-foreground/80">{copy.hint}</p>
      </div>
    </div>
  )
}
