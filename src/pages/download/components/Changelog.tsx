import { FC, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { VersionData } from '@/hooks/useVersionData'
import { parseChangelog } from '@/utils/parseChangelog'

interface ChangelogProps {
  versionData: VersionData | null
}

const Changelog: FC<ChangelogProps> = ({ versionData }) => {
  const { t, i18n } = useTranslation()

  const parsedChangelog = useMemo(() => {
    if (!versionData) return ''
    return parseChangelog(versionData.changelog, i18n.language)
  }, [versionData, i18n.language])

  if (!versionData) return null

  return (
    <div className="mt-10 rounded-2xl border border-border bg-card p-8">
      <div className="mb-8 border-b border-border pb-6 text-center">
        <h2 className="mb-2 text-2xl font-bold text-foreground">{t('download_page.changelog')}</h2>
        <p className="text-muted-foreground">
          {t('download_page.version')} {versionData.version}
        </p>
      </div>
      <div
        className="prose prose-invert max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground prose-strong:text-foreground"
        dangerouslySetInnerHTML={{ __html: window.marked.parse(parsedChangelog) }}
      />
    </div>
  )
}

export default Changelog
