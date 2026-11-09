'use client';
 
import { Link as MuiLink, type LinkProps } from '@mui/material';
import { Link as IntlLink } from '@/i18n/navigation';
import type { ComponentProps } from 'react';
 
type Props = Omit<LinkProps, 'href' | 'component'> & {
  href: ComponentProps<typeof IntlLink>['href'];
};
 
export default function LocalizedLink({ href, ...props }: Props) {
  return <MuiLink component={IntlLink} href={href} {...props} />;
}