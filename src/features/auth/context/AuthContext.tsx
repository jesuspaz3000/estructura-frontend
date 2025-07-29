'use client';

import { createContext, useContext, useEffect, useState } from 'react';

interface User {
    id: string;
    email: string;
    name: string;
    role: string;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [mounted, setMounted] = useState(false);

    // Evitar problemas de hidratación
    useEffect(() => {
        setMounted(true);
    }, []);

    // Simular verificación de usuario al cargar
    useEffect(() => {
        if (!mounted) return;
        
        const checkUser = () => {
            try {
                const savedUser = localStorage.getItem('auth_user');
                const token = localStorage.getItem('auth_token');

                if (savedUser && token) {
                    setUser(JSON.parse(savedUser));
                }
            } catch (error) {
                console.error('Error checking auth:', error);
            } finally {
                setLoading(false);
            }
        };

        checkUser();
    }, [mounted]);

    const login = async (email: string, password: string) => {
        // Simular delay de API
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Mock validation
        if (email === 'admin@example.com' && password === '123456') {
            const mockUser: User = {
                id: '1',
                email,
                name: 'Admin User',
                role: 'admin',
            };

            const mockToken = `mock_token_${Date.now()}`;

            // Guardar en localStorage
            localStorage.setItem('auth_user', JSON.stringify(mockUser));
            localStorage.setItem('auth_token', mockToken);

            setUser(mockUser);
        } else {
            throw new Error('Credenciales inválidas');
        }
    };

    const logout = async () => {
        localStorage.removeItem('auth_user');
        localStorage.removeItem('auth_token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            login,
            logout,
            isAuthenticated: !!user
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}