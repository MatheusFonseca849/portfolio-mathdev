'use client';

import { Box } from '@mui/material';
import { usePathname } from 'next/navigation';
import TopHeader from '@/components/TopHeader';
import Banner from '@/components/Banner';
import HeaderNavigation from '@/components/HeaderNavigation';
import { navItems } from '@/config/navigation';

export default function PageShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const title = navItems.find((item) => item.path === pathname)?.label || 'Portfolio';

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
