import { motion, useReducedMotion } from 'framer-motion'
import { Check, Copy, Download, FileText, Layers, MessageSquare, Presentation, RotateCcw, Sparkles } from 'lucide-react'
import { type FC, type KeyboardEvent, type MouseEvent, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import Footer from '@/components/website/Footer'
import { AI_PPT_COPY, type AiPptCopy, type PptTemplate, type UseCaseLocale } from '@/content/use-cases/ai-ppt'
import { usePageMeta } from '@/hooks/usePageMeta'
import { cn } from '@/lib/utils'
import { isEnglishSite } from '@/utils/urls'

// 应用场景落地页原型（中英文，本地评审用；文案在 src/content/use-cases/ai-ppt.ts），结构参考 Kimi /use-cases：
// 首屏（提示词打字 + 生成过程动画）→ 樱桃三步 → 卡牌式示例 PPT（点开翻面看提示词）→ 真实界面 → 能力 → 常见问题 → 更多场景
// 所有动画在系统开启「减少动态效果」时直接显示最终状态

const FEATURE_ICONS = [FileText, Layers, Sparkles, MessageSquare]

// 示例 PPT 的页面截图：public/images/use-cases/<语言>/ai-ppt-<模板>-<页>.webp。
// 1～3 页是首屏动画用的同一套风格；-style 是卡牌区展示的各自风格的封面
const SlideImage: FC<{
  locale: UseCaseLocale
  id: string
  page: number | 'style'
  alt: string
  className?: string
}> = ({ locale, id, page, alt, className }) => (
  <img
    src={`/images/use-cases/${locale}/ai-ppt-${id}-${page}.webp`}
    alt={alt}
    width={959}
    height={540}
    loading="lazy"
    draggable={false}
    className={cn('aspect-video w-full rounded-lg object-cover', className)}
  />
)

// 提示词逐字出现；减少动态效果时直接显示全文
function useTyping(text: string, reduce: boolean) {
  const [count, setCount] = useState(reduce ? text.length : 0)
  useEffect(() => {
    if (reduce) {
      setCount(text.length)
      return
    }
    setCount(0)
    const step = Math.max(1, Math.ceil(text.length / 55))
    const id = window.setInterval(() => {
      setCount((value) => {
        if (value >= text.length) {
          window.clearInterval(id)
          return value
        }
        return Math.min(text.length, value + step)
      })
    }, 24)
    return () => window.clearInterval(id)
  }, [text, reduce])
  return { typed: text.slice(0, count), done: count >= text.length }
}

// ---------- 1. 首屏右侧：生成过程动画 ----------

// 阶段：1 用户消息 → 2 读取文件 → 3/4/5 三张幻灯片依次落下（封面最后落在最上面）→ 6 弹出 .pptx 文件
const PHASE_TIMES = [1300, 2000, 2800, 3250, 3700, 4500]
const FINAL_PHASE = PHASE_TIMES.length

const GenerationDemo: FC<{ template: PptTemplate; copy: AiPptCopy; locale: UseCaseLocale }> = ({
  template,
  copy,
  locale
}) => {
  const reduce = useReducedMotion() ?? false
  const [run, setRun] = useState(0)
  const [phase, setPhase] = useState(reduce ? FINAL_PHASE : 0)

  useEffect(() => {
    if (reduce) {
      setPhase(FINAL_PHASE)
      return
    }
    setPhase(0)
    const ids = PHASE_TIMES.map((time, index) => window.setTimeout(() => setPhase(index + 1), time))
    return () => {
      for (const id of ids) window.clearTimeout(id)
    }
  }, [template.id, run, reduce])
  const t = copy.demo

  // 内页先落下，封面最后落在最上面
  const pages = [3, 2, 1]
  const spring = { type: 'spring' as const, stiffness: 260, damping: 18 }

  return (
    <div className="border-border bg-card relative overflow-hidden rounded-2xl border shadow-[0_30px_80px_-40px_rgb(220_38_38/0.45)]">
      <div className="border-border flex items-center gap-2 border-b px-4 py-3">
        <span className="size-2.5 rounded-full bg-muted-foreground/35" />
        <span className="size-2.5 rounded-full bg-muted-foreground/35" />
        <span className="size-2.5 rounded-full bg-muted-foreground/35" />
        <span className="text-muted-foreground ml-2 text-xs">{t.window}</span>
        <button
          type="button"
          onClick={() => setRun((value) => value + 1)}
          className="text-muted-foreground hover:text-foreground ml-auto inline-flex items-center gap-1 text-xs transition-colors"
          aria-label={t.replayLabel}>
          <RotateCcw className="size-3.5" />
          {t.replay}
        </button>
      </div>

      <div className="flex min-h-[420px] flex-col gap-3 p-4 sm:p-5">
        {phase >= 1 && (
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={spring}
            className="bg-primary text-primary-foreground ml-auto max-w-[85%] rounded-2xl rounded-br-sm px-3.5 py-2 text-sm">
            {template.short}
          </motion.div>
        )}

        {phase >= 2 && (
          <motion.div initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2">
            <p className="text-muted-foreground flex items-center gap-1.5 text-xs">
              <CherryDot className="size-4" />
              {t.readFiles(template.files.length)}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {template.files.map((file, index) => (
                <motion.span
                  key={file}
                  initial={reduce ? false : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: reduce ? 0 : index * 0.15 }}
                  className="border-border bg-muted/60 text-foreground/80 rounded-md border px-2 py-0.5 text-xs">
                  {file}
                </motion.span>
              ))}
            </div>
          </motion.div>
        )}

        {phase >= 2 && (
          <p className="text-muted-foreground text-xs" aria-live="polite">
            {phase < FINAL_PHASE ? (
              <span className="inline-flex items-center gap-1">
                {t.generating}
                <span className="inline-flex gap-0.5">
                  {[0, 1, 2].map((dot) => (
                    <motion.span
                      key={dot}
                      className="bg-primary inline-block size-1 rounded-full"
                      animate={reduce ? undefined : { opacity: [0.2, 1, 0.2] }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, delay: dot * 0.2 }}
                    />
                  ))}
                </span>
              </span>
            ) : (
              <span className="text-foreground/80 inline-flex items-center gap-1">
                <Check className="text-primary size-3.5" />
                {t.done}
              </span>
            )}
          </p>
        )}

        <div className="relative mt-auto h-[210px]">
          {pages.map((page, index) =>
            phase >= 3 + index ? (
              <motion.div
                key={`${template.id}-${page}`}
                initial={reduce ? false : { opacity: 0, y: -90, rotate: index % 2 ? 8 : -8 }}
                animate={{ opacity: 1, y: index * 12, x: index * 18, rotate: [-3, 2, -1][index] }}
                transition={spring}
                className="absolute top-0 left-0 w-[68%] rounded-lg shadow-lg"
                style={{ zIndex: index }}>
                <SlideImage locale={locale} id={template.id} page={page} alt={t.pageAlt(template.label, page)} />
              </motion.div>
            ) : null
          )}

          {phase >= FINAL_PHASE && (
            <motion.div
              initial={reduce ? false : { scale: 0, rotate: -12 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 380, damping: 12 }}
              className="border-border bg-card absolute right-0 bottom-0 z-10 flex items-center gap-2 rounded-xl border px-3 py-2 shadow-xl">
              <span className="bg-primary/10 text-primary flex size-8 items-center justify-center rounded-lg">
                <Presentation className="size-4" />
              </span>
              <span>
                <span className="text-foreground block text-sm font-medium">{template.file}</span>
                <span className="text-muted-foreground block text-xs">{t.fileNote}</span>
              </span>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

// ---------- 2. 卡牌式成品示意：鼠标移上散开，点击翻面看提示词 ----------

const CardBack: FC<{ template: PptTemplate; copy: AiPptCopy; onUse: (id: string) => void }> = ({
  template,
  copy,
  onUse
}) => {
  const [copied, setCopied] = useState(false)
  const stop = (event: MouseEvent) => event.stopPropagation()
  return (
    <div className="border-primary/30 bg-card flex h-full flex-col rounded-lg border p-3.5 text-left">
      <p className="text-primary text-xs font-medium">
        {template.label} · {template.style}
      </p>
      <p className="text-foreground/80 mt-1.5 line-clamp-3 text-[11px] leading-4">
        {copy.card.withStyle(template.prompt, template.styleHint)}
      </p>
      <div className="mt-auto flex gap-2 pt-2">
        <button
          type="button"
          onClick={async (event) => {
            stop(event)
            try {
              await navigator.clipboard.writeText(copy.card.withStyle(template.prompt, template.styleHint))
              setCopied(true)
              window.setTimeout(() => setCopied(false), 1500)
            } catch {
              setCopied(false)
            }
          }}
          className="border-border hover:bg-muted inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs transition-colors">
          {copied ? <Check className="size-3" /> : <Copy className="size-3" />}
          {copied ? copy.copied : copy.card.copy}
        </button>
        <button
          type="button"
          onClick={(event) => {
            stop(event)
            onUse(template.id)
          }}
          className="bg-primary text-primary-foreground rounded-full px-2.5 py-1 text-xs transition-opacity hover:opacity-90">
          {copy.card.use}
        </button>
      </div>
    </div>
  )
}

const FlipCard: FC<{
  template: PptTemplate
  copy: AiPptCopy
  locale: UseCaseLocale
  flipped: boolean
  onToggle: () => void
  onUse: (id: string) => void
}> = ({ template, copy, locale, flipped, onToggle, onUse }) => {
  const reduce = useReducedMotion() ?? false
  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      onToggle()
    }
  }
  return (
    <div
      role="button"
      tabIndex={0}
      aria-pressed={flipped}
      aria-label={copy.card.toggle(template.label, flipped)}
      onClick={onToggle}
      onKeyDown={onKeyDown}
      className="aspect-video w-full cursor-pointer [perspective:1200px] focus-visible:outline-2 focus-visible:outline-offset-4">
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 200, damping: 22 }}
        className="relative size-full [transform-style:preserve-3d]">
        <div className="absolute inset-0 [backface-visibility:hidden]">
          <SlideImage
            locale={locale}
            id={template.id}
            page="style"
            alt={copy.card.coverAlt(template.label)}
            className="h-full shadow-xl"
          />
        </div>
        <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <CardBack template={template} copy={copy} onUse={onUse} />
        </div>
      </motion.div>
    </div>
  )
}

const SlideDeck: FC<{ copy: AiPptCopy; locale: UseCaseLocale; onUse: (id: string) => void }> = ({
  copy,
  locale,
  onUse
}) => {
  const templates = copy.templates
  const [open, setOpen] = useState(false)
  const [flipped, setFlipped] = useState<string | null>(null)
  const spread = open || flipped !== null
  const toggle = (id: string) => setFlipped((current) => (current === id ? null : id))

  return (
    <>
      {/* 桌面：叠成一摞，鼠标移上去散开成扇形 */}
      <section
        aria-label={copy.deckLabel}
        className="relative mt-10 hidden h-[300px] md:block"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}>
        {templates.map((template, index) => {
          const offset = index - (templates.length - 1) / 2
          const isFlipped = flipped === template.id
          return (
            <motion.div
              key={template.id}
              className="absolute top-6 left-1/2 -ml-[130px] w-[260px] text-[12px]"
              animate={{
                x: spread ? offset * 248 : offset * 46,
                y: spread ? (isFlipped ? -14 : 0) : Math.abs(offset) * 10,
                rotate: spread ? offset * 2 : offset * 7,
                scale: isFlipped ? 1.06 : 1
              }}
              whileHover={{ y: -14 }}
              transition={{ type: 'spring', stiffness: 220, damping: 22 }}
              style={{ zIndex: isFlipped ? 20 : 10 + index }}>
              <FlipCard
                template={template}
                copy={copy}
                locale={locale}
                flipped={isFlipped}
                onToggle={() => toggle(template.id)}
                onUse={onUse}
              />
              <p className="text-foreground mt-3 text-center text-sm font-medium">{template.label}</p>
              <p className="text-muted-foreground text-center text-xs">{template.style}</p>
            </motion.div>
          )
        })}
      </section>

      {/* 手机：横向滑动，点一下翻面 */}
      <ul className="mt-8 -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 md:hidden">
        {templates.map((template) => (
          <li key={template.id} className="w-[78%] shrink-0 snap-center text-[13px]">
            <FlipCard
              template={template}
              copy={copy}
              locale={locale}
              flipped={flipped === template.id}
              onToggle={() => toggle(template.id)}
              onUse={onUse}
            />
            <p className="text-foreground mt-2 text-sm font-medium">{template.label}</p>
            <p className="text-muted-foreground text-xs">{template.style}</p>
          </li>
        ))}
      </ul>
    </>
  )
}

// ---------- 3. 樱桃三步：进入视野后，樱桃按顺序点亮 ----------

const CHERRY_UNRIPE = 'var(--muted-foreground)'
const CHERRY_RIPE = 'var(--primary)'

const CherryDot: FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path
      d="M12 9 C12 5 14 3 17 2"
      stroke="var(--muted-foreground)"
      strokeWidth="1.6"
      fill="none"
      strokeLinecap="round"
    />
    <circle cx="12" cy="15" r="7" fill={CHERRY_RIPE} />
    <ellipse cx="9.5" cy="12.5" rx="2" ry="1.2" fill="white" opacity="0.5" />
  </svg>
)

const Cherry: FC<{ ripe: boolean; delay: number; label: string }> = ({ ripe, delay, label }) => {
  const reduce = useReducedMotion() ?? false
  return (
    <svg viewBox="0 0 56 64" className="size-14" aria-hidden="true">
      <path
        d="M28 22 C28 13 32 7 39 4"
        stroke="var(--muted-foreground)"
        strokeWidth="2.6"
        fill="none"
        strokeLinecap="round"
      />
      <path d="M36 6 C41 1 49 2 52 7 C46 10 40 10 36 6 Z" fill="var(--primary)" />
      <motion.circle
        cx="28"
        cy="40"
        r="18"
        initial={{ fill: reduce ? CHERRY_RIPE : CHERRY_UNRIPE }}
        animate={{ fill: ripe || reduce ? CHERRY_RIPE : CHERRY_UNRIPE, scale: ripe && !reduce ? [1, 1.12, 1] : 1 }}
        transition={{ delay: reduce ? 0 : delay, duration: 0.6 }}
        style={{ transformOrigin: '28px 40px' }}
      />
      <ellipse cx="21" cy="33" rx="5" ry="3" fill="white" opacity="0.45" transform="rotate(-30 21 33)" />
      <text x="28" y="46" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--background)">
        {label}
      </text>
    </svg>
  )
}

const CherrySteps: FC<{ steps: AiPptCopy['steps'] }> = ({ steps }) => {
  const reduce = useReducedMotion() ?? false
  const [ripe, setRipe] = useState(false)
  return (
    <motion.div className="relative mt-12" onViewportEnter={() => setRipe(true)} viewport={{ once: true, amount: 0.4 }}>
      {/* 连接三颗樱桃的枝条（桌面） */}
      <svg
        className="pointer-events-none absolute top-6 right-[16.66%] left-[16.66%] hidden h-[30px] md:block"
        viewBox="0 0 650 30"
        preserveAspectRatio="none"
        aria-hidden="true">
        <motion.path
          d="M0 15 C 80 0, 245 0, 325 15 S 570 30, 650 15"
          fill="none"
          stroke="var(--input)"
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={{ pathLength: reduce ? 1 : 0 }}
          animate={{ pathLength: ripe || reduce ? 1 : 0 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
        />
      </svg>
      <ol className="relative grid gap-8 md:grid-cols-3 md:gap-6">
        {steps.map(({ title, body }, index) => (
          <li key={title} className="flex flex-col items-center text-center">
            <Cherry ripe={ripe} delay={0.4 + index * 0.55} label={String(index + 1)} />
            <h3 className="text-foreground mt-4 text-lg font-semibold">{title}</h3>
            <p className="text-muted-foreground mt-2 max-w-xs text-sm leading-6">{body}</p>
          </li>
        ))}
      </ol>
    </motion.div>
  )
}

// ---------- 页面 ----------

export default function AiPptUseCasePage() {
  const { i18n } = useTranslation()
  const locale: UseCaseLocale = isEnglishSite(i18n.resolvedLanguage || i18n.language) ? 'en' : 'zh'
  const copy = AI_PPT_COPY[locale]
  const reduce = useReducedMotion() ?? false
  const [active, setActive] = useState<string>(copy.templates[0].id)
  const [copied, setCopied] = useState(false)
  const template = copy.templates.find(({ id }) => id === active) ?? copy.templates[0]
  const { typed, done } = useTyping(template.prompt, reduce)

  usePageMeta('useCaseAiPpt')

  const copyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(template.prompt)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    } catch {
      setCopied(false)
    }
  }

  const applyTemplate = (id: string) => {
    setActive(id)
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
  }

  return (
    <div className="bg-background min-h-screen overflow-x-hidden">
      <main>
        {/* 1. 首屏：左边提示词，右边生成过程 */}
        <section className="relative">
          <div className="site-container site-page-top site-split relative pb-12 sm:pb-16 lg:items-center">
            <div>
              <nav aria-label={copy.breadcrumb.label} className="text-muted-foreground text-sm">
                <Link to="/resources/articles/" className="hover:text-foreground transition-colors">
                  {copy.breadcrumb.root}
                </Link>
                <span className="mx-2">/</span>
                <span>{copy.breadcrumb.current}</span>
              </nav>
              <h1 className="text-foreground mt-5 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
                {copy.h1Lead} <span className="text-primary">PPT</span>
              </h1>
              <p className="text-muted-foreground mt-5 max-w-xl text-lg leading-8 text-pretty">{copy.intro}</p>

              <div className="border-border bg-card mt-8 rounded-lg border p-2">
                <div className="flex flex-wrap gap-1 p-1" role="tablist" aria-label={copy.templatesLabel}>
                  {copy.templates.map(({ id, label }) => (
                    <button
                      key={id}
                      type="button"
                      role="tab"
                      aria-selected={id === active}
                      onClick={() => setActive(id)}
                      className={cn(
                        'rounded-lg px-3 py-1.5 text-sm transition-colors',
                        id === active
                          ? 'bg-primary/10 text-primary font-medium'
                          : 'text-muted-foreground hover:text-foreground'
                      )}>
                      {label}
                    </button>
                  ))}
                </div>
                {/* 隐形全文撑住高度，打字效果叠在上面，切换模板时不跳动 */}
                <p className="text-foreground/85 relative px-4 pt-3 pb-4 leading-7">
                  <span className="invisible">{template.prompt}</span>
                  <span className="absolute inset-x-4 top-3" aria-live="off">
                    {typed}
                    {!done && <span className="bg-primary ml-0.5 inline-block h-4 w-0.5 animate-pulse align-middle" />}
                  </span>
                </p>
                <div className="border-border flex flex-wrap items-center justify-between gap-3 border-t px-3 pt-3 pb-1">
                  <span className="text-muted-foreground text-xs">{copy.pasteHint}</span>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={copyPrompt}
                      className="border-border text-foreground hover:bg-muted inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm transition-colors">
                      {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
                      {copied ? copy.copied : copy.copyPrompt}
                    </button>
                    <Link
                      to="/download"
                      className="bg-foreground text-background inline-flex items-center gap-1.5 rounded-md px-4 py-2 text-sm font-medium transition-opacity hover:opacity-90">
                      <Download className="size-4" />
                      {copy.download}
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <GenerationDemo template={template} copy={copy} locale={locale} />
          </div>
        </section>

        {/* 3. 樱桃三步 */}
        <section className="mx-auto max-w-5xl px-4 pt-20 sm:px-6">
          <h2 className="text-foreground text-center text-3xl font-semibold tracking-tight">{copy.stepsTitle}</h2>
          <CherrySteps steps={copy.steps} />
        </section>

        {/* 2. 卡牌式成品示意 */}
        <section className="mx-auto max-w-5xl px-4 pt-24 sm:px-6">
          <div className="text-center">
            <h2 className="text-foreground text-3xl font-semibold tracking-tight">{copy.deckTitle}</h2>
            <p className="text-muted-foreground mt-2 text-sm">{copy.deckHint}</p>
          </div>
          <SlideDeck copy={copy} locale={locale} onUse={applyTemplate} />
        </section>

        {/* 真实界面 */}
        <section className="mx-auto max-w-5xl px-4 pt-20 sm:px-6">
          <figure className="border-primary/15 from-primary/10 rounded-3xl border bg-linear-to-b to-transparent p-3 sm:p-5">
            <img
              src={copy.screenshot.src}
              alt={copy.screenshot.alt}
              className="border-border w-full rounded-xl border"
              loading="lazy"
            />
            <figcaption className="text-muted-foreground mt-3 text-center text-sm">
              {copy.screenshot.caption}
            </figcaption>
          </figure>
        </section>

        {/* 能力 */}
        <section className="mx-auto max-w-5xl px-4 pt-24 sm:px-6">
          <h2 className="text-foreground text-3xl font-semibold tracking-tight">{copy.featuresTitle}</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {copy.features.map(({ title, body }, index) => {
              const Icon = FEATURE_ICONS[index]
              return (
                <div
                  key={title}
                  className="border-border hover:border-primary/30 rounded-2xl border p-6 transition-colors">
                  <Icon className="text-primary size-5" />
                  <h3 className="text-foreground mt-4 font-semibold">{title}</h3>
                  <p className="text-muted-foreground mt-2 text-sm leading-6">{body}</p>
                </div>
              )
            })}
          </div>
        </section>

        {/* 常见问题 */}
        <section className="mx-auto max-w-3xl px-4 pt-24 sm:px-6">
          <h2 className="text-foreground text-3xl font-semibold tracking-tight">{copy.faqTitle}</h2>
          <div className="divide-border border-border mt-6 divide-y border-y">
            {copy.faq.map(({ q, a }) => (
              <details key={q} className="group py-5">
                <summary className="text-foreground flex cursor-pointer list-none items-center justify-between gap-4 font-medium">
                  {q}
                  <span className="text-primary transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="text-muted-foreground mt-3 leading-7">{a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* 更多场景 + 收尾 */}
        <section className="mx-auto max-w-5xl px-4 pt-24 pb-24 sm:px-6">
          <h2 className="text-foreground text-xl font-semibold">{copy.moreTitle}</h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-3">
            {copy.more.map(({ to, title, body }) => (
              <li key={to}>
                <Link
                  to={to}
                  className="border-border hover:border-primary/40 block rounded-xl border p-4 transition-colors">
                  <p className="text-foreground text-sm font-medium">{title}</p>
                  <p className="text-muted-foreground mt-1 text-xs">{body}</p>
                </Link>
              </li>
            ))}
          </ul>

          <div className="border-primary/20 from-primary/15 via-primary/5 mt-16 rounded-3xl border bg-linear-to-br to-transparent px-6 py-12 text-center sm:px-12">
            <h2 className="text-foreground text-2xl font-semibold tracking-tight sm:text-3xl">{copy.cta.title}</h2>
            <p className="text-muted-foreground mx-auto mt-3 max-w-xl leading-7">{copy.cta.body}</p>
            <Link
              to="/download"
              className="bg-foreground text-background mt-6 inline-flex items-center gap-1.5 rounded-md px-6 py-3 text-sm font-medium transition-opacity hover:opacity-90">
              <Download className="size-4" />
              {copy.cta.button}
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
