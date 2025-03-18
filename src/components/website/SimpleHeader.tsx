import React from 'react'
import { Link } from 'react-router-dom'
import cherryLogo from '/src/assets/images/cherry_logo.png'

// 创建一个不依赖jQuery的简化版Header
const SimpleHeader: React.FC = () => {
  return (
    <header className="main-header header-style-one">
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
                  <li className={location.pathname === '/css' ? 'current' : ''}>
                    <Link to="/css">CSS素材</Link>
                  </li>
                  <li className="dropdown">
                    <a href="https://docs.cherry-ai.com/">文档</a>
                    <ul>
                      <li><a href="https://docs.cherry-ai.com">CherryStudio简介</a></li>
                      <li><a href="https://docs.cherry-ai.com/pre-basic/installation">基础教程</a></li>
                      <li><a href="https://docs.cherry-ai.com/advanced-basic/knowledge-base">进阶教程</a></li>
                      <li><a href="https://docs.cherry-ai.com/contribution/code">项目贡献</a></li>
                      <li><a href="https://docs.cherry-ai.com/question-contact/questions">问题&反馈</a></li>
                    </ul>
                  </li>
                  <li>
                    <a href="https://docs.cherry-ai.com/contact-us/questions">联系我们</a>
                  </li>
                </ul>
              </nav>

              <div className="outer-box">
                <a href="https://docs.cherry-ai.com/?q=" target="_blank">
                  <div className="search-box-outer">
                    <div className="dropdown">
                      <button className="search-box-btn one search-toggler">
                        <span className="icon-1"></span>
                      </button>
                    </div>
                  </div>
                </a>

                <div className="start_trils_btn">
                  <a href="https://github.com/CherryHQ/cherry-studio" className="theme-btn" target="_blank">
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default SimpleHeader 