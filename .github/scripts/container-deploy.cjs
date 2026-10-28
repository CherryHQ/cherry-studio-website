const { appendFileSync } = require('node:fs')

const target = Object.freeze({
  repository: 'CherryInternal/cherry-gitops',
  branch: 'main',
  path: 'cherryai-web/overlays/prod/kustomization.yaml',
  alias: 'cherryai-web'
})
const sourceRepository = 'CherryHQ/cherry-studio-website'
const gitopsBot = Object.freeze({
  name: 'github-actions[bot]',
  email: '41898282+github-actions[bot]@users.noreply.github.com'
})
const digestPattern = /^sha256:[a-f0-9]{64}$/

function required(value, name) {
  if (!value || value.trim() !== value) throw new Error(`Missing or invalid ${name}`)
  return value
}

function registryHost(value) {
  if (!/^[a-z0-9]+(?:[.-][a-z0-9]+)*(?::[0-9]{1,5})?$/.test(value)) {
    throw new Error('Registry host must be a lowercase hostname with an optional port')
  }
  const port = value.split(':')[1]
  if (port && (Number(port) < 1 || Number(port) > 65535)) throw new Error('Invalid registry port')
  return value
}

function imageAddress(value) {
  const [host, ...parts] = value.split('/')
  registryHost(host)
  if (!parts.length || parts.some((part) => !/^[a-z0-9]+(?:[._-][a-z0-9]+)*$/.test(part))) {
    throw new Error('Image must be an untagged lowercase registry/repository address')
  }
  return value
}

function resolveConfig(env) {
  if (env.GITHUB_REPOSITORY !== sourceRepository) throw new Error('Unexpected source repository')
  if (!/^[a-f0-9]{40}$/.test(env.GITHUB_SHA)) throw new Error('Invalid source SHA')
  const host = registryHost(required(env.CONTAINER_REGISTRY_HOST, 'CONTAINER_REGISTRY_HOST'))
  const pullHost = registryHost(env.CONTAINER_REGISTRY_PULL_HOST || host)
  // Keep the existing ACR namespace unless an explicit migration changes it.
  const namespace = env.CONTAINER_REGISTRY_NAMESPACE || 'cherry'
  const name = env.GITHUB_REPOSITORY.split('/')[1].toLowerCase()
  const pushImage = imageAddress(`${host}/${namespace}/${name}`)
  const pullImage = imageAddress(`${pullHost}/${namespace}/${name}`)
  const authMode = env.CONTAINER_REGISTRY_AUTH_MODE || 'credentials'
  if (authMode === 'github-token') {
    if (host !== 'ghcr.io') throw new Error('github-token authentication is restricted to ghcr.io')
  } else if (authMode === 'credentials') {
    required(env.CONTAINER_REGISTRY_USERNAME, 'CONTAINER_REGISTRY_USERNAME')
    required(env.CONTAINER_REGISTRY_PASSWORD, 'CONTAINER_REGISTRY_PASSWORD')
  } else {
    throw new Error('Unsupported CONTAINER_REGISTRY_AUTH_MODE')
  }
  required(env.GITOPS_TOKEN, 'GITOPS_TOKEN')
  return { host, authMode, pushImage, pullImage, tag: `${pushImage}:sha-${env.GITHUB_SHA}` }
}

function updateImage(content, image, digest) {
  imageAddress(image)
  if (!digestPattern.test(digest)) throw new Error('Invalid build digest')
  // This application deliberately has a single, plain images entry. Fail closed if its
  // schema changes; never use a global replacement on an arbitrary YAML document.
  const sections = [...content.matchAll(/^images:\s*\n((?:[ \t].*\n|-[^\n]*\n|\n)*)/gm)]
  if (sections.length !== 1) throw new Error('Expected exactly one images section')
  const section = sections[0]
  const lines = section[1].trimEnd().split('\n')
  const entry = lines[0].match(/^( *)- name: ([^\s#]+)$/)
  if (!entry) throw new Error('Expected an image list entry')
  const fieldPattern = new RegExp(`^${entry[1]}  (newName|digest): ([^\\s#]+)$`)
  const fields = lines.slice(1).map((line) => line.match(fieldPattern))
  if (fields.length !== 2 || fields.some((field) => !field)) throw new Error('Unexpected images schema')
  const values = { name: entry[2], ...Object.fromEntries(fields.map((field) => [field[1], field[2]])) }
  if (Object.keys(values).length !== 3 || values.name !== target.alias) {
    throw new Error('Expected the single cherryai-web image alias')
  }
  imageAddress(values.newName)
  if (!digestPattern.test(values.digest)) throw new Error('Invalid existing digest')
  const replacement = section[0]
    .replace(/^(\s+newName: )[^\s]+$/m, `$1${image}`)
    .replace(/^(\s+digest: )[^\s]+$/m, `$1${digest}`)
  return content.slice(0, section.index) + replacement + content.slice(section.index + section[0].length)
}

function apiClient(token, fetchImpl = fetch) {
  required(token, 'GitHub API token')
  return async (method, path, body) => {
    const response = await fetchImpl(`https://api.github.com${path}`, {
      method,
      redirect: 'error',
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${token}`,
        'X-GitHub-Api-Version': '2022-11-28',
        'Content-Type': 'application/json'
      },
      ...(body ? { body: JSON.stringify(body) } : {}),
      signal: AbortSignal.timeout(30000)
    })
    if (!response.ok) {
      const error = new Error(`GitHub ${method} ${path}: HTTP ${response.status}`)
      error.status = response.status
      throw error
    }
    return response.json()
  }
}

async function updateGitops({ source, gitops, sha, image, digest, runUrl, log = console.log }) {
  if (!/^[a-f0-9]{40}$/.test(sha)) throw new Error('Invalid source SHA')
  imageAddress(image)
  if (!digestPattern.test(digest)) throw new Error('Invalid build digest')
  if (!/^https:\/\/github\.com\/CherryHQ\/cherry-studio-website\/actions\/runs\/[0-9]+$/.test(runUrl)) {
    throw new Error('Invalid workflow URL')
  }
  const headPath = `/repos/${sourceRepository}/git/ref/heads/main`
  const filePath = `/repos/${target.repository}/contents/${target.path}`
  const readFile = async () => {
    const file = await gitops('GET', `${filePath}?ref=${target.branch}`)
    if (file.type !== 'file' || file.encoding !== 'base64' || !/^[a-f0-9]{40}$/.test(file.sha)) {
      throw new Error('Unexpected GitOps file response')
    }
    return file
  }
  const isCurrent = async () => (await source('GET', headPath)).object.sha === sha
  let pending
  for (let attempt = 1; attempt <= 5; attempt++) {
    if (!(await isCurrent())) {
      log(`Skipped stale source ${sha}; main has moved`)
      return 'stale'
    }
    const file = pending || (await readFile())
    pending = undefined
    const current = Buffer.from(file.content, 'base64').toString('utf8')
    const updated = updateImage(current, image, digest)
    if (current === updated) {
      log('GitOps image address and digest are already current')
      return 'unchanged'
    }
    // Check again after reading the target; repeat on every confirmed conflict.
    if (!(await isCurrent())) {
      log(`Skipped stale source ${sha}; main has moved`)
      return 'stale'
    }
    try {
      await gitops('PUT', filePath, {
        branch: target.branch,
        sha: file.sha,
        content: Buffer.from(updated).toString('base64'),
        author: gitopsBot,
        committer: gitopsBot,
        message: [
          `deploy(${sourceRepository.split('/')[1]}): ${sha.slice(0, 12)}`,
          '',
          `Source: https://github.com/${sourceRepository}/commit/${sha}`,
          `Image: ${image}@${digest}`,
          `Workflow: ${runUrl}`,
          '',
          `Signed-off-by: ${gitopsBot.name} <${gitopsBot.email}>`
        ].join('\n')
      })
      log(`Updated ${target.repository}/${target.path} to ${image}@${digest}`)
      return 'updated'
    } catch (error) {
      if (error.status !== 409 || attempt === 5) throw error
      // Only a changed blob proves a concurrent edit. Permissions, protection rules,
      // missing files, validation failures and unexplained conflicts fail immediately.
      pending = await readFile()
      if (pending.sha === file.sha) throw error
    }
  }
}

async function main(env) {
  if (process.argv[2] === 'config') {
    const config = resolveConfig(env)
    appendFileSync(
      env.GITHUB_OUTPUT,
      Object.entries(config)
        .map(([key, value]) => `${key}=${value}\n`)
        .join('')
    )
  } else if (process.argv[2] === 'update') {
    if (env.GITHUB_REPOSITORY !== sourceRepository || env.GITHUB_REF !== 'refs/heads/main') {
      throw new Error('Only the source main branch can update production')
    }
    await updateGitops({
      source: apiClient(env.SOURCE_TOKEN),
      gitops: apiClient(env.GITOPS_TOKEN),
      sha: env.GITHUB_SHA,
      image: env.DEPLOY_IMAGE,
      digest: env.BUILD_DIGEST,
      runUrl: `https://github.com/${sourceRepository}/actions/runs/${env.GITHUB_RUN_ID}`
    })
  } else {
    throw new Error('Usage: node container-deploy.cjs config|update')
  }
}

module.exports = { target, resolveConfig, updateImage, apiClient, updateGitops }
if (require.main === module) {
  main(process.env).catch((error) => {
    console.error(error.message)
    process.exitCode = 1
  })
}
