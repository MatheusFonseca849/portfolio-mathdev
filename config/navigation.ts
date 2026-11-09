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

export const hiddenRouteTitles: Record<string, 'fortyTwo'> = {
  '/42': 'fortyTwo',  
};

export type BannerTitleKey = NavItem['key'] | 'fortyTwo' | 'notFound';
