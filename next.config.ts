import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://relax-map-api.onrender.com/api/:path*",
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ftp.goit.study",
      },
<<<<<<< HEAD

=======
>>>>>>> 3b01dd20c338803679cec7c0177fc8ecc096bf2e
      {
        protocol: "https",
        hostname: "relax-map-api.onrender.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;
