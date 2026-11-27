import { AnimatePresence, m, useReducedMotion } from 'framer-motion'
import {
  ArrowUp,
  Bell,
  CalendarClock,
  Check,
  ChevronDown,
  ChevronRight,
  CircleCheck,
  CirclePlay,
  Clock,
  Gauge,
  Loader2,
  Megaphone,
  MoreHorizontal,
  Pause,
  PencilLine,
  Play,
  Plus,
  Settings,
  ShieldCheck,
  Sun,
  ToolCase,
  Trash2
} from 'lucide-react'
import { type ReactNode, useEffect, useRef, useState } from 'react'

import { agentDemo } from '@/content/demos/agents'
import {
  type DemoNotification,
  type DemoTask,
  type ReplyBlock,
  type TaskGroup,
  type TaskRun,
  tasksDemo
} from '@/content/demos/tasks'
import { ease, spring } from '@/lib/motion'
import { cn } from '@/lib/utils'
import { TOOLBAR_ICON, UserAvatar } from '../agents/parts'
import ShimmerText from '../mobile/ShimmerText'
import AppShell, { DefaultAvatar, EmojiIcon, SidebarCollapseIcon } from '../primitives/AppShell'
import DemoFrame from '../primitives/DemoFrame'
import { useDemoLocale } from '../primitives/useDemoLocale'
import { useDemoPlayback, useDemoScript } from '../primitives/useDemoScript'

type Phase = 'idle' | 'running' | 'done'

interface ViewState {
  /** The 09:00 run of the morning briefing. */
  phase: Phase
  /** Its result notification: not yet published, unread, or read. */
  notice: 'none' | 'unread' | 'read'
  clock: 'before' | 'after'
  menu: boolean
  drawer: boolean
  /** The script's simulated press on the new notification. */
  pressed: boolean
  taskId: string | null
  runId: string | null
}

const MORNING = 'morning'
const INITIAL: ViewState = {
  phase: 'idle',
  notice: 'none',
  clock: 'before',
  menu: false,
  drawer: false,
  pressed: false,
  taskId: MORNING,
  runId: 'morning-1126'
}
const GROUPS: TaskGroup[] = ['active', 'paused', 'completed']
const FOCUS = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
// UserAccountPanel and AppearanceMenu row footprint.
const MENU_ROW = 'flex h-8 w-full items-center gap-2 rounded-md px-2 text-left text-[13px] leading-5'
// DropdownMenuItem footprint in the task row's More menu.
const DROPDOWN_ITEM = 'flex h-8 w-full items-center gap-2 rounded-sm px-2 text-left text-sm hover:bg-accent'

/** The step a running task is on, advancing every 0.6s under the app's shimmer. */
function LiveStep({ steps, active }: { steps: string[]; active: boolean }) {
  const [step, setStep] = useState(0)
  useEffect(() => {
    if (!active) return
    const timer = setInterval(() => setStep((value) => Math.min(value + 1, steps.length - 1)), 600)
    return () => clearInterval(timer)
  }, [active, steps.length])
  return <ShimmerText active={active}>{`${steps[step]}…`}</ShimmerText>
}

function Reply({ blocks, locale, reduced }: { blocks: ReplyBlock[]; locale: 'en' | 'zh'; reduced: boolean }) {
  const separator = locale === 'zh' ? '：' : ': '
  return (
    <div className="flex flex-col gap-1.5 text-sm leading-relaxed">
      {blocks.map((block, index) => {
        let body: ReactNode
        if ('h' in block) body = <h4 className="pt-1.5 font-semibold">{block.h}</h4>
        else if ('p' in block) body = <p>{block.p}</p>
        else
          body = (
            <p className="relative pl-4 before:absolute before:top-[0.68em] before:left-1 before:size-[5px] before:rounded-full before:bg-foreground/55">
              {block.lead && (
                <strong className="font-semibold">
                  {block.lead}
                  {separator}
                </strong>
              )}
              {block.li}
            </p>
          )
        return (
          <m.div
            key={index}
            initial={reduced ? false : { opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ ...spring.block, delay: Math.min(index, 8) * 0.045 }}>
            {body}
          </m.div>
        )
      })}
    </div>
  )
}

/**
 * Cherry Studio 2.2 Scheduled Tasks page (ScheduledTasksPage + ScheduledTaskSidebar) and NotificationCenter: at 09:00
 * the morning briefing runs, its result lights the avatar's unread dot, and the drawer opens from the account menu.
 */
export default function ScheduledTasksDemo() {
  const { locale } = useDemoLocale()
  const copy = tasksDemo[locale]
  const agent = agentDemo[locale]
  const reduced = useReducedMotion() ?? false
  const ref = useRef<HTMLDivElement>(null)
  const touched = useRef(false)
  const playing = useDemoPlayback(ref)
  const [state, setState] = useState<ViewState>(INITIAL)
  const [groupOf, setGroupOf] = useState<Record<string, TaskGroup>>({})
  const [deleted, setDeleted] = useState<string[]>([])
  const [dismissed, setDismissed] = useState<string[]>([])
  const [collapsed, setCollapsed] = useState<TaskGroup[]>([])
  const [expanded, setExpanded] = useState<string[]>([])
  const [rowMenu, setRowMenu] = useState<string | null>(null)
  const [picker, setPicker] = useState(false)

  const update = (patch: Partial<ViewState>) => setState((previous) => ({ ...previous, ...patch }))
  // Navigating to a task changes the page, which closes the drawer as in NotificationCenterProvider.
  const openTask = (taskId: string, runId: string | null) =>
    setState((previous) => ({ ...previous, taskId, runId, drawer: false, menu: false, pressed: false }))
  const touch = () => {
    touched.current = true
  }

  const { replay } = useDemoScript(async ({ wait, reduced: skip }) => {
    touched.current = false
    setGroupOf({})
    setDeleted([])
    setDismissed([])
    setCollapsed([])
    setExpanded([])
    setRowMenu(null)
    setPicker(false)
    if (skip) {
      setState({ ...INITIAL, phase: 'done', notice: 'read', clock: 'after', runId: copy.todayRun.id })
      return
    }
    setState(INITIAL)
    await wait(500)
    update({ clock: 'after', phase: 'running' })
    await wait(1000)
    update({ phase: 'done', notice: 'unread' })
    await wait(300)
    if (touched.current) return
    update({ menu: true })
    await wait(380)
    if (touched.current) return
    update({ menu: false, drawer: true })
    await wait(1350)
    if (touched.current) return
    update({ pressed: true })
    await wait(200)
    if (touched.current) return
    setState((previous) => ({
      ...previous,
      notice: 'read',
      taskId: MORNING,
      runId: copy.todayRun.id,
      drawer: false,
      pressed: false
    }))
  }, playing)

  // Outside clicks and Escape dismiss the open menus and the drawer.
  useEffect(() => {
    const root = ref.current
    if (!root) return
    const onPointer = (event: PointerEvent) => {
      const target = event.target as Element
      if (!target.closest('[data-menu]')) {
        setRowMenu(null)
        setPicker(false)
        if (!target.closest('[data-account]')) setState((previous) => ({ ...previous, menu: false }))
      }
    }
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      setRowMenu(null)
      setPicker(false)
      setState((previous) => ({ ...previous, menu: false, drawer: false }))
    }
    root.addEventListener('pointerdown', onPointer)
    root.addEventListener('keydown', onKey)
    return () => {
      root.removeEventListener('pointerdown', onPointer)
      root.removeEventListener('keydown', onKey)
    }
  }, [])

  const tasks = copy.tasks.filter((task) => !deleted.includes(task.id))
  const runsOf = (task: DemoTask): TaskRun[] =>
    task.id === MORNING && state.phase !== 'idle' ? [copy.todayRun, ...task.runs] : task.runs
  const groupOfTask = (task: DemoTask) => groupOf[task.id] ?? task.group
  const task = tasks.find((item) => item.id === state.taskId) ?? null
  const runs = task ? runsOf(task) : []
  const run = runs.find((item) => item.id === state.runId) ?? runs[0] ?? null
  const isRunning = (item: TaskRun) => item.id === copy.todayRun.id && state.phase === 'running'
  const lastFinished = runs.find((item) => !isRunning(item))
  const unread = state.notice === 'unread'

  const feed: DemoNotification[] = [
    ...(state.notice === 'none'
      ? []
      : [
          {
            id: copy.todayNotice.id,
            kind: 'task' as const,
            taskId: MORNING,
            runId: copy.todayRun.id,
            time: copy.todayNotice.time
          }
        ]),
    ...copy.notifications
  ].filter((item) => !dismissed.includes(item.id))

  const activate = (item: DemoNotification) => {
    touch()
    if (item.id === copy.todayNotice.id) update({ notice: 'read' })
    if (item.kind === 'task') openTask(item.taskId, item.runId)
    else if (item.kind === 'announcement')
      setExpanded((list) => (list.includes(item.id) ? list.filter((id) => id !== item.id) : [...list, item.id]))
    else update({ drawer: false })
  }

  const taskRow = (item: DemoTask) => {
    const selected = item.id === state.taskId
    const group = groupOfTask(item)
    const status = item.missed ? 'missed' : group
    return (
      <div
        key={item.id}
        className={cn(
          'group/row relative flex items-center gap-1 rounded-lg pr-1.5 transition-colors',
          selected ? 'bg-accent' : 'hover:bg-accent/60 has-[:focus-visible]:bg-accent/60'
        )}>
        <button
          type="button"
          aria-pressed={selected}
          onClick={() => {
            touch()
            openTask(item.id, null)
          }}
          className="flex min-w-0 flex-1 cursor-pointer flex-col gap-0.5 rounded-lg px-2.5 py-1.5 text-left outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-inset">
          <span className={cn('truncate text-[13px] leading-5', selected ? 'font-medium' : 'font-normal')}>
            {item.name}
          </span>
          <span className="flex min-w-0 items-center gap-1 text-xs text-muted-foreground">
            <span className="min-w-0 truncate">{item.agent.name}</span>
            <span aria-hidden="true" className="shrink-0">
              ·
            </span>
            <span className="min-w-0 truncate">{item.schedule}</span>
          </span>
          {item.missed && <span className="truncate text-xs text-muted-foreground">{copy.missedTime}</span>}
        </button>
        <div data-menu className="relative shrink-0">
          <button
            type="button"
            aria-label={`${copy.more} ${item.name}`}
            aria-expanded={rowMenu === item.id}
            onClick={() => {
              touch()
              setRowMenu(rowMenu === item.id ? null : item.id)
            }}
            className={cn(
              'flex size-7 cursor-pointer items-center justify-center rounded-md text-muted-foreground opacity-0 group-hover/row:opacity-100 focus-visible:opacity-100',
              rowMenu === item.id && 'opacity-100',
              FOCUS
            )}>
            <MoreHorizontal className="size-4" />
          </button>
          <AnimatePresence>
            {rowMenu === item.id && (
              <m.div
                role="menu"
                initial={{ opacity: 0, scale: 0.96, y: -4 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.14, ease: ease.settle }}
                className="absolute top-full right-0 z-30 mt-1 w-40 origin-top-right rounded-md border-[0.5px] border-border bg-popover p-1 text-foreground shadow-md [&_svg]:size-4 [&_svg]:text-muted-foreground">
                {status !== 'completed' && (
                  <>
                    {(status === 'active' || status === 'paused') && (
                      <button
                        type="button"
                        role="menuitem"
                        className={DROPDOWN_ITEM}
                        onClick={() => {
                          setGroupOf((map) => ({ ...map, [item.id]: status === 'paused' ? 'active' : 'paused' }))
                          setRowMenu(null)
                        }}>
                        {status === 'paused' ? <CirclePlay /> : <Pause />}
                        {status === 'paused' ? copy.menu.resume : copy.menu.pause}
                      </button>
                    )}
                    <button type="button" role="menuitem" className={DROPDOWN_ITEM} onClick={() => setRowMenu(null)}>
                      <Play />
                      {copy.menu.runNow}
                    </button>
                    <button type="button" role="menuitem" className={DROPDOWN_ITEM} onClick={() => setRowMenu(null)}>
                      <PencilLine />
                      {copy.menu.edit}
                    </button>
                    <div className="-mx-1 my-1 h-px bg-border" />
                  </>
                )}
                <button
                  type="button"
                  role="menuitem"
                  className={cn(DROPDOWN_ITEM, 'text-destructive [&_svg]:text-destructive')}
                  onClick={() => {
                    setDeleted((list) => [...list, item.id])
                    setRowMenu(null)
                    if (selected) openTask('', null)
                  }}>
                  <Trash2 />
                  {copy.menu.delete}
                </button>
              </m.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    )
  }

  const pane = (
    <nav
      aria-label={copy.title}
      className="hidden w-[232px] shrink-0 flex-col @4xl:w-[275px] border-r-[0.5px] border-border bg-background p-1.5 @2xl:flex">
      <div className="flex min-h-8 items-center">
        <span className="flex min-h-8 flex-1 items-center gap-1.5 rounded-lg px-1.5 py-1 text-sm" aria-hidden="true">
          <Plus className="size-4 shrink-0" />
          <span className="truncate">{copy.add}</span>
        </span>
      </div>
      <div className="min-h-0 flex-1 pb-3">
        {GROUPS.map((group) => {
          const items = tasks.filter((item) => groupOfTask(item) === group)
          const open = !collapsed.includes(group)
          return (
            <section key={group} aria-label={copy.groups[group]} className="flex flex-col gap-1">
              <h3 className="flex h-9 items-center">
                <button
                  type="button"
                  aria-expanded={open}
                  onClick={() =>
                    setCollapsed((list) => (open ? [...list, group] : list.filter((value) => value !== group)))
                  }
                  className={cn(
                    'flex h-8 w-full cursor-pointer items-center gap-1.5 rounded-lg px-2.5 text-[13px] leading-5 font-normal text-muted-foreground hover:bg-accent/60',
                    FOCUS
                  )}>
                  {copy.groups[group]}
                  <span className="text-muted-foreground/60 tabular-nums">{items.length}</span>
                  <ChevronDown
                    aria-hidden="true"
                    className={cn('ml-auto size-3.5 transition-transform', !open && '-rotate-90')}
                  />
                </button>
              </h3>
              {open && <div className="flex flex-col gap-1">{items.map(taskRow)}</div>}
            </section>
          )
        })}
      </div>
    </nav>
  )

  const summary =
    runs[0] && isRunning(runs[0]) ? (
      <span className="flex items-center gap-1.5 text-foreground">
        <Loader2 aria-hidden="true" className="size-3 shrink-0 motion-safe:animate-spin" />
        {copy.runSummary.running}
      </span>
    ) : lastFinished ? (
      <span className="hidden items-center gap-1.5 text-muted-foreground @xl/main:flex">
        <CircleCheck aria-hidden="true" className="size-3 shrink-0" />
        {copy.runSummary.completed.replace('{time}', lastFinished.at)}
      </span>
    ) : null

  const toolbar = (
    <div className="flex min-h-11 shrink-0 flex-wrap items-center gap-2 px-3 py-1.5">
      <span className="flex size-[30px] shrink-0 items-center justify-center text-muted-foreground" aria-hidden="true">
        <SidebarCollapseIcon className="size-[18px]" />
      </span>
      <span className="min-w-0 flex-1 truncate text-sm font-medium">{task?.name ?? copy.title}</span>
      {task && runs.length > 0 && (
        <span role="status" className="inline-flex text-xs">
          <AnimatePresence mode="wait" initial={false}>
            <m.span
              key={isRunning(runs[0]) ? 'running' : runs[0].id}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.18 }}>
              {summary}
            </m.span>
          </AnimatePresence>
        </span>
      )}
      {run && (
        <div data-menu className="relative">
          <button
            type="button"
            aria-label={copy.conversation}
            aria-expanded={picker}
            onClick={() => {
              touch()
              setPicker(!picker)
            }}
            className={cn(
              'flex h-8 cursor-pointer items-center gap-1.5 rounded-md border-[0.5px] border-border bg-background px-2.5 text-[13px] whitespace-nowrap tabular-nums',
              FOCUS
            )}>
            {run.at}
            <ChevronDown className="size-4 opacity-50" aria-hidden="true" />
          </button>
          <AnimatePresence>
            {picker && (
              <m.div
                role="listbox"
                aria-label={copy.conversation}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.14, ease: ease.settle }}
                className="absolute top-full right-0 z-30 mt-1 min-w-full rounded-md border-[0.5px] border-border bg-popover p-1 shadow-md">
                {runs.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    role="option"
                    aria-selected={item.id === run.id}
                    onClick={() => {
                      setPicker(false)
                      update({ runId: item.id })
                    }}
                    className="flex h-8 w-full cursor-pointer items-center gap-2 rounded-sm pr-8 pl-2 text-left text-sm whitespace-nowrap tabular-nums hover:bg-accent">
                    {item.at}
                    {item.id === run.id && <Check className="absolute right-2 size-4" aria-hidden="true" />}
                  </button>
                ))}
              </m.div>
            )}
          </AnimatePresence>
        </div>
      )}
      <AnimatePresence initial={false}>
        {run && runs[0] && run.id !== runs[0].id && (
          <m.button
            type="button"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.94 }}
            transition={spring.tactile}
            onClick={() => {
              touch()
              update({ runId: runs[0].id })
            }}
            className={cn(
              'inline-flex h-8 cursor-pointer items-center rounded-md border-[0.5px] border-border bg-background px-3 text-[13px] font-medium whitespace-nowrap hover:bg-accent',
              FOCUS
            )}>
            {copy.latest}
          </m.button>
        )}
      </AnimatePresence>
    </div>
  )

  const empty = (text: string) => (
    <div
      role="status"
      className="flex h-full items-center justify-center p-6 text-center text-sm text-muted-foreground">
      {text}
    </div>
  )

  const conversation =
    task && run ? (
      <div key={run.id} className="mx-auto max-w-[760px] space-y-5 px-4 py-4 sm:px-6">
        <m.div
          initial={reduced ? false : { opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={spring.block}
          className="flex justify-end">
          <div className="flex max-w-[calc(100%-2.5rem)] items-start gap-2.5">
            <p className="rounded-[10px] bg-muted px-4 py-2.5 text-sm leading-relaxed">{run.prompt}</p>
            <UserAvatar className="mt-1.5" />
          </div>
        </m.div>
        <div className="flex items-start gap-2.5">
          <EmojiIcon emoji={task.agent.emoji} size={30} />
          <div className="flex min-w-0 flex-1 flex-col">
            <span className="truncate text-sm leading-5 font-semibold">{task.agent.name}</span>
            <div className="mt-2 mb-1 flex min-h-7 items-center gap-1.5 py-0.5 text-[13px] text-muted-foreground">
              {isRunning(run) ? (
                <>
                  <span>{agent.processing}</span>
                  <span aria-hidden="true" className="text-muted-foreground/70">
                    ·
                  </span>
                  <span className="min-w-0 truncate">
                    <LiveStep steps={copy.steps} active={playing} />
                  </span>
                </>
              ) : (
                <>
                  <span>{agent.processed}</span>
                  <span aria-hidden="true" className="text-muted-foreground/70">
                    ·
                  </span>
                  <span>{agent.seconds.replace('{s}', String(run.seconds))}</span>
                  <ChevronDown aria-hidden="true" className="size-3.5 -rotate-90 opacity-60" />
                </>
              )}
            </div>
            {!isRunning(run) && <Reply blocks={run.reply} locale={locale} reduced={reduced} />}
          </div>
        </div>
      </div>
    ) : task ? (
      empty(copy.noConversation)
    ) : (
      empty(copy.select)
    )

  const composer = (
    <div className="rounded-[20px] border-[0.5px] border-border bg-composer pt-2 shadow-sm" aria-hidden="true">
      <div className="min-h-[38px] px-[15px] pt-1 text-sm leading-[1.4]">
        <span className="line-clamp-1 text-muted-foreground">
          {run && isRunning(run) ? agent.placeholderBusy : agent.placeholder}
        </span>
      </div>
      <div className="flex h-10 items-center justify-between gap-4 px-2 py-1.25">
        <div className="flex min-w-0 items-center gap-1.5">
          {[ToolCase, ShieldCheck, Plus].map((Icon, index) => (
            <span key={index} className={TOOLBAR_ICON}>
              <Icon className="size-[18px]" />
            </span>
          ))}
        </div>
        <div className="flex shrink-0 items-center gap-1.5">
          <span className="flex h-7 items-center gap-1 rounded-md px-1.5 text-xs text-muted-foreground dark:text-foreground">
            <Gauge className="size-3.5 shrink-0" />
            {agent.effort.value}
            <ChevronDown className="size-[13px] shrink-0 text-muted-foreground dark:text-current" />
          </span>
          <span className="mr-0.5 flex size-[22px] items-center justify-center rounded-full bg-muted-foreground/35 text-background">
            <ArrowUp className="size-3.5" strokeWidth={2.6} />
          </span>
        </div>
      </div>
    </div>
  )

  const notificationItem = (item: DemoNotification) => {
    const isNew = item.id === copy.todayNotice.id
    const itemUnread = isNew && unread
    const open = expanded.includes(item.id)
    const taskName = item.kind === 'task' ? copy.tasks.find((entry) => entry.id === item.taskId)?.name : undefined
    return (
      <m.li
        key={item.id}
        layout={reduced ? false : 'position'}
        initial={isNew && !reduced ? { opacity: 0, height: 0 } : false}
        animate={{ opacity: 1, height: 'auto' }}
        exit={{ opacity: 0, height: 0 }}
        transition={spring.settle}
        className="group/item relative overflow-hidden border-b border-border/60 last:border-0">
        <div className="relative py-2">
          <button
            type="button"
            aria-label={item.kind === 'task' ? undefined : item.kind === 'announcement' ? item.title : item.agent.name}
            aria-expanded={item.kind === 'announcement' ? open : undefined}
            onClick={() => activate(item)}
            className={cn(
              'block w-full min-w-0 cursor-pointer rounded-md px-2 py-2 text-left text-sm transition-[background-color,transform] duration-150 group-hover/item:bg-accent group-focus-within/item:bg-accent',
              isNew && state.pressed && 'scale-[0.985] bg-accent',
              FOCUS
            )}>
            <span
              className={cn(
                'mb-1 flex min-h-5 min-w-0 items-center gap-2 pr-8',
                itemUnread ? 'font-semibold text-foreground' : 'font-normal text-muted-foreground'
              )}>
              {item.kind === 'reply' ? (
                <span className="flex min-w-0 flex-1 items-center gap-2">
                  <span className="min-w-0 truncate">{item.agent.name}</span>
                  <span className="flex size-5 shrink-0 items-center justify-center">
                    <EmojiIcon emoji={item.agent.emoji} size={18} />
                  </span>
                </span>
              ) : (
                <span className="min-w-0 flex-1 truncate">{item.kind === 'task' ? taskName : item.title}</span>
              )}
              {itemUnread && <span className="sr-only">{copy.center.unread}</span>}
            </span>
            <span
              className={cn(
                'block text-sm break-words text-muted-foreground',
                item.kind === 'announcement' && !open
                  ? 'max-h-[2lh] overflow-hidden [mask-image:linear-gradient(to_bottom,black_75%,transparent)]'
                  : item.kind !== 'announcement' && 'max-h-[2lh] overflow-hidden'
              )}>
              {item.kind === 'task' ? copy.center.completed : item.kind === 'reply' ? item.preview : item.content}
            </span>
            <span className="mt-1 flex min-h-4 items-center justify-between gap-2 text-muted-foreground/70">
              <span className="text-xs text-muted-foreground">{item.time}</span>
              {item.kind === 'task' && <CalendarClock aria-hidden="true" className="size-3.5 shrink-0" />}
              {item.kind === 'announcement' && <Megaphone aria-hidden="true" className="size-3.5 shrink-0" />}
            </span>
          </button>
          <button
            type="button"
            aria-label={copy.center.dismiss}
            onClick={() => {
              touch()
              setDismissed((list) => [...list, item.id])
              if (isNew) update({ notice: 'read' })
            }}
            className={cn(
              'absolute top-3 right-1 flex size-7 cursor-pointer items-center justify-center rounded-md text-muted-foreground/70 opacity-0 group-hover/item:opacity-100 hover:bg-background/60 focus-visible:opacity-100',
              FOCUS
            )}>
            <Check className="size-4" />
          </button>
        </div>
      </m.li>
    )
  }

  // NotificationCenter drawer: non-modal, 384px, sliding from the sidebar edge over the content card.
  const drawer = (
    <m.aside
      key="drawer"
      id="notification-center"
      aria-label={copy.center.title}
      initial={reduced ? false : { x: '-100%' }}
      animate={{ x: 0 }}
      exit={{ x: '-100%' }}
      transition={{ duration: 0.5, ease: ease.sheet }}
      className="absolute inset-y-0 left-0 z-20 flex w-[min(384px,100%)] flex-col overflow-hidden rounded-[12px] border-[0.5px] border-border bg-popover text-foreground shadow-lg">
      <div className="flex shrink-0 items-center gap-2 px-6 pt-3 pb-1">
        <h3 className="mr-auto text-sm font-medium">{copy.center.title}</h3>
        <button
          type="button"
          disabled={!unread}
          onClick={() => {
            touch()
            update({ notice: 'read' })
          }}
          className={cn(
            'h-8 cursor-pointer rounded-md text-[13px] font-medium disabled:cursor-default disabled:opacity-50',
            FOCUS
          )}>
          {copy.center.markAllRead}
        </button>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto px-4 [scrollbar-width:none]">
        <ul aria-label={copy.center.title}>
          <AnimatePresence initial={false}>{feed.map(notificationItem)}</AnimatePresence>
        </ul>
      </div>
    </m.aside>
  )

  // UserAccountPanel, opened upward from the sidebar avatar (Sidebar.tsx, side top / align start).
  const accountMenu = (
    <m.div
      key="account"
      data-account
      role="menu"
      aria-label={copy.account.label}
      initial={reduced ? false : { opacity: 0, scale: 0.96, y: 6 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96, y: 6 }}
      transition={{ duration: 0.16, ease: ease.settle }}
      className="pointer-events-auto absolute bottom-[49px] left-[7px] z-40 w-56 origin-bottom-left rounded-md border-[0.5px] border-border bg-popover p-1.5 text-foreground shadow-md">
      <div className="flex min-h-9 items-center gap-2 px-2 pb-1">
        <DefaultAvatar className="size-5" />
        <span className="truncate text-[13px] leading-[18px] font-medium">{copy.account.user}</span>
      </div>
      <div className="flex flex-col gap-0.5 border-t border-border/60 py-1">
        <button
          type="button"
          role="menuitem"
          aria-expanded={state.drawer}
          aria-controls="notification-center"
          onClick={() => {
            touch()
            update({ menu: false, drawer: !state.drawer })
          }}
          className={cn(MENU_ROW, 'cursor-pointer hover:bg-accent', !touched.current && 'bg-accent', FOCUS)}>
          <Bell className="size-4 text-muted-foreground" aria-hidden="true" />
          <span className="min-w-0 flex-1">{copy.account.notifications}</span>
          {unread && <span className="size-1.5 shrink-0 rounded-full bg-destructive" />}
          <ChevronRight className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
        </button>
        <span className={MENU_ROW} aria-hidden="true">
          <Sun className="size-4 text-muted-foreground" />
          <span className="min-w-0 flex-1 truncate">{copy.account.appearance}</span>
          <span className="flex shrink-0 items-center gap-1 text-muted-foreground">
            {copy.account.theme}
            <ChevronRight className="size-4" />
          </span>
        </span>
      </div>
      <div className="border-t border-border/60 pt-1">
        <span className={MENU_ROW} aria-hidden="true">
          <Settings className="size-4 text-muted-foreground" />
          <span className="min-w-0 flex-1">{copy.account.settings}</span>
          <span className="text-muted-foreground">⌘ ,</span>
        </span>
      </div>
    </m.div>
  )

  return (
    <div ref={ref} role="region" aria-label={copy.region} className="@container">
      <DemoFrame chromeless title={copy.title} onReplay={replay} bodyClassName="h-[570px]">
        <AppShell active="tasks" tab={{ title: copy.title }}>
          <div className="flex h-full min-h-0">
            {pane}
            <div className="@container/main flex min-w-0 flex-1 flex-col">
              {toolbar}
              <div className="relative min-h-0 flex-1 overflow-y-auto [scrollbar-width:none]">{conversation}</div>
              {task && run && <div className="shrink-0 px-3 pb-3 sm:px-5">{composer}</div>}
            </div>
          </div>
          <AnimatePresence>{state.drawer && drawer}</AnimatePresence>
        </AppShell>

        {/* Overlays on AppShell's own chrome: the simulated clock in the tab bar and the avatar's account menu. */}
        <div className="app-surface pointer-events-none absolute inset-0 text-foreground">
          <div className="absolute top-0 right-12 flex h-11 items-center" aria-hidden="true">
            <span
              className={cn(
                'flex h-6 items-center gap-1.5 overflow-hidden rounded-full border-[0.5px] border-border bg-background/70 px-2.5 text-[11px] font-medium text-muted-foreground tabular-nums transition-colors duration-300',
                state.clock === 'after' && state.phase === 'running' && 'text-foreground'
              )}>
              <Clock className="size-3" />
              {copy.clock.day}
              <span className="relative inline-flex h-4 w-[34px] items-center">
                <AnimatePresence initial={false}>
                  <m.span
                    key={state.clock}
                    initial={{ y: 12, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -12, opacity: 0 }}
                    transition={spring.tactile}
                    className="absolute inset-0 flex items-center">
                    {copy.clock[state.clock]}
                  </m.span>
                </AnimatePresence>
              </span>
            </span>
          </div>
          <button
            type="button"
            data-account
            aria-label={copy.account.label}
            aria-expanded={state.menu}
            onClick={() => {
              touch()
              update({ menu: !state.menu })
            }}
            className={cn(
              'pointer-events-auto absolute bottom-[5px] left-[7px] hidden size-9 cursor-pointer rounded-full sm:block',
              FOCUS
            )}>
            <AnimatePresence>
              {unread && (
                <m.span
                  key="dot"
                  initial={reduced ? false : { scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={spring.morph}
                  className="absolute top-0.5 right-0.5 size-1.5 rounded-full bg-destructive">
                  <span className="absolute inset-0 rounded-full bg-destructive motion-safe:animate-ping" />
                  <span className="sr-only">{copy.center.unread}</span>
                </m.span>
              )}
            </AnimatePresence>
          </button>
          <AnimatePresence>{state.menu && accountMenu}</AnimatePresence>
        </div>
      </DemoFrame>
    </div>
  )
}
