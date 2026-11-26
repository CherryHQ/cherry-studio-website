// Scripted conversations for the home hero chat demo. Labels mirror the desktop renderer's en-us / zh-cn locales.
export type DemoLocale = 'en' | 'zh'

export type ChatTool = 'web' | 'knowledge' | 'mcp'

export type ChatPanelItemId = 'new' | 'attachment' | ChatTool | 'prompts' | 'clear'

export interface ChatScenario {
  id: string
  /** Topic row in the conversation list and the tab title. */
  topic: string
  tool: ChatTool
  /** Search query, or the knowledge base name inserted as a composer token. */
  query: string
  toolResult: string
  model: { name: string; provider: string; providerName: string }
  prompt: string
  thinking: string[]
  answer: string
}

export interface ChatDemoCopy {
  window: string
  assistant: string
  addAssistant: string
  section: string
  greeting: string
  placeholder: string
  disclaimer: string
  panelItems: { id: ChatPanelItemId; label: string }[]
  panelHints: { close: string; select: string; confirm: string }
  thinking: string
  reasoned: string
  processing: string
  processed: string
  seconds: (value: number) => string
  searching: string
  mcpRunning: string
  mcpDone: string
  effort: string
  scenarios: ChatScenario[]
}

export const chatDemo: Record<DemoLocale, ChatDemoCopy> = {
  en: {
    window: 'Cherry Studio',
    assistant: 'Cherie',
    addAssistant: 'Add Assistant',
    section: 'Assistant',
    greeting: 'What should we talk about today?',
    placeholder: 'Type a message. Type / for tools and actions, @ to reference topics.',
    disclaimer: 'AI-generated content, for reference only',
    panelItems: [
      { id: 'new', label: 'New Chat' },
      { id: 'attachment', label: 'Upload attachment' },
      { id: 'web', label: 'Web Search' },
      { id: 'knowledge', label: 'Knowledge Base' },
      { id: 'mcp', label: 'MCP' },
      { id: 'prompts', label: 'Prompts' },
      { id: 'clear', label: 'Clear Context' }
    ],
    panelHints: { close: 'Close', select: 'Select', confirm: 'Confirm' },
    thinking: 'Let me think this through',
    reasoned: 'Deep reasoning',
    processing: 'Processing',
    processed: 'Processed',
    seconds: (value) => `${value}s`,
    searching: 'Searching...',
    mcpRunning: 'Getting started',
    mcpDone: 'All wrapped up',
    effort: 'Medium',
    scenarios: [
      {
        id: 'trip',
        topic: 'Kyoto trip plan',
        tool: 'web',
        query: 'Kyoto early December itinerary',
        toolResult: '4 search result(s)',
        model: { name: 'Claude Sonnet 4.6', provider: 'anthropic', providerName: 'Anthropic' },
        prompt: 'Plan 3 days in Kyoto in early December, under $600',
        thinking: [
          'They want a budget plan for Kyoto in early December.',
          'Late maple season, so temples will be busy after 9am.',
          'Group each day by neighborhood to keep transit cheap.'
        ],
        answer:
          'Here is a plan that stays under $600 with a mid-range hotel:\n\n• Day 1 · Higashiyama — Kiyomizu-dera at opening, Sannenzaka, Gion at dusk.\n• Day 2 · Arashiyama — bamboo grove before 8am, Tenryū-ji, Ōkōchi Sansō.\n• Day 3 · Fushimi Inari at sunrise, Nishiki Market lunch, depart from Kyoto Station.\n\nBudget: about $320 lodging, $140 food, $60 transit and $50 entry fees.'
      },
      {
        id: 'spec',
        topic: 'Q3 spec changes',
        tool: 'knowledge',
        query: 'Product specs',
        toolResult: '5 search result(s)',
        model: { name: 'GPT-5.6', provider: 'openai', providerName: 'OpenAI' },
        prompt: 'What changed in the Q3 product spec?',
        thinking: [
          'Compare the v3 spec against the roadmap notes.',
          'Pull decisions from the September meeting.',
          'Keep it to changes that affect the release date.'
        ],
        answer:
          'Three changes affect the Q3 release:\n\n• Offline mode moved from “nice to have” to launch scope (spec-v3, §4).\n• Sync now ships behind a flag; full rollout is October (meeting 09/12).\n• The settings redesign slipped to Q4 to free two engineers (roadmap.md).\n\nNet effect: the release date holds, with sync limited to beta users.'
      },
      {
        id: 'todos',
        topic: 'TODOs by owner',
        tool: 'mcp',
        query: 'filesystem : search_files',
        toolResult: '',
        model: { name: 'Gemini 3.5 Flash', provider: 'google', providerName: 'Gemini' },
        prompt: 'Find TODOs in my project and group them by owner',
        thinking: [
          'Search the repo for TODO and FIXME markers.',
          'Read the author tag next to each marker.',
          'Group by owner, then by directory.'
        ],
        answer:
          'Found 23 TODOs across 11 files:\n\n• @mina · 9 — mostly retry logic in src/api.\n• @leo · 8 — accessibility fixes in src/ui.\n• unassigned · 6 — release scripts; worth a triage pass.\n\nWant me to open an issue for the unassigned ones?'
      }
    ]
  },
  zh: {
    window: 'Cherry Studio',
    assistant: 'Cherry 助手',
    addAssistant: '添加助手',
    section: '助手',
    greeting: '今天想聊点什么？',
    placeholder: '输入消息，输入 / 选择工具或操作，输入 @ 引用话题',
    disclaimer: '内容由 AI 生成，仅供参考',
    panelItems: [
      { id: 'new', label: '新对话' },
      { id: 'attachment', label: '上传附件' },
      { id: 'web', label: '网络搜索' },
      { id: 'knowledge', label: '知识库' },
      { id: 'mcp', label: 'MCP' },
      { id: 'prompts', label: '提示词' },
      { id: 'clear', label: '清除上下文' }
    ],
    panelHints: { close: '关闭', select: '选择', confirm: '确认' },
    thinking: '让我认真想一想',
    reasoned: '已深度思考',
    processing: '正在处理',
    processed: '已处理',
    seconds: (value) => `${value} 秒`,
    searching: '正在搜索...',
    mcpRunning: '开始处理',
    mcpDone: '任务已顺利完成',
    effort: '中',
    scenarios: [
      {
        id: 'trip',
        topic: '京都旅行计划',
        tool: 'web',
        query: '京都 12 月初 三日游 攻略',
        toolResult: '4 个搜索结果',
        model: { name: 'DeepSeek V4 Pro', provider: 'deepseek', providerName: '深度求索' },
        prompt: '12 月初去京都玩 3 天，预算 4000 元以内，帮我排个行程',
        thinking: [
          '用户要一份 12 月初京都 3 天的省钱行程。',
          '正值红叶季尾声，热门寺院 9 点后人会很多。',
          '按街区安排每天的路线，可以省下交通费。'
        ],
        answer:
          '这份行程含中档酒店，总花费约 3800 元：\n\n• 第 1 天 · 东山：开门即到清水寺，逛三年坂，傍晚去祇园。\n• 第 2 天 · 岚山：8 点前进竹林，再去天龙寺和大河内山庄。\n• 第 3 天 · 清晨登伏见稻荷，午饭在锦市场，从京都站返程。\n\n预算：住宿约 2000 元，餐饮 900 元，交通 400 元，门票 300 元。'
      },
      {
        id: 'spec',
        topic: 'Q3 需求变化',
        tool: 'knowledge',
        query: '产品需求',
        toolResult: '5 个搜索结果',
        model: { name: 'Qwen3.7 Max', provider: 'qwen', providerName: '千问 AI 平台' },
        prompt: 'Q3 需求文档有哪些变化？',
        thinking: ['对比 v3 需求文档和路线图。', '找出 9 月会议上的决定。', '只保留影响发布时间的变化。'],
        answer:
          '有三处变化会影响 Q3 发布：\n\n• 离线模式从「可选」改为首发必做（需求文档 v3 第 4 节）。\n• 同步功能先以开关形式上线，10 月全量（0912 会议纪要）。\n• 设置页改版推迟到 Q4，腾出两名工程师（roadmap.md）。\n\n结论：发布时间不变，同步功能先面向 Beta 用户。'
      },
      {
        id: 'todos',
        topic: '按负责人整理 TODO',
        tool: 'mcp',
        query: 'filesystem : search_files',
        toolResult: '',
        model: { name: 'Kimi K3', provider: 'moonshot', providerName: '月之暗面' },
        prompt: '找出项目里的 TODO，按负责人分组',
        thinking: ['在仓库里搜索 TODO 和 FIXME 标记。', '读取每个标记旁的负责人。', '先按负责人分组，再按目录分组。'],
        answer:
          '在 11 个文件里找到 23 个 TODO：\n\n• @mina · 9 个，大多是 src/api 的重试逻辑。\n• @leo · 8 个，src/ui 的无障碍问题。\n• 未指派 · 6 个，集中在发布脚本，建议过一遍。\n\n需要我为未指派的 TODO 创建 issue 吗？'
      }
    ]
  }
}
