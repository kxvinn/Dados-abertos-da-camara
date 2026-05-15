import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.camara.leg.br",
        port: "",
        pathname: "/internet/deputado/bandep/**",
      },
    ],
  },
};

export default nextConfig;
