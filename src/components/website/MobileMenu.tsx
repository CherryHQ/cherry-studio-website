import React from 'react'
import { Link, useLocation } from 'react-router-dom'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const location = useLocation()

  return (
    <div className={`mobile-menu ${isOpen ? 'active' : ''}`}>
      <div className="mobile-menu-overlay" onClick={onClose} />
      <div className="mobile-menu-container">
        <div className="mobile-menu-header">
          <button className="mobile-menu-close" onClick={onClose}>
            ×
          </button>
        </div>
        <nav className="mobile-nav">
          <ul className="mobile-navigation">
            <li className={location.pathname === '/' ? 'current' : ''}>
              <Link to="/" onClick={onClose}>
                主页
              </Link>
            </li>
            <li className={location.pathname === '/download' ? 'current' : ''}>
              <Link to="/download" onClick={onClose}>
                下载
              </Link>
            </li>
            <li className={location.pathname === '/theme' ? 'current' : ''}>
              <Link to="/theme" onClick={onClose}>
                主题
              </Link>
            </li>
            <li className="mobile-dropdown">
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
      </div>
    </div>
  )
}

export default MobileMenu
