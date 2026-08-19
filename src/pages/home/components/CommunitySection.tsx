import { type FC, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import gitcodeIcon from '@/assets/images/icons/gitcode.svg'
import gitcodeColorIcon from '@/assets/images/icons/gitcode-color.svg'
import githubIcon from '@/assets/images/icons/github.svg'
import githubColorIcon from '@/assets/images/icons/github-color.svg'
import pIcon from '@/assets/images/icons/p.svg'
import pColorIcon from '@/assets/images/icons/p-color.svg'
import tgIcon from '@/assets/images/icons/tg.svg'
import tgColorIcon from '@/assets/images/icons/tg-color.svg'
import xIcon from '@/assets/images/icons/x.svg'
import xColorIcon from '@/assets/images/icons/x-color.svg'
import iGQR from '@/assets/images/resource/instagram.png'
import { type ChannelResponse, fetchChannelData, getRandomWechatQRCode } from '@/assets/js/data'
import { cn } from '@/lib/utils'

interface SocialLink {
  href: string
  alt: string
  icon?: string
  colorIcon?: string
  colorDarkInvert?: boolean
  brandIconClass?: string
}

const DISCORD_INVITE_URL = 'https://discord.gg/wez8HtpxqQ'

const CommunitySection: FC = () => {
  const { t, i18n } = useTranslation()
  const isEn = i18n.language.startsWith('en')
  const [channelData, setChannelData] = useState<ChannelResponse | null>(null)
  const [wechatQRCode, setWechatQRCode] = useState<string>('')
  const [showQRModal, setShowQRModal] = useState(false)
  const [qrModalClosing, setQrModalClosing] = useState(false)
  const closeTimerRef = useRef<number | null>(null)
  const qrCodeSrc = isEn ? iGQR : wechatQRCode

  const openQRModal = () => {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current)
      closeTimerRef.current = null
    }

    setShowQRModal(true)
    setQrModalClosing(false)
  }

  const closeQRModal = () => {
    if (qrModalClosing) return

    setQrModalClosing(true)
    closeTimerRef.current = window.setTimeout(() => {
      setShowQRModal(false)
      setQrModalClosing(false)
      closeTimerRef.current = null
    }, 200)
  }

  useEffect(() => {
    const getChannelData = async () => {
      const data = await fetchChannelData()
      if (data) {
        setChannelData(data)
        if (!isEn) {
          setWechatQRCode(getRandomWechatQRCode(data))
        }
      }
    }

    getChannelData()
  }, [isEn])

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) {
        window.clearTimeout(closeTimerRef.current)
      }
    }
  }, [])

  const communityLink: SocialLink | null = isEn
    ? {
        href: DISCORD_INVITE_URL,
        alt: 'Discord',
        brandIconClass:
          'fa-brands fa-discord text-foreground h-5 w-5 text-center text-xl leading-5 transition-colors group-hover:text-[#5865f2]'
      }
    : channelData?.data?.qq_group_link
      ? {
          href: channelData.data.qq_group_link,
          alt: 'QQ 群',
          brandIconClass:
            'fa-brands fa-qq text-foreground h-5 w-5 text-center text-xl leading-5 transition-colors group-hover:text-[#12b7f5]'
        }
      : null

  const socialLinks: SocialLink[] = [
    { href: 'https://x.com/CherryStudioHQ', icon: xIcon, colorIcon: xColorIcon, alt: 'X', colorDarkInvert: true },
    { href: 'https://t.me/CherryStudioAI', icon: tgIcon, colorIcon: tgColorIcon, alt: 'Telegram' },
    ...(communityLink ? [communityLink] : []),
    {
      href: 'https://github.com/CherryHQ/cherry-studio',
      icon: githubIcon,
      colorIcon: githubColorIcon,
      alt: 'GitHub',
      colorDarkInvert: true
    },
    {
      href: 'https://gitcode.com/CherryHQ/cherry-studio',
      icon: gitcodeIcon,
      colorIcon: gitcodeColorIcon,
      alt: 'GitCode'
    },
    {
      href: 'https://www.producthunt.com/products/cherry-studio',
      icon: pIcon,
      colorIcon: pColorIcon,
      alt: 'Product Hunt'
    }
  ]

  return (
    <section className="bg-secondary/30 relative overflow-hidden py-8 sm:py-16" id="Community">
      {/* Background */}
      <div className="grid-pattern absolute inset-0 opacity-20" />

      {/* Animated Gradient Orb */}
      <div className="animate-orb-breathe bg-primary/5 absolute top-0 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="mx-auto mb-8 max-w-3xl text-center sm:mb-16">
          <h2 className="text-foreground mb-3 whitespace-nowrap text-2xl font-bold sm:mb-4 sm:text-4xl lg:text-5xl">
            {t('community.title')}
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base">{t('community.subtitle')}</p>
        </div>

        {/* Social Links */}
        <div className="mb-10 flex flex-wrap items-center justify-center gap-3">
          {socialLinks.map((link) => (
            <a
              key={link.alt}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.alt}
              className="group border-border bg-card/50 hover:border-primary/30 hover:bg-card relative flex h-12 w-12 items-center justify-center rounded-xl border backdrop-blur-sm transition-all duration-200"
              title={link.alt}>
              {link.brandIconClass ? (
                <i aria-hidden="true" className={link.brandIconClass} />
              ) : (
                <>
                  <img
                    src={link.icon}
                    alt=""
                    aria-hidden="true"
                    className="h-5 w-5 transition-opacity duration-200 group-hover:opacity-0 dark:invert"
                  />
                  <img
                    src={link.colorIcon}
                    alt=""
                    aria-hidden="true"
                    className={`absolute h-5 w-5 opacity-0 transition-opacity duration-200 group-hover:opacity-100 ${link.colorDarkInvert ? 'dark:invert' : ''}`}
                  />
                </>
              )}
            </a>
          ))}
        </div>

        {/* WeChat QR Code */}
        {qrCodeSrc && (
          <div className="text-center">
            <button
              type="button"
              onClick={openQRModal}
              aria-label={t('community.qr_click_to_enlarge')}
              title={t('community.qr_click_to_enlarge')}
              className="border-border mx-auto block w-[240px] max-w-[85vw] cursor-pointer overflow-hidden rounded-2xl border bg-white p-3 shadow-lg transition-transform hover:scale-105 sm:w-[280px]">
              <img src={qrCodeSrc} alt={t('community.wechat_qr_alt')} className="h-auto w-full" />
            </button>
            <p className="text-muted-foreground mt-4 text-sm">{t('community.wechat_scan_prompt')}</p>
          </div>
        )}

        {/* QR Code Modal */}
        {showQRModal && (
          <div
            className={cn(
              'fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm duration-200',
              qrModalClosing ? 'animate-out fade-out-0' : 'animate-in fade-in-0'
            )}
            onClick={closeQRModal}>
            <div
              className={cn(
                'relative w-[420px] max-w-[92vw] duration-200',
                qrModalClosing ? 'animate-out fade-out-0 zoom-out-95' : 'animate-in fade-in-0 zoom-in-95'
              )}
              onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                onClick={closeQRModal}
                className="bg-background/80 hover:bg-background absolute -top-3 -right-3 flex h-8 w-8 items-center justify-center rounded-full shadow-lg transition-colors">
                <span className="text-xl leading-none">&times;</span>
              </button>
              <div className="max-h-[90vh] overflow-auto rounded-2xl bg-white p-4 shadow-2xl">
                <img src={qrCodeSrc} alt={t('community.wechat_qr_alt')} className="h-auto w-full" />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default CommunitySection
