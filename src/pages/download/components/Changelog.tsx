import * as Dialog from '@radix-ui/react-dialog'
import { BookOpen, X } from 'lucide-react'
import { marked } from 'marked'
import { type FC, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import type { VersionData } from '@/hooks/useVersionData'
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

  if (!versionData || !parsedChangelog.trim()) return null

  return (
    <>
      <span aria-hidden="true">·</span>
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <button
            type="button"
            className="hover:text-foreground focus-visible:ring-ring inline-flex cursor-pointer items-center gap-1.5 rounded-sm underline decoration-current/35 underline-offset-4 transition-colors focus-visible:ring-2 focus-visible:outline-none">
            <BookOpen className="h-3.5 w-3.5" />
            {t('download_page.changelog')}
          </button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-black/45 backdrop-blur-[2px] data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
          <Dialog.Content className="border-border bg-background fixed top-1/2 left-1/2 z-50 flex max-h-[min(80vh,720px)] w-[calc(100%-2rem)] max-w-2xl -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-2xl border shadow-2xl outline-none data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 dark:border-white/15">
            <div className="border-border flex items-center justify-between border-b px-5 py-4 sm:px-6">
              <div>
                <Dialog.Title className="text-foreground text-base font-semibold">
                  {t('download_page.changelog')}
                </Dialog.Title>
                <Dialog.Description className="text-muted-foreground mt-0.5 text-xs">
                  Cherry Studio {versionData.version}
                </Dialog.Description>
              </div>
              <Dialog.Close
                aria-label={t('download_page.close_changelog')}
                className="text-muted-foreground hover:bg-secondary hover:text-foreground focus-visible:ring-ring flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition-colors focus-visible:ring-2 focus-visible:outline-none">
                <X className="h-4 w-4" />
              </Dialog.Close>
            </div>
            <div
              className="prose prose-neutral dark:prose-invert prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground prose-strong:text-foreground prose-headings:font-semibold prose-a:text-primary max-w-none overflow-y-auto px-5 py-5 text-left sm:px-6"
              dangerouslySetInnerHTML={{ __html: marked.parse(parsedChangelog) as string }}
            />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  )
}

export default Changelog
