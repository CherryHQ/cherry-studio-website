import { FC } from 'react'
import { copyRSSLink } from '@/utils'
import cherryLogo from '@/assets/images/cherry_logo.png'
import xIcon from '@/assets/images/icons/x.svg'
import tgIcon from '@/assets/images/icons/tg.svg'
import githubIcon from '@/assets/images/icons/github.svg'
import pIcon from '@/assets/images/icons/p.svg'
import rssIcon from '@/assets/images/icons/rss.svg'

const Footer: FC = () => {
  return (
    <footer className="main-footer">
      <div className="widget-section">
        <div className="auto-container">
          <div className="row clearfix">
            <div className="col-lg-3 col-md-6 col-sm-12 footer-column">
              <div className="footer-widget logo-widget">
                <figure className="footer-logo">
                  <a href="index.html">
                    <img src={cherryLogo} alt="" />
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
                    <a href="https://www.producthunt.com/products/cherry-studio" className="social-icon">
                      <img src={pIcon} alt="P Icon" />
                    </a>
                  </li>
                  <li>
                    <a href="javascript:void(0);" className="social-icon" onClick={copyRSSLink}>
                      <img src={rssIcon} alt="RSS Icon" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-2 col-md-6 col-sm-12 footer-column">
              <div className="footer-widget links-widget ml_40">
                <div className="widget-title">
                  <h4>CherryStudio</h4>
                </div>
                <div className="widget-content">
                  <ul className="links-list clearfix">
                    <li>
                      <a href="https://github.com/CherryHQ/cherry-studio" target="_blank">
                        Github
                      </a>
                    </li>
                    <li>
                      <a href="https://docs.cherry-ai.com" target="_blank">
                        使用文档
                      </a>
                    </li>
                    <li>
                      <a href="https://github.com/CherryHQ/cherry-studio/issues" target="_blank">
                        问题反馈
                      </a>
                    </li>
                    <li>
                      <a href="https://github.com/CherryHQ/cherry-studio/fork" target="_blank">
                        贡献代码
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
                      <a href="https://one.ocoolai.com" target="_blank">
                        ocoolAI
                      </a>
                    </li>
                    <li>
                      <a href="https://hao.logosc.cn/p/3748" target="_blank">
                        神器集
                      </a>
                    </li>
                    <li>
                      <a href="https://top.aibase.com/tool/cherry-studio" target="_blank">
                        AIBase
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
                <p>
                  如果您有使用上的问题可以先查看文档或者在
                  <a href="https://t.me/CherryStudioAI" target="_blank">
                    官方频道
                  </a>
                  中提问。
                  <br />
                  如果有其他问题可以发送邮件至<a href="mailto:support@cherry-ai.com">support@cherry-ai.com</a>
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
              Copyright © 2024 Cherry Studio, Inc.
              <a href="https://beian.miit.gov.cn/" target="_blank">
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
