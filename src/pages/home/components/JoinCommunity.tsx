import { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { fetchChannelData, getRandomWechatQRCode } from '@/assets/js/data'

const JoinCommunity: FC = () => {
  const { t } = useTranslation()
  const [channelData, setChannelData] = useState<any>(null)
  const [wechatQRCode, setWechatQRCode] = useState<string>('')

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
    <section className="cta-section" id="Community">
      <div
        className="cta-1-bg"
        data-parallax='{"y": 30}'
        style={{
          backgroundImage: `url(${new URL('@/assets/images/background/cta-bg-image-one.webp', import.meta.url)})`
        }}></div>
      <div className="auto-container">
        <div className="section_heading text-center">
          <h2 className="section_heading_title_big">{t('community.title')}</h2>
        </div>

        {/* QR Code Display */}
        <div className="text-center" style={{ marginBottom: '30px' }}>
          <div
            className="wechat-qrcode-container"
            style={{
              display: 'inline-block',
              padding: '15px',
              background: 'white',
              borderRadius: '12px',
              boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
              marginTop: '20px'
            }}>
            {wechatQRCode && (
              <>
                <img
                  src={wechatQRCode}
                  alt={t('community.wechat_qr_alt')}
                  style={{
                    width: '200px',
                    height: '200px',
                    objectFit: 'contain',
                    display: 'block',
                    margin: '0 auto'
                  }}
                />
                <p
                  style={{
                    marginTop: '10px',
                    marginBottom: '0',
                    fontSize: '16px',
                    fontWeight: '500',
                    color: '#333'
                  }}>
                  {t('community.wechat_scan_prompt')}
                </p>
              </>
            )}
          </div>
        </div>

        <div className="text-center">
          <div className="cta-1-link-bt" style={{ display: 'flex', justifyContent: 'center', gap: 10 }}>
            {channelData?.data?.qq_group_link && (
              <a href={channelData.data.qq_group_link} className="btn-1" target="_blank" rel="noopener noreferrer">
                {t('community.qq_group')}
              </a>
            )}
            {channelData?.data?.zsxq && (
              <a href={channelData.data.zsxq} className="btn-1" target="_blank" rel="noopener noreferrer">
                {t('community.zsxq')}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default JoinCommunity
