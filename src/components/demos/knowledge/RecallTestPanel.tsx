import { m } from 'framer-motion'
import {
  Check,
  ChevronDown,
  ChevronUp,
  Clock,
  Copy,
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

const percent = (score: number) => `${Math.round(Math.max(0, Math.min(score, 1)) * 100)}%`

// Desktop shows a material-icon-theme glyph per file extension; approximated with tinted FileText.
const FILE_TINTS: Record<string, string> = {
  pdf: 'text-red-500',
  doc: 'text-blue-500',
  docx: 'text-blue-500',
  md: 'text-sky-500',
  xlsx: 'text-green-600'
}

function ResultCard({ result, index, copy }: { result: RecallResult; index: number; copy: KnowledgeDemoCopy }) {
  const [expanded, setExpanded] = useState(false)
  const [copied, setCopied] = useState(false)
  const tint =
    result.type === 'file'
      ? (FILE_TINTS[result.source.split('.').pop() ?? ''] ?? 'text-muted-foreground')
      : 'text-muted-foreground/80'
  const iconButton =
    'flex size-5 shrink-0 cursor-pointer items-center justify-center rounded text-muted-foreground transition-all hover:bg-accent hover:text-foreground focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-primary'
  return (
    <m.li
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...spring.settle, delay: index * 0.07 }}
      className="group/chunk rounded-md border border-border bg-background transition-colors hover:border-hairline-strong">
      <div className="flex items-center gap-2 px-3 py-2">
        <span className="flex size-5 shrink-0 items-center justify-center rounded bg-muted text-xs text-muted-foreground/80">
          {index + 1}
        </span>
        <span className="flex min-w-0 flex-1 items-center gap-1">
          <FileText className={cn('size-3.5 shrink-0', tint)} aria-hidden="true" />
          <span className="truncate text-xs text-muted-foreground/80">{result.source}</span>
          <span className="shrink-0 text-xs text-muted-foreground/80">#{result.chunk}</span>
        </span>
        <span className="min-w-16 shrink-0 text-right text-xs whitespace-nowrap text-muted-foreground/80 tabular-nums">
          {copy.recall.relevance.replace('{score}', percent(result.score))}
        </span>
        <button
          type="button"
          onClick={() =>
            navigator.clipboard?.writeText(result.text).then(
              () => setCopied(true),
              () => {}
            )
          }
          onBlur={() => setCopied(false)}
          aria-label={copy.recall.copy}
          className={cn(iconButton, copied ? 'text-green-500 opacity-100' : 'opacity-0 group-hover/chunk:opacity-100')}>
          {copied ? <Check className="size-3" aria-hidden="true" /> : <Copy className="size-3" aria-hidden="true" />}
        </button>
        <button
          type="button"
          onClick={() => setExpanded((value) => !value)}
          aria-expanded={expanded}
          aria-label={expanded ? copy.recall.collapse : copy.recall.expand}
          className={iconButton}>
          {expanded ? (
            <ChevronUp className="size-3.5" aria-hidden="true" />
          ) : (
            <ChevronDown className="size-3.5" aria-hidden="true" />
          )}
        </button>
      </div>
      <div className="px-3 pb-3">
        <p className={cn('text-sm leading-relaxed text-muted-foreground', !expanded && 'line-clamp-2')}>
          {result.text}
        </p>
      </div>
    </m.li>
  )
}

/** Desktop EmptyState "inbox" illustration. */
function EmptyIllustration() {
  return (
    <svg width={64} height={41} viewBox="0 0 64 41" className="mb-4 text-muted-foreground" aria-hidden="true">
      <g transform="translate(0 1)" fill="none" fillRule="evenodd">
        <ellipse fill="currentColor" fillOpacity={0.08} cx="32" cy="33" rx="32" ry="7" />
        <g fillRule="nonzero" stroke="currentColor" strokeOpacity={0.4}>
          <path d="M55 12.76 44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z" />
          <path
            fill="currentColor"
            fillOpacity={0.05}
            d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z"
          />
        </g>
      </g>
    </svg>
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
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ duration: 0.18, ease: ease.expo }}
      className="absolute top-3 right-3 bottom-3 z-40 flex w-[min(400px,calc(100%-24px))] flex-col overflow-hidden rounded-3xl bg-card text-card-foreground shadow-xl">
      <div className="flex shrink-0 items-center justify-between px-6 pt-6 pb-3">
        <span className="text-base font-semibold">{copy.recallTest}</span>
        <button
          type="button"
          onClick={onClose}
          aria-label={text.close}
          className="ml-3 flex size-7 cursor-pointer items-center justify-center rounded-md opacity-70 transition-opacity hover:opacity-100 focus-visible:outline-2 focus-visible:outline-primary">
          <X className="size-4" aria-hidden="true" />
        </button>
      </div>

      <div className="grid min-h-0 flex-1 grid-rows-[auto_minmax(0,1fr)] gap-2 px-6">
        <div className="flex items-center gap-2">
          <label className="flex min-w-0 flex-1 items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.25 transition-all focus-within:border-ring focus-within:ring-1 focus-within:ring-ring/50 focus-within:ring-inset">
            <Search className="size-3.5 shrink-0 text-muted-foreground/80" aria-hidden="true" />
            <input
              ref={inputRef}
              value={query}
              onChange={(event) => onQueryChange(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' && canSearch) onSearch()
              }}
              placeholder={text.placeholder}
              aria-label={text.placeholder}
              className="min-w-0 flex-1 bg-transparent text-sm leading-5 text-foreground outline-none placeholder:text-muted-foreground"
            />
          </label>
          <button
            type="button"
            onClick={onSearch}
            disabled={!canSearch}
            className="flex min-h-7 shrink-0 cursor-pointer items-center gap-1.5 rounded-md bg-primary px-2.5 text-xs font-medium text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-default disabled:opacity-50">
            <Zap className="size-3.5" aria-hidden="true" />
            {text.submit}
          </button>
        </div>

        <div className="min-h-0 min-w-0" aria-live="polite">
          {state.status === 'empty' && (
            <div className="flex h-full flex-col items-center justify-center px-6 py-12 text-center">
              <EmptyIllustration />
              <p className="mb-1.5 text-sm text-muted-foreground">{text.emptyTitle}</p>
              <p className="max-w-md text-xs leading-relaxed text-muted-foreground">{text.emptyDescription}</p>
            </div>
          )}
          {state.status === 'searching' && (
            <div className="flex h-full flex-col items-center justify-center py-12 text-center text-muted-foreground/80">
              <LoaderCircle className="size-5.5 text-primary motion-safe:animate-spin" aria-hidden="true" />
              <p className="mt-2 text-sm leading-5">{text.searching}</p>
            </div>
          )}
          {state.status === 'done' && (
            <div className="h-full overflow-y-auto rounded-lg border border-border bg-card [scrollbar-width:none]">
              <div className="flex items-center gap-2.5 border-b border-border px-4 py-3 text-xs leading-4 text-muted-foreground/80">
                <span className="flex items-center gap-0.5">
                  <Sparkles className="size-3" aria-hidden="true" />
                  {text.results.replace('{count}', String(results.length))}
                </span>
                <span className="flex items-center gap-0.5">
                  <Clock className="size-3" aria-hidden="true" />
                  {text.duration.replace('{duration}', String(96 + searchedQuery.length * 7))}
                </span>
                <span>{text.top.replace('{score}', results.length === 0 ? top.toFixed(2) : percent(top))}</span>
              </div>
              <ul key={searchedQuery} className="space-y-2 p-3">
                {results.map((result, index) => (
                  <ResultCard key={`${result.source}-${result.chunk}`} result={result} index={index} copy={copy} />
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </m.section>
  )
}
