'use client';

import { Tabs, Tab, Box } from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';
import { navItems } from '@/config/navigation';

export default function HeaderNavigation() {
  const pathname = usePathname();
  const router = useRouter();

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
        onChange={(_, newValue) => router.push(navItems[newValue].path)}
        textColor="primary"
        indicatorColor="primary"
        centered
      >
        {navItems.map((item) => (
          <Tab key={item.path} label={item.label} />
        ))}
      </Tabs>
    </Box>
  );
}
