import { Download, Monitor, Smartphone } from 'lucide-react'
import type { FC } from 'react'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components/ui/button'
import type { SystemInfo } from '@/utils/systemDetection'
import { isMobileDevice } from '@/utils/systemDetection'

interface DownloadButtonsProps {
  systemInfo: SystemInfo[] | null
  onOtherVersionsClick: () => void
}

const DownloadButtons: FC<DownloadButtonsProps> = ({ systemInfo, onOtherVersionsClick }) => {
  const { t } = useTranslation()
  const isMobile = isMobileDevice()

  const getButtonText = (item: SystemInfo) => {
    const platform = item.type.toLowerCase()
    if (platform.includes('windows')) {
      return t('download_page.download_with_arch', { arch: item.arch.toUpperCase() })
    }
    if (platform.includes('macos')) {
      if (item.arch === 'arm64') {
        return t('download_page.download_apple')
      }
      return t('download_page.download_intel')
    }
    return t('download_page.download_now')
  }

  // Mobile device - show prompt to view all downloads
  if (isMobile) {
    return (
      <div className="border-border bg-card mb-12 rounded-2xl border p-6 text-center sm:p-8">
        <div className="text-muted-foreground mb-4 flex items-center justify-center gap-2">
          <Smartphone className="h-5 w-5" />
          <span>{t('download_page.mobile_detected')}</span>
        </div>
        <p className="text-muted-foreground mb-6 text-sm">{t('download_page.mobile_hint')}</p>
        <Button variant="glow" size="lg" onClick={onOtherVersionsClick} className="gap-2">
          <Download className="h-5 w-5" />
          {t('download_page.view_all_downloads')}
        </Button>
      </div>
    )
  }

  return (
    <div className="border-border bg-card mb-12 rounded-2xl border p-6 text-center sm:p-8">
      {systemInfo && (
        <p className="text-muted-foreground mb-6 flex items-center justify-center gap-2">
          <Monitor className="h-5 w-5" />
          {t('download_page.current_system')}: <strong className="text-foreground">{systemInfo?.[0].type}</strong>
        </p>
      )}
      <div className="flex flex-wrap items-center justify-center gap-4">
        {systemInfo?.map((item) => (
          <Button
            key={item.url}
            variant="glow"
            size="lg"
            onClick={() => (window.location.href = item.url)}
            className="gap-2">
            <Download className="h-5 w-5" />
            {getButtonText(item)}
          </Button>
        ))}
      </div>
    </div>
  )
}

export default DownloadButtons
