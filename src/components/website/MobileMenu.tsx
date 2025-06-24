import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router-dom'

import LanguageSelector from './LanguageSelector'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const location = useLocation()
  const { t } = useTranslation()

  return (
    <div className={`mobile-menu ${isOpen ? 'active' : ''}`}>
      <div className="mobile-menu-overlay" onClick={onClose} />
      <div className="mobile-menu-container">
        <div className="mobile-menu-header">
          <LanguageSelector />
          <button className="mobile-menu-close" onClick={onClose} type="button">
            ×
          </button>
        </div>
        <nav className="mobile-nav">
          <ul className="mobile-navigation">
            <li className={location.pathname === '/' ? 'current' : ''}>
              <Link to="/" onClick={onClose}>
                {t('nav.home')}
              </Link>
            </li>
            <li className={location.pathname === '/download' ? 'current' : ''}>
              <Link to="/download" onClick={onClose}>
                {t('nav.download')}
              </Link>
            </li>
            <li className={location.pathname === '/theme' ? 'current' : ''}>
              <Link to="/theme" onClick={onClose}>
                {t('nav.theme')}
              </Link>
            </li>
            <li className="mobile-dropdown">
              <a href="https://docs.cherry-ai.com/">{t('nav.docs')}</a>
              <ul>
                <li>
                  <a href="https://docs.cherry-ai.com">{t('nav.docs_menu.project_intro')}</a>
                </li>
                <li>
                  <a href="https://docs.cherry-ai.com/pre-basic/installation">{t('nav.docs_menu.basic_tutorial')}</a>
                </li>
                <li>
                  <a href="https://docs.cherry-ai.com/advanced-basic/knowledge-base">
                    {t('nav.docs_menu.advanced_tutorial')}
                  </a>
                </li>
                <li>
                  <a href="https://docs.cherry-ai.com/contribution/code">{t('nav.docs_menu.project_contribution')}</a>
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
      </div>
    </div>
  )
}

export default MobileMenu
