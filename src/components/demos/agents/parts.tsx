import { ChevronDown, Folder, FolderOpen, Globe, ListCollapse, type LucideIcon, Waypoints } from 'lucide-react'

import { spring } from '@/lib/motion'
import { cn } from '@/lib/utils'
import { cliIcon, providerIcon } from '../primitives/brand'
import ProviderIcon from '../primitives/ProviderIcon'

// Pieces of the desktop Agent session view shared by the agent demos.

// Desktop message block entrance: slide 10px from the right on a 0.3s spring without bounce.
export const blockEnter = { initial: { opacity: 0, x: 10 }, animate: { opacity: 1, x: 0 }, transition: spring.block }

// ComposerControlScaffolding.tsx COMPOSER_SEND_ACCESSORY_BUTTON_CLASS footprint.
export const TOOLBAR_ICON =
  'flex size-7.5 shrink-0 items-center justify-center rounded-full text-muted-foreground dark:text-foreground'

// Single-colour marks drawn in black (or currentColor, which an <img> resolves to black); inverted on dark.
const MONO_CLI = new Set([
  'open-code',
  'pi-cli',
  'qoder-cli',
  'github-copilot-cli',
  'auggie-cli',
  'cline-cli',
  'cursor-cli',
  'deepagents-cli',
  'devin-cli',
  'dimcode-cli',
  'factory-droid-cli',
  'glm-acp-agent-cli',
  'goose-cli',
  'grok-build-cli',
  'kilo-cli',
  'muse-code-cli',
  'omp-cli',
  'snow-cli',
  'zcode-cli'
])
const CLI_ASSET: Record<string, string> = { opencode: 'open-code', 'kimi-code': 'kimi-cli', pi: 'pi-cli' }
const CLI_PROVIDER: Record<string, string> = {
  openclaw: 'openclaw',
  'deepseek-harness': 'deepseek',
  'minimax-code': 'minimax'
}

export function UserAvatar({ className }: { className?: string }) {
  // Desktop default user avatar (src/renderer/assets/images/avatar.svg).
  return (
    <svg viewBox="0 0 1158 1158" aria-hidden="true" className={cn('size-[30px] shrink-0 rounded-full', className)}>
      <rect width="1158" height="1158" fill="#7EDBC2" fillOpacity="0.25" />
      <circle cx="579.5" cy="447" r="202" fill="#49B8A3" fillOpacity="0.97" />
      <path
        d="M579.5 689C796.272 689 972 864.728 972 1081.5V1158H187V1081.5C187 864.728 362.728 689 579.5 689Z"
        fill="#6ACBB9"
        fillOpacity="0.42"
      />
    </svg>
  )
}

export function EmojiAvatar({ size, emoji = '🤖' }: { size: number; emoji?: string }) {
  return (
    <span
      aria-hidden="true"
      className="relative flex shrink-0 items-center justify-center overflow-hidden rounded-full"
      style={{ width: size, height: size }}>
      <span
        className="absolute inset-0 flex scale-150 items-center justify-center opacity-40 blur-sm"
        style={{ fontSize: size * 1.2 }}>
        {emoji}
      </span>
      <span className="relative leading-none" style={{ fontSize: size * 0.7 }}>
        {emoji}
      </span>
    </span>
  )
}

export function CliLogo({ id, name }: { id: string; name: string }) {
  const asset = CLI_ASSET[id] ?? id
  const src = cliIcon(asset)
  const provider = CLI_PROVIDER[id]
  return (
    <span className="flex size-[22px] shrink-0 items-center justify-center overflow-hidden rounded-[32%] bg-muted">
      {src ? (
        <img src={src} alt="" className={cn('size-[76%] object-contain', MONO_CLI.has(asset) && 'dark:invert')} />
      ) : provider && providerIcon(provider).light ? (
        <ProviderIcon id={provider} className="size-[70%]" />
      ) : (
        <span className="font-mono text-[10px] font-semibold text-muted-foreground">{name[0]}</span>
      )}
    </span>
  )
}

export type AgentPane = 'files' | 'browser' | 'details' | 'trace'
// AgentRightPane shortcuts in order: Files, Browser (when browser control is on), Session details, Call chain.
const PANE_SHORTCUTS: { id: AgentPane; icon: LucideIcon }[] = [
  { id: 'files', icon: FolderOpen },
  { id: 'browser', icon: Globe },
  { id: 'details', icon: ListCollapse },
  { id: 'trace', icon: Waypoints }
]

/** Agent session top bar: sidebar toggle, agent, model and workspace pickers, then the side-panel tabs. */
export function AgentSessionBar({
  agentName,
  avatar,
  workspace,
  model,
  picking,
  pane,
  onPane
}: {
  agentName: string
  avatar?: string
  workspace: string
  model: { name: string; provider: string; providerName: string }
  /** The agent picker shows its chevron until the session's first message. */
  picking: boolean
  /** The right pane that is open; its shortcut shows the active state. */
  pane?: AgentPane
  /** Makes the listed shortcuts clickable, each with its accessible label. */
  onPane?: { labels: Partial<Record<AgentPane, string>>; toggle: (pane: AgentPane) => void }
}) {
  return (
    // Sized by its own column rather than the viewport, so a narrow chat beside a pane stays tidy.
    <div className="@container/bar shrink-0">
      <div className="flex h-11 items-center justify-between gap-2 px-3">
        <div className="flex min-w-0 items-center gap-0.5" aria-hidden="true">
          <span className="flex size-[30px] shrink-0 items-center justify-center text-muted-foreground">
            <svg viewBox="0 0 24 24" fill="none" className="size-[18px]">
              <rect x="3.5" y="4" width="17" height="16" rx="4" stroke="currentColor" strokeWidth="1.7" />
              <path d="M9.5 5v14" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7" />
            </svg>
          </span>
          <span className="flex size-7 shrink-0 items-center justify-center">
            <EmojiAvatar size={20} emoji={avatar} />
          </span>
          <span className="hidden h-8 shrink-0 items-center gap-1.5 rounded-lg px-2.5 text-xs font-medium @lg/bar:flex">
            {agentName}
            {picking && <ChevronDown className="size-3.5 text-muted-foreground" />}
          </span>
          <span className="flex h-8 min-w-0 items-center gap-1.5 overflow-hidden rounded-lg px-2.5 text-xs font-medium">
            <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-background">
              <ProviderIcon id={model.provider} className="size-3.5" />
            </span>
            <span className="hidden truncate @md/bar:inline">
              {model.name} | {model.providerName}
            </span>
            <ChevronDown className="hidden size-3.5 shrink-0 text-muted-foreground @md/bar:block" />
          </span>
          <span className="flex h-8 shrink-0 items-center gap-1.5 rounded-lg px-2.5 text-xs font-medium">
            <Folder className="size-5 text-muted-foreground" />
            <span className="hidden @sm/bar:inline">{workspace}</span>
            <ChevronDown className="hidden size-3.5 text-muted-foreground @sm/bar:block" />
          </span>
        </div>
        <div className="flex shrink-0 items-center gap-0.5 text-muted-foreground">
          {PANE_SHORTCUTS.map(({ id, icon: Icon }) => {
            const className = cn(
              'flex size-[30px] items-center justify-center rounded-md',
              pane === id && 'bg-secondary text-foreground'
            )
            const label = onPane?.labels[id]
            return label ? (
              <button
                key={id}
                type="button"
                aria-label={label}
                aria-pressed={pane === id}
                data-pane={id}
                onClick={() => onPane?.toggle(id)}
                className={cn(
                  className,
                  'cursor-pointer hover:bg-accent/60 hover:text-foreground focus-visible:outline-2 focus-visible:outline-primary'
                )}>
                <Icon className="size-3.5" />
              </button>
            ) : (
              <span key={id} className={className} aria-hidden="true">
                <Icon className="size-3.5" />
              </span>
            )
          })}
        </div>
      </div>
    </div>
  )
}
