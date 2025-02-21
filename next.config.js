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
    domains: ["localhost", "127.0.0.1", "cdn.pixabay.com"], // Add "cdn.pixabay.com"
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000",
        pathname: "/uploads/images/**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "5000",
        pathname: "/uploads/images/**",
      },
      {
        protocol: "https",
        hostname: "cdn.pixabay.com",
        pathname: "/photo/**", // Allow Pixabay images
      },
    ],
  },
};

module.exports = nextConfig;
