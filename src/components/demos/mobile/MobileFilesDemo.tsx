import { AnimatePresence, m } from 'framer-motion'
import {
  ArrowLeft,
  ChevronRight,
  Ellipsis,
  FileCode2,
  FileSpreadsheet,
  FileText,
  Folder,
  Image as ImageIcon,
  Presentation
} from 'lucide-react'
import { type ReactNode, useEffect, useRef, useState } from 'react'

import imageThumb from '@/assets/images/paintings/train-window.webp'
import { type LibraryFile, type MobileFilesCopy, mobileFilesDemo } from '@/content/demos/mobile'
import { ease } from '@/lib/motion'
import { cn } from '@/lib/utils'
import { useDemoLocale } from '../primitives/useDemoLocale'
import { useDemoPlayback, useDemoScript } from '../primitives/useDemoScript'
import { canvasFocus, GlassButton, SheetHandle, tone } from './MobileUi'
import PhoneFrame from './PhoneFrame'

type Mode = 'recent' | 'folders'
type Filter = 'all' | 'images' | 'documents' | 'sharing'
type Format = 'original' | 'image' | 'pptx'

interface DemoState {
  mode: Mode
  filter: Filter
  folder: string | null
  file: LibraryFile | null
  menu: boolean
  source: boolean
  share: boolean
  format: Format
  pressed: string | null
  toast: boolean
}

const INITIAL: DemoState = {
  mode: 'recent',
  filter: 'all',
  folder: null,
  file: null,
  menu: false,
  source: false,
  share: false,
  format: 'original',
  pressed: null,
  toast: false
}

const FILTERS: Filter[] = ['all', 'images', 'documents', 'sharing']
const push = { duration: 0.35, ease: ease.sheet }

// file-presentation.ts presets: code (HTML) and markdown use tag-blue, PDF tag-red, spreadsheets tag-green.
const fileVisual = {
  html: { Icon: FileCode2, color: tone.tagBlueText },
  markdown: { Icon: FileText, color: tone.tagBlueText },
  pdf: { Icon: FileText, color: tone.tagRedText },
  spreadsheet: { Icon: FileSpreadsheet, color: 'text-[oklch(0.518_0.145_147.7)] dark:text-[oklch(0.731_0.216_148.3)]' },
  image: { Icon: ImageIcon, color: tone.muted }
} as const

const matches = (file: LibraryFile, filter: Filter) =>
  filter === 'all' ||
  (filter === 'images' && file.kind === 'image') ||
  (filter === 'documents' && file.kind !== 'image')

export default function MobileFilesDemo() {
  const { locale } = useDemoLocale()
  const copy = mobileFilesDemo[locale]
  const ref = useRef<HTMLDivElement>(null)
  const playing = useDemoPlayback(ref)
  const [state, setState] = useState<DemoState>(INITIAL)
  const update = (patch: Partial<DemoState>) => setState((previous) => ({ ...previous, ...patch }))
  const htmlFile = copy.folders[0].files[0]

  const { replay } = useDemoScript(async ({ wait, reduced }) => {
    if (reduced) {
      setState({ ...INITIAL, mode: 'folders', folder: copy.folders[0].id, file: htmlFile })
      return
    }
    setState(INITIAL)
    const tap = async (key: string, patch: Partial<DemoState>) => {
      update({ pressed: key })
      await wait(180)
      update({ ...patch, pressed: null })
    }
    await wait(1000)
    await tap('tab-folders', { mode: 'folders' })
    await wait(1000)
    await tap(`folder-${copy.folders[0].id}`, { folder: copy.folders[0].id })
    await wait(1100)
    await tap(`file-${htmlFile.name}`, { file: htmlFile })
    await wait(1800)
    await tap('more', { menu: true })
    await wait(1200)
    await tap('menu-share', { menu: false, share: true })
    await wait(1600)
    await tap('format-image', { format: 'image' })
    await wait(1800)
    update({ share: false })
  }, playing)

  useEffect(() => {
    if (!state.toast) return
    const timer = setTimeout(() => update({ toast: false }), 1600)
    return () => clearTimeout(timer)
  }, [state.toast])

  const folder = copy.folders.find((item) => item.id === state.folder)

  return (
    <div ref={ref} role="region" aria-label={copy.region}>
      <PhoneFrame
        onReplay={replay}
        overlay={
          <ShareSheet
            copy={copy}
            file={state.file}
            open={state.share}
            format={state.format}
            pressed={state.pressed}
            onFormat={(format) => update({ format })}
            onClose={() => update({ share: false })}
          />
        }>
        <div className={cn('relative h-full overflow-hidden', tone.background)}>
          <AnimatePresence initial={false} mode="popLayout">
            {state.file ? (
              <m.div
                key="viewer"
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={push}
                className={cn('absolute inset-0 z-10', tone.background)}>
                <Viewer
                  copy={copy}
                  file={state.file}
                  state={state}
                  onBack={() => update({ file: null, menu: false, source: false })}
                  onMenu={(menu) => update({ menu })}
                  onAction={(action) => {
                    if (action === 'share') update({ menu: false, share: true })
                    else if (action === 'source') update({ menu: false, source: !state.source })
                    else if (action === 'copy') update({ menu: false, toast: true })
                    else update({ menu: false })
                  }}
                />
              </m.div>
            ) : (
              <m.div
                key="library"
                initial={{ x: '-30%' }}
                animate={{ x: 0 }}
                exit={{ x: '-30%' }}
                transition={push}
                className="absolute inset-0">
                <Library
                  copy={copy}
                  state={state}
                  folder={folder}
                  onMode={(mode) => update({ mode, folder: null })}
                  onFilter={(filter) => update({ filter })}
                  onFolder={(id) => update({ folder: id })}
                  onOpen={(file) => update({ file })}
                />
              </m.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {state.toast && (
              <m.p
                role="status"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, ease: ease.settle }}
                className={cn(
                  'absolute top-[60px] left-1/2 z-30 -translate-x-1/2 rounded-full px-4 py-2.5 text-[14px] font-medium shadow-[0_10px_30px_-10px_rgb(0_0_0/0.3)]',
                  tone.card
                )}>
                {copy.copied}
              </m.p>
            )}
          </AnimatePresence>
        </div>
      </PhoneFrame>
    </div>
  )
}

/** RouteHeader: glass back circle, a centred 17pt title and the trailing action. */
function RouteHeader({
  title,
  backLabel,
  onBack,
  right
}: {
  title: string
  backLabel: string
  onBack?: () => void
  right?: ReactNode
}) {
  return (
    <div className="absolute inset-x-0 top-0 z-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[118px] bg-linear-to-b from-[#f5f5f5] from-60% to-[#f5f5f5]/0 dark:from-black dark:to-black/0"
      />
      <div className="relative mt-[54px] flex h-14 items-center justify-between px-4">
        <GlassButton label={backLabel} onClick={onBack}>
          <ArrowLeft className="size-[21px]" strokeWidth={1.8} aria-hidden="true" />
        </GlassButton>
        <p className="absolute left-1/2 max-w-[230px] -translate-x-1/2 truncate text-[17px] leading-6 font-semibold">
          {title}
        </p>
        {right}
      </div>
    </div>
  )
}

function Library({
  copy,
  state,
  folder,
  onMode,
  onFilter,
  onFolder,
  onOpen
}: {
  copy: MobileFilesCopy
  state: DemoState
  folder: MobileFilesCopy['folders'][number] | undefined
  onMode: (mode: Mode) => void
  onFilter: (filter: Filter) => void
  onFolder: (id: string | null) => void
  onOpen: (file: LibraryFile) => void
}) {
  const browsing = state.mode === 'folders'
  const files = (browsing ? (folder ? folder.files : copy.rootFiles) : copy.recent).filter((file) =>
    matches(file, state.filter)
  )
  const showFolders = browsing && !folder && (state.filter === 'all' || state.filter === 'documents')

  return (
    <div className="relative h-full">
      <RouteHeader
        title={browsing && folder ? folder.name : copy.title}
        backLabel={copy.back}
        onBack={browsing && folder ? () => onFolder(null) : undefined}
        right={
          <GlassButton label={copy.more}>
            <Ellipsis className="size-[21px]" aria-hidden="true" />
          </GlassButton>
        }
      />
      <div className="h-full overflow-y-auto pt-[110px] pb-[34px] [scrollbar-width:none]">
        <div className="flex flex-col gap-4 px-4 pt-2 pb-4">
          <div
            role="tablist"
            aria-label={copy.browse.label}
            className={cn('relative flex h-9 rounded-[18px] p-[3px]', tone.secondary)}>
            <m.span
              aria-hidden="true"
              animate={{ x: browsing ? '100%' : '0%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 320 }}
              className="absolute top-[3px] bottom-[3px] left-[3px] w-[calc(50%-3px)] rounded-full bg-white shadow-[0_1px_4px_rgb(0_0_0/0.12)] dark:bg-[#454545]"
            />
            {(['recent', 'folders'] as const).map((mode) => (
              <button
                key={mode}
                type="button"
                role="tab"
                aria-selected={state.mode === mode}
                onClick={() => onMode(mode)}
                className={cn(
                  'relative flex-1 cursor-pointer rounded-full text-[13px] font-medium transition-opacity',
                  canvasFocus,
                  state.mode === mode ? '' : tone.muted,
                  state.pressed === `tab-${mode}` && 'opacity-60'
                )}>
                {mode === 'recent' ? copy.browse.recent : copy.browse.folders}
              </button>
            ))}
          </div>
          <div role="radiogroup" aria-label={copy.filters.label} className="flex items-center gap-1">
            {FILTERS.map((filter) => (
              <button
                key={filter}
                type="button"
                role="radio"
                aria-checked={state.filter === filter}
                onClick={() => onFilter(filter)}
                className={cn(
                  'cursor-pointer rounded-full border border-transparent px-3 py-1.5 text-[14px] leading-5 font-medium',
                  canvasFocus,
                  state.filter === filter ? cn(tone.secondaryActive) : tone.muted
                )}>
                {copy.filters[filter]}
              </button>
            ))}
          </div>
          {browsing && folder && (
            <nav aria-label={copy.browse.folders} className="flex items-center gap-1 text-[14px] leading-5">
              <button
                type="button"
                onClick={() => onFolder(null)}
                className={cn('min-h-10 cursor-pointer px-1', tone.muted, canvasFocus)}>
                {copy.title}
              </button>
              <ChevronRight className={cn('size-3', tone.muted)} aria-hidden="true" />
              <span className="min-h-10 px-1 py-2.5 font-medium">{folder.name}</span>
            </nav>
          )}
        </div>
        <AnimatePresence mode="wait" initial={false}>
          <m.ul
            key={`${state.mode}-${state.folder}-${state.filter}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="px-4">
            {showFolders &&
              copy.folders.map((item) => (
                <li key={item.id} className="flex items-center gap-2">
                  <RowButton
                    onClick={() => onFolder(item.id)}
                    pressed={state.pressed === `folder-${item.id}`}
                    name={item.name}
                    description={copy.modified(item.date)}
                    preview={<Folder className={cn('size-7', tone.muted)} strokeWidth={1.7} />}
                  />
                  <span aria-hidden="true" className="flex size-9 items-center justify-center">
                    <Ellipsis className="size-5" />
                  </span>
                </li>
              ))}
            {files.map((file) => (
              <li key={file.name}>
                <RowButton
                  onClick={file.kind === 'html' ? () => onOpen(file) : undefined}
                  pressed={state.pressed === `file-${file.name}`}
                  name={file.name}
                  description={copy.modified(file.date)}
                  preview={<FilePreview file={file} />}
                />
              </li>
            ))}
          </m.ul>
        </AnimatePresence>
      </div>
    </div>
  )
}

/** FileBrowserRow: a 40pt preview, the name on one line and its modified date below. */
function RowButton({
  onClick,
  pressed,
  name,
  description,
  preview
}: {
  onClick?: () => void
  pressed: boolean
  name: string
  description: string
  preview: ReactNode
}) {
  const body = (
    <>
      <span className="flex size-10 shrink-0 items-center justify-center">{preview}</span>
      <span className="min-w-0 flex-1 text-start">
        <span className="block truncate text-[16px] leading-6">{name}</span>
        <span className={cn('block truncate text-[14px] leading-5', tone.muted)}>{description}</span>
      </span>
    </>
  )
  const className = cn(
    'flex min-h-18 min-w-0 flex-1 items-center gap-4 py-3 transition-opacity duration-150',
    pressed && 'opacity-60'
  )
  if (!onClick) return <div className={className}>{body}</div>
  return (
    <button type="button" onClick={onClick} className={cn(className, 'w-full cursor-pointer rounded-xl', canvasFocus)}>
      {body}
    </button>
  )
}

function FilePreview({ file }: { file: LibraryFile }) {
  if (file.kind === 'image') {
    return <img src={imageThumb} alt="" className="size-10 rounded-lg object-cover" />
  }
  const { Icon, color } = fileVisual[file.kind]
  return (
    <span className={cn('flex size-10 items-center justify-center rounded-lg', tone.secondary)}>
      <Icon className={cn('size-6', color)} strokeWidth={1.7} />
    </span>
  )
}

type MenuAction = 'copy' | 'source' | 'share' | 'open'

/** FileTextViewer for HTML: the rendered page, with Copy text, View source, Share and Open file with in More. */
function Viewer({
  copy,
  file,
  state,
  onBack,
  onMenu,
  onAction
}: {
  copy: MobileFilesCopy
  file: LibraryFile
  state: DemoState
  onBack: () => void
  onMenu: (open: boolean) => void
  onAction: (action: MenuAction) => void
}) {
  const items: [MenuAction, string][] = [
    ['copy', copy.menu.copyText],
    ['source', state.source ? copy.menu.viewPage : copy.menu.viewSource],
    ['share', copy.menu.share],
    ['open', copy.menu.openWith]
  ]
  return (
    <div className="relative h-full">
      <div className="absolute inset-x-0 top-[110px] bottom-0 overflow-y-auto [scrollbar-width:none]">
        {state.source ? <SourceView copy={copy} /> : <HtmlPage copy={copy} />}
      </div>
      <RouteHeader
        title={file.name}
        backLabel={copy.back}
        onBack={onBack}
        right={
          <button
            type="button"
            aria-label={copy.more}
            aria-haspopup="menu"
            aria-expanded={state.menu}
            onClick={() => onMenu(!state.menu)}
            className={cn('cursor-pointer rounded-full', canvasFocus, state.pressed === 'more' && 'opacity-60')}>
            <GlassButton label={copy.more}>
              <Ellipsis className="size-[21px]" aria-hidden="true" />
            </GlassButton>
          </button>
        }
      />
      <AnimatePresence>
        {state.menu && (
          <>
            <button
              type="button"
              tabIndex={-1}
              aria-hidden="true"
              onClick={() => onMenu(false)}
              className="absolute inset-0 z-20 cursor-default"
            />
            <m.div
              role="menu"
              aria-label={copy.more}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: 'spring', damping: 26, stiffness: 380 }}
              onKeyDown={(event) => {
                if (event.key === 'Escape') onMenu(false)
              }}
              className="absolute top-[114px] right-4 z-30 w-[250px] origin-top-right overflow-hidden rounded-[22px] bg-white/90 py-1.5 shadow-[0_18px_50px_-12px_rgb(0_0_0/0.35)] backdrop-blur-2xl dark:bg-[#2a2a2a]/90">
              {items.map(([action, label]) => (
                <button
                  key={action}
                  type="button"
                  role="menuitem"
                  onClick={() => onAction(action)}
                  className={cn(
                    'flex h-11 w-full cursor-pointer items-center px-5 text-start text-[17px]',
                    canvasFocus,
                    state.pressed === `menu-${action}` && 'bg-black/[0.06] dark:bg-white/10'
                  )}>
                  {label}
                </button>
              ))}
            </m.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

/** The HTML file's own page, rendered as authored rather than in the app theme. */
function HtmlPage({ copy }: { copy: MobileFilesCopy }) {
  const { page } = copy
  return (
    <article className="min-h-full bg-white px-5 pt-6 pb-16 text-[#1f2328]">
      <div className="rounded-2xl bg-[linear-gradient(135deg,#f6d7b0,#e9967a_55%,#b5543a)] px-5 py-6 text-white">
        <p className="text-[12px] font-semibold tracking-[0.18em] uppercase opacity-85">{page.subtitle}</p>
        <h1 className="mt-2 font-serif text-[30px] leading-9">{page.title}</h1>
      </div>
      <div className="mt-5 flex flex-col gap-3">
        {page.days.map((day) => (
          <section key={day.label} className="rounded-xl border border-[#eadfd6] px-4 py-3.5">
            <p className="text-[12px] font-semibold tracking-wide text-[#b5543a]">{day.label}</p>
            <h2 className="mt-0.5 text-[18px] leading-6 font-semibold">{day.title}</h2>
            <ul className="mt-2 flex flex-col gap-1 text-[15px] leading-[22px] text-[#57606a]">
              {day.stops.map((stop) => (
                <li key={stop} className="flex gap-2">
                  <span aria-hidden="true" className="mt-[9px] size-1.5 shrink-0 rounded-full bg-[#e9967a]" />
                  {stop}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
      <p className="mt-5 rounded-xl bg-[#fbf3ec] px-4 py-3 text-[14px] leading-5 text-[#7a4b2f]">{page.tip}</p>
    </article>
  )
}

/** FileTextBody in source mode: the raw markup in monospace blocks. */
function SourceView({ copy }: { copy: MobileFilesCopy }) {
  const { page } = copy
  const lines = [
    '<!doctype html>',
    '<html lang="en">',
    `<head><title>${page.title}</title></head>`,
    '<body>',
    '  <header class="hero">',
    `    <p>${page.subtitle}</p>`,
    `    <h1>${page.title}</h1>`,
    '  </header>',
    ...page.days.flatMap((day) => [
      '  <section class="day">',
      `    <h2>${day.label} · ${day.title}</h2>`,
      `    <ul>${day.stops.map((stop) => `<li>${stop}</li>`).join('')}</ul>`,
      '  </section>'
    ]),
    `  <p class="tip">${page.tip}</p>`,
    '</body>',
    '</html>'
  ]
  return (
    <pre className="px-4 pt-2 pb-16 font-mono text-[13px] leading-5 break-words whitespace-pre-wrap">
      {lines.join('\n')}
    </pre>
  )
}

/**
 * The common sharing sheet: preview-led with only a handle, a floating format control over the
 * preview (Original file, Image, PPT for complete HTML), then Save beside Share in the footer.
 */
function ShareSheet({
  copy,
  file,
  open,
  format,
  pressed,
  onFormat,
  onClose
}: {
  copy: MobileFilesCopy
  file: LibraryFile | null
  open: boolean
  format: Format
  pressed: string | null
  onFormat: (format: Format) => void
  onClose: () => void
}) {
  const formats: [Format, string, typeof FileText][] = [
    ['original', copy.share.original, FileText],
    ['image', copy.share.image, ImageIcon],
    ['pptx', 'PPT', Presentation]
  ]
  return (
    <AnimatePresence>
      {open && file && (
        <div className="absolute inset-0 z-40">
          <m.button
            type="button"
            tabIndex={-1}
            aria-label={copy.share.close}
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={push}
            className="absolute inset-0 cursor-default bg-black/40"
          />
          <m.div
            role="dialog"
            aria-label={copy.share.label}
            onKeyDown={(event) => {
              if (event.key === 'Escape') onClose()
            }}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={push}
            className={cn(
              'absolute inset-x-0 bottom-0 flex h-[552px] flex-col rounded-t-[32px] dark:border-x dark:border-t dark:border-white/[0.09]',
              tone.sheet
            )}>
            <SheetHandle />
            <div className="relative min-h-0 flex-1 px-4 pt-2.5">
              <AnimatePresence mode="wait" initial={false}>
                <m.div
                  key={format}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  className={cn('h-full overflow-hidden rounded-2xl border', tone.card, tone.border)}>
                  {format === 'original' ? (
                    <div className={cn('flex h-full flex-col items-center justify-center gap-3', tone.secondary)}>
                      <FileCode2 className={cn('size-12', tone.tagBlueText)} strokeWidth={1.5} aria-hidden="true" />
                      <p className="max-w-[80%] truncate text-[16px]">{file.name}</p>
                    </div>
                  ) : (
                    <div className="h-full overflow-hidden bg-white">
                      <div
                        className={cn(
                          'origin-top',
                          format === 'pptx'
                            ? 'mx-auto mt-10 aspect-video w-[86%] overflow-hidden rounded-lg shadow-md'
                            : ''
                        )}>
                        <div className={format === 'pptx' ? 'w-[200%] origin-top-left scale-50' : ''}>
                          <HtmlPage copy={copy} />
                        </div>
                      </div>
                    </div>
                  )}
                </m.div>
              </AnimatePresence>
              <div
                role="radiogroup"
                aria-label={copy.share.format}
                className="absolute inset-x-0 bottom-4 flex justify-center">
                <div className="flex h-10 rounded-full bg-[#ebebeb]/90 p-1 shadow-[0_6px_20px_-8px_rgb(0_0_0/0.3)] backdrop-blur-xl dark:bg-[#1f1f1f]/90">
                  {formats.map(([value, label, Icon]) => (
                    <button
                      key={value}
                      type="button"
                      role="radio"
                      aria-checked={format === value}
                      onClick={() => onFormat(value)}
                      className={cn(
                        'flex cursor-pointer items-center gap-1.5 rounded-full px-3.5 text-[13px] font-medium transition-colors',
                        canvasFocus,
                        format === value ? cn(tone.card, 'shadow-sm dark:bg-[#454545]') : tone.muted,
                        pressed === `format-${value}` && 'opacity-60'
                      )}>
                      <Icon className="size-4" aria-hidden="true" />
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className={cn('flex gap-3 border-t px-4 pt-3 pb-[34px]', tone.border)}>
              <span
                aria-hidden="true"
                className={cn(
                  'flex min-h-12 flex-1 items-center justify-center rounded-xl text-[14px] font-medium',
                  tone.secondary
                )}>
                {copy.share.save}
              </span>
              <span
                aria-hidden="true"
                className="flex min-h-12 flex-1 items-center justify-center rounded-xl bg-[#171717] text-[14px] font-medium text-[#f5f5f5] dark:bg-[#ededed] dark:text-black">
                {copy.share.share}
              </span>
            </div>
          </m.div>
        </div>
      )}
    </AnimatePresence>
  )
}
