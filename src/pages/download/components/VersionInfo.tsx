import { FC } from 'react'

import { VersionData } from '@/hooks/useVersionData'

interface VersionInfoProps {
  versionData: VersionData | null
  loading: boolean
}

const VersionInfo: FC<VersionInfoProps> = ({ versionData, loading }) => {
  return (
    <div className="version-info">
      <h1 id="version-title">
        {loading
          ? '正在获取版本信息...'
          : versionData
            ? `Cherry Studio ${versionData.version}`
            : '无法获取版本信息，请暂时通过网盘链接下载'}
      </h1>
      {versionData && <p id="published-at">发布时间：{versionData.publishedAt}</p>}
    </div>
  )
}

export default VersionInfo
