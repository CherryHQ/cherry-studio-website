import { motion, useReducedMotion } from 'framer-motion'
import {
  Check,
  Copy,
  Download,
  FileText,
  FolderOpen,
  Layers,
  MessageSquare,
  Presentation,
  RotateCcw,
  Sparkles
} from 'lucide-react'
import { type FC, type KeyboardEvent, type MouseEvent, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import Footer from '@/components/website/Footer'
import { cn } from '@/lib/utils'

// 应用场景落地页原型（仅中文，本地评审用），结构参考 Kimi /use-cases：
// 首屏（提示词打字 + 生成过程动画）→ 樱桃三步 → 卡牌式示例 PPT（点开翻面看提示词）→ 真实界面 → 能力 → 常见问题 → 更多场景
// 所有动画在系统开启「减少动态效果」时直接显示最终状态

type Template = {
  id: string
  label: string
  short: string
  file: string
  files: string[]
  prompt: string
}

const TEMPLATES: Template[] = [
  {
    id: 'report',
    label: '工作汇报',
    short: '帮我做一份季度工作汇报 PPT，数据用图表',
    file: 'Q3-report.pptx',
    files: ['周报-Q3.docx', '项目数据.xlsx', '会议记录.md'],
    prompt:
      '阅读工作目录里的周报和项目数据，做一份 10 页左右的季度工作汇报 PPT：先讲整体进展，再讲三个重点项目，最后列出下季度计划。风格简洁，数据用图表呈现，保存为 Q3-report.pptx。'
  },
  {
    id: 'lecture',
    label: '课程讲义',
    short: '把课程笔记做成 45 分钟的讲义 PPT',
    file: 'lecture-week5.pptx',
    files: ['课程笔记.md', '参考论文.pdf', '课堂讨论.docx'],
    prompt:
      '根据目录里的课程笔记和参考论文，做一份 45 分钟课程用的讲义 PPT：每页一个核心概念，配一个生活中的例子，最后两页放课堂讨论题。保存为 lecture-week5.pptx。'
  },
  {
    id: 'launch',
    label: '产品介绍',
    short: '根据产品文档做一份给客户看的介绍 PPT',
    file: 'product-intro.pptx',
    files: ['产品文档.pdf', '用户反馈.xlsx', '功能清单.md'],
    prompt:
      '根据目录里的产品文档和用户反馈，做一份给客户看的产品介绍 PPT：痛点、解决方案、核心功能、使用场景和下一步合作方式，控制在 12 页以内，保存为 product-intro.pptx。'
  },
  {
    id: 'reading',
    label: '读书分享',
    short: '用读书笔记做一份轻松的分享会 PPT',
    file: 'book-share.pptx',
    files: ['读书笔记.md', '摘抄.docx', '思维导图.png'],
    prompt:
      '读一下目录里这本书的读书笔记，做一份 15 分钟读书分享会用的 PPT：作者和背景、三个最打动我的观点、我的思考，语气轻松一点。保存为 book-share.pptx。'
  }
]

const STEPS = [
  {
    icon: FolderOpen,
    title: '选一个工作目录',
    body: '新建一个文件夹，把要用的资料放进去：周报、数据表、PDF、笔记都行。智能体只在这个目录里读写文件。'
  },
  {
    icon: MessageSquare,
    title: '用一句话说清要什么',
    body: '写明用途、页数和风格，比如「10 页左右的季度汇报，数据用图表」。不满意就接着说，让它逐页修改。'
  },
  {
    icon: Presentation,
    title: '预览，满意再导出',
    body: '生成的 .pptx 会在右侧直接打开预览。确认没问题再下载，用 PowerPoint、WPS 或 Keynote 继续编辑。'
  }
]

const FEATURES = [
  {
    icon: FileText,
    title: '基于你自己的资料',
    body: '不是凭空编内容：智能体会先读工作目录里的文档和数据，再整理成幻灯片。'
  },
  {
    icon: Layers,
    title: '真正能编辑的 .pptx',
    body: '交付的是标准 PPT 文件，不是一张图片。标题、文字和图表都能继续改。'
  },
  {
    icon: Sparkles,
    title: '模型随你选',
    body: 'Claude、GPT、DeepSeek、通义千问等模型都能用，复杂的排版交给能力更强的模型。'
  },
  {
    icon: MessageSquare,
    title: '改到满意为止',
    body: '「第 3 页换成柱状图」「整体再简洁一点」，用对话的方式一页一页调整。'
  }
]

const FAQ = [
  {
    q: '用 AI 生成 PPT 需要会设计吗？',
    a: '不需要。描述清楚用途、页数和风格，智能体会负责结构和排版。想要特定风格，可以在提示词里写明配色、字体或参考的样式。'
  },
  {
    q: '生成的是图片，还是可以编辑的 PPT？',
    a: '是标准的 .pptx 文件，可以用 PowerPoint、WPS 或 Keynote 打开继续编辑。'
  },
  {
    q: '能根据我自己的资料来做吗？',
    a: '可以。把 Word、PDF、Excel、笔记等资料放进工作目录，在提示词里让智能体先读这些文件，再整理成幻灯片。'
  },
  {
    q: '我的资料会被上传吗？',
    a: '文件在你的电脑上读取，内容会发给你选择的模型服务商处理。如果资料比较敏感，可以换成 Ollama 等本地模型，全程不出电脑。'
  },
  {
    q: '哪个模型做 PPT 效果更好？',
    a: '页数多、排版复杂的 PPT 建议用能力更强的模型。可以先用同一个提示词试两个模型，对比后再定。'
  }
]

const MORE = [
  { to: '/resources/articles/ai-office-assistant', title: 'AI 办公助手', body: '会议纪要、周报、长文档审阅' },
  { to: '/resources/articles/ai-translation', title: 'AI 翻译', body: '划词翻译、PDF 保留版式翻译' },
  { to: '/resources/articles/ai-knowledge-base', title: 'AI 知识库', body: '用自己的资料回答问题' }
]

// 示例 PPT 的真实页面截图：public/images/use-cases/ai-ppt-<模板>-<页>.webp，第 1 页是封面
const SlideImage: FC<{ id: string; page: number; alt: string; className?: string }> = ({
  id,
  page,
  alt,
  className
}) => (
  <img
    src={`/images/use-cases/ai-ppt-${id}-${page}.webp`}
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

const GenerationDemo: FC<{ template: Template }> = ({ template }) => {
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

  // 内页先落下，封面最后落在最上面
  const pages = [3, 2, 1]
  const spring = { type: 'spring' as const, stiffness: 260, damping: 18 }

  return (
    <div className="border-border bg-card relative overflow-hidden rounded-2xl border shadow-[0_30px_80px_-40px_rgb(220_38_38/0.45)]">
      <div className="border-border flex items-center gap-2 border-b px-4 py-3">
        <span className="size-2.5 rounded-full bg-[#ff5f57]" />
        <span className="size-2.5 rounded-full bg-[#febc2e]" />
        <span className="size-2.5 rounded-full bg-[#28c840]" />
        <span className="text-muted-foreground ml-2 text-xs">Cherry Studio · 智能体</span>
        <button
          type="button"
          onClick={() => setRun((value) => value + 1)}
          className="text-muted-foreground hover:text-foreground ml-auto inline-flex items-center gap-1 text-xs transition-colors"
          aria-label="重新播放生成过程">
          <RotateCcw className="size-3.5" />
          重播
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
              读取了工作目录里的 {template.files.length} 个文件
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
                正在生成幻灯片
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
                已完成，生成了 1 个文件
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
                <SlideImage id={template.id} page={page} alt={`${template.label} PPT 第 ${page} 页`} />
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
                <span className="text-muted-foreground block text-xs">可直接编辑 · 已保存到工作目录</span>
              </span>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

// ---------- 2. 卡牌式成品示意：鼠标移上散开，点击翻面看提示词 ----------

const CardBack: FC<{ template: Template; onUse: (id: string) => void }> = ({ template, onUse }) => {
  const [copied, setCopied] = useState(false)
  const stop = (event: MouseEvent) => event.stopPropagation()
  return (
    <div className="border-primary/30 bg-card flex h-full flex-col rounded-lg border p-3.5 text-left">
      <p className="text-primary text-xs font-medium">{template.label} · 提示词</p>
      <p className="text-foreground/80 mt-1.5 line-clamp-3 text-xs leading-5">{template.prompt}</p>
      <div className="mt-auto flex gap-2 pt-2">
        <button
          type="button"
          onClick={async (event) => {
            stop(event)
            try {
              await navigator.clipboard.writeText(template.prompt)
              setCopied(true)
              window.setTimeout(() => setCopied(false), 1500)
            } catch {
              setCopied(false)
            }
          }}
          className="border-border hover:bg-muted inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs transition-colors">
          {copied ? <Check className="size-3" /> : <Copy className="size-3" />}
          {copied ? '已复制' : '复制'}
        </button>
        <button
          type="button"
          onClick={(event) => {
            stop(event)
            onUse(template.id)
          }}
          className="bg-primary text-primary-foreground rounded-full px-2.5 py-1 text-xs transition-opacity hover:opacity-90">
          用这个模板
        </button>
      </div>
    </div>
  )
}

const FlipCard: FC<{ template: Template; flipped: boolean; onToggle: () => void; onUse: (id: string) => void }> = ({
  template,
  flipped,
  onToggle,
  onUse
}) => {
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
      aria-label={`${template.label}示例，点击${flipped ? '翻回正面' : '查看提示词'}`}
      onClick={onToggle}
      onKeyDown={onKeyDown}
      className="aspect-video w-full cursor-pointer [perspective:1200px] focus-visible:outline-2 focus-visible:outline-offset-4">
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 200, damping: 22 }}
        className="relative size-full [transform-style:preserve-3d]">
        <div className="absolute inset-0 [backface-visibility:hidden]">
          <SlideImage id={template.id} page={1} alt={`${template.label} PPT 封面`} className="h-full shadow-xl" />
        </div>
        <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <CardBack template={template} onUse={onUse} />
        </div>
      </motion.div>
    </div>
  )
}

const SlideDeck: FC<{ onUse: (id: string) => void }> = ({ onUse }) => {
  const [open, setOpen] = useState(false)
  const [flipped, setFlipped] = useState<string | null>(null)
  const spread = open || flipped !== null
  const toggle = (id: string) => setFlipped((current) => (current === id ? null : id))

  return (
    <>
      {/* 桌面：叠成一摞，鼠标移上去散开成扇形 */}
      <section
        aria-label="示例 PPT"
        className="relative mt-10 hidden h-[300px] md:block"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}>
        {TEMPLATES.map((template, index) => {
          const offset = index - (TEMPLATES.length - 1) / 2
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
              <FlipCard template={template} flipped={isFlipped} onToggle={() => toggle(template.id)} onUse={onUse} />
              <p className="text-foreground mt-3 text-center text-sm font-medium">{template.label}</p>
            </motion.div>
          )
        })}
      </section>

      {/* 手机：横向滑动，点一下翻面 */}
      <ul className="mt-8 -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 md:hidden">
        {TEMPLATES.map((template) => (
          <li key={template.id} className="w-[78%] shrink-0 snap-center text-[13px]">
            <FlipCard
              template={template}
              flipped={flipped === template.id}
              onToggle={() => toggle(template.id)}
              onUse={onUse}
            />
            <p className="text-foreground mt-2 text-sm font-medium">{template.label}</p>
          </li>
        ))}
      </ul>
    </>
  )
}

// ---------- 3. 樱桃三步：进入视野后，樱桃按顺序从青变红 ----------

const CHERRY_GREEN = '#b9c98e'
const CHERRY_RED = '#dc2626'

const CherryDot: FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path d="M12 9 C12 5 14 3 17 2" stroke="#6b8f4e" strokeWidth="1.6" fill="none" strokeLinecap="round" />
    <circle cx="12" cy="15" r="7" fill={CHERRY_RED} />
    <ellipse cx="9.5" cy="12.5" rx="2" ry="1.2" fill="white" opacity="0.5" />
  </svg>
)

const Cherry: FC<{ ripe: boolean; delay: number; label: string }> = ({ ripe, delay, label }) => {
  const reduce = useReducedMotion() ?? false
  return (
    <svg viewBox="0 0 56 64" className="size-14" aria-hidden="true">
      <path d="M28 22 C28 13 32 7 39 4" stroke="#6b8f4e" strokeWidth="2.6" fill="none" strokeLinecap="round" />
      <path d="M36 6 C41 1 49 2 52 7 C46 10 40 10 36 6 Z" fill="#7da35a" />
      <motion.circle
        cx="28"
        cy="40"
        r="18"
        initial={{ fill: reduce ? CHERRY_RED : CHERRY_GREEN }}
        animate={{ fill: ripe || reduce ? CHERRY_RED : CHERRY_GREEN, scale: ripe && !reduce ? [1, 1.12, 1] : 1 }}
        transition={{ delay: reduce ? 0 : delay, duration: 0.6 }}
        style={{ transformOrigin: '28px 40px' }}
      />
      <ellipse cx="21" cy="33" rx="5" ry="3" fill="white" opacity="0.45" transform="rotate(-30 21 33)" />
      <text x="28" y="46" textAnchor="middle" fontSize="16" fontWeight="700" fill="white">
        {label}
      </text>
    </svg>
  )
}

const CherrySteps: FC = () => {
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
          stroke="#7da35a"
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={{ pathLength: reduce ? 1 : 0 }}
          animate={{ pathLength: ripe || reduce ? 1 : 0 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
        />
      </svg>
      <ol className="relative grid gap-8 md:grid-cols-3 md:gap-6">
        {STEPS.map(({ title, body }, index) => (
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
  const reduce = useReducedMotion() ?? false
  const [active, setActive] = useState(TEMPLATES[0].id)
  const [copied, setCopied] = useState(false)
  const template = TEMPLATES.find(({ id }) => id === active) ?? TEMPLATES[0]
  const { typed, done } = useTyping(template.prompt, reduce)

  useEffect(() => {
    document.title = 'AI 生成 PPT：一句话让智能体做好整套幻灯片 | Cherry Studio'
  }, [])

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
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-[620px] bg-[radial-gradient(55%_60%_at_70%_10%,rgba(220,38,38,0.16),transparent_70%)]"
          />
          <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 pt-28 pb-16 sm:px-6 sm:pt-36 lg:grid-cols-[1fr_1.05fr] lg:px-8">
            <div>
              <nav aria-label="面包屑" className="text-muted-foreground text-sm">
                <Link to="/resources/articles/" className="hover:text-foreground transition-colors">
                  资源
                </Link>
                <span className="mx-2">/</span>
                <span>应用场景</span>
              </nav>
              <h1 className="text-foreground mt-5 text-4xl font-bold tracking-tight text-balance sm:text-5xl">
                AI 生成 <span className="text-primary">PPT</span>
              </h1>
              <p className="text-muted-foreground mt-5 max-w-xl text-lg leading-8 text-pretty">
                把资料放进一个文件夹，用一句话说清要什么。Cherry Studio 的智能体会读完你的文件，做出一份可以直接编辑的
                PPT。
              </p>

              <div className="border-border bg-card mt-8 rounded-2xl border p-2 shadow-[0_24px_60px_-30px_rgb(220_38_38/0.35)]">
                <div className="flex flex-wrap gap-1 p-1" role="tablist" aria-label="提示词模板">
                  {TEMPLATES.map(({ id, label }) => (
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
                  <span className="text-muted-foreground text-xs">在 Cherry Studio 的智能体里粘贴这段话</span>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={copyPrompt}
                      className="border-border text-foreground hover:bg-muted inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm transition-colors">
                      {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
                      {copied ? '已复制' : '复制提示词'}
                    </button>
                    <Link
                      to="/download"
                      className="bg-primary text-primary-foreground inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-opacity hover:opacity-90">
                      <Download className="size-4" />
                      免费下载
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <GenerationDemo template={template} />
          </div>
        </section>

        {/* 3. 樱桃三步 */}
        <section className="mx-auto max-w-5xl px-4 pt-20 sm:px-6">
          <h2 className="text-foreground text-center text-3xl font-semibold tracking-tight">三步做出一份 PPT</h2>
          <CherrySteps />
        </section>

        {/* 2. 卡牌式成品示意 */}
        <section className="mx-auto max-w-5xl px-4 pt-24 sm:px-6">
          <div className="text-center">
            <h2 className="text-foreground text-3xl font-semibold tracking-tight">能做出什么样的 PPT</h2>
            <p className="text-muted-foreground mt-2 text-sm">点一张卡片翻面，看看它的提示词</p>
          </div>
          <SlideDeck onUse={applyTemplate} />
        </section>

        {/* 真实界面 */}
        <section className="mx-auto max-w-5xl px-4 pt-20 sm:px-6">
          <figure className="border-primary/15 from-primary/10 rounded-3xl border bg-linear-to-b to-transparent p-3 sm:p-5">
            <img
              src="/images/compare/ai-office-assistant-zh-2.webp"
              alt="Cherry Studio 智能体根据对话生成 PPT，右侧预览面板直接打开生成的幻灯片"
              className="border-border w-full rounded-xl border"
              loading="lazy"
            />
            <figcaption className="text-muted-foreground mt-3 text-center text-sm">
              真实界面：左边是和智能体的对话，右边是它生成的 PPT 预览
            </figcaption>
          </figure>
        </section>

        {/* 能力 */}
        <section className="mx-auto max-w-5xl px-4 pt-24 sm:px-6">
          <h2 className="text-foreground text-3xl font-semibold tracking-tight">为什么用 Cherry Studio 做 PPT</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {FEATURES.map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="border-border hover:border-primary/30 rounded-2xl border p-6 transition-colors">
                <Icon className="text-primary size-5" />
                <h3 className="text-foreground mt-4 font-semibold">{title}</h3>
                <p className="text-muted-foreground mt-2 text-sm leading-6">{body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 常见问题 */}
        <section className="mx-auto max-w-3xl px-4 pt-24 sm:px-6">
          <h2 className="text-foreground text-3xl font-semibold tracking-tight">常见问题</h2>
          <div className="divide-border border-border mt-6 divide-y border-y">
            {FAQ.map(({ q, a }) => (
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
          <h2 className="text-foreground text-xl font-semibold">更多应用场景</h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-3">
            {MORE.map(({ to, title, body }) => (
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
            <h2 className="text-foreground text-2xl font-semibold tracking-tight sm:text-3xl">
              下一份 PPT，交给智能体
            </h2>
            <p className="text-muted-foreground mx-auto mt-3 max-w-xl leading-7">
              支持 Windows、macOS 和 Linux。下载后选一个工作目录，粘贴上面的提示词就能开始。
            </p>
            <Link
              to="/download"
              className="bg-primary text-primary-foreground mt-6 inline-flex items-center gap-1.5 rounded-full px-6 py-3 text-sm font-medium transition-opacity hover:opacity-90">
              <Download className="size-4" />
              免费下载 Cherry Studio
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
