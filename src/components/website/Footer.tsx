import React from 'react'

import cherryLogo from '@/assets/images/cherry-logo.svg'
import gitcodeIcon from '@/assets/images/icons/gitcode.svg'
import githubIcon from '@/assets/images/icons/github.svg'
import pIcon from '@/assets/images/icons/p.svg'
import rssIcon from '@/assets/images/icons/rss.svg'
import tgIcon from '@/assets/images/icons/tg.svg'
import xIcon from '@/assets/images/icons/x.svg'
import cherryWxQR from '@/assets/images/resource/cherrywx.png'
import { copyRSSLink } from '@/utils'

const Footer: React.FC = () => {
  return (
    <footer className="main-footer">
      <div className="widget-section">
        <div className="auto-container">
          <div className="row clearfix">
            <div className="col-lg-3 col-md-6 col-sm-12 footer-column">
              <div className="footer-widget logo-widget">
                <figure className="footer-logo no-hover">
                  <a href="index.html">
                    <img src={cherryLogo} style={{ width: 150 }} alt="" />
                  </a>
                </figure>
                <p>CherryStudio是一个支持多平台的AI客户端，我们致力于让更多人能够享受到AI带来的便利。</p>
                <ul className="social-links">
                  <li>
                    <a href="https://x.com/kangfenmao" className="social-icon">
                      <img src={xIcon} alt="X Icon" />
                    </a>
                  </li>
                  <li>
                    <a href="https://t.me/CherryStudioAI" className="social-icon">
                      <img src={tgIcon} alt="T Icon" />
                    </a>
                  </li>
                  <li>
                    <a href="https://github.com/CherryHQ/cherry-studio" className="social-icon">
                      <img src={githubIcon} alt="GitHub Icon" />
                    </a>
                  </li>
                  <li>
                    <a href="https://gitcode.com/CherryHQ/cherry-studio" className="social-icon">
                      <img src={gitcodeIcon} alt="GitCode Icon" className="gitcode-icon" />
                    </a>
                  </li>
                  <li>
                    <a href="https://www.producthunt.com/products/cherry-studio" className="social-icon">
                      <img src={pIcon} alt="P Icon" />
                    </a>
                  </li>
                  <li>
                    <a className="social-icon" onClick={copyRSSLink}>
                      <img src={rssIcon} alt="RSS Icon" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-2 col-md-6 col-sm-12 footer-column">
              <div className="footer-widget links-widget ml_40">
                <div className="widget-title">
                  <h4 style={{ whiteSpace: 'nowrap' }}>Cherry Studio</h4>
                </div>
                <div className="widget-content">
                  <ul className="links-list clearfix">
                    <li>
                      <a href="https://github.com/CherryHQ/cherry-studio" target="_blank" rel="noopener noreferrer">
                        Github
                      </a>
                    </li>
                    <li>
                      <a href="https://gitcode.com/CherryHQ/cherry-studio" target="_blank" rel="noopener noreferrer">
                        GitCode
                      </a>
                    </li>
                    <li>
                      <a href="https://docs.cherry-ai.com" target="_blank" rel="noopener noreferrer">
                        使用文档
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://github.com/CherryHQ/cherry-studio/issues"
                        target="_blank"
                        rel="noopener noreferrer">
                        问题反馈
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 footer-column">
              <div className="footer-widget links-widget">
                <div className="widget-title">
                  <h4>友情链接</h4>
                </div>
                <div className="widget-content">
                  <ul className="links-list clearfix">
                    <li>
                      <a href="https://one.ocoolai.com" target="_blank" rel="noopener noreferrer">
                        ocoolAI
                      </a>
                    </li>
                    <li>
                      <a href="https://suanleme.cn" target="_blank" rel="noopener noreferrer">
                        算了么
                      </a>
                    </li>
                    <li>
                      <a href="https://ai-bot.cn" target="_blank" rel="noopener noreferrer">
                        AI 工具集
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12 footer-column">
              <div className="footer-widget contact-widget">
                <div className="widget-title">
                  <h4>联系我们</h4>
                </div>
                <div
                  className="mt-3"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: 'fit-content'
                  }}>
                  <img src={cherryWxQR} alt="微信公众号二维码" style={{ maxWidth: '150px' }} />
                  <p>官方微信公众号</p>
                  <br />
                </div>
                <p>
                  如果您有使用上的问题可以先查看文档或社群中提问
                  <br />
                  或邮件联系 <a href="mailto:support@cherry-ai.com">support@cherry-ai.com</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom text-center">
        <div className="auto-container">
          <div className="copyright">
            <p>
              Copyright © 2025 上海千彗科技有限公司{' '}
              <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer">
                沪ICP备2021031071号-3
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
