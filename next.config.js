/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "images.pexels.com",
      "img.freepik.com",
      "avatars.githubusercontent.com",
      "lh3.googleusercontent.com",
      "raw.githubusercontent.com",
    ],
  },
  output: "standalone",
  reactStrictMode: true,
  webpack: (config) => {
    config.experiments = {
      asyncWebAssembly: true,
      topLevelAwait: true,
      layers: true,
    };
    return config;
  },
  env: {
    BLOCKFROST_KEY: process.env.BLOCKFROST_KEY_MAINNET,
    API_URL: process.env.API_URL_MAINNET,
    NETWORK: "mainnet",
  },
};

module.exports = nextConfig;
