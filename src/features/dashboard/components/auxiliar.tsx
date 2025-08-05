"use client";

import { ReactNode, useState, MouseEvent, useMemo } from 'react';
import { Box, IconButton, Avatar, Menu, MenuItem, ListItemIcon, ListItemText, Divider, CssBaseline } from '@mui/material';
import { createTheme } from '@mui/material/styles';

import { useTheme as useCustomTheme } from '@/shared/context/ThemeContext';
import { getTheme } from '@/theme/mui-theme';
import {
  Dashboard,
  People,
  Settings,
  Analytics,
  Inventory,
  Home,
  Person,
  AdminPanelSettings,
  AccountCircle,
  Logout,
  LightMode,
  DarkMode,
  Notifications,
  Search
} from '@mui/icons-material';
import { AppProvider, type Navigation } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { useRouter, usePathname } from 'next/navigation';

// Configuración de navegación
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
    segment: 'analytics',
    title: 'Analytics',
    icon: <Analytics />,
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Gestión',
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
    children: [
      {
        segment: 'general',
        title: 'General',
        icon: <Settings />,
      },
      {
        segment: 'admin',
        title: 'Administración',
        icon: <AdminPanelSettings />,
      },
    ],
  },
];

// Función para crear el tema personalizado con configuraciones de Toolpad
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
      ...baseTheme.components,
      // Personalizar el comportamiento del sidebar de Toolpad
      MuiDrawer: {
        styleOverrides: {
          root: {
            '& .MuiDrawer-paper': {
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important',
            },
          },
          paper: {
            // estilos
          },
        },
      },
      // Personalizar el header/AppBar de Toolpad
      MuiAppBar: {
        styleOverrides: {
          root: {
            // Estilos para el AppBar
          },
        },
      },
      // CLAVE: Configuración más específica para Collapse para eliminar saltos
      MuiCollapse: {
        styleOverrides: {
          root: {
            // Forzar transición simple sin easings complejos
            '&.MuiCollapse-vertical': {
              transition: 'height 0.3s ease-in-out !important',
              overflow: 'hidden !important',
            },
            '&.MuiCollapse-horizontal': {
              //
            },
          },
          wrapper: {
            transition: 'height 0.3s ease-in-out !important',
            overflow: 'hidden !important',
          },
          wrapperInner: {
            // NO transición en el contenido interno para evitar conflictos
            transition: 'none !important',
          },
        },
      },
      // Transiciones para botones de navegación
      MuiListItemButton: {
        styleOverrides: {
          root: {
            margin: '0 !important',
            '& .MuiListItemIcon-root': {
              transition: 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important',
            },
            '& .MuiListItemText-root': {
              transition: 'opacity 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important',
              margin: '0 !important', // Eliminar márgenes que pueden causar saltos
            },
            // Estados específicos para elementos seleccionados
            '&.Mui-selected': {
              backgroundColor: baseTheme.palette.mode === 'dark' 
                ? 'rgba(255, 255, 255, 0.08)'
                : 'rgba(0, 0, 0, 0.08)',
              color: baseTheme.palette.primary.main,
              '& .MuiListItemIcon-root': {
                color: `${baseTheme.palette.primary.main} !important`,
                '& .MuiSvgIcon-root': {
                  color: `${baseTheme.palette.primary.main} !important`,
                },
              },
              '& .MuiListItemText-root': {
                color: `${baseTheme.palette.primary.main} !important`,
                '& .MuiTypography-root': {
                  color: `${baseTheme.palette.primary.main} !important`,
                },
              },
              '&:hover': {
                backgroundColor: baseTheme.palette.mode === 'dark' 
                  ? 'rgba(255, 255, 255, 0.12)'
                  : 'rgba(0, 0, 0, 0.12)',
              },
            },
          },
        },
      },
      // Transiciones específicas para listas anidadas
      MuiList: {
        styleOverrides: {
          root: {
            // Solo aplicar a listas anidadas en la navegación
            '.MuiCollapse-root &': {
              transition: 'opacity 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important',
              paddingTop: '0 !important',
              paddingBottom: '0 !important',
              margin: '0 !important',
              // Prevenir saltos en el contenido
              '& .MuiListItemButton-root': {
                paddingTop: '8px !important',
                paddingBottom: '8px !important',
                margin: '0 !important',
              },
            },
          },
        },
      },
      // Ocultar tooltips globalmente
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            display: 'none !important',
          },
        },
      },
      // Transiciones específicas para iconos de expansión en la navegación
      MuiSvgIcon: {
        styleOverrides: {
          root: {
            // Solo aplicar a iconos dentro de elementos de navegación expandibles
            '.MuiListItemButton-root &': {
              transition: 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important',
            },
            // Iconos específicos de expansión (flechas)
            '&[data-testid="ExpandMoreIcon"], &[data-testid="ChevronRightIcon"]': {
              transition: 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important',
            },
          },
        },
      },
      // Personalización específica para elementos de navegación con hijos
      MuiListItem: {
        styleOverrides: {
          root: {
            // Elementos padre con hijos
            '&.Mui-expanded': {
              '& .MuiCollapse-root': {
                transition: 'height 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important',
              },
            },
          },
        },
      },
    },
  });
};

// Componente de cambio de tema
function ThemeSwitcher() {
  const { actualTheme, toggleTheme } = useCustomTheme();

  return (
    <IconButton onClick={toggleTheme} color="inherit" size="large">
      {actualTheme === 'light' ? <DarkMode /> : <LightMode />}
    </IconButton>
  );
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
    // TODO: Implementar lógica de logout
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
        sx={{ ml: 1 }}
        aria-controls={open ? 'user-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
      >
        <Avatar sx={{ width: 32, height: 32 }}>
          <AccountCircle />
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
        sx={{
          '& .MuiPaper-root': {
            minWidth: 200,
            mt: 1.5,
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

export function Dashboardauxiliar({ children }: DashboardLayoutProps) {
  const router = useToolpadRouter();
  const { actualTheme } = useCustomTheme();

  // Obtener el tema personalizado basado en el tema actual
  const baseTheme = getTheme(actualTheme);
  const appTheme = createAppTheme(baseTheme);

  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={appTheme}
      branding={{
        title: 'Mi App',
        // logo: <img src="/logo.png" alt="Logo" style={{ height: 32 }} />, // Opcional
      }}
    >
      {/* Activar CssBaseline para aplicar los estilos globales */}
      <CssBaseline />
      <DashboardLayout
        slots={{
          toolbarActions: () => (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {/* Botón de búsqueda */}
              <IconButton color="inherit" size="large">
                <Search />
              </IconButton>

              {/* Notificaciones */}
              <IconButton color="inherit" size="large">
                <Notifications />
              </IconButton>

              {/* Cambio de tema */}
              <ThemeSwitcher />

              {/* Menú de usuario */}
              <UserMenu />
            </Box>
          ),
        }}
        sx={{
          '& .MuiDrawer-paper': {
            '& .MuiList-root': {
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
              '& .MuiListSubheader-root': {
                // Estilos para los headers (Principal, Gestión)
                backgroundColor: 'transparent',
              },
              '& .MuiListItemButton-root': {
                // Estilos para los elementos de navegación
                borderRadius: '8px',
                marginBottom: '4px',
                padding: '12px 16px',
                transition: 'all 0.2s ease-in-out',
                '&.Mui-selected': {
                  backgroundColor: appTheme.palette.mode === 'dark' 
                    ? 'rgba(255, 255, 255, 0.08) !important'
                    : 'rgba(0, 0, 0, 0.08) !important',
                  color: `${appTheme.palette.primary.main} !important`,
                  '& .MuiListItemIcon-root': {
                    color: `${appTheme.palette.primary.main} !important`,
                    '& .MuiSvgIcon-root': {
                      color: `${appTheme.palette.primary.main} !important`,
                    },
                  },
                  '& .MuiListItemText-root .MuiTypography-root': {
                    color: `${appTheme.palette.primary.main} !important`,
                  },
                  '&:hover': {
                    backgroundColor: appTheme.palette.mode === 'dark' 
                      ? 'rgba(255, 255, 255, 0.12) !important'
                      : 'rgba(0, 0, 0, 0.12) !important',
                    color: `${appTheme.palette.primary.main} !important`,
                  },
                },
              },
            }
          }
        }}
      >
        <Box
          sx={{
            width: '100%',
            p: 3,
            bgcolor: 'background.default',
          }}
        >
          {children}
        </Box>
      </DashboardLayout>
    </AppProvider>
  );
}

export default Dashboardauxiliar;