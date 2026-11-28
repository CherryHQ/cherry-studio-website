// Scripted Scheduled Tasks page and notification center (Cherry Studio 2.2: ScheduledTasksPage, ScheduledTaskSidebar,
// TaskRunSummaryLine, NotificationCenter, UserAccountPanel). Labels come from the desktop locale keys scheduledTasks.*,
// settings.scheduledTasks.title, agent.tasks.{status,runSummary,schedule.summary,pause,delete}.*,
// notification.center.*, settings.{notification,appearance}.title, settings.theme.system, common.* and chat.user.
import type { DemoLocale } from './chat'

export type TaskGroup = 'active' | 'paused' | 'completed'

/** One rendered block of an agent reply: a paragraph, a section heading or a bullet with an optional bold lead. */
export type ReplyBlock = { p: string } | { h: string } | { li: string; lead?: string }

export interface TaskRun {
  id: string
  /** formatTaskCardTime of the run start, as listed in the run picker and the run summary. */
  at: string
  seconds: number
  prompt: string
  reply: ReplyBlock[]
}

export interface DemoTask {
  id: string
  name: string
  agent: { name: string; emoji: string }
  /** getTriggerSummary output. */
  schedule: string
  group: TaskGroup
  missed?: boolean
  /** Newest first. */
  runs: TaskRun[]
}

export type DemoNotification =
  | { id: string; kind: 'task'; taskId: string; runId: string; time: string }
  | { id: string; kind: 'reply'; agent: { name: string; emoji: string }; preview: string; time: string }
  | { id: string; kind: 'announcement'; title: string; content: string; time: string }

export interface TasksDemoCopy {
  region: string
  /** settings.scheduledTasks.title: the tab and toolbar title. */
  title: string
  add: string
  groups: Record<TaskGroup, string>
  missedTime: string
  noConversation: string
  select: string
  conversation: string
  latest: string
  more: string
  menu: { pause: string; resume: string; runNow: string; edit: string; delete: string }
  runSummary: { running: string; completed: string }
  /** Simulated wall clock in the tab bar, before and after the scheduled minute. */
  clock: { day: string; before: string; after: string }
  /** Live steps of the morning run while it works. */
  steps: string[]
  account: { label: string; user: string; notifications: string; appearance: string; theme: string; settings: string }
  center: { title: string; markAllRead: string; dismiss: string; unread: string; completed: string; official: string }
  /** The run the script fires at 09:00, prepended to the first task's history. */
  todayRun: TaskRun
  todayNotice: { id: string; time: string }
  tasks: DemoTask[]
  notifications: DemoNotification[]
}

const RESEARCH_EMOJI = '🔭'
const OPS_EMOJI = '📊'

export const tasksDemo: Record<DemoLocale, TasksDemoCopy> = {
  en: {
    region: 'Scheduled tasks and notification center demo',
    title: 'Scheduled Tasks',
    add: 'Add scheduled task',
    groups: { active: 'Active', paused: 'Paused', completed: 'Completed' },
    missedTime: 'Missed scheduled time',
    noConversation: 'No available conversation for this selection.',
    select: 'Select a task to view its conversation.',
    conversation: 'Execution conversation',
    latest: 'Open latest conversation',
    more: 'More',
    menu: { pause: 'Pause', resume: 'Continue', runNow: 'Run now', edit: 'Edit', delete: 'Delete' },
    runSummary: { running: 'Running', completed: 'Last run succeeded · {time}' },
    clock: { day: 'Thu', before: '08:59', after: '09:00' },
    steps: ['Reading 12 new emails', "Checking today's calendar", 'Scanning 18 feed updates', 'Drafting the briefing'],
    account: {
      label: 'Account menu',
      user: 'User',
      notifications: 'Notifications',
      appearance: 'Appearance',
      theme: 'System',
      settings: 'Settings'
    },
    center: {
      title: 'Notification center',
      markAllRead: 'Mark all as read',
      dismiss: 'Delete this notification',
      unread: 'Unread',
      completed: 'Completed',
      official: 'Official'
    },
    todayRun: {
      id: 'morning-1127',
      at: '11/27, 09:00',
      seconds: 38,
      prompt:
        'Scan my inbox, calendar and the feeds I follow. Brief me in two minutes: what changed overnight, what needs a decision today, and what can wait.',
      reply: [
        { p: 'Good morning. Two things need you before lunch; everything else is on track.' },
        { h: 'Needs a decision today' },
        {
          lead: 'Acme renewal',
          li: 'Legal sent the MSA back with one change: the liability cap goes from 12 to 18 months of fees. Reply by 17:00 to keep the Dec 1 start.'
        },
        {
          lead: 'Pricing page',
          li: 'The design review moved from 10:30 to 11:00. Lena needs your call on the annual discount, 15% or 20%.'
        },
        { h: 'Overnight' },
        {
          lead: 'Support',
          li: '23 new tickets, 9 about the Windows installer, all on 2.1.4. The fix ships in 2.2; a pinned reply is drafted.'
        },
        {
          lead: 'Northwind',
          li: 'Launched scheduled agents on their Pro plan ($24/mo). No local models or notification center yet.'
        },
        { p: 'Can wait: 3 newsletters and 2 webinar invites, moved to Later.' }
      ]
    },
    todayNotice: { id: 'notice-morning-1127', time: '9:00 AM' },
    tasks: [
      {
        id: 'morning',
        name: 'Morning briefing',
        agent: { name: 'Research Agent', emoji: RESEARCH_EMOJI },
        schedule: 'Daily at 09:00',
        group: 'active',
        runs: [
          {
            id: 'morning-1126',
            at: '11/26, 09:00',
            seconds: 41,
            prompt:
              'Scan my inbox, calendar and the feeds I follow. Brief me in two minutes: what changed overnight, what needs a decision today, and what can wait.',
            reply: [
              { p: 'A quiet night. Two things worth knowing:' },
              {
                lead: 'Contoso',
                li: 'Cut API prices 30% on their mid tier. Our Pro plan is now 8% more per seat.'
              },
              { lead: 'Calendar', li: 'Board prep moved to Thursday 14:00; the deck draft is due Wednesday night.' },
              { p: 'Nothing urgent in the inbox.' }
            ]
          }
        ]
      },
      {
        id: 'competitors',
        name: 'Competitor watch',
        agent: { name: 'Research Agent', emoji: RESEARCH_EMOJI },
        schedule: 'Every Monday at 10:00',
        group: 'active',
        runs: [
          {
            id: 'competitors-1124',
            at: '11/24, 10:00',
            seconds: 52,
            prompt:
              'Check the changelogs, pricing pages and launch posts of Northwind, Contoso and Fabrikam. Report only what changed since last Monday, and why it matters to us.',
            reply: [
              { p: 'Three changes since last week, one worth acting on.' },
              { lead: 'Northwind', li: 'Added scheduled agents to Pro. It lands right on our 2.2 launch.' },
              {
                lead: 'Contoso',
                li: 'Raised the free tier to 500 messages a day. Expect more trial users comparing plans.'
              },
              { lead: 'Fabrikam', li: 'No product changes; hiring four enterprise sellers in Europe.' },
              { p: "Suggested: publish a comparison page before Thursday's launch post." }
            ]
          }
        ]
      },
      {
        id: 'weekly',
        name: 'Weekly report',
        agent: { name: 'Ops Agent', emoji: OPS_EMOJI },
        schedule: 'Every Friday at 17:00',
        group: 'active',
        runs: [
          {
            id: 'weekly-1121',
            at: '11/21, 17:00',
            seconds: 46,
            prompt:
              "Pull this week's merged PRs, closed issues and the release board. Write the Friday update for the team: shipped, at risk, next week.",
            reply: [
              { h: 'Shipped' },
              { lead: 'Notification center', li: 'Task results and announcements in one drawer (14 PRs).' },
              { lead: 'Run history', li: 'Paginated per task, with missed runs listed under Paused.' },
              { h: 'At risk' },
              {
                lead: 'Windows installer',
                li: 'The signing certificate renewal is pending and blocks 2.2 if not done by Tuesday.'
              },
              { h: 'Next week' },
              { li: 'Release candidate on Monday, launch post on Thursday.' }
            ]
          }
        ]
      },
      {
        id: 'invoices',
        name: 'Invoice reminders',
        agent: { name: 'Ops Agent', emoji: OPS_EMOJI },
        schedule: 'Weekdays at 08:30',
        group: 'paused',
        missed: true,
        runs: []
      },
      {
        id: 'launch',
        name: 'Launch-day checklist',
        agent: { name: 'Ops Agent', emoji: OPS_EMOJI },
        schedule: '11/20/2026, 6:00:00 PM',
        group: 'completed',
        runs: [
          {
            id: 'launch-1120',
            at: '11/20, 18:00',
            seconds: 29,
            prompt: 'At 18:00 on launch day, verify the release: download links, checksums, docs and the status page.',
            reply: [
              { p: 'All checks passed.' },
              { lead: 'Downloads', li: '6 of 6 installers resolve on GitHub and the mirror; checksums match.' },
              { lead: 'Docs', li: 'The release pages are live in both languages.' },
              { lead: 'Status page', li: 'All systems operational.' }
            ]
          }
        ]
      }
    ],
    notifications: [
      {
        id: 'notice-reply',
        kind: 'reply',
        agent: { name: 'Research Agent', emoji: RESEARCH_EMOJI },
        preview:
          'Contoso is the cheapest over three years, but only Fabrikam offers an EU data region, so I ranked it first.',
        time: '11/26/26, 4:12 PM'
      },
      {
        id: 'notice-release',
        kind: 'announcement',
        title: 'Cherry Studio 2.2 is here',
        content:
          'Scheduled tasks get their own page with run history and missed-run management. Task results and announcements now arrive here.',
        time: '11/25/26, 10:00 AM'
      },
      {
        id: 'notice-competitors',
        kind: 'task',
        taskId: 'competitors',
        runId: 'competitors-1124',
        time: '11/24/26, 10:00 AM'
      },
      { id: 'notice-weekly', kind: 'task', taskId: 'weekly', runId: 'weekly-1121', time: '11/21/26, 5:00 PM' }
    ]
  },
  zh: {
    region: '定时任务与通知中心演示',
    title: '定时任务',
    add: '添加定时任务',
    groups: { active: '活跃', paused: '已暂停', completed: '已完成' },
    missedTime: '已错过执行时间',
    noConversation: '当前选择没有可用对话。',
    select: '选择任务，查看关联对话。',
    conversation: '执行对话',
    latest: '查看最新对话',
    more: '更多',
    menu: { pause: '暂停', resume: '继续', runNow: '立即执行', edit: '编辑', delete: '删除' },
    runSummary: { running: '运行中', completed: '上次运行成功 · {time}' },
    clock: { day: '周四', before: '08:59', after: '09:00' },
    steps: ['读取 12 封新邮件', '查看今天的日程', '扫描 18 条订阅更新', '撰写简报'],
    account: {
      label: '账户菜单',
      user: '用户',
      notifications: '通知',
      appearance: '外观',
      theme: '系统',
      settings: '设置'
    },
    center: {
      title: '通知中心',
      markAllRead: '全部标为已读',
      dismiss: '删除该通知',
      unread: '未读',
      completed: '已完成',
      official: '官方'
    },
    todayRun: {
      id: 'morning-1127',
      at: '11/27 09:00',
      seconds: 38,
      prompt:
        '看一下我的邮箱、日程和订阅的资讯，用两分钟给我一份简报：昨夜有什么变化、今天要拍板什么、哪些可以先放着。',
      reply: [
        { p: '早上好。午饭前有两件事需要你决定，其余都在正轨上。' },
        { h: '今天需要决定' },
        {
          lead: 'Acme 续约',
          li: '法务退回了 MSA，只改了一处：责任上限从 12 个月费用提高到 18 个月。17:00 前回复才能保住 12 月 1 日开始。'
        },
        { lead: '定价页', li: '设计评审从 10:30 改到 11:00。Lena 需要你定年付折扣：15% 还是 20%。' },
        { h: '昨夜动态' },
        {
          lead: '客服',
          li: '新增 23 个工单，其中 9 个是 Windows 安装问题，都在 2.1.4 上。修复随 2.2 发布，置顶回复已起草。'
        },
        { lead: 'Northwind', li: '在 Pro 套餐（$24/月）上线了定时智能体，暂不支持本地模型和通知中心。' },
        { p: '可以稍后：3 份周刊和 2 个网络研讨会邀请，已移到「稍后」。' }
      ]
    },
    todayNotice: { id: 'notice-morning-1127', time: '09:00' },
    tasks: [
      {
        id: 'morning',
        name: '晨间简报',
        agent: { name: '研究助手', emoji: RESEARCH_EMOJI },
        schedule: '每天 09:00',
        group: 'active',
        runs: [
          {
            id: 'morning-1126',
            at: '11/26 09:00',
            seconds: 41,
            prompt:
              '看一下我的邮箱、日程和订阅的资讯，用两分钟给我一份简报：昨夜有什么变化、今天要拍板什么、哪些可以先放着。',
            reply: [
              { p: '昨夜比较平静，有两件事值得知道：' },
              { lead: 'Contoso', li: '中档 API 降价 30%，我们的 Pro 套餐每席位贵了 8%。' },
              { lead: '日程', li: '董事会准备会改到周四 14:00，材料初稿周三晚上要交。' },
              { p: '邮箱里没有紧急事项。' }
            ]
          }
        ]
      },
      {
        id: 'competitors',
        name: '竞品观察',
        agent: { name: '研究助手', emoji: RESEARCH_EMOJI },
        schedule: '每周一 10:00',
        group: 'active',
        runs: [
          {
            id: 'competitors-1124',
            at: '11/24 10:00',
            seconds: 52,
            prompt:
              '查看 Northwind、Contoso 和 Fabrikam 的更新日志、定价页和发布文章。只汇报自上周一以来的变化，以及对我们的影响。',
            reply: [
              { p: '上周以来有三处变化，其中一处值得跟进。' },
              { lead: 'Northwind', li: 'Pro 套餐新增定时智能体，正好撞上我们的 2.2 发布。' },
              { lead: 'Contoso', li: '免费额度提高到每天 500 条消息，预计会有更多试用用户来对比。' },
              { lead: 'Fabrikam', li: '产品无变化；正在欧洲招聘四名企业销售。' },
              { p: '建议：在周四发布文章前上线一篇对比页。' }
            ]
          }
        ]
      },
      {
        id: 'weekly',
        name: '周报',
        agent: { name: '运营助手', emoji: OPS_EMOJI },
        schedule: '每周五 17:00',
        group: 'active',
        runs: [
          {
            id: 'weekly-1121',
            at: '11/21 17:00',
            seconds: 46,
            prompt: '汇总本周合并的 PR、关闭的 Issue 和发布看板，写一份给团队的周五更新：已发布、有风险、下周计划。',
            reply: [
              { h: '已发布' },
              { lead: '通知中心', li: '任务结果与官方公告汇集到同一个抽屉（14 个 PR）。' },
              { lead: '运行历史', li: '按任务分页，错过的运行归入「已暂停」。' },
              { h: '有风险' },
              { lead: 'Windows 安装包', li: '签名证书续期尚未完成，周二前不解决会阻塞 2.2。' },
              { h: '下周计划' },
              { li: '周一出候选版本，周四发布文章。' }
            ]
          }
        ]
      },
      {
        id: 'invoices',
        name: '发票提醒',
        agent: { name: '运营助手', emoji: OPS_EMOJI },
        schedule: '工作日 08:30',
        group: 'paused',
        missed: true,
        runs: []
      },
      {
        id: 'launch',
        name: '发布日检查',
        agent: { name: '运营助手', emoji: OPS_EMOJI },
        schedule: '2026/11/20 18:00:00',
        group: 'completed',
        runs: [
          {
            id: 'launch-1120',
            at: '11/20 18:00',
            seconds: 29,
            prompt: '发布日 18:00 检查本次发布：下载链接、校验和、文档和状态页。',
            reply: [
              { p: '全部检查通过。' },
              { lead: '下载', li: '6 个安装包在 GitHub 和镜像上均可下载，校验和一致。' },
              { lead: '文档', li: '中英文发布页面均已上线。' },
              { lead: '状态页', li: '所有服务运行正常。' }
            ]
          }
        ]
      }
    ],
    notifications: [
      {
        id: 'notice-reply',
        kind: 'reply',
        agent: { name: '研究助手', emoji: RESEARCH_EMOJI },
        preview: 'Contoso 三年总成本最低，但只有 Fabrikam 提供欧盟数据区域，所以我把它排在第一。',
        time: '2026/11/26 16:12'
      },
      {
        id: 'notice-release',
        kind: 'announcement',
        title: 'Cherry Studio 2.2 正式发布',
        content: '定时任务有了独立页面，支持运行历史和错过任务的管理。任务结果和官方公告现在都会汇集到这里。',
        time: '2026/11/25 10:00'
      },
      {
        id: 'notice-competitors',
        kind: 'task',
        taskId: 'competitors',
        runId: 'competitors-1124',
        time: '2026/11/24 10:00'
      },
      { id: 'notice-weekly', kind: 'task', taskId: 'weekly', runId: 'weekly-1121', time: '2026/11/21 17:00' }
    ]
  }
}
