import { cn } from '@/lib/utils'
import { providerIcon } from './brand'

/** Provider logo that swaps to its dark artwork under the dark theme. */
export default function ProviderIcon({ id, className }: { id: string; className?: string }) {
  const { light, dark } = providerIcon(id)
  if (!light) return null
  if (light === dark) return <img src={light} alt="" className={cn('size-4 object-contain', className)} />
  return (
    <>
      <img src={light} alt="" className={cn('size-4 object-contain dark:hidden', className)} />
      <img src={dark} alt="" className={cn('hidden size-4 object-contain dark:block', className)} />
    </>
  )
}
