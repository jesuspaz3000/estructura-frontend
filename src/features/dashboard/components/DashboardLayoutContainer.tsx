"use client";

import { ReactNode, useMemo, useState, MouseEvent } from 'react';
import { useTheme as useCustomTheme } from '@/shared/context/ThemeContext';
import { Box, Typography, IconButton, Avatar, Menu, MenuItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import { getTheme } from '@/theme/mui-theme';
import {
  Dashboard,
  People,
  Settings,
  Analytics,
  Inventory,
  Home,
  Person,
  // Notifications,
  AccountCircle,
  Logout
} from '@mui/icons-material';
import { AppProvider, type Navigation } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { useRouter, usePathname } from 'next/navigation';
import { ThemeToggle } from '@/shared/components/ThemeToggle';
import { createTheme } from '@mui/material/styles';
import Image from 'next/image';

const NAVIGATION: Navigation = [
  {
    kind: 'header',
    title: 'Principal',
  },
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <Dashboard />,
  },
  {
    segment: 'users',
    title: 'Usuarios',
    icon: <People />,
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Gestión',
  },
  {
    segment: 'analytics',
    title: 'Analytics',
    icon: <Analytics />,
  },
  {
    segment: 'inventory',
    title: 'Inventario',
    icon: <Inventory />,
    children: [
      {
        segment: 'products',
        title: 'Productos',
        icon: <Home />,
      },
      {
        segment: 'categories',
        title: 'Categorías',
        icon: <Person />,
      },
    ],
  },
  {
    segment: 'settings',
    title: 'Configuración',
    icon: <Settings />,
  },
];

// Hook personalizado para crear el tema integrado con Toolpad
const createAppTheme = (baseTheme: ReturnType<typeof getTheme>) => {
  return createTheme({
    ...baseTheme,
    cssVariables: {
      colorSchemeSelector: 'data-toolpad-color-scheme',
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1536,
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            // Personalizar estilos para el botón
          },
        },
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            display: 'none !important',
          },
        },
      },
    },
  })
}

function DemoPageContent({ pathname }: { pathname: string }) {
  return (
    <Box
      sx={{
        py: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <Typography>Dashboard content for {pathname}</Typography>
    </Box>
  );
}

// Componente de cambio de tema mejorado
function ThemeSwitcher() {
  return <ThemeToggle />;
}

// Componente de menú de usuario
function UserMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    console.log('Logout clicked');
    // TODO: Implementar lógica de logout test nuevo otro
  };

  const handleSettings = () => {
    handleClose();
    console.log('Settings clicked');
    // TODO: Navegar a configuración
  };

  return (
    <>
      <IconButton
        onClick={handleClick}
        size="small"
        sx={{
          ml: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          gap: 2,
          borderRadius: 1,
          paddingX: 2,
        }}
      >
        <Typography variant="body2">user name</Typography>
        <Avatar sx={{ width: 32, height: 32 }}>
          <Image src="/image/perfil.jpeg" alt="Perfil" width={32} height={32} />
        </Avatar>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        id="user-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        slotProps={{
          paper: {
            sx: {
              minWidth: 200,
              mt: 1.5,
            },
          },
        }}
      >
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <AccountCircle fontSize="small" />
          </ListItemIcon>
          <ListItemText>Mi Perfil</ListItemText>
        </MenuItem>

        <MenuItem onClick={handleSettings}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          <ListItemText>Configuración</ListItemText>
        </MenuItem>

        <Divider />

        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          <ListItemText>Cerrar Sesión</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
}

// Router personalizado para Next.js
function useToolpadRouter() {
  const router = useRouter();
  const pathname = usePathname();

  return useMemo(() => ({
    pathname,
    searchParams: new URLSearchParams(),
    navigate: (url: string | URL) => {
      const path = typeof url === 'string' ? url : url.pathname;
      router.push(path);
    },
  }), [pathname, router]);
}

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayoutContainer({ children }: DashboardLayoutProps) {
  const router = useToolpadRouter();
  const { actualTheme } = useCustomTheme();
  const baseTheme = getTheme(actualTheme);
  const toolpadTheme = createAppTheme(baseTheme);

  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={toolpadTheme}
      branding={{
        title: 'Mi App',
        logo: <Image src="/image/logo-dragon.png" alt="Logo" width={40} height={40} className='bg-white rounded-full p-1 mr-2' />,
      }}
    >
      <DashboardLayout
        sx={{
          padding: 2,
          '& .MuiDrawer-paper': {
            '& .MuiList-root': {
              '& .MuiListItemButton-root': {
                marginBottom: '8px',
                '&.Mui-selected': {
                  backgroundColor: toolpadTheme.palette.mode === 'dark'
                    ? 'rgba(255, 255, 255, 0.08) !important'
                    : 'rgba(0, 0, 0, 0.08) !important',
                  color: `${toolpadTheme.palette.primary.main} !important`,
                  '& .MuiListItemIcon-root': {
                    color: `${toolpadTheme.palette.primary.main} !important`,
                    '& .MuiSvgIcon-root': {
                      color: `${toolpadTheme.palette.primary.main} !important`,
                    },
                  },
                  '& .MuiListItemText-root .MuiTypography-root': {
                    color: `${toolpadTheme.palette.primary.main} !important`,
                  },
                  '&:hover': {
                    backgroundColor: toolpadTheme.palette.mode === 'dark'
                      ? 'rgba(255, 255, 255, 0.12) !important'
                      : 'rgba(0, 0, 0, 0.12) !important',
                    color: `${toolpadTheme.palette.primary.main} !important`,
                  },
                },
              },
            }
          }
        }}
        slots={{
          toolbarActions: () => (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>

              {/* Notificaciones */}
              {/* <IconButton color="inherit" size="large">
                <Notifications />
              </IconButton> */}

              {/* Menú de usuario */}
              <UserMenu />

              {/* Cambio de tema */}
              <ThemeSwitcher />

            </Box>
          ),
        }}
      >
        {children || <DemoPageContent pathname={router.pathname} />}
      </DashboardLayout>
    </AppProvider>
  );
}

export default DashboardLayoutContainer;