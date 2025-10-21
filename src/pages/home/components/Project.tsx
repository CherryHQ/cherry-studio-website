import { FC, useEffect } from 'react'
import { Trans, useTranslation } from 'react-i18next'

import StarHistory from './StarHistory'
import Statistics from './Statistics'

const Project: FC = () => {
  const { t } = useTranslation()
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
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {/* <!--Counter Column--> */}
            <div className="mb-5">
              <StarHistory />
            </div>
            {/* <!--Counter Column--> */}
            <div className="project-faq">
              {/* <!--Accordion Box--> */}
              <div className="accordion-box style-two">
                {/* <!-- Accordion --> */}
                <div className="accordion accordion-block active-block">
                  <div className="accord-btn active">
                    <h4>{t('project.intro.title')}</h4>
                  </div>
                  <div className="accord-content collapsed">
                    <p>{t('project.intro.description')}</p>
                  </div>
                </div>
                {/* <!-- Accordion --> */}
                <div className="accordion accordion-block">
                  <div className="accord-btn">
                    <h4>{t('project.goal.title')}</h4>
                  </div>
                  <div className="accord-content">
                    <p>{t('project.goal.description')}</p>
                  </div>
                </div>
                {/* <!-- Accordion --> */}
                <div className="accordion accordion-block">
                  <div className="accord-btn">
                    <h4>{t('project.contribution.title')}</h4>
                  </div>
                  <div className="accord-content">
                    <p>
                      <Trans
                        i18nKey="project.contribution.description"
                        components={{
                          1: (
                            <a
                              href="https://github.com/CherryHQ/cherry-studio"
                              target="_blank"
                              rel="noopener noreferrer"
                            />
                          )
                        }}
                      />
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
