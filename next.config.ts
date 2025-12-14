import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Игнорировать папки с React Native кодом
  webpack: (config, { isServer }) => {
    config.watchOptions = {
      ...config.watchOptions,
      ignored: ['**/TestApp/**', '**/temp_project/**'],
    };
    return config;
  },
};

export default nextConfig;
