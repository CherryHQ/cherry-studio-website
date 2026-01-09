import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import { Asset, DownloadItem, DownloadUrls } from '@/hooks/useVersionData'

interface DownloadListProps {
  downloadUrls: DownloadUrls | null
  assets: Asset[]
}

const DownloadList: FC<DownloadListProps> = ({ downloadUrls }) => {
  const { t } = useTranslation()
  if (!downloadUrls) return null

  return (
    <div className="border-border bg-card rounded-2xl border p-8">
      <h2 className="text-foreground mb-8 text-center text-2xl font-bold">
        {t('download_page.other_downloads_title')}
      </h2>
      <div className="space-y-6">
        {Object.values(downloadUrls).map(({ title, items }) => (
          <div key={title}>
            <h3 className="border-primary text-foreground mb-4 border-l-4 pl-4 text-lg font-semibold">{title}</h3>
            <ul className="space-y-3">
              {items.map(({ name, url, desc }: DownloadItem) => (
                <li key={url}>
                  <button
                    onClick={() => (window.location.href = url)}
                    type="button"
                    className="border-border bg-secondary/30 hover:border-primary/30 hover:bg-secondary w-full rounded-xl border px-5 py-4 text-left transition-all duration-200">
                    <span className="text-foreground mr-3 font-medium">{desc}</span>
                    <span className="text-muted-foreground text-sm">{name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DownloadList
