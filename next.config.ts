import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    nextConfigStripTypes: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "vaisheshikaapi.vercel.app",
        port: "",
        pathname: "/api/**",
      },
    ],
  },
};

export default nextConfig;
