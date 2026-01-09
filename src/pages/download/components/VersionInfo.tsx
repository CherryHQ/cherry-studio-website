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
    <div className="mb-12 text-center">
      <h1 className="text-foreground mb-4 text-4xl font-bold sm:text-5xl">
        {loading
          ? t('download_page.loading_version')
          : versionData
            ? `Cherry Studio ${versionData.version}`
            : t('download_page.version_error')}
      </h1>
      {versionData && (
        <p className="text-muted-foreground text-lg">
          {t('download_page.published_at_label')}
          {versionData.publishedAt}
        </p>
      )}
    </div>
  )
}

export default VersionInfo
