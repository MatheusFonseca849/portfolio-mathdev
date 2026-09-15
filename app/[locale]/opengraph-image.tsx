import { ImageResponse } from 'next/og';
import { getTranslations } from 'next-intl/server';
import { routing, type Locale } from '@/i18n/routing';
import { SITE_NAME } from '@/lib/metadata';

export const alt = `${SITE_NAME} — Portfolio`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

/**
 * Rendered by Satori, which supports a deliberately small CSS subset: every
 * container holding more than one child needs an explicit `display: flex`.
 */
export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '80px',
          backgroundImage:
            'linear-gradient(to right top, #005800, #00582e, #005749, #00535a, #004e5e)',
        }}
      >
        <div
          style={{
            display: 'flex',
            fontSize: 82,
            fontWeight: 700,
            color: '#FFFFFF',
            lineHeight: 1.1,
          }}
        >
          {SITE_NAME}
        </div>

        <div
          style={{
            display: 'flex',
            marginTop: 24,
            fontSize: 44,
            color: '#C8FCEA',
          }}
        >
          {t('tagline')}
        </div>

        <div
          style={{
            display: 'flex',
            marginTop: 48,
            fontSize: 28,
            color: '#9BE9A3',
          }}
        >
          React · Next.js · Node.js · Python
        </div>
      </div>
    ),
    size,
  );
}
