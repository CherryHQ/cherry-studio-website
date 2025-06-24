import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import { VersionData } from '@/hooks/useVersionData'

interface ChangelogProps {
  versionData: VersionData | null
}

const Changelog: FC<ChangelogProps> = ({ versionData }) => {
  const { t } = useTranslation()
  if (!versionData) return null

  return (
    <div id="changelog" className="changelog">
      <div className="changelog-header">
        <h2>{t('download_page.changelog')}</h2>
        <p className="changelog-version">
          {t('download_page.version')} {versionData.version}
        </p>
      </div>
      <div
        className="changelog-content"
        dangerouslySetInnerHTML={{ __html: window.marked.parse(versionData.changelog) }}
      />
    </div>
  )
}

export default Changelog
