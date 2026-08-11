import { Box, Typography, Container } from '@mui/material';
import Image from 'next/image';
import profilePhoto from '@/assets/Matheus-Fonseca.jpeg';

export default function HomePage() {
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
      <Image src={profilePhoto} alt="Profile" fill style={{ objectFit: 'cover', borderRadius: '50%' }} />
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Typography variant="body1" color="text.primary">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </Typography>

        <Typography variant="body1" color="text.primary">
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
          nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
          deserunt mollit anim id est laborum. reprehenderit in voluptate velit esse cillum dolore eu fugiat
          nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
          deserunt mollit anim id est laborum.
        </Typography>

        <Typography variant="body1" color="text.primary">
          Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et
          commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris.
          Integer in mauris eu nibh euismod gravida.
        </Typography>
      </Box>
    </Container>
  );
}
