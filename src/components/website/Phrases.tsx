import { phraseSegments } from '@/lib/phrases'

/** Heading text that wraps between words only, so a Chinese word is never split across two lines. */
export default function Phrases({ text }: { text: string }) {
  return phraseSegments(text).map((part, index) =>
    /^\s+$/.test(part) ? (
      part
    ) : (
      <span key={index} className="inline-block">
        {part}
      </span>
    )
  )
}
