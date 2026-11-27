import { useReducedMotion } from 'framer-motion'
import { type KeyboardEvent, type PointerEvent, useLayoutEffect, useRef, useState } from 'react'

import { anchorDemo } from '@/content/demos/chatTools'
import { cn } from '@/lib/utils'
import AppShell, { tabTitle } from '../primitives/AppShell'
import DemoFrame from '../primitives/DemoFrame'
import ProviderIcon from '../primitives/ProviderIcon'
import { useDemoLocale } from '../primitives/useDemoLocale'
import { useDemoPlayback, useDemoScript } from '../primitives/useDemoScript'

// Desktop MessageAnchorLine constants.
const TICK_BASE_WIDTH = 6
const TICK_PEAK_WIDTH = 20
const TICK_WAVE_BONUS = 10
const HOVER_FALLOFF_DISTANCE = 56
const FOCUS_MAX_DISTANCE = 24
const PREVIEW_EDGE_INSET = 56
const RAIL_MIN_EDGE_MARGIN_PX = 24
const RAIL_TICK_PITCH_PX = 10
const HIT_STRIP_WIDTH = 32
const tickTransition =
  'transition-[width,height,background-color] duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] [will-change:width] motion-reduce:transition-none'

export default function AnchorRailDemo() {
  const { locale } = useDemoLocale()
  const copy = anchorDemo[locale]
  const turns = copy.turns
  const reduced = useReducedMotion() ?? false
  const ref = useRef<HTMLDivElement>(null)
  const scrollerRef = useRef<HTMLDivElement>(null)
  const railRef = useRef<HTMLDivElement>(null)
  const turnRefs = useRef<(HTMLDivElement | null)[]>([])
  const tickRefs = useRef<(HTMLButtonElement | null)[]>([])
  const frameRef = useRef<number | null>(null)
  const userRef = useRef(false)
  const playing = useDemoPlayback(ref)
  const [railHeight, setRailHeight] = useState(0)
  const [pointerY, setPointerY] = useState<number | null>(null)
  const [ghostY, setGhostY] = useState<number | null>(null)
  const mouseY = pointerY ?? ghostY
  const [keyboardIndex, setKeyboardIndex] = useState<number | null>(null)
  const [activeIndex, setActiveIndex] = useState(turns.length - 1)

  useLayoutEffect(() => {
    const rail = railRef.current
    const scroller = scrollerRef.current
    if (!rail || !scroller) return
    scroller.scrollTop = scroller.scrollHeight
    const observer = new ResizeObserver(() => setRailHeight(rail.getBoundingClientRect().height))
    observer.observe(rail)
    return () => observer.disconnect()
  }, [])

  const viewport = Math.max(0, railHeight - RAIL_MIN_EDGE_MARGIN_PX * 2)
  const padTop = Math.max(0, viewport - turns.length * RAIL_TICK_PITCH_PX) / 2
  const centerOf = (index: number) =>
    RAIL_MIN_EDGE_MARGIN_PX + padTop + index * RAIL_TICK_PITCH_PX + RAIL_TICK_PITCH_PX / 2

  const pointerIndex = (() => {
    if (mouseY === null || railHeight === 0) return null
    const index = Math.min(Math.max(Math.round((mouseY - centerOf(0)) / RAIL_TICK_PITCH_PX), 0), turns.length - 1)
    return Math.abs(mouseY - centerOf(index)) <= FOCUS_MAX_DISTANCE ? index : null
  })()
  const focusedIndex = pointerIndex ?? keyboardIndex
  const waveBonus = (index: number) => {
    if (mouseY === null) return 0
    const falloff = Math.max(0, 1 - Math.abs(centerOf(index) - mouseY) / HOVER_FALLOFF_DISTANCE)
    return TICK_WAVE_BONUS * falloff ** 1.5
  }
  const cardTop =
    focusedIndex !== null
      ? Math.min(
          Math.max(centerOf(focusedIndex), PREVIEW_EDGE_INSET),
          Math.max(railHeight - PREVIEW_EDGE_INSET, PREVIEW_EDGE_INSET)
        )
      : 0

  // Coalesce pointer moves to one layout read and render per frame, as the desktop rail does.
  const latestY = useRef<number | null>(null)
  const takeOver = () => {
    userRef.current = true
    setGhostY(null)
  }
  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    takeOver()
    latestY.current = event.clientY
    if (frameRef.current !== null) return
    frameRef.current = requestAnimationFrame(() => {
      frameRef.current = null
      const rail = railRef.current
      if (rail && latestY.current !== null) setPointerY(latestY.current - rail.getBoundingClientRect().top)
    })
  }
  const onPointerLeave = () => {
    latestY.current = null
    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current)
    frameRef.current = null
    setPointerY(null)
  }

  const onThreadScroll = () => {
    const scroller = scrollerRef.current
    if (!scroller) return
    const line = scroller.scrollTop + 12
    let index = 0
    turnRefs.current.forEach((turn, turnIndex) => {
      if (turn && turn.offsetTop <= line) index = turnIndex
    })
    setActiveIndex(index)
  }

  const jump = (index: number) => {
    const scroller = scrollerRef.current
    const turn = turnRefs.current[index]
    if (!scroller || !turn) return
    // Desktop scrollToKey(key, 'start'): smooth for nearby turns, instant beyond three viewports.
    const top = turn.offsetTop - 8
    const far = Math.abs(top - scroller.scrollTop) > scroller.clientHeight * 3
    scroller.scrollTo({ top, behavior: reduced || far ? 'auto' : 'smooth' })
  }

  const onRailKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const current = keyboardIndex ?? activeIndex
    const next =
      event.key === 'ArrowUp'
        ? current - 1
        : event.key === 'ArrowDown'
          ? current + 1
          : event.key === 'Home'
            ? 0
            : event.key === 'End'
              ? turns.length - 1
              : null
    if (next === null) return
    event.preventDefault()
    takeOver()
    tickRefs.current[Math.min(Math.max(next, 0), turns.length - 1)]?.focus()
  }

  // One unprompted pass of the pointer up the rail so the wave is discoverable.
  const { replay } = useDemoScript(
    async ({ wait, reduced: skip }) => {
      if (skip || userRef.current) return
      await wait(900)
      const from = centerOf(turns.length - 1) + 6
      const to = centerOf(4)
      for (let step = 0; step <= 36; step++) {
        if (userRef.current) return
        setGhostY(from + ((to - from) * step) / 36)
        await wait(28)
      }
      await wait(1400)
      if (userRef.current) return
      setGhostY(null)
      jump(4)
    },
    playing && railHeight > 0
  )

  const tabStop = keyboardIndex ?? activeIndex
  const focusedTurn = focusedIndex !== null ? turns[focusedIndex] : null
  const isHovering = mouseY !== null

  return (
    <div ref={ref} role="region" aria-label={copy.window}>
      <DemoFrame
        chromeless
        title={copy.window}
        onReplay={() => {
          userRef.current = false
          replay()
        }}
        bodyClassName="h-[370px] overflow-hidden">
        <AppShell active="assistants" tab={{ title: tabTitle(copy.window), emoji: '😀' }}>
          <div
            ref={scrollerRef}
            onScroll={onThreadScroll}
            tabIndex={-1}
            aria-hidden="true"
            className="absolute inset-0 overflow-y-auto py-6 pr-14 pl-4 [mask-image:linear-gradient(to_bottom,transparent,black_28px,black_calc(100%-60px),transparent)] [scrollbar-width:none] sm:pl-6">
            <div className="space-y-1">
              {turns.map((turn, index) => (
                <div
                  key={index}
                  ref={(node) => {
                    turnRefs.current[index] = node
                  }}
                  className="space-y-2.5">
                  <div className="flex justify-end pt-2.5">
                    <p className="max-w-[85%] rounded-[10px] bg-chat-user px-4 py-2.5 text-sm leading-5">
                      {turn.question}
                    </p>
                  </div>
                  <div className="flex items-start gap-2.5 pt-2.5">
                    <span className="flex size-[30px] shrink-0 items-center justify-center overflow-hidden rounded-full border border-border bg-background">
                      <ProviderIcon id="anthropic" className="size-4" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm leading-5 font-semibold">{copy.model}</p>
                      <p className="mt-1 text-sm leading-6 text-foreground/85">{turn.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            ref={railRef}
            role="navigation"
            aria-label={copy.railLabel}
            className="absolute top-2.5 right-4 bottom-8 z-20 select-none"
            style={{ width: HIT_STRIP_WIDTH }}
            onPointerMove={onPointerMove}
            onPointerLeave={onPointerLeave}>
            <div
              onKeyDown={onRailKeyDown}
              className="absolute inset-x-0 flex flex-col items-end transition-opacity duration-150"
              style={{
                top: RAIL_MIN_EDGE_MARGIN_PX,
                bottom: RAIL_MIN_EDGE_MARGIN_PX,
                paddingTop: padTop,
                opacity: isHovering ? 1 : 0.7
              }}>
              {turns.map((turn, index) => {
                const isFocused = index === focusedIndex
                const emphasized = focusedIndex !== null ? isFocused : index === activeIndex
                const width = isHovering
                  ? isFocused
                    ? TICK_PEAK_WIDTH
                    : TICK_BASE_WIDTH + waveBonus(index)
                  : TICK_BASE_WIDTH
                return (
                  <button
                    key={index}
                    ref={(node) => {
                      tickRefs.current[index] = node
                    }}
                    type="button"
                    tabIndex={index === tabStop ? 0 : -1}
                    aria-label={`${copy.jumpTo.replace('{number}', String(index + 1))}: ${turn.question}`}
                    aria-current={index === activeIndex ? 'true' : undefined}
                    className="flex w-full shrink-0 cursor-pointer items-center justify-end rounded-sm outline-none focus-visible:ring-1 focus-visible:ring-primary"
                    style={{ height: RAIL_TICK_PITCH_PX }}
                    onFocus={() => {
                      takeOver()
                      setKeyboardIndex(index)
                    }}
                    onBlur={() => setKeyboardIndex((current) => (current === index ? null : current))}
                    onClick={() => {
                      takeOver()
                      jump(index)
                    }}>
                    <span
                      className={cn(
                        'block rounded-full',
                        tickTransition,
                        isFocused ? 'h-0.5' : 'h-[1.5px]',
                        emphasized ? 'bg-foreground' : 'bg-foreground/20'
                      )}
                      style={{ width }}
                    />
                  </button>
                )
              })}
            </div>

            {focusedTurn && (
              <div
                aria-hidden="true"
                className="pointer-events-none absolute right-full z-30 flex w-max max-w-[min(20rem,68vw)] -translate-y-1/2 flex-col gap-1 rounded-xl border-[0.5px] border-border bg-popover p-3 text-popover-foreground shadow-lg transition-[top] duration-150 ease-[cubic-bezier(0.25,1,0.5,1)] motion-reduce:transition-none"
                style={{ top: cardTop }}>
                <p className="line-clamp-1 text-sm font-medium break-all text-foreground">{focusedTurn.question}</p>
                <p className="line-clamp-2 text-sm leading-5 break-all text-muted-foreground">{focusedTurn.answer}</p>
              </div>
            )}
          </div>

          <p className="pointer-events-none absolute bottom-2 left-3 rounded-md bg-card/85 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground backdrop-blur-sm sm:left-5">
            {copy.hint}
          </p>
        </AppShell>
      </DemoFrame>
    </div>
  )
}
