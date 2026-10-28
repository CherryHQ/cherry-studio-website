const assert = require('node:assert/strict')
const { execFileSync } = require('node:child_process')
const { mkdtempSync, mkdirSync, writeFileSync, rmSync } = require('node:fs')
const { tmpdir } = require('node:os')
const { dirname, join } = require('node:path')
const { test } = require('node:test')

const { isBuildInput, shouldBuild } = require('./build-impact.cjs')

function repository(t) {
  const cwd = mkdtempSync(join(tmpdir(), 'website-build-impact-'))
  t.after(() => rmSync(cwd, { recursive: true, force: true }))
  const git = (...args) => execFileSync('git', args, { cwd, encoding: 'utf8' }).trim()
  git('init', '--quiet', '--initial-branch=main')
  git('config', 'user.name', 'Build impact test')
  git('config', 'user.email', 'test@example.com')
  git('config', 'commit.gpgsign', 'false')
  const commit = (files) => {
    for (const [file, content] of Object.entries(files)) {
      const path = join(cwd, file)
      if (content === null) rmSync(path)
      else {
        mkdirSync(dirname(path), { recursive: true })
        writeFileSync(path, content)
      }
    }
    git('add', '--all')
    git('commit', '--quiet', '-m', 'fixture')
    return git('rev-parse', 'HEAD')
  }
  const base = commit({ 'src/App.tsx': 'initial', 'README.md': 'internal' })
  const push = (before, sha) => shouldBuild({ eventName: 'push', event: { before }, sha, cwd })
  const pr = (baseSha, headSha) =>
    shouldBuild({
      eventName: 'pull_request',
      event: { pull_request: { base: { sha: baseSha }, head: { sha: headSha } } },
      cwd
    })
  return { git, commit, base, push, pr }
}

test('internal documentation, CI helpers, tests and development tooling only require checks', () => {
  for (const file of [
    'README.md',
    'AGENTS.md',
    'docs-site/README.md',
    'deploy/README.md',
    '.github/PULL_REQUEST_TEMPLATE.md',
    '.github/scripts/container-deploy.cjs',
    '.github/scripts/build-impact.test.cjs',
    '.github/workflows/update-reference-data.yml',
    '.gitignore',
    'biome.json',
    'scripts/dev.mjs',
    'docs-site/scripts/lint-links.mjs',
    'src/utils/example.test.ts',
    'docs-site/scripts/__tests__/content.test.mjs',
    '.vscode/settings.json'
  ])
    assert.equal(isBuildInput(file), false, file)
})

test('published content and build inputs still build, including published README and Markdown', () => {
  for (const file of [
    'docs-site/content/README.md',
    'docs-site/content/i18n/english/SUMMARY.md',
    'docs-site/content/image.png',
    'docs-site/public/README.md',
    'public/example.test.js',
    'src/pages/compare/product.md',
    'src/content/compare/en/README.md',
    'src/App.tsx',
    'shared/config.ts',
    'Dockerfile',
    '.dockerignore',
    '.gitattributes',
    'nginx.conf',
    'package.json',
    'pnpm-lock.yaml',
    'pnpm-workspace.yaml',
    'vite.config.ts',
    'docs-site/next.config.mjs',
    'docs-site/scripts/generate-content.mjs',
    'scripts/finalize-static-site.mjs',
    '.github/workflows/docs.yml',
    '.github/scripts/build-impact.cjs',
    '.github/scripts/smoke-container.sh',
    'new-runtime-input.json'
  ])
    assert.equal(isBuildInput(file), true, file)
  assert.throws(() => isBuildInput(undefined), /Invalid changed path/)
})

test('manual runs force a build and malformed/unsupported events fail closed', () => {
  assert.equal(shouldBuild({ eventName: 'workflow_dispatch' }), true)
  assert.throws(() => shouldBuild({ eventName: 'schedule' }), /Unsupported/)
  assert.throws(() => shouldBuild({ eventName: 'push', event: { before: '--option' }, sha: 'a'.repeat(40) }), /Invalid/)
})

test('push compares the entire batch, not only its final internal commit', (t) => {
  const { commit, base, push } = repository(t)
  const product = commit({ 'src/App.tsx': 'new product' })
  const head = commit({ 'README.md': 'new internal' })
  assert.equal(push(product, head), false)
  assert.equal(push(base, head), true)
  assert.equal(push('0'.repeat(40), head), true)
})

test('PR compares from the merge base even when main has newer product changes', (t) => {
  const { git, commit, pr } = repository(t)
  git('checkout', '--quiet', '-b', 'internal-pr')
  const internal = commit({ 'README.md': 'PR notes' })
  git('checkout', '--quiet', 'main')
  const main = commit({ 'src/App.tsx': 'main changed independently' })
  assert.equal(pr(main, internal), false)
  git('checkout', '--quiet', 'internal-pr')
  const product = commit({ 'src/App.tsx': 'PR product' })
  assert.equal(pr(main, product), true)
})

test('deletions and moves out of published paths still build; unusual filenames remain intact', (t) => {
  const { commit, base, push } = repository(t)
  const moved = commit({ 'src/App.tsx': null, 'deploy/old.md': 'initial' })
  assert.equal(push(base, moved), true)
  const published = commit({ 'docs-site/content/a space\nand newline.md': 'content' })
  assert.equal(push(moved, published), true)
  const deleted = commit({ 'docs-site/content/a space\nand newline.md': null })
  assert.equal(push(published, deleted), true)
})
