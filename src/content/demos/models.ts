// Copy and data for the multi-model answer group and the model picker demos.
// Model names, capabilities and token limits come from Cherry Studio packages/provider-registry/data;
// UI labels come from the desktop en-us / zh-cn locale catalogs.
import type { DemoLocale } from './chat'

export type GroupLayout = 'fold' | 'vertical' | 'horizontal' | 'grid'

export type Capability = 'vision' | 'reasoning' | 'tools' | 'web' | 'embedding' | 'rerank'

export interface CompareAnswer {
  id: string
  name: string
  provider: string
  /** Scripted time to first token in ms. */
  latency: number
  /** Streaming rate in segments per second, so the three answers finish at different times. */
  rate: number
  tokens: number
  tokensPerSecond: number
  answer: string
}

export interface ModelCompareCopy {
  window: string
  prompt: string
  /** The answering assistant; desktop headers show it before each model's own name. */
  assistant: string
  groupStyle: string
  layouts: Record<GroupLayout, string>
  /** Fold tabs toggle between expanded and compact labels. */
  foldCompress: string
  foldExpand: string
  preparing: string
  tokens: (value: number) => string
  tokensPerSecond: (value: number) => string
  expand: string
  collapse: string
  models: CompareAnswer[]
}

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

const enAnswers: CompareAnswer[] = [
  {
    id: 'claude',
    name: 'Claude Sonnet 4.6',
    provider: 'anthropic',
    latency: 620,
    rate: 20,
    tokens: 86,
    tokensPerSecond: 74,
    answer:
      'A vector database stores meaning instead of exact words. Every document becomes a list of numbers, and similar ideas land close together. So when a customer asks “how do I get my money back”, search finds the refund policy even if it never says “money back”.'
  },
  {
    id: 'gpt',
    name: 'GPT-5.6',
    provider: 'openai',
    latency: 880,
    rate: 25,
    tokens: 74,
    tokensPerSecond: 92,
    answer:
      'Think of it as search by similarity. Text, images or tickets are turned into embeddings, and the database returns the nearest neighbors in milliseconds. It is what lets an assistant answer from your own docs rather than guessing.'
  },
  {
    id: 'gemini',
    name: 'Gemini 3.5 Flash',
    provider: 'google',
    latency: 420,
    rate: 32,
    tokens: 79,
    tokensPerSecond: 138,
    answer:
      'It is a database built for “find things like this”. Instead of matching keywords it compares embeddings, numeric fingerprints of meaning. For a product team that means better search, recommendations and grounded AI answers over the same data.'
  }
]

const zhAnswers: CompareAnswer[] = [
  {
    id: 'deepseek',
    name: 'DeepSeek V4 Pro',
    provider: 'deepseek',
    latency: 760,
    rate: 22,
    tokens: 142,
    tokensPerSecond: 68,
    answer:
      '向量数据库存的不是原文，而是“意思”。每段内容会被转换成一串数字，含义相近的内容在空间里离得更近。所以用户问“怎么退钱”，系统也能找到写着“退款政策”的那篇文档。'
  },
  {
    id: 'qwen',
    name: 'Qwen3.7 Max',
    provider: 'qwen',
    latency: 540,
    rate: 30,
    tokens: 128,
    tokensPerSecond: 96,
    answer:
      '可以把它理解成“按相似度搜索”的数据库。文本、图片或工单先变成向量，查询时直接返回最接近的几条结果，速度在毫秒级。AI 助手能基于你自己的资料作答，靠的就是它。'
  },
  {
    id: 'kimi',
    name: 'Kimi K3',
    provider: 'moonshot',
    latency: 920,
    rate: 26,
    tokens: 151,
    tokensPerSecond: 81,
    answer:
      '一句话：它专门回答“有没有和这个类似的”。它不做关键词匹配，而是比较向量，也就是内容含义的数字指纹。对产品来说，搜索、推荐和有据可查的 AI 回答都可以建立在同一份数据上。'
  }
]

export const modelCompareDemo: Record<DemoLocale, ModelCompareCopy> = {
  en: {
    window: 'Cherry Studio — Ask three models',
    prompt: 'Explain a vector database to a product manager in three sentences.',
    assistant: 'Cherie',
    groupStyle: 'Group style',
    layouts: { fold: 'Fold view', vertical: 'Stacked view', horizontal: 'Side by side', grid: 'Grid layout' },
    foldCompress: 'Switch to compact tabs',
    foldExpand: 'Switch to expanded tabs',
    preparing: 'Preparing response',
    tokens: (value) => `${value} Tokens`,
    tokensPerSecond: (value) => `${value} Tokens/s`,
    expand: 'Show the full answer from',
    collapse: 'Close the answer from',
    models: enAnswers
  },
  zh: {
    window: 'Cherry Studio — 同时问三个模型',
    prompt: '用三句话向产品经理解释什么是向量数据库。',
    assistant: 'Cherry 助手',
    groupStyle: '多模型回答样式',
    layouts: { fold: '标签模式', vertical: '纵向堆叠', horizontal: '横向排列', grid: '卡片布局' },
    foldCompress: '切换为紧凑标签',
    foldExpand: '切换为展开标签',
    preparing: '正在准备回复',
    tokens: (value) => `${value} Tokens`,
    tokensPerSecond: (value) => `${value} Token/秒`,
    expand: '查看完整回答：',
    collapse: '关闭回答：',
    models: zhAnswers
  }
}

// Ordered by provider so the picker groups read top to bottom like the desktop list. The chat picker
// filters out non-chat models (desktop isNonChatModel), so embedding and rerank models are not listed.
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
