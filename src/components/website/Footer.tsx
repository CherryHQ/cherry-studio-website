import type React from 'react'
import { Trans, useTranslation } from 'react-i18next'

import cherryLogo from '@/assets/images/cherry-logo.svg'
import gitcodeIcon from '@/assets/images/icons/gitcode.svg'
import gitcodeColorIcon from '@/assets/images/icons/gitcode-color.svg'
import githubIcon from '@/assets/images/icons/github.svg'
import githubColorIcon from '@/assets/images/icons/github-color.svg'
import pIcon from '@/assets/images/icons/p.svg'
import pColorIcon from '@/assets/images/icons/p-color.svg'
import rssIcon from '@/assets/images/icons/rss.svg'
import rssColorIcon from '@/assets/images/icons/rss-color.svg'
import tgIcon from '@/assets/images/icons/tg.svg'
import tgColorIcon from '@/assets/images/icons/tg-color.svg'
import xIcon from '@/assets/images/icons/x.svg'
import xColorIcon from '@/assets/images/icons/x-color.svg'
import cherryWxQR from '@/assets/images/resource/cherrywx.png'
import { copyRSSLink } from '@/utils'
import LanguageSelector from './LanguageSelector'

const Footer: React.FC = () => {
  const { t } = useTranslation()

  const socialLinks = [
    { href: 'https://x.com/CherryStudioHQ', icon: xIcon, colorIcon: xColorIcon, alt: 'X', darkInvert: true },
    { href: 'https://t.me/CherryStudioAI', icon: tgIcon, colorIcon: tgColorIcon, alt: 'Telegram', darkInvert: false },
    {
      href: 'https://github.com/CherryHQ/cherry-studio',
      icon: githubIcon,
      colorIcon: githubColorIcon,
      alt: 'GitHub',
      darkInvert: true
    },
    {
      href: 'https://gitcode.com/CherryHQ/cherry-studio',
      icon: gitcodeIcon,
      colorIcon: gitcodeColorIcon,
      alt: 'GitCode',
      darkInvert: false
    },
    {
      href: 'https://www.producthunt.com/products/cherry-studio',
      icon: pIcon,
      colorIcon: pColorIcon,
      alt: 'Product Hunt',
      darkInvert: false
    }
  ]

  const cherryLinks = [
    { href: 'https://github.com/CherryHQ/cherry-studio', label: t('footer.cherry_studio.github') },
    { href: 'https://gitcode.com/CherryHQ/cherry-studio', label: t('footer.cherry_studio.gitcode') },
    { href: 'https://docs.cherry-ai.com', label: t('footer.cherry_studio.docs') },
    { href: 'https://github.com/CherryHQ/cherry-studio/issues', label: t('footer.cherry_studio.feedback') }
  ]

  const friendlyLinks = [
    { href: 'https://one.ocoolai.com', label: 'ocoolAI' },
    { href: 'https://poe.com/', label: 'Poe' },
    { href: 'https://suanleme.cn', label: '算了么' },
    { href: 'https://gongke.net/', label: '攻壳智能体' },
    { href: 'https://ai-bot.cn', label: 'AI 工具集' }
  ]

  return (
    <footer className="border-border bg-card relative border-t">
      {/* Main Footer */}
      <div className="mx-auto max-w-[1400px] px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12">
          {/* Brand Column */}
          <div className="space-y-5 lg:col-span-4">
            <img src={cherryLogo} alt="Cherry Studio" className="h-8 w-auto" />
            <p className="text-muted-foreground text-sm leading-relaxed">{t('footer.description')}</p>
            <div className="flex flex-wrap gap-2">
              {socialLinks.map((link) => (
                <a
                  key={link.alt}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group border-border bg-secondary/50 hover:bg-secondary relative flex h-9 w-9 items-center justify-center rounded-lg border transition-all duration-200">
                  <img
                    src={link.icon}
                    alt={link.alt}
                    className="h-4 w-4 opacity-70 invert transition-opacity duration-200 group-hover:opacity-0"
                  />
                  <img
                    src={link.colorIcon}
                    alt={link.alt}
                    className={`absolute h-4 w-4 opacity-0 transition-opacity duration-200 group-hover:opacity-100 ${link.darkInvert ? 'dark:invert' : ''}`}
                  />
                </a>
              ))}
              <button
                type="button"
                onClick={copyRSSLink}
                className="group border-border bg-secondary/50 hover:bg-secondary relative flex h-9 w-9 items-center justify-center rounded-lg border transition-all duration-200">
                <img
                  src={rssIcon}
                  alt="RSS"
                  className="h-4 w-4 opacity-70 invert transition-opacity duration-200 group-hover:opacity-0"
                />
                <img
                  src={rssColorIcon}
                  alt="RSS"
                  className="absolute h-4 w-4 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                />
              </button>
            </div>
          </div>

          {/* Links Columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-5">
            {/* Cherry Studio Links */}
            <div>
              <h4 className="text-foreground mb-4 text-sm font-semibold">{t('footer.cherry_studio.title')}</h4>
              <ul className="space-y-2.5">
                {cherryLinks.map((link) => (
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

            {/* Friendly Links */}
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

            {/* Contact - Compact */}
            <div>
              <h4 className="text-foreground mb-4 text-sm font-semibold">{t('footer.contact_us.title')}</h4>
              <div className="border-border mb-3 inline-block overflow-hidden rounded-lg border bg-white p-1.5">
                <img src={cherryWxQR} alt={t('footer.contact_us.wechat_qr_alt')} className="h-24 w-24" />
              </div>
              <p className="text-muted-foreground text-xs">{t('footer.contact_us.wechat_official_account')}</p>
            </div>
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
              <li>
                <a
                  href="https://docs.cherry-ai.com/question-contact/suggestions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary text-sm transition-colors duration-200">
                  {t('footer.contact_us.feedback')}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-border border-t">
        <div className="mx-auto max-w-[1400px] px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            {/* Copyright */}
            <p className="text-muted-foreground text-xs">
              <Trans
                i18nKey="footer.copyright"
                components={[
                  <a
                    key="icp"
                    href="https://beian.miit.gov.cn/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary">
                    沪ICP备2021031071号-3
                  </a>
                ]}
              />
              <span className="mx-2">|</span>
              <a
                href="https://www.beian.gov.cn/portal/registerSystemInfo?recordcode=31011402021679"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary">
                沪公网安备31011402021679号
              </a>
            </p>

            {/* Language Selector */}
            <LanguageSelector />
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
