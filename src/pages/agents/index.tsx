import './index.css'
import '../theme/index.css'
import '../theme/submit.css'

import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import agentsEn from '@/assets/data/agents-en.json'
import agentsZh from '@/assets/data/agents-zh.json'
import Footer from '@/components/website/Footer'

interface Template {
  id: string
  name: string
  group: string[]
  description: string
}

const AgentsPage: React.FC = () => {
  const { t, i18n } = useTranslation()
  const [templates, setTemplates] = useState<Template[]>([])
  const [searchText, setSearchText] = useState<string>('')
  const [filteredTemplates, setFilteredTemplates] = useState<Template[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const itemsPerPage = 100

  // 根据当前语言加载数据
  useEffect(() => {
    const data = i18n.language.startsWith('zh') ? agentsZh : agentsEn
    setTemplates(data)
    setFilteredTemplates(data)
    setCurrentPage(1) // 重置页码
  }, [i18n.language])

  // 搜索功能
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchText.trim()) {
      setFilteredTemplates(templates)
      return
    }

    const filtered = templates.filter(
      (template) =>
        template.name.toLowerCase().includes(searchText.toLowerCase()) ||
        template.description.toLowerCase().includes(searchText.toLowerCase()) ||
        template.group.some((tag) => tag.toLowerCase().includes(searchText.toLowerCase()))
    )
    setFilteredTemplates(filtered)
    setCurrentPage(1) // 重置页码
  }

  // 清除搜索
  const clearSearch = () => {
    setSearchText('')
    setFilteredTemplates(templates)
    setCurrentPage(1) // 重置页码
  }

  // TODO
  const showComingSoon = () => {
    alert('Coming Soon')
  }

  // TODO
  const subscribeAll = () => {
    alert('Coming Soon')
    // const langPrefix = i18n.language.startsWith('zh') ? 'zh' : 'en'
    // const url = `${window.location.origin}/agent/agents-${langPrefix}.json`
    // navigator.clipboard.writeText(url).then(() => alert(t('agents_page.copied')))
  }

  // TODO
  const copyUrl = () => {
    alert('Coming Soon')
    // const langPrefix = i18n.language.startsWith('zh') ? 'zh' : 'en'
    // const url = `${window.location.origin}/agent/${langPrefix}/${template.id}.json`
    // navigator.clipboard.writeText(url).then(() => alert(t('agents_page.copied')))
  }

  // 导出JSON功能
  const exportJson = (template: Template) => {
    const dataStr = JSON.stringify(template, null, 2)
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`
    const exportFileDefaultName = `${template.name}.json`

    const linkElement = document.createElement('a')
    linkElement.setAttribute('href', dataUri)
    linkElement.setAttribute('download', exportFileDefaultName)
    linkElement.click()
  }

  // 分页逻辑
  const totalPages = Math.ceil(filteredTemplates.length / itemsPerPage)
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredTemplates.slice(indexOfFirstItem, indexOfLastItem)

  // 页面切换处理
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
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
          marginTop: 120,
          position: 'relative',
          zIndex: 2,
          padding: '20px 0'
        }}>
        <div className="css-container">
          <h1 className="css-page-title">{t('agents_page.title')}</h1>
          <div className="css-page-description">
            <div>{t('agents_page.subtitle')}</div>
            <div className="css-buttons-container">
              <button className="css-submit-button" type="button" onClick={showComingSoon}>
                {t('agents_page.submit_agent')}
              </button>
              <button className="css-subcribe-button" type="button" onClick={subscribeAll}>
                {t('agents_page.subscribe_all')}
              </button>
            </div>
          </div>

          {/* 搜索框 */}
          <div className="css-search-container">
            <form className="css-search-form" onSubmit={handleSearch}>
              <input
                type="text"
                className="css-search-input"
                placeholder={t('agents_page.search_placeholder')}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <button type="submit" className="css-search-button">
                <span className="css-icon-search"></span>
                {t('agents_page.search_button')}
              </button>
              {searchText && (
                <button className="css-search-clear" type="button" onClick={clearSearch}>
                  ×
                </button>
              )}
            </form>
          </div>

          {/* 卡片网格 */}
          <div className="css-grid-4">
            {currentItems.map((template) => (
              <div className="css-card" key={template.id}>
                <div className="css-card-content-4">
                  <div className="css-card-header">
                    <h3 className="css-card-name-4">{template.name}</h3>
                  </div>

                  <div className="css-card-title-container">
                    {Array.isArray(template.group) &&
                      template.group.map((tag: string, index: number) => (
                        <span className="css-card-title-tag" key={index}>
                          {tag}
                        </span>
                      ))}
                  </div>

                  <div className="css-card-description small" style={{ margin: '16px 0', color: '#606266' }}>
                    {template.description.length > 100
                      ? `${template.description.substring(0, 100)}...`
                      : template.description}
                  </div>

                  <div className="css-card-actions-4">
                    <button className="css-btn primary small" type="button" onClick={() => copyUrl()}>
                      {t('agents_page.copy_url')}
                    </button>
                    <button className="css-btn secondary small" type="button" onClick={() => exportJson(template)}>
                      {t('agents_page.export_json')}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 分页组件 */}
          {totalPages > 1 && (
            <div className="css-pagination">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="css-btn secondary css-pagination-btn"
                type="button">
                {t('agents_page.previous')}
              </button>

              <div className="css-pagination-info">
                {currentPage} / {totalPages}
              </div>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="css-btn secondary css-pagination-btn"
                type="button">
                {t('agents_page.next')}
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default AgentsPage
