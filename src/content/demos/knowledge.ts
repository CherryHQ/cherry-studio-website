// Copy for the knowledge base and translate demos. UI labels come from the desktop locale
// (knowledge.*, translate.*, languages.*); the sample documents and chunks are demo data.
export type DemoLocale = 'en' | 'zh'

export type KnowledgeItemType = 'file' | 'url' | 'note' | 'directory'

export interface KnowledgeChunk {
  source: string
  type: KnowledgeItemType
  chunk: number
  score: number
  text: string
}

export interface KnowledgeDemoCopy {
  region: string
  window: string
  newBase: string
  bases: string[]
  recallTest: string
  settings: string
  updated: string
  add: string
  addHint: string
  drop: string
  types: Record<KnowledgeItemType, string>
  columns: { name: string; type: string; status: string; updated: string }
  status: { pending: string; reading: string; embedding: string; ready: string }
  justNow: string
  items: { type: KnowledgeItemType; title: string; updated: string }[]
  /** Items the Add menu offers, per type, in order; autoplay adds the first two files. */
  samples: Record<KnowledgeItemType, string[]>
  recall: {
    placeholder: string
    submit: string
    searching: string
    results: string
    duration: string
    top: string
    relevance: string
    emptyTitle: string
    emptyDescription: string
    noMatch: string
    close: string
    query: string
  }
  /** Words that never count as a match, so short questions still rank on their keywords. */
  stopWords: string[]
  chunks: KnowledgeChunk[]
}

export const knowledgeDemo: Record<DemoLocale, KnowledgeDemoCopy> = {
  en: {
    region: 'Knowledge base demo',
    window: 'Cherry Studio — Knowledge Base',
    newBase: 'New Knowledge Base',
    bases: ['Support handbook', 'Research papers', 'Product specs', 'Meeting notes'],
    recallTest: 'Recall Test',
    settings: 'Knowledge Base Settings',
    updated: 'Updated {time}',
    add: 'Add Data Source',
    addHint: 'Or drop files here',
    drop: 'Drag files here to upload',
    types: { file: 'File', url: 'URL', note: 'Note', directory: 'Folder' },
    columns: { name: 'Name', type: 'Type', status: 'Status', updated: 'Updated' },
    status: { pending: 'Waiting', reading: 'Reading', embedding: 'Embedding', ready: 'Ready' },
    justNow: 'just now',
    items: [
      { type: 'file', title: 'onboarding-guide.pdf', updated: '3 days ago' },
      { type: 'url', title: 'https://help.example.com/billing', updated: '2 days ago' },
      { type: 'note', title: 'Refund policy notes', updated: 'yesterday' },
      { type: 'directory', title: 'contracts', updated: '5 hours ago' }
    ],
    samples: {
      file: ['pricing-faq.docx', 'annual-plan-terms.pdf', 'api-reference.md', 'support-macros.xlsx'],
      url: ['https://status.example.com/incidents', 'https://example.com/changelog'],
      note: ['Escalation checklist', 'Holiday coverage'],
      directory: ['invoices-2025', 'release-notes']
    },
    recall: {
      placeholder: 'Enter test query...',
      submit: 'Search',
      searching: 'Searching...',
      results: '{count} results',
      duration: '{duration}ms',
      top: 'Top: {score}',
      relevance: 'Relevance {score}',
      emptyTitle: 'Enter a query to test retrieval',
      emptyDescription: 'Matched document chunks and scores will appear here',
      noMatch: 'No results',
      close: 'Close',
      query: 'How do refunds work on annual plans?'
    },
    stopWords: [
      'a',
      'an',
      'and',
      'are',
      'can',
      'do',
      'does',
      'for',
      'how',
      'i',
      'in',
      'is',
      'it',
      'of',
      'on',
      'or',
      'our',
      'the',
      'to',
      'we',
      'what',
      'when',
      'with',
      'work',
      'you'
    ],
    chunks: [
      {
        source: 'annual-plan-terms.pdf',
        type: 'file',
        chunk: 4,
        score: 0.92,
        text: 'Annual plans can be refunded in full within 30 days of purchase. After 30 days, refunds are prorated for the unused months, minus any discount applied at checkout.'
      },
      {
        source: 'pricing-faq.docx',
        type: 'file',
        chunk: 2,
        score: 0.87,
        text: 'Can I switch from annual to monthly billing? Yes. The change takes effect at renewal, and refunds for annual plans follow the standard proration rules.'
      },
      {
        source: 'Refund policy notes',
        type: 'note',
        chunk: 1,
        score: 0.81,
        text: 'Refunds go back to the original payment method within 5 to 10 business days. Agents can approve refunds up to $500 without escalation.'
      },
      {
        source: 'https://help.example.com/billing',
        type: 'url',
        chunk: 3,
        score: 0.74,
        text: 'Invoices for annual plans are issued on the renewal date. You can download past invoices and update the billing email from the account page.'
      },
      {
        source: 'onboarding-guide.pdf',
        type: 'file',
        chunk: 12,
        score: 0.66,
        text: 'New workspaces start on a 14-day trial. When the trial ends, choose monthly or annual billing; annual plans save 18% compared with paying monthly.'
      },
      {
        source: 'contracts/master-agreement.pdf',
        type: 'file',
        chunk: 7,
        score: 0.58,
        text: 'Either party may terminate for convenience with 60 days written notice. Prepaid fees for the remaining term are refunded on a pro-rata basis.'
      }
    ]
  },
  zh: {
    region: '知识库演示',
    window: 'Cherry Studio — 知识库',
    newBase: '新建知识库',
    bases: ['客服手册', '研究论文', '产品规格', '会议纪要'],
    recallTest: '召回测试',
    settings: '知识库设置',
    updated: '更新于 {time}',
    add: '添加数据源',
    addHint: '也可以直接拖入文件',
    drop: '拖拽文件到此处上传',
    types: { file: '文件', url: '链接', note: '笔记', directory: '目录' },
    columns: { name: '名称', type: '类型', status: '状态', updated: '更新时间' },
    status: { pending: '等待中', reading: '读取文档中', embedding: '嵌入中', ready: '就绪' },
    justNow: '刚刚',
    items: [
      { type: 'file', title: '新手上路指南.pdf', updated: '3 天前' },
      { type: 'url', title: 'https://help.example.com/billing', updated: '2 天前' },
      { type: 'note', title: '退款政策备忘', updated: '昨天' },
      { type: 'directory', title: '合同', updated: '5 小时前' }
    ],
    samples: {
      file: ['价格常见问题.docx', '年付套餐条款.pdf', '接口文档.md', '客服快捷回复.xlsx'],
      url: ['https://status.example.com/incidents', 'https://example.com/changelog'],
      note: ['升级处理清单', '节假日值班安排'],
      directory: ['2025 发票', '版本说明']
    },
    recall: {
      placeholder: '输入测试 Query...',
      submit: '检索',
      searching: '正在检索...',
      results: '{count} 个结果',
      duration: '{duration}ms',
      top: '最高: {score}',
      relevance: '相关度 {score}',
      emptyTitle: '输入查询语句开始检索测试',
      emptyDescription: '结果将展示匹配的文档片段和分数',
      noMatch: '无结果',
      close: '关闭',
      query: '年付套餐怎么退款？'
    },
    stopWords: ['怎么', '如何', '什么', '可以', '我们', '是否', '一下', '的', '了', '吗', '呢'],
    chunks: [
      {
        source: '年付套餐条款.pdf',
        type: 'file',
        chunk: 4,
        score: 0.92,
        text: '年付套餐在购买后 30 天内可全额退款。超过 30 天的，按未使用的月份比例退款，并扣除结账时享受的折扣。'
      },
      {
        source: '价格常见问题.docx',
        type: 'file',
        chunk: 2,
        score: 0.87,
        text: '可以从年付改为月付吗？可以。变更在续费时生效，年付套餐的退款按标准的比例折算规则处理。'
      },
      {
        source: '退款政策备忘',
        type: 'note',
        chunk: 1,
        score: 0.81,
        text: '退款会在 5 到 10 个工作日内原路返回。500 元以内的退款，客服可直接审批，无需升级处理。'
      },
      {
        source: 'https://help.example.com/billing',
        type: 'url',
        chunk: 3,
        score: 0.74,
        text: '年付套餐的发票在续费当天开具。你可以在账户页面下载历史发票，并修改接收账单的邮箱。'
      },
      {
        source: '新手上路指南.pdf',
        type: 'file',
        chunk: 12,
        score: 0.66,
        text: '新工作区默认有 14 天试用期。试用结束后可选择月付或年付，年付比月付节省 18%。'
      },
      {
        source: '合同/主服务协议.pdf',
        type: 'file',
        chunk: 7,
        score: 0.58,
        text: '任何一方均可提前 60 天书面通知解除合同。剩余期限内已预付的费用将按比例退还。'
      }
    ]
  }
}

export interface TranslateLanguage {
  code: string
  emoji: string
  en: string
  zh: string
}

// The 21 built-in languages from desktop src/shared/data/presets/translateLanguages.ts,
// labelled with the desktop `languages.*` strings.
export const translateLanguages: TranslateLanguage[] = [
  { code: 'en-us', emoji: '🇺🇸', en: 'English', zh: '英文' },
  { code: 'zh-cn', emoji: '🇨🇳', en: 'Chinese', zh: '简体中文' },
  { code: 'zh-tw', emoji: '🇭🇰', en: 'Traditional Chinese', zh: '繁体中文' },
  { code: 'ja-jp', emoji: '🇯🇵', en: 'Japanese', zh: '日文' },
  { code: 'ko-kr', emoji: '🇰🇷', en: 'Korean', zh: '韩文' },
  { code: 'fr-fr', emoji: '🇫🇷', en: 'French', zh: '法文' },
  { code: 'de-de', emoji: '🇩🇪', en: 'German', zh: '德文' },
  { code: 'it-it', emoji: '🇮🇹', en: 'Italian', zh: '意大利文' },
  { code: 'es-es', emoji: '🇪🇸', en: 'Spanish', zh: '西班牙文' },
  { code: 'pt-pt', emoji: '🇵🇹', en: 'Portuguese', zh: '葡萄牙文' },
  { code: 'ru-ru', emoji: '🇷🇺', en: 'Russian', zh: '俄文' },
  { code: 'pl-pl', emoji: '🇵🇱', en: 'Polish', zh: '波兰文' },
  { code: 'cs-cz', emoji: '🇨🇿', en: 'Czech', zh: '捷克文' },
  { code: 'ar-sa', emoji: '🇸🇦', en: 'Arabic', zh: '阿拉伯文' },
  { code: 'tr-tr', emoji: '🇹🇷', en: 'Turkish', zh: '土耳其文' },
  { code: 'th-th', emoji: '🇹🇭', en: 'Thai', zh: '泰文' },
  { code: 'vi-vn', emoji: '🇻🇳', en: 'Vietnamese', zh: '越南文' },
  { code: 'id-id', emoji: '🇮🇩', en: 'Indonesian', zh: '印尼文' },
  { code: 'ur-pk', emoji: '🇵🇰', en: 'Urdu', zh: '乌尔都文' },
  { code: 'ms-my', emoji: '🇲🇾', en: 'Malay', zh: '马来文' },
  { code: 'uk-ua', emoji: '🇺🇦', en: 'Ukrainian', zh: '乌克兰语' }
]

/** One short message in every built-in language, so any source/target pair has a scripted translation. */
export const translateSamples: Record<string, string> = {
  'en-us': 'The meeting has moved to Thursday at 3 p.m. Please add your updates to the shared notes before then.',
  'zh-cn': '会议改到周四下午 3 点了。请在那之前把你的进展写进共享笔记。',
  'zh-tw': '會議改到週四下午 3 點了。請在那之前把你的進度寫進共享筆記。',
  'ja-jp': '会議は木曜日の午後3時に変更になりました。それまでに共有ノートへ進捗を追記してください。',
  'ko-kr': '회의가 목요일 오후 3시로 변경되었습니다. 그 전까지 공유 노트에 진행 상황을 적어 주세요.',
  'fr-fr': "La réunion est déplacée à jeudi, 15 h. Merci d'ajouter vos avancées aux notes partagées d'ici là.",
  'de-de':
    'Das Meeting wurde auf Donnerstag, 15 Uhr, verschoben. Bitte tragt eure Updates bis dahin in die gemeinsamen Notizen ein.',
  'it-it':
    "La riunione è stata spostata a giovedì alle 15. Aggiungete i vostri aggiornamenti alle note condivise entro quell'ora.",
  'es-es':
    'La reunión se ha trasladado al jueves a las 15:00. Añadid vuestras novedades a las notas compartidas antes de esa hora.',
  'pt-pt':
    'A reunião passou para quinta-feira às 15h. Acrescentem as vossas atualizações às notas partilhadas antes disso.',
  'ru-ru': 'Встреча перенесена на четверг, 15:00. Пожалуйста, добавьте свои новости в общие заметки до этого времени.',
  'pl-pl':
    'Spotkanie zostało przeniesione na czwartek na 15:00. Dodajcie swoje aktualizacje do wspólnych notatek przed tą godziną.',
  'cs-cz': 'Schůzka se přesunula na čtvrtek v 15:00. Do té doby prosím doplňte své novinky do sdílených poznámek.',
  'ar-sa': 'تم نقل الاجتماع إلى يوم الخميس الساعة 3 عصرًا. يرجى إضافة مستجداتكم إلى الملاحظات المشتركة قبل ذلك الموعد.',
  'tr-tr': "Toplantı perşembe saat 15:00'e alındı. Lütfen o saate kadar güncellemelerinizi ortak notlara ekleyin.",
  'th-th': 'การประชุมเลื่อนไปเป็นวันพฤหัสบดี เวลา 15:00 น. กรุณาเพิ่มความคืบหน้าของคุณลงในโน้ตที่แชร์ไว้ก่อนเวลานั้น',
  'vi-vn':
    'Cuộc họp đã được dời sang 15 giờ thứ Năm. Vui lòng cập nhật tiến độ của bạn vào ghi chú chung trước thời điểm đó.',
  'id-id':
    'Rapat dipindahkan ke hari Kamis pukul 15.00. Silakan tambahkan pembaruan Anda ke catatan bersama sebelum itu.',
  'ur-pk': 'میٹنگ اب جمعرات سہ پہر 3 بجے ہوگی۔ براہِ کرم اس سے پہلے اپنی تازہ معلومات مشترکہ نوٹس میں شامل کر دیں۔',
  'ms-my':
    'Mesyuarat telah dipindahkan ke hari Khamis pada pukul 3 petang. Sila tambahkan perkembangan anda ke dalam nota kongsi sebelum itu.',
  'uk-ua': 'Зустріч перенесли на четвер, 15:00. Будь ласка, додайте свої оновлення до спільних нотаток до цього часу.'
}

export interface TranslateDemoCopy {
  region: string
  window: string
  translate: string
  stop: string
  source: string
  target: string
  autoDetect: string
  detecting: string
  translateTo: string
  output: string
  copy: string
  copied: string
  /** Detected source language for the scripted sample. */
  defaultSource: string
  defaultTarget: string
}

export const translateDemo: Record<DemoLocale, TranslateDemoCopy> = {
  en: {
    region: 'Translate demo',
    window: 'Cherry Studio — Translate',
    translate: 'Translate',
    stop: 'Stop',
    source: 'Source Language',
    target: 'Target Language',
    autoDetect: 'Auto Detect',
    detecting: 'Detecting...',
    translateTo: 'Translate to',
    output: 'Translation',
    copy: 'Copy',
    copied: 'Copied',
    defaultSource: 'en-us',
    defaultTarget: 'ja-jp'
  },
  zh: {
    region: '翻译演示',
    window: 'Cherry Studio — 翻译',
    translate: '翻译',
    stop: '停止',
    source: '源语言',
    target: '目标语言',
    autoDetect: '自动检测',
    detecting: '检测中...',
    translateTo: '译为',
    output: '翻译',
    copy: '复制',
    copied: '已复制',
    defaultSource: 'zh-cn',
    defaultTarget: 'en-us'
  }
}
