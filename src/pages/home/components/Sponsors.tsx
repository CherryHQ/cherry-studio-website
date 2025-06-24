import { FC, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import ProviderLogo from '@/assets/js/providerLogo'

const Sponsors: FC = () => {
  const { t } = useTranslation()
  useEffect(() => {
    new ProviderLogo('providerLogos', 1) // 1是滚动速度，可以调整

    //Sponsors Carousel
    if ($('.sponsors-carousel').length) {
      $('.sponsors-carousel').owlCarousel({
        loop: true,
        margin: 30,
        nav: true,
        smartSpeed: 500,
        autoplay: 5000,
        navText: ['<span class="fa fa-angle-left"></span>', '<span class="fa fa-angle-right"></span>'],
        responsive: {
          0: {
            items: 1
          },
          600: {
            items: 2
          },
          800: {
            items: 3
          },
          1024: {
            items: 4
          },
          1200: {
            items: 4
          }
        }
      })
    }

    //Sponsors Carousel Two
    if ($('.sponsors-carousel-two').length) {
      $('.sponsors-carousel-two').owlCarousel({
        loop: true,
        margin: 30,
        nav: true,
        smartSpeed: 500,
        autoplay: 5000,
        navText: ['<span class="fa fa-angle-left"></span>', '<span class="fa fa-angle-right"></span>'],
        responsive: {
          0: {
            items: 1
          },
          400: {
            items: 2
          },
          600: {
            items: 3
          },
          800: {
            items: 4
          },
          1024: {
            items: 5
          },
          1200: {
            items: 5
          }
        }
      })
    }
  }, [])

  return (
    <section className="sponsors-section-two">
      <div className="auto-container">
        <h3 className="sonsors_title">
          {t('sponsors.title')}
          <br />
          {t('sponsors.subtitle')}
        </h3>
        <div id="providerLogos"></div>
      </div>
    </section>
  )
}

export default Sponsors
