/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.(glb|gltf|hdr|hdri)$/,
      type: 'asset/resource',
    })
    return config
  },
}

module.exports = nextConfig