import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router-dom'

import cherryLogo from '@/assets/images/cherry-logo.svg'
import gitcodeIcon from '@/assets/images/icons/gitcode.svg'
import githubIcon from '@/assets/images/icons/github.svg'
import TopNotice from '@/pages/home/components/TopNotice'

import LanguageSelector from './LanguageSelector'
import MobileMenu from './MobileMenu'

// 创建一个不依赖jQuery的简化版Header
const SimpleHeader: React.FC = () => {
  const { t } = useTranslation()
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <header className="main-header header-style-one">
      <TopNotice />
      <div className="main-box">
        <div className="auto-container">
          <div className="outer-container">
            <div className="logo-box">
              <div className="logo">
                <Link to="/">
                  <img src={cherryLogo} alt="Cherry Studio" className="logo-img" />
                </Link>
              </div>
            </div>

            <div className="menu-area two bg-color">
              <nav className="main-menu">
                <ul className="navigation">
                  <li className={location.pathname === '/' ? 'current' : ''}>
                    <Link to="/">{t('nav.home')}</Link>
                  </li>
                  <li className={location.pathname === '/download' ? 'current' : ''}>
                    <Link to="/download">{t('nav.download')}</Link>
                  </li>
                  <li className={location.pathname === '/enterprise' ? 'current' : ''}>
                    <Link to="/enterprise">{t('enterprise')}</Link>
                  </li>
                  <li className={location.pathname === '/theme' ? 'current' : ''}>
                    <Link to="/theme">{t('nav.theme')}</Link>
                  </li>
                  <li className={location.pathname === '/forum' ? 'current' : ''}>
                    <Link to="/agents">{t('agents')}</Link>
                  </li>
                  <li className="dropdown">
                    <a href="https://docs.cherry-ai.com/">{t('nav.docs')}</a>
                    <ul>
                      <li>
                        <a href="https://docs.cherry-ai.com">{t('nav.docs_menu.project_intro')}</a>
                      </li>
                      <li>
                        <a href="https://docs.cherry-ai.com/pre-basic/installation">
                          {t('nav.docs_menu.basic_tutorial')}
                        </a>
                      </li>
                      <li>
                        <a href="https://docs.cherry-ai.com/advanced-basic/knowledge-base">
                          {t('nav.docs_menu.advanced_tutorial')}
                        </a>
                      </li>
                      <li>
                        <a href="https://docs.cherry-ai.com/contribution/code">
                          {t('nav.docs_menu.project_contribution')}
                        </a>
                      </li>
                      <li>
                        <a href="https://docs.cherry-ai.com/question-contact/questions">
                          {t('nav.docs_menu.questions_feedback')}
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a href="https://docs.cherry-ai.com/contact-us/questions">{t('nav.contact')}</a>
                  </li>
                </ul>
              </nav>

              <div className="outer-box">
                <LanguageSelector />

                <a href="https://docs.cherry-ai.com/?q=" target="_blank" rel="noopener noreferrer">
                  <div className="search-box-outer">
                    <div className="dropdown">
                      <button className="search-box-btn one search-toggler" type="button">
                        <span className="icon-1"></span>
                      </button>
                    </div>
                  </div>
                </a>

                <div className="social-icons">
                  <a
                    href="https://github.com/CherryHQ/cherry-studio"
                    className="social-icon"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="GitHub">
                    <img src={githubIcon} alt="GitHub" />
                  </a>
                  <a
                    href="https://gitcode.com/CherryHQ/cherry-studio"
                    className="social-icon"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="GitCode">
                    <img src={gitcodeIcon} alt="GitCode" />
                  </a>
                </div>

                <button type="button" className="mobile-nav-toggler" onClick={toggleMobileMenu}>
                  <i className="fas fa-bars"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </header>
  )
}

export default SimpleHeader
