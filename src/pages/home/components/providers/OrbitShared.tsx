import {
  AnimatePresence,
  animate,
  type MotionValue,
  motion,
  useAnimationFrame,
  useMotionValue,
  useMotionValueEvent,
  useTransform
} from 'framer-motion'
import { type FC, useEffect, useRef, useState } from 'react'

import { cn } from '@/lib/utils'
import type { LogoInfo } from './providerLogos'

export const EASE_APPLE = [0.22, 1, 0.36, 1] as const

export function getOrbitPosition(index: number, total: number, radiusPercent: number) {
  const angle = ((index * 360) / total - 90) * (Math.PI / 180)
  return {
    x: 50 + radiusPercent * Math.cos(angle),
    y: 50 + radiusPercent * Math.sin(angle)
  }
}

interface UseOrbitRotationOptions {
  isActive: boolean
  outerSpeed: number
  innerSpeed: number
  outerPaused: boolean
  innerPaused: boolean
  reducedMotion: boolean
}

/**
 * Drives outer/inner ring rotations via MotionValues on the GPU compositor,
 * smoothly damping to pause on hover and sleeping when out of viewport.
 */
export function useOrbitRotation({
  isActive,
  outerSpeed,
  innerSpeed,
  outerPaused,
  innerPaused,
  reducedMotion
}: UseOrbitRotationOptions) {
  const outerRotate = useMotionValue(0)
  const innerRotate = useMotionValue(0)
  const outerCounterRotate = useTransform(outerRotate, (v) => -v)
  const innerCounterRotate = useTransform(innerRotate, (v) => -v)

  const outerFactorRef = useRef(1)
  const innerFactorRef = useRef(1)

  useAnimationFrame((_time, delta) => {
    if (!isActive || reducedMotion) return

    const dt = Math.min(delta, 50) / 1000
    const damp = 1 - Math.exp(-8 * dt)

    outerFactorRef.current += ((outerPaused ? 0 : 1) - outerFactorRef.current) * damp
    innerFactorRef.current += ((innerPaused ? 0 : 1) - innerFactorRef.current) * damp

    outerRotate.set(outerRotate.get() + outerSpeed * outerFactorRef.current * dt)
    innerRotate.set(innerRotate.get() + innerSpeed * innerFactorRef.current * dt)
  })

  return {
    outerRotate,
    innerRotate,
    outerCounterRotate,
    innerCounterRotate
  }
}

interface AnimatedCounterProps {
  target?: number
  active: boolean
  progress?: MotionValue<number>
  reducedMotion?: boolean
  className?: string
}

export const AnimatedCounter: FC<AnimatedCounterProps> = ({
  target = 300,
  active,
  progress,
  reducedMotion = false,
  className
}) => {
  const [value, setValue] = useState(reducedMotion ? target : 0)
  const fallbackProgress = useMotionValue(0)

  useEffect(() => {
    if (reducedMotion) {
      setValue(target)
      return
    }
    if (progress) {
      const clamped = Math.max(0, Math.min(1, progress.get()))
      setValue(Math.round(clamped * target))
      return
    }
    if (!active) return

    const controls = animate(0, target, {
      duration: 0.95,
      ease: EASE_APPLE,
      onUpdate: (latest) => setValue(Math.round(latest))
    })

    return () => controls.stop()
  }, [active, progress, reducedMotion, target])

  useMotionValueEvent(progress ?? fallbackProgress, 'change', (latest) => {
    if (!progress || reducedMotion) return
    const clamped = Math.max(0, Math.min(1, latest))
    setValue(Math.round(clamped * target))
  })

  return <span className={cn('tabular-nums', className)}>{value}+</span>
}

interface OrbitLogoBadgeProps {
  logo: LogoInfo
  pos: { x: number; y: number }
  counterRotate: MotionValue<number>
  size: 'outer' | 'inner'
  isHovered: boolean
  isDimmed: boolean
  dimGrayscale?: boolean
  showBeamGlow?: boolean
  enterDelay?: number
  enterReady?: boolean
  reducedMotion?: boolean
  onHoverStart: () => void
  onHoverEnd: () => void
}

export const OrbitLogoBadge: FC<OrbitLogoBadgeProps> = ({
  logo,
  pos,
  counterRotate,
  size,
  isHovered,
  isDimmed,
  dimGrayscale = false,
  showBeamGlow = false,
  enterDelay = 0,
  enterReady = true,
  reducedMotion = false,
  onHoverStart,
  onHoverEnd
}) => {
  const isOuter = size === 'outer'

  return (
    <div
      className={cn('pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2', isHovered ? 'z-40' : 'z-10')}
      style={{
        left: `${pos.x}%`,
        top: `${pos.y}%`
      }}>
      <motion.div style={{ rotate: counterRotate }}>
        <motion.div
          initial={reducedMotion ? false : { scale: 0.6, opacity: 0 }}
          animate={enterReady ? { scale: 1, opacity: 1 } : { scale: 0.6, opacity: 0 }}
          transition={
            reducedMotion
              ? { duration: 0 }
              : {
                  duration: 0.55,
                  delay: enterReady ? enterDelay : 0,
                  ease: EASE_APPLE
                }
          }>
          <motion.button
            type="button"
            aria-label={logo.name}
            onMouseEnter={onHoverStart}
            onMouseLeave={onHoverEnd}
            onFocus={onHoverStart}
            onBlur={onHoverEnd}
            animate={{
              scale: isHovered ? 1.16 : 1,
              opacity: isDimmed ? 0.4 : 1
            }}
            transition={{ duration: 0.22, ease: EASE_APPLE }}
            className={cn(
              'bg-background relative flex cursor-pointer items-center justify-center rounded-full border shadow-sm outline-none transition-colors duration-200',
              isOuter ? 'h-14 w-14 sm:h-16 sm:w-16 lg:h-18 lg:w-18' : 'h-11 w-11 sm:h-13 sm:w-13 lg:h-14 lg:w-14',
              isHovered
                ? showBeamGlow
                  ? 'border-primary/50 ring-primary/15 shadow-lg ring-4'
                  : 'border-primary/40 ring-primary/10 shadow-md ring-4'
                : 'border-border/60 hover:border-border',
              isDimmed && dimGrayscale && 'grayscale-[30%]'
            )}>
            <img
              src={logo.src}
              alt={logo.name}
              className={cn(
                'object-contain transition-transform duration-200',
                isOuter ? 'h-7 w-7 sm:h-8 sm:w-8 lg:h-9 lg:w-9' : 'h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7',
                logo.darkInvert && 'dark:invert'
              )}
            />

            <AnimatePresence>
              {isHovered && (
                <motion.span
                  initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 4, scale: 0.94 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 4, scale: 0.94 }}
                  transition={{ duration: 0.18, ease: EASE_APPLE }}
                  className="border-border/70 bg-background/95 text-foreground pointer-events-none absolute top-full mt-2 rounded-full border px-2.5 py-0.5 text-xs font-medium whitespace-nowrap shadow-md backdrop-blur-md">
                  {logo.name}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  )
}
