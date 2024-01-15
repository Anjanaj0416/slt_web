/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  env: { theme: "DEFAULT", currency: "LKR" },
  publicRuntimeConfig: { theme: "DEFAULT", currency: "LKR" },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s3-us-west-2-slt-marketplace-dev.s3.us-west-2.amazonaws.com",
      },
      {
        protocol: "http",
        hostname: process.env.NEXT_PUBLIC_DOMAIN,
        port: "3000",
      },
      {
        protocol: "https",
        hostname: process.env.NEXT_PUBLIC_DOMAIN,
      },
    ],
  },
};

module.exports = nextConfig;
