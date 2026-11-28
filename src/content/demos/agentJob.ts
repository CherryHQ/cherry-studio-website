// Scripted "agent finishes the whole job" demo: plan, parallel background sub-agents, then a previewable slide deck.
// Labels come from the desktop locale keys agent.right_pane.flow.* (subtasks, main_task), agent.right_pane.status.*
// (task_count, tasks_completed, task_progress_compact), agent.right_pane.info.* (plan, subagents, artifacts, context,
// context_used, finished_tasks), agent.right_pane.tabs.details, agent.right_pane.details.customize,
// code.adv.permission_modes.workspace, message.tools.activity.*, message.tools.status.running, message.tools.pending,
// common.completed, common.preview, common.close, common.back, chat.input.tools.open_preview,
// chat.input.tools.open_with, chat.input.tools.file_type.* and message.tools.placeholder.elapsed.*.
import type { DemoLocale } from './chat'

export type JobStatus = 'pending' | 'running' | 'completed'
export type JobStep = { kind: 'search' | 'fetch'; text: string }

export interface DeckCopy {
  brand: string
  /** Slide n of the viewer's pager: "{n} / {total}". */
  pager: string
  previous: string
  next: string
  cover: { kicker: string; title: string; subtitle: string; byline: string; stats: { value: string; label: string }[] }
  demand: { kicker: string; title: string; unit: string; kpis: { value: string; label: string }[]; source: string }
  chemistry: { kicker: string; title: string; segments: string[]; center: string; note: string; source: string }
  cost: { kicker: string; title: string; unit: string; threshold: string; callout: string; source: string }
  makers: { kicker: string; title: string; names: string[]; others: string; source: string }
  outlook: { kicker: string; title: string; cards: { tag: string; title: string; body: string }[]; source: string }
}

export interface AgentJobCopy {
  region: string
  agentName: string
  session: string
  task: string
  intro: string
  summary: string
  /** TodoWrite plan, in order. */
  todos: string[]
  activity: {
    modify: [done: string, live: string]
    write: [done: string, live: string]
    run: [done: string, live: string]
    search: [done: string, live: string]
    view: [done: string, live: string]
    taskList: string
    file: string
    projectTask: string
    webSearch: string
    webPage: string
  }
  subtasks: string
  taskCount: string
  tasksCompleted: string
  stepProgress: string
  status: Record<JobStatus, string>
  /** Per sub-agent, in agentJobScript.subagents order: its task title, live steps and what it reports back. */
  subagents: { title: string; steps: JobStep[]; result: string }[]
  details: {
    title: string
    customize: string
    workspace: string
    plan: string
    subagents: string
    outputs: string
    context: string
    contextUsed: string
    finished: string
  }
  elapsed: { minutes: string; seconds: string }
  outputs: string
  outputTypes: string[]
  openPreview: string
  openWith: string
  preview: string
  close: string
  back: string
  mainTask: string
  deck: DeckCopy
}

/** Figures, file names and runtime metadata are the same in both languages. */
export const agentJobScript = {
  workspace: 'ev-research',
  outputs: ['ev-battery-2026/deck.html', 'ev-battery-2026/EV-Battery-Market-2026.pptx', 'ev-battery-2026/sources.md'],
  deckFile: 'deck.html',
  writeFile: 'deck.html',
  command: 'node export-pptx.mjs deck.html',
  subagents: [
    { type: 'general-purpose', tokens: '18.4k', seconds: 41, context: 22 },
    { type: 'general-purpose', tokens: '15.9k', seconds: 34, context: 19 },
    { type: 'general-purpose', tokens: '12.7k', seconds: 47, context: 16 }
  ],
  /** Main session context in use, before and after the sub-agent results land. */
  context: [14, 31],
  demand: [
    { year: '2022', value: 550 },
    { year: '2023', value: 750 },
    { year: '2024', value: 960 },
    { year: '2025', value: 1200 },
    { year: '2026E', value: 1450 }
  ],
  chemistry: [52, 40, 8],
  cost: [
    { year: '2020', value: 140 },
    { year: '2021', value: 141 },
    { year: '2022', value: 161 },
    { year: '2023', value: 139 },
    { year: '2024', value: 115 },
    { year: '2025', value: 106 },
    { year: '2026E', value: 98 }
  ],
  makers: [37, 17, 11, 5, 4, 4]
}

export const agentJobDemo: Record<DemoLocale, AgentJobCopy> = {
  en: {
    region: 'Agent research-to-deck demo',
    agentName: 'Research Agent',
    session: 'EV battery deck',
    task: 'Research the 2026 EV battery market and turn it into a 6-slide deck.',
    intro: 'On it. Three sub-agents will research demand, chemistry and costs, and the cell makers in parallel.',
    summary:
      'Your 6-slide deck is ready: demand passes 1.4 TWh, LFP leads chemistry, pack prices dip under $100/kWh and two makers supply over half the market. Every figure is cited in sources.md.',
    todos: [
      'Research the market in parallel',
      'Merge findings and check sources',
      'Build the 6-slide deck',
      'Export to PowerPoint'
    ],
    activity: {
      modify: ['Modify', 'Fine-tuning'],
      write: ['Write', 'Writing it out'],
      run: ['Run', 'Running it'],
      search: ['Find', 'Searching around'],
      view: ['View', 'Looking it over'],
      taskList: 'task list',
      file: 'file',
      projectTask: 'project task',
      webSearch: 'web content',
      webPage: 'web page'
    },
    subtasks: 'Subtasks',
    taskCount: '{completed} / {total} complete',
    tasksCompleted: '{count} completed',
    stepProgress: 'Step {current}/{total}',
    status: { pending: 'Pending', running: 'Running', completed: 'Completed' },
    subagents: [
      {
        title: 'Size 2026 battery demand',
        steps: [
          { kind: 'search', text: 'EV battery demand GWh 2026 forecast' },
          { kind: 'fetch', text: 'iea.org · Global EV Outlook 2026' },
          { kind: 'fetch', text: 'bnef.com · Electric Vehicle Outlook' },
          { kind: 'search', text: 'EV sales 2026 China Europe US' }
        ],
        result: 'Demand reaches about 1,450 GWh in 2026, up 21% on 2025. China accounts for roughly 60%.'
      },
      {
        title: 'Compare chemistries and pack costs',
        steps: [
          { kind: 'search', text: 'LFP vs NMC share of new EV capacity 2026' },
          { kind: 'fetch', text: 'benchmarkminerals.com · Cell chemistry tracker' },
          { kind: 'fetch', text: 'bnef.com · Battery Price Survey' }
        ],
        result: 'LFP now covers 52% of new EV capacity. Average pack prices fall to about $98/kWh.'
      },
      {
        title: 'Map the top cell makers',
        steps: [
          { kind: 'search', text: 'EV battery maker market share 2026' },
          { kind: 'fetch', text: 'sneresearch.com · Global EV battery usage' },
          { kind: 'search', text: 'CATL BYD LGES capacity expansion 2026' },
          { kind: 'fetch', text: 'catl.com · Investor update' }
        ],
        result: 'CATL (37%) and BYD (17%) supply over half the market; LG Energy Solution is third at 11%.'
      }
    ],
    details: {
      title: 'Session details',
      customize: 'Customize sections',
      workspace: 'Workspace',
      plan: 'Plan',
      subagents: 'Sub-agents',
      outputs: 'Outputs',
      context: 'Context',
      contextUsed: 'Used {percent}%',
      finished: 'Finished tasks'
    },
    elapsed: { minutes: '{m}m {s}s', seconds: '{s}s' },
    outputs: 'Outputs',
    outputTypes: ['HTML webpage', 'PowerPoint presentation', 'Markdown document'],
    openPreview: 'Open preview',
    openWith: 'Open with',
    preview: 'Preview',
    close: 'Close',
    back: 'Back',
    mainTask: 'Main task',
    deck: {
      brand: 'EV Battery Market 2026',
      pager: '{n} / {total}',
      previous: 'Previous slide',
      next: 'Next slide',
      cover: {
        kicker: 'Market briefing · November 2026',
        title: 'The 2026 EV Battery Market',
        subtitle: 'Demand, chemistry, cost and the race for scale',
        byline: 'Prepared by Research Agent',
        stats: [
          { value: '1.45 TWh', label: 'demand' },
          { value: '$98', label: 'per kWh' },
          { value: '52%', label: 'LFP share' }
        ]
      },
      demand: {
        kicker: '01 · Demand',
        title: 'Battery demand passes 1.4 TWh',
        unit: 'Global EV battery demand, GWh',
        kpis: [
          { value: '+21%', label: 'year-on-year growth' },
          { value: '60%', label: 'of demand comes from China' }
        ],
        source: 'Source: IEA Global EV Outlook 2026; BNEF. E = estimate.'
      },
      chemistry: {
        kicker: '02 · Chemistry',
        title: 'LFP now powers over half of new EVs',
        segments: ['LFP', 'NMC / NCA', 'Sodium-ion & other'],
        center: 'LFP',
        note: 'Up from 31% in 2022 as cheaper, longer-lasting cells reach mass-market models.',
        source: 'Source: Benchmark Mineral Intelligence. Share of new EV battery capacity.'
      },
      cost: {
        kicker: '03 · Cost',
        title: 'Pack prices drop below $100/kWh',
        unit: 'Average battery pack price, $/kWh',
        threshold: '$100 parity line',
        callout: '−39% since the 2022 peak',
        source: 'Source: BNEF Battery Price Survey, real 2025 dollars. E = estimate.'
      },
      makers: {
        kicker: '04 · Supply',
        title: 'Two makers supply over half the market',
        names: ['CATL', 'BYD', 'LG Energy Solution', 'CALB', 'SK On', 'Panasonic'],
        others: 'Others 22%',
        source: 'Source: SNE Research. Share of EV battery installations, Jan–Sep 2026.'
      },
      outlook: {
        kicker: '05 · Outlook',
        title: 'What to watch in 2027',
        cards: [
          {
            tag: 'Chemistry',
            title: 'Sodium-ion goes mainstream',
            body: 'First entry-level EVs ship with sodium-ion packs, easing lithium exposure.'
          },
          {
            tag: 'Technology',
            title: 'Semi-solid-state scales up',
            body: 'Premium models pilot higher-density cells with faster charging.'
          },
          {
            tag: 'Policy',
            title: 'Local supply chains',
            body: 'EU and US content rules pull cell and cathode plants closer to car makers.'
          }
        ],
        source: 'Sources: IEA, BNEF, Benchmark, SNE Research. Full list in sources.md.'
      }
    }
  },
  zh: {
    region: '智能体调研并生成演示文稿演示',
    agentName: '研究助手',
    session: '电动车电池调研',
    task: '调研 2026 年电动车电池市场，并做成一份 6 页的演示文稿。',
    intro: '好的。三个子智能体会并行调研需求规模、电池路线与成本、电芯厂商格局。',
    summary:
      '6 页演示文稿已完成：需求突破 1.4 TWh，LFP 成为主流路线，电池包均价跌破 100 美元/kWh，两家厂商占据过半份额。所有数据的来源都列在 sources.md。',
    todos: ['并行调研市场', '汇总结论并核对来源', '制作 6 页演示文稿', '导出为 PowerPoint'],
    activity: {
      modify: ['修改', '用心修改'],
      write: ['写入', '认真写入'],
      run: ['执行', '认真执行'],
      search: ['查找', '耐心查找'],
      view: ['查看', '仔细查看'],
      taskList: '任务清单',
      file: '文件',
      projectTask: '项目任务',
      webSearch: '网页内容',
      webPage: '网页内容'
    },
    subtasks: '子任务',
    taskCount: '{completed} / {total} 已完成',
    tasksCompleted: '{count} 项已完成',
    stepProgress: '步骤 {current}/{total}',
    status: { pending: '等待中', running: '运行中', completed: '完成' },
    subagents: [
      {
        title: '测算 2026 年电池需求',
        steps: [
          { kind: 'search', text: '2026 电动车电池需求 GWh 预测' },
          { kind: 'fetch', text: 'iea.org · Global EV Outlook 2026' },
          { kind: 'fetch', text: 'bnef.com · Electric Vehicle Outlook' },
          { kind: 'search', text: '2026 中国 欧洲 美国 电动车销量' }
        ],
        result: '2026 年需求约 1,450 GWh，同比增长 21%，其中中国约占 60%。'
      },
      {
        title: '对比电池路线与成本',
        steps: [
          { kind: 'search', text: '2026 LFP 与三元 新增装机占比' },
          { kind: 'fetch', text: 'benchmarkminerals.com · Cell chemistry tracker' },
          { kind: 'fetch', text: 'bnef.com · Battery Price Survey' }
        ],
        result: 'LFP 已占新增装机的 52%，电池包均价降至约 98 美元/kWh。'
      },
      {
        title: '梳理头部电芯厂商',
        steps: [
          { kind: 'search', text: '2026 动力电池厂商 市场份额' },
          { kind: 'fetch', text: 'sneresearch.com · Global EV battery usage' },
          { kind: 'search', text: '宁德时代 比亚迪 LG 新能源 2026 扩产' },
          { kind: 'fetch', text: 'catl.com · 投资者交流' }
        ],
        result: '宁德时代（37%）与比亚迪（17%）合计占据过半份额，LG 新能源以 11% 位列第三。'
      }
    ],
    details: {
      title: '会话详情',
      customize: '自定义分组',
      workspace: '工作区',
      plan: '计划',
      subagents: '子智能体',
      outputs: '产物',
      context: '上下文',
      contextUsed: '已使用 {percent}%',
      finished: '已结束任务'
    },
    elapsed: { minutes: '{m} 分钟 {s} 秒', seconds: '{s} 秒' },
    outputs: '产物',
    outputTypes: ['HTML 网页', 'PowerPoint 演示文稿', 'Markdown 文档'],
    openPreview: '打开预览',
    openWith: '打开方式',
    preview: '预览',
    close: '关闭',
    back: '返回',
    mainTask: '主任务',
    deck: {
      brand: '2026 电动车电池市场',
      pager: '{n} / {total}',
      previous: '上一页',
      next: '下一页',
      cover: {
        kicker: '市场简报 · 2026 年 11 月',
        title: '2026 电动车电池市场',
        subtitle: '需求、路线、成本与规模之争',
        byline: '由研究助手整理',
        stats: [
          { value: '1.45 TWh', label: '全球需求' },
          { value: '$98', label: '每 kWh' },
          { value: '52%', label: 'LFP 占比' }
        ]
      },
      demand: {
        kicker: '01 · 需求',
        title: '电池需求突破 1.4 TWh',
        unit: '全球电动车电池需求，GWh',
        kpis: [
          { value: '+21%', label: '同比增长' },
          { value: '60%', label: '需求来自中国' }
        ],
        source: '来源：IEA Global EV Outlook 2026；BNEF。E 为预估值。'
      },
      chemistry: {
        kicker: '02 · 电池路线',
        title: 'LFP 已装进过半新车',
        segments: ['LFP', '三元 NMC / NCA', '钠离子及其他'],
        center: 'LFP',
        note: '2022 年仅 31%，更便宜、更耐用的电芯正进入走量车型。',
        source: '来源：Benchmark Mineral Intelligence。新增电动车电池装机占比。'
      },
      cost: {
        kicker: '03 · 成本',
        title: '电池包均价跌破 100 美元/kWh',
        unit: '电池包平均价格，美元/kWh',
        threshold: '100 美元平价线',
        callout: '较 2022 年高点下降 39%',
        source: '来源：BNEF Battery Price Survey，2025 年不变美元。E 为预估值。'
      },
      makers: {
        kicker: '04 · 供给',
        title: '两家厂商供应过半市场',
        names: ['宁德时代', '比亚迪', 'LG 新能源', '中创新航', 'SK On', '松下'],
        others: '其他 22%',
        source: '来源：SNE Research。2026 年 1–9 月动力电池装机份额。'
      },
      outlook: {
        kicker: '05 · 展望',
        title: '2027 年值得关注',
        cards: [
          { tag: '路线', title: '钠离子走向主流', body: '首批入门电动车搭载钠离子电池包，降低对锂的依赖。' },
          { tag: '技术', title: '半固态加速量产', body: '高端车型试装更高能量密度、充电更快的电芯。' },
          { tag: '政策', title: '供应链本地化', body: '欧美本土化规则推动电芯与正极工厂靠近整车厂。' }
        ],
        source: '来源：IEA、BNEF、Benchmark、SNE Research。完整清单见 sources.md。'
      }
    }
  }
}
