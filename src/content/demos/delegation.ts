// Scripted local-agent delegation for the hero demo: one Agent hands parts of a task to local CLI Agents in the same
// workspace (PR #21221, AgentDelegationCard + PermissionRequestComposer). Labels come from the desktop locale keys
// message.tools.*, chat.message.flow.status.*, agent.tasks.logs.*, agent.toolPermission.* and local_agents.*.
import type { DemoLocale } from './chat'

export type DelegationStatus = 'pending' | 'running' | 'awaiting' | 'completed' | 'cancelled'

export interface DelegationCopy {
  region: string
  agentName: string
  task: string
  intro: string
  summary: string
  status: Record<DelegationStatus, string>
  open: string
  cancel: string
  approval: { title: string; source: string; command: string; allowOnce: string; alwaysAllow: string; deny: string }
}

/** Shared across languages: the workspace, the delegated local Agents and the command Claude Code asks to run. */
export const delegationScript = {
  workspace: 'web-app',
  workspacePath: '~/code/web-app',
  targets: [
    { id: 'claude-code', name: 'Claude Code' },
    { id: 'openai-codex', name: 'Codex' },
    { id: 'opencode', name: 'OpenCode' }
  ],
  approvalCommand: 'pnpm add next-themes',
  approvalTarget: 'pnpm add'
}

export const delegationDemo: Record<DemoLocale, DelegationCopy> = {
  en: {
    region: 'Local agent delegation demo',
    agentName: 'Release Agent',
    task: 'Ship dark mode today. Claude Code builds the toggle, Codex writes the tests, OpenCode updates the docs.',
    intro:
      'Handing this to three local agents in web-app: Claude Code on the toggle, Codex on tests, OpenCode on the docs.',
    summary:
      'Dark mode is ready to ship. Claude Code added the theme toggle, Codex added 14 passing tests and OpenCode updated docs/theming.md. Open any session to review its changes.',
    status: {
      pending: 'Pending',
      running: 'Running',
      awaiting: 'Awaiting input',
      completed: 'Completed',
      cancelled: 'Cancelled'
    },
    open: 'Open session',
    cancel: 'Cancel',
    approval: {
      title: 'Approval required',
      source: 'From',
      command: 'Command',
      allowOnce: 'Allow once',
      alwaysAllow: 'Always allow: {target}',
      deny: 'Deny'
    }
  },
  zh: {
    region: '本地 Agent 委派演示',
    agentName: '发布助手',
    task: '今天上线深色模式：Claude Code 做切换开关，Codex 补测试，OpenCode 更新文档。',
    intro: '交给 web-app 里的三个本地 Agent：Claude Code 做开关，Codex 写测试，OpenCode 更新文档。',
    summary:
      '深色模式可以上线了。Claude Code 加上了主题切换，Codex 新增 14 个通过的测试，OpenCode 更新了 docs/theming.md。打开任一会话即可查看改动。',
    status: { pending: '等待中', running: '运行中', awaiting: '待输入', completed: '已完成', cancelled: '已取消' },
    open: '打开会话',
    cancel: '取消',
    approval: {
      title: '需要你的批准',
      source: '来自',
      command: '命令',
      allowOnce: '允许一次',
      alwaysAllow: '始终允许：{target}',
      deny: '拒绝'
    }
  }
}
