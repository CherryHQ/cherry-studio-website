import { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import cherrysDashboard from '@/assets/images/resource/cherrys.webp'
import { fetchNotice, NoticeResponse } from '@/assets/js/notice'

const HomeBanner: FC = () => {
  const { t } = useTranslation()
  const [notice, setNotice] = useState<NoticeResponse['data'] | null>(null)

  useEffect(() => {
    const getNotices = async () => {
      const noticeContent = await fetchNotice()
      if (noticeContent?.status) {
        setNotice(noticeContent)
      }
    }
    getNotices()
  }, [])

  useEffect(() => {
    $('.banner-carousel').owlCarousel({
      loop: true,
      margin: 0,
      nav: false,
      dots: true,
      dotsContainer: '.banner-dots',
      animateOut: 'fadeOut',
      animateIn: 'fadeIn',
      active: true,
      smartSpeed: 1000,
      autoplay: true,
      autoplayTimeout: 6000,
      items: 1,
      touchDrag: false,
      mouseDrag: false,
      pullDrag: false,
      onInitialized: function () {
        $('body').css('overflow', 'auto')
        $('.banner-section').css('touch-action', 'auto')
      }
    })
  }, [])

  return (
    <Container>
      {/* <!--Banner One --> */}
      <section className="banner-section" style={{ paddingBottom: '0px', marginBottom: '200px' }}>
        <div className="auto-container">
          <div className="banner-carousel owl-theme owl-carousel">
            <div className="content-box">
              <div className="inner">
                <h4>{t('banner.powerful_ai_assistant')}</h4>
                <h1>
                  {t('banner.cherry_studio_title')}
                  <br />
                  {t('banner.multi_provider_client')}
                </h1>
                <div className="text">{t('banner.multi_provider_description')}</div>
              </div>
            </div>
            <div className="content-box">
              <div className="inner">
                <h4>{t('banner.privacy_security')}</h4>
                <h1>
                  {t('banner.local_storage_title')}
                  <br />
                  {t('banner.no_privacy_leak')}
                </h1>
                <div className="text">{t('banner.local_storage_description')}</div>
              </div>
            </div>
            <div className="content-box">
              <div className="inner">
                <h4>{t('banner.personalized_knowledge_base')}</h4>
                <h1>
                  {t('banner.knowledge_base_integration_title')}
                  <br />
                  {t('banner.your_personal_assistant')}
                </h1>
                <div className="text">{t('banner.knowledge_base_description')}</div>
              </div>
            </div>
          </div>
          {notice && notice.status && (
            <div
              dangerouslySetInnerHTML={{ __html: notice.notice }}
              style={{
                color: notice.text_color,
                fontSize: `${notice.text_size}px`,
                textAlign: 'center',
                margin: '0 auto',
                marginTop: '10px'
              }}
            />
          )}
          <div className="link-box">
            <Link to="/download" className="btn-large">
              {t('banner.download_client')}
            </Link>
          </div>
          <div
            className="banner-dasboard float-bob-y"
            style={{
              background: 'linear-gradient(115deg, #FCE379 50%, #9060F1 50%)',
              borderRadius: '20px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
            }}>
            <img src={cherrysDashboard} alt="" style={{ width: '1270px' }} />
          </div>
        </div>
      </section>
      {/* <!--End Banner --> */}
    </Container>
  )
}

const Container = styled.div``

export default HomeBanner
