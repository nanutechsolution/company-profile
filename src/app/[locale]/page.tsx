import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { locales, getDictionary, type Locale } from "@/locales";
import { Site } from "@/components/Site";

export function generateStaticParams() { return locales.map((locale) => ({ locale })); }

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!locales.includes(raw as Locale)) return {};
  const d = getDictionary(raw as Locale);
  return { title: d.meta.title, description: d.meta.description, alternates: { canonical: `/${raw}`, languages: { id: "/id", en: "/en" } }, openGraph: { title: d.meta.title, description: d.meta.description, type: "website", url: `/${raw}`, siteName: "PT Nanu Tech Solution" }, twitter: { card: "summary" } };
}

export default async function LocalePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!locales.includes(raw as Locale)) notFound();
  return <Site locale={raw as Locale} dictionary={getDictionary(raw as Locale)} />;
}
