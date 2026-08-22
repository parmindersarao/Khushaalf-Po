/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Optimize for production
  compress: true,
  productionBrowserSourceMaps: false,
};

module.exports = nextConfig;
