import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

import cherryLogo from '@/assets/images/cherry-logo.svg'
import gitcodeIcon from '@/assets/images/icons/gitcode.svg'
import githubIcon from '@/assets/images/icons/github.svg'
import TopNotice from '@/pages/home/components/TopNotice'

import MobileMenu from './MobileMenu'

// 创建一个不依赖jQuery的简化版Header
const SimpleHeader: React.FC = () => {
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
                  <img src={cherryLogo} alt="Cherry Studio" />
                </Link>
              </div>
            </div>

            <div className="menu-area two bg-color">
              <nav className="main-menu">
                <ul className="navigation">
                  <li className={location.pathname === '/' ? 'current' : ''}>
                    <Link to="/">主页</Link>
                  </li>
                  <li className={location.pathname === '/download' ? 'current' : ''}>
                    <Link to="/download">下载</Link>
                  </li>
                  <li className={location.pathname === '/theme' ? 'current' : ''}>
                    <Link to="/theme">主题</Link>
                  </li>
                  <li className={location.pathname === '/forum' ? 'current' : ''}>
                    <Link target="_blank" to="https://github.com/CherryHQ/cherry-studio/discussions">
                      论坛
                    </Link>
                  </li>
                  <li className="dropdown">
                    <a href="https://docs.cherry-ai.com/">文档</a>
                    <ul>
                      <li>
                        <a href="https://docs.cherry-ai.com">项目简介</a>
                      </li>
                      <li>
                        <a href="https://docs.cherry-ai.com/pre-basic/installation">基础教程</a>
                      </li>
                      <li>
                        <a href="https://docs.cherry-ai.com/advanced-basic/knowledge-base">进阶教程</a>
                      </li>
                      <li>
                        <a href="https://docs.cherry-ai.com/contribution/code">项目贡献</a>
                      </li>
                      <li>
                        <a href="https://docs.cherry-ai.com/question-contact/questions">问题&反馈</a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a href="https://docs.cherry-ai.com/contact-us/questions">联系我们</a>
                  </li>
                </ul>
              </nav>

              <div className="outer-box">
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
