/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  generateEtags: false,
  headers: [
    {
      source: "/:path*",
      headers: [
        {
          key: "Cache-Control",
          value: "no-cache, no-store, max-age=0, must-revalidate",
        },
      ],
    },
  ],
  swcMinify: true,
  images: {
    domains: ["ythbjwovxnnbckdxlbds.supabase.co"],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
