import type { ArtifactsDemoCopy } from '@/content/demos/create'

export type CodeTone = 'keyword' | 'string' | 'constant' | 'type' | 'function' | 'tag' | 'comment' | 'plain'
export type CodeLine = [tone: CodeTone, text: string][]

type Rule = [pattern: string, tone: CodeTone]
type Mode = 'html' | 'css' | 'js'

// Each language is one alternation scanned left to right; earlier rules win, as in a lexer.
const RULES: Record<Mode, Rule[]> = {
  html: [
    ['<!--.*?-->', 'comment'],
    ['<!doctype[^>]*>', 'keyword'],
    ['</?[a-zA-Z][\\w-]*|/?>', 'tag'],
    ['[a-zA-Z-]+(?==)', 'type'],
    ['"[^"]*"', 'string']
  ],
  css: [
    ['/\\*.*?\\*/', 'comment'],
    ['[.#]?[a-zA-Z][\\w-]*(?=[^{;]*\\{)', 'tag'],
    ['[a-z-]+(?=\\s*:)', 'type'],
    ['#[0-9a-fA-F]{3,8}|\\b\\d+(?:\\.\\d+)?(?:px|s|%)?', 'constant'],
    ["'[^']*'", 'string']
  ],
  js: [
    ['//.*$', 'comment'],
    ["'[^']*'|`[^`]*`", 'string'],
    ['\\b(?:const|let|function|return|if|else|null|true|false)\\b', 'keyword'],
    ['\\b\\d+\\b', 'constant'],
    ['\\b[a-zA-Z_]\\w*(?=\\()', 'function'],
    ['\\b[A-Z]\\w*\\b', 'type']
  ]
}
const PATTERNS = Object.fromEntries(
  Object.entries(RULES).map(([mode, rules]) => [
    mode,
    new RegExp(rules.map(([source]) => `(${source})`).join('|'), 'g')
  ])
) as Record<Mode, RegExp>

function highlightLine(text: string, mode: Mode): CodeLine {
  const parts: CodeLine = []
  const pattern = PATTERNS[mode]
  let cursor = 0
  pattern.lastIndex = 0
  for (let match = pattern.exec(text); match; match = pattern.exec(text)) {
    if (match.index > cursor) parts.push(['plain', text.slice(cursor, match.index)])
    const group = match.slice(1).findIndex((value) => value !== undefined)
    parts.push([RULES[mode][group][1], match[0]])
    cursor = match.index + match[0].length
    if (match[0].length === 0) pattern.lastIndex++
  }
  if (cursor < text.length) parts.push(['plain', text.slice(cursor)])
  return parts
}

/** The single-file HTML the assistant "writes"; visible strings follow the demo locale. */
export function buildArtifactSource(app: ArtifactsDemoCopy['app']): CodeLine[] {
  const source = [
    '<!doctype html>',
    `<html lang="${app.lang}">`,
    '<head>',
    `  <title>${app.title}</title>`,
    '  <style>',
    '    body { display: grid; place-items: center; font: 14px system-ui; }',
    '    .ring { stroke: #f43f5e; transition: stroke-dashoffset 1s linear; }',
    '    .break .ring { stroke: #10b981; }',
    '    button { border: 0; border-radius: 999px; padding: 6px 14px; }',
    '  </style>',
    '</head>',
    '<body>',
    `  <!-- ${app.comment} -->`,
    '  <nav>',
    `    <button data-mode="focus">${app.focus}</button>`,
    `    <button data-mode="break">${app.break}</button>`,
    '  </nav>',
    '  <svg viewBox="0 0 120 120">',
    '    <circle class="ring" cx="60" cy="60" r="52" />',
    '  </svg>',
    '  <output id="clock">25:00</output>',
    `  <button id="toggle">${app.start}</button>`,
    `  <button id="reset">${app.reset}</button>`,
    '  <script>',
    '    const MODES = { focus: 25 * 60, break: 5 * 60 }',
    "    let mode = 'focus'",
    '    let left = MODES[mode]',
    '    let timer = null',
    '',
    '    function render() {',
    "      const mm = String(Math.floor(left / 60)).padStart(2, '0')",
    "      const ss = String(left % 60).padStart(2, '0')",
    // biome-ignore lint/suspicious/noTemplateCurlyInString: this is the artifact's own JS source text
    '      clock.textContent = `${mm}:${ss}`',
    '      ring.style.strokeDashoffset = 327 * (1 - left / MODES[mode])',
    '    }',
    '',
    '    toggle.onclick = () => {',
    '      if (timer) return pause()',
    '      timer = setInterval(tick, 1000)',
    '    }',
    '  </script>',
    '</body>',
    '</html>'
  ]
  let mode: Mode = 'html'
  return source.map((line) => {
    if (line.includes('</style>') || line.includes('</script>')) mode = 'html'
    const highlighted = highlightLine(line, mode)
    if (line.includes('<style>')) mode = 'css'
    if (line.includes('<script>')) mode = 'js'
    return highlighted
  })
}
