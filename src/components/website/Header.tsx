import React from 'react'
import { FC, useEffect } from 'react'
import { Link } from 'react-router-dom'
import cherryLogo from '/src/assets/images/cherry_logo.png'

const Header: React.FC = () => {
  useEffect(() => {
    //Update Header Style and Scroll to Top
    function headerStyle() {
      if ($('.main-header').length) {
        const windowpos = $(window).scrollTop()
        const siteHeader = $('.main-header')
        const scrollLink = $('.scroll-to-top')
        if (windowpos >= 200) {
          siteHeader.addClass('fixed-header')
          scrollLink.fadeIn(300)
        } else {
          siteHeader.removeClass('fixed-header')
          scrollLink.fadeOut(300)
        }
      }
    }

    headerStyle()

    //Update Header Style and Scroll to Top
    function headerSticky() {
      if ($('.header-style-one').length) {
        const Windowpos = $(window).scrollTop()
        const Mheader = $('.header-style-one')
        const MsLiderHeight = $('.main-slider').height()
        if (Windowpos >= MsLiderHeight) {
          Mheader.addClass('sticked-header')
        } else {
          Mheader.removeClass('sticked-header')
        }
      }
    }

    headerSticky()

    /* ==========================================================================
    When document is Scrollig, do
   ========================================================================== */

    $(window).on('scroll', function () {
      headerStyle()
      headerSticky()
    })
  }, [])

  return (
    <header className="main-header header-style-one">
      <div className="main-box">
        <div className="auto-container">
          <div className="outer-container">
            <div className="logo-box">
              <div className="logo">
                <Link to="/">
                  <img src={cherryLogo} alt="" />
                </Link>
              </div>
            </div>

            {/* {/* <!--Nav Outer--> */}
            <div className="menu-area two bg-color">
              {/* <!--Mobile Navigation Toggler--> */}
              <div className="mobile-nav-toggler cherry-btn">
                <i className="fas fa-bars"></i>
              </div>
              <nav className="main-menu navbar-expand-md navbar-light">
                <div className="navbar-collapse collapse show" id="navbarSupportedContent">
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
              {/* <!-- Main Menu End--> */}

              <div className="outer-box">
                {/* <!--Search Box--> */}
                <a href="https://docs.cherry-ai.com/?q=" target="_blank">
                  <div className="search-box-outer">
                    <div className="dropdown">
                      <button className="search-box-btn one search-toggler">
                        <span className="icon-1"></span>
                      </button>
                    </div>
                  </div>
                </a>

                {/* <!--Button--> */}
                <div className="start_trils_btn">
                  <a href="https://github.com/CherryHQ/cherry-studio" className="theme-btn" target="_blank">
                    GitHub
                  </a>
                </div>
              </div>
            </div>
            {/* <!--Nav Outer End--> */}
          </div>
        </div>
      </div>

      {/* <!--Sticky Header--> */}
      <div className="sticky-header">
        <div className="auto-container">
          <div className="outer-container">
            {/* <!--Logo--> */}
            <div className="logo">
              <Link to="/" className="img-responsive">
                <img src={cherryLogo} alt="" title="" />
              </Link>
            </div>

            {/* <!--Right Col--> */}
            <div className="right-col">
              <div className="menu-area">
                <nav className="main-menu">{/* <!--保持此处为空 / 菜单将通过 Javascript 动态加载--> */}</nav>

                <div className="outer-box">
                  <div className="search-box-outer">
                    <div className="dropdown">
                      <button className="search-box-btn one search-toggler">
                        <span className="icon-1"></span>
                      </button>
                    </div>
                  </div>

                  {/* <!--Button--> */}
                  <div className="start_trils_btn">
                    <a href="https://github.com/CherryHQ/cherry-studio" className="theme-btn" target="_blank">
                      GitHub
                    </a>
                  </div>
                </div>
              </div>
              {/* <!-- Main Menu End--> */}
            </div>
          </div>
        </div>
      </div>
      {/* <!--End Sticky Header--> */}
    </header>
  )
}

export default Header
