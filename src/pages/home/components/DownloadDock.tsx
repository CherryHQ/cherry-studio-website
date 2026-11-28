import { Download, Smartphone } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { cn } from '@/lib/utils'
import { isMobileDevice } from '@/utils/systemDetection'

/** Download button on a curved sheet pinned to the bottom of the viewport; it steps aside for `[data-dock-hide]`. */
export default function DownloadDock() {
  const { t } = useTranslation()
  const isMobile = isMobileDevice()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const blockers = new Set<Element>()
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) blockers.add(entry.target)
        else blockers.delete(entry.target)
      }
      setVisible(blockers.size === 0)
    })
    for (const element of document.querySelectorAll('[data-dock-hide]')) observer.observe(element)
    return () => observer.disconnect()
  }, [])

  const Icon = isMobile ? Smartphone : Download
  return (
    <div
      className={cn(
        'pointer-events-none fixed inset-x-0 bottom-0 z-40 flex flex-col items-center pt-10 pb-4 transition-[transform,opacity] duration-500 ease-dock motion-reduce:transition-none',
        // The curve's upward shadow would still peek over the screen edge, so it fades out as it slides away.
        !visible && 'translate-y-full opacity-0'
      )}>
      <span
        aria-hidden="true"
        className="absolute -inset-x-[6%] top-0 -bottom-px rounded-[50%_50%_0_0/100%_100%_0_0] bg-background shadow-[0_-1px_0_var(--color-border),0_-16px_40px_-20px_rgb(0_0_0/0.18)]"
      />
      <Link
        to={isMobile ? '/mobile' : '/download'}
        tabIndex={visible ? 0 : -1}
        data-ph-no-autocapture=""
        className="pointer-events-auto relative inline-flex h-11 items-center gap-2 rounded-full bg-foreground px-7 text-[15px] font-semibold text-background transition-[background-color,transform] duration-200 hover:bg-foreground/85 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary active:scale-[0.97]">
        <Icon className="size-4" aria-hidden="true" />
        {isMobile ? t('mobile_download.button') : t('home_page.download_desktop')}
      </Link>
      <p className="relative mt-2 text-xs text-muted-foreground">{t('home_page.platforms')}</p>
    </div>
  )
}
