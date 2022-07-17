/** @type {import('next').NextConfig} */
import domains from './lib/domains'


const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains,
  },
}

module.exports = nextConfig
