import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ['@mui/material', '@mui/icons-material'],
  },
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };
    return config;
  },
  rewrites: async () => {
    return [
      {
        source: '/docs',
        destination: '/docs/index.html',
      },
    ];
  },
};

nextConfig.serverExternalPackages = ['sequelize'];

export default nextConfig;
