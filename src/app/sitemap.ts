import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap { const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://nanutechsolution.com"; return [{ url: `${base}/id`, lastModified: new Date() }, { url: `${base}/en`, lastModified: new Date() }]; }
