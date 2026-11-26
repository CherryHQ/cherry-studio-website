import ProviderIcon from '@/components/demos/primitives/ProviderIcon'

// Shared look for the Flash and Plus plan pages.
export const PLAN_SURFACE = 'rounded-[22px] bg-card/70 shadow-[inset_0_0_0_1px_var(--color-border)]'
export const PLAN_BUTTON =
  'inline-flex h-12 items-center justify-center rounded-full bg-foreground px-8 text-[15px] font-semibold text-background transition-[background-color,transform] duration-200 hover:bg-foreground/85 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary active:scale-[0.98]'
// Usage rows: model / bar / allowance, collapsing the bar under the name on small screens.
export const USAGE_GRID =
  'grid grid-cols-[minmax(0,1fr)_auto] gap-x-6 gap-y-3 sm:grid-cols-[minmax(200px,1fr)_minmax(120px,1.4fr)_150px]'
export const TABLE_LABEL = 'text-[11px] font-medium tracking-widest text-muted-foreground uppercase'

/** Provider mark for a Flash model, matched by its id or display name. */
export function ModelMark({ model }: { model: string }) {
  const name = model.toLowerCase()
  const provider = name.startsWith('deepseek') ? 'deepseek' : name.startsWith('qwen') ? 'qwen' : 'zhipu'
  return (
    <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-background shadow-[inset_0_0_0_1px_var(--color-border)]">
      <ProviderIcon id={provider} className="size-4" />
    </span>
  )
}
