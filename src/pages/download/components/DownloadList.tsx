import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import { Asset, DownloadItem, DownloadUrls } from '@/hooks/useVersionData'

interface DownloadListProps {
  downloadUrls: DownloadUrls | null
  assets: Asset[]
}

const DownloadList: FC<DownloadListProps> = ({ downloadUrls }) => {
  const { t } = useTranslation()
  if (!downloadUrls) return null

  // const getFileSize = (fileName: string) => {
  //   const matchedDownload = assets.find((item) => item.name.toLowerCase().includes(fileName.toLowerCase()))
  //   return matchedDownload ? ` (${(matchedDownload.size / 1024 / 1024).toFixed(1)} MB)` : ''
  // }

  return (
    <div className="other-downloads">
      <h2>{t('download_page.other_downloads_title')}</h2>
      <ul id="download-list">
        {Object.values(downloadUrls).map(({ title, items }) => (
          <div key={title}>
            <h3 style={{ marginTop: '20px' }}>{title}</h3>
            {items.map(({ name, url, desc }: DownloadItem) => (
              <li key={url}>
                <button className="download-item-btn" onClick={() => (window.location.href = url)} type="button">
                  <DownloadItemName>{desc}</DownloadItemName> <DownloadItemDesc>{name}</DownloadItemDesc>
                </button>
              </li>
            ))}
          </div>
        ))}
      </ul>
    </div>
  )
}

const DownloadItemName = styled.span`
  font-size: 14px;
  font-weight: bold;
  margin-right: 10px;
`

const DownloadItemDesc = styled.span`
  font-size: 14px;
  color: #666;
`

export default DownloadList
