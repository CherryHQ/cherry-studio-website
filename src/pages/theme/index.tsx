import { HelpCircle, Loader2, Plus, Search, X } from 'lucide-react'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components/ui/button'
import Footer from '@/components/website/Footer'
import { usePageMeta } from '@/hooks/usePageMeta'
import { cn } from '@/lib/utils'

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

const ErrorBoundaryContent: React.FC = () => {
  const { t } = useTranslation()
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <h2 className="text-foreground mb-4 text-xl font-semibold">{t('theme_page.loading_error')}</h2>
      <Button onClick={() => window.location.reload()}>{t('theme_page.refresh_page')}</Button>
    </div>
  )
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    console.error('Error caught by ErrorBoundary:', error)
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return <ErrorBoundaryContent />
    }
    return this.props.children
  }
}

interface SubmitModalProps {
  isOpen: boolean
  onClose: () => void
}

const ThemePage: React.FC = () => {
  const { t } = useTranslation()
  usePageMeta('theme')

  const [cssItems, setCssItems] = useState<CssItem[]>([])
  const [activeImageMode, setActiveImageMode] = useState<Record<string, 'light' | 'dark'>>({})
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [copySuccess, setCopySuccess] = useState<string | null>(null)
  const [authorFilter, setAuthorFilter] = useState<string | null>(null)
  const [tagFilter, setTagFilter] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [isSearching, setIsSearching] = useState<boolean>(false)

  const isLoadingRef = useRef(false)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const [searchInputValue, setSearchInputValue] = useState('')

  const [allLoadedItems, setAllLoadedItems] = useState<CssItem[]>([])
  const [displayPage, setDisplayPage] = useState(1)
  const ITEMS_PER_PAGE = 6
  const ITEMS_PER_PAGE_DISPLAY = 6
  const BULK_LOAD_LIMIT = 1000

  const [helpTooltipVisible, setHelpTooltipVisible] = useState(false)
  const [submitModalOpen, setSubmitModalOpen] = useState(false)
  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null)

  const handleExamplePreview = (e: React.MouseEvent, url: string) => {
    e.preventDefault()
    setPreviewImageUrl(url)
  }

  const closeImagePreview = () => {
    setPreviewImageUrl(null)
  }

  const ImagePreviewModal: React.FC<{ url: string | null; onClose: () => void }> = ({ url, onClose }) => {
    if (!url) return null

    return (
      <div className="fixed inset-0 z-[10003] flex items-center justify-center bg-black/70 p-5" onClick={onClose}>
        <div
          className="bg-card relative max-h-[90%] max-w-[90%] overflow-auto rounded-lg p-2.5"
          onClick={(e) => e.stopPropagation()}>
          <button
            className="bg-primary absolute top-1.5 right-1.5 z-10 flex h-6 w-6 items-center justify-center rounded-full text-sm text-white"
            onClick={onClose}
            type="button">
            <X className="h-4 w-4" />
          </button>
          <img src={url} alt={t('theme_page.example_image')} className="block max-h-[80vh] max-w-full" />
        </div>
      </div>
    )
  }

  const parseSearchInput = (input: string) => {
    const result = {
      tags: [] as string[],
      authors: [] as string[],
      plainText: ''
    }

    const terms = input.trim().split(/\s+/)
    const plainTerms: string[] = []

    terms.forEach((term) => {
      if (term.startsWith('#')) {
        const tag = term.substring(1).trim()
        if (tag) result.tags.push(tag)
      } else if (term.startsWith('@')) {
        const author = term.substring(1).trim()
        if (author) result.authors.push(author)
      } else {
        plainTerms.push(term)
      }
    })

    result.plainText = plainTerms.join(' ')
    return result
  }

  const fetchCssData = useCallback(
    async (
      pageNum: number,
      isInitialLoad: boolean = false,
      author: string | null = null,
      search: string | null = null,
      tag: string | null = null
    ) => {
      if (isLoadingRef.current) return

      if (isInitialLoad) setLoading(true)
      else setLoadingMore(true)

      isLoadingRef.current = true

      try {
        const limit = tag || author ? BULK_LOAD_LIMIT : ITEMS_PER_PAGE

        let apiUrl = `https://data1.cherry-ai.com/items/cherry_css?id&sort=-id&limit=${limit}&page=${pageNum}`

        if (author) {
          apiUrl += `&filter[_and][0][author][_contains]=${encodeURIComponent(author)}`
        }

        if (search && search.trim() !== '') {
          apiUrl += `&search=${encodeURIComponent(search.trim())}`
        }

        const response = await fetch(apiUrl)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const responseData = await response.json()

        if (responseData.data && Array.isArray(responseData.data)) {
          if (responseData.data.length < limit) {
            setHasMore(false)
          } else {
            setHasMore(!tag && !author)
          }

          const initialImageModes: Record<string, 'light' | 'dark'> = {}
          responseData.data.forEach((item: CssItem) => {
            initialImageModes[item.id] = item.light_mode ? 'light' : 'dark'
          })

          setActiveImageMode((prev) => ({ ...prev, ...initialImageModes }))

          if (isInitialLoad) {
            setAllLoadedItems(responseData.data)
          } else {
            setAllLoadedItems((prev) => [...prev, ...responseData.data])
          }

          const filteredData = tag
            ? responseData.data.filter((item: CssItem) => {
                if (Array.isArray(item.title)) {
                  return item.title.some((title) => title.toLowerCase().includes(tag.toLowerCase()))
                } else {
                  return item.title.toLowerCase().includes(tag.toLowerCase())
                }
              })
            : responseData.data

          if (tag || author) {
            setDisplayPage(1)
            setCssItems(filteredData.slice(0, ITEMS_PER_PAGE_DISPLAY))

            if (filteredData.length <= ITEMS_PER_PAGE_DISPLAY) {
              setHasMore(false)
            } else {
              setHasMore(true)
            }
          } else {
            if (isInitialLoad) {
              setCssItems(filteredData)
            } else {
              setCssItems((prev) => [...prev, ...filteredData])
            }
          }

          if ((tag || author) && filteredData.length === 0) {
            showNotification(
              'info',
              tag ? t('theme_page.notifications.not_found_tag') : t('theme_page.notifications.not_found_author')
            )
          }
        } else {
          throw new Error('Invalid data format')
        }
      } catch (error) {
        console.error('Error fetching CSS data:', error)
        showNotification('error', t('theme_page.notifications.data_fetch_error'))
        setHasMore(false)
      } finally {
        if (isInitialLoad) setLoading(false)
        else setLoadingMore(false)
        setIsSearching(false)

        setTimeout(() => {
          isLoadingRef.current = false
        }, 500)
      }
    },
    [t]
  )

  useEffect(() => {
    fetchCssData(1, true, authorFilter, searchTerm || null, tagFilter)
  }, [fetchCssData, authorFilter, searchTerm, tagFilter])

  const clearAllFilters = () => {
    setAuthorFilter(null)
    setTagFilter(null)
    setSearchTerm('')
    setSearchInputValue('')

    if (searchInputRef.current) {
      searchInputRef.current.value = ''
    }

    fetchCssData(1, true)
  }

  const handleClearSearchInput = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    clearAllFilters()
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchInputRef.current || !searchInputRef.current.value.trim()) return

    const input = searchInputRef.current.value.trim()
    const searchParams = parseSearchInput(input)

    setSearchTerm(input)
    setSearchInputValue(input)
    setPage(1)
    setDisplayPage(1)
    setIsSearching(true)

    setTagFilter(searchParams.tags.length > 0 ? searchParams.tags[0] : null)
    setAuthorFilter(searchParams.authors.length > 0 ? searchParams.authors[0] : null)

    fetchCssData(
      1,
      true,
      searchParams.authors.length > 0 ? searchParams.authors[0] : null,
      searchParams.plainText || null,
      searchParams.tags.length > 0 ? searchParams.tags[0] : null
    )
  }

  const handleTagClick = (tag: string) => {
    if (tagFilter === tag) {
      setTagFilter(null)
      const searchParams = parseSearchInput(searchTerm)
      const newTags = searchParams.tags.filter((t) => t !== tag)
      const newSearchTerm = buildSearchTerm(newTags, searchParams.authors, searchParams.plainText)
      updateSearchUI(newSearchTerm)

      fetchCssData(
        1,
        true,
        searchParams.authors.length > 0 ? searchParams.authors[0] : null,
        searchParams.plainText || null,
        newTags.length > 0 ? newTags[0] : null
      )
    } else {
      setTagFilter(tag)
      const searchParams = parseSearchInput(searchTerm)
      const newTags = [...searchParams.tags.filter((t) => t !== tag), tag]
      const newSearchTerm = buildSearchTerm(newTags, searchParams.authors, searchParams.plainText)
      updateSearchUI(newSearchTerm)

      fetchCssData(
        1,
        true,
        searchParams.authors.length > 0 ? searchParams.authors[0] : null,
        searchParams.plainText || null,
        tag
      )
    }
  }

  const handleAuthorClick = (author: string) => {
    if (authorFilter === author) {
      setAuthorFilter(null)
      const searchParams = parseSearchInput(searchTerm)
      const newAuthors = searchParams.authors.filter((a) => a !== author)
      const newSearchTerm = buildSearchTerm(searchParams.tags, newAuthors, searchParams.plainText)
      updateSearchUI(newSearchTerm)

      fetchCssData(
        1,
        true,
        null,
        searchParams.plainText || null,
        searchParams.tags.length > 0 ? searchParams.tags[0] : null
      )
    } else {
      setAuthorFilter(author)
      const searchParams = parseSearchInput(searchTerm)
      const newSearchTerm = buildSearchTerm(searchParams.tags, [author], searchParams.plainText)
      updateSearchUI(newSearchTerm)

      fetchCssData(
        1,
        true,
        author,
        searchParams.plainText || null,
        searchParams.tags.length > 0 ? searchParams.tags[0] : null
      )
    }
  }

  const buildSearchTerm = (tags: string[], authors: string[], plainText: string): string => {
    let result = ''
    for (const tag of tags) {
      result += `#${tag} `
    }
    for (const author of authors) {
      result += `@${author} `
    }
    if (plainText) {
      result += plainText
    }
    return result.trim()
  }

  const updateSearchUI = (searchTerm: string) => {
    setSearchTerm(searchTerm)
    setSearchInputValue(searchTerm)
    if (searchInputRef.current) {
      searchInputRef.current.value = searchTerm
    }
  }

  const handleManualLoad = useCallback(() => {
    if (loadingMore) return

    if (tagFilter || authorFilter) {
      let filteredItems = allLoadedItems

      if (tagFilter) {
        filteredItems = filteredItems.filter((item) => {
          if (Array.isArray(item.title)) {
            return item.title.some((title) => title.toLowerCase().includes(tagFilter.toLowerCase()))
          } else {
            return item.title.toLowerCase().includes(tagFilter.toLowerCase())
          }
        })
      }

      if (authorFilter) {
        filteredItems = filteredItems.filter((item) => item.author === authorFilter)
      }

      const nextPage = displayPage + 1
      const startIndex = (nextPage - 1) * ITEMS_PER_PAGE_DISPLAY
      const endIndex = nextPage * ITEMS_PER_PAGE_DISPLAY

      if (startIndex < filteredItems.length) {
        setDisplayPage(nextPage)
        setCssItems((prev) => [...prev, ...filteredItems.slice(startIndex, endIndex)])

        if (endIndex >= filteredItems.length) {
          setHasMore(false)
        }
      } else {
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
    alert(message)
  }

  const getImageUrl = (url?: string): string => {
    if (!url) return ''
    if (url.startsWith('http')) return url
    return `https://data1.cherry-ai.com/assets/${url}`
  }

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInputValue(e.target.value)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest('.help-tooltip-trigger')) {
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

  const uploadFile = async (file: File) => {
    const formData = new FormData()
    formData.append('folder', '9e1c8e92-fc45-4374-8958-7e7591d8245a')
    formData.append('file', file)

    try {
      const response = await fetch('https://data1.cherry-ai.com/files', {
        method: 'POST',
        headers: {
          Authorization: 'Bearer y8j8uycl07xwSkyrssHCRd7nIecUeRwC'
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

  const copyToClipboard = (text: string, itemId: number, type: 'code' | 'cdn') => {
    try {
      const textArea = document.createElement('textarea')
      textArea.value = text
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)

      setCopySuccess(`${itemId}-${type}`)
      setTimeout(() => setCopySuccess(null), 2000)

      alert('复制成功！')
    } catch (err) {
      console.error('Failed to copy text: ', err)
      alert('复制失败，请手动复制')
    }
  }

  const SubmitModal: React.FC<SubmitModalProps> = ({ isOpen, onClose }) => {
    useEffect(() => {
      const header = document.querySelector('.main-header')
      if (header) {
        if (isOpen) {
          ;(header as HTMLElement).style.display = 'none'
        } else {
          ;(header as HTMLElement).style.display = ''
        }
      }

      return () => {
        if (header) {
          ;(header as HTMLElement).style.display = ''
        }
      }
    }, [isOpen])

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
    const [internalPreviewUrl, setInternalPreviewUrl] = useState<string | null>(null)

    const handleInternalPreview = (e: React.MouseEvent, url: string) => {
      e.preventDefault()
      e.stopPropagation()
      setInternalPreviewUrl(url)
    }

    const closeInternalPreview = () => {
      setInternalPreviewUrl(null)
    }

    const InternalPreviewModal = () => {
      if (!internalPreviewUrl) return null

      return (
        <div
          className="fixed inset-0 z-[10004] flex items-center justify-center bg-black/70 p-5"
          onClick={closeInternalPreview}>
          <div
            className="bg-card relative max-h-[90%] max-w-[90%] overflow-auto rounded-lg p-2.5"
            onClick={(e) => e.stopPropagation()}>
            <button
              className="bg-primary absolute top-1.5 right-1.5 z-10 flex h-6 w-6 items-center justify-center rounded-full text-sm text-white"
              onClick={closeInternalPreview}
              type="button">
              <X className="h-4 w-4" />
            </button>
            <img
              src={internalPreviewUrl}
              alt={t('theme_page.preview_example')}
              className="block max-h-[80vh] max-w-full"
            />
          </div>
        </div>
      )
    }

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

    const handleClose = useCallback(() => {
      onClose()
      setTimeout(resetForm, 300)
    }, [onClose, resetForm])

    const updateField = useCallback((field: string, value: any) => {
      setLocalFormData((prev) => ({ ...prev, [field]: value }))
    }, [])

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

    const handleRemoveTag = useCallback((index: number) => {
      setLocalFormData((prev) => ({
        ...prev,
        title: prev.title.filter((_, i) => i !== index)
      }))
    }, [])

    const handleImageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>, type: 'light' | 'dark') => {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0]

        const isImage = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'].includes(file.type)
        const isLt2M = file.size / 1024 / 1024 < 2

        if (!isImage) {
          alert(t('theme_page.submit_modal.validation.file_type_error'))
          return
        }

        if (!isLt2M) {
          alert(t('theme_page.submit_modal.image_size_error'))
          return
        }

        if (type === 'light') {
          setLightImage(file)
        } else {
          setDarkImage(file)
        }
      }
    }, [])

    const handleSubmit = useCallback(
      async (e: React.FormEvent) => {
        e.preventDefault()

        if (!localFormData.name.trim()) {
          setSubmitError(t('theme_page.submit_modal.validation.name_required'))
          return
        }

        if (!localFormData.author.trim()) {
          setSubmitError(t('theme_page.submit_modal.author_required'))
          return
        }

        if (!localFormData.version.trim() || !/^\d+(\.\d+)*$/.test(localFormData.version)) {
          setSubmitError(t('theme_page.submit_modal.version_invalid'))
          return
        }

        if (!localFormData.code.trim()) {
          setSubmitError(t('theme_page.submit_modal.validation.code_required'))
          return
        }

        if (localFormData.light_mode && !lightImage) {
          setSubmitError(t('theme_page.submit_modal.validation.light_image_required'))
          return
        }

        if (localFormData.dark_mode && !darkImage) {
          setSubmitError(t('theme_page.submit_modal.validation.dark_image_required'))
          return
        }

        setIsSubmitting(true)
        setSubmitError(null)

        try {
          let lightPicId = null
          let darkPicId = null

          if (localFormData.light_mode && lightImage) {
            const lightResult = await uploadFile(lightImage)
            lightPicId = lightResult.data.id
          }

          if (localFormData.dark_mode && darkImage) {
            const darkResult = await uploadFile(darkImage)
            darkPicId = darkResult.data.id
          }

          const response = await fetch('https://data1.cherry-ai.com/items/cherry_css_pr', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer hTpfpBWuxk-5ACn7OtHYjHNDT31gcM3e'
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

          setSubmitSuccess(true)

          setTimeout(() => {
            onClose()
          }, 1500)
        } catch (error) {
          console.error('提交失败:', error)
          setSubmitError(error instanceof Error ? error.message : t('theme_page.submit_modal.submit_error'))
        } finally {
          setIsSubmitting(false)
        }
      },
      [localFormData, lightImage, darkImage, onClose]
    )

    if (!isOpen) return null

    return (
      <div className="fixed inset-0 z-[10001] flex items-center justify-center overflow-y-auto bg-black/50 p-5">
        <div className="animate-in fade-in slide-in-from-bottom-4 border-border bg-card relative flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-xl border shadow-2xl">
          <div className="border-border flex items-center justify-between border-b px-6 py-4">
            <h2 className="text-foreground text-xl font-semibold">{t('theme_page.submit_modal.title')}</h2>
            <button
              className="text-muted-foreground hover:text-foreground text-2xl transition-colors"
              onClick={handleClose}
              type="button">
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="max-h-[calc(90vh-70px)] overflow-y-auto p-6">
            {submitSuccess ? (
              <div className="flex flex-col items-center py-10 text-center">
                <div className="bg-primary/10 text-primary mb-5 flex h-24 w-24 items-center justify-center rounded-full text-5xl">
                  ✓
                </div>
                <h3 className="text-foreground mb-3 text-2xl font-semibold">
                  {t('theme_page.submit_modal.success_title')}
                </h3>
                <p className="text-muted-foreground mb-6">{t('theme_page.submit_modal.success_message')}</p>
                <Button onClick={handleClose}>{t('theme_page.submit_modal.close')}</Button>
              </div>
            ) : (
              <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-foreground font-medium">
                    {t('theme_page.submit_modal.name_label')}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={localFormData.name}
                    onChange={(e) => updateField('name', e.target.value)}
                    placeholder={t('theme_page.submit_modal.name_placeholder')}
                    className="border-border bg-secondary/30 text-foreground focus:border-primary rounded-lg border px-3 py-2.5 transition-colors focus:outline-none"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="author" className="text-foreground font-medium">
                    {t('theme_page.submit_modal.author_label')}
                  </label>
                  <input
                    type="text"
                    id="author"
                    name="author"
                    required
                    value={localFormData.author}
                    onChange={(e) => updateField('author', e.target.value)}
                    placeholder={t('theme_page.submit_modal.author_placeholder')}
                    className="border-border bg-secondary/30 text-foreground focus:border-primary rounded-lg border px-3 py-2.5 transition-colors focus:outline-none"
                  />
                </div>

                <div className="flex gap-5">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="light_mode"
                      name="light_mode"
                      checked={localFormData.light_mode}
                      onChange={(e) => updateField('light_mode', e.target.checked)}
                      className="border-border text-primary focus:ring-primary h-4 w-4 rounded"
                    />
                    <label htmlFor="light_mode" className="text-foreground">
                      {t('theme_page.submit_modal.support_light_mode')}
                    </label>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="dark_mode"
                      name="dark_mode"
                      checked={localFormData.dark_mode}
                      onChange={(e) => updateField('dark_mode', e.target.checked)}
                      className="border-border text-primary focus:ring-primary h-4 w-4 rounded"
                    />
                    <label htmlFor="dark_mode" className="text-foreground">
                      {t('theme_page.submit_modal.support_dark_mode')}
                    </label>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="version" className="text-foreground font-medium">
                    {t('theme_page.submit_modal.version_label')}
                  </label>
                  <input
                    type="text"
                    id="version"
                    name="version"
                    required
                    value={localFormData.version}
                    onChange={(e) => {
                      if (/^[0-9.]*$/.test(e.target.value)) {
                        updateField('version', e.target.value)
                      }
                    }}
                    placeholder={t('theme_page.submit_modal.version_placeholder')}
                    className="border-border bg-secondary/30 text-foreground focus:border-primary rounded-lg border px-3 py-2.5 transition-colors focus:outline-none"
                  />
                  <p className="text-muted-foreground mt-1 text-xs">{t('theme_page.submit_modal.version_hint')}</p>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="code" className="text-foreground font-medium">
                    {t('theme_page.submit_modal.code_label')}
                  </label>
                  <textarea
                    id="code"
                    name="code"
                    required
                    value={localFormData.code}
                    onChange={(e) => updateField('code', e.target.value)}
                    placeholder={t('theme_page.submit_modal.code_placeholder')}
                    rows={10}
                    className="border-border bg-secondary/30 text-foreground focus:border-primary min-h-[200px] rounded-lg border px-3 py-2.5 font-mono whitespace-pre transition-colors focus:outline-none"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="cdn_link" className="text-foreground font-medium">
                    {t('theme_page.submit_modal.cdn_link_label')}
                  </label>
                  <input
                    type="url"
                    id="cdn_link"
                    name="cdn_link"
                    value={localFormData.cdn_link}
                    onChange={(e) => updateField('cdn_link', e.target.value)}
                    placeholder={t('theme_page.submit_modal.cdn_link_placeholder')}
                    className="border-border bg-secondary/30 text-foreground focus:border-primary rounded-lg border px-3 py-2.5 transition-colors focus:outline-none"
                  />
                </div>

                {localFormData.light_mode && (
                  <div className="flex flex-col gap-2">
                    <label htmlFor="light_pic" className="text-foreground font-medium">
                      {t('theme_page.submit_modal.light_image_label')}
                    </label>
                    <div className="border-border overflow-hidden rounded-lg border-2 border-dashed">
                      {lightImage ? (
                        <div className="relative">
                          <img
                            src={URL.createObjectURL(lightImage)}
                            alt={t('theme_page.light_mode_preview')}
                            className="block max-h-72 w-full object-contain"
                          />
                          <button
                            type="button"
                            className="absolute right-2.5 bottom-2.5 rounded bg-black/60 px-3 py-1.5 text-xs text-white"
                            onClick={() => setLightImage(null)}>
                            {t('theme_page.submit_modal.remove_image')}
                          </button>
                        </div>
                      ) : (
                        <div
                          className="hover:bg-secondary/30 flex cursor-pointer flex-col items-center justify-center gap-2.5 p-8 transition-colors"
                          onClick={() => document.getElementById('light_pic')?.click()}>
                          <span className="text-muted-foreground text-2xl">📷</span>
                          <span className="text-foreground">{t('theme_page.submit_modal.upload_image')}</span>
                          <span className="text-muted-foreground mt-2 text-xs">
                            {t('theme_page.submit_modal.image_format_hint')}
                          </span>
                        </div>
                      )}
                      <input
                        type="file"
                        id="light_pic"
                        name="light_pic"
                        accept=".jpg,.jpeg,.png,.gif,.webp"
                        onChange={(e) => handleImageChange(e, 'light')}
                        className="hidden"
                      />
                    </div>
                    <p className="text-muted-foreground mt-1 text-xs">
                      {t('theme_page.submit_modal.preview_background_hint')}
                      <a
                        href="#"
                        onClick={(e) =>
                          handleInternalPreview(
                            e,
                            'https://data1.cherry-ai.com/assets/a4391dd7-473a-4cad-b6f5-6a429e3bbf0f'
                          )
                        }
                        className="text-primary ml-1 hover:underline">
                        {t('theme_page.view_example')}
                      </a>
                    </p>
                  </div>
                )}

                {localFormData.dark_mode && (
                  <div className="flex flex-col gap-2">
                    <label htmlFor="dark_pic" className="text-foreground font-medium">
                      {t('theme_page.submit_modal.dark_image_label')}
                    </label>
                    <div className="border-border overflow-hidden rounded-lg border-2 border-dashed">
                      {darkImage ? (
                        <div className="relative">
                          <img
                            src={URL.createObjectURL(darkImage)}
                            alt={t('theme_page.dark_mode_preview')}
                            className="block max-h-72 w-full object-contain"
                          />
                          <button
                            type="button"
                            className="absolute right-2.5 bottom-2.5 rounded bg-black/60 px-3 py-1.5 text-xs text-white"
                            onClick={() => setDarkImage(null)}>
                            {t('theme_page.submit_modal.remove_image')}
                          </button>
                        </div>
                      ) : (
                        <div
                          className="hover:bg-secondary/30 flex cursor-pointer flex-col items-center justify-center gap-2.5 p-8 transition-colors"
                          onClick={() => document.getElementById('dark_pic')?.click()}>
                          <span className="text-muted-foreground text-2xl">📷</span>
                          <span className="text-foreground">{t('theme_page.submit_modal.upload_image')}</span>
                          <span className="text-muted-foreground mt-2 text-xs">
                            {t('theme_page.submit_modal.image_format_hint')}
                          </span>
                        </div>
                      )}
                      <input
                        type="file"
                        id="dark_pic"
                        name="dark_pic"
                        accept=".jpg,.jpeg,.png,.gif,.webp"
                        onChange={(e) => handleImageChange(e, 'dark')}
                        className="hidden"
                      />
                    </div>
                    <p className="text-muted-foreground mt-1 text-xs">
                      {t('theme_page.submit_modal.preview_background_hint')}
                      <a
                        href="#"
                        onClick={(e) =>
                          handleInternalPreview(
                            e,
                            'https://data1.cherry-ai.com/assets/a4391dd7-473a-4cad-b6f5-6a429e3bbf0f'
                          )
                        }
                        className="text-primary ml-1 hover:underline">
                        {t('theme_page.view_example')}
                      </a>
                    </p>
                  </div>
                )}

                <div className="flex flex-col gap-2">
                  <label htmlFor="title" className="text-foreground font-medium">
                    {t('theme_page.submit_modal.tags_label')}
                  </label>
                  <div className="flex flex-col gap-2">
                    <input
                      type="text"
                      id="title"
                      value={currentTag}
                      onChange={(e) => setCurrentTag(e.target.value.replace(/[^\w\u4e00-\u9fa5]/g, ''))}
                      onKeyDown={handleTagKeyDown}
                      placeholder={t('theme_page.submit_modal.tags_placeholder')}
                      className="border-border bg-secondary/30 text-foreground focus:border-primary rounded-lg border px-3 py-2.5 transition-colors focus:outline-none"
                    />
                    <div className="flex flex-wrap gap-2">
                      {localFormData.title.map((tag, index) => (
                        <span
                          key={index}
                          className="bg-primary/10 text-primary inline-flex items-center gap-1.5 rounded px-2 py-1 text-sm">
                          {tag}
                          <button
                            type="button"
                            className="text-primary hover:text-primary/80"
                            onClick={() => handleRemoveTag(index)}>
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-muted-foreground mt-1 text-xs">{t('theme_page.submit_modal.tags_hint')}</p>
                </div>

                {submitError && (
                  <div className="bg-destructive/10 text-destructive flex items-center gap-2 rounded-lg px-4 py-3 text-sm">
                    <span>⚠</span> {submitError}
                  </div>
                )}

                <div className="mt-5 flex justify-end gap-3">
                  <Button variant="outline" onClick={handleClose} disabled={isSubmitting}>
                    {t('theme_page.submit_modal.cancel')}
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {t('theme_page.submit_modal.submitting')}
                      </>
                    ) : (
                      t('theme_page.submit_modal.submit')
                    )}
                  </Button>
                </div>
              </form>
            )}
          </div>

          {internalPreviewUrl && <InternalPreviewModal />}
        </div>
      </div>
    )
  }

  return (
    <ErrorBoundary>
      <div className="bg-background min-h-screen">
        <main className="relative z-10 px-5 pt-32 pb-16">
          <div className="mx-auto max-w-6xl">
            <h1 className="text-foreground mb-3 text-center text-3xl font-bold sm:text-4xl">{t('theme_page.title')}</h1>
            <div className="mb-10 text-center">
              <p className="text-muted-foreground">{t('theme_page.subtitle')}</p>
              <div className="mt-4 flex items-center justify-center gap-4">
                <div
                  className="help-tooltip-trigger relative flex cursor-pointer items-center justify-center"
                  onClick={() => setHelpTooltipVisible(!helpTooltipVisible)}
                  onMouseEnter={() => setHelpTooltipVisible(true)}
                  onMouseLeave={() => setHelpTooltipVisible(false)}>
                  <span className="bg-secondary text-muted-foreground flex h-6 w-6 items-center justify-center rounded-full text-sm font-bold">
                    <HelpCircle className="h-4 w-4" />
                  </span>
                  <div
                    className={cn(
                      'border-border bg-card absolute top-full left-1/2 z-50 mt-2.5 w-72 -translate-x-1/2 rounded-lg border p-4 text-left shadow-lg transition-opacity',
                      helpTooltipVisible ? 'opacity-100' : 'pointer-events-none opacity-0'
                    )}>
                    <p className="text-foreground mb-2 text-sm font-medium">{t('theme_page.search_help')}</p>
                    <ul className="text-muted-foreground space-y-1 text-xs">
                      <li>{t('theme_page.search_help_tips.tag_search')}</li>
                      <li>{t('theme_page.search_help_tips.author_search')}</li>
                      <li>{t('theme_page.search_help_tips.combined_search')}</li>
                    </ul>
                  </div>
                </div>
                <button
                  className="text-primary hover:text-primary/80 inline-flex items-center gap-1 text-sm font-medium transition-colors"
                  onClick={() => setSubmitModalOpen(true)}
                  type="button">
                  <Plus className="h-4 w-4" />
                  {t('theme_page.submit_theme')}
                </button>
              </div>
            </div>

            {/* Search Box */}
            <div className="relative mb-8">
              <form onSubmit={handleSearchSubmit} className="mx-auto flex max-w-xl">
                <input
                  ref={searchInputRef}
                  type="text"
                  className="border-border bg-card text-foreground focus:border-primary flex-1 rounded-l-lg border-2 px-4 py-3 transition-colors focus:outline-none"
                  placeholder={t('theme_page.search_placeholder')}
                  defaultValue={searchTerm}
                  onChange={handleSearchInputChange}
                />
                <button
                  type="submit"
                  className="bg-primary hover:bg-primary/90 flex items-center gap-2 rounded-r-lg px-5 text-white transition-colors disabled:cursor-not-allowed disabled:opacity-70"
                  disabled={!searchInputValue.trim()}>
                  <Search className="h-4 w-4" />
                  {t('theme_page.search_button')}
                </button>
                {searchTerm && (
                  <button
                    type="button"
                    className="text-muted-foreground hover:text-primary absolute top-1/2 right-28 -translate-y-1/2 px-2 text-xl"
                    onClick={handleClearSearchInput}>
                    ×
                  </button>
                )}
              </form>
            </div>

            {/* Filter Info */}
            {(authorFilter || tagFilter || (searchTerm && parseSearchInput(searchTerm).plainText)) && (
              <div className="border-border bg-card mb-5 flex flex-wrap items-center justify-between gap-4 rounded-lg border px-4 py-3">
                <div className="flex flex-wrap gap-2">
                  {authorFilter && (
                    <span className="bg-secondary text-foreground inline-flex items-center gap-1.5 rounded px-2.5 py-1 text-sm">
                      {t('theme_page.author_by')} {authorFilter}
                      <button
                        className="text-muted-foreground hover:text-primary"
                        onClick={() => handleAuthorClick(authorFilter)}
                        type="button">
                        ×
                      </button>
                    </span>
                  )}
                  {tagFilter && (
                    <span className="bg-secondary text-foreground inline-flex items-center gap-1.5 rounded px-2.5 py-1 text-sm">
                      {t('theme_page.tags')} {tagFilter}
                      <button
                        className="text-muted-foreground hover:text-primary"
                        onClick={() => handleTagClick(tagFilter)}
                        type="button">
                        ×
                      </button>
                    </span>
                  )}
                  {searchTerm && parseSearchInput(searchTerm).plainText && (
                    <span className="bg-secondary text-foreground inline-flex items-center gap-1.5 rounded px-2.5 py-1 text-sm">
                      {t('theme_page.search_filter.search_label')} {parseSearchInput(searchTerm).plainText}
                      <button
                        className="text-muted-foreground hover:text-primary"
                        onClick={clearAllFilters}
                        type="button">
                        ×
                      </button>
                    </span>
                  )}
                </div>
                <Button variant="outline" size="sm" onClick={clearAllFilters}>
                  {t('theme_page.clear_filters')}
                </Button>
              </div>
            )}

            {loading || isSearching ? (
              <div className="flex min-h-[300px] flex-col items-center justify-center">
                <Loader2 className="text-primary mb-5 h-12 w-12 animate-spin" />
                <p className="text-muted-foreground">{t('theme_page.loading')}</p>
              </div>
            ) : (
              <>
                <div className="grid gap-8 md:grid-cols-2">
                  {cssItems.map((item) => (
                    <div
                      key={item.id}
                      className="group border-border bg-card flex flex-col overflow-hidden rounded-2xl border transition-all duration-200 hover:-translate-y-1 hover:shadow-xl">
                      <div
                        className="bg-secondary/30 relative cursor-pointer pt-[56.25%]"
                        onClick={(e) =>
                          handleExamplePreview(
                            e,
                            getImageUrl(activeImageMode[item.id] === 'light' ? item.light_pic : item.dark_pic)
                          )
                        }>
                        {activeImageMode[item.id] === 'light' && item.light_pic ? (
                          <img
                            src={getImageUrl(item.light_pic)}
                            alt={item.name}
                            className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        ) : activeImageMode[item.id] === 'dark' && item.dark_pic ? (
                          <img
                            src={getImageUrl(item.dark_pic)}
                            alt={item.name}
                            className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        ) : (
                          <div className="text-muted-foreground absolute inset-0 flex items-center justify-center">
                            <span>{t('theme_page.no_preview')}</span>
                          </div>
                        )}
                        <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all group-hover:bg-black/40 group-hover:opacity-100">
                          <span className="text-foreground rounded bg-white/90 px-3 py-1.5 text-sm font-medium">
                            {t('theme_page.preview_button')}
                          </span>
                        </div>
                      </div>

                      <div className="flex min-h-[200px] flex-1 flex-col p-5">
                        <div className="mb-3">
                          <h3 className="text-foreground mb-2 text-lg font-semibold">{item.name}</h3>
                          <div className="text-muted-foreground text-sm">
                            {t('theme_page.author_by')}
                            <span
                              className={cn(
                                'hover:text-primary ml-1 cursor-pointer font-medium transition-colors hover:underline',
                                authorFilter === item.author && 'text-primary'
                              )}
                              onClick={() => handleAuthorClick(item.author)}>
                              {item.author}
                            </span>
                          </div>
                        </div>

                        <div className="mb-3 flex gap-2">
                          {item.light_mode && (
                            <span
                              className={cn(
                                'cursor-pointer rounded px-2 py-0.5 text-xs transition-colors',
                                activeImageMode[item.id] === 'light'
                                  ? 'bg-primary text-white'
                                  : 'bg-primary/10 text-primary hover:bg-primary/20'
                              )}
                              onClick={() => handleImageModeChange(item.id, 'light')}>
                              {t('theme_page.light_mode')}
                            </span>
                          )}
                          {item.dark_mode && (
                            <span
                              className={cn(
                                'cursor-pointer rounded px-2 py-0.5 text-xs transition-colors',
                                activeImageMode[item.id] === 'dark'
                                  ? 'bg-foreground text-background'
                                  : 'bg-foreground/80 text-background hover:bg-foreground'
                              )}
                              onClick={() => handleImageModeChange(item.id, 'dark')}>
                              {t('theme_page.dark_mode')}
                            </span>
                          )}
                        </div>

                        <div className="mb-3 flex flex-wrap gap-2">
                          {Array.isArray(item.title) ? (
                            item.title.map((titleItem, index) => (
                              <span
                                key={index}
                                className={cn(
                                  'cursor-pointer rounded px-2.5 py-1 text-sm font-medium transition-colors',
                                  tagFilter === titleItem
                                    ? 'bg-primary text-white'
                                    : 'bg-secondary text-foreground hover:bg-secondary/80'
                                )}
                                onClick={() => handleTagClick(titleItem)}>
                                {titleItem}
                              </span>
                            ))
                          ) : (
                            <span
                              className={cn(
                                'cursor-pointer rounded px-2.5 py-1 text-sm font-medium transition-colors',
                                tagFilter === (Array.isArray(item.title) ? item.title[0] : item.title)
                                  ? 'bg-primary text-white'
                                  : 'bg-secondary text-foreground hover:bg-secondary/80'
                              )}
                              onClick={() =>
                                handleTagClick(Array.isArray(item.title) ? item.title[0] : (item.title as string))
                              }>
                              {Array.isArray(item.title) ? item.title[0] : item.title}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="border-border mt-auto flex items-center justify-between border-t px-4 py-3">
                        <div className="flex gap-2">
                          <Button
                            variant={copySuccess === `${item.id}-code` ? 'default' : 'glow'}
                            size="sm"
                            onClick={() => copyToClipboard(item.code, item.id, 'code')}>
                            {copySuccess === `${item.id}-code` ? t('theme_page.copied') : t('theme_page.copy_code')}
                          </Button>

                          {item.cdn_link && item.cdn_link.startsWith('http') && (
                            <Button
                              variant={copySuccess === `${item.id}-cdn` ? 'default' : 'outline'}
                              size="sm"
                              onClick={() => copyToClipboard(item.cdn_link as string, item.id, 'cdn')}>
                              {copySuccess === `${item.id}-cdn` ? t('theme_page.copied') : t('theme_page.copy_cdn')}
                            </Button>
                          )}
                        </div>
                        <div className="text-muted-foreground flex gap-3 text-xs">
                          <span>
                            {t('theme_page.version')}{' '}
                            <span className="text-foreground font-medium">v{formatVersion(item.version)}</span>
                          </span>
                          <span>
                            {t('theme_page.created')}{' '}
                            <span className="text-foreground font-medium">{formatDate(item.date_created)}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {cssItems.length === 0 && !loading && (
                  <div className="text-muted-foreground py-10 text-center">
                    <p className="mb-4">{t('theme_page.no_results')}</p>
                    <Button variant="outline" onClick={clearAllFilters}>
                      {t('theme_page.clear_all_filters')}
                    </Button>
                  </div>
                )}

                <div className="py-10 text-center">
                  {loadingMore && (
                    <div className="flex flex-col items-center justify-center">
                      <Loader2 className="text-primary mb-2.5 h-8 w-8 animate-spin" />
                      <p className="text-muted-foreground">{t('theme_page.loading_more')}</p>
                    </div>
                  )}
                  {!hasMore && cssItems.length > 0 && (
                    <p className="text-muted-foreground">{t('theme_page.all_loaded')}</p>
                  )}
                  {hasMore && !loadingMore && cssItems.length > 0 && (
                    <Button onClick={handleManualLoad}>{t('theme_page.load_more')}</Button>
                  )}
                </div>
              </>
            )}
          </div>
        </main>

        <SubmitModal isOpen={submitModalOpen} onClose={() => setSubmitModalOpen(false)} />

        {previewImageUrl && <ImagePreviewModal url={previewImageUrl} onClose={closeImagePreview} />}

        <Footer />
      </div>
    </ErrorBoundary>
  )
}

export default ThemePage
