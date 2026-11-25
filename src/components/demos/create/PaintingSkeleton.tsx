import { m } from 'framer-motion'
import { type CSSProperties, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'

import { cn } from '@/lib/utils'

// Constants mirrored from desktop paintings/components/PaintingSkeletonSurface.tsx.
const CELL_SIZE = 14
const CELL_GAP = 14
const MAX_GRID_CELLS = 256
const CELL_RADIUS = 3
const BLINK_DURATION_MS = 2000
const CELL_FILL_DURATION = 0.5
const CELL_FADE_DURATION_MS = 600
const CELL_FADE_DELAY_MAX_MS = 300
const IMAGE_REVEAL_DURATION = 0.9

interface Grid {
  cellGap: number
  cols: number
  rows: number
  pitch: number
  offsetX: number
  offsetY: number
  key: string
}

function cellNoise(index: number, salt: number) {
  const value = Math.sin(index * 12.9898 + salt * 78.233) * 43758.5453
  return value - Math.floor(value)
}

function createGrid(width: number, height: number): Grid {
  let pitch = CELL_SIZE + CELL_GAP
  let cols = Math.max(1, Math.ceil(width / pitch))
  let rows = Math.max(1, Math.ceil(height / pitch))
  while (cols * rows > MAX_GRID_CELLS) {
    pitch += 1
    cols = Math.max(1, Math.ceil(width / pitch))
    rows = Math.max(1, Math.ceil(height / pitch))
  }
  const offsetX = (width - ((cols - 1) * pitch + CELL_SIZE)) / 2
  const offsetY = (height - ((rows - 1) * pitch + CELL_SIZE)) / 2
  return { cellGap: pitch - CELL_SIZE, cols, rows, pitch, offsetX, offsetY, key: `${cols}x${rows}:${pitch}` }
}

/** Draws the image into a cols×rows canvas so each pixel becomes one cell colour; same-origin assets keep it untainted. */
async function downsampleCellColors(src: string, cols: number, rows: number) {
  try {
    const image = new Image()
    image.src = src
    await image.decode()
    const canvas = document.createElement('canvas')
    canvas.width = cols
    canvas.height = rows
    const context = canvas.getContext('2d', { willReadFrequently: true })
    if (!context) return []
    context.drawImage(image, 0, 0, cols, rows)
    const { data } = context.getImageData(0, 0, cols, rows)
    return Array.from({ length: cols * rows }, (_, index) => {
      const offset = index * 4
      return `rgb(${data[offset]}, ${data[offset + 1]}, ${data[offset + 2]})`
    })
  } catch {
    return []
  }
}

interface PaintingSkeletonProps {
  /** Set once the "result" arrives; starts the colour sampling and reveal. */
  imageUrl?: string
  reduced: boolean
  paused: boolean
  onRevealed: () => void
}

/** Blinking cell grid that takes on the result's colours, closes its gaps and fades out as the image fades in. */
export function PaintingSkeleton({ imageUrl, reduced, paused, onRevealed }: PaintingSkeletonProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const [grid, setGrid] = useState<Grid | null>(null)
  const [sampled, setSampled] = useState<{ key: string; colors: string[] } | null>(null)
  const [fadingKey, setFadingKey] = useState<string | null>(null)
  const revealedRef = useRef(onRevealed)
  revealedRef.current = onRevealed

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return
    const measure = () => {
      const { width, height } = root.getBoundingClientRect()
      if (width <= 0 || height <= 0) return
      const next = createGrid(width, height)
      setGrid((current) => (current?.key === next.key ? current : next))
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(root)
    return () => observer.disconnect()
  }, [])

  const cells = useMemo(() => {
    if (!grid) return []
    return Array.from({ length: grid.cols * grid.rows }, (_, index) => ({
      x: grid.offsetX + (index % grid.cols) * grid.pitch,
      y: grid.offsetY + Math.floor(index / grid.cols) * grid.pitch,
      blinkDelayMs: Math.round(cellNoise(index, 1) * BLINK_DURATION_MS),
      fadeDelayMs: Math.round(cellNoise(index, 2) * CELL_FADE_DELAY_MAX_MS),
      initialOpacity: 0.16 + cellNoise(index, 3) * 0.36
    }))
  }, [grid])

  const sampleKey = imageUrl && grid ? `${imageUrl}|${grid.cols}x${grid.rows}` : null
  const colorsReady = Boolean(sampleKey && sampled?.key === sampleKey)
  const fading = Boolean(sampleKey && fadingKey === sampleKey)

  useEffect(() => {
    if (!imageUrl || !grid || !sampleKey || reduced) return
    let active = true
    void downsampleCellColors(imageUrl, grid.cols, grid.rows).then((colors) => {
      if (active) setSampled({ key: sampleKey, colors })
    })
    return () => {
      active = false
    }
  }, [imageUrl, grid, sampleKey, reduced])

  useEffect(() => {
    if (!colorsReady || !sampleKey) return
    const timer = setTimeout(() => setFadingKey(sampleKey), CELL_FILL_DURATION * 1000)
    return () => clearTimeout(timer)
  }, [colorsReady, sampleKey])

  useEffect(() => {
    if (imageUrl && reduced) revealedRef.current()
  }, [imageUrl, reduced])

  return (
    <div ref={rootRef} aria-hidden="true" className="relative size-full overflow-hidden bg-background">
      {grid && !(imageUrl && reduced) && (
        <div key={grid.key} className="pointer-events-none absolute inset-0 z-10">
          {cells.map((cell, index) => {
            const color = colorsReady ? sampled?.colors[index] : undefined
            const style: CSSProperties = colorsReady
              ? {
                  left: cell.x - grid.cellGap / 2,
                  top: cell.y - grid.cellGap / 2,
                  width: grid.pitch,
                  height: grid.pitch,
                  borderRadius: CELL_RADIUS,
                  backgroundColor: color ?? 'var(--muted-foreground)',
                  opacity: fading ? 0 : 1,
                  transition: fading
                    ? `opacity ${CELL_FADE_DURATION_MS}ms ease`
                    : ['background-color', 'width', 'height', 'left', 'top', 'opacity']
                        .map((property) => `${property} ${CELL_FILL_DURATION}s ease`)
                        .join(', '),
                  transitionDelay: fading ? `${cell.fadeDelayMs}ms` : '0ms'
                }
              : {
                  left: cell.x,
                  top: cell.y,
                  width: CELL_SIZE,
                  height: CELL_SIZE,
                  borderRadius: CELL_RADIUS,
                  opacity: reduced ? 0.24 : cell.initialOpacity,
                  animationDelay: `${cell.blinkDelayMs}ms`
                }
            return (
              <span
                key={index}
                className={cn(
                  'absolute',
                  !colorsReady && 'bg-muted-foreground motion-safe:animate-blink',
                  paused && '[animation-play-state:paused]'
                )}
                style={style}
              />
            )
          })}
        </div>
      )}

      {imageUrl &&
        (reduced ? (
          <img src={imageUrl} alt="" draggable={false} className="absolute inset-0 size-full object-cover" />
        ) : (
          colorsReady && (
            <m.img
              key={sampleKey}
              src={imageUrl}
              alt=""
              draggable={false}
              className="absolute inset-0 size-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: CELL_FILL_DURATION, duration: IMAGE_REVEAL_DURATION, ease: 'easeOut' }}
              onAnimationComplete={() => revealedRef.current()}
            />
          )
        ))}
    </div>
  )
}
