// @ts-nocheck

// 引入 GSAP
const gsapScript = document.createElement('script')
gsapScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js'
document.head.appendChild(gsapScript)

export default class SearchOverlay {
  constructor() {
    this.init()
  }

  init() {
    // 创建搜索框HTML结构
    const searchHTML = `
            <div class="cherry-search-overlay" style="display: none;">
                <div class="search-container">
                    <div class="search-header">
                        <input type="text"
                               class="search-input"
                               placeholder="搜索文档..."
                               autofocus>
                        <button class="search-button">
                            <i class="fa fa-arrow-right"></i>
                        </button>
                        <button class="search-close">
                            <i class="fa fa-times"></i>
                        </button>
                    </div>
                </div>
            </div>
        `

    // 添加样式
    const style = document.createElement('style')
    style.textContent = `
            .cherry-search-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(255, 255, 255, 0.75);
                backdrop-filter: blur(10px);
                -webkit-backdrop-filter: blur(10px);
                z-index: 9999;
                display: block;
            }

            .search-container {
                position: absolute;
                top: 100px;
                left: 50%;
                transform: translateX(-50%);
                max-width: 800px;
                width: calc(100% - 40px);
                padding: 20px;
            }

            .search-header {
                display: flex;
                align-items: center;
                gap: 10px;
                background: rgba(255, 255, 255, 0.8);
                border-radius: 12px;
                border: 1px solid rgba(0, 0, 0, 0.15);
                padding: 10px 20px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
            }

            .search-input {
                flex: 1;
                padding: 12px 0;
                font-size: 16px;
                font-weight: 400;
                color: #222;
                background: transparent;
                border: none;
                outline: none;
            }

            .search-input::placeholder {
                color: #777;
                font-weight: 400;
            }

            .search-close {
                background: none;
                border: none;
                color: #777;
                font-size: 20px;
                cursor: pointer;
                padding: 8px;
                transition: all 0.3s ease;
            }

            .search-close:hover {
                color: #444;
                transform: rotate(90deg);
            }

            .search-button {
                background: none;
                border: none;
                color: #FF5F5F;
                font-size: 18px;
                cursor: pointer;
                padding: 8px;
                transition: all 0.3s ease;
                opacity: 0;
                visibility: hidden;
            }

            .search-button.visible {
                opacity: 1;
                visibility: visible;
            }

            .search-button:hover {
                transform: translateX(3px);
            }
        `

    document.head.appendChild(style)
    document.body.insertAdjacentHTML('beforeend', searchHTML)

    this.bindEvents()
  }

  bindEvents() {
    const searchBtns = document.querySelectorAll('.search-box-btn')
    const overlay = document.querySelector('.cherry-search-overlay')
    const closeBtn = document.querySelector('.search-close')
    const searchInput = document.querySelector('.search-input')
    const searchButton = document.querySelector('.search-button')

    // 点击搜索图标，打开搜索框
    searchBtns.forEach((btn) => {
      btn.addEventListener('click', () => this.openSearch())
    })

    // 点击关闭按钮，清除内容或关闭搜索框
    closeBtn.addEventListener('click', () => {
      if (searchInput.value.trim()) {
        searchInput.value = ''
        searchButton.classList.remove('visible')
      } else {
        this.closeSearch(true)
      }
    })

    // 点击遮罩层，关闭搜索框但保留内容
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        this.closeSearch(false)
      }
    })

    // 按下 ESC 键，关闭搜索框但保留内容
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeSearch(false)
      }
    })

    // 输入框内容变化，显示或隐藏搜索按钮
    searchInput.addEventListener('input', () => {
      if (searchInput.value.trim()) {
        searchButton.classList.add('visible')
      } else {
        searchButton.classList.remove('visible')
      }
    })

    // 点击搜索按钮，执行搜索
    searchButton.addEventListener('click', () => this.search())

    // 输入框回车事件，执行搜索
    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.search()
      }
    })
  }

  openSearch() {
    const overlay = document.querySelector('.cherry-search-overlay')
    const searchContainer = document.querySelector('.search-container')
    overlay.style.display = 'block'

    gsap.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.3 })
    gsap.fromTo(searchContainer, { y: -50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' })

    document.querySelector('.search-input').focus()
  }

  closeSearch(clearInput = false) {
    const overlay = document.querySelector('.cherry-search-overlay')
    const searchContainer = document.querySelector('.search-container')
    const searchInput = document.querySelector('.search-input')
    const searchButton = document.querySelector('.search-button')

    gsap.to(searchContainer, {
      y: -50,
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in'
    })

    gsap.to(overlay, {
      opacity: 0,
      duration: 0.3,
      delay: 0.1,
      ease: 'power2.in',
      onComplete: () => {
        overlay.style.display = 'none'
        if (clearInput) {
          searchInput.value = ''
          searchButton.classList.remove('visible')
        }
      }
    })
  }

  search() {
    const searchInput = document.querySelector('.search-input')
    const query = encodeURIComponent(searchInput.value.trim())
    if (query) {
      const url = `https://docs.cherry-ai.com/cherry-studio?q=${query}&ask=true`
      window.open(url, '_blank')
      this.closeSearch(true)
    }
  }
}
