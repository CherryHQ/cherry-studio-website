import { FC, useEffect, useState } from 'react'

import { fetchChannelData, getRandomWechatQRCode } from '@/assets/js/data'

const JoinCommunity: FC = () => {
  const [showWechatTips, setShowWechatTips] = useState(false)
  const [channelData, setChannelData] = useState<any>(null)
  const [wechatQRCode, setWechatQRCode] = useState<string>('')

  const handleWechatClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setShowWechatTips(true)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest('.wechat-tips') && !target.closest('.wechat-btn')) {
        setShowWechatTips(false)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    const getChannelData = async () => {
      const data = await fetchChannelData()
      if (data) {
        setChannelData(data)
        setWechatQRCode(getRandomWechatQRCode(data))
      }
    }

    getChannelData()
  }, [])

  return (
    <section className="cta-section">
      <div
        className="cta-1-bg"
        data-parallax='{"y": 30}'
        style={{
          backgroundImage: `url(${new URL('@/assets/images/background/cta-bg-image-one.webp', import.meta.url)})`
        }}></div>
      <div className="auto-container">
        <div className="section_heading text-center">
          <h2 className="section_heading_title_big">加入我们的社群</h2>
        </div>
        <div className="text-center">
          <div className="cta-1-link-bt" style={{ display: 'flex', justifyContent: 'center', gap: 10 }}>
            <div style={{ position: 'relative' }}>
              <a href="#" onClick={handleWechatClick} className="btn-1 wechat-btn">
                微信群
              </a>
              {showWechatTips && (
                <div
                  className="wechat-tips"
                  style={{
                    position: 'absolute',
                    bottom: '100%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    marginBottom: '20px',
                    padding: '10px',
                    background: 'white',
                    borderRadius: '8px',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.15)',
                    zIndex: 9999,
                    width: '220px',
                    isolation: 'isolate',
                    pointerEvents: 'auto'
                  }}>
                  <img
                    src={wechatQRCode}
                    alt="微信群二维码"
                    style={{
                      width: '200px',
                      height: '200px',
                      objectFit: 'contain',
                      display: 'block',
                      margin: '0 auto'
                    }}
                  />
                </div>
              )}
            </div>
            {channelData?.data?.qq_group_link && (
              <a href={channelData.data.qq_group_link} className="btn-1" target="_blank" rel="noopener noreferrer">
                QQ 群
              </a>
            )}
            {channelData?.data?.zsxq && (
              <a href={channelData.data.zsxq} className="btn-1" target="_blank" rel="noopener noreferrer">
                知识星球(问题解答)
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default JoinCommunity
