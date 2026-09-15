'use client';

import { Box } from '@mui/material';
import { useTranslations } from 'next-intl';
import { usePathname } from '@/i18n/navigation';
import TopHeader from '@/components/TopHeader';
import Banner from '@/components/Banner';
import HeaderNavigation from '@/components/HeaderNavigation';
import { navItems } from '@/config/navigation';

const MAIN_ID = 'main-content';

export default function PageShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const t = useTranslations('nav');
  const tHeader = useTranslations('header');

  const activeItem = navItems.find((item) => item.path === pathname);
  const title = activeItem ? t(activeItem.key) : t('fallback');

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Offscreen until focused, letting keyboard users bypass the fixed
          header, banner and nav in one step. */}
      <Box
        component="a"
        href={`#${MAIN_ID}`}
        sx={{
          position: 'absolute',
          left: -9999,
          top: 0,
          zIndex: 2000,
          px: 2,
          py: 1,
          bgcolor: 'background.paper',
          color: 'primary.main',
          textDecoration: 'none',
          '&:focus': {
            left: 8,
            top: 8,
          },
        }}
      >
        {tHeader('skipToContent')}
      </Box>

      <TopHeader />
      <Box sx={{ height: { xs: 33, md: 0 } }} />
      <Banner title={title} />
      <HeaderNavigation />
      <Box component="main" id={MAIN_ID}>
        {children}
      </Box>
    </Box>
  );
}
