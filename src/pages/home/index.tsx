import { FC, useEffect, useState } from 'react'
import './index.css'
import ProviderLogo from '@/assets/js/providerLogo'
import StarHistory from './components/StarHistory'
import Header from '@/components/website/Header'
import Footer from '@/components/website/Footer'
import cherrysDashboard from '@/assets/images/resource/cherrys.webp'
import duihuaIcon from '@/assets/images/icons/duihua.svg'
import huihuaIcon from '@/assets/images/icons/huihua.svg'
import fanyiIcon from '@/assets/images/icons/fanyi.svg'
import zhushouIcon from '@/assets/images/icons/zhushou.svg'
import zhishikuIcon from '@/assets/images/icons/zhishiku.svg'
import beifenIcon from '@/assets/images/icons/beifen.svg'
import { Link } from 'react-router-dom'

const HomePage: FC = () => {
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

  useEffect(() => {
    new ProviderLogo('providerLogos', 1) // 1是滚动速度，可以调整
  }, [])

  useEffect(() => {
    setTimeout(function () {
      // 隐藏加载动画
      document?.querySelector('.preloader')?.classList.add('loaded')
      // 显示页面内容
      document?.querySelector('.page-wrapper')?.classList.add('loaded')
    }, 500) // 添加一个小延迟，确保动画流畅

    // 如果加载时间超过3秒，也显示页面内容（防止加载卡住）
    setTimeout(function () {
      document?.querySelector('.preloader')?.classList.add('loaded')
      document?.querySelector('.page-wrapper')?.classList.add('loaded')
    }, 3000)
  }, [])

  // 添加状态控制 tips 显示
  const [showWechatTips, setShowWechatTips] = useState(false)

  // 添加处理点击事件的函数
  const handleWechatClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setShowWechatTips(true)
  }

  // 添加处理点击外部的函数
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest('.wechat-tips') && !target.closest('.wechat-btn')) {
        setShowWechatTips(false)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  return (
    <>
      <div className="page-wrapper">
        <Header />

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
            <div className="text" style={{ color:#FF6060, textAlign: 'center', margin: '0 auto', fontSize: '22px' }}>
              Cherry Studio针对个人用户免费，企业用户请联系官方合作。<br>如存在个人版付费销售则为诈骗行为，请联系相关部门投诉处理。
            </div>
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

        {/* <!--client Section Two--> */}
        <section className="sponsors-section-two">
          <div className="auto-container">
            <h3 className="sonsors_title">
              Cherry Studio 内置众多服务商
              <br />
              同时也支持其他兼容OpenAI/Anthropic等API格式的服务商接入。
            </h3>
            <div id="providerLogos"></div>
          </div>
        </section>
        {/* <!--End client Two Section--> */}

        {/* <!--Services Section--> */}
        <section
          className="services-section"
          style={{
            backgroundImage: `url(${new URL('@/assets/images/background/service-bd-image.webp', import.meta.url)})`
          }}>
          <div className="auto-container">
            {/* <!--Sec Title--> */}
            <div className="sec-title">
              <h2 className="heading_title">主要功能介绍</h2>
              <div className="text">
                以下仅为部分功能介绍，更多功能可以下载客户端体验，或在
                <a href="https://docs.cherry-ai.com" target="_blank">
                  官方文档
                </a>
                中了解。
              </div>
            </div>

            <div className="row clearfix">
              {/* <!--Service Style One--> */}
              <div className="service-style-one col-md-4 col-sm-6 col-xs-12">
                <div className="inner-box wow fadeIn" data-wow-delay="0ms" data-wow-duration="1500ms">
                  <div className="icon-box">
                    <img src={duihuaIcon} alt="对话" />
                  </div>
                  <h3>
                    <a href="https://docs.cherry-ai.com/cherrystudio/preview/chat">大模型对话</a>
                  </h3>
                  <div className="text">除了基础的AI对话，文档或图像对话，甚至是公式和HTML预览都能帮你完成。</div>
                  <a href="https://docs.cherry-ai.com/cherrystudio/preview/chat" className="read-more one">
                    详细了解<span className="icon icon-38"></span>
                  </a>
                </div>
              </div>

              {/* <!--Service Style One--> */}
              <div className="service-style-one col-md-4 col-sm-6 col-xs-12">
                <div className="inner-box wow fadeIn" data-wow-delay="0ms" data-wow-duration="1500ms">
                  <div className="icon-box">
                    <img src={huihuaIcon} alt="绘图" />
                  </div>
                  <h3>
                    <a href="https://docs.cherry-ai.com/cherrystudio/preview/drawing">AI绘图</a>
                  </h3>
                  <div className="text">支持多种绘图模型，你可以尽情发挥你的想象让CherryStudio帮你完成。</div>
                  <a href="https://docs.cherry-ai.com/cherrystudio/preview/drawing" className="read-more">
                    详细了解<span className="icon icon-38"></span>
                  </a>
                </div>
              </div>

              {/* <!--Service Style One--> */}
              <div className="service-style-one col-md-4 col-sm-6 col-xs-12">
                <div className="inner-box wow fadeIn" data-wow-delay="0ms" data-wow-duration="1500ms">
                  <div className="icon-box">
                    <img src={fanyiIcon} alt="翻译" />
                  </div>
                  <h3>
                    <a href="https://docs.cherry-ai.com/cherrystudio/preview/translation">AI翻译</a>
                  </h3>
                  <div className="text">无论是翻译页还是对话栏，CherryStudio都能快速翻译你输入的内容。</div>
                  <a href="https://docs.cherry-ai.com/cherrystudio/preview/translation" className="read-more">
                    详细了解<span className="icon icon-38"></span>
                  </a>
                </div>
              </div>

              {/* <!--Service Style One--> */}
              <div className="service-style-one col-md-4 col-sm-6 col-xs-12">
                <div className="inner-box wow fadeIn" data-wow-delay="0ms" data-wow-duration="1500ms">
                  <div className="icon-box">
                    <img src={zhushouIcon} alt="助手" />
                  </div>
                  <h3>
                    <a href="https://docs.cherry-ai.com/cherrystudio/preview/agents">千余内置助手</a>
                  </h3>
                  <div className="text">CherryStudio内置了各种分类的千余助手，让你使用大模型更加高效。</div>
                  <a href="https://docs.cherry-ai.com/cherrystudio/preview/agents" className="read-more">
                    详细了解<span className="icon icon-38"></span>
                  </a>
                </div>
              </div>

              {/* <!--Service Style One--> */}
              <div className="service-style-one col-md-4 col-sm-6 col-xs-12">
                <div className="inner-box wow fadeIn" data-wow-delay="0ms" data-wow-duration="1500ms">
                  <div className="icon-box">
                    <img src={zhishikuIcon} alt="知识库" />
                  </div>
                  <h3>
                    <a href="https://docs.cherry-ai.com/advanced-basic/knowledge-base">多数据源知识库</a>
                  </h3>
                  <div className="text">无论是本地文件还是网页，都能作为知识源快速构建你的专属知识库。</div>
                  <a href="https://docs.cherry-ai.com/advanced-basic/knowledge-base" className="read-more">
                    详细了解<span className="icon icon-38"></span>
                  </a>
                </div>
              </div>

              {/* <!--Service Style One--> */}
              <div className="service-style-one col-md-4 col-sm-6 col-xs-12">
                <div className="inner-box wow fadeIn" data-wow-delay="0ms" data-wow-duration="1500ms">
                  <div className="icon-box">
                    <img src={beifenIcon} alt="备份" />
                  </div>
                  <h3>
                    <a href="https://docs.cherry-ai.com/cherrystudio/preview/settings/data">多种备份方式</a>
                  </h3>
                  <div className="text">包括本地备份和云端备份，多个设备无忧切换，更便捷更安全。</div>
                  <a href="https://docs.cherry-ai.com/cherrystudio/preview/settings/data" className="read-more">
                    详细了解<span className="icon icon-38"></span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <!--End We Do Section--> */}

        {/* <!--Fun Facts Section --> */}
        <section className="fun-facts-section">
          <div className="auto-container">
            <div className="row clearfix">
              {/* <!--Column--> */}
              <div className="column count-box col-lg-4 col-md-6 col-sm-12">
                <div className="inner">
                  <div className="content">
                    <div className="count-outer">
                      <div className="stat-number" id="days-count">
                        0
                      </div>
                    </div>
                    <div className="counter-title">上线天数</div>
                  </div>
                </div>
              </div>

              {/* <!--Column--> */}
              <div className="column count-box col-lg-4 col-md-6 col-sm-12">
                <div className="inner">
                  <div className="content">
                    <div className="count-outer">
                      <div className="stat-number" id="contributors-count">
                        0
                      </div>
                    </div>
                    <div className="counter-title">贡献者</div>
                  </div>
                </div>
              </div>

              {/* <!--Column--> */}
              <div className="column count-box col-lg-4 col-md-6 col-sm-12">
                <div className="inner">
                  <div className="content">
                    <div className="count-outer">
                      <div className="stat-number" id="stars-count">
                        0
                      </div>
                    </div>
                    <div className="counter-title">收藏量</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <!--Fun Facts Section --> */}

        {/* <!--Project Section--> */}
        <section
          className="project-section project-section-custom"
          style={{ marginBottom: '10px !important', paddingBottom: '10px !important' }}>
          <div className="auto-container">
            <div className="row clearfix">
              {/* <!--Counter Column--> */}
              <div className="column col-lg-6 col-md-6 col-sm-12 mb-20">
                <StarHistory />
              </div>
              {/* <!--Counter Column--> */}
              <div className="column col-lg-6 col-md-6 col-sm-12">
                <div className="sec-title">
                  <h2 className="heading_title">项目相关</h2>
                </div>
                {/* <!--Accordion Box--> */}
                <div className="accordion-box style-two">
                  {/* <!-- Accordion --> */}
                  <div className="accordion accordion-block active-block">
                    <div className="accord-btn active">
                      <h4>项目简介</h4>
                    </div>
                    <div className="accord-content collapsed">
                      <p>
                        CherryStudio是一个支持多平台的AI客户端，支持Win、macOS、Linux平台,未来也会支持移动端。项目自24年7月至今已迭代数百个版本,我们致力于打造一个更加高效、安全、易用的客户端，让更多人能够享受到AI带来的便利。
                      </p>
                    </div>
                  </div>
                  {/* <!-- Accordion --> */}
                  <div className="accordion accordion-block">
                    <div className="accord-btn">
                      <h4>CherryStudio的目标</h4>
                    </div>
                    <div className="accord-content">
                      <p>
                        CherryStudio致力于让用户专注于创作或享受AI带来的便利，而不是让很多小白用户被各种繁琐的配置拒之门外。因此您只需要填写秘钥即可马上使用。同时我们也提供了详细的使用文档供您参考学习。我们的社群也非常活跃，可以快速帮您解决各种使用上的问题。
                      </p>
                    </div>
                  </div>
                  {/* <!-- Accordion --> */}
                  <div className="accordion accordion-block">
                    <div className="accord-btn">
                      <h4>我想为项目做一些贡献，都能做什么？</h4>
                    </div>
                    <div className="accord-content">
                      <p>
                        如果您喜欢我们的项目，欢迎在
                        <a href="https://github.com/CherryHQ/cherry-studio" target="_blank">
                          Github
                        </a>
                        给我们一个star来简单的支持我们，如果您是技术大佬欢迎成为我们的贡献者之一，当然您也可以参与到我们的文档编辑当中，将您的使用经验分享给大家或者在社群为其他用户答疑解惑。如果您有任何想法或建议，欢迎通过GitHub
                        Issues 或在官方社群与我们联系。
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <!--End Project Section--> */}

        {/* <!-- Contributors Section --> */}
        <section className="contributors-section">
          <div className="auto-container">
            <div className="sec-title text-center">
              <h2 className="heading_title">项目贡献者</h2>
            </div>
            <div className="contributors-wrapper">
              <div id="contributors-list" className="contributors-list"></div>
            </div>
          </div>
        </section>

        {/* <!-- Cta Section Start--> */}
        <section className="cta-section">
          <div
            className="cta-1-bg"
            data-parallax='{"y": 30}'
            style={{
              backgroundImage: `url(${new URL('@/assets/images/background/cta-bg-image-one.webp', import.meta.url)})`
            }}></div>
          <div className="auto-container">
            <div className="section_heading text-center">
              <h2 className="section_heading_title_big">加入我们的社群</h2>
            </div>
            <div className="text-center">
              <div className="cta-1-link-bt" style={{ display: 'flex', justifyContent: 'center', gap: 10 }}>
                <div style={{ position: 'relative' }}>
                  <a href="#" onClick={handleWechatClick} className="btn-1 wechat-btn">
                    微信群
                  </a>
                  {showWechatTips && (
                    <div
                      className="wechat-tips"
                      style={{
                        position: 'absolute',
                        bottom: '100%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        marginBottom: '20px',
                        padding: '10px',
                        background: 'white',
                        borderRadius: '8px',
                        boxShadow: '0 2px 12px rgba(0,0,0,0.15)',
                        zIndex: 9999,
                        width: '220px',
                        isolation: 'isolate',
                        pointerEvents: 'auto'
                      }}>
                      <img
                        src="https://vip.123pan.cn/1821083851/CherryStudio/cherry.png"
                        alt="微信群二维码"
                        style={{
                          width: '200px',
                          height: '200px',
                          objectFit: 'contain',
                          display: 'block',
                          margin: '0 auto'
                        }}
                      />
                    </div>
                  )}
                </div>
                <a
                  href="https://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=mPMbCwUo40lYODSp-SUeY9ju9sSBeMbS&authKey=Tt8SyX2p4i1Aopn2OzPwi88tc81AW%2F4m%2Fkt4ETHTPGnM6TKOXuRxKJuUMWu5Hgay&noverify=0&group_code=534635975"
                  className="btn-1">
                  QQ 群
                </a>
                <a href="https://t.zsxq.com/sJyfK" className="btn-1">
                  知识星球(问题解答)
                </a>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- Cta Section End--> */}

        <Footer />
      </div>
      {/* <!--End pagewrapper--> */}

      {/* <!--Scroll to top--> */}
      <div className="scroll-to-top scroll-to-target" data-target="html">
        <span className="fa fa-arrow-up"></span>
      </div>

      <div id="copy-message" className="copy-message" style={{ display: 'none' }}>
        已复制 RSS 链接!
      </div>
      <script src="/src/assets/js/starhistory.js"></script>
    </>
  )
}

export default HomePage
