import { ArrowRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { fetchTopNotice, type NoticeTopResponse } from '@/assets/js/notice'

function luminance(hex: string) {
  const channels = [1, 3, 5].map((start) => {
    const value = Number.parseInt(hex.slice(start, start + 2), 16) / 255
    return value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2]
}

/** CMS colors are applied only when the pair stays readable (WCAG AA); otherwise the theme colors win. */
function readablePair(background?: string, foreground?: string) {
  if (!background || !foreground || !/^#[0-9a-f]{6}$/i.test(background) || !/^#[0-9a-f]{6}$/i.test(foreground)) {
    return undefined
  }
  const [light, dark] = [luminance(background), luminance(foreground)].sort((a, b) => b - a)
  return (light + 0.05) / (dark + 0.05) >= 4.5 ? { backgroundColor: background, color: foreground } : undefined
}

export default function WebsiteBanner() {
  const { i18n } = useTranslation()
  const [notice, setNotice] = useState<NoticeTopResponse['data'] | null>(null)
  const language = i18n.language
  useEffect(() => {
    let active = true
    void fetchTopNotice().then((value) => {
      if (active) setNotice(value)
    })
    return () => {
      active = false
    }
  }, [language])
  if (!notice?.status || !notice.notice_top) return null
  const cardStyle = readablePair(notice.card_color, notice.card_text_color)
  const buttonStyle = readablePair(notice.button_color, notice.button_text_color)
  return (
    <aside
      className="relative z-10 flex flex-wrap items-center justify-center gap-3 border-b border-border bg-secondary px-4 py-2 text-center text-sm text-foreground"
      style={{ ...cardStyle, minHeight: notice.card_height }}>
      <span>{notice.notice_top}</span>
      {notice.button_status && notice.button_link && notice.button && (
        <a
          className="inline-flex items-center gap-1 rounded-full bg-foreground px-3 py-1 text-xs font-semibold text-background transition-opacity hover:opacity-85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          href={notice.button_link}
          rel="noopener noreferrer"
          style={buttonStyle}>
          {notice.button}
          <ArrowRight className="size-3" aria-hidden="true" />
        </a>
      )}
    </aside>
  )
}
