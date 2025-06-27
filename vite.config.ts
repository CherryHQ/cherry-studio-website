import react from '@vitejs/plugin-react'
// import fs from 'fs'
import path from 'path'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react()
    // {
    //   name: 'agent-json-handler',
    //   configureServer(server) {
    //     server.middlewares.use((req, res, next) => {
    //       const agentPattern = /^\/agent\/(zh|en)\/(.+)\.json$/
    //       const allAgentsPattern = /^\/agent\/agents-(zh|en)\.json$/
    //
    //       const agentMatch = req.url?.match(agentPattern)
    //       const allAgentsMatch = req.url?.match(allAgentsPattern)
    //
    //       if (allAgentsMatch) {
    //         const lang = allAgentsMatch[1] // 'zh' 或 'en'
    //         try {
    //           const agentsPath = path.resolve(__dirname, `./src/assets/data/agents-${lang}.json`)
    //           const agents = JSON.parse(fs.readFileSync(agentsPath, 'utf-8'))
    //
    //           res.setHeader('Content-Type', 'application/json')
    //           res.setHeader('Content-Disposition', `attachment; filename="agents-${lang}.json"`)
    //           res.statusCode = 200
    //           return res.end(JSON.stringify(agents, null, 2))
    //         } catch (error) {
    //           console.error('Error serving all agents JSON:', error)
    //           res.statusCode = 500
    //           return res.end(JSON.stringify({ error: '服务器内部错误' }))
    //         }
    //       } else if (agentMatch) {
    //         const lang = agentMatch[1] // 'zh' 或 'en'
    //         const agentId = agentMatch[2]
    //         try {
    //           const agentsEnPath = path.resolve(__dirname, './src/assets/data/agents-en.json')
    //           const agentsZhPath = path.resolve(__dirname, './src/assets/data/agents-zh.json')
    //
    //           const agents =
    //             lang === 'zh'
    //               ? JSON.parse(fs.readFileSync(agentsZhPath, 'utf-8'))
    //               : JSON.parse(fs.readFileSync(agentsEnPath, 'utf-8'))
    //
    //           const agent = agents.find((a: { id: string }) => a.id === agentId)
    //
    //           if (agent) {
    //             res.setHeader('Content-Type', 'application/json')
    //             res.setHeader('Content-Disposition', `attachment; filename="${agent.name}.json"`)
    //             res.statusCode = 200
    //
    //             return res.end(JSON.stringify(agent, null, 2))
    //           } else {
    //             res.statusCode = 404
    //             return res.end(JSON.stringify({ error: '未找到对应的Agent' }))
    //           }
    //         } catch (error) {
    //           console.error('Error serving agent JSON:', error)
    //           res.statusCode = 500
    //           return res.end(JSON.stringify({ error: '服务器内部错误' }))
    //         }
    //       }
    //
    //       next()
    //     })
    //   }
    // }
  ],
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
