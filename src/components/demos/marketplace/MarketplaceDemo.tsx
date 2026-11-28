import { AnimatePresence, m, useReducedMotion } from 'framer-motion'
import {
  BookOpen,
  Bot,
  Brain,
  BrainCircuit,
  Check,
  CheckCircle2,
  Code,
  Cpu,
  Database,
  Download,
  ExternalLink,
  FileText,
  Folder,
  Globe,
  Layers,
  Loader2,
  type LucideIcon,
  Package,
  Palette,
  Plus,
  Search,
  Settings2,
  Sparkles,
  Terminal,
  Workflow,
  X
} from 'lucide-react'
import { type ReactNode, type SVGProps, useEffect, useRef, useState } from 'react'

import bailianLogo from '@/assets/images/brand/mcp/bailian.svg'
import braveLogo from '@/assets/images/brand/mcp/brave.svg'
import composioLogo from '@/assets/images/brand/mcp/composio.svg'
import didiLogo from '@/assets/images/brand/mcp/didi.svg'
import difyLogo from '@/assets/images/brand/mcp/dify.svg'
import flomoLogo from '@/assets/images/brand/mcp/flomo.png'
import githubLogo from '@/assets/images/brand/mcp/github.png'
import glamaLogo from '@/assets/images/brand/mcp/glama.svg'
import higressLogo from '@/assets/images/brand/mcp/higress.svg'
import mcpLogo from '@/assets/images/brand/mcp/mcp.svg'
import mcpDarkLogo from '@/assets/images/brand/mcp/mcp-dark.svg'
import mcpsoLogo from '@/assets/images/brand/mcp/mcpso.svg'
import mcpworldLogo from '@/assets/images/brand/mcp/mcpworld.png'
import modelscopeLogo from '@/assets/images/brand/mcp/modelscope.svg'
import nowledgeLogo from '@/assets/images/brand/mcp/nowledge.png'
import pulseLogo from '@/assets/images/brand/mcp/pulse.svg'
import pythonLogo from '@/assets/images/brand/mcp/python.svg'
import qverisLogo from '@/assets/images/brand/mcp/qveris.webp'
import smitheryLogo from '@/assets/images/brand/mcp/smithery.svg'
import pdfLogo from '@/assets/images/brand/skill/pdf.svg'
import playwrightLogo from '@/assets/images/brand/skill/playwright.svg'
import powerpointLogo from '@/assets/images/brand/skill/powerpoint.svg'
import tableLogo from '@/assets/images/brand/skill/table.svg'
import wordLogo from '@/assets/images/brand/skill/word.svg'
import {
  type MarketplaceCopy,
  type MarketplaceSkillItem,
  type MarketplaceView,
  type McpSourceLogo,
  marketplaceDemo,
  marketplaceScript,
  type SkillIconName
} from '@/content/demos/marketplace'
import { ease } from '@/lib/motion'
import { cn } from '@/lib/utils'
import AppShell from '../primitives/AppShell'
import { providerIcon } from '../primitives/brand'
import DemoFrame from '../primitives/DemoFrame'
import { useDemoLocale } from '../primitives/useDemoLocale'
import { useDemoPlayback, useDemoScript } from '../primitives/useDemoScript'

type Detail = { kind: 'skill' | 'agent' | 'mcp'; id: string }

interface MarketState {
  view: MarketplaceView
  queries: Record<MarketplaceView, string>
  skillCategory: string
  agentCategory: string
  /** The MCP view's More sources tab instead of Picks. */
  mcpSources: boolean
  detail: Detail | null
  installed: string[]
  /** The skill being installed. */
  installing: string | null
  pressed: string | null
  toast: { key: number; id: string } | null
}

const INITIAL: MarketState = {
  view: 'all',
  queries: { all: '', skill: '', agent: '', mcp: '' },
  skillCategory: '',
  agentCategory: '',
  mcpSources: false,
  detail: null,
  installed: [],
  installing: null,
  pressed: null,
  toast: null
}
const FINAL: MarketState = {
  ...INITIAL,
  view: 'skill',
  queries: { ...INITIAL.queries, skill: marketplaceScript.query },
  mcpSources: true,
  detail: { kind: 'skill', id: marketplaceScript.skill },
  installed: [marketplaceScript.skill]
}

const VIEWS: { id: MarketplaceView; icon: LucideIcon | typeof McpLogo }[] = [
  { id: 'all', icon: Layers },
  { id: 'skill', icon: Sparkles },
  { id: 'agent', icon: Bot },
  { id: 'mcp', icon: McpLogo }
]
const SKILL_ICONS: Record<SkillIconName, LucideIcon> = {
  'file-text': FileText,
  palette: Palette,
  terminal: Terminal,
  'book-open': BookOpen,
  cpu: Cpu,
  database: Database,
  sparkles: Sparkles,
  workflow: Workflow,
  brain: Brain,
  code: Code
}
// Deliberately unlike the app's grey line icons: each item gets its own mark. Brand and file-type marks (FileIcon's
// material-icon-theme set, each service's own logo) sit on a neutral tile; the rest are glyphs on a tint of their own.
type Logo = { logo: string; dark?: string; fill?: boolean }
const TINT = {
  pink: 'bg-pink-500/12 text-pink-600 dark:text-pink-400',
  violet: 'bg-violet-500/12 text-violet-600 dark:text-violet-400',
  teal: 'bg-teal-500/12 text-teal-600 dark:text-teal-400',
  indigo: 'bg-indigo-500/12 text-indigo-600 dark:text-indigo-400',
  sky: 'bg-sky-500/12 text-sky-600 dark:text-sky-400',
  amber: 'bg-amber-500/14 text-amber-600 dark:text-amber-400'
}
// Skills without a mark keep their catalog glyph.
const SKILL_ART: Record<string, Logo | { tint: string }> = {
  pdf: { logo: pdfLogo },
  'frontend-design': { tint: TINT.pink },
  'webapp-testing': { logo: playwrightLogo },
  docx: { logo: wordLogo },
  'mcp-builder': { logo: mcpLogo, dark: mcpDarkLogo, fill: true },
  xlsx: { logo: tableLogo },
  'skill-creator': { tint: TINT.violet },
  pptx: { logo: powerpointLogo },
  'deep-research': { tint: TINT.teal },
  changelog: { tint: TINT.indigo }
}
// Third-party servers wear their service's logo; Cherry's own servers keep builtinMcpIcons' glyphs, tinted.
const MCP_ART: Record<string, Logo | { icon: LucideIcon; tint: string }> = {
  flomo: { logo: flomoLogo, fill: true },
  qveris: { logo: qverisLogo },
  mcpAutoInstall: { logo: mcpLogo, dark: mcpDarkLogo, fill: true },
  sequentialThinking: { icon: Workflow, tint: TINT.teal },
  fetch: { icon: Globe, tint: TINT.sky },
  memory: { icon: BrainCircuit, tint: TINT.violet },
  filesystem: { icon: Folder, tint: TINT.amber },
  braveSearch: { logo: braveLogo },
  python: { logo: pythonLogo },
  difyKnowledge: { logo: difyLogo, fill: true },
  didiMcp: { logo: didiLogo },
  nowledgeMem: { logo: nowledgeLogo, fill: true }
}
// Registry tiles keep one artwork in both themes, except the zhipu and MCP marks.
const zhipu = providerIcon('zhipu')
// `plate` marks remote non-tile artwork, set on a white tile.
const SOURCE_LOGOS: Record<McpSourceLogo, { src: string; dark?: string; plate?: 'inset' | 'full' }> = {
  bailian: { src: bailianLogo },
  modelscope: { src: modelscopeLogo },
  mcpworld: { src: mcpworldLogo, plate: 'inset' },
  zhipu: { src: zhipu.light, dark: zhipu.dark },
  higress: { src: higressLogo },
  mcpso: { src: mcpsoLogo },
  smithery: { src: smitheryLogo },
  glama: { src: glamaLogo },
  pulse: { src: pulseLogo },
  composio: { src: composioLogo },
  mcp: { src: mcpLogo, dark: mcpDarkLogo },
  github: { src: githubLogo, plate: 'full' }
}
const FOCUS = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
// packages/ui product tokens: border-subtle, background-subtle and foreground-tertiary.
const SUBTLE_BORDER = 'border-foreground/[0.06]'
const SUBTLE_BG = 'bg-foreground/[0.025]'
const TERTIARY = 'text-muted-foreground/80'
// @cherrystudio/ui Button size sm; ghost variant hovers to accent.
const BUTTON_SM = 'inline-flex min-h-7 shrink-0 items-center justify-center gap-1.5 rounded-md px-2.5 text-xs'
const GHOST = 'cursor-pointer hover:bg-accent'
// Desktop default theme colour (preference ui.theme_user.color_primary) fills the active source chip.
const THEME_PRIMARY = 'bg-[#00b96b] text-white'
const SUCCESS = 'text-green-600 dark:text-green-400'

function McpLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" fillRule="evenodd" aria-hidden="true" {...props}>
      <path d="M15.688 2.343a2.588 2.588 0 00-3.61 0l-9.626 9.44a.863.863 0 01-1.203 0 .823.823 0 010-1.18l9.626-9.44a4.313 4.313 0 016.016 0 4.116 4.116 0 011.204 3.54 4.3 4.3 0 013.609 1.18l.05.05a4.115 4.115 0 010 5.9l-8.706 8.537a.274.274 0 000 .393l1.788 1.754a.823.823 0 010 1.18.863.863 0 01-1.203 0l-1.788-1.753a1.92 1.92 0 010-2.754l8.706-8.538a2.47 2.47 0 000-3.54l-.05-.049a2.588 2.588 0 00-3.607-.003l-7.172 7.034-.002.002-.098.097a.863.863 0 01-1.204 0 .823.823 0 010-1.18l7.273-7.133a2.47 2.47 0 00-.003-3.537z" />
      <path d="M14.485 4.703a.823.823 0 000-1.18.863.863 0 00-1.204 0l-7.119 6.982a4.115 4.115 0 000 5.9 4.314 4.314 0 006.016 0l7.12-6.982a.823.823 0 000-1.18.863.863 0 00-1.204 0l-7.119 6.982a2.588 2.588 0 01-3.61 0 2.47 2.47 0 010-3.54l7.12-6.982z" />
    </svg>
  )
}

/** Logo artwork that swaps to its dark file under the dark theme. */
function Logo({ src, dark, className }: { src: string; dark?: string; className?: string }) {
  return (
    <>
      <img src={src} alt="" draggable={false} className={cn(className, dark && 'dark:hidden')} />
      {dark && <img src={dark} alt="" draggable={false} className={cn(className, 'hidden dark:block')} />}
    </>
  )
}

const RAISED_TILE =
  'bg-linear-to-b from-white to-neutral-100 shadow-[0_1px_2px_rgb(0_0_0/0.06)] dark:from-neutral-700 dark:to-neutral-800'
// A hairline drawn above the artwork, so white tiles keep an edge on white cards.
const TILE_EDGE =
  'relative after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:ring-1 after:ring-black/5 after:ring-inset dark:after:ring-white/10'

/** One item's mark: a logo filling the tile or inset on a neutral one, or a glyph on its own tint. */
function ItemTile({
  art,
  icon: Icon,
  large,
  rounded
}: {
  art: Logo | { tint: string }
  icon: LucideIcon
  large?: boolean
  rounded: string
}) {
  const logo = 'logo' in art ? art : null
  return (
    <span
      aria-hidden="true"
      className={cn(
        'flex shrink-0 items-center justify-center overflow-hidden',
        TILE_EDGE,
        rounded,
        large ? 'size-14' : 'size-10',
        logo ? !logo.fill && RAISED_TILE : (art as { tint: string }).tint
      )}>
      {logo?.fill ? (
        <Logo src={logo.logo} dark={logo.dark} className="size-full object-cover" />
      ) : logo ? (
        <Logo src={logo.logo} dark={logo.dark} className={cn('object-contain', large ? 'size-8' : 'size-6')} />
      ) : (
        <Icon className={large ? 'size-7' : 'size-5'} strokeWidth={2} />
      )}
    </span>
  )
}

function SkillIcon({ skill, large }: { skill: MarketplaceSkillItem; large?: boolean }) {
  return (
    <ItemTile
      art={SKILL_ART[skill.id] ?? { tint: TINT.indigo }}
      icon={SKILL_ICONS[skill.icon]}
      large={large}
      rounded={large ? 'rounded-2xl' : 'rounded-xl'}
    />
  )
}

/** BuiltinMcpIcon's tile: mini-app icons round the MCP tile at 10px. */
function McpIcon({ icon, large }: { icon: string; large?: boolean }) {
  const art = MCP_ART[icon]
  return <ItemTile art={art} icon={'icon' in art ? art.icon : Globe} large={large} rounded="rounded-[10px]" />
}

/** McpSourceIcon in a 40px rounded-lg box; tile artwork fills it rather than the app's inset 32px square. */
function SourceIcon({ logo }: { logo: McpSourceLogo }) {
  const { src, dark, plate } = SOURCE_LOGOS[logo]
  return (
    <span
      aria-hidden="true"
      className={cn(
        'flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-lg',
        TILE_EDGE,
        plate && 'bg-white'
      )}>
      <Logo src={src} dark={dark} className={cn('object-contain', plate === 'inset' ? 'size-6' : 'size-full')} />
    </span>
  )
}

/** EmojiIcon (fluid): the avatar over a blurred, enlarged copy of itself. */
function AgentAvatar({ emoji, large }: { emoji: string; large?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'relative flex shrink-0 items-center justify-center overflow-hidden',
        large ? 'size-14 rounded-2xl border bg-background shadow-sm' : 'size-10 rounded-xl',
        large && SUBTLE_BORDER
      )}>
      <span
        className="absolute inset-0 flex scale-150 items-center justify-center opacity-40 blur-sm"
        style={{ fontSize: large ? 64 : 46 }}>
        {emoji}
      </span>
      <span className="relative leading-none" style={{ fontSize: large ? 30 : 22 }}>
        {emoji}
      </span>
    </span>
  )
}

/** MarketplaceCard: an open button over the icon, name and description, with a round action on the right. */
function Card({
  name,
  description,
  icon,
  pressed,
  hovered,
  onOpen,
  action,
  children
}: {
  name: string
  description: string
  icon: ReactNode
  pressed: boolean
  hovered?: boolean
  onOpen?: () => void
  action: ReactNode
  children?: ReactNode
}) {
  return (
    <div
      className={cn(
        'flex h-full min-w-0 items-center gap-2 rounded-2xl border pr-3 transition-[background-color,scale] duration-150 hover:bg-accent/50',
        SUBTLE_BORDER,
        hovered && 'bg-accent/50',
        pressed && 'scale-[0.985] bg-accent/60'
      )}>
      <button
        type="button"
        onClick={onOpen}
        className={cn(
          'flex min-h-20 min-w-0 flex-1 items-center gap-3 rounded-2xl p-3 text-left',
          onOpen && 'cursor-pointer',
          FOCUS
        )}>
        {icon}
        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm font-medium" title={name}>
            {name}
          </span>
          <span className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">{description}</span>
          {children}
        </span>
      </button>
      {action}
    </div>
  )
}

function CardAction({
  label,
  onClick,
  pressed,
  busy,
  className,
  children
}: {
  label: string
  onClick?: () => void
  pressed?: boolean
  busy?: boolean
  className?: string
  children: ReactNode
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      aria-busy={busy}
      onClick={onClick}
      className={cn(
        'flex size-7 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-[background-color,scale] duration-150',
        SUBTLE_BG,
        onClick ? 'cursor-pointer hover:bg-accent' : 'cursor-default',
        pressed && 'scale-90 bg-accent',
        FOCUS,
        className
      )}>
      {children}
    </button>
  )
}

function Grid({ children }: { children: ReactNode }) {
  return <div className="grid grid-cols-1 gap-x-4 gap-y-2 @[720px]:grid-cols-2">{children}</div>
}

// Cards fade in when a filter brings them back; filtered-out cards leave at once, like the real grid.
function gridItem(id: string, children: ReactNode) {
  return (
    <m.div
      key={id}
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2, ease: ease.settle }}
      className="min-w-0">
      {children}
    </m.div>
  )
}

/** MarketplaceCategoryFilter: All plus each category as round ghost chips. */
function CategoryFilter({
  label,
  all,
  categories,
  value,
  names,
  onChange
}: {
  label: string
  all: string
  categories: string[]
  value: string
  names: Record<string, string>
  onChange: (category: string) => void
}) {
  return (
    <div
      role="group"
      aria-label={label}
      className="mb-3 flex shrink-0 gap-1 overflow-x-auto pr-4 [scrollbar-width:none]">
      {['', ...categories].map((group) => (
        <button
          key={group}
          type="button"
          aria-pressed={value === group}
          onClick={() => onChange(group)}
          className={cn(BUTTON_SM, GHOST, 'rounded-full', value === group && 'bg-accent', FOCUS)}>
          {group ? (names[group] ?? group) : all}
        </button>
      ))}
    </div>
  )
}

/**
 * The Marketplace page of Cherry Studio 2.2: skill catalogs, Agent templates and MCP servers behind one search. The
 * script browses the MCP sources, searches the skill catalog, opens a skill and installs it from its detail dialog.
 */
export default function MarketplaceDemo({ bezel }: { bezel?: boolean }) {
  const { locale, tag } = useDemoLocale()
  const copy: MarketplaceCopy = marketplaceDemo[locale]
  const reduced = useReducedMotion() ?? false
  const ref = useRef<HTMLDivElement>(null)
  const body = useRef<HTMLDivElement>(null)
  const playing = useDemoPlayback(ref)
  const [state, setState] = useState<MarketState>(INITIAL)
  const update = (patch: Partial<MarketState>) => setState((previous) => ({ ...previous, ...patch }))
  const setQuery = (view: MarketplaceView, value: string) =>
    setState((previous) => ({ ...previous, queries: { ...previous.queries, [view]: value } }))

  const startInstall = (id: string) =>
    setState((previous) =>
      previous.installing || previous.installed.includes(id) ? previous : { ...previous, installing: id }
    )

  const { replay } = useDemoScript(async ({ wait, reduced: skip }) => {
    if (skip) {
      setState(FINAL)
      return
    }
    setState(INITIAL)
    const tap = async (id: string, ms: number) => {
      update({ pressed: id })
      await wait(ms)
      update({ pressed: null })
    }
    // A glance at the MCP sources, then the skill install lands at about three seconds.
    await wait(200)
    await tap('nav:mcp', 100)
    update({ view: 'mcp' })
    await wait(220)
    await tap('chip:sources', 100)
    update({ mcpSources: true })
    await wait(200)
    update({ pressed: `hover:${marketplaceScript.mcpSource}` })
    await wait(420)
    update({ pressed: null })
    await wait(80)
    await tap('nav:skill', 100)
    update({ view: 'skill' })
    await wait(180)
    for (let i = 1; i <= marketplaceScript.query.length; i++) {
      setQuery('skill', marketplaceScript.query.slice(0, i))
      await wait(50)
    }
    await wait(160)
    await tap(`skill:${marketplaceScript.skill}`, 100)
    update({ detail: { kind: 'skill', id: marketplaceScript.skill } })
    await wait(340)
    await tap('install', 90)
    startInstall(marketplaceScript.skill)
  }, playing)

  // As in the app, the button shows Loading… until the package is installed.
  useEffect(() => {
    const id = state.installing
    if (!id) return
    const timer = setTimeout(
      () =>
        setState((previous) =>
          previous.installing !== id
            ? previous
            : {
                ...previous,
                installing: null,
                installed: [...previous.installed, id],
                toast: { key: Date.now(), id }
              }
        ),
      700
    )
    return () => clearTimeout(timer)
  }, [state.installing])

  useEffect(() => {
    if (!state.toast) return
    const timer = setTimeout(() => setState((previous) => ({ ...previous, toast: null })), 2600)
    return () => clearTimeout(timer)
  }, [state.toast])

  // Keep the install result in view inside the detail body.
  const openSkill = state.detail?.kind === 'skill' ? state.detail.id : ''
  const scrollTarget =
    openSkill && state.installing === openSkill
      ? `${openSkill}:busy`
      : openSkill && state.installed.includes(openSkill)
        ? `${openSkill}:done`
        : ''
  useEffect(() => {
    if (!scrollTarget || !body.current) return
    body.current.scrollTo({ top: body.current.scrollHeight, behavior: reduced ? 'auto' : 'smooth' })
  }, [scrollTarget, reduced])

  const query = state.queries[state.view]
  const keyword = query.trim().toLocaleLowerCase()
  const matches = (values: string[]) => values.join(' ').toLocaleLowerCase().includes(keyword)
  const skillText = (id: string) => copy.skills[id]
  const domainName = (domain: string) => copy.domains[domain] ?? domain
  const skillCategories = [...new Set(marketplaceScript.skills.map((skill) => skill.domain))]
  const agentCategories = [...new Set(marketplaceScript.agents.map((agent) => agent.category))]

  const skills = (preview: boolean) =>
    marketplaceScript.skills.filter(
      (skill) =>
        (preview || !state.skillCategory || skill.domain === state.skillCategory) &&
        matches([skillText(skill.id).name, skillText(skill.id).description, skill.author, ...skill.tags])
    )
  const agents = (preview: boolean) =>
    marketplaceScript.agents.filter(
      (agent) =>
        (preview || !state.agentCategory || agent.category === state.agentCategory) &&
        matches([copy.agents[agent.id].name, copy.agents[agent.id].description, agent.instructions, agent.category])
    )
  const servers = () => marketplaceScript.mcp.filter((server) => matches([server.name, copy.mcp[server.name]]))
  const counts: Record<MarketplaceView, number> = {
    skill: marketplaceScript.skills.length,
    agent: marketplaceScript.agents.length,
    mcp: marketplaceScript.mcp.length,
    all: marketplaceScript.skills.length + marketplaceScript.agents.length + marketplaceScript.mcp.length
  }

  const open = (detail: Detail) => update({ detail })
  const close = () => setState((previous) => (previous.installing ? previous : { ...previous, detail: null }))

  const skillCard = (skill: MarketplaceSkillItem) => {
    const text = skillText(skill.id)
    const installed = state.installed.includes(skill.id)
    const busy = state.installing === skill.id
    const label = installed ? copy.uninstall : copy.install
    return gridItem(
      skill.id,
      <Card
        name={text.name}
        description={text.description}
        icon={<SkillIcon skill={skill} />}
        pressed={state.pressed === `skill:${skill.id}`}
        onOpen={() => open({ kind: 'skill', id: skill.id })}
        action={
          <CardAction
            label={`${label}: ${text.name}`}
            busy={busy}
            onClick={installed || busy ? undefined : () => startInstall(skill.id)}
            className={installed ? 'hover:bg-destructive/10 hover:text-destructive' : undefined}>
            <AnimatePresence mode="popLayout" initial={false}>
              <m.span
                key={busy ? 'busy' : installed ? 'done' : 'add'}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.18, ease: ease.overshoot }}
                className="flex">
                {busy ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : installed ? (
                  <Check className="size-4" />
                ) : (
                  <Plus className="size-4" />
                )}
              </m.span>
            </AnimatePresence>
          </CardAction>
        }
      />
    )
  }

  const agentCard = (agent: (typeof marketplaceScript.agents)[number]) =>
    gridItem(
      agent.id,
      <Card
        name={copy.agents[agent.id].name}
        description={copy.agents[agent.id].description}
        icon={<AgentAvatar emoji={agent.avatar} />}
        pressed={state.pressed === `agent:${agent.id}`}
        onOpen={() => open({ kind: 'agent', id: agent.id })}
        action={
          <CardAction label={`${copy.add}: ${copy.agents[agent.id].name}`}>
            <Plus className="size-4" />
          </CardAction>
        }>
        <span className={cn('mt-1 block truncate text-xs', TERTIARY)}>{domainName(agent.category)}</span>
      </Card>
    )

  const mcpCard = (server: (typeof marketplaceScript.mcp)[number]) =>
    gridItem(
      server.name,
      <Card
        name={server.name}
        description={copy.mcp[server.name]}
        icon={<McpIcon icon={server.icon} />}
        pressed={false}
        onOpen={() => open({ kind: 'mcp', id: server.name })}
        action={
          <CardAction label={`${copy.add}: ${server.name}`}>
            <Plus className="size-4" />
          </CardAction>
        }>
        {server.shouldConfig && <span className={cn('mt-1 block text-xs', TERTIARY)}>{copy.requiresConfig}</span>}
      </Card>
    )

  // MarketplaceMcp (moreSources): providers open their sync dialog, markets open their site in the browser.
  const sourceAction = (Icon: LucideIcon) => (
    <span
      aria-hidden="true"
      className="flex size-7 shrink-0 items-center justify-center rounded-md text-muted-foreground">
      <Icon className="size-4" />
    </span>
  )
  const sourceCard = (id: string, name: string, description: string, logo: McpSourceLogo, action: ReactNode) =>
    gridItem(
      id,
      <Card
        name={name}
        description={description}
        icon={<SourceIcon logo={logo} />}
        pressed={false}
        hovered={state.pressed === `hover:${id}`}
        action={action}
      />
    )
  const sources = () => {
    const providers = marketplaceScript.mcpProviders.filter(({ id }) => matches([copy.providerNames[id]]))
    const markets = marketplaceScript.mcpMarkets.filter(({ name }) => matches([name, copy.markets[name]]))
    if (!providers.length && !markets.length) return empty
    return (
      <>
        {providers.length > 0 && (
          <section className="mb-7">
            <h2 className="mb-3 text-sm font-medium">{copy.providers}</h2>
            <Grid>
              {providers.map(({ id, logo }) =>
                sourceCard(id, copy.providerNames[id], copy.manageMcp, logo, sourceAction(Settings2))
              )}
            </Grid>
          </section>
        )}
        {markets.length > 0 && (
          <section>
            <h2 className="mb-3 text-sm font-medium">{copy.marketplaces}</h2>
            <Grid>
              {markets.map(({ name, logo }) =>
                sourceCard(name, name, copy.markets[name], logo, sourceAction(ExternalLink))
              )}
            </Grid>
          </section>
        )}
      </>
    )
  }

  const empty = (
    <div className="flex flex-col items-center justify-center gap-1 py-16 text-center">
      <span className="text-sm font-medium">{copy.noResults}</span>
      <span className="text-xs text-muted-foreground">{copy.noResultsHint}</span>
    </div>
  )

  const skillGroups = () => {
    const list = skills(false)
    if (!list.length) return empty
    return skillCategories
      .filter((domain) => list.some((skill) => skill.domain === domain))
      .map((domain) => (
        <section key={domain} className="mb-7 last:mb-0">
          <h2 className="mb-3 text-sm font-medium">{domainName(domain)}</h2>
          <Grid>{list.filter((skill) => skill.domain === domain).map(skillCard)}</Grid>
        </section>
      ))
  }

  const chip = (label: string, active: boolean) => (
    <span
      className={cn(
        BUTTON_SM,
        'rounded-full',
        active ? cn(THEME_PRIMARY, 'shadow-xs') : 'text-foreground',
        !active && 'max-w-48'
      )}>
      {label}
    </span>
  )
  const manage = (label: string) => (
    <span className={cn(BUTTON_SM, 'ml-auto')}>
      <Settings2 className="size-4" />
      {label}
    </span>
  )

  const content = () => {
    if (state.view === 'all')
      return (
        <div className="space-y-7">
          {(['skill', 'agent', 'mcp'] as const).map((type) => {
            const items =
              type === 'skill'
                ? skills(true).slice(0, 6).map(skillCard)
                : type === 'agent'
                  ? agents(true).slice(0, 6).map(agentCard)
                  : servers().slice(0, 6).map(mcpCard)
            return (
              <section key={type}>
                <div className="mb-3 flex items-center justify-between gap-3">
                  <h2 className="text-sm font-medium">{copy.types[type]}</h2>
                  <button
                    type="button"
                    onClick={() =>
                      setState((previous) => ({
                        ...previous,
                        view: type,
                        queries: { ...previous.queries, [type]: query }
                      }))
                    }
                    className={cn(BUTTON_SM, GHOST, FOCUS)}>
                    {copy.viewAll}
                  </button>
                </div>
                {items.length ? <Grid>{items}</Grid> : empty}
              </section>
            )
          })}
        </div>
      )
    if (state.view === 'skill') return skillGroups()
    if (state.view === 'agent') {
      const list = agents(false)
      return list.length ? <Grid>{list.map(agentCard)}</Grid> : empty
    }
    if (state.mcpSources) return sources()
    const list = servers()
    return list.length ? <Grid>{list.map(mcpCard)}</Grid> : empty
  }

  const toolbar = () => {
    if (state.view === 'skill')
      return (
        <>
          <div className="flex shrink-0 items-center gap-2 py-3" aria-hidden="true">
            <div className="flex min-w-0 flex-1 items-center gap-2 overflow-hidden">
              {chip(copy.picks, true)}
              {chip('skills.sh', false)}
              {chip('claude-plugins', false)}
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full text-muted-foreground">
                <Plus className="size-4" />
              </span>
            </div>
            {manage(copy.manageSkills)}
          </div>
          <CategoryFilter
            label={copy.categories}
            all={copy.types.all}
            categories={skillCategories}
            value={state.skillCategory}
            names={copy.domains}
            onChange={(skillCategory) => update({ skillCategory })}
          />
        </>
      )
    // MarketplacePage: Picks fills with the theme colour when active, More sources takes the accent wash.
    if (state.view === 'mcp')
      return (
        <div className="flex shrink-0 items-center gap-2 py-3">
          {[false, true].map((sources) => {
            const active = state.mcpSources === sources
            return (
              <button
                key={String(sources)}
                type="button"
                aria-pressed={active}
                onClick={() => update({ mcpSources: sources })}
                className={cn(
                  BUTTON_SM,
                  'cursor-pointer rounded-full transition-[background-color,scale] duration-150',
                  active && !sources ? cn(THEME_PRIMARY, 'shadow-xs') : 'hover:bg-accent',
                  active && sources && 'bg-accent',
                  sources && state.pressed === 'chip:sources' && 'scale-95 bg-accent',
                  FOCUS
                )}>
                {sources ? copy.moreSources : copy.picks}
              </button>
            )
          })}
          {manage(copy.manageMcp)}
        </div>
      )
    if (state.view === 'agent')
      return (
        <CategoryFilter
          label={copy.categories}
          all={copy.types.all}
          categories={agentCategories}
          value={state.agentCategory}
          names={copy.domains}
          onChange={(agentCategory) => update({ agentCategory })}
        />
      )
    return null
  }

  const sidebar = (
    <aside className="w-36 shrink-0 pt-1 @4xl/page:w-44" aria-label={copy.resourceTypes}>
      <h2 className={cn('mb-3 px-3 text-xs', TERTIARY)}>{copy.resourceTypes}</h2>
      <nav className="space-y-1">
        {VIEWS.map(({ id, icon: Icon }) => (
          <button
            key={id}
            type="button"
            aria-pressed={state.view === id}
            onClick={() => update({ view: id })}
            className={cn(
              'flex h-9 w-full cursor-pointer items-center gap-2 rounded-xl px-3 text-sm transition-[background-color,scale] duration-150 hover:bg-accent',
              state.view === id ? 'bg-accent' : 'text-muted-foreground',
              state.pressed === `nav:${id}` && 'scale-[0.97] bg-accent',
              FOCUS
            )}>
            <Icon className="size-4 shrink-0" strokeWidth={1.5} />
            <span className="truncate">{copy.types[id]}</span>
            <span className={cn('ml-auto text-xs font-normal', TERTIARY)}>{counts[id]}</span>
          </button>
        ))}
      </nav>
    </aside>
  )

  // MarketplaceDetailHeader (curated): the coral wash under a white sheen.
  const detailHeader = (name: string, type: string, icon: ReactNode, meta?: string) => (
    <div
      className="relative shrink-0 border-b border-black/5 px-5 pt-10 pb-5 text-left text-neutral-700"
      style={{
        backgroundColor: 'color-mix(in srgb, #FF8F99 98%, transparent)',
        backgroundImage:
          'linear-gradient(155deg, rgb(255 255 255 / 0.80) 0%, rgb(255 255 255 / 0.48) 52%, rgb(255 255 255 / 0.26) 100%)',
        boxShadow: 'inset 0 1px 0 rgb(255 255 255 / 0.55)'
      }}>
      <button
        type="button"
        aria-label={copy.close}
        onClick={close}
        className={cn(
          'absolute top-4 right-4 flex size-5 cursor-pointer items-center justify-center rounded-md bg-black/5 text-neutral-600 opacity-70 transition-opacity hover:opacity-100',
          FOCUS
        )}>
        <X className="size-4" />
      </button>
      <div className="flex items-center gap-3">
        {icon}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 id="marketplace-detail-title" className="truncate text-lg leading-none font-semibold" title={name}>
              {name}
            </h3>
            <span className="inline-flex shrink-0 items-center rounded-full border border-white/40 bg-white/40 px-2 py-0.5 text-xs font-medium">
              {type}
            </span>
          </div>
          {meta && <p className="mt-1 text-xs text-black/60">{meta}</p>}
        </div>
      </div>
    </div>
  )

  const properties = (items: { label: string; value: string }[]) => (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] gap-2">
      {items.map(({ label, value }) => (
        <div key={label} className={cn('min-w-0 rounded-xl border px-3 py-2', SUBTLE_BORDER, SUBTLE_BG)}>
          <div className={cn('text-xs', TERTIARY)}>{label}</div>
          <div className="mt-1 truncate text-sm font-medium" title={value}>
            {value}
          </div>
        </div>
      ))}
    </div>
  )

  const footer = (left: ReactNode, right: ReactNode) => (
    <div className={cn('flex shrink-0 items-center justify-between gap-3 border-t bg-card px-5 py-3', SUBTLE_BORDER)}>
      {left}
      {right}
    </div>
  )

  const repository = (
    <span className={cn(BUTTON_SM, 'text-muted-foreground')}>
      <ExternalLink className="size-3.5" />
      {copy.viewRepository}
    </span>
  )

  const skillDetail = (skill: MarketplaceSkillItem) => {
    const text = skillText(skill.id)
    const installed = state.installed.includes(skill.id)
    const job = state.installing === skill.id
    const published = new Intl.DateTimeFormat(tag, { dateStyle: 'medium' }).format(new Date(skill.released))
    const downloads = new Intl.NumberFormat(tag, { notation: 'compact' }).format(skill.downloads)
    return (
      <>
        {detailHeader(
          text.name,
          copy.types.skill,
          <SkillIcon skill={skill} large />,
          `@${skill.author} · ${published}`
        )}
        <div ref={body} className="min-h-0 flex-1 space-y-5 overflow-y-auto bg-card px-5 py-5 [scrollbar-width:thin]">
          {properties([
            { label: copy.downloads, value: downloads },
            { label: copy.version, value: skill.version },
            { label: copy.category, value: domainName(skill.domain) }
          ])}
          <p className="text-sm leading-6 break-words whitespace-pre-wrap text-muted-foreground">
            {text.detail || text.description}
          </p>
          <dl className="grid grid-cols-[max-content_minmax(0,1fr)_max-content_minmax(0,1fr)] gap-x-3 gap-y-2 text-xs">
            {[
              [copy.author, `@${skill.author}`],
              [copy.listed, published],
              [copy.language, text.language],
              [copy.resourceType, copy.types.skill]
            ].map(([label, value]) => (
              <div key={label} className="col-span-2 grid min-w-0 grid-cols-subgrid items-baseline">
                <dt className={TERTIARY}>{label}</dt>
                <dd className="min-w-0 break-words">{value}</dd>
              </div>
            ))}
          </dl>
          <section className="space-y-2">
            <h4 className="flex items-center gap-2 text-xs font-medium">
              <Package className={cn('size-3.5', TERTIARY)} />
              {copy.includedSkills.replace('{total}', String(skill.members.length))}
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {skill.members.map((member) => (
                <div
                  key={member}
                  className={cn('flex min-w-0 items-start gap-2 rounded-xl border p-3', SUBTLE_BORDER, SUBTLE_BG)}>
                  <Sparkles className="mt-0.5 size-3 shrink-0 text-muted-foreground" />
                  <span className="text-xs leading-5 break-words">{member}</span>
                </div>
              ))}
            </div>
          </section>
          <AnimatePresence initial={false}>
            {installed && (
              <m.div
                role="status"
                initial={{ opacity: 0, y: 8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.32, ease: ease.overshoot }}
                className="flex gap-2 rounded-xl border border-green-200 bg-green-50 p-3 text-xs leading-5 text-green-800 dark:border-green-500/30 dark:bg-green-500/15 dark:text-green-100">
                <Check className="mt-0.5 size-3.5 shrink-0" />
                {copy.installedHint}
              </m.div>
            )}
          </AnimatePresence>
        </div>
        {footer(
          repository,
          <button
            type="button"
            aria-busy={job}
            disabled={installed || job}
            onClick={() => startInstall(skill.id)}
            className={cn(
              BUTTON_SM,
              'transition-[background-color,scale,opacity] duration-150',
              installed
                ? 'border border-border text-foreground opacity-40'
                : 'cursor-pointer bg-foreground text-background shadow-xs hover:bg-foreground/85 disabled:cursor-progress',
              state.pressed === 'install' && 'scale-95',
              FOCUS
            )}>
            {job ? (
              <Loader2 className="size-4 animate-spin" />
            ) : installed ? (
              <Check className="size-4" />
            ) : (
              <Download className="size-4" />
            )}
            {installed ? copy.installed : job ? copy.loading : copy.installNow}
          </button>
        )}
      </>
    )
  }

  const agentDetail = (agent: (typeof marketplaceScript.agents)[number]) => (
    <>
      {detailHeader(copy.agents[agent.id].name, copy.types.agent, <AgentAvatar emoji={agent.avatar} large />)}
      <div className="min-h-0 flex-1 space-y-5 overflow-y-auto bg-card px-5 py-5 [scrollbar-width:thin]">
        {properties([{ label: copy.category, value: domainName(agent.category) }])}
        <p className="text-sm leading-6 text-muted-foreground">{copy.agents[agent.id].description}</p>
        <section className="space-y-2">
          <h4 className="flex items-center gap-2 text-xs font-medium">
            <FileText className={cn('size-3.5', TERTIARY)} />
            {copy.instructions}
          </h4>
          <p className="text-sm leading-6 text-muted-foreground">{agent.instructions}</p>
        </section>
      </div>
      {footer(
        <span />,
        <span className={cn(BUTTON_SM, 'bg-foreground text-background shadow-xs')}>
          <Plus className="size-4" />
          {copy.add}
        </span>
      )}
    </>
  )

  const mcpDetail = (server: (typeof marketplaceScript.mcp)[number]) => (
    <>
      {detailHeader(server.name, copy.types.mcp, <McpIcon icon={server.icon} large />)}
      <div className="min-h-0 flex-1 space-y-5 overflow-y-auto bg-card px-5 py-5 [scrollbar-width:thin]">
        <p className="text-sm leading-6 break-words text-muted-foreground">{copy.mcp[server.name]}</p>
        {server.shouldConfig && (
          <span className="inline-flex rounded-full bg-secondary px-2 py-0.5 text-xs font-medium">
            {copy.requiresConfig}
          </span>
        )}
      </div>
      {footer(
        <span className={cn(BUTTON_SM, 'text-muted-foreground')}>
          <ExternalLink className="size-3.5" />
          {copy.openWebsite}
        </span>,
        <span className={cn(BUTTON_SM, 'bg-foreground text-background shadow-xs')}>
          <Plus className="size-4" />
          {copy.add}
        </span>
      )}
    </>
  )

  const detail = () => {
    const current = state.detail
    if (!current) return null
    if (current.kind === 'skill') {
      const skill = marketplaceScript.skills.find((item) => item.id === current.id)
      return skill && skillDetail(skill)
    }
    if (current.kind === 'agent') {
      const agent = marketplaceScript.agents.find((item) => item.id === current.id)
      return agent && agentDetail(agent)
    }
    const server = marketplaceScript.mcp.find((item) => item.name === current.id)
    return server && mcpDetail(server)
  }

  const toastText = state.toast ? copy.installSuccess.replace('{name}', skillText(state.toast.id).name) : ''

  return (
    <div ref={ref} role="region" aria-label={copy.region} className="@container">
      <DemoFrame chromeless bezel={bezel} title={copy.window} onReplay={replay} bodyClassName="h-[570px]">
        <AppShell active="marketplace" tab={{ title: copy.tab }}>
          <div className="@container/page flex h-full min-h-0 flex-col bg-background">
            <div className="flex min-h-0 w-full flex-1 gap-6 px-4 pt-4">
              {sidebar}
              <main className="@container flex min-h-0 min-w-0 flex-1 flex-col">
                <div className={cn('relative shrink-0', (state.view === 'all' || state.view === 'agent') && 'mb-3')}>
                  <Search
                    className={cn('absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2', TERTIARY)}
                    aria-hidden="true"
                  />
                  <input
                    value={query}
                    onChange={(event) => setQuery(state.view, event.target.value)}
                    placeholder={copy.search}
                    aria-label={copy.search}
                    className="h-10 w-full rounded-xl border border-border bg-background pr-8 pl-8 text-sm outline-none placeholder:text-muted-foreground focus-visible:border-foreground/30"
                  />
                  {query && (
                    <button
                      type="button"
                      aria-label={copy.clear}
                      onClick={() => setQuery(state.view, '')}
                      className="absolute top-1/2 right-1.5 flex size-6 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full text-muted-foreground hover:text-foreground">
                      <X className="size-3" />
                    </button>
                  )}
                </div>
                {toolbar()}
                <m.div
                  key={state.view}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.16, ease: ease.settle }}
                  className="-mr-4 min-h-0 flex-1 overflow-y-auto pr-4 pb-4 [scrollbar-width:none]">
                  {content()}
                </m.div>
              </main>
            </div>
          </div>

          <AnimatePresence>
            {state.detail && (
              <m.div
                key="overlay"
                aria-hidden="true"
                onClick={close}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.22, ease: ease.expo }}
                className="absolute inset-0 z-20 bg-black/50"
              />
            )}
            {state.detail && (
              <div
                key="dialog"
                className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center p-4"
                onKeyDown={(event) => event.key === 'Escape' && close()}>
                <m.div
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="marketplace-detail-title"
                  initial={{ opacity: 0, scale: 0.96, y: 8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97, y: 4 }}
                  transition={{ duration: 0.26, ease: ease.expo }}
                  className="pointer-events-auto flex max-h-full w-full max-w-lg flex-col overflow-hidden rounded-3xl bg-card shadow-xl [zoom:0.8] @6xl:[zoom:0.9]">
                  {detail()}
                </m.div>
              </div>
            )}
          </AnimatePresence>

          <div className="pointer-events-none absolute inset-x-0 top-3 z-40 flex justify-center px-4">
            <AnimatePresence>
              {state.toast && (
                <m.div
                  key={state.toast.key}
                  role="status"
                  initial={{ opacity: 0, y: -12, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.98 }}
                  transition={{ duration: 0.28, ease: ease.overshoot }}
                  className="pointer-events-auto absolute flex w-[min(420px,calc(100%-2rem))] items-start gap-3 rounded-md border border-border bg-popover px-4 py-3 shadow-lg">
                  <span className="flex min-h-7 shrink-0 items-center">
                    <CheckCircle2 className={cn('size-4', SUCCESS)} />
                  </span>
                  <span className="min-h-7 min-w-0 flex-1 truncate py-1 text-sm leading-5 font-medium">
                    {toastText}
                  </span>
                  <button
                    type="button"
                    aria-label={copy.close}
                    onClick={() => update({ toast: null })}
                    className="mt-1 -mr-1 flex size-5 shrink-0 cursor-pointer items-center justify-center rounded-sm text-muted-foreground hover:bg-accent hover:text-foreground">
                    <X className="size-3.5" />
                  </button>
                </m.div>
              )}
            </AnimatePresence>
          </div>
        </AppShell>
      </DemoFrame>
    </div>
  )
}
