// Copy for the selection assistant's action window (Translate, Explain, Summarize).
// Labels come from the desktop locale (selection.action.window.*, translate.*).
import type { DemoLocale } from './chat'

export type WindowActionId = 'translate' | 'explain' | 'summary'

export interface LanguageTag {
  emoji: string
  label: string
}

export interface AssistantsDemoCopy {
  translate: {
    from: LanguageTag
    to: LanguageTag
    detecting: string
    settings: string
    preferredTarget: string
    alterLanguage: string
    preferred: LanguageTag
    alter: LanguageTag
    smartTips: string
  }
  actionWindow: {
    showOriginal: string
    hideOriginal: string
    pin: string
    pinned: string
    opacity: string
    escClose: string
    escStop: string
    regenerate: string
    copy: string
    copied: string
    readAloud: string
    close: string
  }
}

export const assistantsDemo: Record<DemoLocale, AssistantsDemoCopy> = {
  en: {
    translate: {
      from: { emoji: '🇺🇸', label: 'English' },
      to: { emoji: '🇨🇳', label: 'Chinese' },
      detecting: 'Detecting...',
      settings: 'Language Settings',
      preferredTarget: 'Preferred Target',
      alterLanguage: 'Alternative Language',
      preferred: { emoji: '🇨🇳', label: 'Chinese' },
      alter: { emoji: '🇺🇸', label: 'English' },
      smartTips:
        'Smart Translation: Content will be translated to the target language first; content already in the target language will be translated to the alternative language'
    },
    actionWindow: {
      showOriginal: 'Show Original',
      hideOriginal: 'Hide Original',
      pin: 'Pin',
      pinned: 'Pinned',
      opacity: 'Window Opacity',
      escClose: 'Esc: Close',
      escStop: 'Esc: Stop',
      regenerate: 'R: Regenerate',
      copy: 'C: Copy',
      copied: 'Copied!',
      readAloud: 'Read result aloud',
      close: 'Close'
    }
  },
  zh: {
    translate: {
      from: { emoji: '🇨🇳', label: 'Chinese (Simplified)' },
      to: { emoji: '🇺🇸', label: '英文' },
      detecting: '检测中...',
      settings: '语言设置',
      preferredTarget: '首选目标',
      alterLanguage: '备用语言',
      preferred: { emoji: '🇨🇳', label: '简体中文' },
      alter: { emoji: '🇺🇸', label: '英文' },
      smartTips: '智能翻译：内容将优先翻译为目标语言；内容已是目标语言的，将翻译为备选语言'
    },
    actionWindow: {
      showOriginal: '显示原文',
      hideOriginal: '隐藏原文',
      pin: '置顶',
      pinned: '已置顶',
      opacity: '窗口透明度',
      escClose: 'Esc 关闭',
      escStop: 'Esc 停止',
      regenerate: 'R 重新生成',
      copy: 'C 复制',
      copied: '复制成功',
      readAloud: '朗读结果',
      close: '关闭'
    }
  }
}
