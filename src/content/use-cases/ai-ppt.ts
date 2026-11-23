// 「AI 生成 PPT」应用场景页的中英文文案。示例 PPT 截图在 public/images/use-cases/<zh|en>/ai-ppt-<模板>-<页>.webp，
// 第 1 页是封面；源文件和生成脚本不在仓库里，换图时整组替换。

export type UseCaseLocale = 'zh' | 'en'

export type PptTemplate = {
  id: 'report' | 'lecture' | 'launch' | 'reading'
  label: string
  short: string
  file: string
  files: string[]
  prompt: string
}

export type AiPptCopy = {
  title: string
  breadcrumb: { root: string; current: string; label: string }
  h1Lead: string
  intro: string
  templatesLabel: string
  pasteHint: string
  copyPrompt: string
  copied: string
  download: string
  demo: {
    window: string
    replay: string
    replayLabel: string
    readFiles: (count: number) => string
    generating: string
    done: string
    fileNote: string
    pageAlt: (label: string, page: number) => string
  }
  stepsTitle: string
  steps: { title: string; body: string }[]
  deckTitle: string
  deckHint: string
  deckLabel: string
  card: {
    promptLabel: string
    copy: string
    use: string
    coverAlt: (label: string) => string
    toggle: (label: string, flipped: boolean) => string
  }
  screenshot: { src: string; alt: string; caption: string }
  featuresTitle: string
  features: { title: string; body: string }[]
  faqTitle: string
  faq: { q: string; a: string }[]
  moreTitle: string
  more: { to: string; title: string; body: string }[]
  cta: { title: string; body: string; button: string }
  templates: PptTemplate[]
}

export const AI_PPT_COPY: Record<UseCaseLocale, AiPptCopy> = {
  zh: {
    title: 'AI 生成 PPT：一句话让智能体做好整套幻灯片 | Cherry Studio',
    breadcrumb: { root: '资源', current: '应用场景', label: '面包屑' },
    h1Lead: 'AI 生成',
    intro:
      '把资料放进一个文件夹，用一句话说清要什么。Cherry Studio 的智能体会读完你的文件，做出一份可以直接编辑的 PPT。',
    templatesLabel: '提示词模板',
    pasteHint: '在 Cherry Studio 的智能体里粘贴这段话',
    copyPrompt: '复制提示词',
    copied: '已复制',
    download: '免费下载',
    demo: {
      window: 'Cherry Studio · 智能体',
      replay: '重播',
      replayLabel: '重新播放生成过程',
      readFiles: (count) => `读取了工作目录里的 ${count} 个文件`,
      generating: '正在生成幻灯片',
      done: '已完成，生成了 1 个文件',
      fileNote: '可直接编辑 · 已保存到工作目录',
      pageAlt: (label, page) => `${label} PPT 第 ${page} 页`
    },
    stepsTitle: '三步做出一份 PPT',
    steps: [
      {
        title: '选一个工作目录',
        body: '新建一个文件夹，把要用的资料放进去：周报、数据表、PDF、笔记都行。智能体只在这个目录里读写文件。'
      },
      {
        title: '用一句话说清要什么',
        body: '写明用途、页数和风格，比如「10 页左右的季度汇报，数据用图表」。不满意就接着说，让它逐页修改。'
      },
      {
        title: '预览，满意再导出',
        body: '生成的 .pptx 会在右侧直接打开预览。确认没问题再下载，用 PowerPoint、WPS 或 Keynote 继续编辑。'
      }
    ],
    deckTitle: '能做出什么样的 PPT',
    deckHint: '点一张卡片翻面，看看它的提示词',
    deckLabel: '示例 PPT',
    card: {
      promptLabel: '提示词',
      copy: '复制',
      use: '用这个模板',
      coverAlt: (label) => `${label} PPT 封面`,
      toggle: (label, flipped) => `${label}示例，点击${flipped ? '翻回正面' : '查看提示词'}`
    },
    screenshot: {
      src: '/images/compare/ai-office-assistant-zh-2.webp',
      alt: 'Cherry Studio 智能体根据对话生成 PPT，右侧预览面板直接打开生成的幻灯片',
      caption: '真实界面：左边是和智能体的对话，右边是它生成的 PPT 预览'
    },
    featuresTitle: '为什么用 Cherry Studio 做 PPT',
    features: [
      { title: '基于你自己的资料', body: '不是凭空编内容：智能体会先读工作目录里的文档和数据，再整理成幻灯片。' },
      { title: '真正能编辑的 .pptx', body: '交付的是标准 PPT 文件，不是一张图片。标题、文字和图表都能继续改。' },
      { title: '模型随你选', body: 'Claude、GPT、DeepSeek、通义千问等模型都能用，复杂的排版交给能力更强的模型。' },
      { title: '改到满意为止', body: '「第 3 页换成柱状图」「整体再简洁一点」，用对话的方式一页一页调整。' }
    ],
    faqTitle: '常见问题',
    faq: [
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
    ],
    moreTitle: '更多应用场景',
    more: [
      { to: '/resources/articles/ai-office-assistant', title: 'AI 办公助手', body: '会议纪要、周报、长文档审阅' },
      { to: '/resources/articles/ai-translation', title: 'AI 翻译', body: '划词翻译、PDF 保留版式翻译' },
      { to: '/resources/articles/ai-knowledge-base', title: 'AI 知识库', body: '用自己的资料回答问题' }
    ],
    cta: {
      title: '下一份 PPT，交给智能体',
      body: '支持 Windows、macOS 和 Linux。下载后选一个工作目录，粘贴上面的提示词就能开始。',
      button: '免费下载 Cherry Studio'
    },
    templates: [
      {
        id: 'report',
        label: '工作汇报',
        short: '帮我做一份季度工作汇报 PPT，数据用图表',
        file: 'Q3-report.pptx',
        files: ['周报-Q3.md', '项目数据.csv', '会议记录.md'],
        prompt:
          '阅读工作目录里的周报和项目数据，做一份 10 页左右的季度工作汇报 PPT：先讲整体进展，再讲三个重点项目，最后列出下季度计划。风格简洁，数据用图表呈现，保存为 Q3-report.pptx。'
      },
      {
        id: 'lecture',
        label: '课程讲义',
        short: '把课程笔记做成 45 分钟的讲义 PPT',
        file: 'lecture-week5.pptx',
        files: ['课程笔记.md', '课堂讨论.md'],
        prompt:
          '根据目录里的课程笔记和课堂讨论题，做一份 45 分钟课程用的讲义 PPT：每页一个核心概念，配一个生活中的例子，最后两页放课堂讨论题。保存为 lecture-week5.pptx。'
      },
      {
        id: 'launch',
        label: '产品介绍',
        short: '根据产品文档做一份给客户看的介绍 PPT',
        file: 'product-intro.pptx',
        files: ['产品文档.md', '用户反馈.csv'],
        prompt:
          '根据目录里的产品文档和用户反馈，做一份给客户看的产品介绍 PPT：痛点、解决方案、核心功能、使用场景和下一步合作方式，控制在 12 页以内，保存为 product-intro.pptx。'
      },
      {
        id: 'reading',
        label: '读书分享',
        short: '用读书笔记做一份 15 分钟的分享会 PPT',
        file: 'book-share.pptx',
        files: ['读书笔记.md'],
        prompt:
          '读一下目录里这本书的读书笔记，做一份 15 分钟读书分享会用的 PPT：作者和背景、三个最打动我的观点、我的思考，语气轻松一点。保存为 book-share.pptx。'
      }
    ]
  },
  en: {
    title: 'AI PPT Generator: Let an Agent Build Your Slide Deck | Cherry Studio',
    breadcrumb: { root: 'Resources', current: 'Use cases', label: 'Breadcrumb' },
    h1Lead: 'AI',
    intro:
      'Put your materials in a folder and say what you need in one sentence. A Cherry Studio agent reads your files and builds a PowerPoint deck you can edit.',
    templatesLabel: 'Prompt templates',
    pasteHint: 'Paste this into a Cherry Studio agent',
    copyPrompt: 'Copy prompt',
    copied: 'Copied',
    download: 'Download free',
    demo: {
      window: 'Cherry Studio · Agent',
      replay: 'Replay',
      replayLabel: 'Replay the generation',
      readFiles: (count) => `Read ${count} ${count === 1 ? 'file' : 'files'} in the working folder`,
      generating: 'Building slides',
      done: 'Done: 1 file created',
      fileNote: 'Editable · Saved to the working folder',
      pageAlt: (label, page) => `${label} deck, slide ${page}`
    },
    stepsTitle: 'A deck in three steps',
    steps: [
      {
        title: 'Pick a working folder',
        body: 'Create a folder and drop in what you need: reports, spreadsheets, PDFs or notes. The agent only reads and writes inside it.'
      },
      {
        title: 'Say what you need',
        body: 'Give the purpose, length and style, like "a 10-slide quarterly review with charts". Not quite right? Ask for changes slide by slide.'
      },
      {
        title: 'Preview, then export',
        body: 'The .pptx opens in the preview panel. When it looks right, download it and keep editing in PowerPoint or Keynote.'
      }
    ],
    deckTitle: 'What you can make',
    deckHint: 'Click a card to flip it and see the prompt behind it',
    deckLabel: 'Sample decks',
    card: {
      promptLabel: 'Prompt',
      copy: 'Copy',
      use: 'Use this template',
      coverAlt: (label) => `${label} deck cover`,
      toggle: (label, flipped) => `${label} sample. Click to ${flipped ? 'flip back' : 'see the prompt'}`
    },
    screenshot: {
      src: '/images/compare/ai-office-assistant-en-2.webp',
      alt: 'A Cherry Studio agent building a slide deck, with the generated slides open in the preview panel',
      caption: 'The real app: your conversation with the agent on the left, the generated deck on the right'
    },
    featuresTitle: 'Why make slides with Cherry Studio',
    features: [
      {
        title: 'Built from your own material',
        body: 'Nothing is made up from thin air: the agent reads the documents and data in your folder first.'
      },
      {
        title: 'A real, editable .pptx',
        body: 'You get a standard PowerPoint file, not an image. Titles, text and charts stay editable.'
      },
      {
        title: 'Any model you like',
        body: 'Use Claude, GPT, Gemini, DeepSeek and more. Give complex layouts to a stronger model.'
      },
      {
        title: 'Refine in conversation',
        body: '"Make slide 3 a bar chart." "Keep it simpler." Adjust the deck one slide at a time.'
      }
    ],
    faqTitle: 'FAQ',
    faq: [
      {
        q: 'Do I need design skills to make slides with AI?',
        a: 'No. Describe the purpose, length and style and the agent handles structure and layout. For a specific look, mention colours, fonts or a reference in your prompt.'
      },
      {
        q: 'Do I get images or an editable presentation?',
        a: 'A standard .pptx file you can open and edit in PowerPoint, Keynote or Google Slides.'
      },
      {
        q: 'Can it use my own documents?',
        a: 'Yes. Put Word files, PDFs, spreadsheets or notes in the working folder and ask the agent to read them before building the slides.'
      },
      {
        q: 'Are my files uploaded?',
        a: 'Files are read on your computer and their content is sent to the model provider you choose. For sensitive material, use a local model through Ollama so nothing leaves your machine.'
      },
      {
        q: 'Which model makes the best slides?',
        a: 'For long or layout-heavy decks, use a stronger model. Try the same prompt with two models and compare.'
      }
    ],
    moreTitle: 'More use cases',
    more: [
      {
        to: '/resources/articles/ai-office-assistant',
        title: 'AI office assistant',
        body: 'Meeting notes, weekly reports, document review'
      },
      {
        to: '/resources/articles/ai-translation',
        title: 'AI translation',
        body: 'Selected text and layout-preserving PDF translation'
      },
      {
        to: '/resources/articles/ai-knowledge-base',
        title: 'AI knowledge base',
        body: 'Answers from your own documents'
      }
    ],
    cta: {
      title: 'Hand your next deck to an agent',
      body: 'For Windows, macOS and Linux. Download, pick a working folder and paste one of the prompts above.',
      button: 'Download Cherry Studio free'
    },
    templates: [
      {
        id: 'report',
        label: 'Business review',
        short: 'Make a quarterly review deck with charts',
        file: 'Q3-report.pptx',
        files: ['weekly-reports-Q3.md', 'project-data.csv', 'meeting-notes.md'],
        prompt:
          "Read the weekly reports and project data in the working folder and make a quarterly review deck of about 10 slides: overall progress first, then the three priority projects, then next quarter's plan. Keep it clean, show the data as charts and save it as Q3-report.pptx."
      },
      {
        id: 'lecture',
        label: 'Lecture',
        short: 'Turn my course notes into a 45-minute lecture deck',
        file: 'lecture-week5.pptx',
        files: ['course-notes.md', 'discussion-questions.md'],
        prompt:
          'Use the course notes and discussion questions in this folder to make a lecture deck for a 45-minute class: one core idea per slide with an everyday example, and the discussion questions on the last two slides. Save it as lecture-week5.pptx.'
      },
      {
        id: 'launch',
        label: 'Product pitch',
        short: 'Build a customer-facing product deck from our docs',
        file: 'product-intro.pptx',
        files: ['product-doc.md', 'customer-feedback.csv'],
        prompt:
          'Using the product doc and customer feedback in this folder, make a customer-facing product deck: pain points, solution, core features, use cases and next steps, in 12 slides or fewer. Save it as product-intro.pptx.'
      },
      {
        id: 'reading',
        label: 'Book talk',
        short: 'Make a 15-minute book club deck from my notes',
        file: 'book-share.pptx',
        files: ['reading-notes.md'],
        prompt:
          'Read my notes on this book and make a deck for a 15-minute book club talk: the author and context, the three ideas that struck me most, and my takeaways. Keep the tone light. Save it as book-share.pptx.'
      }
    ]
  }
}
