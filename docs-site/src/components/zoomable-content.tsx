'use client'

import { X } from 'lucide-react'
import { type MouseEvent, type ReactNode, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

// Article images arrive as Markdown, raw HTML and full-size links; all of them
// open in this viewer instead of navigating to the raw file.
const IMAGE_FILE = /\.(?:avif|bmp|gif|ico|jpe?g|png|svg|webp)$/i

const LABELS: Record<string, { close: string; preview: string }> = {
  'zh-cn': { close: '关闭', preview: '图片预览' },
  en: { close: 'Close', preview: 'Image preview' }
}

type ZoomedImage = { src: string; alt: string }

function isImageHref(href: string) {
  try {
    return IMAGE_FILE.test(new URL(href, window.location.href).pathname)
  } catch {
    return false
  }
}

export function ZoomableContent({
  children,
  className,
  contentLang,
  locale
}: {
  children: ReactNode
  className: string
  contentLang: string
  locale: string
}) {
  const labels = LABELS[locale] ?? LABELS.en
  const [zoomed, setZoomed] = useState<ZoomedImage | null>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const returnFocus = useRef<HTMLElement | null>(null)

  const show = (image: ZoomedImage) => {
    returnFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
    setZoomed(image)
  }

  const onClick = (event: MouseEvent<HTMLDivElement>) => {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    )
      return
    const target = event.target
    if (!(target instanceof Element)) return
    const image = target.closest('img')
    const anchor = target.closest('a')
    if (anchor) {
      // Full-size links zoom, including clicks on their letterboxed area; links to
      // pages or external sites keep navigating.
      const linked = anchor.querySelector('img')
      if (!linked || !isImageHref(anchor.getAttribute('href') ?? '')) return
      event.preventDefault()
      show({ src: anchor.href, alt: image?.alt || linked.alt })
      return
    }
    if (!image) return
    show({ src: image.currentSrc || image.src, alt: image.alt })
  }

  useEffect(() => {
    if (!zoomed) return
    const body = document.body
    const previousOverflow = body.style.overflow
    body.style.overflow = 'hidden'
    closeRef.current?.focus()
    const onKeyDown = (event: KeyboardEvent) => {
      // Swallow page shortcuts so ⌘K cannot stack the search dialog under the viewer.
      event.stopPropagation()
      if (event.key === 'Escape' && !event.defaultPrevented) setZoomed(null)
      else if (event.key === 'Tab') event.preventDefault()
    }
    window.addEventListener('keydown', onKeyDown, true)
    return () => {
      window.removeEventListener('keydown', onKeyDown, true)
      body.style.overflow = previousOverflow
      if (returnFocus.current?.isConnected) returnFocus.current.focus()
    }
  }, [zoomed])

  return (
    <div lang={contentLang} className={className} onClick={onClick}>
      {children}
      {zoomed &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label={zoomed.alt || labels.preview}
            className="fixed inset-0 z-[100] flex cursor-zoom-out items-center justify-center bg-black/80 p-4"
            onClick={(event) => {
              if (event.target === event.currentTarget) setZoomed(null)
            }}>
            {/* biome-ignore lint/performance/noImgElement: article images are runtime URLs without known dimensions */}
            <img
              src={zoomed.src}
              alt={zoomed.alt}
              className="max-h-full max-w-full cursor-default rounded-lg object-contain"
            />
            <button
              ref={closeRef}
              type="button"
              aria-label={labels.close}
              className="absolute top-4 right-4 rounded-full bg-black/50 p-3 text-white transition-colors hover:bg-black/70 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
              onClick={() => setZoomed(null)}>
              <X className="size-5" />
            </button>
          </div>,
          document.body
        )}
    </div>
  )
}
