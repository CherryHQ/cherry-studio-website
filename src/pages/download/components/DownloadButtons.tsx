import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import { SystemInfo } from '@/utils/systemDetection'

interface DownloadButtonsProps {
  systemInfo: SystemInfo[] | null
  onOtherVersionsClick: () => void
}

const DownloadButtons: FC<DownloadButtonsProps> = ({ systemInfo, onOtherVersionsClick }) => {
  const { t } = useTranslation()
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
              {item.text}
            </button>
          ))}

        {/* Other versions button */}
        <button id="other-download-btn" onClick={onOtherVersionsClick} className="theme-btn alt-btn" type="button">
          {t('download_page.other_versions')}
        </button>
      </div>
    </div>
  )
}

export default DownloadButtons
