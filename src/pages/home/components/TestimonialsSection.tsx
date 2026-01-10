import type { FC } from 'react'
import { useTranslation } from 'react-i18next'

interface Testimonial {
  id: number
  name: string
  handle: string
  avatar: string
  platform: 'producthunt' | 'github' | 'medium' | 'twitter' | 'csdn'
  content: {
    en: string
    zh: string
  }
  rating?: number
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Eric Hu',
    handle: '@erichudev',
    avatar:
      'https://ph-avatars.imgix.net/7081066/af4d0d2d-5f4e-4635-8d8c-efb3e4f96d22.png?auto=compress&codec=mozjpeg&cs=strip&auto=format&w=120&h=120&fit=crop&dpr=1',
    platform: 'producthunt',
    content: {
      en: "This has become one of those can't-live-without-it, first-thing-I-open kind of tools. The side-by-side model debugging is the core magic here. No more copy-pasting prompts between ten different windows.",
      zh: '这已经成为我离不开的工具，每天第一个打开的就是它。并排模型调试是核心功能，再也不用在十几个窗口之间复制粘贴提示词了。'
    },
    rating: 5
  },
  {
    id: 2,
    name: 'Jannis',
    handle: '@PowerUpSkills',
    avatar: 'https://miro.medium.com/v2/resize:fill:176:176/1*dmbNkD5D-u45r44go_cf0g.png',
    platform: 'medium',
    content: {
      en: 'The One AI Client to Rule Them All. Cherry Studio in 2025 has grown to be the most versatile AI desktop client with 33k+ GitHub stars.',
      zh: '统一所有 AI 的客户端。2025 年的 Cherry Studio 已经成长为最全能的 AI 桌面客户端，GitHub 上已有 33k+ stars。'
    },
    rating: 5
  },
  {
    id: 3,
    name: 'Alex Chen',
    handle: '@alexchen',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alex',
    platform: 'producthunt',
    content: {
      en: "Insanely fast and just makes sense to use. Model comparison is just chef's kiss. This is what AI tooling should feel like.",
      zh: '速度快得离谱，用起来非常顺手。模型对比功能简直完美，这才是 AI 工具应该有的样子。'
    },
    rating: 5
  },
  {
    id: 4,
    name: 'TechExplorer',
    handle: '@techexplorer',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=tech',
    platform: 'github',
    content: {
      en: 'I tested similar clients on PC and Cherry Studio absolutely amazed me with its experience. The UI is clean and the features are incredibly rich.',
      zh: '我在 PC 上用了一圈类似的客户端，Cherry Studio 在体验上算是惊艳到我的，界面简洁但功能非常丰富。'
    },
    rating: 5
  },
  {
    id: 5,
    name: 'Sarah Wang',
    handle: '@sarahwang',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
    platform: 'twitter',
    content: {
      en: 'The knowledge base feature is a game changer. I can import my documents and web pages to build a personalized AI assistant.',
      zh: '知识库功能太好用了，可以导入文档和网页构建个性化的 AI 助手。'
    },
    rating: 5
  },
  {
    id: 6,
    name: 'DevMaster',
    handle: '@devmaster',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=dev',
    platform: 'csdn',
    content: {
      en: 'A friendly interface with rich features. The built-in assistants covering technical writing, DevOps, and many professional areas are particularly useful.',
      zh: '友好的界面，丰富的功能。内置的智能助手覆盖技术写作、DevOps 等多个专业领域，特别实用。'
    },
    rating: 5
  },
  {
    id: 7,
    name: 'Michael Zhang',
    handle: '@michaelz',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=michael',
    platform: 'github',
    content: {
      en: 'Privacy-first design is exactly what I needed. All data stays local, and I can use my own API keys. Perfect for enterprise use.',
      zh: '隐私优先的设计正是我需要的。所有数据都保存在本地，还能使用自己的 API 密钥。非常适合企业使用。'
    },
    rating: 5
  },
  {
    id: 8,
    name: 'Emily Liu',
    handle: '@emilyliu',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=emily',
    platform: 'producthunt',
    content: {
      en: '5/5 - I really like this software, and it is free! The multiple backup methods make switching between devices worry-free.',
      zh: '5/5 - 我真的很喜欢这个软件，而且完全免费！多种备份方式让多设备切换无忧。'
    },
    rating: 5
  },
  {
    id: 9,
    name: 'David Park',
    handle: '@davidpark',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=david',
    platform: 'twitter',
    content: {
      en: 'Finally an AI client that supports all major providers in one place. The translation feature alone saves me hours every week.',
      zh: '终于有一个 AI 客户端可以在一个地方支持所有主流服务商了。光是翻译功能就能每周节省我好几个小时。'
    },
    rating: 5
  }
]

const platformIcons: Record<string, JSX.Element> = {
  producthunt: (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm-1.5 5v10h2v-3h2a3 3 0 000-6h-4zm2 2h2a1 1 0 110 2h-2V9z" />
    </svg>
  ),
  github: (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  ),
  medium: (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
    </svg>
  ),
  twitter: (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  csdn: (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-.5 4.5h1a.5.5 0 01.5.5v3a.5.5 0 01-.5.5h-1a.5.5 0 01-.5-.5V5a.5.5 0 01.5-.5zm-5 4h11a.5.5 0 01.5.5v1a.5.5 0 01-.5.5h-11a.5.5 0 01-.5-.5V9a.5.5 0 01.5-.5zm0 4h11a.5.5 0 01.5.5v1a.5.5 0 01-.5.5h-11a.5.5 0 01-.5-.5v-1a.5.5 0 01.5-.5zm3 4h5a.5.5 0 01.5.5v1a.5.5 0 01-.5.5h-5a.5.5 0 01-.5-.5v-1a.5.5 0 01.5-.5z" />
    </svg>
  )
}

const platformNames: Record<string, string> = {
  producthunt: 'Product Hunt',
  github: 'GitHub',
  medium: 'Medium',
  twitter: 'X (Twitter)',
  csdn: 'CSDN'
}

const StarRating: FC<{ rating: number }> = ({ rating }) => {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`h-4 w-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

const TestimonialsSection: FC = () => {
  const { t, i18n } = useTranslation()
  const isZh = i18n.language.startsWith('zh')

  return (
    <section className="bg-background relative overflow-hidden py-12 sm:py-16">
      <div className="dot-pattern absolute inset-0 opacity-20" />

      <div className="relative z-10 mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center sm:mb-16">
          <h2 className="text-foreground mb-3 text-2xl font-bold sm:mb-4 sm:text-4xl lg:text-5xl">
            {t('testimonials.title')}
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base">{t('testimonials.subtitle')}</p>
        </div>

        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="border-border/50 bg-card/50 hover:border-primary/30 hover:bg-card group rounded-xl border p-6 transition-all duration-300">
              {/* Header with avatar and info */}
              <div className="mb-4 flex items-start gap-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="ring-border group-hover:ring-primary/50 h-12 w-12 rounded-full ring-2 transition-all duration-300"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-foreground font-semibold">{testimonial.name}</h3>
                      <p className="text-muted-foreground text-sm">{testimonial.handle}</p>
                    </div>
                    <div
                      className="text-muted-foreground hover:text-foreground flex items-center gap-1.5 transition-colors"
                      title={platformNames[testimonial.platform]}>
                      {platformIcons[testimonial.platform]}
                    </div>
                  </div>
                </div>
              </div>

              {/* Rating */}
              {testimonial.rating && (
                <div className="mb-3">
                  <StarRating rating={testimonial.rating} />
                </div>
              )}

              {/* Content */}
              <p className="text-muted-foreground leading-relaxed">
                "{isZh ? testimonial.content.zh : testimonial.content.en}"
              </p>
            </div>
          ))}
        </div>

        {/* Source links */}
        <div className="mt-10 text-center">
          <p className="text-muted-foreground mb-4 text-sm">{t('testimonials.source_hint')}</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://www.producthunt.com/products/cherry-studio/reviews"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary inline-flex items-center gap-2 text-sm transition-colors">
              {platformIcons.producthunt}
              <span>Product Hunt</span>
            </a>
            <a
              href="https://github.com/CherryHQ/cherry-studio"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary inline-flex items-center gap-2 text-sm transition-colors">
              {platformIcons.github}
              <span>GitHub</span>
            </a>
            <a
              href="https://medium.com/@PowerUpSkills/the-one-ai-client-to-rule-them-all-cherry-studio-in-2025-ac71837eb892"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary inline-flex items-center gap-2 text-sm transition-colors">
              {platformIcons.medium}
              <span>Medium</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection
