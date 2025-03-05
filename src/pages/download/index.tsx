import { FC, useEffect } from 'react'
import './index.css'
import Header from '@/components/website/Header'
import Footer from '@/components/website/Footer'

const DownloadPage: FC = () => {
  useEffect(() => {
    setTimeout(function () {
      // 隐藏加载动画
      document?.querySelector('.preloader')?.classList.add('loaded')
      // 显示页面内容
      document?.querySelector('.page-wrapper')?.classList.add('loaded')
    }, 500) // 添加一个小延迟，确保动画流畅

    // 如果加载时间超过3秒，也显示页面内容（防止加载卡住）
    setTimeout(function () {
      document?.querySelector('.preloader')?.classList.add('loaded')
      document?.querySelector('.page-wrapper')?.classList.add('loaded')
    }, 3000)
  }, [])

  useEffect(() => {
    fetch('https://data1.cherry-ai.com:48443/items/cherry_version')
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData)
        // Extract data from the new API structure
        const data = responseData.data.cherry_version
        const version = data.version
        const cleanVersion = version.replace(/^v/, '')
        const publishedAt = new Date(data.published_at).toLocaleDateString()
        const changelog = data.body
        const downloads = data.assets

        // 检查是否为移动设备
        function isMobileDevice() {
          return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
        }

        // 获取系统和架构信息
        function getSystemInfo() {
          if (isMobileDevice()) {
            return null
          }

          const ua = navigator.userAgent.toLowerCase()
          const platform = navigator.platform.toLowerCase()

          // Windows 系统检测
          if (ua.includes('windows') || platform.includes('win')) {
            return {
              name: `Cherry-Studio-${cleanVersion}-setup.exe`,
              url: `https://github.com/CherryHQ/cherry-studio/releases/download/${version}/Cherry-Studio-${cleanVersion}-setup.exe`,
              type: 'Windows',
              arch: ua.includes('win64') || ua.includes('wow64') ? 'x64' : 'x86'
            }
          }

          // macOS 系统检测
          if (ua.includes('mac') || platform.includes('mac')) {
            // 检测是否为 Apple Silicon
            // @ts-expect-error 忽略类型错误
            const isAppleSilicon = ua.includes('arm64') || (ua.includes('mac') && window.navigator.cpuClass === 'arm64')

            return {
              name: `Cherry-Studio-${cleanVersion}-${isAppleSilicon ? 'arm64' : 'x64'}.dmg`,
              url: `https://github.com/CherryHQ/cherry-studio/releases/download/${version}/Cherry-Studio-${cleanVersion}-${
                isAppleSilicon ? 'arm64' : 'x64'
              }.dmg`,
              type: `macOS (${isAppleSilicon ? 'M芯片' : 'Intel芯片'})`,
              arch: isAppleSilicon ? 'arm64' : 'x64'
            }
          }

          // Linux 系统检测
          if (ua.includes('linux') || platform.includes('linux')) {
            return {
              name: `Cherry-Studio-${cleanVersion}-x86_64.AppImage`,
              url: `https://github.com/CherryHQ/cherry-studio/releases/download/${version}/Cherry-Studio-${cleanVersion}-x86_64.AppImage`,
              type: 'Linux',
              arch: 'x86_64'
            }
          }

          return null
        }

        // 修改 downloadUrls 对象结构
        const downloadUrls = {
          windows: {
            title: 'Windows系统安装包',
            items: [
              {
                name: `Cherry-Studio-${cleanVersion}-setup.exe`,
                url: `https://github.com/CherryHQ/cherry-studio/releases/download/${version}/Cherry-Studio-${cleanVersion}-setup.exe`,
                desc: 'Windows标准安装包【主下载线路】'
              },
              {
                name: `Cherry-Studio-${cleanVersion}-setup.exe`,
                url: `https://download-cf.ocoolai.com/https://github.com/CherryHQ/cherry-studio/releases/download/${version}/Cherry-Studio-${cleanVersion}-setup.exe`,
                desc: 'Windows标准安装包【备用下载线路1】'
              },
              {
                name: `Cherry-Studio-${cleanVersion}-setup.exe`,
                url: `https://download.ocoolai.com/https://github.com/CherryHQ/cherry-studio/releases/download/${version}/Cherry-Studio-${cleanVersion}-setup.exe`,
                desc: 'Windows标准安装包【备用下载线路2】'
              },
              {
                name: `Cherry-Studio-${cleanVersion}-setup.exe`,
                url: `https://download.ocoolai.online/https://github.com/CherryHQ/cherry-studio/releases/download/${version}/Cherry-Studio-${cleanVersion}-setup.exe`,
                desc: 'Windows标准安装包【备用下载线路3】'
              },
              {
                name: `Cherry-Studio-${cleanVersion}-portable.exe`,
                url: `https://github.com/CherryHQ/cherry-studio/releases/download/${version}/Cherry-Studio-${cleanVersion}-portable.exe`,
                desc: 'Windows便携版【主下载线路】'
              },
              {
                name: `Cherry-Studio-${cleanVersion}-portable.exe`,
                url: `https://download-cf.ocoolai.com/https://github.com/CherryHQ/cherry-studio/releases/download/${version}/Cherry-Studio-${cleanVersion}-portable.exe`,
                desc: 'Windows便携版【备用下载线路1】'
              },
              {
                name: `Cherry-Studio-${cleanVersion}-portable.exe`,
                url: `https://download.ocoolai.com/https://github.com/CherryHQ/cherry-studio/releases/download/${version}/Cherry-Studio-${cleanVersion}-portable.exe`,
                desc: 'Windows便携版【备用下载线路2】'
              },
              {
                name: `Cherry-Studio-${cleanVersion}-portable.exe`,
                url: `https://download.ocoolai.online/https://github.com/CherryHQ/cherry-studio/releases/download/${version}/Cherry-Studio-${cleanVersion}-portable.exe`,
                desc: 'Windows便携版【备用下载线路3】'
              }
            ]
          },
          macos: {
            title: 'MacOS系统安装包',
            items: [
              {
                name: `Cherry-Studio-${cleanVersion}-x64.dmg`,
                url: `https://github.com/CherryHQ/cherry-studio/releases/download/${version}/Cherry-Studio-${cleanVersion}-x64.dmg`,
                desc: 'Intel芯片Mac【主下载线路】'
              },
              {
                name: `Cherry-Studio-${cleanVersion}-x64.dmg`,
                url: `https://download-cf.ocoolai.com/https://github.com/CherryHQ/cherry-studio/releases/download/${version}/Cherry-Studio-${cleanVersion}-x64.dmg`,
                desc: 'Intel芯片Mac【备用下载线路1】'
              },
              {
                name: `Cherry-Studio-${cleanVersion}-x64.dmg`,
                url: `https://download.ocoolai.com/https://github.com/CherryHQ/cherry-studio/releases/download/${version}/Cherry-Studio-${cleanVersion}-x64.dmg`,
                desc: 'Intel芯片Mac【备用下载线路2】'
              },
              {
                name: `Cherry-Studio-${cleanVersion}-x64.dmg`,
                url: `https://download.ocoolai.online/https://github.com/CherryHQ/cherry-studio/releases/download/${version}/Cherry-Studio-${cleanVersion}-x64.dmg`,
                desc: 'Intel芯片Mac【备用下载线路3】'
              },
              {
                name: `Cherry-Studio-${cleanVersion}-arm64.dmg`,
                url: `https://github.com/CherryHQ/cherry-studio/releases/download/${version}/Cherry-Studio-${cleanVersion}-arm64.dmg`,
                desc: 'Apple Silicon芯片Mac【主下载线路】'
              },
              {
                name: `Cherry-Studio-${cleanVersion}-arm64.dmg`,
                url: `https://download-cf.ocoolai.com/https://github.com/CherryHQ/cherry-studio/releases/download/${version}/Cherry-Studio-${cleanVersion}-arm64.dmg`,
                desc: 'Apple Silicon芯片Mac【备用下载线路1】'
              },
              {
                name: `Cherry-Studio-${cleanVersion}-arm64.dmg`,
                url: `https://download.ocoolai.com/https://github.com/CherryHQ/cherry-studio/releases/download/${version}/Cherry-Studio-${cleanVersion}-arm64.dmg`,
                desc: 'Apple Silicon芯片Mac【备用下载线路2】'
              },
              {
                name: `Cherry-Studio-${cleanVersion}-arm64.dmg`,
                url: `https://download.ocoolai.online/https://github.com/CherryHQ/cherry-studio/releases/download/${version}/Cherry-Studio-${cleanVersion}-arm64.dmg`,
                desc: 'Apple Silicon芯片Mac【备用下载线路3】'
              }
            ]
          },
          linux: {
            title: 'Linux系统安装包',
            items: [
              {
                name: `Cherry-Studio-${cleanVersion}-x86_64.AppImage`,
                url: `https://github.com/CherryHQ/cherry-studio/releases/download/${version}/Cherry-Studio-${cleanVersion}-x86_64.AppImage`,
                desc: 'x86_64架构【主下载线路】'
              },
              {
                name: `Cherry-Studio-${cleanVersion}-x86_64.AppImage`,
                url: `https://download-cf.ocoolai.com/https://github.com/CherryHQ/cherry-studio/releases/download/${version}/Cherry-Studio-${cleanVersion}-x86_64.AppImage`,
                desc: 'x86_64架构【备用下载线路1】'
              },
              {
                name: `Cherry-Studio-${cleanVersion}-x86_64.AppImage`,
                url: `https://download.ocoolai.com/https://github.com/CherryHQ/cherry-studio/releases/download/${version}/Cherry-Studio-${cleanVersion}-x86_64.AppImage`,
                desc: 'x86_64架构【备用下载线路2】'
              },
              {
                name: `Cherry-Studio-${cleanVersion}-x86_64.AppImage`,
                url: `https://download.ocoolai.online/https://github.com/CherryHQ/cherry-studio/releases/download/${version}/Cherry-Studio-${cleanVersion}-x86_64.AppImage`,
                desc: 'x86_64架构【备用下载线路3】'
              },
              {
                name: `Cherry-Studio-${cleanVersion}-arm64.AppImage`,
                url: `https://github.com/CherryHQ/cherry-studio/releases/download/${version}/Cherry-Studio-${cleanVersion}-arm64.AppImage`,
                desc: 'ARM架构【主下载线路】'
              },
              {
                name: `Cherry-Studio-${cleanVersion}-arm64.AppImage`,
                url: `https://download-cf.ocoolai.com/https://github.com/CherryHQ/cherry-studio/releases/download/${version}/Cherry-Studio-${cleanVersion}-arm64.AppImage`,
                desc: 'ARM架构【备用下载线路1】'
              },
              {
                name: `Cherry-Studio-${cleanVersion}-arm64.AppImage`,
                url: `https://download.ocoolai.com/https://github.com/CherryHQ/cherry-studio/releases/download/${version}/Cherry-Studio-${cleanVersion}-arm64.AppImage`,
                desc: 'ARM架构【备用下载线路2】'
              },
              {
                name: `Cherry-Studio-${cleanVersion}-arm64.AppImage`,
                url: `https://download.ocoolai.online/https://github.com/CherryHQ/cherry-studio/releases/download/${version}/Cherry-Studio-${cleanVersion}-arm64.AppImage`,
                desc: 'ARM架构【备用下载线路3】'
              }
            ]
          }
        }

        const systemInfo = getSystemInfo()

        // 更新页面标题和发布时间
        document.getElementById('version-title')!.textContent = `Cherry Studio ${version}`
        document.getElementById('published-at')!.textContent = `发布时间：${publishedAt}`

        // 获取下载按钮容器
        const downloadButtons = document.querySelector('.download-buttons')

        // 如果是移动设备或无法匹配系统，隐藏主下载区域
        if (!systemInfo) {
          // @ts-expect-error 忽略类型错误
          downloadButtons!.style.display = 'none'
        } else {
          // 设置系统提示和下载信息
          const systemInfoElement = document.createElement('div')
          systemInfoElement.className = 'system-info'
          const matchedDownload = downloads.find((item: any) =>
            item.name.toLowerCase().includes(systemInfo.name.toLowerCase())
          )
          systemInfoElement.innerHTML = `
                        <p>您的系统为 <strong>${systemInfo.type}</strong></p>
                        <p>建议下载 <strong>${systemInfo.name}</strong>${
            matchedDownload ? ` (${(matchedDownload.size / 1024 / 1024).toFixed(1)} MB)` : ''
          }</p>
                    `

          // 插入系统信息
          downloadButtons!.insertBefore(systemInfoElement, downloadButtons!.firstChild)

          // 设置主下载按钮
          const mainDownloadBtn = document.getElementById('main-download-btn')
          mainDownloadBtn!.textContent = '立即下载'
          mainDownloadBtn!.addEventListener('click', function () {
            window.location.href = systemInfo.url
          })
        }

        // 显示更新日志
        const changelogElement = document.getElementById('changelog')
        changelogElement!.innerHTML = `
                    <div class="changelog-header">
                        <h2>更新日志</h2>
                        <p class="changelog-version">版本 ${version}</p>
                    </div>
                    <div class="changelog-content">
                        ${window.marked.parse(changelog)}
                    </div>
                `

        // 修改显示其他版本下载链接的逻辑
        const downloadList = document.getElementById('download-list')
        downloadList!.innerHTML = '' // 清空现有内容

        // 遍历显示所有下载链接
        Object.values(downloadUrls).forEach(({ title, items }) => {
          // 创建系统类别标题
          const groupTitle = document.createElement('h3')
          groupTitle.textContent = title
          groupTitle.style.marginTop = '20px'
          downloadList!.appendChild(groupTitle)

          // 创建该系统下的所有下载项
          items.forEach(({ name, url, desc }) => {
            const li = document.createElement('li')
            const button = document.createElement('button')
            button.className = 'download-item-btn'

            // 查找匹配的下载信息以获取文件大小
            const matchedDownload = downloads.find((item: any) => {
              // 添加调试日志
              console.log('Comparing:', {
                downloadName: item.name.toLowerCase(),
                searchName: name.toLowerCase()
              })
              return item.name.toLowerCase().includes(name.toLowerCase())
            })

            // 如果没找到匹配项，也记录一下
            if (!matchedDownload) {
              console.log('No size found for:', name)
              console.log('Available downloads:', downloads)
            }

            // 构建按钮文本
            const buttonText = `${name}${
              matchedDownload ? ` (${(matchedDownload.size / 1024 / 1024).toFixed(1)} MB)` : ''
            } - ${desc}`
            button.textContent = buttonText

            button.addEventListener('click', function () {
              window.location.href = url
            })

            li.appendChild(button)
            downloadList!.appendChild(li)
          })
        })

        // 检测用户代理并调整下载按钮显示
        const userAgent = navigator.userAgent || navigator.vendor
        const isMac = /Macintosh|MacIntel|MacPPC|Mac68K/i.test(userAgent)

        if (isMac) {
          // 显示 Apple 芯片和 Intel 芯片下载按钮
          $('#apple-download-btn').show()
          $('#intel-download-btn').show()
          $('#main-download-btn').hide()
          $('#system-name').text('MacOS')

          // 绑定下载链接（使用实际的版本号）
          $('#apple-download-btn').on('click', function () {
            window.location.href = `https://github.com/CherryHQ/cherry-studio/releases/download/${version}/Cherry-Studio-${cleanVersion}-arm64.dmg`
          })

          $('#intel-download-btn').on('click', function () {
            window.location.href = `https://github.com/CherryHQ/cherry-studio/releases/download/${version}/Cherry-Studio-${cleanVersion}-x64.dmg`
          })
        } else {
          $('#apple-download-btn').hide()
          $('#intel-download-btn').hide()
          $('#main-download-btn').show()
          $('#system-name').text(getSystemName())
        }

        // 检测系统信息
        function detectSystem() {
          const userAgent = navigator.userAgent.toLowerCase()
          let systemName = ''
          let recommendedVersion = ''
          let architecture = ''

          // 检测 Windows 系统
          if (userAgent.includes('win')) {
            systemName = 'Windows'
            // 检测 Windows 架构
            if (userAgent.includes('win64') || userAgent.includes('wow64')) {
              architecture = '64位'
              systemName = 'Windows (64位)'
            } else if (userAgent.includes('win32')) {
              architecture = '32位'
              systemName = 'Windows (32位)'
            }
          }
          // 检测 macOS 系统
          else if (userAgent.includes('mac')) {
            systemName = 'macOS'
            // 检测 Mac 芯片
            if (userAgent.includes('arm') || userAgent.includes('aarch64')) {
              architecture = 'Apple Silicon'
              systemName = 'macOS'
            } else {
              architecture = 'Intel'
              systemName = 'macOS'
            }
          }
          // 检测 Linux 系统
          else if (userAgent.includes('linux')) {
            systemName = 'Linux'
            // 检测 Linux 架构
            if (userAgent.includes('x86_64') || userAgent.includes('amd64')) {
              architecture = 'x86_64'
              systemName = 'Linux (x86_64)'
            } else if (userAgent.includes('aarch64')) {
              architecture = 'ARM64'
              systemName = 'Linux (ARM64)'
            } else if (userAgent.includes('armv7')) {
              architecture = 'ARM32'
              systemName = 'Linux (ARM32)'
            }
          } else {
            systemName = '未知系统'
            architecture = '未知架构'
          }

          // 更新系统名称
          document.getElementById('system-name')!.textContent = systemName

          // 从 API 获取最新版本信息
          fetch('https://data1.cherry-ai.com:48443/items/cherry_version')
            .then((response) => response.json())
            .then((responseData) => {
              const data = responseData.data.cherry_version
              const version = data.version
              // 根据系统和架构设置对应的文件名
              if (userAgent.includes('win')) {
                if (architecture === '64位') {
                  recommendedVersion = `Cherry-Studio-${version}-win-x64.exe`
                } else {
                  recommendedVersion = `Cherry-Studio-${version}-win-ia32.exe`
                }
              } else if (userAgent.includes('mac')) {
                if (architecture === 'Apple Silicon') {
                  recommendedVersion = `Cherry-Studio-${version}-mac-arm64.dmg`
                } else {
                  recommendedVersion = `Cherry-Studio-${version}-mac-x64.dmg`
                }
              } else if (userAgent.includes('linux')) {
                if (architecture === 'x86_64') {
                  recommendedVersion = `Cherry-Studio-${version}-linux-x64.AppImage`
                } else if (architecture === 'ARM64') {
                  recommendedVersion = `Cherry-Studio-${version}-linux-arm64.AppImage`
                } else {
                  recommendedVersion = `Cherry-Studio-${version}-linux-armv7l.AppImage`
                }
              } else {
                recommendedVersion = `Cherry-Studio-${version}-universal.zip`
              }
              document.getElementById('recommended-version')!.textContent = recommendedVersion
            })
            .catch((error) => {
              console.error('获取版本信息失败：', error)
              document.getElementById('recommended-version')!.textContent = '获取版本信息失败'
            })

          // 显示系统信息区域
          document.querySelector('.system-info')!.classList.add('loaded')
        }

        // 页面加载完成后执行
        document.addEventListener('DOMContentLoaded', function () {
          detectSystem()
        })

        // 获取系统名称的辅助函数
        function getSystemName() {
          const ua = navigator.userAgent.toLowerCase()
          if (ua.includes('win')) return 'Windows'
          if (ua.includes('linux')) return 'Linux'
          return '其他系统'
        }
      })
      .catch((error) => {
        console.error('获取版本信息失败：', error)
        document.getElementById('version-title')!.textContent = '无法获取版本信息，请暂时通过网盘链接下载'
      })
  }, [])

  return (
    <>
      {/* <!-- 加载动画 --> */}
      <div className="preloader">
        <div className="loader"></div>
      </div>

      <div className="page-wrapper">
        <Header />

        {/* <!-- 下载页面内容 --> */}
        <section className="download-section">
          <div className="auto-container">
            <div className="version-info">
              <h1 id="version-title">正在获取版本信息...</h1>
              <p id="published-at"></p>
            </div>
            {/* <!-- 主下载按钮 --> */}
            <div className="download-buttons">
              <div className="system-info">
                <p>
                  当前系统: <strong id="system-name">正在检测...</strong>
                </p>
              </div>
              <div className="button-group">
                {/* <!-- 立即下载按钮 (需要根据UA隐藏) --> */}
                <button id="main-download-btn" className="theme-btn">
                  立即下载（Win8/10/11）
                </button>

                {/* <!-- 新增Apple芯片下载按钮 --> */}
                <button id="apple-download-btn" className="theme-btn" style={{ display: 'none' }}>
                  下载 (Apple 芯片)
                </button>

                {/* <!-- 新增Intel芯片下载按钮 --> */}
                <button id="intel-download-btn" className="theme-btn" style={{ display: 'none' }}>
                  下载 (Intel 芯片)
                </button>

                {/* <!-- 其他版本下载按钮 --> */}
                <button
                  id="other-download-btn"
                  onClick={() => {
                    document.querySelector('.other-downloads')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="theme-btn alt-btn">
                  其他版本或备用线路下载
                </button>
              </div>
            </div>
            {/* <!-- 网盘下载 --> */}
            <div className="cloud-downloads">
              <h2 className="cloud-download-title">网盘下载</h2>
              <ul className="cloud-download-list">
                <li>
                  <strong>夸克网盘：</strong>
                  <a href="https://pan.quark.cn/s/c8533a1ec63e" target="_blank" rel="noopener noreferrer">
                    点击下载
                  </a>
                </li>
              </ul>
            </div>
            {/* <!-- 更新日志 --> */}
            <div id="changelog" className="changelog">
              {/* <!-- 更新日志内容将动态加载 --> */}
            </div>
            {/* <!-- 其他版本下载 --> */}
            <div className="other-downloads">
              <h2>其他版本下载</h2>
              <ul id="download-list">
                {/* 其他版本的下载链接将动态生成 */}
              </ul>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  )
}

export default DownloadPage
