'use client';

import { IconButton, Tooltip, Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import { 
    LightMode, 
    DarkMode, 
    SettingsBrightness,
    Check 
} from '@mui/icons-material';
import { useState } from 'react';
import { useTheme, ThemeMode } from '@/shared/context/ThemeContext';
import dynamic from 'next/dynamic';

// Componente interno que maneja toda la lógica del tema
function ThemeToggleInternal() {
    const { mode, actualTheme, setMode } = useTheme();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleModeSelect = (selectedMode: ThemeMode) => {
        setMode(selectedMode);
        handleClose();
    };

    const getIcon = () => {
        switch (actualTheme) {
            case 'dark':
                return <DarkMode />;
            case 'light':
                return <LightMode />;
            default:
                return <SettingsBrightness />;
        }
    };

    const getTooltipText = () => {
        switch (mode) {
            case 'light':
                return 'Tema claro';
            case 'dark':
                return 'Tema oscuro';
            case 'system':
                return `Sistema (${actualTheme === 'dark' ? 'oscuro' : 'claro'})`;
            default:
                return 'Cambiar tema';
        }
    };

    const themeOptions = [
        {
            mode: 'light' as ThemeMode,
            label: 'Claro',
            icon: <LightMode fontSize="small" />
        },
        {
            mode: 'dark' as ThemeMode,
            label: 'Oscuro',
            icon: <DarkMode fontSize="small" />
        },
        {
            mode: 'system' as ThemeMode,
            label: 'Sistema',
            icon: <SettingsBrightness fontSize="small" />
        }
    ];

    return (
        <>
            <Tooltip title={getTooltipText()}>
                <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{
                        transition: 'all 0.2s ease-in-out',
                        '&:hover': {
                            transform: 'scale(1.1)',
                        },
                    }}
                    aria-controls={open ? 'theme-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                >
                    {getIcon()}
                </IconButton>
            </Tooltip>
            
            <Menu
                id="theme-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                slotProps={{
                    paper: {
                        sx: {
                            minWidth: 160,
                            mt: 1.7,
                        },
                    },
                }}
            >
                {themeOptions.map((option) => (
                    <MenuItem
                        key={option.mode}
                        onClick={() => handleModeSelect(option.mode)}
                        selected={mode === option.mode}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                        }}
                    >
                        <ListItemIcon sx={{ minWidth: 'auto' }}>
                            {option.icon}
                        </ListItemIcon>
                        <ListItemText primary={option.label} />
                        {mode === option.mode && (
                            <Check fontSize="small" color="primary" />
                        )}
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
}

// Versión simple del toggle interno
function SimpleThemeToggleInternal() {
    const { actualTheme, toggleTheme } = useTheme();

    return (
        <Tooltip title={`Cambiar a tema ${actualTheme === 'dark' ? 'claro' : 'oscuro'}`}>
            <IconButton
                onClick={toggleTheme}
                size="small"
                sx={{
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                        transform: 'scale(1.1)',
                    },
                }}
            >
                {actualTheme === 'dark' ? <LightMode /> : <DarkMode />}
            </IconButton>
        </Tooltip>
    );
}

// Componente placeholder para SSR
function ThemeTogglePlaceholder() {
    return (
        <IconButton
            size="small"
            sx={{
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                    transform: 'scale(1.1)',
                },
            }}
            aria-label="Cambiar tema"
        >
            <SettingsBrightness />
        </IconButton>
    );
}

// Crear versiones dinámicas de los componentes
const DynamicThemeToggle = dynamic(
    () => Promise.resolve(ThemeToggleInternal),
    {
        ssr: false,
        loading: () => <ThemeTogglePlaceholder />
    }
);

const DynamicSimpleThemeToggle = dynamic(
    () => Promise.resolve(SimpleThemeToggleInternal),
    {
        ssr: false,
        loading: () => <ThemeTogglePlaceholder />
    }
);

// Exportar los componentes wrapper
export function ThemeToggle() {
    return <DynamicThemeToggle />;
}

export function SimpleThemeToggle() {
    return <DynamicSimpleThemeToggle />;
}