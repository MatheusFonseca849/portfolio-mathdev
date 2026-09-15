import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { localizedPath, pagePaths, siteUrl } from '@/lib/metadata';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return Object.values(pagePaths).map((path) => ({
    url: `${siteUrl}${localizedPath(routing.defaultLocale, path)}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: path === '/' ? 1 : 0.8,
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((locale) => [
          locale,
          `${siteUrl}${localizedPath(locale, path)}`,
        ]),
      ),
    },
  }));
}
