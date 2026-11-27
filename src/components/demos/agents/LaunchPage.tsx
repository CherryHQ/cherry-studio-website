import { LiquidMetal } from '@paper-design/shaders-react'
import { useReducedMotion } from 'framer-motion'

import mark from '@/assets/images/cherry-mark.svg'
import type { DelegationCopy } from '@/content/demos/delegation'

/** The delegated artifact: a launch page whose hero is the Cherry mark in Paper Shaders' liquid metal. */
export function LaunchPage({ copy, playing }: { copy: DelegationCopy['launch']; playing: boolean }) {
  const reduced = useReducedMotion() ?? false
  return (
    <div className="flex size-full flex-col items-center justify-center gap-5 overflow-hidden bg-[radial-gradient(ellipse_at_50%_30%,#22181a,#08080a_70%)] px-6 text-center text-white">
      <LiquidMetal
        image={mark}
        width={190}
        height={190}
        minPixelRatio={1}
        maxPixelCount={600 * 600}
        colorBack="#00000000"
        colorTint="#ffd9cf"
        shape="none"
        fit="contain"
        scale={0.86}
        repetition={2}
        softness={0.1}
        shiftRed={0.3}
        shiftBlue={0.3}
        distortion={0.07}
        contour={0.4}
        angle={70}
        speed={reduced || !playing ? 0 : 1}
      />
      <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] text-white/70">
        {copy.badge}
      </span>
      <h4 className="max-w-[16ch] text-[clamp(22px,3.2cqw,34px)] leading-tight font-semibold tracking-tight text-balance">
        {copy.title}
      </h4>
      <p className="max-w-[34ch] text-xs leading-relaxed text-white/60">{copy.subtitle}</p>
      <div className="flex gap-2" aria-hidden="true">
        <span className="rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-black">{copy.primary}</span>
        <span className="rounded-full border border-white/20 px-4 py-1.5 text-xs font-semibold text-white/85">
          {copy.secondary}
        </span>
      </div>
    </div>
  )
}
