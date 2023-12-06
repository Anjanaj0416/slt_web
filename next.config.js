/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  env: { theme: "DEFAULT", currency: "USD" },
  publicRuntimeConfig: { theme: "DEFAULT", currency: "USD" },
};

module.exports = nextConfig;
