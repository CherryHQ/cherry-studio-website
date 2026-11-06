// The international deployment uses Workers Static Assets instead of Nginx.
// Keep the public API allowlist identical to nginx.conf; never proxy admin routes.
const routes = new Map([
  ['/api/configs', ['GET', 'HEAD']],
  ['/api/website/themes', ['GET', 'HEAD']],
  ['/api/website/theme-submissions', ['POST']]
])
const maximumBody = 6 * 1024 * 1024

export default {
  async fetch(request, env) {
    const url = new URL(request.url)
    if (!url.pathname.startsWith('/api/')) return env.ASSETS.fetch(request)
    const methods = routes.get(url.pathname)
    if (!methods) return new Response('Not found', { status: 404 })
    if (!methods.includes(request.method)) return new Response('Method not allowed', { status: 405, headers: { Allow: methods.join(', ') } })
    const headers = new Headers({ Accept: 'application/json' })
    for (const name of ['Content-Type', 'Idempotency-Key', 'Origin']) {
      const value = request.headers.get(name)
      if (value) headers.set(name, value)
    }
    // CF-Connecting-IP is set by Cloudflare, never trust the caller's XFF chain.
    const ip = request.headers.get('CF-Connecting-IP')
    if (ip) headers.set('X-Forwarded-For', ip)
    let body
    if (request.method === 'POST' && request.body) {
      if (Number(request.headers.get('Content-Length')) > maximumBody) return new Response('Request too large', { status: 413 })
      const chunks = []
      const reader = request.body.getReader()
      let size = 0
      while (true) {
        const { value, done } = await reader.read()
        if (done) break
        size += value.byteLength
        if (size > maximumBody) { await reader.cancel(); return new Response('Request too large', { status: 413 }) }
        chunks.push(value)
      }
      body = new Uint8Array(size)
      let offset = 0
      for (const chunk of chunks) { body.set(chunk, offset); offset += chunk.byteLength }
    }
    try {
      const response = await fetch(`https://ops.cherry-ai.com${url.pathname}${url.search}`, {
        method: request.method, headers, body, redirect: 'manual', signal: AbortSignal.timeout(request.method === 'POST' ? 120_000 : 15_000)
      })
      const result = new Headers()
      for (const name of ['Content-Type', 'Retry-After']) {
        const value = response.headers.get(name)
        if (value) result.set(name, value)
      }
      result.set('Cache-Control', 'no-store')
      result.set('X-Content-Type-Options', 'nosniff')
      return new Response(response.body, { status: response.status, headers: result })
    } catch {
      return Response.json({ error: { code: 'website_unavailable', message: 'Website data is temporarily unavailable' } }, { status: 503, headers: { 'Cache-Control': 'no-store' } })
    }
  }
}
