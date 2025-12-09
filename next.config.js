/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
      {
        protocol: 'https',
        hostname: 'img.freepik.com',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
      },
    ],
  },
  output: "standalone",
  reactStrictMode: true,
  turbopack: {
    root: __dirname,
    rules: {
      '*.wasm': {
        loaders: ['file'],
      },
    },
  },
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
