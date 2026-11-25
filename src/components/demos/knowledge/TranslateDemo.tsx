import { useReducedMotion } from 'framer-motion'
import { Check, ChevronDown, CirclePause, Copy, Languages } from 'lucide-react'
import { type KeyboardEvent, useEffect, useRef, useState } from 'react'

import { type DemoLocale, translateDemo, translateLanguages, translateSamples } from '@/content/demos/knowledge'
import DemoFrame from '../primitives/DemoFrame'
import StreamingText from '../primitives/StreamingText'
import { useDemoLocale } from '../primitives/useDemoLocale'
import { useDemoPlayback, useDemoScript } from '../primitives/useDemoScript'

type Phase = 'idle' | 'detecting' | 'streaming' | 'done'

const languageByCode = new Map(translateLanguages.map((language) => [language.code, language]))

interface LanguageSelectProps {
  label: string
  value: string
  options: { value: string; text: string }[]
  disabled: boolean
  onChange: (value: string) => void
}

/** Native select so the 21-language list never clips inside the frame and keeps full keyboard support. */
function LanguageSelect({ label, value, options, disabled, onChange }: LanguageSelectProps) {
  return (
    <label className="relative flex h-8 min-w-0 flex-1 items-center sm:w-48 sm:flex-none">
      <span className="sr-only">{label}</span>
      <select
        value={value}
        disabled={disabled}
        onChange={(event) => onChange(event.target.value)}
        className="h-full w-full min-w-0 cursor-pointer appearance-none truncate rounded-md border border-border bg-secondary/60 pr-7 pl-2.5 text-[13px] text-foreground transition-colors hover:border-hairline-strong focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary disabled:cursor-default disabled:opacity-60">
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-2 size-3.5 text-muted-foreground" aria-hidden="true" />
    </label>
  )
}

export default function TranslateDemo() {
  const { locale } = useDemoLocale()
  const copy = translateDemo[locale]
  const ref = useRef<HTMLDivElement>(null)
  const playing = useDemoPlayback(ref)
  const reduced = useReducedMotion()
  const touched = useRef(false)
  const [target, setTarget] = useState(copy.defaultTarget)
  const [detected, setDetected] = useState<string | null>(null)
  const [phase, setPhase] = useState<Phase>('idle')
  const [output, setOutput] = useState<{ code: string; instant: boolean } | null>(null)
  const [run, setRun] = useState(0)
  const [copied, setCopied] = useState(false)
  const busy = phase === 'detecting' || phase === 'streaming'
  const textCode = copy.defaultSource
  const name = (code: string) => languageByCode.get(code)?.[locale as DemoLocale] ?? code
  const option = (code: string) => ({ value: code, text: `${languageByCode.get(code)?.emoji ?? ''} ${name(code)}` })

  const targetOptions = translateLanguages.map((language) => option(language.code))

  useEffect(() => {
    if (phase !== 'detecting' || !playing) return
    const timer = setTimeout(
      () => {
        setDetected(copy.defaultSource)
        setPhase('streaming')
      },
      reduced ? 0 : 650
    )
    return () => clearTimeout(timer)
  }, [phase, playing, reduced, copy.defaultSource])

  useEffect(() => {
    if (!copied) return
    const timer = setTimeout(() => setCopied(false), 1600)
    return () => clearTimeout(timer)
  }, [copied])

  const translate = () => {
    if (busy) return
    setOutput({ code: target, instant: false })
    setRun((count) => count + 1)
    setPhase(detected ? 'streaming' : 'detecting')
  }

  const clearOutput = () => {
    setOutput(null)
    setPhase('idle')
  }

  const { replay } = useDemoScript(async ({ wait }) => {
    setTarget(copy.defaultTarget)
    setDetected(null)
    setOutput(null)
    setPhase('idle')
    await wait(900)
    if (touched.current) return
    setOutput({ code: copy.defaultTarget, instant: false })
    setRun((count) => count + 1)
    setPhase('detecting')
  }, playing)

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') {
      event.preventDefault()
      touched.current = true
      translate()
    }
  }

  const outputText = output ? translateSamples[output.code] : ''

  return (
    <div ref={ref} role="region" aria-label={copy.region} onKeyDown={onKeyDown}>
      <DemoFrame
        title={copy.window}
        onReplay={() => {
          touched.current = false
          replay()
        }}
        bodyClassName="h-[260px]">
        <div className="flex h-full flex-col">
          <div className="flex shrink-0 items-center gap-1.5 border-b border-border p-3 sm:gap-2">
            {/* Desktop text mode has no source picker or swap: the source is auto-detected. */}
            <span className="shrink-0 text-[13px] text-muted-foreground">{copy.translateTo}</span>
            <LanguageSelect
              label={copy.target}
              value={target}
              options={targetOptions}
              disabled={busy}
              onChange={(value) => {
                touched.current = true
                setTarget(value)
                clearOutput()
              }}
            />
            {detected && (
              <span className="hidden min-w-0 truncate text-xs text-muted-foreground md:inline">
                {copy.autoDetect} ({name(detected)})
              </span>
            )}
            <span className="hidden flex-1 sm:block" />
            {busy ? (
              <button
                type="button"
                onClick={() => {
                  touched.current = true
                  setPhase('done')
                }}
                aria-label={copy.stop}
                className="flex h-8 shrink-0 cursor-pointer items-center gap-1.5 rounded-md bg-secondary px-2.5 text-[13px] text-secondary-foreground transition-colors hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:px-3">
                <CirclePause className="size-3.5" aria-hidden="true" />
                <span className="hidden sm:inline">{copy.stop}</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  touched.current = true
                  translate()
                }}
                aria-label={copy.translate}
                className="flex h-8 shrink-0 cursor-pointer items-center gap-1.5 rounded-md bg-emerald-600 px-2.5 text-[13px] text-white transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:px-3">
                <Languages className="size-3.5" aria-hidden="true" />
                <span className="hidden sm:inline">{copy.translate}</span>
              </button>
            )}
          </div>

          <div className="grid min-h-0 flex-1 grid-cols-2">
            <section className="min-w-0 overflow-y-auto p-3 sm:p-4">
              <p
                key={textCode}
                lang={textCode}
                dir="auto"
                className="text-[13px] leading-relaxed text-foreground motion-safe:animate-in motion-safe:fade-in sm:text-[15px]">
                {translateSamples[textCode]}
              </p>
            </section>
            <section className="relative min-w-0 overflow-y-auto border-l border-border p-3 sm:p-4" aria-live="polite">
              {output && phase !== 'detecting' ? (
                <p
                  lang={output.code}
                  dir="auto"
                  className="pr-6 text-[13px] leading-relaxed text-foreground sm:text-[15px]">
                  {output.instant ? (
                    <span className="motion-safe:animate-in motion-safe:fade-in">{outputText}</span>
                  ) : (
                    <StreamingText
                      key={run}
                      text={outputText}
                      locale={output.code}
                      active={phase === 'streaming' && playing}
                      rate={30}
                      onDone={() => setPhase('done')}
                    />
                  )}
                </p>
              ) : (
                <p className="text-[13px] text-muted-foreground sm:text-[15px]">
                  {phase === 'detecting' ? <span className="text-shimmer">{copy.detecting}</span> : copy.output}
                </p>
              )}
              {output && phase === 'done' && (
                <button
                  type="button"
                  onClick={() =>
                    navigator.clipboard?.writeText(outputText).then(
                      () => setCopied(true),
                      () => {}
                    )
                  }
                  aria-label={copied ? copy.copied : copy.copy}
                  title={copied ? copy.copied : copy.copy}
                  className="absolute top-2 right-2 flex size-7 cursor-pointer items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-2 focus-visible:outline-primary motion-safe:animate-in motion-safe:fade-in">
                  {copied ? (
                    <Check className="size-3.5 text-primary" aria-hidden="true" />
                  ) : (
                    <Copy className="size-3.5" aria-hidden="true" />
                  )}
                </button>
              )}
            </section>
          </div>
        </div>
      </DemoFrame>
    </div>
  )
}
