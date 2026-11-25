// Community reviews shown on both sites. Keep only quotes with a public source link.
export type TestimonialPlatform = 'producthunt' | 'medium' | 'alternativeto' | 'hackernews'

export interface Testimonial {
  id: number
  name: string
  handle?: string
  avatar?: string
  platform: TestimonialPlatform
  url: string
  content: { en: string; zh: string }
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: '🐱',
    handle: '@siin_xu',
    avatar:
      'https://ph-avatars.imgix.net/8957887/c71dde6b-660e-429b-afc7-c82ce9c5fc46.png?auto=format&w=120&h=120&fit=crop',
    platform: 'producthunt',
    url: 'https://www.producthunt.com/products/cherry-studio/reviews',
    content: {
      en: "This has become one of those can't-live-without-it, first-thing-I-open kind of tools. The side-by-side model debugging is the core magic here. No more copy-pasting prompts between ten different windows. It's all right there.",
      zh: '这已经成为我离不开的工具，每天第一个打开的就是它。并排模型调试是核心功能，再也不用在十几个窗口之间复制粘贴提示词了，一切都在这里。'
    }
  },
  {
    id: 2,
    name: 'Nadet',
    handle: '@nadetdev',
    avatar: 'https://ph-avatars.imgix.net/7095637/original.jpeg?auto=format&w=120&h=120&fit=crop',
    platform: 'producthunt',
    url: 'https://www.producthunt.com/products/cherry-studio/reviews',
    content: {
      en: "An excellent AI studio offering numerous possibilities for AI applications: chat and agents. As an application developer, Cherry Studio is more than just a tool; it's a foundation and a crucial asset.",
      zh: '一个出色的 AI 工作台，为对话和智能体提供了丰富的可能性。作为应用开发者，Cherry Studio 不只是一个工具，更是一项基础设施和关键资产。'
    }
  },
  {
    id: 3,
    name: 'Abdullah Ahmed',
    handle: '@abdullah_ahmed22',
    avatar: 'https://ph-avatars.imgix.net/7817744/original.png?auto=format&w=120&h=120&fit=crop',
    platform: 'producthunt',
    url: 'https://www.producthunt.com/products/cherry-studio/reviews',
    content: {
      en: 'This is such a great piece of software. The simplicity and the inclusion of every feature possible is too good. I have even used OpenWebUI / LibreChat etc but this is much easier to setup with so much better outputs.',
      zh: '这是一款非常棒的软件，简洁却又几乎包含了所有你想要的功能。我用过 OpenWebUI、LibreChat 等等，但它的配置要简单得多，输出效果也好得多。'
    }
  },
  {
    id: 4,
    name: 'Tintin Yuan',
    platform: 'alternativeto',
    url: 'https://alternativeto.net/software/cherry-studio/about/',
    content: {
      en: "It's an all-in-one AI agent. I uninstalled all my other llm applications just keep this one to replace them all. Really convenient.",
      zh: '这是一个全能的 AI 智能体。我把其他所有 LLM 应用都卸载了，只留下它一个来替代它们，真的很方便。'
    }
  },
  {
    id: 5,
    name: 'Bernard Monsun',
    platform: 'alternativeto',
    url: 'https://alternativeto.net/software/cherry-studio/about/',
    content: {
      en: 'All-in-one app for everyday tasks — and more than just that. Huge library of prompts… Lot of API providers with local Ollama, agent & topic instructions, custom CSS, knowledge base, MCP… really a lot.',
      zh: '日常任务的全能应用，而且远不止于此。庞大的提示词库……大量 API 服务商、本地 Ollama、助手与话题设定、自定义 CSS、知识库、MCP……真的非常丰富。'
    }
  },
  {
    id: 6,
    name: 'novoreorx',
    platform: 'hackernews',
    url: 'https://news.ycombinator.com/item?id=46053347',
    content: {
      en: 'Cherry Studio is my daily go-to… a dedicated app to access any LLMs with full power of MCP and various tools.',
      zh: 'Cherry Studio 是我每天都在用的工具……一个能接入任意大模型、并完整发挥 MCP 和各种工具能力的专用应用。'
    }
  },
  {
    id: 7,
    name: 'Jannis',
    handle: '@PowerUpSkills',
    avatar: 'https://miro.medium.com/v2/resize:fill:176:176/1*dmbNkD5D-u45r44go_cf0g.png',
    platform: 'medium',
    url: 'https://medium.com/@PowerUpSkills/the-one-ai-client-to-rule-them-all-cherry-studio-in-2025-ac71837eb892',
    content: {
      en: 'The One AI Client to Rule Them All. Cherry Studio in 2025 has grown to be the most versatile AI desktop client with 33k+ GitHub stars.',
      zh: '统一所有 AI 的客户端。2025 年的 Cherry Studio 已经成长为最全能的 AI 桌面客户端，GitHub 上已有 33k+ stars。'
    }
  }
]
