import { FC, useEffect } from 'react'
import SearchOverlay from '@/assets/js/search'

const Header: FC = () => {
  useEffect(() => {
    new SearchOverlay()
  }, [])

  return (
    <>
      <header className="main-header header-style-one">
        <div className="main-box">
          <div className="auto-container">
            <div className="outer-container">
              <div className="logo-box">
                <div className="logo">
                  <a href="index.html">
                    <img src="src/assets/images/cherry_logo.png" alt="" />
                  </a>
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
                        <a href="/">主页</a>
                      </li>
                      <li className={location.pathname === '/download' ? 'current' : ''}>
                        <a href="/download">下载</a>
                      </li>
                      <li className="dropdown">
                        <a href="https://docs.cherry-ai.com/">文档</a>
                        <ul>
                          <li>
                            <a href="https://docs.cherry-ai.com">CherryStudio简介</a>
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
                <a href="index.html" className="img-responsive">
                  <img src="src/assets/images/cherry_logo.png" alt="" title="" />
                </a>
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
      <div className="mobile-menu">
        <div className="menu-backdrop"></div>
        <div className="close-btn">
          <i className="icon-13"></i>
        </div>

        <nav className="menu-box">
          <div className="nav-logo">
            <a href="index.html">
              <img src="src/assets/images/cherry_logo.png" alt="" title="" />
            </a>
          </div>
          <div className="menu-outer">
            {/* <!--Here Menu Will Come Automatically Via Javascript / Same Menu as in Header--> */}
          </div>
          <div className="social-links"></div>
        </nav>
      </div>
    </>
  )
}

export default Header
