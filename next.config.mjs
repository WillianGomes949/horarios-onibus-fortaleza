// next.config.mjs (note a extensão .mjs)
import withPWA from 'next-pwa';

const pwaConfig = withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/linhas/:path*",
        destination: "http://gistapis.etufor.ce.gov.br:8081/api/linhas/:path*",
      },
      {
        source: "/api/horarios/:path*",
        destination: "http://gistapis.etufor.ce.gov.br:8081/api/horarios/:path*",
      },
    ];
  },
};

export default pwaConfig(nextConfig);
