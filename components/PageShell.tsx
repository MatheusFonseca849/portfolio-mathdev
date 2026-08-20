'use client';

import { Box } from '@mui/material';
import { useTranslations } from 'next-intl';
import { usePathname } from '@/i18n/navigation';
import TopHeader from '@/components/TopHeader';
import Banner from '@/components/Banner';
import HeaderNavigation from '@/components/HeaderNavigation';
import { navItems } from '@/config/navigation';

export default function PageShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const t = useTranslations('nav');

  const activeItem = navItems.find((item) => item.path === pathname);
  const title = activeItem ? t(activeItem.key) : t('fallback');

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <TopHeader />
      <Box sx={{ height: { xs: 33, md: 0 } }} />
      <Banner title={title} />
      <HeaderNavigation />
      {children}
    </Box>
  );
}
