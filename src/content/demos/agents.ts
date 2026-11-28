// Labels every agent demo shares, from the desktop locale keys (agent.*, chat.input.*, message.*).
import type { DemoLocale } from './chat'

export interface AgentDemoCopy {
  window: string
  workspace: string
  effort: { title: string; value: string }
  placeholder: string
  placeholderBusy: string
  processing: string
  processed: string
  seconds: string
  running: string
}

/** The model shown in the agent session bar; the Chinese site shows a domestic one. */
export const agentScript = {
  model: {
    en: { name: 'Claude Sonnet 5.5', provider: 'anthropic', providerName: 'Anthropic' },
    zh: { name: 'Kimi K3.1 Pro', provider: 'moonshot', providerName: '月之暗面' }
  } satisfies Record<DemoLocale, { name: string; provider: string; providerName: string }>
}

export const agentDemo: Record<DemoLocale, AgentDemoCopy> = {
  en: {
    window: 'Cherry Studio — Agents',
    workspace: 'web-app',
    effort: { title: 'Response settings', value: 'High' },
    placeholder: 'Type a message. Type / to search paths or commands, @ for files and sessions.',
    placeholderBusy: 'Agent is working — Return queues a follow-up, ⌘Return steers it now.',
    processing: 'Processing',
    processed: 'Processed',
    seconds: '{s}s',
    running: 'Getting started'
  },
  zh: {
    window: 'Cherry Studio — 智能体',
    workspace: 'web-app',
    effort: { title: '响应设置', value: '高' },
    placeholder: '输入消息，输入 / 搜索路径或命令，输入 @ 引用文件或会话',
    placeholderBusy: '智能体运行中 — Return 排队发送，⌘Return 立即引导',
    processing: '正在处理',
    processed: '已处理',
    seconds: '{s} 秒',
    running: '开始处理'
  }
}
