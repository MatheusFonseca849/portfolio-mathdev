'use client';

import { Box, Typography } from '@mui/material';
import { useColorMode } from '@/providers/ThemeRegistry';

interface BannerProps {
  title: string;
}

const gradients = {
  light: 'linear-gradient(to right top, #c8fcea, #b3f7d6, #a4f1be, #9be9a3, #98e184)',
  dark: 'linear-gradient(to right top, #005800, #00582e, #005749, #00535a, #004e5e)',
};

export default function Banner({ title }: BannerProps) {
  const { mode } = useColorMode();

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: { xs: 128, md: 384 },
        backgroundImage: gradients[mode],
        px: 2,
      }}
    >
      <Typography
        variant="h2"
        component="h1"
        sx={{
          fontWeight: 700,
          textAlign: 'center',
          color: '#FFFFFF',
          fontSize: { xs: '1.75rem', md: '3.75rem' },
        }}
      >
        {title}
      </Typography>
    </Box>
  );
}
