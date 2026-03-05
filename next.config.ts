import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  reactCompiler: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
