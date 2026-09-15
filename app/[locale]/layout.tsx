import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations } from "next-intl/server";
import ThemeRegistry from "@/providers/ThemeRegistry";
import PageShell from "@/components/PageShell";
import { routing } from "@/i18n/routing";
import { SITE_NAME, siteUrl } from "@/lib/metadata";
import "../globals.css";

/**
 * Self-hosted and preloaded by Next, which removes the extra connections to
 * fonts.googleapis.com/fonts.gstatic.com and applies `size-adjust` to the
 * fallback so swapping the real font in doesn't shift layout.
 */
const notoSans = Noto_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-noto-sans",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("metadata");

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: t("defaultTitle"),
      template: `%s | ${SITE_NAME}`,
    },
    description: t("home.description"),
    applicationName: SITE_NAME,
    authors: [{ name: SITE_NAME }],
    creator: SITE_NAME,
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale} className={notoSans.variable}>
      <body suppressHydrationWarning>
        <NextIntlClientProvider>
          <ThemeRegistry>
            <PageShell>
              {children}
            </PageShell>
          </ThemeRegistry>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
