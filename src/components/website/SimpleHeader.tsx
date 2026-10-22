import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router-dom'

import cherryLogoSvg from '@/assets/images/cherry-logo.svg'
import githubIcon from '@/assets/images/icons/github.svg'
import cherryLogoPng from '@/assets/images/logo.png'
import { capture, EV_CTA_TO_ENTERPRISE, getEnterpriseUrl } from '@/utils/analytics'
import { isEnglishSite } from '@/utils/urls'
import { getHeaderLinks } from '../../../shared/header-navigation'
import { SiteHeader } from '../../../shared/SiteHeader'
import LanguageSelector from './LanguageSelector'
import ThemeSelector from './ThemeSelector'

export default function SimpleHeader() {
  const { t, i18n } = useTranslation()
  const { pathname } = useLocation()
  const englishSite = isEnglishSite(i18n.resolvedLanguage || i18n.language)
  const links = getHeaderLinks({
    labels: {
      home: t('nav.home'),
      mobile: t('nav.mobile'),
      docs: t('nav.docs'),
      theme: t('nav.theme'),
      careers: t('nav.careers'),
      enterprise: t('nav.enterprise'),
      pricing: t('nav.pricing'),
      pricing_badge: t('nav.pricing_badge')
    },
    language: i18n.language,
    englishSite,
    pathname
  })
  // The header's enterprise link is an external navigation just like the
  // landing-page CTA. Build it at render time so the anonymous PostHog ID and
  // current campaign parameters travel with either entry point.
  const linksWithHandover = links.map((item) =>
    item.analyticsLocation === 'header_enterprise' ? { ...item, href: getEnterpriseUrl() } : item
  )

  return (
    <SiteHeader
      logo={cherryLogoPng}
      mobileLogo={cherryLogoSvg}
      githubIcon={githubIcon}
      links={linksWithHandover}
      downloadLabel={t('nav.download')}
      downloadHref={pathname.startsWith('/mobile') ? '/download?platform=mobile' : '/download'}
      menuLabel={t('nav.menu')}
      closeLabel={t('nav.close_menu')}
      onLinkClick={(item) => {
        if (item.analyticsLocation) {
          capture(EV_CTA_TO_ENTERPRISE, { location: item.analyticsLocation })
        }
      }}
      mobileControls={
        <>
          <LanguageSelector />
          <ThemeSelector />
        </>
      }
      renderLink={({ href, ...props }) =>
        href.startsWith('/docs/') ? <a href={href} {...props} /> : <Link to={href} {...props} />
      }
    />
  )
}
