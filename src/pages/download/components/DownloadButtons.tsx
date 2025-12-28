import { FC } from 'react'
import { useTranslation } from 'react-i18next'

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
    <div className="download-buttons">
      <div className="system-info">
        {systemInfo && (
          <p>
            {t('download_page.current_system')}: <strong>{systemInfo?.[0].type}</strong>
          </p>
        )}
      </div>
      <div className="button-group">
        {systemInfo &&
          systemInfo.map((item) => (
            <button
              key={item.url}
              id="main-download-btn"
              className="theme-btn"
              type="button"
              onClick={() => (window.location.href = item.url)}>
              {getButtonText(item)}
            </button>
          ))}
      </div>
    </div>
  )
}

export default DownloadButtons
