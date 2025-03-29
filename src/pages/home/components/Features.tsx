import { FC } from 'react'

import beifenIcon from '@/assets/images/icons/beifen.svg'
import duihuaIcon from '@/assets/images/icons/duihua.svg'
import fanyiIcon from '@/assets/images/icons/fanyi.svg'
import huihuaIcon from '@/assets/images/icons/huihua.svg'
import zhishikuIcon from '@/assets/images/icons/zhishiku.svg'
import zhushouIcon from '@/assets/images/icons/zhushou.svg'

const Features: FC = () => {
  return (
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
            <a href="https://docs.cherry-ai.com" target="_blank" rel="noopener noreferrer">
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
  )
}

export default Features
