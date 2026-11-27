// Agent driving the built-in browser pane (2.1). Labels: agent.right_pane.tabs.browser, webview.tabs.*,
// webview.navigation.*, common.maximize/close_sidebar, message.tools.automation.*/sections.*; code per cherry-browser api.md.
import type { DemoLocale } from './chat'

export type StayId = 'kanade' | 'kamogawa' | 'arashi' | 'sanjo'

export interface StayCopy {
  name: string
  area: string
  rating: string
  verdict: string
  reviews: string
  price: string
  /** Free cancellation, otherwise non-refundable. */
  flexible: boolean
  perks: string[]
}

export interface BrowserDemoCopy {
  region: string
  agentName: string
  session: string
  task: string
  intro: string
  lead: string
  closing: string
  /** One automation cell per step, titled by the Agent as the desktop tool card shows it. */
  tools: { title: string; code: string; output: string }[]
  codeLabel: string
  outputLabel: string
  table: { stay: string; rating: string; price: string; cancel: string; yes: string; no: string }
  pane: {
    browser: string
    newTab: string
    /** webview.tabs.agent_active, with {title}. */
    agentActive: string
    back: string
    forward: string
    reload: string
    openExternal: string
    address: string
    maximize: string
    close: string
  }
  site: {
    title: string
    search: string
    heading: string
    count: string
    sortLabel: string
    sorts: [recommended: string, topRated: string, lowestPrice: string]
    filters: string[]
    perNight: string
    flexible: string
    fixed: string
  }
  stays: Record<StayId, StayCopy>
}

export const browserScript = {
  url: 'https://staynest.com/kyoto?in=2026-12-12&out=2026-12-14',
  host: 'staynest.com',
  /** "Recommended" order, then the order once sorted by guest rating. */
  recommended: ['sanjo', 'kanade', 'arashi', 'kamogawa'] as StayId[],
  topRated: ['kanade', 'kamogawa', 'arashi', 'sanjo'] as StayId[]
}

const code = (sortName: string, topName: string) => [
  `var tab = await browser.getTab()\nawait tab.goto('${browserScript.url}')`,
  `var sort = await tab.find({ role: 'button', name: '${sortName}' })\nawait tab.click(sort.matches[0].ref)\nvar top = await tab.find({ role: 'menuitem', name: '${topName}' })\nawait tab.click(top.matches[0].ref)`,
  "var cards = await tab.find({ role: 'article' })\nfor (const card of cards.matches.slice(0, 3)) await tab.hover(card.ref)\nawait tab.getAXState({ scope: cards.matches[0].ref })",
  "await tab.getConsoleMessages({ level: 'error' })\nawait tab.getNetworkRequests()"
]

const enCode = code('Sort: Recommended', 'Top rated')
const zhCode = code('排序：推荐', '评分最高')

export const browserDemo: Record<DemoLocale, BrowserDemoCopy> = {
  en: {
    region: 'Agent built-in browser demo',
    agentName: 'Travel Agent',
    session: 'Kyoto stays',
    task: 'Find the three best-rated stays in Kyoto for Dec 12–14 on Staynest and compare price and cancellation.',
    intro: "I'll open Staynest in the browser, sort by guest rating and read the top three.",
    lead: 'Top three by guest rating for Dec 12–14:',
    closing: 'Kamogawa House is the best value: rated 9.1, $144 a night less than Kanade, and free to cancel.',
    tools: [
      {
        title: 'Open Kyoto stays on Staynest',
        code: enCode[0],
        output: '{ "title": "Kyoto stays · Staynest", "currentUrl": "https://staynest.com/kyoto?in=2026-12-12…" }'
      },
      { title: 'Sort by guest rating', code: enCode[1], output: '{ "ok": true, "navigated": false }' },
      {
        title: 'Read the top three stays',
        code: enCode[2],
        output:
          'article "Ryokan Kanade" 9.4 · $412 · Free cancellation\narticle "Kamogawa House" 9.1 · $268 · Free cancellation\narticle "Arashi Lane Hotel" 8.9 · $226 · Non-refundable'
      },
      {
        title: 'Check console and network',
        code: enCode[3],
        output: '{ "console": [], "requests": 27, "failed": 0 }'
      }
    ],
    codeLabel: 'Code · JavaScript',
    outputLabel: 'Output',
    table: { stay: 'Stay', rating: 'Rating', price: 'Per night', cancel: 'Free cancel', yes: 'Yes', no: 'No' },
    pane: {
      browser: 'Browser',
      newTab: 'New tab',
      agentActive: 'Agent is operating “{title}”',
      back: 'Back',
      forward: 'Forward',
      reload: 'Reload',
      openExternal: 'Open in external browser',
      address: 'Web address',
      maximize: 'Maximize',
      close: 'Close sidebar'
    },
    site: {
      title: 'Kyoto stays · Staynest',
      search: 'Kyoto · Dec 12 – 14 · 2 guests',
      heading: 'Stays in Kyoto',
      count: '248 stays · 2 nights',
      sortLabel: 'Sort',
      sorts: ['Recommended', 'Top rated', 'Lowest price'],
      filters: ['Free cancellation', 'Breakfast', 'Onsen'],
      perNight: '/ night',
      flexible: 'Free cancellation',
      fixed: 'Non-refundable'
    },
    stays: {
      kanade: {
        name: 'Ryokan Kanade',
        area: 'Gion · 0.4 km to Yasaka Shrine',
        rating: '9.4',
        verdict: 'Exceptional',
        reviews: '1,284 reviews',
        price: '$412',
        flexible: true,
        perks: ['Kaiseki dinner', 'Private onsen']
      },
      kamogawa: {
        name: 'Kamogawa House',
        area: 'Pontocho · riverside',
        rating: '9.1',
        verdict: 'Superb',
        reviews: '2,036 reviews',
        price: '$268',
        flexible: true,
        perks: ['River view', 'Breakfast']
      },
      arashi: {
        name: 'Arashi Lane Hotel',
        area: 'Arashiyama · bamboo grove',
        rating: '8.9',
        verdict: 'Fabulous',
        reviews: '967 reviews',
        price: '$226',
        flexible: false,
        perks: ['Garden', 'Bike rental']
      },
      sanjo: {
        name: 'The Sanjo',
        area: 'Nakagyo · 2 min to subway',
        rating: '8.7',
        verdict: 'Excellent',
        reviews: '3,412 reviews',
        price: '$189',
        flexible: true,
        perks: ['Rooftop bar', 'Gym']
      }
    }
  },
  zh: {
    region: 'Agent 内置浏览器演示',
    agentName: '旅行助手',
    session: '京都住宿',
    task: '在 Staynest 上找 12 月 12–14 日京都评分最高的三家住宿，对比价格和能否免费取消。',
    intro: '我在浏览器里打开 Staynest，按评分排序，再读取前三家。',
    lead: '12 月 12–14 日评分前三：',
    closing: '鸭川屋性价比最高：评分 9.1，每晚比奏便宜 ¥1,040，还能免费取消。',
    tools: [
      {
        title: '打开 Staynest 京都住宿',
        code: zhCode[0],
        output: '{ "title": "京都住宿 · Staynest", "currentUrl": "https://staynest.com/kyoto?in=2026-12-12…" }'
      },
      { title: '按评分排序', code: zhCode[1], output: '{ "ok": true, "navigated": false }' },
      {
        title: '读取前三家住宿',
        code: zhCode[2],
        output:
          'article "奏旅馆" 9.4 · ¥2,980 · 免费取消\narticle "鸭川屋" 9.1 · ¥1,940 · 免费取消\narticle "岚山小径酒店" 8.9 · ¥1,640 · 不可退款'
      },
      {
        title: '检查控制台和网络请求',
        code: zhCode[3],
        output: '{ "console": [], "requests": 27, "failed": 0 }'
      }
    ],
    codeLabel: '代码 · JavaScript',
    outputLabel: '输出',
    table: { stay: '住宿', rating: '评分', price: '每晚', cancel: '免费取消', yes: '可以', no: '不可' },
    pane: {
      browser: '浏览器',
      newTab: '新建标签页',
      agentActive: 'Agent 正在操作“{title}”',
      back: '后退',
      forward: '前进',
      reload: '刷新',
      openExternal: '在外部浏览器中打开',
      address: '网页地址',
      maximize: '最大化',
      close: '关闭侧边栏'
    },
    site: {
      title: '京都住宿 · Staynest',
      search: '京都 · 12月12日 – 14日 · 2 位',
      heading: '京都住宿',
      count: '248 家 · 2 晚',
      sortLabel: '排序',
      sorts: ['推荐', '评分最高', '价格最低'],
      filters: ['免费取消', '含早餐', '温泉'],
      perNight: '/ 晚',
      flexible: '免费取消',
      fixed: '不可退款'
    },
    stays: {
      kanade: {
        name: '奏旅馆',
        area: '祇园 · 距八坂神社 0.4 公里',
        rating: '9.4',
        verdict: '超赞',
        reviews: '1,284 条点评',
        price: '¥2,980',
        flexible: true,
        perks: ['怀石晚餐', '私汤']
      },
      kamogawa: {
        name: '鸭川屋',
        area: '先斗町 · 河畔',
        rating: '9.1',
        verdict: '非常好',
        reviews: '2,036 条点评',
        price: '¥1,940',
        flexible: true,
        perks: ['河景', '含早餐']
      },
      arashi: {
        name: '岚山小径酒店',
        area: '岚山 · 竹林旁',
        rating: '8.9',
        verdict: '很棒',
        reviews: '967 条点评',
        price: '¥1,640',
        flexible: false,
        perks: ['庭院', '单车租借']
      },
      sanjo: {
        name: '三条酒店',
        area: '中京 · 步行 2 分钟到地铁',
        rating: '8.7',
        verdict: '很好',
        reviews: '3,412 条点评',
        price: '¥1,370',
        flexible: true,
        perks: ['屋顶酒吧', '健身房']
      }
    }
  }
}
