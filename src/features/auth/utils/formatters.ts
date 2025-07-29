/**
 * Funciones de formateo para autenticación
 */

/**
 * Formatea un email eliminando espacios y convirtiéndolo a minúsculas
 */
export function formatEmail(email: string): string {
    return email.trim().toLowerCase();
}

/**
 * Formatea un nombre de usuario eliminando espacios extra
 */
export function formatUsername(username: string): string {
    return username.trim().replace(/\s+/g, ' ');
}

/**
 * Capitaliza la primera letra de cada palabra
 */
export function capitalizeWords(text: string): string {
    return text
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

/**
 * Enmascara un email mostrando solo las primeras letras
 * Ejemplo: john.doe@example.com -> j***@example.com
 */
export function maskEmail(email: string): string {
    const [localPart, domain] = email.split('@');
    if (!localPart || !domain) return email;
    
    const maskedLocal = localPart.charAt(0) + '*'.repeat(Math.max(0, localPart.length - 1));
    return `${maskedLocal}@${domain}`;
}

/**
 * Genera iniciales a partir de un nombre completo
 */
export function generateInitials(fullName: string): string {
    return fullName
        .split(' ')
        .map(name => name.charAt(0).toUpperCase())
        .slice(0, 2)
        .join('');
}