import { useInView, useReducedMotion } from 'framer-motion'
import { type RefObject, useEffect, useRef, useState } from 'react'

/** True while the demo is on screen and the tab is visible. */
export function useDemoPlayback(ref: RefObject<Element | null>) {
  const inView = useInView(ref, { amount: 0.35 })
  const [visible, setVisible] = useState(() => typeof document === 'undefined' || !document.hidden)

  useEffect(() => {
    const update = () => setVisible(!document.hidden)
    document.addEventListener('visibilitychange', update)
    return () => document.removeEventListener('visibilitychange', update)
  }, [])

  return inView && visible
}

class DemoAborted extends Error {}

export interface DemoScriptContext {
  /** Resolves after `ms` of playback time; pauses while off screen and is instant under reduced motion. */
  wait: (ms: number) => Promise<void>
  reduced: boolean
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

/**
 * Runs a scripted demo timeline once, starting the first time the demo is playing.
 * `replay()` restarts it; under reduced motion every wait resolves immediately so the script jumps to its end state.
 */
export function useDemoScript(run: (context: DemoScriptContext) => Promise<void>, playing: boolean) {
  const reduced = useReducedMotion() ?? false
  const [armed, setArmed] = useState(false)
  const [runId, setRunId] = useState(0)
  const [status, setStatus] = useState<'idle' | 'running' | 'done'>('idle')
  const playingRef = useRef(playing)
  const runRef = useRef(run)
  playingRef.current = playing
  runRef.current = run

  useEffect(() => {
    if (playing) setArmed(true)
  }, [playing])

  useEffect(() => {
    if (!armed) return
    let aborted = false
    const wait = async (ms: number) => {
      let left = reduced ? 0 : ms
      while (left > 0) {
        if (aborted) throw new DemoAborted()
        if (!playingRef.current) {
          await sleep(120)
          continue
        }
        const chunk = Math.min(left, 40)
        await sleep(chunk)
        left -= chunk
      }
      if (aborted) throw new DemoAborted()
    }
    setStatus('running')
    runRef
      .current({ wait, reduced })
      .then(() => {
        if (!aborted) setStatus('done')
      })
      .catch((error: unknown) => {
        if (!(error instanceof DemoAborted)) throw error
      })
    return () => {
      aborted = true
    }
  }, [armed, runId, reduced])

  return { status, reduced, replay: () => setRunId((id) => id + 1) }
}
