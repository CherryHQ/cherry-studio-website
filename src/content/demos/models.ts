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

export const selectorModels: SelectorModel[] = [
  {
    id: 'claude-opus-4-8',
    name: 'Claude Opus 4.8',
    provider: 'anthropic',
    caps: ['vision', 'reasoning', 'tools', 'web'],
    context: 1000000,
    maxOutput: 128000
  },
  {
    id: 'claude-sonnet-4-6',
    name: 'Claude Sonnet 4.6',
    provider: 'anthropic',
    caps: ['vision', 'reasoning', 'tools', 'web'],
    context: 1000000,
    maxOutput: 128000
  },
  {
    id: 'claude-haiku-4-5',
    name: 'Claude Haiku 4.5',
    provider: 'anthropic',
    caps: ['vision', 'reasoning', 'tools', 'web'],
    context: 200000,
    maxOutput: 64000
  },
  {
    id: 'gpt-5-6',
    name: 'GPT-5.6',
    provider: 'openai',
    caps: ['vision', 'reasoning', 'tools', 'web'],
    context: 1050000,
    maxOutput: 128000
  },
  {
    id: 'gpt-5-4-mini',
    name: 'GPT 5.4 Mini',
    provider: 'openai',
    caps: ['vision', 'reasoning', 'tools', 'web'],
    context: 400000,
    maxOutput: 128000
  },
  {
    id: 'gemini-3-1-pro-preview',
    name: 'Gemini 3.1 Pro Preview',
    provider: 'google',
    caps: ['vision', 'reasoning', 'tools', 'web'],
    context: 1048576,
    maxOutput: 65536
  },
  {
    id: 'gemini-3-5-flash',
    name: 'Gemini 3.5 Flash',
    provider: 'google',
    caps: ['vision', 'reasoning', 'tools', 'web'],
    context: 1048576,
    maxOutput: 65536
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
    id: 'deepseek-v4-flash',
    name: 'DeepSeek V4 Flash',
    provider: 'deepseek',
    caps: ['reasoning', 'tools'],
    context: 1048576,
    maxOutput: 393216
  },
  {
    id: 'qwen3-7-max',
    name: 'Qwen3.7 Max',
    provider: 'qwen',
    caps: ['reasoning', 'tools'],
    context: 1000000,
    maxOutput: 65536
  },
  {
    id: 'qwen3-6-plus',
    name: 'Qwen3.6 Plus',
    provider: 'qwen',
    caps: ['vision', 'reasoning', 'tools'],
    context: 1000000,
    maxOutput: 65536
  },
  {
    id: 'kimi-k3',
    name: 'Kimi K3',
    provider: 'moonshot',
    caps: ['vision', 'reasoning', 'tools'],
    context: 1048576,
    maxOutput: 131072
  },
  {
    id: 'kimi-k2-6',
    name: 'Kimi K2.6',
    provider: 'moonshot',
    caps: ['vision', 'reasoning', 'tools'],
    context: 262144,
    maxOutput: 262144
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
    id: 'glm-5v-turbo',
    name: 'GLM 5V Turbo',
    provider: 'zhipu',
    caps: ['vision', 'reasoning', 'tools'],
    context: 202752,
    maxOutput: 131072
  }
]

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
      deepseek: 'DeepSeek',
      qwen: 'Qianwen AI platform',
      moonshot: 'Moonshot AI',
      zhipu: 'BigModel'
    },
    detail: { provider: 'Provider', modelId: 'Model ID', contextWindow: 'Context window', maxOutput: 'Max output' },
    autoQuery: 'gemini',
    pinnedIds: ['claude-sonnet-4-6', 'gpt-5-6'],
    initialModel: 'claude-sonnet-4-6'
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
      anthropic: 'Anthropic',
      openai: 'OpenAI',
      google: 'Gemini',
      deepseek: '深度求索',
      qwen: '千问 AI 平台',
      moonshot: '月之暗面',
      zhipu: '智谱开放平台'
    },
    detail: { provider: '服务商', modelId: '模型 ID', contextWindow: '上下文窗口', maxOutput: '最大输出' },
    autoQuery: 'qwen',
    pinnedIds: ['deepseek-v4-pro', 'kimi-k3'],
    initialModel: 'deepseek-v4-pro'
  }
}
