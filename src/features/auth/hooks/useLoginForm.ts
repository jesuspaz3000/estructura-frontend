import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { validateLoginForm } from '../utils/validation';
import { formatEmail } from '../utils/formatters';
import { AUTH_ROUTES, UI_CONFIG, ERROR_MESSAGES } from '../utils/auth-constants';

export interface LoginFormData {
    email: string;
    password: string;
    rememberMe: boolean;
}

export interface FormErrors {
    email?: string;
    password?: string;
    general?: string;
}

export function useLoginForm() {
    const router = useRouter();
    
    // Estado del formulario
    const [formData, setFormData] = useState<LoginFormData>({
        email: '',
        password: '',
        rememberMe: false,
    });
    
    const [errors, setErrors] = useState<FormErrors>({});
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    
    // Manejar cambios en inputs
    const handleInputChange = (field: keyof LoginFormData) => (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const value = field === 'rememberMe' ? event.target.checked : event.target.value;
        
        setFormData(prev => ({
            ...prev,
            [field]: field === 'email' ? formatEmail(value as string) : value,
        }));
        
        // Limpiar error del campo al empezar a escribir
        if (errors[field as keyof FormErrors]) {
            setErrors(prev => ({
                ...prev,
                [field]: undefined,
            }));
        }
    };
    
    // Validar formulario
    const validateForm = (): boolean => {
        const validation = validateLoginForm(formData.email, formData.password);
        setErrors(validation.errors);
        return validation.isValid;
    };
    
    // Manejar submit del formulario
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        // Validar formulario
        if (!validateForm()) {
            return;
        }
        
        setLoading(true);
        setErrors({});
        
        try {
            // Aquí iría la lógica de login real
            // await login(formData.email, formData.password);
            
            console.log('Login attempt:', {
                email: formData.email,
                rememberMe: formData.rememberMe
            });
            
            // Simular delay de API
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Redirigir al dashboard
            setTimeout(() => {
                router.push(AUTH_ROUTES.DASHBOARD);
            }, UI_CONFIG.REDIRECT_DELAY);
            
        } catch (error: unknown) {
            console.error('Login error:', error);
            
            // Manejar diferentes tipos de errores
            const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
            
            if (errorMessage.includes('Credenciales inválidas')) {
                setErrors({ general: ERROR_MESSAGES.INVALID_CREDENTIALS });
            } else if (errorMessage.includes('Usuario no encontrado')) {
                setErrors({ email: ERROR_MESSAGES.USER_NOT_FOUND });
            } else {
                setErrors({ general: ERROR_MESSAGES.SERVER_ERROR });
            }
        } finally {
            setLoading(false);
        }
    };
    
    // Manejar login social
    const handleSocialLogin = (provider: 'google' | 'github') => {
        console.log(`Login with ${provider}`);
        // Aquí iría la lógica de OAuth
    };
    
    // Toggle mostrar contraseña
    const toggleShowPassword = () => {
        setShowPassword(prev => !prev);
    };
    
    // Reset formulario
    const resetForm = () => {
        setFormData({
            email: '',
            password: '',
            rememberMe: false,
        });
        setErrors({});
        setLoading(false);
        setShowPassword(false);
    };
    
    return {
        // Estado
        formData,
        errors,
        loading,
        showPassword,
        
        // Acciones
        handleInputChange,
        handleSubmit,
        handleSocialLogin,
        toggleShowPassword,
        resetForm,
        
        // Utilidades
        isFormValid: Object.keys(errors).length === 0 && formData.email && formData.password,
        buttonText: loading ? UI_CONFIG.BUTTON_LOADING_TEXT : UI_CONFIG.BUTTON_DEFAULT_TEXT
    };
}