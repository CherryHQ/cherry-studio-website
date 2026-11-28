import { Check } from 'lucide-react'
import type { ReactNode, SVGProps } from 'react'

import { cn } from '@/lib/utils'
import { providerIcon } from '../primitives/brand'

/**
 * Light/dark values of the mobile design tokens (packages/design-tokens native.css), so the phone
 * keeps the app's own neutral palette whatever the site theme accent is.
 */
export const tone = {
  background: 'bg-[#f5f5f5] dark:bg-black',
  chat: 'bg-[#f9f9f9] dark:bg-black',
  card: 'bg-white dark:bg-[#1a1a1a]',
  sheet: 'bg-[#f5f5f5] dark:bg-[#2a2a2a]',
  secondary: 'bg-black/5 dark:bg-white/[0.07]',
  secondaryActive: 'bg-black/10 dark:bg-white/[0.13]',
  sidebarAccent: 'bg-[#f2f2f2] dark:bg-[#1f1f1f]',
  foreground: 'text-[#171717] dark:text-[#ededed]',
  muted: 'text-[#4d4d4d] dark:text-[#a0a0a0]',
  tertiary: 'text-[#7d7d7d]',
  placeholder: 'text-[#8e8e93] dark:text-[#8e8e93]',
  border: 'border-black/[0.08] dark:border-white/[0.09]',
  borderSubtle: 'border-black/5 dark:border-white/[0.07]',
  /** tag-blue / tag-blue-foreground */
  tagBlue:
    'bg-[oklch(0.973_0.014_251.6)] text-[oklch(0.532_0.24_257)] dark:bg-[oklch(0.222_0.069_259.9)] dark:text-[oklch(0.717_0.165_250.8)]',
  tagBlueText: 'text-[oklch(0.532_0.24_257)] dark:text-[oklch(0.717_0.165_250.8)]',
  tagRedText: 'text-[oklch(0.55_0.232_25.3)] dark:text-[oklch(0.7_0.19_22)]'
} as const

/** Focus ring sized for the scaled phone canvas, where 2px would render thinner than a hairline. */
export const canvasFocus = 'focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#2563eb]'

type IconProps = SVGProps<SVGSVGElement>

/** appShell/icons/SidebarExpandIcon: desktop's expand-sidebar glyph. */
export function SidebarIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" {...props}>
      <rect x="3.5" y="4" width="17" height="16" rx="4" />
      <path d="M9.5 5v14" />
    </svg>
  )
}

/** appShell/icons/NewConversationIcon: desktop's branded new-conversation glyph. */
export function NewChatIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}>
      <g transform="translate(12 12) scale(1.1) translate(-12 -12)">
        <path d="M13 4H6a2 2 0 0 0-2 2v13l4-3h10a2 2 0 0 0 2-2v-3" />
        <path d="M18 3.5v5" />
        <path d="M15.5 6h5" />
      </g>
    </svg>
  )
}

/** app-icons send: desktop iconfont U+E795, a disc with the upward arrow cut out of it. */
export function SendGlyph(props: IconProps) {
  return (
    <svg viewBox="0 0 1024 1024" {...props}>
      <path
        fill="currentColor"
        fillRule="evenodd"
        transform="translate(0 896) scale(1 -1)"
        d="M512 -85a469 469 0 1 1 0 938a469 469 0 1 1 0-938z M501 588Q511 597 524 597Q537 597 547 588L697 438Q707 428 707 415Q707 402 697.5 392.5Q688 383 674.5 383Q661 383 652 392L556 488V171Q556 157 546.5 148Q537 139 524 139Q511 139 501.5 148Q492 157 492 171V488L396 393Q387 383 373.5 383Q360 383 350.5 392.5Q341 402 341 415Q341 428 351 438Z"
      />
    </svg>
  )
}

/** ModelPickerFilterIcon */
export function FilterIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}>
      <path d="M3 7h2.5m5 0H21M3 17h10.5m5 0H21" />
      <circle cx="8" cy="7" r="2.5" />
      <circle cx="16" cy="17" r="2.5" />
    </svg>
  )
}

const glassSurface =
  'bg-white/85 shadow-[0_2px_14px_rgb(0_0_0/0.09)] ring-1 ring-black/[0.04] backdrop-blur-xl dark:bg-[#1a1a1a]/85 dark:shadow-[0_2px_14px_rgb(0_0_0/0.5)] dark:ring-white/10'

/** A header action on the iOS glass toolbar: a 46pt circle (or capsule) floating over the content. */
export function GlassButton({
  label,
  onClick,
  children,
  className
}: {
  label: string
  onClick?: () => void
  children: ReactNode
  className?: string
}) {
  const base = cn('flex size-[46px] shrink-0 items-center justify-center rounded-full', glassSurface, className)
  if (!onClick) {
    return (
      <span aria-hidden="true" className={base}>
        {children}
      </span>
    )
  }
  return (
    <button type="button" aria-label={label} onClick={onClick} className={cn(base, 'cursor-pointer', canvasFocus)}>
      {children}
    </button>
  )
}

export function GlassCapsule({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn('flex h-[46px] min-w-0 items-center rounded-full', glassSurface, className)}>{children}</span>
  )
}

/** AgentAvatar for the seeded Agent: its 🍒 emoji on a neutral disc. */
export function CherryAvatar({ size = 24, className }: { size?: number; className?: string }) {
  return (
    <span
      aria-hidden="true"
      style={{ width: size, height: size, fontSize: size * 0.62 }}
      className={cn(
        'flex shrink-0 items-center justify-center rounded-full border border-black/[0.08] bg-white leading-none dark:border-white/10 dark:bg-[#1f1f1f]',
        className
      )}>
      🍒
    </span>
  )
}

/** Light provider artwork. It is full-bleed tile art, so it fills whatever shape clips it. */
export function BrandMark({ id, className }: { id: string; className?: string }) {
  return <img src={providerIcon(id).light} alt="" className={cn('object-cover', className)} />
}

/** Brand artwork clipped to a disc, as the model and provider avatars draw it. */
export function BrandAvatar({ id, size = 28, className }: { id: string; size?: number; className?: string }) {
  return (
    <span
      aria-hidden="true"
      style={{ width: size, height: size }}
      className={cn(
        'flex shrink-0 overflow-hidden rounded-full bg-white ring-1 ring-black/[0.06] dark:ring-white/10',
        className
      )}>
      <BrandMark id={id} className="size-full" />
    </span>
  )
}

/**
 * MainHeaderView: the sidebar button, then the Agent capsule (24pt avatar and medium name, no chevron)
 * on the left; New chat always closes the row on the right.
 */
export function ChatHeader({
  agentName,
  sidebarLabel,
  newChatLabel,
  onSidebar,
  onNewChat,
  agentSwitch,
  topInset = 54
}: {
  agentName: string
  sidebarLabel: string
  newChatLabel: string
  onSidebar?: () => void
  onNewChat?: () => void
  /** Wide windows add the bot-and-chevron Agent picker beside the capsule. */
  agentSwitch?: ReactNode
  topInset?: number
}) {
  return (
    <div className="absolute inset-x-0 top-0 z-20">
      <div
        aria-hidden="true"
        style={{ height: topInset + 70 }}
        className="pointer-events-none absolute inset-x-0 top-0 bg-linear-to-b from-[#f9f9f9] from-55% to-[#f9f9f9]/0 dark:from-black dark:to-black/0"
      />
      <div className="relative flex h-[56px] items-center gap-1 px-4" style={{ marginTop: topInset }}>
        <GlassButton label={sidebarLabel} onClick={onSidebar}>
          <SidebarIcon className="size-[21px]" />
        </GlassButton>
        <GlassCapsule className="ms-1 gap-2 ps-3 pe-4">
          <CherryAvatar />
          <span className="truncate text-[16px] font-medium">{agentName}</span>
        </GlassCapsule>
        {agentSwitch}
        <span className="ms-auto flex items-center gap-2">
          <GlassButton label={newChatLabel} onClick={onNewChat}>
            <NewChatIcon className="size-[21px]" />
          </GlassButton>
        </span>
      </div>
    </div>
  )
}

/** Composer surface: a 26pt-radius card with a hairline border and the iOS field shadow. */
export function ComposerSurface({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        'rounded-[26px] border px-[10px] py-[9px] shadow-[0_4px_18px_-6px_rgb(0_0_0/0.12)]',
        tone.card,
        tone.border,
        className
      )}>
      {children}
    </div>
  )
}

/** Composer.Action: a 32pt circle on the secondary fill. */
export function ComposerCircle({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn('flex size-8 shrink-0 items-center justify-center rounded-full', tone.secondary, className)}>
      {children}
    </span>
  )
}

/** Composer.Send: the 32pt send glyph, dimmed while there is nothing to send; a pause icon while streaming. */
export function SendSlot({ state }: { state: 'disabled' | 'ready' | 'stop' }) {
  if (state === 'stop') {
    return (
      <span aria-hidden="true" className="flex size-8 shrink-0 items-center justify-center">
        <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth={2}>
          <rect x="14" y="4" width="4" height="16" rx="1" />
          <rect x="6" y="4" width="4" height="16" rx="1" />
        </svg>
      </span>
    )
  }
  return (
    <SendGlyph
      aria-hidden="true"
      className={cn(
        'size-8 shrink-0 transition-colors duration-200',
        state === 'ready' ? 'text-[#171717] dark:text-[#ededed]' : 'text-[#7d7d7d] dark:text-[#5e5e5e]'
      )}
    />
  )
}

/** SelectionIndicator: a foreground disc with a check when selected, a strong ring otherwise. */
export function SelectionMark({ selected, square }: { selected: boolean; square?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'flex size-6 shrink-0 items-center justify-center',
        square ? 'rounded-md' : 'rounded-full',
        selected
          ? 'bg-[#171717] text-white dark:bg-[#ededed] dark:text-black'
          : 'border-2 border-black/[0.21] dark:border-white/[0.24]'
      )}>
      {selected && <Check className="size-4" strokeWidth={2.4} />}
    </span>
  )
}

/** BottomSheet drag handle: 36×4 on border-strong. */
export function SheetHandle({ className }: { className?: string }) {
  return (
    <span aria-hidden="true" className={cn('flex h-8 shrink-0 items-start justify-center pt-3', className)}>
      <span className="h-1 w-9 rounded-full bg-black/[0.21] dark:bg-white/[0.24]" />
    </span>
  )
}
