'use client'

import { usePathname } from 'next/navigation'

import { getHeaderLinks } from '../../../shared/header-navigation'
import { SiteHeader } from '../../../shared/SiteHeader'
import githubIcon from '../../../src/assets/images/icons/github.svg'
import logo from '../../../src/assets/images/logo.png'
import en from '../../../src/i18n/lang/en.json'
import zh from '../../../src/i18n/lang/zh.json'

export function DocsSiteHeader({ locale }: { locale: string }) {
  const pathname = usePathname()
  const chinese = locale.startsWith('zh')
  const { nav, download } = chinese ? zh : en
  return (
    <SiteHeader
      logo={logo.src}
      githubIcon={githubIcon.src}
      links={getHeaderLinks({ labels: nav, language: locale, englishSite: !chinese, pathname, docsActive: true })}
      menuLabel={nav.menu}
      closeLabel={nav.close_menu}
      downloadAction={{ href: '/download', label: download }}
    />
  )
}
