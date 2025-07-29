import { ReactNode } from 'react';
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
        <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex flex-col theme-transition'>
            {/* Header con toggle de tema */}
            {showThemeToggle && (
                <div className='absolute top-4 right-4 z-10'>
                    <ThemeToggle />
                </div>
            )}

            <div className='flex-1 flex flex-col items-center justify-center px-4 py-8'>
                <div className='w-full max-w-md'>
                    <div className='bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-700 p-8 theme-transition'>
                        {(title || subtitle) && (
                            <div className='text-center mb-8'>
                                {title && (
                                    <h1 className='text-3xl font-bold text-gray-900 dark:text-white mb-2 theme-transition'>
                                        {title}
                                    </h1>
                                )}
                                {subtitle && (
                                    <p className='text-gray-600 dark:text-gray-300 text-sm leading-relaxed theme-transition'>
                                        {subtitle}
                                    </p>
                                )}
                            </div>
                        )}

                        {/* Contenido */}
                        <div className='space-y-6'>
                            {children}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}