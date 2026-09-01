import { type FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

// Import logos
import ai302Logo from '@/assets/images/provider_logo/302ai.svg'
import ai360Logo from '@/assets/images/provider_logo/ai360-color.svg'
import baichuanLogo from '@/assets/images/provider_logo/baichuan-color.svg'
import baiducloudLogo from '@/assets/images/provider_logo/baiducloud-color.svg'
import bytedanceLogo from '@/assets/images/provider_logo/bytedance-color.svg'
import deepseekLogo from '@/assets/images/provider_logo/deepseek-color.svg'
import giteeAiLogo from '@/assets/images/provider_logo/gitee-ai.svg'
import higressLogo from '@/assets/images/provider_logo/higress-color.svg'
import hunyuanLogo from '@/assets/images/provider_logo/hunyuan-color.svg'
import minimaxLogo from '@/assets/images/provider_logo/minimax-color.svg'
import modelscopeLogo from '@/assets/images/provider_logo/modelscope.webp'
import moonshotLogo from '@/assets/images/provider_logo/moonshot.svg'
import ollamaLogo from '@/assets/images/provider_logo/ollama.svg'
import qwenLogo from '@/assets/images/provider_logo/qwen-color.svg'
import siliconcloudLogo from '@/assets/images/provider_logo/siliconcloud-color.svg'
import sparkLogo from '@/assets/images/provider_logo/spark-color.svg'
import stepfunLogo from '@/assets/images/provider_logo/stepfun-color.svg'
import zerooneLogo from '@/assets/images/provider_logo/zeroone.svg'
import zhipuLogo from '@/assets/images/provider_logo/zhipu-color.svg'

interface LogoInfo {
  src: string
  name: string
  darkInvert?: boolean
}

// 内环 logos (6个) - 最知名的顶级服务商
const innerLogos: LogoInfo[] = [
  { src: deepseekLogo, name: 'DeepSeek' },
  { src: moonshotLogo, name: 'Kimi', darkInvert: true },
  { src: zhipuLogo, name: 'Zhipu GLM' },
  { src: minimaxLogo, name: 'MiniMax' },
  { src: qwenLogo, name: 'Qwen' },
  { src: bytedanceLogo, name: 'Doubao' }
]

// 外环 logos - 其他知名服务商
const outerLogos: LogoInfo[] = [
  { src: baichuanLogo, name: 'Baichuan' },
  { src: hunyuanLogo, name: 'Tencent Hunyuan' },
  { src: sparkLogo, name: 'iFlytek Spark' },
  { src: stepfunLogo, name: 'StepFun' },
  { src: siliconcloudLogo, name: 'SiliconCloud' },
  { src: baiducloudLogo, name: 'Baidu AI Cloud' },
  { src: giteeAiLogo, name: 'Gitee AI', darkInvert: true },
  { src: modelscopeLogo, name: 'ModelScope' },
  { src: ai360Logo, name: '360 AI' },
  { src: zerooneLogo, name: '01.AI', darkInvert: true },
  { src: ai302Logo, name: '302.AI' },
  { src: higressLogo, name: 'Higress' },
  { src: ollamaLogo, name: 'Ollama', darkInvert: true }
]

const ProvidersSection: FC = () => {
  const { t } = useTranslation()
  const [outerAngle, setOuterAngle] = useState(0)
  const [innerAngle, setInnerAngle] = useState(0)

  useEffect(() => {
    let animationId: number
    let lastTime = performance.now()

    const animate = (currentTime: number) => {
      const deltaTime = currentTime - lastTime
      lastTime = currentTime

      // 外环顺时针慢，内环逆时针快
      setOuterAngle((prev) => (prev + deltaTime * 0.008) % 360)
      setInnerAngle((prev) => (prev - deltaTime * 0.02) % 360)

      animationId = requestAnimationFrame(animate)
    }

    animationId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationId)
  }, [])

  const getPosition = (index: number, total: number, radius: number, baseAngle: number) => {
    const angle = ((index * 360) / total + baseAngle - 90) * (Math.PI / 180)
    return {
      x: 50 + radius * Math.cos(angle),
      y: 50 + radius * Math.sin(angle)
    }
  }

  return (
    <section className="bg-background relative overflow-hidden py-8 sm:py-16">
      <div className="relative z-10 mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto mb-8 max-w-3xl text-center sm:mb-16">
          <h2 className="text-foreground mb-3 text-2xl font-bold sm:mb-4 sm:text-4xl lg:text-5xl">
            {t('providers.title')}
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base">{t('providers.subtitle')}</p>
        </div>

        {/* Orbital Animation */}
        <div className="relative mx-auto h-[320px] w-[320px] sm:h-[500px] sm:w-[500px] lg:h-[600px] lg:w-[600px]">
          {/* Outer orbit ring */}
          <div className="border-border/60 absolute inset-0 rounded-full border" />

          {/* Inner orbit ring */}
          <div className="border-border/60 absolute inset-[25%] rounded-full border" />

          {/* Outer orbit logos */}
          {outerLogos.map((logo, index) => {
            const pos = getPosition(index, outerLogos.length, 50, outerAngle)
            return (
              <div
                key={logo.name}
                className="absolute -translate-x-1/2 -translate-y-1/2 transition-none"
                style={{
                  left: `${pos.x}%`,
                  top: `${pos.y}%`
                }}>
                <div className="bg-background border-border/50 flex h-14 w-14 items-center justify-center rounded-full border shadow-sm sm:h-16 sm:w-16 lg:h-18 lg:w-18">
                  <img
                    src={logo.src}
                    alt={logo.name}
                    title={logo.name}
                    className={`h-7 w-7 object-contain sm:h-8 sm:w-8 lg:h-9 lg:w-9 ${logo.darkInvert ? 'dark:invert' : ''}`}
                  />
                </div>
              </div>
            )
          })}

          {/* Inner orbit logos */}
          {innerLogos.map((logo, index) => {
            const pos = getPosition(index, innerLogos.length, 25, innerAngle)
            return (
              <div
                key={logo.name}
                className="absolute -translate-x-1/2 -translate-y-1/2 transition-none"
                style={{
                  left: `${pos.x}%`,
                  top: `${pos.y}%`
                }}>
                <div className="bg-background border-border/50 flex h-11 w-11 items-center justify-center rounded-full border shadow-sm sm:h-13 sm:w-13 lg:h-14 lg:w-14">
                  <img
                    src={logo.src}
                    alt={logo.name}
                    title={logo.name}
                    className={`h-5 w-5 object-contain sm:h-6 sm:w-6 lg:h-7 lg:w-7 ${logo.darkInvert ? 'dark:invert' : ''}`}
                  />
                </div>
              </div>
            )
          })}

          {/* Center text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-primary text-4xl font-bold sm:text-5xl lg:text-6xl">300+</div>
              <div className="text-muted-foreground mt-1 text-sm sm:text-base">Models</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProvidersSection
