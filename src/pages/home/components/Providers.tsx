import { motion } from 'framer-motion'
import { FC, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

// Import all logos
import ai302Logo from '@/assets/images/provider_logo/302ai.svg'
import alayaLogo from '@/assets/images/provider_logo/alaya.png'
import anthropicLogo from '@/assets/images/provider_logo/anthropic.svg'
import azureLogo from '@/assets/images/provider_logo/azure-color.svg'
import baichuanLogo from '@/assets/images/provider_logo/baichuan-color.svg'
import baiducloudLogo from '@/assets/images/provider_logo/baiducloud-color.svg'
import bytedanceLogo from '@/assets/images/provider_logo/bytedance-color.svg'
import deepseekLogo from '@/assets/images/provider_logo/deepseek-color.svg'
import giteeaiLogo from '@/assets/images/provider_logo/gitee-ai.svg'
import githubLogo from '@/assets/images/provider_logo/github.svg'
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
import nvidiaLogo from '@/assets/images/provider_logo/nvidia-color.svg'
import ollamaLogo from '@/assets/images/provider_logo/ollama.svg'
import openaiLogo from '@/assets/images/provider_logo/openai.svg'
import openrouterLogo from '@/assets/images/provider_logo/openrouter.svg'
import poeLogo from '@/assets/images/provider_logo/poe.webp'
import qwenLogo from '@/assets/images/provider_logo/qwen-color.svg'
import siliconcloudLogo from '@/assets/images/provider_logo/siliconcloud-color.svg'
import sparkLogo from '@/assets/images/provider_logo/spark-color.svg'
import stepfunLogo from '@/assets/images/provider_logo/stepfun-color.svg'
import togetherLogo from '@/assets/images/provider_logo/together-color.svg'
import xaiLogo from '@/assets/images/provider_logo/xai.svg'
import zerooneLogo from '@/assets/images/provider_logo/zeroone.svg'
import zhipuLogo from '@/assets/images/provider_logo/zhipu-color.svg'

interface LogoInfo {
  src: string
  url: string
  name: string
  darkInvert?: boolean // 暗色模式下需要反色的黑色图标
}

const logos: LogoInfo[] = [
  { src: anthropicLogo, url: 'https://www.anthropic.com/', name: 'Anthropic', darkInvert: true },
  { src: deepseekLogo, url: 'https://www.deepseek.com/', name: 'Deepseek' },
  { src: azureLogo, url: 'https://azure.microsoft.com/', name: 'Azure' },
  { src: modelscopeLogo, url: 'https://www.modelscope.cn/', name: 'ModelScope' },
  { src: ollamaLogo, url: 'https://ollama.ai/', name: 'Ollama', darkInvert: true },
  { src: openaiLogo, url: 'https://openai.com/', name: 'OpenAI', darkInvert: true },
  { src: ai302Logo, url: 'https://302.ai/', name: '302.AI' },
  { src: poeLogo, url: 'https://poe.com/', name: 'Poe' },
  { src: alayaLogo, url: 'https://www.alayanew.com/', name: 'Alaya' },
  { src: baiducloudLogo, url: 'https://cloud.baidu.com/', name: 'Baidu Cloud' },
  { src: bytedanceLogo, url: 'https://www.bytedance.com/', name: 'ByteDance' },
  { src: githubLogo, url: 'https://github.com/', name: 'GitHub', darkInvert: true },
  { src: googleLogo, url: 'https://ai.google/', name: 'Google' },
  { src: groqLogo, url: 'https://groq.com/', name: 'Groq', darkInvert: true },
  { src: higressLogo, url: 'https://higress.cn/', name: 'Higress' },
  { src: huggingfaceLogo, url: 'https://huggingface.co/', name: 'Hugging Face' },
  { src: hunyuanLogo, url: 'https://hunyuan.tencent.com/', name: 'Hunyuan' },
  { src: baichuanLogo, url: 'https://www.baichuan-ai.com/', name: 'Baichuan' },
  { src: metaLogo, url: 'https://ai.meta.com/', name: 'Meta' },
  { src: minimaxLogo, url: 'https://www.minimaxi.com/', name: 'MiniMax' },
  { src: mistralLogo, url: 'https://mistral.ai/', name: 'Mistral AI' },
  { src: moonshotLogo, url: 'https://www.moonshot.cn/', name: 'Moonshot', darkInvert: true },
  { src: nvidiaLogo, url: 'https://www.nvidia.com/', name: 'NVIDIA' },
  { src: openrouterLogo, url: 'https://openrouter.ai/', name: 'OpenRouter', darkInvert: true },
  { src: qwenLogo, url: 'https://qianwen.aliyun.com/', name: 'Qwen' },
  { src: siliconcloudLogo, url: 'https://siliconflow.cn/', name: 'Silicon Cloud' },
  { src: sparkLogo, url: 'https://xinghuo.xfyun.cn/', name: 'Spark' },
  { src: stepfunLogo, url: 'https://stepfun.ai/', name: 'Stepfun' },
  { src: togetherLogo, url: 'https://www.together.ai/', name: 'Together' },
  { src: xaiLogo, url: 'https://x.ai/', name: 'xAI', darkInvert: true },
  { src: zerooneLogo, url: 'https://01.ai/', name: '01.AI', darkInvert: true },
  { src: zhipuLogo, url: 'https://www.zhipuai.cn/', name: 'Zhipu AI' },
  { src: giteeaiLogo, url: 'https://ai.gitee.com/', name: 'Gitee AI' }
]

const Providers: FC = () => {
  const { t } = useTranslation()
  const trackRef = useRef<HTMLDivElement>(null)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const setupAnimation = () => {
      const contentWidth = track.scrollWidth / 2
      const speed = 30
      track.style.setProperty('--scroll-width', `-${contentWidth}px`)
      track.style.setProperty('--animation-duration', `${speed}s`)
    }

    setupAnimation()

    const handleResize = () => setupAnimation()
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <section className="relative overflow-hidden bg-secondary/30 py-20">
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-20" />

      <div className="relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-12 max-w-3xl px-4 text-center">
          <h2 className="mb-4 text-2xl font-bold text-foreground sm:text-3xl lg:text-4xl">{t('providers.title')}</h2>
          <p className="text-muted-foreground">{t('providers.subtitle')}</p>
        </motion.div>

        {/* Logo Marquee */}
        <div
          className="relative overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}>
          {/* Gradient Masks */}
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-background to-transparent" />

          <div
            ref={trackRef}
            className={`flex gap-8 ${isPaused ? '[animation-play-state:paused]' : ''}`}
            style={{ animation: 'scroll var(--animation-duration, 30s) linear infinite' }}>
            {/* First set of logos */}
            {logos.map((logo, index) => (
              <a
                key={`logo-1-${index}`}
                href={logo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-24 w-44 flex-shrink-0 items-center justify-center rounded-xl border border-border/50 bg-card/50 px-6 transition-all duration-300 hover:border-primary/50 hover:bg-card"
                title={logo.name}>
                <img
                  src={logo.src}
                  alt={`${logo.name} Logo`}
                  className={`h-10 w-auto object-contain transition-all duration-300 group-hover:scale-110 ${logo.darkInvert ? 'dark:invert' : ''}`}
                  loading="lazy"
                />
              </a>
            ))}

            {/* Duplicate set for seamless loop */}
            {logos.map((logo, index) => (
              <a
                key={`logo-2-${index}`}
                href={logo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-24 w-44 flex-shrink-0 items-center justify-center rounded-xl border border-border/50 bg-card/50 px-6 transition-all duration-300 hover:border-primary/50 hover:bg-card"
                title={logo.name}>
                <img
                  src={logo.src}
                  alt={`${logo.name} Logo`}
                  className={`h-10 w-auto object-contain transition-all duration-300 group-hover:scale-110 ${logo.darkInvert ? 'dark:invert' : ''}`}
                  loading="lazy"
                />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Animation keyframes */}
      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(var(--scroll-width, -50%));
          }
        }
      `}</style>
    </section>
  )
}

export default Providers
