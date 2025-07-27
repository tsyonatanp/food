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
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
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
  // Modern JavaScript optimizations
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
  // Modern JavaScript compilation
  compiler: {
    // Remove console logs in production
    removeConsole: process.env.NODE_ENV === 'production',
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
          // Separate form libraries
          forms: {
            test: /[\\/]node_modules[\\/](react-hook-form|@hookform)[\\/]/,
            name: 'forms',
            chunks: 'all',
            priority: 12,
          },
          // Separate UI libraries
          ui: {
            test: /[\\/]node_modules[\\/](@headlessui)[\\/]/,
            name: 'ui',
            chunks: 'all',
            priority: 11,
          },
          // Separate heavy libraries
          heavy: {
            test: /[\\/]node_modules[\\/](axios|googleapis|telegraf|stripe)[\\/]/,
            name: 'heavy',
            chunks: 'all',
            priority: 8,
          },
        },
      };
      
      // Enable tree shaking
      config.optimization.usedExports = true;
      config.optimization.sideEffects = false;
      
      // Source maps configuration
      config.devtool = 'source-map';
      
      // Remove console logs in production using Next.js built-in
      if (!dev) {
        config.optimization.minimize = true;
      }
      
      // Add module concatenation for better tree shaking
      config.optimization.concatenateModules = true;
      
      // Set side effects to false for better tree shaking
      config.module.rules.push({
        test: /\.js$/,
        sideEffects: false,
      });
    }
    return config;
  },
  // Modern JavaScript target
  swcMinify: true,
  // Optimize CSS
  optimizeFonts: true,
  // Source maps for debugging
  productionBrowserSourceMaps: true,
}

module.exports = withBundleAnalyzer(nextConfig); 