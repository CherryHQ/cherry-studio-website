import { FC, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import cherrysDashboard from '@/assets/images/resource/cherrys.webp'
import { fetchNotice, NoticeResponse } from '@/assets/js/notice'

const HomeBanner: FC = () => {
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
                <h4>您的全能AI助手</h4>
                <h1>
                  Cherry Studio
                  <br />
                  支持多服务商集成的AI对话客户端
                </h1>
                <div className="text">
                  CherryStudio目前支持市面上绝大多数服务商的集成,并且支持多服务商的模型统一调度。
                </div>
              </div>
            </div>
            <div className="content-box">
              <div className="inner">
                <h4>保障隐私安全</h4>
                <h1>
                  数据本地储存
                  <br />
                  无需担心隐私泄露
                </h1>
                <div className="text">
                  您的所有使用数据都储存在本地，不会上传到任何第三方服务器，并且支持本地部署的模型调用。
                </div>
              </div>
            </div>
            <div className="content-box">
              <div className="inner">
                <h4>个性化知识库</h4>
                <h1>
                  AI知识库集成
                  <br />
                  做您最贴心的助手
                </h1>
                <div className="text">
                  CherryStudio目前已上线知识库功能，支持多种格式文件的导入和网页导入等来组件您的个性化知识库。
                </div>
              </div>
            </div>
          </div>
          <div className="banner-dots"></div>
          {notice && notice.status && (
            <div
              dangerouslySetInnerHTML={{ __html: notice.notice }}
              style={{
                color: notice.text_color,
                fontSize: `${notice.text_size}px`,
                textAlign: 'center',
                margin: '0 auto'
              }}
            />
          )}
          <div className="link-box">
            <Link to="/download" className="btn-large">
              下载客户端
            </Link>
          </div>
          <div className="banner-dasboard float-bob-y">
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
