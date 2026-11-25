import { type RefObject, useEffect } from 'react'

/** Keeps a scroll container pinned to its newest content, like the desktop message list following a stream. */
export function useStickToBottom(container: RefObject<HTMLElement | null>, content: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const scroller = container.current
    const inner = content.current
    if (!scroller || !inner) return
    const observer = new ResizeObserver(() => {
      scroller.scrollTo({ top: scroller.scrollHeight, behavior: 'smooth' })
    })
    observer.observe(inner)
    return () => observer.disconnect()
  }, [container, content])
}
