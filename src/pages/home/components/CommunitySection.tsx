import { type FC, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import discordColorIcon from '@/assets/images/icons/discord-color.svg'
import gitcodeIcon from '@/assets/images/icons/gitcode.svg'
import gitcodeColorIcon from '@/assets/images/icons/gitcode-color.svg'
import githubIcon from '@/assets/images/icons/github.svg'
import githubColorIcon from '@/assets/images/icons/github-color.svg'
import instagramColorIcon from '@/assets/images/icons/instagram-color.svg'
import linkedinColorIcon from '@/assets/images/icons/linkedin-color.svg'
import pIcon from '@/assets/images/icons/p.svg'
import pColorIcon from '@/assets/images/icons/p-color.svg'
import tgIcon from '@/assets/images/icons/tg.svg'
import tgColorIcon from '@/assets/images/icons/tg-color.svg'
import xIcon from '@/assets/images/icons/x.svg'
import xColorIcon from '@/assets/images/icons/x-color.svg'
import iGQR from '@/assets/images/resource/instagram.png'
import { fetchChannelData, getRandomWechatQRCode } from '@/assets/js/data'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const DISCORD_URL = 'https://discord.gg/wez8HtpxqQ'

// 线上英文站的社区区用 Discord 入口 + 社媒图标行，不再展示二维码
const enSocialLinks = [
  { href: DISCORD_URL, icon: discordColorIcon, alt: 'Discord' },
  { href: 'https://www.instagram.com/cherrystudio_official/', icon: instagramColorIcon, alt: 'Instagram' },
  { href: 'https://www.linkedin.com/company/cherryhq/', icon: linkedinColorIcon, alt: 'LinkedIn' },
  { href: 'https://x.com/CherryStudioHQ', icon: xColorIcon, alt: 'X' }
]

const DiscordMark: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
  </svg>
)

const CommunitySection: FC = () => {
  const { t, i18n } = useTranslation()
  const isEn = i18n.language.startsWith('en')
  const [channelData, setChannelData] = useState<any>(null)
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

  const socialLinks = [
    { href: 'https://x.com/CherryStudioHQ', icon: xIcon, colorIcon: xColorIcon, alt: 'X', colorDarkInvert: true },
    { href: 'https://t.me/CherryStudioAI', icon: tgIcon, colorIcon: tgColorIcon, alt: 'Telegram' },
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
        <div className={cn('mx-auto mb-8 max-w-3xl text-center', isEn ? 'sm:mb-10' : 'sm:mb-16')}>
          <h2 className="text-foreground mb-3 whitespace-nowrap text-2xl font-bold sm:mb-4 sm:text-4xl lg:text-5xl">
            {t('community.title')}
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base">{t('community.subtitle')}</p>
        </div>

        {isEn ? (
          <>
            {/* Discord CTA */}
            <div className="mb-10 text-center">
              <Button size="lg" asChild>
                <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer">
                  <DiscordMark className="h-5 w-5" />
                  {t('community.join_discord')}
                </a>
              </Button>
              <p className="text-muted-foreground mt-4 text-sm">{t('community.discord_prompt')}</p>
            </div>

            {/* Social Links */}
            <div className="mb-10 flex flex-wrap items-center justify-center gap-3">
              {enSocialLinks.map((link) => (
                <a
                  key={link.alt}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-border bg-card/50 hover:border-primary/30 hover:bg-card relative flex h-12 w-12 items-center justify-center rounded-xl border backdrop-blur-sm transition-all duration-200"
                  title={link.alt}>
                  <img src={link.icon} alt={link.alt} className="h-5 w-5" />
                </a>
              ))}
            </div>
          </>
        ) : (
          <>
            {/* Social Links */}
            <div className="mb-10 flex flex-wrap items-center justify-center gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.alt}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group border-border bg-card/50 hover:border-primary/30 hover:bg-card relative flex h-12 w-12 items-center justify-center rounded-xl border backdrop-blur-sm transition-all duration-200"
                  title={link.alt}>
                  <img
                    src={link.icon}
                    alt={link.alt}
                    className="h-5 w-5 transition-opacity duration-200 group-hover:opacity-0 dark:invert"
                  />
                  <img
                    src={link.colorIcon}
                    alt={link.alt}
                    className={`absolute h-5 w-5 opacity-0 transition-opacity duration-200 group-hover:opacity-100 ${link.colorDarkInvert ? 'dark:invert' : ''}`}
                  />
                </a>
              ))}
            </div>

            {/* WeChat QR Code */}
            {qrCodeSrc && (
              <div className="mb-10 text-center">
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

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              {channelData?.data?.qq_group_link && (
                <Button variant="outline" size="lg" asChild>
                  <a href={channelData.data.qq_group_link} target="_blank" rel="noopener noreferrer">
                    {t('community.qq_group')}
                  </a>
                </Button>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  )
}

export default CommunitySection
