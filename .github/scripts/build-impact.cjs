const { execFileSync } = require('node:child_process')
const { appendFileSync, readFileSync } = require('node:fs')

const buildChecks = new Set([
  '.github/workflows/docs.yml',
  '.github/scripts/build-impact.cjs',
  '.github/scripts/smoke-container.sh'
])
const internalFiles = new Set([
  '.gitignore',
  'biome.json',
  'eslint.config.js',
  'components.json',
  'scripts/dev.mjs',
  'scripts/indexnow.mjs',
  'docs-site/scripts/dev.mjs',
  'docs-site/scripts/lint-links.mjs',
  'docs-site/scripts/lint-shadowed.mjs'
])
const internalDirectories = [
  '.github/',
  '.vscode/',
  '.claude/',
  '.conductor/',
  '.context/',
  'deploy/',
  'tests/',
  'test/'
]

function isBuildInput(file) {
  if (typeof file !== 'string' || !file) throw new Error('Invalid changed path')
  if (buildChecks.has(file)) return true
  // Published Markdown and public files are product content, including README.md.
  if (['docs-site/content/', 'docs-site/public/', 'public/'].some((prefix) => file.startsWith(prefix))) return true
  if (/\.md$/i.test(file) && ['src/', 'shared/', 'docs-site/src/'].some((prefix) => file.startsWith(prefix)))
    return true
  if (/(^|\/)(README|AGENTS|CLAUDE)\.md$/i.test(file)) return false
  if (/\.(test|spec)\.[cm]?[jt]sx?$/.test(file) || /(^|\/)__tests__\//.test(file)) return false
  if (internalFiles.has(file) || internalDirectories.some((prefix) => file.startsWith(prefix))) return false
  if (/\.md$/i.test(file)) return false
  // Unknown files build conservatively so a new runtime dependency cannot be missed.
  return true
}

function shouldBuild({ eventName, event, sha, cwd = process.cwd() }) {
  if (eventName === 'workflow_dispatch') return true
  const git = (args, input) => execFileSync('git', args, { cwd, input, encoding: 'utf8', maxBuffer: 16 * 1024 * 1024 })
  const commit = (value) => {
    if (!/^[a-f0-9]{40}$/.test(value)) throw new Error('Invalid comparison commit')
    return value
  }
  let range
  if (eventName === 'pull_request') {
    range = [`${commit(event.pull_request.base.sha)}...${commit(event.pull_request.head.sha)}`]
  } else if (eventName === 'push') {
    const before = commit(event.before)
    const base = /^0+$/.test(before) ? git(['hash-object', '-w', '-t', 'tree', '--stdin'], '').trim() : before
    range = [base, commit(sha)]
  } else {
    throw new Error(`Unsupported build event: ${eventName}`)
  }
  // No rename detection: both the old and new paths must participate in the filter.
  const files = git(['diff', '--name-only', '--no-renames', '-z', ...range, '--'])
    .split('\0')
    .filter(Boolean)
  return files.some(isBuildInput)
}

module.exports = { isBuildInput, shouldBuild }
if (require.main === module) {
  try {
    const build = shouldBuild({
      eventName: process.env.GITHUB_EVENT_NAME,
      event: JSON.parse(readFileSync(process.env.GITHUB_EVENT_PATH, 'utf8')),
      sha: process.env.GITHUB_SHA
    })
    appendFileSync(process.env.GITHUB_OUTPUT, `build=${build}\n`)
    console.log(build ? 'Build required: product/build inputs changed or manual run' : 'Checks only: internal changes')
  } catch (error) {
    console.error(error.message)
    process.exitCode = 1
  }
}
