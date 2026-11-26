// Scripted agent session for the agents section demo. Every UI label comes from the desktop locale keys
// (agent.*, message.tools.*, agent.askUserQuestion.*, agent.settings.tooling.permissionMode.*, code.cli_tools.*).
import type { DemoLocale } from './chat'

/** Modes listed by the composer's Permission Mode panel; Plan Only is a separate Shift+Tab command. */
export type PermissionMode = 'default' | 'acceptEdits' | 'auto' | 'bypassPermissions'
export type TodoStatus = 'pending' | 'in_progress' | 'completed'

export interface AgentDemoCopy {
  window: string
  region: string
  agentName: string
  workspace: string
  showSidebar: string
  filesTab: string
  detailsTab: string
  traceTab: string
  greeting: string
  placeholder: string
  placeholderBusy: string
  newTask: string
  skills: string
  quickPanel: string
  effort: { title: string; value: string }
  send: string
  pause: string
  permission: {
    title: string
    close: string
    modes: { mode: PermissionMode; title: string; description: string; warning?: string }[]
    confirm: { title: string; description: string; scope: string; protections: string; cancel: string; ok: string }
  }
  task: string
  intro: string
  todos: string[]
  todoStatus: Record<TodoStatus, string>
  stepProgress: string
  processing: string
  processed: string
  seconds: string
  activity: {
    check: [done: string, live: string]
    modify: [done: string, live: string]
    write: [done: string, live: string]
    projectChecks: string
    codeFiles: string
    taskList: string
    projectChanges: string
  }
  running: string
  sections: { command: string; output: string }
  question: {
    title: string
    answered: string
    header: string
    text: string
    progress: string
    previous: string
    submit: string
    close: string
    custom: string
    skip: string
    options: { label: string; description: string }[]
  }
  summary: [commit: string, review: string]
  cliTitle: string
  cliSubtitle: string
}

/** Terminal and diff content is the same in both languages. */
export const agentScript = {
  model: { name: 'Claude Sonnet 4.6', provider: 'anthropic', providerName: 'Anthropic' },
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
    { kind: 'del', text: '  const year = date.getFullYear()' },
    { kind: 'del', text: '  const month = date.getMonth() + 1' },
    { kind: 'del', text: '  const day = date.getDate()' },
    { kind: 'add', text: '  const year = date.getUTCFullYear()' },
    { kind: 'add', text: '  const month = date.getUTCMonth() + 1' },
    { kind: 'add', text: '  const day = date.getUTCDate()' }
  ] as { kind: 'del' | 'add'; text: string }[],
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
    workspace: 'web-app',
    showSidebar: 'Show Sidebar',
    filesTab: 'Files',
    detailsTab: 'Session details',
    traceTab: 'Call Chain',
    greeting: 'What should we work on today?',
    placeholder: 'Type a message. Type / to search paths or commands, @ for files and sessions.',
    placeholderBusy: 'Agent is working — Return queues a follow-up, ⌘Return steers it now.',
    newTask: 'New task',
    skills: 'Skills',
    quickPanel: 'Input Quick Panel',
    effort: { title: 'Response settings', value: 'High' },
    send: 'Send',
    pause: 'Pause',
    permission: {
      title: 'Permission Mode',
      close: 'Esc',
      modes: [
        { mode: 'default', title: 'Ask Before Acting', description: 'Asks before editing files or running commands.' },
        { mode: 'acceptEdits', title: 'Auto-accept Edits', description: 'Edits files freely. Asks before commands.' },
        {
          mode: 'auto',
          title: 'Approve for Me',
          description: 'Runs without routine prompts. A safety check blocks risky actions.',
          warning: 'Needs a model that supports it; others may ignore it or keep asking.'
        },
        {
          mode: 'bypassPermissions',
          title: 'Full Access',
          description: 'Skips permission checks. Can delete files and use the network.',
          warning:
            'Use with caution — most tools, including global package installs, run without approval, even unattended. Explicit safety blocks still apply.'
        }
      ],
      confirm: {
        title: 'Enable Full Access?',
        description:
          'This applies to every folder and resource in the selected scope, including folders connected later. Most tools will run without asking first.',
        scope: 'Agent',
        protections:
          'Global package installs can run without asking, including unattended. Disabled tools, protected SQLite access, and direct mise mutations remain blocked. You can switch back to another mode at any time.',
        cancel: 'Cancel',
        ok: 'Enable Full Access'
      }
    },
    task: 'The date test fails on the first of every month. Find the cause and fix it.',
    intro: "I'll reproduce the failure first, then fix it and re-run the suite.",
    todos: ['Reproduce the failing date test', 'Fix month rollover in formatDate', 'Re-run the date tests'],
    todoStatus: { pending: 'Pending', in_progress: 'Getting started', completed: 'All wrapped up' },
    stepProgress: 'Step {current}/{total}',
    processing: 'Processing',
    processed: 'Processed',
    seconds: '{s}s',
    activity: {
      check: ['Check', 'Going through each one'],
      modify: ['Modify', 'Fine-tuning'],
      write: ['Write', 'Writing it out'],
      projectChecks: 'project checks',
      codeFiles: 'code files',
      taskList: 'task list',
      projectChanges: 'project changes'
    },
    running: 'Getting started',
    sections: { command: 'Command', output: 'Output' },
    question: {
      title: 'Questions from Agent',
      answered: 'answered',
      header: 'Commit',
      text: 'All 12 tests pass. Should I commit the fix?',
      progress: '1 of 1',
      previous: 'Previous',
      submit: 'Submit',
      close: 'Close',
      custom: 'Enter your answer...',
      skip: 'Skip',
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
    workspace: 'web-app',
    showSidebar: '显示侧边栏',
    filesTab: '文件',
    detailsTab: '会话详情',
    traceTab: '调用链',
    greeting: '今天想做点什么？',
    placeholder: '输入消息，输入 / 搜索路径或命令，输入 @ 引用文件或会话',
    placeholderBusy: '智能体运行中 — Return 排队发送，⌘Return 立即引导',
    newTask: '新任务',
    skills: '技能',
    quickPanel: '输入快捷面板',
    effort: { title: '响应设置', value: '高' },
    send: '发送',
    pause: '暂停',
    permission: {
      title: '权限模式',
      close: 'Esc',
      modes: [
        { mode: 'default', title: '逐次确认', description: '编辑文件或执行命令前询问。' },
        { mode: 'acceptEdits', title: '自动接受编辑', description: '可自由编辑文件，执行命令前询问。' },
        {
          mode: 'auto',
          title: '智能批准',
          description: '无需逐次批准，安全检查会拦截风险操作。',
          warning: '需要模型支持；部分模型可能忽略此模式或仍逐次询问。'
        },
        {
          mode: 'bypassPermissions',
          title: '完全访问',
          description: '跳过权限检查，可删除文件、访问网络。',
          warning:
            '请谨慎使用：大多数工具（包括全局软件包安装）无需审批即可执行，即使无人值守也不例外。明确的安全阻止规则仍然生效。'
        }
      ],
      confirm: {
        title: '启用完全访问？',
        description:
          '此设置将应用于所选范围内的每个文件夹和资源，包括之后连接的文件夹。大多数工具将不再事先询问而直接运行。',
        scope: '智能体',
        protections:
          '全局软件包安装无需询问即可执行，包括无人值守时。已禁用的工具、对受保护 SQLite 的访问和直接修改 mise 的操作仍会被阻止。你随时可以切换回其他模式。',
        cancel: '取消',
        ok: '启用完全访问'
      }
    },
    task: '每个月 1 号日期测试都会挂，帮我找到原因并修好。',
    intro: '我先复现失败的用例，再修复并重跑测试。',
    todos: ['复现失败的日期测试', '修复 formatDate 的跨月问题', '重跑日期相关测试'],
    todoStatus: { pending: '等待中', in_progress: '开始处理', completed: '任务已顺利完成' },
    stepProgress: '步骤 {current}/{total}',
    processing: '正在处理',
    processed: '已处理',
    seconds: '{s} 秒',
    activity: {
      check: ['检查', '逐项检查'],
      modify: ['修改', '用心修改'],
      write: ['写入', '认真写入'],
      projectChecks: '项目检查',
      codeFiles: '代码文件',
      taskList: '任务清单',
      projectChanges: '项目改动'
    },
    running: '开始处理',
    sections: { command: '命令', output: '输出' },
    question: {
      title: '来自智能体的问题',
      answered: '已回答',
      header: '提交',
      text: '12 个测试全部通过，要提交这次修复吗？',
      progress: '1 / 1',
      previous: '上一个',
      submit: '提交',
      close: '关闭',
      custom: '输入您的回答...',
      skip: '跳过',
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
