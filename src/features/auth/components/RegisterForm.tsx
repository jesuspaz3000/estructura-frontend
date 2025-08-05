'use client';

import {
    TextField,
    Button,
    Alert,
    InputAdornment,
    IconButton,
    FormControlLabel,
    Checkbox,
    Divider,
    Typography,
    Box,
    Stack,
    Link
} from '@mui/material';
import { 
    Visibility, 
    VisibilityOff, 
    Email, 
    Lock, 
    Person,
    PersonOutline 
} from '@mui/icons-material';
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';
import NextLink from 'next/link';
import { useRegisterForm } from '../hooks/useRegisterForm';
import { AUTH_ROUTES } from '../utils/auth-constants';

export function RegisterForm() {
    const {
        // Estado
        formData,
        errors,
        loading,
        showPassword,
        showConfirmPassword,
        
        // Acciones
        handleInputChange,
        handleSubmit,
        handleSocialRegister,
        toggleShowPassword,
        toggleShowConfirmPassword,
    } = useRegisterForm();

    return (
        <Box sx={{ width: '100%', maxWidth: 400, mx: 'auto' }}>
            <Box component="form" onSubmit={handleSubmit} autoComplete="off" noValidate sx={{ width: '100%' }}>
                <Stack spacing={3}>
                    {/* Campos ocultos para confundir al navegador */}
                    <input type="text" style={{ display: 'none' }} />
                    <input type="password" style={{ display: 'none' }} />

                    {/* Error general */}
                    {errors.general && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {errors.general}
                        </Alert>
                    )}

                    {/* Fila de Nombre y Apellido */}
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                        {/* Campo Nombre */}
                        <TextField
                            fullWidth
                            label="Nombre"
                            name="firstName-register-field"
                            value={formData.firstName}
                            onChange={handleInputChange('firstName')}
                            error={!!errors.firstName}
                            helperText={errors.firstName}
                            disabled={loading}
                            autoComplete="given-name"
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Person color={errors.firstName ? 'error' : 'action'} />
                                        </InputAdornment>
                                    ),
                                },
                            }}
                        />

                        {/* Campo Apellido */}
                        <TextField
                            fullWidth
                            label="Apellido"
                            name="lastName-register-field"
                            value={formData.lastName}
                            onChange={handleInputChange('lastName')}
                            error={!!errors.lastName}
                            helperText={errors.lastName}
                            disabled={loading}
                            autoComplete="family-name"
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <PersonOutline color={errors.lastName ? 'error' : 'action'} />
                                        </InputAdornment>
                                    ),
                                },
                            }}
                        />
                    </Stack>

                    {/* Campo Email */}
                    <TextField
                        fullWidth
                        label="Correo electrónico"
                        type="email"
                        name="email-register-field"
                        value={formData.email}
                        onChange={handleInputChange('email')}
                        error={!!errors.email}
                        helperText={errors.email}
                        disabled={loading}
                        autoComplete="email"
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Email color={errors.email ? 'error' : 'action'} />
                                    </InputAdornment>
                                ),
                            },
                        }}
                    />

                    {/* Campo Contraseña */}
                    <TextField
                        fullWidth
                        label="Contraseña"
                        type={showPassword ? 'text' : 'password'}
                        name="password-register-field"
                        value={formData.password}
                        onChange={handleInputChange('password')}
                        error={!!errors.password}
                        helperText={errors.password}
                        disabled={loading}
                        autoComplete="new-password"
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Lock color={errors.password ? 'error' : 'action'} />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={toggleShowPassword}
                                            disabled={loading}
                                            edge="end"
                                            size="small"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            },
                        }}
                    />

                    {/* Campo Confirmar Contraseña */}
                    <TextField
                        fullWidth
                        label="Confirmar contraseña"
                        type={showConfirmPassword ? 'text' : 'password'}
                        name="confirmPassword-register-field"
                        value={formData.confirmPassword}
                        onChange={handleInputChange('confirmPassword')}
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword}
                        disabled={loading}
                        autoComplete="new-password"
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Lock color={errors.confirmPassword ? 'error' : 'action'} />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={toggleShowConfirmPassword}
                                            disabled={loading}
                                            edge="end"
                                            size="small"
                                        >
                                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            },
                        }}
                    />

                    {/* Checkbox Términos y Condiciones */}
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={formData.acceptTerms}
                                onChange={handleInputChange('acceptTerms')}
                                disabled={loading}
                                color="primary"
                            />
                        }
                        label={
                            <Typography variant="body2" color={errors.acceptTerms ? 'error' : 'text.secondary'}>
                                Acepto los{' '}
                                <Link
                                    component={NextLink}
                                    href="/terms"
                                    sx={{
                                        color: 'primary.main',
                                        textDecoration: 'none',
                                        '&:hover': {
                                            textDecoration: 'underline'
                                        }
                                    }}
                                >
                                    términos y condiciones
                                </Link>
                                {' '}y la{' '}
                                <Link
                                    component={NextLink}
                                    href="/privacy"
                                    sx={{
                                        color: 'primary.main',
                                        textDecoration: 'none',
                                        '&:hover': {
                                            textDecoration: 'underline'
                                        }
                                    }}
                                >
                                    política de privacidad
                                </Link>
                            </Typography>
                        }
                    />
                    {errors.acceptTerms && (
                        <Typography variant="caption" color="error" sx={{ mt: -2, ml: 4 }}>
                            {errors.acceptTerms}
                        </Typography>
                    )}

                    {/* Botón Submit */}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        disabled={loading}
                        sx={{
                            py: 1.5,
                            fontSize: '16px',
                            fontWeight: 'medium',
                            backgroundColor: (theme) => theme.palette.mode === 'dark' ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.04)",
                            color: (theme) => theme.palette.mode === 'dark' ? "#fff" : "#000",
                        }}
                    >
                        Crear cuenta
                    </Button>
                </Stack>
            </Box>

            {/* Divider con "O" */}
            <Box sx={{ my: 3, position: 'relative' }}>
                <Divider />
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        bgcolor: 'background.paper',
                        px: 2,
                        py: 0.5,
                        borderRadius: '50%',
                        minWidth: 32,
                        height: 32,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Typography 
                        variant="body2" 
                        color="text.secondary" 
                        sx={{ 
                            fontSize: '12px', 
                            fontWeight: 'medium',
                            lineHeight: 1
                        }}
                    >
                        O
                    </Typography>
                </Box>
            </Box>

            {/* Botones de registro social */}
            <Stack spacing={2}>
                <Button
                    fullWidth
                    variant="outlined"
                    onClick={() => handleSocialRegister('google')}
                    startIcon={<GoogleIcon />}
                    sx={{
                        py: 1.5,
                        color: 'text.primary',
                        backgroundColor: 'transparent',
                        '&:hover': {
                            borderColor: 'primary.main',
                            backgroundColor: 'action.hover',
                        }
                    }}
                >
                    Continuar con Google
                </Button>

                <Button
                    fullWidth
                    variant="outlined"
                    onClick={() => handleSocialRegister('github')}
                    startIcon={<GitHubIcon />}
                    sx={{
                        py: 1.5,
                        color: 'text.primary',
                        backgroundColor: 'transparent',
                        '&:hover': {
                            borderColor: 'primary.main',
                            backgroundColor: 'action.hover',
                        }
                    }}
                >
                    Continuar con GitHub
                </Button>
            </Stack>

            {/* Enlaces de navegación */}
            <Stack spacing={1} sx={{ textAlign: 'center', mt: 3 }}>
                <Typography variant="body2">
                    ¿Ya tienes cuenta?{' '}
                    <Link 
                        component={NextLink}
                        href={AUTH_ROUTES.LOGIN}
                        sx={{ 
                            color: 'primary.main',
                            fontWeight: 'medium',
                            textDecoration: 'none',
                            '&:hover': {
                                textDecoration: 'underline'
                            }
                        }}
                    >
                        Inicia sesión aquí
                    </Link>
                </Typography>
            </Stack>
        </Box>
    );
}
