'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';

interface RegisterFormData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    acceptTerms: boolean;
}

interface RegisterFormErrors {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    acceptTerms?: string;
    general?: string;
}

export function useRegisterForm() {
    const router = useRouter();
    
    const [formData, setFormData] = useState<RegisterFormData>({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        acceptTerms: false,
    });

    const [errors, setErrors] = useState<RegisterFormErrors>({});
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Validaciones
    const validateForm = useCallback((): boolean => {
        const newErrors: RegisterFormErrors = {};

        // Validar nombre
        if (!formData.firstName.trim()) {
            newErrors.firstName = 'El nombre es requerido';
        } else if (formData.firstName.trim().length < 2) {
            newErrors.firstName = 'El nombre debe tener al menos 2 caracteres';
        }

        // Validar apellido
        if (!formData.lastName.trim()) {
            newErrors.lastName = 'El apellido es requerido';
        } else if (formData.lastName.trim().length < 2) {
            newErrors.lastName = 'El apellido debe tener al menos 2 caracteres';
        }

        // Validar email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email) {
            newErrors.email = 'El email es requerido';
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Ingresa un email válido';
        }

        // Validar contraseña
        if (!formData.password) {
            newErrors.password = 'La contraseña es requerida';
        } else if (formData.password.length < 8) {
            newErrors.password = 'La contraseña debe tener al menos 8 caracteres';
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
            newErrors.password = 'La contraseña debe contener al menos una mayúscula, una minúscula y un número';
        }

        // Validar confirmación de contraseña
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Confirma tu contraseña';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Las contraseñas no coinciden';
        }

        // Validar términos y condiciones
        if (!formData.acceptTerms) {
            newErrors.acceptTerms = 'Debes aceptar los términos y condiciones';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }, [formData]);

    // Manejar cambios en los campos
    const handleInputChange = useCallback((field: keyof RegisterFormData) => {
        return (event: React.ChangeEvent<HTMLInputElement>) => {
            const value = field === 'acceptTerms' ? event.target.checked : event.target.value;
            
            setFormData(prev => ({
                ...prev,
                [field]: value
            }));

            // Limpiar error del campo cuando el usuario empiece a escribir
            if (errors[field]) {
                setErrors(prev => ({
                    ...prev,
                    [field]: undefined
                }));
            }
        };
    }, [errors]);

    // Manejar envío del formulario
    const handleSubmit = useCallback(async (event: React.FormEvent) => {
        event.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        setLoading(true);
        setErrors({});

        try {
            // Simular llamada a API
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Simular registro exitoso
            console.log('Registro exitoso:', {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email
            });
            
            // Redirigir al dashboard o página de confirmación
            router.push('/dashboard');
            
        } catch (error) {
            console.error('Error en registro:', error);
            setErrors({
                general: 'Error al crear la cuenta. Por favor, inténtalo de nuevo.'
            });
        } finally {
            setLoading(false);
        }
    }, [formData, validateForm, router]);

    // Manejar registro con redes sociales
    const handleSocialRegister = useCallback(async (provider: 'google' | 'github') => {
        setLoading(true);
        try {
            // Simular registro con redes sociales
            console.log(`Registrándose con ${provider}...`);
            await new Promise(resolve => setTimeout(resolve, 1500));
            router.push('/dashboard');
        } catch (error) {
            console.error(`Error en registro con ${provider}:`, error);
            setErrors({
                general: `Error al registrarse con ${provider}. Inténtalo de nuevo.`
            });
        } finally {
            setLoading(false);
        }
    }, [router]);

    // Toggle para mostrar/ocultar contraseña
    const toggleShowPassword = useCallback(() => {
        setShowPassword(prev => !prev);
    }, []);

    const toggleShowConfirmPassword = useCallback(() => {
        setShowConfirmPassword(prev => !prev);
    }, []);

    // Texto del botón
    const buttonText = loading ? 'Creando cuenta...' : 'Crear cuenta';

    return {
        // Estado
        formData,
        errors,
        loading,
        showPassword,
        showConfirmPassword,
        buttonText,
        
        // Acciones
        handleInputChange,
        handleSubmit,
        handleSocialRegister,
        toggleShowPassword,
        toggleShowConfirmPassword,
    };
}
