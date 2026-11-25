import { cn } from '@/lib/utils'
import type { CodeLine, CodeTone } from './artifactSource'

// Desktop cherryCodeTheme (packages/ui/src/styles/product.css): 700 shades in light, one 300 band in dark.
const TONES: Record<CodeTone, string> = {
  keyword: 'text-violet-700 dark:text-violet-300',
  string: 'text-emerald-700 dark:text-emerald-300',
  constant: 'text-amber-700 dark:text-orange-300',
  type: 'text-cyan-700 dark:text-cyan-300',
  function: 'text-blue-600 dark:text-blue-300',
  tag: 'text-rose-700 dark:text-rose-300',
  comment: 'text-muted-foreground italic',
  plain: ''
}

interface CodeViewProps {
  lines: CodeLine[]
  /** How many lines have streamed in so far; defaults to all of them. */
  count?: number
  numbered?: boolean
  className?: string
}

/** Span-highlighted mono source; newly streamed lines fade in like the message renderer's tokens. */
export function CodeView({ lines, count = lines.length, numbered, className }: CodeViewProps) {
  return (
    <pre className={cn('font-mono text-[11.5px] leading-[18px] text-foreground/90', className)}>
      <code className="block">
        {lines.slice(0, count).map((line, index) => (
          <span
            key={index}
            className={cn(
              'flex',
              count < lines.length && 'motion-safe:animate-in motion-safe:fade-in motion-safe:duration-200'
            )}>
            {numbered && (
              <span aria-hidden="true" className="w-8 shrink-0 pr-3 text-right text-muted-foreground/50 select-none">
                {index + 1}
              </span>
            )}
            <span className="whitespace-pre">
              {line.map(([tone, text], part) => (
                <span key={part} className={TONES[tone]}>
                  {text}
                </span>
              ))}
              {line.length === 0 && ' '}
            </span>
          </span>
        ))}
      </code>
    </pre>
  )
}
