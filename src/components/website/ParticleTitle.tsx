import { useReducedMotion } from 'framer-motion'
import { useEffect, useRef } from 'react'

import { cn } from '@/lib/utils'

// Adapted from "Particle reveal" by Incidental AI Design Academy (MIT): text sampled into dots that the pointer
// scatters and that spring back. Lines are drawn with the site's own fonts and theme colours.

export interface ParticleLine {
  text: string
  /** CSS font shorthand without the size, e.g. `600 {size}px "Inter Tight", sans-serif`; `{size}` is replaced. */
  font: string
}

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  tx: number
  ty: number
  r: number
  h: number
}

const REPEL_RADIUS = 46
const HOLD_SECONDS = 3.5

interface ParticleTitleProps {
  lines: ParticleLine[]
  className?: string
  /** Dot spacing as a fraction of width; CJK glyphs need a finer grid to stay legible. */
  density?: number
}

export default function ParticleTitle({ lines, className, density = 1 / 170 }: ParticleTitleProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduced = useReducedMotion() ?? false
  const key = lines.map((line) => `${line.font}|${line.text}`).join('\n')

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    if (!canvas || !context) return

    let width = 0
    let height = 0
    let particles: Particle[] = []
    let mouseX = -1e4
    let mouseY = -1e4
    let frame = 0
    let visible = true
    let disposed = false
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const coarse = window.matchMedia('(pointer: coarse)').matches
    const start = performance.now()

    const build = () => {
      width = canvas.clientWidth
      height = canvas.clientHeight
      if (!width || !height) {
        particles = []
        return
      }
      canvas.width = width * dpr
      canvas.height = height * dpr
      const mask = document.createElement('canvas')
      mask.width = width
      mask.height = height
      const ctx = mask.getContext('2d', { willReadFrequently: true })
      if (!ctx) return

      // Fit every line to the width, then share the height between lines.
      const lineHeight = height / lines.length
      let size = lineHeight * 0.78
      const widest = () =>
        Math.max(
          ...lines.map((line) => {
            ctx.font = line.font.replace('{size}', String(size))
            return ctx.measureText(line.text).width
          })
        )
      for (let attempt = 0; attempt < 12 && widest() > width * 0.98; attempt++) size *= 0.92

      ctx.fillStyle = '#000'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      lines.forEach((line, index) => {
        ctx.font = line.font.replace('{size}', String(size))
        ctx.fillText(line.text, width / 2, lineHeight * (index + 0.5))
      })

      const pixels = ctx.getImageData(0, 0, width, height).data
      const gap = Math.max(3, Math.round(width * density))
      const previous = particles
      particles = []
      for (let y = 0; y < height; y += gap) {
        for (let x = 0; x < width; x += gap) {
          if (pixels[(y * width + x) * 4 + 3] <= 128) continue
          const reused = previous[particles.length]
          // On first build the dots start scattered and spring into the letters.
          const scatter = !reused && !reduced
          particles.push({
            x: scatter ? Math.random() * width : x,
            y: scatter ? Math.random() * height * 1.6 - height * 0.3 : y,
            vx: 0,
            vy: 0,
            tx: x,
            ty: y,
            r: reused?.r ?? gap * 0.42 * (0.7 + Math.random() * 0.6),
            h: reused?.h ?? Math.random()
          })
        }
      }
    }

    const draw = () => {
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
      context.clearRect(0, 0, width, height)
      // Inherit the text colour so the title follows whatever surface it sits on; scattered dots fade instead.
      context.fillStyle = getComputedStyle(canvas).color
      const radius2 = REPEL_RADIUS * REPEL_RADIUS
      for (const p of particles) {
        const dx = p.x - mouseX
        const dy = p.y - mouseY
        const d2 = dx * dx + dy * dy
        if (d2 < radius2) {
          const force = (1 - d2 / radius2) * 5
          const distance = Math.sqrt(d2 + 1)
          p.vx += (dx / distance) * force
          p.vy += (dy / distance) * force
        }
        p.vx = (p.vx + (p.tx - p.x) * 0.06) * 0.82
        p.vy = (p.vy + (p.ty - p.y) * 0.06) * 0.82
        p.x += p.vx
        p.y += p.vy
        if (reduced) {
          p.x = p.tx
          p.y = p.ty
        }
        const speed = Math.min(1, Math.hypot(p.vx, p.vy) / 6)
        context.globalAlpha = speed > 0.15 || p.h > 0.93 ? 0.45 : 0.55 + 0.45 * (1 - speed)
        context.beginPath()
        context.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        context.fill()
      }
      context.globalAlpha = 1
    }

    const tick = (now: number) => {
      const seconds = (now - start) / 1000
      // After a short hold, a slow sweep shows the effect without a pointer; touch only scatters while touching.
      if (mouseX < -1e3 && !coarse && seconds >= HOLD_SECONDS) {
        const phase = (seconds - HOLD_SECONDS) * 0.45
        mouseX = width / 2 + Math.sin(phase) * width * 0.3
        mouseY = height / 2 + Math.sin(phase * 2.3) * height * 0.08
        draw()
        mouseX = mouseY = -1e4
      } else draw()
      if (visible && !reduced) frame = requestAnimationFrame(tick)
    }

    const run = () => {
      cancelAnimationFrame(frame)
      if (reduced) draw()
      else frame = requestAnimationFrame(tick)
    }

    const onMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseX = event.clientX - rect.left
      mouseY = event.clientY - rect.top
    }
    const onLeave = () => {
      mouseX = mouseY = -1e4
    }

    const families = lines.map((line) => line.font.replace('{size}', '64'))
    void Promise.all(families.map((font) => document.fonts.load(font))).then(() => {
      if (disposed) return
      build()
      run()
    })

    const resize = new ResizeObserver(() => {
      if (canvas.clientWidth !== width || canvas.clientHeight !== height) {
        build()
        if (reduced) draw()
      }
    })
    resize.observe(canvas)
    const onScreen = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) run()
      else cancelAnimationFrame(frame)
    })
    onScreen.observe(canvas)
    const theme = new MutationObserver(() => reduced && draw())
    theme.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

    canvas.addEventListener('pointermove', onMove)
    canvas.addEventListener('pointerleave', onLeave)
    canvas.addEventListener('pointerup', onLeave)
    return () => {
      disposed = true
      cancelAnimationFrame(frame)
      resize.disconnect()
      onScreen.disconnect()
      theme.disconnect()
      canvas.removeEventListener('pointermove', onMove)
      canvas.removeEventListener('pointerleave', onLeave)
      canvas.removeEventListener('pointerup', onLeave)
    }
    // `key` captures every line's text and font.
  }, [key, density, reduced])

  return (
    <span aria-hidden="true" className={cn('block w-full', className)}>
      <canvas ref={canvasRef} className="block size-full touch-pan-y" />
    </span>
  )
}
