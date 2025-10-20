/**
 * Parses multilingual changelog content based on <!--LANG:xx--> markers
 * @param changelog Raw changelog content with language markers
 * @param currentLanguage Current i18n language (e.g., 'zh-CN', 'en-US', 'zh-TW')
 * @returns Parsed changelog content for the current language
 */
export function parseChangelog(changelog: string, currentLanguage: string): string {
  if (!changelog) return ''

  // Extract language code (e.g., 'zh-CN' -> 'zh', 'en-US' -> 'en')
  const langCode = currentLanguage.split('-')[0]

  // Check if changelog contains language markers
  if (!changelog.includes('<!--LANG:')) {
    return changelog
  }

  // Split changelog by language sections
  const langRegex = /<!--LANG:(\w+(?:-\w+)?)-->([\s\S]*?)(?=<!--LANG:|$)/g
  const sections = new Map<string, string>()

  let match
  while ((match = langRegex.exec(changelog)) !== null) {
    const [, lang, content] = match
    // Remove <!--LANG:END--> marker if present
    const cleanContent = content.replace(/<!--LANG:END-->/g, '').trim()
    sections.set(lang.toLowerCase(), cleanContent)
  }

  // Priority order: exact match > language code match > English fallback
  if (sections.has(currentLanguage.toLowerCase())) {
    return sections.get(currentLanguage.toLowerCase())!
  }

  if (sections.has(langCode)) {
    return sections.get(langCode)!
  }

  // For Chinese variants, try to find any Chinese version
  if (langCode === 'zh') {
    for (const [key, value] of sections.entries()) {
      if (key.startsWith('zh')) {
        return value
      }
    }
  }

  // Fallback to English
  if (sections.has('en')) {
    return sections.get('en')!
  }

  // If no match found, return original content
  return changelog
}
