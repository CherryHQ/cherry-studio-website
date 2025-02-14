// Import all logos
import ai360Logo from '../images/provider_logo/ai360-color.svg'
import aimassLogo from '../images/provider_logo/aimass-color.svg'
import anthropicLogo from '../images/provider_logo/anthropic.svg'
import azureLogo from '../images/provider_logo/azure-color.svg'
import baichuanLogo from '../images/provider_logo/baichuan-color.svg'
import baiducloudLogo from '../images/provider_logo/baiducloud-color.svg'
import bytedanceLogo from '../images/provider_logo/bytedance-color.svg'
import deepseekLogo from '../images/provider_logo/deepseek-color.svg'
import githubLogo from '../images/provider_logo/github.svg'
import googleLogo from '../images/provider_logo/google-color.svg'
import groqLogo from '../images/provider_logo/groq.svg'
import higressLogo from '../images/provider_logo/higress-color.svg'
import huggingfaceLogo from '../images/provider_logo/huggingface-color.svg'
import hunyuanLogo from '../images/provider_logo/hunyuan-color.svg'
import metaLogo from '../images/provider_logo/meta-color.svg'
import minimaxLogo from '../images/provider_logo/minimax-color.svg'
import mistralLogo from '../images/provider_logo/mistral-color.svg'
import moonshotLogo from '../images/provider_logo/moonshot.svg'
import nvidiaLogo from '../images/provider_logo/nvidia-color.svg'
import ollamaLogo from '../images/provider_logo/ollama.svg'
import openaiLogo from '../images/provider_logo/openai.svg'
import openrouterLogo from '../images/provider_logo/openrouter.svg'
import qwenLogo from '../images/provider_logo/qwen-color.svg'
import siliconcloudLogo from '../images/provider_logo/siliconcloud-color.svg'
import sparkLogo from '../images/provider_logo/spark-color.svg'
import stepfunLogo from '../images/provider_logo/stepfun-color.svg'
import togetherLogo from '../images/provider_logo/together-color.svg'
import xaiLogo from '../images/provider_logo/xai.svg'
import zerooneLogo from '../images/provider_logo/zeroone.svg'
import zhipuLogo from '../images/provider_logo/zhipu-color.svg'
import giteeaiLogo from '../images/provider_logo/gitee-ai.svg'

export default class ProviderLogo {
  container: HTMLElement
  speed: number
  logos: string[]

  constructor(containerId: string, speed = 1) {
    this.container = document.getElementById(containerId) as HTMLElement
    this.speed = speed
    this.logos = []
    this.init()
  }

  async init() {
    try {
      this.logos = [
        anthropicLogo,
        deepseekLogo,
        azureLogo,
        ollamaLogo,
        openaiLogo,
        giteeaiLogo,
        baiducloudLogo,
        bytedanceLogo,
        githubLogo,
        googleLogo,
        groqLogo,
        higressLogo,
        huggingfaceLogo,
        hunyuanLogo,
        baichuanLogo,
        metaLogo,
        minimaxLogo,
        mistralLogo,
        moonshotLogo,
        nvidiaLogo,
        openrouterLogo,
        qwenLogo,
        siliconcloudLogo,
        sparkLogo,
        stepfunLogo,
        togetherLogo,
        xaiLogo,
        zerooneLogo,
        zhipuLogo,
        ai360Logo,
        aimassLogo
      ]

      if (this.logos.length > 0) {
        this.createScrollContainer()
        this.startScroll()
      }
    } catch (error) {
      console.error('初始化provider logo失败:', error)
    }
  }

  createScrollContainer() {
    this.container.innerHTML = ''

    const wrapper = document.createElement('div')
    wrapper.className = 'logo-wrapper'

    const track = document.createElement('div')
    track.className = 'logo-track'

    // 创建足够多的副本以确保滚动流畅
    const itemWidth = 380 // logo项的估计宽度(包含padding)
    const containerWidth = this.container.offsetWidth
    const copiesNeeded = Math.ceil((containerWidth * 1) / (itemWidth * this.logos.length))

    for (let i = 0; i < copiesNeeded; i++) {
      this.logos.forEach((logo) => {
        const logoBox = document.createElement('div')
        logoBox.className = 'logo-box'

        const img = document.createElement('img')
        img.src = logo
        img.alt = 'Provider Logo'
        // 添加加载错误处理
        img.onerror = () => {
          console.log(`Failed to load: ${logo}`)
          logoBox.style.display = 'none'
        }

        logoBox.appendChild(img)
        track.appendChild(logoBox)
      })
    }

    wrapper.appendChild(track)
    this.container.appendChild(wrapper)

    this.addStyles()
  }

  addStyles() {
    const style = document.createElement('style')
    style.textContent = `
            .logo-wrapper {
                width: 100%;
                overflow: hidden;
                position: relative;
                padding: 20px 0;
            }

            .logo-track {
                display: flex;
                align-items: center;
                animation: scroll ${60 / this.speed}s linear infinite;
                width: fit-content;
            }

            .logo-box {
                flex: 0 0 auto;
                padding: 0 28px;
                display: flex;
                align-items: center;
                justify-content: center;
                min-width: 140px;
                height: 112px;
            }

            .logo-box img {
                height: 63px;
                min-width: 63px;
                width: auto;
                object-fit: contain;
                opacity: 0.85;
                transition: all 0.3s ease;
            }

            .logo-box img:hover {
                opacity: 1;
                transform: scale(1.15);
            }

            @keyframes scroll {
                0% {
                    transform: translateX(0);
                }
                100% {
                    transform: translateX(-50%);
                }
            }

            .logo-track:hover {
                animation-play-state: paused;
            }
        `

    document.head.appendChild(style)
  }

  startScroll() {
    const track = this.container.querySelector('.logo-track') as HTMLElement
    if (track) {
      track.addEventListener('animationend', () => {
        track.style.animation = 'none'
        void track.offsetHeight
        track.style.animation = `scroll ${30 / this.speed}s linear infinite`
      })
    }
  }
}
