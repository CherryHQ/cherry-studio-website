// Copy for the creation demos: the Paintings template stage and HTML artifacts in chat.
// Template labels and prompts are excerpts from desktop resources/data/painting-templates/locales.
export type DemoLocale = 'en' | 'zh'

export type PaintingTemplateId = 'tennis-collage' | 'train-window' | 'light-trails' | 'circular-cutout' | 'y2k-street'

export type PaintingFieldKey =
  | 'size'
  | 'aspectRatio'
  | 'numImages'
  | 'personGeneration'
  | 'quality'
  | 'style'
  | 'addWatermark'
  | 'negativePrompt'
  | 'promptExtend'
  | 'seed'

export type PaintingOptionKey = 'DONT_ALLOW' | 'ALLOW_ADULT' | 'ALLOW_ALL' | 'standard' | 'hd' | 'vivid' | 'natural'

export interface PaintingsDemoCopy {
  window: string
  title: string
  caption: string
  stylesLabel: string
  templates: { id: PaintingTemplateId; label: string; prompt: string }[]
  placeholder: string
  send: string
  pause: string
  dictation: string
  quickPanel: string
  prompts: string
  settings: string
  searchModels: string
  providers: { dashscope: string; gemini: string; openai: string }
  fields: Record<PaintingFieldKey, string>
  options: Record<PaintingOptionKey, string>
  randomSeed: string
  newImage: string
  selectImage: string
  deleteImage: string
  expandPrompt: string
  minimizePrompt: string
  generating: string
  revealing: string
  toolbar: string
  zoomOut: string
  zoomIn: string
  rotateLeft: string
  rotateRight: string
  reset: string
}

export interface ArtifactsDemoCopy {
  window: string
  model: { name: string; provider: string }
  prompt: string
  intro: string
  outro: string
  htmlPreview: string
  viewWebpage: string
  viewWebpageHint: string
  zoomOut: string
  zoomIn: string
  resetZoom: string
  openExternal: string
  download: string
  maximize: string
  copySource: string
  viewMode: string
  split: string
  code: string
  preview: string
  fullscreen: string
  close: string
  save: string
  app: {
    lang: string
    title: string
    palette: string
    /** Names of SILK_PALETTES, in order. */
    palettes: string[]
    speed: string
    comment: string
  }
}

export const paintingsDemo: Record<DemoLocale, PaintingsDemoCopy> = {
  en: {
    window: 'Cherry Studio — Paintings',
    title: 'A place for your next masterpiece.',
    caption: 'Choose a template to start, then make the prompt your own below.',
    stylesLabel: 'Prompt templates',
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
    placeholder: 'Describe the image you want to create, e.g. A serene lake at sunset with mountains in the background',
    send: 'Send',
    pause: 'Pause',
    dictation: 'Start dictation',
    quickPanel: 'Input Quick Panel',
    prompts: 'Prompts',
    settings: 'Settings',
    searchModels: 'Search models...',
    providers: { dashscope: 'Qianwen AI platform - CN', gemini: 'Gemini', openai: 'OpenAI' },
    fields: {
      size: 'Image Size',
      aspectRatio: 'Aspect Ratio',
      numImages: 'Number Images',
      personGeneration: 'Generate people',
      quality: 'Quality',
      style: 'Style',
      addWatermark: 'Add Watermark',
      negativePrompt: 'Negative Prompt',
      promptExtend: 'Prompt Enhancement',
      seed: 'Seed'
    },
    options: {
      DONT_ALLOW: 'Not allowed',
      ALLOW_ADULT: 'Allow adult',
      ALLOW_ALL: 'Allow all',
      standard: 'Standard',
      hd: 'HD',
      vivid: 'Vivid',
      natural: 'Natural'
    },
    randomSeed: 'Random seed',
    newImage: 'New Image',
    selectImage: 'Select Image',
    deleteImage: 'Delete Image',
    expandPrompt: 'Expand prompt',
    minimizePrompt: 'Minimize prompt',
    generating: 'Drawing in progress. Please do not leave this page.',
    revealing: 'Revealing generated image',
    toolbar: 'Preview',
    zoomOut: 'Zoom Out',
    zoomIn: 'Zoom In',
    rotateLeft: 'Rotate Left',
    rotateRight: 'Rotate Right',
    reset: 'Reset'
  },
  zh: {
    window: 'Cherry Studio — 绘画',
    title: '给你的下一幅杰作，留一个位置。',
    caption: '选择一个模板作为起点，再在下方把提示词改成你的表达。',
    stylesLabel: '提示词模板',
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
    placeholder: '描述你想创建的图片，例如：一个宁静的湖泊，夕阳西下，远处是群山',
    send: '发送',
    pause: '暂停',
    dictation: '开始听写',
    quickPanel: '输入快捷面板',
    prompts: '提示词',
    settings: '设置',
    searchModels: '搜索模型...',
    providers: { dashscope: '千问 AI 平台', gemini: 'Gemini', openai: 'OpenAI' },
    fields: {
      size: '图片尺寸',
      aspectRatio: '画幅比例',
      numImages: '生成数量',
      personGeneration: '生成人物',
      quality: '质量',
      style: '风格',
      addWatermark: '添加水印',
      negativePrompt: '反向提示词',
      promptExtend: '提示词增强',
      seed: '随机种子'
    },
    options: {
      DONT_ALLOW: '不允许',
      ALLOW_ADULT: '允许成人',
      ALLOW_ALL: '允许所有',
      standard: '标准',
      hd: '高清',
      vivid: '鲜艳',
      natural: '自然'
    },
    randomSeed: '随机种子',
    newImage: '新建图片',
    selectImage: '选择图片',
    deleteImage: '删除图片',
    expandPrompt: '展开提示词',
    minimizePrompt: '收起提示词',
    generating: '绘图进行中，请不要离开页面',
    revealing: '正在呈现生成的图片',
    toolbar: '预览',
    zoomOut: '缩小',
    zoomIn: '放大',
    rotateLeft: '向左旋转',
    rotateRight: '向右旋转',
    reset: '重置'
  }
}

export const artifactsDemo: Record<DemoLocale, ArtifactsDemoCopy> = {
  en: {
    window: 'Cherry Studio — HTML Artifacts',
    model: { name: 'Claude Sonnet 4.6', provider: 'anthropic' },
    prompt: 'Make me a live silk wallpaper I can recolor.',
    intro:
      'Here is a single-file live wallpaper: flowing silk rendered on the GPU with Paper Shaders, four palettes and a speed control.',
    outro: 'Pick a palette or drag the speed slider in the preview.',
    htmlPreview: 'HTML Preview',
    viewWebpage: 'View webpage',
    viewWebpageHint:
      'This webpage contains scripts or external resources. Opening it may run code and connect to the internet.',
    zoomOut: 'Zoom Out',
    zoomIn: 'Zoom In',
    resetZoom: 'Reset',
    openExternal: 'Open in external browser',
    download: 'Download',
    maximize: 'Maximize',
    copySource: 'Copy Source Code',
    viewMode: 'View mode',
    split: 'Split',
    code: 'Code',
    preview: 'Preview',
    fullscreen: 'Full screen',
    close: 'Close',
    save: 'Save Changes',
    app: {
      lang: 'en',
      title: 'Silk wallpaper',
      palette: 'Palette',
      palettes: ['Cherry', 'Ocean', 'Lavender', 'Citrus'],
      speed: 'Speed',
      comment: 'GPU-rendered silk; swatches recolor it, the slider sets its speed'
    }
  },
  zh: {
    window: 'Cherry Studio — HTML 预览',
    model: { name: 'Claude Sonnet 4.6', provider: 'anthropic' },
    prompt: '帮我做一个能换颜色的丝绸动态壁纸。',
    intro: '给你一个单文件的动态壁纸：用 Paper Shaders 在 GPU 上渲染流动的丝绸，带四套配色和速度调节。',
    outro: '在预览里点色块换配色，拖动滑块调速度。',
    htmlPreview: 'HTML 预览',
    viewWebpage: '查看网页',
    viewWebpageHint: '此网页包含脚本或外部资源，打开后可能运行代码并连接网络。',
    zoomOut: '缩小',
    zoomIn: '放大',
    resetZoom: '重置',
    openExternal: '外部浏览器打开',
    download: '下载',
    maximize: '最大化',
    copySource: '复制源代码',
    viewMode: '视图模式',
    split: '分屏',
    code: '代码',
    preview: '预览',
    fullscreen: '全屏',
    close: '关闭',
    save: '保存修改',
    app: {
      lang: 'zh-CN',
      title: '丝绸壁纸',
      palette: '配色',
      palettes: ['樱桃', '海洋', '薰衣草', '柑橘'],
      speed: '速度',
      comment: 'GPU 渲染的丝绸；色块切换配色，滑块调节速度'
    }
  }
}
