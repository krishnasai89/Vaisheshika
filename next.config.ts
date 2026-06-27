import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
