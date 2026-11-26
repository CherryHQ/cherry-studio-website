import { useReducedMotion } from 'framer-motion'
import {
  Check,
  ChevronDown,
  CirclePause,
  Copy,
  History,
  Image,
  Languages,
  NotebookPen,
  SlidersHorizontal,
  Volume2,
  X
} from 'lucide-react'
import { type KeyboardEvent, useEffect, useRef, useState } from 'react'

import { type DemoLocale, translateDemo, translateLanguages, translateSamples } from '@/content/demos/knowledge'
import { cn } from '@/lib/utils'
import DemoFrame from '../primitives/DemoFrame'
import ProviderIcon from '../primitives/ProviderIcon'
import StreamingText from '../primitives/StreamingText'
import { useDemoLocale } from '../primitives/useDemoLocale'
import { useDemoPlayback, useDemoScript } from '../primitives/useDemoScript'
import uploadExcel from './upload/upload-excel.svg'
import uploadImage from './upload/upload-image.svg'
import uploadPdf from './upload/upload-pdf.svg'
import uploadPpt from './upload/upload-ppt.svg'
import uploadText from './upload/upload-text.svg'
import uploadWord from './upload/upload-word.svg'

// Desktop TranslateInputPane order: image, PDF, Word, PowerPoint, text, Excel.
const UPLOAD_ICONS = [uploadImage, uploadPdf, uploadWord, uploadPpt, uploadText, uploadExcel]

// `pending` is the desktop detect + request gap, shown as the "Translation in progress" spinner.
type Phase = 'idle' | 'pending' | 'streaming' | 'done'

const languageByCode = new Map(translateLanguages.map((language) => [language.code, language]))

const iconButton =
  'flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-transparent'

interface LanguageSelectProps {
  label: string
  value: string
  options: { value: string; text: string }[]
  disabled: boolean
  onChange: (value: string) => void
}

/** Native select styled as the desktop Combobox trigger, so the 21-language list never clips inside the frame. */
function LanguageSelect({ label, value, options, disabled, onChange }: LanguageSelectProps) {
  return (
    <label className="relative flex h-[30px] min-w-0 flex-1 items-center sm:w-[210px] sm:flex-none">
      <span className="sr-only">{label}</span>
      <select
        value={value}
        disabled={disabled}
        onChange={(event) => onChange(event.target.value)}
        className="h-full w-full min-w-0 cursor-pointer appearance-none truncate rounded-md border border-border bg-muted/20 pr-8 pl-3 text-sm text-foreground transition-colors focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary disabled:cursor-default disabled:opacity-50">
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 size-4 opacity-50" aria-hidden="true" />
    </label>
  )
}

function useCopied() {
  const [copied, setCopied] = useState(false)
  useEffect(() => {
    if (!copied) return
    const timer = setTimeout(() => setCopied(false), 1600)
    return () => clearTimeout(timer)
  }, [copied])
  const copy = (text: string) =>
    navigator.clipboard?.writeText(text).then(
      () => setCopied(true),
      () => {}
    )
  return [copied, copy] as const
}

export default function TranslateDemo() {
  const { locale } = useDemoLocale()
  const copy = translateDemo[locale]
  const ref = useRef<HTMLDivElement>(null)
  const playing = useDemoPlayback(ref)
  const reduced = useReducedMotion()
  const touched = useRef(false)
  const [target, setTarget] = useState(copy.defaultTarget)
  const [hasInput, setHasInput] = useState(true)
  const [phase, setPhase] = useState<Phase>('idle')
  const [output, setOutput] = useState<{ code: string; instant: boolean } | null>(null)
  const [run, setRun] = useState(0)
  const [inputCopied, copyInput] = useCopied()
  const [outputCopied, copyOutput] = useCopied()
  const busy = phase === 'pending' || phase === 'streaming'
  const canTranslate = hasInput && !busy
  const inputText = hasInput ? translateSamples[copy.defaultSource] : ''
  const outputText = output ? translateSamples[output.code] : ''
  const name = (code: string) => languageByCode.get(code)?.[locale as DemoLocale] ?? code
  const targetOptions = translateLanguages.map((language) => ({
    value: language.code,
    text: `${language.emoji} ${name(language.code)}`
  }))

  useEffect(() => {
    if (phase !== 'pending' || !playing) return
    const timer = setTimeout(() => setPhase('streaming'), reduced ? 0 : 650)
    return () => clearTimeout(timer)
  }, [phase, playing, reduced])

  const translate = () => {
    if (!canTranslate) return
    setOutput({ code: target, instant: false })
    setRun((count) => count + 1)
    setPhase('pending')
  }

  const { replay } = useDemoScript(async ({ wait }) => {
    setTarget(copy.defaultTarget)
    setHasInput(true)
    setOutput(null)
    setPhase('idle')
    await wait(900)
    if (touched.current) return
    setOutput({ code: copy.defaultTarget, instant: false })
    setRun((count) => count + 1)
    setPhase('pending')
  }, playing)

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') {
      event.preventDefault()
      touched.current = true
      translate()
    }
  }

  const showOutput = output && phase !== 'pending'
  const outputIdle = !showOutput || busy

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
          {/* Desktop text mode: "Translate to" + target only; the source is auto-detected, so no source picker or swap. */}
          <div className="flex shrink-0 items-center gap-2 border-b border-border p-3 sm:gap-3">
            <span className="hidden shrink-0 text-sm text-muted-foreground sm:inline" aria-hidden="true">
              {copy.translateTo}
            </span>
            <LanguageSelect
              label={copy.target}
              value={target}
              options={targetOptions}
              disabled={false}
              onChange={(value) => {
                touched.current = true
                setTarget(value)
              }}
            />
            {busy ? (
              <button
                type="button"
                onClick={() => {
                  touched.current = true
                  setPhase('done')
                }}
                aria-label={copy.stop}
                className="flex h-8 shrink-0 cursor-pointer items-center gap-1.5 rounded-md bg-secondary px-2.5 text-sm text-secondary-foreground transition-colors hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:px-3">
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
                disabled={!canTranslate}
                aria-label={copy.translate}
                className={cn(
                  'flex h-8 shrink-0 items-center gap-1.5 rounded-md px-2.5 text-sm transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:px-3',
                  canTranslate
                    ? 'cursor-pointer bg-emerald-600 text-white hover:opacity-90'
                    : 'cursor-not-allowed bg-muted text-muted-foreground/60'
                )}>
                <Languages className="size-3.5" aria-hidden="true" />
                <span className="hidden sm:inline">{copy.translate}</span>
              </button>
            )}
            <span className="hidden flex-1 sm:block" />
            <div className="flex shrink-0 items-center gap-1" aria-hidden="true">
              <span className="flex size-8 items-center justify-center" title={copy.model}>
                <span className="flex size-6 items-center justify-center rounded-full bg-secondary">
                  <ProviderIcon id="openai" className="size-4" />
                </span>
              </span>
              <span className="flex size-7 items-center justify-center text-muted-foreground" title={copy.history}>
                <History className="size-3.5" />
              </span>
              <span className="flex size-7 items-center justify-center text-muted-foreground" title={copy.settings}>
                <SlidersHorizontal className="size-3.5" />
              </span>
            </div>
          </div>

          <div className="grid min-h-0 flex-1 grid-cols-2">
            <section className="relative flex min-h-0 min-w-0 flex-col">
              <button
                type="button"
                onClick={() => copyInput(inputText)}
                disabled={!hasInput}
                aria-label={inputCopied ? copy.copied : copy.copy}
                title={copy.copy}
                className={cn(iconButton, 'absolute top-4 right-3 z-10')}>
                {inputCopied ? (
                  <Check className="size-3.5 text-foreground" aria-hidden="true" />
                ) : (
                  <Copy className="size-3.5" aria-hidden="true" />
                )}
              </button>
              <div className="min-h-0 flex-1 overflow-y-auto p-4 pr-10 [scrollbar-width:thin] sm:pr-20">
                {hasInput ? (
                  <p
                    lang={copy.defaultSource}
                    dir="auto"
                    className="text-sm leading-relaxed text-foreground motion-safe:animate-in motion-safe:fade-in sm:text-base">
                    {inputText}
                  </p>
                ) : (
                  <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">{copy.placeholder}</p>
                )}
              </div>
              {hasInput ? (
                !busy && (
                  <div className="flex shrink-0 items-center px-3 py-3">
                    <button
                      type="button"
                      onClick={() => {
                        touched.current = true
                        setHasInput(false)
                      }}
                      className="flex h-8 cursor-pointer items-center gap-1.5 rounded-md px-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-2 focus-visible:outline-primary">
                      <X className="size-3.5" aria-hidden="true" />
                      {copy.clear}
                    </button>
                  </div>
                )
              ) : (
                // The desktop zone opens a file picker and reads the document into the input; here it reloads the sample.
                <button
                  type="button"
                  onClick={() => setHasInput(true)}
                  aria-label={copy.upload}
                  className="mx-3 mb-4 flex shrink-0 cursor-pointer flex-col items-center justify-center gap-3 rounded-md border border-dashed border-border px-2 py-4 text-muted-foreground transition-colors hover:bg-muted/30 hover:text-foreground focus-visible:outline-2 focus-visible:outline-primary sm:px-4">
                  <span className="text-center text-xs sm:text-sm">{copy.upload}</span>
                  <span className="flex flex-wrap items-center justify-center gap-2 sm:gap-6">
                    {UPLOAD_ICONS.map((icon) => (
                      <img key={icon} src={icon} alt="" aria-hidden="true" className="size-5 sm:size-7" />
                    ))}
                  </span>
                </button>
              )}
            </section>

            <section className="relative flex min-h-0 min-w-0 flex-col border-l border-border" aria-live="polite">
              <div className="min-h-0 flex-1 overflow-y-auto p-4 pr-12 [scrollbar-width:thin]">
                {showOutput ? (
                  <p lang={output.code} dir="auto" className="text-sm leading-relaxed text-foreground sm:text-base">
                    {output.instant ? (
                      outputText
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
                  phase === 'pending' && (
                    <p className="flex items-center gap-2 text-sm text-muted-foreground sm:text-base">
                      <span
                        className="size-4 shrink-0 rounded-full border-2 border-muted-foreground/30 border-t-muted-foreground motion-safe:animate-spin"
                        aria-hidden="true"
                      />
                      {copy.processing}
                    </p>
                  )
                )}
              </div>
              <button
                type="button"
                onClick={() => copyOutput(outputText)}
                disabled={outputIdle}
                aria-label={outputCopied ? copy.copied : copy.copy}
                title={copy.copy}
                className={cn(iconButton, 'absolute top-4 right-3')}>
                {outputCopied ? (
                  <Check className="size-3.5 text-foreground" aria-hidden="true" />
                ) : (
                  <Copy className="size-3.5" aria-hidden="true" />
                )}
              </button>
              <div
                className={cn('flex shrink-0 items-center px-3 py-4 text-muted-foreground', outputIdle && 'opacity-60')}
                aria-hidden="true">
                {!outputIdle && (
                  <span className="text-xs text-muted-foreground/80 tabular-nums">{Array.from(outputText).length}</span>
                )}
                <span className="ml-auto flex size-7 items-center justify-center" title={copy.readAloud}>
                  <Volume2 className="size-4" />
                </span>
                <span className="ml-1 flex size-6 items-center justify-center" title={copy.copyImage}>
                  <Image className="size-3.5" />
                </span>
                <span className="ml-1 flex size-6 items-center justify-center" title={copy.saveToNotes}>
                  <NotebookPen className="size-3.5" />
                </span>
              </div>
            </section>
          </div>
        </div>
      </DemoFrame>
    </div>
  )
}
