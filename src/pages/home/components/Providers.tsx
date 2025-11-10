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
}

const logos: LogoInfo[] = [
  { src: anthropicLogo, url: 'https://www.anthropic.com/', name: 'Anthropic' },
  { src: deepseekLogo, url: 'https://www.deepseek.com/', name: 'Deepseek' },
  { src: azureLogo, url: 'https://azure.microsoft.com/', name: 'Azure' },
  { src: modelscopeLogo, url: 'https://www.modelscope.cn/', name: 'ModelScope' },
  { src: ollamaLogo, url: 'https://ollama.ai/', name: 'Ollama' },
  { src: openaiLogo, url: 'https://openai.com/', name: 'OpenAI' },
  { src: ai302Logo, url: 'https://302.ai/', name: '302.AI' },
  { src: poeLogo, url: 'https://poe.com/', name: 'Poe' },
  { src: alayaLogo, url: 'https://www.alayanew.com/', name: 'Alaya' },
  { src: baiducloudLogo, url: 'https://cloud.baidu.com/', name: 'Baidu Cloud' },
  { src: bytedanceLogo, url: 'https://www.bytedance.com/', name: 'ByteDance' },
  { src: githubLogo, url: 'https://github.com/', name: 'GitHub' },
  { src: googleLogo, url: 'https://ai.google/', name: 'Google' },
  { src: groqLogo, url: 'https://groq.com/', name: 'Groq' },
  { src: higressLogo, url: 'https://higress.cn/', name: 'Higress' },
  { src: huggingfaceLogo, url: 'https://huggingface.co/', name: 'Hugging Face' },
  { src: hunyuanLogo, url: 'https://hunyuan.tencent.com/', name: 'Hunyuan' },
  { src: baichuanLogo, url: 'https://www.baichuan-ai.com/', name: 'Baichuan' },
  { src: metaLogo, url: 'https://ai.meta.com/', name: 'Meta' },
  { src: minimaxLogo, url: 'https://www.minimaxi.com/', name: 'MiniMax' },
  { src: mistralLogo, url: 'https://mistral.ai/', name: 'Mistral AI' },
  { src: moonshotLogo, url: 'https://www.moonshot.cn/', name: 'Moonshot' },
  { src: nvidiaLogo, url: 'https://www.nvidia.com/', name: 'NVIDIA' },
  { src: openrouterLogo, url: 'https://openrouter.ai/', name: 'OpenRouter' },
  { src: qwenLogo, url: 'https://qianwen.aliyun.com/', name: 'Qwen' },
  { src: siliconcloudLogo, url: 'https://siliconflow.cn/', name: 'Silicon Cloud' },
  { src: sparkLogo, url: 'https://xinghuo.xfyun.cn/', name: 'Spark' },
  { src: stepfunLogo, url: 'https://stepfun.ai/', name: 'Stepfun' },
  { src: togetherLogo, url: 'https://www.together.ai/', name: 'Together' },
  { src: xaiLogo, url: 'https://x.ai/', name: 'xAI' },
  { src: zerooneLogo, url: 'https://01.ai/', name: '01.AI' },
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

    // Calculate animation duration based on content width
    const setupAnimation = () => {
      const contentWidth = track.scrollWidth / 2 // Divide by 2 since we duplicate logos
      const speed = 30 // seconds for full scroll
      track.style.setProperty('--scroll-width', `-${contentWidth}px`)
      track.style.setProperty('--animation-duration', `${speed}s`)
    }

    setupAnimation()

    // Recalculate on window resize
    const handleResize = () => setupAnimation()
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <section className="overflow-hidden bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h3 className="mb-10 text-center text-2xl font-semibold text-gray-900 md:text-4xl">
          {t('providers.title')}
          <br />
          <span className="mt-1 inline-block text-lg font-normal text-gray-600 md:text-xl">
            {t('providers.subtitle')}
          </span>
        </h3>

        <div className="relative" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
          <div className="overflow-hidden">
            <div
              ref={trackRef}
              className={`flex gap-8 ${isPaused ? '[animation-play-state:paused]' : ''}`}
              style={{ animation: 'scroll var(--animation-duration, 30s) linear infinite' }}>
              {/* First set of logos */}
              {logos.map((logo, index) => (
                <div
                  key={`logo-1-${index}`}
                  className="flex h-20 w-[104px] flex-shrink-0 items-center justify-center px-5">
                  <a
                    href={logo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-full w-full items-center justify-center transition-transform duration-300 ease-in-out hover:scale-110"
                    title={logo.name}>
                    <img
                      src={logo.src}
                      alt={`${logo.name} Logo`}
                      width="120"
                      height="60"
                      style={{ maxWidth: '120px', maxHeight: '60px', objectFit: 'contain' }}
                      loading="lazy"
                    />
                  </a>
                </div>
              ))}

              {/* Duplicate set for seamless loop */}
              {logos.map((logo, index) => (
                <div
                  key={`logo-2-${index}`}
                  className="flex h-20 w-[104px] flex-shrink-0 items-center justify-center px-5">
                  <a
                    href={logo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-full w-full items-center justify-center transition-transform duration-300 ease-in-out hover:scale-110"
                    title={logo.name}>
                    <img
                      src={logo.src}
                      alt={`${logo.name} Logo`}
                      width="120"
                      height="60"
                      style={{ maxWidth: '120px', maxHeight: '60px', objectFit: 'contain' }}
                      loading="lazy"
                    />
                  </a>
                </div>
              ))}
            </div>
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
