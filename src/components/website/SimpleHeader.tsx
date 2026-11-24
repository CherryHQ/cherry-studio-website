import { Moon, Sun } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router-dom'

import githubIcon from '@/assets/images/icons/github.svg'
import cherryLogoPng from '@/assets/images/logo.png'
import { useTheme } from '@/hooks/useTheme'
import { getEnterprisePortalUrl, trackEnterpriseNavigation } from '@/utils/analytics'
import { isMobileDevice } from '@/utils/systemDetection'
import { isEnglishSite } from '@/utils/urls'
import { getHeaderLinks } from '../../../shared/header-navigation'
import { SiteHeader } from '../../../shared/SiteHeader'
import LanguageSelector from './LanguageSelector'
import ThemeSelector from './ThemeSelector'

export default function SimpleHeader() {
  const { t, i18n } = useTranslation()
  const { pathname } = useLocation()
  const { isDark, setTheme } = useTheme()
  const nextTheme = isDark ? 'light' : 'dark'
  const themeLabel = t(`theme_switcher.${nextTheme}`)
  const isMobile = isMobileDevice()
  const isDownload = pathname === '/download' || pathname.startsWith('/download/')
  const englishSite = isEnglishSite(i18n.resolvedLanguage || i18n.language)
  const links = getHeaderLinks({
    labels: {
      desktop: t('nav.desktop'),
      mobile: t('nav.mobile'),
      docs: t('nav.docs'),
      theme: t('nav.theme'),
      resources: t('nav.resources'),
      articles: t('nav.articles'),
      careers: t('nav.careers'),
      enterprise: t('nav.enterprise'),
      pricing: t('nav.pricing'),
      pricing_badge: t('nav.pricing_badge')
    },
    language: i18n.language,
    englishSite,
    pathname,
    enterpriseHref: getEnterprisePortalUrl(i18n.language),
    onEnterpriseClick: () => trackEnterpriseNavigation('header', i18n.language)
  })
  return (
    <>
      <a
        href="#site-content"
        className="sr-only z-[60] rounded-md bg-foreground px-4 py-2 font-semibold text-background focus:not-sr-only focus:fixed focus:top-4 focus:left-4">
        {t('home_page.skip')}
      </a>
      <SiteHeader
        logo={cherryLogoPng}
        githubIcon={githubIcon}
        links={links}
        menuLabel={t('nav.menu')}
        downloadAction={isDownload ? undefined : { href: isMobile ? '/mobile' : '/download', label: t('download') }}
        themeControl={
          <button
            type="button"
            aria-label={themeLabel}
            title={themeLabel}
            onClick={() => setTheme(nextTheme)}
            className="hidden size-8 cursor-pointer place-items-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary min-[1100px]:grid">
            {isDark ? <Sun aria-hidden="true" className="size-4" /> : <Moon aria-hidden="true" className="size-4" />}
          </button>
        }
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
    </>
  )
}
