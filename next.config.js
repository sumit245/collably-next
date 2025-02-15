// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     async rewrites() {
//       return [
//         {
//           source: '/admin/:path*',
//           destination: 'http://localhost:3001/:path*',
//         },
//       ];
//     },
//   };
  
//   module.exports = nextConfig;
  
  /** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
  }
  
  module.exports = nextConfig

  module.exports = {
    images: {
      domains: ['picsum.photos'],
    },
  }