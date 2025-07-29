'use client';

import { ReactNode, useState, useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { getTheme } from '@/theme/mui-theme';
import { useTheme } from '@/shared/context/ThemeContext';

interface MUIProviderProps {
  children: ReactNode;
}

function MUIThemeProvider({ children }: MUIProviderProps) {
  const { actualTheme } = useTheme();
  const [isHydrated, setIsHydrated] = useState(false);
  
  // Marcar como hidratado después del primer render del cliente
  useEffect(() => {
    setIsHydrated(true);
  }, []);
  
  // Durante la hidratación inicial, usar siempre el tema claro para evitar flash
  const theme = getTheme(isHydrated ? actualTheme : 'light');

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

export function MUIProvider({ children }: MUIProviderProps) {
  return (
    <AppRouterCacheProvider options={{ key: 'mui' }}>
      <MUIThemeProvider>
        {children}
      </MUIThemeProvider>
    </AppRouterCacheProvider>
  );
}