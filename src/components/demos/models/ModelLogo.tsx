import { cn } from '@/lib/utils'
import ProviderIcon from '../primitives/ProviderIcon'
import claude from './logos/claude.svg'
import glm from './logos/glm.svg'
import glmDark from './logos/glm-dark.svg'
import kimi from './logos/kimi.svg'
import kimiDark from './logos/kimi-dark.svg'

// Desktop getModelLogoRef prefers a model mark over the provider mark; these are the light ones small enough to ship.
const MODEL_MARKS: [RegExp, string, string][] = [
  [/claude/i, claude, claude],
  [/kimi/i, kimi, kimiDark],
  [/glm/i, glm, glmDark]
]

/** Full-bleed round model avatar, like desktop `icon.Avatar`. */
export default function ModelLogo({
  name,
  provider,
  className
}: {
  name: string
  provider: string
  className?: string
}) {
  const mark = MODEL_MARKS.find(([pattern]) => pattern.test(name))
  return (
    <span className={cn('relative block shrink-0 overflow-hidden rounded-full', className)} aria-hidden="true">
      {mark ? (
        <>
          <img src={mark[1]} alt="" className="size-full dark:hidden" />
          <img src={mark[2]} alt="" className="hidden size-full dark:block" />
        </>
      ) : (
        <ProviderIcon id={provider} className="size-full" />
      )}
    </span>
  )
}
