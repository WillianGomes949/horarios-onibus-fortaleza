// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/linhas/:path*',
        destination: 'http://gistapis.etufor.ce.gov.br:8081/api/linhas/:path*',
      },
      {
        source: '/api/horarios/:path*',
        destination: 'http://gistapis.etufor.ce.gov.br:8081/api/horarios/:path*',
      },
    ];
  },
};

module.exports = nextConfig;