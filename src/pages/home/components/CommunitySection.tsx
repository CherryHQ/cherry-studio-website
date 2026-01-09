import { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import gitcodeIcon from '@/assets/images/icons/gitcode.svg'
import githubIcon from '@/assets/images/icons/github.svg'
import pIcon from '@/assets/images/icons/p.svg'
import tgIcon from '@/assets/images/icons/tg.svg'
import xIcon from '@/assets/images/icons/x.svg'
import { fetchChannelData, getRandomWechatQRCode } from '@/assets/js/data'
import { Button } from '@/components/ui/button'

const CommunitySection: FC = () => {
  const { t } = useTranslation()
  const [channelData, setChannelData] = useState<any>(null)
  const [wechatQRCode, setWechatQRCode] = useState<string>('')
  const [showQRModal, setShowQRModal] = useState(false)

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

  const socialLinks = [
    { href: 'https://x.com/CherryStudioHQ', icon: xIcon, alt: 'X' },
    { href: 'https://t.me/CherryStudioAI', icon: tgIcon, alt: 'Telegram' },
    { href: 'https://github.com/CherryHQ/cherry-studio', icon: githubIcon, alt: 'GitHub' },
    { href: 'https://gitcode.com/CherryHQ/cherry-studio', icon: gitcodeIcon, alt: 'GitCode' },
    { href: 'https://www.producthunt.com/products/cherry-studio', icon: pIcon, alt: 'Product Hunt' }
  ]

  return (
    <section className="bg-secondary/30 relative overflow-hidden py-24" id="Community">
      {/* Background */}
      <div className="grid-pattern absolute inset-0 opacity-20" />

      {/* Animated Gradient Orb */}
      <div className="animate-orb-breathe bg-primary/5 absolute top-0 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="mb-10 text-center">
          <h2 className="text-foreground mb-4 text-3xl font-bold sm:text-4xl lg:text-5xl">{t('community.title')}</h2>
          <p className="text-muted-foreground mx-auto max-w-2xl">{t('community.subtitle')}</p>
        </div>

        {/* Social Links */}
        <div className="mb-10 flex flex-wrap items-center justify-center gap-3">
          {socialLinks.map((link) => (
            <a
              key={link.alt}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="border-border bg-card/50 hover:border-primary/30 hover:bg-card flex h-12 w-12 items-center justify-center rounded-xl border backdrop-blur-sm transition-all duration-200"
              title={link.alt}>
              <img src={link.icon} alt={link.alt} className="h-5 w-5 opacity-70 invert" />
            </a>
          ))}
        </div>

        {/* WeChat QR Code */}
        {wechatQRCode && (
          <div className="mb-10 text-center">
            <button
              type="button"
              onClick={() => setShowQRModal(true)}
              className="border-border mx-auto inline-block cursor-pointer overflow-hidden rounded-2xl border bg-white p-3 shadow-lg transition-transform hover:scale-105">
              <img src={wechatQRCode} alt={t('community.wechat_qr_alt')} className="h-44 w-44 object-contain" />
            </button>
            <p className="text-muted-foreground mt-4 text-sm">{t('community.wechat_scan_prompt')}</p>
          </div>
        )}

        {/* QR Code Modal */}
        {showQRModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            onClick={() => setShowQRModal(false)}>
            <div
              className="animate-in zoom-in-95 fade-in relative max-w-md duration-200"
              onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                onClick={() => setShowQRModal(false)}
                className="bg-background/80 hover:bg-background absolute -top-3 -right-3 flex h-8 w-8 items-center justify-center rounded-full shadow-lg transition-colors">
                <span className="text-xl leading-none">&times;</span>
              </button>
              <div className="overflow-hidden rounded-2xl bg-white p-4 shadow-2xl">
                <img src={wechatQRCode} alt={t('community.wechat_qr_alt')} className="h-80 w-80 object-contain" />
              </div>
            </div>
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
    </section>
  )
}

export default CommunitySection
