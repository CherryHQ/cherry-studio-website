import type { FC, ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

import type { VersionData } from '@/hooks/useVersionData'

interface VersionInfoProps {
  versionData: VersionData | null
  loading: boolean
  unavailableMessage?: string
  changelog?: ReactNode
}

const VersionInfo: FC<VersionInfoProps> = ({ versionData, loading, unavailableMessage, changelog }) => {
  const { t } = useTranslation()

  if (loading) {
    return (
      <div className="mt-4 flex">
        <div className="h-5 w-48 rounded-md bg-muted motion-safe:animate-pulse" />
      </div>
    )
  }

  if (versionData) {
    return (
      <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
        <span>{t('download_page.stable_release')}</span>
        {versionData.publishedAt && (
          <>
            <span aria-hidden="true">·</span>
            <span>{versionData.publishedAt}</span>
          </>
        )}
        {changelog}
      </div>
    )
  }

  return (
    <p className="mt-4 max-w-xl text-sm leading-6 text-muted-foreground">
      {unavailableMessage ?? t('download_page.version_error')}
    </p>
  )
}

export default VersionInfo
