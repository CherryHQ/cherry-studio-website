const segmenter = new Intl.Segmenter('zh', { granularity: 'word' })

/**
 * Splits text into words that should not break across lines: Chinese words from Intl.Segmenter, Latin words as is.
 * Punctuation joins the word before it so it never starts a line; runs of spaces stay separate.
 */
export function phraseSegments(text: string): string[] {
  const out: string[] = []
  for (const { segment, isWordLike } of segmenter.segment(text)) {
    const last = out[out.length - 1]
    if (/^\s+$/.test(segment)) out.push(segment)
    else if (!isWordLike && last !== undefined && !/^\s+$/.test(last)) out[out.length - 1] = last + segment
    else out.push(segment)
  }
  return out
}
