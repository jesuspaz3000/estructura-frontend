"use client";

import { useState, useCallback } from 'react';
import { usePathname } from 'next/navigation';

interface DashboardState {
  loading: boolean;
  currentPage: string;
}

export function useDashboard() {
  const pathname = usePathname();
  
  const [state, setState] = useState<DashboardState>({
    loading: false,
    currentPage: pathname.split('/').pop() || 'dashboard',
  });

  const setLoading = useCallback((loading: boolean) => {
    setState(prev => ({
      ...prev,
      loading,
    }));
  }, []);

  // El sidebar ahora se maneja automáticamente por Toolpad
  // La navegación se maneja por Next.js router integrado

  return {
    ...state,
    pathname,
    setLoading,
  };
}

export default useDashboard;