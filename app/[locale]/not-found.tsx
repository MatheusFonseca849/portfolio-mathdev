import { Metadata } from 'next';
import BannerTitle from '@/components/BannerTitle'
import { Box, Container, Typography } from '@mui/material'
import { buildPageMetadata } from '@/lib/metadata';
import type { Locale } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';
import LocalizedLink from '@/components/LocalizedLink';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata(locale, 'notFound');
}

export default async function NotFound() {
  
  const t = await getTranslations('notFound');

  return (
    <Container 
    maxWidth="lg"
      sx={{
        py: { xs: 3, md: 6 },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: { xs: 4, md: 9 },
      }}>
      <BannerTitle titleKey="notFound" />
      <Box sx={{ display: 'flex', flexDirection: 'column', textAlign: 'center', gap: 2 }}>
      <Typography variant="h3" sx={{ mb: 8 }}>{t('subheader')}</Typography>
      <Typography variant="body1">{t('description1')}</Typography>
      <Typography variant="body1">{t('description2')}</Typography>
      <Typography variant="body1">{t('description3')} <LocalizedLink href="/contact">{t('linkText')}</LocalizedLink></Typography>
      </Box>
    </Container>
  )
}