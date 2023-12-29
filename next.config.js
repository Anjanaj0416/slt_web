/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  env: { theme: "DEFAULT", currency: "USD" },
  publicRuntimeConfig: { theme: "DEFAULT", currency: "USD" },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s3-us-west-2-slt-marketplace-dev.s3.us-west-2.amazonaws.com",
      },
    ],
  },
};

module.exports = nextConfig;
