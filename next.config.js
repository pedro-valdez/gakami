/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['uploads.mangadex.org'],
  },
}

module.exports = nextConfig
