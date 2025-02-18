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
  
//   /** @type {import('next').NextConfig} */
// const nextConfig = {
//     reactStrictMode: true,
//     swcMinify: true,
//   }
  
//   module.exports = nextConfig

//   module.exports = {
//     images: {
//       domains: ['picsum.photos'],
//     },
//   }

  /** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost"],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000",
        pathname: "/uploads/images/**",
      },
    ],
  },
};

module.exports = nextConfig;
