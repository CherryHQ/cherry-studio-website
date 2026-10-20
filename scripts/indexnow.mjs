/**
 * 部署后通知 IndexNow：告诉 Bing、Yandex 等搜索引擎哪些 URL 变了。
 *
 * Google 不参与 IndexNow，仍靠 sitemap 里的 lastmod。
 *
 * 用法（在 pnpm build:en 或 build:cn 之后）：
 *   pnpm indexnow                                # 提交 dist 里主站和文档站 sitemap 的全部 URL
 *   pnpm indexnow https://cherryai.com/flash     # 只提交指定 URL（可传多个，必须同一个域名）
 *
 * 搜索引擎会去 https://<域名>/<key>.txt 核对密钥，所以必须在新版本部署上线之后
 * 再跑，否则 key 文件还不存在，这批提交会被静默丢弃。key 文件就是 public/ 下那个
 * 以密钥命名的 .txt，中英文站共用，本身就是公开的，不是机密。
 */

import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

const ENDPOINT = 'https://api.indexnow.org/indexnow'
const distDir = join(process.cwd(), 'dist')

const keyFile = readdirSync(join(process.cwd(), 'public')).find((name) => /^[a-f0-9]{32}\.txt$/.test(name))
if (!keyFile) {
  console.error('public/ 下找不到 IndexNow 密钥文件（32 位十六进制命名的 .txt）')
  process.exit(1)
}
const key = keyFile.replace(/\.txt$/, '')

const urlsFromSitemaps = () =>
  [join(distDir, 'sitemap.xml'), join(distDir, 'docs', 'sitemap.xml')]
    .filter((file) => existsSync(file))
    .flatMap((file) => [...readFileSync(file, 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]))

const fromArgs = process.argv.length > 2
const candidates = fromArgs ? process.argv.slice(2) : urlsFromSitemaps()
if (!candidates.length) {
  console.error('没有可提交的 URL：先运行 pnpm build:en 或 build:cn，或者直接传入 URL')
  process.exit(1)
}

// 一次提交只能是同一个域名，取第一个 URL 的域名为准
const host = new URL(candidates[0]).host
const urls = candidates.filter((url) => new URL(url).host === host)
const skipped = candidates.filter((url) => new URL(url).host !== host)

if (skipped.length && fromArgs) {
  console.error(`一次只能提交同一个域名（${host}）下的 URL：\n${skipped.join('\n')}`)
  process.exit(1)
}

const response = await fetch(ENDPOINT, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host, key, keyLocation: `https://${host}/${keyFile}`, urlList: urls })
})

// 200 = 已接收；202 = 已接收、密钥待核验（仍可能因 key 文件不可访问被丢弃）
if (response.status === 200 || response.status === 202) {
  console.log(`IndexNow 已接收 ${host} 的 ${urls.length} 个 URL（HTTP ${response.status}）`)
  // sitemap 里指向其他子域名的条目（如企业版站）不属于本次提交
  if (skipped.length) console.log(`跳过了 ${skipped.length} 个其他域名的 URL`)
} else {
  console.error(`IndexNow 提交失败：HTTP ${response.status} ${await response.text()}`)
  process.exit(1)
}
