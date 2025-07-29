'use client';

import { ReactNode, useState, useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { getTheme } from '@/theme/mui-theme';
import { useTheme } from '@/shared/context/ThemeContext';
import LoadingScreen from '@/shared/components/LoadingScreen';

interface MUIProviderProps {
  children: ReactNode;
}

function MUIThemeProvider({ children }: MUIProviderProps) {
  const { actualTheme, isHydrated } = useTheme();
  const [showContent, setShowContent] = useState(false);
  
  const theme = getTheme(actualTheme);

  useEffect(() => {
    // Solo mostrar contenido cuando el tema esté completamente hidratado
    if (isHydrated) {
      // Pequeño delay para asegurar que el tema se aplique correctamente
      const timer = setTimeout(() => {
        setShowContent(true);
      }, 80);
      return () => clearTimeout(timer);
    }
  }, [isHydrated]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {!showContent && (
        <LoadingScreen onThemeReady={() => setShowContent(true)} />
      )}
      {showContent && children}
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