import { FC } from 'react'
import { useTranslation } from 'react-i18next'

const Statistics: FC = () => {
  const { t } = useTranslation()
  return (
    <section className="fun-facts-section">
      <div className="auto-container">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* <!--Column--> */}
          <div className="count-box">
            <div className="inner">
              <div className="content">
                <div className="count-outer">
                  <div className="stat-number" id="days-count">
                    0
                  </div>
                </div>
                <div className="counter-title">{t('statistics.days_online')}</div>
              </div>
            </div>
          </div>

          {/* <!--Column--> */}
          <div className="count-box">
            <div className="inner">
              <div className="content">
                <div className="count-outer">
                  <div className="stat-number" id="contributors-count">
                    0
                  </div>
                </div>
                <div className="counter-title">{t('statistics.contributors')}</div>
              </div>
            </div>
          </div>

          {/* <!--Column--> */}
          <div className="count-box">
            <div className="inner">
              <div className="content">
                <div className="count-outer">
                  <div className="stat-number" id="stars-count">
                    0
                  </div>
                </div>
                <div className="counter-title">{t('statistics.stars')}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Statistics
