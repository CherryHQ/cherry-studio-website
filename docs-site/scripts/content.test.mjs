import assert from 'node:assert/strict'
import test from 'node:test'

import { parseSummary, renderMarkdown, safeResolve, slugFor, urlFor } from './content.mjs'

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
  assert.deepEqual(issues, [])
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
  assert.deepEqual(parseSummary('## Guide <a id="guide"></a>\n* [Start](README.md)\n  * [Install](install.md)'), [
    { type: 'separator', name: 'Guide' },
    { type: 'page', name: 'Start', file: 'README.md', depth: 0 },
    { type: 'page', name: 'Install', file: 'install.md', depth: 1 }
  ])
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
