import { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { fetchChannelData, getRandomWechatQRCode } from '@/assets/js/data'
import { Button } from '@/components/ui/button'

const CommunitySection: FC = () => {
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
    <section className="relative overflow-hidden bg-secondary/30 py-24" id="Community">
      {/* Background */}
      <div className="grid-pattern absolute inset-0 opacity-20" />

      {/* Gradient Orbs */}
      <div className="bg-primary/5 absolute top-0 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Title */}
          <h2 className="text-foreground mb-4 text-3xl font-bold sm:text-4xl lg:text-5xl">{t('community.title')}</h2>
          <p className="text-muted-foreground mx-auto mb-10 max-w-2xl">{t('community.subtitle')}</p>

          {/* WeChat QR Code */}
          {wechatQRCode && (
            <div className="mb-10 inline-block">
              <div className="border-border overflow-hidden rounded-2xl border bg-white p-4 shadow-xl">
                <img src={wechatQRCode} alt={t('community.wechat_qr_alt')} className="h-48 w-48 object-contain" />
              </div>
              <p className="text-muted-foreground mt-4 text-sm">{t('community.wechat_scan_prompt')}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            {channelData?.data?.qq_group_link && (
              <Button variant="outline" size="lg" asChild>
                <a href={channelData.data.qq_group_link} target="_blank" rel="noopener noreferrer">
                  {t('community.qq_group')}
                </a>
              </Button>
            )}
            {channelData?.data?.zsxq && (
              <Button variant="outline" size="lg" asChild>
                <a href={channelData.data.zsxq} target="_blank" rel="noopener noreferrer">
                  {t('community.zsxq')}
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default CommunitySection
