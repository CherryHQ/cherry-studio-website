// Scripted agent session for the agents section demo. Tool labels, permission modes and CLI names
// come from the desktop locale keys (message.tools.*, agent.settings.tooling.permissionMode.*, code.cli_tools.*).
import type { DemoLocale } from './chat'

export type PermissionMode = 'default' | 'plan' | 'acceptEdits' | 'auto' | 'bypassPermissions'
export type TodoStatus = 'pending' | 'in_progress' | 'completed'

export interface AgentDemoCopy {
  window: string
  region: string
  agentName: string
  workspace: string
  permissionLabel: string
  modes: { mode: PermissionMode; title: string; description: string }[]
  placeholder: string
  task: string
  intro: string
  todoLabel: string
  todos: string[]
  todoStatus: Record<TodoStatus, string>
  bashLabel: string
  editLabel: string
  groupLive: { checks: string; edit: string }
  groupDone: string
  question: {
    title: string
    answered: string
    header: string
    text: string
    progress: string
    close: string
    options: { label: string; description: string }[]
  }
  summary: [commit: string, review: string]
  cliTitle: string
  cliSubtitle: string
}

/** Terminal and diff content is the same in both languages. */
export const agentScript = {
  model: { name: 'Claude Sonnet 4.6', provider: 'anthropic' },
  testCommand: 'pnpm vitest run src/utils/date.test.ts',
  testFail: [
    ' RUN  v3.2.4 ~/web-app',
    '',
    ' ❯ src/utils/date.test.ts (12 tests | 1 failed) 18ms',
    '   × formatDate > keeps the calendar day on the 1st',
    "     → expected '2026-02-28' to be '2026-03-01'",
    '',
    ' Test Files  1 failed (1)',
    '      Tests  1 failed | 11 passed (12)'
  ],
  testPass: [
    ' ✓ src/utils/date.test.ts (12 tests) 15ms',
    '',
    ' Test Files  1 passed (1)',
    '      Tests  12 passed (12)'
  ],
  editFile: 'src/utils/date.ts',
  diff: [
    { kind: 'hunk', text: '@@ -8,9 +8,9 @@ export function formatDate(iso: string) {' },
    { kind: 'same', text: '  const date = new Date(iso)' },
    { kind: 'del', text: '  const year = date.getFullYear()' },
    { kind: 'del', text: '  const month = date.getMonth() + 1' },
    { kind: 'del', text: '  const day = date.getDate()' },
    { kind: 'add', text: '  const year = date.getUTCFullYear()' },
    { kind: 'add', text: '  const month = date.getUTCMonth() + 1' },
    { kind: 'add', text: '  const day = date.getUTCDate()' },
    { kind: 'same', text: "  return [year, pad(month), pad(day)].join('-')" }
  ] as { kind: 'hunk' | 'same' | 'del' | 'add'; text: string }[],
  commitCommand: 'git commit -am "fix(date): read UTC fields in formatDate"',
  commitOutput: [
    '[fix/date-rollover 3f2a9c1] fix(date): read UTC fields in formatDate',
    ' 1 file changed, 3 insertions(+), 3 deletions(-)'
  ]
}

/** Display order of desktop CLI_TOOLS (src/renderer/components/icons/CliIcon.tsx). */
export const codeClis: { id: string; name: string }[] = [
  { id: 'claude-code', name: 'Claude Code' },
  { id: 'openai-codex', name: 'OpenAI Codex' },
  { id: 'antigravity-cli', name: 'Antigravity CLI' },
  { id: 'gemini-cli', name: 'Gemini CLI' },
  { id: 'opencode', name: 'OpenCode' },
  { id: 'qwen-code', name: 'Qwen Code' },
  { id: 'kimi-code', name: 'Kimi Code' },
  { id: 'qoder-cli', name: 'Qoder CLI' },
  { id: 'github-copilot-cli', name: 'GitHub Copilot CLI' },
  { id: 'pi', name: 'Pi' },
  { id: 'hermes', name: 'Hermes Agent' },
  { id: 'openclaw', name: 'OpenClaw' },
  { id: 'deepseek-harness', name: 'DeepSeek Harness' },
  { id: 'minimax-code', name: 'MiniMax Code' }
]

export const agentDemo: Record<DemoLocale, AgentDemoCopy> = {
  en: {
    window: 'Cherry Studio — Agents',
    region: 'Agent session demo',
    agentName: 'Frontend Agent',
    workspace: '~/web-app',
    permissionLabel: 'Permission mode',
    modes: [
      { mode: 'default', title: 'Ask Before Acting', description: 'Asks before editing files or running commands.' },
      {
        mode: 'plan',
        title: 'Plan Only',
        description: 'Plans without editing files. Only read-only or vetted commands run.'
      },
      { mode: 'acceptEdits', title: 'Auto-accept Edits', description: 'Edits files freely. Asks before commands.' },
      {
        mode: 'auto',
        title: 'Approve for Me',
        description: 'Runs without routine prompts. A safety check blocks risky actions.'
      },
      {
        mode: 'bypassPermissions',
        title: 'Full Access',
        description: 'Skips permission checks. Can delete files and use the network.'
      }
    ],
    placeholder: 'Type a message. Type / to search paths or commands, @ for files and sessions.',
    task: 'The date test fails on the first of every month. Find the cause and fix it.',
    intro: "I'll reproduce the failure first, then fix it and re-run the suite.",
    todoLabel: 'Todo Write',
    todos: ['Reproduce the failing date test', 'Fix month rollover in formatDate', 'Re-run the date tests'],
    todoStatus: { pending: 'Pending', in_progress: 'Getting started', completed: 'All wrapped up' },
    bashLabel: 'Run task',
    editLabel: 'Edit',
    groupLive: { checks: 'project checks', edit: 'Fine-tuning date.ts' },
    groupDone: '3 tool calls',
    question: {
      title: 'Questions from Agent',
      answered: 'answered',
      header: 'Commit',
      text: 'All 12 tests pass. Should I commit the fix?',
      progress: '1 of 1',
      close: 'Close',
      options: [
        { label: 'Commit the fix', description: 'Commit to the current branch with a conventional message' },
        { label: 'Leave it uncommitted', description: "I'll review the diff myself first" }
      ]
    },
    summary: [
      'Fixed and committed. formatDate read local date fields, so on a machine west of UTC midnight on March 1 became February 28. It now reads the UTC fields, and all 12 date tests pass.',
      'Fixed. formatDate read local date fields, so on a machine west of UTC midnight on March 1 became February 28. It now reads the UTC fields, and all 12 date tests pass. The change is left uncommitted for your review.'
    ],
    cliTitle: '{count} coding CLIs, one launcher',
    cliSubtitle: "Code Mate launches each one in your project folder; most can run on providers you've already set up."
  },
  zh: {
    window: 'Cherry Studio — 智能体',
    region: '智能体会话演示',
    agentName: '前端智能体',
    workspace: '~/web-app',
    permissionLabel: '权限模式',
    modes: [
      { mode: 'default', title: '逐次确认', description: '编辑文件或执行命令前询问。' },
      { mode: 'plan', title: '仅规划', description: '只规划、不编辑文件，仅执行只读或审查通过的命令。' },
      { mode: 'acceptEdits', title: '自动接受编辑', description: '可自由编辑文件，执行命令前询问。' },
      { mode: 'auto', title: '智能批准', description: '无需逐次批准，安全检查会拦截风险操作。' },
      { mode: 'bypassPermissions', title: '完全访问', description: '跳过权限检查，可删除文件、访问网络。' }
    ],
    placeholder: '输入消息，输入 / 搜索路径或命令，输入 @ 引用文件或会话',
    task: '每个月 1 号日期测试都会挂，帮我找到原因并修好。',
    intro: '我先复现失败的用例，再修复并重跑测试。',
    todoLabel: '待办写入',
    todos: ['复现失败的日期测试', '修复 formatDate 的跨月问题', '重跑日期相关测试'],
    todoStatus: { pending: '等待中', in_progress: '开始处理', completed: '任务已顺利完成' },
    bashLabel: '执行任务',
    editLabel: '编辑',
    groupLive: { checks: '项目检查', edit: '用心修改 date.ts' },
    groupDone: '3 个工具调用',
    question: {
      title: '来自智能体的问题',
      answered: '已回答',
      header: '提交',
      text: '12 个测试全部通过，要提交这次修复吗？',
      progress: '1 / 1',
      close: '关闭',
      options: [
        { label: '提交修复', description: '用规范的提交信息提交到当前分支' },
        { label: '先不提交', description: '我想先自己看一遍改动' }
      ]
    },
    summary: [
      '已修复并提交。formatDate 读取的是本地时间字段，在 UTC 以西的机器上，3 月 1 日零点会变成 2 月 28 日。现在改为读取 UTC 字段，12 个日期测试全部通过。',
      '已修复。formatDate 读取的是本地时间字段，在 UTC 以西的机器上，3 月 1 日零点会变成 2 月 28 日。现在改为读取 UTC 字段，12 个日期测试全部通过。改动暂未提交，留给你检查。'
    ],
    cliTitle: '{count} 款编程 CLI，一处启动',
    cliSubtitle: '编码搭档会在你的项目目录中启动它们，多数 CLI 可直接使用你已配置好的服务商。'
  }
}
