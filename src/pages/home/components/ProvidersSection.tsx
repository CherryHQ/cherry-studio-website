import { ChevronDown } from 'lucide-react'
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
import { cn } from '@/lib/utils'

interface LogoInfo {
  src: string
  name: string
  darkInvert?: boolean
}

const globalFeatured: LogoInfo[] = [
  { src: openaiLogo, name: 'OpenAI', darkInvert: true },
  { src: anthropicLogo, name: 'Anthropic', darkInvert: true },
  { src: googleLogo, name: 'Google' },
  { src: xaiLogo, name: 'xAI', darkInvert: true },
  { src: metaLogo, name: 'Meta' },
  { src: deepseekLogo, name: 'DeepSeek' }
]

const globalAdditional: LogoInfo[] = [
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

const cnFeatured: LogoInfo[] = [
  { src: deepseekLogo, name: 'DeepSeek' },
  { src: qwenLogo, name: '通义千问' },
  { src: zhipuLogo, name: '智谱 AI' },
  { src: moonshotLogo, name: 'Kimi', darkInvert: true },
  { src: minimaxLogo, name: 'MiniMax' },
  { src: bytedanceLogo, name: '豆包' }
]

const cnAdditional: LogoInfo[] = [
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

function ProviderList({ logos, className }: { logos: LogoInfo[]; className?: string }) {
  return (
    <ul className={cn('flex flex-wrap gap-x-6 gap-y-3', className)}>
      {logos.map(({ name, src, darkInvert }) => (
        <li key={name} className="flex items-center gap-2 text-sm font-medium">
          <img src={src} alt="" className={cn('size-4 object-contain saturate-60', darkInvert && 'dark:invert')} />
          {name}
        </li>
      ))}
    </ul>
  )
}

export default function ProvidersSection() {
  const { t, i18n } = useTranslation()
  const isZh = i18n.language.startsWith('zh')
  const featured = isZh ? cnFeatured : globalFeatured
  const additional = isZh ? cnAdditional : globalAdditional

  return (
    <section className="border-b border-border bg-card" aria-labelledby="home-providers">
      <div className="site-container py-6 lg:grid lg:grid-cols-[1fr_auto] lg:items-center lg:gap-x-6 lg:gap-y-3">
        <h2
          id="home-providers"
          className="mb-3 font-mono lg:col-span-2 lg:mb-0 text-xs font-medium tracking-wider text-muted-foreground uppercase">
          {t('home_page.providers')}
        </h2>
        <ProviderList logos={featured} />
        <details className="group mt-3 lg:contents">
          <summary className="inline-flex cursor-pointer list-none items-center gap-1.5 rounded-sm text-xs text-muted-foreground hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 lg:justify-self-end [&::-webkit-details-marker]:hidden">
            {t('home_page.more_providers')}
            <ChevronDown
              aria-hidden="true"
              className="size-3.5 group-open:rotate-180 motion-safe:transition-transform"
            />
          </summary>
          <ProviderList logos={additional} className="mt-4 border-t border-border pt-4 lg:col-span-2 lg:mt-0" />
        </details>
      </div>
    </section>
  )
}
