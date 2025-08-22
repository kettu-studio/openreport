import { OR_DOMAIN, PORT, HOST, NODE_ENV } from '$env/static/private';

// Configuración del servidor
export const SERVER_CONFIG = {
  // Configuración del dominio base
  OR_DOMAIN: OR_DOMAIN || 'https://openreport.kettu.tech',
  
  // Configuración del servidor
  PORT: parseInt(PORT || '3000'),
  HOST: HOST || '0.0.0.0',
  
  // Configuración de la aplicación
  NODE_ENV: NODE_ENV || 'development',
  
  // Función para obtener el dominio base
  getDomain(): string {
    return this.OR_DOMAIN;
  },
  
  // Función para generar URLs completas
  getFullUrl(path: string): string {
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return `${this.OR_DOMAIN}${cleanPath}`;
  },
  
  // Función para generar URLs de la API
  getApiUrl(path: string): string {
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return `${this.OR_DOMAIN}/api${cleanPath}`;
  }
} as const;
