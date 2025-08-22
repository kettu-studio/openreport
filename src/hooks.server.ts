import { SERVER_CONFIG } from '$lib/server/config';

// Configurar el servidor con las variables de entorno
export const handle = async ({ event, resolve }) => {
  return resolve(event);
};

// Configurar el puerto y host del servidor
export const server = {
  port: SERVER_CONFIG.PORT,
  host: SERVER_CONFIG.HOST
};
