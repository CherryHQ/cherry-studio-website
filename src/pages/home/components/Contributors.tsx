import { FC, useEffect } from 'react'
import styled from 'styled-components'

const Contributors: FC = () => {
  useEffect(() => {
    function renderDocContributors(data: any) {
      const contributorsList = document.getElementById('doc-contributors-list')
      const contributors = data.data.contributors.contributors
      const sortedContributors = contributors.sort((a: any, b: any) => b.contributions - a.contributions)

      // 获取要显示的贡献者数量，如果未指定则显示全部
      const showCount = data.data.show_contributor_count || sortedContributors.length

      // 添加调试日志
      console.log('文档贡献者总数:', sortedContributors.length)
      console.log('显示数量设置:', data.data.show_contributor_count)
      console.log('实际显示数量:', showCount)

      // 只显示指定数量的贡献者
      const displayContributors = sortedContributors.slice(0, showCount)

      // 更新标题，仅当显示的数量小于总数时才显示"(部分)"
      const titleElement = document.querySelector('.doc-contributors-section .heading_title')
      if (titleElement) {
        if (showCount < sortedContributors.length) {
          titleElement.innerHTML = '文档贡献者<span class="contributor-partial">(部分)</span>'
        } else {
          titleElement.innerHTML = '文档贡献者'
        }
      }

      if (contributorsList) {
        contributorsList.innerHTML = displayContributors
          .map(
            (contributor: any) => `
              <a href="${contributor.html_url}" target="_blank" class="contributor-item">
                <div class="contributor-avatar">
                  <img src="${contributor.avatar_url}" alt="${contributor.login}">
                </div>
                <div class="contributor-info">
                  <div class="contributor-name">${contributor.login}</div>
                  <div class="contributor-details">
                    贡献: ${contributor.contributions} commits (${contributor.contribution_rate.toFixed(1)}%)
                  </div>
                </div>
              </a>
            `
          )
          .join('')
      }
    }

    async function fetchDocContributors() {
      try {
        const response = await fetch('https://data1.cherry-ai.com:48443/items/cherry_docs_contributors')
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
        const data = await response.json()
        renderDocContributors(data)
      } catch (error) {
        console.error('Error fetching doc contributors:', error)
      }
    }

    fetchDocContributors()
  }, [])

  return (
    <Container>
      {/* <!-- Contributors Section --> */}
      <section className="contributors-section">
        <div className="auto-container">
          <div className="sec-title text-center">
            <h2 className="heading_title">项目贡献者</h2>
          </div>
          <div className="contributors-wrapper">
            <div id="contributors-list" className="contributors-list"></div>
          </div>
        </div>
      </section>

      {/* <!-- Doc Contributors Section --> */}
      <section className="contributors-section doc-contributors-section">
        <div className="auto-container">
          <div className="sec-title text-center">
            <h2 className="heading_title">文档贡献者</h2>
          </div>
          <div className="contributors-wrapper">
            <div id="doc-contributors-list" className="contributors-list"></div>
          </div>
        </div>
      </section>
    </Container>
  )
}

const Container = styled.div``

export default Contributors
