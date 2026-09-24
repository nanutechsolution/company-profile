import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Static export for Hostinger shared hosting: upload the `out/` folder to public_html.
  output: "export",
  trailingSlash: true,
  // No Node image optimizer on shared hosting — serve images as static files.
  images: { unoptimized: true },
};

export default nextConfig;
