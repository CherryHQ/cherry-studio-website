export function copyRSSLink() {
  const rssLink = 'https://cherry-rss.ocool.online/'

  // 创建一个临时的文本区域元素
  function fallbackCopyTextToClipboard(text: string) {
    const textArea = document.createElement('textarea')
    textArea.value = text
    textArea.style.position = 'fixed' // 避免页面滚动
    textArea.style.left = '-999999px'
    document.body.appendChild(textArea)
    textArea.select()

    try {
      document.execCommand('copy')
      const messageBox = document.getElementById('copy-message')
      if (messageBox) {
        messageBox.style.display = 'block'
        setTimeout(() => {
          messageBox.style.display = 'none'
        }, 3000)
      }
    } catch (err) {
      console.error('复制失败:', err)
    }

    document.body.removeChild(textArea)
  }

  // 尝试使用现代 Clipboard API，如果不支持则使用后备方案
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard
      .writeText(rssLink)
      .then(() => {
        const messageBox = document.getElementById('copy-message')
        if (messageBox) {
          messageBox.style.display = 'block'
          setTimeout(() => {
            messageBox.style.display = 'none'
          }, 3000)
        }
      })
      .catch((err) => {
        console.error('Clipboard API 失败:', err)
        fallbackCopyTextToClipboard(rssLink)
      })
  } else {
    fallbackCopyTextToClipboard(rssLink)
  }
}
