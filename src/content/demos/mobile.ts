// Copy for the mobile app demos. UI labels come from CherryHQ/cherry-studio-app src/frontend/i18n/locales
// (en-us, zh-cn) and the desktop pairing labels from Cherry Studio src/renderer/i18n/locales.
import type { DemoLocale } from './chat'

export type ComposerMenuItem = 'camera' | 'photos' | 'file'

export interface MobileComposerCopy {
  region: string
  model: string
  greeting: string
  placeholder: string
  /** chat.media.attach: the + trigger and its panel. */
  attach: string
  menu: { id: ComposerMenuItem; label: string }[]
  attachments: Record<ComposerMenuItem, string>
  removeAttachment: string
  prompt: string
  /** Rotating pending reasons; each holds for 2200ms as in TextAnimation.Rotating. */
  status: string[]
  answer: string
}

export type ModelCapability = 'vision' | 'reasoning' | 'tools' | 'web'

export interface PickerProvider {
  id: string
  name: string
  models: { name: string; caps: ModelCapability[] }[]
}

export type SheetDetent = 'compact' | 'medium' | 'large' | 'full'

export interface ModelPickerCopy {
  region: string
  title: string
  search: string
  fastScroll: string
  fastScrollHint: string
  providerMarker: string
  handle: string
  detentLabel: string
  detents: Record<SheetDetent, string>
  capabilities: Record<ModelCapability, string>
  selected: string
  chatTitle: string
  providers: PickerProvider[]
}

export interface LogoDrawCopy {
  region: string
  title: string
  description: string
  actions: [string, string]
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
  scan: {
    title: string
    step: string
    guidance: string
    paste: string
  }
  pair: {
    title: string
    desktopName: string
    inProgress: string
    approveOnDesktop: string
    verificationCode: string
    complete: string
    progress: string
    stages: Record<PairingStage, string>
    done: string
    cancel: string
  }
  sync: {
    title: string
    step: string
    source: string
    fetching: string
    providers: { name: string; provider: string; models: number }[]
    modelCount: (count: number) => string
    notice: string
    apply: (count: number) => string
    success: string
  }
  agent: {
    agentName: string
    connected: string
    workspace: string
    placeholder: string
    prompt: string
    toolName: string
    command: string
    approvalRequested: string
    awaiting: string
    arguments: string
    deny: string
    continue: string
    approved: string
    denied: string
    running: string
    output: string
    answer: string
    finished: string
  }
}

export const mobileComposerDemo: Record<DemoLocale, MobileComposerCopy> = {
  en: {
    region: 'Cherry Studio mobile chat with the composer menu',
    model: 'Claude Sonnet 4.6',
    greeting: 'What should we create together today?',
    placeholder: 'Message',
    attach: 'Attach',
    menu: [
      { id: 'camera', label: 'Camera' },
      { id: 'photos', label: 'Photos' },
      { id: 'file', label: 'File' }
    ],
    attachments: { camera: 'IMG_0412.HEIC', photos: 'whiteboard.jpg', file: 'sprint-notes.pdf' },
    removeAttachment: 'Remove attachment',
    prompt: 'Turn this whiteboard into a to-do list',
    status: ['Thinking', 'Reading the photo', 'Grouping the notes'],
    answer:
      'Here is the whiteboard as a list:\n\n☐ Ship the onboarding sync flow\n☐ Fix model picker search on Android\n☐ Write release notes for 2.1\n☐ Book the design review for Thursday'
  },
  zh: {
    region: 'Cherry Studio 移动端对话与输入框菜单',
    model: 'Claude Sonnet 4.6',
    greeting: '今天想一起做点什么？',
    placeholder: '发消息',
    attach: '添加附件',
    menu: [
      { id: 'camera', label: '相机' },
      { id: 'photos', label: '照片' },
      { id: 'file', label: '文件' }
    ],
    attachments: { camera: 'IMG_0412.HEIC', photos: '白板.jpg', file: '迭代记录.pdf' },
    removeAttachment: '移除附件',
    prompt: '把这块白板整理成待办清单',
    status: ['思考中', '正在看图', '正在归类要点'],
    answer:
      '白板内容整理如下：\n\n☐ 上线新手引导的桌面同步流程\n☐ 修复 Android 上的模型搜索\n☐ 撰写 2.1 版本更新说明\n☐ 预约周四的设计评审'
  }
}

const providerModels = {
  anthropic: [
    { name: 'Claude Opus 4.8', caps: ['vision', 'reasoning', 'tools', 'web'] },
    { name: 'Claude Sonnet 4.6', caps: ['vision', 'reasoning', 'tools', 'web'] },
    { name: 'Claude Haiku 4.5', caps: ['vision', 'reasoning', 'tools'] }
  ],
  openai: [
    { name: 'GPT-5.6', caps: ['vision', 'reasoning', 'tools', 'web'] },
    { name: 'GPT 5.4 Mini', caps: ['vision', 'reasoning', 'tools'] }
  ],
  google: [
    { name: 'Gemini 3.1 Pro Preview', caps: ['vision', 'reasoning', 'tools', 'web'] },
    { name: 'Gemini 3.5 Flash', caps: ['vision', 'reasoning', 'tools', 'web'] }
  ],
  deepseek: [
    { name: 'DeepSeek V4 Pro', caps: ['reasoning', 'tools'] },
    { name: 'DeepSeek V4 Flash', caps: ['reasoning', 'tools'] }
  ],
  qwen: [
    { name: 'Qwen3.7 Max', caps: ['reasoning', 'tools'] },
    { name: 'Qwen3.6 Plus', caps: ['vision', 'reasoning', 'tools'] }
  ],
  moonshot: [{ name: 'Kimi K3', caps: ['vision', 'reasoning', 'tools'] }],
  zhipu: [{ name: 'GLM-4.6', caps: ['reasoning', 'tools'] }],
  mistral: [{ name: 'Mistral Large', caps: ['vision', 'tools'] }],
  grok: [{ name: 'Grok 4', caps: ['vision', 'reasoning', 'tools'] }],
  openrouter: [{ name: 'Llama 3.3 70B', caps: ['tools'] }],
  ollama: [{ name: 'Qwen3 8B', caps: ['reasoning'] }]
} satisfies Record<string, PickerProvider['models']>

const pickerProviders = (names: Record<keyof typeof providerModels, string>): PickerProvider[] =>
  (Object.keys(providerModels) as (keyof typeof providerModels)[]).map((id) => ({
    id,
    name: names[id],
    models: providerModels[id]
  }))

export const modelPickerDemo: Record<DemoLocale, ModelPickerCopy> = {
  en: {
    region: 'Cherry Studio mobile model picker with the provider fast scroller',
    title: 'Select model',
    search: 'Search models',
    fastScroll: 'Provider quick navigation',
    fastScrollHint: 'Swipe up or down to locate providers',
    providerMarker: 'Provider',
    handle: 'Resize the sheet. Drag, or use the arrow keys',
    detentLabel: 'Sheet height',
    detents: { compact: '40%', medium: '60%', large: '80%', full: 'Full' },
    capabilities: { vision: 'Vision', reasoning: 'Reasoning', tools: 'Tools', web: 'Web search' },
    selected: 'Claude Sonnet 4.6',
    chatTitle: 'New chat',
    providers: pickerProviders({
      anthropic: 'Anthropic',
      openai: 'OpenAI',
      google: 'Gemini',
      deepseek: 'DeepSeek',
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
    region: 'Cherry Studio 移动端模型选择器与服务商快速定位',
    title: '选择模型',
    search: '搜索模型',
    fastScroll: '服务商快速定位',
    fastScrollHint: '上下滑动以定位服务商',
    providerMarker: '服务商',
    handle: '调整面板高度：拖动，或使用方向键',
    detentLabel: '面板高度',
    detents: { compact: '40%', medium: '60%', large: '80%', full: '全屏' },
    capabilities: { vision: '视觉', reasoning: '推理', tools: '工具', web: '联网' },
    selected: 'Claude Sonnet 4.6',
    chatTitle: '新对话',
    providers: pickerProviders({
      anthropic: 'Anthropic',
      openai: 'OpenAI',
      google: 'Gemini',
      deepseek: '深度求索',
      qwen: '阿里云百炼',
      moonshot: '月之暗面',
      zhipu: '智谱开放平台',
      mistral: 'Mistral',
      grok: 'Grok',
      openrouter: 'OpenRouter',
      ollama: 'Ollama'
    })
  }
}

export const logoDrawDemo: Record<DemoLocale, LogoDrawCopy> = {
  en: {
    region: 'Cherry Studio mobile onboarding logo animation',
    title: 'Welcome to Cherry',
    description: 'Connect your AI service or sync your existing setup from your computer.',
    actions: ['Connect a provider', 'Sync from desktop']
  },
  zh: {
    region: 'Cherry Studio 移动端新手引导 Logo 动画',
    title: '欢迎使用 Cherry',
    description: '连接你的 AI 服务，或从桌面端同步已有配置。',
    actions: ['连接服务商', '从桌面端同步']
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
    scan: {
      title: 'Connect PC',
      step: 'Model setup · Step 1 of 3',
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
      progress: 'Connection progress',
      stages: {
        connecting: 'Connect to desktop',
        requesting: 'Request pairing',
        waiting: 'Wait for desktop approval',
        syncing: 'Check connection addresses',
        saving: 'Save connection'
      },
      done: 'Done',
      cancel: 'Cancel'
    },
    sync: {
      title: 'Sync from desktop',
      step: 'Model setup · Step 2 of 3',
      source: 'Source: MacBook Pro',
      fetching: 'Fetching enabled providers…',
      providers: [
        { name: 'Anthropic', provider: 'anthropic', models: 3 },
        { name: 'OpenAI', provider: 'openai', models: 4 },
        { name: 'DeepSeek', provider: 'deepseek', models: 2 },
        { name: 'OpenRouter', provider: 'openrouter', models: 6 }
      ],
      modelCount: (count) => `Models: ${count}`,
      notice: 'Replaces selected providers’ addresses and credentials. Existing models are kept.',
      apply: (count) => `Sync ${count} providers`,
      success: 'Added 4 providers and updated 0 provider configurations; added 15 models and skipped 0 existing models'
    },
    agent: {
      agentName: 'Cherie',
      connected: 'Connected to MacBook Pro',
      workspace: 'Default PC workspace',
      placeholder: 'Send a message to the PC Agent',
      prompt: 'Run the test suite and tell me what fails',
      toolName: 'Run command',
      command: 'pnpm test',
      approvalRequested: 'Approval requested',
      awaiting: 'Waiting for your response',
      arguments: 'Arguments',
      deny: 'Deny',
      continue: 'Continue',
      approved: 'Approved',
      denied: 'Run denied',
      running: 'Running',
      output: '128 passed · 2 failed',
      answer:
        'Two tests fail in sync/importProviders: both expect the old provider order. The import itself works; only the fixtures need updating.',
      finished: 'Current execution finished'
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
    scan: {
      title: '连接桌面端',
      step: '模型配置 · 第 1 步，共 3 步',
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
      progress: '连接进度',
      stages: {
        connecting: '连接桌面端',
        requesting: '发起配对请求',
        waiting: '等待桌面端确认',
        syncing: '检查连接地址',
        saving: '保存连接'
      },
      done: '完成',
      cancel: '取消'
    },
    sync: {
      title: '从桌面端同步',
      step: '模型配置 · 第 2 步，共 3 步',
      source: '来源：MacBook Pro',
      fetching: '正在获取已启用的服务商……',
      providers: [
        { name: 'Anthropic', provider: 'anthropic', models: 3 },
        { name: 'OpenAI', provider: 'openai', models: 4 },
        { name: '深度求索', provider: 'deepseek', models: 2 },
        { name: 'OpenRouter', provider: 'openrouter', models: 6 }
      ],
      modelCount: (count) => `${count} 个模型`,
      notice: '将覆盖所选服务商的地址和认证配置，保留已有模型。',
      apply: (count) => `同步 ${count} 个服务商`,
      success: '新增 4 个服务商、更新 0 个服务商配置；新增 15 个模型、跳过 0 个已有模型'
    },
    agent: {
      agentName: 'Cherry 小助手',
      connected: '已连接 MacBook Pro',
      workspace: 'PC 默认工作区',
      placeholder: '向 PC Agent 发送消息',
      prompt: '跑一遍测试，告诉我哪些没通过',
      toolName: '执行命令',
      command: 'pnpm test',
      approvalRequested: '请求审批',
      awaiting: '等待你回应',
      arguments: '参数',
      deny: '拒绝',
      continue: '继续',
      approved: '已批准',
      denied: '拒绝运行',
      running: '运行中',
      output: '128 个通过 · 2 个失败',
      answer: 'sync/importProviders 里有两个测试失败，都还在断言旧的服务商顺序。导入逻辑本身没问题，只需更新测试数据。',
      finished: '当前执行已结束'
    }
  }
}
