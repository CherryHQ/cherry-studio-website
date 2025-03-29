import { FC } from 'react'

import { SystemInfo } from '@/utils/systemDetection'

interface DownloadButtonsProps {
  systemInfo: SystemInfo[] | null
  onOtherVersionsClick: () => void
}

const DownloadButtons: FC<DownloadButtonsProps> = ({ systemInfo, onOtherVersionsClick }) => {
  return (
    <div className="download-buttons">
      <div className="system-info">
        {systemInfo && (
          <p>
            当前系统: <strong>{systemInfo?.[0].type}</strong>
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
          其他版本或备用线路下载
        </button>
      </div>
    </div>
  )
}

export default DownloadButtons
