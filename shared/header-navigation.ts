export interface HeaderLink {
  href: string
  label: string
  badge?: string
  external?: boolean
  active?: boolean
  analyticsLocation?: string
}

interface HeaderLabels {
  home: string
  mobile: string
  docs: string
  theme: string
  careers: string
  enterprise: string
  pricing: string
  pricing_badge: string
}

interface HeaderNavigationOptions {
  labels: HeaderLabels
  language: string
  englishSite: boolean
  pathname: string
  docsActive?: boolean
}

export function getHeaderLinks({
  labels,
  language,
  englishSite,
  pathname,
  docsActive = false
}: HeaderNavigationOptions): HeaderLink[] {
  const chinese = language.toLowerCase().startsWith('zh')
  const mobile: HeaderLink = {
    href: '/mobile',
    label: labels.mobile,
    active: !docsActive && pathname.startsWith('/mobile')
  }
  const docs: HeaderLink = {
    href: `/docs/${chinese ? 'zh-cn' : 'en'}/`,
    label: labels.docs,
    active: docsActive
  }
  const enterprise: HeaderLink = {
    href: chinese ? 'https://enterprise.cherryai.com.cn' : 'https://enterprise.cherryai.com',
    label: labels.enterprise,
    external: true,
    analyticsLocation: 'header_enterprise'
  }

  return englishSite
    ? [
        {
          href: '/flash',
          label: labels.pricing,
          badge: labels.pricing_badge,
          active: !docsActive && pathname.startsWith('/flash')
        },
        mobile,
        docs,
        enterprise
      ]
    : [
        { href: '/', label: labels.home, active: !docsActive && pathname === '/' },
        mobile,
        docs,
        { href: '/theme', label: labels.theme, active: !docsActive && pathname === '/theme' },
        { href: '/careers', label: labels.careers, active: !docsActive && pathname === '/careers' },
        enterprise
      ]
}
