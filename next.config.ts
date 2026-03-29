import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  
  reactCompiler: true,
  images: {
    domains: ["relax-map-api.onrender.com"],
  },
};

export default nextConfig;
