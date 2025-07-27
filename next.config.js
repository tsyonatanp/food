const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'drive.google.com',
    ],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
  // SEO optimizations
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
        ],
      },
    ]
  },
  // Performance optimizations
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['react-icons', 'react-hook-form', '@headlessui/react'],
    // Add more aggressive optimizations
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
  // Bundle analyzer
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      // More aggressive code splitting
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
            priority: 10,
          },
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            priority: 5,
            reuseExistingChunk: true,
          },
          // Separate React and React DOM
          react: {
            test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
            name: 'react',
            chunks: 'all',
            priority: 20,
          },
          // Separate icons
          icons: {
            test: /[\\/]node_modules[\\/]react-icons[\\/]/,
            name: 'icons',
            chunks: 'all',
            priority: 15,
          },
        },
      };
      
      // Enable tree shaking
      config.optimization.usedExports = true;
      config.optimization.sideEffects = false;
      
      // Minification
      config.optimization.minimize = true;
    }
    return config;
  },
  // Reduce bundle size
  swcMinify: true,
  // Optimize CSS
  optimizeFonts: true,
}

module.exports = withBundleAnalyzer(nextConfig); 