import { useState } from 'react';

/**
 * Hook para manejar localStorage de forma segura con SSR
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
    // Estado para almacenar nuestro valor
    const [storedValue, setStoredValue] = useState<T>(() => {
        if (typeof window === 'undefined') {
            return initialValue;
        }
        
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error(`Error reading localStorage key "${key}":`, error);
            return initialValue;
        }
    });
    
    // Función para establecer el valor
    const setValue = (value: T | ((val: T) => T)) => {
        try {
            // Permitir que el valor sea una función para tener la misma API que useState
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            
            // Guardar en el estado
            setStoredValue(valueToStore);
            
            // Guardar en localStorage
            if (typeof window !== 'undefined') {
                window.localStorage.setItem(key, JSON.stringify(valueToStore));
            }
        } catch (error) {
            console.error(`Error setting localStorage key "${key}":`, error);
        }
    };
    
    // Función para remover el valor
    const removeValue = () => {
        try {
            setStoredValue(initialValue);
            if (typeof window !== 'undefined') {
                window.localStorage.removeItem(key);
            }
        } catch (error) {
            console.error(`Error removing localStorage key "${key}":`, error);
        }
    };
    
    return [storedValue, setValue, removeValue] as const;
}

/**
 * Hook específico para manejar el token de autenticación
 */
export function useAuthToken() {
    return useLocalStorage<string | null>('auth_token', null);
}

/**
 * Hook específico para manejar datos del usuario
 */
export function useUserData<T = Record<string, unknown>>() {
    return useLocalStorage<T | null>('user_data', null);
}

/**
 * Hook específico para manejar preferencias de "recordarme"
 */
export function useRememberMe() {
    return useLocalStorage<boolean>('remember_me', false);
}