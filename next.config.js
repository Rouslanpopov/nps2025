/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // Utiliser le domaine personnalisé si CUSTOM_DOMAIN est défini
  basePath: process.env.CUSTOM_DOMAIN ? '' : (process.env.NODE_ENV === 'production' ? '/nps2025' : ''),
  assetPrefix: process.env.CUSTOM_DOMAIN ? '' : (process.env.NODE_ENV === 'production' ? '/nps2025/' : ''),
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(mp4|webm|ogg|swf|ogv)$/,
      use: {
        loader: 'file-loader',
        options: {
          publicPath: '/_next/static/videos/',
          outputPath: 'static/videos/',
        },
      },
    });
    return config;
  },
}

module.exports = nextConfig 