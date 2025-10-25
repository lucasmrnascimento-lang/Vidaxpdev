/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Static export para Cloudflare Pages
  output: 'export',
  trailingSlash: true,
  // Configuração para Cloudflare
  assetPrefix: undefined,
}

module.exports = nextConfig
