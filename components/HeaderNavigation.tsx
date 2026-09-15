'use client';

import { Tabs, Tab, Box } from '@mui/material';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { navItems } from '@/config/navigation';

export default function HeaderNavigation() {
  const pathname = usePathname();
  const t = useTranslations('nav');

  const currentTab = navItems.findIndex((item) => item.path === pathname);
  const value = currentTab === -1 ? 0 : currentTab;

  return (
    <Box
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 1100,
        bgcolor: 'background.paper',
        borderBottom: 1,
        borderColor: 'divider',
        display: { xs: 'none', md: 'flex' },
        justifyContent: 'center',
      }}
    >
      <Tabs
        value={value}
        textColor="primary"
        indicatorColor="primary"
        centered
        component="nav"
        aria-label={t('fallback')}
      >
        {navItems.map((item) => (
          <Tab
            key={item.path}
            label={t(item.key)}
            component={Link}
            href={item.path}
          />
        ))}
      </Tabs>
    </Box>
  );
}
