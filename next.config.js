/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  headers: [
    {
      source: "/blogs/:id",
      headers: [
        {
          key: "Cache-Control",
          value: "no-store",
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
