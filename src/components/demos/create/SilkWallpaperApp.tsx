import { Warp } from '@paper-design/shaders-react'
import { useReducedMotion } from 'framer-motion'
import { useState } from 'react'

import type { ArtifactsDemoCopy } from '@/content/demos/create'
import { cn } from '@/lib/utils'
import { SILK_PALETTES } from './artifactSource'

/** The artifact's preview: a live silk wallpaper (Paper Shaders' Warp), recoloured and slowed by its own controls. */
export function SilkWallpaperApp({ app, playing }: { app: ArtifactsDemoCopy['app']; playing: boolean }) {
  const reduced = useReducedMotion() ?? false
  const [palette, setPalette] = useState(0)
  const [speed, setSpeed] = useState(1.2)

  return (
    <div className="relative size-full overflow-hidden bg-black text-white">
      <Warp
        width="100%"
        height="100%"
        minPixelRatio={1}
        maxPixelCount={900 * 700}
        style={{ position: 'absolute', inset: 0 }}
        colors={SILK_PALETTES[palette].colors}
        shape="checks"
        scale={2.2}
        proportion={0.5}
        softness={1}
        distortion={0.1}
        swirl={0.9}
        swirlIterations={6}
        shapeScale={0.25}
        speed={reduced || !playing ? 0 : speed}
      />
      <div className="absolute inset-x-3 bottom-3 flex flex-wrap items-center gap-2 rounded-2xl bg-black/35 p-2 text-xs backdrop-blur-md">
        <div className="flex gap-1.5" role="radiogroup" aria-label={app.palette}>
          {SILK_PALETTES.map((item, index) => (
            <button
              key={item.id}
              type="button"
              role="radio"
              aria-checked={palette === index}
              aria-label={app.palettes[index]}
              title={app.palettes[index]}
              onClick={() => setPalette(index)}
              className={cn(
                'size-6 cursor-pointer rounded-full ring-2 ring-offset-2 ring-offset-black/40 transition-[box-shadow] focus-visible:outline-2 focus-visible:outline-white',
                palette === index ? 'ring-white' : 'ring-transparent'
              )}
              style={{ background: `linear-gradient(135deg, ${item.colors[1]}, ${item.colors[2]})` }}
            />
          ))}
        </div>
        <label className="ml-auto flex min-w-0 items-center gap-2 text-white/80">
          {app.speed}
          <input
            type="range"
            min={0}
            max={3}
            step={0.1}
            value={speed}
            onChange={(event) => setSpeed(Number(event.target.value))}
            className="w-24 cursor-pointer accent-white"
          />
        </label>
      </div>
    </div>
  )
}
