const assert = require('node:assert/strict')
const { test } = require('node:test')

const { target, resolveConfig, updateImage, apiClient, updateGitops } = require('./container-deploy.cjs')

const sha = 'a'.repeat(40)
const digest = `sha256:${'b'.repeat(64)}`
const oldDigest = `sha256:${'c'.repeat(64)}`
const oldImage = 'registry-vpc.example.com/cherry/cherry-studio-website'
const image = 'other-vpc.example.com/cherry/cherry-studio-website'
const runUrl = 'https://github.com/CherryHQ/cherry-studio-website/actions/runs/123'
const content = `apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
namespace: cherry-prod
resources:
- ../../base
- ingress.yaml
images:
- name: cherryai-web
  newName: ${oldImage}
  digest: ${oldDigest}
`
const env = {
  GITHUB_REPOSITORY: 'CherryHQ/cherry-studio-website',
  GITHUB_SHA: sha,
  CONTAINER_REGISTRY_HOST: 'registry.example.com:5000',
  CONTAINER_REGISTRY_PULL_HOST: 'registry-vpc.example.com',
  CONTAINER_REGISTRY_USERNAME: 'test-user',
  CONTAINER_REGISTRY_PASSWORD: 'test-password',
  GITOPS_TOKEN: 'test-gitops-token'
}

test('derive distinct push/pull addresses with existing namespace and full source SHA', () => {
  assert.deepEqual(resolveConfig(env), {
    host: 'registry.example.com:5000',
    authMode: 'credentials',
    pushImage: 'registry.example.com:5000/cherry/cherry-studio-website',
    pullImage: oldImage,
    tag: `registry.example.com:5000/cherry/cherry-studio-website:sha-${sha}`
  })
  assert.equal(
    resolveConfig({ ...env, CONTAINER_REGISTRY_PULL_HOST: '', CONTAINER_REGISTRY_NAMESPACE: 'another' }).pullImage,
    'registry.example.com:5000/another/cherry-studio-website'
  )
})

test('GHCR token mode only permits ghcr.io and does not require static registry credentials', () => {
  const config = { ...env, CONTAINER_REGISTRY_AUTH_MODE: 'github-token', CONTAINER_REGISTRY_PASSWORD: '' }
  assert.throws(() => resolveConfig(config), /restricted to ghcr.io/)
  assert.equal(resolveConfig({ ...config, CONTAINER_REGISTRY_HOST: 'ghcr.io' }).authMode, 'github-token')
})

test('reject missing production secrets, unsupported auth, wrong source and malformed addresses', () => {
  for (const key of [
    'CONTAINER_REGISTRY_HOST',
    'CONTAINER_REGISTRY_USERNAME',
    'CONTAINER_REGISTRY_PASSWORD',
    'GITOPS_TOKEN'
  ]) {
    assert.throws(() => resolveConfig({ ...env, [key]: '' }), new RegExp(key))
  }
  assert.throws(() => resolveConfig({ ...env, CONTAINER_REGISTRY_AUTH_MODE: 'unknown' }), /Unsupported/)
  assert.throws(() => resolveConfig({ ...env, GITHUB_REPOSITORY: 'fork/website' }), /source repository/)
  assert.throws(() => resolveConfig({ ...env, GITHUB_SHA: 'main' }), /source SHA/)
  for (const host of [
    'https://registry.example.com',
    'registry.example.com/path',
    'registry.example.com:99999',
    'host\nkey=value'
  ]) {
    assert.throws(() => resolveConfig({ ...env, CONTAINER_REGISTRY_HOST: host }))
  }
  assert.throws(() => resolveConfig({ ...env, CONTAINER_REGISTRY_NAMESPACE: 'cherry:latest' }))
})

test('update both address and digest, preserve unrelated content and allow idempotent reruns', () => {
  const updated = updateImage(content, image, digest)
  assert.equal(updated, content.replace(oldImage, image).replace(oldDigest, digest))
  assert.equal(updateImage(updated, image, digest), updated)
  // Registry migration with identical bytes must still update the address.
  assert.equal(updateImage(content, image, oldDigest), content.replace(oldImage, image))
  const indented = content
    .replace('- name:', '  - name:')
    .replace('  newName:', '    newName:')
    .replace('  digest:', '    digest:')
  assert.match(updateImage(indented, image, digest), new RegExp(image))
})

test('reject absent/duplicate aliases, unexpected fields, extra images, tags and injection', () => {
  const invalid = [
    content.replace('name: cherryai-web', 'name: other-service'),
    `${content}- name: cherryai-web\n  newName: ${oldImage}\n  digest: ${digest}\n`,
    `${content}  newTag: latest\n`,
    content.replace('images:', 'other:'),
    `${content}images:\n- name: cherryai-web\n`,
    content.replace(oldDigest, 'not-a-digest'),
    content.replace('  newName:', '  digest:'),
    content.replace('  newName:', '- newName:'),
    content.replace('  digest:', '- digest:'),
    content.replace('- name:', '  name:')
  ]
  for (const input of invalid) assert.throws(() => updateImage(input, image, digest))
  for (const address of [`${image}:latest`, `${image}@${digest}`, `${image}\nfoo: bar`, `https://${image}`]) {
    assert.throws(() => updateImage(content, address, digest))
  }
  assert.throws(() => updateImage(content, image, 'sha256:short'))
})

function fixture({ heads = [sha], putErrors = [], contents = [content], fileShas = ['d'.repeat(40)] } = {}) {
  const writes = []
  const reads = []
  let sourceCalls = 0
  let targetCalls = 0
  let putCalls = 0
  const source = async (method, path) => {
    assert.equal(method, 'GET')
    assert.equal(path, '/repos/CherryHQ/cherry-studio-website/git/ref/heads/main')
    return { object: { sha: heads[Math.min(sourceCalls++, heads.length - 1)] } }
  }
  const gitops = async (method, path, body) => {
    assert.ok(path.startsWith(`/repos/${target.repository}/contents/${target.path}`))
    if (method === 'GET') {
      assert.ok(path.endsWith('?ref=main'))
      reads.push(path)
      const index = targetCalls++
      return {
        type: 'file',
        encoding: 'base64',
        sha: fileShas[Math.min(index, fileShas.length - 1)],
        content: Buffer.from(contents[Math.min(index, contents.length - 1)]).toString('base64')
      }
    }
    assert.equal(method, 'PUT')
    writes.push(body)
    const error = putErrors[putCalls++]
    if (error) throw Object.assign(new Error(`HTTP ${error}`), { status: error })
    return {}
  }
  return { args: { source, gitops, sha, image, digest, runUrl, log() {} }, writes, reads }
}

test('conditional write pins one GitOps file/ref and records bot identity, source, digest and workflow', async () => {
  const { args, writes } = fixture()
  assert.equal(await updateGitops(args), 'updated')
  assert.equal(writes.length, 1)
  assert.equal(writes[0].branch, 'main')
  assert.equal(writes[0].sha, 'd'.repeat(40))
  assert.equal(Buffer.from(writes[0].content, 'base64').toString(), updateImage(content, image, digest))
  assert.deepEqual(writes[0].author, {
    name: 'github-actions[bot]',
    email: '41898282+github-actions[bot]@users.noreply.github.com'
  })
  assert.deepEqual(writes[0].committer, writes[0].author)
  assert.ok(writes[0].message.startsWith(`deploy(cherry-studio-website): ${sha.slice(0, 12)}\n\n`))
  assert.ok(writes[0].message.includes(`Source: https://github.com/CherryHQ/cherry-studio-website/commit/${sha}\n`))
  assert.ok(
    writes[0].message.endsWith(
      '\n\nSigned-off-by: github-actions[bot] <41898282+github-actions[bot]@users.noreply.github.com>'
    )
  )
  for (const value of [sha, image, digest, runUrl]) assert.ok(writes[0].message.includes(value))
})

test('unchanged rerun creates no commit; old source never writes', async () => {
  const same = fixture({ contents: [updateImage(content, image, digest)] })
  assert.equal(await updateGitops(same.args), 'unchanged')
  assert.equal(same.writes.length, 0)
  const stale = fixture({ heads: ['e'.repeat(40)] })
  assert.equal(await updateGitops(stale.args), 'stale')
  assert.equal(stale.reads.length, 0)
  assert.equal(stale.writes.length, 0)
  const movedDuringRead = fixture({ heads: [sha, 'e'.repeat(40)] })
  assert.equal(await updateGitops(movedDuringRead.args), 'stale')
  assert.equal(movedDuringRead.writes.length, 0)
})

test('retry confirmed concurrent file changes with new SHA, preserving other edits', async () => {
  const concurrent = content.replace('namespace: cherry-prod', 'namespace: cherry-prod\n# concurrent edit')
  const { args, writes } = fixture({
    putErrors: [409],
    fileShas: ['d'.repeat(40), 'e'.repeat(40)],
    contents: [content, concurrent]
  })
  assert.equal(await updateGitops(args), 'updated')
  assert.equal(writes.length, 2)
  assert.equal(writes[1].sha, 'e'.repeat(40))
  assert.ok(Buffer.from(writes[1].content, 'base64').toString().includes('# concurrent edit'))
})

test('recheck source on conflicts and stop once main advances', async () => {
  const { args, writes } = fixture({
    heads: [sha, sha, 'e'.repeat(40)],
    putErrors: [409],
    fileShas: ['d'.repeat(40), 'e'.repeat(40)]
  })
  assert.equal(await updateGitops(args), 'stale')
  assert.equal(writes.length, 1)
})

test('do not retry auth, protection, validation, missing files or unexplained conflicts', async () => {
  for (const status of [401, 403, 404, 422, 409]) {
    const { args, writes } = fixture({ putErrors: [status] })
    await assert.rejects(updateGitops(args), /HTTP/)
    assert.equal(writes.length, 1)
  }
})

test('bound confirmed conflict retries to five writes', async () => {
  const { args, writes } = fixture({
    putErrors: [409, 409, 409, 409, 409],
    fileShas: ['d', 'e', 'f', '1', '2'].map((char) => char.repeat(40))
  })
  await assert.rejects(updateGitops(args), /HTTP 409/)
  assert.equal(writes.length, 5)
})

test('API clients keep the source and GitOps tokens separate and reject redirects', async () => {
  const calls = []
  const fetchImpl = async (url, options) => {
    calls.push({ url, options })
    return { ok: true, json: async () => ({}) }
  }
  await apiClient('source-only', fetchImpl)('GET', '/repos/CherryHQ/cherry-studio-website/git/ref/heads/main')
  await apiClient('gitops-only', fetchImpl)('PUT', `/repos/${target.repository}/contents/${target.path}`, {
    branch: 'main'
  })
  assert.equal(calls[0].options.headers.Authorization, 'Bearer source-only')
  assert.equal(calls[1].options.headers.Authorization, 'Bearer gitops-only')
  for (const call of calls) {
    assert.ok(call.url.startsWith('https://api.github.com/repos/'))
    assert.equal(call.options.redirect, 'error')
  }
  await assert.rejects(apiClient('secret', async () => ({ ok: false, status: 403 }))('GET', '/repos/example'), {
    message: 'GitHub GET /repos/example: HTTP 403'
  })
})
