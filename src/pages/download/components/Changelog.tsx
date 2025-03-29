import { FC } from 'react'

import { VersionData } from '@/hooks/useVersionData'

interface ChangelogProps {
  versionData: VersionData | null
}

const Changelog: FC<ChangelogProps> = ({ versionData }) => {
  if (!versionData) return null

  return (
    <div id="changelog" className="changelog">
      <div className="changelog-header">
        <h2>更新日志</h2>
        <p className="changelog-version">版本 {versionData.version}</p>
      </div>
      <div
        className="changelog-content"
        dangerouslySetInnerHTML={{ __html: window.marked.parse(versionData.changelog) }}
      />
    </div>
  )
}

export default Changelog
