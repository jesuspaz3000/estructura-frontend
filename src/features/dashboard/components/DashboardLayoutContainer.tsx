"use client";

import { ReactNode, useState, MouseEvent, useMemo } from 'react';
import { Box, IconButton, Avatar, Menu, MenuItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { useColorScheme } from '@mui/material/styles';
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

// Tema personalizado con transiciones suaves
const appTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { light: true, dark: true },
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
    // Personalizar el comportamiento del sidebar de Toolpad
    MuiDrawer: {
      styleOverrides: {
        root: {
          '& .MuiDrawer-paper': {
            transition: 'all 0.225s cubic-bezier(0.0, 0, 0.2, 1) 0ms !important',
          },
        },
        paper: {
          transition: 'all 0.225s cubic-bezier(0.0, 0, 0.2, 1) 0ms !important',
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
  },
});

// Componente de cambio de tema
function ThemeSwitcher() {
  const { mode, setMode } = useColorScheme();

  const toggleMode = () => {
    setMode(mode === 'light' ? 'dark' : 'light');
  };

  return (
    <IconButton onClick={toggleMode} color="inherit" size="large">
      {mode === 'light' ? <DarkMode /> : <LightMode />}
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

export function DashboardLayoutContainer({ children }: DashboardLayoutProps) {
  const router = useToolpadRouter();

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

export default DashboardLayoutContainer;