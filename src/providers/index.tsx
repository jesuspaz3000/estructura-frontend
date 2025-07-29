'use client';

import { ReactNode } from 'react';
import { ThemeProvider } from '@/shared/context/ThemeContext';
import { MUIProvider } from './MUIProvider';
import { NotificationProvider } from '@/shared/context/NotificationContext';
import { AuthProvider } from '@/features/auth/context/AuthContext';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider>
      <MUIProvider>
        <AuthProvider>
          <NotificationProvider>
            {children}
          </NotificationProvider>
        </AuthProvider>
      </MUIProvider>
    </ThemeProvider>
  );
}

// Export individual providers for flexibility
export { MUIProvider } from './MUIProvider';