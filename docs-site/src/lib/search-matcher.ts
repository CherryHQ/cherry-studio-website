// Separator-insensitive matching: "qwen 3.7", "qwen3.7" and "qwen-3.7" find each other. Short
// queries stay literal so numeric fragments like "3.7" do not collide with longer ids.
const SEPARATORS = /[\s\-_.·/－．／]+/g
const SEPARATOR_CLASS = '[\\s\\-_.·/－．／]'
const LOOSE_MIN_LENGTH = 4

const escapeRegExp = (text: string) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

export const compact = (text: string) => text.toLowerCase().replace(SEPARATORS, '')

export function buildMatcher(query: string) {
  const chunks = query.trim().split(/\s+/).filter(Boolean).map(escapeRegExp)
  if (!chunks.length) return null
  const pattern = new RegExp(chunks.join(`${SEPARATOR_CLASS}*`), 'i')
  const loose = compact(query)
  const looseMin = loose.length >= LOOSE_MIN_LENGTH ? loose : null
  return (text: string) => pattern.test(text) || (looseMin !== null && compact(text).includes(looseMin))
}
