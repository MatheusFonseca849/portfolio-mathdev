import { Box, Typography, Container } from '@mui/material';
import Image from 'next/image';
import profilePhoto from '@/assets/Matheus-Fonseca.jpeg';
import { getTranslations } from 'next-intl/server';

export default async function HomePage() {

  const t = await getTranslations('home');

  return (
    <Container
      maxWidth="lg"
      sx={{
        py: { xs: 3, md: 6 },
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: { xs: 'center', md: 'flex-start' },
        gap: { xs: 4, md: 9 },
      }}
    >
      <Box
        sx={{
          position: 'relative',
          flexShrink: 0,
          width: { xs: 180, md: 450 },
          height: { xs: 180, md: 450 },
          borderRadius: '50%',
          overflow: 'hidden',
          order: { xs: -1, md: 1 },
        }}
      >
      <Image src={profilePhoto} alt="Profile" priority fill sizes="(max-width: 900px) 180px, 450px" style={{ objectFit: 'cover', objectPosition: 'center top', borderRadius: '50%' }} />
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Typography variant="h4" color="text.primary">
          {t('name')}
        </Typography>
        <Typography variant="body1" color="text.primary">
          {t('bio1')}
        </Typography>

        <Typography variant="body1" color="text.primary">
          {t('bio2')}
        </Typography>

        <Typography variant="body1" color="text.primary">
          {t('bio3')}
        </Typography>
      </Box>
    </Container>
  );
}
