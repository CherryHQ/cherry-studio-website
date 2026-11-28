// Copy and data for the model picker demo.
// Model names, capabilities and token limits come from Cherry Studio packages/provider-registry/data;
// UI labels come from the desktop en-us / zh-cn locale catalogs.
import type { DemoLocale } from './chat'

export type Capability = 'vision' | 'reasoning' | 'tools' | 'web' | 'embedding' | 'rerank'

export interface SelectorModel {
  id: string
  name: string
  provider: string
  caps: Capability[]
  context: number
  maxOutput?: number
}

export interface ModelSelectorCopy {
  window: string
  selectModel: string
  searchPlaceholder: string
  clear: string
  pinned: string
  pin: string
  unpin: string
  noMatches: string
  configureCustom: string
  switchToDialog: string
  showSidebar: string
  /** Default assistant name and the empty-chat greeting behind the picker. */
  assistant: string
  greeting: string
  capabilities: Record<Capability, string>
  providers: Record<string, string>
  detail: { provider: string; modelId: string; contextWindow: string; maxOutput: string }
  /** Query the demo types by itself once it scrolls into view. */
  autoQuery: string
  pinnedIds: string[]
  initialModel: string
}

// The Chinese site lists only domestic providers.
export const selectorModels: Record<DemoLocale, SelectorModel[]> = {
  en: [
    {
      id: 'claude-opus-5-5',
      name: 'Claude Opus 5.5',
      provider: 'anthropic',
      caps: ['vision', 'reasoning', 'tools', 'web'],
      context: 1000000,
      maxOutput: 128000
    },
    {
      id: 'claude-sonnet-5-5',
      name: 'Claude Sonnet 5.5',
      provider: 'anthropic',
      caps: ['vision', 'reasoning', 'tools', 'web'],
      context: 1000000,
      maxOutput: 128000
    },
    {
      id: 'claude-haiku-5-5',
      name: 'Claude Haiku 5.5',
      provider: 'anthropic',
      caps: ['vision', 'reasoning', 'tools', 'web'],
      context: 1000000,
      maxOutput: 128000
    },
    {
      id: 'gpt-6-2-sol',
      name: 'GPT-6.2 Sol',
      provider: 'openai',
      caps: ['vision', 'reasoning', 'tools', 'web'],
      context: 1050000,
      maxOutput: 128000
    },
    {
      id: 'gpt-6-2-astra',
      name: 'GPT-6.2 Astra',
      provider: 'openai',
      caps: ['vision', 'reasoning', 'tools', 'web'],
      context: 1050000,
      maxOutput: 128000
    },
    {
      id: 'gemini-4-neon',
      name: 'Gemini 4 Neon',
      provider: 'google',
      caps: ['vision', 'reasoning', 'tools', 'web'],
      context: 1048576,
      maxOutput: 1048576
    },
    {
      id: 'gemini-4-carbon',
      name: 'Gemini 4 Carbon',
      provider: 'google',
      caps: ['vision', 'reasoning', 'tools', 'web'],
      context: 1048576,
      maxOutput: 1048576
    },
    {
      id: 'grok-4-7',
      name: 'Grok 4.7',
      provider: 'grok',
      caps: ['vision', 'reasoning', 'tools'],
      context: 500000,
      maxOutput: 500000
    },
    {
      id: 'deepseek-v4-pro',
      name: 'DeepSeek V4 Pro',
      provider: 'deepseek',
      caps: ['reasoning', 'tools'],
      context: 1048576,
      maxOutput: 393216
    },
    {
      id: 'deepseek-v4-1-flash',
      name: 'DeepSeek V4.1 Flash',
      provider: 'deepseek',
      caps: ['vision', 'reasoning', 'tools'],
      context: 1048576,
      maxOutput: 393216
    },
    {
      id: 'qwen3-8-max',
      name: 'Qwen3.8 Max',
      provider: 'qwen',
      caps: ['reasoning', 'tools'],
      context: 1000000,
      maxOutput: 128000
    },
    {
      id: 'qwen3-8-flash',
      name: 'Qwen3.8 Flash',
      provider: 'qwen',
      caps: ['vision', 'reasoning', 'tools'],
      context: 1000000,
      maxOutput: 131072
    },
    {
      id: 'kimi-k3-1-pro',
      name: 'Kimi K3.1 Pro',
      provider: 'moonshot',
      caps: ['vision', 'reasoning', 'tools'],
      context: 1048576,
      maxOutput: 1048576
    },
    {
      id: 'glm-5-3',
      name: 'GLM 5.3',
      provider: 'zhipu',
      caps: ['reasoning', 'tools'],
      context: 1048576,
      maxOutput: 131072
    },
    {
      id: 'minimax-m3',
      name: 'MiniMax-M3',
      provider: 'minimax',
      caps: ['vision', 'reasoning', 'tools'],
      context: 1048576,
      maxOutput: 524288
    },
    {
      id: 'mistral-large',
      name: 'Mistral Large 3',
      provider: 'mistral',
      caps: ['vision', 'tools'],
      context: 262144,
      maxOutput: 262144
    }
  ],
  zh: [
    {
      id: 'deepseek-v4-pro',
      name: 'DeepSeek V4 Pro',
      provider: 'deepseek',
      caps: ['reasoning', 'tools'],
      context: 1048576,
      maxOutput: 393216
    },
    {
      id: 'deepseek-v4-1-flash',
      name: 'DeepSeek V4.1 Flash',
      provider: 'deepseek',
      caps: ['vision', 'reasoning', 'tools'],
      context: 1048576,
      maxOutput: 393216
    },
    {
      id: 'qwen3-8-max',
      name: 'Qwen3.8 Max',
      provider: 'qwen',
      caps: ['reasoning', 'tools'],
      context: 1000000,
      maxOutput: 128000
    },
    {
      id: 'qwen3-8-flash',
      name: 'Qwen3.8 Flash',
      provider: 'qwen',
      caps: ['vision', 'reasoning', 'tools'],
      context: 1000000,
      maxOutput: 131072
    },
    {
      id: 'kimi-k3-1-pro',
      name: 'Kimi K3.1 Pro',
      provider: 'moonshot',
      caps: ['vision', 'reasoning', 'tools'],
      context: 1048576,
      maxOutput: 1048576
    },
    {
      id: 'glm-5-3',
      name: 'GLM 5.3',
      provider: 'zhipu',
      caps: ['reasoning', 'tools'],
      context: 1048576,
      maxOutput: 131072
    },
    {
      id: 'glm-5-3-flash',
      name: 'GLM-5.3-Flash',
      provider: 'zhipu',
      caps: ['vision', 'reasoning', 'tools'],
      context: 1000000,
      maxOutput: 131072
    },
    {
      id: 'minimax-m3',
      name: 'MiniMax-M3',
      provider: 'minimax',
      caps: ['vision', 'reasoning', 'tools'],
      context: 1048576,
      maxOutput: 524288
    },
    {
      id: 'doubao-seed-2-1-pro',
      name: 'Doubao Seed 2.1 Pro',
      provider: 'doubao',
      caps: ['vision', 'reasoning', 'tools'],
      context: 262144,
      maxOutput: 262144
    },
    {
      id: 'mimo-v2-6-pro',
      name: 'MiMo-V2.6-Pro',
      provider: 'mimo',
      caps: ['vision', 'reasoning', 'tools'],
      context: 1048576,
      maxOutput: 131072
    },
    {
      id: 'ernie-5-0',
      name: 'ERNIE 5.0',
      provider: 'wenxin',
      caps: ['reasoning', 'tools'],
      context: 131072
    },
    {
      id: 'longcat-2-5',
      name: 'LongCat-2.5',
      provider: 'longcat',
      caps: ['vision', 'reasoning', 'tools'],
      context: 1048576,
      maxOutput: 262144
    },
    {
      id: 'step-5-preview',
      name: 'Step 5 Preview',
      provider: 'step',
      caps: ['vision', 'reasoning', 'tools'],
      context: 1048576,
      maxOutput: 1048576
    }
  ]
}

export const modelSelectorDemo: Record<DemoLocale, ModelSelectorCopy> = {
  en: {
    window: 'Cherry Studio — Select model',
    selectModel: 'Select Model',
    searchPlaceholder: 'Search models...',
    clear: 'Clear',
    pinned: 'Pinned',
    pin: 'Pin this model',
    unpin: 'Unpin model',
    noMatches: 'No models available',
    configureCustom: 'Configure custom models',
    switchToDialog: 'Switch to dialog',
    showSidebar: 'Show Sidebar',
    assistant: 'Cherie',
    greeting: 'What should we talk about today?',
    capabilities: {
      vision: 'Vision',
      reasoning: 'Reasoning',
      tools: 'Tool',
      web: 'WebSearch',
      embedding: 'Embedding',
      rerank: 'Reranker'
    },
    providers: {
      anthropic: 'Anthropic',
      openai: 'OpenAI',
      google: 'Gemini',
      grok: 'Grok',
      deepseek: 'DeepSeek',
      qwen: 'Qianwen AI platform',
      moonshot: 'Moonshot AI',
      zhipu: 'BigModel',
      minimax: 'MiniMax',
      mistral: 'Mistral'
    },
    detail: { provider: 'Provider', modelId: 'Model ID', contextWindow: 'Context window', maxOutput: 'Max output' },
    autoQuery: 'gemini',
    pinnedIds: ['claude-sonnet-5-5', 'gpt-6-2-sol'],
    initialModel: 'claude-sonnet-5-5'
  },
  zh: {
    window: 'Cherry Studio — 选择模型',
    selectModel: '选择模型',
    searchPlaceholder: '搜索模型...',
    clear: '清除',
    pinned: '已固定',
    pin: '置顶此模型',
    unpin: '取消置顶',
    noMatches: '无可用模型',
    configureCustom: '配置自定义模型',
    switchToDialog: '切换为弹窗',
    showSidebar: '显示侧边栏',
    assistant: 'Cherry 助手',
    greeting: '今天想聊点什么？',
    capabilities: {
      vision: '视觉',
      reasoning: '推理',
      tools: '工具',
      web: '联网',
      embedding: '嵌入',
      rerank: '重排'
    },
    providers: {
      deepseek: '深度求索',
      qwen: '千问 AI 平台',
      moonshot: '月之暗面',
      zhipu: '智谱开放平台',
      minimax: 'MiniMax',
      doubao: '豆包（火山引擎 Ark）',
      mimo: 'Xiaomi MiMo',
      wenxin: '百度云千帆',
      longcat: '龙猫',
      step: '阶跃星辰'
    },
    detail: { provider: '服务商', modelId: '模型 ID', contextWindow: '上下文窗口', maxOutput: '最大输出' },
    autoQuery: 'qwen',
    pinnedIds: ['deepseek-v4-pro', 'kimi-k3-1-pro'],
    initialModel: 'deepseek-v4-pro'
  }
}
