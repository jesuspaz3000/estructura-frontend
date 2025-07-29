/**
 * Funciones de validación puras para autenticación
 */

export interface ValidationResult {
    isValid: boolean;
    message?: string;
}

/**
 * Valida si un email tiene formato válido
 */
export function validateEmail(email: string): ValidationResult {
    if (!email.trim()) {
        return {
            isValid: false,
            message: 'El email es requerido'
        };
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return {
            isValid: false,
            message: 'Por favor ingresa un email válido'
        };
    }
    
    return { isValid: true };
}

/**
 * Valida si una contraseña cumple los requisitos mínimos
 */
export function validatePassword(password: string): ValidationResult {
    if (!password) {
        return {
            isValid: false,
            message: 'La contraseña es requerida'
        };
    }
    
    if (password.length < 6) {
        return {
            isValid: false,
            message: 'La contraseña debe tener al menos 6 caracteres'
        };
    }
    
    return { isValid: true };
}

/**
 * Valida un formulario de login completo
 */
export function validateLoginForm(email: string, password: string) {
    const errors: Record<string, string> = {};
    
    const emailValidation = validateEmail(email);
    if (!emailValidation.isValid) {
        errors.email = emailValidation.message!;
    }
    
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
        errors.password = passwordValidation.message!;
    }
    
    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
}