import type { FC, ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

import type { VersionData } from '@/hooks/useVersionData'

interface VersionInfoProps {
  versionData: VersionData | null
  loading: boolean
  isPreview?: boolean
  unavailableMessage?: string
  changelog?: ReactNode
}

const VersionInfo: FC<VersionInfoProps> = ({
  versionData,
  loading,
  isPreview = false,
  unavailableMessage,
  changelog
}) => {
  const { t } = useTranslation()

  if (loading) {
    return (
      <div className="mt-4 flex justify-center">
        <div className="h-5 w-48 animate-pulse rounded-full bg-black/10 dark:bg-white/10" />
      </div>
    )
  }

  if (versionData) {
    return (
      <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-sm text-black/55 dark:text-white/55">
        <span>{t(isPreview ? 'download_page.preview_release' : 'download_page.stable_release')}</span>
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
    <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-black/55 dark:text-white/55">
      {unavailableMessage ?? t('download_page.version_error')}
    </p>
  )
}

export default VersionInfo
