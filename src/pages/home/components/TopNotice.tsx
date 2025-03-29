import { FC, useEffect, useState } from 'react'

import { fetchTopNotice } from '@/assets/js/notice'

const TopNotice: FC = () => {
  const [topNotice, setTopNotice] = useState<any>(null)
  const [showTopNotice, setShowTopNotice] = useState(true)

  useEffect(() => {
    const getNotices = async () => {
      const topNoticeContent = await fetchTopNotice()
      if (topNoticeContent?.status) {
        setTopNotice(topNoticeContent)
      }
    }
    getNotices()
  }, [])

  if (!showTopNotice || !topNotice) return null

  return (
    <div
      style={{
        backgroundColor: topNotice.card_color,
        height: `${topNotice.card_height}px`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',
        width: '100%',
        color: topNotice.card_text_color,
        padding: '0 20px'
      }}>
      <div
        style={{
          flex: 1,
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 15px',
          textAlign: 'center'
        }}>
        <div dangerouslySetInnerHTML={{ __html: topNotice.notice_top }} />
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '15px',
          marginLeft: 'auto'
        }}>
        {topNotice.button_status && (
          <a
            href={topNotice.button_link}
            style={{
              color: topNotice.button_text_color,
              padding: '4px 12px',
              backgroundColor: topNotice.button_color,
              borderRadius: '4px',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
              display: 'inline-flex',
              alignItems: 'center',
              height: '28px'
            }}>
            {topNotice.button}
          </a>
        )}
        <button
          onClick={() => setShowTopNotice(false)}
          type="button"
          style={{
            background: 'none',
            border: 'none',
            color: topNotice.card_text_color,
            cursor: 'pointer',
            fontSize: '20px',
            padding: '5px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
          ×
        </button>
      </div>
    </div>
  )
}

export default TopNotice
