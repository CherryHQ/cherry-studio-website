// Copy for the desktop selection assistant and quick assistant demos.
// Action and window labels come from the desktop locale (selection.*, quickAssistant.*, translate.*).
export type DemoLocale = 'en' | 'zh'

// Only the actions enabled by default; Refine and Quote ship disabled.
export type SelectionActionId = 'translate' | 'explain' | 'summary' | 'search' | 'copy' | 'ask-agent'
export type WindowActionId = 'translate' | 'explain' | 'summary'
export type QuickFeatureId = 'chat' | 'translate' | 'summary' | 'explanation'

export interface LanguageTag {
  emoji: string
  label: string
}

export interface AssistantsDemoCopy {
  region: string
  tabs: { selection: string; quick: string }
  browser: { url: string; site: string; byline: string }
  /** Sentences are rendered one span each so a selection maps back to the scripted results. */
  article: { title: string; paragraphs: string[][] }
  hint: string
  sample: string
  actions: Record<SelectionActionId, string>
  /** One result per paragraph; the title borrows the first paragraph's. */
  results: Record<Exclude<WindowActionId, 'translate'>, string[]>
  /** `from` is the detected language's raw name, which the desktop shows untranslated. */
  translate: {
    from: LanguageTag
    to: LanguageTag
    detecting: string
    settings: string
    preferredTarget: string
    alterLanguage: string
    preferred: LanguageTag
    alter: LanguageTag
    smartTips: string
  }
  actionWindow: {
    showOriginal: string
    hideOriginal: string
    pin: string
    pinned: string
    opacity: string
    escClose: string
    escStop: string
    regenerate: string
    copy: string
    copied: string
    readAloud: string
    close: string
  }
  agent: {
    name: string
    avatar: string
    session: string
    quote: string
    chars: string
    lines: string
    placeholder: string
    workspace: string
    saved: string
    send: string
    running: string
    step: string
    done: string
    dismiss: string
  }
  quick: {
    window: string
    model: string
    clipboard: string
    clipboardClear: string
    placeholderTitle: string
    placeholderEmpty: string
    features: Record<QuickFeatureId, string>
    answers: Record<Exclude<QuickFeatureId, 'translate'>, string>
    customReply: string
    anyLanguage: string
    target: LanguageTag
    translating: string
    footer: {
      escClose: string
      escBack: string
      escPause: string
      backspace: string
      copy: string
      readAloud: string
      copied: string
    }
    pin: string
    shortcut: string
  }
}

const enArticle = {
  title: 'Why spaced repetition works',
  paragraphs: [
    [
      'Every time you recall a fact just before you would have forgotten it, the memory comes back a little stronger.',
      'Psychologists call this the spacing effect, and Hermann Ebbinghaus first measured it in 1885.'
    ],
    [
      'Flashcard apps put it to work by scheduling each review at a longer interval than the last.',
      'Ten focused minutes a day is usually enough to keep hundreds of cards fresh.'
    ]
  ]
}

const zhArticle = {
  title: '间隔重复为什么有效',
  paragraphs: [
    [
      '每当你在快要忘记某个知识点时把它回想起来，这段记忆就会变得更牢固一些。',
      '心理学家把这种现象称为间隔效应，最早由艾宾浩斯在 1885 年测量得出。'
    ],
    ['闪卡应用正是利用了这一点：每次复习的间隔都比上一次更长。', '每天专注十分钟，通常就足以让几百张卡片保持新鲜。']
  ]
}

const enClipboard =
  'Our vendor contract renews on Dec 15. Annual billing saves 18% but locks us in for a year. Should we switch, or stay monthly for flexibility?'
const zhClipboard =
  '供应商合同 12 月 15 日续约。改成年付能省 18%，但要绑定一整年。我们该换成年付，还是继续按月付保留灵活性？'

export const assistantsDemo: Record<DemoLocale, AssistantsDemoCopy> = {
  en: {
    region: 'Selection assistant and quick assistant demo',
    tabs: { selection: 'Selection assistant', quick: 'Quick assistant' },
    browser: { url: 'fieldnotes.example.com/learning/spaced-repetition', site: 'Field Notes', byline: '4 min read' },
    article: enArticle,
    hint: 'Select any text on the page and the toolbar appears beside it.',
    sample: 'Select a sample phrase',
    actions: {
      translate: 'Translate',
      explain: 'Explain',
      summary: 'Summarize',
      search: 'Search',
      copy: 'Copy',
      'ask-agent': 'Ask Agent'
    },
    results: {
      explain: [
        'The spacing effect: you remember information better when practice is spread out over time instead of crammed into one session.\n\nEach well-timed recall forces the brain to rebuild the memory, and that effort is what makes it stick. Ebbinghaus plotted this as the “forgetting curve”, which drops steeply at first and flattens a little more after every review.',
        'This describes spaced-repetition software such as Anki. After each card you rate how well you remembered it, and the app pushes the next review further out, for example 1 day, then 3, then 8.\n\nBecause the gaps keep growing, you only see cards that are about to fade, so the daily workload stays small even as the deck gets large.'
      ],
      summary: [
        '• Recalling a fact right before you forget it strengthens the memory.\n• This is the spacing effect.\n• Ebbinghaus first measured it in 1885.',
        '• Flashcard apps space each review further apart than the last.\n• About ten minutes a day keeps hundreds of cards fresh.'
      ]
    },
    translate: {
      from: { emoji: '🇺🇸', label: 'English' },
      to: { emoji: '🇨🇳', label: 'Chinese' },
      detecting: 'Detecting...',
      settings: 'Language Settings',
      preferredTarget: 'Preferred Target',
      alterLanguage: 'Alternative Language',
      preferred: { emoji: '🇨🇳', label: 'Chinese' },
      alter: { emoji: '🇺🇸', label: 'English' },
      smartTips:
        'Smart Translation: Content will be translated to the target language first; content already in the target language will be translated to the alternative language'
    },
    actionWindow: {
      showOriginal: 'Show Original',
      hideOriginal: 'Hide Original',
      pin: 'Pin',
      pinned: 'Pinned',
      opacity: 'Window Opacity',
      escClose: 'Esc: Close',
      escStop: 'Esc: Stop',
      regenerate: 'R: Regenerate',
      copy: 'C: Copy',
      copied: 'Copied!',
      readAloud: 'Read result aloud',
      close: 'Close'
    },
    agent: {
      name: 'Cherry Assistant',
      avatar: '🍒',
      session: 'Spacing effect sources',
      quote: 'Quote',
      chars: '{n} chars',
      lines: '{n} lines',
      placeholder: 'What should the agent do?',
      workspace: 'No work directory',
      saved: 'Saved as a conversation',
      send: 'Send',
      running: 'Running',
      step: 'Step {n}',
      done: 'Done',
      dismiss: 'Close'
    },
    quick: {
      window: 'Quick Assistant',
      model: 'Claude Sonnet 4.6',
      clipboard: enClipboard,
      clipboardClear: 'Clear clipboard text',
      placeholderTitle: 'What do you want to do with this text?',
      placeholderEmpty: 'Ask Claude Sonnet 4.6 for help...',
      features: {
        chat: 'Answer this question',
        translate: 'Text translation',
        summary: 'Content summary',
        explanation: 'Explanation'
      },
      answers: {
        chat: 'If the contract is stable for the next year, switch to annual: 18% is a real saving and the lock-in only matters if you expect to leave the vendor.\n\nStay monthly if you are still evaluating alternatives or your seat count may change a lot. A middle path is to ask for annual pricing with a mid-term seat adjustment clause.',
        summary:
          '• The vendor contract renews on December 15.\n• Annual billing is 18% cheaper but commits you for a year.\n• The open question is cost savings versus flexibility.',
        explanation:
          'Annual billing means paying for twelve months up front, usually at a discount. Here the discount is 18%, roughly two months free.\n\n“Locks us in” means you cannot cancel or downgrade until the term ends. Monthly billing costs more, but you can change or leave each month.'
      },
      customReply:
        'This is a simulated preview, so the scripted model cannot read what you typed. In Cherry Studio, the model you pick answers right here, with the clipboard text as context.',
      anyLanguage: 'Any language',
      target: { emoji: '🇨🇳', label: 'Chinese' },
      translating: 'Translation...',
      footer: {
        escClose: 'ESC to close',
        escBack: 'ESC to return',
        escPause: 'ESC to pause',
        backspace: 'Backspace to clear',
        copy: 'Press C to copy',
        readAloud: 'Read aloud',
        copied: 'Copied!'
      },
      pin: 'Keep Window on Top',
      shortcut: 'Enable it in Settings, then summon it in any app with'
    }
  },
  zh: {
    region: '划词助手与快捷助手演示',
    tabs: { selection: '划词助手', quick: '快捷助手' },
    browser: { url: 'fieldnotes.example.com/learning/spaced-repetition', site: '学习笔记', byline: '阅读约 4 分钟' },
    article: zhArticle,
    hint: '在页面中划选任意文字，工具栏就会出现在选区旁边。',
    sample: '选中示例句子',
    actions: {
      translate: '翻译',
      explain: '解释',
      summary: '总结',
      search: '搜索',
      copy: '复制',
      'ask-agent': '问智能体'
    },
    results: {
      explain: [
        '间隔效应：把练习分散到不同时间进行，比集中在一次突击记忆效果更好。\n\n每次在恰当的时机回想，大脑都得重新“拼回”这段记忆，正是这份努力让它记得更牢。艾宾浩斯把这个过程画成了“遗忘曲线”：一开始下降很快，每复习一次就会变得更平缓。',
        '这说的是 Anki 这类间隔重复软件。每张卡片复习完，你给自己的记忆程度打分，应用就把下一次复习推得更远，比如 1 天、3 天、8 天。\n\n间隔越拉越长，你每天看到的只是快要忘掉的卡片，所以即使卡组越来越大，每天的工作量依然很小。'
      ],
      summary: [
        '• 在快要遗忘时回想，记忆会更牢固。\n• 这就是间隔效应。\n• 艾宾浩斯在 1885 年最早测量了它。',
        '• 闪卡应用让每次复习的间隔逐步拉长。\n• 每天约十分钟就能维持几百张卡片的记忆。'
      ]
    },
    translate: {
      from: { emoji: '🇨🇳', label: 'Chinese (Simplified)' },
      to: { emoji: '🇺🇸', label: '英文' },
      detecting: '检测中...',
      settings: '语言设置',
      preferredTarget: '首选目标',
      alterLanguage: '备用语言',
      preferred: { emoji: '🇨🇳', label: '简体中文' },
      alter: { emoji: '🇺🇸', label: '英文' },
      smartTips: '智能翻译：内容将优先翻译为目标语言；内容已是目标语言的，将翻译为备选语言'
    },
    actionWindow: {
      showOriginal: '显示原文',
      hideOriginal: '隐藏原文',
      pin: '置顶',
      pinned: '已置顶',
      opacity: '窗口透明度',
      escClose: 'Esc 关闭',
      escStop: 'Esc 停止',
      regenerate: 'R 重新生成',
      copy: 'C 复制',
      copied: '复制成功',
      readAloud: '朗读结果',
      close: '关闭'
    },
    agent: {
      name: 'Cherry 助手',
      avatar: '🍒',
      session: '间隔效应的文献来源',
      quote: '引用',
      chars: '{n} 字',
      lines: '{n} 行',
      placeholder: '让智能体做什么？',
      workspace: '不使用工作目录',
      saved: '会保存为会话',
      send: '发送',
      running: '运行中',
      step: '第 {n} 步',
      done: '完成',
      dismiss: '关闭'
    },
    quick: {
      window: '快捷助手',
      model: 'Claude Sonnet 4.6',
      clipboard: zhClipboard,
      clipboardClear: '清空剪贴板文字',
      placeholderTitle: '你想对下方文字做什么',
      placeholderEmpty: '询问 Claude Sonnet 4.6 获取帮助...',
      features: {
        chat: '回答此问题',
        translate: '文本翻译',
        summary: '内容总结',
        explanation: '解释说明'
      },
      answers: {
        chat: '如果明年和这家供应商的合作比较稳定，建议改成年付：18% 是实打实的节省，而绑定一年只有在你打算换供应商时才是问题。\n\n如果还在评估替代方案，或者席位数可能大幅变化，就继续按月付。也可以折中：谈年付价格，同时争取合同中途可调整席位的条款。',
        summary: '• 供应商合同将于 12 月 15 日续约。\n• 年付便宜 18%，但需绑定一年。\n• 核心问题是省钱还是保留灵活性。',
        explanation:
          '年付是指一次性预付十二个月的费用，通常会有折扣。这里折扣是 18%，大约相当于白送两个月。\n\n“绑定一年”意味着合同期内不能取消或降级。按月付单价更高，但每个月都可以调整或退出。'
      },
      customReply:
        '这是模拟演示，脚本里的模型读不到你输入的内容。在 Cherry Studio 中，你选择的模型会直接在这里作答，并把剪贴板文字作为上下文。',
      anyLanguage: '任意语言',
      target: { emoji: '🇺🇸', label: '英文' },
      translating: '翻译...',
      footer: {
        escClose: '按 ESC 关闭',
        escBack: '按 ESC 返回',
        escPause: '按 ESC 暂停',
        backspace: '按 Backspace 清空',
        copy: '按 C 键复制',
        readAloud: '朗读',
        copied: '复制成功'
      },
      pin: '窗口置顶',
      shortcut: '在设置中启用后，可在任意应用中唤出，快捷键'
    }
  }
}

/** Translation targets are the other locale's article and clipboard, which say the same thing. */
export const assistantsTranslation: Record<DemoLocale, { article: typeof enArticle; clipboard: string }> = {
  en: { article: zhArticle, clipboard: zhClipboard },
  zh: { article: enArticle, clipboard: enClipboard }
}
