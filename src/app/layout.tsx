import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://nanutechsolution.com"),
  title: { default: "PT Nanu Tech Solution", template: "%s | PT Nanu Tech Solution" },
  description: "Software, infrastructure, and digital systems built around how organizations actually work.",
  openGraph: {
    title: "PT Nanu Tech Solution",
    description: "Software, infrastructure, and digital systems built around how organizations actually work.",
    type: "website",
    siteName: "PT Nanu Tech Solution",
    images: [{ url: "/images/logo-pt.png", width: 677, height: 369, alt: "PT Nanu Tech Solution" }],
  },
  twitter: { card: "summary_large_image", images: ["/images/logo-pt.png"] },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html><body>{children}</body></html>;
}
