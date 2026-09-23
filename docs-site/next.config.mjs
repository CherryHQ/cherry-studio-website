/** @type {import('next').NextConfig} */
export default {
  output: 'export',
  agentRules: false,
  basePath: '/docs',
  // The Vite dev proxy also serves documentation from the loopback IP.
  allowedDevOrigins: ['127.0.0.1'],
  trailingSlash: true,
  images: { unoptimized: true },
  experimental: { cpus: 4 }
}
