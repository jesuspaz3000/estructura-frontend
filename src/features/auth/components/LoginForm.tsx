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
import { Visibility, VisibilityOff, Email, Lock } from '@mui/icons-material';
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';
import NextLink from 'next/link';
import { useLoginForm } from '../hooks/useLoginForm';
import { AUTH_ROUTES } from '../utils/auth-constants';

export function LoginForm() {
    const {
        // Estado
        formData,
        errors,
        loading,
        showPassword,
        
        // Acciones
        handleInputChange,
        handleSubmit,
        handleSocialLogin,
        toggleShowPassword
    } = useLoginForm();

    return (
        <Box sx={{ width: '100%', maxWidth: 400, mx: 'auto' }}>
            <Box component="form" onSubmit={handleSubmit} autoComplete="off" noValidate sx={{ width: '100%' }}>
                <Stack spacing={3}>
                    {/* Campos ocultos para confundir al navegador */}
                    <input type="text" style={{ display: 'none' }} />
                    <input type="password" style={{ display: 'none' }} />

                    {/* Error general */}
                    {errors.general && (
                        <Alert severity="error">
                            {errors.general}
                        </Alert>
                    )}

                    {/* Campo Email */}
                    <TextField
                        fullWidth
                        label="Email"
                        type="text"
                        name="email-login-field"
                        value={formData.email}
                        onChange={handleInputChange('email')}
                        autoComplete="new-email"
                        error={!!errors.email}
                        helperText={errors.email}
                        disabled={loading}
                        required
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
                        name="password-login-field"
                        value={formData.password}
                        onChange={handleInputChange('password')}
                        error={!!errors.password}
                        helperText={errors.password}
                        disabled={loading}
                        required
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
                                            edge="end"
                                            disabled={loading}
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            },
                        }}
                    />

                    {/* Checkbox Remember Me */}
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={formData.rememberMe}
                                onChange={handleInputChange('rememberMe')}
                                disabled={loading}
                                color="primary"
                            />
                        }
                        label="Recordarme"
                    />

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
                        Iniciar Sesión
                    </Button>
                </Stack>
            </Box>

            {/* Divider con "O" */}
            <Box sx={{ my: 3, display: 'flex', alignItems: 'center', gap: 2, justifyContent: 'center', width: '100%' }}>
                <Divider sx={{ flex: 1, borderColor: 'divider' }} />
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'medium' }}>
                    O
                </Typography>
                <Divider sx={{ flex: 1, borderColor: 'divider' }} />
            </Box>

            {/* Botones de login social */}
            <Stack spacing={2}>
                <Button
                    fullWidth
                    variant="outlined"
                    onClick={() => handleSocialLogin('google')}
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
                    onClick={() => handleSocialLogin('github')}
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
                    ¿No tienes cuenta?{' '}
                    <Link 
                        component={NextLink}
                        href={AUTH_ROUTES.REGISTER}
                        sx={{ 
                            color: 'primary.main',
                            fontWeight: 'medium',
                            textDecoration: 'none',
                            '&:hover': {
                                textDecoration: 'underline'
                            }
                        }}
                    >
                        Regístrate aquí
                    </Link>
                </Typography>

                <Typography variant="body2">
                    <Link 
                        component={NextLink}
                        href={AUTH_ROUTES.FORGOT_PASSWORD}
                        sx={{ 
                            color: 'text.secondary',
                            fontSize: '14px',
                            textDecoration: 'none',
                            '&:hover': {
                                textDecoration: 'underline',
                                color: 'primary.main'
                            }
                        }}
                    >
                        ¿Olvidaste tu contraseña?
                    </Link>
                </Typography>
            </Stack>

        </Box>
    );
}