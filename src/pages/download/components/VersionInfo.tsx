import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import { VersionData } from '@/hooks/useVersionData'

interface VersionInfoProps {
  versionData: VersionData | null
  loading: boolean
}

const VersionInfo: FC<VersionInfoProps> = ({ versionData, loading }) => {
  const { t } = useTranslation()
  return (
    <div className="version-info">
      <h1 id="version-title">
        {loading
          ? t('download_page.loading_version')
          : versionData
            ? `Cherry Studio ${versionData.version}`
            : t('download_page.version_error')}
      </h1>
      {versionData && (
        <p id="published-at">
          {t('download_page.published_at')}：{versionData.publishedAt}
        </p>
      )}
    </div>
  )
}

export default VersionInfo
