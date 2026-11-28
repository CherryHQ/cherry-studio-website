// Copy and data for the multi-model answer group demo.
// Model names come from Cherry Studio packages/provider-registry/data;
// UI labels come from the desktop en-us / zh-cn locale catalogs.
import type { DemoLocale } from './chat'

export type GroupLayout = 'fold' | 'vertical' | 'horizontal' | 'grid'

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

const enAnswers: CompareAnswer[] = [
  {
    id: 'claude',
    name: 'Claude Sonnet 5.5',
    provider: 'anthropic',
    latency: 620,
    rate: 20,
    tokens: 86,
    tokensPerSecond: 74,
    answer:
      'A vector database stores meaning instead of exact words. Every document becomes a list of numbers, and similar ideas land close together. So when a customer asks “how do I get my money back”, search finds the refund policy even if it never says “money back”.\n\nExample: point it at your help center, and the support bot answers from those articles instead of guessing.'
  },
  {
    id: 'gpt',
    name: 'GPT-6.2 Sol',
    provider: 'openai',
    latency: 880,
    rate: 25,
    tokens: 74,
    tokensPerSecond: 92,
    answer:
      'Think of it as search by similarity. Text, images or tickets are turned into embeddings, and the database returns the nearest neighbors in milliseconds. It is what lets an assistant answer from your own docs rather than guessing.\n\nExample: a new bug report arrives, and it instantly surfaces the three past tickets that look most alike.'
  },
  {
    id: 'gemini',
    name: 'Gemini 4 Neon',
    provider: 'google',
    latency: 420,
    rate: 32,
    tokens: 79,
    tokensPerSecond: 138,
    answer:
      'It is a database built for “find things like this”. Instead of matching keywords it compares embeddings, numeric fingerprints of meaning. For a product team that means better search, recommendations and grounded AI answers over the same data.\n\nExample: “more like this” on a product page, powered by the same index as site search.'
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
      '向量数据库存的不是原文，而是“意思”。每段内容会被转换成一串数字，含义相近的内容在空间里离得更近。所以用户问“怎么退钱”，系统也能找到写着“退款政策”的那篇文档。\n\n举个例子：把帮助中心接进来，客服机器人就能照着这些文章回答，而不是瞎猜。'
  },
  {
    id: 'qwen',
    name: 'Qwen3.8 Max',
    provider: 'qwen',
    latency: 540,
    rate: 30,
    tokens: 128,
    tokensPerSecond: 96,
    answer:
      '可以把它理解成“按相似度搜索”的数据库。文本、图片或工单先变成向量，查询时直接返回最接近的几条结果，速度在毫秒级。AI 助手能基于你自己的资料作答，靠的就是它。\n\n举个例子：新来一个缺陷报告，马上就能找出三条最相似的历史工单。'
  },
  {
    id: 'kimi',
    name: 'Kimi K3.1 Pro',
    provider: 'moonshot',
    latency: 920,
    rate: 26,
    tokens: 151,
    tokensPerSecond: 81,
    answer:
      '一句话：它专门回答“有没有和这个类似的”。它不做关键词匹配，而是比较向量，也就是内容含义的数字指纹。对产品来说，搜索、推荐和有据可查的 AI 回答都可以建立在同一份数据上。\n\n举个例子：商品页上的“猜你喜欢”，和站内搜索可以共用同一份索引。'
  }
]

export const modelCompareDemo: Record<DemoLocale, ModelCompareCopy> = {
  en: {
    window: 'Cherry Studio — Ask three models',
    prompt: 'Explain a vector database to a product manager, with one example.',
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
    prompt: '向产品经理解释什么是向量数据库，再举一个例子。',
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
