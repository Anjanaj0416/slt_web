/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  env: { theme: "DEFAULT", currency: "LKR" },
  publicRuntimeConfig: { theme: "DEFAULT", currency: "LKR" },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: process.env.NEXT_PUBLIC_S3_BUCKET_URL.replace(
          /^https?:\/\//,
          ""
        ),
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
