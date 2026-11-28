// Copy for the "select text anywhere → Ask Agent" demo (Cherry Studio 2.2 selection agent windows).
// Desktop keys: selection.action.builtin.{translate,explain,summary,search,copy,ask_agent}, selection.agent.{compose_placeholder,
// char_count,line_count,saved_hint,starting,collapse,open_in_main_window}, selection.agent.capsule.{running,step,done,more,
// show_less}, selection.action.window.{pin,pinned,opacity}, selection.settings.window.auto_close.{title,description},
// agent.session.workspace_selector.no_project, agent.input.placeholder, message.tools.activity.{view,viewing,modify,modifying},
// chat.default.name, common.close.
import type { DemoLocale } from './chat'

export type AgentKind = 'reply' | 'tasks'

export interface AgentProfile {
  name: string
  avatar: string
  /** Work directory bound in the selection settings; null shows the "No work directory" label. */
  workspace: string | null
}

export interface SelectionAgentCopy {
  region: string
  hint: string
  sample: string
  autoClose: { title: string; description: string }
  menubar: { app: string; items: string[] }
  mail: {
    mailbox: string
    list: { from: string; subject: string; time: string }[]
    subject: string
    from: string
    address: string
    to: string
    time: string
    /** Selections map back to these paragraphs for the scripted answers. */
    paragraphs: string[]
    signoff: string
  }
  /** Translate, Explain and Summarize open the classic action window with these per-paragraph results. */
  results: { translate: string[]; explain: string[]; summary: string[] }
  actions: {
    translate: string
    explain: string
    summary: string
    search: string
    copy: string
    askAgent: string
    /** A custom action whose runner is an agent, so it skips the compose bar. */
    tasks: string
  }
  compose: {
    placeholder: string
    chars: string
    lines: string
    saved: string
    noWorkspace: string
    send: string
    /** What the script types into the compose bar. */
    instruction: string
  }
  window: {
    pin: string
    pinned: string
    opacity: string
    collapse: string
    close: string
    openInMain: string
    starting: string
    copy: string
    copied: string
  }
  capsule: { running: string; step: string; done: string; more: string; showLess: string; close: string }
  agents: Record<AgentKind, AgentProfile>
  /** The prompt the "Add to tasks" action expands with the selection. */
  tasksPrompt: string
  tools: { view: [done: string, live: string]; modify: [done: string, live: string]; file: string }
  replies: { title: string; intro: string; draft: string }[]
  tasks: { title: string; intro: string; items: string[] }[]
  main: { placeholder: string; model: { name: string; provider: string; providerName: string } }
}

const enParagraphs = [
  'Thanks for walking us through the 2027 renewal on Tuesday. Before procurement can sign, we need three things from you: a countersigned DPA, written confirmation that our data stays in the EU region, and a revised quote with the 12% multi-year discount we discussed.',
  'We would also like the onboarding timeline. On our side the plan is to have the first 40 seats live by March 3, with SSO configured a week before the rollout.',
  'If it is easier to talk it through, Thursday or Friday afternoon works for a 20-minute call.'
]

const zhParagraphs = [
  '感谢周二为我们讲解 2027 年的续约方案。采购签字前，我们还需要你们提供三样东西：一份已会签的 DPA、数据保留在欧盟区域的书面确认，以及按我们谈过的多年期 12% 折扣更新后的报价。',
  '另外想请你们提供上线时间表。我们这边计划在 3 月 3 日前让首批 40 个席位上线，并在上线前一周配置好 SSO。',
  '如果电话沟通更方便，周四或周五下午都可以约 20 分钟。'
]

export const selectionAgentDemo: Record<DemoLocale, SelectionAgentCopy> = {
  en: {
    region: 'Interactive demo: select text in any app and hand it to an agent',
    hint: 'Select any text in the email, or',
    sample: 'Try a sample',
    autoClose: {
      title: 'Auto Close',
      description: "Automatically close the window when it's not pinned and loses focus"
    },
    menubar: { app: 'Mail', items: ['File', 'Edit', 'View', 'Message'] },
    mail: {
      mailbox: 'Inbox',
      list: [
        { from: 'Maya Lin', subject: 'Renewal: three things before we sign', time: '9:42' },
        { from: 'Finance', subject: 'Q4 invoice approved', time: '8:15' },
        { from: 'Jordan Park', subject: 'Re: launch checklist', time: 'Mon' },
        { from: 'Calendar', subject: 'Standup moved to 10:30', time: 'Mon' }
      ],
      subject: 'Renewal: three things before we sign',
      from: 'Maya Lin',
      address: 'maya@northwind.io',
      to: 'To: Alex Chen',
      time: '9:42 AM',
      paragraphs: enParagraphs,
      signoff: 'Best,\nMaya'
    },
    results: {
      translate: zhParagraphs,
      explain: [
        'Maya is listing what blocks the signature. A DPA (data processing agreement) is the GDPR contract that covers how you handle their data; countersigned means you sign the copy they already signed. EU region means storage and processing stay in EU data centers, and the quote has to reflect the 12% discount for a multi-year term.',
        'They want a dated onboarding plan. Seats are user licenses, so 40 people need access by March 3. SSO (single sign-on) lets staff log in with company accounts, and they want it working a week early so it never blocks the rollout.',
        'An offer to replace the back-and-forth with a short call. Proposing one concrete slot on Thursday or Friday afternoon is the easiest way to accept.'
      ],
      summary: [
        'Three items before signing: a countersigned DPA, EU data-residency confirmation, and a revised quote with the 12% multi-year discount.',
        '40 seats live by March 3, with SSO ready a week earlier.',
        'Open to a 20-minute call on Thursday or Friday afternoon.'
      ]
    },
    actions: {
      translate: 'Translate',
      explain: 'Explain',
      summary: 'Summarize',
      search: 'Search',
      copy: 'Copy',
      askAgent: 'Ask Agent',
      tasks: 'Add to tasks'
    },
    compose: {
      placeholder: 'What should the agent do?',
      chars: '{n} chars',
      lines: '{n} lines',
      saved: 'Saved as a conversation',
      noWorkspace: 'No work directory',
      send: 'Send',
      instruction: 'Draft a reply confirming all three'
    },
    window: {
      pin: 'Pin',
      pinned: 'Pinned',
      opacity: 'Window Opacity',
      collapse: 'Collapse to capsule',
      close: 'Close',
      openInMain: 'Open in main window',
      starting: 'Starting {name}…',
      copy: 'Copy',
      copied: 'Copied'
    },
    capsule: {
      running: 'Running',
      step: 'Step {n}',
      done: 'Done',
      more: '+{n}',
      showLess: 'Show less',
      close: 'Close'
    },
    agents: {
      reply: { name: 'Cherry Assistant', avatar: '🍒', workspace: null },
      tasks: { name: 'Deal Desk', avatar: '💼', workspace: 'northwind-renewal' }
    },
    tasksPrompt: 'Add the action items in this text to todo.md with due dates.',
    tools: { view: ['View', 'Looking it over'], modify: ['Modify', 'Fine-tuning'], file: 'todo.md' },
    replies: [
      {
        title: "Reply to Maya's renewal asks",
        intro: 'Here is a reply that confirms all three:',
        draft:
          'Hi Maya,\n\nThanks for the quick follow-up. The countersigned DPA is attached, and I can confirm in writing that all Northwind data stays in our EU region. The revised quote with the 12% multi-year discount will reach you by Friday.\n\nBest,\nAlex'
      },
      {
        title: 'Onboarding timeline reply',
        intro: 'Here is a reply that works back from March 3:',
        draft:
          'Hi Maya,\n\nMarch 3 works for us. We will configure SSO with your IT team the week of February 24, pilot with five users on February 26, and bring all 40 seats live on March 3.\n\nBest,\nAlex'
      },
      {
        title: 'Schedule a call with Maya',
        intro: 'Here is a short reply that proposes a time:',
        draft:
          'Hi Maya,\n\nA call sounds good. Does Thursday at 3:00 PM work? I will attach the DPA and the quote to the invite so we can go through both together.\n\nBest,\nAlex'
      }
    ],
    tasks: [
      {
        title: 'Northwind renewal to-dos',
        intro: 'Added 3 tasks to todo.md:',
        items: [
          'Send the countersigned DPA · Wed',
          'Confirm EU data residency in writing · Wed',
          'Revised quote with 12% multi-year discount · Fri'
        ]
      },
      {
        title: 'Northwind onboarding to-dos',
        intro: 'Added 2 tasks to todo.md:',
        items: ['Configure SSO with Northwind IT · Feb 24', 'First 40 seats live · Mar 3']
      },
      {
        title: 'Call with Maya',
        intro: 'Added 1 task to todo.md:',
        items: ['Book a 20-minute call with Maya · Thu or Fri PM']
      }
    ],
    main: {
      placeholder: 'Type a message. Type / to search paths or commands, @ for files and sessions.',
      model: { name: 'Claude Sonnet 5.5', provider: 'anthropic', providerName: 'Anthropic' }
    }
  },
  zh: {
    region: '交互演示：在任意应用里划词，交给智能体处理',
    hint: '在邮件里随意划选文字，或',
    sample: '试试示例',
    autoClose: { title: '自动关闭', description: '当窗口未置顶且失去焦点时，将自动关闭该窗口' },
    menubar: { app: '邮件', items: ['文件', '编辑', '显示', '邮件'] },
    mail: {
      mailbox: '收件箱',
      list: [
        { from: '林雅', subject: '续约：签约前需要的三件事', time: '9:42' },
        { from: '财务部', subject: 'Q4 发票已审批', time: '8:15' },
        { from: '周朗', subject: '回复：上线检查清单', time: '周一' },
        { from: '日历', subject: '站会改到 10:30', time: '周一' }
      ],
      subject: '续约：签约前需要的三件事',
      from: '林雅',
      address: 'maya@northwind.io',
      to: '收件人：陈晨',
      time: '上午 9:42',
      paragraphs: zhParagraphs,
      signoff: '祝好，\n林雅'
    },
    results: {
      translate: enParagraphs,
      explain: [
        '对方在列出签约前的阻碍。DPA（数据处理协议）是 GDPR 下约定如何处理其数据的合同，“会签”指你在他们已签好的版本上签字。欧盟区域指数据的存储和处理都留在欧盟机房，报价则要体现多年期合同的 12% 折扣。',
        '对方需要一份带日期的上线计划。“席位”就是用户授权，3 月 3 日前要有 40 人可用。SSO（单点登录）让员工用公司账号登录，他们希望提前一周就绪，避免拖累上线。',
        '对方提议用一个简短电话代替来回邮件。直接给出周四或周五下午的一个具体时间，是最省事的答复。'
      ],
      summary: [
        '签约前需三项：已会签的 DPA、欧盟数据驻留确认、含多年期 12% 折扣的新报价。',
        '3 月 3 日前上线 40 个席位，SSO 提前一周就绪。',
        '周四或周五下午可通 20 分钟电话。'
      ]
    },
    actions: {
      translate: '翻译',
      explain: '解释',
      summary: '总结',
      search: '搜索',
      copy: '复制',
      askAgent: '问智能体',
      tasks: '加入待办'
    },
    compose: {
      placeholder: '让智能体做什么？',
      chars: '{n} 字',
      lines: '{n} 行',
      saved: '会保存为会话',
      noWorkspace: '不使用工作目录',
      send: '发送',
      instruction: '起草一封回复，逐项确认'
    },
    window: {
      pin: '置顶',
      pinned: '已置顶',
      opacity: '窗口透明度',
      collapse: '收起为胶囊',
      close: '关闭',
      openInMain: '在主窗口打开',
      starting: '正在启动 {name}…',
      copy: '复制',
      copied: '已复制'
    },
    capsule: {
      running: '运行中',
      step: '第 {n} 步',
      done: '完成',
      more: '+{n}',
      showLess: '收起',
      close: '关闭'
    },
    agents: {
      reply: { name: 'Cherry 助手', avatar: '🍒', workspace: null },
      tasks: { name: '交易助理', avatar: '💼', workspace: 'northwind-renewal' }
    },
    tasksPrompt: '把这段文字里的待办事项连同截止日期加入 todo.md。',
    tools: { view: ['查看', '仔细查看'], modify: ['修改', '用心修改'], file: 'todo.md' },
    replies: [
      {
        title: '回复林雅的续约要求',
        intro: '这是一封逐项确认的回复：',
        draft:
          '林雅你好：\n\n感谢跟进。已会签的 DPA 见附件，我们书面确认 Northwind 的全部数据都保留在欧盟区域。含多年期 12% 折扣的新报价会在周五前发给你。\n\n祝好，\n陈晨'
      },
      {
        title: '上线时间表回复',
        intro: '这是一封从 3 月 3 日倒排时间的回复：',
        draft:
          '林雅你好：\n\n3 月 3 日没问题。我们会在 2 月 24 日那周和你们的 IT 一起配置 SSO，2 月 26 日先请 5 位同事试用，3 月 3 日让 40 个席位全部上线。\n\n祝好，\n陈晨'
      },
      {
        title: '约林雅通话',
        intro: '这是一封约定时间的简短回复：',
        draft:
          '林雅你好：\n\n可以电话聊。周四下午 3 点方便吗？我会在邀请里附上 DPA 和报价，我们一起过一遍。\n\n祝好，\n陈晨'
      }
    ],
    tasks: [
      {
        title: 'Northwind 续约待办',
        intro: '已在 todo.md 中添加 3 项待办：',
        items: ['发送已会签的 DPA · 周三', '书面确认欧盟数据驻留 · 周三', '更新报价（多年期 12% 折扣）· 周五']
      },
      {
        title: 'Northwind 上线待办',
        intro: '已在 todo.md 中添加 2 项待办：',
        items: ['与 Northwind IT 配置 SSO · 2 月 24 日', '首批 40 个席位上线 · 3 月 3 日']
      },
      {
        title: '与林雅通话',
        intro: '已在 todo.md 中添加 1 项待办：',
        items: ['约林雅通话 20 分钟 · 周四或周五下午']
      }
    ],
    main: {
      placeholder: '输入消息，输入 / 搜索路径或命令，输入 @ 引用文件或会话',
      model: { name: 'DeepSeek V4 Pro', provider: 'deepseek', providerName: '深度求索' }
    }
  }
}
