
import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/metadata';
import type { Locale } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';
import { Box, Container, Typography } from '@mui/material';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata(locale, 'fortyTwo');
}

export default async function FortyTwoPage() {
  const t = await getTranslations('fortyTwo');

  return (
    <Container
      maxWidth="md"
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh', py: { xs: 3, md: 6 } }}
    >
      <Typography variant="h1" sx={{ fontSize: { xs: '4rem', md: '6rem' } }}>{t('header')}</Typography>
      <Typography variant="body1" sx={{ textAlign: 'center' }}>{t('subheader')}</Typography>
      <Box
        sx={{
          my: { xs: 4, md: 6 },
          width: '100%',
          maxWidth: 720,
          aspectRatio: '16 / 9',
          '& iframe': { width: '100%', height: '100%', border: 0 },
        }}
      >
        <iframe
          src="https://www.youtube.com/embed/aboZctrHfK8?si=UQQcEJSqPonPqE_k"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="body1">{t('description1')}</Typography>
        <Typography variant="body1">{t('description2')}</Typography>
        <Typography variant="body1">{t('description3')}</Typography>
      </Box>
    </Container>
  );
}
