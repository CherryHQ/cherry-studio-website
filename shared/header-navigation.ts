export interface HeaderLink {
  href: string
  label: string
  badge?: string
  external?: boolean
  active?: boolean
  analyticsLocation?: string
  onClick?: () => string | undefined
  children?: HeaderLink[]
}

interface HeaderLabels {
  desktop: string
  mobile: string
  docs: string
  theme: string
  resources: string
  articles: string
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
  enterpriseHref?: string
  onEnterpriseClick?: () => string | undefined
}

export function getHeaderLinks({
  labels,
  language,
  englishSite,
  pathname,
  docsActive = false,
  enterpriseHref,
  onEnterpriseClick
}: HeaderNavigationOptions): HeaderLink[] {
  const chinese = language.toLowerCase().startsWith('zh')
  const desktop: HeaderLink = {
    href: '/',
    label: labels.desktop,
    active: !docsActive && pathname === '/'
  }
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
    href: enterpriseHref ?? (chinese ? 'https://enterprise.cherryai.com.cn' : 'https://enterprise.cherryai.com'),
    label: labels.enterprise,
    external: true,
    analyticsLocation: 'header_enterprise',
    onClick: onEnterpriseClick
  }
  const resourceLinks: HeaderLink[] = [
    { href: '/theme', label: labels.theme, active: !docsActive && pathname === '/theme' },
    {
      href: '/resources/articles/',
      label: labels.articles,
      active: !docsActive && pathname.startsWith('/resources/articles')
    }
  ]
  const resources: HeaderLink = {
    href: '/resources',
    label: labels.resources,
    active: resourceLinks.some((item) => item.active),
    children: resourceLinks
  }

  return englishSite
    ? [
        {
          href: '/flash',
          label: labels.pricing,
          badge: labels.pricing_badge,
          active: !docsActive && pathname.startsWith('/flash')
        },
        desktop,
        mobile,
        docs,
        resources,
        enterprise
      ]
    : [
        desktop,
        mobile,
        docs,
        { href: '/careers', label: labels.careers, active: !docsActive && pathname === '/careers' },
        resources,
        enterprise
      ]
}
