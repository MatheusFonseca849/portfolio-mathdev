'use client';

import { Tabs, Tab, Box } from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';

const tabs = [
  { label: 'Landing Page', path: '/' },
  { label: 'Projects', path: '/projects' },
  { label: 'CV', path: '/cv' },
  { label: 'Contact Me', path: '/contact' },
];

export default function HeaderNavigation() {
  const pathname = usePathname();
  const router = useRouter();

  const currentTab = tabs.findIndex((tab) => tab.path === pathname);
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
        onChange={(_, newValue) => router.push(tabs[newValue].path)}
        textColor="primary"
        indicatorColor="primary"
        centered
      >
        {tabs.map((tab) => (
          <Tab key={tab.path} label={tab.label} />
        ))}
      </Tabs>
    </Box>
  );
}
