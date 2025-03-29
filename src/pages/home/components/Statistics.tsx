import { FC } from 'react'

const Statistics: FC = () => {
  return (
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
  )
}

export default Statistics
