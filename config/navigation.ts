export interface NavItem {
  label: string;
  path: string;
}

export const navItems: NavItem[] = [
  { label: 'About Me', path: '/' },
  { label: 'Projects', path: '/projects' },
  { label: 'My Resume', path: '/resume' },
  { label: 'Contact Me', path: '/contact' },
];
