import { useEffect } from 'react'

export function usePreloader() {
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
}
