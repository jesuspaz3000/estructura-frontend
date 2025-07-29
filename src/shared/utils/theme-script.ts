export const themeScript = `
(function() {
  try {
    // Establecer un ID consistente para MUI
    window.__MUI_INSTANCE_ID__ = 'mui-static-instance';
    
    // Obtener el modo guardado o usar 'system' por defecto
    const savedMode = localStorage.getItem('theme-mode') || 'system';
    
    // Función para obtener el tema del sistema
    const getSystemTheme = () => {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    };
    
    // Calcular el tema actual
    let actualTheme;
    if (savedMode === 'system') {
      actualTheme = getSystemTheme();
    } else {
      actualTheme = savedMode;
    }
    
    // Aplicar clases y atributos inmediatamente
    const root = document.documentElement;
    root.classList.add(actualTheme);
    root.setAttribute('data-theme', actualTheme);
    
    // Establecer CSS variables críticas inmediatamente
    if (actualTheme === 'dark') {
      root.style.setProperty('--auth-bg-color', '#1e293b');
      root.style.setProperty('--auth-border-color', '#334155');
      root.style.setProperty('--auth-divider-bg', '#1e293b');
      root.style.setProperty('--auth-divider-color', '#334155');
      root.style.setProperty('--auth-link-color', '#3b82f6');
      root.style.setProperty('--auth-link-secondary', '#cbd5e1');
      root.style.backgroundColor = '#0f172a';
      root.style.color = '#f8fafc';
      
      // Crear estilos inline temporales para MUI
      const style = document.createElement('style');
      style.textContent = \`
        body, body * { color: #f8fafc !important; }
        .MuiPaper-root { background-color: #1e293b !important; }
        .MuiOutlinedInput-notchedOutline { border-color: #334155 !important; }
        .MuiDivider-root { border-color: #334155 !important; background-color: #334155 !important; }
        .auth-divider-bg { background-color: #1e293b !important; }
        .auth-button-border { border-color: #334155 !important; }
        a[href*="register"] { color: #3b82f6 !important; }
        a[href*="forgot-password"] { color: #cbd5e1 !important; }
        .MuiLink-root { color: #3b82f6 !important; }
      \`;
      style.id = 'theme-critical-dark';
      document.head.appendChild(style);
    } else {
      root.style.setProperty('--auth-bg-color', '#ffffff');
      root.style.setProperty('--auth-border-color', '#e2e8f0');
      root.style.setProperty('--auth-divider-bg', '#ffffff');
      root.style.setProperty('--auth-divider-color', '#e2e8f0');
      root.style.setProperty('--auth-link-color', '#2563eb');
      root.style.setProperty('--auth-link-secondary', '#64748b');
    }
    
    // Actualizar meta theme-color
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', actualTheme === 'dark' ? '#1f2937' : '#ffffff');
    }
  } catch (e) {
    // En caso de error, no hacer nada (usar tema por defecto)
  }
})();
`;