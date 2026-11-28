import { useTranslation } from 'react-i18next'

import ai302Logo from '@/assets/images/provider_logo/302ai.svg'
import ai360Logo from '@/assets/images/provider_logo/ai360-color.svg'
import aimassLogo from '@/assets/images/provider_logo/aimass-color.svg'
import anthropicLogo from '@/assets/images/provider_logo/anthropic.svg'
import azureLogo from '@/assets/images/provider_logo/azure-color.svg'
import baichuanLogo from '@/assets/images/provider_logo/baichuan-color.svg'
import baiduCloudLogo from '@/assets/images/provider_logo/baiducloud-color.svg'
import bytedanceLogo from '@/assets/images/provider_logo/bytedance-color.svg'
import deepseekLogo from '@/assets/images/provider_logo/deepseek-color.svg'
import giteeAiLogo from '@/assets/images/provider_logo/gitee-ai.svg'
import googleLogo from '@/assets/images/provider_logo/google-color.svg'
import groqLogo from '@/assets/images/provider_logo/groq.svg'
import higressLogo from '@/assets/images/provider_logo/higress-color.svg'
import huggingfaceLogo from '@/assets/images/provider_logo/huggingface-color.svg'
import hunyuanLogo from '@/assets/images/provider_logo/hunyuan-color.svg'
import metaLogo from '@/assets/images/provider_logo/meta-color.svg'
import minimaxLogo from '@/assets/images/provider_logo/minimax-color.svg'
import mistralLogo from '@/assets/images/provider_logo/mistral-color.svg'
import modelscopeLogo from '@/assets/images/provider_logo/modelscope.webp'
import moonshotLogo from '@/assets/images/provider_logo/moonshot.svg'
import ollamaLogo from '@/assets/images/provider_logo/ollama.svg'
import openaiLogo from '@/assets/images/provider_logo/openai.svg'
import openrouterLogo from '@/assets/images/provider_logo/openrouter.svg'
import qwenLogo from '@/assets/images/provider_logo/qwen-color.svg'
import siliconcloudLogo from '@/assets/images/provider_logo/siliconcloud-color.svg'
import sparkLogo from '@/assets/images/provider_logo/spark-color.svg'
import stepfunLogo from '@/assets/images/provider_logo/stepfun-color.svg'
import xaiLogo from '@/assets/images/provider_logo/xai.svg'
import zeroOneLogo from '@/assets/images/provider_logo/zeroone.svg'
import zhipuLogo from '@/assets/images/provider_logo/zhipu-color.svg'
import DemoMount from '@/components/demos/primitives/DemoMount'
import BlurInText from '@/components/website/BlurInText'
import Marquee from '@/components/website/Marquee'
import productStats from '@/content/product-stats.json'
import { cn } from '@/lib/utils'
import { isEnglishSite } from '@/utils/urls'

interface LogoInfo {
  src: string
  name: string
  darkInvert?: boolean
}

const globalLogos: LogoInfo[] = [
  { src: openaiLogo, name: 'OpenAI', darkInvert: true },
  { src: anthropicLogo, name: 'Anthropic', darkInvert: true },
  { src: googleLogo, name: 'Google' },
  { src: xaiLogo, name: 'xAI', darkInvert: true },
  { src: metaLogo, name: 'Meta' },
  { src: deepseekLogo, name: 'DeepSeek' },
  { src: mistralLogo, name: 'Mistral' },
  { src: azureLogo, name: 'Azure' },
  { src: qwenLogo, name: 'Qwen' },
  { src: ollamaLogo, name: 'Ollama', darkInvert: true },
  { src: groqLogo, name: 'Groq', darkInvert: true },
  { src: huggingfaceLogo, name: 'Hugging Face' },
  { src: openrouterLogo, name: 'OpenRouter', darkInvert: true },
  { src: zhipuLogo, name: 'Zhipu AI' },
  { src: ai302Logo, name: '302.AI' },
  { src: bytedanceLogo, name: 'ByteDance' },
  { src: moonshotLogo, name: 'Moonshot', darkInvert: true },
  { src: baichuanLogo, name: 'Baichuan' },
  { src: minimaxLogo, name: 'MiniMax' },
  { src: siliconcloudLogo, name: 'SiliconCloud' },
  { src: stepfunLogo, name: 'StepFun' }
]

const cnLogos: LogoInfo[] = [
  { src: deepseekLogo, name: 'DeepSeek' },
  { src: qwenLogo, name: '通义千问' },
  { src: zhipuLogo, name: '智谱 AI' },
  { src: moonshotLogo, name: 'Kimi', darkInvert: true },
  { src: minimaxLogo, name: 'MiniMax' },
  { src: bytedanceLogo, name: '豆包' },
  { src: siliconcloudLogo, name: '硅基流动' },
  { src: baichuanLogo, name: '百川智能' },
  { src: stepfunLogo, name: '阶跃星辰' },
  { src: hunyuanLogo, name: '腾讯混元' },
  { src: baiduCloudLogo, name: '百度智能云' },
  { src: sparkLogo, name: '讯飞星火' },
  { src: modelscopeLogo, name: 'ModelScope 魔搭' },
  { src: giteeAiLogo, name: 'Gitee AI' },
  { src: ai360Logo, name: '360 智脑' },
  { src: zeroOneLogo, name: '零一万物', darkInvert: true },
  { src: ai302Logo, name: '302.AI' },
  { src: aimassLogo, name: 'AiMass' },
  { src: higressLogo, name: 'Higress' }
]

// Model names from the provider registry for the second, reversed marquee row.
const globalModels = [
  'Claude Opus 5.5',
  'GPT-6.2 Sol',
  'Gemini 4 Neon',
  'DeepSeek V4 Pro',
  'Grok 4.7',
  'Qwen3.8 Max',
  'Kimi K3.1 Pro',
  'GLM 5.3',
  'Mistral Large 3',
  'MiniMax-M3'
]
// The Chinese site shows domestic models only.
const cnModels = [
  'DeepSeek V4 Pro',
  'Qwen3.8 Max',
  'Kimi K3.1 Pro',
  'GLM 5.3',
  'MiniMax-M3',
  'Doubao Seed 2.1 Pro',
  'ERNIE 5.0',
  'MiMo-V2.6-Pro',
  'LongCat-2.5',
  'Step 5 Preview'
]

/** One marquee row: the items twice, so translating by -50% loops seamlessly. Hovering the row pauses it. */
export default function ProvidersSection() {
  const { t, i18n } = useTranslation()
  const isEn = isEnglishSite(i18n.resolvedLanguage || i18n.language)
  const logos = isEn ? globalLogos : cnLogos
  const models = isEn ? globalModels : cnModels
  const stats = [
    { value: productStats.labels.providers, label: t('home_page.stat_providers') },
    { value: productStats.labels.models, label: t('home_page.stat_models') },
    { value: productStats.labels.assistants, label: t('home_page.stat_assistants') }
  ]

  return (
    <section className="relative border-y border-border bg-card/40" aria-labelledby="home-providers">
      {/* Copy and stats share one row so the app window below gets the full width a real window has. */}
      <div className="site-container py-14 sm:py-20">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-16">
          <div>
            <p className="mb-3 text-sm font-medium text-muted-foreground">{t('home_page.providers')}</p>
            <h2 id="home-providers" className="text-4xl font-display text-balance sm:text-5xl">
              <BlurInText text={t('providers.title')} />
            </h2>
            <p className="mt-4 max-w-xl text-pretty text-muted-foreground zh:leading-[1.8]">
              {t('providers.subtitle')}
            </p>
          </div>
          <dl className="grid grid-cols-3 divide-x divide-border rounded-[20px] border border-border lg:w-[420px]">
            {stats.map((stat) => (
              <div key={stat.label} className="px-4 py-3.5">
                <dt className="text-xs text-muted-foreground">{stat.label}</dt>
                <dd className="mt-1 font-display text-3xl tabular-nums">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <DemoMount
          load={() => import('@/components/demos/models/ModelCompareDemo')}
          className="mx-auto mt-10 min-h-[620px] max-w-5xl"
        />
      </div>

      {/* Marquee after Incidental AI Design Academy's MIT "Marquee": provider chips over a reversed row of model names. */}
      <div className="grid gap-3.5 border-t border-border py-10 [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
        <Marquee>
          {(hidden) => (
            <ul aria-hidden={hidden || undefined} className="flex shrink-0 gap-3 pr-3">
              {logos.map(({ name, src, darkInvert }) => (
                <li
                  key={name}
                  className="flex shrink-0 items-center gap-2.5 rounded-full bg-card px-[18px] py-3 text-sm font-medium whitespace-nowrap shadow-[inset_0_0_0_1px_rgb(127_127_127/0.18)]">
                  <img src={src} alt="" className={cn('size-4 object-contain', darkInvert && 'dark:invert')} />
                  {name}
                </li>
              ))}
            </ul>
          )}
        </Marquee>
        <Marquee reverse>
          {(hidden) => (
            <ul aria-hidden={hidden || undefined} className="flex shrink-0">
              {models.map((model) => (
                <li
                  key={model}
                  className="shrink-0 px-[18px] font-serif text-[34px] leading-none whitespace-nowrap italic">
                  {model}
                </li>
              ))}
            </ul>
          )}
        </Marquee>
      </div>
    </section>
  )
}
