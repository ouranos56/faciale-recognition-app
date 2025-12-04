import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      type: "asset/resource", // fait que l'import devient une URL
    });
    return config;
  },
  images: {
    dangerouslyAllowSVG: true, // autorise les SVG
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    
    remotePatterns: [
      // Permettre le chargement des images depuis localhost:8000
        {
          protocol: 'http',
          hostname: 'localhost',
          port: '8000',
          pathname: '/media/**',
        },
      ],
  },
  

  // webpack(config) {
  //   // Configuration pour les SVG
  //   config.module.rules.push({
  //     test: /\.svg$/,
  //     use: ['@svgr/webpack']
  //   });

  //   return config;
  // }
};

  

export default nextConfig;
