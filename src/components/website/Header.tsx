import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import cherryLogo from '/src/assets/images/cherry_logo.png'

const Header: React.FC = () => {
  // 使用React状态控制菜单展开
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // 切换移动菜单状态
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  // 点击菜单外区域关闭菜单
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const menu = document.getElementById('mobile-menu-container');
      const toggler = document.querySelector('.mobile-nav-toggler');
      
      if (mobileMenuOpen && menu && toggler) {
        if (!menu.contains(event.target as Node) && 
            !toggler.contains(event.target as Node)) {
          setMobileMenuOpen(false);
        }
      }
    };
    
    // 添加点击事件监听
    document.addEventListener('mousedown', handleClickOutside);
    
    // 在窗口调整大小时关闭移动菜单
    const handleResize = () => {
      if (window.innerWidth > 991 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    // 页面滚动处理
    function headerStyle() {
      const windowpos = window.scrollY;
      const siteHeader = document.querySelector('.main-header');
      const scrollLink = document.querySelector('.scroll-to-top');
      
      if (siteHeader && scrollLink) {
        if (windowpos >= 200) {
          siteHeader.classList.add('fixed-header');
          scrollLink.classList.add('show');
        } else {
          siteHeader.classList.remove('fixed-header');
          scrollLink.classList.remove('show');
        }
      }
    }
    
    window.addEventListener('scroll', headerStyle);
    headerStyle();
    
    // 清理事件监听
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', headerStyle);
    };
  }, [mobileMenuOpen]);
  
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
              {/* 移动导航按钮 */}
              <div className="mobile-nav-toggler cherry-btn" onClick={toggleMobileMenu}>
                <i className="fas fa-bars"></i>
              </div>
              
              {/* 桌面导航菜单 - 只在桌面显示 */}
              <nav className="main-menu desktop-menu navbar-expand-md navbar-light">
                <div className="navbar-collapse show" id="navbarSupportedContent">
                  <ul className="navigation">
                    <li className={location.pathname === '/' ? 'current' : ''}>
                      <Link to="/">主页</Link>
                    </li>
                    <li className={location.pathname === '/download' ? 'current' : ''}>
                      <Link to="/download">下载</Link>
                    </li>
                    <li className="dropdown">
                      <a href="https://docs.cherry-ai.com/">文档</a>
                      <ul>
                        <li>
                          <a href="https://docs.cherry-ai.com">简介</a>
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
                </div>
              </nav>
              
              {/* 移动菜单 - 条件渲染 */}
              {mobileMenuOpen && (
                <div id="mobile-menu-container" className="mobile-menu-container">
                  <div className="mobile-menu-inner">
                    <div className="mobile-menu-close" onClick={toggleMobileMenu}>×</div>
                    <ul className="mobile-navigation">
                      <li className={location.pathname === '/' ? 'mobile-current' : ''}>
                        <Link to="/" onClick={toggleMobileMenu}>主页</Link>
                      </li>
                      <li className={location.pathname === '/download' ? 'mobile-current' : ''}>
                        <Link to="/download" onClick={toggleMobileMenu}>下载</Link>
                      </li>
                      <li className="mobile-dropdown">
                        <a href="https://docs.cherry-ai.com/">文档</a>
                        <ul className="mobile-dropdown-menu">
                          <li>
                            <a href="https://docs.cherry-ai.com">简介</a>
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
                        <a href="https://docs.cherry-ai.com/contact-us/questions" onClick={toggleMobileMenu}>
                          联系我们
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
              
              {/* 移动菜单背景遮罩 */}
              {mobileMenuOpen && (
                <div className="mobile-menu-backdrop" onClick={toggleMobileMenu}></div>
              )}
              
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
      
      {/* Sticky Header */}
      <div className="sticky-header">
        {/* 保持原有结构 */}
        <div className="auto-container">
          <div className="outer-container">
            <div className="logo">
              <Link to="/">
                <img src={cherryLogo} alt="Cherry Studio" />
              </Link>
            </div>
            
            <div className="right-col">
              <div className="menu-area">
                <nav className="main-menu"></nav>
                
                <div className="outer-box">
                  <div className="search-box-outer">
                    <div className="dropdown">
                      <button className="search-box-btn one search-toggler">
                        <span className="icon-1"></span>
                      </button>
                    </div>
                  </div>
                  
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
      </div>
    </header>
  );
};

export default Header;
