// An Agent files a meeting into the team knowledge base with the cherry-tools kb_search / kb_read / kb_manage tools
// (src/shared/ai/builtinTools.ts), then answers from it with citations. UI labels come from the desktop locale keys
// knowledge.meta.updated_at, knowledge.data_source.{toolbar.add,status.*,actions.preview_source},
// message.tools.activity.*, message.searching, message.websearch.fetch_complete, message.citation(_source),
// message.tools.status.running, message.tools.identity_card.updated, chat.profile_pane.tasks.new, common.{back,close},
// title.knowledge. The pages themselves are demo data.
import type { DemoLocale } from './chat'

export type WikiPageId = 'decision' | 'pricing' | 'launch' | 'faq' | 'playbook' | 'glossary'

export type WikiBlock =
  | { kind: 'heading'; text: string }
  | { kind: 'text'; text: string }
  /** The paragraph the Agent rewrote; `before` is absent for an added line. */
  | { kind: 'diff'; before?: string; after: string }
  | { kind: 'links'; label: string; pages: WikiPageId[] }

export interface WikiPage {
  id: WikiPageId
  title: string
  /** Last edit before the Agent's run. */
  updated: string
  change?: 'new' | 'updated'
  blocks: WikiBlock[]
}

/** One answer sentence and the 1-based citation it ends with. */
export interface WikiSegment {
  text: string
  cite?: number
}

export interface KnowledgeWikiCopy {
  region: string
  agentName: string
  session: string
  baseName: string
  task: string
  intro: string
  summary: string
  followUp: string
  answer: WikiSegment[]
  /** Pages behind each citation number, in order. */
  citations: WikiPageId[]
  /** Arguments shown on each tool call. */
  args: { transcript: string; query: string; read: string; manage: string; query2: string }
  results: { search: number; search2: number }
  labels: {
    view: [done: string, live: string]
    find: [done: string, live: string]
    create: [done: string, live: string]
    documentFiles: string
    relatedContent: string
    searching: string
    searchResults: string
    running: string
    knowledgeBase: string
    updatedAt: string
    justNow: string
    add: string
    ready: string
    embedding: string
    previewSource: string
    back: string
    close: string
    badge: { new: string; updated: string }
    citations: string
    citationSource: string
  }
  /** Most recently updated first, as the Knowledge page lists them before the run. */
  pages: WikiPage[]
}

export const knowledgeWikiDemo: Record<DemoLocale, KnowledgeWikiCopy> = {
  en: {
    region: 'Agent maintaining a knowledge base demo',
    agentName: 'Wiki Keeper',
    session: 'Pricing review follow-up',
    baseName: 'Product Wiki',
    task: 'Here’s the transcript from today’s pricing review. File the decisions in the Product Wiki and update any pages they change.',
    intro: 'I’ll check what the wiki already says before writing anything.',
    summary:
      'Filed 1 new page and updated 2. Pricing & Plans now lists the 20% annual discount from January 6, and the Q1 launch checklist has the checkout-copy task. Both link back to the decision log.',
    followUp: 'What’s the annual discount now, and who owns the rollout?',
    answer: [
      {
        text: 'Annual plans now get 20% off list price, starting January 6; existing annual customers keep 15% until renewal.',
        cite: 1
      },
      {
        text: ' Maya Chen owns the rollout, and the new checkout copy ships with the Q1 launch on December 18.',
        cite: 2
      }
    ],
    citations: ['pricing', 'decision'],
    args: {
      transcript: 'pricing-review-1127.md',
      query: 'annual plan discount',
      read: 'Pricing & Plans',
      manage: 'Product Wiki · 3 notes',
      query2: 'annual discount rollout owner'
    },
    results: { search: 3, search2: 2 },
    labels: {
      view: ['View', 'Looking it over'],
      find: ['Find', 'Searching around'],
      create: ['Create', 'Creating'],
      documentFiles: 'document files',
      relatedContent: 'related content',
      searching: 'Searching...',
      searchResults: '{count} search result(s)',
      running: 'Running',
      knowledgeBase: 'Knowledge Base',
      updatedAt: 'Updated {time}',
      justNow: 'this minute',
      add: 'Add Data Source',
      ready: 'Ready',
      embedding: 'Embedding',
      previewSource: 'Preview Source',
      back: 'Back',
      close: 'Close',
      badge: { new: 'New', updated: 'Updated' },
      citations: '{count} citations',
      citationSource: 'Citation source {number}'
    },
    pages: [
      {
        id: 'faq',
        title: 'Customer FAQ: Billing',
        updated: '2 days ago',
        blocks: [
          { kind: 'heading', text: 'Can I switch from monthly to annual?' },
          { kind: 'text', text: 'Yes. The switch takes effect at the next renewal and unused days are credited.' },
          { kind: 'heading', text: 'Do you offer refunds?' },
          { kind: 'text', text: 'Annual plans are refundable in full within 30 days, then prorated by unused month.' },
          { kind: 'links', label: 'See also', pages: ['pricing'] }
        ]
      },
      {
        id: 'pricing',
        title: 'Pricing & Plans',
        updated: 'last week',
        change: 'updated',
        blocks: [
          { kind: 'heading', text: 'Plans' },
          { kind: 'text', text: 'Starter $12 and Pro $24 per seat per month. Enterprise is quoted by Sales.' },
          { kind: 'heading', text: 'Annual billing' },
          {
            kind: 'diff',
            before: 'Annual plans get 15% off list price.',
            after:
              'Annual plans get 20% off list price from January 6, 2027. Existing annual customers keep 15% until renewal.'
          },
          { kind: 'text', text: 'Discounts above 20% need Finance approval in #deal-desk.' },
          { kind: 'links', label: 'Decided in', pages: ['decision'] }
        ]
      },
      {
        id: 'launch',
        title: 'Q1 launch checklist',
        updated: 'last week',
        change: 'updated',
        blocks: [
          { kind: 'heading', text: 'Before December 18' },
          { kind: 'text', text: '☑ Freeze pricing page copy — Ana\n☑ Brief support on plan changes — Jonas' },
          { kind: 'diff', after: '☐ Update checkout copy for the 20% annual discount — Maya' },
          { kind: 'text', text: '☐ Send the launch email to annual customers — Ana' },
          { kind: 'links', label: 'Related', pages: ['decision', 'pricing'] }
        ]
      },
      {
        id: 'playbook',
        title: 'Sales playbook',
        updated: '2 weeks ago',
        blocks: [
          { kind: 'heading', text: 'Discovery call' },
          { kind: 'text', text: 'Lead with team size and current tooling; quote annual first, monthly second.' },
          { kind: 'links', label: 'See also', pages: ['pricing', 'glossary'] }
        ]
      },
      {
        id: 'glossary',
        title: 'Glossary',
        updated: 'last month',
        blocks: [{ kind: 'text', text: 'ARR — annual recurring revenue.\nSeat — one named user on a workspace.' }]
      },
      {
        id: 'decision',
        title: 'Decision log · Pricing review 11/27',
        updated: 'this minute',
        change: 'new',
        blocks: [
          { kind: 'text', text: 'Maya Chen (PM), Leo Park (Finance), Ana Ruiz (Sales)' },
          { kind: 'heading', text: 'Decisions' },
          {
            kind: 'text',
            text: '1. Raise the annual discount from 15% to 20%, effective January 6.\n2. Existing annual customers keep 15% until renewal.\n3. Maya owns the rollout; checkout copy ships with the Q1 launch.'
          },
          { kind: 'heading', text: 'Open question' },
          { kind: 'text', text: 'Does the student plan get the same discount? Leo, by December 4.' },
          { kind: 'links', label: 'Updates', pages: ['pricing', 'launch'] }
        ]
      }
    ]
  },
  zh: {
    region: '智能体维护知识库演示',
    agentName: '知识库管家',
    session: '定价评审整理',
    baseName: '产品团队 Wiki',
    task: '这是今天定价评审会的记录，把结论整理进产品团队 Wiki，受影响的页面也一并更新。',
    intro: '先查一下 Wiki 里现有的内容，再动笔。',
    summary:
      '新建 1 页、更新 2 页：「定价与套餐」已写入 1 月 6 日起年付 8 折，「Q1 发布清单」加上了结账页文案任务，两页都链接回本次决策记录。',
    followUp: '现在年付折扣是多少？谁负责上线？',
    answer: [
      { text: '年付套餐自 1 月 6 日起享 8 折，已有年付客户在续费前保持 85 折。', cite: 1 },
      { text: '上线由陈雅负责，新的结账页文案随 12 月 18 日的 Q1 发布一起上线。', cite: 2 }
    ],
    citations: ['pricing', 'decision'],
    args: {
      transcript: '定价评审-1127.md',
      query: '年付 折扣',
      read: '定价与套餐',
      manage: '产品团队 Wiki · 3 篇笔记',
      query2: '年付折扣 上线负责人'
    },
    results: { search: 3, search2: 2 },
    labels: {
      view: ['查看', '仔细查看'],
      find: ['查找', '耐心查找'],
      create: ['新建', '动手新建'],
      documentFiles: '文档文件',
      relatedContent: '相关内容',
      searching: '正在搜索...',
      searchResults: '{count} 个搜索结果',
      running: '运行中',
      knowledgeBase: '知识库',
      updatedAt: '更新于 {time}',
      justNow: '此刻',
      add: '添加数据源',
      ready: '就绪',
      embedding: '嵌入中',
      previewSource: '预览原文',
      back: '返回',
      close: '关闭',
      badge: { new: '新建', updated: '已更新' },
      citations: '{count} 个引用内容',
      citationSource: '引用来源 {number}'
    },
    pages: [
      {
        id: 'faq',
        title: '客户常见问题：账单',
        updated: '2 天前',
        blocks: [
          { kind: 'heading', text: '可以从月付改成年付吗？' },
          { kind: 'text', text: '可以，下个续费周期生效，未用完的天数会折算抵扣。' },
          { kind: 'heading', text: '支持退款吗？' },
          { kind: 'text', text: '年付 30 天内可全额退款，之后按未使用月份折算。' },
          { kind: 'links', label: '另见', pages: ['pricing'] }
        ]
      },
      {
        id: 'pricing',
        title: '定价与套餐',
        updated: '上周',
        change: 'updated',
        blocks: [
          { kind: 'heading', text: '套餐' },
          { kind: 'text', text: '基础版每席位每月 ¥68，专业版 ¥138，企业版由销售报价。' },
          { kind: 'heading', text: '年付' },
          {
            kind: 'diff',
            before: '年付套餐按标价 85 折。',
            after: '自 2027 年 1 月 6 日起，年付套餐按标价 8 折；已有年付客户续费前保持 85 折。'
          },
          { kind: 'text', text: '低于 8 折的报价需在 #deal-desk 由财务审批。' },
          { kind: 'links', label: '决策来源', pages: ['decision'] }
        ]
      },
      {
        id: 'launch',
        title: 'Q1 发布清单',
        updated: '上周',
        change: 'updated',
        blocks: [
          { kind: 'heading', text: '12 月 18 日前' },
          { kind: 'text', text: '☑ 冻结定价页文案 — 周安\n☑ 向客服同步套餐变更 — 许诺' },
          { kind: 'diff', after: '☐ 更新结账页文案，体现年付 8 折 — 陈雅' },
          { kind: 'text', text: '☐ 给年付客户发送发布邮件 — 周安' },
          { kind: 'links', label: '相关', pages: ['decision', 'pricing'] }
        ]
      },
      {
        id: 'playbook',
        title: '销售打法手册',
        updated: '2周前',
        blocks: [
          { kind: 'heading', text: '首次沟通' },
          { kind: 'text', text: '先了解团队规模和现有工具；先报年付，再报月付。' },
          { kind: 'links', label: '另见', pages: ['pricing', 'glossary'] }
        ]
      },
      {
        id: 'glossary',
        title: '术语表',
        updated: '上个月',
        blocks: [{ kind: 'text', text: 'ARR：年度经常性收入。\n席位：工作区中的一个具名用户。' }]
      },
      {
        id: 'decision',
        title: '决策记录 · 11/27 定价评审',
        updated: '此刻',
        change: 'new',
        blocks: [
          { kind: 'text', text: '陈雅（产品）、林浩（财务）、周安（销售）' },
          { kind: 'heading', text: '结论' },
          {
            kind: 'text',
            text: '1. 年付折扣由 85 折调整为 8 折，1 月 6 日生效。\n2. 已有年付客户续费前保持 85 折。\n3. 陈雅负责上线，结账页文案随 Q1 发布上线。'
          },
          { kind: 'heading', text: '待定' },
          { kind: 'text', text: '学生套餐是否同享折扣？林浩，12 月 4 日前答复。' },
          { kind: 'links', label: '更新了', pages: ['pricing', 'launch'] }
        ]
      }
    ]
  }
}
