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
    <div className="rounded-2xl border border-border bg-card p-8">
      <h2 className="mb-8 text-center text-2xl font-bold text-foreground">{t('download_page.other_downloads_title')}</h2>
      <div className="space-y-6">
        {Object.values(downloadUrls).map(({ title, items }) => (
          <div key={title}>
            <h3 className="mb-4 border-l-4 border-primary pl-4 text-lg font-semibold text-foreground">{title}</h3>
            <ul className="space-y-3">
              {items.map(({ name, url, desc }: DownloadItem) => (
                <li key={url}>
                  <button
                    onClick={() => (window.location.href = url)}
                    type="button"
                    className="w-full rounded-xl border border-border bg-secondary/30 px-5 py-4 text-left transition-all duration-200 hover:border-primary/30 hover:bg-secondary">
                    <span className="mr-3 font-medium text-foreground">{desc}</span>
                    <span className="text-sm text-muted-foreground">{name}</span>
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
