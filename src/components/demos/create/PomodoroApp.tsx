import { Pause, Play, RotateCcw, SkipForward } from 'lucide-react'
import { useEffect, useState } from 'react'

import type { ArtifactsDemoCopy } from '@/content/demos/create'
import { cn } from '@/lib/utils'

const MODES = { focus: 25 * 60, break: 5 * 60 } as const
const CIRCUMFERENCE = 327
const SESSIONS = 4

type Mode = keyof typeof MODES

const focusRing =
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary cursor-pointer transition-colors'

/** The artifact's preview, rendered as a working React app rather than an iframe. */
export function PomodoroApp({ app, playing }: { app: ArtifactsDemoCopy['app']; playing: boolean }) {
  const [mode, setMode] = useState<Mode>('focus')
  const [left, setLeft] = useState<number>(MODES.focus)
  const [running, setRunning] = useState(false)
  const [sessions, setSessions] = useState(0)

  const switchTo = (next: Mode) => {
    setMode(next)
    setLeft(MODES[next])
    setRunning(false)
  }
  const finish = () => {
    if (mode === 'focus') setSessions((count) => (count % SESSIONS) + 1)
    switchTo(mode === 'focus' ? 'break' : 'focus')
  }

  useEffect(() => {
    if (!running || !playing) return
    const timer = setInterval(() => setLeft((value) => Math.max(0, value - 1)), 1000)
    return () => clearInterval(timer)
  }, [running, playing])

  useEffect(() => {
    if (left === 0) finish()
  }, [left])

  const clock = `${String(Math.floor(left / 60)).padStart(2, '0')}:${String(left % 60).padStart(2, '0')}`
  const accent = mode === 'focus' ? 'text-rose-500' : 'text-emerald-500'

  return (
    <div className="[container-type:size] flex size-full flex-col items-center justify-center gap-[min(12px,3cqh)] overflow-hidden bg-background p-3 text-foreground">
      <div className="flex rounded-full bg-secondary p-0.5 text-xs">
        {(['focus', 'break'] as const).map((value) => (
          <button
            key={value}
            type="button"
            aria-pressed={mode === value}
            onClick={() => switchTo(value)}
            className={cn(
              'rounded-full px-3 py-1 font-medium',
              focusRing,
              mode === value ? 'bg-background text-foreground shadow-xs' : 'text-muted-foreground hover:text-foreground'
            )}>
            {app[value]}
          </button>
        ))}
      </div>

      <div className={cn('relative size-[min(132px,44cqh,72cqw)] shrink-0', accent)}>
        <svg viewBox="0 0 120 120" className="size-full -rotate-90" aria-hidden="true">
          <circle cx="60" cy="60" r="52" fill="none" strokeWidth="7" className="stroke-foreground/10" />
          <circle
            cx="60"
            cy="60"
            r="52"
            fill="none"
            stroke="currentColor"
            strokeWidth="7"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={CIRCUMFERENCE * (1 - left / MODES[mode])}
            className="transition-[stroke-dashoffset,color] duration-1000 ease-linear motion-reduce:transition-none"
          />
        </svg>
        <output
          aria-live="off"
          className="absolute inset-0 flex items-center justify-center text-[min(26px,9cqh,13cqw)] font-semibold text-foreground tabular-nums">
          {clock}
        </output>
      </div>

      <div className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={() => setRunning((value) => !value)}
          className={cn(
            'inline-flex h-7 items-center gap-1 rounded-full px-3 text-xs font-medium text-white',
            focusRing,
            mode === 'focus' ? 'bg-rose-500 hover:bg-rose-600' : 'bg-emerald-600 hover:bg-emerald-700'
          )}>
          {running ? (
            <Pause className="size-3 fill-current" aria-hidden="true" />
          ) : (
            <Play className="size-3 fill-current" aria-hidden="true" />
          )}
          {running ? app.pause : app.start}
        </button>
        <button
          type="button"
          aria-label={app.reset}
          title={app.reset}
          onClick={() => switchTo(mode)}
          className={cn(
            'flex size-7 items-center justify-center rounded-full bg-secondary text-muted-foreground hover:text-foreground',
            focusRing
          )}>
          <RotateCcw className="size-3.5" aria-hidden="true" />
        </button>
        <button
          type="button"
          aria-label={app.skip}
          title={app.skip}
          onClick={finish}
          className={cn(
            'flex size-7 items-center justify-center rounded-full bg-secondary text-muted-foreground hover:text-foreground',
            focusRing
          )}>
          <SkipForward className="size-3.5" aria-hidden="true" />
        </button>
      </div>

      <div className="flex gap-1.5" aria-hidden="true">
        {Array.from({ length: SESSIONS }, (_, index) => (
          <span
            key={index}
            className={cn(
              'size-1.5 rounded-full transition-colors duration-300',
              index < sessions ? 'bg-rose-500' : 'bg-foreground/15'
            )}
          />
        ))}
      </div>
    </div>
  )
}
