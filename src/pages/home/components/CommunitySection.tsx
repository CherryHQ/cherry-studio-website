import { ArrowUpRight, ChevronRight, MessageCircle, QrCode, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import discordIcon from '@/assets/images/icons/discord-color.svg'
import gitcodeIcon from '@/assets/images/icons/gitcode.svg'
import githubIcon from '@/assets/images/icons/github.svg'
import instagramIcon from '@/assets/images/icons/instagram-color.svg'
import linkedinIcon from '@/assets/images/icons/linkedin-color.svg'
import pIcon from '@/assets/images/icons/p.svg'
import tgIcon from '@/assets/images/icons/tg.svg'
import xIcon from '@/assets/images/icons/x.svg'
import { fetchChannelData, getRandomWechatQRCode } from '@/assets/js/data'
import BlurInText from '@/components/website/BlurInText'
import { isEnglishSite } from '@/utils/urls'

const DISCORD_URL = 'https://discord.gg/wez8HtpxqQ'
const xLink = { href: 'https://x.com/CherryStudioHQ', icon: xIcon, label: 'X' }
const enSocialLinks = [
  { href: DISCORD_URL, icon: discordIcon, label: 'Discord' },
  { href: 'https://www.instagram.com/cherrystudio_official/', icon: instagramIcon, label: 'Instagram' },
  { href: 'https://www.linkedin.com/company/cherryhq/', icon: linkedinIcon, label: 'LinkedIn' },
  xLink
]
const zhSocialLinks = [
  { href: 'https://github.com/CherryHQ/cherry-studio', icon: githubIcon, label: 'GitHub' },
  { href: 'https://gitcode.com/CherryHQ/cherry-studio', icon: gitcodeIcon, label: 'GitCode' },
  { href: 'https://t.me/CherryStudioAI', icon: tgIcon, label: 'Telegram' },
  { href: 'https://www.producthunt.com/products/cherry-studio', icon: pIcon, label: 'Product Hunt' },
  xLink
]
function DiscordMark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
      <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
    </svg>
  )
}

const linkStyle =
  'flex min-w-0 cursor-pointer items-center gap-3 bg-card px-4 py-4 text-left text-sm font-medium text-foreground transition-colors hover:bg-accent focus-visible:z-10 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary sm:[&:last-child:nth-child(odd)]:col-span-2'
const arrowStyle = 'ml-auto size-4 shrink-0 text-muted-foreground'

export default function CommunitySection() {
  const { t, i18n } = useTranslation()
  const isEn = isEnglishSite(i18n.resolvedLanguage || i18n.language)
  const [channels, setChannels] = useState({ qq: '', wechat: '' })
  const qrDialog = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    if (isEn) return

    let active = true
    void fetchChannelData().then((result) => {
      if (active && result) {
        setChannels({ qq: result.data.qq_group_link, wechat: getRandomWechatQRCode(result) })
      }
    })
    return () => {
      active = false
    }
  }, [isEn])

  return (
    <section
      id="Community"
      aria-labelledby="home-community-heading"
      className="relative isolate border-t border-border py-20 sm:py-28">
      <div className="site-container site-split">
        <div className="max-w-md">
          <h2 id="home-community-heading" className="text-4xl font-display text-balance sm:text-5xl">
            <BlurInText text={t('community.title')} />
          </h2>
          <p className="mt-3 text-pretty text-base text-muted-foreground">{t('community.subtitle')}</p>
          {isEn && (
            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group glass-card relative mt-8 flex items-center gap-4 overflow-hidden rounded-[20px] p-5 transition-[border-color,transform] duration-300 ease-settle hover:-translate-y-0.5 hover:border-[#5865f2]/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
              <span className="relative flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#5865f2] text-white shadow-[0_8px_24px_-6px_#5865f2]">
                <DiscordMark className="size-6" />
              </span>
              <span className="relative min-w-0">
                <span className="flex items-center gap-1.5 font-semibold text-foreground">
                  {t('community.join_discord')}
                  <ArrowUpRight aria-hidden="true" className="size-4 text-muted-foreground" />
                </span>
                <span className="mt-0.5 block text-sm text-muted-foreground">{t('community.discord_prompt')}</span>
              </span>
            </a>
          )}
        </div>

        <div className="grid gap-px self-start overflow-hidden rounded-[20px] border border-border bg-border sm:grid-cols-2">
          {(isEn ? enSocialLinks : zhSocialLinks).map(({ label, href, icon }) => (
            <a key={href} href={href} target="_blank" rel="noopener noreferrer" className={linkStyle}>
              <img src={icon} alt="" className="size-4 shrink-0 brightness-0 dark:invert" />
              <span>{label}</span>
              <ArrowUpRight aria-hidden="true" className={arrowStyle} />
            </a>
          ))}
          {!isEn && channels.qq && (
            <a href={channels.qq} target="_blank" rel="noopener noreferrer" className={linkStyle}>
              <MessageCircle aria-hidden="true" className="size-4 shrink-0" />
              <span>{t('community.qq_group')}</span>
              <ArrowUpRight aria-hidden="true" className={arrowStyle} />
            </a>
          )}
          {!isEn && channels.wechat && (
            <button
              type="button"
              aria-haspopup="dialog"
              onClick={() => qrDialog.current?.showModal()}
              className={linkStyle}>
              <QrCode aria-hidden="true" className="size-4 shrink-0" />
              <span>{t('community.wechat_scan_prompt')}</span>
              <ChevronRight aria-hidden="true" className={arrowStyle} />
            </button>
          )}
        </div>
      </div>

      {!isEn && channels.wechat && (
        <dialog
          ref={qrDialog}
          aria-labelledby="home-community-qr"
          className="fixed inset-0 m-auto w-[calc(100%-3rem)] max-w-xs rounded-lg border border-border bg-card p-0 text-foreground backdrop:bg-black/60"
          onClick={(event) => {
            if (event.target === event.currentTarget) qrDialog.current?.close()
          }}>
          <div className="p-4">
            <div className="mb-3 flex items-center justify-between gap-3">
              <h3 id="home-community-qr" className="text-base font-semibold">
                {t('community.wechat_scan_prompt')}
              </h3>
              <button
                type="button"
                aria-label={t('community.close_qr')}
                onClick={() => qrDialog.current?.close()}
                className="grid size-8 shrink-0 cursor-pointer place-items-center rounded-md hover:bg-accent focus-visible:outline-2 focus-visible:outline-primary">
                <X aria-hidden="true" className="size-4" />
              </button>
            </div>
            <img
              src={channels.wechat}
              alt={t('community.wechat_qr_alt')}
              className="mx-auto block aspect-square w-full rounded-md bg-white object-contain"
            />
          </div>
        </dialog>
      )}
    </section>
  )
}
