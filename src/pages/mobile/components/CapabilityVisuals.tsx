import { AnimatePresence, m, useInView, useReducedMotion } from 'framer-motion'
import {
  Bell,
  BookOpen,
  CalendarDays,
  Check,
  Cloud,
  FileSearch,
  Laptop,
  ListChecks,
  NotebookPen,
  Plug,
  Smartphone,
  Sparkles
} from 'lucide-react'
import { type ReactNode, type RefObject, useEffect, useRef, useState } from 'react'

import pdfIcon from '@/assets/images/brand/skill/pdf.svg'
import powerpointIcon from '@/assets/images/brand/skill/powerpoint.svg'
import tableIcon from '@/assets/images/brand/skill/table.svg'
import wordIcon from '@/assets/images/brand/skill/word.svg'
import lightTrails from '@/assets/images/paintings/light-trails.webp'
import trainWindow from '@/assets/images/paintings/train-window.webp'
import y2kStreet from '@/assets/images/paintings/y2k-street.webp'
import { ease, spring } from '@/lib/motion'
import { cn } from '@/lib/utils'

const TILE = 'flex shrink-0 items-center justify-center bg-background shadow-[inset_0_0_0_1px_var(--color-border)]'
const FAN = ['-rotate-[7deg]', '-rotate-[2deg]', 'rotate-[3deg]', 'rotate-[8deg]']
const LIFT = 'transition-transform duration-500 ease-settle group-hover:rotate-0'

/**
 * Steps through `count` beats every `ms` while the element is on screen. Reduced motion holds `rest`, so each
 * illustration shows its settled frame.
 */
function useBeat(count: number, ms: number, rest = count - 1): [RefObject<HTMLDivElement>, number] {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { amount: 0.5 })
  const reduced = useReducedMotion() ?? false
  const [beat, setBeat] = useState(reduced ? rest : 0)
  useEffect(() => {
    if (reduced) return setBeat(rest)
    if (!inView) return
    const timer = setInterval(() => setBeat((value) => (value + 1) % count), ms)
    return () => clearInterval(timer)
  }, [inView, reduced, count, ms, rest])
  return [ref, beat]
}

/** Skills: the three routines take turns lifting, as if an agent were picking one up. */
function SkillsVisual() {
  const [ref, beat] = useBeat(3, 1100, 2)
  return (
    <div ref={ref} className="flex items-center -space-x-2 transition-[gap] duration-500 group-hover:space-x-2">
      {[FileSearch, NotebookPen, ListChecks].map((Icon, index) => (
        <m.span
          key={index}
          animate={{ y: beat === index ? -8 : 0 }}
          transition={spring.morph}
          className={cn(TILE, LIFT, 'relative size-16 rounded-2xl ring-4 ring-card', FAN[index])}>
          <Icon className="size-7" strokeWidth={1.6} />
          {beat === index && (
            <m.span
              initial={{ scale: 0.4, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={spring.tactile}
              className="absolute -top-1.5 -right-1.5 flex size-6 items-center justify-center rounded-full bg-foreground text-background">
              <Sparkles className="size-3.5" />
            </m.span>
          )}
        </m.span>
      ))}
    </div>
  )
}

const SERVICES = [CalendarDays, Bell, BookOpen, Cloud]
const ORBIT = 50

/** Tools: the hub sends a signal down each spoke in turn, and the service it reaches lights up. */
function ToolsVisual() {
  const [ref, beat] = useBeat(SERVICES.length, 1000, 0)
  return (
    <div ref={ref} className="relative flex size-32 items-center justify-center">
      <svg aria-hidden="true" viewBox="-64 -64 128 128" className="absolute inset-0 size-full overflow-visible">
        {SERVICES.map((_, index) => {
          const angle = ((index * 90 + 45 - 90) * Math.PI) / 180
          const x = Math.cos(angle) * ORBIT
          const y = Math.sin(angle) * ORBIT
          return (
            <g key={index}>
              <line x1={0} y1={0} x2={x} y2={y} className="stroke-foreground/20" strokeWidth={1.25} strokeDasharray="2 3" />
              {beat === index && (
                <m.circle
                  r={2.5}
                  className="fill-foreground"
                  initial={{ cx: 0, cy: 0, opacity: 0 }}
                  animate={{ cx: x * 0.72, cy: y * 0.72, opacity: [0, 1, 1, 0] }}
                  transition={{ duration: 0.45, ease: ease.inOut }}
                />
              )}
            </g>
          )
        })}
      </svg>
      {SERVICES.map((Icon, index) => {
        const active = beat === index
        return (
          <span
            key={index}
            className="absolute"
            style={{
              transform: `rotate(${index * 90 + 45}deg) translateY(-${ORBIT}px) rotate(${-(index * 90 + 45)}deg)`
            }}>
            <m.span
              animate={{ scale: active ? 1.12 : 1 }}
              transition={{ ...spring.tactile, delay: active ? 0.35 : 0 }}
              className={cn(
                TILE,
                'size-9 rounded-xl transition-colors delay-300 duration-200',
                active && 'bg-foreground text-background shadow-none'
              )}>
              <Icon className="size-4" strokeWidth={1.7} />
            </m.span>
          </span>
        )
      })}
      <span className={cn(TILE, 'relative size-12 rounded-2xl bg-foreground text-background shadow-none')}>
        <m.span
          className="absolute inset-0 rounded-2xl ring-2 ring-foreground/30"
          animate={{ scale: [1, 1.35], opacity: [0.8, 0] }}
          transition={{ duration: 1, ease: 'easeOut', repeat: Number.POSITIVE_INFINITY }}
        />
        <Plug className="size-5" />
      </span>
    </div>
  )
}

const FILES = [
  { label: 'PDF', icon: pdfIcon },
  { label: 'DOCX', icon: wordIcon },
  { label: 'XLSX', icon: tableIcon },
  { label: 'PPTX', icon: powerpointIcon }
]

/** Files: each file in the fan rises in turn, like results landing in the library. */
function FilesVisual() {
  const [ref, beat] = useBeat(FILES.length, 900, FILES.length - 1)
  return (
    <div ref={ref} className="flex items-center -space-x-5 transition-[gap] duration-500 group-hover:-space-x-1">
      {FILES.map((file, index) => (
        <m.span
          key={file.label}
          animate={{ y: beat === index ? -10 : 0 }}
          transition={spring.morph}
          className={cn(TILE, LIFT, 'h-24 w-[84px] flex-col gap-1.5 rounded-xl pb-2.5 ring-4 ring-card', FAN[index])}>
          <img src={file.icon} alt="" className="mt-4 mb-auto size-9" />
          <span className="text-[10px] font-semibold text-muted-foreground">{file.label}</span>
        </m.span>
      ))}
    </div>
  )
}

const PAINTINGS = [lightTrails, y2kStreet, trainWindow]

/** Images: the board brings each version to the front in turn. */
function ImagesVisual() {
  const [ref, beat] = useBeat(PAINTINGS.length, 1600, 1)
  return (
    <div ref={ref} className="flex items-center -space-x-6 transition-[gap] duration-500 group-hover:-space-x-2">
      {PAINTINGS.map((src, index) => (
        <m.img
          key={src}
          src={src}
          alt=""
          loading="lazy"
          animate={{ scale: beat === index ? 1.08 : 0.94, zIndex: beat === index ? 10 : 0 }}
          transition={spring.morph}
          className={cn('relative h-28 w-20 rounded-xl object-cover shadow-md ring-4 ring-card', LIFT, FAN[index])}
        />
      ))}
    </div>
  )
}

/** Desktop: a task leaves the phone, runs on the computer, and comes back done. */
function DesktopVisual() {
  // 0 send · 1 running · 2 done
  const [ref, beat] = useBeat(3, 1200, 2)
  return (
    <div ref={ref} className="flex items-center gap-3">
      <span className={cn(TILE, 'relative h-24 w-14 rounded-2xl')}>
        <Smartphone className="size-6" strokeWidth={1.6} />
        <AnimatePresence>
          {beat === 2 && (
            <m.span
              initial={{ scale: 0.4, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.6, opacity: 0 }}
              transition={spring.tactile}
              className="absolute -top-2 -right-2 flex size-6 items-center justify-center rounded-full bg-emerald-500 text-white shadow-sm">
              <Check className="size-3.5" strokeWidth={3} />
            </m.span>
          )}
        </AnimatePresence>
      </span>
      <span aria-hidden="true" className="relative flex h-2 w-14 items-center justify-between">
        {[0, 1, 2, 3].map((dot) => (
          <span key={dot} className="size-1.5 rounded-full bg-foreground/20" />
        ))}
        {beat !== 1 && (
          <m.span
            key={beat}
            className="absolute size-2 rounded-full bg-foreground"
            initial={{ left: beat === 0 ? '0%' : '100%', opacity: 0 }}
            animate={{ left: beat === 0 ? '100%' : '0%', opacity: [0, 1, 1, 0] }}
            transition={{ duration: 0.7, ease: ease.inOut }}
          />
        )}
      </span>
      <span className={cn(TILE, 'h-20 w-28 flex-col gap-2 rounded-xl px-4')}>
        <Laptop className="size-7" strokeWidth={1.5} />
        <span className="relative h-1 w-full overflow-hidden rounded-full bg-foreground/10">
          <m.span
            className="absolute inset-y-0 left-0 rounded-full bg-foreground"
            animate={{ width: beat === 0 ? '0%' : beat === 1 ? '70%' : '100%' }}
            transition={{ duration: beat === 0 ? 0.2 : 1, ease: ease.inOut }}
          />
        </span>
      </span>
    </div>
  )
}

const SSH_LINES: ReactNode[] = [
  <span key="ssh">
    <span className="text-emerald-400">$</span> ssh deploy@prod-01
  </span>,
  <span key="ls" className="text-[#8a8a8a]">
    ~/app $ ls logs/
  </span>,
  <span key="logs">
    api.log <span className="text-sky-400">worker.log</span>
  </span>
]

/** SSH: the session prints one line at a time, then waits at the prompt. */
function SshVisual() {
  const [ref, beat] = useBeat(SSH_LINES.length + 2, 700, SSH_LINES.length + 1)
  const shown = Math.min(beat, SSH_LINES.length)
  return (
    <div
      ref={ref}
      className="h-[116px] w-60 rounded-xl bg-[#1e1e1e] p-3 font-mono text-[11px] leading-5 text-[#d4d4d4] shadow-md">
      {SSH_LINES.slice(0, shown).map((line, index) => (
        <m.p
          key={index}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, ease: ease.settle }}>
          {line}
        </m.p>
      ))}
      <p>
        <span className="text-emerald-400">~/app $</span>
        <span className="ml-1 inline-block h-3 w-1.5 translate-y-0.5 bg-[#d4d4d4] motion-safe:animate-caret" />
      </p>
    </div>
  )
}

export const capabilityVisuals = {
  skills: <SkillsVisual />,
  tools: <ToolsVisual />,
  files: <FilesVisual />,
  images: <ImagesVisual />,
  desktop: <DesktopVisual />,
  ssh: <SshVisual />
}
