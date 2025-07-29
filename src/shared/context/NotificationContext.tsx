"use client"

import { ReactNode, useState, createContext, useContext } from "react";
import { Snackbar, Alert, AlertColor } from "@mui/material";

interface NotificationContextType {
    showNotification: (message: string, variant: AlertColor) => void;
    showSuccess: (message: string) => void;
    showError: (message: string) => void;
    showWarning: (message: string) => void;
    showInfo: (message: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

interface SnackbarState {
    open: boolean;
    message: string;
    variant: AlertColor;
}

export function NotificationProvider({ children }: { children: ReactNode }) {
    const [snackbar, setSnackbar] = useState<SnackbarState>({
        open: false,
        message: '',
        variant: 'info'
    });
    
    const showNotification = (message: string, variant: AlertColor) => {
        setSnackbar({
            open: true,
            message,
            variant
        });
    };

    const showSuccess = (message: string) => {
        showNotification(message, 'success');
    };

    const showError = (message: string) => {
        showNotification(message, 'error');
    };

    const showWarning = (message: string) => {
        showNotification(message, 'warning');
    };

    const showInfo = (message: string) => {
        showNotification(message, 'info');
    };

    const handleClose = (_?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbar(prev => ({ ...prev, open: false }));
    };

    return (
        <NotificationContext.Provider value={{ showNotification, showSuccess, showError, showWarning, showInfo }}>
            {children}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            >
                <Alert 
                    onClose={handleClose} 
                    severity={snackbar.variant}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </NotificationContext.Provider>
    );
}

export function useNotification(): NotificationContextType {
    const context = useContext(NotificationContext);
    if (context === undefined) {
        throw new Error('useNotification must be used within a NotificationProvider');
    }
    return context;
}