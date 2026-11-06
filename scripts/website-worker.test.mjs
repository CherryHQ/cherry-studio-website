import assert from 'node:assert/strict'
import { afterEach, test } from 'node:test'
import worker from './website-worker.mjs'
const originalFetch = globalThis.fetch
afterEach(() => { globalThis.fetch = originalFetch })
test('only explicit public routes are proxied without user credentials', async () => {
  let target, init
  globalThis.fetch = async (url, options) => { target = url; init = options; return Response.json({ items: [] }) }
  const response = await worker.fetch(new Request('https://cherryai.com/api/website/themes?limit=6', { headers: { Authorization: 'should-not-forward', Cookie: 'private', 'X-Forwarded-For': 'forged', 'CF-Connecting-IP': '192.0.2.10' } }), {})
  assert.equal(response.status, 200)
  assert.equal(target, 'https://ops.cherry-ai.com/api/website/themes?limit=6')
  assert.equal(init.headers.get('Authorization'), null)
  assert.equal(init.headers.get('Cookie'), null)
  assert.equal(init.headers.get('X-Forwarded-For'), '192.0.2.10')
  assert.equal(response.headers.get('Cache-Control'), 'no-store')
  assert.equal((await worker.fetch(new Request('https://cherryai.com/api/admin/files'), {})).status, 404)
  assert.equal((await worker.fetch(new Request('https://cherryai.com/api/website/themes', { method: 'POST' }), {})).status, 405)
})
test('static requests retain the asset binding', async () => {
  const response = await worker.fetch(new Request('https://cherryai.com/docs/en/'), { ASSETS: { fetch: async () => new Response('docs') } })
  assert.equal(await response.text(), 'docs')
})
test('multipart submission keeps idempotency and rejects oversized bodies', async () => {
  let init
  globalThis.fetch = async (_url, options) => { init = options; return Response.json({ id: 'submission', status: 'pending' }, { status: 201 }) }
  const body = new FormData(); body.append('content', '{}')
  const response = await worker.fetch(new Request('https://cherryai.com/api/website/theme-submissions', { method: 'POST', headers: { 'Idempotency-Key': 'key', Origin: 'https://cherryai.com' }, body }), {})
  assert.equal(response.status, 201)
  assert.equal(init.headers.get('Idempotency-Key'), 'key')
  assert.match(init.headers.get('Content-Type'), /multipart\/form-data/)
  assert.equal((await worker.fetch(new Request('https://cherryai.com/api/website/theme-submissions', { method: 'POST', body: new Uint8Array(6 * 1024 * 1024 + 1) }), {})).status, 413)
})
test('upstream failures are explicit errors, never SPA HTML', async () => {
  globalThis.fetch = async () => { throw new Error('offline') }
  const response = await worker.fetch(new Request('https://cherryai.com/api/configs?product=website'), {})
  assert.equal(response.status, 503)
  assert.equal((await response.json()).error.code, 'website_unavailable')
})
