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
    <div className="border-border bg-card mt-10 rounded-2xl border p-8">
      <div className="border-border mb-8 border-b pb-6 text-center">
        <h2 className="text-foreground mb-2 text-2xl font-bold">{t('download_page.changelog')}</h2>
        <p className="text-muted-foreground">
          {t('download_page.version')} {versionData.version}
        </p>
      </div>
      <div
        className="prose prose-invert prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground prose-strong:text-foreground max-w-none"
        dangerouslySetInnerHTML={{ __html: window.marked.parse(parsedChangelog) }}
      />
    </div>
  )
}

export default Changelog
