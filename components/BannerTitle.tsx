'use client';
 
import { useLayoutEffect } from 'react';
import { useBannerTitle } from '@/providers/BannerTitleProvider';
import type { BannerTitleKey } from '@/config/navigation';
 
export default function BannerTitle({ titleKey }: { titleKey: BannerTitleKey }) {
  const { setOverride } = useBannerTitle();
 
  useLayoutEffect(() => {
    setOverride(titleKey);
    return () => setOverride(null);
  }, [titleKey, setOverride]);
 
  return null;
}