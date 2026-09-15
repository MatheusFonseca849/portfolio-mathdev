'use client';

import { useState } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  IconButton,
  Box,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { navItems } from '@/config/navigation';

export default function MobileDrawer() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const t = useTranslations('nav');
  const tHeader = useTranslations('header');

  return (
    <>
      <IconButton
        color="primary"
        aria-label={tHeader('openMenu')}
        onClick={() => setOpen(true)}
        sx={{ display: { xs: 'inline-flex', md: 'none' } }}
      >
        <MenuIcon />
      </IconButton>

      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
      >
        <Box component="nav" sx={{ width: 250 }} aria-label={t('fallback')}>
          <List>
            {navItems.map((item) => (
              <ListItem key={item.path} disablePadding>
                <ListItemButton
                  component={Link}
                  href={item.path}
                  selected={pathname === item.path}
                  onClick={() => setOpen(false)}
                >
                  <ListItemText primary={t(item.key)} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}
