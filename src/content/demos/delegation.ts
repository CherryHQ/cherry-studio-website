// Scripted local-agent delegation for the hero demo: one Agent hands parts of a task to local CLI Agents in the same
// workspace (CherryHQ/cherry-studio#21221: AgentDelegationCard, PermissionRequestComposer, ReportArtifacts). Labels
// come from the desktop locale keys message.tools.*, chat.message.flow.status.*, agent.tasks.logs.*,
// agent.toolPermission.*, local_agents.*, chat.profile_pane.tabs.outputs and chat.input.tools.*.
import type { DemoLocale } from './chat'

export type DelegationStatus = 'pending' | 'running' | 'awaiting' | 'completed' | 'cancelled'

export interface DelegationCopy {
  region: string
  addAgent: string
  agentName: string
  /** Title of the Agent's own session in the sidebar. */
  session: string
  task: string
  intro: string
  summary: string
  /** Delivered-result label: "From {agent} / {session}". */
  from: string
  /** Per delegation target, in delegationScript.targets order: its new session and the result it reports back. */
  targets: { session: string; result: string }[]
  /** Earlier sessions under some local Agents in the sidebar, keyed by roster id. */
  history: Record<string, string[]>
  status: Record<DelegationStatus, string>
  open: string
  cancel: string
  approval: { title: string; source: string; command: string; allowOnce: string; alwaysAllow: string; deny: string }
  outputs: string
  /** File type labels shown under each output, in delegationScript.outputs order. */
  outputTypes: string[]
  openPreview: string
  openWith: string
  preview: string
  close: string
}

/**
 * Every local Agent runtime of #21221 (packages/agent-runtime-* and the ACP presets), with its logo asset from
 * packages/ui/icons/general. The first three take part in the delegation.
 */
export const delegationScript = {
  workspace: 'pomodoro',
  workspacePath: '~/code/pomodoro',
  targets: [
    { id: 'claude-code', name: 'Claude Code' },
    { id: 'openai-codex', name: 'Codex' },
    { id: 'grok-build-cli', name: 'Grok Build' }
  ],
  roster: [
    { id: 'claude-code', name: 'Claude Code' },
    { id: 'openai-codex', name: 'Codex' },
    { id: 'grok-build-cli', name: 'Grok Build' },
    { id: 'cursor-cli', name: 'Cursor' },
    { id: 'antigravity-cli', name: 'Antigravity' },
    { id: 'open-code', name: 'OpenCode' },
    { id: 'pi-cli', name: 'Pi' },
    { id: 'omp-cli', name: 'Oh My Pi' },
    { id: 'qwen-code', name: 'Qwen Code' },
    { id: 'kimi-cli', name: 'Kimi' },
    { id: 'qoder-cli', name: 'Qoder' },
    { id: 'github-copilot-cli', name: 'GitHub Copilot' },
    { id: 'amp-cli', name: 'Amp' },
    { id: 'cline-cli', name: 'Cline' },
    { id: 'codebuddy-code-cli', name: 'Codebuddy Code' },
    { id: 'factory-droid-cli', name: 'Factory Droid' },
    { id: 'goose-cli', name: 'goose' },
    { id: 'junie-cli', name: 'Junie' },
    { id: 'kiro-cli', name: 'Kiro' },
    { id: 'trae-cli', name: 'TRAE' },
    { id: 'mistral-vibe-cli', name: 'Mistral Vibe' },
    { id: 'poolside-cli', name: 'Poolside' },
    { id: 'deepseek-harness-cli', name: 'DeepSeek Harness' },
    { id: 'minimax-code', name: 'MiniMax Code' },
    { id: 'glm-acp-agent-cli', name: 'GLM Agent' },
    { id: 'openclaw', name: 'OpenClaw' },
    { id: 'hermes', name: 'Hermes' },
    { id: 'deepagents-cli', name: 'DeepAgents' },
    { id: 'dimcode-cli', name: 'DimAgent' },
    { id: 'muse-code-cli', name: 'Muse Code' },
    { id: 'snow-cli', name: 'Snow CLI' },
    { id: 'zcode-cli', name: 'ZCode' },
    { id: 'kilo-cli', name: 'Kilo' },
    { id: 'auggie-cli', name: 'Auggie' },
    { id: 'devin-cli', name: 'Devin' },
    { id: 'cortex-code-cli', name: 'Cortex Code' },
    { id: 'command-code-cli', name: 'Command Code' }
  ],
  approvalCommand: 'pnpm create vite pomodoro --template vanilla-ts',
  approvalTarget: 'pnpm create',
  /** report_artifacts paths, in display order; the first is the previewable web page. */
  outputs: ['pomodoro/index.html', 'pomodoro/src/timer.test.ts', 'pomodoro/README.md']
}

export const delegationDemo: Record<DemoLocale, DelegationCopy> = {
  en: {
    region: 'Local agent delegation demo',
    addAgent: 'Add Agent',
    agentName: 'Release Agent',
    session: 'Pomodoro web app',
    task: 'Build a Pomodoro timer web app. Claude Code writes the app, Codex adds tests, Grok Build writes the README.',
    intro:
      'Splitting this across three local agents in pomodoro: Claude Code on the app, Codex on tests, Grok Build on docs.',
    summary:
      'The Pomodoro app is ready: a 25/5 focus timer with session dots, 12 passing tests and a README. Preview it below.',
    from: 'From {agent} / {session}',
    targets: [
      {
        session: 'Timer app',
        result: 'Built index.html and src/timer.ts: focus and break modes, ring progress, 4-session dots.'
      },
      {
        session: 'Timer tests',
        result: 'Added src/timer.test.ts with 12 tests for countdown, mode switch and reset. All pass.'
      },
      { session: 'README', result: 'Wrote README.md with setup, keyboard shortcuts and a screenshot.' }
    ],
    history: {
      'claude-code': ['Refactor auth hooks'],
      'cursor-cli': ['Fix flaky e2e login'],
      'pi-cli': ['Release notes draft'],
      'qwen-code': ['Translate settings page']
    },
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
    },
    outputs: 'Outputs',
    outputTypes: ['HTML webpage', 'TS file', 'MD document'],
    openPreview: 'Open preview',
    openWith: 'Open with',
    preview: 'Preview',
    close: 'Close'
  },
  zh: {
    region: '本地 Agent 委派演示',
    addAgent: '添加智能体',
    agentName: '发布助手',
    session: '番茄钟网页应用',
    task: '做一个番茄钟网页应用：Claude Code 写应用，Codex 补测试，Grok Build 写 README。',
    intro: '交给 pomodoro 项目里的三个本地 Agent：Claude Code 写应用，Codex 写测试，Grok Build 写文档。',
    summary: '番茄钟做好了：25/5 专注计时、轮次圆点、12 个通过的测试和一份 README。下面可以直接预览。',
    from: '来自 {agent} / {session}',
    targets: [
      { session: '计时应用', result: '写好了 index.html 和 src/timer.ts：专注/休息两种模式、环形进度、4 轮圆点。' },
      { session: '计时测试', result: '新增 src/timer.test.ts，12 个测试覆盖倒计时、模式切换和重置，全部通过。' },
      { session: 'README', result: '写好了 README.md：安装步骤、快捷键和截图。' }
    ],
    history: {
      'claude-code': ['重构登录 hooks'],
      'cursor-cli': ['修复不稳定的登录 e2e'],
      'pi-cli': ['起草发布说明'],
      'qwen-code': ['翻译设置页']
    },
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
    },
    outputs: '产物',
    outputTypes: ['HTML 网页', 'TS 文件', 'MD 文档'],
    openPreview: '打开预览',
    openWith: '打开方式',
    preview: '预览',
    close: '关闭'
  }
}
