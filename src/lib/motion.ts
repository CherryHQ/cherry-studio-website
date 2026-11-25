import type { Transition } from 'framer-motion'

// Curves, springs and durations mirrored from Cherry Studio mobile (packages/ui/src/motion.ts)
// and desktop (dialog, selector shell and anchor rail easings).
export const ease = {
  settle: [0.22, 1, 0.36, 1],
  overshoot: [0.34, 1.25, 0.64, 1],
  inOut: [0.42, 0, 0.2, 1],
  sheet: [0.32, 0.72, 0, 1],
  expo: [0.16, 1, 0.3, 1],
  dock: [0.25, 1, 0.5, 1]
} as const

export const spring = {
  tactile: { type: 'spring', damping: 32, mass: 0.6, stiffness: 520 },
  morph: { type: 'spring', damping: 24, mass: 0.85, stiffness: 320 },
  settle: { type: 'spring', damping: 31.5, mass: 1, stiffness: 248 },
  gentle: { type: 'spring', damping: 26, mass: 1, stiffness: 180 },
  block: { type: 'spring', duration: 0.3, bounce: 0 }
} satisfies Record<string, Transition>

export const duration = { instant: 0.12, fast: 0.2, base: 0.25, slow: 0.35, dialog: 0.26 } as const

export const press = { whileTap: { scale: 0.97 }, transition: { duration: 0.11, ease: ease.settle } } as const

/** Scroll-reveal props; entrances start near full scale, never from scale(0). */
export function reveal(index = 0) {
  return {
    initial: { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-10% 0px' },
    transition: { ...spring.gentle, delay: index * 0.06 }
  } as const
}
