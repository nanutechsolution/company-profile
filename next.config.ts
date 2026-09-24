import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Static export for Hostinger shared hosting: upload the `out/` folder to public_html.
  output: "export",
  trailingSlash: true,
  // No Node image optimizer on shared hosting — serve images as static files.
  images: { unoptimized: true },
  // Hostinger shared hosting has strict process/thread limits.
  // Use in-process worker threads so `next build` does not spawn child processes
  // (shared hosting rejects extra forks with EAGAIN).
  experimental: {
    cpus: 1,
    workerThreads: true,
  },
};

export default nextConfig;
