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
import SectionBackdrop from '@/components/website/SectionBackdrop'

const xLink = { href: 'https://x.com/CherryStudioHQ', icon: xIcon, label: 'X' }
const enSocialLinks = [
  { href: 'https://discord.gg/wez8HtpxqQ', icon: discordIcon, label: 'Discord' },
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
const linkStyle =
  'flex min-w-0 cursor-pointer items-center gap-3 bg-card px-4 py-4 text-left text-sm font-medium text-foreground transition-colors hover:bg-accent focus-visible:z-10 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary sm:[&:last-child:nth-child(odd)]:col-span-2'
const arrowStyle = 'ml-auto size-4 shrink-0 text-muted-foreground'

export default function CommunitySection() {
  const { t, i18n } = useTranslation()
  const isEn = i18n.language.startsWith('en')
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
      className="isolate relative scroll-mt-[60px] py-10 sm:py-12">
      <SectionBackdrop variant="arcs" />
      <div className="site-container site-split">
        <div className="max-w-md">
          <h2
            id="home-community-heading"
            className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {t('community.title')}
          </h2>
          <p className="mt-3 text-pretty text-base text-muted-foreground">{t('community.subtitle')}</p>
        </div>

        <div className="grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2">
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
