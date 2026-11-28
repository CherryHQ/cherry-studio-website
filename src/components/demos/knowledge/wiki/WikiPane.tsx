import { AnimatePresence, m } from 'framer-motion'
import { ArrowLeft, Check, FileSearch, Link2, LoaderCircle, Plus, StickyNote, X } from 'lucide-react'

import type { KnowledgeWikiCopy, WikiBlock, WikiPage, WikiPageId } from '@/content/demos/knowledgeWiki'
import { ease, spring } from '@/lib/motion'
import { cn } from '@/lib/utils'

export type WikiPhase = 'before' | 'indexing' | 'ready'

const FOCUS = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
// Badge tones: the app's success / info status tokens.
const BADGE = {
  new: 'bg-green-500/12 text-green-600 dark:text-green-400',
  updated: 'bg-blue-500/12 text-blue-600 dark:text-blue-400'
}
// Desktop models.ts note icon: StickyNote in amber on a subtle tile.
const NoteIcon = () => (
  <span className="flex size-6 shrink-0 items-center justify-center rounded bg-muted/60">
    <StickyNote className="size-3.5 text-amber-500" aria-hidden="true" />
  </span>
)

export function ChangeBadge({ change, copy }: { change: 'new' | 'updated'; copy: KnowledgeWikiCopy }) {
  return (
    <span className={cn('shrink-0 rounded-full px-1.5 py-px text-[11px] leading-4 font-medium', BADGE[change])}>
      {copy.labels.badge[change]}
    </span>
  )
}

/** The pages the run touched move to the top once written, newest first. */
export function orderPages(pages: WikiPage[], phase: WikiPhase) {
  const visible = pages.filter((page) => phase !== 'before' || page.change !== 'new')
  if (phase === 'before') return visible
  const rank = (page: WikiPage) => (page.change === 'new' ? 0 : page.change ? 1 : 2)
  return [...visible].sort((a, b) => rank(a) - rank(b))
}

interface WikiPaneProps {
  copy: KnowledgeWikiCopy
  phase: WikiPhase
  open: WikiPageId | null
  /** Animate the diff in, the first time the script opens the page. */
  reveal: boolean
  reduced: boolean
  onOpen: (id: WikiPageId | null) => void
  onClose: () => void
}

/** Right pane with the knowledge base the Agent writes to: DataSourcePanel rows, then KnowledgeItemNoteContentPanel. */
export function WikiPane({ copy, phase, open, reveal, reduced, onOpen, onClose }: WikiPaneProps) {
  const { labels } = copy
  const written = phase !== 'before'
  const page = copy.pages.find((item) => item.id === open)
  const titleOf = (id: WikiPageId) => copy.pages.find((item) => item.id === id)?.title ?? id

  const list = (
    <m.div
      key="list"
      initial={reduced ? false : { opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -12, transition: { duration: 0.1 } }}
      transition={{ duration: 0.2, ease: ease.expo }}
      className="flex min-h-0 flex-1 flex-col">
      <div className="mx-3 flex h-11 shrink-0 items-center justify-between gap-2 border-b border-border">
        <span className="min-w-0 truncate pl-2 text-xs leading-4 text-muted-foreground/80">
          {labels.updatedAt.replace('{time}', written ? labels.justNow : copy.pages[0].updated)}
        </span>
        <span
          aria-hidden="true"
          className="inline-flex h-7 shrink-0 items-center gap-1 rounded-md border border-border px-2 text-xs leading-4 font-medium text-muted-foreground">
          <Plus className="size-3" />
          {labels.add}
        </span>
      </div>
      <ul className="min-h-0 flex-1 space-y-1 overflow-y-auto px-3 py-2 [scrollbar-width:none]" aria-live="polite">
        <AnimatePresence initial={false}>
          {orderPages(copy.pages, phase).map((item) => {
            const changed = written && item.change
            const links = item.blocks.find((block) => block.kind === 'links')
            return (
              <m.li
                key={item.id}
                layout={reduced ? false : 'position'}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={spring.settle}
                // Rows sliding down pass beneath the pages that just moved up.
                className={cn('relative rounded-md bg-background', changed && 'z-10')}>
                <button
                  type="button"
                  onClick={() => onOpen(item.id)}
                  className={cn(
                    'relative flex w-full cursor-pointer items-start gap-2 overflow-hidden rounded-md px-2.5 py-1.5 text-left transition-colors hover:bg-muted',
                    FOCUS
                  )}>
                  {changed && !reduced && (
                    <m.span
                      aria-hidden="true"
                      initial={{ opacity: 1 }}
                      animate={{ opacity: 0 }}
                      transition={{ duration: 1.6, delay: 0.2, ease: 'easeOut' }}
                      className={cn(
                        'pointer-events-none absolute inset-0',
                        item.change === 'new' ? 'bg-green-500/12' : 'bg-blue-500/10'
                      )}
                    />
                  )}
                  <NoteIcon />
                  <span className="relative flex min-w-0 flex-1 flex-col">
                    <span className="flex min-w-0 items-center gap-1.5">
                      <span className="truncate text-sm leading-6">{item.title}</span>
                      {changed && item.change && <ChangeBadge change={item.change} copy={copy} />}
                    </span>
                    {changed && links?.kind === 'links' && (
                      <m.span
                        initial={reduced ? false : { opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.35 }}
                        className="flex min-w-0 items-center gap-1 text-xs leading-5 text-muted-foreground">
                        <Link2 className="size-3 shrink-0" aria-hidden="true" />
                        <span className="truncate">{links.pages.map(titleOf).join(' · ')}</span>
                      </m.span>
                    )}
                  </span>
                  <span className="relative flex shrink-0 items-center gap-3 text-xs leading-6">
                    <span className="hidden w-20 text-right text-muted-foreground/80 @5xl:inline">
                      {changed ? labels.justNow : item.updated}
                    </span>
                    {changed && phase === 'indexing' ? (
                      <span className="inline-flex items-center @4xl:w-[5.25rem] gap-1 text-amber-500 dark:text-amber-400">
                        <LoaderCircle className="size-3 motion-safe:animate-spin" aria-hidden="true" />
                        <span className="hidden @4xl:inline">{labels.embedding}</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center @4xl:w-[5.25rem] gap-1 text-green-500 dark:text-green-400">
                        <Check className="size-3" aria-hidden="true" />
                        <span className="hidden @4xl:inline">{labels.ready}</span>
                      </span>
                    )}
                  </span>
                </button>
              </m.li>
            )
          })}
        </AnimatePresence>
      </ul>
    </m.div>
  )

  const block = (item: WikiBlock, index: number) => {
    if (item.kind === 'heading') {
      return (
        <h5 key={index} className="pt-1 text-sm font-medium text-foreground">
          {item.text}
        </h5>
      )
    }
    if (item.kind === 'text') {
      return (
        <p key={index} className="whitespace-pre-wrap">
          {item.text}
        </p>
      )
    }
    if (item.kind === 'links') {
      return (
        <p key={index} className="flex flex-wrap items-center gap-1.5 pt-1 text-xs">
          <span>{item.label}</span>
          {item.pages.map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => onOpen(id)}
              className={cn(
                'inline-flex cursor-pointer items-center gap-1 rounded-md border border-border px-1.5 py-0.5 text-foreground transition-colors hover:bg-accent',
                FOCUS
              )}>
              <Link2 className="size-3 text-muted-foreground" aria-hidden="true" />
              {titleOf(id)}
            </button>
          ))}
        </p>
      )
    }
    const animate = reveal && !reduced
    // Before the run there is no change to show, only the old paragraph.
    if (!written) return item.before ? <p key={index}>{item.before}</p> : null
    return (
      <div key={index} className="overflow-hidden rounded-md text-[13px] leading-relaxed">
        {item.before && (
          <m.p
            initial={animate ? { opacity: 1 } : false}
            animate={{ opacity: 0.85 }}
            className="flex gap-2 bg-red-500/10 px-2 py-1 text-red-700 dark:text-red-300">
            <span className="shrink-0 font-mono opacity-60 select-none">-</span>
            <span className="line-through decoration-red-500/50">{item.before}</span>
          </m.p>
        )}
        <m.p
          initial={animate ? { opacity: 0, height: 0 } : false}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.45, delay: 0.3, ease: ease.expo }}
          className="flex gap-2 bg-green-500/10 px-2 py-1 text-green-700 dark:text-green-300">
          <span className="shrink-0 font-mono opacity-60 select-none">+</span>
          <span>{item.after}</span>
        </m.p>
      </div>
    )
  }

  const detail = page && (
    <m.div
      key={page.id}
      initial={reduced ? false : { opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 16, transition: { duration: 0.1 } }}
      transition={{ duration: 0.22, ease: ease.expo }}
      className="flex min-h-0 flex-1 flex-col">
      <div className="relative flex h-11 shrink-0 items-center gap-2 px-3 after:pointer-events-none after:absolute after:right-3 after:bottom-0 after:left-3 after:border-b after:border-border">
        <button
          type="button"
          aria-label={labels.back}
          onClick={() => onOpen(null)}
          className={cn(
            'flex size-5 cursor-pointer items-center justify-center rounded text-muted-foreground hover:bg-accent hover:text-foreground',
            FOCUS
          )}>
          <ArrowLeft className="size-3.5" />
        </button>
        <NoteIcon />
        <div className="min-w-0 flex-1">
          <span className="flex min-w-0 items-center gap-1.5">
            <span className="truncate text-sm leading-5">{page.title}</span>
            {written && page.change && <ChangeBadge change={page.change} copy={copy} />}
          </span>
          <span className="block truncate text-xs leading-4 text-muted-foreground">
            {labels.previewSource}
            {written && page.change && ` · ${labels.justNow}`}
          </span>
        </div>
      </div>
      <div className="min-h-0 flex-1 space-y-2 overflow-y-auto px-4 py-3 text-sm leading-relaxed text-muted-foreground [scrollbar-width:none]">
        <h4 className="text-base font-semibold text-foreground">{page.title}</h4>
        {page.blocks.map(block)}
      </div>
    </m.div>
  )

  return (
    <m.aside
      aria-label={copy.baseName}
      initial={reduced ? false : { opacity: 0, clipPath: 'inset(0 0 0 100%)' }}
      animate={{ opacity: 1, clipPath: 'inset(0 0 0 0%)' }}
      exit={{ opacity: 0, clipPath: 'inset(0 0 0 100%)' }}
      transition={{ duration: 0.45, ease: ease.expo }}
      className="hidden w-[44%] max-w-[460px] shrink-0 flex-col border-l-[0.5px] border-border @2xl:flex">
      <div className="flex h-11 shrink-0 items-center gap-2 border-b-[0.5px] border-border px-3 text-[13px]">
        <FileSearch className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
        <span className="min-w-0 flex-1 truncate font-medium">{copy.baseName}</span>
        <span className="truncate text-xs text-muted-foreground">{labels.knowledgeBase}</span>
        <button
          type="button"
          aria-label={labels.close}
          onClick={onClose}
          className={cn(
            'flex size-7 cursor-pointer items-center justify-center rounded-md text-muted-foreground hover:bg-accent',
            FOCUS
          )}>
          <X className="size-4" />
        </button>
      </div>
      <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          {detail || list}
        </AnimatePresence>
      </div>
    </m.aside>
  )
}
