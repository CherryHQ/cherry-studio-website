// Copy for the mobile app demos. UI labels come from CherryHQ/cherry-studio-app src/frontend/i18n/locales
// (en-us, zh-cn) and the desktop pairing labels from Cherry Studio src/renderer/i18n/locales.
import type { DemoLocale } from './chat'

/** Shared chat chrome: MainHeader and the seeded Agent (agent.default.name). */
export interface MobileChromeCopy {
  agentName: string
  openMenu: string
  newChat: string
  placeholder: string
  attach: string
  send: string
  stop: string
}

const chrome: Record<DemoLocale, MobileChromeCopy> = {
  en: {
    agentName: 'Cherie',
    openMenu: 'Open menu',
    newChat: 'New chat',
    placeholder: 'Chat With Cherry Studio',
    attach: 'Attach',
    send: 'Send message',
    stop: 'Stop generating'
  },
  zh: {
    agentName: 'Cherry 小助手',
    openMenu: '打开菜单',
    newChat: '新建聊天',
    placeholder: '与 Cherry Studio 聊天',
    attach: '添加附件',
    send: '发送消息',
    stop: '停止生成'
  }
}

export interface MobileComposerCopy extends MobileChromeCopy {
  region: string
  greeting: string
  media: { camera: string; photos: string; file: string }
  tools: { folders: string; noFolder: string; plugins: string; skills: string }
  closeSheet: string
  model: string
  modelProvider: string
  time: string
  prompt: string
  thinking: string
  took: (seconds: number) => string
  reasoning: string
  answer: { title: string; body: string }[]
  actions: { copy: string; readAloud: string; regenerate: string; answerWith: string; fork: string; more: string }
  usage: string
}

export const mobileComposerDemo: Record<DemoLocale, MobileComposerCopy> = {
  en: {
    ...chrome.en,
    region: 'Cherry Studio mobile chat with the composer and tools sheet',
    greeting: 'What should we create together today?',
    media: { camera: 'Camera', photos: 'Photos', file: 'File' },
    tools: { folders: 'Folders', noFolder: 'No folder selected', plugins: 'Plugins', skills: 'Skills' },
    closeSheet: 'Close',
    model: 'MiniMax: MiniMax-M3',
    modelProvider: 'minimax',
    time: '09/15 19:58',
    prompt: 'I have a free afternoon. Suggest three small creative projects I can finish today. Keep it short.',
    thinking: 'Thinking',
    took: (seconds) => `Took ${seconds}s`,
    reasoning:
      'Three projects, each doable in an afternoon with things already at home. Mix paper, sound and play so they feel different.',
    answer: [
      {
        title: 'Create a micro zine',
        body: 'Fold a single sheet of paper into an 8-page mini booklet. Fill it with doodles, a short story, or whatever is on your mind.'
      },
      {
        title: 'Set up a "sound diary"',
        body: 'Record 3–5 short audio clips and trim them into a tiny podcast episode.'
      },
      {
        title: 'Design a one-page board game',
        body: 'Sketch a simple game on an index card using dice or a coin, then test it with whoever is around.'
      }
    ],
    actions: {
      copy: 'Copy',
      readAloud: 'Read aloud',
      regenerate: 'Generate again',
      answerWith: 'Answer with another model',
      fork: 'Branch in new chat',
      more: 'More'
    },
    usage: '8.1k Tokens · 7s'
  },
  zh: {
    ...chrome.zh,
    region: 'Cherry Studio 移动端对话、输入框与工具面板',
    greeting: '今天想一起做点什么？',
    media: { camera: '相机', photos: '照片', file: '文件' },
    tools: { folders: '文件夹', noFolder: '未选择文件夹', plugins: '插件', skills: '技能' },
    closeSheet: '关闭',
    model: 'MiniMax: MiniMax-M3',
    modelProvider: 'minimax',
    time: '09/15 19:58',
    prompt: '下午有空，推荐三个今天就能做完的小创意项目，简短一点。',
    thinking: '思考中',
    took: (seconds) => `用时 ${seconds}秒`,
    reasoning: '挑三个在家就能动手、一个下午做得完的项目，纸、声音和游戏各一个，彼此不重样。',
    answer: [
      { title: '做一本迷你小志', body: '把一张纸折成 8 页小册子，画点涂鸦、写个小故事，想到什么就放什么。' },
      { title: '开一本“声音日记”', body: '录 3–5 段短音频，剪成一期迷你播客。' },
      { title: '设计一页桌游', body: '在一张卡片上画出用骰子或硬币玩的小游戏，找身边的人试玩一局。' }
    ],
    actions: {
      copy: '复制',
      readAloud: '朗读',
      regenerate: '重新回答',
      answerWith: '切换模型回答',
      fork: '在新聊天中创建分支对话',
      more: '更多'
    },
    usage: '8.1k Tokens · 7秒'
  }
}

export type PickerBadge = 'free' | 'vision'

export interface PickerProvider {
  id: string
  name: string
  models: { name: string; badges: PickerBadge[] }[]
}

export type SheetDetent = 'medium' | 'full'

export interface ModelPickerCopy extends MobileChromeCopy {
  region: string
  title: string
  search: string
  filter: string
  fastScroll: string
  fastScrollHint: string
  providerMarker: string
  handle: string
  detentLabel: string
  detents: Record<SheetDetent, string>
  badges: Record<PickerBadge, string>
  freeChip: string
  selected: string
  prompt: string
  answer: string
  providers: PickerProvider[]
}

type PickerModels = Record<string, PickerProvider['models']>

const globalProviderModels = {
  anthropic: [
    { name: 'Claude Opus 5.5', badges: ['vision'] },
    { name: 'Claude Sonnet 5.5', badges: ['vision'] },
    { name: 'Claude Haiku 5.5', badges: ['vision'] }
  ],
  openai: [
    { name: 'GPT-6.2 Sol', badges: ['vision'] },
    { name: 'GPT-6.2 Astra', badges: ['vision'] }
  ],
  google: [
    { name: 'Gemini 4 Neon', badges: ['vision'] },
    { name: 'Gemini 4 Carbon', badges: ['vision'] }
  ],
  deepseek: [
    { name: 'DeepSeek V4 Pro', badges: [] },
    { name: 'DeepSeek V4.1 Flash', badges: ['vision'] }
  ],
  minimax: [{ name: 'MiniMax-M3', badges: ['vision'] }],
  qwen: [
    { name: 'Qwen3.8 Max', badges: [] },
    { name: 'Qwen3.8 Flash', badges: ['vision'] }
  ],
  moonshot: [{ name: 'Kimi K3.1 Pro', badges: ['vision'] }],
  zhipu: [{ name: 'GLM 5.3', badges: [] }],
  mistral: [{ name: 'Mistral Large 3', badges: ['vision'] }],
  grok: [{ name: 'Grok 4.7', badges: ['vision'] }],
  openrouter: [
    { name: 'MiniMax-M3.1-Flash', badges: ['free', 'vision'] },
    { name: 'Llama-4-Maverick-17B-128E-Instruct-FP8', badges: ['vision'] }
  ],
  ollama: [{ name: 'Qwen3.8 27B', badges: ['vision'] }]
} satisfies PickerModels

// The Chinese site lists only domestic providers.
const cnProviderModels = {
  deepseek: [
    { name: 'DeepSeek V4 Pro', badges: [] },
    { name: 'DeepSeek V4.1 Flash', badges: ['vision'] }
  ],
  qwen: [
    { name: 'Qwen3.8 Max', badges: [] },
    { name: 'Qwen3.8 Flash', badges: ['vision'] }
  ],
  moonshot: [{ name: 'Kimi K3.1 Pro', badges: ['vision'] }],
  zhipu: [
    { name: 'GLM 5.3', badges: [] },
    { name: 'GLM-5.3-Flash', badges: ['vision'] }
  ],
  minimax: [
    { name: 'MiniMax-M3', badges: ['vision'] },
    { name: 'MiniMax-M3.1-Flash', badges: ['vision'] }
  ],
  doubao: [{ name: 'Doubao Seed 2.1 Pro', badges: ['vision'] }],
  mimo: [{ name: 'MiMo-V2.6-Pro', badges: ['vision'] }],
  longcat: [{ name: 'LongCat-2.5', badges: ['vision'] }],
  step: [{ name: 'Step 5 Preview', badges: ['vision'] }],
  wenxin: [{ name: 'ERNIE 5.0', badges: [] }]
} satisfies PickerModels

const pickerProviders = <T extends PickerModels>(models: T, names: Record<keyof T, string>): PickerProvider[] =>
  (Object.keys(models) as (keyof T & string)[]).map((id) => ({ id, name: names[id], models: models[id] }))

export const modelPickerDemo: Record<DemoLocale, ModelPickerCopy> = {
  en: {
    ...chrome.en,
    region: 'Cherry Studio mobile model picker with the provider fast scroller',
    title: 'Select model',
    search: 'Search models',
    filter: 'Filter',
    fastScroll: 'Provider quick navigation',
    fastScrollHint: 'Swipe up or down to locate providers',
    providerMarker: 'Provider',
    handle: 'Resize the sheet. Drag, or use the arrow keys',
    detentLabel: 'Sheet height',
    detents: { medium: 'Medium', full: 'Full' },
    badges: { free: 'Free', vision: 'Vision' },
    freeChip: 'free',
    selected: 'Claude Sonnet 5.5',
    prompt: 'Which model should I use for long documents?',
    answer: 'Pick one with a large context window. Open the model picker under the composer to compare.',
    providers: pickerProviders(globalProviderModels, {
      anthropic: 'Anthropic',
      openai: 'OpenAI',
      google: 'Gemini',
      deepseek: 'DeepSeek',
      minimax: 'MiniMax',
      qwen: 'Alibaba Cloud',
      moonshot: 'Moonshot AI',
      zhipu: 'Zhipu AI',
      mistral: 'Mistral',
      grok: 'Grok',
      openrouter: 'OpenRouter',
      ollama: 'Ollama'
    })
  },
  zh: {
    ...chrome.zh,
    region: 'Cherry Studio 移动端模型选择器与服务商快速定位',
    title: '选择模型',
    search: '搜索模型',
    filter: '筛选',
    fastScroll: '服务商快速定位',
    fastScrollHint: '上下滑动以定位服务商',
    providerMarker: '服务商',
    handle: '调整面板高度：拖动，或使用方向键',
    detentLabel: '面板高度',
    detents: { medium: '半屏', full: '全屏' },
    badges: { free: '免费', vision: '视觉' },
    freeChip: '免费',
    selected: 'Kimi K3.1 Pro',
    prompt: '处理长文档该用哪个模型？',
    answer: '选上下文窗口大的模型。点输入框下方的模型按钮，就能打开选择器对比。',
    providers: pickerProviders(cnProviderModels, {
      deepseek: '深度求索',
      qwen: '阿里云百炼',
      moonshot: '月之暗面',
      zhipu: '智谱开放平台',
      minimax: 'MiniMax',
      doubao: '豆包（火山引擎 Ark）',
      mimo: 'Xiaomi MiMo',
      longcat: '龙猫',
      step: '阶跃星辰',
      wenxin: '百度云千帆'
    })
  }
}

export interface LogoDrawCopy {
  region: string
  title: string
  description: string
  start: string
}

export const logoDrawDemo: Record<DemoLocale, LogoDrawCopy> = {
  en: {
    region: 'Cherry Studio mobile onboarding logo animation',
    title: 'Welcome to Cherry',
    description: 'Set up privacy, permissions, and your account in a few steps to get your AI assistant ready.',
    start: 'Get started'
  },
  zh: {
    region: 'Cherry Studio 移动端新手引导 Logo 动画',
    title: '欢迎使用 Cherry',
    description: '用几步完成隐私、权限和账号设置，开启你的 AI 助手。',
    start: '开始'
  }
}

export type PairingStage = 'connecting' | 'requesting' | 'waiting' | 'syncing' | 'saving'

export interface PairingCopy {
  region: string
  steps: { scan: string; verify: string; import: string; agent: string }
  stepNav: string
  desktop: {
    title: string
    ready: string
    pairTitle: string
    pairHint: string
    claimTitle: string
    deviceName: string
    platform: string
    codeHint: string
    capabilities: { configuration: string; agent: string }
    approve: string
    reject: string
    approved: string
    pairedDevices: string
    lastSeen: string
  }
  onboarding: { back: string; step: (current: number) => string }
  scan: { title: string; guidance: string; paste: string }
  pair: {
    title: string
    desktopName: string
    inProgress: string
    approveOnDesktop: string
    verificationCode: string
    complete: string
    stages: Record<PairingStage, string>
    cancel: string
    continue: string
  }
  sync: {
    title: string
    source: string
    fetching: string
    providers: { name: string; provider: string; models: number }[]
    modelCount: (count: number) => string
    notice: string
    apply: (count: number) => string
    retry: string
    success: string
  }
  agent: MobileChromeCopy & {
    workspace: string
    prompt: string
    toolName: string
    command: string
    awaiting: string
    arguments: string
    deny: string
    continue: string
    denied: string
    answer: string
  }
}

export const pairingDemo: Record<DemoLocale, PairingCopy> = {
  en: {
    region: 'Pairing Cherry Studio mobile with the desktop app',
    steps: { scan: 'Scan', verify: 'Verify', import: 'Import', agent: 'PC Agents' },
    stepNav: 'Jump to a step',
    desktop: {
      title: 'Device Connections',
      ready: 'Network access is allowed',
      pairTitle: 'Pair a device',
      pairHint: 'Scan with the Cherry Studio mobile app. The invitation is single-use and expires in 2 minutes.',
      claimTitle: 'Pairing request',
      deviceName: 'iPhone',
      platform: 'iOS',
      codeHint: 'Approve only if this code matches the one shown on the device.',
      capabilities: { configuration: 'Import providers and models', agent: 'Control agent sessions' },
      approve: 'Approve',
      reject: 'Reject',
      approved: 'Device paired',
      pairedDevices: 'Paired devices',
      lastSeen: 'Just now'
    },
    onboarding: { back: 'Back', step: (current) => `Model setup · Step ${current} of 3` },
    scan: {
      title: 'Connect PC',
      guidance:
        'Open Device Connections in Cherry Studio on your PC to show the QR code. Both devices must be on the same local network.',
      paste: 'Paste pairing invitation'
    },
    pair: {
      title: 'Connect to desktop',
      desktopName: 'MacBook Pro',
      inProgress: 'In progress…',
      approveOnDesktop: 'Approve this device on your PC. The code shown there must match:',
      verificationCode: 'Verification code',
      complete: 'Connected',
      stages: {
        connecting: 'Connect to desktop',
        requesting: 'Request pairing',
        waiting: 'Wait for desktop approval',
        syncing: 'Check connection addresses',
        saving: 'Save connection'
      },
      cancel: 'Cancel',
      continue: 'Continue'
    },
    sync: {
      title: 'Sync from desktop',
      source: 'Source: MacBook Pro',
      fetching: 'Fetching enabled providers…',
      providers: [
        { name: 'Anthropic', provider: 'anthropic', models: 3 },
        { name: 'OpenAI', provider: 'openai', models: 4 },
        { name: 'DeepSeek', provider: 'deepseek', models: 2 },
        { name: 'OpenRouter', provider: 'openrouter', models: 6 }
      ],
      modelCount: (count) => `Models: ${count}`,
      notice:
        'Replaces selected providers’ addresses and credentials. Existing models are kept. For supported account providers, your phone’s keys and sign-in are preserved while PC keys are added.',
      apply: (count) => `Sync ${count} providers`,
      retry: 'Retry',
      success: 'Added 4 providers and updated 0 provider configurations; added 15 models and skipped 0 existing models'
    },
    agent: {
      ...chrome.en,
      agentName: 'Cherie',
      workspace: 'Default PC workspace',
      prompt: 'Run the test suite and tell me what fails',
      toolName: 'Bash',
      command: 'pnpm test',
      awaiting: '1 awaiting approval',
      arguments: 'Arguments',
      deny: 'Deny',
      continue: 'Continue',
      denied: '1 denied',
      answer:
        'Two tests fail in sync/importProviders: both expect the old provider order. The import itself works; only the fixtures need updating.'
    }
  },
  zh: {
    region: 'Cherry Studio 移动端与桌面端配对',
    steps: { scan: '扫码', verify: '验证', import: '导入', agent: 'PC Agent' },
    stepNav: '跳转到步骤',
    desktop: {
      title: '设备互联',
      ready: '已允许网络访问',
      pairTitle: '配对设备',
      pairHint: '使用 Cherry Studio 移动端扫码。邀请仅可使用一次，2 分钟后过期。',
      claimTitle: '配对请求',
      deviceName: 'iPhone',
      platform: 'iOS',
      codeHint: '仅当此验证码与设备上显示的一致时才允许。',
      capabilities: { configuration: '导入提供商和模型', agent: '控制智能体会话' },
      approve: '允许',
      reject: '拒绝',
      approved: '设备已配对',
      pairedDevices: '已配对设备',
      lastSeen: '刚刚'
    },
    onboarding: { back: '返回', step: (current) => `模型配置 · 第 ${current} 步，共 3 步` },
    scan: {
      title: '连接桌面端',
      guidance: '在桌面端 Cherry Studio 的“设备连接”中显示二维码，两台设备需在同一局域网。',
      paste: '粘贴配对邀请'
    },
    pair: {
      title: '连接桌面端',
      desktopName: 'MacBook Pro',
      inProgress: '正在进行…',
      approveOnDesktop: '请在桌面端允许此设备，并确认验证码与下方一致：',
      verificationCode: '验证码',
      complete: '连接成功',
      stages: {
        connecting: '连接桌面端',
        requesting: '发起配对请求',
        waiting: '等待桌面端确认',
        syncing: '检查连接地址',
        saving: '保存连接'
      },
      cancel: '取消',
      continue: '继续'
    },
    sync: {
      title: '从桌面端同步',
      source: '来源：MacBook Pro',
      fetching: '正在获取已启用的服务商……',
      providers: [
        { name: '深度求索', provider: 'deepseek', models: 3 },
        { name: '月之暗面', provider: 'moonshot', models: 4 },
        { name: '智谱开放平台', provider: 'zhipu', models: 2 },
        { name: '阿里云百炼', provider: 'qwen', models: 6 }
      ],
      modelCount: (count) => `${count} 个模型`,
      notice:
        '将覆盖所选服务商的地址和认证配置，保留已有模型。支持账号登录的服务商会保留手机已有密钥和登录状态，并新增 PC 密钥。',
      apply: (count) => `同步 ${count} 个服务商`,
      retry: '重试',
      success: '新增 4 个服务商、更新 0 个服务商配置；新增 15 个模型、跳过 0 个已有模型'
    },
    agent: {
      ...chrome.zh,
      agentName: 'Cherry 小助手',
      workspace: 'PC 默认工作区',
      prompt: '跑一遍测试，告诉我哪些没通过',
      toolName: 'Bash',
      command: 'pnpm test',
      awaiting: '1 项待确认',
      arguments: '参数',
      deny: '拒绝',
      continue: '继续',
      denied: '1 个被拒绝',
      answer: 'sync/importProviders 里有两个测试失败，都还在断言旧的服务商顺序。导入逻辑本身没问题，只需更新测试数据。'
    }
  }
}

export type LibraryFileKind = 'html' | 'pdf' | 'markdown' | 'image' | 'spreadsheet'

export interface LibraryFile {
  name: string
  date: string
  kind: LibraryFileKind
}

export interface MobileFilesCopy {
  region: string
  back: string
  more: string
  title: string
  browse: { label: string; recent: string; folders: string }
  filters: { label: string; all: string; images: string; documents: string; sharing: string }
  modified: (date: string) => string
  recent: LibraryFile[]
  folders: { id: string; name: string; date: string; files: LibraryFile[] }[]
  rootFiles: LibraryFile[]
  menu: { copyText: string; viewSource: string; viewPage: string; share: string; openWith: string }
  copied: string
  share: { label: string; format: string; original: string; image: string; save: string; share: string; close: string }
  page: {
    title: string
    subtitle: string
    days: { label: string; title: string; stops: string[] }[]
    tip: string
  }
}

export const mobileFilesDemo: Record<DemoLocale, MobileFilesCopy> = {
  en: {
    region: 'Cherry Studio mobile file library and HTML preview',
    back: 'Back',
    more: 'More',
    title: 'Files',
    browse: { label: 'Library browsing', recent: 'Recents', folders: 'Folders' },
    filters: { label: 'File type', all: 'All', images: 'Images', documents: 'Documents', sharing: 'Sharing' },
    modified: (date) => `Modified ${date}`,
    recent: [
      { name: 'kyoto-itinerary.html', date: 'Nov 24', kind: 'html' },
      { name: 'IMG_2048.jpg', date: 'Nov 24', kind: 'image' },
      { name: 'Q3 review.pdf', date: 'Nov 22', kind: 'pdf' },
      { name: 'meeting-notes.md', date: 'Nov 21', kind: 'markdown' },
      { name: 'budget.xlsx', date: 'Nov 18', kind: 'spreadsheet' }
    ],
    folders: [
      {
        id: 'kyoto',
        name: 'Kyoto trip',
        date: 'Nov 24',
        files: [
          { name: 'kyoto-itinerary.html', date: 'Nov 24', kind: 'html' },
          { name: 'IMG_2048.jpg', date: 'Nov 24', kind: 'image' },
          { name: 'hotel-booking.pdf', date: 'Nov 20', kind: 'pdf' },
          { name: 'packing-list.md', date: 'Nov 19', kind: 'markdown' }
        ]
      },
      { id: 'reports', name: 'Reports', date: 'Nov 22', files: [] }
    ],
    rootFiles: [
      { name: 'meeting-notes.md', date: 'Nov 21', kind: 'markdown' },
      { name: 'budget.xlsx', date: 'Nov 18', kind: 'spreadsheet' }
    ],
    menu: {
      copyText: 'Copy text',
      viewSource: 'View source',
      viewPage: 'View page',
      share: 'Share',
      openWith: 'Open file with'
    },
    copied: 'Text copied',
    share: {
      label: 'Share kyoto-itinerary.html',
      format: 'Export format',
      original: 'Original file',
      image: 'Image',
      save: 'Save',
      share: 'Share',
      close: 'Close'
    },
    page: {
      title: 'Kyoto in three days',
      subtitle: 'Autumn leaves · Nov 28 – 30',
      days: [
        {
          label: 'Day 1',
          title: 'Higashiyama',
          stops: ['Kiyomizu-dera at opening', 'Sannenzaka and Ninenzaka', 'Gion at dusk']
        },
        {
          label: 'Day 2',
          title: 'Arashiyama',
          stops: ['Bamboo grove before 8 am', 'Tenryū-ji garden', 'Togetsukyō bridge']
        },
        {
          label: 'Day 3',
          title: 'Fushimi & downtown',
          stops: ['Fushimi Inari torii trail', 'Nishiki Market lunch', 'Shinkansen at 17:10']
        }
      ],
      tip: 'Get an ICOCA card at the station; buses fill up after 10 am.'
    }
  },
  zh: {
    region: 'Cherry Studio 移动端文件库与 HTML 预览',
    back: '返回',
    more: '更多',
    title: '文件',
    browse: { label: '文件库浏览方式', recent: '最近', folders: '目录' },
    filters: { label: '文件类型', all: '全部', images: '图片', documents: '文档', sharing: '分享' },
    modified: (date) => `修改于 ${date}`,
    recent: [
      { name: '京都行程.html', date: '11月24日', kind: 'html' },
      { name: 'IMG_2048.jpg', date: '11月24日', kind: 'image' },
      { name: '第三季度复盘.pdf', date: '11月22日', kind: 'pdf' },
      { name: '会议纪要.md', date: '11月21日', kind: 'markdown' },
      { name: '预算.xlsx', date: '11月18日', kind: 'spreadsheet' }
    ],
    folders: [
      {
        id: 'kyoto',
        name: '京都旅行',
        date: '11月24日',
        files: [
          { name: '京都行程.html', date: '11月24日', kind: 'html' },
          { name: 'IMG_2048.jpg', date: '11月24日', kind: 'image' },
          { name: '酒店预订.pdf', date: '11月20日', kind: 'pdf' },
          { name: '行李清单.md', date: '11月19日', kind: 'markdown' }
        ]
      },
      { id: 'reports', name: '工作报告', date: '11月22日', files: [] }
    ],
    rootFiles: [
      { name: '会议纪要.md', date: '11月21日', kind: 'markdown' },
      { name: '预算.xlsx', date: '11月18日', kind: 'spreadsheet' }
    ],
    menu: { copyText: '复制文本', viewSource: '查看源码', viewPage: '查看页面', share: '分享', openWith: '打开文件' },
    copied: '已复制文本',
    share: {
      label: '分享 京都行程.html',
      format: '导出格式',
      original: '原文件',
      image: '图片',
      save: '保存',
      share: '分享',
      close: '关闭'
    },
    page: {
      title: '京都三日游',
      subtitle: '赏枫季 · 11月28日至30日',
      days: [
        { label: '第一天', title: '东山', stops: ['开门就去清水寺', '三年坂、二年坂', '傍晚逛祇园'] },
        { label: '第二天', title: '岚山', stops: ['8 点前到竹林小径', '天龙寺庭园', '渡月桥'] },
        { label: '第三天', title: '伏见与市区', stops: ['伏见稻荷千本鸟居', '锦市场吃午饭', '17:10 的新干线'] }
      ],
      tip: '进站先买一张 ICOCA 卡；10 点以后公交会很挤。'
    }
  }
}

export type TabletDestination = 'chat' | 'agents' | 'drawings' | 'plugins' | 'marketplace' | 'files' | 'devices'

export interface TabletLayoutCopy extends MobileChromeCopy {
  region: string
  date: string
  nav: Record<TabletDestination, string> & { label: string; settings: string }
  hideMenu: string
  showMenu: string
  switchAgent: string
  search: string
  sessionsView: string
  sessions: string[]
  chat: { time: string; prompt: string; imageAlt: string; model: string; answer: string }
  agents: { title: string; create: string; edit: string; items: { name: string; emoji: string; model: string }[] }
  drawings: {
    title: string
    templates: string
    all: string
    boards: string
    templateItems: { id: string; title: string }[]
    boardItems: { title: string; meta: string }[]
    placeholder: string
    settings: string
    model: string
  }
}

export const tabletLayoutDemo: Record<DemoLocale, TabletLayoutCopy> = {
  en: {
    ...chrome.en,
    region: 'Cherry Studio on iPad: navigation rail, docked sidebar and chat',
    date: 'Mon Nov 25',
    nav: {
      label: 'Navigation',
      chat: 'Chat',
      agents: 'Agents',
      drawings: 'Drawings',
      plugins: 'Plugins',
      marketplace: 'Marketplace',
      files: 'Files',
      devices: 'Device Connections',
      settings: 'Settings'
    },
    hideMenu: 'Hide menu',
    showMenu: 'Show menu',
    switchAgent: 'Switch agent',
    search: 'Search conversations',
    sessionsView: 'Sessions',
    sessions: [
      'Train window at golden hour',
      'Three creative projects',
      'Kyoto trip plan',
      'Q3 review summary',
      'Fix the sync test'
    ],
    chat: {
      time: '11/25 09:12',
      prompt: 'Paint a quiet train window at golden hour, soft film grain, no text.',
      imageAlt: 'A sunlit train window with fields passing outside',
      model: 'Qwen Image 3.0',
      answer: 'Here is the train window at golden hour.'
    },
    agents: {
      title: 'Agents',
      create: 'New agent',
      edit: 'Edit',
      items: [
        { name: 'Cherie', emoji: '🍒', model: 'MiniMax-M3' },
        { name: 'Translator', emoji: '🌐', model: 'GPT-6.2 Sol' },
        { name: 'Code Reviewer', emoji: '🧑‍💻', model: 'Claude Sonnet 5.5' },
        { name: 'Travel Planner', emoji: '🧳', model: 'Gemini 4 Neon' }
      ]
    },
    drawings: {
      title: 'Drawings',
      templates: 'Templates',
      all: 'All',
      boards: 'My boards',
      templateItems: [
        { id: 'light-trails', title: 'Light Trails' },
        { id: 'train-window', title: 'Train Window' },
        { id: 'y2k-street', title: 'Y2K Street' },
        { id: 'circular-cutout', title: 'Circular Cutout' },
        { id: 'tennis-collage', title: 'Tennis Precision' }
      ],
      boardItems: [
        { title: 'Train window at golden hour', meta: '4 generations · Nov 25' },
        { title: 'Night city', meta: '2 generations · Nov 23' },
        { title: 'Court study', meta: '3 generations · Nov 20' }
      ],
      placeholder: 'Describe an image to start a board',
      settings: 'Image settings',
      model: 'Qwen Image 3.0'
    }
  },
  zh: {
    ...chrome.zh,
    region: 'iPad 上的 Cherry Studio：导航栏、常驻侧栏与对话',
    date: '11月25日 周一',
    nav: {
      label: '导航',
      chat: '对话',
      agents: '智能体',
      drawings: '绘画',
      plugins: '插件',
      marketplace: '市场',
      files: '文件',
      devices: '设备互联',
      settings: '设置'
    },
    hideMenu: '收起菜单',
    showMenu: '展开菜单',
    switchAgent: '切换智能体',
    search: '搜索对话',
    sessionsView: '会话',
    sessions: ['黄昏的火车车窗', '三个小创意项目', '京都行程规划', '三季度复盘总结', '修复同步测试'],
    chat: {
      time: '11/25 09:12',
      prompt: '画一扇黄昏时分安静的火车车窗，带一点胶片颗粒，不要文字。',
      imageAlt: '阳光照进火车车窗，窗外田野掠过',
      model: 'Qwen Image 3.0',
      answer: '黄昏的火车车窗画好了。'
    },
    agents: {
      title: '智能体',
      create: '新建智能体',
      edit: '编辑',
      items: [
        { name: 'Cherry 小助手', emoji: '🍒', model: 'MiniMax-M3' },
        { name: '翻译官', emoji: '🌐', model: 'Qwen3.8 Flash' },
        { name: '代码审查', emoji: '🧑‍💻', model: 'Kimi K3.1 Pro' },
        { name: '旅行规划', emoji: '🧳', model: 'DeepSeek V4 Pro' }
      ]
    },
    drawings: {
      title: '绘画',
      templates: '模板',
      all: '全部',
      boards: '我的画板',
      templateItems: [
        { id: 'light-trails', title: '金色光轨' },
        { id: 'train-window', title: '火车窗边' },
        { id: 'y2k-street', title: 'Y2K 街拍' },
        { id: 'circular-cutout', title: '圆形墙洞' },
        { id: 'tennis-collage', title: '网球拼贴' }
      ],
      boardItems: [
        { title: '黄昏的火车车窗', meta: '4 次生成 · 11月25日' },
        { title: '夜色城市', meta: '2 次生成 · 11月23日' },
        { title: '球场习作', meta: '3 次生成 · 11月20日' }
      ],
      placeholder: '描述画面，开一个新画板',
      settings: '图像设置',
      model: 'Qwen Image 3.0'
    }
  }
}
