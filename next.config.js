const fs = require('fs');
const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  basePath: (() => {
    const cnamePath = path.join(__dirname, 'public', 'CNAME');
    const hasCustomDomain = fs.existsSync(cnamePath);
    
    if (hasCustomDomain || process.env.CUSTOM_DOMAIN) {
      return ''; 
    }
    
    return process.env.NODE_ENV === 'production' ? '/nps2025' : '';
  })(),
  
  assetPrefix: (() => {
    const cnamePath = path.join(__dirname, 'public', 'CNAME');
    const hasCustomDomain = fs.existsSync(cnamePath);
    
    if (hasCustomDomain || process.env.CUSTOM_DOMAIN) {
      return '';
    }
    
    return process.env.NODE_ENV === 'production' ? '/nps2025/' : '';
  })(),
  
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