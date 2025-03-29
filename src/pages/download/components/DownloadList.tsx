import { FC } from 'react'

import { Asset, DownloadItem, DownloadUrls } from '@/hooks/useVersionData'

interface DownloadListProps {
  downloadUrls: DownloadUrls | null
  assets: Asset[]
}

const DownloadList: FC<DownloadListProps> = ({ downloadUrls, assets }) => {
  if (!downloadUrls) return null

  const getFileSize = (fileName: string) => {
    const matchedDownload = assets.find((item) => item.name.toLowerCase().includes(fileName.toLowerCase()))
    return matchedDownload ? ` (${(matchedDownload.size / 1024 / 1024).toFixed(1)} MB)` : ''
  }

  return (
    <div className="other-downloads">
      <h2>其他版本下载</h2>
      <ul id="download-list">
        {Object.values(downloadUrls).map(({ title, items }) => (
          <div key={title}>
            <h3 style={{ marginTop: '20px' }}>{title}</h3>
            {items.map(({ name, url, desc }: DownloadItem) => (
              <li key={url}>
                <button className="download-item-btn" onClick={() => (window.location.href = url)} type="button">
                  {name}
                  {getFileSize(name)} - {desc}
                </button>
              </li>
            ))}
          </div>
        ))}
      </ul>
    </div>
  )
}

export default DownloadList
