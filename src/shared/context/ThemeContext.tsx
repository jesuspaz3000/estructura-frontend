'use client';

import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react';

export type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeContextType {
    mode: ThemeMode;
    actualTheme: 'light' | 'dark';
    setMode: (mode: ThemeMode) => void;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
    children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
    // Inicializar con valores por defecto que coincidan entre servidor y cliente
    const [mode, setModeState] = useState<ThemeMode>('light');
    const [actualTheme, setActualTheme] = useState<'light' | 'dark'>('light');
    const [isHydrated, setIsHydrated] = useState(false);

    // Detectar tema del sistema de forma segura
    const getSystemTheme = useCallback((): 'light' | 'dark' => {
        if (typeof window === 'undefined') return 'light';
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }, []);

    // Calcular tema actual basado en el modo
    const calculateActualTheme = useCallback((currentMode: ThemeMode): 'light' | 'dark' => {
        if (currentMode === 'system') {
            return getSystemTheme();
        }
        return currentMode;
    }, [getSystemTheme]);

    // Inicializar tema después de la hidratación
    useEffect(() => {
        // Solo ejecutar después de la hidratación
        const savedMode = (localStorage.getItem('theme-mode') as ThemeMode) || 'light';
        setModeState(savedMode);
        setActualTheme(calculateActualTheme(savedMode));
        setIsHydrated(true);
        
        // Aplicar tema al documento
        const root = document.documentElement;
        root.classList.remove('light', 'dark');
        root.classList.add(calculateActualTheme(savedMode));
        root.setAttribute('data-theme', calculateActualTheme(savedMode));
        
        // Limpiar estilos críticos temporales
        const criticalStyle = document.getElementById('theme-critical-dark');
        if (criticalStyle) {
            criticalStyle.remove();
        }
    }, [calculateActualTheme]);

    // Escuchar cambios en el tema del sistema
    useEffect(() => {
        if (!isHydrated) return;
        
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        
        const handleChange = () => {
            if (mode === 'system') {
                setActualTheme(getSystemTheme());
            }
        };

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, [mode, isHydrated, getSystemTheme]);

    // Aplicar tema al documento después de cambios
    useEffect(() => {
        if (!isHydrated) return;
        
        const root = document.documentElement;
        
        // Remover clases anteriores
        root.classList.remove('light', 'dark');
        
        // Agregar clase actual
        root.classList.add(actualTheme);
        
        // Actualizar atributo data-theme para Tailwind
        root.setAttribute('data-theme', actualTheme);
        
        // Actualizar meta theme-color para navegadores móviles
        const metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (metaThemeColor) {
            metaThemeColor.setAttribute('content', actualTheme === 'dark' ? '#1f2937' : '#ffffff');
        }
    }, [actualTheme, isHydrated]);

    const setMode = (newMode: ThemeMode) => {
        setModeState(newMode);
        setActualTheme(calculateActualTheme(newMode));
        if (typeof window !== 'undefined') {
            localStorage.setItem('theme-mode', newMode);
        }
    };

    const toggleTheme = () => {
        if (mode === 'system') {
            // Si está en system, cambiar al opuesto del tema actual del sistema
            const systemTheme = getSystemTheme();
            setMode(systemTheme === 'dark' ? 'light' : 'dark');
        } else {
            // Si está en light/dark, alternar
            setMode(mode === 'light' ? 'dark' : 'light');
        }
    };

    return (
        <ThemeContext.Provider
            value={{
                mode,
                actualTheme,
                setMode,
                toggleTheme,
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}