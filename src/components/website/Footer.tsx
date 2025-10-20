import React from 'react'
import { Trans, useTranslation } from 'react-i18next'

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
  const { t } = useTranslation()
  return (
    <footer className="main-footer">
      <div className="widget-section">
        <div className="auto-container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="footer-column">
              <div className="footer-widget logo-widget">
                <figure className="footer-logo no-hover">
                  <a href="index.html">
                    <img src={cherryLogo} style={{ width: 150 }} alt="" />
                  </a>
                </figure>
                <p>{t('footer.description')}</p>
                <ul className="social-links">
                  <li>
                    <a href="https://x.com/CherryStudioHQ" className="social-icon">
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
            <div className="footer-column">
              <div className="footer-widget links-widget ml_40">
                <div className="widget-title">
                  <h4 style={{ whiteSpace: 'nowrap' }}>{t('footer.cherry_studio.title')}</h4>
                </div>
                <div className="widget-content">
                  <ul className="links-list clearfix">
                    <li>
                      <a href="https://github.com/CherryHQ/cherry-studio" target="_blank" rel="noopener noreferrer">
                        {t('footer.cherry_studio.github')}
                      </a>
                    </li>
                    <li>
                      <a href="https://gitcode.com/CherryHQ/cherry-studio" target="_blank" rel="noopener noreferrer">
                        {t('footer.cherry_studio.gitcode')}
                      </a>
                    </li>
                    <li>
                      <a href="https://docs.cherry-ai.com" target="_blank" rel="noopener noreferrer">
                        {t('footer.cherry_studio.docs')}
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://github.com/CherryHQ/cherry-studio/issues"
                        target="_blank"
                        rel="noopener noreferrer">
                        {t('footer.cherry_studio.feedback')}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="footer-column">
              <div className="footer-widget links-widget">
                <div className="widget-title">
                  <h4>{t('footer.friendly_links.title')}</h4>
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
                      <a href="https://gongke.net/" target="_blank" rel="noopener noreferrer">
                        攻壳智能体
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
            <div className="footer-column">
              <div className="footer-widget contact-widget">
                <div className="widget-title">
                  <h4>{t('footer.contact_us.title')}</h4>
                </div>
                <div
                  className="mt-3"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: 'fit-content'
                  }}>
                  <img src={cherryWxQR} alt={t('footer.contact_us.wechat_qr_alt')} style={{ maxWidth: '150px' }} />
                  <p>{t('footer.contact_us.wechat_official_account')}</p>
                  <br />
                </div>
                <p>
                  <Trans
                    i18nKey="footer.contact_us.contact_info"
                    components={[<br />, <a href="mailto:support@cherry-ai.com">support@cherry-ai.com</a>]}
                  />
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
              <Trans
                i18nKey="footer.copyright"
                components={[
                  <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer">
                    沪ICP备2021031071号-3
                  </a>
                ]}
              />
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
