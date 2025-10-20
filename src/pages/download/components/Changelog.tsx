import { FC, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { VersionData } from '@/hooks/useVersionData'
import { parseChangelog } from '@/utils/parseChangelog'

interface ChangelogProps {
  versionData: VersionData | null
}

const Changelog: FC<ChangelogProps> = ({ versionData }) => {
  const { t, i18n } = useTranslation()

  // Parse changelog based on current language
  const parsedChangelog = useMemo(() => {
    if (!versionData) return ''
    return parseChangelog(versionData.changelog, i18n.language)
  }, [versionData, i18n.language])

  if (!versionData) return null

  return (
    <div id="changelog" className="changelog">
      <div className="changelog-header">
        <h2>{t('download_page.changelog')}</h2>
        <p className="changelog-version">
          {t('download_page.version')} {versionData.version}
        </p>
      </div>
      <div className="changelog-content" dangerouslySetInnerHTML={{ __html: window.marked.parse(parsedChangelog) }} />
    </div>
  )
}

export default Changelog
