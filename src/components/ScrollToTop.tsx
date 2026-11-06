import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    // 带锚点（如文章面包屑里的 /resources/articles/#use-cases）时滚到对应分组，否则回到顶部
    let anchorId = ''
    try {
      anchorId = decodeURIComponent(hash.slice(1))
    } catch {
      // 无效的 URL 编码按无锚点处理，避免解码异常导致页面白屏
    }
    const target = anchorId ? document.getElementById(anchorId) : null
    if (target) target.scrollIntoView({ behavior: 'instant' })
    else window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname, hash])

  return null
}
