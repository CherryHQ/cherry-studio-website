import { spawn, spawnSync } from 'node:child_process'
import { watch } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
function generate() {
  const result = spawnSync(process.execPath, ['scripts/generate-content.mjs'], { cwd: root, stdio: 'inherit' })
  return result.status === 0
}
if (!generate()) process.exit(1)
const server = spawn('pnpm', ['exec', 'next', 'dev', '--port', '3001'], { cwd: root, stdio: 'inherit' })
let timer
const regenerate = () => {
  clearTimeout(timer)
  timer = setTimeout(() => {
    if (!generate()) console.error('Document generation failed. Fix the content and save again.')
  }, 250)
}
const watchers = [
  watch(path.join(root, 'content'), { recursive: true }, regenerate),
  ...['locales.json', 'page-aliases.json'].map((file) => watch(path.join(root, file), regenerate))
]
function cleanup() {
  clearTimeout(timer)
  for (const watcher of watchers) watcher.close()
}
server.on('error', (error) => {
  console.error(error)
  cleanup()
  process.exitCode = 1
})
server.on('exit', (code) => {
  cleanup()
  process.exitCode = code || 0
})
for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, () => {
    cleanup()
    server.kill(signal)
  })
}
