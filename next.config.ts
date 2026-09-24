import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Static export for Hostinger shared hosting: upload the `out/` folder to public_html.
  output: "export",
  trailingSlash: true,
  // No Node image optimizer on shared hosting — serve images as static files.
  images: { unoptimized: true },
  // Hostinger shared hosting has strict process/thread limits.
  experimental: {
    cpus: 1,
    workerThreads: false,
  },
};

export default nextConfig;
