// Copy for the composer effort slider and the message anchor rail demos.
// Effort labels and control names come from the desktop locale keys (agent.speed.*, reasoning_effort.*).
import type { DemoLocale } from './chat'

export interface EffortDemoCopy {
  region: string
  title: string
  model: string
  effort: string
  faster: string
  smarter: string
  off: string
  /** Slider stops, low to high: none, low, medium, high, max. */
  levels: string[]
  hint: string
}

export interface AnchorTurn {
  question: string
  answer: string
}

export interface AnchorDemoCopy {
  window: string
  railLabel: string
  /** `{number}` is replaced with the 1-based turn number. */
  jumpTo: string
  hint: string
  turns: AnchorTurn[]
}

export const effortDemo: Record<DemoLocale, EffortDemoCopy> = {
  en: {
    region: 'Reasoning effort slider demo',
    title: 'Response settings',
    model: 'Claude Opus 4.8',
    effort: 'Effort',
    faster: 'Faster',
    smarter: 'Smarter',
    off: 'Off',
    levels: ['Off', 'Low', 'Medium', 'High', 'Max'],
    hint: 'Drag, click or use arrow keys'
  },
  zh: {
    region: '思考强度滑块演示',
    title: '响应设置',
    model: 'Claude Opus 4.8',
    effort: '强度',
    faster: '更快',
    smarter: '更智能',
    off: '关闭',
    levels: ['关闭', '低', '中', '高', '最大'],
    hint: '拖动、点击或用方向键调节'
  }
}

export const anchorDemo: Record<DemoLocale, AnchorDemoCopy> = {
  en: {
    window: 'Cherry Studio — Migration planning',
    railLabel: 'Conversation turns',
    jumpTo: 'Jump to turn {number}',
    hint: 'Hover the rail, or focus it and use ↑ ↓ Enter',
    turns: [
      {
        question: 'We need to move our app off MongoDB. Where do we start?',
        answer: 'Start with an inventory: collections, query shapes and write volume per service.'
      },
      {
        question: 'Postgres or SQLite for the desktop build?',
        answer: 'SQLite for desktop: one file, no server, and WAL mode covers your write load.'
      },
      {
        question: 'How do I map nested documents to tables?',
        answer: 'Split arrays that you query into child tables; keep the rest as JSON columns.'
      },
      {
        question: 'Draft the schema for the messages collection',
        answer: 'Three tables: topics, messages and message_parts, keyed by ULIDs.'
      },
      {
        question: 'Should IDs stay as ObjectId strings?',
        answer: 'Keep them as text for the import, then switch new rows to ULIDs.'
      },
      {
        question: 'What indexes will the topic list need?',
        answer: 'A composite index on (topic_id, created_at) serves both paging and sorting.'
      },
      {
        question: 'Write the migration script outline',
        answer: 'Stream each collection in batches of 500 inside one transaction per batch.'
      },
      {
        question: 'How do we handle documents that fail validation?',
        answer: 'Write them to a quarantine table with the error, then keep going.'
      },
      {
        question: 'Can we run old and new stores side by side?',
        answer: 'Not in this release: v1 data is read once at upgrade, never dual-written.'
      },
      {
        question: 'Estimate the migration time for 2 GB of data',
        answer: 'Roughly 40 seconds on an SSD; most of it is JSON parsing, not inserts.'
      },
      {
        question: 'How do we show progress during the upgrade?',
        answer: 'Report rows done per collection; a single bar over all rows feels steady.'
      },
      {
        question: 'What if the user quits halfway through?',
        answer: 'Each batch commits on its own, so resume from the last finished batch.'
      },
      {
        question: 'Write tests for the resume logic',
        answer: 'Kill the importer after batch 3 in a fixture, rerun it, compare row counts.'
      },
      {
        question: 'Summarize the plan for the team update',
        answer: 'Inventory, schema, batched import, quarantine, resumable progress. Ship in 6.2.'
      }
    ]
  },
  zh: {
    window: 'Cherry Studio — 数据迁移方案',
    railLabel: '对话轮次',
    jumpTo: '跳转到第 {number} 轮对话',
    hint: '悬停在右侧刻度上，或聚焦后用 ↑ ↓ 回车',
    turns: [
      {
        question: '我们要把应用从 MongoDB 迁走，从哪儿开始？',
        answer: '先盘点：每个服务用了哪些集合、查询形态和写入量。'
      },
      {
        question: '桌面端用 Postgres 还是 SQLite？',
        answer: '桌面端选 SQLite：单文件、无需服务器，WAL 模式足够应付写入。'
      },
      {
        question: '嵌套文档怎么映射成表？',
        answer: '会被查询的数组拆成子表，其余字段保留为 JSON 列。'
      },
      {
        question: '帮我起草 messages 集合的表结构',
        answer: '拆成 topics、messages、message_parts 三张表，主键用 ULID。'
      },
      {
        question: 'ID 还保留 ObjectId 字符串吗？',
        answer: '导入时先按文本保留，新数据再改用 ULID。'
      },
      {
        question: '话题列表需要哪些索引？',
        answer: '建一个 (topic_id, created_at) 联合索引，分页和排序都能用上。'
      },
      {
        question: '写一下迁移脚本的大纲',
        answer: '按集合流式读取，每 500 条一批，每批一个事务。'
      },
      {
        question: '校验失败的文档怎么处理？',
        answer: '连同错误信息写入隔离表，然后继续导入。'
      },
      {
        question: '新旧存储能同时跑吗？',
        answer: '这个版本不行：升级时只读取一次 v1 数据，不做双写。'
      },
      {
        question: '估算一下 2 GB 数据要迁移多久',
        answer: 'SSD 上大约 40 秒，主要耗在解析 JSON，而不是写入。'
      },
      {
        question: '升级时怎么展示进度？',
        answer: '按集合汇报已完成行数，用一条总进度条看起来更平稳。'
      },
      {
        question: '用户中途退出怎么办？',
        answer: '每批单独提交，下次从最后完成的那一批继续。'
      },
      {
        question: '给断点续传写测试',
        answer: '在测试数据里第 3 批后中断导入，重跑后比对行数。'
      },
      {
        question: '总结一下方案，发给团队',
        answer: '盘点、建表、分批导入、隔离异常、可续传进度，随 6.2 发布。'
      }
    ]
  }
}
