'use client';

import { Box } from '@mui/material';
import { usePathname } from 'next/navigation';
import TopHeader from '@/components/TopHeader';
import Banner from '@/components/Banner';
import HeaderNavigation from '@/components/HeaderNavigation';

const routeTitles: Record<string, string> = {
  '/': 'Landing Page',
  '/projects': 'Projects',
  '/cv': 'CV',
  '/contact': 'Contact Me',
};

export default function PageShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const title = routeTitles[pathname] || 'Portfolio';

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
