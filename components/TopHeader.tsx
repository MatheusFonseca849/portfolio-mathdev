'use client';

import { Box, IconButton, Typography } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import LanguageIcon from '@mui/icons-material/Language';
import { useColorMode } from '@/providers/ThemeRegistry';
import MobileDrawer from '@/components/MobileDrawer';

export default function TopHeader() {
  const { mode, toggleColorMode } = useColorMode();

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        px: { xs: 1.5, md: 3 },
        py: 0.5,
        bgcolor: 'background.paper',
        borderBottom: 1,
        borderColor: 'divider',
        position: { xs: 'fixed', md: 'static' },
        top: { xs: 0 },
        left: { xs: 0 },
        right: { xs: 0 },
        zIndex: { xs: 1200 },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <IconButton size="small" color="primary" aria-label="Switch language">
          <LanguageIcon fontSize="small" />
          <Typography variant="caption" sx={{ ml: 0.5 }}>
            EN
          </Typography>
        </IconButton>

        <IconButton size="small" onClick={toggleColorMode} color="primary" aria-label="Toggle dark mode">
          {mode === 'dark' ? <LightModeIcon fontSize="small" /> : <DarkModeIcon fontSize="small" />}
        </IconButton>
      </Box>

      <MobileDrawer />
    </Box>
  );
}
