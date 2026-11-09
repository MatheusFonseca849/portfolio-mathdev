'use client';

import { createContext, useContext, useState} from 'react';
import type { BannerTitleKey } from '@/config/navigation';

interface BannerTitleContextValue {
    override: BannerTitleKey | null;
    setOverride: (key: BannerTitleKey | null) => void;
}

const BannerTitleContext = createContext<BannerTitleContextValue | null>(null);

export function BannerTitleProvider ({ children }: { children: React.ReactNode}){
    const [ override, setOverride ] = useState<BannerTitleKey | null>(null);
    
    return (
        <BannerTitleContext.Provider value={{ override, setOverride }}>
            {children}
        </BannerTitleContext.Provider>
    );
}

export function useBannerTitle() {
    const context = useContext(BannerTitleContext);
    if (!context) throw new Error('useBannerTitle must be used within BannerTitleProvider');
    return context;
}