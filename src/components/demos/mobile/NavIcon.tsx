import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'
import { tone } from './MobileUi'

export type NavIconId = 'chat' | 'agents' | 'more' | 'drawings' | 'plugins' | 'marketplace' | 'files' | 'devices'

interface Glyph {
  outline: ReactNode
  filled: ReactNode
  /** create-filled-icon's default stroke, unless the icon overrides it. */
  stroke?: number
  /** viewBoxPadding of the filled variant: its 24pt box drawn in 26 units. */
  padded?: boolean
}

const fill = { fill: 'currentColor', stroke: 'none' } as const

const agentRays = (
  <>
    <path d="M14 4.1 12 6" />
    <path d="m5.1 8-2.9-.8" />
    <path d="m6 12-1.9 2" />
    <path d="M7.2 2.2 8 5.1" />
  </>
)
const agentPointer =
  'M9.037 9.69a.498.498 0 0 1 .653-.653l11 4.5a.5.5 0 0 1-.074.949l-4.349 1.041a1 1 0 0 0-.74.739l-1.04 4.35a.5.5 0 0 1-.95.074z'
const chatBubble = 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z'

/** packages/app-icons/src/icons/nav-*.tsx: the rounded dual-state navigation glyphs. */
const GLYPHS: Record<NavIconId, Glyph> = {
  chat: {
    stroke: 1.6,
    padded: true,
    outline: <path d={chatBubble} />,
    filled: <path d={chatBubble} fill="currentColor" />
  },
  agents: {
    stroke: 1.6,
    padded: true,
    outline: (
      <>
        {agentRays}
        <path d={agentPointer} />
      </>
    ),
    filled: (
      <>
        {agentRays}
        <path d={agentPointer} fill="currentColor" />
      </>
    )
  },
  more: {
    outline: [3.5, 13.5].flatMap((y) =>
      [3.5, 13.5].map((x) => <rect key={`${x}-${y}`} x={x} y={y} width={7} height={7} rx={2.4} />)
    ),
    filled: [3.1, 13].flatMap((y) =>
      [3.1, 13].map((x) => <rect key={`${x}-${y}`} x={x} y={y} width={7.9} height={7.9} rx={2.75} {...fill} />)
    )
  },
  drawings: {
    outline: (
      <>
        <path d="M 12 3.3 C 17.1 3.3 20.8 6.8 20.8 11.4 C 20.8 14.3 18.7 15.8 16.0 15.8 H 14.8 C 13.4 15.8 12.6 16.7 13.0 17.9 C 13.45 19.35 12.55 20.7 10.9 20.7 C 6.2 20.7 3.2 16.9 3.2 12.0 C 3.2 7.1 6.9 3.3 12 3.3 Z" />
        {[
          [8.5, 8.4],
          [13.2, 7.3],
          [16.7, 10.6],
          [7.5, 13.2]
        ].map(([cx, cy]) => (
          <circle key={cx} cx={cx} cy={cy} r={1.15} {...fill} />
        ))}
      </>
    ),
    filled: (
      <path
        fillRule="evenodd"
        {...fill}
        d="M 12 2.7 C 17.5 2.7 21.4 6.5 21.4 11.4 C 21.4 14.7 19.0 16.4 16.1 16.4 H 14.8 C 13.7 16.4 13.1 17.1 13.45 18.1 C 13.95 19.7 12.95 21.3 10.9 21.3 C 5.8 21.3 2.6 17.2 2.6 12.0 C 2.6 6.8 6.5 2.7 12 2.7 Z M 8.5 7.0 A 1.35 1.35 0 1 0 8.5 9.7 A 1.35 1.35 0 1 0 8.5 7.0 Z M 13.2 5.9 A 1.35 1.35 0 1 0 13.2 8.6 A 1.35 1.35 0 1 0 13.2 5.9 Z M 16.8 9.2 A 1.35 1.35 0 1 0 16.8 11.9 A 1.35 1.35 0 1 0 16.8 9.2 Z M 7.5 11.8 A 1.35 1.35 0 1 0 7.5 14.5 A 1.35 1.35 0 1 0 7.5 11.8 Z"
      />
    )
  },
  plugins: {
    outline: (
      <path d="M 3.8 10.8 C 3.8 8.9 4.9 7.8 6.8 7.8 H 7.4 C 8.15 7.8 8.25 7.25 7.85 6.55 C 7.2 5.45 7.95 3.4 9.9 3.4 C 11.85 3.4 12.6 5.45 11.95 6.55 C 11.55 7.25 11.65 7.8 12.4 7.8 H 13.0 C 14.9 7.8 16.0 8.9 16.0 10.8 V 11.4 C 16.0 12.15 16.55 12.25 17.25 11.85 C 18.35 11.2 20.4 11.95 20.4 13.9 C 20.4 15.85 18.35 16.6 17.25 15.95 C 16.55 15.55 16.0 15.65 16.0 16.4 V 17.0 C 16.0 18.9 14.9 20.0 13.0 20.0 H 6.8 C 4.9 20.0 3.8 18.9 3.8 17.0 V 16.2 C 3.8 15.55 4.35 15.45 4.95 15.8 C 5.9 16.35 7.15 15.5 7.15 13.9 C 7.15 12.3 5.9 11.45 4.95 12.0 C 4.35 12.35 3.8 12.25 3.8 11.6 Z" />
    ),
    filled: (
      <path
        {...fill}
        d="M 3.2 10.7 C 3.2 8.6 4.5 7.3 6.6 7.3 H 7.3 C 8.0 7.3 8.05 6.8 7.65 6.05 C 6.95 4.8 7.8 2.7 9.9 2.7 C 12.0 2.7 12.85 4.8 12.15 6.05 C 11.75 6.8 11.8 7.3 12.5 7.3 H 13.2 C 15.3 7.3 16.6 8.6 16.6 10.7 V 11.3 C 16.6 12.0 17.1 12.05 17.85 11.65 C 19.1 10.95 21.2 11.8 21.2 13.9 C 21.2 16.0 19.1 16.85 17.85 16.15 C 17.1 15.75 16.6 15.8 16.6 16.5 V 17.1 C 16.6 19.2 15.3 20.5 13.2 20.5 H 6.6 C 4.5 20.5 3.2 19.2 3.2 17.1 V 16.3 C 3.2 15.65 3.8 15.55 4.45 15.9 C 5.55 16.5 6.85 15.6 6.85 13.9 C 6.85 12.2 5.55 11.3 4.45 11.9 C 3.8 12.25 3.2 12.15 3.2 11.5 Z"
      />
    )
  },
  marketplace: {
    outline: (
      <>
        <path d="M 6.0 3.8 H 18.0 C 18.95 3.8 19.75 4.35 20.05 5.25 L 21.0 8.2 C 21.0 10.1 19.6 11.2 18.0 11.2 C 16.4 11.2 15.0 10.1 15.0 8.5 C 15.0 10.1 13.6 11.2 12.0 11.2 C 10.4 11.2 9.0 10.1 9.0 8.5 C 9.0 10.1 7.6 11.2 6.0 11.2 C 4.4 11.2 3.0 10.1 3.0 8.2 L 3.95 5.25 C 4.25 4.35 5.05 3.8 6.0 3.8 Z" />
        <path d="M 4.5 11.0 V 17.4 C 4.5 19.0 5.7 20.2 7.3 20.2 H 16.7 C 18.3 20.2 19.5 19.0 19.5 17.4 V 11.0" />
        <path d="M 9.8 20.2 V 16.6 A 2.2 2.2 0 0 1 14.2 16.6 V 20.2" />
      </>
    ),
    filled: (
      <>
        <path
          {...fill}
          d="M 5.6 3.2 H 18.4 C 19.5 3.2 20.4 3.85 20.75 4.85 L 21.6 7.8 C 21.6 9.85 20.0 11.0 18.2 11.0 C 16.65 11.0 15.4 10.1 15.0 8.9 C 14.6 10.1 13.35 11.0 12.0 11.0 C 10.65 11.0 9.4 10.1 9.0 8.9 C 8.6 10.1 7.35 11.0 5.8 11.0 C 4.0 11.0 2.4 9.85 2.4 7.8 L 3.25 4.85 C 3.6 3.85 4.5 3.2 5.6 3.2 Z"
        />
        <path
          fillRule="evenodd"
          {...fill}
          d="M 4.0 12.5 H 20.0 V 17.5 C 20.0 19.3 18.6 20.7 16.8 20.7 H 7.2 C 5.4 20.7 4.0 19.3 4.0 17.5 V 12.5 Z M 9.6 20.7 V 16.8 A 2.4 2.4 0 0 1 14.4 16.8 V 20.7 Z"
        />
      </>
    )
  },
  files: {
    outline: (
      <>
        <path d="M 3.0 7.7 C 3.0 5.9 4.4 4.5 6.2 4.5 H 8.4 C 9.6 4.5 10.1 5.0 10.7 5.8 C 11.3 6.5 11.8 7.0 12.9 7.0 H 17.8 C 19.6 7.0 21.0 8.4 21.0 10.2 V 16.3 C 21.0 18.1 19.6 19.5 17.8 19.5 H 6.2 C 4.4 19.5 3.0 18.1 3.0 16.3 Z" />
        <path d="M 3.2 10.2 H 20.8" />
      </>
    ),
    filled: (
      <path
        fillRule="evenodd"
        {...fill}
        d="M 2.5 7.6 C 2.5 5.6 4.1 4.0 6.1 4.0 H 8.4 C 9.7 4.0 10.2 4.55 10.85 5.4 C 11.45 6.15 11.95 6.6 13.1 6.6 H 17.9 C 19.9 6.6 21.5 8.2 21.5 10.2 V 16.4 C 21.5 18.4 19.9 20.0 17.9 20.0 H 6.1 C 4.1 20.0 2.5 18.4 2.5 16.4 Z M 4.4 9.5 H 19.6 A 0.75 0.75 0 0 1 19.6 11.0 H 4.4 A 0.75 0.75 0 0 1 4.4 9.5 Z"
      />
    )
  },
  devices: {
    outline: (
      <>
        <path d="M 11.2 14.6 H 5.4 C 4.0 14.6 3.0 13.6 3.0 12.2 V 6.6 C 3.0 5.2 4.0 4.2 5.4 4.2 H 14.2 C 15.6 4.2 16.6 5.2 16.6 6.6" />
        <path d="M 2.6 17.8 H 10.8" />
        <rect x={13.8} y={8.8} width={7.2} height={10.8} rx={2.3} />
      </>
    ),
    filled: (
      <>
        <path
          fillRule="evenodd"
          {...fill}
          d="M 5.4 3.6 H 14.2 C 15.8 3.6 17.0 4.7 17.1 6.3 V 7.1 H 14.4 C 12.7 7.1 11.7 8.1 11.7 9.8 V 15.2 H 5.4 C 3.7 15.2 2.5 14.0 2.5 12.3 V 6.5 C 2.5 4.8 3.7 3.6 5.4 3.6 Z M 5.2 5.9 A 0.7 0.7 0 0 0 4.5 6.6 V 12.1 A 0.7 0.7 0 0 0 5.2 12.8 H 11.7 V 9.8 C 11.7 8.1 12.7 7.1 14.4 7.1 H 15.1 V 6.6 A 0.7 0.7 0 0 0 14.4 5.9 Z"
        />
        <rect x={2} y={17} width={9.4} height={2.1} rx={1.05} {...fill} />
        <path
          fillRule="evenodd"
          {...fill}
          d="M 15.8 8.7 H 19.0 C 20.5 8.7 21.6 9.8 21.6 11.3 V 17.5 C 21.6 19.0 20.5 20.1 19.0 20.1 H 15.8 C 14.3 20.1 13.2 19.0 13.2 17.5 V 11.3 C 13.2 9.8 14.3 8.7 15.8 8.7 Z M 16.4 16.9 A 0.7 0.7 0 0 0 16.4 18.3 H 18.4 A 0.7 0.7 0 0 0 18.4 16.9 Z"
        />
      </>
    )
  }
}

/** NavIcon: outline at rest, filled for the active destination; `strokeWidth` overrides the glyph's own. */
export function NavIcon({
  id,
  filled = false,
  size,
  strokeWidth,
  className
}: {
  id: NavIconId
  filled?: boolean
  size: number
  strokeWidth?: number
  className?: string
}) {
  const glyph = GLYPHS[id]
  const box = filled && glyph.padded ? '-1 -1 26 26' : '0 0 24 24'
  return (
    <svg
      aria-hidden="true"
      viewBox={box}
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth ?? glyph.stroke ?? 2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}>
      {filled ? glyph.filled : glyph.outline}
    </svg>
  )
}

/**
 * FloatingNavDock on a chat surface: a solid chat-background band 18pt above the screen edge holding
 * NavTabStrip's 46pt pills (default pins: Chat, Agents, More); the active one is filled on secondary.
 */
export function FloatingDock({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn('absolute inset-x-0 bottom-0 pb-[18px]', tone.chat, className)}>
      <div className="flex items-center justify-center gap-2 px-6">
        {(['chat', 'agents', 'more'] as const).map((id) => (
          <span
            key={id}
            className={cn(
              'flex h-[46px] max-w-[100px] flex-1 items-center justify-center rounded-full',
              id === 'chat' ? cn('bg-black/5 dark:bg-white/[0.13]', tone.foreground) : tone.muted
            )}>
            <NavIcon id={id} filled={id === 'chat'} size={24} strokeWidth={2} />
          </span>
        ))}
      </div>
    </div>
  )
}
