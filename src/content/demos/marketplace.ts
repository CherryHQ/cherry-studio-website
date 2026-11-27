// Scripted Marketplace page (src/renderer/pages/marketplace): skill catalogs, Agent templates and MCP servers in one
// place. Labels come from the desktop locale keys marketplace.*, settings.skills.install*, settings.mcp.addSuccess,
// settings.mcp.requiresConfig, settings.mcp.builtinServersDescriptions.*, plugins.manage_skills, title.marketplace and
// common.*. Agent templates are resources/data/marketplace-agents.json; MCP servers are PRESET_MCP_SERVERS.
import type { DemoLocale } from './chat'

export type MarketplaceView = 'all' | 'skill' | 'agent' | 'mcp'
/** MarketplaceSkillIcon's lucide icon names. */
export type SkillIconName =
  | 'file-text'
  | 'palette'
  | 'terminal'
  | 'book-open'
  | 'cpu'
  | 'database'
  | 'sparkles'
  | 'workflow'
  | 'brain'
  | 'code'

export interface MarketplaceSkillItem {
  id: string
  /** Canonical domain, labelled through MARKETPLACE_CATEGORY_KEYS. */
  domain: string
  icon: SkillIconName
  author: string
  version: string
  downloads: number
  released: string
  tags: string[]
  members: string[]
}

export interface MarketplaceMcpItem {
  name: string
  /** Key of builtinMcpIcons in MarketplaceMcp.tsx. */
  icon: string
  shouldConfig?: boolean
}

/** Curated skills sorted by downloads, as MarketplaceSkills lists them. */
const skills: MarketplaceSkillItem[] = [
  {
    id: 'pdf',
    domain: 'Documentation',
    icon: 'file-text',
    author: 'anthropics',
    version: '1.4.0',
    downloads: 52_400,
    released: '2026-10-14',
    tags: ['pdf', 'ocr', 'forms'],
    members: ['pdf-extract', 'pdf-forms', 'pdf-merge', 'pdf-ocr']
  },
  {
    id: 'frontend-design',
    domain: 'Design',
    icon: 'palette',
    author: 'anthropics',
    version: '2.1.0',
    downloads: 41_800,
    released: '2026-09-02',
    tags: ['ui', 'css'],
    members: ['frontend-design']
  },
  {
    id: 'webapp-testing',
    domain: 'Developer Tools',
    icon: 'terminal',
    author: 'anthropics',
    version: '1.2.3',
    downloads: 33_100,
    released: '2026-08-21',
    tags: ['playwright', 'e2e'],
    members: ['webapp-testing']
  },
  {
    id: 'docx',
    domain: 'Documentation',
    icon: 'book-open',
    author: 'anthropics',
    version: '1.3.1',
    downloads: 29_700,
    released: '2026-10-08',
    tags: ['word', 'docx'],
    members: ['docx-create', 'docx-review']
  },
  {
    id: 'mcp-builder',
    domain: 'Developer Tools',
    icon: 'cpu',
    author: 'anthropics',
    version: '1.0.4',
    downloads: 24_500,
    released: '2026-07-30',
    tags: ['mcp', 'server'],
    members: ['mcp-builder']
  },
  {
    id: 'xlsx',
    domain: 'Data & Analytics',
    icon: 'database',
    author: 'anthropics',
    version: '1.5.0',
    downloads: 21_900,
    released: '2026-10-01',
    tags: ['excel', 'csv'],
    members: ['xlsx-analyze', 'xlsx-chart']
  },
  {
    id: 'skill-creator',
    domain: 'AI & Agents',
    icon: 'sparkles',
    author: 'anthropics',
    version: '1.1.0',
    downloads: 18_300,
    released: '2026-06-18',
    tags: ['skill'],
    members: ['skill-creator']
  },
  {
    id: 'pptx',
    domain: 'Productivity',
    icon: 'workflow',
    author: 'anthropics',
    version: '1.2.0',
    downloads: 15_200,
    released: '2026-09-25',
    tags: ['slides', 'powerpoint'],
    members: ['pptx-build', 'pptx-theme']
  },
  {
    id: 'deep-research',
    domain: 'AI & Agents',
    icon: 'brain',
    author: 'cherryhq',
    version: '0.9.2',
    downloads: 12_600,
    released: '2026-11-03',
    tags: ['research', 'web'],
    members: ['deep-research']
  },
  {
    id: 'changelog',
    domain: 'Documentation',
    icon: 'code',
    author: 'cherryhq',
    version: '1.0.0',
    downloads: 9_800,
    released: '2026-08-11',
    tags: ['git', 'release'],
    members: ['changelog-writer']
  }
]

export const marketplaceScript = {
  query: 'pdf',
  skill: 'pdf',
  mcpTarget: '@cherry/fetch',
  skills,
  /** Agent templates with their emoji avatar, canonical category and the opening of their instructions. */
  agents: [
    {
      id: 'task-planning',
      avatar: '🧭',
      category: 'Developer Tools',
      instructions:
        'Help the user decide what to build and how to verify it. Begin with the requested outcome, the people affected, and the constraints already established in the conversation. Inspect available project context before asking for information that files can answer.'
    },
    {
      id: 'software-architecture',
      avatar: '🏗️',
      category: 'Developer Tools',
      instructions:
        'Help the user make a concrete software design decision. Start from the workload, data lifecycle, operational limits, and existing system boundaries. Read the relevant interfaces and trace one representative request through the system when project access is available.'
    },
    {
      id: 'code-quality',
      avatar: '🔎',
      category: 'Developer Tools',
      instructions:
        'Review the requested change in the context of the behavior it is meant to deliver. Establish the comparison baseline, read the changed code, and follow its callers and state transitions. Consult local conventions and existing checks before judging an implementation choice.'
    },
    {
      id: 'security-analysis',
      avatar: '🛡️',
      category: 'Developer Tools',
      instructions:
        'Examine the security of the feature or change the user identifies. Establish the assets involved, the allowed users, and where untrusted input enters. Follow that input through parsing, authorization, storage, file access, and external requests as applicable.'
    },
    {
      id: 'product-requirements',
      avatar: '📋',
      category: 'Productivity',
      instructions:
        'Help the user describe a product change precisely enough for design and implementation. Begin with the affected users, the situation that creates a need, the desired outcome, and constraints on time, budget, accessibility, or compatibility.'
    },
    {
      id: 'market-intelligence',
      avatar: '📡',
      category: 'Data & Analytics',
      instructions:
        'Investigate the market question the user identifies. Define the geography, customer segment, product category, time window, and intended decision before collecting information. Build a compact research plan with questions to answer and comparable entities.'
    },
    {
      id: 'content-editor',
      avatar: '📝',
      category: 'Communication',
      instructions:
        'Help the user plan, evaluate, or revise content for a defined audience. Establish the channel, purpose, desired reader response, length, and editorial voice. Preserve the author’s position unless a substantive change is requested.'
    },
    {
      id: 'visual-design',
      avatar: '🎨',
      category: 'Design',
      instructions:
        'Help the user design or evaluate a visual artifact such as an interface, presentation, poster, or brand asset. Establish its audience, medium, purpose, required content, and existing brand or design-system constraints.'
    }
  ],
  /** useBuiltinMcpCatalog order: servers that need no configuration first. */
  mcp: <MarketplaceMcpItem[]>[
    { name: '@cherry/flomo', icon: 'flomo' },
    { name: '@cherry/mcp-auto-install', icon: 'mcpAutoInstall' },
    { name: '@cherry/sequentialthinking', icon: 'sequentialThinking' },
    { name: '@cherry/fetch', icon: 'fetch' },
    { name: '@cherry/python', icon: 'python' },
    { name: '@cherry/nowledge-mem', icon: 'nowledgeMem' },
    { name: '@cherry/qveris', icon: 'qveris', shouldConfig: true },
    { name: '@cherry/memory', icon: 'memory', shouldConfig: true },
    { name: '@cherry/brave-search', icon: 'braveSearch', shouldConfig: true },
    { name: '@cherry/filesystem', icon: 'filesystem', shouldConfig: true },
    { name: '@cherry/dify-knowledge', icon: 'difyKnowledge', shouldConfig: true },
    { name: '@cherry/didi-mcp', icon: 'didiMcp', shouldConfig: true }
  ]
}

export interface MarketplaceCopy {
  window: string
  region: string
  tab: string
  resourceTypes: string
  types: Record<MarketplaceView, string>
  search: string
  clear: string
  viewAll: string
  picks: string
  moreSources: string
  manageMcp: string
  manageSkills: string
  addSource: string
  categories: string
  /** marketplace.category.* keyed by canonical domain. */
  domains: Record<string, string>
  install: string
  uninstall: string
  installNow: string
  loading: string
  installed: string
  installedHint: string
  includedSkills: string
  downloads: string
  version: string
  category: string
  author: string
  listed: string
  language: string
  resourceType: string
  viewRepository: string
  add: string
  added: string
  configure: string
  requiresConfig: string
  openWebsite: string
  instructions: string
  close: string
  installSuccess: string
  mcpAddSuccess: string
  noResults: string
  noResultsHint: string
  skills: Record<string, { name: string; description: string; detail: string; language: string }>
  agents: Record<string, { name: string; description: string }>
  /** settings.mcp.builtinServersDescriptions.* keyed by server name. */
  mcp: Record<string, string>
}

export const marketplaceDemo: Record<DemoLocale, MarketplaceCopy> = {
  en: {
    window: 'Cherry Studio — Marketplace',
    region: 'Interactive demo: browse the Marketplace and install a skill',
    tab: 'Marketplace',
    resourceTypes: 'Resource types',
    types: { all: 'All', skill: 'Skill', agent: 'Agent', mcp: 'MCP' },
    search: 'Search resources',
    clear: 'Clear',
    viewAll: 'View all',
    picks: 'Picks',
    moreSources: 'More sources',
    manageMcp: 'Manage MCP',
    manageSkills: 'Manage skills',
    addSource: 'Add subscription source',
    categories: 'Categories',
    domains: {
      'AI & Agents': 'AI & Agents',
      Productivity: 'Productivity',
      'Developer Tools': 'Developer Tools',
      Design: 'Design',
      'Data & Analytics': 'Data & Analytics',
      Communication: 'Communication',
      Documentation: 'Documentation'
    },
    install: 'Install',
    uninstall: 'Uninstall',
    installNow: 'Install now',
    loading: 'Loading...',
    installed: 'Installed',
    installedHint: 'Installed in your skill library. Enable it in your Agent configuration.',
    includedSkills: 'Included skills ({total})',
    downloads: 'Downloads',
    version: 'Version',
    category: 'Category',
    author: 'Author',
    listed: 'Listed',
    language: 'Language',
    resourceType: 'Type',
    viewRepository: 'View repository',
    add: 'Add',
    added: 'Added',
    configure: 'Configure',
    requiresConfig: 'Requires Configuration',
    openWebsite: 'Open website',
    instructions: 'Instructions',
    close: 'Close',
    installSuccess: 'Skill installed: {name}',
    mcpAddSuccess: 'Server added successfully',
    noResults: 'No resources found',
    noResultsHint: 'Try a different search term.',
    skills: {
      pdf: {
        name: 'PDF Toolkit',
        description: 'Extract text and tables, fill forms, merge and split pages, and OCR scanned PDFs.',
        detail:
          'Work with PDF files end to end. Each capability ships as its own skill, so an Agent loads only the part a task needs.',
        language: 'Full support'
      },
      'frontend-design': {
        name: 'Frontend Design',
        description: 'Build distinctive, production-grade interfaces that avoid generic AI aesthetics.',
        detail: '',
        language: 'Full support'
      },
      'webapp-testing': {
        name: 'Webapp Testing',
        description: 'Test local web apps with Playwright: drive the UI, capture screenshots and read browser logs.',
        detail: '',
        language: '—'
      },
      docx: {
        name: 'Word Documents',
        description: 'Create, edit and review .docx files with tracked changes, comments and PDF export.',
        detail: '',
        language: 'Full support'
      },
      'mcp-builder': {
        name: 'MCP Builder',
        description: 'Design and build MCP servers that let models call external services through well-shaped tools.',
        detail: '',
        language: '—'
      },
      xlsx: {
        name: 'Spreadsheet Analyst',
        description: 'Clean, analyze and chart spreadsheet data while keeping formulas and formatting intact.',
        detail: '',
        language: 'Full support'
      },
      'skill-creator': {
        name: 'Skill Creator',
        description: 'Turn a repeatable workflow into a new skill with instructions, scripts and resources.',
        detail: '',
        language: 'Full support'
      },
      pptx: {
        name: 'Slide Builder',
        description: 'Draft presentation decks from an outline, apply a theme and keep layouts consistent.',
        detail: '',
        language: 'Full support'
      },
      'deep-research': {
        name: 'Deep Research',
        description: 'Plan a multi-step investigation, gather sources from the web and write a cited report.',
        detail: '',
        language: 'Full support'
      },
      changelog: {
        name: 'Changelog Writer',
        description: 'Summarize merged commits into a readable, user-facing changelog for each release.',
        detail: '',
        language: '—'
      }
    },
    agents: {
      'task-planning': {
        name: 'Task Planner',
        description: 'Turn a goal into a bounded, executable sequence with clear acceptance criteria.'
      },
      'software-architecture': {
        name: 'Architecture Advisor',
        description: 'Compare design options against real constraints and clarify ownership and interfaces.'
      },
      'code-quality': {
        name: 'Code Review Partner',
        description: 'Review a change against its promised behavior and explain actionable defects.'
      },
      'security-analysis': {
        name: 'Security Analyst',
        description: 'Trace trust boundaries and assess concrete exposure in the requested feature.'
      },
      'product-requirements': {
        name: 'Product Requirements Analyst',
        description: 'Clarify user problems and turn product ideas into scoped, testable requirements.'
      },
      'market-intelligence': {
        name: 'Market Intelligence Analyst',
        description: 'Build a sourced view of markets, competitors, and emerging signals while exposing evidence gaps.'
      },
      'content-editor': {
        name: 'Content Editor',
        description:
          'Shape content plans and edit drafts for audience fit, structure, accuracy, and a consistent voice.'
      },
      'visual-design': {
        name: 'Visual Design Advisor',
        description:
          'Translate visual goals into clear guidance for hierarchy, color, typography, layout, and consistency.'
      }
    },
    mcp: {
      '@cherry/flomo':
        'Connect to flomo to quickly capture notes and ideas via AI. Requires flomo account authorization.',
      '@cherry/mcp-auto-install': 'Automatically install MCP service (beta)',
      '@cherry/sequentialthinking':
        'A MCP server implementation that provides tools for dynamic and reflective problem solving through structured thinking processes',
      '@cherry/fetch': 'MCP server for retrieving URL web content',
      '@cherry/python':
        'Execute Python code in a secure sandbox environment. Run Python with Pyodide, supporting most standard libraries and scientific computing packages',
      '@cherry/nowledge-mem':
        'Requires Nowledge Mem app running locally. Keeps AI chats, tools, notes, agents, and files in private memory on your computer. Download from https://mem.nowledge.co/',
      '@cherry/qveris':
        'Connect to QVeris to discover, inspect, and call AI-agent capabilities. Sign in through OAuth in your browser, or configure QVERIS_API_KEY as an API key fallback.',
      '@cherry/memory':
        'Persistent memory implementation based on a local knowledge graph. This enables the model to remember user-related information across different conversations. Requires configuring the MEMORY_FILE_PATH environment variable.',
      '@cherry/brave-search':
        'An MCP server implementation integrating the Brave Search API, providing both web and local search functionalities. Requires configuring the BRAVE_API_KEY environment variable',
      '@cherry/filesystem':
        'A Node.js server implementing the Model Context Protocol (MCP) for file system operations. Requires configuration of directories allowed for access.',
      '@cherry/dify-knowledge':
        "Dify's MCP server implementation provides a simple API to interact with Dify. Requires configuring the Dify Key",
      '@cherry/didi-mcp':
        'DiDi MCP server providing ride-hailing services including map search, price estimation, order management, and driver tracking. Only available in Mainland China. Requires configuring the DIDI_API_KEY environment variable'
    }
  },
  zh: {
    window: 'Cherry Studio — 市场',
    region: '交互演示：浏览市场并安装技能',
    tab: '市场',
    resourceTypes: '资源类型',
    types: { all: '全部', skill: '技能', agent: '智能体', mcp: 'MCP' },
    search: '搜索资源',
    clear: '清除',
    viewAll: '查看全部',
    picks: '精选',
    moreSources: '更多来源',
    manageMcp: '管理 MCP',
    manageSkills: '管理技能',
    addSource: '添加订阅源',
    categories: '分类',
    domains: {
      'AI & Agents': 'AI 与智能体',
      Productivity: '生产力',
      'Developer Tools': '开发工具',
      Design: '设计',
      'Data & Analytics': '数据与分析',
      Communication: '沟通协作',
      Documentation: '文档'
    },
    install: '安装',
    uninstall: '卸载',
    installNow: '立即安装',
    loading: '加载中...',
    installed: '已安装',
    installedHint: '已安装到技能库，可在智能体配置中启用',
    includedSkills: '包含的技能（{total}）',
    downloads: '下载量',
    version: '版本',
    category: '分类',
    author: '作者',
    listed: '上架日期',
    language: '语言',
    resourceType: '类型',
    viewRepository: '查看源仓库',
    add: '添加',
    added: '已添加',
    configure: '配置',
    requiresConfig: '需要配置',
    openWebsite: '打开网站',
    instructions: '指令',
    close: '关闭',
    installSuccess: '技能已安装：{name}',
    mcpAddSuccess: '服务器添加成功',
    noResults: '未找到资源',
    noResultsHint: '请尝试其他搜索关键词',
    skills: {
      pdf: {
        name: 'PDF 工具箱',
        description: '提取文本与表格、填写表单、合并拆分页面，并对扫描件进行 OCR 识别。',
        detail: '覆盖 PDF 处理的完整流程。每项能力都是独立的技能，智能体只会加载任务需要的部分。',
        language: '完整支持'
      },
      'frontend-design': {
        name: '前端设计',
        description: '构建有辨识度、可直接上线的界面，避免千篇一律的 AI 风格。',
        detail: '',
        language: '完整支持'
      },
      'webapp-testing': {
        name: 'Web 应用测试',
        description: '用 Playwright 测试本地 Web 应用：操作界面、截图并读取浏览器日志。',
        detail: '',
        language: '—'
      },
      docx: {
        name: 'Word 文档',
        description: '创建、编辑和审阅 .docx 文件，支持修订、批注和导出 PDF。',
        detail: '',
        language: '完整支持'
      },
      'mcp-builder': {
        name: 'MCP 构建器',
        description: '设计并构建 MCP 服务器，让模型通过结构清晰的工具调用外部服务。',
        detail: '',
        language: '—'
      },
      xlsx: {
        name: '表格分析',
        description: '清洗、分析表格数据并生成图表，同时保留公式和格式。',
        detail: '',
        language: '完整支持'
      },
      'skill-creator': {
        name: '技能创建器',
        description: '把可重复的工作流程整理成新技能，附带指令、脚本和资源。',
        detail: '',
        language: '完整支持'
      },
      pptx: {
        name: '幻灯片制作',
        description: '根据大纲起草演示文稿，套用主题并保持版式统一。',
        detail: '',
        language: '完整支持'
      },
      'deep-research': {
        name: '深度研究',
        description: '规划多步骤调研，从网络收集资料并撰写带引用的报告。',
        detail: '',
        language: '完整支持'
      },
      changelog: {
        name: '更新日志撰写',
        description: '把合并的提交整理成面向用户、易读的版本更新日志。',
        detail: '',
        language: '—'
      }
    },
    agents: {
      'task-planning': { name: '任务规划师', description: '将目标拆解为范围明确、可以执行和验收的工作步骤。' },
      'software-architecture': { name: '软件架构顾问', description: '结合实际约束比较设计方案，明确模块职责与接口。' },
      'code-quality': { name: '代码审查伙伴', description: '围绕变更承诺的行为审查代码，解释可复现、可处理的问题。' },
      'security-analysis': { name: '安全审查员', description: '追踪信任边界，评估指定功能中有证据支持的安全风险。' },
      'product-requirements': {
        name: '产品需求分析师',
        description: '澄清用户问题，将产品想法整理为范围明确、可验证的需求。'
      },
      'market-intelligence': {
        name: '市场情报分析师',
        description: '梳理有来源依据的市场、竞品与趋势信息，并明确证据缺口。'
      },
      'content-editor': {
        name: '内容主编',
        description: '规划选题并审阅稿件，改善受众匹配、结构、准确性与表达一致性。'
      },
      'visual-design': {
        name: '视觉设计顾问',
        description: '将视觉目标转化为层级、配色、字体、布局和一致性的具体建议。'
      }
    },
    mcp: {
      '@cherry/flomo': '连接 flomo 通过 AI 快速记录笔记和想法。需要 flomo 账号授权。',
      '@cherry/mcp-auto-install': '自动安装 MCP 服务（测试版）',
      '@cherry/sequentialthinking': '一个 MCP 服务器实现，提供了通过结构化思维过程进行动态和反思性问题解决的工具',
      '@cherry/fetch': '用于获取 URL 网页内容的 MCP 服务器',
      '@cherry/python': '在安全的沙盒环境中执行 Python 代码。使用 Pyodide 运行 Python，支持大多数标准库和科学计算包',
      '@cherry/nowledge-mem':
        '需要本地运行 Nowledge Mem 应用。将 AI 对话、工具、笔记、智能体和文件保存在本地计算机的私有记忆中。请从 https://mem.nowledge.co/ 下载',
      '@cherry/qveris':
        '连接 QVeris，供 AI 智能体发现、检查和调用外部能力。优先通过浏览器 OAuth 登录，也可配置 QVERIS_API_KEY 作为备选。',
      '@cherry/memory':
        '基于本地知识图谱的持久性记忆基础实现。这使得模型能够在不同对话间记住用户的相关信息。需要配置 MEMORY_FILE_PATH 环境变量。',
      '@cherry/brave-search':
        '一个集成了Brave 搜索 API 的 MCP 服务器实现，提供网页与本地搜索双重功能。需要配置 BRAVE_API_KEY 环境变量',
      '@cherry/filesystem': '实现文件系统操作的模型上下文协议（MCP）的 Node.js 服务器。需要配置允许访问的目录',
      '@cherry/dify-knowledge': 'Dify 的 MCP 服务器实现，提供了一个简单的 API 来与 Dify 进行交互。需要配置 Dify Key',
      '@cherry/didi-mcp':
        '一个集成了滴滴 MCP 服务器实现，提供网约车服务包括地图搜索、价格预估、订单管理和司机跟踪。仅支持中国大陆地区。需要配置 DIDI_API_KEY 环境变量'
    }
  }
}
