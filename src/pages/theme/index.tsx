import './index.css'
import './submit.css'

import React, { useCallback, useEffect, useRef, useState } from 'react'

import Footer from '@/components/website/Footer'

// 添加 jQuery 类型声明
declare const $: any // 或者使用完整的 jQuery 类型

interface CssItem {
  id: number
  name: string
  author: string
  version: number
  title: string[] | string
  description?: string
  light_mode: boolean
  dark_mode: boolean
  light_pic?: string
  dark_pic?: string
  code: string
  cdn_link?: string | null
  date_created: string
  date_updated?: string | null
  status: boolean
}

interface ErrorBoundaryProps {
  children: React.ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // 可以选择记录错误
    console.error('Error caught by ErrorBoundary:', error)
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <h2>页面加载出错</h2>
          <button onClick={() => window.location.reload()} type="button">
            刷新页面
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

// 首先添加SubmitModalProps接口定义
interface SubmitModalProps {
  isOpen: boolean
  onClose: () => void
}

const ThemePage: React.FC = () => {
  // 原始数据和筛选后的数据分开存储
  const [cssItems, setCssItems] = useState<CssItem[]>([])
  const [activeImageMode, setActiveImageMode] = useState<Record<string, 'light' | 'dark'>>({})
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [copySuccess, setCopySuccess] = useState<string | null>(null)
  const [authorFilter, setAuthorFilter] = useState<string | null>(null)
  const [tagFilter, setTagFilter] = useState<string | null>(null)
  // 添加搜索状态
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [isSearching, setIsSearching] = useState<boolean>(false)

  // 添加一个防抖标志，防止频繁触发
  const isLoadingRef = useRef(false)
  // 添加搜索输入引用
  const searchInputRef = useRef<HTMLInputElement>(null)
  // 添加搜索输入状态
  const [searchInputValue, setSearchInputValue] = useState('')

  // 添加一个状态来存储所有已加载的数据
  const [allLoadedItems, setAllLoadedItems] = useState<CssItem[]>([])
  // 添加一个状态来跟踪当前显示的数据页码
  const [displayPage, setDisplayPage] = useState(1)
  // 修改常量定义
  const ITEMS_PER_PAGE = 6 // API请求的默认数量
  const ITEMS_PER_PAGE_DISPLAY = 6 // 前端显示的每页数量
  const BULK_LOAD_LIMIT = 1000 // 标签筛选时一次性加载的数量

  // 添加状态来跟踪提示是否显示
  const [helpTooltipVisible, setHelpTooltipVisible] = useState(false)

  // 在状态声明区域添加
  const [submitModalOpen, setSubmitModalOpen] = useState(false)

  // 添加一个新的状态来控制示例图片预览
  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null)

  // 添加一个处理函数，在点击示例图片链接时触发
  const handleExamplePreview = (e: React.MouseEvent, url: string) => {
    e.preventDefault() // 阻止默认的链接跳转行为
    setPreviewImageUrl(url)
  }

  // 添加关闭预览的处理函数
  const closeImagePreview = () => {
    setPreviewImageUrl(null)
  }

  // 示例图片预览模态框组件
  const ImagePreviewModal: React.FC<{ url: string | null; onClose: () => void }> = ({ url, onClose }) => {
    if (!url) return null

    return (
      <div className="css-image-preview-modal-overlay" onClick={onClose}>
        <div className="css-image-preview-modal" onClick={(e) => e.stopPropagation()}>
          <button className="css-image-preview-close" onClick={onClose} type="button">
            ×
          </button>
          <img src={url} alt="示例预览" />
        </div>
      </div>
    )
  }

  // 添加解析搜索输入的函数
  const parseSearchInput = (input: string) => {
    const result = {
      tags: [] as string[],
      authors: [] as string[],
      plainText: ''
    }

    // 分割搜索词
    const terms = input.trim().split(/\s+/)

    // 提取普通文本、标签和作者
    const plainTerms: string[] = []

    terms.forEach((term) => {
      if (term.startsWith('#')) {
        // 标签搜索
        const tag = term.substring(1).trim()
        if (tag) result.tags.push(tag)
      } else if (term.startsWith('@')) {
        // 作者搜索
        const author = term.substring(1).trim()
        if (author) result.authors.push(author)
      } else {
        // 普通文本搜索
        plainTerms.push(term)
      }
    })

    result.plainText = plainTerms.join(' ')
    return result
  }

  // 修改加载数据函数
  const fetchCssData = useCallback(
    async (
      pageNum: number,
      isInitialLoad: boolean = false,
      author: string | null = null,
      search: string | null = null,
      tag: string | null = null
    ) => {
      // 如果已经在加载中，则不重复触发
      if (isLoadingRef.current) return

      if (isInitialLoad) setLoading(true)
      else setLoadingMore(true)

      // 设置加载标志
      isLoadingRef.current = true

      try {
        // 当有标签筛选或作者筛选时，使用更大的limit参数
        const limit = tag || author ? BULK_LOAD_LIMIT : ITEMS_PER_PAGE

        console.log(
          `加载数据${tag || author ? '(批量模式)' : ''}：第${pageNum}页，每页${limit}条${
            author ? `，筛选作者: ${author}` : ''
          }${search ? `，搜索: ${search}` : ''}${tag ? `，标签: ${tag}` : ''}`
        )

        // 构建API URL，添加筛选参数
        let apiUrl = `https://data1.cherry-ai.com:48443/items/cherry_css?id&sort=-id&limit=${limit}&page=${pageNum}`

        // 如果有作者筛选，添加筛选参数
        if (author) {
          apiUrl += `&filter[_and][0][author][_contains]=${encodeURIComponent(author)}`
        }

        // 如果有搜索关键词，添加搜索参数
        if (search && search.trim() !== '') {
          apiUrl += `&search=${encodeURIComponent(search.trim())}`
        }

        const response = await fetch(apiUrl)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const responseData = await response.json()

        if (responseData.data && Array.isArray(responseData.data)) {
          // 检查是否还有更多数据
          if (responseData.data.length < limit) {
            setHasMore(false)
          } else {
            setHasMore(!tag && !author) // 如果是标签筛选或作者筛选，则认为已加载全部数据
          }

          // 初始化图片模式
          const initialImageModes: Record<string, 'light' | 'dark'> = {}
          responseData.data.forEach((item: CssItem) => {
            initialImageModes[item.id] = item.light_mode ? 'light' : 'dark'
          })

          setActiveImageMode((prev) => ({ ...prev, ...initialImageModes }))

          // 存储所有加载的数据
          if (isInitialLoad) {
            setAllLoadedItems(responseData.data)
          } else {
            setAllLoadedItems((prev) => [...prev, ...responseData.data])
          }

          // 修改标签筛选逻辑，支持模糊匹配
          const filteredData = tag
            ? responseData.data.filter((item: CssItem) => {
                if (Array.isArray(item.title)) {
                  // 对于数组类型的标签，检查是否有任何标签包含搜索关键词
                  return item.title.some((title) => title.toLowerCase().includes(tag.toLowerCase()))
                } else if (typeof item.title === 'string') {
                  // 对于字符串类型的标签，检查是否包含搜索关键词
                  return item.title.toLowerCase().includes(tag.toLowerCase())
                }
                return false
              })
            : responseData.data

          // 如果是标签筛选或作者筛选，只显示第一页数据
          if (tag || author) {
            setDisplayPage(1)
            setCssItems(filteredData.slice(0, ITEMS_PER_PAGE_DISPLAY))

            // 如果筛选后的数据量很少，设置hasMore为false
            if (filteredData.length <= ITEMS_PER_PAGE_DISPLAY) {
              setHasMore(false)
            } else {
              setHasMore(true)
            }
          } else {
            // 正常分页加载
            if (isInitialLoad) {
              setCssItems(filteredData)
            } else {
              setCssItems((prev) => [...prev, ...filteredData])
            }
          }

          // 如果是筛选且结果为空，显示提示
          if ((tag || author) && filteredData.length === 0) {
            showNotification('info', `没有找到符合${tag ? '该标签' : '该作者'}的 CSS 素材`)
          }
        } else {
          throw new Error('Invalid data format')
        }
      } catch (error) {
        console.error('Error fetching CSS data:', error)
        showNotification('error', '获取 CSS 素材数据失败')
        setHasMore(false)
      } finally {
        if (isInitialLoad) setLoading(false)
        else setLoadingMore(false)
        setIsSearching(false)

        // 延迟重置加载标志，防止快速连续触发
        setTimeout(() => {
          isLoadingRef.current = false
        }, 500)
      }
    },
    []
  )

  // 修改初始加载
  useEffect(() => {
    fetchCssData(1, true, authorFilter, searchTerm || null, tagFilter)
  }, [fetchCssData, authorFilter, searchTerm, tagFilter])

  // 1. 修复清除搜索和筛选的核心功能
  const clearAllFilters = () => {
    // 重置所有状态
    setAuthorFilter(null)
    setTagFilter(null)
    setSearchTerm('')
    setSearchInputValue('')

    // 清空搜索框
    if (searchInputRef.current) {
      searchInputRef.current.value = ''
    }

    // 重新加载所有数据
    fetchCssData(1, true)
  }

  // 2. 修复搜索框清除按钮
  const handleClearSearchInput = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    // 直接清除所有状态
    clearAllFilters()
  }

  // 3. 改进搜索提交处理
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchInputRef.current || !searchInputRef.current.value.trim()) return

    const input = searchInputRef.current.value.trim()
    const searchParams = parseSearchInput(input)

    // 更新搜索状态
    setSearchTerm(input)
    setSearchInputValue(input)
    setPage(1)
    setDisplayPage(1)
    setIsSearching(true)

    // 更新筛选状态
    setTagFilter(searchParams.tags.length > 0 ? searchParams.tags[0] : null)
    setAuthorFilter(searchParams.authors.length > 0 ? searchParams.authors[0] : null)

    // 执行搜索
    fetchCssData(
      1,
      true,
      searchParams.authors.length > 0 ? searchParams.authors[0] : null,
      searchParams.plainText || null,
      searchParams.tags.length > 0 ? searchParams.tags[0] : null
    )
  }

  // 4. 重写标签点击处理
  const handleTagClick = (tag: string) => {
    if (tagFilter === tag) {
      // 移除标签
      setTagFilter(null)

      // 从搜索词中移除该标签
      const searchParams = parseSearchInput(searchTerm)
      const newTags = searchParams.tags.filter((t) => t !== tag)

      // 重建搜索词
      const newSearchTerm = buildSearchTerm(newTags, searchParams.authors, searchParams.plainText)

      // 更新状态和UI
      updateSearchUI(newSearchTerm)

      // 执行搜索
      fetchCssData(
        1,
        true,
        searchParams.authors.length > 0 ? searchParams.authors[0] : null,
        searchParams.plainText || null,
        newTags.length > 0 ? newTags[0] : null
      )
    } else {
      // 添加标签
      setTagFilter(tag)

      // 构建新的搜索词
      const searchParams = parseSearchInput(searchTerm)
      const newTags = [...searchParams.tags.filter((t) => t !== tag), tag]

      // 重建搜索词
      const newSearchTerm = buildSearchTerm(newTags, searchParams.authors, searchParams.plainText)

      // 更新状态和UI
      updateSearchUI(newSearchTerm)

      // 执行搜索
      fetchCssData(
        1,
        true,
        searchParams.authors.length > 0 ? searchParams.authors[0] : null,
        searchParams.plainText || null,
        tag
      )
    }
  }

  // 5. 类似修改作者点击处理
  const handleAuthorClick = (author: string) => {
    if (authorFilter === author) {
      // 移除作者
      setAuthorFilter(null)

      // 从搜索词中移除该作者
      const searchParams = parseSearchInput(searchTerm)
      const newAuthors = searchParams.authors.filter((a) => a !== author)

      // 重建搜索词
      const newSearchTerm = buildSearchTerm(searchParams.tags, newAuthors, searchParams.plainText)

      // 更新状态和UI
      updateSearchUI(newSearchTerm)

      // 执行搜索
      fetchCssData(
        1,
        true,
        null,
        searchParams.plainText || null,
        searchParams.tags.length > 0 ? searchParams.tags[0] : null
      )
    } else {
      // 添加作者
      setAuthorFilter(author)

      // 构建新的搜索词
      const searchParams = parseSearchInput(searchTerm)

      // 重建搜索词
      const newSearchTerm = buildSearchTerm(
        searchParams.tags,
        [author], // 替换作者
        searchParams.plainText
      )

      // 更新状态和UI
      updateSearchUI(newSearchTerm)

      // 执行搜索
      fetchCssData(
        1,
        true,
        author,
        searchParams.plainText || null,
        searchParams.tags.length > 0 ? searchParams.tags[0] : null
      )
    }
  }

  // 6. 辅助函数：构建搜索词
  const buildSearchTerm = (tags: string[], authors: string[], plainText: string): string => {
    let result = ''

    // 添加标签
    for (const tag of tags) {
      result += `#${tag} `
    }

    // 添加作者
    for (const author of authors) {
      result += `@${author} `
    }

    // 添加普通文本
    if (plainText) {
      result += plainText
    }

    return result.trim()
  }

  // 7. 辅助函数：更新搜索UI
  const updateSearchUI = (searchTerm: string) => {
    setSearchTerm(searchTerm)
    setSearchInputValue(searchTerm)

    // 更新搜索框
    if (searchInputRef.current) {
      searchInputRef.current.value = searchTerm
    }
  }

  // 确保清除所有筛选时完全重置搜索状态
  const handleManualLoad = useCallback(() => {
    if (loadingMore) return

    if (tagFilter || authorFilter) {
      // 如果是标签筛选或作者筛选，从已加载的数据中显示更多
      let filteredItems = allLoadedItems

      // 应用标签筛选，支持模糊匹配
      if (tagFilter) {
        filteredItems = filteredItems.filter((item) => {
          if (Array.isArray(item.title)) {
            return item.title.some((title) => title.toLowerCase().includes(tagFilter.toLowerCase()))
          } else if (typeof item.title === 'string') {
            return item.title.toLowerCase().includes(tagFilter.toLowerCase())
          }
          return false
        })
      }

      // 应用作者筛选
      if (authorFilter) {
        filteredItems = filteredItems.filter((item) => item.author === authorFilter)
      }

      const nextPage = displayPage + 1
      const startIndex = (nextPage - 1) * ITEMS_PER_PAGE_DISPLAY
      const endIndex = nextPage * ITEMS_PER_PAGE_DISPLAY

      // 检查是否还有更多数据可以显示
      if (startIndex < filteredItems.length) {
        setDisplayPage(nextPage)
        setCssItems((prev) => [...prev, ...filteredItems.slice(startIndex, endIndex)])

        // 如果已经显示了所有筛选后的数据，设置hasMore为false
        if (endIndex >= filteredItems.length) {
          setHasMore(false)
        }
      } else {
        // 如果本地数据已经显示完毕，但服务器可能还有更多数据
        if (hasMore) {
          setPage((prevPage) => {
            const nextPage = prevPage + 1
            fetchCssData(nextPage, false, authorFilter, searchTerm || null, tagFilter)
            return nextPage
          })
        } else {
          setHasMore(false)
        }
      }
    } else if (hasMore) {
      // 正常分页加载
      setPage((prevPage) => {
        const nextPage = prevPage + 1
        fetchCssData(nextPage, false, null, searchTerm || null, null)
        return nextPage
      })
    }
  }, [
    hasMore,
    loadingMore,
    fetchCssData,
    authorFilter,
    searchTerm,
    tagFilter,
    allLoadedItems,
    displayPage,
    ITEMS_PER_PAGE_DISPLAY
  ])

  const formatVersion = (version: number): string => {
    return version.toFixed(1)
  }

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString)
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date
      .getDate()
      .toString()
      .padStart(2, '0')}`
  }

  const handleImageModeChange = (itemId: number, mode: 'light' | 'dark') => {
    setActiveImageMode((prev) => ({
      ...prev,
      [itemId]: mode
    }))
  }

  const showNotification = (type: 'info' | 'error', message: string) => {
    console.log(`${type}: ${message}`)
    // 简单的通知实现
    alert(message)
  }

  // 修改图片URL构建函数
  const getImageUrl = (url?: string): string => {
    if (!url) return ''
    if (url.startsWith('http')) return url
    return `https://data1.cherry-ai.com:48443/assets/${url}`
  }

  // 处理搜索输入变化
  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInputValue(e.target.value)
  }

  // 点击其他地方关闭提示
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest('.css-search-help-icon')) {
        setHelpTooltipVisible(false)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    console.log(`当前页码: ${page}`)
  }, [page])

  // 修改弹窗关闭函数
  // const closeModal = useCallback(() => {
  //   setSubmitModalOpen(false);
  //
  //   // 延迟重置表单，等待动画完成
  //   setTimeout(() => {
  //     setSubmitSuccess(false);
  //     setSubmitError(null);
  //     setFormData({
  //       name: '',
  //       author: '',
  //       light_mode: true,
  //       dark_mode: false,
  //       version: '',
  //       code: '',
  //       cdn_link: '',
  //       title: [],
  //     });
  //     setLightImage(null);
  //     setDarkImage(null);
  //   }, 300);
  // }, []);

  useEffect(() => {
    // 移除可能导致错误的脚本
    const script = document.querySelector('script[src*="script.ts"]')
    if (script) {
      script.remove()
    }
  }, [])

  // 修复文件上传函数
  const uploadFile = async (file: File) => {
    const formData = new FormData()
    formData.append('folder', '9e1c8e92-fc45-4374-8958-7e7591d8245a') // 添加folder字段为固定的文件夹ID
    formData.append('file', file) // 添加文件

    try {
      const response = await fetch('https://data1.cherry-ai.com:48443/files', {
        method: 'POST',
        headers: {
          Authorization: 'Bearer y8j8uycl07xwSkyrssHCRd7nIecUeRwC' // 使用正确的上传文件令牌
        },
        body: formData
      })

      if (!response.ok) {
        throw new Error(`上传失败: ${response.status} ${response.statusText}`)
      }

      const result = await response.json()
      console.log('文件上传成功:', result)
      return result
    } catch (error) {
      console.error('文件上传错误:', error)
      throw error
    }
  }

  // 添加这个缺失的函数
  const copyToClipboard = (text: string, itemId: number, type: 'code' | 'cdn') => {
    try {
      // 创建一个临时文本区域用于复制
      const textArea = document.createElement('textarea')
      textArea.value = text
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)

      // 设置成功状态
      setCopySuccess(`${itemId}-${type}`)
      setTimeout(() => setCopySuccess(null), 2000)

      // 显示成功消息
      alert('复制成功！')
    } catch (err) {
      console.error('Failed to copy text: ', err)
      alert('复制失败，请手动复制')
    }
  }

  // 修改SubmitModal组件，增加对header的控制
  const SubmitModal: React.FC<SubmitModalProps> = ({ isOpen, onClose }) => {
    // 在模态框打开/关闭时控制header的显示/隐藏
    useEffect(() => {
      const header = document.querySelector('.main-header')
      if (header) {
        if (isOpen) {
          // 使用类型断言解决style属性不存在的问题
          ;(header as HTMLElement).style.display = 'none'
        } else {
          // 使用类型断言解决style属性不存在的问题
          ;(header as HTMLElement).style.display = ''
        }
      }

      // 清理函数：确保在组件卸载时恢复header显示
      return () => {
        if (header) {
          ;(header as HTMLElement).style.display = ''
        }
      }
    }, [isOpen])

    // 所有状态都保持在模态框内部
    const [localFormData, setLocalFormData] = useState({
      name: '',
      author: '',
      light_mode: true,
      dark_mode: false,
      version: '',
      code: '',
      cdn_link: '',
      title: [] as string[]
    })

    const [lightImage, setLightImage] = useState<File | null>(null)
    const [darkImage, setDarkImage] = useState<File | null>(null)
    const [currentTag, setCurrentTag] = useState('')
    const [submitSuccess, setSubmitSuccess] = useState(false)
    const [submitError, setSubmitError] = useState<string | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)

    // 添加内部预览状态，独立于外部全局状态
    const [internalPreviewUrl, setInternalPreviewUrl] = useState<string | null>(null)

    // 内部预览处理函数，阻止事件冒泡
    const handleInternalPreview = (e: React.MouseEvent, url: string) => {
      e.preventDefault()
      e.stopPropagation() // 阻止冒泡，防止触发外部事件
      setInternalPreviewUrl(url)
    }

    // 关闭内部预览
    const closeInternalPreview = () => {
      setInternalPreviewUrl(null)
    }

    // 内部预览组件
    const InternalPreviewModal = () => {
      if (!internalPreviewUrl) return null

      return (
        <div className="css-image-preview-modal-overlay" onClick={closeInternalPreview}>
          <div className="css-image-preview-modal" onClick={(e) => e.stopPropagation()}>
            <button className="css-image-preview-close" onClick={closeInternalPreview} type="button">
              ×
            </button>
            <img src={internalPreviewUrl} alt="示例预览" />
          </div>
        </div>
      )
    }

    // 重置所有状态
    const resetForm = useCallback(() => {
      setLocalFormData({
        name: '',
        author: '',
        light_mode: true,
        dark_mode: false,
        version: '',
        code: '',
        cdn_link: '',
        title: []
      })
      setLightImage(null)
      setDarkImage(null)
      setCurrentTag('')
      setSubmitSuccess(false)
      setSubmitError(null)
    }, [])

    // 处理关闭
    const handleClose = useCallback(() => {
      onClose()
      // 延迟重置表单，等待动画结束
      setTimeout(resetForm, 300)
    }, [onClose, resetForm])

    // 处理表单字段更新
    const updateField = useCallback((field: string, value: any) => {
      setLocalFormData((prev) => ({ ...prev, [field]: value }))
    }, [])

    // 处理标签添加
    const handleTagKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLInputElement>) => {
        if ((e.key === 'Enter' || e.key === ',') && currentTag.trim()) {
          e.preventDefault()
          if (!localFormData.title.includes(currentTag.trim())) {
            setLocalFormData((prev) => ({
              ...prev,
              title: [...prev.title, currentTag.trim()]
            }))
          }
          setCurrentTag('')
        }
      },
      [currentTag, localFormData.title]
    )

    // 处理移除标签
    const handleRemoveTag = useCallback((index: number) => {
      setLocalFormData((prev) => ({
        ...prev,
        title: prev.title.filter((_, i) => i !== index)
      }))
    }, [])

    // 处理图片上传
    const handleImageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>, type: 'light' | 'dark') => {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0]

        // 图片验证
        const isImage = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'].includes(file.type)
        const isLt2M = file.size / 1024 / 1024 < 2

        if (!isImage) {
          alert('只能上传图片文件!')
          return
        }

        if (!isLt2M) {
          alert('图片大小不能超过2MB!')
          return
        }

        // 设置图片，但不设置ID
        if (type === 'light') {
          setLightImage(file)
        } else {
          setDarkImage(file)
        }
      }
    }, [])

    // 处理表单提交，恢复实际API提交功能
    const handleSubmit = useCallback(
      async (e: React.FormEvent) => {
        e.preventDefault()

        // 表单验证保持不变
        if (!localFormData.name.trim()) {
          setSubmitError('请输入主题名称')
          return
        }

        if (!localFormData.author.trim()) {
          setSubmitError('请输入作者名称')
          return
        }

        if (!localFormData.version.trim() || !/^\d+(\.\d+)*$/.test(localFormData.version)) {
          setSubmitError('请输入有效的版本号')
          return
        }

        if (!localFormData.code.trim()) {
          setSubmitError('请输入CSS代码')
          return
        }

        if (localFormData.light_mode && !lightImage) {
          setSubmitError('请上传亮色模式预览图')
          return
        }

        if (localFormData.dark_mode && !darkImage) {
          setSubmitError('请上传暗色模式预览图')
          return
        }

        setIsSubmitting(true)
        setSubmitError(null)

        try {
          // 上传图片
          let lightPicId = null
          let darkPicId = null

          // 并行上传图片
          if (localFormData.light_mode && lightImage) {
            const lightResult = await uploadFile(lightImage)
            lightPicId = lightResult.data.id
          }

          if (localFormData.dark_mode && darkImage) {
            const darkResult = await uploadFile(darkImage)
            darkPicId = darkResult.data.id
          }

          // 提交表单数据
          const response = await fetch('https://data1.cherry-ai.com:48443/items/cherry_css_pr', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer hTpfpBWuxk-5ACn7OtHYjHNDT31gcM3e' // 使用投稿API的令牌
            },
            body: JSON.stringify({
              ...localFormData,
              version: parseFloat(localFormData.version),
              light_pic: lightPicId,
              dark_pic: darkPicId,
              status: true
            })
          })

          if (!response.ok) {
            throw new Error(`提交失败: ${response.status} ${response.statusText}`)
          }

          // 设置成功状态
          setSubmitSuccess(true)

          // 成功后自动关闭模态框
          setTimeout(() => {
            onClose() // 关闭整个模态框
            // ...重置表单代码保持不变
          }, 1500)
        } catch (error) {
          console.error('提交失败:', error)
          setSubmitError(error instanceof Error ? error.message : '提交失败，请稍后重试')
        } finally {
          setIsSubmitting(false)
        }
      },
      [localFormData, lightImage, darkImage, onClose]
    )

    // 如果模态框关闭，返回null
    if (!isOpen) return null

    // 渲染模态框
    return (
      <div className="css-submit-modal-overlay" style={{ display: isOpen ? 'flex' : 'none' }}>
        <div className="css-submit-modal">
          <div className="css-submit-modal-header">
            <h2>主题投稿</h2>
            <button className="css-submit-modal-close" onClick={handleClose} type="button">
              ×
            </button>
          </div>

          <div className="css-submit-modal-content">
            {submitSuccess ? (
              <div className="css-submit-success">
                <div className="css-submit-success-icon">✓</div>
                <h3>提交成功！</h3>
                <p>感谢您的投稿，您的主题素材将在审核后显示。</p>
                <button className="css-btn primary" onClick={handleClose} type="button">
                  关闭
                </button>
              </div>
            ) : (
              <form className="css-submit-form" onSubmit={handleSubmit}>
                <div className="css-submit-form-group">
                  <label htmlFor="name">主题名称</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={localFormData.name}
                    onChange={(e) => updateField('name', e.target.value)}
                    placeholder="输入 CSS 主题名称"
                  />
                </div>

                <div className="css-submit-form-group">
                  <label htmlFor="author">作者名称</label>
                  <input
                    type="text"
                    id="author"
                    name="author"
                    required
                    value={localFormData.author}
                    onChange={(e) => updateField('author', e.target.value)}
                    placeholder="输入作者名称"
                  />
                </div>

                <div className="css-submit-form-row">
                  <div className="css-submit-form-group checkbox">
                    <input
                      type="checkbox"
                      id="light_mode"
                      name="light_mode"
                      checked={localFormData.light_mode}
                      onChange={(e) => updateField('light_mode', e.target.checked)}
                    />
                    <label htmlFor="light_mode">支持亮色模式</label>
                  </div>

                  <div className="css-submit-form-group checkbox">
                    <input
                      type="checkbox"
                      id="dark_mode"
                      name="dark_mode"
                      checked={localFormData.dark_mode}
                      onChange={(e) => updateField('dark_mode', e.target.checked)}
                    />
                    <label htmlFor="dark_mode">支持暗色模式</label>
                  </div>
                </div>

                <div className="css-submit-form-group">
                  <label htmlFor="version">版本号</label>
                  <input
                    type="text"
                    id="version"
                    name="version"
                    required
                    value={localFormData.version}
                    onChange={(e) => {
                      // 只允许数字和点
                      if (/^[0-9.]*$/.test(e.target.value)) {
                        updateField('version', e.target.value)
                      }
                    }}
                    placeholder="输入版本号，例如: 1.0.0（只支持数字和点）"
                  />
                  <div className="css-submit-form-hint">请只输入版本号，不需要加 V</div>
                </div>

                <div className="css-submit-form-group">
                  <label htmlFor="code">CSS 代码</label>
                  <textarea
                    id="code"
                    name="code"
                    className="css-code-editor"
                    required
                    value={localFormData.code}
                    onChange={(e) => updateField('code', e.target.value)}
                    placeholder="粘贴您的 CSS 代码"
                    rows={10}
                  />
                </div>

                <div className="css-submit-form-group">
                  <label htmlFor="cdn_link">CSS 文件链接（可选）</label>
                  <input
                    type="url"
                    id="cdn_link"
                    name="cdn_link"
                    value={localFormData.cdn_link}
                    onChange={(e) => updateField('cdn_link', e.target.value)}
                    placeholder="如果提供公开的cdn链接或文件链接等可以填写"
                  />
                </div>

                {/* 亮色模式图片上传 */}
                {localFormData.light_mode && (
                  <div className="css-submit-form-group">
                    <label htmlFor="light_pic">亮色模式预览图</label>
                    <div className="css-image-upload">
                      {lightImage ? (
                        <div className="css-image-preview">
                          <img src={URL.createObjectURL(lightImage)} alt="亮色模式预览" />
                          <button
                            type="button"
                            className="css-image-remove"
                            onClick={() => {
                              setLightImage(null)
                            }}>
                            移除图片
                          </button>
                        </div>
                      ) : (
                        <div
                          className="css-image-dropzone"
                          onClick={() => document.getElementById('light_pic')?.click()}>
                          <i className="css-icon-upload"></i>
                          <span>点击上传图片</span>
                          <div className="css-image-hint">
                            支持 JPG、PNG、GIF、WEBP 格式，最大 2MB，图片比例建议 16:9，不符合将被裁切。
                          </div>
                        </div>
                      )}
                      <input
                        type="file"
                        id="light_pic"
                        name="light_pic"
                        accept=".jpg,.jpeg,.png,.gif,.webp"
                        onChange={(e) => handleImageChange(e, 'light')}
                        style={{ display: 'none' }}
                      />
                    </div>
                    <div className="css-submit-form-hint">
                      预览图应留有窗口外的背景，示例图:
                      <a
                        href="#"
                        onClick={(e) =>
                          handleInternalPreview(
                            e,
                            'https://data1.cherry-ai.com:48443/assets/a4391dd7-473a-4cad-b6f5-6a429e3bbf0f'
                          )
                        }>
                        查看示例
                      </a>
                    </div>
                  </div>
                )}

                {/* 暗色模式图片上传 */}
                {localFormData.dark_mode && (
                  <div className="css-submit-form-group">
                    <label htmlFor="dark_pic">暗色模式预览图</label>
                    <div className="css-image-upload">
                      {darkImage ? (
                        <div className="css-image-preview">
                          <img src={URL.createObjectURL(darkImage)} alt="暗色模式预览" />
                          <button
                            type="button"
                            className="css-image-remove"
                            onClick={() => {
                              setDarkImage(null)
                            }}>
                            移除图片
                          </button>
                        </div>
                      ) : (
                        <div
                          className="css-image-dropzone"
                          onClick={() => document.getElementById('dark_pic')?.click()}>
                          <i className="css-icon-upload"></i>
                          <span>点击上传图片</span>
                          <div className="css-image-hint">
                            支持 JPG、PNG、GIF、WEBP 格式，最大 2MB，图片比例建议 16:9，不符合将被裁切。
                          </div>
                        </div>
                      )}
                      <input
                        type="file"
                        id="dark_pic"
                        name="dark_pic"
                        accept=".jpg,.jpeg,.png,.gif,.webp"
                        onChange={(e) => handleImageChange(e, 'dark')}
                        style={{ display: 'none' }}
                      />
                    </div>
                    <div className="css-submit-form-hint">
                      预览图应留有窗口外的背景，示例图:
                      <a
                        href="#"
                        onClick={(e) =>
                          handleInternalPreview(
                            e,
                            'https://data1.cherry-ai.com:48443/assets/a4391dd7-473a-4cad-b6f5-6a429e3bbf0f'
                          )
                        }>
                        查看示例
                      </a>
                    </div>
                  </div>
                )}

                {/* 标签输入 */}
                <div className="css-submit-form-group">
                  <label htmlFor="title">标签</label>
                  <div className="css-tags-input-container">
                    <input
                      type="text"
                      id="title"
                      value={currentTag}
                      onChange={(e) => setCurrentTag(e.target.value.replace(/[^\w\u4e00-\u9fa5]/g, ''))}
                      onKeyDown={handleTagKeyDown}
                      placeholder="输入标签后回车，多个标签用逗号分隔"
                    />
                    <div className="css-tags-container">
                      {localFormData.title.map((tag, index) => (
                        <span key={index} className="css-tag">
                          {tag}
                          <button type="button" className="css-tag-remove" onClick={() => handleRemoveTag(index)}>
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="css-submit-form-hint">标签不支持标点符号，只支持中英文和数字</div>
                </div>

                {submitError && (
                  <div className="css-submit-error">
                    <i className="css-icon-error"></i> {submitError}
                  </div>
                )}

                <div className="css-submit-form-actions">
                  <button type="button" className="css-btn secondary" onClick={handleClose} disabled={isSubmitting}>
                    取消
                  </button>
                  <button type="submit" className="css-btn primary" disabled={isSubmitting}>
                    {isSubmitting ? '提交中...' : '提交'}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* 添加内部预览模态框 */}
          {internalPreviewUrl && <InternalPreviewModal />}
        </div>
      </div>
    )
  }

  useEffect(() => {
    // 这段代码与Header.tsx中相同，确保Header正确初始化
    function headerStyle() {
      if ($('.main-header').length) {
        const windowpos = $(window).scrollTop()
        const siteHeader = $('.main-header')
        const scrollLink = $('.scroll-to-top')
        if (windowpos >= 200) {
          siteHeader.addClass('fixed-header')
          scrollLink.fadeIn(300)
        } else {
          siteHeader.removeClass('fixed-header')
          scrollLink.fadeOut(300)
        }
      }
    }

    headerStyle()
    $(window).on('scroll', headerStyle)

    return () => {
      $(window).off('scroll', headerStyle)
    }
  }, [])

  return (
    <ErrorBoundary>
      {/* 使用与下载页面相同的页面结构，但添加关键内联样式 */}
      <div
        className="page-wrapper"
        style={{
          display: 'block',
          visibility: 'visible',
          opacity: 1,
          position: 'relative',
          zIndex: 1
        }}>
        <main
          className="main-content"
          style={{
            display: 'block !important',
            marginTop: '80px', // 给header留出空间
            position: 'relative',
            zIndex: 2,
            padding: '20px 0'
          }}>
          <div className="css-container">
            <h1 className="css-page-title">主题素材库</h1>
            <div className="css-page-description">
              <div>精选的CherryStudio主题，帮助您快速实现个性化界面。</div>
              <div className="css-buttons-container">
                <div
                  className="css-search-help-icon"
                  onClick={() => setHelpTooltipVisible(!helpTooltipVisible)}
                  onMouseEnter={() => setHelpTooltipVisible(true)}
                  onMouseLeave={() => setHelpTooltipVisible(false)}>
                  <span className="css-help-icon">?</span>
                  <div className={`css-search-tooltip ${helpTooltipVisible ? 'visible' : ''}`}>
                    <p>搜索提示:</p>
                    <ul>
                      <li>
                        使用 <code>#关键词</code> 搜索包含该标签的内容
                      </li>
                      <li>
                        使用 <code>@作者名</code> 搜索特定作者
                      </li>
                      <li>支持组合搜索，# @ 搜索内容用空格隔开</li>
                    </ul>
                  </div>
                </div>
                <button className="css-submit-button" onClick={() => setSubmitModalOpen(true)} type="button">
                  投稿
                </button>
              </div>
            </div>

            {/* 搜索框 */}
            <div className="css-search-container">
              <form onSubmit={handleSearchSubmit} className="css-search-form">
                <input
                  ref={searchInputRef}
                  type="text"
                  className="css-search-input"
                  placeholder="搜索CSS素材..."
                  defaultValue={searchTerm}
                  onChange={handleSearchInputChange}
                />
                <button type="submit" className="css-search-button" disabled={!searchInputValue.trim()}>
                  <i className="css-icon-search"></i>
                  搜索
                </button>
                {searchTerm && (
                  <button type="button" className="css-search-clear" onClick={handleClearSearchInput}>
                    ×
                  </button>
                )}
              </form>
            </div>

            {/* 显示当前筛选状态 */}
            {(authorFilter || tagFilter || (searchTerm && parseSearchInput(searchTerm).plainText)) && (
              <div className="css-filter-info">
                <div className="css-active-filters">
                  {authorFilter && (
                    <span className="css-filter-tag">
                      作者: {authorFilter}
                      <button
                        className="css-filter-remove"
                        onClick={() => handleAuthorClick(authorFilter)}
                        type="button">
                        ×
                      </button>
                    </span>
                  )}
                  {tagFilter && (
                    <span className="css-filter-tag">
                      标签: {tagFilter}
                      <button className="css-filter-remove" onClick={() => handleTagClick(tagFilter)} type="button">
                        ×
                      </button>
                    </span>
                  )}
                  {/* 显示普通搜索内容的标签 */}
                  {searchTerm && parseSearchInput(searchTerm).plainText && (
                    <span className="css-filter-tag">
                      搜索: {parseSearchInput(searchTerm).plainText}
                      <button className="css-filter-remove" onClick={clearAllFilters} type="button">
                        ×
                      </button>
                    </span>
                  )}
                </div>
                <button className="css-btn secondary small clear-filter-btn" onClick={clearAllFilters} type="button">
                  清除全部筛选
                </button>
              </div>
            )}

            {loading || isSearching ? (
              <div className="css-loading">
                <div className="css-loading-spinner"></div>
                <p>{isSearching ? '正在搜索...' : '正在加载...'}</p>
              </div>
            ) : (
              <>
                <div className="css-grid">
                  {cssItems.map((item) => (
                    <div className="css-card" key={item.id}>
                      <div
                        className="css-card-preview"
                        onClick={(e) =>
                          handleExamplePreview(
                            e,
                            getImageUrl(activeImageMode[item.id] === 'light' ? item.light_pic : item.dark_pic)
                          )
                        }>
                        {activeImageMode[item.id] === 'light' && item.light_pic ? (
                          <img src={getImageUrl(item.light_pic)} alt={item.name} className="css-card-image" />
                        ) : activeImageMode[item.id] === 'dark' && item.dark_pic ? (
                          <img src={getImageUrl(item.dark_pic)} alt={item.name} className="css-card-image" />
                        ) : (
                          <div className="css-card-no-image">
                            <span>无预览图</span>
                          </div>
                        )}
                      </div>

                      <div className="css-card-content">
                        <div className="css-card-header">
                          <h3 className="css-card-name">{item.name}</h3>
                          <div className="css-card-meta">
                            <span className="css-card-author-label">
                              作者:
                              <span
                                className={`css-card-author-name ${authorFilter === item.author ? 'active' : ''}`}
                                onClick={() => handleAuthorClick(item.author)}>
                                {item.author}
                              </span>
                            </span>
                          </div>
                        </div>

                        <div className="css-card-modes">
                          {item.light_mode && (
                            <span
                              className={`css-mode-tag light ${activeImageMode[item.id] === 'light' ? 'active' : ''}`}
                              onClick={() => handleImageModeChange(item.id, 'light')}>
                              亮色模式
                            </span>
                          )}
                          {item.dark_mode && (
                            <span
                              className={`css-mode-tag dark ${activeImageMode[item.id] === 'dark' ? 'active' : ''}`}
                              onClick={() => handleImageModeChange(item.id, 'dark')}>
                              暗色模式
                            </span>
                          )}
                        </div>

                        <div className="css-card-title-container">
                          {Array.isArray(item.title) ? (
                            item.title.map((titleItem, index) => (
                              <span
                                key={index}
                                className={`css-card-title-tag ${tagFilter === titleItem ? 'active' : ''}`}
                                onClick={() => handleTagClick(titleItem)}>
                                {titleItem}
                              </span>
                            ))
                          ) : (
                            <span
                              className={`css-card-title-tag ${
                                tagFilter === (Array.isArray(item.title) ? item.title[0] : item.title) ? 'active' : ''
                              }`}
                              onClick={() =>
                                handleTagClick(Array.isArray(item.title) ? item.title[0] : (item.title as string))
                              }>
                              {Array.isArray(item.title) ? item.title[0] : item.title}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="css-card-footer">
                        <div className="css-card-actions">
                          <button
                            type="button"
                            className={`css-btn primary small ${copySuccess === `${item.id}-code` ? 'success' : ''}`}
                            onClick={() => copyToClipboard(item.code, item.id, 'code')}>
                            <i className="css-icon-copy"></i>
                            {copySuccess === `${item.id}-code` ? '已复制' : '复制代码'}
                          </button>

                          {item.cdn_link && typeof item.cdn_link === 'string' && item.cdn_link.startsWith('http') && (
                            <button
                              type="button"
                              className={`css-btn secondary small ${copySuccess === `${item.id}-cdn` ? 'success' : ''}`}
                              onClick={() => copyToClipboard(item.cdn_link as string, item.id, 'cdn')}>
                              <i className="css-icon-link"></i>
                              {copySuccess === `${item.id}-cdn` ? '已复制' : '复制引用链接'}
                            </button>
                          )}
                        </div>
                        <div className="css-card-info">
                          <span className="css-card-version-label">
                            版本: <span className="css-card-version-value">v{formatVersion(item.version)}</span>
                          </span>
                          <span className="css-card-date-label">
                            发布: <span className="css-card-date-value">{formatDate(item.date_created)}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* 没有结果时显示提示 */}
                {cssItems.length === 0 && !loading && (
                  <div className="css-no-results">
                    <p>没有找到符合条件的 CSS 素材</p>
                    <button className="css-btn secondary clear-filter-btn" onClick={clearAllFilters} type="button">
                      清除筛选，查看所有素材
                    </button>
                  </div>
                )}

                {/* 加载状态和加载更多按钮 */}
                <div className="css-load-more">
                  {loadingMore && (
                    <div className="css-loading-more">
                      <div className="css-loading-spinner small"></div>
                      <p>加载更多...</p>
                    </div>
                  )}
                  {!hasMore && cssItems.length > 0 && (
                    <div className="css-no-more">
                      <p>已加载全部内容</p>
                    </div>
                  )}
                  {hasMore && !loadingMore && cssItems.length > 0 && (
                    <button className="css-btn primary load-more-btn" onClick={handleManualLoad} type="button">
                      加载更多
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        </main>

        {/* 模态框调用 */}
        <SubmitModal isOpen={submitModalOpen} onClose={() => setSubmitModalOpen(false)} />

        {/* 示例图片预览模态框 */}
        {previewImageUrl && <ImagePreviewModal url={previewImageUrl} onClose={closeImagePreview} />}

        <Footer />
      </div>
    </ErrorBoundary>
  )
}

export default ThemePage
