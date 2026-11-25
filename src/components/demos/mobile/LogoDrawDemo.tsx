import {
  type AnimationPlaybackControls,
  animate,
  type MotionValue,
  m,
  useMotionValue,
  useMotionValueEvent,
  useTransform
} from 'framer-motion'
import { useEffect, useId, useRef, useState } from 'react'

import { logoDrawDemo } from '@/content/demos/mobile'
import { cn } from '@/lib/utils'
import { useDemoLocale } from '../primitives/useDemoLocale'
import { useDemoPlayback, useDemoScript } from '../primitives/useDemoScript'
import PhoneFrame from './PhoneFrame'

// Fill outlines and the reconstructed pen centerlines from the mobile onboarding LogoDraw (utils/logoPaths.ts).
const SWIRL_LEFT_FILL =
  'M16.72,51.21c-4.45,0-8.64-1.78-11.81-5.01-3.17-3.23-4.91-7.51-4.91-12.04s1.74-8.81,4.91-12.04,7.36-5.01,11.81-5.01,8.71,1.82,11.82,4.99c2.32,2.36,2.32,6.2,0,8.56-2.32,2.36-6.08,2.36-8.4,0-.9-.92-2.15-1.45-3.43-1.45-2.63,0-4.85,2.26-4.85,4.94s2.22,4.94,4.85,4.94c1.28,0,2.52-.53,3.43-1.45,2.32-2.36,6.08-2.36,8.4,0,2.32,2.36,2.32,6.2,0,8.56-3.11,3.17-7.42,4.99-11.82,4.99Z'
const SWIRL_RIGHT_FILL =
  'M32.05,66.73c-4.45,0-8.64-1.78-11.81-5.01s-4.91-7.51-4.91-12.04,1.79-8.88,4.9-12.06c2.32-2.36,6.08-2.36,8.4,0,2.32,2.36,2.32,6.2,0,8.56-.9.92-1.42,2.19-1.42,3.49,0,2.68,2.22,4.94,4.85,4.94s4.85-2.26,4.85-4.94c0-.95-.23-2.31-1.32-3.43-3.13-3.19-4.92-7.6-4.92-12.09s1.74-8.81,4.91-12.04,7.36-5.01,11.81-5.01,8.64,1.78,11.81,5.01,4.91,7.51,4.91,12.04-1.79,8.88-4.9,12.06c-2.32,2.36-6.08,2.36-8.4,0-2.32-2.36-2.32-6.2,0-8.56.9-.92,1.42-2.19,1.42-3.49,0-2.68-2.22-4.94-4.85-4.94s-4.85,2.26-4.85,4.94c0,1.31.53,2.6,1.45,3.53,3.1,3.16,4.8,7.42,4.8,11.99s-1.74,8.81-4.91,12.04c-3.17,3.23-7.36,5.01-11.81,5.01Z'
const CHECK_FILL =
  'M32.05,19.09l-9.72-9.12c-1.5-1.4-1.57-3.75-.17-5.25,1.4-1.49,3.75-1.57,5.25-.17l3.89,3.65,5.53-6.83c1.29-1.59,3.63-1.84,5.22-.55,1.59,1.29,1.84,3.63.55,5.22l-10.56,13.05Z'
const SWIRL_LEFT_CENTERLINE =
  'M 28.54 26.38 L 25.99 28.06 A 11.1 11.1 0 0 0 13.53 23.53 A 11.1 11.1 0 0 0 5.62 34.16 A 11.1 11.1 0 0 0 13.53 44.79 A 11.1 11.1 0 0 0 25.99 40.26 L 28.54 41.92'
const SWIRL_RIGHT_CENTERLINE =
  'M 25.06 41.05 A 11.1 11.1 0 0 0 22.07 54.55 A 11.1 11.1 0 0 0 34.55 60.5 A 11.1 11.1 0 0 0 43.15 49.68 C 43.15 44.18 36.29 39.65 36.29 34.15 A 11.1 11.1 0 0 1 44.55 23.42 A 11.1 11.1 0 0 1 57.04 28.67 A 11.1 11.1 0 0 1 55.16 42.08 L 50.81 41.93'
const CHECK_CENTERLINE = 'M 24.87 7.26 L 31.68 13.65 L 39.72 3.71'
const CHECK_PIVOT = { x: 32.3, y: 9.3 }

// Brand artwork colors (logoPalette.ts); they intentionally ignore the theme.
const SWIRL_COLOR = '#ea5e5d'
const CHECK_COLOR = '#23af69'

const INSET = 0.5
const VIEW_WIDTH = 64.44 + 2 * INSET
const VIEW_HEIGHT = 66.73 + 2 * INSET

// LOGO_DRAW_SEGMENTS: the [0.8, 0.84] gap is the beat before the check lands.
const SEGMENTS = { left: [0, 0.3], right: [0.3, 0.8], check: [0.84, 1] } as const
const segment = (progress: number, [from, to]: readonly [number, number]) =>
  Math.min(1, Math.max(0, (progress - from) / (to - from)))
// Easing.inOut(Easing.cubic) over 1300ms, then the check spring {damping: 14, stiffness: 180}.
const inOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2)
const drawTiming = { duration: 1.3, ease: inOutCubic }
const checkSpring = { type: 'spring', damping: 14, stiffness: 180, mass: 1 } as const

interface LogoDrawDemoProps {
  /** Rendered logo height in px; width follows the logo's aspect ratio. */
  size?: number
  /** Only the drawing, without the phone or controls (e.g. decorative use on a 404 page). */
  bare?: boolean
  className?: string
}

export default function LogoDrawDemo({ size, bare, className }: LogoDrawDemoProps) {
  const { locale } = useDemoLocale()
  const copy = logoDrawDemo[locale]
  const ref = useRef<HTMLDivElement>(null)
  const playing = useDemoPlayback(ref)
  const progress = useMotionValue(0)
  const controls = useRef<AnimationPlaybackControls | null>(null)
  const [finished, setFinished] = useState(false)

  useEffect(() => () => controls.current?.stop(), [])

  const { replay } = useDemoScript(async ({ wait, reduced }) => {
    controls.current?.stop()
    if (reduced) {
      progress.set(1)
      setFinished(true)
      return
    }
    setFinished(false)
    progress.set(0)
    await wait(250)
    controls.current = animate(progress, SEGMENTS.check[0], drawTiming)
    await controls.current
    await wait(0)
    controls.current = animate(progress, 1, checkSpring)
    await controls.current
    await wait(0)
    setFinished(true)
  }, playing)

  const drawing = <LogoDrawing progress={progress} finished={finished} height={size ?? (bare ? 96 : 88)} />

  if (bare) {
    return (
      <div ref={ref} aria-hidden="true" className={cn('inline-flex', className)}>
        {drawing}
      </div>
    )
  }

  return (
    <div ref={ref} role="region" aria-label={copy.region} className={className}>
      <PhoneFrame onReplay={replay}>
        <div className="flex h-full flex-col px-6 pb-8">
          <div className="flex flex-1 flex-col items-center justify-center gap-6 text-center">
            {drawing}
            <div className="space-y-3">
              <p className="text-[24px] leading-8 font-semibold tracking-tight">{copy.title}</p>
              <p className="text-[15px] leading-6 text-muted-foreground">{copy.description}</p>
            </div>
          </div>
          <div aria-hidden="true" className="space-y-2.5">
            <span className="flex h-12 items-center justify-center rounded-full bg-foreground text-[15px] font-medium text-background">
              {copy.actions[0]}
            </span>
            <span className="flex h-12 items-center justify-center rounded-full bg-black/[0.06] text-[15px] font-medium dark:bg-white/10">
              {copy.actions[1]}
            </span>
          </div>
        </div>
      </PhoneFrame>
    </div>
  )
}

interface LogoDrawingProps {
  progress: MotionValue<number>
  finished: boolean
  height: number
}

/** The paint-on reveal: each fill shows through a mask whose round-cap stroke grows along its centerline. */
function LogoDrawing({ progress, finished, height }: LogoDrawingProps) {
  const id = useId().replace(/:/g, '')
  const left = useTransform(progress, (p) => segment(p, SEGMENTS.left))
  const right = useTransform(progress, (p) => segment(p, SEGMENTS.right))
  const check = useTransform(progress, (p) => segment(p, SEGMENTS.check))
  // A zero-length round-cap dash still paints a dot, so hide each stroke until it starts.
  const leftOpacity = useTransform(left, (v): number => (v > 0 ? 1 : 0))
  const rightOpacity = useTransform(right, (v): number => (v > 0 ? 1 : 0))
  const checkOpacity = useTransform(check, (v): number => (v > 0 ? 1 : 0))
  const checkGroup = useRef<SVGGElement>(null)
  // The spring's overshoot past 1 becomes a rebound of up to 1.04× around the tick (range 0.06).
  useMotionValueEvent(progress, 'change', (p) => {
    const scale = 1 + 0.04 * Math.min(1, Math.max(0, (p - 1) / 0.06))
    const { x, y } = CHECK_PIVOT
    checkGroup.current?.setAttribute('transform', `translate(${x} ${y}) scale(${scale}) translate(${-x} ${-y})`)
  })

  const mask = (key: string, d: string, width: number, length: MotionValue<number>, opacity: MotionValue<number>) => (
    <mask id={`${id}-${key}`} maskUnits="userSpaceOnUse" x="-2" y="-2" width={VIEW_WIDTH + 4} height={VIEW_HEIGHT + 4}>
      <m.path
        d={d}
        fill="none"
        stroke="white"
        strokeWidth={width}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ pathLength: length, opacity }}
      />
    </mask>
  )

  return (
    <svg
      aria-hidden="true"
      viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
      style={{ height, width: (height * VIEW_WIDTH) / VIEW_HEIGHT }}
      className="shrink-0 overflow-visible">
      <g transform={`translate(${INSET} ${INSET})`}>
        {finished ? (
          <>
            <path d={SWIRL_LEFT_FILL} fill={SWIRL_COLOR} />
            <path d={SWIRL_RIGHT_FILL} fill={SWIRL_COLOR} />
            <path d={CHECK_FILL} fill={CHECK_COLOR} />
          </>
        ) : (
          <>
            <defs>
              {mask('left', SWIRL_LEFT_CENTERLINE, 12.6, left, leftOpacity)}
              {mask('right', SWIRL_RIGHT_CENTERLINE, 12.6, right, rightOpacity)}
              {mask('check', CHECK_CENTERLINE, 9, check, checkOpacity)}
            </defs>
            <path d={SWIRL_LEFT_FILL} fill={SWIRL_COLOR} mask={`url(#${id}-left)`} />
            <path d={SWIRL_RIGHT_FILL} fill={SWIRL_COLOR} mask={`url(#${id}-right)`} />
            <g ref={checkGroup}>
              <path d={CHECK_FILL} fill={CHECK_COLOR} mask={`url(#${id}-check)`} />
            </g>
          </>
        )}
      </g>
    </svg>
  )
}
