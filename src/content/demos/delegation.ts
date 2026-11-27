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
  /**
   * Per delegation target, in delegationScript.targets order: its new session, the live steps shown while it runs,
   * the change summary once done, and the result it reports back.
   */
  targets: { session: string; steps: string[]; stat: string; result: string }[]
  /** Earlier sessions under some local Agents in the sidebar, keyed by roster id. */
  history: Record<string, string[]>
  status: Record<DelegationStatus, string>
  cancel: string
  approval: { title: string; source: string; command: string; allowOnce: string; alwaysAllow: string; deny: string }
  outputs: string
  /** File type labels shown under each output, in delegationScript.outputs order. */
  outputTypes: string[]
  openPreview: string
  openWith: string
  preview: string
  close: string
  /** Heading of the tool group listing the delegations. */
  delegated: string
  /** The reported launch page, previewed live. */
  launch: { badge: string; title: string; subtitle: string; primary: string; secondary: string }
}

/**
 * Every local Agent runtime of #21221 (packages/agent-runtime-* and the ACP presets), with its logo asset from
 * packages/ui/icons/general. The first three take part in the delegation.
 */
export const delegationScript = {
  workspace: 'launch',
  workspacePath: '~/code/launch',
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
  approvalCommand: 'pnpm add @paper-design/shaders-react',
  approvalTarget: 'pnpm add',
  /** report_artifacts paths, in display order; the first is the previewable web page. */
  outputs: ['launch/index.html', 'launch/tests/smoke.spec.ts', 'launch/RELEASE_NOTES.md']
}

export const delegationDemo: Record<DemoLocale, DelegationCopy> = {
  en: {
    region: 'Local agent delegation demo',
    addAgent: 'Add Agent',
    agentName: 'Release Agent',
    session: 'v2.3 launch page',
    task: 'Ship a launch page for v2.3 with a liquid-metal logo. Claude Code builds the page, Codex adds a smoke test, Grok Build drafts the release notes.',
    intro:
      'Delegating to three local agents in launch: Claude Code on the page, Codex on the smoke test, Grok Build on the release notes.',
    summary:
      'The v2.3 launch page is ready: a liquid-metal logo built with Paper Shaders, a passing smoke test and release notes. Preview it on the right.',
    from: 'From {agent} / {session}',
    targets: [
      {
        session: 'Launch page',
        steps: [
          'Scaffolding the Vite app',
          'Adding Paper Shaders',
          'Shaping the liquid-metal logo',
          'Writing the hero copy'
        ],
        stat: '4 files · +268',
        result: 'Built index.html with a liquid-metal Cherry logo (Paper Shaders), the hero copy and download buttons.'
      },
      {
        session: 'Smoke test',
        steps: ['Reading index.html', 'Writing smoke.spec.ts', 'Running Playwright'],
        stat: '1 file · 3 tests pass',
        result: 'Added tests/smoke.spec.ts: the page loads, the logo canvas renders and both buttons link out. 3 pass.'
      },
      {
        session: 'Release notes',
        steps: ['Reading the v2.3 changelog', 'Writing RELEASE_NOTES.md'],
        stat: '1 file · +64',
        result: 'Drafted RELEASE_NOTES.md: local agents, delegation and approvals, plus upgrade notes.'
      }
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
    close: 'Close',
    delegated: 'Delegated to {count} local agents',
    launch: {
      badge: 'v2.3 · Local agents',
      title: 'Every agent. One workspace.',
      subtitle: 'Claude Code, Codex, Grok Build and 30+ local agents, working side by side in Cherry Studio.',
      primary: 'Download',
      secondary: 'Release notes'
    }
  },
  zh: {
    region: '本地 Agent 委派演示',
    addAgent: '添加智能体',
    agentName: '发布助手',
    session: 'v2.3 发布页',
    task: '做一个 v2.3 发布页，主视觉用液态金属 logo：Claude Code 做页面，Codex 补冒烟测试，Grok Build 起草发布说明。',
    intro: '委派给 launch 项目里的三个本地 Agent：Claude Code 做页面，Codex 写冒烟测试，Grok Build 写发布说明。',
    summary: 'v2.3 发布页做好了：用 Paper Shaders 做的液态金属 logo、通过的冒烟测试和发布说明。右侧直接预览。',
    from: '来自 {agent} / {session}',
    targets: [
      {
        session: '发布页',
        steps: ['初始化 Vite 项目', '引入 Paper Shaders', '塑形液态金属 logo', '撰写主视觉文案'],
        stat: '4 个文件 · +268',
        result: '写好了 index.html：液态金属 Cherry logo（Paper Shaders）、主视觉文案和下载按钮。'
      },
      {
        session: '冒烟测试',
        steps: ['阅读 index.html', '编写 smoke.spec.ts', '运行 Playwright'],
        stat: '1 个文件 · 3 个测试通过',
        result: '新增 tests/smoke.spec.ts：页面能打开、logo 画布正常渲染、两个按钮链接正确，3 个全部通过。'
      },
      {
        session: '发布说明',
        steps: ['阅读 v2.3 更新日志', '编写 RELEASE_NOTES.md'],
        stat: '1 个文件 · +64',
        result: '起草了 RELEASE_NOTES.md：本地 Agent、委派与审批，以及升级说明。'
      }
    ],
    history: {
      'claude-code': ['重构登录 hooks'],
      'cursor-cli': ['修复不稳定的登录 e2e'],
      'pi-cli': ['起草发布说明'],
      'qwen-code': ['翻译设置页']
    },
    status: { pending: '等待中', running: '运行中', awaiting: '待输入', completed: '已完成', cancelled: '已取消' },
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
    close: '关闭',
    delegated: '已委派给 {count} 个本地 Agent',
    launch: {
      badge: 'v2.3 · 本地 Agent',
      title: '所有 Agent，一个工作台。',
      subtitle: 'Claude Code、Codex、Grok Build 等 30 多个本地 Agent，在 Cherry Studio 里并肩工作。',
      primary: '下载',
      secondary: '发布说明'
    }
  }
}
