'use client';

import { useTransition } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import LanguageIcon from '@mui/icons-material/Language';
import { useLocale, useTranslations } from 'next-intl';
import { useColorMode } from '@/providers/ThemeRegistry';
import MobileDrawer from '@/components/MobileDrawer';
import { usePathname, useRouter } from '@/i18n/navigation';
import { routing, localeLabels, type Locale } from '@/i18n/routing';

export default function TopHeader() {
  const { mode, toggleColorMode } = useColorMode();
  const t = useTranslations('header');
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const currentIndex = routing.locales.indexOf(locale);
  const nextLocale =
    routing.locales[(currentIndex + 1) % routing.locales.length];

  const switchLocale = () => {
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  };

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
        <IconButton
          size="small"
          color="primary"
          onClick={switchLocale}
          disabled={isPending}
          aria-label={t('switchLanguage')}
        >
          <LanguageIcon fontSize="small" />
          <Typography variant="caption" sx={{ ml: 0.5 }}>
            {localeLabels[locale]}
          </Typography>
        </IconButton>

        <IconButton size="small" onClick={toggleColorMode} color="primary" aria-label={t('toggleDarkMode')}>
          {mode === 'dark' ? <LightModeIcon fontSize="small" /> : <DarkModeIcon fontSize="small" />}
        </IconButton>
      </Box>

      <MobileDrawer />
    </Box>
  );
}
