import { FC, useEffect } from 'react'

import StarHistory from './StarHistory'
import Statistics from './Statistics'

const Project: FC = () => {
  useEffect(() => {
    //Accordion Box
    if ($('.accordion-box').length) {
      // Attach a click event handler to elements with class 'acc-btn' inside '.accordion-box'
      $('.accordion-box').on('click', '.accord-btn', function () {
        // @ts-ignore
        const _this = $(this)

        // Get the outer accordion box and the specific accordion associated with the clicked button
        const outerBox = _this.closest('.accordion-box')
        const target = _this.closest('.accordion')

        // Check if the clicked button does not have the class 'active'
        if (!_this.hasClass('active')) {
          // Remove the 'active' class from all accordion buttons within the same accordion box
          outerBox.find('.accordion .accord-btn').removeClass('active')
        }

        // Check if the next '.acc-content' element is visible
        if (_this.next('.accord-content').is(':visible')) {
          return false // Prevent further action if it's visible
        } else {
          // Add the 'active' class to the clicked button
          _this.addClass('active')

          // Remove the 'active-block' class from all '.accordion' elements within the same accordion box
          outerBox.find('.accordion').removeClass('active-block')

          // Slide up all '.acc-content' elements within the accordion box
          outerBox.find('.accordion .accord-content').slideUp(300)

          // Add the 'active-block' class to the specific '.accordion'
          target.addClass('active-block')

          // Slide down the next '.acc-content' element
          _this.next('.accord-content').slideDown(300)
        }
      })
    }
  }, [])

  return (
    <>
      <Statistics />
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
                      <a href="https://github.com/CherryHQ/cherry-studio" target="_blank" rel="noopener noreferrer">
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
      <script src="/src/assets/js/starhistory.js"></script>
    </>
  )
}

export default Project
