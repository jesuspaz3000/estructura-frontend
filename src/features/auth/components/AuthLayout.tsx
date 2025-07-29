"use client";

import { ReactNode } from 'react';
import { Box, Paper, Typography, Stack } from '@mui/material';
import { ThemeToggle } from '@/shared/components/ThemeToggle';

interface AuthLayoutProps {
    children: ReactNode;
    title?: string;
    subtitle?: string;
    showThemeToggle?: boolean;
}

export function AuthLayout({
    children,
    title,
    subtitle,
    showThemeToggle = true
}: AuthLayoutProps) {
    return (
        <Box
            sx={{
                minHeight: '100vh',
                background: (theme) => 
                    theme.palette.mode === 'dark'
                        ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)'
                        : 'linear-gradient(135deg, #eff6ff 0%, #ffffff 50%, #e0e7ff 100%)',
                display: 'flex',
                flexDirection: 'column',
                transition: 'background 0.3s ease',
            }}
        >
            {/* Header con toggle de tema */}
            {showThemeToggle && (
                <Box
                    sx={{
                        position: 'absolute',
                        top: 16,
                        right: 16,
                        zIndex: 10,
                    }}
                >
                    <ThemeToggle />
                </Box>
            )}

            <Box
                sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    px: 2,
                    py: 4,
                }}
            >
                <Box sx={{ width: '100%', maxWidth: 400 }}>
                    <Paper
                        elevation={12}
                        sx={{
                            borderRadius: 2,
                            p: 4,
                            backgroundColor: 'background.paper',
                            border: 1,
                            borderColor: 'divider',
                        }}
                    >
                        {(title || subtitle) && (
                            <Box sx={{ textAlign: 'center', mb: 4 }}>
                                {title && (
                                    <Typography
                                        variant="h3"
                                        component="h1"
                                        sx={{
                                            fontWeight: 'bold',
                                            color: 'text.primary',
                                            mb: 1,
                                            fontSize: { xs: '1.875rem', sm: '2.25rem' },
                                        }}
                                    >
                                        {title}
                                    </Typography>
                                )}
                                {subtitle && (
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: 'text.secondary',
                                            fontSize: '0.875rem',
                                            lineHeight: 1.6,
                                        }}
                                    >
                                        {subtitle}
                                    </Typography>
                                )}
                            </Box>
                        )}

                        {/* Contenido */}
                        <Stack spacing={3}>
                            {children}
                        </Stack>
                    </Paper>
                </Box>
            </Box>
        </Box>
    )
}