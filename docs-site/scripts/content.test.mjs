import assert from 'node:assert/strict'
import test from 'node:test'

import { findMissingAnchors, parseSummary, renderMarkdown, safeResolve, slugFor, urlFor } from './content.mjs'

test('URLs preserve directory indexes and encode filenames', () => {
  assert.equal(slugFor('guide/README.md'), 'guide')
  assert.equal(slugFor('README.md'), '')
  assert.equal(urlFor('zh-cn', 'guide/安装'), '/docs/zh-cn/guide/%E5%AE%89%E8%A3%85/')
  assert.throws(() => safeResolve('/tmp/docs', '../secrets'))
})

test('GitBook conversion preserves headings, hints, tabs, figures and code literals', async () => {
  const issues = []
  const page = await renderMarkdown(
    `# Title\n\n{% hint style="warning" %}\n\n**Warning**\n\n{% endhint %}\n\n{% tabs %}\n{% tab title="macOS" %}\n\n## Setup <a id="old-anchor"></a>\n\n<figure><img src="../image.png"><figcaption>Caption</figcaption></figure>\n\n{% endtab %}\n{% endtabs %}\n\n\`\`\`txt\n{% example %}\n\`\`\``,
    (url) => `/rewritten/${url}`,
    (issue) => issues.push(issue)
  )
  assert.equal(page.title, 'Title')
  assert.match(page.html, /<aside data-hint="warning">/)
  assert.match(page.html, /<strong>Warning<\/strong>/)
  assert.match(page.html, /<figcaption>Caption<\/figcaption>/)
  assert.match(page.html, /src="\/rewritten\/\.\.\/image.png"/)
  assert.ok(page.toc.some((item) => item.url === '#old-anchor'))
  assert.match(page.html, /{% example %}/)
  assert.match(page.html, /class="shiki shiki-themes github-light github-dark"/)
  assert.deepEqual(issues, [])
})

test('mobile screenshot galleries retain their safe layout metadata', async () => {
  const page = await renderMarkdown(
    '<div data-mobile-gallery="pair"><figure data-mobile-shot="phone"><img src="phone.jpg"></figure></div>',
    (url) => `/rewritten/${url}`,
    () => {}
  )
  assert.match(page.html, /data-mobile-gallery="pair"/)
  assert.match(page.html, /data-mobile-shot="phone"/)
})

test('code blocks use syntax highlighting and map nginx conf fences', async () => {
  const page = await renderMarkdown(
    '```conf\nserver { listen 443 ssl; }\n```',
    (url) => url,
    () => {}
  )
  assert.match(page.html, /class="shiki shiki-themes github-light github-dark"/)
  assert.match(page.html, /--shiki-light:/)
  assert.match(page.html, /class="line"/)
})

test('repository HTML cannot execute scripts or event handlers', async () => {
  const page = await renderMarkdown(
    '# Test\n\n<script>alert(1)</script><img src="javascript:alert(1)" onerror="alert(1)"><a href="javascript:alert(1)">bad</a><iframe src="https://evil.example"></iframe>',
    (url) => url,
    () => {}
  )
  assert.doesNotMatch(page.html, /script|onerror|javascript:|iframe/)
})

test('navigation retains section titles and nested page order', () => {
  assert.deepEqual(
    parseSummary('## Guide <a id="guide"></a>\n* [Start](README.md)\n  * **Platforms**\n    * [Install](install.md)'),
    [
      { type: 'separator', name: 'Guide' },
      { type: 'page', name: 'Start', file: 'README.md', depth: 0 },
      { type: 'folder', name: 'Platforms', depth: 1 },
      { type: 'page', name: 'Install', file: 'install.md', depth: 2 }
    ]
  )
})

test('unknown GitBook tags are reported and remain visible', async () => {
  const issues = []
  const page = await renderMarkdown(
    '{% unknown %}',
    (url) => url,
    (issue) => issues.push(issue)
  )
  assert.equal(issues[0].type, 'unsupported-tag')
  assert.match(page.text, /unknown/)
})

test('both GitBook pinyin anchors and Markdown Chinese anchors work', async () => {
  const page = await renderMarkdown(
    '# 文档\n\n### API 地址\n\n## 助手库',
    (url) => url,
    () => {}
  )
  assert.ok(page.anchors.includes('api-di-zhi'))
  assert.ok(page.anchors.includes('api-地址'))
  assert.ok(page.anchors.includes('助手库'))
})

test('GitBook card metadata is converted into navigable cards', async () => {
  const page = await renderMarkdown(
    '<table data-view="cards"><thead><tr><th></th><th></th><th data-hidden data-card-target></th></tr></thead><tbody><tr><td><strong>Guide</strong></td><td>Description</td><td><a href="guide.md">guide.md</a></td></tr></tbody></table>',
    () => '/docs/en/guide/',
    () => {}
  )
  assert.match(page.html, /data-cards/)
  assert.match(page.html, /href="\/docs\/en\/guide\/"/)
  assert.match(page.text, /Description/)
  assert.doesNotMatch(page.text, /guide.md/)
})

test('regular tables retain table layout inside a horizontal scroll container', async () => {
  const page = await renderMarkdown(
    '| Type | Start | Check |\n| --- | --- | --- |\n| PDF | OCR | Tables |',
    (url) => url,
    () => {}
  )
  assert.match(page.html, /<div data-table-container><table>/)
  assert.match(page.html, /<th>Type<\/th>/)
})

test('navigation cards with an empty target report a source defect', async () => {
  const issues = []
  await renderMarkdown(
    '<table data-view="cards"><thead><tr><th>Title</th><th data-hidden data-card-target></th></tr></thead><tbody><tr><td>Setup</td><td></td></tr></tbody></table>',
    (url) => url,
    (issue) => issues.push(issue)
  )
  assert.deepEqual(issues, [{ type: 'missing-card-target', title: 'Setup' }])
})

test('translated headings retain both semantic legacy aliases and translated anchors', async () => {
  const page = await renderMarkdown(
    '# Guide\n\n<a id="api-di-zhi"></a>\n\n### API Address\n\n[API](#api-di-zhi)',
    (url) => url,
    () => {}
  )
  assert.ok(page.anchors.includes('api-di-zhi'))
  assert.ok(page.anchors.includes('api-address'))
  assert.ok(page.toc.some((item) => item.url === '#api-address'))
})

test('unfinished translation reasoning is reported but literal code examples are allowed', async () => {
  const issues = []
  await renderMarkdown(
    '<think>Unfinished translation',
    (url) => url,
    (issue) => issues.push(issue)
  )
  assert.deepEqual(issues, [{ type: 'translation-artifact' }])
  issues.length = 0
  await renderMarkdown(
    '```html\n<think>Example</think>\n```',
    (url) => url,
    (issue) => issues.push(issue)
  )
  assert.deepEqual(issues, [])
})

test('duplicate explicit anchors are reported', async () => {
  const issues = []
  await renderMarkdown(
    '<a id="same"></a>\n\n## Heading <a id="same"></a>',
    (url) => url,
    (issue) => issues.push(issue)
  )
  assert.deepEqual(issues, [{ type: 'duplicate-anchor', target: 'same' }])
})

test('anchor validation checks encoded, cross-page and malformed double-hash links', () => {
  const pages = [
    {
      locale: 'en',
      slug: 'guide',
      file: 'guide.md',
      anchors: ['介绍'],
      links: ['#%E4%BB%8B%E7%BB%8D', '##介绍', '/docs/en/setup/#missing', 'https://example.com/#external']
    },
    { locale: 'en', slug: 'setup', file: 'setup.md', anchors: ['install'], links: ['/docs/en/guide/#介绍'] }
  ]
  assert.deepEqual(
    findMissingAnchors(pages).map((issue) => issue.target),
    ['##介绍', '/docs/en/setup/#missing']
  )
})

test('math renders as static MathML while code examples and currency stay literal', async () => {
  const issues = []
  const page = await renderMarkdown(
    '# Math\n\n$$\\sum_{i=1}^n x_i$$\n\n$$\n\\frac{a}{b}\n$$\n\n`$$\\sum x$$` and $5 or $10\n\n```text\n$$literal$$\n```',
    (url) => url,
    (issue) => issues.push(issue)
  )
  assert.match(page.html, /<math xmlns=/)
  assert.match(page.html, /<mfrac>/)
  assert.match(page.html, /display="block"/)
  assert.match(page.html, /<code>\$\$\\sum x\$\$<\/code>/)
  assert.match(page.text, /\$5 or \$10/)
  assert.match(page.html, /\$\$literal\$\$/)
  assert.doesNotMatch(page.html, /<script|<link|katex-html/)
  assert.deepEqual(issues, [])
})

test('invalid math is reported and unsafe math commands cannot create executable links', async () => {
  const issues = []
  const page = await renderMarkdown(
    '$$\\unknowncommand{x}$$\n\n$$\\href{javascript:alert(1)}{click}$$',
    (url) => url,
    (issue) => issues.push(issue)
  )
  assert.ok(issues.some((issue) => issue.type === 'invalid-math'))
  assert.doesNotMatch(page.html, /href="javascript:/)
})
