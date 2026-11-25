import { m } from 'framer-motion'
import {
  ChevronDown,
  ChevronUp,
  Clock,
  FileText,
  Folder,
  Link2,
  LoaderCircle,
  type LucideIcon,
  Search,
  Sparkles,
  StickyNote,
  X,
  Zap
} from 'lucide-react'
import { type RefObject, useMemo, useState } from 'react'

import type { KnowledgeChunk, KnowledgeDemoCopy, KnowledgeItemType } from '@/content/demos/knowledge'
import { ease, spring } from '@/lib/motion'
import { cn } from '@/lib/utils'

// Icon tints from desktop dataSourceTypeDisplayConfig.
export const TYPE_ICONS: Record<KnowledgeItemType, { icon: LucideIcon; tint: string }> = {
  file: { icon: FileText, tint: 'text-blue-500' },
  url: { icon: Link2, tint: 'text-cyan-500' },
  note: { icon: StickyNote, tint: 'text-amber-500' },
  directory: { icon: Folder, tint: 'text-violet-500' }
}

const CJK = /[㐀-鿿]/
const SPLIT = /[\s,.?!;:()"'，。？！、；：“”（）]+/

/** Query keywords: CJK runs become bigrams, English words drop a plural `s`, stop words are ignored. */
export function queryTerms(query: string, stopWords: string[]) {
  const stop = new Set(stopWords)
  const terms = query
    .toLowerCase()
    .split(SPLIT)
    .flatMap((word) => {
      if (CJK.test(word) && word.length > 2)
        return Array.from({ length: word.length - 1 }, (_, i) => word.slice(i, i + 2))
      return [word.length > 3 && word.endsWith('s') ? word.slice(0, -1) : word]
    })
    .filter((term) => term && !stop.has(term) && (CJK.test(term) || term.length > 1))
  return [...new Set(terms)]
}

export interface RecallResult extends KnowledgeChunk {
  matched: string[]
}

/** Scripted retrieval: chunks that share a keyword, scored by their base relevance and keyword coverage. */
export function rankChunks(chunks: KnowledgeChunk[], terms: string[]): RecallResult[] {
  const hits = chunks
    .map((chunk) => ({ ...chunk, matched: terms.filter((term) => chunk.text.toLowerCase().includes(term)) }))
    .filter((chunk) => chunk.matched.length > 0)
  const most = Math.max(1, ...hits.map((chunk) => chunk.matched.length))
  return hits
    .map((chunk) => ({ ...chunk, score: chunk.score * (0.82 + (0.18 * chunk.matched.length) / most) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 4)
}

const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
const percent = (score: number) => `${Math.round(score * 100)}%`

function Highlighted({ text, terms }: { text: string; terms: string[] }) {
  if (terms.length === 0) return text
  const pattern = new RegExp(`(${terms.map(escapeRegExp).join('|')})`, 'gi')
  return text.split(pattern).map((part, index) =>
    index % 2 === 1 ? (
      <mark key={index} className="rounded-[3px] bg-primary/20 px-px text-foreground">
        {part}
      </mark>
    ) : (
      part
    )
  )
}

function ResultCard({ result, index, label }: { result: RecallResult; index: number; label: string }) {
  const [expanded, setExpanded] = useState(false)
  const { icon: Icon, tint } = TYPE_ICONS[result.type]
  return (
    <m.li
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...spring.settle, delay: index * 0.07 }}
      className="rounded-md border border-border bg-background/70 transition-colors hover:border-hairline-strong">
      <div className="flex items-center gap-2 px-3 pt-2 pb-1.5">
        <span className="flex size-5 shrink-0 items-center justify-center rounded bg-secondary text-[11px] text-muted-foreground">
          {index + 1}
        </span>
        <Icon className={cn('size-3.5 shrink-0', tint)} aria-hidden="true" />
        <span className="min-w-0 truncate text-xs text-muted-foreground">{result.source}</span>
        <span className="shrink-0 text-xs text-muted-foreground/70">#{result.chunk}</span>
        <span className="ml-auto shrink-0 text-xs text-muted-foreground tabular-nums">
          {label.replace('{score}', percent(result.score))}
        </span>
        <button
          type="button"
          onClick={() => setExpanded((value) => !value)}
          aria-expanded={expanded}
          aria-label={result.source}
          className="flex size-5 shrink-0 cursor-pointer items-center justify-center rounded text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-2 focus-visible:outline-primary">
          {expanded ? (
            <ChevronUp className="size-3.5" aria-hidden="true" />
          ) : (
            <ChevronDown className="size-3.5" aria-hidden="true" />
          )}
        </button>
      </div>
      <div className="mx-3 h-1 overflow-hidden rounded-full bg-secondary" aria-hidden="true">
        <m.div
          initial={{ width: 0 }}
          animate={{ width: percent(result.score) }}
          transition={{ duration: 0.7, ease: ease.settle, delay: 0.1 + index * 0.07 }}
          className="h-full rounded-full bg-primary"
        />
      </div>
      <div className="px-3 pt-2 pb-3">
        <p className={cn('text-[13px] leading-relaxed text-muted-foreground', !expanded && 'line-clamp-2')}>
          <Highlighted text={result.text} terms={result.matched} />
        </p>
      </div>
    </m.li>
  )
}

export type RecallState = { status: 'empty' } | { status: 'searching' | 'done'; query: string }

interface RecallTestPanelProps {
  copy: KnowledgeDemoCopy
  query: string
  state: RecallState
  inputRef: RefObject<HTMLInputElement>
  onQueryChange: (value: string) => void
  onSearch: () => void
  onClose: () => void
}

/** Mirrors desktop RecallTestPanel inside PageSidePanel: search bar, result summary and ranked chunk cards. */
export function RecallTestPanel({
  copy,
  query,
  state,
  inputRef,
  onQueryChange,
  onSearch,
  onClose
}: RecallTestPanelProps) {
  const text = copy.recall
  const searchedQuery = state.status === 'empty' ? '' : state.query
  const results = useMemo(
    () => (searchedQuery ? rankChunks(copy.chunks, queryTerms(searchedQuery, copy.stopWords)) : []),
    [searchedQuery, copy]
  )

  const canSearch = query.trim().length > 0 && state.status !== 'searching'
  const top = results[0]?.score ?? 0

  return (
    <m.section
      role="dialog"
      aria-label={copy.recallTest}
      onKeyDown={(event) => {
        if (event.key === 'Escape') onClose()
      }}
      initial={{ x: '110%' }}
      animate={{ x: 0 }}
      exit={{ x: '110%' }}
      transition={{ duration: 0.18, ease: ease.expo }}
      className="absolute top-3 right-3 bottom-3 z-40 flex w-[min(400px,calc(100%-24px))] flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-(--shadow-float)">
      <div className="flex shrink-0 items-center justify-between px-5 pt-4 pb-3">
        <span className="text-[15px] font-semibold">{copy.recallTest}</span>
        <button
          type="button"
          onClick={onClose}
          aria-label={text.close}
          className="flex size-7 cursor-pointer items-center justify-center rounded-md opacity-70 transition-opacity hover:opacity-100 focus-visible:outline-2 focus-visible:outline-primary">
          <X className="size-4" aria-hidden="true" />
        </button>
      </div>

      <div className="flex shrink-0 items-center gap-2 px-5">
        <label className="flex h-8 min-w-0 flex-1 items-center gap-1.5 rounded-lg border border-border px-2.5 transition-colors focus-within:border-primary/60 focus-within:ring-1 focus-within:ring-primary/30 focus-within:ring-inset">
          <Search className="size-3.5 shrink-0 text-muted-foreground" aria-hidden="true" />
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' && canSearch) onSearch()
            }}
            placeholder={text.placeholder}
            aria-label={text.placeholder}
            className="min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
          />
        </label>
        <button
          type="button"
          onClick={onSearch}
          disabled={!canSearch}
          className="flex h-8 shrink-0 cursor-pointer items-center gap-1.5 rounded-md bg-primary px-3 text-[13px] font-medium text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-default disabled:opacity-50">
          {state.status === 'searching' ? (
            <LoaderCircle className="size-3.5 motion-safe:animate-spin" aria-hidden="true" />
          ) : (
            <Zap className="size-3.5" aria-hidden="true" />
          )}
          {text.submit}
        </button>
      </div>

      <div className="mt-3 flex min-h-0 flex-1 flex-col border-t border-border" aria-live="polite">
        {state.status === 'empty' && (
          <div className="flex flex-1 flex-col items-center justify-center gap-1 px-6 text-center">
            <p className="text-sm">{text.emptyTitle}</p>
            <p className="text-xs text-muted-foreground">{text.emptyDescription}</p>
          </div>
        )}
        {state.status === 'searching' && (
          <div className="flex flex-1 items-center justify-center gap-2 text-sm text-muted-foreground">
            <LoaderCircle className="size-4 motion-safe:animate-spin" aria-hidden="true" />
            {text.searching}
          </div>
        )}
        {state.status === 'done' && (
          <>
            <div className="flex shrink-0 items-center gap-2.5 border-b border-border px-5 py-2.5 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Sparkles className="size-3" aria-hidden="true" />
                {text.results.replace('{count}', String(results.length))}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="size-3" aria-hidden="true" />
                {text.duration.replace('{duration}', String(96 + searchedQuery.length * 7))}
              </span>
              {results.length > 0 && <span>{text.top.replace('{score}', percent(top))}</span>}
            </div>
            {results.length === 0 ? (
              <p className="flex flex-1 items-center justify-center text-sm text-muted-foreground">{text.noMatch}</p>
            ) : (
              <ul
                key={searchedQuery}
                className="min-h-0 flex-1 space-y-2 overflow-y-auto px-5 py-3 [scrollbar-width:thin]">
                {results.map((result, index) => (
                  <ResultCard
                    key={`${result.source}-${result.chunk}`}
                    result={result}
                    index={index}
                    label={text.relevance}
                  />
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    </m.section>
  )
}
