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

/** Palettes offered by the wallpaper; [deep, mid, light] for Warp's three colour stops. */
export const SILK_PALETTES = [
  { id: 'cherry', colors: ['#2a0a12', '#b23a55', '#ffc49a'] },
  { id: 'ocean', colors: ['#031428', '#0a5f8a', '#cbf3f0'] },
  { id: 'lavender', colors: ['#1c1233', '#7b5cff', '#ffe1f5'] },
  { id: 'citrus', colors: ['#1a1200', '#ff8a00', '#fff6c2'] }
]

/** The single-file HTML the assistant "writes"; visible strings follow the demo locale. */
export function buildArtifactSource(app: ArtifactsDemoCopy['app']): CodeLine[] {
  const palettes = SILK_PALETTES.map((item) => `      ${item.id}: ['${item.colors.join("', '")}'],`)
  const source = [
    '<!doctype html>',
    `<html lang="${app.lang}">`,
    '<head>',
    `  <title>${app.title}</title>`,
    '  <style>',
    '    body { margin: 0; height: 100vh; background: #000; }',
    '    #silk { position: fixed; inset: 0; }',
    '    .controls { position: fixed; bottom: 12px; display: flex; gap: 8px; }',
    '    .swatch { width: 24px; height: 24px; border-radius: 999px; }',
    '  </style>',
    '</head>',
    '<body>',
    `  <!-- ${app.comment} -->`,
    '  <div id="silk"></div>',
    '  <div class="controls">',
    '    <button class="swatch" data-palette="cherry"></button>',
    '    <button class="swatch" data-palette="ocean"></button>',
    '    <button class="swatch" data-palette="lavender"></button>',
    '    <button class="swatch" data-palette="citrus"></button>',
    `    <label>${app.speed} <input id="speed" type="range" min="0" max="3" step="0.1" value="1.2"></label>`,
    '  </div>',
    '  <script type="module">',
    "    import { ShaderMount, warpFragmentShader, getShaderColorFromString } from 'https://esm.sh/@paper-design/shaders'",
    '    const PALETTES = {',
    ...palettes,
    '    }',
    '    const colors = (name) => PALETTES[name].map(getShaderColorFromString)',
    "    const silk = new ShaderMount(document.getElementById('silk'), warpFragmentShader, {",
    "      u_colors: colors('cherry'), u_colorsCount: 3, u_swirl: 0.9, u_softness: 1",
    '    }, undefined, 1.2)',
    '',
    "    document.querySelectorAll('.swatch').forEach((swatch) => {",
    '      swatch.onclick = () => silk.setUniforms({ u_colors: colors(swatch.dataset.palette) })',
    '    })',
    '    speed.oninput = () => silk.setSpeed(Number(speed.value))',
    '  </script>',
    '</body>',
    '</html>'
  ]
  let mode: Mode = 'html'
  return source.map((line) => {
    if (line.includes('</style>') || line.includes('</script>')) mode = 'html'
    const highlighted = highlightLine(line, mode)
    if (line.includes('<style>')) mode = 'css'
    if (line.includes('<script')) mode = 'js'
    return highlighted
  })
}
