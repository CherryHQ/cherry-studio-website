'use client'

import { usePathname } from 'next/navigation'

import { SiteHeader } from '../../../shared/SiteHeader'
import mobileLogo from '../../../src/assets/images/cherry-logo.svg'
import githubIcon from '../../../src/assets/images/icons/github.svg'
import logo from '../../../src/assets/images/logo.png'
import en from '../../../src/i18n/lang/en.json'
import zh from '../../../src/i18n/lang/zh.json'

export function DocsSiteHeader({ locale }: { locale: string }) {
  const pathname = usePathname()
  const chinese = locale.startsWith('zh')
  const mobileDocs = pathname.includes(`/${locale}/mobile`)
  const { nav } = chinese ? zh : en
  return (
    <SiteHeader
      logo={logo.src}
      mobileLogo={mobileLogo.src}
      githubIcon={githubIcon.src}
      links={[
        { href: '/', label: nav.home },
        { href: '/mobile', label: nav.mobile },
        { href: `/docs/${locale}/`, label: nav.docs, active: true },
        { href: '/theme', label: nav.theme },
        { href: '/careers', label: nav.careers },
        {
          href: chinese ? 'https://enterprise.cherryai.com.cn' : 'https://enterprise.cherryai.com',
          label: nav.enterprise,
          external: true
        }
      ]}
      downloadLabel={nav.download}
      downloadHref={mobileDocs ? '/download?platform=mobile' : '/download'}
      menuLabel={nav.menu}
      closeLabel={nav.close_menu}
    />
  )
}
