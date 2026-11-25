// Scripted conversations for the home hero chat demo. Each scenario plays one tool from the desktop composer.
export type DemoLocale = 'en' | 'zh'

export type ChatTool = 'web' | 'knowledge' | 'mcp'

export interface ChatScenario {
  id: string
  chip: string
  tool: ChatTool
  toolLabel: string
  toolRunning: string
  toolDone: string
  sources: string[]
  model: { name: string; provider: string }
  prompt: string
  thinking: string[]
  answer: string
}

export interface ChatDemoCopy {
  window: string
  greeting: string
  placeholder: string
  topics: string[]
  assistant: string
  panelTitle: string
  panelItems: { id: ChatTool | 'files' | 'phrases' | 'mention'; label: string; hint: string }[]
  thinking: string
  thought: string
  scenarios: ChatScenario[]
}

export const chatDemo: Record<DemoLocale, ChatDemoCopy> = {
  en: {
    window: 'Cherry Studio — Default Assistant',
    greeting: 'What should we work on?',
    placeholder: 'Message, / for tools, # for knowledge',
    topics: ['Kyoto trip', 'Q3 spec review', 'Refactor TODOs', 'Weekly notes'],
    assistant: 'Default Assistant',
    panelTitle: 'Tools',
    panelItems: [
      { id: 'web', label: 'Web search', hint: '20 engines' },
      { id: 'knowledge', label: 'Knowledge base', hint: '#' },
      { id: 'mcp', label: 'MCP servers', hint: '12 built in' },
      { id: 'files', label: 'Attach files', hint: 'PDF, Office, images' },
      { id: 'mention', label: 'Mention models', hint: '@' },
      { id: 'phrases', label: 'Quick phrases', hint: '' }
    ],
    thinking: 'Thinking',
    thought: 'Thought for 3 seconds',
    scenarios: [
      {
        id: 'trip',
        chip: 'Plan a Kyoto trip',
        tool: 'web',
        toolLabel: 'Web search',
        toolRunning: 'Searching the web',
        toolDone: 'Read 4 sources',
        sources: ['japan-guide.com', 'kyoto.travel', 'booking.com', 'reddit.com'],
        model: { name: 'Claude Sonnet 4.6', provider: 'anthropic' },
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
        chip: 'Summarize our spec',
        tool: 'knowledge',
        toolLabel: 'Knowledge base',
        toolRunning: 'Searching “Product specs”',
        toolDone: 'Recalled 5 passages',
        sources: ['spec-v3.pdf', 'roadmap.md', 'meeting-0912.docx'],
        model: { name: 'GPT-5.6', provider: 'openai' },
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
        chip: 'Group my TODOs',
        tool: 'mcp',
        toolLabel: 'MCP · filesystem',
        toolRunning: 'Calling search_files',
        toolDone: 'Scanned 214 files',
        sources: ['src/api', 'src/ui', 'scripts'],
        model: { name: 'Gemini 3.5 Flash', provider: 'google' },
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
    window: 'Cherry Studio — 默认助手',
    greeting: '今天想做点什么？',
    placeholder: '输入消息，/ 调出工具，# 引用知识库',
    topics: ['京都旅行', 'Q3 需求评审', '整理 TODO', '周报'],
    assistant: '默认助手',
    panelTitle: '工具',
    panelItems: [
      { id: 'web', label: '网络搜索', hint: '20 个搜索引擎' },
      { id: 'knowledge', label: '知识库', hint: '#' },
      { id: 'mcp', label: 'MCP 服务器', hint: '内置 12 个' },
      { id: 'files', label: '上传文件', hint: 'PDF、Office、图片' },
      { id: 'mention', label: '@ 提及模型', hint: '@' },
      { id: 'phrases', label: '快捷短语', hint: '' }
    ],
    thinking: '思考中',
    thought: '已深度思考 3 秒',
    scenarios: [
      {
        id: 'trip',
        chip: '规划京都旅行',
        tool: 'web',
        toolLabel: '网络搜索',
        toolRunning: '正在搜索网页',
        toolDone: '阅读了 4 个来源',
        sources: ['japan-guide.com', 'kyoto.travel', 'ctrip.com', 'xiaohongshu.com'],
        model: { name: 'DeepSeek V4 Pro', provider: 'deepseek' },
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
        chip: '总结需求文档',
        tool: 'knowledge',
        toolLabel: '知识库',
        toolRunning: '正在检索「产品需求」',
        toolDone: '召回 5 个片段',
        sources: ['需求文档-v3.pdf', 'roadmap.md', '0912 会议纪要.docx'],
        model: { name: 'Qwen3.7 Max', provider: 'qwen' },
        prompt: 'Q3 需求文档有哪些变化？',
        thinking: ['对比 v3 需求文档和路线图。', '找出 9 月会议上的决定。', '只保留影响发布时间的变化。'],
        answer:
          '有三处变化会影响 Q3 发布：\n\n• 离线模式从「可选」改为首发必做（需求文档 v3 第 4 节）。\n• 同步功能先以开关形式上线，10 月全量（0912 会议纪要）。\n• 设置页改版推迟到 Q4，腾出两名工程师（roadmap.md）。\n\n结论：发布时间不变，同步功能先面向 Beta 用户。'
      },
      {
        id: 'todos',
        chip: '整理项目 TODO',
        tool: 'mcp',
        toolLabel: 'MCP · filesystem',
        toolRunning: '正在调用 search_files',
        toolDone: '扫描了 214 个文件',
        sources: ['src/api', 'src/ui', 'scripts'],
        model: { name: 'Kimi K3', provider: 'moonshot' },
        prompt: '找出项目里的 TODO，按负责人分组',
        thinking: ['在仓库里搜索 TODO 和 FIXME 标记。', '读取每个标记旁的负责人。', '先按负责人分组，再按目录分组。'],
        answer:
          '在 11 个文件里找到 23 个 TODO：\n\n• @mina · 9 个，大多是 src/api 的重试逻辑。\n• @leo · 8 个，src/ui 的无障碍问题。\n• 未指派 · 6 个，集中在发布脚本，建议过一遍。\n\n需要我为未指派的 TODO 创建 issue 吗？'
      }
    ]
  }
}
