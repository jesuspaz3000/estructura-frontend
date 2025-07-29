import { useState, useEffect } from 'react';
import { useAuthToken, useUserData } from './useLocalStorage';

export interface User {
    id: string;
    email: string;
    name: string;
    avatar?: string;
    role?: string;
}

export interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
}

/**
 * Hook principal para manejar el estado de autenticación
 */
export function useAuth() {
    const [authToken, setAuthToken, removeAuthToken] = useAuthToken();
    const [userData, setUserData, removeUserData] = useUserData<User | null>();
    
    const [authState, setAuthState] = useState<AuthState>({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: true
    });
    
    // Inicializar estado desde localStorage
    useEffect(() => {
        const initializeAuth = () => {
            if (authToken && userData) {
                setAuthState({
                    user: userData,
                    token: authToken,
                    isAuthenticated: true,
                    isLoading: false
                });
            } else {
                setAuthState(prev => ({
                    ...prev,
                    isLoading: false
                }));
            }
        };
        
        initializeAuth();
    }, [authToken, userData]);
    
    // Función de login
    const login = async (email: string): Promise<void> => {
        setAuthState(prev => ({ ...prev, isLoading: true }));
        
        try {
            // Aquí iría la llamada real a la API
            // const response = await authService.login(email, password);
            
            // Simular respuesta de API
            const mockUser: User = {
                id: '1',
                email: email,
                name: 'Usuario Demo',
                avatar: undefined,
                role: 'user'
            };
            
            const mockToken = 'mock-jwt-token-' + Date.now();
            
            // Guardar en localStorage
            setAuthToken(mockToken);
            setUserData(mockUser);
            
            // Actualizar estado
            setAuthState({
                user: mockUser,
                token: mockToken,
                isAuthenticated: true,
                isLoading: false
            });
            
        } catch (error) {
            setAuthState(prev => ({
                ...prev,
                isLoading: false
            }));
            throw error;
        }
    };
    
    // Función de logout
    const logout = () => {
        // Limpiar localStorage
        removeAuthToken();
        removeUserData();
        
        // Limpiar estado
        setAuthState({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false
        });
    };
    
    // Función para actualizar datos del usuario
    const updateUser = (updatedUser: Partial<User>) => {
        if (authState.user) {
            const newUser = { ...authState.user, ...updatedUser };
            setUserData(newUser);
            setAuthState(prev => ({
                ...prev,
                user: newUser
            }));
        }
    };
    
    // Verificar si el token es válido
    const isTokenValid = (): boolean => {
        if (!authState.token) return false;
        
        try {
            // Aquí iría la lógica para verificar el token
            // Por ejemplo, decodificar JWT y verificar expiración
            return true;
        } catch {
            return false;
        }
    };
    
    // Refrescar token
    const refreshToken = async (): Promise<void> => {
        try {
            // Aquí iría la lógica para refrescar el token
            console.log('Refreshing token...');
        } catch (error) {
            console.error('Error refreshing token:', error);
            logout();
        }
    };
    
    return {
        // Estado
        ...authState,
        
        // Acciones
        login,
        logout,
        updateUser,
        refreshToken,
        
        // Utilidades
        isTokenValid
    };
}