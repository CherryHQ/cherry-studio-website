import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'

const releasesURL = process.env.VITE_RELEASES_URL?.trim() || 'https://releases.cherry-ai.com'

function releaseClientProxy(): Plugin {
  return {
    name: 'release-client-proxy',
    configureServer(server) {
      server.middlewares.use(async (request, response, next) => {
        const requestURL = new URL(request.url ?? '/', 'http://localhost')
        const isMetadataRequest = requestURL.pathname === '/_release/client/rc'
        const isDownloadRequest = requestURL.pathname.startsWith('/_release/download/')

        if (request.method !== 'GET' || (!isMetadataRequest && !isDownloadRequest)) {
          next()
          return
        }

        const region = requestURL.searchParams.get('region') === 'global' ? 'global' : 'cn'
        const upstreamPath = isMetadataRequest ? '/rc.yml' : requestURL.pathname.replace(/^\/_release/, '')

        try {
          const upstream = await fetch(`${releasesURL.replace(/\/+$/, '')}${upstreamPath}`, {
            headers: {
              'X-Region': region,
              ...(isMetadataRequest ? { 'X-Release-Channel': 'production' } : {})
            },
            redirect: 'manual'
          })

          response.setHeader('Cache-Control', 'no-store')
          if (isMetadataRequest && upstream.status === 302) {
            const manifestURL = upstream.headers.get('Location')
            if (!manifestURL) {
              response.statusCode = 502
              response.setHeader('Content-Type', 'application/json')
              response.end(JSON.stringify({ error: 'Release service returned invalid client metadata' }))
              return
            }

            const manifest = await fetch(manifestURL)
            response.statusCode = manifest.status
            response.setHeader('Content-Type', 'text/yaml; charset=utf-8')
            response.setHeader('X-Release-Version', upstream.headers.get('X-Release-Version') ?? '')
            response.setHeader('X-Release-Mirror', upstream.headers.get('X-Release-Mirror') ?? '')
            response.setHeader('X-Release-Policy', upstream.headers.get('X-Release-Policy') ?? '')
            response.setHeader('X-Release-Manifest', manifestURL)
            response.end(Buffer.from(await manifest.arrayBuffer()))
            return
          }

          response.statusCode = upstream.status
          for (const header of ['content-type', 'location']) {
            const value = upstream.headers.get(header)
            if (value) response.setHeader(header, value)
          }
          response.end(Buffer.from(await upstream.arrayBuffer()))
        } catch {
          response.statusCode = 502
          response.setHeader('Content-Type', 'application/json')
          response.end(JSON.stringify({ error: 'Release service is temporarily unavailable' }))
        }
      })
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), releaseClientProxy()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://rack1.raincs.cc:18192',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
