import * as rootParams from 'next/root-params';
import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { routing } from './routing';

export default getRequestConfig(async ({ locale }) => {
  const candidate = locale ?? (await rootParams.locale());

  // Validated unconditionally, not just on the fallback path: this value feeds
  // the dynamic import below, and an unrecognised locale should 404 rather than
  // surface as a module resolution error.
  if (!hasLocale(routing.locales, candidate)) {
    notFound();
  }

  return {
    locale: candidate,
    messages: (await import(`../messages/${candidate}.json`)).default,
  };
});