// Import all logos
import alayaLogo from '../images/provider_logo/alaya.png'
import anthropicLogo from '../images/provider_logo/anthropic.svg'
import azureLogo from '../images/provider_logo/azure-color.svg'
import baichuanLogo from '../images/provider_logo/baichuan-color.svg'
import baiducloudLogo from '../images/provider_logo/baiducloud-color.svg'
import bytedanceLogo from '../images/provider_logo/bytedance-color.svg'
import deepseekLogo from '../images/provider_logo/deepseek-color.svg'
import giteeaiLogo from '../images/provider_logo/gitee-ai.svg'
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
import modelscopeLogo from '../images/provider_logo/modelscope.webp'
import ai302Logo from '../images/provider_logo/302ai.svg'

interface LogoInfo {
  src: string
  url: string
  name: string
}

export default class ProviderLogo {
  container: HTMLElement
  speed: number
  logos: LogoInfo[]

  constructor(containerId: string, speed = 1) {
    this.container = document.getElementById(containerId) as HTMLElement
    this.speed = speed
    this.logos = []
    this.init()
  }

  async init() {
    try {
      this.logos = [
        { src: anthropicLogo, url: 'https://www.anthropic.com/', name: 'Anthropic' },
        { src: deepseekLogo, url: 'https://www.deepseek.com/', name: 'Deepseek' },
        { src: azureLogo, url: 'https://azure.microsoft.com/', name: 'Azure' },
        { src: modelscopeLogo, url: 'https://www.modelscope.cn/', name: 'ModelScope' },
        { src: ollamaLogo, url: 'https://ollama.ai/', name: 'Ollama' },
        { src: openaiLogo, url: 'https://openai.com/', name: 'OpenAI' },
        { src: ai302Logo, url: 'https://302.ai/', name: '302.AI' },
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
    const itemWidth = 160 // logo项的宽度
    const containerWidth = this.container.offsetWidth
    const copiesNeeded = Math.ceil((containerWidth * 2) / (itemWidth * this.logos.length)) // 增加复制次数确保流畅滚动

    for (let i = 0; i < copiesNeeded; i++) {
      this.logos.forEach((logo) => {
        const logoBox = document.createElement('div')
        logoBox.className = 'logo-box'

        const link = document.createElement('a')
        link.href = logo.url
        link.target = '_blank'
        link.rel = 'noopener noreferrer'

        const img = document.createElement('img')
        img.src = logo.src
        img.alt = `${logo.name} Logo`
        // 添加加载错误处理
        img.onerror = () => {
          console.log(`Failed to load: ${logo.src}`)
          logoBox.style.display = 'none'
        }

        link.appendChild(img)
        logoBox.appendChild(link)
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
      .logo-track {
        display: flex;
        align-items: center;
        animation: scroll ${30 / this.speed}s linear infinite;
        width: fit-content;
      }

      .logo-box {
        padding: 0 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 104px;
        height: 80px;
      }

      .logo-box a {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        transition: transform 0.3s ease;
      }

      .logo-box a:hover {
        transform: scale(1.1);
      }

      .logo-box img {
        max-width: 120px;
        max-height: 60px;
        width: auto;
        height: auto;
        object-fit: contain;
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
        track.style.animation = `scroll ${15 / this.speed}s linear infinite`
      })
    }
  }
}
