import { existsSync, readFileSync, statSync } from 'node:fs'
import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'docs-static-preview',
      configurePreviewServer(server) {
        server.middlewares.use((request, response, next) => {
          const pathname = new URL(request.url || '/', 'http://localhost').pathname
          if (!pathname.startsWith('/docs/')) return next()
          let file: string
          try {
            file = path.resolve('dist', `.${decodeURIComponent(pathname)}`)
          } catch {
            response.statusCode = 400
            return response.end('Bad request')
          }
          const docsRoot = path.resolve('dist/docs')
          if ((file === docsRoot || file.startsWith(`${docsRoot}${path.sep}`)) && existsSync(file)) {
            if (statSync(file).isFile() || existsSync(path.join(file, 'index.html'))) return next()
          }
          response.statusCode = 404
          response.setHeader('Content-Type', 'text/html; charset=utf-8')
          response.end(readFileSync(path.join(docsRoot, '404.html')))
        })
      }
    }
  ],
  preview: { proxy: {} },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    proxy: {
      '/docs': { target: 'http://127.0.0.1:3001', changeOrigin: true, ws: true },
      '/api': {
        target: 'http://rack1.raincs.cc:18192',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
