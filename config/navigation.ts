export interface NavItem {
  /** Key into the `nav` namespace of the message catalogs. */
  key: 'about' | 'projects' | 'resume' | 'contact';
  path: '/' | '/projects' | '/resume' | '/contact';
}

export const navItems: NavItem[] = [
  { key: 'about', path: '/' },
  { key: 'projects', path: '/projects' },
  { key: 'resume', path: '/resume' },
  { key: 'contact', path: '/contact' },
];
