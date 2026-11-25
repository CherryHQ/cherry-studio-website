// Copy for the creation demos: the Paintings template stage and HTML artifacts in chat.
// Template labels and prompts are excerpts from desktop resources/data/painting-templates/locales.
export type DemoLocale = 'en' | 'zh'

export type PaintingTemplateId = 'tennis-collage' | 'train-window' | 'light-trails' | 'circular-cutout' | 'y2k-street'

export interface PaintingsDemoCopy {
  window: string
  title: string
  caption: string
  stylesLabel: string
  previous: string
  next: string
  templates: { id: PaintingTemplateId; label: string; prompt: string }[]
  promptLabel: string
  placeholder: string
  generate: string
  stop: string
  settings: string
  selectModel: string
  imageSize: string
  numberImages: string
  fewer: string
  more: string
  sizeAuto: string
  newImage: string
  selectImage: string
  generating: string
  revealing: string
}

export interface ArtifactsDemoCopy {
  window: string
  model: { name: string; provider: string }
  prompt: string
  intro: string
  outro: string
  placeholder: string
  generating: string
  openPreview: string
  closePreview: string
  viewMode: string
  split: string
  code: string
  preview: string
  app: {
    lang: string
    title: string
    focus: string
    break: string
    start: string
    pause: string
    reset: string
    skip: string
    comment: string
  }
}

export const paintingsDemo: Record<DemoLocale, PaintingsDemoCopy> = {
  en: {
    window: 'Cherry Studio — Paintings',
    title: 'A place for your next masterpiece.',
    caption: 'Choose a template to start, then make the prompt your own below.',
    stylesLabel: 'Prompt templates',
    previous: 'Previous template',
    next: 'Next template',
    templates: [
      {
        id: 'tennis-collage',
        label: 'Tennis Precision',
        prompt: 'Create a cinematic tennis fashion collage in a three-panel layout.'
      },
      {
        id: 'train-window',
        label: 'Train Window',
        prompt: 'Create an ultra-cinematic golden-hour portrait by a train window beside the coastline at dusk.'
      },
      {
        id: 'light-trails',
        label: 'Light Trails',
        prompt: 'Create a cinematic fine-art portrait with glowing golden light trails orbiting the subject.'
      },
      {
        id: 'circular-cutout',
        label: 'Circular Cutout',
        prompt:
          'Create a high-end studio portrait of a model leaning through a large circular cutout in a warm ivory wall.'
      },
      {
        id: 'y2k-street',
        label: 'Y2K Street',
        prompt: 'Create a Y2K-style candid street portrait of a cheerful woman flashing a peace sign at the lens.'
      }
    ],
    promptLabel: 'Prompt',
    placeholder: 'Describe the image you want to create, e.g. A serene lake at sunset with mountains in the background',
    generate: 'Generate',
    stop: 'Stop',
    settings: 'Settings',
    selectModel: 'Select Model',
    imageSize: 'Image Size',
    numberImages: 'Number of images',
    fewer: 'Fewer images',
    more: 'More images',
    sizeAuto: 'Auto',
    newImage: 'New Image',
    selectImage: 'Select Image',
    generating: 'Drawing in progress',
    revealing: 'Revealing generated image'
  },
  zh: {
    window: 'Cherry Studio — 绘画',
    title: '给你的下一幅杰作，留一个位置。',
    caption: '选择一个模板作为起点，再在下方把提示词改成你的表达。',
    stylesLabel: '提示词模板',
    previous: '上一个模板',
    next: '下一个模板',
    templates: [
      { id: 'tennis-collage', label: '网球拼贴', prompt: '创作一张三栏布局的电影感网球时尚拼贴。' },
      {
        id: 'train-window',
        label: '火车窗边',
        prompt: '创作一张超电影感的黄金时刻肖像，场景是傍晚行驶在海岸线上的列车窗边。'
      },
      { id: 'light-trails', label: '金色光轨', prompt: '创作一张电影感艺术肖像，金色光轨像流动的能量一样环绕人物。' },
      {
        id: 'circular-cutout',
        label: '圆形墙洞',
        prompt: '创作一张高端棚拍肖像，模特从暖象牙白墙面中央的圆形开口探出上身。'
      },
      {
        id: 'y2k-street',
        label: 'Y2K 街拍',
        prompt: '创作一张 Y2K 风格的街头抓拍肖像，开朗的女生对着镜头比出剪刀手。'
      }
    ],
    promptLabel: '提示词',
    placeholder: '描述你想创建的图片，例如：一个宁静的湖泊，夕阳西下，远处是群山',
    generate: '生成',
    stop: '停止',
    settings: '设置',
    selectModel: '选择模型',
    imageSize: '图片尺寸',
    numberImages: '生成数量',
    fewer: '减少数量',
    more: '增加数量',
    sizeAuto: '自动',
    newImage: '新建图片',
    selectImage: '选择图片',
    generating: '绘图进行中',
    revealing: '正在呈现生成的图片'
  }
}

export const artifactsDemo: Record<DemoLocale, ArtifactsDemoCopy> = {
  en: {
    window: 'Cherry Studio — HTML Artifacts',
    model: { name: 'Claude Sonnet 4.6', provider: 'anthropic' },
    prompt: 'Make me a tiny pomodoro timer I can actually click.',
    intro:
      'Here is a single-file pomodoro timer: 25 minutes of focus, a 5-minute break, and a ring that drains as the clock runs down.',
    outro: 'Press Start in the preview to try it.',
    placeholder: 'Ask for changes, / for tools',
    generating: 'Generating',
    openPreview: 'Preview',
    closePreview: 'Close preview',
    viewMode: 'View mode',
    split: 'Split',
    code: 'Code',
    preview: 'Preview',
    app: {
      lang: 'en',
      title: 'Pomodoro',
      focus: 'Focus',
      break: 'Break',
      start: 'Start',
      pause: 'Pause',
      reset: 'Reset',
      skip: 'Skip',
      comment: '25 minutes of focus, then a 5-minute break'
    }
  },
  zh: {
    window: 'Cherry Studio — HTML 预览',
    model: { name: 'Claude Sonnet 4.6', provider: 'anthropic' },
    prompt: '帮我做一个能直接点着用的番茄钟小网页。',
    intro: '给你一个单文件的番茄钟：专注 25 分钟、休息 5 分钟，进度环会随着倒计时一点点走完。',
    outro: '在预览里点「开始」就能试用。',
    placeholder: '继续提出修改，/ 调用工具',
    generating: '生成中',
    openPreview: '预览',
    closePreview: '关闭预览',
    viewMode: '视图模式',
    split: '分屏',
    code: '代码',
    preview: '预览',
    app: {
      lang: 'zh-CN',
      title: '番茄钟',
      focus: '专注',
      break: '休息',
      start: '开始',
      pause: '暂停',
      reset: '重置',
      skip: '跳过',
      comment: '先专注 25 分钟，再休息 5 分钟'
    }
  }
}
