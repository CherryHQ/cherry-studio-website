/**
 * GA4 自定义事件。
 *
 * gtag 由 index.html 里的内联脚本挂到 window 上。构建期（Node）没有 window，
 * 浏览器里也可能被广告拦截插件拿掉，所以每次调用前都要判断，缺失时静默跳过。
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

interface DownloadEventParams {
  platform: string
  packageName: string
  /** button：用户点击；auto：下载页按系统自动开始下载 */
  trigger: 'button' | 'auto'
}

/**
 * 下载按钮用 window.location.href 跳到安装包，不是 <a> 链接，
 * GA4 增强型衡量的 file_download 抓不到，所以单独上报。
 * 事件名 download_click 需要在 GA4 后台标记为关键事件才会计入转化。
 */
export const trackDownload = ({ platform, packageName, trigger }: DownloadEventParams): void => {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return

  window.gtag('event', 'download_click', {
    platform,
    package_name: packageName,
    trigger,
    // 紧接着就会跳转，beacon 能保证事件在页面离开前发出
    transport_type: 'beacon'
  })
}
