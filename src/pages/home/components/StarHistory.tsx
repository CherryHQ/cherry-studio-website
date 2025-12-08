import { FC, memo, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

const StarHistory: FC = () => {
  const { t } = useTranslation()

  useEffect(() => {
    const API_URL = 'https://data1.cherry-ai.com/items/github_cherrystudio'
    let chart: any = null
    let fullData: any = null
    let startPicker: any = null
    let endPicker: any = null

    function initDatePickers(data: any) {
      const dates = data.data.cherrystudio_data.starHistory.map((item: any) => item.date)
      const minDate = dates[0]
      const maxDate = dates[dates.length - 1]

      const config = {
        dateFormat: 'Y-m-d',
        minDate: minDate,
        maxDate: maxDate,
        locale: 'zh',
        onChange: function () {
          updateChartData()
        }
      }

      startPicker = window.flatpickr('#startDate', config)
      endPicker = window.flatpickr('#endDate', config)
    }

    function updateChartData() {
      if (!fullData) return

      const startDate = startPicker.selectedDates[0]
      const endDate = endPicker.selectedDates[0]

      if (!startDate || !endDate) return

      const filteredData = {
        ...fullData,
        data: {
          ...fullData.data,
          cherrystudio_data: {
            ...fullData.data.cherrystudio_data,
            starHistory: fullData.data.cherrystudio_data.starHistory.filter((item: any) => {
              const date = new Date(item.date)
              return date >= startDate && date <= endDate
            })
          }
        }
      }

      renderChart(filteredData)
    }

    function renderChart(data: any) {
      const chartDom = document.getElementById('star-history-chart')
      chart = chart || window.echarts.init(chartDom)

      const isMobile = window.innerWidth <= 768
      const starHistory = data.data.cherrystudio_data.starHistory

      const option = {
        animation: true,
        animationDuration: 2000,
        animationEasing: 'cubicInOut',
        color: ['#FF6262', '#62DDFF'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          formatter: function (params: any) {
            const date = new Date(params[0].value[0])
            const yearSuffix = t('star_history.year_suffix')
            const monthSuffix = t('star_history.month_suffix')
            const daySuffix = t('star_history.day_suffix')
            const dateStr = yearSuffix
              ? `${date.getFullYear()}${yearSuffix}${date.getMonth() + 1}${monthSuffix}${date.getDate()}${daySuffix}`
              : `${date.getFullYear()}${monthSuffix}${date.getMonth() + 1}${monthSuffix}${date.getDate()}`
            let html = `<div style="font-weight:bold">${dateStr}</div>`
            params.forEach((param: any) => {
              const value = param.value[1]
              const name =
                param.seriesName === t('star_history.total_stars')
                  ? t('star_history.cumulative_stars')
                  : t('star_history.daily_increase')
              html += `<div style="color:${param.color}">${name}: ${value}</div>`
            })
            return html
          }
        },
        grid: {
          right: '15%',
          left: '10%',
          bottom: isMobile ? '15%' : '25%',
          containLabel: true
        },
        toolbox: {
          feature: {
            dataView: {
              show: true,
              readOnly: false,
              lang: [t('star_history.data_view'), t('star_history.close'), t('star_history.refresh')]
            },
            restore: {
              show: true,
              title: t('star_history.restore')
            },
            saveAsImage: {
              show: true,
              title: t('star_history.save_as_image')
            }
          }
        },
        legend: {
          data: [t('star_history.total_stars'), t('star_history.daily_stars')]
        },
        xAxis: {
          type: 'time',
          boundaryGap: true,
          axisLabel: {
            formatter: function (value: any) {
              const date = new Date(value)
              const month = date.getMonth() + 1
              const day = date.getDate()
              const yearSuffix = t('star_history.year_suffix')
              const monthSuffix = t('star_history.month_suffix')
              const daySuffix = t('star_history.day_suffix')

              if (isMobile) {
                return yearSuffix ? `${month}${monthSuffix}${day}` : `${month}/${day}`
              }
              if (month === 1 && day === 1) {
                return yearSuffix ? `${date.getFullYear()}${yearSuffix}` : `${date.getFullYear()}`
              }
              return yearSuffix ? `${month}${monthSuffix}${day}${daySuffix}` : `${month}/${day}`
            },
            fontSize: isMobile ? 10 : 12,
            rotate: 45,
            interval: 'auto',
            hideOverlap: true
          }
        },
        yAxis: [
          {
            type: 'value',
            name: t('star_history.total_stars'),
            position: 'left',
            axisLine: {
              show: true,
              lineStyle: {
                color: '#FF6262'
              }
            },
            axisLabel: {
              fontSize: isMobile ? 10 : 12
            }
          },
          {
            type: 'value',
            name: t('star_history.daily_stars'),
            position: 'right',
            axisLine: {
              show: true,
              lineStyle: {
                color: '#62DDFF'
              }
            },
            axisLabel: {
              fontSize: isMobile ? 10 : 12
            }
          }
        ],
        dataZoom: [
          {
            type: 'inside',
            start: 0,
            end: 100
          },
          {
            show: true,
            type: 'slider',
            start: 0,
            end: 100,
            bottom: isMobile ? '2%' : '5%',
            backgroundColor: '#f5f5f5',
            borderColor: 'transparent',
            fillerColor: 'rgba(255, 98, 98, 0.1)',
            selectedDataBackground: {
              lineStyle: {
                color: '#FF6262'
              },
              areaStyle: {
                color: '#FF6262'
              }
            },
            textStyle: {
              color: '#666',
              fontSize: 12
            },
            handleIcon: 'path://M-9.5,0a9.5,9.5,0,1,1,19,0a9.5,9.5,0,1,1,-19,0Z',
            handleSize: '16',
            handleStyle: {
              color: '#fff',
              borderColor: '#FF6262',
              borderWidth: 1,
              shadowBlur: 3,
              shadowColor: 'rgba(0, 0, 0, 0.6)',
              shadowOffsetX: 2,
              shadowOffsetY: 2
            },
            moveHandleStyle: {
              color: '#FF6262'
            },
            emphasis: {
              handleStyle: {
                borderColor: '#FF6262',
                color: '#FF6262'
              }
            },
            dataBackground: {
              lineStyle: {
                color: '#ddd'
              },
              areaStyle: {
                color: '#f5f5f5'
              }
            },
            height: isMobile ? 30 : 45
          }
        ],
        series: [
          {
            name: t('star_history.total_stars'),
            type: 'line',
            smooth: true,
            data: starHistory.map((item: any) => [item.date, item.total_stars]),
            lineStyle: {
              width: 2,
              color: '#FF6262'
            },
            areaStyle: {
              color: new window.echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgba(255, 98, 98, 0.3)'
                },
                {
                  offset: 1,
                  color: 'rgba(255, 98, 98, 0.05)'
                }
              ])
            }
          },
          {
            name: t('star_history.daily_stars'),
            type: 'bar',
            yAxisIndex: 1,
            data: starHistory.map((item: any) => [item.date, item.new_stars]),
            itemStyle: {
              color: new window.echarts.graphic.LinearGradient(0, 1, 0, 0, [
                {
                  offset: 0,
                  color: '#62DDFF'
                },
                {
                  offset: 1,
                  color: '#62DDFF'
                }
              ]),
              borderRadius: [4, 4, 0, 0]
            },
            emphasis: {
              itemStyle: {
                color: new window.echarts.graphic.LinearGradient(0, 1, 0, 0, [
                  {
                    offset: 0,
                    color: '#33d6ff'
                  },
                  {
                    offset: 1,
                    color: '#33d6ff'
                  }
                ])
              }
            }
          }
        ]
      }

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              chart.setOption(option)
              observer.unobserve(entry.target)
            }
          })
        },
        { threshold: 0.2 }
      )

      if (chartDom) {
        observer.observe(chartDom)
      }
    }

    window.addEventListener('resize', () => {
      chart?.resize()
      if (fullData) {
        renderChart(fullData)
      }
    })

    function renderContributors(data: any) {
      const contributorsList = document.getElementById('contributors-list')
      const contributors = data.data.cherrystudio_data.contributors.contributors
      const sortedContributors = contributors.sort((a: any, b: any) => b.contributions - a.contributions)

      // 修正字段路径 - 从 data.data 获取 show_contributor_count
      const showCount = data.data.show_contributor_count || sortedContributors.length

      // 添加调试日志
      console.log('项目贡献者总数:', sortedContributors.length)
      console.log('显示数量设置:', data.data.show_contributor_count)
      console.log('实际显示数量:', showCount)

      // 只显示指定数量的贡献者
      const displayContributors = sortedContributors.slice(0, showCount)

      // 获取翻译文本
      const projectContributorsText = t('contributors.project_contributors')
      const partialText = t('contributors.partial')

      // 更新标题，仅当显示的数量小于总数时才显示"(部分)"
      const titleElement = document.querySelector('.contributors-section .heading_title')
      if (titleElement) {
        if (showCount < sortedContributors.length) {
          titleElement.innerHTML = `${projectContributorsText}<span class="contributor-partial">${partialText}</span>`
        } else {
          titleElement.innerHTML = projectContributorsText
        }
      }

      if (contributorsList) {
        contributorsList.innerHTML = displayContributors
          .map((contributor: any) => {
            // 为每个贡献者生成翻译文本
            const contributionStats = t('contributors.contribution_stats', {
              contributions: contributor.contributions,
              rate: contributor.contribution_rate.toFixed(1)
            })

            return `
    <a href="${contributor.html_url}" target="_blank" class="contributor-item">
      <div class="contributor-avatar">
        <img src="${contributor.avatar_url}" alt="${contributor.login}">
      </div>
      <div class="contributor-info">
        <div class="contributor-name">${contributor.login}</div>
        <div class="contributor-details">
          ${contributionStats}
        </div>
      </div>
    </a>
  `
          })
          .join('')
      }
    }

    function renderTelegramStats(data: any) {
      const telegramData = data.data.cherrystudio_data.telegram
      const titleSection = document.querySelector('.cta-section .section_heading')

      // 检查是否已经存在 telegram-stats，如果存在则先移除
      const existingStats = document.querySelector('.telegram-stats')
      if (existingStats) {
        existingStats.remove()
      }

      // 获取翻译文本
      const channelMembersText = t('telegram.channel_members')
      const currentOnlineText = t('telegram.current_online')

      const statsHtml = `
    <div class="telegram-stats">
      <div class="stats-item">
        <span>${telegramData.title}</span>
      </div>
      <div class="stats-item">
        <span>${channelMembersText}</span>
        <span class="stats-number">${telegramData.members}</span>
      </div>
      <div class="stats-item">
        <span>${currentOnlineText}</span>
        <span class="stats-number">${telegramData.online}</span>
      </div>
    </div>
  `

      if (titleSection) {
        titleSection.insertAdjacentHTML('afterend', statsHtml)
      }
    }

    function updateFunFacts(data: any) {
      const repoData = data.data.cherrystudio_data.repo
      const contributorsStats = data.data.cherrystudio_data.contributors.stats

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const daysCount = document.getElementById('days-count')
              const contributorsCount = document.getElementById('contributors-count')
              const starsCount = document.getElementById('stars-count')

              animateValue(daysCount, 0, repoData.age_days, 2000)
              animateValue(contributorsCount, 0, contributorsStats.total_contributors, 2000)
              animateValue(starsCount, 0, repoData.stars, 2000)

              observer.unobserve(entry.target)
            }
          })
        },
        { threshold: 0.2 }
      )

      const funFactsSection = document.querySelector('.fun-facts-section')

      if (funFactsSection) {
        observer.observe(funFactsSection)
      }

      function animateValue(element: any, start: any, end: any, duration: any) {
        let startTimestamp: any = null
        const step = (timestamp: any) => {
          if (!startTimestamp) startTimestamp = timestamp
          const progress = Math.min((timestamp - startTimestamp) / duration, 1)
          const current = Math.floor(progress * (end - start) + start)
          element.textContent = current
          if (progress < 1) {
            window.requestAnimationFrame(step)
          } else {
            element.textContent = end
          }
        }
        window.requestAnimationFrame(step)
      }
    }

    async function fetchData() {
      try {
        const response = await fetch(API_URL)
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
        const data = await response.json()
        fullData = data
        renderChart(data)
        initDatePickers(data)
        renderContributors(data)
        renderTelegramStats(data)
        updateFunFacts(data)
      } catch (error) {
        console.error('Error:', error)
      }
    }

    fetchData()
  }, [t])

  return <div id="star-history-chart" className="star-history-chart"></div>
}

export default memo(StarHistory)
