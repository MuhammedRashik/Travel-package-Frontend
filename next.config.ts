import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow the dev server to be accessible from your local network (Turbopack only)
  devServer: {
    host: "0.0.0.0",
  },
};

export default nextConfig;
