import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { fetchTopNotice, type NoticeTopResponse } from '@/assets/js/notice'

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
  return (
    <aside
      className="relative z-10 flex flex-wrap items-center justify-center gap-3 border-b border-border bg-secondary px-4 py-2 text-center text-sm text-foreground"
      style={{ minHeight: notice.card_height }}>
      <span>{notice.notice_top}</span>
      {notice.button_status && notice.button_link && notice.button && (
        <a
          className="rounded-md px-3 py-1 font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-primary"
          href={notice.button_link}
          rel="noopener noreferrer">
          {notice.button}
        </a>
      )}
    </aside>
  )
}
