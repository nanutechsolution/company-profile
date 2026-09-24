import { locales, type Locale } from "@/locales";

export function generateStaticParams() { return locales.map((locale) => ({ locale })); }

export default async function LocaleLayout({ children, params }: Readonly<{ children: React.ReactNode; params: Promise<{ locale: string }> }>) {
  const { locale: raw } = await params;
  const locale = (locales.includes(raw as Locale) ? raw : "id") as Locale;
  return <div lang={locale} data-locale={locale}>{children}</div>;
}
