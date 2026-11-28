import { AnimatePresence, m, useReducedMotion } from 'framer-motion'
import {
  AtSign,
  Bot,
  ChevronDown,
  ChevronRight,
  Ellipsis,
  PenLine,
  Plus,
  RotateCcw,
  Search,
  Settings2,
  Split,
  UserRound
} from 'lucide-react'
import { type ReactNode, useLayoutEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import circularCutout from '@/assets/images/paintings/circular-cutout.webp'
import lightTrails from '@/assets/images/paintings/light-trails.webp'
import tennisCollage from '@/assets/images/paintings/tennis-collage.webp'
import trainWindow from '@/assets/images/paintings/train-window.webp'
import y2kStreet from '@/assets/images/paintings/y2k-street.webp'
import { type TabletDestination, type TabletLayoutCopy, tabletLayoutDemo } from '@/content/demos/mobile'
import { spring } from '@/lib/motion'
import { cn } from '@/lib/utils'
import { useDemoLocale } from '../primitives/useDemoLocale'
import { useDemoPlayback, useDemoScript } from '../primitives/useDemoScript'
import {
  BrandAvatar,
  ChatHeader,
  CherryAvatar,
  ComposerCircle,
  ComposerSurface,
  canvasFocus,
  GlassButton,
  SendSlot,
  SidebarIcon,
  tone
} from './MobileUi'
import { NavIcon } from './NavIcon'

// iPad Air 11" landscape in points; the canvas scales to the frame width like PhoneFrame.
const WIDTH = 1180
const HEIGHT = 820
const STATUS = 24
// shellMode.ts WIDE_RAIL_WIDTH and the sidebar column's 280pt width.
const RAIL = 60
const SIDEBAR = 280

const images: Record<string, string> = {
  'light-trails': lightTrails,
  'train-window': trainWindow,
  'y2k-street': y2kStreet,
  'circular-cutout': circularCutout,
  'tennis-collage': tennisCollage
}

type Page = Extract<TabletDestination, 'chat' | 'agents' | 'drawings'>

// dockTabs.ts WIDE_RAIL_DESTINATIONS.
const RAIL_ITEMS: TabletDestination[] = ['chat', 'agents', 'drawings', 'plugins', 'marketplace', 'files', 'devices']
const PAGES = new Set<TabletDestination>(['chat', 'agents', 'drawings'])

export default function TabletLayoutDemo() {
  const { locale } = useDemoLocale()
  const copy = tabletLayoutDemo[locale]
  const ref = useRef<HTMLDivElement>(null)
  const screen = useRef<HTMLDivElement>(null)
  const playing = useDemoPlayback(ref)
  const reduced = useReducedMotion() ?? false
  const [scale, setScale] = useState(0.7)
  const [page, setPage] = useState<Page>('chat')
  const [collapsed, setCollapsed] = useState(false)
  const [generated, setGenerated] = useState(false)
  const [session, setSession] = useState(0)

  useLayoutEffect(() => {
    const node = screen.current
    if (!node) return
    const observer = new ResizeObserver(() => setScale(node.clientWidth / WIDTH))
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const { replay } = useDemoScript(async ({ wait, reduced: still }) => {
    setPage('chat')
    setCollapsed(false)
    setSession(0)
    if (still) {
      setGenerated(true)
      return
    }
    setGenerated(false)
    await wait(1800)
    setGenerated(true)
    await wait(1600)
    setCollapsed(true)
    await wait(1500)
    setCollapsed(false)
    await wait(1100)
    setPage('agents')
    await wait(1700)
    setPage('drawings')
    await wait(2000)
    setPage('chat')
  }, playing)

  const toggleLabel = collapsed ? copy.showMenu : copy.hideMenu
  const toggle = () => setCollapsed((value) => !value)

  return (
    <div ref={ref} role="region" aria-label={copy.region}>
      <figure className="mx-auto w-full max-w-[900px] min-w-0">
        <div className="relative rounded-[30px] p-[12px] bg-[linear-gradient(150deg,#3a3a3e_0%,#1b1b1d_38%,#141416_62%,#2e2e32_100%)] shadow-[0_0_0_1px_rgb(0_0_0/0.35),0_30px_60px_-30px_rgb(0_0_0/0.65)] dark:shadow-[0_0_0_1px_rgb(255_255_255/0.22),0_0_90px_-12px_rgb(255_255_255/0.14),0_40px_80px_-30px_rgb(0_0_0/0.9)]">
          <div ref={screen} className="relative aspect-[1180/820] w-full overflow-hidden rounded-[18px] bg-black">
            <div
              style={{ width: WIDTH, height: HEIGHT, transform: `scale(${scale})` }}
              className="absolute top-0 left-0 flex origin-top-left overflow-hidden bg-[#f5f5f5] text-[16px] leading-6 text-[#171717] antialiased [font-family:-apple-system,BlinkMacSystemFont,'SF_Pro_Text','Segoe_UI',Roboto,'PingFang_SC','Noto_Sans_SC',sans-serif] dark:bg-black dark:text-[#ededed]">
              <StatusBar date={copy.date} />
              <nav
                aria-label={copy.nav.label}
                style={{ width: RAIL, paddingTop: STATUS + 10 }}
                className={cn(
                  'flex h-full shrink-0 flex-col items-center justify-between border-r pb-[14px]',
                  tone.background,
                  tone.border
                )}>
                <div className="flex flex-col items-center gap-1.5">
                  {RAIL_ITEMS.map((id) => {
                    const active = page === id
                    const label = copy.nav[id]
                    const className = cn(
                      'flex size-10 items-center justify-center rounded-xl transition-colors duration-150',
                      active ? cn(tone.secondaryActive, tone.foreground) : tone.muted
                    )
                    const icon = <NavIcon key="icon" id={id} filled={active} size={22} />
                    return PAGES.has(id) ? (
                      <button
                        key={id}
                        type="button"
                        aria-label={label}
                        aria-current={active ? 'page' : undefined}
                        title={label}
                        onClick={() => setPage(id as Page)}
                        className={cn(className, 'cursor-pointer', canvasFocus)}>
                        {icon}
                      </button>
                    ) : (
                      <span key={id} title={label} aria-hidden="true" className={className}>
                        {icon}
                      </span>
                    )
                  })}
                </div>
                <span
                  aria-hidden="true"
                  title={copy.nav.settings}
                  className="flex size-[30px] items-center justify-center rounded-full bg-[linear-gradient(135deg,#d4d4d4,#a3a3a3)] text-white dark:bg-[linear-gradient(135deg,#525252,#262626)]">
                  <UserRound className="size-4" />
                </span>
              </nav>

              <m.aside
                aria-label={copy.sessionsView}
                initial={false}
                animate={{ width: collapsed ? 0 : SIDEBAR }}
                transition={reduced ? { duration: 0 } : spring.settle}
                className={cn('relative h-full shrink-0 overflow-hidden', collapsed ? '' : 'border-r', tone.border)}>
                <Sidebar
                  copy={copy}
                  session={session}
                  onSession={(index) => {
                    setSession(index)
                    setPage('chat')
                  }}
                  hidden={collapsed}
                />
              </m.aside>

              <main className={cn('relative min-w-0 flex-1', page === 'chat' ? tone.chat : tone.background)}>
                <AnimatePresence mode="wait" initial={false}>
                  <m.div
                    key={page}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.16 }}
                    className="absolute inset-0">
                    {page === 'chat' && (
                      <ChatPage copy={copy} generated={generated} toggleLabel={toggleLabel} onToggle={toggle} />
                    )}
                    {page === 'agents' && <AgentsPage copy={copy} toggleLabel={toggleLabel} onToggle={toggle} />}
                    {page === 'drawings' && <DrawingsPage copy={copy} toggleLabel={toggleLabel} onToggle={toggle} />}
                  </m.div>
                </AnimatePresence>
              </main>
              <span
                aria-hidden="true"
                className="pointer-events-none absolute bottom-2 left-1/2 z-50 h-[5px] w-[300px] -translate-x-1/2 rounded-full bg-black dark:bg-white"
              />
            </div>
          </div>
        </div>
        <TabletCaption onReplay={replay} />
      </figure>
    </div>
  )
}

function TabletCaption({ onReplay }: { onReplay: () => void }) {
  const { t } = useTranslation()
  return (
    <figcaption className="mt-3 flex items-center justify-between gap-3 px-1 font-mono text-[11px] text-muted-foreground">
      <span>{t('demos.simulated')}</span>
      <button
        type="button"
        onClick={onReplay}
        className="inline-flex shrink-0 cursor-pointer items-center gap-1 rounded-sm whitespace-nowrap hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
        <RotateCcw className="size-3" aria-hidden="true" />
        {t('demos.replay')}
      </button>
    </figcaption>
  )
}

function StatusBar({ date }: { date: string }) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 z-50 flex h-6 items-center justify-between px-5 text-[13px] font-semibold text-black dark:text-white">
      <span className="tabular-nums">
        9:41 <span className="ms-1">{date}</span>
      </span>
      <span className="flex items-center gap-1.5">
        <span className="text-[12px]">100%</span>
        <span className="relative flex h-[12px] w-[25px] items-center rounded-[4px] border border-current/40 p-[2px]">
          <span className="h-full w-full rounded-[2px] bg-current" />
        </span>
      </span>
    </div>
  )
}

/** Docked sidebar: brand title with search, the Sessions view chooser and recent sessions. */
function Sidebar({
  copy,
  session,
  onSession,
  hidden
}: {
  copy: TabletLayoutCopy
  session: number
  onSession: (index: number) => void
  hidden: boolean
}) {
  return (
    <div
      aria-hidden={hidden || undefined}
      style={{ width: SIDEBAR, paddingTop: STATUS + 6 }}
      className={cn('h-full', tone.background, 'dark:bg-[#1a1a1a]')}>
      <div className="flex h-11 items-center gap-2 px-5">
        <span className="min-w-0 flex-1 truncate text-[24px] leading-8 font-semibold">Cherry Studio</span>
        <GlassButton label={copy.search} className="size-11">
          <Search className="size-5" aria-hidden="true" />
        </GlassButton>
      </div>
      <div className="mt-3 flex items-center gap-2 px-5 pt-2 pb-1">
        <span className={cn('flex min-h-10 items-center gap-1.5 text-[14px]', tone.muted)}>
          {copy.sessionsView}
          <ChevronDown className="size-4" aria-hidden="true" />
        </span>
      </div>
      <ul className="px-2">
        {copy.sessions.map((title, index) => (
          <li key={title}>
            <button
              type="button"
              aria-current={index === session ? 'true' : undefined}
              tabIndex={hidden ? -1 : 0}
              onClick={() => onSession(index)}
              className={cn(
                'flex w-full cursor-pointer items-center rounded-xl px-3 py-2.5 text-start',
                canvasFocus,
                index === session && tone.secondary
              )}>
              <span className="truncate text-[16px] leading-6">{title}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

function SidebarToggle({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <GlassButton label={label} onClick={onClick}>
      <SidebarIcon className="size-[21px]" />
    </GlassButton>
  )
}

/** A first-level page header beside the sidebar: the sidebar button, a centred title, its trailing action. */
function PageHeader({
  title,
  toggleLabel,
  onToggle,
  right
}: {
  title: string
  toggleLabel: string
  onToggle: () => void
  right?: ReactNode
}) {
  return (
    <div
      className="absolute inset-x-0 top-0 z-20 flex h-14 items-center justify-between px-4"
      style={{ marginTop: STATUS }}>
      <SidebarToggle label={toggleLabel} onClick={onToggle} />
      <p className="absolute left-1/2 -translate-x-1/2 text-[17px] leading-6 font-semibold">{title}</p>
      {right}
    </div>
  )
}

/** The chat route in a wide window: Agent switch beside the capsule, a 720pt reading column, an image answer. */
function ChatPage({
  copy,
  generated,
  toggleLabel,
  onToggle
}: {
  copy: TabletLayoutCopy
  generated: boolean
  toggleLabel: string
  onToggle: () => void
}) {
  return (
    <div className="relative h-full">
      <div className="absolute inset-0 overflow-y-auto [scrollbar-width:none]">
        <div className="mx-auto flex max-w-[720px] flex-col gap-4 px-4 pt-[100px] pb-[130px]">
          <p className={cn('text-center font-mono text-[13px] leading-[18px]', tone.muted)}>{copy.chat.time}</p>
          <p className={cn('w-fit max-w-[88%] self-end rounded-[18px] px-4 py-[10px]', tone.secondary)}>
            {copy.chat.prompt}
          </p>
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center gap-2 text-[14px] leading-5">
              <CherryAvatar />
              <span className="font-semibold">{copy.agentName}</span>
              <BrandAvatar id="qwen" size={16} />
              <span className={tone.tertiary}>{copy.chat.model}</span>
            </div>
            <AnimatePresence mode="wait" initial={false}>
              {generated ? (
                <m.img
                  key="image"
                  src={trainWindow}
                  alt={copy.chat.imageAlt}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className={cn('aspect-[4/3] w-[340px] rounded-2xl border object-cover', tone.border)}
                />
              ) : (
                <m.span
                  key="pending"
                  exit={{ opacity: 0 }}
                  aria-hidden="true"
                  className={cn('block aspect-[4/3] w-[340px] rounded-2xl motion-safe:animate-pulse', tone.secondary)}
                />
              )}
            </AnimatePresence>
            {generated && (
              <div aria-hidden="true" className={cn('flex min-h-7 items-center gap-1', tone.muted)}>
                {/* An image-only reply has no text to copy or read aloud, so the default toolbar starts at Retry. */}
                {[RotateCcw, AtSign, Split, Ellipsis].map((Icon, index) => (
                  <span key={index} className="flex size-[27px] items-center justify-center">
                    <Icon className="size-[15px]" />
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <ChatHeader
        agentName={copy.agentName}
        sidebarLabel={toggleLabel}
        newChatLabel={copy.newChat}
        onSidebar={onToggle}
        topInset={STATUS}
        agentSwitch={
          <GlassButton label={copy.switchAgent} className="ms-2 gap-0.5">
            <Bot className="size-[18px]" strokeWidth={1.8} />
            <ChevronDown className="size-2.5" strokeWidth={2.2} />
          </GlassButton>
        }
      />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 px-4 pb-[24px]">
        <span className="absolute inset-x-0 -top-6 bottom-0 bg-linear-to-b from-[#f9f9f9]/0 to-[#f9f9f9] to-[24px] dark:from-black/0 dark:to-black" />
        <ComposerSurface className="relative mx-auto max-w-[720px]">
          <div className="flex items-center gap-2">
            <ComposerCircle>
              <Plus className="size-[18px]" strokeWidth={1.9} />
            </ComposerCircle>
            <span className={cn('min-w-0 flex-1 truncate text-[16px] leading-5', tone.placeholder)}>
              {copy.placeholder}
            </span>
            <SendSlot state="disabled" />
          </div>
        </ComposerSurface>
      </div>
    </div>
  )
}

/** AgentListScreen: emoji avatar, name and model per row, the edit action, hairlines between rows. */
function AgentsPage({
  copy,
  toggleLabel,
  onToggle
}: {
  copy: TabletLayoutCopy
  toggleLabel: string
  onToggle: () => void
}) {
  return (
    <div className="relative h-full">
      <PageHeader
        title={copy.agents.title}
        toggleLabel={toggleLabel}
        onToggle={onToggle}
        right={
          <GlassButton label={copy.agents.create}>
            <Plus className="size-[21px]" strokeWidth={1.8} />
          </GlassButton>
        }
      />
      <ul className="mx-auto max-w-[720px] pt-[96px]">
        {copy.agents.items.map((agent, index) => (
          <li key={agent.name}>
            {index > 0 && <span aria-hidden="true" className="mx-4 block h-px bg-black/[0.08] dark:bg-white/[0.09]" />}
            <div className="flex items-center gap-3 px-4 py-3">
              <span
                aria-hidden="true"
                className={cn(
                  'flex size-10 shrink-0 items-center justify-center rounded-full text-[22px]',
                  tone.secondary
                )}>
                {agent.emoji}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[16px] leading-6">{agent.name}</span>
                <span className={cn('block truncate text-[14px] leading-5', tone.muted)}>{agent.model}</span>
              </span>
              <span title={copy.agents.edit} aria-hidden="true" className="flex size-9 items-center justify-center">
                <PenLine className={cn('size-5', tone.muted)} strokeWidth={1.8} />
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

/** DrawingsScreen: the template strip, the latest board full width, the rest two to a row, and the composer. */
function DrawingsPage({
  copy,
  toggleLabel,
  onToggle
}: {
  copy: TabletLayoutCopy
  toggleLabel: string
  onToggle: () => void
}) {
  const { drawings } = copy
  const covers = [
    [trainWindow, lightTrails, circularCutout],
    [y2kStreet, lightTrails],
    [tennisCollage, circularCutout]
  ]
  return (
    <div className="relative h-full">
      <PageHeader title={drawings.title} toggleLabel={toggleLabel} onToggle={onToggle} />
      <div className="absolute inset-0 overflow-y-auto pt-[88px] pb-[150px] [scrollbar-width:none]">
        <div className="mx-auto flex max-w-[880px] flex-col gap-8 pt-2">
          <section className="flex flex-col gap-3">
            <SectionHeader title={drawings.templates} action={drawings.all} />
            <div className="flex gap-3 overflow-hidden px-4">
              {drawings.templateItems.map((item) => (
                <div key={item.id} className="flex w-[132px] shrink-0 flex-col gap-1.5">
                  <img
                    src={images[item.id]}
                    alt=""
                    className={cn('h-[168px] w-full rounded-xl border object-cover', tone.borderSubtle)}
                  />
                  <span className="truncate text-[14px] leading-5 font-medium">{item.title}</span>
                </div>
              ))}
            </div>
          </section>
          <section className="flex flex-col gap-3">
            <SectionHeader title={drawings.boards} />
            <div className="grid grid-cols-2 gap-x-4 gap-y-5 px-4">
              {drawings.boardItems.map((board, index) => (
                <div key={board.title} className={cn('flex flex-col gap-2', index === 0 && 'col-span-2')}>
                  <Mosaic cells={covers[index]} tall={index === 0} />
                  <span>
                    <span className="block truncate text-[16px] leading-6 font-medium">{board.title}</span>
                    <span className={cn('block text-[13px] leading-[18px]', tone.muted)}>{board.meta}</span>
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 px-4 pb-[24px]">
        <span className="absolute inset-x-0 -top-8 bottom-0 bg-linear-to-b from-[#f5f5f5]/0 to-[#f5f5f5] to-[32px] dark:from-black/0 dark:to-black" />
        <ComposerSurface className="relative mx-auto max-w-[720px]">
          <p className={cn('min-h-8 truncate py-1 text-[16px] leading-5', tone.placeholder)}>{drawings.placeholder}</p>
          <div className="mt-[10px] flex items-center gap-2">
            <ComposerCircle>
              <Plus className="size-[18px]" strokeWidth={1.9} />
            </ComposerCircle>
            <ComposerCircle>
              <Settings2 className="size-[18px]" strokeWidth={1.9} />
            </ComposerCircle>
            <span className={cn('flex h-8 items-center gap-[6px] rounded-full px-[10px]', tone.secondary)}>
              <BrandAvatar id="qwen" size={20} />
              <span className="text-[14px] font-semibold">{drawings.model}</span>
            </span>
            <span className="ms-auto">
              <SendSlot state="disabled" />
            </span>
          </div>
        </ComposerSurface>
      </div>
    </div>
  )
}

function SectionHeader({ title, action }: { title: string; action?: string }) {
  return (
    <div className="flex min-h-8 items-center justify-between px-4">
      <p className="text-[20px] leading-[26px] font-semibold">{title}</p>
      {action && (
        <span className={cn('flex items-center gap-0.5 text-[14px]', tone.muted)}>
          {action}
          <ChevronRight className="size-4" aria-hidden="true" />
        </span>
      )}
    </div>
  )
}

/** PaintingBoardCover: two works side by side; three put the newest left with two stacked right. */
function Mosaic({ cells, tall }: { cells: string[]; tall: boolean }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'grid grid-cols-2 grid-rows-2 gap-0.5 overflow-hidden rounded-2xl border',
        tone.borderSubtle,
        tall ? 'h-[260px]' : 'h-[170px]'
      )}>
      {cells.map((src, index) => (
        <img
          key={`${src}-${index}`}
          src={src}
          alt=""
          className={cn('size-full object-cover', (index === 0 || cells.length === 2) && 'row-span-2')}
        />
      ))}
    </div>
  )
}
