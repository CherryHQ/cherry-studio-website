const segmenter = new Intl.Segmenter('zh', { granularity: 'word' })

const HAN = /^\p{Script=Han}$/u
const ENDS_IN_HAN = /\p{Script=Han}$/u

/**
 * Splits text into words that should not break across lines: Chinese words from Intl.Segmenter, Latin words as is.
 * Punctuation joins the word before it so it never starts a line, and so does a lone Chinese character, since the
 * segmenter cuts compounds like 工作台 into 工作 + 台. Runs of spaces stay separate.
 */
export function phraseSegments(text: string): string[] {
  const out: string[] = []
  for (const { segment, isWordLike } of segmenter.segment(text)) {
    const last = out[out.length - 1]
    if (/^\s+$/.test(segment) || last === undefined || /^\s+$/.test(last)) out.push(segment)
    else if (!isWordLike || (HAN.test(segment) && ENDS_IN_HAN.test(last))) out[out.length - 1] = last + segment
    else out.push(segment)
  }
  return out
}
