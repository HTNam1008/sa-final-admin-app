/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@mui/x-date-pickers'],
  async rewrites() {
    return [
      {
        source: '/api/:path*',  // Matches any path starting with /api/
        destination: 'http://localhost:8082/api/:path*',  // Forwards it to localhost:8082
      },
    ];
  },
};

module.exports = nextConfig;
