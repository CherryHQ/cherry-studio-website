import { Download } from 'lucide-react'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components/ui/button'
import { SystemInfo } from '@/utils/systemDetection'

interface DownloadButtonsProps {
  systemInfo: SystemInfo[] | null
  onOtherVersionsClick: () => void
}

const DownloadButtons: FC<DownloadButtonsProps> = ({ systemInfo }) => {
  const { t } = useTranslation()

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

  return (
    <div className="border-border bg-card mb-12 rounded-2xl border p-8 text-center">
      {systemInfo && (
        <p className="text-muted-foreground mb-6">
          {t('download_page.current_system')}: <strong className="text-foreground">{systemInfo?.[0].type}</strong>
        </p>
      )}
      <div className="flex flex-wrap items-center justify-center gap-4">
        {systemInfo &&
          systemInfo.map((item) => (
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
