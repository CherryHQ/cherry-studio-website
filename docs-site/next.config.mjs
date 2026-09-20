/** @type {import('next').NextConfig} */
export default {
  output: 'export',
  agentRules: false,
  basePath: '/docs',
  trailingSlash: true,
  images: { unoptimized: true },
  experimental: { cpus: 4 }
}
