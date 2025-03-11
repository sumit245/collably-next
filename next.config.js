

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
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
