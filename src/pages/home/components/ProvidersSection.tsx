import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform
} from 'framer-motion'
import { type FC, useEffect, useId, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { cn } from '@/lib/utils'
import {
  AnimatedCounter,
  EASE_APPLE,
  getOrbitPosition,
  OrbitLogoBadge,
  useOrbitRotation
} from './providers/OrbitShared'
import { getProviderLogos } from './providers/providerLogos'

const ProvidersSection: FC = () => {
  const { t, i18n } = useTranslation()
  const { isZh, innerLogos, outerLogos } = getProviderLogos(i18n.language)

  const trackRef = useRef<HTMLElement>(null)
  const gradientId = useId().replace(/:/g, '')
  const reducedMotion = Boolean(useReducedMotion())
  const isInViewport = useInView(trackRef, { amount: 0.02 })

  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(min-width: 768px)').matches : true
  )
  const [hovered, setHovered] = useState<{ ring: 'inner' | 'outer'; name: string } | null>(null)
  const [activeAct, setActiveAct] = useState<0 | 1 | 2>(0)

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const update = () => setIsDesktop(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  const enableStickyScrub = isDesktop && !reducedMotion

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start start', 'end end']
  })
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 26,
    mass: 0.25
  })

  useMotionValueEvent(smoothProgress, 'change', (latest) => {
    if (!enableStickyScrub) return
    if (latest < 0.25) {
      setActiveAct(0)
    } else if (latest < 0.52) {
      setActiveAct(1)
    } else {
      setActiveAct(2)
    }
  })

  // Ambient rotation layered with scroll-scrubbed swirl
  const { outerRotate, innerRotate } = useOrbitRotation({
    isActive: isInViewport,
    outerSpeed: 5.5,
    innerSpeed: -11.5,
    outerPaused: hovered?.ring === 'outer',
    innerPaused: hovered?.ring === 'inner',
    reducedMotion
  })

  // Act 1 (0.00 -> 0.22): Header & Core Ignition
  const headerOpacity = useTransform(smoothProgress, [0, 0.16, 0.78, 1], [0.25, 1, 1, 0.18])
  const headerY = useTransform(smoothProgress, [0, 0.18, 0.78, 1], [24, 0, 0, -28])
  const coreScale = useTransform(smoothProgress, [0, 0.14, 0.24, 0.78, 1], [0.72, 1.06, 1, 1, 0.9])
  const coreHaloOpacity = useTransform(smoothProgress, [0, 0.22, 0.78, 1], [0.06, 0.22, 0.18, 0.04])
  const counterProgress = useTransform(smoothProgress, [0, 0.24], [0, 1])

  // Act 2 (0.16 -> 0.48): Inner Ring Bloom
  const innerPathLength = useTransform(smoothProgress, [0.16, 0.42], [0, 1])
  const innerScale = useTransform(smoothProgress, [0.16, 0.46, 0.78, 1], [0.55, 1, 1, 0.93])
  const innerOpacity = useTransform(smoothProgress, [0.16, 0.36, 0.78, 1], [0, 1, 1, 0.2])
  const innerScrollSpin = useTransform(smoothProgress, [0.16, 0.48], [-35, 0])

  // Act 3 (0.40 -> 0.72): Outer Ecosystem Unfurl
  const outerPathLength = useTransform(smoothProgress, [0.4, 0.68], [0, 1])
  const outerScale = useTransform(smoothProgress, [0.4, 0.7, 0.78, 1], [0.68, 1, 1, 1.07])
  const outerOpacity = useTransform(smoothProgress, [0.4, 0.6, 0.78, 1], [0, 1, 1, 0.16])
  const outerScrollSpin = useTransform(smoothProgress, [0.4, 0.72], [25, 0])
  const cometOpacity = useTransform(smoothProgress, [0.48, 0.7, 0.78, 1], [0, 0.75, 0.75, 0.1])

  // Act 4 (0.78 -> 1.00): Graceful Recession Exit
  const stageScale = useTransform(smoothProgress, [0.78, 1], [1, 0.86])
  const stageOpacity = useTransform(smoothProgress, [0.78, 1], [1, 0.16])
  const stageY = useTransform(smoothProgress, [0.78, 1], [0, -36])

  const combinedOuterRotate = useTransform([outerRotate, outerScrollSpin], ([a, b]: number[]) =>
    enableStickyScrub ? a + b : a
  )
  const combinedInnerRotate = useTransform([innerRotate, innerScrollSpin], ([a, b]: number[]) =>
    enableStickyScrub ? a + b : a
  )
  const combinedOuterCounter = useTransform(combinedOuterRotate, (v) => -v)
  const combinedInnerCounter = useTransform(combinedInnerRotate, (v) => -v)

  const stageLabels = isZh
    ? ['01 核心汇聚', '02 旗舰模型', '03 生态互联']
    : ['01 Core Hub', '02 Flagship', '03 Ecosystem']

  return (
    <section ref={trackRef} className="bg-background relative md:h-[250vh]">
      <div className="flex min-h-[600px] flex-col items-center justify-center overflow-x-clip px-4 pt-20 pb-6 sm:px-6 md:sticky md:top-0 md:h-screen lg:px-8">
        {/* Section Header */}
        <motion.div
          style={enableStickyScrub ? { opacity: headerOpacity, y: headerY } : undefined}
          className="mx-auto mb-5 max-w-3xl text-center sm:mb-7">
          <h2 className="text-foreground mb-2 text-2xl font-bold sm:mb-3 sm:text-4xl lg:text-5xl">
            {t('providers.title')}
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base">{t('providers.subtitle')}</p>
        </motion.div>

        {/* Orbital Stage */}
        <motion.div
          style={enableStickyScrub ? { scale: stageScale, opacity: stageOpacity, y: stageY } : undefined}
          className="relative mx-auto h-[300px] w-[300px] sm:h-[420px] sm:w-[420px] md:h-[min(56vh,520px)] md:w-[min(56vh,520px)]">
          {/* Core Halo */}
          <motion.div
            aria-hidden
            style={enableStickyScrub ? { opacity: coreHaloOpacity } : { opacity: 0.16 }}
            className="bg-primary/30 pointer-events-none absolute top-1/2 left-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl sm:h-56 sm:w-56"
          />

          {/* SVG Orbit Rings + Comet Beams */}
          <svg
            viewBox="0 0 600 600"
            className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
            aria-hidden>
            <defs>
              <linearGradient id={`${gradientId}-sticky-outer`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="var(--primary)" stopOpacity="0" />
                <stop offset="55%" stopColor="#f97316" stopOpacity="0.35" />
                <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.85" />
              </linearGradient>
              <linearGradient id={`${gradientId}-sticky-inner`} x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="var(--primary)" stopOpacity="0" />
                <stop offset="60%" stopColor="var(--primary)" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#f97316" stopOpacity="0.85" />
              </linearGradient>
            </defs>

            <motion.circle
              cx={300}
              cy={300}
              r={299}
              fill="none"
              stroke="currentColor"
              strokeWidth={1}
              className="text-border/65"
              style={enableStickyScrub ? { pathLength: outerPathLength, opacity: outerOpacity } : undefined}
            />
            <motion.circle
              cx={300}
              cy={300}
              r={149.5}
              fill="none"
              stroke="currentColor"
              strokeWidth={1}
              className="text-border/65"
              style={enableStickyScrub ? { pathLength: innerPathLength, opacity: innerOpacity } : undefined}
            />

            {!reducedMotion && (
              <motion.g style={enableStickyScrub ? { opacity: cometOpacity } : { opacity: 0.65 }}>
                <motion.g
                  style={{ transformOrigin: '300px 300px' }}
                  animate={isInViewport ? { rotate: 360 } : undefined}
                  transition={{ duration: 14, repeat: Number.POSITIVE_INFINITY, ease: 'linear' }}>
                  <circle
                    cx={300}
                    cy={300}
                    r={299}
                    fill="none"
                    stroke={`url(#${gradientId}-sticky-outer)`}
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeDasharray="190 1690"
                  />
                </motion.g>
                <motion.g
                  style={{ transformOrigin: '300px 300px' }}
                  animate={isInViewport ? { rotate: -360 } : undefined}
                  transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: 'linear' }}>
                  <circle
                    cx={300}
                    cy={300}
                    r={149.5}
                    fill="none"
                    stroke={`url(#${gradientId}-sticky-inner)`}
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeDasharray="115 830"
                  />
                </motion.g>
              </motion.g>
            )}
          </svg>

          {/* Outer Orbit Ring */}
          <motion.div
            style={{
              rotate: combinedOuterRotate,
              scale: enableStickyScrub ? outerScale : 1,
              opacity: enableStickyScrub ? outerOpacity : 1
            }}
            className={cn(
              'pointer-events-none absolute inset-0 will-change-transform',
              hovered?.ring === 'outer' ? 'z-30' : 'z-20'
            )}>
            {outerLogos.map((logo, index) => {
              const pos = getOrbitPosition(index, outerLogos.length, 50)
              const isHovered = hovered?.ring === 'outer' && hovered.name === logo.name
              const isDimmed = hovered !== null && !isHovered
              return (
                <OrbitLogoBadge
                  key={logo.name}
                  logo={logo}
                  pos={pos}
                  counterRotate={combinedOuterCounter}
                  size="outer"
                  isHovered={isHovered}
                  isDimmed={isDimmed}
                  dimGrayscale
                  showBeamGlow
                  enterReady
                  reducedMotion={reducedMotion}
                  onHoverStart={() => setHovered({ ring: 'outer', name: logo.name })}
                  onHoverEnd={() => setHovered((prev) => (prev?.name === logo.name ? null : prev))}
                />
              )
            })}
          </motion.div>

          {/* Inner Orbit Ring */}
          <motion.div
            style={{
              rotate: combinedInnerRotate,
              scale: enableStickyScrub ? innerScale : 1,
              opacity: enableStickyScrub ? innerOpacity : 1
            }}
            className={cn(
              'pointer-events-none absolute inset-0 will-change-transform',
              hovered?.ring === 'inner' ? 'z-30' : 'z-20'
            )}>
            {innerLogos.map((logo, index) => {
              const pos = getOrbitPosition(index, innerLogos.length, 25)
              const isHovered = hovered?.ring === 'inner' && hovered.name === logo.name
              const isDimmed = hovered !== null && !isHovered
              return (
                <OrbitLogoBadge
                  key={logo.name}
                  logo={logo}
                  pos={pos}
                  counterRotate={combinedInnerCounter}
                  size="inner"
                  isHovered={isHovered}
                  isDimmed={isDimmed}
                  dimGrayscale
                  showBeamGlow
                  enterReady
                  reducedMotion={reducedMotion}
                  onHoverStart={() => setHovered({ ring: 'inner', name: logo.name })}
                  onHoverEnd={() => setHovered((prev) => (prev?.name === logo.name ? null : prev))}
                />
              )
            })}
          </motion.div>

          {/* Center Core */}
          <motion.div
            style={enableStickyScrub ? { scale: coreScale } : undefined}
            className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
            <div className="flex flex-col items-center text-center">
              <div className="text-primary text-4xl font-bold sm:text-5xl lg:text-6xl">
                <AnimatedCounter
                  active
                  progress={enableStickyScrub ? counterProgress : undefined}
                  reducedMotion={reducedMotion}
                />
              </div>
              <div className="mt-1.5 flex h-6 items-center justify-center">
                <AnimatePresence mode="wait">
                  {hovered ? (
                    <motion.span
                      key={hovered.name}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.18, ease: EASE_APPLE }}
                      className="border-primary/25 bg-primary/10 text-primary inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium">
                      <span className="bg-primary h-1.5 w-1.5 animate-pulse rounded-full" />
                      {hovered.name}
                    </motion.span>
                  ) : (
                    <motion.span
                      key="models-label"
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.18, ease: EASE_APPLE }}
                      className="text-muted-foreground text-sm sm:text-base">
                      Models
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Minimalist 3-Stage Sticky Progress Indicator (Desktop) */}
        {enableStickyScrub && (
          <div className="border-border/60 bg-background/80 mt-5 hidden items-center gap-1.5 rounded-full border px-2 py-1 text-xs backdrop-blur-md md:inline-flex">
            {stageLabels.map((label, idx) => (
              <span
                key={label}
                className={cn(
                  'rounded-full px-2.5 py-0.5 transition-colors duration-300',
                  activeAct === idx ? 'bg-primary/12 text-primary font-medium' : 'text-muted-foreground/70'
                )}>
                {label}
              </span>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default ProvidersSection
