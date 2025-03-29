/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck

declare global {
  interface Window {
    headerSticky: () => void
  }
}

export function script() {
  'use strict'

  //Hide Loading Box (Preloader)
  function handlePreloader() {
    if ($('.preloader').length) {
      $('.preloader').delay(200).fadeOut(500)
    }
  }

  //Submenu Dropdown Toggle
  if ($('.main-header li.dropdown ul').length) {
    $('.main-header .navigation li.dropdown').append(
      '<div class="dropdown-btn"><span class="fa fa-angle-down"></span></div>'
    )
  }

  //Mobile Nav Hide Show
  if ($('.mobile-menu').length) {
    const mobileMenuContent = $('.main-header .menu-area .main-menu').html()
    $('.mobile-menu .menu-box .menu-outer').append(mobileMenuContent)
    $('.sticky-header .main-menu').append(mobileMenuContent)

    //Dropdown Button
    $('.mobile-menu li.dropdown .dropdown-btn').on('click', function () {
      $(this).toggleClass('open')
      $(this).prev('ul').slideToggle(500)
    })
    //Dropdown Button
    $('.mobile-menu li.dropdown .dropdown-btn').on('click', function () {
      $(this).prev('.megamenu').slideToggle(900)
    })
    //Menu Toggle Btn
    $('.mobile-nav-toggler').on('click', function () {
      $('body').addClass('mobile-menu-visible')
    })

    //Menu Toggle Btn
    $('.mobile-menu .menu-backdrop,.mobile-menu .close-btn').on('click', function () {
      $('body').removeClass('mobile-menu-visible')
    })
  }

  //Fact Counter + Text Count
  if ($('.count-box').length) {
    $('.count-box').appear(
      function () {
        const $t = $(this),
          n = $t.find('.count-text').attr('data-stop'),
          r = parseInt($t.find('.count-text').attr('data-speed'), 10)

        if (!$t.hasClass('counted')) {
          $t.addClass('counted')
          $({
            countNum: $t.find('.count-text').text()
          }).animate(
            {
              countNum: n
            },
            {
              duration: r,
              easing: 'linear',
              step: function () {
                $t.find('.count-text').text(Math.floor(this.countNum))
              },
              complete: function () {
                $t.find('.count-text').text(this.countNum)
              }
            }
          )
        }
      },
      { accY: 0 }
    )
  }

  const circularProgress = document.querySelectorAll('.circular-progress')

  Array.from(circularProgress).forEach((progressBar) => {
    const progressValue = progressBar.querySelector('.percentage')
    const innerCircle = progressBar.querySelector('.inner-circle')
    let startValue = 0
    const endValue = Number(progressBar.getAttribute('data-percentage'))
    const speed = 50
    const progressColor = progressBar.getAttribute('data-progress-color')

    const progress = setInterval(() => {
      startValue++
      progressValue.textContent = `${startValue}%`
      progressValue.style.color = `${progressColor}`

      innerCircle.style.backgroundColor = `${progressBar.getAttribute('data-inner-circle-color')}`

      progressBar.style.background = `conic-gradient(${progressColor} ${startValue * 3.6}deg,${progressBar.getAttribute(
        'data-bg-color'
      )} 0deg)`
      if (startValue === endValue) {
        clearInterval(progress)
      }
    }, speed)
  })

  // Progress Bar
  if ($('.count-bar').length) {
    $('.count-bar').appear(
      function () {
        const el = $(this)
        const percent = el.data('percent')
        $(el).css('width', percent).addClass('counted')
      },
      { accY: -50 }
    )
  }

  //Product Tabs
  if ($('.project-tab').length) {
    $('.project-tab .product-tab-btns .p-tab-btn').on('click', function (e) {
      e.preventDefault()
      const target = $($(this).attr('data-tab'))

      if ($(target).hasClass('actve-tab')) {
        return false
      } else {
        $('.project-tab .product-tab-btns .p-tab-btn').removeClass('active-btn')
        $(this).addClass('active-btn')
        $('.project-tab .p-tabs-content .p-tab').removeClass('active-tab')
        $(target).addClass('active-tab')
      }
    })
  }

  // 6 pieChart RoundCircle
  function expertizeRoundCircle() {
    const rounderContainer = $('.piechart')
    if (rounderContainer.length) {
      rounderContainer.each(function () {
        const Self = $(this)
        const value = Self.data('value')
        const color = Self.data('fg-color')

        Self.find('span').each(function () {
          const expertCount = $(this)
          expertCount.appear(function () {
            expertCount.countTo({
              from: 1,
              to: value * 100,
              speed: 3000
            })
          })
        })
        Self.appear(function () {
          Self.circleProgress({
            value: value,
            size: 100,
            thickness: 8,
            emptyFill: '#f2f2f2',
            animation: {
              duration: 3000
            },
            fill: {
              color: color
            }
          })
        })
      })
    }
  }

  // 6 pieChart RoundCircle
  function expertizeRoundCircle2() {
    const rounderContainer = $('.piechart_2')
    if (rounderContainer.length) {
      rounderContainer.each(function () {
        const Self = $(this)
        const value = Self.data('value')
        const size = Self.parent().width()
        const color = Self.data('fg-color')

        Self.find('span').each(function () {
          const expertCount = $(this)
          expertCount.appear(function () {
            expertCount.countTo({
              from: 1,
              to: value * 100,
              speed: 3000
            })
          })
        })
        Self.appear(function () {
          Self.circleProgress({
            value: value,
            size: 130,
            thickness: 8,
            emptyFill: '#f2f2f2',
            animation: {
              duration: 3000
            },
            fill: {
              color: color
            }
          })
        })
      })
    }
  }

  $(document).ready(function () {
    $('select:not(.ignore)').niceSelect()
  })

  // banner-carousel
  if ($('.banner-carousel').length) {
    $('.banner-carousel').owlCarousel({
      loop: true,
      margin: 0,
      nav: true,
      animateOut: 'fadeOut',
      animateIn: 'fadeIn',
      active: true,
      smartSpeed: 1000,
      autoplay: 6000,
      navText: [],
      responsive: {
        0: {
          items: 1
        },
        600: {
          items: 1
        },
        800: {
          items: 1
        },
        1024: {
          items: 1
        }
      }
    })
  }

  // three-item-carousel
  if ($('.three-item-carousel').length) {
    $('.three-item-carousel').owlCarousel({
      loop: true,
      margin: 30,
      nav: true,
      smartSpeed: 500,
      autoplay: 1000,
      navText: ['<span class="icon-6"></span>', '<span class="icon-7"></span>'],
      responsive: {
        0: {
          items: 1
        },
        480: {
          items: 1
        },
        600: {
          items: 2
        },
        800: {
          items: 2
        },
        1200: {
          items: 3
        }
      }
    })
  }

  //Project Carousel
  if ($('.project-carousel').length) {
    $('.project-carousel').owlCarousel({
      loop: true,
      margin: 30,
      nav: true,
      smartSpeed: 700,
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
          items: 2
        },
        1024: {
          items: 3
        },
        1200: {
          items: 4
        },
        1400: {
          items: 4
        },
        1600: {
          items: 4
        }
      }
    })
  }

  //Five Item Carousel
  if ($('.five-item-carousel').length) {
    $('.five-item-carousel').owlCarousel({
      loop: true,
      margin: 0,
      nav: true,
      smartSpeed: 700,
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
          items: 5
        },
        1400: {
          items: 5
        }
      }
    })
  }

  //Single Item Carousel
  if ($('.single-item-carousel').length) {
    $('.single-item-carousel').owlCarousel({
      loop: true,
      margin: 0,
      nav: true,
      smartSpeed: 700,
      autoplay: 4000,
      navText: ['<span class="fa fa-angle-left"></span>', '<span class="fa fa-angle-right"></span>'],
      responsive: {
        0: {
          items: 1
        },
        600: {
          items: 1
        },
        800: {
          items: 1
        },
        1024: {
          items: 1
        },
        1200: {
          items: 1
        }
      }
    })
  }

  //Two Item Carousel
  if ($('.two-item-carousel').length) {
    const twoItemCarousel = new Swiper('.two-item-carousel', {
      preloadImages: false,
      loop: true,
      grabCursor: true,
      centeredSlides: false,
      resistance: true,
      resistanceRatio: 0.6,
      slidesPerView: 2,
      speed: 1400,
      spaceBetween: 30,
      parallax: false,
      effect: 'slide',
      active: 'active',
      autoplay: {
        delay: 800000000000,
        disableOnInteraction: false
      },
      navigation: {
        nextEl: '.slider-button-next',
        prevEl: '.slider-button-prev'
      },
      breakpoints: {
        991: {
          slidesPerView: 1
        },
        640: {
          slidesPerView: 1
        }
      }
    })
  }

  //Testimonial Carousel
  if ($('.testimonial-carousel').length) {
    $('.testimonial-carousel').owlCarousel({
      loop: true,
      margin: 200,
      nav: true,
      smartSpeed: 700,
      autoplay: 4000,
      navText: ['<span class="fa fa-angle-left"></span>', '<span class="fa fa-angle-right"></span>'],
      responsive: {
        0: {
          items: 1
        },
        600: {
          items: 1,
          margin: 0
        },
        800: {
          items: 2,
          margin: 30
        },
        1024: {
          items: 2,
          margin: 80
        },
        1200: {
          items: 2
        }
      }
    })
  }

  //Three Item Carousel
  if ($('.three-item-carousel').length) {
    $('.three-item-carousel').owlCarousel({
      loop: true,
      margin: 30,
      nav: true,
      smartSpeed: 700,
      autoplay: 4000,
      navText: ['<span class="fa fa-angle-left"></span>', '<span class="fa fa-angle-right"></span>'],
      responsive: {
        0: {
          items: 1
        },
        500: {
          items: 1
        },
        800: {
          items: 2
        },
        1024: {
          items: 3
        },
        1200: {
          items: 3
        }
      }
    })
  }

  //Project Single Carousel
  if ($('.project-single-carousel').length) {
    $('.project-single-carousel').owlCarousel({
      loop: true,
      margin: 0,
      nav: true,
      smartSpeed: 700,
      autoplay: 4000,
      navText: ['<span class="fa fa-angle-left"></span>', '<span class="fa fa-angle-right"></span>'],
      responsive: {
        0: {
          items: 1
        },
        600: {
          items: 2
        },
        800: {
          items: 2
        },
        1024: {
          items: 3
        },
        1200: {
          items: 3
        }
      }
    })
  }

  //Four Item Carousel
  if ($('.four-item-carousel').length) {
    $('.four-item-carousel').owlCarousel({
      loop: true,
      margin: 0,
      nav: true,
      smartSpeed: 700,
      autoplay: 4000,
      navText: ['<span class="fa fa-angle-left"></span>', '<span class="fa fa-angle-right"></span>'],
      responsive: {
        0: {
          items: 1
        },
        600: {
          items: 2
        },
        800: {
          items: 2
        },
        1024: {
          items: 3
        },
        1200: {
          items: 4
        }
      }
    })
  }

  //Recent Work Carousel
  if ($('.recent-work-carousel').length) {
    $('.recent-work-carousel').owlCarousel({
      loop: true,
      margin: 30,
      nav: true,
      smartSpeed: 700,
      autoplay: 4000,
      navText: ['<span class="fa fa-angle-left"></span>', '<span class="fa fa-angle-right"></span>'],
      responsive: {
        0: {
          items: 1
        },
        600: {
          items: 2
        },
        800: {
          items: 2
        },
        1024: {
          items: 3
        },
        1200: {
          items: 4
        }
      }
    })
  }
  //Tabs Box
  if ($('.tabs-box').length) {
    $('.tabs-box .tab-buttons .tab-btn').on('click', function (e) {
      e.preventDefault()
      const target = $($(this).attr('data-tab'))

      if ($(target).is(':visible')) {
        return false
      } else {
        target.parents('.tabs-box').find('.tab-buttons').find('.tab-btn').removeClass('active-btn')
        $(this).addClass('active-btn')
        target.parents('.tabs-box').find('.tabs-content').find('.tab').fadeOut(0)
        target.parents('.tabs-box').find('.tabs-content').find('.tab').removeClass('active-tab')
        $(target).fadeIn(100)
        $(target).addClass('active-tab')
      }
    })
  }

  //Sortable Masonary with Filters
  function enableMasonry() {
    if ($('.sortable-masonry').length) {
      const winDow = $(window)
      // Needed variables
      const $container = $('.sortable-masonry .items-container')
      const $filter = $('.filter-btns')

      $container.isotope({
        filter: '*',
        masonry: {
          columnWidth: '.masonry-item.small-column'
        },
        animationOptions: {
          duration: 500,
          easing: 'linear'
        }
      })

      // Isotope Filter
      $filter.find('li').on('click', function () {
        const selector = $(this).attr('data-filter')

        try {
          $container.isotope({
            filter: selector,
            animationOptions: {
              duration: 500,
              easing: 'linear',
              queue: false
            }
          })
        } catch (err) {
          //
        }
        return false
      })

      winDow.on('resize', function () {
        const selector = $filter.find('li.active').attr('data-filter')

        $container.isotope({
          filter: selector,
          animationOptions: {
            duration: 500,
            easing: 'linear',
            queue: false
          }
        })
      })

      const filterItemA = $('.filter-btns li')

      filterItemA.on('click', function () {
        const $this = $(this)
        if (!$this.hasClass('active')) {
          filterItemA.removeClass('active')
          $this.addClass('active')
        }
      })
    }
  }

  enableMasonry()

  // Circle Progress Bar
  $('.progress').each(function () {
    const $bar = $(this).find('.bar')
    const $val = $(this).find('span')
    const perc = parseInt($val.text(), 10)
    $({ p: 0 }).animate(
      { p: perc },
      {
        duration: 3000,
        easing: 'swing',
        step: function (p) {
          $bar.css({
            transform: 'rotate(' + (45 + p * 1.8) + 'deg)' // 100%=180° so: ° = % * 1.8
            // 45 is to add the needed rotation to have the green borders at the bottom
          })
          $val.text(p | 0)
        }
      }
    )
  })

  //Search Popup
  if ($('#search-popup').length) {
    //Show Popup
    $('.search-toggler').on('click', function () {
      $('#search-popup').addClass('popup-visible')
    })
    $(document).keydown(function (e) {
      if (e.keyCode === 27) {
        $('#search-popup').removeClass('popup-visible')
      }
    })
    //Hide Popup
    $('.close-search,.search-popup .overlay-layer').on('click', function () {
      $('#search-popup').removeClass('popup-visible')
    })
  }

  //LightBox / Fancybox
  if ($('.lightbox-image').length) {
    $('.lightbox-image').fancybox({
      openEffect: 'fade',
      closeEffect: 'fade',
      helpers: {
        media: {}
      }
    })
  }

  //Contact Form Validation
  if ($('#contact-form').length) {
    $('#contact-form').validate({
      rules: {
        username: {
          required: true
        },
        email: {
          required: true,
          email: true
        },
        phone: {
          required: true
        },
        subject: {
          required: true
        },
        message: {
          required: true
        }
      }
    })
  }

  //Progress Bar
  if ($('.progress-line').length) {
    $('.progress-line').appear(
      function () {
        const el = $(this)
        const percent = el.data('width')
        $(el).css('width', percent + '%')
      },
      { accY: 0 }
    )
  }

  // Scroll to a Specific Div
  if ($('.scroll-to-target').length) {
    $('.scroll-to-target').on('click', function () {
      const target = $(this).attr('data-target')
      // animate
      $('html, body').animate(
        {
          scrollTop: $(target).offset().top
        },
        1500
      )
    })
  }

  // Elements Animation
  if ($('.wow').length) {
    const wow = new WOW({
      boxClass: 'wow', // animated element css class (default is wow)
      animateClass: 'animated', // animation css class (default is animated)
      offset: 0, // distance to the element when triggering the animation (default is 0)
      mobile: false, // trigger animations on mobile devices (default is true)
      live: true // act on asynchronously loaded content (default is true)
    })
    wow.init()
  }

  /* ==========================================================================
   When document is loading, do
   ========================================================================== */

  $(window).on('load', function () {
    handlePreloader()
    headerSticky()
    enableMasonry()
  })

  function headerSticky() {
    // 原有实现
  }

  // 暴露到全局
  window.headerSticky = headerSticky
}
