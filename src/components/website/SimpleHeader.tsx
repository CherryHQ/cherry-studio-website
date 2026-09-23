import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router-dom'

import cherryLogoSvg from '@/assets/images/cherry-logo.svg'
import githubIcon from '@/assets/images/icons/github.svg'
import cherryLogoPng from '@/assets/images/logo.png'
import { EXTERNAL_DOCS_URL, getEnterpriseUrl, isEnglishSite } from '@/utils/urls'
import { SiteHeader } from '../../../shared/SiteHeader'
import LanguageSelector from './LanguageSelector'
import ThemeSelector from './ThemeSelector'

export default function SimpleHeader() {
  const { t, i18n } = useTranslation()
  const { pathname } = useLocation()
  const englishSite = isEnglishSite(i18n.resolvedLanguage || i18n.language)
  const links = englishSite
    ? [
        {
          href: '/flash',
          label: t('nav.pricing'),
          badge: t('nav.pricing_badge'),
          active: pathname.startsWith('/flash')
        },
        { href: '/mobile', label: t('nav.mobile'), active: pathname.startsWith('/mobile') },
        { href: EXTERNAL_DOCS_URL, label: t('nav.docs'), external: true },
        { href: getEnterpriseUrl(i18n.language), label: t('nav.enterprise'), external: true }
      ]
    : [
        { href: '/', label: t('nav.home'), active: pathname === '/' },
        { href: '/mobile', label: t('nav.mobile'), active: pathname.startsWith('/mobile') },
        { href: EXTERNAL_DOCS_URL, label: t('nav.docs'), external: true },
        { href: '/theme', label: t('nav.theme'), active: pathname === '/theme' },
        { href: '/careers', label: t('nav.careers'), active: pathname === '/careers' },
        { href: getEnterpriseUrl(i18n.language), label: t('nav.enterprise'), external: true }
      ]

  return (
    <SiteHeader
      logo={cherryLogoPng}
      mobileLogo={cherryLogoSvg}
      githubIcon={githubIcon}
      links={links}
      downloadLabel={t('nav.download')}
      downloadHref={pathname.startsWith('/mobile') ? '/download?platform=mobile' : '/download'}
      menuLabel={t('nav.menu')}
      closeLabel={t('nav.close_menu')}
      mobileControls={
        <>
          <LanguageSelector />
          <ThemeSelector />
        </>
      }
      renderLink={({ href, ...props }) => <Link to={href} {...props} />}
    />
  )
}
