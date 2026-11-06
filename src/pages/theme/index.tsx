import { HelpCircle, Loader2, Plus, Search, X } from 'lucide-react'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { fetchWebsiteConfigs, safePublicURL } from '@/assets/js/website-api'
import { Button } from '@/components/ui/button'
import Footer from '@/components/website/Footer'
import { usePageMeta } from '@/hooks/usePageMeta'
import { cn } from '@/lib/utils'

interface CssItem {
  id: string
  name: string
  author: string
  version: string
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
  exampleImageURL: string
}

const SubmitModal: React.FC<SubmitModalProps> = ({ isOpen, onClose, exampleImageURL }) => {
  const { t } = useTranslation()
  const submissionAttempt = useRef<{ fingerprint: string; key: string } | null>(null)
  useEffect(() => {
    const header = document.querySelector('.site-header')
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
  const [internalPreviewClosing, setInternalPreviewClosing] = useState(false)
  const internalPreviewCloseTimerRef = useRef<number | null>(null)

  const handleInternalPreview = (e: React.MouseEvent, url: string) => {
    e.preventDefault()
    e.stopPropagation()

    if (internalPreviewCloseTimerRef.current) {
      window.clearTimeout(internalPreviewCloseTimerRef.current)
      internalPreviewCloseTimerRef.current = null
    }

    setInternalPreviewUrl(url)
    setInternalPreviewClosing(false)
  }

  const closeInternalPreview = () => {
    if (internalPreviewClosing) return

    setInternalPreviewClosing(true)

    if (internalPreviewCloseTimerRef.current) {
      window.clearTimeout(internalPreviewCloseTimerRef.current)
    }

    internalPreviewCloseTimerRef.current = window.setTimeout(() => {
      setInternalPreviewUrl(null)
      setInternalPreviewClosing(false)
      internalPreviewCloseTimerRef.current = null
    }, 200)
  }

  useEffect(() => {
    return () => {
      if (internalPreviewCloseTimerRef.current) {
        window.clearTimeout(internalPreviewCloseTimerRef.current)
      }
    }
  }, [])

  const InternalPreviewModal = () => {
    if (!internalPreviewUrl) return null

    return (
      <div
        className={cn(
          'fixed inset-0 z-[10004] flex items-center justify-center bg-black/70 p-5 duration-200',
          internalPreviewClosing ? 'animate-out fade-out-0' : 'animate-in fade-in-0'
        )}
        onClick={closeInternalPreview}>
        <div
          className={cn(
            'bg-card relative max-h-[90%] max-w-[90%] overflow-auto rounded-lg p-2.5 duration-200',
            internalPreviewClosing ? 'animate-out fade-out-0 zoom-out-95' : 'animate-in fade-in-0 zoom-in-95'
          )}
          onClick={(e) => e.stopPropagation()}>
          <button
            className="bg-primary absolute top-1.5 right-1.5 z-10 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full text-sm text-white"
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
    if (e.target.files?.[0]) {
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
        const fingerprint = JSON.stringify([
          localFormData,
          lightImage && [lightImage.name, lightImage.size, lightImage.lastModified],
          darkImage && [darkImage.name, darkImage.size, darkImage.lastModified]
        ])
        if (submissionAttempt.current?.fingerprint !== fingerprint)
          submissionAttempt.current = { fingerprint, key: crypto.randomUUID() }
        const body = new FormData()
        body.append('content', JSON.stringify({ ...localFormData, description: '' }))
        if (localFormData.light_mode && lightImage) body.append('light_pic', lightImage)
        if (localFormData.dark_mode && darkImage) body.append('dark_pic', darkImage)
        const response = await fetch('/api/website/theme-submissions', {
          method: 'POST',
          headers: { 'Idempotency-Key': submissionAttempt.current.key },
          body
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
                      onClick={(e) => handleInternalPreview(e, exampleImageURL)}
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
                      onClick={(e) => handleInternalPreview(e, exampleImageURL)}
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

  const requestRef = useRef<AbortController | null>(null)
  const requestSequence = useRef(0)
  const [exampleImageURL, setExampleImageURL] = useState('')
  useEffect(() => {
    let active = true
    fetchWebsiteConfigs()
      .then((values) => {
        if (active) setExampleImageURL(safePublicURL(values['theme.example_image']))
      })
      .catch(() => {})
    return () => {
      active = false
      requestRef.current?.abort()
    }
  }, [])
  const searchInputRef = useRef<HTMLInputElement>(null)
  const [searchInputValue, setSearchInputValue] = useState('')

  const ITEMS_PER_PAGE = 6

  const [helpTooltipVisible, setHelpTooltipVisible] = useState(false)
  const [submitModalOpen, setSubmitModalOpen] = useState(false)
  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null)
  const [previewClosing, setPreviewClosing] = useState(false)
  const previewCloseTimerRef = useRef<number | null>(null)

  const handleExamplePreview = (e: React.MouseEvent, url: string) => {
    e.preventDefault()

    if (previewCloseTimerRef.current) {
      window.clearTimeout(previewCloseTimerRef.current)
      previewCloseTimerRef.current = null
    }

    setPreviewImageUrl(url)
    setPreviewClosing(false)
  }

  const closeImagePreview = () => {
    if (previewClosing) return

    setPreviewClosing(true)

    if (previewCloseTimerRef.current) {
      window.clearTimeout(previewCloseTimerRef.current)
    }

    previewCloseTimerRef.current = window.setTimeout(() => {
      setPreviewImageUrl(null)
      setPreviewClosing(false)
      previewCloseTimerRef.current = null
    }, 200)
  }

  useEffect(() => {
    return () => {
      if (previewCloseTimerRef.current) {
        window.clearTimeout(previewCloseTimerRef.current)
      }
    }
  }, [])

  const ImagePreviewModal: React.FC<{ url: string | null; isClosing: boolean; onClose: () => void }> = ({
    url,
    isClosing,
    onClose
  }) => {
    if (!url) return null

    return (
      <div
        className={cn(
          'fixed inset-0 z-[10003] flex items-center justify-center bg-black/70 p-5 duration-200',
          isClosing ? 'animate-out fade-out-0' : 'animate-in fade-in-0'
        )}
        onClick={onClose}>
        <div
          className={cn(
            'bg-card relative max-h-[90%] max-w-[90%] overflow-auto rounded-lg p-2.5 duration-200',
            isClosing ? 'animate-out fade-out-0 zoom-out-95' : 'animate-in fade-in-0 zoom-in-95'
          )}
          onClick={(e) => e.stopPropagation()}>
          <button
            className="bg-primary absolute top-1.5 right-1.5 z-10 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full text-sm text-white"
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

  const showNotification = useCallback((type: 'info' | 'error', message: string) => {
    console.log(`${type}: ${message}`)
    alert(message)
  }, [])

  const fetchCssData = useCallback(
    async (
      pageNum: number,
      initial = false,
      author: string | null = null,
      search: string | null = null,
      tag: string | null = null
    ) => {
      requestRef.current?.abort()
      const controller = new AbortController()
      requestRef.current = controller
      const sequence = ++requestSequence.current
      if (initial) setLoading(true)
      else setLoadingMore(true)
      try {
        const query = new URLSearchParams({
          limit: String(ITEMS_PER_PAGE),
          offset: String((pageNum - 1) * ITEMS_PER_PAGE)
        })
        if (author) query.set('author', author)
        if (search?.trim()) query.set('search', search.trim())
        if (tag) query.set('tag', tag)
        const response = await fetch(`/api/website/themes?${query}`, { signal: controller.signal })
        if (!response.ok) throw new Error(`HTTP ${response.status}`)
        const data = await response.json()
        if (!Array.isArray(data.items) || typeof data.total !== 'number') throw new Error('Invalid theme response')
        if (sequence !== requestSequence.current) return
        const modes: Record<string, 'light' | 'dark'> = {}
        for (const item of data.items as CssItem[]) modes[item.id] = item.light_mode ? 'light' : 'dark'
        setActiveImageMode((old) => ({ ...old, ...modes }))
        setCssItems((old) =>
          initial
            ? data.items
            : [...old, ...data.items].filter(
                (item, index, all) => all.findIndex((other) => other.id === item.id) === index
              )
        )
        setPage(pageNum)
        setHasMore(pageNum * ITEMS_PER_PAGE < data.total)
      } catch (error) {
        if (controller.signal.aborted) return
        console.error('Error fetching themes:', error)
        showNotification('error', t('theme_page.notifications.data_fetch_error'))
      } finally {
        if (sequence === requestSequence.current) {
          setLoading(false)
          setLoadingMore(false)
          setIsSearching(false)
        }
      }
    },
    [t, showNotification]
  )

  useEffect(() => {
    const search = parseSearchInput(searchTerm)
    void fetchCssData(1, true, authorFilter, search.plainText || null, tagFilter)
    return () => requestRef.current?.abort()
  }, [fetchCssData, authorFilter, searchTerm, tagFilter])

  const clearAllFilters = () => {
    setAuthorFilter(null)
    setTagFilter(null)
    setSearchTerm('')
    setSearchInputValue('')
  }
  const handleClearSearchInput = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    clearAllFilters()
  }
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const input = searchInputValue.trim()
    const parsed = parseSearchInput(input)
    setSearchTerm(input)
    setTagFilter(parsed.tags[0] ?? null)
    setAuthorFilter(parsed.authors[0] ?? null)
  }
  const buildSearchTerm = (tags: string[], authors: string[], plainText: string) =>
    [...tags.map((tag) => `#${tag}`), ...authors.map((author) => `@${author}`), plainText].filter(Boolean).join(' ')
  const updateSearchUI = (value: string) => {
    setSearchTerm(value)
    setSearchInputValue(value)
  }
  const handleTagClick = (tag: string) => {
    const parsed = parseSearchInput(searchTerm),
      next = tagFilter === tag ? null : tag
    setTagFilter(next)
    updateSearchUI(buildSearchTerm(next ? [next] : [], parsed.authors, parsed.plainText))
  }
  const handleAuthorClick = (author: string) => {
    const parsed = parseSearchInput(searchTerm),
      next = authorFilter === author ? null : author
    setAuthorFilter(next)
    updateSearchUI(buildSearchTerm(parsed.tags, next ? [next] : [], parsed.plainText))
  }
  const handleManualLoad = () => {
    if (!loading && !loadingMore && hasMore)
      void fetchCssData(page + 1, false, authorFilter, parseSearchInput(searchTerm).plainText || null, tagFilter)
  }
  const formatVersion = (version: string): string => version

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString)
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date
      .getDate()
      .toString()
      .padStart(2, '0')}`
  }

  const handleImageModeChange = (itemId: string, mode: 'light' | 'dark') => {
    setActiveImageMode((prev) => ({
      ...prev,
      [itemId]: mode
    }))
  }

  const getImageUrl = (url?: string): string => safePublicURL(url)

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

  const copyToClipboard = (text: string, itemId: string, type: 'code' | 'cdn') => {
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
                          <span className="rounded bg-white/90 px-3 py-1.5 text-sm font-medium text-black dark:bg-black/70 dark:text-white">
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

                          {item.cdn_link?.startsWith('http') && (
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

        <SubmitModal
          exampleImageURL={exampleImageURL}
          isOpen={submitModalOpen}
          onClose={() => setSubmitModalOpen(false)}
        />

        {previewImageUrl && (
          <ImagePreviewModal url={previewImageUrl} isClosing={previewClosing} onClose={closeImagePreview} />
        )}

        <Footer />
      </div>
    </ErrorBoundary>
  )
}

export default ThemePage
