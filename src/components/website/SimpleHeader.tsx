import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router-dom'

import cherryLogoSvg from '@/assets/images/cherry-logo.svg'
import githubIcon from '@/assets/images/icons/github.svg'
import cherryLogoPng from '@/assets/images/logo.png'
import { getDocsUrl, getEnterpriseUrl } from '@/utils/urls'
import { SiteHeader } from '../../../shared/SiteHeader'
import LanguageSelector from './LanguageSelector'
import ThemeSelector from './ThemeSelector'

export default function SimpleHeader() {
  const { t, i18n } = useTranslation()
  const { pathname } = useLocation()
  return (
    <SiteHeader
      logo={cherryLogoPng}
      mobileLogo={cherryLogoSvg}
      githubIcon={githubIcon}
      links={[
        { href: '/', label: t('nav.home'), active: pathname === '/' },
        { href: '/mobile', label: t('nav.mobile'), active: pathname.startsWith('/mobile') },
        { href: getDocsUrl(i18n.language), label: t('nav.docs') },
        { href: '/theme', label: t('nav.theme'), active: pathname === '/theme' },
        { href: '/careers', label: t('nav.careers'), active: pathname === '/careers' },
        { href: getEnterpriseUrl(i18n.language), label: t('nav.enterprise'), external: true }
      ]}
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
      renderLink={({ href, ...props }) =>
        href.startsWith('/docs/') ? <a href={href} {...props} /> : <Link to={href} {...props} />
      }
    />
  )
}
