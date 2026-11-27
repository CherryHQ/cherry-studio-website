import { useReducedMotion } from 'framer-motion'
import { useEffect, useRef } from 'react'

import { cn } from '@/lib/utils'

// Soft-focus leaf shadows falling across the page, as if from a plant by the window. Branches sway on their own and
// catch a gust when the pointer moves across the parent element.

interface Branch {
  /** Anchor as a percentage of the box. */
  x: number
  y: number
  angle: number
  length: number
  blur: number
  seed: number
}

const BRANCHES: Branch[] = [
  { x: -4, y: -4, angle: 30, length: 640, blur: 6, seed: 1 },
  { x: 14, y: -16, angle: 76, length: 460, blur: 14, seed: 2 },
  { x: 104, y: -2, angle: 152, length: 680, blur: 7, seed: 3 },
  { x: 88, y: -16, angle: 104, length: 420, blur: 16, seed: 4 },
  { x: -6, y: 58, angle: -18, length: 520, blur: 12, seed: 5 },
  { x: 106, y: 62, angle: 196, length: 560, blur: 10, seed: 6 },
  { x: 46, y: -18, angle: 88, length: 300, blur: 20, seed: 7 }
]
const HEIGHT = 340
const DESIGN_WIDTH = 1440
const LEAF_SCALE = 1.5

function random(seed: number) {
  let state = seed * 9301 + 49297
  return () => {
    state = (state * 9301 + 49297) % 233280
    return state / 233280
  }
}

function leafPaths(branch: Branch) {
  const next = random(branch.seed)
  const bend = (x: number) => Math.sin((x / branch.length) * Math.PI) * 26
  const paths = [`M0 ${HEIGHT / 2} Q${branch.length / 2} ${HEIGHT / 2 + 52} ${branch.length} ${HEIGHT / 2}`]
  for (let x = 30, side = 1; x < branch.length - 20; x += 34 + next() * 22, side *= -1) {
    const length = 70 + next() * 50 * (1 - x / branch.length / 2)
    const width = length * (0.26 + next() * 0.08)
    const angle = side * (32 + next() * 26)
    const y = HEIGHT / 2 + bend(x)
    paths.push(
      `<path transform="translate(${x} ${y}) rotate(${angle})" d="M0 0C${length * 0.3} ${-width} ${length * 0.7} ${-width} ${length} 0C${length * 0.7} ${width} ${length * 0.3} ${width} 0 0Z"/>`
    )
  }
  const [stem, ...leaves] = paths
  return `<path d="${stem}" fill="none" stroke="currentColor" stroke-width="3"/>${leaves.join('')}`
}

export default function LeafShadows({ className }: { className?: string }) {
  const host = useRef<HTMLSpanElement>(null)
  const reduced = useReducedMotion() ?? false

  useEffect(() => {
    const element = host.current
    const branches = [...(element?.querySelectorAll<HTMLElement>('[data-branch]') ?? [])]
    const target = element?.parentElement
    if (!element || !target) return

    let frame = 0
    let wind = 0
    let lastX: number | null = null
    let visible = true
    const start = performance.now()
    const draw = (seconds: number) => {
      const scale = Math.min(1, Math.max(0.5, element.clientWidth / DESIGN_WIDTH))
      branches.forEach((branch, index) => {
        const { angle, seed } = BRANCHES[index]
        const sway =
          Math.sin(seconds * 0.5 + seed * 1.7) * 1.4 +
          Math.sin(seconds * 1.3 + seed) * 0.5 +
          Math.sin(seconds * 3.1 + seed * 2.3) * wind * 2.2
        branch.style.transform = `scale(${scale * LEAF_SCALE}) rotate(${angle + sway}deg)`
      })
      wind *= 0.97
    }
    const tick = (now: number) => {
      draw((now - start) / 1000)
      if (visible) frame = requestAnimationFrame(tick)
    }
    const onMove = (event: PointerEvent) => {
      if (lastX !== null) wind = Math.min(2.5, wind + Math.min(Math.abs(event.clientX - lastX), 40) * 0.012)
      lastX = event.clientX
    }
    const onScreen = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting && !reduced
      cancelAnimationFrame(frame)
      if (visible) frame = requestAnimationFrame(tick)
    })
    onScreen.observe(element)
    target.addEventListener('pointermove', onMove)
    draw(0)
    return () => {
      cancelAnimationFrame(frame)
      onScreen.disconnect()
      target.removeEventListener('pointermove', onMove)
    }
  }, [reduced])

  return (
    <span ref={host} aria-hidden="true" className={cn('pointer-events-none block overflow-hidden', className)}>
      {BRANCHES.map((branch) => (
        <span
          key={branch.seed}
          data-branch=""
          className="absolute origin-[0_50%] will-change-transform"
          style={{
            left: `${branch.x}%`,
            top: `${branch.y}%`,
            marginTop: -HEIGHT / 2,
            filter: `blur(${branch.blur}px)`
          }}>
          <svg
            width={branch.length + 140}
            height={HEIGHT}
            fill="currentColor"
            dangerouslySetInnerHTML={{ __html: leafPaths(branch) }}
          />
        </span>
      ))}
    </span>
  )
}
