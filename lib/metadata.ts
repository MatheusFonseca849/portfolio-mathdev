import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { routing, type Locale } from '@/i18n/routing';

export const SITE_NAME = 'Matheus Fonseca';

/**
 * Absolute origin of the deployment, used as `metadataBase` so that relative
 * URLs elsewhere in the metadata tree resolve correctly. Falls back to
 * localhost so local builds don't emit malformed absolute URLs.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
).replace(/\/+$/, '');

export type PageKey = 'home' | 'projects' | 'resume' | 'contact';

export const pagePaths: Record<PageKey, string> = {
  home: '/',
  projects: '/projects',
  resume: '/resume',
  contact: '/contact',
};

/** OpenGraph expects a full locale tag */
const ogLocales: Record<Locale, string> = {
  en: 'en_US',
  pt: 'pt_BR',
};

/**
 * Builds public URL for a path in a given locale. Mirrors
 * `localePrefix: 'as-needed'` routing strategy: the default locale is
 * unprefixed, every other locale carries its code.
 */
export function localizedPath(locale: string, path: string): string {
  const suffix = path === '/' ? '' : path;
  return locale === routing.defaultLocale ? suffix || '/' : `/${locale}${suffix}`;
}

/**
 * Per-page metadata including canonical and hreflang alternates. Search
 * engines treat locale variants as translations rather than duplicates.
 */
export async function buildPageMetadata(
  locale: Locale,
  page: PageKey,
): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: `metadata.${page}` });
  const path = pagePaths[page];

  const title = t('title');
  const description = t('description');
  const canonical = localizedPath(locale, path);

  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, localizedPath(l, path)]),
  );

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        ...languages,
        'x-default': localizedPath(routing.defaultLocale, path),
      },
    },
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      title,
      description,
      url: canonical,
      locale: ogLocales[locale],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}
