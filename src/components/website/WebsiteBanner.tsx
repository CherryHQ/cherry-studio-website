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
      className="relative z-10 mt-[72px] flex flex-wrap items-center justify-center gap-3 px-4 py-2 text-center text-sm"
      style={{ backgroundColor: notice.card_color, color: notice.card_text_color, minHeight: notice.card_height }}>
      <span>{notice.notice_top}</span>
      {notice.button_status && notice.button_link && notice.button && (
        <a
          className="rounded-md px-3 py-1 font-medium"
          href={notice.button_link}
          rel="noopener noreferrer"
          style={{ backgroundColor: notice.button_color, color: notice.button_text_color }}>
          {notice.button}
        </a>
      )}
    </aside>
  )
}
