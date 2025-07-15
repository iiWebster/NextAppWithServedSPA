/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
//  swcMinify:true,
  async rewrites() {
    return [
      {
        source: '/audit',
        destination: '/audit/page.html'
      }
    ];
  },
};

module.exports = nextConfig;
