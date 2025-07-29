/**
 * Constantes de autenticación
 */

// Mensajes de error
export const ERROR_MESSAGES = {
    EMAIL_REQUIRED: 'El email es requerido',
    EMAIL_INVALID: 'Por favor ingresa un email válido',
    PASSWORD_REQUIRED: 'La contraseña es requerida',
    PASSWORD_MIN_LENGTH: 'La contraseña debe tener al menos 6 caracteres',
    INVALID_CREDENTIALS: 'Email o contraseña incorrectos',
    USER_NOT_FOUND: 'No existe una cuenta con este email',
    SERVER_ERROR: 'Error del servidor. Intenta nuevamente.',
    LOGIN_SUCCESS: '¡Login exitoso! Redirigiendo...'
} as const;

// Rutas de navegación
export const AUTH_ROUTES = {
    LOGIN: '/login',
    REGISTER: '/register',
    FORGOT_PASSWORD: '/forgot-password',
    DASHBOARD: '/dashboard'
} as const;

// Configuración de validación
export const VALIDATION_CONFIG = {
    PASSWORD_MIN_LENGTH: 6,
    EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
} as const;

// Configuración de UI
export const UI_CONFIG = {
    REDIRECT_DELAY: 1000, // ms
    BUTTON_LOADING_TEXT: 'Iniciando sesión...',
    BUTTON_DEFAULT_TEXT: 'Iniciar Sesión'
} as const;

// Providers de autenticación social
export const SOCIAL_PROVIDERS = {
    GOOGLE: 'google',
    GITHUB: 'github'
} as const;

export type SocialProvider = typeof SOCIAL_PROVIDERS[keyof typeof SOCIAL_PROVIDERS];