/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["ythbjwovxnnbckdxlbds.supabase.co"],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig
