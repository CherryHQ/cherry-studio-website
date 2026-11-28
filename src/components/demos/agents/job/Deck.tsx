import { AnimatePresence, m, useReducedMotion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Zap } from 'lucide-react'
import type { ReactNode } from 'react'

import { agentJobScript, type DeckCopy } from '@/content/demos/agentJob'
import { cn } from '@/lib/utils'

// The deck.html the agent wrote: a fixed document palette, so it reads the same in light and dark app themes.
// Every size is in cqw so the main view and the thumbnails render the same slide at any width.
const INK = '#0B1324'
const MUTED = '#64748B'
const GRID = '#E2E8F0'
const EMERALD = '#10B981'
const SKY = '#38BDF8'
const AMBER = '#F59E0B'
const SLATE = '#CBD5E1'
const EASE = [0.16, 1, 0.3, 1] as const

export const SLIDE_COUNT = 6

interface SlideProps {
  copy: DeckCopy
  /** Animates charts in; thumbnails render the settled slide. */
  live: boolean
}

function grow(live: boolean, index: number, origin: string) {
  return live
    ? {
        initial: { scale: 0 },
        animate: { scale: 1 },
        transition: { duration: 0.6, delay: 0.08 + index * 0.06, ease: EASE },
        style: { transformBox: 'fill-box' as const, transformOrigin: origin }
      }
    : {}
}

function ContentSlide({
  copy,
  kicker,
  title,
  source,
  page,
  children
}: {
  copy: DeckCopy
  kicker: string
  title: string
  source: string
  page: number
  children: ReactNode
}) {
  return (
    <div className="flex h-full flex-col bg-white px-[5.5cqw] pt-[4.6cqw] pb-[3.4cqw]" style={{ color: INK }}>
      <div className="flex items-center justify-between text-[1.55cqw] font-semibold tracking-[0.14em] uppercase">
        <span style={{ color: EMERALD }}>{kicker}</span>
        <span style={{ color: MUTED }} className="tracking-[0.08em]">
          {copy.brand}
        </span>
      </div>
      <h3 className="mt-[1.4cqw] text-[3.9cqw] leading-[1.1] font-semibold tracking-[-0.02em] text-balance">{title}</h3>
      <div className="mt-[2.6cqw] min-h-0 flex-1">{children}</div>
      <div
        className="mt-[1.8cqw] flex items-center justify-between border-t pt-[1.4cqw] text-[1.3cqw]"
        style={{ borderColor: GRID, color: MUTED }}>
        <span className="truncate">{source}</span>
        <span className="shrink-0 tabular-nums">{String(page).padStart(2, '0')}</span>
      </div>
    </div>
  )
}

function CoverSlide({ copy, live }: SlideProps) {
  const { cover } = copy
  return (
    <div
      className="relative flex h-full overflow-hidden px-[6cqw] py-[5.5cqw] text-white"
      style={{ background: `linear-gradient(135deg, ${INK} 0%, #10233F 60%, #0B3B3A 100%)` }}>
      <div
        className="pointer-events-none absolute -top-[30cqw] -right-[16cqw] size-[62cqw] rounded-full opacity-60 blur-[6cqw]"
        style={{ background: `radial-gradient(circle, ${EMERALD}66, transparent 65%)` }}
      />
      <div
        className="pointer-events-none absolute -bottom-[34cqw] left-[18cqw] size-[56cqw] rounded-full opacity-50 blur-[6cqw]"
        style={{ background: `radial-gradient(circle, ${SKY}55, transparent 65%)` }}
      />
      <div className="relative flex min-w-0 flex-1 flex-col">
        <span className="text-[1.6cqw] font-semibold tracking-[0.16em] uppercase" style={{ color: '#6EE7B7' }}>
          {cover.kicker}
        </span>
        <h3 className="mt-[2.4cqw] max-w-[52cqw] text-[6.4cqw] leading-[1.02] font-semibold tracking-[-0.03em] text-balance">
          {cover.title}
        </h3>
        <p className="mt-[2cqw] max-w-[46cqw] text-[2.2cqw] leading-snug text-white/70">{cover.subtitle}</p>
        <div className="mt-auto flex gap-[1.4cqw]">
          {cover.stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-[1.2cqw] border border-white/12 bg-white/6 px-[1.8cqw] py-[1.2cqw] backdrop-blur-sm">
              <div className="text-[2.6cqw] leading-none font-semibold tabular-nums">{stat.value}</div>
              <div className="mt-[0.7cqw] text-[1.35cqw] text-white/60">{stat.label}</div>
            </div>
          ))}
        </div>
        <span className="mt-[2.2cqw] text-[1.35cqw] text-white/45">{cover.byline}</span>
      </div>
      <div className="relative flex w-[30cqw] shrink-0 items-center justify-center">
        <div className="relative h-[34cqw] w-[19cqw]">
          <div className="absolute top-0 left-1/2 h-[2.4cqw] w-[7cqw] -translate-x-1/2 rounded-t-[1cqw] bg-white/25" />
          <div className="absolute inset-x-0 top-[2cqw] bottom-0 flex flex-col-reverse gap-[1.1cqw] rounded-[3cqw] border-[0.5cqw] border-white/30 bg-white/5 p-[1.5cqw] shadow-[0_0_8cqw_rgba(16,185,129,0.35)]">
            {[0, 1, 2, 3].map((cell) => (
              <m.div
                key={cell}
                className="flex-1 rounded-[1.2cqw]"
                style={{ background: `linear-gradient(90deg, ${EMERALD}, #34D399 55%, ${SKY})` }}
                {...(live
                  ? {
                      initial: { opacity: 0, scaleX: 0.6 },
                      animate: { opacity: 1, scaleX: 1 },
                      transition: { duration: 0.45, delay: 0.15 + cell * 0.12, ease: EASE }
                    }
                  : {})}
              />
            ))}
          </div>
          <Zap
            aria-hidden="true"
            className="absolute top-1/2 left-1/2 size-[9cqw] -translate-x-1/2 -translate-y-[40%] fill-white text-white drop-shadow-[0_0_2cqw_rgba(255,255,255,0.6)]"
            strokeWidth={1}
          />
        </div>
      </div>
    </div>
  )
}

function DemandSlide({ copy, live }: SlideProps) {
  const data = agentJobScript.demand
  const max = 1600
  const chart = { left: 34, bottom: 178, top: 14, width: 316 }
  const step = chart.width / data.length
  const y = (value: number) => chart.bottom - (value / max) * (chart.bottom - chart.top)
  return (
    <ContentSlide
      copy={copy}
      kicker={copy.demand.kicker}
      title={copy.demand.title}
      source={copy.demand.source}
      page={2}>
      <div className="flex h-full gap-[3cqw]">
        <div className="flex min-w-0 flex-1 flex-col">
          <span className="text-[1.35cqw]" style={{ color: MUTED }}>
            {copy.demand.unit}
          </span>
          <svg viewBox="0 0 360 196" className="mt-[0.6cqw] min-h-0 w-full flex-1" aria-hidden="true">
            <defs>
              <linearGradient id="deck-demand" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0" stopColor="#34D399" />
                <stop offset="1" stopColor={EMERALD} />
              </linearGradient>
            </defs>
            {[0, 500, 1000, 1500].map((tick) => (
              <g key={tick}>
                <line x1={chart.left} x2={chart.left + chart.width} y1={y(tick)} y2={y(tick)} stroke={GRID} />
                <text x={chart.left - 6} y={y(tick) + 3} textAnchor="end" fontSize="9" fill={MUTED}>
                  {tick.toLocaleString('en-US')}
                </text>
              </g>
            ))}
            {data.map((point, index) => {
              const x = chart.left + index * step + step * 0.2
              const width = step * 0.6
              const last = index === data.length - 1
              return (
                <g key={point.year}>
                  <m.rect
                    x={x}
                    y={y(point.value)}
                    width={width}
                    height={chart.bottom - y(point.value)}
                    rx="3"
                    fill={last ? 'url(#deck-demand)' : SLATE}
                    {...grow(live, index, '50% 100%')}
                  />
                  <text
                    x={x + width / 2}
                    y={y(point.value) - 5}
                    textAnchor="middle"
                    fontSize="10"
                    fontWeight={last ? 700 : 500}
                    fill={last ? '#047857' : INK}>
                    {point.value.toLocaleString('en-US')}
                  </text>
                  <text x={x + width / 2} y={chart.bottom + 13} textAnchor="middle" fontSize="9.5" fill={MUTED}>
                    {point.year}
                  </text>
                </g>
              )
            })}
          </svg>
        </div>
        <div className="flex w-[24cqw] shrink-0 flex-col justify-center gap-[1.6cqw]">
          {copy.demand.kpis.map((kpi, index) => (
            <div
              key={kpi.label}
              className="rounded-[1.4cqw] px-[2cqw] py-[1.8cqw]"
              style={{ background: index === 0 ? '#ECFDF5' : '#F1F5F9' }}>
              <div
                className="text-[4.4cqw] leading-none font-semibold tracking-[-0.02em] tabular-nums"
                style={{ color: index === 0 ? '#047857' : INK }}>
                {kpi.value}
              </div>
              <div className="mt-[0.9cqw] text-[1.45cqw] leading-snug" style={{ color: MUTED }}>
                {kpi.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </ContentSlide>
  )
}

function ChemistrySlide({ copy, live }: SlideProps) {
  const shares = agentJobScript.chemistry
  const colors = [EMERALD, SKY, AMBER]
  const radius = 64
  const circumference = 2 * Math.PI * radius
  let offset = 0
  return (
    <ContentSlide
      copy={copy}
      kicker={copy.chemistry.kicker}
      title={copy.chemistry.title}
      source={copy.chemistry.source}
      page={3}>
      <div className="flex h-full items-center gap-[4cqw]">
        <m.svg
          viewBox="0 0 160 160"
          className="h-full max-h-[26cqw] shrink-0"
          aria-hidden="true"
          {...(live
            ? {
                initial: { rotate: -60, opacity: 0, scale: 0.9 },
                animate: { rotate: 0, opacity: 1, scale: 1 },
                transition: { duration: 0.7, ease: EASE }
              }
            : {})}>
          <g transform="rotate(-90 80 80)">
            {shares.map((share, index) => {
              const length = (share / 100) * circumference
              const dash = `${Math.max(0, length - 3)} ${circumference}`
              const circle = (
                <circle
                  key={index}
                  cx="80"
                  cy="80"
                  r={radius}
                  fill="none"
                  stroke={colors[index]}
                  strokeWidth="22"
                  strokeDasharray={dash}
                  strokeDashoffset={-offset}
                />
              )
              offset += length
              return circle
            })}
          </g>
          <text x="80" y="80" textAnchor="middle" fontSize="30" fontWeight="700" fill={INK}>
            {shares[0]}%
          </text>
          <text x="80" y="99" textAnchor="middle" fontSize="11" fill={MUTED}>
            {copy.chemistry.center}
          </text>
        </m.svg>
        <div className="flex min-w-0 flex-1 flex-col gap-[1.6cqw]">
          {copy.chemistry.segments.map((segment, index) => (
            <div key={segment} className="flex items-center gap-[1.4cqw]">
              <span className="size-[1.8cqw] shrink-0 rounded-[0.5cqw]" style={{ background: colors[index] }} />
              <span className="min-w-0 flex-1 truncate text-[2cqw]">{segment}</span>
              <span className="text-[2.6cqw] font-semibold tabular-nums">{shares[index]}%</span>
            </div>
          ))}
          <p
            className="mt-[0.6cqw] rounded-[1.2cqw] px-[1.8cqw] py-[1.4cqw] text-[1.5cqw] leading-snug"
            style={{ background: '#F1F5F9', color: MUTED }}>
            {copy.chemistry.note}
          </p>
        </div>
      </div>
    </ContentSlide>
  )
}

function CostSlide({ copy, live }: SlideProps) {
  const data = agentJobScript.cost
  const chart = { left: 30, right: 340, top: 16, bottom: 160 }
  const range = [80, 170]
  const x = (index: number) => chart.left + (index / (data.length - 1)) * (chart.right - chart.left)
  const y = (value: number) => chart.bottom - ((value - range[0]) / (range[1] - range[0])) * (chart.bottom - chart.top)
  const line = data.map((point, index) => `${index ? 'L' : 'M'}${x(index)},${y(point.value)}`).join(' ')
  const area = `${line} L${x(data.length - 1)},${chart.bottom} L${x(0)},${chart.bottom} Z`
  const peak = 2
  const last = data.length - 1
  return (
    <ContentSlide copy={copy} kicker={copy.cost.kicker} title={copy.cost.title} source={copy.cost.source} page={4}>
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between gap-[2cqw]">
          <span className="text-[1.35cqw]" style={{ color: MUTED }}>
            {copy.cost.unit}
          </span>
          <span
            className="rounded-full px-[1.4cqw] py-[0.5cqw] text-[1.45cqw] font-semibold"
            style={{ background: '#ECFDF5', color: '#047857' }}>
            {copy.cost.callout}
          </span>
        </div>
        <svg viewBox="0 0 360 178" className="mt-[0.6cqw] min-h-0 w-full flex-1" aria-hidden="true">
          <defs>
            <linearGradient id="deck-cost" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor={EMERALD} stopOpacity="0.28" />
              <stop offset="1" stopColor={EMERALD} stopOpacity="0" />
            </linearGradient>
          </defs>
          {[100, 125, 150].map((tick) => (
            <g key={tick}>
              {tick !== 100 && <line x1={chart.left} x2={chart.right} y1={y(tick)} y2={y(tick)} stroke={GRID} />}
              <text x={chart.left - 6} y={y(tick) + 3} textAnchor="end" fontSize="9" fill={MUTED}>
                {tick}
              </text>
            </g>
          ))}
          <line
            x1={chart.left}
            x2={chart.right}
            y1={y(100)}
            y2={y(100)}
            stroke={AMBER}
            strokeWidth="1.4"
            strokeDasharray="5 4"
          />
          <text x={chart.left + 4} y={y(100) + 12} fontSize="9" fontWeight="600" fill="#B45309">
            {copy.cost.threshold}
          </text>
          <m.path
            d={area}
            fill="url(#deck-cost)"
            {...(live
              ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.6, delay: 0.3 } }
              : {})}
          />
          <m.path
            d={line}
            fill="none"
            stroke={EMERALD}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...(live
              ? { initial: { pathLength: 0 }, animate: { pathLength: 1 }, transition: { duration: 0.8, ease: EASE } }
              : {})}
          />
          {data.map((point, index) => (
            <g key={point.year}>
              <circle
                cx={x(index)}
                cy={y(point.value)}
                r={index === last ? 5 : 3}
                fill={index === last ? EMERALD : 'white'}
                stroke={EMERALD}
                strokeWidth="2"
              />
              <text x={x(index)} y={chart.bottom + 14} textAnchor="middle" fontSize="9.5" fill={MUTED}>
                {point.year}
              </text>
            </g>
          ))}
          <text x={x(peak)} y={y(data[peak].value) - 9} textAnchor="middle" fontSize="10" fontWeight="600" fill={INK}>
            ${data[peak].value}
          </text>
          <text
            x={x(last)}
            y={y(data[last].value) - 10}
            textAnchor="middle"
            fontSize="12"
            fontWeight="700"
            fill="#047857">
            ${data[last].value}
          </text>
        </svg>
      </div>
    </ContentSlide>
  )
}

function MakersSlide({ copy, live }: SlideProps) {
  const shares = agentJobScript.makers
  const colors = [EMERALD, SKY]
  return (
    <ContentSlide
      copy={copy}
      kicker={copy.makers.kicker}
      title={copy.makers.title}
      source={copy.makers.source}
      page={5}>
      <div className="flex h-full flex-col justify-center gap-[1.25cqw]">
        {copy.makers.names.map((name, index) => (
          <div key={name} className="flex items-center gap-[1.6cqw]">
            <span className="w-[19cqw] shrink-0 truncate text-[1.75cqw] font-medium">{name}</span>
            <div
              className="h-[2.5cqw] min-w-0 flex-1 overflow-hidden rounded-[0.6cqw]"
              style={{ background: '#F1F5F9' }}>
              <m.div
                className="h-full rounded-[0.6cqw]"
                style={{ width: `${(shares[index] / 40) * 100}%`, background: colors[index] ?? SLATE, originX: 0 }}
                {...(live
                  ? {
                      initial: { scaleX: 0 },
                      animate: { scaleX: 1 },
                      transition: { duration: 0.6, delay: 0.06 + index * 0.06, ease: EASE }
                    }
                  : {})}
              />
            </div>
            <span className="w-[5cqw] shrink-0 text-right text-[1.9cqw] font-semibold tabular-nums">
              {shares[index]}%
            </span>
          </div>
        ))}
        <span className="mt-[0.4cqw] self-end text-[1.4cqw]" style={{ color: MUTED }}>
          {copy.makers.others}
        </span>
      </div>
    </ContentSlide>
  )
}

function OutlookSlide({ copy, live }: SlideProps) {
  const { outlook } = copy
  const accents = [EMERALD, SKY, AMBER]
  return (
    <div
      className="flex h-full flex-col px-[5.5cqw] pt-[4.6cqw] pb-[3.4cqw] text-white"
      style={{ background: `linear-gradient(160deg, ${INK}, #12233D)` }}>
      <div className="flex items-center justify-between text-[1.55cqw] font-semibold tracking-[0.14em] uppercase">
        <span style={{ color: '#6EE7B7' }}>{outlook.kicker}</span>
        <span className="tracking-[0.08em] text-white/45">{copy.brand}</span>
      </div>
      <h3 className="mt-[1.4cqw] text-[3.9cqw] leading-[1.1] font-semibold tracking-[-0.02em]">{outlook.title}</h3>
      <div className="mt-[3cqw] grid min-h-0 flex-1 grid-cols-3 gap-[1.8cqw]">
        {outlook.cards.map((card, index) => (
          <m.div
            key={card.title}
            className="flex flex-col rounded-[1.6cqw] border border-white/10 bg-white/5 p-[2cqw]"
            {...(live
              ? {
                  initial: { opacity: 0, y: 12 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.5, delay: 0.1 + index * 0.08, ease: EASE }
                }
              : {})}>
            <span className="h-[0.5cqw] w-[5cqw] rounded-full" style={{ background: accents[index] }} />
            <span
              className="mt-[1.6cqw] text-[1.3cqw] font-semibold tracking-[0.12em] uppercase"
              style={{ color: accents[index] }}>
              {card.tag}
            </span>
            <span className="mt-[0.8cqw] text-[2.2cqw] leading-tight font-semibold">{card.title}</span>
            <span className="mt-[1cqw] text-[1.5cqw] leading-snug text-white/65">{card.body}</span>
          </m.div>
        ))}
      </div>
      <div className="mt-[2cqw] flex items-center justify-between border-t border-white/10 pt-[1.4cqw] text-[1.3cqw] text-white/45">
        <span className="truncate">{outlook.source}</span>
        <span className="shrink-0 tabular-nums">06</span>
      </div>
    </div>
  )
}

const SLIDES = [CoverSlide, DemandSlide, ChemistrySlide, CostSlide, MakersSlide, OutlookSlide]

function Slide({ index, copy, live }: { index: number } & SlideProps) {
  const Component = SLIDES[index]
  return (
    <div className="@container aspect-video w-full overflow-hidden font-sans select-none">
      <Component copy={copy} live={live} />
    </div>
  )
}

const FOCUS = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6EE7B7]'

/** deck.html as previewed in the file pane: the current slide, a pager and a thumbnail rail that fills as it builds. */
export function DeckViewer({
  copy,
  built,
  current,
  onSelect
}: {
  copy: DeckCopy
  /** Slides written so far; the rest show as placeholders. */
  built: number
  current: number
  onSelect: (index: number) => void
}) {
  const reduced = useReducedMotion() ?? false
  const go = (delta: number) => onSelect(Math.min(Math.max(current + delta, 0), Math.max(built - 1, 0)))
  const pagerButton = cn(
    'flex size-7 cursor-pointer items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white disabled:cursor-default disabled:opacity-30 disabled:hover:bg-transparent',
    FOCUS
  )

  return (
    <div className="@container flex h-full min-h-0 flex-col gap-3 bg-[#0E1424] px-4 pt-4 pb-3.5">
      <div className="flex min-h-0 flex-1 flex-col justify-center gap-3">
        <div className="relative w-full overflow-hidden rounded-[10px] shadow-[0_24px_60px_-24px_rgba(0,0,0,0.8)] ring-1 ring-white/10">
          <div className="invisible aspect-video" />
          <AnimatePresence initial={false}>
            <m.div
              key={current}
              className="absolute inset-0"
              // A wipe over the opaque outgoing slide, so a quick flip never blends two slides' text.
              initial={reduced ? false : { clipPath: 'inset(0 0 0 100%)' }}
              animate={{ clipPath: 'inset(0 0 0 0%)' }}
              exit={{ opacity: 1, transition: { duration: 0.35 } }}
              transition={{ duration: 0.35, ease: EASE }}>
              <Slide index={current} copy={copy} live={!reduced} />
            </m.div>
          </AnimatePresence>
        </div>
        <div className="flex items-center justify-center gap-2 text-xs text-white/70">
          <button
            type="button"
            aria-label={copy.previous}
            disabled={current === 0}
            onClick={() => go(-1)}
            className={pagerButton}>
            <ChevronLeft className="size-4" />
          </button>
          <span className="min-w-12 text-center tabular-nums" aria-live="polite">
            {copy.pager.replace('{n}', String(current + 1)).replace('{total}', String(SLIDE_COUNT))}
          </span>
          <button
            type="button"
            aria-label={copy.next}
            disabled={current >= built - 1}
            onClick={() => go(1)}
            className={pagerButton}>
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-1.5 @sm:grid-cols-6">
        {Array.from({ length: SLIDE_COUNT }, (_, index) =>
          index < built ? (
            <m.button
              key={index}
              type="button"
              aria-label={copy.pager.replace('{n}', String(index + 1)).replace('{total}', String(SLIDE_COUNT))}
              aria-current={index === current ? 'true' : undefined}
              onClick={() => onSelect(index)}
              initial={reduced ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: EASE }}
              className={cn(
                'cursor-pointer overflow-hidden rounded-[4px] ring-1 transition-[box-shadow,opacity] hover:opacity-100',
                index === current ? 'opacity-100 ring-2 ring-[#34D399]' : 'opacity-60 ring-white/15',
                FOCUS
              )}>
              <Slide index={index} copy={copy} live={false} />
            </m.button>
          ) : (
            <span
              key={index}
              aria-hidden="true"
              className="aspect-video rounded-[4px] bg-white/6 ring-1 ring-white/8 motion-safe:animate-pulse"
            />
          )
        )}
      </div>
    </div>
  )
}
