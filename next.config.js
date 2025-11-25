/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'github.com',
      'pub-c1de1cb456e74d6bbbee111ba9e6c757.r2.dev',
      'githubusercontent.com'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'github.com',
        pathname: '/sudo-self/sudo-self/assets/**',
      },
      {
        protocol: 'https',
        hostname: 'pub-c1de1cb456e74d6bbbee111ba9e6c757.r2.dev',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.githubusercontent.com',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig
