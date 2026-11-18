import {
  Check,
  Copy,
  Download,
  FileText,
  FolderOpen,
  Layers,
  MessageSquare,
  Presentation,
  Sparkles
} from 'lucide-react'
import { type FC, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import Footer from '@/components/website/Footer'
import { cn } from '@/lib/utils'

// 应用场景落地页原型（仅中文，本地评审用）：参考 Kimi /use-cases 的结构
// 首屏可复制的提示词 → 演示截图 → 三步 → 成品示意 → 能力 → 常见问题 → 更多场景

type Template = {
  id: string
  label: string
  prompt: string
  slide: { kicker: string; title: string; lines: string[]; tone: keyof typeof TONES }
}

const TEMPLATES: Template[] = [
  {
    id: 'report',
    label: '工作汇报',
    prompt:
      '阅读工作目录里的周报和项目数据，做一份 10 页左右的季度工作汇报 PPT：先讲整体进展，再讲三个重点项目，最后列出下季度计划。风格简洁，数据用图表呈现，保存为 Q3-report.pptx。',
    slide: {
      kicker: 'Q3 · 工作汇报',
      title: '第三季度进展与下季度计划',
      lines: ['整体进展', '重点项目', '下季度计划'],
      tone: 'slate'
    }
  },
  {
    id: 'lecture',
    label: '课程讲义',
    prompt:
      '根据目录里的课程笔记和参考论文，做一份 45 分钟课程用的讲义 PPT：每页一个核心概念，配一个生活中的例子，最后两页放课堂讨论题。保存为 lecture-week5.pptx。',
    slide: {
      kicker: '第 5 周 · 课程讲义',
      title: '供给与需求：价格是怎么形成的',
      lines: ['核心概念', '生活中的例子', '课堂讨论'],
      tone: 'stone'
    }
  },
  {
    id: 'launch',
    label: '产品介绍',
    prompt:
      '根据目录里的产品文档和用户反馈，做一份给客户看的产品介绍 PPT：痛点、解决方案、核心功能、使用场景和下一步合作方式，控制在 12 页以内，保存为 product-intro.pptx。',
    slide: {
      kicker: '产品介绍',
      title: '让团队的资料，变成随时能用的答案',
      lines: ['用户痛点', '核心功能', '使用场景'],
      tone: 'ink'
    }
  },
  {
    id: 'reading',
    label: '读书分享',
    prompt:
      '读一下目录里这本书的读书笔记，做一份 15 分钟读书分享会用的 PPT：作者和背景、三个最打动我的观点、我的思考，语气轻松一点。保存为 book-share.pptx。',
    slide: {
      kicker: '读书分享',
      title: '《思考，快与慢》里的两个系统',
      lines: ['作者与背景', '三个观点', '我的思考'],
      tone: 'sage'
    }
  }
]

// 低饱和的灰蓝、石色、墨色、灰绿，用于成品示意
const TONES = {
  slate: { bg: 'bg-[#1f2a37]', accent: 'bg-[#8fa3b8]', text: 'text-[#e6ecf2]', sub: 'text-[#9fb0c2]' },
  stone: { bg: 'bg-[#efebe4]', accent: 'bg-[#8a7f70]', text: 'text-[#2f2a24]', sub: 'text-[#7a7064]' },
  ink: { bg: 'bg-[#15171c]', accent: 'bg-[#c9a27a]', text: 'text-[#f1ede7]', sub: 'text-[#a29a90]' },
  sage: { bg: 'bg-[#e4e9e4]', accent: 'bg-[#6f8577]', text: 'text-[#25302a]', sub: 'text-[#5f6f65]' }
}

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

const SlideMock: FC<{ slide: Template['slide']; className?: string }> = ({ slide, className }) => {
  const tone = TONES[slide.tone]
  return (
    <div className={cn('relative aspect-video w-full overflow-hidden rounded-lg', tone.bg, className)}>
      <div className="absolute inset-0 flex flex-col justify-between p-[7%]">
        <div>
          <p className={cn('text-[0.62em] tracking-wide', tone.sub)}>{slide.kicker}</p>
          <p className={cn('mt-[0.6em] text-[1.15em] leading-snug font-semibold text-balance', tone.text)}>
            {slide.title}
          </p>
        </div>
        <div className="flex items-end justify-between gap-4">
          <ul className={cn('space-y-[0.35em] text-[0.62em]', tone.sub)}>
            {slide.lines.map((line, index) => (
              <li key={line} className="flex items-center gap-[0.6em]">
                <span className={cn('inline-block h-[0.12em] w-[1.4em]', tone.accent)} />
                {String(index + 1).padStart(2, '0')} {line}
              </li>
            ))}
          </ul>
          <div className="flex h-[3.2em] items-end gap-[0.35em]" aria-hidden="true">
            {[45, 70, 55, 90].map((height) => (
              <span
                key={height}
                className={cn('w-[0.7em] rounded-t-sm opacity-80', tone.accent)}
                style={{ height: `${height}%` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function AiPptUseCasePage() {
  const [active, setActive] = useState(TEMPLATES[0].id)
  const [copied, setCopied] = useState(false)
  const template = TEMPLATES.find(({ id }) => id === active) ?? TEMPLATES[0]

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

  return (
    <div className="bg-background min-h-screen">
      <main>
        {/* 首屏：标题 + 可直接复制的提示词 */}
        <section className="relative overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(60%_60%_at_50%_0%,rgba(100,116,139,0.18),transparent_70%)]"
          />
          <div className="relative mx-auto max-w-4xl px-4 pt-28 pb-12 text-center sm:px-6 sm:pt-36">
            <nav aria-label="面包屑" className="text-muted-foreground text-sm">
              <Link to="/resources/articles/" className="hover:text-foreground transition-colors">
                资源
              </Link>
              <span className="mx-2">/</span>
              <span>应用场景</span>
            </nav>
            <h1 className="text-foreground mt-6 text-4xl font-bold tracking-tight text-balance sm:text-5xl">
              AI 生成 PPT
            </h1>
            <p className="text-muted-foreground mx-auto mt-5 max-w-2xl text-lg leading-8 text-pretty">
              把资料放进一个文件夹，用一句话说清要什么。Cherry Studio 的智能体会读完你的文件，做出一份可以直接编辑的
              PPT。
            </p>

            <div className="border-border bg-card mx-auto mt-10 max-w-3xl rounded-2xl border p-2 text-left shadow-[0_24px_60px_-30px_rgb(15_23_42/0.35)]">
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
                        ? 'bg-muted text-foreground font-medium'
                        : 'text-muted-foreground hover:text-foreground'
                    )}>
                    {label}
                  </button>
                ))}
              </div>
              <p className="text-foreground/85 min-h-[7.5rem] px-4 pt-3 pb-4 leading-7">{template.prompt}</p>
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
                    className="bg-foreground text-background inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-opacity hover:opacity-90">
                    <Download className="size-4" />
                    免费下载
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 演示：真实截图 */}
        <section className="mx-auto max-w-5xl px-4 sm:px-6">
          <figure className="border-border bg-muted/40 rounded-3xl border p-3 sm:p-5">
            <img
              src="/images/compare/ai-office-assistant-zh-2.webp"
              alt="Cherry Studio 智能体根据对话生成 PPT，右侧预览面板直接打开生成的幻灯片"
              className="border-border w-full rounded-xl border"
              loading="lazy"
            />
            <figcaption className="text-muted-foreground mt-3 text-center text-sm">
              左边是和智能体的对话，右边是它生成的 PPT 预览
            </figcaption>
          </figure>
        </section>

        {/* 三步 */}
        <section className="mx-auto max-w-5xl px-4 pt-24 sm:px-6">
          <h2 className="text-foreground text-center text-3xl font-semibold tracking-tight">三步做出一份 PPT</h2>
          <ol className="mt-10 grid gap-4 md:grid-cols-3">
            {STEPS.map(({ icon: Icon, title, body }, index) => (
              <li key={title} className="border-border bg-card rounded-2xl border p-6">
                <div className="flex items-center justify-between">
                  <Icon className="text-muted-foreground size-5" />
                  <span className="text-muted-foreground/60 text-sm tabular-nums">0{index + 1}</span>
                </div>
                <h3 className="text-foreground mt-5 text-lg font-semibold">{title}</h3>
                <p className="text-muted-foreground mt-2 text-sm leading-6">{body}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* 成品示意 */}
        <section className="mx-auto max-w-5xl px-4 pt-24 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-2">
            <h2 className="text-foreground text-3xl font-semibold tracking-tight">能做出什么样的 PPT</h2>
            <span className="text-muted-foreground text-xs">示意图，上线前换成真实生成的封面</span>
          </div>
          <ul className="mt-8 grid gap-5 sm:grid-cols-2">
            {TEMPLATES.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => {
                    setActive(item.id)
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }}
                  className="group block w-full text-left">
                  <SlideMock
                    slide={item.slide}
                    className="text-[15px] transition-transform duration-300 group-hover:-translate-y-1 sm:text-[17px]"
                  />
                  <p className="text-foreground mt-3 text-sm font-medium">{item.label}</p>
                  <p className="text-muted-foreground mt-0.5 text-xs">点击查看这份 PPT 的提示词</p>
                </button>
              </li>
            ))}
          </ul>
        </section>

        {/* 能力 */}
        <section className="mx-auto max-w-5xl px-4 pt-24 sm:px-6">
          <h2 className="text-foreground text-3xl font-semibold tracking-tight">为什么用 Cherry Studio 做 PPT</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {FEATURES.map(({ icon: Icon, title, body }) => (
              <div key={title} className="border-border rounded-2xl border p-6">
                <Icon className="text-muted-foreground size-5" />
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
                  <span className="text-muted-foreground transition-transform group-open:rotate-45">+</span>
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
                  className="border-border hover:border-foreground/30 block rounded-xl border p-4 transition-colors">
                  <p className="text-foreground text-sm font-medium">{title}</p>
                  <p className="text-muted-foreground mt-1 text-xs">{body}</p>
                </Link>
              </li>
            ))}
          </ul>

          <div className="border-border bg-muted/40 mt-16 rounded-3xl border px-6 py-12 text-center sm:px-12">
            <h2 className="text-foreground text-2xl font-semibold tracking-tight sm:text-3xl">
              下一份 PPT，交给智能体
            </h2>
            <p className="text-muted-foreground mx-auto mt-3 max-w-xl leading-7">
              支持 Windows、macOS 和 Linux。下载后选一个工作目录，粘贴上面的提示词就能开始。
            </p>
            <Link
              to="/download"
              className="bg-foreground text-background mt-6 inline-flex items-center gap-1.5 rounded-full px-6 py-3 text-sm font-medium transition-opacity hover:opacity-90">
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
