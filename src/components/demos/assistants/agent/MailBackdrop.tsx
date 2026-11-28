import { Archive, Forward, Reply, Search, SquarePen, Trash2, Wifi } from 'lucide-react'
import { type RefObject, useEffect, useState } from 'react'

import logo from '@/assets/images/logo.png'
import { useDemoLocale } from '@/components/demos/primitives/useDemoLocale'
import type { SelectionAgentCopy } from '@/content/demos/selectionAgent'
import { cn } from '@/lib/utils'

interface MailBackdropProps {
  copy: SelectionAgentCopy
  bodyRef: RefObject<HTMLDivElement>
  scrollerRef: RefObject<HTMLDivElement>
  onScroll: () => void
  onBodyPointerDown: () => void
}

/** The menu bar clock: the visitor's own weekday and time, ticking on the minute. */
function MenuClock() {
  const { tag } = useDemoLocale()
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    let timer: number
    const tick = () => {
      setNow(new Date())
      timer = window.setTimeout(tick, 60_000 - (Date.now() % 60_000))
    }
    timer = window.setTimeout(tick, 60_000 - (Date.now() % 60_000))
    return () => window.clearTimeout(timer)
  }, [])
  return (
    <span className="tabular-nums">
      {now.toLocaleDateString(tag, { weekday: 'short' })}{' '}
      {now.toLocaleTimeString(tag, { hour: 'numeric', minute: '2-digit' })}
    </span>
  )
}

/** Someone else's app on the desktop: a mail client whose message text the visitor can select. */
export function MailBackdrop({ copy, bodyRef, scrollerRef, onScroll, onBodyPointerDown }: MailBackdropProps) {
  const { mail, menubar } = copy

  return (
    <>
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-br from-[#d9e4f2] via-[#e7def0] to-[#f3e1d6] dark:from-[#141b29] dark:via-[#1d1829] dark:to-[#261c17]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 flex h-6 items-center gap-4 bg-white/45 px-3 text-[12px] text-zinc-800 backdrop-blur-md dark:bg-black/35 dark:text-zinc-200">
        <span className="font-semibold">{menubar.app}</span>
        {menubar.items.map((item) => (
          <span key={item} className="hidden @[560px]:inline">
            {item}
          </span>
        ))}
        <span className="ml-auto flex items-center gap-3">
          <img src={logo} alt="" className="size-3.5 rounded-full grayscale" draggable={false} />
          <Wifi className="size-3.5" />
          <MenuClock />
        </span>
      </div>

      <div className="absolute top-9 right-3 bottom-3 left-3 flex overflow-hidden rounded-[10px] border border-black/10 bg-white text-zinc-800 shadow-[0_18px_50px_-20px_rgb(15_23_42/0.35)] @[1100px]:right-[16%] dark:border-white/10 dark:bg-[#1c1c1f] dark:text-zinc-100 dark:shadow-[0_18px_50px_-20px_rgb(0_0_0/0.7)]">
        <aside
          aria-hidden="true"
          className="hidden w-56 shrink-0 flex-col border-r border-black/8 bg-zinc-50 @[720px]:flex dark:border-white/8 dark:bg-[#18181b]">
          <div className="flex h-11 shrink-0 items-center gap-2 px-3.5">
            <span className="flex gap-2">
              <span className="size-3 rounded-full bg-black/12 dark:bg-white/15" />
              <span className="size-3 rounded-full bg-black/12 dark:bg-white/15" />
              <span className="size-3 rounded-full bg-black/12 dark:bg-white/15" />
            </span>
            <Search className="ml-auto size-3.5 text-zinc-500" />
          </div>
          <p className="px-3.5 pb-1 text-[11px] font-semibold text-zinc-500">{mail.mailbox}</p>
          <ul className="flex flex-col gap-0.5 px-1.5">
            {mail.list.map((item, index) => (
              <li
                key={item.subject}
                className={cn(
                  'rounded-md px-2 py-1.5',
                  index === 0 ? 'bg-sky-500/12 dark:bg-sky-400/15' : 'text-zinc-600 dark:text-zinc-400'
                )}>
                <span className="flex items-center gap-2 text-[12px] font-semibold">
                  {index === 0 && <span className="size-1.5 shrink-0 rounded-full bg-sky-500" />}
                  <span className="truncate">{item.from}</span>
                  <span className="ml-auto shrink-0 font-normal text-zinc-500 tabular-nums">{item.time}</span>
                </span>
                <span className="mt-0.5 block truncate text-[11.5px]">{item.subject}</span>
              </li>
            ))}
          </ul>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <div
            aria-hidden="true"
            className="flex h-11 shrink-0 items-center gap-3 border-b border-black/8 px-3.5 text-zinc-500 dark:border-white/8">
            <span className="flex gap-2 @[720px]:hidden">
              <span className="size-3 rounded-full bg-black/12 dark:bg-white/15" />
              <span className="size-3 rounded-full bg-black/12 dark:bg-white/15" />
              <span className="size-3 rounded-full bg-black/12 dark:bg-white/15" />
            </span>
            <Archive className="size-4" />
            <Trash2 className="size-4" />
            <span className="h-4 w-px bg-black/10 dark:bg-white/10" />
            <Reply className="size-4" />
            <Forward className="size-4" />
            <SquarePen className="ml-auto size-4" />
          </div>
          <div ref={scrollerRef} onScroll={onScroll} className="min-h-0 flex-1 overflow-y-auto [scrollbar-width:thin]">
            <div
              ref={bodyRef}
              onPointerDown={onBodyPointerDown}
              className="max-w-[600px] cursor-text px-5 pt-4 pb-16 select-text selection:bg-sky-400/35 @[720px]:px-7">
              <h3 data-subject="" className="text-[17px] leading-6 font-semibold tracking-tight text-balance">
                {mail.subject}
              </h3>
              <div className="mt-3 flex items-center gap-2.5">
                <span
                  aria-hidden="true"
                  className="flex size-8 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-amber-300 to-rose-400 text-[12px] font-semibold text-white">
                  {mail.from.slice(0, 1)}
                </span>
                <div className="min-w-0 flex-1 leading-tight">
                  <p className="truncate text-[13px]">
                    <span className="font-semibold">{mail.from}</span>{' '}
                    <span className="text-zinc-500">&lt;{mail.address}&gt;</span>
                  </p>
                  <p className="truncate text-[12px] text-zinc-500">{mail.to}</p>
                </div>
                <span className="shrink-0 text-[12px] text-zinc-500 tabular-nums">{mail.time}</span>
              </div>
              {mail.paragraphs.map((paragraph, index) => (
                <p key={index} data-paragraph={index} className="mt-3.5 text-[14px] leading-[22px]">
                  {paragraph}
                </p>
              ))}
              <p className="mt-3.5 text-[14px] leading-[22px] whitespace-pre-line">{mail.signoff}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
