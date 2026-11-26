import { type FC, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import gitcodeIcon from '@/assets/images/icons/gitcode.svg'
import githubIcon from '@/assets/images/icons/github.svg'
import pIcon from '@/assets/images/icons/p.svg'
import rssIcon from '@/assets/images/icons/rss.svg'
import tgIcon from '@/assets/images/icons/tg.svg'
import xIcon from '@/assets/images/icons/x.svg'
import cherryLogo from '@/assets/images/logo.png'
import cherryWxQR from '@/assets/images/resource/cherrywx.png'
import { copyRSSLink } from '@/utils'
import { getEnterpriseUrl, trackEnterpriseNavigation } from '@/utils/analytics'
import { getDocsUrl } from '@/utils/urls'
import LanguageSelector from './LanguageSelector'
import ThemeSelector from './ThemeSelector'

const Footer: FC = () => {
  const { t, i18n } = useTranslation()
  const isZhCN = i18n.language === 'zh-CN'
  const isEn = i18n.language.startsWith('en')

  const [rssCopied, setRssCopied] = useState(false)
  const rssCopiedTimerRef = useRef<number | null>(null)

  const handleCopyRSS = () => {
    copyRSSLink()

    setRssCopied(true)

    if (rssCopiedTimerRef.current) {
      window.clearTimeout(rssCopiedTimerRef.current)
    }

    rssCopiedTimerRef.current = window.setTimeout(() => {
      setRssCopied(false)
      rssCopiedTimerRef.current = null
    }, 1600)
  }

  useEffect(() => {
    return () => {
      if (rssCopiedTimerRef.current) {
        window.clearTimeout(rssCopiedTimerRef.current)
      }
    }
  }, [])

  const socialLinks = [
    { href: 'https://x.com/CherryStudioHQ', icon: xIcon, alt: 'X' },
    { href: 'https://t.me/CherryStudioAI', icon: tgIcon, alt: 'Telegram' },
    {
      href: 'https://github.com/CherryHQ/cherry-studio',
      icon: githubIcon,
      alt: 'GitHub'
    },
    {
      href: 'https://gitcode.com/CherryHQ/cherry-studio',
      icon: gitcodeIcon,
      alt: 'GitCode'
    },
    {
      href: 'https://www.producthunt.com/products/cherry-studio',
      icon: pIcon,
      alt: 'Product Hunt'
    }
  ]

  interface FooterLink {
    href: string
    label: string
    analyticsLocation?: string
  }

  // 英文站不展示 GitCode；两站均保留企业版、移动版和站内文档入口。
  const enterpriseHref = getEnterpriseUrl()
  const cherryLinks: FooterLink[] = isEn
    ? [
        { href: enterpriseHref, label: t('footer.cherry_studio.enterprise'), analyticsLocation: 'footer' },
        { href: '/mobile', label: t('footer.cherry_studio.mobile') },
        { href: 'https://github.com/CherryHQ/cherry-studio', label: t('footer.cherry_studio.github') },
        { href: getDocsUrl(i18n.language), label: t('footer.cherry_studio.docs') },
        { href: '/subscription/faq', label: t('faq_page.link') }
      ]
    : [
        { href: enterpriseHref, label: t('footer.cherry_studio.enterprise'), analyticsLocation: 'footer' },
        { href: '/mobile', label: t('footer.cherry_studio.mobile') },
        { href: 'https://github.com/CherryHQ/cherry-studio', label: t('footer.cherry_studio.github') },
        { href: 'https://gitcode.com/CherryHQ/cherry-studio', label: t('footer.cherry_studio.gitcode') },
        { href: getDocsUrl(i18n.language), label: t('footer.cherry_studio.docs') },
        { href: '/subscription/faq', label: t('faq_page.link') }
      ]

  const communityLinks = [
    { href: 'https://discord.gg/wez8HtpxqQ', label: 'Discord' },
    { href: 'https://x.com/CherryStudioHQ', label: 'X' },
    { href: 'https://www.linkedin.com/company/cherryhq/', label: 'LinkedIn' },
    { href: 'https://www.instagram.com/cherrystudio_official/', label: 'Instagram' }
  ]

  const friendlyLinks = [
    { href: 'https://www.newapi.ai/zh', label: 'New API' },
    { href: 'https://poe.com/', label: 'Poe' },
    { href: 'https://suanleme.cn', label: isZhCN ? '算了么' : 'suanleme.cn' },
    { href: 'https://gongke.net/', label: isZhCN ? '攻壳智能体' : 'gongke.net' },
    { href: 'https://lizhi.shop/', label: isZhCN ? '数码荔枝正版软件' : 'DIGITALYCHEE' }
  ]

  return (
    <footer className="relative overflow-hidden border-t border-border bg-background">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/60 to-transparent"
      />
      {/* Main Footer */}
      <div className="site-container py-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12">
          {/* Brand Column */}
          <div className="space-y-5 lg:col-span-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <img src={cherryLogo} alt="" className="size-7 rounded-md" />
              Cherry Studio
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">{t('footer.description')}</p>
            {!isEn && (
              <div className="flex flex-wrap gap-2">
                {socialLinks.map((link) => (
                  <a
                    key={link.alt}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group border-border bg-surface-glass hover:border-hairline-strong hover:bg-accent relative flex size-9 items-center justify-center rounded-md border transition-all duration-200">
                    <img
                      src={link.icon}
                      alt={link.alt}
                      className="size-4 brightness-0 opacity-75 transition-opacity group-hover:opacity-100 dark:invert"
                    />
                  </a>
                ))}
                <div className="flex cursor-pointer items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCopyRSS}
                    className="group border-border bg-surface-glass hover:border-hairline-strong hover:bg-accent relative flex size-9 cursor-pointer items-center justify-center rounded-md border transition-colors">
                    <img
                      src={rssIcon}
                      alt="RSS"
                      className="size-4 brightness-0 opacity-75 transition-opacity group-hover:opacity-100 dark:invert"
                    />
                  </button>

                  <span
                    aria-live="polite"
                    className={`text-muted-foreground select-none whitespace-nowrap text-xs transition-opacity duration-300 ease-out ${rssCopied ? 'opacity-100' : 'pointer-events-none opacity-0'}`}>
                    {t('footer.rss_copied')}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Links Columns */}
          <div className="grid grid-cols-2 gap-8 lg:col-span-5">
            {/* Cherry Studio Links */}
            <div>
              <h4 className="text-foreground mb-4 text-sm font-semibold">{t('footer.cherry_studio.title')}</h4>
              <ul className="space-y-2.5">
                {cherryLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={
                        link.analyticsLocation
                          ? (event) => {
                              event.currentTarget.href = trackEnterpriseNavigation(link.analyticsLocation ?? 'footer')
                            }
                          : undefined
                      }
                      target={link.href.startsWith('/') ? undefined : '_blank'}
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary text-sm transition-colors duration-200">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Community Links - 线上英文站 */}
            {isEn && (
              <div>
                <h4 className="text-foreground mb-4 text-sm font-semibold">{t('footer.community.title')}</h4>
                <ul className="space-y-2.5">
                  {communityLinks.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary text-sm transition-colors duration-200">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Friendly Links */}
            {!isEn && (
              <div>
                <h4 className="text-foreground mb-4 text-sm font-semibold">{t('footer.friendly_links.title')}</h4>
                <ul className="space-y-2.5">
                  {friendlyLinks.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary text-sm transition-colors duration-200">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Contact Info Column */}
          <div className="lg:col-span-3">
            <h4 className="text-foreground mb-4 text-sm font-semibold">{t('nav.contact')}</h4>
            <ul className="space-y-2.5">
              <li>
                <span className="text-muted-foreground text-sm">{t('footer.contact_us.support_email')}: </span>
                <a href="mailto:support@cherry-ai.com" className="text-primary text-sm hover:underline">
                  support@cherry-ai.com
                </a>
              </li>
              <li>
                <span className="text-muted-foreground text-sm">{t('footer.contact_us.business_email')}: </span>
                <a href="mailto:bd@cherry-ai.com" className="text-primary text-sm hover:underline">
                  bd@cherry-ai.com
                </a>
              </li>
              {!isEn && (
                <li>
                  <a
                    href={`${getDocsUrl(i18n.language)}question-contact/suggestions/`}
                    className="text-muted-foreground hover:text-primary text-sm transition-colors duration-200">
                    {t('footer.contact_us.feedback')}
                  </a>
                </li>
              )}
            </ul>
            {/* 中文站：公众号二维码并入联系我们 */}
            {!isEn && (
              <div className="mt-5 flex items-center gap-3">
                <div className="border-border overflow-hidden rounded-lg border bg-white p-1.5">
                  <img src={cherryWxQR} alt={t('footer.contact_us.wechat_qr_alt')} className="h-20 w-20" />
                </div>
                <p className="text-muted-foreground text-xs">{t('footer.contact_us.wechat_official_account')}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div aria-hidden="true" className="site-container pointer-events-none select-none">
        <p className="text-gradient -mb-[0.18em] text-[clamp(3.5rem,13vw,11rem)] leading-none font-display whitespace-nowrap opacity-20 [mask-image:linear-gradient(to_bottom,black_40%,transparent)]">
          Cherry Studio
        </p>
      </div>

      {/* Bottom Bar */}
      <div className="relative border-t border-border bg-background">
        <div className="site-container py-5">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            {/* Copyright */}
            <p className="text-muted-foreground text-xs">
              {isZhCN ? (
                <>
                  Copyright © 2026 上海千彗科技有限公司{' '}
                  <a
                    href="https://beian.miit.gov.cn/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary">
                    沪ICP备2021031071号-4
                  </a>
                  <span className="mx-2">|</span>
                  <a
                    href="https://www.beian.gov.cn/portal/registerSystemInfo?recordcode=31011402021679"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary">
                    沪公网安备31011402021679号
                  </a>
                </>
              ) : (
                <>Copyright © 2026 Cherry Intelligence</>
              )}
            </p>

            {/* Language Selector + Theme Selector */}
            <div className="flex items-center gap-4">
              <LanguageSelector />
              <ThemeSelector />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
