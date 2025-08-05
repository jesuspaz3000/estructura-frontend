
import { Box, CircularProgress, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onThemeReady: () => void;
}

export default function LoadingScreen({ onThemeReady }: LoadingScreenProps) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Simular tiempo mínimo de carga para evitar flash
    const timer = setTimeout(() => {
      setIsReady(true);
      onThemeReady();
    }, 100); // Tiempo mínimo para que se establezca el tema

    return () => clearTimeout(timer);
  }, [onThemeReady]);

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000', // Fondo oscuro fijo
        zIndex: 9999,
        transition: 'opacity 0.3s ease-out',
        opacity: isReady ? 0 : 1,
        pointerEvents: isReady ? 'none' : 'auto',
      }}
    >
      <CircularProgress 
        size={40} 
        sx={{ 
          mb: 2,
          color: '#3b82f6' // Azul para el spinner
        }} 
      />
      <Typography 
        variant="body2" 
        sx={{
          color: '#cbd5e1' // Texto claro sobre fondo oscuro
        }}
      >
        Cargando...
      </Typography>
    </Box>
  );
}
