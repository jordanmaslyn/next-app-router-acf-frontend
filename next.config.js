const { withFaust, getWpHostname } = require('@faustwp/core')

/** @type {import('next').NextConfig} */
const nextConfig = withFaust({
  experimental: {
    serverActions: true,
  },
  images: {
    domains: [getWpHostname()],
  },
  reactStrictMode: true,
})

module.exports = nextConfig
